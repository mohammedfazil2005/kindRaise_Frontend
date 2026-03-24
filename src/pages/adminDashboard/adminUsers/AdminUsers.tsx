
import AdminUserHeader from './components/AdminUserHeader'
import AdminUserContent from './components/AdminUserContent'
import { useState } from 'react'

const AdminUsers = () => {
    const [search,setSearch]=useState("")
    const [role,setRole]=useState("")
    const [page,setPage]=useState(0)
    return (
        <div className='space-y-8 mt-10'>
            <AdminUserHeader setSearch={setSearch} setRole={setRole} setPage={setPage}/>
            <AdminUserContent search={search} role={role} page={page} setPage={setPage}/>
        </div>
    )
}

export default AdminUsers
