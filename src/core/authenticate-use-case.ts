import { AuthDataSource, AuthInfo } from "./data-sources/auth-data-source"
import { AuthenticateHandlerInput } from "../presentation/endpoints/authenticate"

export class AuthenticateUseCase {
    constructor(private authDataSource: AuthDataSource){}

    public async execute(input: AuthenticateHandlerInput): Promise<AuthInfo>{
        return this.authDataSource.authenticate(input.token, input.refreshToken)
    }
}
