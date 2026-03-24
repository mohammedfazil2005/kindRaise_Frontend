import  { useContext, useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { fetchAllCategories } from "../../../../services/apis/CampaignApi";
import type { CategoryInterface } from "../../../../interfaces/interfaces";
import { CampaignContext } from "../../../../contexts/CampainContext";

type UserExploreCategoriesPropsType={
   setPage:Dispatch<SetStateAction<number>>
}

const UserExploreCategories = ({setPage}:UserExploreCategoriesPropsType) => {
  const [active, setActive] = useState("All");

  const {setCategory}=useContext(CampaignContext)!

  const {data:categories,isLoading}=useQuery({
    queryKey:['categories'],
    queryFn:fetchAllCategories,
    staleTime:1000*60*10,
    
  })

  useEffect(()=>{
    console.log(categories)
  },[categories])

  return (
    <div className="col-span-12 md:col-span-3">

      <div className="sticky top-24">

        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Categories
        </h2>

        <div className="flex flex-col gap-2">

          {isLoading?(
            <>
                {[...Array(6)].map((_, index) => (
                <motion.div
                  key={index}
                  className="h-10 rounded-lg bg-gray-200 dark:bg-gray-700"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
                ))}
            </>
          ):(
            <>
            
           <motion.button
           
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActive("All");
                setCategory("")
                setPage(0)
              }}
              className={`px-4 py-2 rounded-lg text-left text-sm transition
                ${
                  active === "All"
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
            >
             All
            </motion.button>

          {categories?.map((cat:CategoryInterface, index:number) => (
            <motion.button
              key={index}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActive(cat.title)
                setCategory(cat.id)
                setPage(0)
              }}
              className={`px-4 py-2 rounded-lg text-left text-sm transition
                ${
                  active === cat.title
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
            >
              {cat.title}
            </motion.button>
          ))}
            </>
          )}


        </div>

      </div>

    </div>
  );
};

export default UserExploreCategories;