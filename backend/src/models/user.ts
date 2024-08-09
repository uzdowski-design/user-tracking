import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  userId: string;
  userName: string;
  avatar: string;
  accessedAt: Date;
  scrolledToImage: boolean;
}

const UserSchema: Schema = new Schema({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  avatar: { type: String, required: true },
  accessedAt: { type: Date, default: Date.now },
  scrolledToImage: { type: Boolean, default: false }
});

export default mongoose.model<IUser>('User', UserSchema);
