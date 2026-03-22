
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Eye, Trash2 } from "lucide-react";
import { fetchAllUsers } from "../../../../services/apis/UserApi";
import { useEffect } from "react";
import { DonationTableSkeleton } from "../../../../skeltons/CampaignSkeltons";
import type { UserInterface } from "../../../../interfaces/interfaces";

type AdminUserContentProps={
    search:string
    role:string
}

const AdminUserContent = ({search,role}:AdminUserContentProps) => {
    const {data,isLoading}=useQuery({
        queryKey:["adminUserContent",search,role],
        queryFn:()=>fetchAllUsers(0,search,role)
    })

    useEffect(()=>{
        console.log(data)
    },[data])


    return (
        <>
        {isLoading?<DonationTableSkeleton/>:
        data?.content?.length==0?
              <div className="text-center py-16">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                {search ? "No Results Found" : "No Users Available"}
            </h2>

                <p className="text-sm text-gray-500 mt-2">
                    {search
                    ? `No users or admins found for "${search}". Try a different keyword.`
                    : "There are no users or admins to display at the moment."}
                </p>
                </div>
        :
        <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden"
        >

            {/* Table Header */}
            <div className="grid grid-cols-5 gap-4 px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                <span>User</span>
                <span>username</span>
                <span>Role</span>
                <span>Status</span>
                <span>Actions</span>
            </div>

            {/* Users List */}
            {data?.content?.map((user:UserInterface, index:number) => (
                <motion.div
                    key={user.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="grid grid-cols-5 gap-4 px-6 py-4 items-center text-sm border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >

                    {/* User Info */}
                    <div className="flex items-center gap-3">
                        <img
                             src={import.meta.env.VITE_KINDRAISE_API_URL+`/user/profile/image/${user.id}`}
                            alt={user.fullName}
                            className="w-9 h-9 rounded-full object-cover"
                        />
                        <span className="font-medium text-gray-800 dark:text-gray-200">
                            {user.fullName}
                        </span>
                    </div>

                    {/* Email */}
                    <span className="text-gray-500 dark:text-gray-400">
                        {user.username}
                    </span>

                    {/* Role */}
                    <span className="text-gray-500 dark:text-gray-400">
                        {user.role}
                    </span>

                    {/* Status Badge */}
                    <span>
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold
              ${user.status === "ACTIVE"
                                    ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30"
                                    : "bg-red-100 text-red-600 dark:bg-red-900/30"
                                }`}
                        >
                            {user.status}
                        </span>
                    </span>

                    {/* Actions */}
                    <div className="flex items-center gap-3">

                        <button className="text-blue-500 hover:text-blue-600">
                            <Eye size={18} />
                        </button>

                        <button className="text-red-500 hover:text-red-600">
                            <Trash2 size={18} />
                        </button>

                    </div>

                </motion.div>
            ))}
        </motion.div>
}
        </>
    );
};

export default AdminUserContent;