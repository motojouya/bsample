import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, Relation } from 'typeorm';
import { User } from 'src/entity/user.js';

@Entity()
export class UserEmail {
  @PrimaryColumn()
  user_id: number;

  @PrimaryColumn({
    length: 128,
  })
  email: string;

  @Column()
  email_pin: number;

  @Column({ default: () => 'now()' })
  created_date: Date;

  @Column({ nullable: true })
  verified_date: Date;

  @Column()
  assign_expired_date: Date;

  @ManyToOne(type => User, user => user.userEmails)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'user_id',
  })
  user: Relation<User>;
}
