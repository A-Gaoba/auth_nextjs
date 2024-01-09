"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

const Signup = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const onSignup = async () => {
    try {
      // Call your signup API endpoint with axios here
      // For example:
      // const response = await axios.post('/api/signup', user);
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
    <div className='flex flex-col gap-5 justify-center items-center min-h-screen text-black bg-slate-300'>
      <h1>Register here</h1>
      <form className="w-82 flex flex-col gap-4">
        <div className='flex gap-2 justify-between'>
          <label htmlFor="name">Name : </label>
          <input
            type="text"
            id="name"
            placeholder='name'
            value={user.name}
            onChange={handleInputChange}
          />
        </div>

        <div className='flex justify-between'>
          <label htmlFor="email">Email : </label>
          <input
            type="email"
            id="email"
            placeholder='email'
            required
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
        <button type="button" onClick={onSignup}>Sign Up</button>

      </form>
      <Link href="/login" className="underline hover:no-underline">
        Already have an account? Login here.
      </Link>
    </div>
  );
};

export default Signup;
