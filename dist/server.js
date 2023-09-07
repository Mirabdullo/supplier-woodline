"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const furniture_type_routes_1 = __importDefault(require("./routes/furniture_type.routes"));
const model_routes_1 = __importDefault(require("./routes/model.routes"));
const order_routes_1 = __importDefault(require("./routes/order.routes"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const warehouse_routes_1 = __importDefault(require("./routes/warehouse.routes"));
const app = new app_1.default([
    new user_routes_1.default(),
    new warehouse_routes_1.default(),
    new product_routes_1.default(),
    new model_routes_1.default(),
    new order_routes_1.default(),
    new furniture_type_routes_1.default()
]);
app.listen();
//# sourceMappingURL=server.js.map