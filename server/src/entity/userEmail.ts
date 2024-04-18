import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Relation,
} from "typeorm"
import { User } from "src/entity/user";

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
  user: User

  // verified: boolean
  // TODO verifiedはresolverで算出されるべき値なのでundefinedでいいはずだが、型としてPartialになってないので、以下のように変更を加えてる
  // see src/generated/graphql/resolver.ts
  // export type ResolverTypeWrapper<T> = Promise<T> | T;
  // ↓
  // export type ResolverTypeWrapper<T> = Promise<Partial<T>> | Partial<T>;
}
