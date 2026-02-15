import { IsEmail, IsString, Matches } from "class-validator"


export class UserCreateDto{
    @IsString()
    fullname:string

    @IsString()
    @IsEmail()
    email:string

    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
    password:string
}

export class LoginDto{
    @IsString()
    fullname:string

    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
    password:string
}