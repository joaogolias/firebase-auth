
export interface Config {
    firebase: {
        [index: string]: string
        projectId: string,
        clientEmail: string,
        privateKey: string
        apiKey: string
    }
}


export const getConfig = (): Config => {
    return {} as Config
}

