import React from 'react'
import AdminTransactionContent from './components/AdminTransactionContent'
import AdminTransactionHeader from './components/AdminTransactionHeader'

const AdminTransactions = () => {
  return (
     <div className='space-y-8 mt-10'>
      <AdminTransactionHeader/>
      <AdminTransactionContent/>
    </div>
  )
}

export default AdminTransactions
