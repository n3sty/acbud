"use client"
import { useEffect, useState } from "react";
import { cookies } from "next/headers";

const ThemeSwitcher: React.FC = () => {

  const light = "light";
  const dark = "night";

  const cookieStore = cookies();

  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return cookieStore.set('theme') || window.matchMedia('(prefers-color-scheme: dark)').matches ? dark : light;
    }
  });

  useEffect(() => {
    if (theme === dark) {
      document.documentElement.classList.add(dark);
    } else { 
      document.documentElement.classList.remove(dark);
    }

    localStorage.setItem('theme', theme ? theme : light);
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === dark ? light : dark);
  }


  return (
    <label className="flex cursor-pointer gap-2" onClick={toggleTheme}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
      <input type="checkbox" value={theme} readOnly className="toggle theme-controller" />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <circle cx="12" cy="12" r="5" />
        <path
          d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
      </svg>
    </label>
  );
};

export default ThemeSwitcher;