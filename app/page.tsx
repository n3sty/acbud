import React from "react";
import Header from "./components/Header";
import Feed from "./components/feed/Feed";
import Modal from "./components/Modal";
import InfoModal from "./components/InfoModal";

async function Home() {
  return (
    <div className="bg-base-100 text-base-content">
      <Header />
      <Feed />
      <Modal />
      <InfoModal />
    </div>
  );
}

export default Home;
