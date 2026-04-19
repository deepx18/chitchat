import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ApiHandler from "../classes/ApiHandler";
import { useGetChatsByUserIdQuery } from "../redux/apiService";
import { changeOpenedChat, initChats } from "../redux/userSlice";

export default function Sidebar({ setState, setChatOpened }) {
  // const [chats, setChats] = useState([]);
  const currentUser = useSelector((state) => state.user.currentUser);
  const currentChatOpened = useSelector(
    (state) => state.user.currentChatOpened,
  );
  const dispatch = useDispatch();
  const {
    data: chats,
    error,
    isLoading,
  } = useGetChatsByUserIdQuery(currentUser.user_id, {
    skip: !currentUser.user_id,
  });

  useEffect(() => {
    if (!isLoading && chats) dispatch(initChats(chats));
  }, [chats]);

  // useEffect(() => {
  //   console.log(chats);
  // }, [chats])

  const openChat = (chat) => {
    console.log("fair and square");
    setChatOpened(true)

    dispatch(changeOpenedChat(chat.room_id))
  }

  return (
    <aside className="h-screen w-80 fixed left-0 top-0 bg-[#f9f2f2] dark:bg-stone-900 flex flex-col py-8 px-6 space-y-6 z-20">
      <div className="flex flex-col space-y-1 px-2">
        <h1 className="text-2xl font-bold tracking-tighter text-[#363132] dark:text-stone-100">
          ChitChat
        </h1>
        <p className="font-manrope tracking-tight leading-relaxed title-md text-[#5f5e5e] opacity-80">
          The Ultimate Chat App
        </p>
      </div>
      <button
        className="w-full bg-primary py-3 rounded-lg text-on-primary font-manrope font-bold text-sm hover:bg-primary-dim transition-all active:scale-95"
        onClick={() => setState(true)}
      >
        New Conversation
      </button>
      <nav className="flex-1 overflow-y-auto space-y-1 mt-4">
        <h4 className="px-4 text-[10px] uppercase tracking-[0.15em] font-extrabold text-on-surface-variant/50 mb-4">
          Active Threads
        </h4>
        {!isLoading &&
          chats?.map((chat, i) => {
            return (
              <div
                className={`flex flex-col space-y-1 px-4 py-4 cursor-pointer rounded ${chat.room_id === currentChatOpened ? "bg-[#efe6e7] border-r-2 border-[#0033dc]" : "hover:bg-[#efe6e7] transition-colors duration-200"}`}
                key={i}
                onClick={() => openChat(chat)}
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-on-surface">
                    {chat.user_id} - {chat.name}
                  </span>
                  <span className="text-[10px] text-on-surface-variant/60">
                    10:45 AM
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant truncate">
                  Absolutely. The "Silence" piece is meant to be...
                </p>
              </div>
            );
          })}
        {/* <a
          className="flex flex-col space-y-1 px-4 py-4 rounded hover:bg-[#efe6e7] transition-colors duration-200"
          href="#"
        >
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-on-surface">Arthur P.</span>
            <span className="text-[10px] text-on-surface-variant/60">
              11:02 AM
            </span>
          </div>
          <p className="text-xs text-on-surface-variant truncate">
            The spacing as separation rule is brilliant...
          </p>
        </a> */}
      </nav>
      <div className="pt-6 mt-auto">
        <div className="flex items-center space-x-3 px-2">
          <div className="w-10 h-10 rounded-full bg-primary-container overflow-hidden">
            <img
              alt="User Profile"
              className="w-full h-full object-cover"
              data-alt="Close up portrait of a young woman with a neutral expression, soft natural lighting, minimal studio background"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfvbQkeyIAK8kuJWkdhwe5xeVbbJtm3bAcmdCSGz2_wV_qxDVy9OUnM2t_iXKWUXCM-_4A1TIxExEr_4qKLZ__q9VqPbjdV0maGwHifYCcPrAgGaXFvCnVSv_byaWzRRNg5VwxmgaNNxQxjbUwoGCq0sd7GYaexI-Pumpgww7g6-hLNNUdlTMkaoG9TIkq3zIChn_z-amjME94dqfHlHKxLngl47Nv1s7VwCgTgjgPnsUE41gSPDHCDtEEbJN29FH9Ahdx6Ry_OvQ"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-on-surface">
              {currentUser.user_id} - {currentUser.name}
            </span>
            <span className="text-[10px] text-on-surface-variant uppercase tracking-widest">
              {currentUser.email}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
