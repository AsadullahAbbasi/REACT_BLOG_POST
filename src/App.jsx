import React from 'react'

const App = () => {
  console.log(import.meta.env.VITE_APPWRITE_URL) // "123"

  return (
    <div className='bg-red-500'>
      
      my first blog app
    </div>
  )
}

export default App