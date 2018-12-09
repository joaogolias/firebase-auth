import { AuthDataSource  } from "./data-sources/auth-data-source"
import { UnbanUserHandlerInput } from "../presentation/endpoints/unbanUser"

export class UnbanUserUseCase {
    constructor(private authDataSource: AuthDataSource){}

    public async execute(input: UnbanUserHandlerInput): Promise<string>{
        return this.authDataSource.unbanUser(input.id)
    }
}
