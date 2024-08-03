/* eslint-disable @next/next/no-img-element */
"use client";

import { useSession, signOut } from "next-auth/react";
import { modalState } from "@/atoms/modalAtom";
import Image from "next/image";
import {
  MagnifyingGlassIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { HomeIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";

function Header() {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  const router = useRouter();

  return (
    <div className="text-base-content bg-base-100 bg-opacity-40 backdrop-blur-md shadow-md p-1 sm:rounded-xl sm:m-6 sm:border sticky top-0 sm:top-6 z-10">
      <div className="flex justify-between items-center mx-5 lg:mx-auto max-w-6xl">
        {/* Left - Responsive Logo's*/}
        <div
          onClick={() => router.push("/")}
          className="relative hidden lg:inline-grid cursor-pointer"
        >
          <Image
            className="hover:scale-110 transform transition-all duration-200 ease-out"
            src="https://links.papareact.com/ocw"
            alt="instagram logo"
            width={200}
            height={60}
          />
        </div>
        <div
          onClick={() => router.push("/")}
          className="relative lg:hidden flex-shrink-0 cursor-pointer"
        >
          <Image
            src="https://links.papareact.com/jjm"
            alt="instagram icon"
            width={50}
            height={50}
          />
        </div>

        {/* Middle - Search input field */}
        <div className="max-w-xs">
          <div className="relative mt-1 p-3 rounded-md">
            <div className="absolute inset-y-0 flex pl-3 items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered text-gray-500 backdrop-blur-md bg-opacity-10 block w-full pl-10 sm:text-sm rounded-md p-2"
            />
          </div>
        </div>

        {/* Right - Buttons and Avatar */}
        <div className="flex items-center justify-end space-x-4">
          {session ? (
            <>
              <div className="relative navbtn">
                <PaperAirplaneIcon />
                <span className="badge text-white bg-red-500 badge-md absolute -right-1 text-xs animate-pulse">
                  3
                </span>
              </div>
              <PlusCircleIcon
                onClick={() => setOpen(true)}
                className="navbtn"
              />
              <UserGroupIcon className="navbtn" />
              <HeartIcon className="navbtn" />

              <div onClick={() => signOut()} className="avatar">
                <div className="hover:ring hover:ring-secpndary rounded-full navbtn">
                  <img
                    src={session.user?.image as string}
                    alt="profile picture"
                  />
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
                  className="menu menu-sm -mr-2 dropdown-content bg-base-100 rounded-lg p-1 z-[1] mt-2 shadow"
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
              {/* <HomeIcon onClick={() => router.push("/")} className="navbtn" /> */}
            </>
          ) : (
            <p
              className="text-md lg:text-xl font-bold hover:scale-110 transition-all ease-out"
              onClick={() => router.push("/auth/signin")}
            >
              Sign In
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
