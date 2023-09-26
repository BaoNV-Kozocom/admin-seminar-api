import { Module } from '@nestjs/common';
import { LinkController } from './link.controller';
import { Link } from './entities/link.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkService } from './link.service';

@Module({
  imports: [TypeOrmModule.forFeature([Link])],
  controllers: [LinkController],
  providers: [LinkService],
})
export class LinkModule {}
