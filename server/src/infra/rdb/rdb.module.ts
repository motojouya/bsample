import { Module } from '@nestjs/common';
import { Rdb } from './rdb';

@Module({
  providers: [Rdb]
})
export class RdbModule {}
