import React, { Suspense } from "react";
import Header from "./components/Header";
import Feed from "./components/feed/Feed";
import Modal from "./components/Modal";
import InfoModal from "./components/InfoModal";
import Loading from "./loading";

async function Home() {
  return (
    <Suspense fallback={ <Loading /> }>

    <div className="bg-base-200 text-base-content scrollbar-hide">
      <Header />
      <Feed />
      <Modal />
      <Suspense fallback>
        <InfoModal />
      </Suspense>
    </div>
    </Suspense>
  );
}

export default Home;
