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

  async checkUserAndRegister(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      await this.userRepository.findOne({
        where: { id: userId },
      });
      return true;
    }
    return false;
  }
}

export default AuthService;
