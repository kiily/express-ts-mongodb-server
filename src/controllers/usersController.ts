import { Controller, Get, Route, Response, Security, Tags } from 'tsoa';
import { IUser } from '../models/user';
import { getAllUsers, getUserById } from '../services';
import { handleError } from '../utils';
import { ICustomResponse } from '../interfaces';

@Route('users')
export class UsersController extends Controller {
  @Get()
  @Response('400', 'Bad Request')
  @Security('jwt', ['admin'])
  @Tags('User')
  public async getUsers(): Promise<IUser[] | void> {
    try {
      return await getAllUsers();
    } catch (err) {
      console.error(err);
      this.setStatus(400);
    }
  }

  @Get('{id}')
  @Response('404', 'Not Found')
  @Response('400', 'Bad Request')
  @Security('jwt', ['admin'])
  @Tags('User')
  public async getUser(id: string): Promise<IUser | ICustomResponse> {
    try {
      const user = await getUserById(id);
      this.setStatus(200);
      return user as IUser;
    } catch (err) {
      return handleError(err);
    }
  }
}
