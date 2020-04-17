import { Body, Controller, Post, Route, SuccessResponse, Response, Tags } from 'tsoa';
import { handleError, compareHash, signToken } from '../utils';
import { ICustomResponse, ICredentials } from '../interfaces';
import { getUserByEmail } from '../services';
import { IUser } from '../models/user';

@Route('login')
export class LoginController extends Controller {
  @SuccessResponse('200', 'Login Successfull')
  @Response('400', 'Bad Request')
  @Response('401', 'Unauthorized: check your credentials')
  @Tags('Auth')
  @Post()
  public async login(@Body() credentials: ICredentials): Promise<void | ICustomResponse> {
    try {
      const user = (await getUserByEmail(credentials.email)) as IUser;
      const hashedPassword = user.password;
      const isSamePassword = await compareHash(credentials.password, hashedPassword);
      if (!isSamePassword) {
        this.setStatus(401);
        return {
          message: 'Unauthorized: invalid credentials. Please try again.',
          statusCode: 401,
        };
      }
      const token = await signToken(user.email);
      this.setStatus(200);
      return {
        message: 'Successfully logged in!',
        statusCode: 200,
        token,
      };
    } catch (err) {
      return handleError(err);
    }
    return Promise.resolve();
  }
}
