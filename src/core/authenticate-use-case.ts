import { AuthDataSource, AuthInfo } from "./data-sources/auth-data-source"
import { AuthenticateHandlerInput } from "../presentation/endpoints/authenticate"

export class AuthenticateUseCase {
    constructor(private authDataSource: AuthDataSource){}

    public async execute(input: AuthenticateHandlerInput): Promise<AuthInfo>{
			let authInfo: AuthInfo
			if(!input.provider) {
				authInfo = await this.authDataSource.authenticate(input.token)
			} else {
				if (input.provider === 'facebook') {
					authInfo = await this.authDataSource.facebookAuthenticate(input.token)
				}
			}
      return authInfo
    }
}
