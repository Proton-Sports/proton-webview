import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaTshirt } from "react-icons/fa";
import { PiPantsFill } from "react-icons/pi";
import { FaHatCowboySide } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { IoMdCheckmark } from "react-icons/io";
function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedOwnedCategory, setSelectedOwnedCategory] = useState<
    string | null
  >(null);
  const [menuStatus, setmenuStatus] = useState<boolean>(false);
  const [clothes, setClothes] = useState({
    Shirts: [
      { name: "Striped Shirt", price: "25" },
      { name: "Graphic Tee", price: "20" },
    ],
    Pants: [
      { name: "Jeans", price: "40" },
      { name: "Chinos", price: "30" },
    ],
    Hats: [
      { name: "Blueberry Hat", price: "15" },
      { name: "Snapback Cap", price: "20" },
    ],
  });
  const [ownedClothes, setOwnedClothes] = useState({
    Shirts: [
      { name: "Striped Shirt", choosed: true },
      { name: "Graphic Tee", choosed: false },
    ],
    Pants: [{ name: "Jeans", choosed: false }],
  });

  const handleCategoryClick = (category: string) => {
    setSelectedCategory((prevCategory) =>
      prevCategory === category ? null : category
    );
    setSelectedOwnedCategory(null);
  };

  const handleOwnedCategoryClick = (category: string) => {
    setSelectedOwnedCategory((prevCategory) =>
      prevCategory === category ? null : category
    );
    setSelectedCategory(null);
  };

  const containerVariants = {
    hidden: { opacity: 0, x: -10, transition: { duration: 0.3 } },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  const hiddenStyle = { display: "none" };
  const visibleStyle = { display: "block" };

  function toggleMenu(status: boolean) {
    setmenuStatus(status); // sorry for that i made toggleMenu false opens, and true closes menu
  }

  // altv data handlings

  useEffect(() => {
    // @ts-ignore
    alt.on("shop:cloth:menuStatus", (value: boolean) => {
      toggleMenu(value); // sorry for that I made toggleMenu false opens, and true closes the menu
    });
  
    // @ts-ignore
    alt.on("shop:cloth:ownedClothes", (data) => {
      setOwnedClothes(data);
  
      {
        /*
        send data in this format
        {
          Shirts: [
            { name: 'Striped Shirt', choosed: true },
            { name: 'Graphic Tee', choosed: false },
          ],
          Pants: [
            { name: 'Jeans', choosed: false },
          ],
        }
        */
      }
    });
  
    // @ts-ignore
    alt.on("shop:cloth:notOwnedClothes", (data) => {
      setClothes(data);
  
      {
        /*
        send data in this format
  
        {
          Shirts: [
            { name: 'Striped Shirt', price: '25' },
            { name: 'Graphic Tee', price: '20' },
          ],
          Pants: [
            { name: 'Jeans', price: '40' },
            { name: 'Chinos', price: '30' },
          ],
          Hats: [
            { name: 'Blueberry Hat', price: '15' },
            { name: 'Snapback Cap', price: '20' },
          ],
        }
        */
      }
    });
  
    return () => {
    // @ts-ignore
      alt.off("shop:cloth:ownedClothes");
    // @ts-ignore
      alt.off("shop:cloth:menuStatus");
    // @ts-ignore
      alt.off("shop:cloth:notOwnedClothes");
    };
  }, []);
  

  function buyItem(item: string) {
    // @ts-ignore
    alt.emit("shop:cloth:buyItem", item);
  }

  function wearItem(item: string, itemStatus: boolean) {
    if (itemStatus === true) {
      // @ts-ignore
      alt.emit("shop:cloth:unequipItem", item);
    } else {
      // @ts-ignore
      alt.emit("shop:cloth:wearItem", item);
    }
  }

  return (
    <>
      <div
        className={
          menuStatus
            ? "opacity-0 transition-opac z-50"
            : "opacity-100 transition-opac z-50"
        }
      >
        <div className="font">
          <div className="rounded-sm absolute top-[50vh] left-[50vh] -translate-x-1/2 -translate-y-1/2 p-4 z-10 flex w-[82vh] h-[80vh]">
            <div className="">
              <div className="ml-auto mr-auto pr-[0.8vh] w-fit">
                <h1 className="text-[2.6vh] text-white uppercase font-bold text-center ">
                  Change your outfit
                </h1>
                <h3 className="text-[1.8vh] text-white w-[70%] mt-[-1vh] text-center ml-auto mr-auto">
                  Choose your clothes from the list
                </h3>
              </div>
              <div className="mt-[3vh] overflow-x-hidden pr-[0.8vh] max-h-[60vh]">
                <div className=" bg-semiblack pt-[2vh] rounded-md overflow-hidden w-[30vh] text-[1.8vh]">
                  <h2 className="text-white uppercase mb-[2vh] text-center">
                    Categories
                  </h2>
                  <motion.div>
                    {Object.keys(clothes).map((category) => (
                      <motion.button
                        key={category}
                        className={`w-full hover:bg-midnight transition-colors ${
                          selectedCategory === category ? "bg-midnight" : ""
                        }`}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleCategoryClick(category)}
                      >
                        <motion.div
                          className={`text-white flex items-center bg-semiblack p-[1.2vh] border-b-[0.01vh] border-b-darkwhite w-full ${
                            selectedCategory === category ? "bg-midnight" : ""
                          }`}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          <div className="items-center flex mr-auto space-x-[0.8vh]">
                            <p>{category} </p>
                            {category === "Shirts" && <FaTshirt />}
                            {category === "Pants" && <PiPantsFill />}
                            {category === "Hats" && <FaHatCowboySide />}
                          </div>
                          <div className="ml-auto">
                            <IoIosArrowForward
                              style={{
                                transform:
                                  selectedCategory === category
                                    ? "rotate(180deg)"
                                    : "rotate(0deg)",
                                transition: "transform 0.3s ease",
                              }}
                            />
                          </div>
                        </motion.div>
                      </motion.button>
                    ))}
                  </motion.div>

                  {ownedClothes && (
                    <motion.div>
                      <h2 className="text-white mb-[1.6vh] text-center mt-[2vh]">
                        Already owned clothes
                      </h2>
                      {Object.keys(ownedClothes).map((category) => (
                        <motion.button
                          key={category}
                          className={`w-full hover:bg-midnight transition-colors ${
                            selectedOwnedCategory === category
                              ? "bg-midnight"
                              : ""
                          }`}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleOwnedCategoryClick(category)}
                        >
                          <motion.div
                            className={`text-white flex items-center bg-semiblack p-[1.2vh] border-b-[0.01vh] border-b-darkwhite w-full ${
                              selectedOwnedCategory === category
                                ? "bg-midnight"
                                : ""
                            }`}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                          >
                            <div className="items-center flex mr-auto space-x-[0.8vh]">
                              <p>{category} </p>
                              {category === "Shirts" && <FaTshirt />}
                              {category === "Pants" && <PiPantsFill />}
                              {category === "Hats" && <FaHatCowboySide />}
                            </div>
                            <div className="ml-auto">
                              <IoIosArrowForward
                                style={{
                                  transform:
                                    selectedOwnedCategory === category
                                      ? "rotate(180deg)"
                                      : "rotate(0deg)",
                                  transition: "transform 0.3s ease",
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

            <div className="mt-[11.3vh] overflow-x-hidden pr-[0.8vh] max-h-[60vh]">
              <motion.div
                className="bg-semiblack pt-[2vh] rounded-md overflow-hidden w-[30vh] text-[1.8vh] h-fit ml-[2vh]"
                initial="hidden"
                animate={selectedOwnedCategory ? "visible" : "hidden"}
                exit="hidden"
                variants={containerVariants}
                style={selectedOwnedCategory ? visibleStyle : hiddenStyle}
              >
                {selectedOwnedCategory && (
                  <motion.div>
                    <motion.h2
                      className="text-white uppercase mb-[2vh] text-center"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ ease: "easeInOut", duration: 0.3 }}
                    >
                      {selectedOwnedCategory}
                    </motion.h2>
                    {ownedClothes[
                      selectedOwnedCategory as keyof typeof ownedClothes
                    ]?.map((item) => (
                      <motion.button
                        onClick={() => wearItem(item.name, item.choosed)}
                        key={item.name}
                        className={`w-full hover:bg-midnight transition-colors`}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div
                          className={`text-white flex items-center bg-semiblack p-[1.2vh] border-b-[0.01vh] border-b-darkwhite w-full`}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{
                            ease: "easeInOut",
                            duration: 0.3,
                            delay: 0.1,
                          }}
                        >
                          <div className="items-center flex mr-auto space-x-[0.8vh]">
                            <p>{item.name} </p>
                          </div>
                          <div className="ml-auto text-[2vh]">
                            <p>
                              {item.choosed ? (
                                <IoIosCheckmarkCircle />
                              ) : (
                                <IoMdCheckmark />
                              )}
                            </p>
                          </div>
                        </motion.div>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            </div>

            <div className="mt-[11.3vh] overflow-x-hidden pr-[0.8vh] max-h-[60vh]">
              <motion.div
                className="bg-semiblack pt-[2vh] rounded-md overflow-hidden w-[30vh] text-[1.8vh] h-fit ml-[2vh]"
                initial="hidden"
                animate={selectedCategory ? "visible" : "hidden"}
                exit="hidden"
                variants={containerVariants}
                style={selectedCategory ? visibleStyle : hiddenStyle}
              >
                {selectedCategory && (
                  <motion.div>
                    <motion.h2
                      className="text-white uppercase mb-[2vh] text-center"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ ease: "easeInOut", duration: 0.3 }}
                    >
                      {selectedCategory}
                    </motion.h2>
                    {clothes[selectedCategory as keyof typeof clothes]?.map(
                      (item) => (
                        <motion.button
                          onClick={() => buyItem(item.name)}
                          key={item.name}
                          className={`w-full hover:bg-midnight transition-colors`}
                          whileTap={{ scale: 0.95 }}
                        >
                          <motion.div
                            className={`text-white flex items-center bg-semiblack p-[1.2vh] border-b-[0.01vh] border-b-darkwhite w-full`}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{
                              ease: "easeInOut",
                              duration: 0.3,
                              delay: 0.1,
                            }}
                          >
                            <div className="items-center flex mr-auto space-x-[0.8vh]">
                              <p>{item.name} </p>
                            </div>
                            <div className="ml-auto text-[1.3vh]">
                              <p>{item.price}$</p>
                            </div>
                          </motion.div>
                        </motion.button>
                      )
                    )}
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </div>

        <div className="z-10 absolute top-[10vh] right-[6vh] -translate-x-1/2 -translate-y-1/2 font text-[1.6vh] text-black  uppercase bg-white text-fix rounded-md border-[0.5vh] border-grayshade">
          <p>esc</p>
        </div>
      </div>

      <div
        className={
          menuStatus
            ? "opacity-0 transition-opac-bulbs"
            : "opacity-100 transition-opac-bulbs"
        }
      >
        <div className="light-bulb">
          <p>.</p>
        </div>
        <div className="light-bulb2">
          <p>.</p>
        </div>

        <div className="light-bulb3">
          <p>.</p>
        </div>
      </div>
    </>
  );
}

export default App;
