import { Express, Request, Response, NextFunction } from 'express';

import { validateRequest, requiresUser } from '../middlewares';

import {
  createUserSchema,
  createUserSessionSchema,
} from '../schemas/user.schema';

import {
  registerUser,
  loginUser,
  invalidateUserLogin,
} from '../controllers/auth.controller';
import { getUserSession } from '../controllers/session.controller';

export default function (app: Express) {
  // app.use((req: Request, res: Response, next: NextFunction) => {
  //   res.header(
  //     'Access-Control-Allow-Headers',
  //     'authorization, Origin, Content-Type, Access'
  //   );
  //   next();
  // });

  app.get('/', (req: Request, res: Response) => {
    res.send({
      message: 'Express is working',
    });
  });

  // Register user
  app.post('/api/users', validateRequest(createUserSchema), registerUser);

  // Login user
  app.post(
    '/api/sessions',
    validateRequest(createUserSessionSchema),
    loginUser
  );

  // Get user's session
  app.get('/api/sessions', requiresUser, getUserSession);

  // Logout (delete session)
  app.delete('/api/sessions', requiresUser, invalidateUserLogin);
}
