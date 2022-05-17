import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guards';
import { Serialize } from 'src/interceptors/serialize.interceptors';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorators';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private userSevice: UsersService,
    private authService: AuthService,
  ) {}

  @Get('whoami')
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Post('signout')
  signout(@Session() session: any) {
    session.userId = null;
  }

  @Post('signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Get(':id')
  async findUser(@Param('id') id: string) {
    const user = await this.userSevice.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Get()
  find(@Query('email') email: string) {
    return this.userSevice.find(email);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userSevice.update(parseInt(id), body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userSevice.remove(parseInt(id));
  }
}
