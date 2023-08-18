import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux";
import axios from "axios";
import { appSlice } from "../redux/store/app";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import analyticsApi from '../api/analytics'
import { setCountries } from "../redux/store/utils";

export function useApp() {
  const token = useAppSelector((state) => state.app.token);
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const {data, status} = useQuery({
    queryKey: ["countries"],
    queryFn: () => analyticsApi.getAnalytics()
  })

  useEffect(() => {
    if (status !== "success") return

    const countries = data.data.countriesAndCounts.map(a => a.country)
    dispatch(setCountries(countries))
  }, [status])

  // set default server address
  axios.defaults.baseURL = process.env.NODE_ENV === "production" ? "https://md-back.onrender.com/api" : "http://localhost:5000/api";

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
