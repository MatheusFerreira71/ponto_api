import { Router } from 'express';
import categoryRouter from './modules/category/infra/http/routes/Category.routes';
import imageRouter from './modules/image/infra/http/routes/Image.routes';
import productRouter from './modules/product/infra/http/routes/Product.routes';
import sessionsRouter from './modules/user/infra/http/routes/Session.routes';
import userRouter from './modules/user/infra/http/routes/User.routes';

const routes = Router();

routes.use('/', userRouter);
routes.use('/', sessionsRouter);
routes.use('/', categoryRouter);
routes.use('/', productRouter);
routes.use('/', imageRouter);

export default routes;
