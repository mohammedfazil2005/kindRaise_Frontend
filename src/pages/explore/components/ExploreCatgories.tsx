import { useState, type Dispatch, type SetStateAction } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {SlidersHorizontal, X} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllCategories } from "../../../services/apis/CampaignApi";
import type { CategoryInterface } from "../../../interfaces/interfaces";

type ExploreCategoriesProps={
  setCategory:Dispatch<SetStateAction<string>>;
  setPage:Dispatch<SetStateAction<number>>;
}


const ExploreCatgories = ({setCategory,setPage}:ExploreCategoriesProps) => {

  const [active, setActive] = useState("All");
  const [open, setOpen] = useState(false);

  const {data:categories,isLoading}=useQuery({
    queryKey:['categories'],
    queryFn:fetchAllCategories
  })

  return (
    <>
      {/* Mobile Filter Button */}
        <button
      onClick={() => setOpen(true)}
      className="md:hidden mb-4 flex w-[200px] items-center gap-2 bg-emerald-500 text-white font-medium px-4 py-2 rounded-lg shadow"
    >
      <SlidersHorizontal size={18} />
      Filter Categories
    </button>

      {/* Desktop Sidebar */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden md:block col-span-12 md:col-span-3 md:sticky md:top-24 h-fit"
      >
        <div className="bg-white shadow-sm p-6 rounded-2xl">

          <h3 className="font-extrabold text-gray-700 mb-5 text-lg">
            Categories
          </h3>

          <div className="space-y-2">
            
            {isLoading? <>
                {[...Array(6)].map((_, index) => (
                <motion.div
                  key={index}
                  className="h-10 rounded-lg bg-gray-200 dark:bg-gray-700"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
                ))}
            </>: <>
             <motion.button
                 
                  onClick={() => {
                    setActive('All')
                    setCategory('')
                    setPage(0)
                  }}
                  whileHover={{ scale: 1.03, x: 4 }}
                  whileTap={{ scale: 0.96 }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition
                  ${
                    active === 'All'
                      ? "bg-emerald-500 text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {/* <Icon size={18} /> */}
                  All
                </motion.button>
                {categories.map((category:CategoryInterface) => (

             
                <motion.button
                  key={category.title}
                  onClick={() => {
                    setActive(category.id)
                    setCategory(category.id)
                  }}
                  whileHover={{ scale: 1.03, x: 4 }}
                  whileTap={{ scale: 0.96 }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition
                  ${
                    active === category.id
                      ? "bg-emerald-500 text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {/* <Icon size={18} /> */}
                  {category.title}
                </motion.button>
             

            ))}
            </>}

          </div>

        </div>
      </motion.div>

      {/* ================= MOBILE OFFCANVAS ================= */}

      <AnimatePresence>

        {open && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/40 z-40 md:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 left-0 h-full w-[280px] bg-white z-50 p-6 shadow-xl md:hidden"
            >

              {/* Header */}
              <div className="flex items-center justify-between mb-5">

                <h3 className="font-bold text-lg">
                  Categories
                </h3>

                <button onClick={() => setOpen(false)}>
                  <X size={20} />
                </button>

              </div>

              {/* Categories */}
              <div className="space-y-2">

                {categories?<>
                <>
                 <button
                     
                      onClick={() => {
                        setActive('All');
                        setCategory('')
                        setOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition
                      ${
                        active === 'All'
                          ? "bg-emerald-500 text-white shadow-md"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {/* <Icon size={18} /> */}
                      All
                    </button>
                {categories.map((category:CategoryInterface)=>(
                   <button
                      key={category.id}
                      onClick={() => {
                        setActive(category.id);
                        setCategory(category.id)
                        setOpen(false);
                        setPage(0)
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition
                      ${
                        active === category.id
                          ? "bg-emerald-500 text-white shadow-md"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {/* <Icon size={18} /> */}
                      {category.title}
                    </button>
                ))}</>
                </>:""}
                

              </div>

            </motion.div>
          </>
        )}

      </AnimatePresence>
    </>
  );
};

export default ExploreCatgories;