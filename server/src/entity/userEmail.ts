import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Relation,
} from "typeorm"
import { User } from "src/entity/user.js";

@Entity()
export class UserEmail {
  @PrimaryColumn()
  user_id: number

  @PrimaryColumn()
  email: string

  @Column()
  email_pin: number

  @Column()
  created_date: Date

  @Column()
  verified_date: Date

  @Column()
  assign_expired_date: Date

  @ManyToOne(type => User, user => user.userEmails)
  @JoinColumn({ referencedColumnName: "user_id" })
  user: Relation<User>
}
