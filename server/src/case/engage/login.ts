import { Repository, DataSource } from 'typeorm';
import { User } from 'entity/user';
import { transact } from 'infra/rdb'

export type Login = (rdbSource: DataSource, email: string, password: string) => Promise<User | null>;
export const login: Login = async (rdbSource, email, password) => {
  return await transact(rdbSource, async (manager) => {
    return await manager.findOne(User, {
      join: {
        alias: "user",
        innerJoin: { password: "user.password" },
      },
      where: (qb: SelectQueryBuilder<User>) => {
        qb
          .where({ email: email })
          .andWhere("password.password = :password", { password: password });
      },
    });
  });
  // return await transact(rdbSource, async (tem) => {
  //   const userRepository: Repository<User> = tem.getRepository(User);
  //   return any;
  // })
};
