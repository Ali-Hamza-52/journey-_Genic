import DestinationDetail from '@/components/user/destination/DestinationDetail'
import React from 'react'

const page = ({params}) => {
  return <DestinationDetail id={params.slug}/>
}

export default page
