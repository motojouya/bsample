import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

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
}
