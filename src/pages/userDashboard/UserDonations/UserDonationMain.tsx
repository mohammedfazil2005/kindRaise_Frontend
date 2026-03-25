

import { Outlet, useLocation } from "react-router-dom";
import UserDonationCard from "./components/UserDonationCard";
import UserDonationStats from "./components/UserDonationStats";
// import UserDonationTable from "./components/UserDonationCard";

const UserDonationMain = () => {
   const location = useLocation();
   const isViewCampaign = location.pathname.includes("viewcampaign")
  return (
    <>
    {isViewCampaign?(<Outlet/>):
   (
    <div className="space-y-8 mt-10">

      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
          My Donations
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Track and manage all the campaigns you supported
        </p>
      </div>

      {/* Stats */}
      <UserDonationStats />

      {/* Donation History */}
      <UserDonationCard />

    </div>
   
)}
  </>
  );
};

export default UserDonationMain;