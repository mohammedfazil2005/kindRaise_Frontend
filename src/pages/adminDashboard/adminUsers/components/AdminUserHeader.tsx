
import { motion } from "framer-motion";
import { Search, Filter, Users, Download } from "lucide-react";
import { useEffect, useState, type SetStateAction } from "react";
import type React from "react";
import { ClipLoader } from "react-spinners";
import type { UserInterface } from "../../../../interfaces/interfaces";
import { toaster } from "../../../../services/Toaster";
import { getAllUsersInOneCall } from "../../../../services/apis/ProfileApi";
import * as XLSX from "xlsx";
type AdminUserHeaderProps={
    setSearch:React.Dispatch<SetStateAction<string>>
    setRole:React.Dispatch<SetStateAction<string>>
    setPage:React.Dispatch<SetStateAction<number>>
}

const AdminUserHeader = ({setSearch,setRole,setPage}:AdminUserHeaderProps) => {

    const [query,setQuery]=useState("")
    const [loader,setLoader]=useState(false)

    useEffect(()=>{
        let timer=setTimeout(()=>{
            setSearch(query)
        },800)
        return ()=>clearTimeout(timer);
    },[query])


    const onExportClick=async()=>{
            setLoader(true)
            try {
                const apiResponse=await getAllUsersInOneCall()
                if(!apiResponse||apiResponse.length==0){
                    toaster("There is no Users found to export.")
                    return
                }
                excelSave(apiResponse)
    
            } catch (error) {
                toaster("Something went wrong please contact the kindraise admin.")
                console.log(error)
            }finally{
                setLoader(false)
            }
        }
    
      const excelSave = (apiResponse: Array<UserInterface>) => {

        const formattedData = apiResponse.map((item: UserInterface) => ({
            "User ID": item.id,
            "Full Name": item.fullName,
            "Username": item.username,
            "Role": item.role,
            "Phone": item.phone,
            "Status": item.status,
            "Joined Date": new Date(item.createdAt).toLocaleString(),
        }));


        const worksheet = XLSX.utils.json_to_sheet(formattedData);

 
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

        // 💾 Download file
        XLSX.writeFile(workbook, "Users.xlsx");
    };

    return (
        <div className="space-y-6">

            {/* Top Header */}
            <div className="flex items-center justify-between">

                {/* Left */}
                <div className="flex items-center gap-3">

                    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-emerald-500 text-white">
                        <Users size={18} />
                    </div>

                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
                            User Management
                        </h1>

                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            View and manage all platform users
                        </p>
                    </div>

                </div>

                    <motion.button
                    onClick={onExportClick}
                    disabled={loader}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full 
                    text-white shadow-md 
                    bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-700
                    bg-[length:200%_100%] bg-left hover:bg-right
                    transition-all duration-500"
                        >
                           {loader?<ClipLoader size={16} color="white"/>:<>
                            <Download size={16} />
                            Export 
                           </>}
                        </motion.button>

            </div>

            {/* Search + Filters */}
            <div className="flex gap-4 flex-col md:flex-row">

                {/* Search */}
                <div className="relative flex-1">

                    <Search
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                        onChange={(e)=>setQuery(e.target.value)}
                        type="text"
                        placeholder="Search users by name"
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200
                        dark:border-gray-700
                        bg-white dark:bg-gray-900
                        text-gray-700 dark:text-gray-200
                        placeholder-gray-400
                        focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                    />

                </div>

                {/* Role Filter */}
                <div className="relative">

                    <Filter
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <select
                    onChange={(e)=>{
                        setRole(e.target.value)
                        setPage(0)
                    }}
                        className="pl-9 pr-6 py-3 rounded-xl border border-gray-200
                         dark:border-gray-700
                         bg-white dark:bg-gray-900
                         text-gray-700 dark:text-gray-200
                        focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                        <option value={""}>All Users</option>
                        <option value={"USER"}>Donors</option>
                        <option value={"ADMIN"}>Admins</option>
                    </select>

                </div>

            </div>

        </div>
    );
};

export default AdminUserHeader;