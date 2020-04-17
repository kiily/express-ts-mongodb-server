import { UserModel, IUser } from '../models/user';
import { hash, validateEmail } from '../utils';

export async function getAllUsers(): Promise<IUser[] | void> {
  const users: IUser[] = await UserModel.find();
  return users;
}

export async function getUserById(id: string): Promise<IUser | void | null> {
  const user: IUser | null = await UserModel.findById(id);
  if (!user) {
    throw Error(`No user matching id: ${id}`);
  }
  return user;
}

export async function getUserByEmail(email: string): Promise<IUser | void | null> {
  const user: IUser | null = await UserModel.findOne({ email });
  if (!user) {
    throw Error(`No user matching email: ${email}`);
  }
  return user;
}

export async function createUser(user: IUser): Promise<void> {
  if (!validateEmail(user.email)) {
    throw Error('Email address not valid');
  }
  const newUser = new UserModel(user);
  const password = newUser.password;
  const hashedPassword = await hash(password);
  newUser.password = hashedPassword;
  await newUser.save();
}
