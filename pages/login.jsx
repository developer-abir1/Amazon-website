import Link from 'next/link';
import React from 'react';
import Layout from '../components/Layout';

export default function LoginScreen() {
  return (
    <Layout title={'Login'}>
      <from className="mx-auto  max-w-screen-md container">
        <h1 className="mb-4 text-xl"> Login</h1>
        <div className="mb-4">
          <div className="mb-4">
            <label htmlFor="email ">Email</label>
            <input
              type="email"
              placeholder="Enter Email address"
              className="input input-bordered w-full "
              id="email"
              autoFocus
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password ">Password</label>
            <input
              type="password"
              placeholder="Enter password *"
              className="input input-bordered w-full  "
              id="password"
              autoFocus
            />
          </div>

          <div className="mb-4">
            <button className="primary-button  ">Login</button>
          </div>
          <div className="mb-4">
            <span>Don&apos;t have an account?</span>
            <Link href={'/register'}>
              <span className="underline">&nbsp; Register</span>
            </Link>
          </div>
        </div>
      </from>
    </Layout>
  );
}
