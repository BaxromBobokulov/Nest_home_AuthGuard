import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { LoginDto, UserCreateDto } from './dto/user.dto';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService,
                private jwtService: JwtService
    ) { }

    async getAll() {
        const users = await this.prisma.user.findMany()
        return users
    }

    async getOne(id: number) {
        const user = await this.prisma.user.findUnique({
            where: { id }
        })
        if (!user) throw new NotFoundException("User not found")
        return user
    }

    async create(body: UserCreateDto) {
        const hash = await bcrypt.hash(body.password, 10)

        const checkEmail = await this.prisma.user.findUnique({
            where: { email: body.email },
            select: { id: true }
        });

        if(checkEmail){
            throw new ConflictException("Bu email allaqachon mavjud")
        }

        const CreatedUser = await this.prisma.user.create({
            data: {
                fullname: body.fullname,
                email: body.email,
                password: hash
            }
        })

        return {
            success:true,
            token:this.jwtService.sign({id:CreatedUser.id, email:CreatedUser.email}) 
        }
    }

    async login(body:LoginDto) {
        const name = await this.prisma.user.findFirst({
            where:{fullname:body.fullname},
            select:{
                id:true,
                password:true,
                email:true
            }
        });

        if(!name) throw new ConflictException("Wrong fullname")

        const pass = await bcrypt.compare(body.password , name.password)

        if(!pass) throw new ConflictException("Wrong password")

        return {
            token:this.jwtService.sign({id:name.id, email:name.email})
        }
    }
}
