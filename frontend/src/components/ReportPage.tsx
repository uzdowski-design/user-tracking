import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UsersRecord } from './UsersRecord';
import { ReportSummary } from './ReportSummary';

const ReportPage = () => {
  const [report, setReport] = useState({ totalUsers: 0, scrollPercentage: 0 });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await axios.get('/api/users/report');
        setReport(response.data);
      } catch (error) {
        console.error('Error fetching report:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users/users');
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchReport();
    fetchUsers();
  }, []);

  return (
    <div className="report-page">
      <div className="my-5 text-center">
        <h1 className="text-4xl font-bold my-8">Tracking Report</h1>
        <p>Report showing users visiting the page and scroll engagement.</p>
        <p>Displaying engagement summary and detailed records by user.</p>
        <Button asChild className="my-8">
          <Link to="/">Back to Homepage</Link>
        </Button>
      </div>
      <div className="w-fit mx-auto my-10">
        <ReportSummary
          totalUsers={report.totalUsers}
          scrollPercentage={report.scrollPercentage}
        />
      </div>
      {users && users.length > 0 && <UsersRecord users={users} />}
    </div>
  );
};

export default ReportPage;
