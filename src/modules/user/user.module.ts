import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './entities';
import { Tweet } from '../tweets/entities/tweet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Tweet])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
