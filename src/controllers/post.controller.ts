import { Request, Response } from 'express';
import { get } from 'lodash';

import {
  saveToDb,
  findPost,
  findAndUpdate,
  hardDeletePost,
} from '../service/post.service';

export async function createPost(req: Request, res: Response) {
  const userId = get(req, 'user._id');

  const body = req.body;

  const post = await saveToDb({ ...body, user: userId });

  return res.status(201).send(post);
}

export async function getPostById(req: Request, res: Response) {
  const postId = get(req, 'params.postId');

  const post = await findPost({ _id: postId });

  if (!post) {
    return res.status(404).send({ message: 'Post not found' });
  }

  return res.status(200).send({ message: 'Post get successfully', data: post });
}

export async function updatePost(req: Request, res: Response) {
  const postId = get(req, 'params.postId');
  const userId = get(req, 'user._id');

  const update = req.body;

  const post = await findPost({ _id: postId });

  if (!post) {
    return res.status(404).send({ message: 'Post not found' });
  }

  if (String(post.user) != userId) {
    return res.status(401).send({ message: 'User not authorized' });
  }

  const updatedPost = await findAndUpdate({ _id: postId }, update, {
    new: true,
  });

  return res
    .status(200)
    .send({ message: 'Post updated successfully', data: updatedPost });
}

export async function deletePost(req: Request, res: Response) {
  const postId = get(req, 'params.postId');
  const userId = get(req, 'user._id');

  const post = await findPost({ _id: postId });

  if (!post) {
    return res.status(404).send({ message: 'Post not found' });
  }

  if (String(post.user) != userId) {
    return res.status(401).send({ message: 'User not authorized' });
  }

  await hardDeletePost({ _id: postId });

  return res.status(200).send({ message: 'Post deleted successfully' });
}
