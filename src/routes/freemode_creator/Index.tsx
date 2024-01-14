import { useEffect, useState } from "react";
import '../../lib/stylesheets/style.css'

export default function Index() {
    const [menuOn, setMenuOn] = useState(true)

    useEffect(() => {
        alt.on('racing:freemodeCreator:menu', (status: boolean) => {
            setMenuOn(status) // true for open, false for close
        })


        return () => {
                // @ts-ignore
            alt.off('racing:freemodeCreator:menu');
        }
    }, [])

    return (
        <div className={`  ${menuOn ? 'opacity-100' : 'opacity-0'}  font absolute top-[50vh] left-[30vh] -translate-x-1/2 -translate-y-1/2 bg-bg-1/60 space-y-4 p-3 pl-4 pr-4 rounded-md`}>
            <div className="flex items-center space-x-4">
                <div className="font text-bg-1 uppercase bg-fg-1 text-fix rounded-md border-[0.5vh] border-bg-3/50 relative">
                    <p className="absolute top-1/2 left-[1.45vh] -translate-x-1/2 -translate-y-1/2 ">W</p>
                </div>
                <p>Move forwards</p>
            </div>

            <div className="flex items-center space-x-4">
                <div className="font text-bg-1 uppercase bg-fg-1 text-fix rounded-md border-[0.5vh] border-bg-3/50 relative">
                    <p className="absolute top-1/2 left-[1.45vh] -translate-x-1/2 -translate-y-1/2 ">S</p>
                </div>
                <p>Move backwards</p>
            </div>

            <div className="flex items-center space-x-4">
                <div className="font text-bg-1 uppercase bg-fg-1 text-fix rounded-md border-[0.5vh] border-bg-3/50 relative">
                    <p className="absolute top-1/2 left-[1.45vh] -translate-x-1/2 -translate-y-1/2 ">A</p>
                </div>
                <p>Move left</p>
            </div>

            <div className="flex items-center space-x-4">
                <div className="font text-bg-1 uppercase bg-fg-1 text-fix rounded-md border-[0.5vh] border-bg-3/50 relative">
                    <p className="absolute top-1/2 left-[1.45vh] -translate-x-1/2 -translate-y-1/2 ">D</p>
                </div>
                <p>Move right</p>
            </div>

            <div className="flex items-center space-x-4">
                <div className="font text-bg-1 uppercase bg-fg-1 text-xs text-fix rounded-md border-[0.5vh] border-bg-3/50 relative">
                    <p className="absolute top-1/2 left-[1.45vh] -translate-x-1/2 -translate-y-1/2 ">Ctrl</p>
                </div>
                <p>Move down</p>
            </div>

            <div className="flex items-center space-x-4">
                <div className="font text-bg-1 uppercase bg-fg-1 text-xs text-fix2 w-12 rounded-md border-[0.5vh] border-bg-3/50 relative">
                    <p className="absolute top-1/2 left-[1.45vh] -translate-x-1/2 -translate-y-1/2">Space</p>
                </div>
                <p>Move up</p>
            </div>



            <div className="flex items-center space-x-4">
                <div className="font text-bg-1 uppercase bg-fg-1 text-fix rounded-md border-[0.5vh] border-bg-3/50 relative">
                    <p className="absolute top-1/2 left-[1.45vh] -translate-x-1/2 -translate-y-1/2 ">LM</p>
                </div>
                <p>Create a start/race checkpoint</p>
            </div>



            <div className="flex items-center space-x-4">
                <div className="font text-bg-1 uppercase bg-fg-1 text-fix rounded-md border-[0.5vh] border-bg-3/50 relative">
                    <p className="absolute top-1/2 left-[1.45vh] -translate-x-1/2 -translate-y-1/2 ">X</p>
                </div>
                <p>Remove start checkpoint</p>
            </div>


            <div className="flex items-center space-x-4">
            <div className="font text-bg-1 uppercase bg-fg-1 text-xs text-fix3 w-20 rounded-md border-[0.5vh] border-bg-3/50 relative">
                    <p className="absolute top-1/2 left-[1.45vh] -translate-x-1/2 -translate-y-1/2">Backspace</p>
                </div>
                <p>Remove race checkpoint</p>
            </div>

            <div className="flex items-center space-x-4">
            <div className="font text-bg-1 uppercase bg-fg-1 text-xs text-fix2 w-12 rounded-md border-[0.5vh] border-bg-3/50 relative">
                    <p className="absolute top-1/2 left-[1.45vh] -translate-x-1/2 -translate-y-1/2">Shift</p>
                </div>
                <p>Speed up</p>
            </div>
        </div>
    )
}