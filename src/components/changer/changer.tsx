import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

// import { useFetch } from '../../service/useFetch'
import { IApiData } from './../../model/data.interface'
import { useFetch2 } from '../../service/useFetch2'

import './changer.css'

type FormValues = {
    'left-input': string
    'left-select': string
    'right-input': string
    'right-select': string
}

type SelectedValue = 'left' | 'right'

// TO DO  change INTERFACE IApiDATA TO NORMAL !!!!

export const Changer = () => {
    const { register, handleSubmit, setValue, getValues } =
        useForm<FormValues>()
    const [leftBase, setLeftBase] = useState<IApiData>()
    const [rightBase, setRightBase] = useState<IApiData>()
    const { fetchData } = useFetch2()

    const multiplicationCalcFunc = (
        base: IApiData,
        selectedValueFlag: SelectedValue
    ) => {
        let multiplicator: number = 1
        let leftSelectValue: string = getValues('left-select') || 'USD'
        let rightSelectValue: string = getValues('right-select') || 'USD'

        let selectedValue =
            selectedValueFlag === 'left' ? rightSelectValue : leftSelectValue

        if (leftSelectValue !== rightSelectValue) {
            console.log(leftSelectValue, rightSelectValue, ' VALUES ')
            multiplicator = base.rates?.[selectedValue]
        }
        return multiplicator
    }

    const onChange: SubmitHandler<FormValues> = (data): void =>
        console.log(data)

    const onLeftInputChange = async (
        data: React.ChangeEvent<HTMLInputElement>
    ): Promise<void> => {
        let mult = 1
        if (leftBase) {
            mult = multiplicationCalcFunc(leftBase, 'left')
        } else {
            let base: IApiData = await fetchData('USD').then((value) => value)
            setLeftBase(base)
        }

        setValue('right-input', '' + +data.target.value * mult)
    }

    const onLeftSelectChange = async (
        data: React.ChangeEvent<HTMLSelectElement>
    ) => {
        let base: IApiData = await fetchData(data.target.value).then(
            (value) => value
        )
        setLeftBase(base)

        let multiplicator: number = 1
        let leftInputValue: number = +getValues('left-input') || 0
        let rightSelectValue: string = getValues('right-select') || 'USD'

        if (data.target.value !== rightSelectValue) {
            multiplicator = base.rates?.[rightSelectValue]
        }

        setValue('right-input', '' + leftInputValue * multiplicator)
    }

    const onRightInputChange = async (
        data: React.ChangeEvent<HTMLInputElement>
    ): Promise<void> => {
        let mult = 1
        if (rightBase) {
            mult = multiplicationCalcFunc(rightBase, 'right')
        } else {
            let base: IApiData = await fetchData('USD').then((value) => value)
            setRightBase(base)
        }

        setValue('left-input', '' + +data.target.value * mult)
    }

    const onRightSelectChange = async (
        data: React.ChangeEvent<HTMLSelectElement>
    ) => {
        let base: IApiData = await fetchData(data.target.value).then(
            (value) => value
        )
        setRightBase(base)

        let multiplicator: number = 1
        let rightInputValue: number = +getValues('right-input') || 0
        let leftSelectValue: string = getValues('left-select') || 'USD'

        if (data.target.value !== leftSelectValue) {
            multiplicator = base.rates?.[leftSelectValue]
        }

        setValue('left-input', '' + rightInputValue * multiplicator)
    }

    return (
        <form onChange={handleSubmit(onChange)}>
            <div className="converter-wrap">
                <div className="converter-container">
                    <div className="converter-selection">
                        <div className="converter-block">
                            <p className="converter-text">You have</p>
                            <input
                                {...register('left-input')}
                                onInput={onLeftInputChange}
                                type="text"
                                className="converter-input"
                            />
                            <select
                                {...register('left-select')}
                                onChange={onLeftSelectChange}
                                className="converter-select"
                            >
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="UAH">UAH</option>
                            </select>
                        </div>

                        <div className="converter-block">
                            <p className="converter-text">You get</p>
                            <input
                                {...register('right-input')}
                                onInput={onRightInputChange}
                                type="text"
                                className="converter-input"
                            />
                            <select
                                className="converter-select"
                                {...register('right-select')}
                                onChange={onRightSelectChange}
                            >
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="UAH">UAH</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
