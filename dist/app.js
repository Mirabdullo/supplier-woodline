"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const bodyParser = __importStar(require("body-parser"));
const dbConnection_1 = require("./database/dbConnection");
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const errorMiddleware_1 = __importDefault(require("./middleware/errorMiddleware"));
class App {
    constructor(routes) {
        this.port = 3000;
        this.app = (0, express_1.default)();
        this.initializeSwagger();
        this.connectionToDatabase();
        this.initializeMiddleware();
        this.initializeRoutes(routes);
        this.initializeErrorHandler();
    }
    listen() {
        this.app.listen(this.port);
        console.log(`Server is running: http://localhost:${this.port}`);
    }
    async connectionToDatabase() {
        this.db = new dbConnection_1.Database();
    }
    initializeMiddleware() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
    }
    initializeRoutes(routes) {
        routes.forEach((route) => {
            this.app.use("/", route.router);
        });
    }
    initializeSwagger() {
        const options = {
            swaggerDefinition: {
                info: {
                    title: "WOODLINE",
                    version: "1.0.0",
                    description: "Woodline B2B REST API By NodeJs, TypeScript, PostgreSQL",
                },
                securityDefinitions: {
                    BearerAuth: {
                        type: "apiKey",
                        name: "Authorization",
                        in: "header",
                    },
                },
                paths: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, yamljs_1.default.load("./swagger/auth.yaml").paths), yamljs_1.default.load("./swagger/product.yaml").paths), yamljs_1.default.load("./swagger/order.yaml").paths), yamljs_1.default.load("./swagger/furnitureType.yaml").paths), yamljs_1.default.load("./swagger/model.yaml").paths), yamljs_1.default.load("./swagger/warehouse.yaml").paths),
                definitions: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, yamljs_1.default.load("./swagger/auth.yaml").definitions), yamljs_1.default.load("./swagger/product.yaml").definitions), yamljs_1.default.load("./swagger/furnitureType.yaml").definitions), yamljs_1.default.load("./swagger/model.yaml").definitions), yamljs_1.default.load("./swagger/warehouse.yaml").definitions),
            },
            apis: ["app.ts"],
        };
        const specs = (0, swagger_jsdoc_1.default)(options);
        this.app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
    }
    initializeErrorHandler() {
        this.app.use(errorMiddleware_1.default);
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map