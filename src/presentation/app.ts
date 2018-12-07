import * as express from 'express'
import * as bodyParser from 'body-parser'
import { Routes } from './router'

class App {
    private app: express.Application
    private routerCtrl = new Routes()
    constructor(){
        this.app = express()
        this.config()
    }

    public getApp(): express.Application {
        return this.app
    }

    private config(): void{
        this.routerCtrl.setRoutes(this.app)

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }))
    }

}

export default new App().getApp()