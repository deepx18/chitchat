import React from "react";

export default function MsgRight({time = "10:45 AM", msg = "Absolutely. The \"Silence\" piece is meant to be an exercise in negative space. I'll increase the margins by another 12 pixels. It should feel like a gallery walk, not a textbook."}) {
  return (
    <div className="flex flex-col space-y-2 items-end group">
      <div className="flex items-baseline space-x-3">
        <span className="text-[10px] text-on-surface-variant/60 font-medium">
          {time}
        </span>
        <span className="font-bold text-on-surface text-sm">You</span>
      </div>
      <div className="bg-primary text-on-primary py-4 px-6 rounded-xl rounded-br-none max-w-lg leading-relaxed font-body body-lg shadow-sm">
        {msg}
      </div>
    </div>
  );
}
