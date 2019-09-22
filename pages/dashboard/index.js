import { useEffect } from 'react';
import Router from 'next/router';

const Dashboard = () => {
  useEffect(() => {
    Router.push('/dashboard/team');
  });

  return null;
};

export default Dashboard;
