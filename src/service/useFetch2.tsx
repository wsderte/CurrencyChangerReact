import { useCallback } from 'react'
import { IApiData } from './../model/data.interface'

const URL: string = 'https://api.exchangerate.host/latest?base='

// type FetchReturn = [
//     data: object | undefined,
//     loading: boolean,
//     refresh: () => void,
//     statusCode: number
// ]

// type ConditionalProps = GetProps | PostProps;

export const useFetch2 = () => {
    const fetchData = useCallback(async (base: string): Promise<IApiData> => {
        let data: Promise<IApiData> = await fetch(URL + base)
            .then((response) => response.json())
            .then((res) => {
                // res.rates.content && setdata(res.rates.content);
                return res
            })
            .catch((error) => console.log(error))

        return data
    }, [])

    return { fetchData }
}
