"use client";

import React from "react";
import { useState, useEffect } from "react";

function ThemeSwitcher(props: any) {
  const light = "garden";
  const dark = "night";

  const [theme, setTheme] = useState<string>();

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    localTheme ? setTheme(localTheme) : setTheme(dark);
  }, []);

  useEffect(() => {
    if (typeof theme === "string") {
      localStorage.setItem("theme", theme);
      const htmlElement = document.querySelector("html");
      if (htmlElement) {
        htmlElement.setAttribute("data-theme", theme);
        if (theme === light) {
          htmlElement.setAttribute("class", "");
        } else {
          htmlElement.setAttribute("class", "dark");
        }
      }
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === light ? dark : light));
  };

  return (
    <label className="flex cursor-pointer gap-2" onClick={toggleTheme}>
      {props.showIcons && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      )}

      <input
        type="checkbox"
        checked={theme === light}
        value={theme}
        readOnly
        className="toggle theme-controller"
      />
      {props.showIcons && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
        </svg>
      )}
    </label>
  );
}

export default ThemeSwitcher;
