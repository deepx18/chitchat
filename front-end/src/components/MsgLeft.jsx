import React from "react";

export default function MsgLeft({
    time = "10:42 AM",
    sender = "Julian Barnes",
    msg = "I've reviewed the draft for the upcoming quarterly. The section on \"Architectural Silence\" needs more breathing room in the layout. Are we sticking to the 1.6 line height for the body text?"
}) {
  return (
    <div className="flex flex-col space-y-2 items-start group">
      <div className="flex items-baseline space-x-3">
        <span className="font-bold text-on-surface text-sm">{sender}</span>
        <span className="text-[10px] text-on-surface-variant/60 font-medium">
          {time}
        </span>
      </div>
      <div className="bg-surface-container-high text-on-surface py-4 px-6 rounded-md max-w-lg leading-relaxed font-body body-lg">
        {msg}
      </div>
    </div>
  );
}
