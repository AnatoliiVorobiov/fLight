import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserName, UserSchema } from './model';
import { UserService } from './service';
import { UserResolver } from './resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserName, schema: UserSchema }])
  ],
  providers: [UserService, UserResolver],
})
export class UserModule {}
