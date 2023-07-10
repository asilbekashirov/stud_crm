import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux";
import axios from "axios";
import { appSlice } from "@/redux/store/app";
import { useRouter } from "next/router";

export function useApp() {
  const token = useAppSelector((state) => state.app.token);
  const dispatch = useAppDispatch();
  const router = useRouter()

  // set default server address
  axios.defaults.baseURL = "http://localhost:5000/api";

  useEffect(() => {
    // if token exists, set it to headers
    if (!token) return;
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;

    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error?.response?.status === 401) {
          dispatch(appSlice.actions.logout())
          router.push('/login')
        }
        return error.response;
      }
    );
  }, [token]);
}
