import {
  Entity,
  PrimaryColumn,
  Column,
  OneToOne,
  JoinColumn,
  Relation,
} from "typeorm"

@Entity()
export class UserEmail {
  @PrimaryColumn()
  user_id: number

  @PrimaryColumn()
  email: string

  @Column()
  email_pin: string

  @Column()
  created_date: Date

  @Column()
  verified_date: Date

  @Column()
  assign_expired_date: Date

  @ManyToOne(() => User, (user) => user.userEmails)
  @JoinColumn('user_id')
  user: Relation<User>
}
