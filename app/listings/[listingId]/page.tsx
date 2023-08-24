import getCurrentUser from '@/app/actions/getCurrentUSer'
import getListById from '@/app/actions/getListingsById'
import ClientOnly from '@/app/components/ClientOnly'
import EmptyState from '@/app/components/EmptyState'
import React from 'react'
import ListingClient from './ListingClient'

interface IParams{
    listingId?:string
}
const ListingPage =  async({params}:{params:IParams}) => {
    const listing = await getListById(params)
    const currentUser = await getCurrentUser()

    if(!listing){
        return(
            <ClientOnly>
                <EmptyState/>
            </ClientOnly>
        )
    }
  return (
    <ClientOnly>
        <ListingClient
            listing={listing}
            currentUser={currentUser}
        />
    </ClientOnly>
  )
}

export default ListingPage