import { Application, Request, Response } from 'express'
import { SigninHandler } from './endpoints/firebase-login'
import { SignUpHandler } from './endpoints/firebase-signup'
import { Context, AuthType } from '../context'

export class Routes {
    public setRoutes(app: Application){
        app.route('/firebase/signin').post(async (req: Request, res: Response): Promise<any> => {
            try {
                if(!req.body) {
                    throw new Error('Missing Body')
                }
                const result = await SigninHandler(req.body, new Context(AuthType.Firebase))
                res.status(200).send(result)
            } catch (err) {
                res.status(400).send(err)
            }
        })

        app.route('/firebase/signup').post(async (req: Request, res: Response): Promise<any> => {
            try {
                if(!req.body) {
                    throw new Error('Missing Body')
                }
                const result = await SignUpHandler(req.body, new Context(AuthType.Firebase))

                res.status(200).send(result)
            } catch (err) {
                res.status(400).send(err)
            }
        })
    }
}