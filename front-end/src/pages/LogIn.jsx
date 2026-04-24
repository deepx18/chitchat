import React, { useEffect, useState } from "react";
import { useGetAuthenticatedUserQuery, useLazyGetAuthenticatedUserQuery, useLoginMutation } from "../redux/apiService";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { initUser } from "../redux/userSlice";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [postLogin, { isLoading }] = useLoginMutation();
  const [localError, setLocalError] = useState("");
  const navigate = useNavigate()
  const dispatch = useDispatch()
//   const { data: user, error, isLoading: isUserLoading } = useGetAuthenticatedUserQuery()
  const [getAuthenticatedUser, { isLoading: isUserLoading }] = useLazyGetAuthenticatedUserQuery()


//   useEffect(() => {
//     console.log(user);
//   }, [user]);

  const login = async (e) => {
    e.preventDefault();
    try {
        const user = await getAuthenticatedUser();
        console.log(user)

        // if (user.isSuccess && user.error.status === 401) 
        if (user.error?.status === 401) {
          console.log(await postLogin({ email, password }));
          navigate("/");
        } else if (user.data.data.id) {
          dispatch(initUser(user.data.data))
          navigate("/");
        }
        


    } catch (error) {
      setLocalError(error);
    }
  };

  return (
    <div className="min-h-screen min-w-screen relative flex flex-col">
      <header className="bg-[#fff8f8] dark:bg-[#1a1a1a] docked full-width top-0 flex justify-between items-center w-full px-8 py-6 max-w-none">
        <div className="text-2xl font-bold tracking-tighter text-[#5f5e5e] dark:text-[#f9f2f2]">
          The Editorial Tactician
        </div>
        <nav className="hidden md:flex gap-8 items-center">
          <a
            className="font-['Manrope'] tracking-tight text-display-sm text-[#b9b0b1] dark:text-[#5f5e5e] hover:bg-[#efe6e7] dark:hover:bg-[#333333] transition-colors duration-300 px-3 py-1 rounded"
            href="#"
          >
            Archive
          </a>
          <a
            className="font-['Manrope'] tracking-tight text-display-sm text-[#b9b0b1] dark:text-[#5f5e5e] hover:bg-[#efe6e7] dark:hover:bg-[#333333] transition-colors duration-300 px-3 py-1 rounded"
            href="#"
          >
            Philosophy
          </a>
          <a
            className="font-['Manrope'] tracking-tight text-display-sm text-[#5f5e5e] dark:text-[#f9f2f2] font-semibold hover:bg-[#efe6e7] dark:hover:bg-[#333333] transition-colors duration-300 px-3 py-1 rounded"
            href="#"
          >
            Sign In
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-primary cursor-pointer">
            search
          </span>
          <span className="material-symbols-outlined text-primary md:hidden cursor-pointer">
            menu
          </span>
        </div>
      </header>
      <main className="flex-grow flex items-center flex-1 justify-center px-6 py-12">
        <div className="w-full max-w-md flex flex-col space-y-12">
          <div className="text-center md:text-left">
            <h1 className="text-[2.25rem] font-extrabold tracking-[-0.02em] text-on-surface leading-tight">
              The Dialogue
            </h1>
            <p className="text-on-surface-variant body-lg mt-2 opacity-80">
              Welcome back. Your curated conversation awaits.
            </p>
          </div>
          <form onSubmit={login} className="flex flex-col space-y-8">
            <div className="space-y-6">
              <div className="group flex flex-col space-y-2 editorial-focus bg-surface-container-highest p-4 rounded-lg transition-all duration-300">
                <label
                  className="font-label text-label-sm uppercase tracking-widest text-on-surface-variant opacity-60"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  className="bg-transparent border-none focus:ring-0 p-0 text-on-surface font-medium placeholder:text-outline-variant"
                  id="email"
                  name="email"
                  placeholder="name@editorial.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                />
              </div>
              <div className="group flex flex-col space-y-2 editorial-focus bg-surface-container-highest p-4 rounded-lg transition-all duration-300">
                <div className="flex justify-between items-end">
                  <label
                    className="font-label text-label-sm uppercase tracking-widest text-on-surface-variant opacity-60"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  {/* <a
                    className="text-label-sm text-tertiary hover:underline underline-offset-4 transition-all"
                    href="#"
                  >
                    Forgot?
                  </a> */}
                </div>
                <input
                  className="bg-transparent border-none focus:ring-0 p-0 text-on-surface font-medium placeholder:text-outline-variant"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                />
              </div>
            </div>
            <button
              className="bg-primary hover:bg-primary-dim text-on-primary py-5 rounded-lg font-bold tracking-tight text-lg shadow-sm transition-all active:opacity-80 flex justify-center items-center gap-2 group"
              type="submit"
            >
              Enter the Dialogue
              <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>
            {/* <div className="text-center pt-4">
              <span className="text-on-surface-variant body-md opacity-70">
                New to the collective?
              </span>
              <a
                className="text-on-surface font-bold hover:text-tertiary transition-colors underline underline-offset-4"
                href="#"
              >
                Request Access
              </a>
            </div> */}
          </form>
          {/* <div className="grid grid-cols-3 gap-2 opacity-20 pointer-events-none">
            <div className="h-1 bg-primary-fixed rounded-full"></div>
            <div className="h-1 bg-tertiary-fixed rounded-full"></div>
            <div className="h-1 bg-primary-fixed rounded-full"></div>
          </div> */}
        </div>
      </main>
      <footer className="bg-[#fff8f8] relative bottom-0 dark:bg-[#1a1a1a] flex flex-col md:flex-row justify-between items-center w-full px-8 py-8 gap-4">
        <div className="font-['Manrope'] text-label-sm uppercase tracking-widest text-[#5f5e5e] dark:text-[#d1d1d1]">
          © 2026 The Silent Dialogue. Editorial Grade Connectivity.
        </div>
        <div className="flex gap-8">
          <a
            className="font-['Manrope'] text-label-sm uppercase tracking-widest text-[#b9b0b1] dark:text-[#5f5e5e] hover:text-[#5f5e5e] dark:hover:text-[#f9f2f2] underline underline-offset-4 transition-colors"
            href="#"
          >
            Privacy
          </a>
          <a
            className="font-['Manrope'] text-label-sm uppercase tracking-widest text-[#b9b0b1] dark:text-[#5f5e5e] hover:text-[#5f5e5e] dark:hover:text-[#f9f2f2] underline underline-offset-4 transition-colors"
            href="#"
          >
            Terms
          </a>
          <a
            className="font-['Manrope'] text-label-sm uppercase tracking-widest text-[#b9b0b1] dark:text-[#5f5e5e] hover:text-[#5f5e5e] dark:hover:text-[#f9f2f2] underline underline-offset-4 transition-colors"
            href="#"
          >
            Support
          </a>
        </div>
      </footer>
    </div>
  );
}
