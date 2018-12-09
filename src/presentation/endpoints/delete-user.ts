import { Context } from "../../context"
import { DeleteUserUseCase } from "../../core/delete-user-use-case"

export const DeleteUserHandler = async (input: any, context: Context): Promise<string>  => {   
    const deleteUserHandlerInput: DeleteUserHandlerInput = {
        id: input.id
    }

    const result = await new DeleteUserUseCase(context.getAuthDataSource())
                        .execute(deleteUserHandlerInput)
    return result 
}

export interface DeleteUserHandlerInput {
    id: string
}