import { Link } from "react-router-dom";
import { Nav } from "../../App";
import DateSelector from "../DateSelector";
import { useState } from "react";

interface Props {
  links: Nav[]; // Array of links to display
  children?: React.ReactNode; // Optional children prop
}

export default function Navbar({ links, children }: Props) {
  // State for toggling the mobile menu
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 text-white flex items-center justify-between px-6 py-3 z-50">
      {/* Title */}
      <div className="hidden md:flex items-center">
        <h1 className="text-xl font-bold">{children}</h1>
      </div>

      {/* Always-visible Date Selector */}
      <div className="flex-1 flex justify-center">
        <DateSelector />
      </div>

      {/* Mobile Hamburger Icon */}
      <button
        className="md:hidden flex items-center px-3 py-2 border rounded text-white border-gray-400 hover:text-gray-300 hover:border-gray-300"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <svg
          className="fill-current h-5 w-5"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0zM0 9h20v2H0zM0 15h20v2H0z" />
        </svg>
      </button>

      {/* Links */}
      <div
        className={`${
          menuOpen ? "block" : "hidden"
        } w-full md:flex md:items-center md:w-auto`}
      >
        <ul className="flex flex-col md:flex-row md:space-x-6 mt-3 md:mt-0">
          {links.map((link: Nav, index: number) => (
            <li key={index}>
              <Link
                to={link.link}
                className="block py-2 md:py-0 text-white hover:text-gray-300"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}