
import AdminRazorPaySettingHeader from './components/AdminRazorPaySettingHeader'
import AdminRazorPaySettingContent from './components/AdminRazorPaySettingContent'
import { useState } from 'react'

const AdminRazorPaySettings = () => {
  const [razorpayUpdated,setRazorPayUpdated]=useState("")
  return (
    <div className='space-y-8 mt-10'>
      <AdminRazorPaySettingHeader razorpayUpdated={razorpayUpdated}/>
      <AdminRazorPaySettingContent setRazorPayUpdated={setRazorPayUpdated}/>
    </div>
  )
}

export default AdminRazorPaySettings
