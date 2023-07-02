import { useEffect } from "react";
import { useAppSelector } from "./redux";
import axios from "axios";

export function useApp() {

    const token = useAppSelector(state => state.app.token)

    useEffect(() => {

        // set default server address
        axios.defaults.baseURL = "http://localhost:5000/api"

        // if token exists, set it to headers
        if (!token) return
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }, [token])
}