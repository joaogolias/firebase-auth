import { LoginInput } from "../presentation/endpoints/firebase-login"
import { AuthDataSource, AuthInfo } from "./data-sources/auth-data-source"
import { SignOutHandlerInput } from "../presentation/endpoints/sign-out"

export class SignOutUseCase {
    constructor(
        private authDataSource: AuthDataSource
    ){}

    public async execute(input: SignOutHandlerInput): Promise<void> {
        return this.authDataSource.signOut(input.token)
    } 
}