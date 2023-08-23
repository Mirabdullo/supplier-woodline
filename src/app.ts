import express from "express"
import { dbConnection } from "./config/dbconfig"
import cors from "cors"
import * as bodyParser from "body-parser"
import {Routes} from ".//interface/router.interface"
import { Database } from "./database/dbConnection"
import errorMiddleware from "./middleware/errorMiddleware"



class App {
    public app: express.Application;
    public port: number = 3000;
    public db: Database
    constructor(routes: Routes[]) {
        this.app = express()


        this.connectionToDatabase()
        this.initializeMiddleware()
        this.initializeRoutes(routes)
        this.initializeErrorHandler()
    }



    public listen() {
        this.app.listen(this.port)
        console.log(`Server is running: http://localhost:${this.port}`);
    }


    public async connectionToDatabase() { 
        this.db = new Database()
    }


    private initializeMiddleware() {
        this.app.use(cors())
        this.app.use(express.json)
        this.app.use(bodyParser.urlencoded({ extended: true }))
        this.app.use(bodyParser.json())
    }


    private initializeRoutes(routes: Routes[]) {
        routes.forEach((route: any) => {
            this.app.use("/", route.router)
        })
    }


    private initializeErrorHandler() {
        this.app.use(errorMiddleware)
    }
}

export default App