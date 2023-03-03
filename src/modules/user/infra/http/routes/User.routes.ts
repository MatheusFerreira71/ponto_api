import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import UserController from '../controllers/UserController';
import Auth from '../../../../../shared/middleware/Auth';

const userRouter = Router();

const userController = new UserController();

userRouter.post(
  '/user',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net', 'br'] },
        })
        .required(),
      password: Joi.string().allow(),
      link: Joi.string().allow(),
    },
  }),
  userController.create,
);

userRouter.get(
  '/users',
  celebrate({
    [Segments.QUERY]: {
      search: Joi.string().allow(),
      offset: Joi.number().integer().required(),
      limit: Joi.number().integer().required(),
    },
  }),
  Auth,
  userController.findAll,
);

userRouter.get('/user', Auth, userController.findOne);

userRouter.get(
  '/user/hasPassword',
  celebrate({
    [Segments.QUERY]: {
      email: Joi.string().required(),
    },
  }),
  userController.hasPassword,
);

userRouter.post(
  '/support',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      storeName: Joi.string().required(),
      email: Joi.string().required(),
      cellphone: Joi.string().allow(''),
      details: Joi.string().required(),
    },
  }),
  Auth,
  userController.support,
);

userRouter.put(
  '/user',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().allow(''),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net', 'br'] },
        })
        .allow(''),
    },
  }),
  Auth,
  userController.update,
);

userRouter.delete('/user/:id', Auth, userController.delete);

export default userRouter;
