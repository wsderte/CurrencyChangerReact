type ObjectAlias = object

export interface IApiData extends ObjectAlias {
    rates: {
        [key: string]: number
    }
    data?: {
        motd?: {
            msg: string
            url: string
        }
        success?: boolean
        base?: string
        date?: string
        rates?: {
            [key: string]: number
        }
    }
}
