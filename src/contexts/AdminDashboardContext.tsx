import { createContext, useState } from "react";
import type { AdminDashboardContextType } from "../interfaces/interfaces";


export const AdminDashboardContext=createContext<AdminDashboardContextType|null>(null);

export const AdminDashboardContextProvider=({children}:any)=>{

    const [user,setUser]=useState<string>("")   

    return(
        <AdminDashboardContext.Provider value={{user,setUser}}>
            {children}
        </AdminDashboardContext.Provider>
    )
}