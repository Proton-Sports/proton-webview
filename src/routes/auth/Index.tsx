import { useState } from 'react';
import { motion } from "framer-motion";
import { BsDiscord } from "react-icons/bs";
import { useEffect } from 'react';


export default function Index() {
    const [loading, setLoading] = useState<boolean>(true);
    const [AvatarUri, setAvatar] = useState<string>("");
    const [Username, setUsername] = useState<string>("");

    function onClick(){
        if(!loading){
            alt.emit("authentication:login")
        }
    }

    useEffect(() => {
        alt.on('authentication:information', (avatarUri: string, username: string) => {
            //setMenuOn(status) // true for open, false for close            
            setAvatar(avatarUri)
            setUsername(username)
            setLoading(false)
        })})

    return (
        <div className='w-screen h-screen bg-cover bg-no-repeat flex items-center justify-center' style={{"backgroundImage": "url(/main/background.jpg)"}}>
            <motion.div 
                initial={{ opacity: 0, y: 50}}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 0, ease: "easeInOut" }}     
                className="flex flex-col items-center gap-[3vh]"
            >
                <img src="/main/protonsports.png" className='w-[25vh]'/>
                <p className='flex items-center text-white text-md'>
                    {
                        loading ? 
                        "Register your account through Discord" : 
                        <>
                            <img src={AvatarUri} className='rounded-full w-[3vh] mr-[1vh]'/>
                            continue as <span className='text-pr-primary ml-[0.35vh]'>{Username}</span>?
                        </>
                    }
                </p>
                <button className='uppercase font-[bold] text-white bg-pr-secondary w-[60vh] h-[7vh] rounded-[0.5vh] text-lg hover:bg-red transition-colors flex items-center justify-center bg-gray-800' onClick={onClick}>
                    {
                        loading ? <><BsDiscord className="mr-[0.5vh]"/>Waiting for Discord...</> : 
                        "Confirm"
                    }
                </button>
            </motion.div>
        </div>
    )
}