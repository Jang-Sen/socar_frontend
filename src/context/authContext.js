import { createContext, useContext, useEffect, useState } from "react";
import Cookie from "js-cookie";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const accessToken = Cookie.get("accessToken");

    setUser({ token: accessToken });
  }, []);

  const login = (token) => {
    Cookie.set("accessToken", token, { expires: 1, secure: true });

    setUser({ token });
  };

  const logout = () => {};

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext();

  if (!context) {
    throw new Error("Error useAuth");
  }

  return context;
};
