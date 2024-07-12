"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

function BottomNav() {
  const pathname = usePathname();

  const btnClass = "btn btn-lg bg-base-300 hover:btn-primary shrink join-item";

  return (
    <div className="btm-nav bg-inherit join-horizontal max-w-2xl gap-2 my-2 mx-auto">
      {/* HOME BUTTON */}
      <Link
        className={clsx(btnClass, {
          "active btn-primary btn-outline": pathname === "/feed",
        })}
        href="/feed"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      </Link>

      
      {/* PLUS BUTTON */}
      <Link
        className={clsx(btnClass, {
          "active btn-primary btn-outline": pathname === "/add",
        })}
        href="/add"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </Link>

      {/* /* COMPASS BUTTON */}
      <Link
        className={clsx(btnClass, {
          "active btn-primary btn-outline": pathname === "/explore",
        })}
        href="/explore"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <circle
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            cx="12"
            cy="12"
            r="10"
          />
          <polygon
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            points="12 4 9 12 12 20 15 12"
            fill="currentColor"
            transform="rotate(45 12 12)"
          />
        </svg>
      </Link>




    </div>
  );
}

export default BottomNav;
