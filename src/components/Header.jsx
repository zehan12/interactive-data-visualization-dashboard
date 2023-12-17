import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout, auth } from "../firebase";
import useAuth from "../hooks/useAuth.hook";

const Header = () => {
  const user = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 1023);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = () => {
    logout()
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout failed:", error.message);
      });
  };

  return (
    <header className="bg-fuchsia-700">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="text-white font-mono">Data Visual App</span>
          </a>
        </div>
        {isMobileView ? (
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-indigo-300"
              onClick={toggleMobileMenu}
            >
              <span className="">III</span>
            </button>
          </div>
        ) : (
          <div className="hidden lg:flex lg:gap-x-12">
            {user ? (
              <>
                <a className="text-sm font-semibold leading-6 text-white">
                  <Link to="/">Dashboard</Link>
                </a>
              </>
            ) : (
              <>
                <a className="text-sm font-semibold leading-6 text-white">
                  <Link to="/login">Login</Link>
                </a>
                <a className="text-sm font-semibold leading-6 text-white">
                  <Link to="/signup">Signup</Link>
                </a>
              </>
            )}
          </div>
        )}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {user ? (
            <button
              onClick={handleLogout}
              className="text-sm font-semibold leading-6 text-white"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="text-sm font-semibold leading-6 text-white"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </nav>
      {isMobileMenuOpen && isMobileView && (
        <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="text-black font-mono">Data Visual App</span>
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={toggleMobileMenu}
            >
              <div className="">III</div>
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {user ? (
                  <>
                    <a className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                      <Link to="/">Dashboard</Link>
                    </a>
                  </>
                ) : (
                  <>
                    <a className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                      <Link to="/login">Log in</Link>
                    </a>
                    <a className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                      <Link to="/signup">Sign up</Link>
                    </a>
                  </>
                )}
              </div>
              <div className="py-6">
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
