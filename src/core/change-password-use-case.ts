import { AuthDataSource, AuthInfo } from "./data-sources/auth-data-source"
import { AuthenticateHandlerInput } from "../presentation/endpoints/authenticate"
import { ChangePassowrdHandlerInput } from "../presentation/endpoints/change-password"

export class ChangePasswordUseCase {
    constructor(private authDataSource: AuthDataSource){}

    public async execute(input: ChangePassowrdHandlerInput): Promise<string>{
        return this.authDataSource.changePassword(input.token, input.newPassword)
    }
}
