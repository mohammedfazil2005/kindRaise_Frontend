
import AdminUserHeader from './components/AdminUserHeader'
import AdminUserContent from './components/AdminUserContent'
import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

const AdminUsers = () => {
    const [search,setSearch]=useState("")
    const [role,setRole]=useState("")
    const [page,setPage]=useState(0)
    const location=useLocation()
      const isSubRoute =
      location.pathname.includes("/viewuserprofile");
    return (
        <>
        {isSubRoute?<Outlet/>:
        <div className='space-y-8 mt-10'>
            <AdminUserHeader setSearch={setSearch} setRole={setRole} setPage={setPage}/>
            <AdminUserContent search={search} role={role} page={page} setPage={setPage}/>
        </div>
}
        </>
    )
}

export default AdminUsers
