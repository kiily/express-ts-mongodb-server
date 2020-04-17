import { Body, Controller, Post, Route, SuccessResponse, Response, Tags } from 'tsoa';
import { handleError } from '../utils';
import { ICustomResponse } from '../interfaces';
import { IUser } from '../models/user';
import { createUser } from '../services';

@Route('signup')
export class SignupController extends Controller {
  @SuccessResponse('201', 'User Successfully created')
  @Response('400', 'Bad Request')
  @Tags('Auth')
  @Post()
  public async signupUser(@Body() user: IUser): Promise<void | ICustomResponse> {
    try {
      await createUser(user);
      this.setStatus(201);
    } catch (err) {
      return handleError(err);
    }
    return Promise.resolve();
  }
}
