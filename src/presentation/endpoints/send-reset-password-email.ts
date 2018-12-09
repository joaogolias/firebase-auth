import { Context } from "../../context"
import { SendResetPasswordEmailUseCase } from "../../core/send-reset-password-email"

export const SendResetPasswordEmailHandler = async (input: any, context: Context): Promise<string>  => {   
    const sendResetPasswordEmailInput: SendResetPasswordEmailInput = {
        email: input.email,
    }

    const result = await new SendResetPasswordEmailUseCase(context.getAuthDataSource())
                        .execute(sendResetPasswordEmailInput.email)
    return result 
}

export interface SendResetPasswordEmailInput {
    email: string
}