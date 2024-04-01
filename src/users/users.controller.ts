import { Body, Controller, Post } from '@nestjs/common';
import { SignupDTO } from './dto/signup.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
    constructor(private userService: UsersService) {}

	@Post('signup')
	createUser(@Body() body: SignupDTO) {
        this.userService.create(body.email, body.password);
    }
}
