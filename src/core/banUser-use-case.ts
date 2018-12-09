import { AuthDataSource  } from "./data-sources/auth-data-source"
import { BanUserHandlerInput } from "../presentation/endpoints/banUser"

export class BanUserUseCase {
    constructor(private authDataSource: AuthDataSource){}

    public async execute(input: BanUserHandlerInput): Promise<string>{
        const credentials = await this.authDataSource.authenticate(input.token)
        return this.authDataSource.banUser(credentials.id)
    }
}
