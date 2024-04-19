import {
  Entity,
  PrimaryColumn,
  Column,
  OneToOne,
  JoinColumn,
  Relation,
} from "typeorm"
import { User } from "src/entity/user.js";

@Entity()
export class UserPassword {
  @PrimaryColumn()
  user_id: number

  @Column()
  password: string

  @Column()
  created_date: Date

  @Column()
  updated_date: Date

  @OneToOne(type => User, user => user.password)
  @JoinColumn({ referencedColumnName: "user_id" })
  user: Relation<User>
}
