import React from "react";

export default function Header() {
  return (
    <header className="flex justify-between items-center w-full px-10 h-20 absolute top-0 z-10 bg-white/10 backdrop-blur-md">
      <div className="flex items-center space-x-6">
        <div className="flex flex-col">
          <h2 className="font-manrope text-2xl font-bold tracking-tighter text-on-surface">
            The Editorial Tactician
          </h2>
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
            <span className="text-[10px] uppercase tracking-widest font-bold text-tertiary">
              Live Thread
            </span>
          </div>
        </div>
      </div>
      {/* <div className="flex items-center space-x-4">
        <div className="flex items-center bg-surface-container-high px-4 py-2 rounded-full">
          <span
            className="material-symbols-outlined text-sm mr-2 text-on-surface-variant"
            data-icon="search"
          >
            search
          </span>
          <input
            className="bg-transparent border-none focus:ring-0 text-sm font-manrope"
            placeholder="Search thread..."
            type="text"
          />
        </div>
        <button className="hover:bg-[#efe6e7] dark:hover:bg-stone-800 rounded-full p-2 transition-colors">
          <span
            className="material-symbols-outlined text-on-surface-variant"
            data-icon="more_vert"
          >
            more_vert
          </span>
        </button>
      </div> */}
    </header>
  );
}
