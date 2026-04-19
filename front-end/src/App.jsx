import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MsgLeft from "./components/MsgLeft";
import "./App.css";
import { socket } from "./socket";
import { useEffect, useState } from "react";
import ApiHandler from "./classes/ApiHandler";
import { useDispatch, useSelector } from "react-redux";
import { initChats, initUser } from "./redux/userSlice";
import { useGetChatsByUserIdQuery, useGetUserByIdQuery } from "./redux/apiService";

function App() {
  const [messages, setMessages] = useState([]);
  // const [user, setUser] = useState({});
  const {
    data: user,
    error: userError,
    isLoading: isUserLoading,
  } = useGetUserByIdQuery(4);

  const {
    data: chats,
    error: chatsError,
    isLoading: isChatsLoading,
  } = useGetChatsByUserIdQuery(user?.user_id, {
    skip: !user?.id, // 👈 Only runs once we have chats
  });

  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const room_id = "global";

  useEffect(() => {
    socket.emit("join", room_id);

    // ApiHandler.getUser(4).then((data) => {
    //   setUser(data)
    // })

    ApiHandler.getMessages("room_1_4", setMessages);

    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    const msgData = {
      room_id,
      msg: e.target[1].value,
      user_id: 1,
      time: new Date().toLocaleTimeString(),
    };

    ApiHandler.postMessage(msgData);

    socket.emit("send_message", msgData);
    setMessages((prev) => [...prev, msgData]);
    e.target[1].value = "";
  };

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  useEffect(() => {
    if (!isUserLoading) dispatch(initUser(user));
  }, [isUserLoading]);
  
  useEffect(() => {
    if (!isChatsLoading) {dispatch(initChats(chats)); console.log(chats);
    };
    // console.log(isChatsLoading);
    
  }, [isChatsLoading]);

  return (
    <div className="bg-surface text-on-background selection:bg-tertiary/20">
      <div className="flex h-screen w-full overflow-hidden">
        <Sidebar />
        <main className="ml-80 flex-1 flex flex-col bg-surface overflow-hidden relative">
          <Header />
          <div className="flex-1 overflow-y-auto px-12 py-8 space-y-12 max-w-4xl mx-auto w-full">
            {messages.map((element, i) => (
              <MsgLeft
                time={element.time}
                sender={element.user_id}
                msg={element.msg}
                key={element.id}
              />
            ))}
          </div>
          <Footer handler={handleSendMessage} />
        </main>
      </div>
    </div>
  );
}

export default App;

// <aside className="w-72 h-screen bg-surface-container-low py-8 px-6 hidden xl:flex flex-col space-y-8 border-l border-transparent">
//   <div className="flex flex-col items-center text-center space-y-4">
//     <div className="w-24 h-24 rounded-full p-1 ring-2 ring-tertiary/20">
//       <img
//         alt="Julian Barnes"
//         className="w-full h-full object-cover rounded-full"
//         data-alt="Professional portrait of a middle-aged man with dark hair and a creative industry look, warm window lighting"
//         src="https://lh3.googleusercontent.com/aida-public/AB6AXuAetrVd_i8wlREP8s4XbgyA3kNShQxA7TPubbZwyk4Cy2mVdpqoV_ta6kQK0s8s3L3ct9jEEdJ1YTGLHduya-ZIcBgGfJ-5yztK_QIn0V9HQy8b-DisUTKz_C8ooe98unx316dKr9SCFdHGki1oBIoFELrVrV7KUyb4lRMRdWyPbHgjJJoAXbTSDs555fdoP9e3PYZaWLLyvjkvdDnbD7X7wSgzUm2igdQW-Buqk0kYHlbjXjz5vuOHHf1eas_0IqtuceP7M4qGfak"
//       />
//     </div>
//     <div className="flex flex-col">
//       <h3 className="text-xl font-bold tracking-tight text-on-surface">
//         Julian Barnes
//       </h3>
//       <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-on-surface-variant">
//         Lead Designer
//       </p>
//     </div>
//   </div>
//   <div className="space-y-6">
//     <div>
//       <h4 className="text-[10px] uppercase tracking-[0.1em] font-extrabold text-on-surface-variant/50 mb-3">
//         Shared Assets
//       </h4>
//       <div className="grid grid-cols-2 gap-2">
//         <div className="aspect-square bg-surface-container-highest rounded-md overflow-hidden group cursor-pointer">
//           <img
//             className="w-full h-full object-cover group-hover:scale-110 transition-transform"
//             data-alt="Abstract code on a dark screen with vibrant purple and blue highlights, cinematic tech aesthetic"
//             src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTR2GVhLPxYb0X355Mhzdp8jhl2SPl-BKgPNUNmS_-DwIoNu7CVNMwg0EulD3HudmZqypx63l3gJRGxVxkKsTW2xzCx2-rEXc4erw3fDheB1A9kJJSN6hOyFv5NPLxV0KZ-zAOlarpaudYISeAw-VCo4tG5oDjeZ-GZ_ymNmNV1Kz0SSI9fqcPJum7aAk_O9j9calXWxCq7PzzQ4BPXJsK6LKqsPgSCgLmjXNulnZ_qpkxAN8bS7VEhPLeH40AfmfDd2_rhbhX79U"
//           />
//         </div>
//         <div className="aspect-square bg-surface-container-highest rounded-md overflow-hidden group cursor-pointer">
//           <img
//             className="w-full h-full object-cover group-hover:scale-110 transition-transform"
//             data-alt="Clean minimalist office space with a laptop and a notebook on a light wood desk, bright morning sun"
//             src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLj2XkpG82fYQE33z71r7FpuXQqxv4M5GwRHxroSedOyBRodu84U31AraKVLAhI0Siz44go_O74Kw7I6UQyfnwLnMLq6c_a-kv7Gl5xR_sCchqedq4ATdTCi3rp8w0uxPY82VEOmZvRJxw74fUbsdJoCreR6XjJ1XV9NuLa6vxQz4cBMvOqP29Ddu2xkuzLvHKgZjpId6cmWzFnk0b31L0BV6kQo2dvQu5MvIYFCwHKKOddwQ6YMV1shXrni6jxIOpBHduuaFYfjc"
//           />
//         </div>
//       </div>
//     </div>
//     <div className="space-y-4">
//       <h4 className="text-[10px] uppercase tracking-[0.1em] font-extrabold text-on-surface-variant/50">
//         Journal Notes
//       </h4>
//       <div className="p-4 bg-surface rounded-md text-xs leading-relaxed text-on-surface-variant border border-surface-container-highest">
//         Project "Silent Dialogue" - Phase 2. Focus on maximizing
//         whitespace in the editorial sidebar.
//       </div>
//     </div>
//   </div>
//   <div className="mt-auto space-y-2">
//     <button className="w-full py-2 text-xs font-bold text-error border border-error/20 rounded hover:bg-error/5 transition-colors">
//       Block Participant
//     </button>
//     <button className="w-full py-2 text-xs font-bold text-on-surface-variant/60 hover:text-on-surface transition-colors">
//       Mute Thread
//     </button>
//   </div>
// </aside>
