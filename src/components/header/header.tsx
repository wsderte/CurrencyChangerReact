import './header.css'
import { IApiData } from './../../model/data.interface'
import { useFetch } from '../../service/useFetch'
import { useEffect, useState } from 'react'
import React from 'react'

const HeaderName: React.FC = () => {
    const [currencyUSD, setCurrencyUSD] = useState<IApiData>()
    const [currencyEUR, setCurrencyEUR] = useState<IApiData>()
    const { fetchData } = useFetch()

    const func = async (): Promise<void> => {
        await fetchData('USD').then((value): void => setCurrencyUSD(value))
        await fetchData('EUR').then((value): void => setCurrencyEUR(value))
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
                        1 UAH = USD {currencyUSD?.rates?.['UAH']}
                    </div>

                    <div className="header-currency">
                        1 UAH = EUR {currencyEUR?.rates?.['UAH']}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(HeaderName)
