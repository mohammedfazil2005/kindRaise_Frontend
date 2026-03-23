import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { userDashboardChart } from "../../../../services/apis/UserDashboardApi";
import { ChartSkeleton } from "../../../../skeltons/CampaignSkeltons";



const AdminViewProfileChart = () => {
  const id=useParams()['id']
  const {data,isLoading}=useQuery({
    queryKey:["AdminViewProfileChartDetails",id],
    queryFn:()=>userDashboardChart(id!),
    staleTime:1000*60*10
    
  })


  const allMonths = Array.from({ length: 12 }, (_, i) => {
  const date = new Date(2026, i); // year, month index
    return {
        month: date.toISOString().slice(0, 7), // "YYYY-MM"
        totalAmount: 0
    };
    });

    const formattedData = allMonths.map((m) => {
    const found = data?.find((d:any)=> d.month === m.month);
    return found ? found : m;
    });


  return (
    <>
    {isLoading?<ChartSkeleton/>:
    <div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Donation Activity
        </h3>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={formattedData}>
            <XAxis dataKey="month" tickFormatter={(value) => {
                    const date = new Date(value + "-01"); // convert "2026-03" → Date
                    return date.toLocaleString("default", { month: "short" });
                }}/>
            <YAxis />
            <Tooltip />
            <Line
                type="monotone"
                    dataKey="totalAmount" // ✅ FIXED
                    stroke="#10b981"
                    strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
}
    </>
  )
}

export default AdminViewProfileChart
