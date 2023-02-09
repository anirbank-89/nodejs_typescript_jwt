import { Request, Response, NextFunction } from 'express';
import { get } from 'lodash';

const requiresUser = (req: Request, res: Response, next: NextFunction) => {
  const user = get(req, 'user');

  if (!user) {
    return res.status(403).send({ message: 'User not found' });
  }

  return next();
};

export default requiresUser;
