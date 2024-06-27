import ThemeSwitcher from "@/app/components/navbar/themeswitcher";

export default function Avatar() {
  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar placeholder"
      >
        <div className="text-neutral-content w-12 bg-neutral rounded-full">
          <span className="text-3xl">D</span>
        </div>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
      >
        <li className="grow mx-auto">
          <ThemeSwitcher showIcons={true}/>
        </li>
        <li>
          <a>Settings</a>
        </li>
        <li>
          <a>Logout</a>
        </li>
      </ul>
    </div>
  );
}
