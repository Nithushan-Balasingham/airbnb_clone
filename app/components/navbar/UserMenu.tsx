"use client"
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import Menuitem from "./Menuitem";
import useRegisterModal from "@/app/hooks/useRegisterModel";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import useRentModal from "@/app/hooks/useRentModal";

interface UserMenuProps{
    currentUser?:SafeUser | null
}

const UserMenu:React.FC<UserMenuProps> = ({currentUser}) => {
    const [isOpen, setIsOpen] = useState(false);

    const rentModal = useRentModal()
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()

    const toggleOpen = useCallback(()=>{
        setIsOpen((value) => !value);
    },[])
    const onRent= useCallback(()=>{
        if(!currentUser){
            return loginModal.onOpen();
        }
        rentModal.onOpen()
    },[currentUser,loginModal,rentModal])

  return (
    <div className="relative">
        <div className="flex flex-row items-center gap-3 ">
            <div 
                onClick={onRent} 
                className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full bg-neutral-100 transition cursor-pointer">
                    Airbnb your home
                </div>
                <div 
                    className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full  cursor-pointer hover:shadow-md transition">
                <div
                    className={`cursor-pointer ${
                    isOpen ? 'rotate-45' : 'rotate-0'
                    } transition-transform duration-300 ease-in-out`}
                    onClick={() => setIsOpen(!isOpen)}
                    >
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"

                        >
                    {isOpen ? (
                        <>
                        <line x1="12" y1="0" x2="12" y2="24"></line>
                        <line x1="0" y1="12" x2="24" y2="12"></line>
                        </>
                    ) : (
                        <>
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                        </>
                    )}
                    </svg>
                </div>                        
                <div className="hidden md:block">
                    <Avatar src={currentUser?.image}/>
                </div>
                </div>
                    
        </div>
        {isOpen && (
            <div className="absolute rounded-xl shadow-md  w-[-40vw]  md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
               <div className="flex flex-col cursor-pointer">
                {currentUser ? (
                    <>
                    <Menuitem
                        onClick={()=>{}}
                        label="My Trips"
                    />
                     <Menuitem
                        onClick={()=>{}}
                        label="My favourites"
                    />
                      <Menuitem
                        onClick={()=>{}}
                        label="My reservations"
                    />
                      <Menuitem
                        onClick={()=>{}}
                        label="My properties"
                    />
                      <Menuitem
                        onClick={rentModal.onOpen}
                        label="Airbnb My home"
                    />
                    <hr/>
                    <Menuitem
                        onClick={()=> signOut()}
                        label="Logout"
                    />
                    </>
                ):(
                    <>
                    <Menuitem
                        onClick={loginModal.onOpen}
                        label="Login"
                    />
                     <Menuitem
                        onClick={registerModal.onOpen}
                        label="Sign up"
                    />
                    </>
                )}
                  
                </div> 
            </div>
        )}
    </div>
  )
}

export default UserMenu