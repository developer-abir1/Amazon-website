import Link from 'next/link';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';
import { getError } from '../utils/error';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
export default function LoginScreen() {
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [router, session, redirect]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ email, password }) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };
  return (
    <Layout title={'Login'}>
      <div className=" w-1/2 mx-auto mt-12">
        <h1 className="mb-4 text-3xl text-center   "> Login</h1>

        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="mb-4">
            <label className="label">
              <span className="label-text">Email Address?</span>
            </label>
            <input
              defaultValue="admin@example.com"
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
              defaultValue="123456"
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

          <div className=" my-4">
            <input type="submit" className="primary-button" value="Login" />
          </div>
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
