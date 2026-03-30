import { createContext, useState } from "react";
import type { AdminDashboardContextType } from "../interfaces/interfaces";


export const AdminDashboardContext=createContext<AdminDashboardContextType|null>(null);

export const AdminDashboardContextProvider=({children}:any)=>{

    const [user,setUser]=useState<string>("")   
    const [notificationUpdate,setNotificationUpdated]=useState<string>("");
    const [profileUpdate,setProfileUpdated]=useState<string>("");
    const [testimonialUpdate,setTestimonialUpdate]=useState<string>("");

    return(
        <AdminDashboardContext.Provider value={{user,setUser,notificationUpdate,setNotificationUpdated,profileUpdate,setProfileUpdated,testimonialUpdate,setTestimonialUpdate}}>
            {children}
        </AdminDashboardContext.Provider>
    )
}