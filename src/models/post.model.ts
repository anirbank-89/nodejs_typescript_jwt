import mongoose from 'mongoose';
// import { nanoid } from 'nanoid';
import { UserDocument } from './user.model';

export interface PostDocument extends mongoose.Document {
  user: UserDocument['_id'];
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new mongoose.Schema(
  {
    // postId: {
    //   type: String,
    //   required: true,
    //   unique: true,
    //   default: () => nanoid(10),
    // },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Post = mongoose.model<PostDocument>('Post', PostSchema);

export default Post;
