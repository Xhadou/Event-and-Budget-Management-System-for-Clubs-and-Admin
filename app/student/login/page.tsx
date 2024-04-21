//final
'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from '@/lib/supabaseClient'; // Ensure you have initialized Supabase client

function setlocal(key: string, value: string) {
  typeof window !== 'undefined' ? window.localStorage.setItem(key, value) : null;
}

function getlocal(key: string) {
  const value = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null;
  return value;
}

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [rollnumber, setRollnumber] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = async () => {
    // Check if the email exists in the students table
    const { data: studentData, error: studentError } = await supabase
      .from('students')
      .select('rollnumber')
      .eq('email', email)
      .single();

    if (studentError || !studentData) {
      setLoginError('Incorrect username or password.');
      return;
    }

    // Compare the input rollnumber with the one in the database
    if (studentData.rollnumber.toString() === rollnumber) {
      // If match, redirect to the events page
      setlocal("email", email)
      router.push(`/student/events?email=${encodeURIComponent(email)}`);
    } else {
      setLoginError('Incorrect username or password.');
    }
  };

  return (
    <main className="flex h-screen w-full flex-col items-center justify-between">
      <div className={"w-full h-full flex justify-center items-center bg-gray-100"}>
        <div className="w-full max-w-md px-8 py-6 bg-white rounded-lg shadow-md">
          <h1 className="text-xl font-bold text-gray-700 text-center mb-4">Student Login</h1>
          <div className="mb-4">
            <label htmlFor="username" className="block text-base text-gray-700 font-bold mb-2">Username</label>
            <Input
              type="text"
              id="username"
              className="shadow rounded w-full py-2 px-3 text-gray-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-base text-gray-700 font-bold mb-2">Password</label>
            <Input
              type="password"
              id="password"
              className="shadow rounded w-full py-2 px-3 text-gray-700"
              value={rollnumber}
              onChange={(e) => setRollnumber(e.target.value)}
            />
          </div>
          {loginError && <p className="text-red-500">{loginError}</p>}
          <div className="flex items-center justify-between">
            <Button
              type="submit"
              className="font-bold py-2 px-4 w-full mt-5"
              onClick={handleLogin}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
