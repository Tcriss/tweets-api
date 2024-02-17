import { BadRequestException, Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, ParamData, Patch, Post, Query } from '@nestjs/common';
import { Tweet } from 'src/modules/tweets/entities/tweet.entity';
import { TweetsService } from './tweets.service';
import { CreateTweetDto } from './dto';
import { PaginationQuery } from './dto/pagination-query.dto';

@Controller('tweets')
export class TweetsController {

    constructor(private tweetS: TweetsService) {}

    @Get('/')
    findAll(@Query() pagination: PaginationQuery): Promise<Tweet[] | string> {
        return this.tweetS.listTweets(pagination);
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<Tweet | null> {
        if(!id) throw new BadRequestException('An id is required');
        if(!this.tweetS.getTweetInfo(id)) throw new HttpException('no se ha encontrado este tweet', HttpStatus.NOT_FOUND);

        return this.tweetS.getTweetInfo(id);
    }

    @Post('/create')
    //@HttpCode(HttpStatus.NO_CONTENT)
    create(@Body() body: CreateTweetDto): Promise<Tweet> {
        if(!body.message) throw new HttpException('message filed is empty', HttpStatus.BAD_REQUEST);
        
        return this.tweetS.addTweet(body);
    }

    @Patch('/update/:id')
    edit(@Param('id') id: number, @Body() body: CreateTweetDto): Promise<string> {
        if(!id) throw new HttpException('The id field is missing', HttpStatus.BAD_REQUEST);
        if(!body.message) throw new HttpException('The message field is empty', HttpStatus.BAD_REQUEST);
        if(!body.message || !id) throw new HttpException('The reques is empty', HttpStatus.BAD_REQUEST);

        return this.tweetS.editTweet(body.message, id);
    }

    @Delete('/delete/:id')
    Delete(@Param('id') id: number): Promise<string> {
        if(!id) throw new HttpException('An id is required', HttpStatus.BAD_REQUEST);

        return this.tweetS.deleteTweet(id);
    }
}
