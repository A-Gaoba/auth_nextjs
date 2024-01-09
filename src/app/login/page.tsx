"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

const Login = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const onLogin = async () => {
    try {
      // Call your Login API endpoint with axios here
      // For example:
      // const response = await axios.post('/api/Login', user);
      // Handle the response accordingly
    } catch (error) {
      // Handle error scenarios
      console.error('Signup failed', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [id]: value }));
  };

  return (
    <div className='flex flex-col gap-5 justify-center items-center min-h-screen text-white'>
      <h1>Sign up</h1>
      <form className="w-82 flex flex-col gap-4">
        <div className='flex gap-2 justify-between'>
          <label htmlFor="name">Email : </label>
          <input
            type="email"
            id="email"
            placeholder='email'
            value={user.email}
            onChange={handleInputChange}
          />
        </div>

        <div className='flex gap-2 justify-between'>
          <label htmlFor="password">Password : </label>
          <input
            type="password"
            id="password"
            placeholder='password'
            required
            value={user.password}
            onChange={handleInputChange}
          />
        </div>

        <button type="button" onClick={onLogin}>
          Log in
        </button>
      </form>
      <Link href="/signup" className="underline hover:no-underline">
        create an account here
      </Link>
    </div>
  );
};

export default Login;
