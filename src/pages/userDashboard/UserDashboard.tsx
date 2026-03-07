
import { Outlet } from "react-router-dom";
import UserSidebar from "./UserSidebar";
import UserNavbar from "./UserNavbar";
import UserMainDashboard from "./userDashboardComponents/UserMainDashboard";

export default function UserDashboard() {
  return (
    <div className="flex">

      {/* Sidebar */}
      <UserSidebar />

      {/* Content */}
      <div className="ml-64 flex-1 min-h-screen bg-gray-100 ">

        {/* Navbar */}
        <UserNavbar />

        {/* Page Content */}
        <div className="p-6 mt-10">
          <UserMainDashboard/>
        </div>

      </div>

    </div>
  );
}