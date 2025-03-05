import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('users')
export class BotUser {
  @PrimaryColumn()
  id: string;

  @Column('int64')
  money: number = 0;
}
