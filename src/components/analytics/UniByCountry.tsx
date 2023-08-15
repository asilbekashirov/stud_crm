import { useQuery } from "@tanstack/react-query"
import { PieChart, ResponsiveContainer } from "recharts"

const UniByCountry = () => {

    const {} = useQuery({
        queryFn: () => {}
    })

    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart width={500} height={500}>

            </PieChart>
        </ResponsiveContainer>
    )
}

export default UniByCountry