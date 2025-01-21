import Footer from '@/components/common/Footer'
import Navbar from '@/components/common/Navbar'
import React from 'react'

const Userlayout = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
            <Footer />

        </>
    )
}

export default Userlayout
