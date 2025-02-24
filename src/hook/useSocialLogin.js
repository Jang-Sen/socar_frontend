import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINT } from "../constant/api";

export const useGoogleLogin = () => {
  return useMutation({
    mutationFn: async () => {
      return new Promise((resolve, reject) => {
        const width = 500;
        const height = 600;
        const left = window.innerWidth / 2 - width / 2;
        const top = window.innerHeight / 2 - height / 2;

        const loginWindow = window.open(
          API_ENDPOINT.SOCIAL.GOOGLE,
          "Google Login",
          `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`,
        );

        const messageListener = (event) => {
          console.log(event);

          if (event.origin !== "http://localhost") return;

          const { user, accessToken } = event.data;

          if (accessToken) {
            console.log(user);

            if (loginWindow) {
              loginWindow.close();
              resolve(user);
            }
          } else {
            reject(new Error("구글 로그인 실패"));
          }
        };

        window.addEventListener("message", messageListener);

        // 창이 닫히면 이벤트 리스너 제거
        const checkPopupClosed = setInterval(() => {
          if (loginWindow?.closed) {
            clearInterval(checkPopupClosed);
            window.removeEventListener("message", messageListener);

            reject(new Error("구글 로그인 창 닫기"));
          }
        }, 500);
      });
    },
    onSuccess: () => {},
    onError: (error) => {
      console.error("Error Google Login: ", error.response.data.message);
    },
  });
};

export const useNaverLogin = () => {};

export const useKakaoLogin = () => {};
