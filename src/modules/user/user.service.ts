import { HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities';
import { Repository } from 'typeorm';
import { Tweet } from '../tweets/entities/tweet.entity';
import { CreateUserDto, EditUserDto } from './dto';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private readonly userRepo: Repository<User>,
        @InjectRepository(Tweet) private readonly tweetsRepo: Repository<Tweet>
    ) {}

    async listUsers(): Promise<User[] | string> {
        const list = await this.userRepo.find({relations: ['tweets']});

        if(list.length == 0) return "There's no users yet.";

        return list;
    }

    async getUser(id: number): Promise<User | string | null> {
        const user = this.userRepo.findOne({where: {id: id}, relations: ['tweets']});

        if(user == null) return "This user doesn't exists";

        return user;
    }

    async createUser(user: CreateUserDto): Promise<CreateUserDto> {
        const res: User = this.userRepo.create(user);

        return this.userRepo.save(res);
    }

    async editUser(id: number, {name, email, password}: EditUserDto): Promise<User | string> {
        let user = await this.userRepo.findOneBy({id: id})

        if(!user) return "User not found.";

        user.name = name;
        user.email = email;
        user.password = password;

        const saved = await this.userRepo.save(user);

        if(saved) {
            throw new HttpException({
                notification: 'User changes saved succesfully',
                changes: saved
            },HttpStatus.OK);
        }

        throw new HttpException('There was an error trying to save changes.', HttpStatus.INTERNAL_SERVER_ERROR)
    }

    async deleteUser(id: number): Promise<string> {
        const user = await this.userRepo.findOneBy({id: id});

        if(!user) throw new HttpException("User not found.", HttpStatus.NOT_FOUND);
        
        await this.userRepo.remove(user);

        return 'You user was deleted.'
    }
}
