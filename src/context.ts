import { AuthDataSource } from "./core/data-sources/auth-data-source";

export class Context {
    private authDataSource: AuthDataSource

    constructor(authType: AuthType){

    }

    public getAuthDataSource() {
        return this.authDataSource
    }
}

export enum AuthType {
    Cognito,
    Firebase
}