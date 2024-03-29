import {
  Entity,
  PrimaryColumn,
  Column,
  OneToOne,
  JoinColumn,
  Relation,
} from "typeorm"

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

  @OneToOne(() => User, (user) => user.password)
  @JoinColumn('user_id')
  user: Relation<User>
}
