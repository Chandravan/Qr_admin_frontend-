import { data, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/authContext";

export const Navbar1 = () => {
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  console.log("Navbar mein user ka data:", user);
  return (
    <div className=" flex justify-between items-center w-full px-10 bg-amber-700 ">
      <div>
        <a href="#"> logo</a>
      </div>
      <div className="">
        <ul className="flex  items-center gap-10">
          <li>
            <a href="#" className="block hover:bg-red-500 rounded">
              Product
            </a>
          </li>
          <li>
            <a href="#" className="block hover:bg-red-500">
              customer
            </a>
          </li>
          <li>
            <a href="#" className="block hover:bg-red-500">
              pricing
            </a>
          </li>
          <li>
            <a href="#" className="block hover:bg-red-500">
              Resources
            </a>
          </li>
          {isLoggedIn ? (
            <>
              <li className="font-medium text-yellow-300">
                hi {user?.name || "User"}
              </li>
              <li>
                <button
                  onClick={logout}
                  className="bg-red-600 px-4 py-1 rounded hover:bg-red-800 transition-all"
                >
                  {" "}
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <a href="/login" className="block hover:bg-red-500">
                  Sign in
                </a>
              </li>
              <li>
                <Link to="/SignUp" className=" block hover:bg-red-500">
                  SignUp
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};
