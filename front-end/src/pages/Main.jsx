import "../App.css";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { socket } from "../socket";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initMessages, initUser, updateMessages } from "../redux/userSlice";
import {
  useGetUserByIdQuery,
  useLazyGetMessagesByRoomIdQuery,
  usePostMessageMutation,
} from "../redux/apiService";
import NewConv from "../components/NewConv";
import Chat from "../components/Chat";

function Main() {
  const [addNewConv, setAddNewConv] = useState(false);
  const [chatOpened, setChatOpened] = useState(false);

  const [user, setUser] = useState({});
  const currentChatOpened = useSelector(
    (state) => state.user.currentChatOpened,
  );
  const { data, error, isLoading: isUsersLoading } = useGetUserByIdQuery(4);
  const messages = useSelector((state) => state.user.messages)
  const [
    getMessages,
    { data: initialMessages, isFetching, isError, error: messsagesError },
  ] = useLazyGetMessagesByRoomIdQuery();

  const [postMessage, { isLoading: isMessagePLoading }] =
    usePostMessageMutation();
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("receive_message", (data) => {
      dispatch(updateMessages(data));
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const msgData = {
      room_id: currentChatOpened,
      msg: e.target[1].value,
      user_id: currentUser.user_id,
      time: new Date().toLocaleTimeString(),
    };

    const { data } = await postMessage(msgData);

    socket.emit("send_message", data);
    e.target[1].value = "";
  };

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  useEffect(() => {
    if (!isUsersLoading) dispatch(initUser(data));
  }, [isUsersLoading]);

  useEffect(() => {
    socket.emit("join", currentChatOpened);
    getMessages(currentChatOpened);
  }, [currentChatOpened]);

  useEffect(() => {
    dispatch(initMessages(initialMessages))
  }, [initialMessages])

  return (
    <div className="bg-surface text-on-background selection:bg-tertiary/20">
      <div className="flex h-screen w-full overflow-hidden">
        <Sidebar setState={setAddNewConv} setChatOpened={setChatOpened} />
        <main className="ml-80 flex-1 flex flex-col bg-surface overflow-hidden relative">
          <Header />
          {chatOpened && (
            <>
              <Chat messages={messages} />
              <Footer handler={handleSendMessage} />
            </>
          )}
        </main>
      </div>
      {addNewConv && <NewConv setState={setAddNewConv} />}
    </div>
  );
}

export default Main;

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
