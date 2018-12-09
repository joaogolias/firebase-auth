import { FirebaseAuthDatabase } from "../../data/firebase-auth-database"
import { LoginUseCase } from "../../core/login-use-case"
import { auth as Auth } from 'firebase'
import { Context } from "../../context"
import { AuthInfo } from "../../core/data-sources/auth-data-source"

export const SigninHandler = async (input: any, context: Context)  : Promise<AuthInfo>  => {   
    const loginInput: LoginInput = {
        email: input.email,
        password: input.password
    }

    const result = await new LoginUseCase(context.getAuthDataSource()).execute(loginInput)
    return result 
}

export interface LoginInput {
    email: string
    password: string
}