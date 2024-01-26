import React, { useState, useEffect, type FormEvent } from 'react';
import { FaEdit } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import { BiRename } from 'react-icons/bi';
import { HiTrash } from 'react-icons/hi2';
import Logo from '../../lib/assets/images/logo.png';
import Background from '../../lib/assets/images/race-main-menu-bg.webp';
import { Popover } from '@headlessui/react';
import Button from '../../lib/components/Button';

interface Map {
  id: number;
  name: string;
}

export default function Index() {
  const [searchBar, setSearchBar] = useState<string>('');
  const [maps, setMaps] = useState<Map[]>([{ id: 1, name: 'abc' }]);
  const [editType, setEditType] = useState<'start' | 'race' | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchBar(e.target.value.toLowerCase());
  };

  const filteredMaps = maps.filter((map) => map.name.toLowerCase().includes(searchBar));

  const [mapName, setMapName] = useState('');
  const handleChangeMap = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMapName(e.target.value);
  };

  useEffect(() => {
    const handleMapData = (maps: Map[]) => {
      setMaps(maps);
    };

    function handleDeleteMap(id: number) {
      setMaps((maps) => maps.filter((x) => x.id !== id));
    }

    alt.on('race:creator:map', handleMapData);
    alt.on('race:creator:deleteMap', handleDeleteMap);

    return () => {
      alt.off('race:creator:map', handleMapData);
    };
  }, []);

  function openCreatorMode(route: string) {
    alt.emit('race:creator:changePage', route);
  }

  function editMap(map: number) {
    if (!editType) return;
    alt.emit('race:creator:editMap', map, editType);
  }

  function cancelMap() {
    alt.emit('race:creator:cancelMap');
    setMapName('');
  }

  function createMap() {
    if (!mapName) return;
    alt.emit('race:creator:createMap', mapName);
  }

  function deleteMap(id: number) {
    alt.emit('race:creator:deleteMap', id);
  }

  return (
    <>
      <div className="relative flex items-center justify-around w-screen h-screen gap-24">
        <img src={Background} className="absolute object-cover w-full h-full -z-10" />
        <div className="absolute w-full h-full select-none -z-10 bg-black/80" />
        <div className="space-y-2 w-[21vh] p-4">
          <button
            onClick={() => openCreatorMode('races')}
            className="block w-full p-2 text-sm transition-colors rounded-md bg-bg-1/50 hover:bg-bg-1/65"
          >
            Races
          </button>
          <button
            onClick={() => openCreatorMode('hosts')}
            className="block w-full p-2 text-sm transition-colors rounded-md bg-bg-1/50 hover:bg-bg-1/65"
          >
            Hosts
          </button>
          <button
            onClick={() => openCreatorMode('creator_mode')}
            className="block w-full p-2 text-sm transition-colors rounded-md bg-bg-1/80 hover:bg-bg-1/65"
          >
            Creator mode
          </button>
          <button
            onClick={() => openCreatorMode('credits')}
            className="block w-full p-2 text-sm transition-colors rounded-md bg-bg-1/50 hover:bg-bg-1/65"
          >
            Credits
          </button>
        </div>
        <div className="flex p-4">
          <div className="">
            <div className="w-72 pb-3 ml-auto mr-auto border-b-[0.2vh] border-b-bg-1/60 mb-4">
              <img src={Logo} alt="logo" className="ml-auto mr-auto w-36" />
            </div>
            <div className="flex mt-10 space-x-32">
              <div className="text-sm">
                <h1 className="font-bold text-center uppercase text-md">Already created maps</h1>
                <div className="flex items-center pl-2 mt-2 mb-8 ml-auto mr-auto rounded-sm bg-bg-1/80 w-fit text-fg-1/50">
                  <FaSearch />
                  <input
                    type="text"
                    className="ml-2 text-sm bg-[rgba(0,0,0,0)] pr-3 outline-none p-1"
                    placeholder="Search map"
                    onChange={handleChange}
                    value={searchBar}
                  />
                </div>

                <div className="p-2 rounded-sm bg-bg-1/20">
                  <div className="rounded-sm overflow-hidden max-h-[30vh] overflow-y-auto pr-2 w-[34vh]">
                    {filteredMaps.map((map, index) => (
                      <div key={index} className="flex items-center gap-1 p-2 bg-bg-1/60">
                        <p className="mr-auto">{map.name.length < 35 ? map.name : `${map.name.slice(0, 32)}...`}</p>
                        <button
                          onClick={() => editMap(map.id)}
                          className="p-1 text-xs transition-colors rounded-sm bg-bg-1/50 h-fit hover:bg-bg-1/70"
                        >
                          <FaEdit />
                        </button>
                        <Popover>
                          <Popover.Button
                            onClick={() => editMap(map.id)}
                            className="p-1 text-xs transition-colors rounded-sm bg-bg-1/50 h-fit hover:bg-bg-1/70"
                          >
                            <HiTrash />
                          </Popover.Button>
                          <Popover.Panel className="absolute">
                            {({ close }) => (
                              <form
                                className="p-4 space-y-2 bg-bg-1"
                                onSubmit={(e) => {
                                  e.preventDefault();
                                  deleteMap(map.id);
                                }}
                              >
                                <span>Do you want to delete this race map?</span>
                                <div className="w-full space-x-4">
                                  <Button variant="primary" type="submit">
                                    Delete
                                  </Button>
                                  <Button type="button" onClick={() => close()}>
                                    Cancel
                                  </Button>
                                </div>
                              </form>
                            )}
                          </Popover.Panel>
                        </Popover>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="">
                <h1 className="font-bold text-center uppercase text-md">Create map</h1>
                <div className="mt-2">
                  <div className="flex items-center pl-2 mb-2 ml-auto mr-auto rounded-sm bg-bg-1/80 w-fit text-fg-1/50">
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
                    <h1 className="font-bold text-center uppercase text-md">Controls</h1>
                    <div className="flex mt-4 space-x-4 text-sm">
                      <button
                        onClick={() => setEditType('start')}
                        className={`w-32 h-8 p-1 pl-3 pr-3 transition-colors rounded-sm ${
                          editType === 'start' ? 'bg-fg-1 text-bg-1' : 'bg-bg-1/60 hover:bg-bg-1/70 active:bg-bg-1/90'
                        }`}
                      >
                        Start points
                      </button>
                      <button
                        onClick={() => setEditType('race')}
                        className={`w-32 h-8 p-1 pl-3 pr-3 transition-colors rounded-sm ${
                          editType === 'race' ? 'bg-fg-1 text-bg-1' : 'bg-bg-1/60 hover:bg-bg-1/70 active:bg-bg-1/90'
                        }`}
                      >
                        Race points
                      </button>
                    </div>

                    <div className="flex mt-8 text-sm">
                      <div className="ml-auto mr-auto space-x-8">
                        <Button onClick={cancelMap}>Cancel</Button>
                        <Button variant="primary" onClick={createMap}>
                          Create
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="font z-10 absolute right-4 top-4 font text-[1.6vh] text-bg-1 uppercase bg-fg-1 text-fix rounded-md border-[0.5vh] border-bg-3/50">
          <p>esc</p>
        </div>
      </div>
    </>
  );
}
