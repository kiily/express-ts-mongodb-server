import * as mongoose from 'mongoose';

interface IUser {
  email: string;
  username: string;
  password: string;
  dob?: Date;
  lastName?: string;
  firstName?: string;
  location?: string;
  isAdmin?: boolean;
  tenant?: string;
  groups?: string[];
}

const UserSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    dob: Date,
    password: String,
    location: String,
    isAdmin: Boolean,
    tenant: String,
    groups: Array,
    username: String,
  },
  { timestamps: true },
);

const UserModel = mongoose.model<IUser & mongoose.Document>('User', UserSchema);

export { UserModel, IUser };
