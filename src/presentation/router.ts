import { Application, Request, Response } from 'express'
import { HelloWorldHandler } from './endpoints/helloWolrd'
import { LoginHandler } from './endpoints/login'
import { SignUpHandler } from './endpoints/signup'

export class Routes {
    public setRoutes(app: Application){
        app.route('/hello-world').get((req: Request, res: Response) => {
            const response = HelloWorldHandler()
            res.status(200).send({
                message: response
            })
        })

        app.route('/login').post(async (req: Request, res: Response): Promise<any> => {
            try {
                if(!req.body) {
                    throw new Error('Missing Body')
                }
                const result = await LoginHandler(req.body)
                res.status(200).send(result)
            } catch (err) {
                console.log('err: ', err)
                res.status(400).send(err)
            }
        })

        app.route('/signup').post(async (req: Request, res: Response): Promise<any> => {
            try {
                if(!req.body) {
                    throw new Error('Missing Body')
                }
                const result = await SignUpHandler(req.body)

                res.status(200).send(result)
            } catch (err) {
                res.status(400).send(err)
            }
        })
    }
}