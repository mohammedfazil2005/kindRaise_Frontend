import { useQuery } from '@tanstack/react-query';
import { AnimatedTestimonials } from '../../../components/ui/animated-testimonials'
import { fetchActiveTestimonials } from '../../../services/apis/TestimonialApi'

import { TestimonialSkeleton } from '../../../skeltons/AdminViewProfileSkeltons'
import { AdminDashboardContext } from '../../../contexts/AdminDashboardContext';
import { useContext } from 'react';


const HomeMainRight = () => {
     const {testimonialUpdate}=useContext(AdminDashboardContext)!
    const {data,isLoading}=useQuery({
        queryKey:["HomeMainRightTestimonials",testimonialUpdate],
        queryFn:fetchActiveTestimonials,
        staleTime:1000*60*10
    })

    
   
  
  return (
    <>
    {isLoading?<TestimonialSkeleton/>:<AnimatedTestimonials testimonials={data} />}
    </>
  )
}

export default HomeMainRight
