import { useQuery } from "@tanstack/react-query"
import Card from "../../components/card/Card"
import api from "../../api/analytics"
import UniByCountry from "../../components/analytics/UniByCountry"
import Separator from "../../components/separator/Separator"

const AnalyticsPage = () => {


    const {data, isLoading, isError} = useQuery({
        queryKey: ["analytics"],
        queryFn: () => api.getAnalytics()
    })

    console.log(data);

    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Error</p>

    return (
        <div className="grid grid-cols-2">
            <Card className="h-[32rem]">
                <h3 className="text-2xl font-bold">Universities by countries</h3>
                <UniByCountry data={data?.data.countriesAndCounts} />
            </Card>
        </div>
    )
}

export default AnalyticsPage