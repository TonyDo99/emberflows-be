import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userSchema: Model<User>) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      const exist = await this.findUserByEmail(createUserDto.email);

      if (exist)
        throw new BadRequestException(
          `This ${createUserDto.email} already exist. Please try another email address !`,
        );

      return await this.userSchema.create(createUserDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getUsers() {
    try {
      return await this.userSchema.find();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findUserByEmail(us_email: string) {
    try {
      return await this.userSchema.findOne({
        email: us_email,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findUserById(userId: string) {
    try {
      return await this.userSchema.findById(userId);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto) {
    try {
      const exist = await this.findUserByEmail(updateUserDto.email);

      if (exist)
        throw new BadRequestException(
          `This ${updateUserDto.email} already exist. Please try another email address !`,
        );

      return await this.userSchema.findOneAndUpdate(
        {
          _id: userId,
        },
        {
          $set: {
            email: updateUserDto.email,
            name: updateUserDto.name,
          },
        },
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteUser(userId: string) {
    try {
      const exist = await this.findUserById(userId);

      if (!exist)
        throw new BadRequestException(
          `This ${userId} are not exist. Please try again !`,
        );

      return await this.userSchema.findByIdAndDelete(userId);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
