import { useQuery } from "@tanstack/react-query"
import Card from "../../components/card/Card"
import api from "../../api/analytics"
import UniByCountry from "../../components/analytics/UniByCountry"

const AnalyticsPage = () => {


    const {data, isLoading} = useQuery({
        queryKey: ["analytics"],
        queryFn: () => api.getAnalytics()
    })

    console.log(data);

    if (isLoading) return <p>Loading...</p>

    return (
        <div>
            <Card className="h-96">
                <UniByCountry data={data?.data.countriesAndCounts} />
            </Card>
        </div>
    )
}

export default AnalyticsPage