import { useCallback } from 'react'
import { FetchReturn, IApiData } from '../model/data.interface'

const URL: string = 'https://api.exchangerate.host/latest?base='

export const useFetch = (): FetchReturn => {
    const fetchData = useCallback(async (base: string): Promise<IApiData> => {
        let data: Promise<IApiData> = await fetch(URL + base)
            .then((response) => response.json())
            .then((res) => {
                return res
            })
            .catch((error) => console.log(error))

        return data
    }, [])

    return { fetchData }
}
