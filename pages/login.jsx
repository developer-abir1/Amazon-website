import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';

export default function LoginScreen() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const submitHandle = ({ email, password }) => {
    console.log(email, password);
  };

  return (
    <Layout title={'Login'}>
      <div className=" w-1/2 mx-auto mt-12">
        <h1 className="mb-4 text-3xl text-center   "> Login</h1>

        <form onSubmit={handleSubmit(submitHandle)}>
          <div className="mb-4">
            <label className="label">
              <span className="label-text">Email Address?</span>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              className="input input-bordered input-warning w-full  "
              {...register('email', {
                required: 'Please enter email address',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Enter valid email address',
                },
              })}
            />

            {errors.email && (
              <div className="text-red-400 my-2">{errors.email.message}</div>
            )}
          </div>
          <div className="mb-3">
            <label className="label">
              <span className="label-text">Enter password</span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="input input-bordered input-warning w-full  "
              {...register('password', {
                required: 'Please Enter passwrod',
                minLength: {
                  value: 6,
                  message: 'password is more then 5 char',
                },
              })}
            />

            {errors.password && (
              <div className="text-red-400 my-2">{errors.password.message}</div>
            )}
          </div>

          <input type="submit" className="primary-button" />
        </form>
        <div className="mb-4">
          <span>Don&apos;t have an account?</span>
          <Link href={'/register'}>
            <span className="underline">&nbsp; Register</span>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
