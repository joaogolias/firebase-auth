import { Context } from "../../context"
import { SendResetPasswordEmailUseCase } from "../../core/send-reset-password-email-use-case"
import { AuthenticateUseCase } from "../../core/authenticate-use-case"
import { AuthInfo } from "../../core/data-sources/auth-data-source";

export const AuthenticateHandler = async (input: any, context: Context): Promise<AuthInfo>  => {   
    const authenticateHandlerInput: AuthenticateHandlerInput = {
        token: input['token'] as string,
    }

    const result = await new AuthenticateUseCase(context.getAuthDataSource())
                        .execute(authenticateHandlerInput)
    return result 
}

export interface AuthenticateHandlerInput {
    token: string
}