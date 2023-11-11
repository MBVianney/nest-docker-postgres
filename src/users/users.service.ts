import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (user === undefined) {
      throw new NotFoundException('User cannot be found');
    }
    return user;
  }

  async remove(id: number): Promise<void> {
    try {
      await this.usersRepository.delete(id);
    } catch {
      throw new BadRequestException('Cannot delete this user');
    }
  }

  async create(user: UserDto) {
    try {
      return await this.usersRepository.save(user);
    } catch {
      throw new BadRequestException('User cannot be created');
    }
  }

  async update(id: number, user: UserDto) {
    try {
      const userDto = await this.usersRepository.findOneBy({ id });

      userDto.firstName = user.firstName;
      userDto.lastName = user.lastName;
      userDto.isActive = user.isActive;
      return await this.usersRepository.save(userDto);
    } catch (e) {
      console.log(e);
      throw new BadRequestException('User cannot be updated');
    }
  }
}
