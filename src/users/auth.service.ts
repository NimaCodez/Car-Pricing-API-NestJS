import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import {} from 'node:crypto';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class AuthService {
	constructor(private userService: UsersService) {}

	async signup(email: string, password: string) {
		const user = await this.userService.find(email);
		if (user.length > 0) throw new BadRequestException('User already exists!');

		const salt = await genSalt(11);
		const hashedPassword = await hash(password, salt);

		return await this.userService.create(email, hashedPassword);
	}

	async signIn(email: string, pass: string) {
		const user = await this.userService.find(email);
		if (user.length === 0) throw new BadRequestException('username or password is wrong!');

		const userPassword = user[0].password;
		const compareResult = await compare(pass, userPassword);

		if (!compareResult) throw new BadRequestException('username or password is wrong!');
		else return true;
	}
}
