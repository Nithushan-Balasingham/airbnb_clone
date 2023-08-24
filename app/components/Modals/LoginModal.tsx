"use client"
import axios from "axios";
import { signIn } from 'next-auth/react';
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { 
  FieldValues, 
  SubmitHandler,
  useForm
} from "react-hook-form";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModel";

import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../Inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";

const LoginModal = () => {
    const registerModal = useRegisterModal();
    const LoginModal = useLoginModal();

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const{
        register,
        handleSubmit,
        formState:{
            errors
        }
    }=useForm<FieldValues>({
        defaultValues:{
            email:"", 
            password:""
        }
    })

    const onSubmit : SubmitHandler<FieldValues>=(data)=>{
        setIsLoading(true);
        signIn('credentials',{
            ...data,
            redirect:false,
        })
        .then((callback)=>{
            setIsLoading(false);

            if(callback?.ok){
                toast.success('Logged In')
                router.refresh();
                LoginModal.onClose()
            }
            if(callback?.error){
                toast.error(callback.error)
            }
        })
    }
    const toggle = useCallback(()=>{
        LoginModal.onClose()
        registerModal.onOpen()
    },[LoginModal, registerModal])
    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
             title="Welcome to back"
             subtitle="Login to your account"
            />
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                type="password"
                label="Password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )

    const footerContent =(
        <div className="flex flex-col gap-4 mt-3">
            <hr/>
            <Button    
                outline 
                label="Continue with google" 
                icon={FcGoogle}
                onClick={()=>signIn('google')}/>
            <Button    
                outline 
                label="Continue with github" 
                icon={AiFillGithub}
                onClick={()=>signIn('github')}/>

                <div className=" text-neutral-500 text-center mt-4 font-light">
                    <div className=" text-center flex flex-row  gap-2 justify-center items-center">
                        <div>First time using Airbnb?</div>
                        <div onClick={toggle} className="text-neutral-800 cursor-pointer hover:underline">Create An Account</div>
                    </div>
                </div>
        </div>

    )
  return (
    <Modal
        disabled={isLoading}
        isOpen={LoginModal.isOpen}
        title="Login to the Account"
        actionLabel="Continue"
        onClose={LoginModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
    />
  )
}

export default LoginModal