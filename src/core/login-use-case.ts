import { LoginInput } from "../presentation/endpoints/firebase-login"
import { AuthDataSource, AuthInfo } from "./data-sources/auth-data-source"

export class LoginUseCase {
    constructor(
        private authDataSource: AuthDataSource
    ){}

    public async execute(input: LoginInput): Promise<AuthInfo> {
        return this.authDataSource.signInWithEmail(input.email, input.password)
    } 
}