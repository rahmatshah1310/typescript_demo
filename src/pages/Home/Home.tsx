import React from 'react'
import { Button } from '@components'
import { useAuth } from '@context'

const Home = () => {
    const {handleLogout}=useAuth()
  return (
    <div className='text-white text-6xl'>
        <p>Home</p>

     <Button onClick={handleLogout } className="text-white">Log Out</Button>

    </div>
  )
}

export default Home