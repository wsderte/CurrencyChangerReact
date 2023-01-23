import { useState } from 'react'

export const ValueChanger = (base: string) => {
    const [state, setstate] = useState(null)
    const URL: string = 'https://api.exchangerate.host/latest?base='

    // async function a() {
    //     await fetch(URL + base)
    //         .then((response) => response.json())
    //         .then((data) => setstate(data))
    //         .catch((error) => console.log(error))
    // }
    // a()
    return state
}
