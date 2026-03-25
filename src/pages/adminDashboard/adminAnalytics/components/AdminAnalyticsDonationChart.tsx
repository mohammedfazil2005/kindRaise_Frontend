
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { adminDashboardAnalyticsDonationChart } from "../../../../services/apis/AdminDashboardApi";
import { ChartSkeleton } from "../../../../skeltons/CampaignSkeltons";
import { useQuery } from "@tanstack/react-query";



const AdminAnalyticsDonationChart = () => {
       const {data,isLoading}=useQuery({
        queryKey:["AdminAnalyticsDonationChart"],
        queryFn:adminDashboardAnalyticsDonationChart
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
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 mb-8">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                Monthly Donations
            </h2>
           
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
        }
        </>
    );
};

export default AdminAnalyticsDonationChart;