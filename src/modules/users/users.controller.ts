import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginDto, UserCreateDto } from './dto/user.dto';
import { AuthGuard } from 'src/common/guards/users.guard';

@Controller('users')
export class UsersController {
    constructor(private service:UsersService){}

    @UseGuards(AuthGuard)
    @Get()
    async GetAll() {
        const data = await this.service.getAll()
        return data
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async GetOne(@Param('id') id:string){
        const user = await this.service.getOne(+id)
        return user
    }


    @Post()
    async CreateUser(@Body() body:UserCreateDto){
        const CreatedUser = await this.service.create(body)
        return {
            success:true,
            message:"User created succefully",
            token:CreatedUser.token
        }
    }

    @Post("login")
    async Login(@Body() body:LoginDto) {
        const finshedUser = await this.service.login(body)
        return {
            success:true,
            message:"User created succefully",
            token:finshedUser.token
        }
    }

    


}


