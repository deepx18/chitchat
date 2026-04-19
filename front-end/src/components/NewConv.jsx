import { useState } from "react";
import { useLazyGetUserByEmailQuery, usePostChatMutation } from "../redux/apiService";
import { useSelector } from "react-redux";

export default function NewConv({ setState }) {
  const [search, setSearch] = useState();
  const [localError, setLocalError] = useState("");
  const currentUser = useSelector((state) => state.user.currentUser);
  const chats = useSelector((state) => state.user.chats);
  const [postChat, {isLoading: isChatPLoading}] = usePostChatMutation()
  const [getUser, { data, isFetching, isError, error }] =
    useLazyGetUserByEmailQuery();

  const searchUsers = async (e) => {
    setLocalError("");
    e.preventDefault();
    if (!e.target[0].value) return;

    try {
      if (e.target[0].value === currentUser.email) {
        setLocalError("You can't add you self.");
        return;
      }
      const user = await getUser(e.target[0].value).unwrap();

      console.log("Validation passed, user ready to add!");
    } catch (err) {
      console.error("Search/Validation failed:", err.message);
      setLocalError(err.message);
    }

    e.target[0].value = "";
  };

  const newUserConv = async (id) => {
    setLocalError("")
    // console.log(id);
    // console.log(chats);

    if (chats.find((chat) => parseInt(chat.user_id) === id)) {
        setLocalError('User aleady added ...')
        return;
    } 

    await postChat({
        user_1: currentUser.user_id,
        user_2: id
    })
    
    setState(false)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-on-background/40 backdrop-blur-sm"></div>
      <div className="relative w-full max-w-5xl bg-surface shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <header className="flex justify-between items-center px-8 py-10 border-b border-surface-container-highest">
          <div className="flex flex-col">
            <h2 className="font-headline tracking-tighter font-bold text-4xl text-on-surface">
              New Conversation
            </h2>
            <p className="text-[10px] uppercase tracking-[0.2em] text-primary/60 font-bold mt-2">
              Find a voice in the dialogue
            </p>
          </div>
          <div className="flex items-center gap-6">
            <button className="bg-primary text-on-primary text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-none active:scale-95 transition-all">
              SEND MESSAGE
            </button>
            <button
              className="material-symbols-outlined text-on-surface-variant hover:text-on-surface"
              data-icon="close"
              onClick={() => setState(false)}
            >
              close
            </button>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto px-8 py-12">
          <section className="mb-12">
            {localError && (
              <div class="mb-4 px-1">
                <p class="text-[10px] font-bold uppercase tracking-[0.15em] text-error flex items-center gap-2">
                  <span
                    class="material-symbols-outlined text-sm"
                    data-icon="error"
                  >
                    error
                  </span>
                  {localError}
                </p>
              </div>
            )}
            <form
              onSubmit={searchUsers}
              className="flex relative group max-w-full"
            >
              <span
                className="absolute left-0 top-2/3 -translate-y-1/2 material-symbols-outlined text-primary/40 group-focus-within:text-tertiary transition-colors"
                data-icon="search"
              >
                search
              </span>
              <input
                className="w-full bg-transparent border-none border-b border-surface-container-highest focus:border-tertiary focus:ring-0 py-4 pl-10 pr-4 text-2xl font-light tracking-tight text-on-surface placeholder:text-surface-dim transition-all"
                placeholder="Find people or groups..."
                type="email"
              />
              <button
                className="right-0 top-1/2 py-4 px-6 bg-transparent hover:bg-surface-container hover:rounded-full border-none border-b border-surface-container-highest focus:border-tertiary focus:ring-0 font-light"
                type="submit"
                // className="absolute right-0 top-1/2 p-4 -translate-y-1/2 p-2 rounded-full text-primary/60 hover:text-tertiary hover:bg-surface-container-high transition"
              >
                <span className="material-symbols-outlined text-base">
                  done
                </span>
              </button>
            </form>
          </section>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <section className="md:col-span-7">
              <h3 className="font-headline text-primary uppercase text-[10px] font-extrabold tracking-[0.2em] mb-8">
                Contact Found
              </h3>
              {isError && (
                <p className="text-red-500">
                  {error?.data?.message || "Error"}
                </p>
              )}
              <div className="space-y-4">
                {data?.id && (
                  <div 
                    onClick={() => newUserConv(data?.id)}
                  className="group flex items-center justify-between p-6 bg-surface-container-low hover:bg-surface-container-high transition-all cursor-pointer border border-transparent hover:border-surface-container-highest">
                    <div className="flex items-center gap-6">
                      <img
                        className="w-14 h-14 object-cover rounded-none grayscale group-hover:grayscale-0 transition-all duration-500"
                        data-alt="Julian Thorne"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjlDRgyyFlyXtmGQsML426GRtR8d_CFlmOvPehjmOKot2cJOuE1VXACWvE9wRLXupgIvTdlkEKNlOtn5AZr3ZlDcvj034O1VddA5YksV3DbYD79vCUmlidoEPF7NSkHmD_VgXweMSC6AZnOECIvQhrXxBl34Qfqj-MmMNN_7zAwMa2cq7kTY3c4RJpncwOC5GUkoqifwFkNU-tp4JwoOOsAbrko2CgArpiTUTr0pDUMiLTPL7DLNIViiT0ycbBmSUDH7tlr1o0cKw"
                      />
                      <div>
                        <h4 className="text-lg font-bold text-on-surface">
                          {data.name}
                        </h4>
                        <p className="text-[10px] text-primary/60 font-bold uppercase tracking-widest">
                          {data.email}
                        </p>
                      </div>
                    </div>
                    <span
                      className="material-symbols-outlined text-primary/20 group-hover:text-tertiary transition-colors"
                      data-icon="north_east"
                    >
                      north_east
                    </span>
                  </div>
                )}

                {/* <div className="group flex items-center justify-between p-6 bg-surface-container-low hover:bg-surface-container-high transition-all cursor-pointer border border-transparent hover:border-surface-container-highest">
                  <div className="flex items-center gap-6">
                    <img
                      className="w-14 h-14 object-cover rounded-none grayscale group-hover:grayscale-0 transition-all duration-500"
                      data-alt="Elena Rodriguez"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbxF0p7qCIEULeyDouGlOXEjOfBe_esIcY4kzsdHJqsa9TbLPyJop5p3f5cIVu9kVNw3n7dMA0Nnr7Z-3yn0gHi60Kt54mXmEipMPkPrqU_8ThDcjUbAJQ5OJ_tiT-O1vEu8lkhKnoPUkEl-RfLSTI0ZdZEhHW_FLQTCRaYHUN73YfbJLxCHbLzoWd9Sn_ItFUVT2DJb79bk6fcdgCn9MUmOKuZi3CdHgj38qEpYmAOfTYAGKTN49MlYsp9d-y1idRiGExog88dCg"
                    />
                    <div>
                      <h4 className="text-lg font-bold text-on-surface">
                        Elena Rodriguez
                      </h4>
                      <p className="text-[10px] text-primary/60 font-bold uppercase tracking-widest">
                        Executive Editor
                      </p>
                    </div>
                  </div>
                  <span
                    className="material-symbols-outlined text-primary/20 group-hover:text-tertiary transition-colors"
                    data-icon="north_east"
                  >
                    north_east
                  </span>
                </div>
                <div className="group flex items-center justify-between p-6 bg-surface-container-low hover:bg-surface-container-high transition-all cursor-pointer border border-transparent hover:border-surface-container-highest">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-surface-container-highest flex items-center justify-center">
                      <span className="font-bold text-primary tracking-widest">
                        SC
                      </span>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-on-surface">
                        Strategy Council
                      </h4>
                      <p className="text-[10px] text-primary/60 font-bold uppercase tracking-widest">
                        Group • 12 Members
                      </p>
                    </div>
                  </div>
                  <span
                    className="material-symbols-outlined text-primary/20 group-hover:text-tertiary transition-colors"
                    data-icon="north_east"
                  >
                    north_east
                  </span>
                </div> */}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
