import { useState, useEffect } from 'react';
import '../../lib/stylesheets/style.css';
import logo from '../../lib/assets/protonsports.png';

export default function Index() {
  const [menuOn, setMenuOn] = useState(false);

  function openCreatorMode(route: string) {
    alt.emit('racing:creatorMode:changePage', route);
  }

  useEffect(() => {
    const handleMenuStatus = (status: boolean) => {
      setMenuOn(status); // true for open, false for close
    };

    alt.on('racing:racingMenu:menu', handleMenuStatus);

    return () => {
      alt.off('racing:racingMenu:menu', handleMenuStatus);
    };
  }, []);

  return (
    <>
      <div
        className={`w-fit font container absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity ${
          menuOn ? 'opacity-100 delay-200' : 'opacity-0'
        }`}
      >
        <div className="ml-auto mr-auto flex">
          <div className="w-[36vh] mr-8 mt-10">
            <img src={logo} alt="logo" className="w-36 ml-auto mr-auto mb-4" />
            <p className="text-sm text-center">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum, minus.
            </p>
            <div className="space-y-4 w-[21vh] ml-auto mr-auto mt-8">
              <button
                onClick={() => openCreatorMode('races')}
                className="bg-bg-1/80 hover:bg-bg-1/65 transition-colors p-2 w-full rounded-md text-sm block"
              >
                Races
              </button>
              <button
                onClick={() => openCreatorMode('hosts')}
                className="bg-bg-1/50 hover:bg-bg-1/65 transition-colors p-2 w-full rounded-md text-sm block"
              >
                Hosts
              </button>
              <button
                onClick={() => openCreatorMode('creator_mode')}
                className="bg-bg-1/50 hover:bg-bg-1/65 transition-colors p-2 w-full rounded-md text-sm block"
              >
                Creator mode
              </button>
              <button
                onClick={() => openCreatorMode('credits')}
                className="bg-bg-1/50 hover:bg-bg-1/65 transition-colors p-2 w-full rounded-md text-sm block"
              >
                Credits
              </button>
            </div>
          </div>

          <div className="">
            <div className="space-x-8 mb-2">
              <button>Button</button>
              <button>Button</button>
              <button>Button</button>
              <button>Button</button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="w-60 h-32 bg-black">Card</div>
              <div className="w-60 h-32 bg-black">Card</div>
              <div className="w-60 h-32 bg-black">Card</div>
              <div className="w-60 h-32 bg-black">Card</div>
              <div className="w-60 h-32 bg-black">Card</div>
              <div className="w-60 h-32 bg-black">Card</div>
              <div className="w-60 h-32 bg-black">Card</div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${
          menuOn ? 'opacity-100 delay-200' : 'opacity-0'
        } transition-opacity font z-10 absolute top-[10vh] right-[6vh] -translate-x-1/2 -translate-y-1/2 font text-[1.6vh] text-bg-1 uppercase bg-fg-1 text-fix rounded-md border-[0.5vh] border-bg-3/50`}
      >
        <p>esc</p>
      </div>

      <div className={menuOn ? 'lights opacity-100 transition-opacity' : 'opacity-0 transition-opacity'}>
        <div className="bg-light">.</div>
        <div className="bg-light2">.</div>
        <div className="bg-light3">.</div>
        <div className="bg-light4">.</div>
      </div>
    </>
  );
}
