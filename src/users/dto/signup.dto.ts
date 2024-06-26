import { IsEmail, IsString, Length } from "class-validator";

export class SignupDTO {
    @IsString({message: 'Email must be a string'})
    @IsEmail()
    email: string;

    @IsString({message: 'Password must be a string'})
    @Length(6, 30, {message: 'Password must be between 6 and 30 characters'})
    password: string;
}