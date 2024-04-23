import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterUserInput } from './dto/register-user.input';
import { User, UserDocument } from './user.schema.';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(registerUserInput: RegisterUserInput): Promise<User> {
    const createdUser = new this.userModel({
      ...registerUserInput,
    });
    return createdUser.save();
  }
  async findOneByUserId(userId: string): Promise<User> {
    return this.userModel.findOne({ userId });
  }

  async findOneByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username });
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findByAnyProp(props): Promise<User[]> {
    return this.userModel.find({
      $or: [...props],
    });
  }

  async remove(userId: string): Promise<boolean> {
    const res = await this.userModel.deleteOne({ userId });
    return res?.deletedCount > 0;
  }
}
