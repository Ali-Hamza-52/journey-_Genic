import TripDetail from '@/components/user/trip/TripDetail';
import React from 'react'

const Page =async ({params}) => {
  const slug =await params.slug;
  return <TripDetail id={slug}/>
}

export default Page
