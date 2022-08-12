import Head from 'next/head';
import React, { useContext } from 'react';
import Link from 'next/link';
import { Store } from '../utils/store';

export default function Layout({ children, title }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  return (
    <>
      <Head>
        <title>{title ? title + '- Amazona' : 'Amazona'}</title>
        <meta name="description" content="Next amzona next app" />
      </Head>
      <div className="flex  min-h-screen  flex-col  justify-between  ">
        <header>
          <div className="navbar shadow-md">
            <div className=" navbar-start">
              <Link href="/">
                <a className=" font-semibold ">Amazona </a>
              </Link>
            </div>
            <div className=" navbar-end  ">
              <Link href="/cart">
                <a className="mr-2 p-2 btn   btn-ghost">
                  <span>Cart</span>
                  {cart.cartItems.length > 0 && (
                    <span className="text-xs  font-bold text-white bg-red-600 rounded-full ml-1 py-1 px-2">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </span>
                  )}
                </a>
              </Link>
              <Link href="/login">
                <a className="mr-2 p-2 btn btn-ghost">Login</a>
              </Link>
            </div>
          </div>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex h-10 justify-center items-center shadow-inner">
          <p>copywrrite@2022 next Amazona</p>
        </footer>
      </div>
    </>
  );
}
