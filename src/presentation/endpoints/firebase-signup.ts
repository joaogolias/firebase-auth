import { SignUpUseCase } from "../../core/sign-up-use-case"
import { Context } from "../../context"
import { AuthInfo } from "../../core/data-sources/auth-data-source"

export const SignUpHandler = async (input: any, context: Context): Promise<AuthInfo>  => {   
    const signupInput: SignUp = {
        email: input.email,
        password: input.password
    }

    const result = await new SignUpUseCase(context.getAuthDataSource()).execute(signupInput)
    return result 
}

export interface SignUp {
    email: string
    password: string
}