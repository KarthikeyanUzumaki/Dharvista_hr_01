import { Applicant } from '../types';

export const MOCK_APPLICANTS: Applicant[] = [
  {
    id: 'app-001',
    jobId: 'job-101',
    jobTitle: 'Junior Site Engineer',
    name: 'Karthik Raja',
    email: 'karthik.r@example.com',
    phone: '+91 98765 43210',
    resumeLink: 'https://drive.google.com/file/d/sample1',
    appliedAt: '2025-10-20T09:30:00Z',
    status: 'new',
    notes: 'Has 1 year experience in local construction projects.'
  },
  {
    id: 'app-002',
    jobId: 'job-102',
    jobTitle: 'React Frontend Developer',
    name: 'Priya Dharshini',
    email: 'priya.d@example.com',
    phone: '+91 98989 89898',
    resumeLink: 'https://drive.google.com/file/d/sample2',
    appliedAt: '2025-10-18T14:15:00Z',
    status: 'contacted',
    notes: 'Good portfolio, scheduled interview for Tuesday.'
  },
  {
    id: 'app-003',
    jobId: 'job-103',
    jobTitle: 'Accounts Assistant',
    name: 'Senthil Kumar',
    email: 'senthil.k@example.com',
    phone: '+91 91234 56789',
    resumeLink: 'https://drive.google.com/file/d/sample3',
    appliedAt: '2025-10-15T11:00:00Z',
    status: 'hired',
    notes: 'Joined on Oct 25th.'
  },
  {
    id: 'app-004',
    jobId: 'job-102',
    jobTitle: 'React Frontend Developer',
    name: 'Anitha S',
    email: 'anitha.s@example.com',
    phone: '+91 90000 11111',
    resumeLink: 'https://drive.google.com/file/d/sample4',
    appliedAt: '2025-10-21T16:45:00Z',
    status: 'new',
  },
  {
    id: 'app-005',
    jobId: 'job-104',
    jobTitle: 'HR Executive',
    name: 'Ramesh Babu',
    email: 'ramesh.b@example.com',
    phone: '+91 88888 77777',
    resumeLink: 'https://drive.google.com/file/d/sample5',
    appliedAt: '2025-10-10T10:00:00Z',
    status: 'rejected',
    notes: 'Experience does not match requirements.'
  }
];