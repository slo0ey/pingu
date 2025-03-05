import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('users')
class BotUser {
  @PrimaryColumn()
  id: string;

  @Column('bigint')
  money: number = 0;
}

export default BotUser;
