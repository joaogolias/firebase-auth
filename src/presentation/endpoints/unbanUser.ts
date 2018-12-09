import { Context } from "../../context"
import { UnbanUserUseCase } from "../../core/unbanUser-use-case";

export const UnbanUserHandler = async (input: any, context: Context): Promise<string>  => {   
    const unbanUserHandlerInput: UnbanUserHandlerInput = {
        id: input.id
    }

    const result = await new UnbanUserUseCase(context.getAuthDataSource())
                        .execute(unbanUserHandlerInput)
    return result 
}

export interface UnbanUserHandlerInput {
    id: string
}