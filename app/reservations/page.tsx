import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUSer";
import getReservations from "../actions/getReservation";
import ReservationsClient from "./ReservationsClient";

const ReservationPage = async()=>{
    const currentUser = await getCurrentUser()

    if(!currentUser){
        return(
            <ClientOnly>
                <EmptyState
                    title="Unauthorized"
                    subtitle="Please Login"
                />
            </ClientOnly>
        )
    }

    const reservations = await getReservations({
        authorId:currentUser.id
    });

    if(reservations.length == 0){
        return(
            <ClientOnly>
                <EmptyState
                    title="No reservations found"
                    subtitle="Looks like you have no reservations on your properties"
                />
            </ClientOnly>
        )
    }
    return(
        <ClientOnly>
            <ReservationsClient
                reservations ={reservations}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}
export default ReservationPage