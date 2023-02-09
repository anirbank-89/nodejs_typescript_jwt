import { Request, Response } from 'express';
import { get } from 'lodash';

import { findSessions } from '../service/session.service';

export async function getUserSession(req: Request, res: Response) {
  const userId = get(req, 'user._id');

  const sessions = await findSessions({ user: userId, valid: true });

  return res.status(200).json({
    status: true,
    message: 'Data get successfully.',
    data: sessions,
  });
}
