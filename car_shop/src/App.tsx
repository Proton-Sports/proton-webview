
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTshirt } from 'react-icons/fa';
import { PiPantsFill } from 'react-icons/pi';
import { FaHatCowboySide } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';
import { IoIosCheckmarkCircle } from "react-icons/io";
import { IoMdCheckmark } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { BiSolidPurchaseTag } from "react-icons/bi";

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedOwnedCategory, setSelectedOwnedCategory] = useState<string | null>(null);
  const [menuStatus, setmenuStatus] = useState<boolean>(false)
  const [vehicles, setVehicles] = useState({
    Sedans: [
      { name: 'Ford', price: '25000' },
      { name: 'BMW', price: '20000' },
    ],
    SUVs: [
      { name: 'Ford', price: '25000' },
      { name: 'BMW', price: '20000' },
    ],
    Coupes: [
      { name: 'Ford', price: '25000' },
      { name: 'BMW', price: '20000' },
    ],

    Trucks: [
      { name: 'Ford', price: '25000' },
      { name: 'BMW', price: '20000' },
    ],
    Sports: [
      { name: 'Lamborghini', price: '25000' },
      { name: 'BMW', price: '20000' },
    ],
  });
  const [ownedVehicles, setOwnedVehicles] = useState({
    Coupes: [
      { name: 'Ford' },
      { name: 'BMW' },
    ],

    Trucks: [
      { name: 'Ford' },
      { name: 'BMW' },
    ],
  });

  const handleCategoryClick = (category: string) => {
    setSelectedCategory((prevCategory) => (prevCategory === category ? null : category));
    setSelectedOwnedCategory(null);
  };
  
  const handleOwnedCategoryClick = (category: string) => {
    setSelectedOwnedCategory((prevCategory) => (prevCategory === category ? null : category));
    setSelectedCategory(null);
  };

  const containerVariants = {
    hidden: { opacity: 0, x: -10, transition: { duration: 0.3 } },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };
  
  const hiddenStyle = { display: 'none' };
  const visibleStyle = { display: 'block' };


  function toggleMenu(status: boolean) {
    setmenuStatus(status) // sorry for that i made toggleMenu false opens, and true closes menu
  } 


useEffect(() => {
  toggleMenu(false)
}, [])


const [buyVehicleSelected, setbuyVehicleSelected] = useState<boolean>(false)
const [selectedBuyItem, setSelectedBuyItem] = useState<string>()
  // altv data handlings

function buySelectItem() {
  console.log(selectedBuyItem)
}

function selectItem(item: string) {
  setbuyVehicleSelected(true)
  setSelectedBuyItem(item)
    const element = document.getElementsByClassName('hide-display')[0] as HTMLElement | undefined;

    if (element) {
      element.style.display = 'true';
    }

}


function closeSelectItem() {


  setTimeout(() => {
    const element = document.getElementsByClassName('hide-display')[0] as HTMLElement | undefined;

    if (element) {
      element.style.display = 'true';
    }
  }, 200)
}






  return (
    <>
    <div className={menuStatus ? 'opacity-0 transition-opac z-50' : 'opacity-100 transition-opac z-50'}>

    <div className='font'>
      <div className='rounded-sm absolute top-[50vh] left-[50vh] -translate-x-1/2 -translate-y-1/2 p-4 z-10 flex w-[82vh] h-[80vh]'>

        <div className=''>
                  <div className='ml-auto mr-auto pr-[0.8vh] w-fit'>
                    <h1 className='text-[2.6vh] text-white uppercase font-bold text-center '>
                      Buy new vehicle
                    </h1>
                    <h3 className='text-[1.8vh] text-white w-[70%] mt-[-1vh] text-center ml-auto mr-auto'>
                      Choose your vehicle from the list
                    </h3>
                  </div>
                <div className='mt-[3vh] overflow-x-hidden pr-[0.8vh] max-h-[60vh]'>

                  <div className=' bg-semiblack pt-[2vh] rounded-md overflow-hidden w-[30vh] text-[1.8vh]'>
                    <h2 className='text-white uppercase mb-[2vh] text-center'>Categories</h2>
                    <motion.div>
                      {Object.keys(vehicles).map((category) => (
                        <motion.button
                          key={category}
                          className={`w-full hover:bg-[#2f2f3f] transition-colors ${
                            selectedCategory === category ? 'bg-[#2f2f3f]' : ''
                          }`}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleCategoryClick(category)}
                        >
                          <motion.div
                            className={`text-white flex items-center bg-[rgba(0,0,0,0.6)] p-[1.2vh] border-b-[0.01vh] border-b-[rgba(255,255,255,0.2)] w-full ${
                              selectedCategory === category ? 'bg-[#2f2f3f]' : ''
                            }`}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                          >
                            <div className='items-center flex mr-auto space-x-[0.8vh]'>
                              <p>{category} </p>
                            </div>
                            <div className='ml-auto'>
                            <IoIosArrowForward
                              style={{
                                transform: selectedCategory === category ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform 0.3s ease',
                              }}
                            />
                            </div>
                          </motion.div>
                        </motion.button>
                      ))}
                    </motion.div>

                    {ownedVehicles && (
                      <motion.div>
                        <h2 className='text-white mb-[1.6vh] text-center mt-[2vh]'>
                          Already owned vehicles
                        </h2>
                        {Object.keys(ownedVehicles).map((category) => (
                          <motion.button
                            key={category}
                            className={`w-full hover:bg-[#2f2f3f] transition-colors ${
                              selectedOwnedCategory === category ? 'bg-[#2f2f3f]' : ''
                            }`}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleOwnedCategoryClick(category)}
                          >
                            <motion.div
                              className={`text-white flex items-center bg-[rgba(0,0,0,0.6)] p-[1.2vh] border-b-[0.01vh] border-b-[rgba(255,255,255,0.2)] w-full ${
                                selectedOwnedCategory === category ? 'bg-[#2f2f3f]' : ''
                              }`}
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                            >
                              <div className='items-center flex mr-auto space-x-[0.8vh]'>
                                <p>{category} </p>
                                {category === 'Shirts' && <FaTshirt />}
                                {category === 'Pants' && <PiPantsFill />}
                                {category === 'Hats' && <FaHatCowboySide />}
                              </div>
                              <div className='ml-auto'>
                              <IoIosArrowForward
                                style={{
                                  transform: selectedOwnedCategory === category ? 'rotate(180deg)' : 'rotate(0deg)',
                                  transition: 'transform 0.3s ease',
                                }}
                              />
                              </div>
                            </motion.div>
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                  </div>
          
        </div>





        <div className='mt-[11.3vh] overflow-x-hidden pr-[0.8vh] max-h-[60vh]'>
      <motion.div
        className='bg-[rgba(0,0,0,0.6)] pt-[2vh] rounded-md overflow-hidden w-[30vh] text-[1.8vh] h-fit ml-[2vh]'
        initial='hidden'
        animate={selectedOwnedCategory ? 'visible' : 'hidden'}
        exit='hidden'
        variants={containerVariants}
        style={selectedOwnedCategory ? visibleStyle : hiddenStyle}
      >
        {selectedOwnedCategory && (
          <motion.div>
            <motion.h2
              className='text-white uppercase mb-[2vh] text-center'
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ ease: 'easeInOut', duration: 0.3 }}
            >
              {selectedOwnedCategory}
            </motion.h2>
            {ownedVehicles[selectedOwnedCategory as keyof typeof ownedVehicles]?.map((item) => (
              <motion.button
                key={item.name}
                className={`w-full hover:bg-[#2f2f3f] transition-colors`}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className={`text-white flex items-center bg-[rgba(0,0,0,0.6)] p-[1.2vh] border-b-[0.01vh] border-b-[rgba(255,255,255,0.2)] w-full`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ ease: 'easeInOut', duration: 0.3, delay: 0.1 }}
                >
                  <div className='items-center flex mr-auto space-x-[0.8vh]'>
                    <p>{item.name} </p>
                  </div>
                  <div className='ml-auto text-[2vh]'>
                    <p><IoIosCheckmarkCircle /></p>
                  </div>
                </motion.div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>

    
    <div className='mt-[11.3vh] overflow-x-hidden pr-[0.8vh] max-h-[60vh]'>
      <motion.div
        className='bg-[rgba(0,0,0,0.6)] pt-[2vh] rounded-md overflow-hidden w-[30vh] text-[1.8vh] h-fit ml-[2vh]'
        initial='hidden'
        animate={selectedCategory ? 'visible' : 'hidden'}
        exit='hidden'
        variants={containerVariants}
        style={selectedCategory ? visibleStyle : hiddenStyle}
      >
        {selectedCategory && (
          <motion.div>
            <motion.h2
              className='text-white uppercase mb-[2vh] text-center'
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ ease: 'easeInOut', duration: 0.3 }}
            >
              {selectedCategory}
            </motion.h2>
            {vehicles[selectedCategory as keyof typeof vehicles]?.map((item) => (
              <motion.button
              onClick={() => selectItem(item.name)}
                key={item.name}
                className={`w-full hover:bg-[#2f2f3f] transition-colors`}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className={`text-white flex items-center bg-[rgba(0,0,0,0.6)] p-[1.2vh] border-b-[0.01vh] border-b-[rgba(255,255,255,0.2)] w-full`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ ease: 'easeInOut', duration: 0.3, delay: 0.1 }}
                >
                  <div className='items-center flex mr-auto space-x-[0.8vh]'>
                    <p>{item.name} </p>
                  </div>
                  <div className='ml-auto text-[1.3vh]'>
                    <p>{item.price}$</p>
                  </div>
                </motion.div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </motion.div>
      </div>







      </div>
    </div>

    <div className='font z-10 absolute top-[10vh] right-[6vh] -translate-x-1/2 -translate-y-1/2 font text-[1.6vh] text-black  uppercase bg-[rgb(255,255,255)] text-fix rounded-md border-[0.5vh] border-[rgba(167,167,167,0.6)]'>
        <p>esc</p>
    </div>

    <div className='bottom-[8vh] right-[10vh] absolute text-black font'>
      <div className={buyVehicleSelected ? 'opacity-0 transition-opacity hide-display' : 'opacity-100 transition-opacity'}>
          <div className='flex'>

          <div className='mr-[3vh] flex items-center space-x-[1vh] bg-[rgba(0,0,0,0.6)] p-[1vh] pl-[2vh] pr-[2vh] rounded-sm uppercase text-white text-[1.6vh]'>
            <p>Pick a color</p>

            <button className='bg-white text-white w-[2.6vh] h-[2.6vh] rounded-full'>
              .
            </button>
            <button className='bg-red-600 text-red-600 w-[2.6vh] h-[2.6vh] rounded-full'>
              .
            </button>
            <button className='bg-blue-500 text-blue-500 w-[2.6vh] h-[2.6vh] rounded-full border-[0.4vh] border-[#ce93dd]'>
              .
            </button>
            <button className='bg-yellow-500 text-yellow-500 w-[2.6vh] h-[2.6vh] rounded-full'>
              .
            </button>
            <button className='bg-green-600 text-green-600 w-[2.6vh] h-[2.6vh] rounded-full'>
              .
            </button>
          </div>
          <div className='space-x-[1.4vh] text-[2vh]  bg-[rgba(0,0,0,0.6)] p-[1vh] pl-[2vh] pr-[2vh] rounded-sm'>
            <button className='bg-[#6acf5d] pl-[2vh] pr-[2vh] p-[0.6vh] rounded-sm' onClick={() => buySelectItem()}><BiSolidPurchaseTag /></button>
            <button className='bg-[#f35656] pl-[2vh] pr-[2vh] p-[0.6vh] rounded-sm' onClick={() => closeSelectItem()}><IoClose /></button>
          </div>

          </div>
      </div>
    </div>

  </div>

  <div className={menuStatus ? 'opacity-0 transition-opac-bulbs' : 'opacity-100 transition-opac-bulbs'}>
    <div className='light-bulb'>
      <p>.</p>
    </div>
    <div className='light-bulb2'>
      <p>.</p>
    </div>

    <div className='light-bulb3'>
      <p>.</p>
    </div>
  </div>
  </>
  );
}

export default App;
