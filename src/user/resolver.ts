import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserGraphQl as User, UserType } from './model';
import { UserService } from './service';
import * as Inputs from './inputs';
import { GraphQLBoolean } from 'graphql';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  // eslint-disable-next-line
  getUsers(@Args('params') params: Inputs.UserPaginationInput): Promise<UserType[]> {
    return this.userService.getUsers(params);
  }

  @Mutation(() => User)
  addUser(@Args('user') user: Inputs.UserInput): Promise<UserType> {
    return this.userService.addUser(user);
  }

  @Mutation(() => GraphQLBoolean)
  dropUsers(@Args('params') params: Inputs.DropInput): Promise<boolean> {
    return this.userService.dropUser(params);
  }
}
