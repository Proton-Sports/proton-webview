import { useState, useEffect } from "react";
import '../../lib/stylesheets/style.css'

export default function Index() {
    const [menuOn, setMenuOn] = useState(false)

    function switchCameraMode() {
        alt.emit('racing:creatorMode:switch:cameraMode:freemode')
    }

    useEffect(() => {
        alt.on('racing:checkpointCreator:menu', (status: boolean) => {
            setMenuOn(status) // true for open, false for close
        })


        return () => {
                // @ts-ignore
            alt.off('racing:checkpointCreator:menu');
        }
    }, [])

    return (
        <div className={`${menuOn ? 'opacity-100' : 'opacity-0'} font absolute top-[50vh] left-[30vh] -translate-x-1/2 -translate-y-1/2 bg-bg-1/60 space-y-4 p-3 pl-4 pr-4 rounded-md`}>
            <div className="flex items-center space-x-4">
                <div className="font text-bg-1 uppercase bg-fg-1 text-fix rounded-md border-[0.5vh] border-bg-3/50 relative">
                    <p className="absolute top-1/2 left-[1.45vh] -translate-x-1/2 -translate-y-1/2 ">X</p>
                </div>
                <p>To place checkpoint</p>
            </div>

            <div className="flex items-center space-x-4">
                <div className="font text-bg-1 uppercase bg-fg-1 text-fix rounded-md border-[0.5vh] border-bg-3/50 relative">
                    <p className="absolute top-1/2 left-[1.45vh] -translate-x-1/2 -translate-y-1/2 ">Z</p>
                </div>
                <p>To reposition current checkpoint</p>
            </div>

            <div className="flex items-center space-x-4">
                <div className="font text-bg-1 uppercase bg-fg-1 text-fix rounded-md border-[0.5vh] border-bg-3/50 relative">
                    <p className="absolute top-1/2 left-[1.45vh] -translate-x-1/2 -translate-y-1/2 ">C</p>
                </div>
                <p>To delete current checkpoint</p>
            </div>

            <div className="flex items-center space-x-4">
                <div className="font text-bg-1 uppercase bg-fg-1 text-fix rounded-md border-[0.5vh] border-bg-3/50 relative">
                    <p className="absolute top-1/2 left-[1.45vh] -translate-x-1/2 -translate-y-1/2 ">V/B</p>
                </div>
                <p>To change current size of checkpoint</p>
            </div>
            <div className="text-sm ml-auto mr-auto flex">
                <button onClick={() => switchCameraMode()} className="ml-auto mr-auto bg-bg-1/60 p-2 pl-3 pr-3 rounded-sm hover:bg-bg-1/70 transition-colors active:bg-bg-1/90 mt-4">Switch to Free camera mode</button>
            </div>
        </div>
    )
}