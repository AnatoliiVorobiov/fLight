import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';

export interface UserType {
  _id: string;
  email: string;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  patronym?: string;
  companyName?: string;
  password: string;
  role:
    | 'admin'
    | 'call-center'
    | 'contracter'
    | 'customer-company'
    | 'customer-entrepreneur';
}

@Schema({ collection: 'users' })
class MongoUserSchema implements UserType {
  @Prop({ _id: true })
  _id: string;

  @Prop({ index: true, unique: true })
  email: string;

  @Prop({ index: true })
  phoneNumber: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  patronym: string;

  @Prop()
  companyName: string;

  @Prop()
  password: string;

  @Prop({
    enum: [
      'admin',
      'call-center',
      'contracter',
      'customer-company',
      'customer-entrepreneur',
    ],
  })
  role:
    | 'admin'
    | 'call-center'
    | 'contracter'
    | 'customer-company'
    | 'customer-entrepreneur';
}

@ObjectType()
// eslint-disable-next-line
export class UserGraphQl implements UserType {
  @Field(() => ID)
  _id: string;

  @Field({ nullable: true })
  companyName: string;

  @Field({ nullable: false })
  email: string;

  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  patronym: string;

  @Field({ nullable: false })
  password: string;

  @Field({ nullable: true })
  phoneNumber: string;

  @Field()
  role:
    | 'admin'
    | 'call-center'
    | 'contracter'
    | 'customer-company'
    | 'customer-entrepreneur';
}

export const UserSchema = SchemaFactory.createForClass(MongoUserSchema);
export const UserName = 'user';
