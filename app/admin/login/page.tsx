'use client'

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { supabase } from '@/lib/supabaseClient';

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = async () => {
    const { data: adminData, error: adminError } = await supabase
      .from('admins')
      .select('password')
      .eq('email', email)
      .single();

    if (adminError || !adminData) {
      setLoginError('Incorrect username or password.');
      return;
    }

    if (adminData.password === password) {
      router.push(`/admin/events?email=${encodeURIComponent(email)}`);
    } else {
      setLoginError('Incorrect username or password.');
    }
  };



  return (
    <main className="flex h-screen w-full flex-col items-center justify-between">
      <div className={"w-full h-full flex justify-center items-center bg-gray-100"}>
        <div className="w-full max-w-md px-8 py-6 bg-white rounded-lg shadow-md">
          <h1 className="text-xl font-bold text-gray-700 text-center mb-4">Admin Login</h1>
          {loginError && <p className="text-red-500">{loginError}</p>}
          <div className="mb-4">
            <label htmlFor="email" className="block text-base text-gray-700 font-bold mb-2">Email</label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow rounded w-full py-2 px-3 text-gray-700"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-base text-gray-700 font-bold mb-2">Password</label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow rounded w-full py-2 px-3 text-gray-700"
            />
          </div>
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
