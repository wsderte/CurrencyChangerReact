import './header.css'
// import { useFetch } from '../../service/useFetch'
import { IApiData } from './../../model/data.interface'
import { useFetch2 } from '../../service/useFetch2'
import { useEffect, useState } from 'react'

// const URL: string = 'https://api.exchangerate.host/latest?base=UAH'

export const HeaderName = () => {
    // const { data: currencyUSD }: IApiData | { data: null } = useFetch('USD')
    const [currencyUSD, setCurrencyUSD] = useState<IApiData>()
    const [currencyEUR, setCurrencyEUR] = useState<IApiData>()
    const { fetchData } = useFetch2()
    const func = async () => {
        const baseUSD: any = await fetchData('USD').then((value) => value)
        const baseEUR: any = await fetchData('EUR').then((value) => value)
        setCurrencyUSD(baseUSD)
        setCurrencyEUR(baseEUR)
    }

    useEffect(() => {
        return () => {
            func()
        }
    }, [])

    return (
        <div className="header-wrap">
            <div className="header-container">
                <div className="header-logo">Currency changer</div>
                <div className="header-box">
                    <div className="header-currency">
                        1UAH = USD {currencyUSD?.rates?.['UAH']}
                    </div>

                    <div className="header-currency">
                        1UAH = EUR {currencyEUR?.rates?.['UAH']}
                    </div>
                </div>
            </div>
        </div>
    )
}
