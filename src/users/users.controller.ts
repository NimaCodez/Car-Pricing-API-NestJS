import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
	UseInterceptors,
} from '@nestjs/common';
import { SignupDTO } from './dto/signup.dto';
import { UsersService } from './users.service';
import { UpdateDTO } from './dto/update.dto';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';

@Controller('auth')
export class UsersController {
	constructor(private userService: UsersService) {}

	@Post('signup')
	createUser(@Body() body: SignupDTO) {
		return this.userService.create(body.email, body.password);
	}

	@UseInterceptors(SerializeInterceptor)
	@Get('/:id')
	findUser(@Param('id') id: string) {
		console.log('Inside handler');
		return this.userService.findOne(+id);
	}

	@Get()
	findAll(@Query('email') email: string) {
		return this.userService.find(email ?? email);
	}

	@Patch('/:id')
	updateUser(@Param('id') id: string, @Body() body: UpdateDTO) {
		return this.userService.update(+id, body);
	}

	@Delete('/:id')
	removeUser(@Param('id') id: string) {
		return this.userService.remove(+id);
	}
}
