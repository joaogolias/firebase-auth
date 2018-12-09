import { Context } from "../../context"
import { BanUserUseCase } from "../../core/banUser-use-case";

export const BanUserHandler = async (input: any, context: Context): Promise<string>  => {   
    const banUserHandlerInput: BanUserHandlerInput = {
        token: input['token'] as string,
    }

    const result = await new BanUserUseCase(context.getAuthDataSource())
                        .execute(banUserHandlerInput)
    return result 
}

export interface BanUserHandlerInput {
    token: string
}