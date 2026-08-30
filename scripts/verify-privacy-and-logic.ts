import { calculatePublicAggregates, formatCurrency, formatPercentage, getMilestoneInfo } from '../src/lib/utils';
import { Contribution } from '../src/lib/types';

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    process.exit(1);
  } else {
    console.log(`  ✅ PASS: ${message}`);
  }
}

async function runTests() {
  console.log('🧪 Starting AFAmigos Privacy & Logic Validation Tests...\n');

  // --- TEST 1: STRICT ZERO-LEAK PRIVACY GUARANTEE ---
  console.log('--- Test Suite 1: Privacy Guarantees (No Leaked Amounts) ---');
  const mockContributions: Contribution[] = [
    { id: '1', studentId: 's1', studentName: 'Student Alpha', amount: 500, createdAt: 1000 },
    { id: '2', studentId: 's2', studentName: 'Student Beta', amount: 1500, createdAt: 2000 },
    { id: '3', studentId: 's1', studentName: 'Student Alpha', amount: 2000, createdAt: 3000 },
    { id: '4', studentId: 's3', studentName: 'Student Gamma', amount: 300, createdAt: 4000 },
  ];

  const publicData = calculatePublicAggregates(25000, mockContributions);

  assert(publicData.totalRaised === 4300, 'Total raised matches sum of private contributions');
  assert(publicData.contributorCount === 3, 'Unique contributor count is correct');
  assert(publicData.percentage === (4300 / 25000) * 100, 'Percentage is calculated correctly');

  for (const entry of publicData.leaderboard) {
    const raw = entry as unknown as Record<string, unknown>;
    assert(!('amount' in raw), `Entry for ${entry.name} does NOT have 'amount' key`);
    assert(!('totalAmount' in raw), `Entry for ${entry.name} does NOT have 'totalAmount' key`);
    assert(!('contributions' in raw), `Entry for ${entry.name} does NOT have 'contributions' key`);
    assert(typeof entry.rank === 'number', `Entry for ${entry.name} has numeric rank`);
    assert(typeof entry.name === 'string', `Entry for ${entry.name} has student name`);
    assert(typeof entry.studentId === 'string', `Entry for ${entry.name} has studentId`);
  }

  // --- TEST 2: STRICT UNIQUE SEQUENTIAL RANKING (NO DUPLICATE RANKS) ---
  console.log('\n--- Test Suite 2: Strict Unique Sequential Ranking ---');
  const equalContributions: Contribution[] = [
    { id: 't1', studentId: 's1', studentName: 'Student Alpha', amount: 2000, createdAt: 1000 },
    { id: 't2', studentId: 's2', studentName: 'Student Beta', amount: 1500, createdAt: 2000 }, // Equal amount, earlier timestamp
    { id: 't3', studentId: 's3', studentName: 'Student Gamma', amount: 1500, createdAt: 3000 }, // Equal amount, later timestamp
    { id: 't4', studentId: 's4', studentName: 'Student Delta', amount: 800, createdAt: 4000 },
  ];

  const uniqueAggregates = calculatePublicAggregates(10000, equalContributions);
  const lb = uniqueAggregates.leaderboard;

  assert(lb[0].name === 'Student Alpha' && lb[0].rank === 1, 'Student Alpha (2000) has unique Rank 1');
  assert(lb[1].name === 'Student Beta' && lb[1].rank === 2, 'Student Beta (1500, earlier timestamp) has unique Rank 2');
  assert(lb[2].name === 'Student Gamma' && lb[2].rank === 3, 'Student Gamma (1500, later timestamp) has unique Rank 3');
  assert(lb[3].name === 'Student Delta' && lb[3].rank === 4, 'Student Delta (800) has unique Rank 4');

  // Verify all ranks are strictly unique and sequential
  const rankSet = new Set(lb.map((e) => e.rank));
  assert(rankSet.size === lb.length, 'All leaderboard ranks are strictly unique (no two students share a rank)');
  for (let i = 0; i < lb.length; i++) {
    assert(lb[i].rank === i + 1, `Rank at index ${i} is exactly ${i + 1}`);
  }

  // --- TEST 3: MULTIPLE CONTRIBUTIONS BY SAME STUDENT ---
  console.log('\n--- Test Suite 3: Unique Contributor Aggregation ---');
  const multiContribs: Contribution[] = [
    { id: 'm1', studentId: 's1', studentName: 'Student Alpha', amount: 500, createdAt: 1000 },
    { id: 'm2', studentId: 's1', studentName: 'Student Alpha', amount: 1000, createdAt: 2000 },
    { id: 'm3', studentId: 's1', studentName: 'Student Alpha', amount: 500, createdAt: 3000 },
    { id: 'm4', studentId: 's2', studentName: 'Student Beta', amount: 1500, createdAt: 4000 },
  ];

  const multiAggregates = calculatePublicAggregates(25000, multiContribs);
  assert(multiAggregates.totalRaised === 3500, 'Multiple contributions sum properly (500+1000+500+1500 = 3500)');
  assert(multiAggregates.contributorCount === 2, 'Multiple contributions count as 2 unique contributors');
  assert(multiAggregates.leaderboard[0].studentId === 's1' && multiAggregates.leaderboard[0].rank === 1, 'Student Alpha total 2000 is rank 1');
  assert(multiAggregates.leaderboard[1].studentId === 's2' && multiAggregates.leaderboard[1].rank === 2, 'Student Beta total 1500 is rank 2');

  // --- TEST 4: MILESTONE PROGRESSION & CELEBRATION TIER ---
  console.log('\n--- Test Suite 4: Milestone System ---');
  assert(getMilestoneInfo(10).tier === '0-24', '10% maps to 0-24% milestone');
  assert(getMilestoneInfo(35).tier === '25-49', '35% maps to 25-49% milestone');
  assert(getMilestoneInfo(60).tier === '50-74', '60% maps to 50-74% milestone');
  assert(getMilestoneInfo(80).tier === '75-89', '80% maps to 75-89% milestone');
  assert(getMilestoneInfo(95).tier === '90-99', '95% maps to 90-99% milestone');
  assert(getMilestoneInfo(100).tier === '100+', '100% maps to 100+ celebration milestone');
  assert(getMilestoneInfo(125).tier === '100+', '125% target exceeded maps to 100+ milestone');
  assert(formatCurrency(25000) === '₹25,000', 'formatCurrency produces correct Indian formatted currency');
  assert(formatPercentage(73.8) === '73.8%', 'formatPercentage produces correct percentage output');

  console.log('\n🎉 All 40/40 Tests Passed Successfully!');
}

runTests().catch((e) => {
  console.error(e);
  process.exit(1);
});
