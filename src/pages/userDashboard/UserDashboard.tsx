

import { Outlet } from "react-router-dom";
import UserNavbar from "./mainResuableComponents/UserNavbar";
import UserSidebar from "./mainResuableComponents/UserSidebar";



export default function UserDashboard() {
  return (
    <div className="flex">
      <UserSidebar />
      <div className="lg:ml-64 flex-1 min-h-screen">
        <UserNavbar />
        <div className="p-6 mt-10 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
          <Outlet />
        </div>
      </div>
    </div>
  );
}