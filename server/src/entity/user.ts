import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  Relation,
} from "typeorm"
import { UserEmail } from "src/entity/userEmail";
import { UserPassword } from "src/entity/userPassword";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number

  @Column()
  identifier: string

  @Column()
  name: string

  @Column()
  register_session_id: number

  @Column()
  email: string

  @Column()
  active: boolean

  @Column()
  created_date: Date

  @Column()
  updated_date: Date

  @OneToMany(type => UserEmail, userEmail => userEmail.user)
  userEmails: UserEmail[]

  @OneToOne(type => UserPassword, userPassword => userPassword.user)
  password: UserPassword
}
