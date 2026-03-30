import { Outlet, useLocation } from "react-router-dom"
import AdminTestimonialContent from "./components/AdminTestimonialContent"
import AdminTestimonialsHeader from "./components/AdminTestimonialsHeader"


const AdminTestimonial = () => {
    const location=useLocation()
     const isCreateTestimonial= location.pathname.includes("create")
  return (
    <div className='space-y-8 mt-10'>
      {isCreateTestimonial?<Outlet/>:
      <>
      <AdminTestimonialsHeader/>
      <AdminTestimonialContent/>
      </>
      }
    </div>
  )
}

export default AdminTestimonial
