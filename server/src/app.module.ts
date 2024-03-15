import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import * as path from 'path';
// import { PostsModule } from './components/posts/posts.module';
import { UserModule } from './user/user.module';
import { UserResolver } from './model/user/user.resolver';
import { UserService } from './model/user/user.service';
import { EngageService } from './case/engage/engage.service';
import { EngageResolver } from './case/engage/engage.resolver';
import { EngageModule } from './case/engage/engage.module';
import { UserModule } from './model/user/user.module';
import { MailModule } from './infra/mail/mail.module';
import { Rdb } from './infra/rdb/rdb';
import { RdbModule } from './infra/rdb/rdb.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: path.join(process.cwd(), 'src/graphql.ts'),
      },
    }),
    UserModule,
    EngageModule,
    MailModule,
    RdbModule,
    // PostsModule,
  ],
  // include: [CatsModule],
  controllers: [AppController],
  providers: [AppService, UserResolver, UserService, EngageService, EngageResolver, Rdb],
})
export class AppModule {}
