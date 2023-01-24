type ObjectAlias = object

export interface IApiData extends ObjectAlias {
    motd?: {
        msg: string
        url: string
    }
    success?: boolean
    base?: string
    date?: string
    rates: {
        [key: string]: number
    }
}

export type FetchReturn = { fetchData: (base: string) => Promise<IApiData> }
