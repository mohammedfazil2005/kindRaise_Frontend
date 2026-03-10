
import AdminSidebar from './mainReusableComponents/AdminSidebar'
import AdminNavbar from './mainReusableComponents/AdminNavbar'
import { Outlet } from 'react-router-dom'

const AdminDashboard = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="lg:ml-64 flex-1 min-h-screen">
        <AdminNavbar />
        <div className="p-6 mt-10 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
