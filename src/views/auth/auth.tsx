import { useState } from 'react';
import { motion } from "framer-motion";
import { BsDiscord } from "react-icons/bs";

export default function Auth() {
    const [register, setRegister] = useState<boolean>(true);

    return (
        <div className='w-screen h-screen bg-cover bg-no-repeat flex items-center justify-center' style={{"backgroundImage": "url(/main/background.jpg)"}}>
            <motion.div 
                initial={{ opacity: 0, y: 50}}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 0, ease: "easeInOut" }}     
                className="flex flex-col items-center gap-[3vh]"
            >
                <img src="/main/protonsports.png" className='w-[25vh]'/>
                <p className='flex items-center text-white text-[1.3vh]'>
                    {
                        register ? 
                        "Register your account through Discord" : 
                        <>
                            <img src="/auth/placeholder.png" className='rounded-full w-[3vh] mr-[1vh]'/>
                            continue as <span className='text-pr-primary ml-[0.35vh]'>elvito.</span>?
                        </>
                    }
                </p>
                <button className='uppercase font-[bold] text-white bg-pr-secondary w-[20vh] h-[5vh] rounded-[0.5vh] text-[1.2vh] hover:bg-pr-primary transition-colors flex items-center justify-center'>
                    {
                        register ? <><BsDiscord className="mr-[0.5vh]"/>Register</> : 
                        "Confirm"
                    }
                </button>
            </motion.div>
        </div>
    )
}