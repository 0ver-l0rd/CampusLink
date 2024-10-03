'use client'; // Ensure this is a client-side component

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect as soon as the page loads
    router.replace('/dashboard');
  }, [router]);

  return null; // Optionally, you can add a loader here or keep it empty
};

export default Home;
