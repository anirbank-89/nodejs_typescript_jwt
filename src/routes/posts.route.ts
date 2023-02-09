import { Express, Request, Response, NextFunction } from 'express';

import { validateRequest, requiresUser } from '../middlewares';

import {
  createPostSchema,
  getPostSchema,
  updatePostSchema,
  deletePostSchema,
} from '../schemas/post.schema';

import {
  createPost,
  getPostById,
  updatePost,
  deletePost,
} from '../controllers/post.controller';

export default function (app: Express) {
  // app.use((req: Request, res: Response, next: NextFunction) => {
  //   res.header(
  //     'Access-Control-Allow-Headers',
  //     'authorization, Origin, Content-Type, Access'
  //   );
  //   next();
  // });

  // Create a post
  app.post(
    '/api/posts',
    [requiresUser, validateRequest(createPostSchema)],
    createPost
  );

  // Get a post
  app.get('/api/posts/:postId', validateRequest(getPostSchema), getPostById);

  // Update a post
  app.put(
    '/api/posts/:postId',
    [requiresUser, validateRequest(updatePostSchema)],
    updatePost
  );

  // Delete a post
  app.delete(
    '/api/posts/:postId',
    [requiresUser, validateRequest(deletePostSchema)],
    deletePost
  );
}
