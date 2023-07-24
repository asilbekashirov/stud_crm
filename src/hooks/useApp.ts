import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux";
import axios from "axios";
import { appSlice } from "../redux/store/app";
import { useNavigate } from "react-router-dom";

export function useApp() {
  const token = useAppSelector((state) => state.app.token);
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

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
          navigate('/login')
        }
        return error.response;
      }
    );
  }, [token]);
}
