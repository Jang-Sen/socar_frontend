import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axiosInstance from "../api/apiInstanse";
import { API_ENDPOINT } from "../constant/api";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");

    setUser(null);
  };

  const refreshAccessToken = async () => {
    if (isRefreshing) return; // 🔥 이미 refreshToken 요청 중이면 실행 안 함

    const refreshToken = Cookies.get("refreshToken");
    if (!refreshToken) {
      logout();
      return;
    }

    try {
      setIsRefreshing(true);
      const { data } = await axiosInstance.post(
        API_ENDPOINT.AUTH.REFRESH,
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        },
      );

      Cookies.set("accessToken", data.accessToken, {
        expires: 1,
        secure: true,
      });
      setUser({ token: data.accessToken });
    } catch (error) {
      console.error("Refresh token failed. Logging out...");
      logout();
    } finally {
      setIsRefreshing(false); // 🔥 요청이 끝나면 다시 실행 가능
    }
  };

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");

    if (!accessToken) {
      refreshAccessToken(); // 🔥 accessToken이 없을 때만 실행
    } else {
      setUser({ token: accessToken });
    }

    setLoading(false); // 로딩 완료
  }, []);

  if (loading) {
    return <div>Loading ...</div>;
  }

  const login = (token) => {
    Cookies.set("accessToken", token, { expires: 1, secure: true });

    setUser({ token });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("Error useAuth");
  }

  return context;
};
