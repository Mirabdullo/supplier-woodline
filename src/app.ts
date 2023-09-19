import express from "express"
import cors from "cors"
import * as bodyParser from "body-parser"
import {Routes} from ".//interface/router.interface"
import { Database } from "./database/dbConnection"
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import errorMiddleware from "./middleware/errorMiddleware"



class App {
    public app: express.Application;
    public port: number = 3321;
    public db: Database
    constructor(routes: Routes[]) {
        this.app = express()

        this.initializeSwagger();
        this.connectionToDatabase()
        // this.initializeMiddleware()
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
        this.app.use(express.json())
        this.app.use(bodyParser.urlencoded({ extended: true }))
        this.app.use(bodyParser.json())
    }


    private initializeRoutes(routes: Routes[]) {
        routes.forEach((route: any) => {
            this.app.use("/", route.router)
        })
    }


    private initializeSwagger() {
        const options = {
            swaggerDefinition: {
                info: {
                    title: "WOODLINE",
                    version: "1.0.0",
                    description:
                        "Woodline B2B REST API By NodeJs, TypeScript, PostgreSQL",
                },
                securityDefinitions: {
                    BearerAuth: {
                        type: "apiKey",
                        name: "Authorization",
                        in: "header",
                    },
                },
                paths: {
                    ...YAML.load("./swagger/auth.yaml").paths,
                    ...YAML.load("./swagger/product.yaml").paths,
                    ...YAML.load("./swagger/order.yaml").paths,
                    ...YAML.load("./swagger/furnitureType.yaml").paths,
                    ...YAML.load("./swagger/model.yaml").paths,
                    ...YAML.load("./swagger/warehouse.yaml").paths,

                },
                definitions: {
                    ...YAML.load("./swagger/auth.yaml").definitions,
                    ...YAML.load("./swagger/product.yaml").definitions,
                    ...YAML.load("./swagger/furnitureType.yaml").definitions,
                    ...YAML.load("./swagger/model.yaml").definitions,
                    ...YAML.load("./swagger/warehouse.yaml").definitions,

                },
            },
            apis: ["app.ts"],
        };

        const specs = swaggerJSDoc(options);
        this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
    }


    private initializeErrorHandler() {
        this.app.use(errorMiddleware)
    }
}

export default App