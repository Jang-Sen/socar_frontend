export const BASE_URL = "http://localhost:81/api/v1";
export const DOMAIN_URL = "http://jangsen.duckdns.org:81/api/v1";

export const API_ENDPOINT = {
  AUTH: {
    SIGNUP: `${BASE_URL}/auth/signup`,
    LOGIN: `${BASE_URL}/auth/login`,
    USER_INFO: `${BASE_URL}/auth`,
    UPDATE_PROFILE: `${BASE_URL}/user`,
    REFRESH: `${BASE_URL}/auth/refresh`,
    SEND_EMAIL: `${BASE_URL}/auth/email/send`,
    CHECK_EMAIL: `${BASE_URL}/auth/email/check`,
    FIND_PASSWORD: `${BASE_URL}/auth/find/password`,
    UPDATE_PASSWORD: `${BASE_URL}/auth/update/password`,
  },
  SOCIAL: {
    GOOGLE: `${BASE_URL}/auth/google`,
    NAVER: `${BASE_URL}/auth/naver`,
    KAKAO: `${BASE_URL}/auth/kakao`,
  },
  CAR: {
    LIST: `${BASE_URL}/car/findAll`,
    DETAIL: `${BASE_URL}/car/find/:id`,
  },
};
