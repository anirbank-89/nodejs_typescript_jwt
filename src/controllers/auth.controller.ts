import { Request, Response } from 'express';
import { omit, get } from 'lodash';
import config from 'config';

import {
  createUser,
  validateEmailAndPassword,
  createAccessToken,
} from '../service/auth.service';
import { createSession, updateSession } from '../service/session.service';
import log from '../logger';
import { sign } from '../utils/jwt.utils';

export async function registerUser(req: Request, res: Response) {
  try {
    const user = await createUser(req.body);

    // Omitting the password from the response
    return res.status(201).send({ data: omit(user.toJSON(), 'password') });
  } catch (err) {
    log.error(err);
    return res.status(500).send({ error: err });
  }
}

export async function loginUser(req: Request, res: Response) {
  try {
    // validate email and password - service
    const user = await validateEmailAndPassword({
      email: req.body.email,
      pwd: req.body.password,
    });

    if (!user) {
      return res
        .status(401)
        .json({ status: false, message: 'Invalid email or password.' });
    }

    // create a session - service
    const session = await createSession(user._id, req.get('user-agent') || '');

    // create access token - utils
    const accessToken = createAccessToken({ user, session });

    // create refresh token - utils
    const refreshToken = sign(session, {
      expiresIn: config.get('refreshTokenTtl'),
    });

    // send access and refresh token back
    res.status(201).json({ accessToken, refreshToken, userDetails: user });
  } catch (err: any) {
    log.error(err);
    return res.status(500).send({ error: err.message });
  }
}

export async function invalidateUserLogin(req: Request, res: Response) {
  const sessionId = get(req, 'user.session');

  await updateSession({ _id: sessionId }, { $set: { valid: false } });

  return res.status(200).send({ message: 'Access token invalidated' });
}
