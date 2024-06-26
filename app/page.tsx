import { AppProps } from "next/app";
import React from "react";
import Cookies from 'js-cookie';

export async function getServerSideProps({ req }) {
  const theme = req.cookies.theme || 'light';
  return { props: { theme } };

function Home({ Component, pageProps, theme }: AppProps & { theme: string } ) {
  return (
    <main className="flex dark:bg-base-300 flex-col items-center justify-between p-24">
      <div className="w-96 dark:bg-base-100 rounded-xl shadow-md p-8">
        <h2 className="text-2xl dark:text-primary font-bold mb-4">Login or create an account</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block dark:text-gray-700 text-gray-300 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block dark:text-gray-700 text-gray-300  font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Sign In
          </button>
        </form>
      </div>
    </main>
  );
}

export default Home;