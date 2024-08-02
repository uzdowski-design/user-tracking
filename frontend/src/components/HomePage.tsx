import { useEffect, useState } from 'react';
import axios from 'axios';
import Paragraphs from './Paragraphs';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HomePage = () => {
  const [user, setUser] = useState({
    userId: sessionStorage.getItem('userId') || '',
    scrolled: sessionStorage.getItem('scrolled') || '',
    userName: sessionStorage.getItem('userName') || '',
    avatar: sessionStorage.getItem('avatar') || ''
  });
  useEffect(() => {
    const createUser = async () => {
      try {
        const response = await axios.post('/api/users/new');
        sessionStorage.setItem('userId', response.data.userId);
        sessionStorage.setItem('scrolled', 'false');
        sessionStorage.setItem('userName', response.data.userName);
        sessionStorage.setItem('avatar', response.data.avatar);
        setUser((prev) => ({
          ...prev,
          userId: sessionStorage.getItem('userId') || '',
          scrolled: sessionStorage.getItem('scrolled') || '',
          userName: sessionStorage.getItem('userName') || '',
          avatar: sessionStorage.getItem('avatar') || ''
        }));
      } catch (error) {
        console.error('Error creating user:', error);
      }
    };
    if (!sessionStorage.getItem('userId')) createUser();
  }, []);

  return (
    <div className="homepage">
      <div className="my-5 text-center">
        <h1 className="text-4xl font-bold my-8">User Tracking Page</h1>
        <p>Tracking users visiting the page and scroll engagement.</p>
        <p>Go to Report Page to view the engagement report.</p>
        <Button asChild className="my-8">
          <Link to="/report">View Report</Link>
        </Button>
      </div>
      <Paragraphs user={user} />
    </div>
  );
};

export default HomePage;
