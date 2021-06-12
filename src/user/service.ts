import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserName, UserType } from './model';
import { Model } from 'mongoose';
import * as Inputs from './inputs';

@Injectable()
export class UserService {
  constructor(@InjectModel(UserName) private userModel: Model<UserType>) {}

  async getUsers(params: Inputs.UserPaginationInput): Promise<UserType[]> {
    return this.userModel
      .find()
      .limit(params.limit)
      .skip(params.skip)
      .sort({ [params.order]: params.direction === 'asc' ? 1 : -1 });
  }

  async addUser(users: Inputs.UserInput): Promise<UserType> {
    const result = await this.userModel.insertMany(users);
    return result[0];
  }

  async dropUser(params: Inputs.DropInput) {
    return this.userModel
      .deleteMany({ _id: { $in: params.ids } })
      .then((removed) => removed.deletedCount === params.ids.length);
  }
}
