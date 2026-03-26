import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {  Send } from "lucide-react";
import { sendMessageToGenAi } from "../../services/apis/ChatApiService";
import { ClipLoader } from "react-spinners";

type Message = {
  text: string;
  sender: "user" | "bot";
  options?: string[];
  loading?: boolean; // ✅ add this
};

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [loader,setLoader]=useState(false)
  const [currentMessage,setCurrentMessage]=useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi there! 👋 How can I help you with KindRaise today?",
      sender: "bot",
      options: ["Donor", "Campaign Creator", "Volunteer"],
    },
  ]);

        const sendMessage = async () => {
        if (!currentMessage.trim()) return;

        const userText = currentMessage;

        const userMessage: Message = {
            text: userText,
            sender: "user",
        };

        const loadingMessage: Message = {
            text: "",
            sender: "bot",
            loading: true,
        };

        // ✅ Add user message + loader
        setMessages((prev) => [...prev, userMessage, loadingMessage]);

        setCurrentMessage(""); // clear input
        setLoader(true)
        try {
            const sessionId =
                    localStorage.getItem("chatSessionId") || crypto.randomUUID();

            localStorage.setItem("chatSessionId", sessionId);

            const apiResponse = await sendMessageToGenAi({
            message: userText,
            userId:sessionId
            });

            const botReply: Message = {
            text: apiResponse?.reply || "No response",
            sender: "bot",
            };

            // ✅ Replace loader with actual response
            setMessages((prev) => {
            const updated = [...prev];
            updated.pop(); // remove loading message
            return [...updated, botReply];
            });

        } catch (error) {
            setMessages((prev) => {
            const updated = [...prev];
            updated.pop();
            return [
                ...updated,
                {
                text: "Something went wrong 😢",
                sender: "bot",
                },
            ];
            });
        }finally{
            setCurrentMessage("")
            setLoader(false)
        }
        };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-emerald-500 hover:bg-emerald-900 text-white w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-xl z-50"
      >
        <img src="/chaticon.png" alt="" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-2 right-3 w-[350px] h-[520px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50"
          >
            {/* Header */}
            <div className="bg-gradient-to-r bg-emerald-500 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src="/indexlogo.png" className="w-8 h-8 rounded-full" />
                <div>
                  <p className="font-semibold text-sm">KindRaise Bot</p>
                  <p className="text-xs opacity-80">● Online Now</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)}>✖</button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
              {messages.map((msg, index) => (
                <div key={index}>
                  {/* Bot Message */}
                  {msg.sender === "bot" && (
                    <div className="flex gap-2 items-start">
                      <img
                        src="/indexlogo.png"
                        className="w-8 h-8 rounded-full"
                      />

                      <div>
                        <p className="text-xs text-gray-500 mb-1">
                          KindRaise Bot
                        </p>

                       <div className="bg-white p-3 rounded-xl shadow text-sm">
                {msg.loading ? (
                    <div className="flex items-center gap-2">
                    <ClipLoader size={14} />
                    <span>Typing...</span>
                    </div>
                ) : (
                    msg.text
                )}
                </div>

                        {/* Options */}
                        {/* {msg.options && (
                          <div className="flex gap-2 mt-2 flex-wrap">
                            {msg.options.map((opt, i) => (
                              <button
                                key={i}
                                onClick={() => sendMessage(opt)}
                                className="border border-emerald-500 text-emerald-500 px-3 py-1 rounded-full text-xs hover:border-emerald-600"
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        )} */}
                      </div>
                    </div>
                  )}

                  {/* User Message */}
                  {msg.sender === "user" && (
                    <div className="flex justify-end mt-2">
                      <div className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm">
                        {msg.text}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t flex gap-2">
              <input
              value={currentMessage}
              onChange={(e)=>setCurrentMessage(e.target.value)}
                type="text"
                placeholder="Reply to KindRaise Bot..."
                className="flex-1 px-3 py-2 rounded-full bg-gray-100 outline-none text-sm"
              />
             <button onClick={sendMessage} className="bg-emerald-500 hover:bg-emerald-600 text-white p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 flex items-center justify-center">
            {loader?<ClipLoader size={18} color="white"/>:<Send size={18} className="rotate-45" />}
            </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;