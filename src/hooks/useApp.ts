import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux";
import axios from "axios";
import { appSlice, setUser } from "../redux/store/app";
import { useNavigate } from "react-router-dom";
import { useQueries, useQuery } from "@tanstack/react-query";
import analyticsApi from '../api/analytics'
import userApi from '../api/user'
import { setCountries } from "../redux/store/utils";

export function useApp() {
  const {token, user: {_id}} = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const [countriesRes, userRes] = useQueries({queries: [
      {
        queryKey: ["countries", 1],
        queryFn: () => analyticsApi.getCountries()
      },
      {
        queryKey: ["user", 2],
        queryFn: !!_id ? () =>  userApi.getProfile(_id) : () => null
      }
  ]})

  useEffect(() => {
    if (!userRes.data?.data) return
    if (userRes.status !== "success") return

    dispatch(setUser(userRes.data?.data.user))
  }, [userRes.status])

  useEffect(() => {
    if (countriesRes.status !== "success") return

    dispatch(setCountries(countriesRes.data.data.countries))
  }, [countriesRes.status])

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
