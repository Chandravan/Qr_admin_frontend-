import { createContext, useState, useEffect } from "react";
import { checkAuth } from "../Services/api";
import { logout as logoutApi } from "../Services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLogedIn] = useState(false);
  const [user, setuser] = useState(null);
  const [loding, setLoding] = useState(true);

  useEffect(() => {
    const check = async () => {
      try {
        const response = await checkAuth();
        if (response.status == 200) {
          setLogedIn(true);
          setuser(response.data);
        }
      } catch (error) {
        setLogedIn(false);
        setuser(null);
      } finally {
        setLoding(false);
      }
    };

    check();
  }, []);

  const login = (userData) => {
    console.log("context mein user set ho raha hai :", userData);
    setLogedIn(true);
    setuser(userData);
  };

  const logout = async () => {
    try {
      const response = await logoutApi();
      if (response.status == 200) {
        setLogedIn(false);
        setuser(null);
      }
    } catch (error) {
      console.error("Logout error:", error);
      setLogedIn(false);
      setuser(null);
    }
  };
  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, loding }}>
      {!loding && children}
    </AuthContext.Provider>
  );
};
