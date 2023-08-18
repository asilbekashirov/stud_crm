import axios from "axios"
import { IAnalytics } from "../models/analytics"

export default {
    getAnalytics() {
        return axios.get<IAnalytics>("/analytics/analyze")
    },
    getCountries() {
        return axios.get<{countries: string[]}>("/analytics/countries")
    }
}