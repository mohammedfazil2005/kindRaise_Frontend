import { toast } from "sonner"

export const toaster=(message:string)=>{

    const toastConfig=toast(message, { action: {   label: "Undo",   onClick: () => console.log("Undo"), },})
    return toastConfig

}