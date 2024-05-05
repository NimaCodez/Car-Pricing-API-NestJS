import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import {} from 'node:crypto';
import { genSalt, hash } from 'bcrypt';

@Injectable()
export class AuthService {
	constructor(private userService: UsersService) {}

	async signup(email: string, password: string) {
		const user = await this.userService.find(email);
		if (user.length > 0) throw new BadRequestException('User already exists!');

		const salt = await genSalt(13);
		const hashedPassword = await hash(password, salt);

		return await this.userService.create(email, hashedPassword);
	}

	signIn() {}
}
