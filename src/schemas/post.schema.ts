import { object, string, ref } from 'yup';

const payload = {
  body: object({
    title: string().required('Title is required'),
    description: string().required('Description is required.'),
    // .min(120, 'Description is too short - should be 120 char minimum'),
  }),
};

const params = {
  params: object({
    postId: string().required('postId is required'),
  }),
};

export const createPostSchema = object({ ...payload });

export const getPostSchema = object({ ...params });

export const updatePostSchema = object({
  ...params,
  ...payload,
});

export const deletePostSchema = object({ ...params });
