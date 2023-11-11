import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { FindOneDto } from './dto/findone.dto';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('/:id')
  findOne(@Param() params: FindOneDto) {
    return this.userService.findOne(params.id);
  }

  @Post('/create')
  @HttpCode(201)
  async create(@Body() user: UserDto) {
    return await this.userService.create(user);
  }

  @Put('update/:id')
  @HttpCode(202)
  async update(@Param() params: FindOneDto, @Body() user: UserDto) {
    return await this.userService.update(params.id, user);
  }

  @Delete('delete/:id')
  deleteOne(@Param() params: FindOneDto) {
    return this.userService.remove(params.id);
  }
}
