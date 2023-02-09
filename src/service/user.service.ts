import { FilterQuery } from 'mongoose';

import UserSchema, { UserDocument } from '../models/user.model';

export async function findUser(query: FilterQuery<UserDocument>) {
  return UserSchema.findOne(query).lean();
}
