import React from "react";
import Login from "./components/login/login";
import Navbar from "./components/navbar/navbar";

function Home() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen bg-base-200 flex-col items-center justify-between p-24">
        {/* LOGIN FORM */}

        <Login />
      </main>
    </>
  );
}

export default Home;
