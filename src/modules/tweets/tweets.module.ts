import { Module } from '@nestjs/common';
import { TweetsController } from './tweets.controller';
import { TweetsService } from './tweets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tweet } from 'src/modules/tweets/entities/tweet.entity';
import { User } from '../user/entities';

@Module({
    imports: [TypeOrmModule.forFeature([Tweet, User])],
    controllers: [TweetsController],
    providers: [TweetsService]
})
export class TweetsModule {}
