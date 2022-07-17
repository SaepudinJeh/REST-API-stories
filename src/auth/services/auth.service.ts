import { Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/services/user.service';
import { Provider } from 'src/utils';
import { OauthLoginDto } from '../dto';
import { LoginDto } from '../dto/auth.login';
import { RegisterDto } from '../dto/auth.register';
import { UserModel } from '../models';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService)
    private userService: UserService,
  ) {}

  async registerUser(registerDto: RegisterDto): Promise<any> {
    return await this.userService.registerUser({
      ...registerDto,
      avatar: '',
      email_verified: false,
      provider: Provider.Jwt,
    });
  }

  async oauthLogin(oauthLoginDto: OauthLoginDto): Promise<any> {
    const user = await this.userService.findUserByEmail(oauthLoginDto.email);

    if (!user) {
      return await this.userService.registerUser({
        ...oauthLoginDto,
        password: null,
      });
    }

    return user;
  }

  async loginUser(loginDto: LoginDto): Promise<any> {
    return this.userService.findUser({ ...loginDto });
  }

  async findUserId(id: string): Promise<UserModel> {
    return await this.userService.findUserId(id);
  }

  async findUserByEmail(email: string): Promise<UserModel> {
    return await this.userService.findUserByEmail(email);
  }
}
