import React from 'react'
import AdminUserHeader from './components/AdminUserHeader'
import AdminUserContent from './components/AdminUserContent'

const AdminUsers = () => {
  return (
    <div className='space-y-8 mt-10'>
      <AdminUserHeader/>
      <AdminUserContent/>
    </div>
  )
}

export default AdminUsers
