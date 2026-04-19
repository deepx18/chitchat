import React from "react";

export default function Footer({handler}) {
  return (
          <div className="px-10 py-8 bg-[#fff8f8] border-t border-transparent">
            <div className="max-w-4xl mx-auto relative group">
              <form onSubmit={handler}>
                <div className="flex items-center justify-center space-x-4 bg-surface-container-high p-4 rounded-xl transition-all group-focus-within:bg-surface-container-highest">
                  <button className="p-2 hover:bg-surface-variant rounded-full transition-colors">
                    <span
                      className="material-symbols-outlined text-on-surface-variant"
                      data-icon="add"
                    >
                      add
                    </span>
                  </button>
                  <input
                    className="flex-1 bg-transparent border-none focus:ring-0 resize-none py-2 text-on-surface font-body body-lg placeholder:text-on-surface-variant/40"
                    placeholder="Craft your dialogue..."
                    autoComplete="off"
                    type="text"
                    name="msg"
                    id="msg"
                    rows="1"
                  />
                  <div className="flex items-center space-x-2">
                    <button className="p-2 hover:bg-surface-variant rounded-full transition-colors">
                      <span
                        className="material-symbols-outlined text-on-surface-variant"
                        data-icon="mood"
                      >
                        mood
                      </span>
                    </button>
                    <button
                      className="bg-tertiary text-on-tertiary p-3 rounded-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
                      type="submi"
                    >
                      <span
                        className="material-symbols-outlined text-lg"
                        data-icon="send"
                      >
                        send
                      </span>
                    </button>
                  </div>
                </div>
              </form>
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-tertiary scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-center mx-4"></div>
            </div>
          </div>
  );
}
