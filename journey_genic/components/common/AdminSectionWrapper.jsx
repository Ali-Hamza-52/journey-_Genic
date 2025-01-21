import React from 'react'

const AdminSectionWrapper = ({children}) => {
  return (
    <div className='max-w-full ml-20 md:ml-72 px-4 md:px-8 py-4 md:py-8'>
      {children}
    </div>
  )
}

export default AdminSectionWrapper
