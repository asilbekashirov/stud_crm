import axios from "axios"

export default {
    getAnalytics() {
        return axios.get("/analytics/analyze")
    }
}