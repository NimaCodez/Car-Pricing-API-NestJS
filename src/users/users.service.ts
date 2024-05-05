import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
	constructor(@InjectRepository(User) private repo: Repository<User>) {}

	create(email: string, password: string) {
		const user = this.repo.create({ email, password });

		return this.repo.save(user);
	}

	findById(id: number) {
		return this.repo.findOne({ where: { id: id } }); 
	}

	find(email?: string) {
		return this.repo.find({ where: { email: email ?? email } });
	}

	// ----------------Bad----------------
	// update(id: number, email: string, password: string) {
	// 	return this.repo.update(id, {
	// 		email,
	// 		password,
	// 	});
	// }
	// -----------------------------------

	// acceptable:
	async update(id: number, attrs: Partial<User>) {
		// insert & update => Don't run hooks.
		// save => run hooks. | Trade-off between hooks and performance (double DB call)

		const user = await this.findById(id);
		if (!user) throw new BadRequestException('User with the given ID was not found!');

		Object.assign(user, attrs);

		return this.repo.save(user);
	}

	// unlike delete, *remove* will call hooks. | trade-off again.
	async remove(id: number) {
		const user = await this.findById(id);
		if (!user) return new BadRequestException('User with the given ID was not found!');

		return this.repo.remove(user);
	}
}
