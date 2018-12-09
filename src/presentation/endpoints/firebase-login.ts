import { FirebaseAuthDatabase } from "../../data/firebase-auth-database"
import { SignInUseCase } from "../../core/sign-in-use-case"
import { auth as Auth } from 'firebase'
import { Context } from "../../context"
import { AuthInfo } from "../../core/data-sources/auth-data-source"

export const SigninHandler = async (input: any, context: Context)  : Promise<AuthInfo>  => {   
    const loginInput: LoginInput = {
        email: input.email,
        password: input.password
    }

    const result = await new SignInUseCase(context.getAuthDataSource()).execute(loginInput)
    return result 
}

export interface LoginInput {
    email: string
    password: string
}