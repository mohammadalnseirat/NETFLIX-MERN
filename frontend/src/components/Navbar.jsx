import { Loader, LogOut, Menu, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authUser";
import { useState } from "react";
import { useContentStore } from "../store/content";

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user, logOut, isLoggoingOut } = useAuthStore();

  // ! Function To Toggle Navigation:
  const toggleMenu = () => setIsMobileOpen(!isMobileOpen);

  //? use content store to update the type of content:
  const { contentType, setContentType } = useContentStore();

  return (
    <header className="max-w-6xl  mx-auto flex items-center flex-wrap justify-between p-4 h-20">
      <div className="flex gap-10 items-center z-50 mb-4 sm:mb-0">
        <Link to={"/"}>
          <img
            src="/netflix-logo.png"
            alt="image-logo"
            className="w-32 sm:w-40"
          />
        </Link>
        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-4 items-center">
          <Link
            to={"/"}
            className={`font-semibold hover:text-red-500 hover:underline hover:underline-offset-2 ${
              contentType === "movie" && "underline text-red-600"
            }`}
            onClick={() => setContentType("movie")}
          >
            Movie
          </Link>
          <Link
            to={"/"}
            className={`font-semibold hover:text-red-500 hover:underline hover:underline-offset-2 ${
              contentType === "tv" && "underline text-red-600"
            }`}
            onClick={() => setContentType("tv")}
          >
            TV Shows
          </Link>
          <Link
            to={"/history"}
            className={`font-semibold hover:text-red-500 hover:underline hover:underline-offset-2`}
          >
            Search History
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-2 z-50">
        <Link to={"/search"}>
          <Search className="size-7 cursor-pointer hover:rotate-90 hover:text-red-600 transition-all duration-200" />
        </Link>
        <img
          src={user.image}
          alt="user-avatar"
          className="rounded h-8 cursor-pointer"
        />
        <div onClick={logOut} className="cursor-pointer">
          {isLoggoingOut ? (
            <>
              <Loader className="size-7 animate-spin" />
            </>
          ) : (
            <LogOut className="size-7  hover:text-red-600 transition-all duration-200" />
          )}
        </div>
        <div className="sm:hidden">
          <Menu
            className="size-7  cursor-pointer hover:text-red-600 transition-all duration-200"
            onClick={toggleMenu}
          />
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileOpen && (
        <div className="w-full sm:hidden mt-4 z-50 bg-black border rounded-md border-red-600 transition-all duration-300">
          <Link
            to={"/"}
            onClick={() => {
              setContentType("movie");
              toggleMenu();
            }}
            className={`p-2 block hover:underline ${
              contentType === "movie" && "underline text-red-600"
            }`}
          >
            Movie
          </Link>
          <Link
            to={"/"}
            onClick={() => {
              setContentType("tv");
              toggleMenu();
            }}
            className={`p-2 block hover:underline ${
              contentType === "tv" && "underline text-red-600"
            }`}
          >
            TV Shows
          </Link>
          <Link
            to={"/history"}
            onClick={toggleMenu}
            className={`p-2 block hover:underline `}
          >
            Search History
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
