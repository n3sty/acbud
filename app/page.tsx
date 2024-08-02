import React from 'react'
import Header from './components/Header'
import Feed from './components/Feed'
import Modal from './components/Modal'

async function Home() {
  return (
    <div className='bg-base-200 text-base-content scrollbar-hide'>
      <Header /> 
      <Feed />

      <Modal />
      
    </div>
  )
}

export default Home