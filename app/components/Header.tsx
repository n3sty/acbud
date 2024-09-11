"use client";
import { modalState } from "@/atoms/modalAtom";
import Image from "next/image";
import LogoText from "@/public/logo-text.svg";
import LogoIcon from "@/public/logo-icon.svg";
import {
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { createClient } from "@/app/utils/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

function Header() {
  // Getters and setters
  const [, setOpen] = useRecoilState(modalState);
  const [user, setSession] = useState<User | null>(null);

  // Initialize router & supabase Client
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setSession(user);
    });
  }, [supabase, user]);

  return (
    <div
      className={`grid w-full grid-cols-1 sticky top-0 z-10 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto`}
    >
      <div className="text-base-content col-span-3 bg-white bg-opacity-50 backdrop-blur-md md:shadow-md py-1 px-3 md:-mx-1 md:rounded-xl md:mt-4 md:border md:top-6">
        <div className="flex justify-between items-center mx-4 py-2 md:py-0 max-w-6xl">
          {/* Left - Responsive Logo's*/}

          <div
            onClick={() => router.push("/")}
            className="relative hidden md:inline-grid cursor-pointer"
          >
            <Image
              className="hover:scale-105 p-2 transform transition-all duration-200 ease-out"
              src={LogoText}
              alt="AC/BUD logo"
              width={200}
              height={60}
            />
          </div>
          <div
            onClick={() => router.push("/")}
            className="relative hover:scale-110 transition-all duration-200 md:hidden flex-shrink-0 cursor-pointer"
          >
            <Image src={LogoIcon} alt="AC/BUD icon" width={50} height={50} />
          </div>
          <div>
            {/* Right - Buttons and Avatar */}
            <div className="flex items-center justify-end space-x-4">
              {user ? (
                <>
                  {/* CERTAIN ICONS DISABLED UNTIL FURTHER IMPLEMENTATION IS COMPLETE */}

                  {/* <div className="relative navbtn">
                  <PaperAirplaneIcon />
                  <span className="badge text-white bg-red-500 badge-md absolute -right-1 text-xs animate-pulse">
                    3
                  </span>
                </div> */}
                  <PlusCircleIcon
                    onClick={() => setOpen(true)}
                    className="navbtn"
                  />
                  {/* <UserGroupIcon className="navbtn" /> */}
                  {/* <HeartIcon className="navbtn" /> */}

                  <div className="dropdown dropdown-end m-0 p-0">
                    <div
                      role="button"
                      tabIndex={0}
                      className="btn btn-ghost btn-circle avatar"
                    >
                      <div className="w-10 rounded-full">
                        <Image
                          src={user.user_metadata?.picture}
                          alt="profile picture"
                          width={30}
                          height={30}
                        />
                      </div>
                    </div>

                    <div
                      tabIndex={0}
                      className="dropdown-content w-80 bg-white rounded-xl min-h-24"
                    >
                      <div className="flex flex-col items-center justify-center p-4">
                        {/* Simple user info display */}
                        <div className="flex flex-row w-full justify-between px-2">
                          <Image
                            src={user.user_metadata?.picture}
                            alt="profile picture"
                            width={60}
                            height={60}
                            className="rounded-full self-start"
                          />
                          <div className="flex flex-col text-right justify-center ml-2">
                            <h2 className="font-bold text-lg">
                              {user.user_metadata?.name}
                            </h2>
                            <h3 className="text-sm text-gray-400">
                              {user.user_metadata.email}
                            </h3>
                          </div>
                        </div>
                        <button
                          className="btn btn-sm btn-outline hover:bg-blue-400 hover:border-blue-400 self-end text-blue-400 mt-4 "
                          onClick={() => supabase.auth.signOut()}
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="dropdown md:hidden">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-ghost w-12 rounded-lg p-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 6h16M4 12h16M4 18h7"
                        />
                      </svg>
                    </div>
                    <ul
                      tabIndex={0}
                      className="menu menu-sm -mr-2 dropdown-content bg-base-100 rounded-lg p-1 z-20 mt-2 shadow"
                    >
                      <li className="rounded-sm">
                        <PaperAirplaneIcon className="dropdownbtn" />
                      </li>
                      <li>
                        <PlusCircleIcon
                          onClick={() => setOpen(true)}
                          className="dropdownbtn"
                        />
                      </li>
                      <li>
                        <UserGroupIcon className="dropdownbtn" />
                      </li>
                      <li>
                        <HeartIcon className="dropdownbtn" />
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <p
                  className="text-md p-2 font-serif text-3xl font-bold hover:cursor-pointer hover:scale-105 transition-all ease-out"
                  onClick={() => router.push("/auth/signin")}
                >
                  Sign In
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
