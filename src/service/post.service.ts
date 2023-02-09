import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';

import Post, { PostDocument } from '../models/post.model';

export async function saveToDb(input: DocumentDefinition<PostDocument>) {
  return await Post.create(input);
}

export async function findPost(query: FilterQuery<PostDocument>) {
  return await Post.findOne(query);
}

export async function findAndUpdate(
  query: FilterQuery<PostDocument>,
  update: UpdateQuery<PostDocument>,
  options: QueryOptions
) {
  return await Post.findOneAndUpdate(query, update, options);
}

export async function hardDeletePost(query: FilterQuery<PostDocument>) {
  return await Post.findOneAndDelete(query);
}
