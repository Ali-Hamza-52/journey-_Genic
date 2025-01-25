import DestinationDetail from '@/components/user/destination/DestinationDetail'
import React from 'react'

const page =async ({params}) => {
  const slug = await params.slug
  return <DestinationDetail id={slug}/>
}

export default page
