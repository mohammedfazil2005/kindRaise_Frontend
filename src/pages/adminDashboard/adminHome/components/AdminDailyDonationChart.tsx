
import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { fetchDailyDonations } from "../../../../services/apis/AdminDashboardApi";
import { ChartSkeleton } from "../../../../skeltons/CampaignSkeltons";

const AdminDailyDonationChart = () => {
    const {data,isLoading}=useQuery({
        queryKey:["AdminDailyDonationChart"],
        queryFn:fetchDailyDonations,
        staleTime:1000*60*10
    })

        const formattedData = data?.map((item:any) => {
        const date = new Date(item.month);

        return {
            day: date.toLocaleDateString("en-US", { weekday: "short" }), // Mon
            amount: item.totalAmount,
        };
        });
 

  return (
    <>{isLoading?<ChartSkeleton/>:
    <div className="bg-[#0f172a] border border-gray-800 rounded-2xl p-5 shadow-lg">
      
      {/* 🔥 Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-lg font-semibold">
          Daily Donations
        </h2>
        <span className="text-emerald-400 text-sm font-medium">
          Last 7 Days
        </span>
      </div>

      {/* 📊 Chart */}
      <div style={{ width: "100%", height: 250 }}>
        <ResponsiveContainer width="100%" height={250}>
  <LineChart data={formattedData}>
    
    <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />

    <XAxis
      dataKey="day"
      stroke="#9ca3af"
      tick={{ fontSize: 12 }}
    />

    <YAxis
      stroke="#9ca3af"
      tick={{ fontSize: 12 }}
    />

    <Tooltip
      contentStyle={{
        backgroundColor: "#020617",
        border: "1px solid #1f2937",
        borderRadius: "10px",
        color: "#fff",
      }}
    />

    <Line
      type="monotone"
      dataKey="amount"
      stroke="#10b981"
      strokeWidth={3}
      dot={{ r: 4 }}
      activeDot={{ r: 6 }}
    />
  </LineChart>
</ResponsiveContainer>
      </div>
    </div>
}
    </>
  );
};

export default AdminDailyDonationChart;