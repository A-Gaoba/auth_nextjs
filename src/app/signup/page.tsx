"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import Student from '@/models/studentModel';
import {toast} from 'react-hot-toast';

const Signup = () => {
  const router = useRouter();
  const [student, setUStudent] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const onSignup = async () => {
    try {
      setLoading(true)
      const response = await axios.post("api/user/singup", student)
      console.log("sign up successfully", response.data)
      router.push("/login")


    } catch (error: any) {
      console.error('Signup failed', error.message);
      toast.error(error.message)
    }
    finally {
      setLoading(true)
    }
  };

  useEffect(() => {
    if (student.email.length > 0 && student.password.length > 0 && student.name.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [student]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUStudent({
      ...student, [e.target.id]: e.target.value
    })
  };

  return (
    <div className='flex flex-col gap-5 justify-center items-center min-h-screen text-black bg-slate-300'>
      <h1>{loading ? "processing" : "sing up"}</h1>
      <form className="w-82 flex flex-col gap-4">
        <div className='flex gap-2 justify-between'>
          <label htmlFor="name">Name : </label>
          <input
            type="text"
            id="name"
            placeholder='name'
            value={student.name}
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
            value={student.email}
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
            value={student.password}
            onChange={handleInputChange}
          />
        </div>
        <button type="button" onClick={onSignup}>{buttonDisabled ? "Register" : "sign up"}</button>

      </form>
      <Link href="/login" className="underline hover:no-underline">
        Already have an account? Login here.
      </Link>
    </div>
  );
};

export default Signup;
