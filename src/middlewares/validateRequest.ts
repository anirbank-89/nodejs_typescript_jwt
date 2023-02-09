import { AnySchema } from 'yup';
import { Request, Response, NextFunction } from 'express';
import log from '../logger';

const validate =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      return next();
    } catch (e: any) {
      log.error(e, 'thisisisis');
      return res.status(400).send({ error: e.errors });
    }
  };

export default validate;
