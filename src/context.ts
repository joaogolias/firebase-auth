import { AuthDataSource } from "./core/data-sources/auth-data-source"
import { FirebaseAuthDatabase } from "./data/firebase-auth-database"

export class Context {
    private authDataSource: AuthDataSource

    constructor(authType: AuthType){
        if(authType === AuthType.Firebase) {
            this.authDataSource = new FirebaseAuthDatabase()
        }
    }

    public getAuthDataSource() {
        return this.authDataSource
    }
}

export enum AuthType {
    Cognito,
    Firebase
}