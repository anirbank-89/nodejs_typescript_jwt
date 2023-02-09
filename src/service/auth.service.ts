import { DocumentDefinition, LeanDocument, FlattenMaps } from 'mongoose';
import { omit, get } from 'lodash';
import config from 'config';

import UserSchema, { UserDocument } from '../models/user.model';
import SessionSchema, { SessionDocument } from '../models/session.model';
import { sign, decode } from '../utils/jwt.utils';
import { findUser } from './user.service';

export async function createUser(input: DocumentDefinition<UserDocument>) {
  try {
    return await UserSchema.create(input);
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export async function validateEmailAndPassword({
  email,
  pwd,
}: {
  email: UserDocument['email'];
  pwd: string;
}) {
  const user = await UserSchema.findOne({ email });

  if (!user) {
    return false;
  }

  const isPwdValid = await user.comparePassword(pwd);

  if (!isPwdValid) {
    return false;
  }

  return omit(user.toJSON(), 'password');
}

export function createAccessToken({
  user,
  session,
}: {
  user:
    | Omit<UserDocument, 'password'>
    | LeanDocument<Omit<UserDocument, 'password'>>
    | Pick<FlattenMaps<LeanDocument<any>>, string | number | symbol>;
  session:
    | Omit<SessionDocument, 'password'>
    | LeanDocument<Omit<SessionDocument, 'password'>>
    | FlattenMaps<LeanDocument<any>>;
}) {
  // Build and return the new access token
  const accessToken = sign(
    { ...user, session: session._id },
    { expiresIn: config.get('accessTokenTtl') }
  );

  return accessToken;
}

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  // Decode the refresh token
  const { decoded } = decode(refreshToken);

  if (!decoded || !get(decoded, '_id')) return false;

  // Get the session
  const session = await SessionSchema.findById(get(decoded, '_id'));

  // Make sure the session is still valid
  if (!session || session?.valid) return false;

  const user = await findUser({ _id: session.user });

  if (!user) return false;

  const accessToken = createAccessToken({ user, session });
}
