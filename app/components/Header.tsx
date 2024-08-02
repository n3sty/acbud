/* eslint-disable @next/next/no-img-element */
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

function Header() {
  return (
    <div className="text-base-content bg-base-100 backdrop-blur-md shadow-md p-1 rounded-xl m-6 border sticky top-0 z-50">
      <div className="flex justify-between items-center mx-5 lg:mx-auto max-w-6xl">
        {/* Left - Responsive Logo's*/}
        <div className="relative hidden lg:inline-grid cursor-pointer">
          <Image
            src="https://links.papareact.com/ocw"
            alt="instagram logo"
            width={200}
            height={60}
          />
        </div>
        <div className="relative lg:hidden flex-shrink-0 cursor-pointer">
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
              className="input input-bordered text-gray-500 block w-full pl-10 sm:text-sm rounded-md p-2"
            />
          </div>
        </div>

        {/* Right - Buttons and Avatar */}
        <div className="flex items-center justify-end space-x-4">
          <HomeIcon className="navbtn" />
          <Bars3Icon className="h-6 md:hidden cursor-pointer" />

          <div className="relative navbtn">
            <PaperAirplaneIcon />
            <span className="badge text-white bg-red-500 badge-md absolute -right-1 text-xs animate-pulse">
              3
            </span>
          </div>
          <PlusCircleIcon className="navbtn" />
          <UserGroupIcon className="navbtn" />
          <HeartIcon className="navbtn" />

          <div className="avatar">
            <div className="hover:ring hover:ring-secpndary rounded-full navbtn">
              <img
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                alt="profile picture"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
