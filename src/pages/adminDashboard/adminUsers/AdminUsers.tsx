
import AdminUserHeader from './components/AdminUserHeader'
import AdminUserContent from './components/AdminUserContent'
import { useState } from 'react'

const AdminUsers = () => {
    const [search,setSearch]=useState("")
    const [role,setRole]=useState("")
    return (
        <div className='space-y-8 mt-10'>
            <AdminUserHeader setSearch={setSearch} setRole={setRole}/>
            <AdminUserContent search={search} role={role}/>
        </div>
    )
}

export default AdminUsers
