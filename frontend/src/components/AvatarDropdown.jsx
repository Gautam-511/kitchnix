import { useState } from "react";

function AvatarDropdown({ items }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleItemClick = (onClick) => {
    if (onClick) onClick();
    setDropdownOpen(false);
  };

  return (
    <div className="relative inline-block">
      {/* Avatar button */}
      <button
        onClick={toggleDropdown}
        className="focus:outline-none w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600 flex items-center justify-center"
        type="button"
      >
        <svg
          className="w-8 h-8 text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <div
          id="avatarDropdown"
          className="absolute right-0 z-10 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700"
        >
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            {items.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href || "#"}
                  onClick={() => handleItemClick(item.onClick)}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AvatarDropdown;
