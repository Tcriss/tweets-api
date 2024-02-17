import { Body, Controller, Delete, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { User } from './entities';
import { UserService } from './user.service';
import { CreateUserDto, EditUserDto } from './dto';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) {}

    @Get('/')
    findAll(): Promise<User[] | string> {
        return this.userService.listUsers();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<User | string | null> {
        return this.userService.getUser(id);
    }

    @Post('')
    create(@Body() user: CreateUserDto): Promise<CreateUserDto> {
        return this.userService.createUser(user);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() user: EditUserDto, @Res() res: Response) {
        return this.userService.editUser(id, user);
    }

    @Delete(':id')
    delete(@Param('id') id: number): Promise<string> {
        return this.userService.deleteUser(id);
    }
}
