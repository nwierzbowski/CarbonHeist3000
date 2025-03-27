import { Link } from "react-router-dom";
import { Nav } from "../../App";
import DateSelector from "../DateSelector";

interface Props {
  links: Nav[]; // Array of links to display
  children?: React.ReactNode; // Optional children prop
}

export default function Navbar({ links, children }: Props) {
  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 text-white flex items-center justify-between px-6 py-3 z-50">
      <h1 className="text-xl font-bold">{children}</h1>
      <DateSelector />
      <ul className="flex space-x-6">
        {links.map((link: Nav, index: number) => (
          <li key={index}>
            <Link to={link.link} className="text-white hover:text-gray-300">
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
