import { useQuery } from "@tanstack/react-query"
import api from '../api/universities'
import { useMemo, useState } from "react"
import { IUniFilter } from "../models/university"

export function useUniversities() {

    const [filter, setFilter] = useState<IUniFilter>({
        page: 1,
        limit: 10,
        searchKey: ''
    })

    const {data, isLoading, isError, refetch} = useQuery({
        queryKey: ["universities"],
        queryFn: () => api.getUniversities(filter)
    })
    const params = data?.data

    const handleFilter = (data: Partial<IUniFilter>) => {
        setFilter(prev => ({...prev, ...data}))
    }

    const nextPage = () => {
        setFilter(prev => ({...prev, page: prev.page + 1}))
        refetch()
    }

    const prevPage = () => {
        setFilter(prev => ({...prev, page: prev.page - 1}))
        refetch()
    }

    const paginationLabel = useMemo(() => {
        if (!!params && !Object.keys(params).length) return "Error"
        const firstParam = params!.limit * (params!.page - 1) + 1
        const secondParam = params!.limit * params!.page
        const thirdParam = params?.totalDocs || 0
        return `${firstParam} - ${secondParam > thirdParam ? thirdParam : secondParam} of ${thirdParam}`
      }, [params])

    return { isError, isLoading, params, handleFilter, nextPage, prevPage, paginationLabel }
}