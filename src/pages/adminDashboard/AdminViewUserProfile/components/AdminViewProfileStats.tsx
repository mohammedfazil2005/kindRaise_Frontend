import { useQuery } from '@tanstack/react-query'
import { Folder, IndianRupee, Receipt } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { fetchProfileById } from '../../../../services/apis/ProfileApi'
import { DonationStatsCardSkeleton } from '../../../../skeltons/DonationSkeltons'



const AdminViewProfileStats = () => {
    const id=useParams()['id']

   const {data,isLoading}=useQuery({
        queryKey:["AdminViewProfileHeaderDetails",id],
        queryFn:()=>fetchProfileById(id!),
        enabled:!!id ,
        staleTime:1000*60*10
    })

  return (
    <div>
       <div className="grid md:grid-cols-3 gap-6">

        {isLoading?Array.from({length:4}).map((_,_1)=>(
          <DonationStatsCardSkeleton key={_1}/>
        )):<>
        
          <div
         className="
        bg-white dark:bg-gradient-to-br dark:from-[#0f172a] dark:to-[#111723]
        border border-gray-200 dark:border-gray-800
        rounded-2xl p-6 flex items-center justify-between
        hover:border-gray-300 dark:hover:border-gray-700
        transition"
        >

      {/* LEFT */}
      <div>
        <p className="text-sm dark:text-gray-400 text-black ">Total Donations</p>

        <h2 className="text-2xl font-semibold dark:text-white text-black mt-2">
          ₹{data?.totalAmountDonated?.toLocaleString("en-IN")||0}
        </h2>
      </div>

      {/* RIGHT ICON */}
      <div
        className={`w-12 h-12 flex items-center justify-center rounded-xl dark:text-white text-black bg-emerald`}
      >
        <IndianRupee size={18}/>
      </div>

        </div>

         <div
         className="
        bg-white dark:bg-gradient-to-br dark:from-[#0f172a] dark:to-[#111723]
        border border-gray-200 dark:border-gray-800
        rounded-2xl p-6 flex items-center justify-between
        hover:border-gray-300 dark:hover:border-gray-700
        transition"
        >

      {/* LEFT */}
      <div>
        <p className="text-sm dark:text-gray-400 text-black ">Total Transactions</p>

        <h2 className="text-2xl font-semibold dark:text-white text-black mt-2">
           {data?.totalDonations?.toLocaleString("en-IN")}
        </h2>
      </div>

      {/* RIGHT ICON */}
      <div
        className={`w-12 h-12 flex items-center justify-center rounded-xl dark:text-white text-black bg-blue`}
      >
        <Receipt size={18}/>
      </div>

        </div>

         <div
         className="
        bg-white dark:bg-gradient-to-br dark:from-[#0f172a] dark:to-[#111723]
        border border-gray-200 dark:border-gray-800
        rounded-2xl p-6 flex items-center justify-between
        hover:border-gray-300 dark:hover:border-gray-700
        transition"
        >

      {/* LEFT */}
      <div>
        <p className="text-sm dark:text-gray-400 text-black ">Campaigns Supported</p>

        <h2 className="text-2xl font-semibold dark:text-white text-black mt-2">
         {data?.totalCampaignsDonated?.toLocaleString("en-IN")}
        </h2>
      </div>

      {/* RIGHT ICON */}
      <div
        className={`w-12 h-12 flex items-center justify-center rounded-xl dark:text-white text-black bg-purple`}
      >
        <Folder size={18}/>
      </div>

        </div>

        
        
        </>
        
        }

    </div>
    </div>
  )
}

export default AdminViewProfileStats
