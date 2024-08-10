import React, { Suspense } from "react";
import Header from "./components/Header";
import Feed from "./components/Feed";
import Modal from "./components/Modal";
import InfoModal from "./components/InfoModal";

async function Home() {
  return (
    <div className="bg-base-200 text-base-content scrollbar-hide">
      <Header />
      <Feed />
      <Modal />
      <Suspense fallback>
        <InfoModal />
      </Suspense>
    </div>
  );
}

export default Home;
