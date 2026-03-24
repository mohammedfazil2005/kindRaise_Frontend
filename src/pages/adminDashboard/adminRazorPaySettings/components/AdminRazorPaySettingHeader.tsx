
import { CheckCircle, CreditCard, Loader2, XCircle } from "lucide-react";
import { validateRazorPayCreds } from "../../../../services/apis/RazorPayApi";
import { useQuery } from "@tanstack/react-query";

type AdminRazorPaySettingHeaderPropsType={
    razorpayUpdated:string
}
const AdminRazorPaySettingHeader = ({razorpayUpdated}:AdminRazorPaySettingHeaderPropsType) => {
       const {data,isLoading}=useQuery({
            queryKey:["ValidatingtheRazorPaycreds",razorpayUpdated],
            queryFn:validateRazorPayCreds,
            
    })
    return (
        <div className="flex items-center justify-between">

            {/* Left */}
            <div className="flex items-center gap-3">

                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-emerald-500 text-white">
                    <CreditCard size={18} />
                </div>

                <div>
                    <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
                        Razorpay Settings
                    </h1>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Configure and manage Razorpay payment gateway for campaign donations
                    </p>
                </div>

            </div>

            {/* Right Status */}
            <div className="flex items-center gap-3">

  {/* STATUS BADGE */}
            <span
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all
                ${
                isLoading
                    ? "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                    : data?.status
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                    : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                }`}
            >

                {/* ICON */}
                {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
                ) : data?.status ? (
                <CheckCircle className="w-4 h-4" />
                ) : (
                <XCircle className="w-4 h-4" />
                )}

                {/* TEXT */}
                {isLoading
                ? "Checking..."
                : data?.status
                ? "Connected"
                : "Invalid Credentials"}
            </span>

            </div>

        </div>
    );
};

export default AdminRazorPaySettingHeader;