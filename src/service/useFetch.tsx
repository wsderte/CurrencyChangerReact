import { useEffect, useState } from 'react'
// import axios from 'axios'

const URL: string = 'https://api.exchangerate.host/latest?base='

export const useFetch = (base: string) => {
    const [data, setdata] = useState(null)
    // const [error, setError] = useState(null)
    // const [loading, setLoading] = useState(false)

    useEffect(() => {
        ;(async function () {
            try {
                // setLoading(true)
                await fetch(URL + base)
                    .then((response) => response.json())
                    .then((res) => {
                        // res.rates.content && setdata(res.rates.content);
                        setdata(res.rates)
                    })
                    .catch((error) => console.log(error))
            } finally {
                console.log(
                    'Getting data from https://api.exchangerate.host/latest?base=' +
                        base +
                        ' is over'
                )
                // setLoading(false)
            }
        })()
        // console.log('Fetch')
    }, [base])

    return { data } //error, loading
}
