import { CampaignConfig, Contribution, PublicCampaignData, Student } from './types';
import { calculatePublicAggregates } from './utils';

export const INITIAL_CAMPAIGN_CONFIG: CampaignConfig = {
  id: 'afamigos_fundraiser',
  title: 'Child Sponsorship Programme (CSP)',
  target: 25000,
  currencySymbol: '₹',
  active: true,
  createdAt: 1714500000000,
  updatedAt: 1714500000000,
};

const OFFICIAL_CLASS_NAMES: string[] = [
  'Aakanksh K S',
  'Abhimanyu Biswas Ruchi',
  'Abhinav Praveen',
  'Aditi Menon',
  'Alden Viviano Fernandes',
  'Alice Jose',
  'Aman Sajith',
  'Amreen Alam',
  'Anant Babbar',
  'Annamraju Sree Gnana Prasuna',
  'Antony Koshy K',
  'Anwesha Ahuja',
  'Ashith Kushal Reddy',
  'Aviral Agarwal',
  'B R Niveditha',
  'B V Sneha',
  'Bhavatharni T',
  'Bhawini Maheshwari',
  'Bijjala Chandaa Smaran',
  'Chirag P Patil',
  'Daivik Sharma',
  'Deeksha P N',
  'Deepshika K',
  'Dev Malkani',
  'Devitha A Patel',
  'Dhruv Krishnamurthy',
  'Divya P',
  'Divyanshi Singhal',
  'Gatik Apreja',
  'Gowri K Sajeev',
  'Gursheen Kaur Sandhu',
  'Hridhya Sudheer P',
  'Impana D K',
  'Jiya Ashish Mehta',
  'Jyoti Prabha Behera',
  'Jyotishko Das',
  'Khushi Holla',
  'Kiruthik M',
  'Kshathriyan Dhandayudhapani',
  'Kushalini A V',
  'L H Jeevithan',
  'Lakshay Arora',
  'Madhan R',
  'Mahima S',
  'Mansahib Singh Oberoi',
  'Mantasha Azim',
  'Manya Shroff',
  'N Skandesh Manikandan',
  'Parvathi Deepak',
  'Pavan Gowda V',
  'Prarthana R B',
  'Rachit Banthia',
  'Rajveer Singh Rajpal',
  'Rakshith Balaji',
  'Rama Krushna Panda',
  'Rohit Balaji S',
  'S B Sreshta',
  'Saarang Nallacherry',
  'Saksham Takiar',
  'Samarpan Sethi',
  'Sayan Mahanta',
  'Sejal Tulsyan',
  'Shlok Raghavendra',
  'Shruti G',
  'Shruti Priya Agrawal',
  'Shwetha R',
  'Sreehari Sudheer',
  'Swetha Raghunath',
  'Taani Jain',
  'Taanish Bahl',
  'Tejaswini B',
  'Thejas Ayyavu Saravanan',
  'Thoushiq Naresh',
  'Udit Khandelwal',
  'Vaishnavi Parthasarathy',
  'Vedansh Jain',
  'Vibha Tyagi',
  'Vishvashakshini K P',
  'Vivaan Vinod',
  'Yashvee Kedia',
];

// Generate 80 students sorted alphabetically with deterministic IDs
export const INITIAL_STUDENTS_ROSTER: Student[] = OFFICIAL_CLASS_NAMES.map((name, index) => {
  const idNum = String(index + 1).padStart(2, '0');
  return {
    id: `stu_${idNum}`,
    name,
    active: true,
    createdAt: 1714500000000 + index * 1000,
  };
});

// Initial sample contributions (to demonstrate podium & leaderboard)
export const INITIAL_CONTRIBUTIONS: Contribution[] = [
  {
    id: 'c_01',
    studentId: 'stu_20', // Chirag P Patil
    studentName: 'Chirag P Patil',
    amount: 4000,
    createdAt: 1714580000000,
    note: 'Initial seed contribution',
  },
  {
    id: 'c_02',
    studentId: 'stu_04', // Aditi Menon
    studentName: 'Aditi Menon',
    amount: 3000,
    createdAt: 1714582000000,
    note: 'Class drive kickoff',
  },
  {
    id: 'c_03',
    studentId: 'stu_01', // Aakanksh K S
    studentName: 'Aakanksh K S',
    amount: 2500,
    createdAt: 1714584000000,
  },
  {
    id: 'c_04',
    studentId: 'stu_14', // Aviral Agarwal
    studentName: 'Aviral Agarwal',
    amount: 2000,
    createdAt: 1714586000000,
  },
  {
    id: 'c_05',
    studentId: 'stu_10', // Annamraju Sree Gnana Prasuna
    studentName: 'Annamraju Sree Gnana Prasuna',
    amount: 1500,
    createdAt: 1714588000000,
  },
  {
    id: 'c_06',
    studentId: 'stu_26', // Dhruv Krishnamurthy
    studentName: 'Dhruv Krishnamurthy',
    amount: 1200,
    createdAt: 1714590000000,
  },
  {
    id: 'c_07',
    studentId: 'stu_37', // Khushi Holla
    studentName: 'Khushi Holla',
    amount: 1000,
    createdAt: 1714592000000,
  },
  {
    id: 'c_08',
    studentId: 'stu_45', // Mansahib Singh Oberoi
    studentName: 'Mansahib Singh Oberoi',
    amount: 800,
    createdAt: 1714594000000,
  },
  {
    id: 'c_09',
    studentId: 'stu_59', // Saksham Takiar
    studentName: 'Saksham Takiar',
    amount: 500,
    createdAt: 1714596000000,
  },
  {
    id: 'c_10',
    studentId: 'stu_72', // Thejas Ayyavu Saravanan
    studentName: 'Thejas Ayyavu Saravanan',
    amount: 500,
    createdAt: 1714598000000,
  },
];

export const INITIAL_PUBLIC_DATA: PublicCampaignData = calculatePublicAggregates(
  INITIAL_CAMPAIGN_CONFIG.target,
  INITIAL_CONTRIBUTIONS,
  INITIAL_STUDENTS_ROSTER
);
