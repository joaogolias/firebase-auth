import { Application, Request, Response } from 'express'
import { HelloWorldHandler } from './endpoints/helloWolrd';

export class Routes {
    public setRoutes(app: Application){
        app.route('/hello-world').get((req: Request, res: Response) => {
            const response = HelloWorldHandler()
            res.status(200).send({
                message: response
            })
        })
    }
}