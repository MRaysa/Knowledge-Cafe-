import { FaShoppingCart, FaBookOpen } from "react-icons/fa";
import { GiCoffeeCup } from "react-icons/gi";

const Navbar = ({ readingTime, bookmarkedCount }) => {
  return (
    <nav className="bg-white shadow-cute">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <GiCoffeeCup className="text-2xl text-pink-500" />
            <a className="text-xl font-bold text-pink-600">Knowledge Cafe ☕</a>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-pink-100 px-3 py-1 rounded-full border-2 border-pink-200">
              <FaBookOpen className="text-pink-500" />
              <span className="text-pink-600 font-medium">
                {readingTime} mins
              </span>
            </div>

            <div className="relative">
              <button className="p-2 text-pink-500 hover:text-pink-600 transition-all hover:animate-wiggle">
                <FaShoppingCart className="text-xl" />
                {bookmarkedCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {bookmarkedCount}
                  </span>
                )}
              </button>
            </div>

            <div className="dropdown dropdown-end">
              <div tabIndex={0} className="avatar cursor-pointer">
                <div className="w-10 rounded-full ring-2 ring-pink-400 ring-offset-2">
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    alt="User"
                    className="hover:rotate-12 transition-transform"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-white shadow-cute rounded-2xl w-52 mt-2 z-10 border-2 border-pink-200"
              >
                <li>
                  <a className="hover:bg-pink-100 text-pink-600">👤 Profile</a>
                </li>
                <li>
                  <a className="hover:bg-pink-100 text-pink-600">⚙️ Settings</a>
                </li>
                <li>
                  <a className="hover:bg-pink-100 text-pink-600">👋 Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
