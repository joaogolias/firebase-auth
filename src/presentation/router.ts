import { Application, Request, Response } from 'express'
import { SigninHandler } from './endpoints/firebase-login'
import { SignUpHandler } from './endpoints/firebase-signup'
import { Context, AuthType } from '../context'
import { SendResetPasswordEmailHandler } from './endpoints/send-reset-password-email'
import { AuthenticateHandler } from './endpoints/authenticate';
import { SignOutHandler } from './endpoints/sign-out';

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

        app.route('/firebase/reset-password-email').get(async (req: Request, res: Response): Promise<any> => {
            try{
                if(!(req.query && req.query['email'])) {
                    throw new Error('Missing email parameter')
                }
                const email = req.query['email']
                const result = await SendResetPasswordEmailHandler(
                    { email }, 
                    new Context(AuthType.Firebase))

                res.status(200).send(result)
            } catch (err) {
                res.status(400).send(err)
            }
        })

        app.route('/firebase/authenticate').get(async (req: Request, res: Response): Promise<any> => {
            try{
                const result = await AuthenticateHandler(
                    req.headers, 
                    new Context(AuthType.Firebase))
                res.status(200).send(result)
            } catch (err) {
                res.status(400).send(err)
            }
        })

        app.route('/firebase/sign-out').get(async (req: Request, res: Response): Promise<any> => {
            try{
                const result = await SignOutHandler(
                    req.headers, 
                    new Context(AuthType.Firebase))
                res.status(200).send(result)
            } catch (err) {
                res.status(400).send(err)
            }
        })
    }
}