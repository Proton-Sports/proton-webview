import Button from '../../lib/components/Button';
import arrow from '../../lib/assets/images/arrow_button.png';
import { useState, useEffect } from 'react';
export default function Index() {
  function selectedCat(cat: string) {
    console.log(cat);
    if (cat === 'host') {
      setActiveBtnHost(activeBtnHost ? false : true);
    }
  }

  const [activeBtnRaces, setActiveBtnRaces] = useState(true);
  const [activeBtnHost, setActiveBtnHost] = useState(false);
  const [activeBtnSettings, setActiveBtnSettings] = useState(false);
  const [activeBtnCreator, setActiveBtnCreator] = useState(false);
  const [activeBtnCredits, setActiveBtnCredits] = useState(false);

  const [menuOn, setMenuOn] = useState(true);

  useEffect(() => {
    const handleMenuStatus = (status: boolean) => {
      setMenuOn(status); // true for open, false for close
    };

    alt.on('racing:racingMenuList:menu', handleMenuStatus);

    return () => {
      alt.off('racing:racingMenuList:menu', handleMenuStatus);
    };
  }, []);

  return (
    <div className="h-full w-full">
      <div
        className={
          menuOn
            ? 'h-full w-full racing-menu-list-bg relative left-0 transition-all'
            : '-left-1/2 h-full w-full racing-menu-list-bg relative transition-all'
        }
      >
        <div className="grid grid-cols-1 gap-4 font-bold w-fit absolute top-[58%] ml-7 -translate-y-1/2 fugaz">
          <Button
            className="uppercase text-left flex items-center w-48"
            variant={activeBtnRaces ? 'primary' : 'base'}
            onClick={() => selectedCat('races')}
          >
            Races{' '}
            <img
              src={arrow}
              className={
                activeBtnRaces
                  ? 'ml-auto w-5 opacity-100 transition-opacity'
                  : `ml-auto w-5 opacity-0 transition-opacity`
              }
            />
          </Button>
          <Button
            variant={activeBtnHost ? 'primary' : 'base'}
            className="uppercase text-left flex items-center w-48 ml-2 bg-bg-2/60"
            onClick={() => selectedCat('host')}
          >
            Host{' '}
            <img
              src={arrow}
              className={
                activeBtnHost
                  ? 'ml-auto w-5 opacity-100 transition-opacity'
                  : `ml-auto w-5 opacity-0 transition-opacity`
              }
            />
          </Button>
          <Button
            variant={activeBtnCreator ? 'primary' : 'base'}
            className="uppercase text-left flex items-center w-48 ml-4 bg-bg-2/60"
            onClick={() => selectedCat('creator_mode')}
          >
            Creator Mode{' '}
            <img
              src={arrow}
              className={
                activeBtnCreator
                  ? 'ml-auto w-5 opacity-100 transition-opacity'
                  : `ml-auto w-5 opacity-0 transition-opacity`
              }
            />
          </Button>
          <Button
            variant={activeBtnSettings ? 'primary' : 'base'}
            className="uppercase text-left flex items-center w-48 ml-7 bg-bg-2/60"
            onClick={() => selectedCat('settings')}
          >
            Settings{' '}
            <img
              src={arrow}
              className={
                activeBtnSettings
                  ? 'ml-auto w-5 opacity-100 transition-opacity'
                  : `ml-auto w-5 opacity-0 transition-opacity`
              }
            />
          </Button>
          <Button
            variant={activeBtnCredits ? 'primary' : 'base'}
            className="uppercase text-left flex items-center w-48 ml-9 bg-bg-2/60"
            onClick={() => selectedCat('credits')}
          >
            Credits{' '}
            <img
              src={arrow}
              className={
                activeBtnCredits
                  ? 'ml-auto w-5 opacity-100 transition-opacity'
                  : `ml-auto w-5 opacity-0 transition-opacity`
              }
            />
          </Button>
        </div>
      </div>
      <div
        className={
          menuOn
            ? 'font z-10 absolute right-4 top-4 font text-[1.6vh] text-bg-1 uppercase bg-fg-1 text-fix rounded-md border-[0.5vh] border-bg-3/50 opacity-100 transition-opacity'
            : 'opacity-0 transition-opacity font z-10 absolute right-4 top-4 font text-[1.6vh] text-bg-1 uppercase bg-fg-1 text-fix rounded-md border-[0.5vh] border-bg-3/50'
        }
      >
        <p>esc</p>
      </div>
    </div>
  );
}
