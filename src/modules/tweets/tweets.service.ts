import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Tweet } from 'src/modules/tweets/entities/tweet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTweetDto } from './dto';
import { PaginationQuery } from './dto/pagination-query.dto';
import { User } from '../user/entities';

@Injectable()
export class TweetsService {

    constructor(
        @InjectRepository(Tweet) private readonly tweetRepo: Repository<Tweet>,
        @InjectRepository(User) private readonly userRepo: Repository<User>
    ) {}

    async listTweets({limit, offSet}: PaginationQuery): Promise<Tweet[]> {
        return await this.tweetRepo.find({relations: ['user'], skip: offSet, take: limit});
    }

    async getTweetInfo(id: number): Promise<Tweet | null> {
        const tweet: Tweet | null = await this.tweetRepo.findOne({where: {id: id}, relations: ['user']});
        if(!tweet) throw new HttpException("Tweet not found", HttpStatus.NOT_FOUND);

        return tweet;
    }

    async addTweet({message, user}: CreateTweetDto): Promise<Tweet> {
        const tweet = await this.tweetRepo.create({message, user});

        return this.tweetRepo.save(tweet);
    }

    async editTweet(message: string,id: number): Promise<string> {
        const tweet = await this.tweetRepo.preload({id, message});
        
        if(!tweet) throw new HttpException("this tweet doesn't exist", HttpStatus.NOT_FOUND);
        
        tweet.message = message;
            
        return 'Tweet editado'; 
    }

    async deleteTweet(id: number): Promise<string> {
        const tweet = await this.tweetRepo.findOneBy({id: id});
        if(!tweet) throw new HttpException("Tweet not found", HttpStatus.NOT_FOUND);
        await this.tweetRepo.remove(tweet);

        return 'Your tweet was removed succesfully';
    }
}
