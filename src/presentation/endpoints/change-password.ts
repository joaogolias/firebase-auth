import { Context } from "../../context"
import { ChangePasswordUseCase } from "../../core/change-password-use-case"

export const ChangePasswordHandler = async (input: any, context: Context): Promise<string>  => {   
    const changePassowrdHandlerInput: ChangePassowrdHandlerInput = {
        token: input.headers['token'] as string,
        newPassword: input.body.newPassword
    }

    const result = await new ChangePasswordUseCase(context.getAuthDataSource())
                        .execute(changePassowrdHandlerInput)
    return result 
}

export interface ChangePassowrdHandlerInput {
    token: string
    newPassword: string
}