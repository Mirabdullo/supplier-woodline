import App from "./app";
import ModelRoutes from "./routes/model.routes";
import OrderRoutes from "./routes/order.routes";
import ProductRoutes from "./routes/product.routes";
import UserRouter from "./routes/user.routes";
import WarehouseRoutes from "./routes/warehouse.routes";

const app: App = new App([
    new UserRouter(),
    new WarehouseRoutes(),
    new ProductRoutes(),
    new ModelRoutes(),
    new OrderRoutes()
]);

app.listen();
