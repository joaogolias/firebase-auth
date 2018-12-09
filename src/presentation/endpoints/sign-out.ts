import { Context } from "../../context"
import { AuthInfo } from "../../core/data-sources/auth-data-source"
import { SignOutUseCase } from "../../core/sign-out-use-case"

export const SignOutHandler = async (input: any, context: Context): Promise<void>  => {   
    const signOutHandlerInput: SignOutHandlerInput = {
        token: input['token'] as string,
        refreshToken: input['refresh-troken'] as string,
    }

    await new SignOutUseCase(context.getAuthDataSource()).execute(signOutHandlerInput)
    
}

export interface SignOutHandlerInput {
    token: string
    refreshToken: string
}