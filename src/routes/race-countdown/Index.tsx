import { useEffect, useState } from 'react';
import Background from '../../lib/assets/images/race-main-menu-bg.webp';

interface Data {
  mapName: string;
  endTime: number;
  participants: number;
  maxParticipants: number;
}

export default function Index() {
  const [data, setData] = useState<Data | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState(0);

  useEffect(() => {
    function handleGetData(data: Data) {
      setData(data);
    }

    function handleSetParticipants(participants: number) {
      setData((x) => (x ? { ...x, participants } : null));
    }

    alt.on('race-countdown:getData', handleGetData);
    alt.on('race-countdown:setParticipants', handleSetParticipants);
    alt.emit('race-countdown:getData');
    return () => {
      alt.off('race-countdown:getData', handleGetData);
      alt.off('race-countdown:setParticipants', handleSetParticipants);
    };
  }, []);

  useEffect(() => {
    if (!data) return;
    setRemainingSeconds(Math.max(0, Math.floor((data.endTime - Date.now()) / 1000)));
    const interval = setInterval(() => {
      setRemainingSeconds(Math.max(0, Math.floor((data.endTime - Date.now()) / 1000)));
    }, 500);
    return () => {
      clearInterval(interval);
    };
  }, [data]);

  return (
    <div className="fixed w-96 top-4 right-4">
      <div className="space-y-4 overflow-hidden rounded-xl bg-bg-1 proton-container">
        <img src={Background} className="absolute inset-0 object-cover max-w-[400%] opacity-10 rounded-xl" />
        <div className="relative p-4 space-y-4 rounded-xl">
          {data && (
            <>
              <h2 className="text-center uppercase text-md fugaz">{data.mapName}</h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="flex justify-center text-4xl font-bold leading-none text-center">
                    {Array.from(remainingSeconds.toString()).map((digit, i) => (
                      <span key={i} className="block w-8 text-center">
                        {digit}
                      </span>
                    ))}
                  </p>
                  <p className="text-xs text-center uppercase text-fg/40">remaining seconds</p>
                </div>
                <div>
                  <p className="flex justify-center text-4xl font-bold leading-none">
                    {Array.from(`${data.participants}/${data.maxParticipants}`).map((digit, i) => (
                      <span key={i} className="block w-8 text-center">
                        {digit}
                      </span>
                    ))}
                  </p>
                  <p className="text-xs text-center uppercase text-fg/40">Participants</p>
                </div>
              </div>
            </>
          )}
          <p className="text-center">
            Press <span className="px-2 leading-none uppercase rounded fugaz bg-bg-3">Q</span> to leave the race
          </p>
        </div>
      </div>
    </div>
  );
}
