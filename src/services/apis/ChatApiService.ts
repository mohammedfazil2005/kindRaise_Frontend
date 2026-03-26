import { CommonApi } from "../CommonApi"

export const sendMessageToGenAi=async(data:object)=>{
    return await CommonApi("POST","/genai/chat",data)
}