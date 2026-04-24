import React, { useEffect, useRef } from "react";
import MsgLeft from "./MsgLeft";
import MsgRight from "./MsgRight";
import { useSelector } from "react-redux";

export default function Chat({messages}) {
    const currentUser = useSelector((state) => state.user.currentUser)
    const divRef = useRef(null)

    console.log(messages);
    
    
    useEffect(() => {
        // divRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
        divRef.current.scrollTop = divRef.current.scrollHeight;
    }, [messages])

  return (
    <div className="flex-1 overflow-y-auto px-12 py-8 space-y-12 max-w-4xl mx-auto w-full overflow-auto scrollbar-hide" ref={divRef}>
      {messages.map((element, i) => {
        if (element.user_id === currentUser.user_id) return <MsgRight
          time={element.time}
          msg={element.msg}
          key={element.id}
        />
        else return <MsgLeft
          time={element.time}
          sender={element.name}
          msg={element.msg}
          key={element.id}
        />
        })}
    </div>
  );
}
