import React from 'react'

const Home = () => {
  return (
    <div name='/' className='max-w-[1000px] mx-auto px-8 flex flex-col justify-center h-screen'>
    <h1 className='text-center text-2xl sm:text-4xl font-bold text-black'>Welcome to the Movie Review app</h1>
          <p className='text-center text-xl sm:text-2xl text-black'>Click Movies link above to browse around or click Login to leave a review</p>
    </div>
  )
}

export default Home