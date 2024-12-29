import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  signinNavbarLinks,
  signOutNavbarLinks,
} from "../constants/NavbarLinks";
import { logout } from "../redux/userSlicer";

const Navbar = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  return (
    <div className="bg-red-300 fixed w-full py-4 px-2 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Logo</h1>
      <ul className="flex gap-6 md:gap-10">
        {user ? (
          <>
            {signinNavbarLinks.map((link, index) => (
              <li key={index} className="text-lg md:text-xl font-bold">
                <a
                  href={link.path}
                  className="text-white hover:text-gray-400 transition-colors flex items-center gap-2"
                >
                  {link.icon && <link.icon />}
                  {link.name}
                </a>
              </li>
            ))}
            <li
              onClick={() => dispatch(logout())}
              className="text-lg md:text-xl font-bold text-white hover:text-gray-400 transition-colors flex items-center gap-2"
            >
              Logout
            </li>
          </>
        ) : (
          <>
            {signOutNavbarLinks.map((link, index) => (
              <li key={index} className="text-lg md:text-xl font-bold">
                <a
                  href={link.path}
                  className="text-white hover:text-gray-400 transition-colors flex items-center gap-2"
                >
                  {link.icon && <link.icon />}
                  {link.name}
                </a>
              </li>
            ))}
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
