
import { Search, X } from "lucide-react";
import { useEffect, useRef, useState, type SetStateAction } from "react";
import { getTotalNumberOfPendingRequests } from "../../../../services/apis/CampaignApi";
import { useQuery } from "@tanstack/react-query";

type CampaignHeaderSearchType={
  setSearch:React.Dispatch<SetStateAction<string>>
  setPage:React.Dispatch<SetStateAction<number>>
}

const AdminCampaignRequestHeader = ({setSearch,setPage}:CampaignHeaderSearchType) => {
  const [query, setQuery] = useState("");

  const inputRef:any = useRef(null);

  const {data:TotalPendingRequestscount}=useQuery({
        queryKey:["ManageCampaingRequestCount"],
        queryFn:getTotalNumberOfPendingRequests,
        staleTime:1000*60*10
    })

    useEffect(() => {
      const handleKey = (e:any) => {
        if (e.ctrlKey && e.key === "k") {
          e.preventDefault();
          inputRef.current.focus();
        }
      };

      window.addEventListener("keydown", handleKey);
      return () => window.removeEventListener("keydown", handleKey);
    }, []);

    useEffect(()=>{
        const timer = setTimeout(() => {
          setSearch(query);
          setPage(0)
        }, 800);

      return () => {
        clearTimeout(timer);
      };
    },[query])

  const handleClear = () => {
    setQuery("");
  };
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Campaign Requests
          </h1>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Review and approve fundraising campaign requests from users
          </p>
        </div>

        {/* Pending Counter */}
     {TotalPendingRequestscount&&(
            <div
      className={`px-4 py-2 rounded-xl text-sm font-semibold
        ${
          TotalPendingRequestscount > 0
            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300"
            : "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
        }
      `}
    >
      {TotalPendingRequestscount > 0
        ? `${TotalPendingRequestscount} Pending Requests`
        : "All Clear 🎉"}
</div>
     )}

      </div>

      {/* Search + Filters */}
      <div className="flex gap-4 flex-col md:flex-row">

        {/* Search */}
       <div className="relative flex-1 group">

      {/* Input */}
      <input
        type="text"
        ref={inputRef}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search campaigns, categories, creators..."
        className="
          w-full pl-12 pr-20 py-3
          rounded-2xl
          border border-gray-200 dark:border-gray-700
          bg-white/80 dark:bg-gray-900/80 backdrop-blur
          text-gray-700 dark:text-gray-200
          placeholder-gray-400
          shadow-sm
          focus:outline-none focus:ring-2 focus:ring-emerald-500
          focus:border-emerald-500
          transition-all duration-200
        "
      />

      {/* Search Icon */}
      <Search
        size={18}
        className="
          absolute left-4 top-1/2 -translate-y-1/2
          text-gray-400
          group-focus-within:text-emerald-500
          transition
        "
      />

      {/* Clear Button */}
      {query && (
        <button
          onClick={handleClear}
          className="
            absolute right-12 top-1/2 -translate-y-1/2
            text-gray-400 hover:text-red-500
            transition
          "
        >
          <X size={16} />
        </button>
      )}

      {/* Shortcut Hint */}
      <div
        className="
          absolute right-3 top-1/2 -translate-y-1/2
          text-xs text-gray-400
          border border-gray-200 dark:border-gray-700
          px-2 py-0.5 rounded-md
          hidden sm:block
        "
      >
        Ctrl + K
      </div>
    </div>

       

      </div>

    </div>
  );
};

export default AdminCampaignRequestHeader;