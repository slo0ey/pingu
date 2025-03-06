import { DataSource, Repository } from 'typeorm';
import { DATASOURCE } from '../constants/di';
import BotUser from '../entities/user.entity';
import { inject, singleton } from 'tsyringe';

@singleton()
class AuthService {
  private readonly userRepository: Repository<BotUser>;

  constructor(@inject(DATASOURCE) dataSource: DataSource) {
    this.userRepository = dataSource.getRepository(BotUser);
  }

  async getUser(userId: string) {
    return this.userRepository.findOne({ where: { id: userId } });
  }

  async createUser(userId: string) {
    const user = this.userRepository.create({ id: userId });
    await this.userRepository.save(user);
  }
}

export default AuthService;
