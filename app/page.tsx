import React from 'react'
import Header from './components/Header'
import Feed from './components/Feed'

function Home() {
  return (
    <div className='bg-base-200 scrollbar-hide'>
      <Header />
      <Feed />

      {/* Modal */}
    </div>
  )
}

export default Home