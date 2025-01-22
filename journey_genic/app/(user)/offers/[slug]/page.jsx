import OfferDetail from '@/components/user/offer/OfferDetail'
import React from 'react'

const Page = ({params}) => {
  return <OfferDetail id={params.slug}/>
}

export default Page
