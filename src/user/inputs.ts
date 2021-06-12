import { Field, InputType } from '@nestjs/graphql';
import { Max, Min, MaxLength, MinLength } from 'class-validator';
import { UserType } from './model';
import { GraphQLString } from 'graphql';

@InputType()
export class UserPaginationInput {
  @Min(0)
  @Max(100)
  @Field({ defaultValue: 100 })
  limit: number;

  @Min(0)
  @Field({ defaultValue: 0 })
  skip: number;

  @Field({ defaultValue: '_id' })
  order: '_id' | 'email';

  @Field({ defaultValue: 'asc' })
  direction: 'asc' | 'desc';

  @Field({ nullable: true })
  search?: string;
}

@InputType()
export class DropInput {
  @Field(() => [GraphQLString])
  ids: string[];
}

@InputType()
export class UserInput implements Omit<UserType, '_id'> {
  @Field()
  email: string;

  @Field()
  phoneNumber?: string;

  @Field()
  firstName?: string;

  @Field()
  lastName?: string;

  @Field()
  patronym?: string;

  @Field()
  companyName?: string;

  @Field()
  password: string;

  @Field()
  role:
    | 'admin'
    | 'call-center'
    | 'contracter'
    | 'customer-company'
    | 'customer-entrepreneur';
}
