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

  @Column({
    length: 128,
  })
  password: string

  @Column({ default: () => "now()" })
  created_date: Date

  @Column({ default: () => "now()" })
  updated_date: Date

  @OneToOne(type => User, user => user.password)
  @JoinColumn({
    name: "user_id",
    referencedColumnName: "user_id",
  })
  user: Relation<User>
}
