import React, { useState, useEffect } from 'react';
import '../../lib/stylesheets/style.css';
import { FaEdit } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import { BiRename } from 'react-icons/bi';
import logo from '../../lib/assets/protonsports.png';

interface Map {
  id: number;
  name: string;
}

export default function Index() {
  const [searchBar, setSearchBar] = useState<string>('');
  const [maps, setMaps] = useState<Map[]>([
    { name: 'Juicy towns', id: 1 }, // do not duplicate ID !! Its used for sending data which map to edit
    { name: 'Juicy townss', id: 2 },
    { name: 'Juicy townsss', id: 3 },
    { name: 'Juicy townssss', id: 4 },
    { name: 'Long road towns v2 + Juicy south Los Santos', id: 5 },
    { name: 'Juicy towns', id: 6 },
    { name: 'Juicy townss', id: 7 },
    { name: 'Juicy townsss', id: 8 },
    { name: 'Juicy townssss', id: 9 },
    { name: 'Long road towns v2 + Juicy south Los Santos', id: 10 },
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchBar(e.target.value.toLowerCase());
  };

  const filteredMaps = maps.filter((map) => map.name.toLowerCase().includes(searchBar));

  const [mapName, setMapName] = useState('');
  const handleChangeMap = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMapName(e.target.value);
  };

  // altv

  useEffect(() => {
    const handleMapData = (maps: any) => {
      setMaps(maps);

      /*
        [
          { name: 'Juicy towns', id: 1 }, // do not duplicate ID !! It's used for sending data which map to edit
          { name: 'Juicy townss', id: 2 },
          { name: 'Juicy townsss', id: 3 },
          { name: 'Juicy townssss', id: 4 },
          { name: 'Long road towns v2 + Juicy south Los Santos', id: 5 },
          { name: 'Juicy towns', id: 6 },
          { name: 'Juicy townss', id: 7 },
          { name: 'Juicy townsss', id: 8 },
          { name: 'Juicy townssss', id: 9 },
          { name: 'Long road towns v2 + Juicy south Los Santos', id: 10 }
        ]
      */
    };

    alt.on('race:creator:map', handleMapData);

    return () => {
      alt.off('race:creator:map', handleMapData);
    };
  }, []);

  function openCreatorMode(route: string) {
    alt.emit('race:creator:changePage', route);
  }

  function editMap(map: number) {
    alt.emit('race:creator:editMap', map);
  }

  function cancelMap() {
    alt.emit('race:creator:cancelMap');
    setMapName('');
  }

  function createMap() {
    if (!mapName) return;
    alt.emit('race:creator:createMap', mapName);
  }

  function checkpointPlacer() {
    alt.emit('race:creator:open:checkpointPlacer');
  }

  function openGridPlacer() {
    alt.emit('race:creator:open:gridPlacer');
  }

  return (
    <>
      <div
        className="font container absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center max-w-[78vw] w-fit"
      >
        <div className="space-y-2 w-[21vh] mr-28">
          <button
            onClick={() => openCreatorMode('races')}
            className="bg-bg-1/50 hover:bg-bg-1/65 transition-colors p-2 w-full rounded-md text-sm block"
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
            className="bg-bg-1/80 hover:bg-bg-1/65 transition-colors p-2 w-full rounded-md text-sm block"
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
        <div className="flex mr-64">
          <div className="">
            <div className="w-72 pb-3 ml-auto mr-auto border-b-[0.2vh] border-b-bg-1/60 mb-4">
              <img src={logo} alt="logo" className="w-36 ml-auto mr-auto" />
            </div>
            <div className="flex space-x-32 mt-10">
              <div className="text-sm">
                <h1 className="uppercase text-center text-md font-bold">Already created maps</h1>
                <div className="flex mb-8 bg-bg-1/80 w-fit pl-2 rounded-sm items-center  text-fg-1/50 mt-2 ml-auto mr-auto">
                  <FaSearch />
                  <input
                    type="text"
                    className="ml-2 text-sm bg-[rgba(0,0,0,0)] pr-3 outline-none p-1"
                    placeholder="Search map"
                    onChange={handleChange}
                    value={searchBar}
                  />
                </div>

                <div className="bg-bg-1/20 p-2 rounded-sm">
                  <div className="rounded-sm overflow-hidden max-h-[30vh] overflow-y-auto pr-2 w-[34vh]">
                    {filteredMaps.map((map, index) => (
                      <div key={index} className="flex bg-bg-1/60 p-2 items-center">
                        <p className="mr-4">{map.name.length < 35 ? map.name : `${map.name.slice(0, 32)}...`}</p>
                        <button
                          onClick={() => editMap(map.id)}
                          className="ml-auto text-xs bg-bg-1/50 p-1 h-fit rounded-sm hover:bg-bg-1/70 transition-colors"
                        >
                          <FaEdit />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="">
                <h1 className="uppercase text-center text-md font-bold">Create map</h1>
                <div className="mt-2">
                  <div className="flex mb-2 bg-bg-1/80 w-fit pl-2 rounded-sm items-center text-fg-1/50 ml-auto mr-auto">
                    <BiRename />
                    <input
                      type="text"
                      className="ml-2 text-sm bg-[rgba(0,0,0,0)] pr-3 outline-none p-1"
                      value={mapName}
                      onChange={handleChangeMap}
                      placeholder="Map name"
                    />
                  </div>

                  <div className="mt-8">
                    <h1 className="uppercase text-center text-md font-bold">Controls</h1>
                    <div className="space-x-4 text-sm mt-4 flex">
                      <button
                        onClick={openGridPlacer}
                        className="bg-bg-1/60 p-1 pl-3 pr-3 rounded-sm hover:bg-bg-1/70 transition-colors w-32 h-8 active:bg-bg-1/90"
                      >
                        Grid Placer
                      </button>
                      <button
                        onClick={checkpointPlacer}
                        className="bg-bg-1/60 p-1 pl-3 pr-3 rounded-sm hover:bg-bg-1/70 transition-colors w-32 h-8 active:bg-bg-1/90"
                      >
                        Checkpoint Placer
                      </button>
                    </div>

                    <div className="mt-8 text-sm flex">
                      <div className="space-x-8 ml-auto mr-auto">
                        <button
                          onClick={cancelMap}
                          className=" p-1 pl-4 pr-4 rounded-sm bg-bg-1/60 hover:bg-bg-1/70 transition-colors active:bg-bg-1/90"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={createMap}
                          className="bg-accent-1/60 p-1 pl-4 pr-4 rounded-sm hover:bg-accent-1/75 transition-colors active:bg-accent-1"
                        >
                          Create
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="font z-10 absolute top-[10vh] right-[6vh] -translate-x-1/2 -translate-y-1/2 font text-[1.6vh] text-bg-1 uppercase bg-fg-1 text-fix rounded-md border-[0.5vh] border-bg-3/50"
      >
        <p>esc</p>
      </div>

      <div className="lights">
        <div className="bg-light">.</div>
        <div className="bg-light2">.</div>
        <div className="bg-light3">.</div>
        <div className="bg-light4">.</div>
      </div>
    </>
  );
}
