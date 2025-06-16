import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { v_color } from './v_color.entity';
import { ColorsResolver } from './colors.resolver';
import { ColorsService } from './colors.service';
@Module({
  imports:[TypeOrmModule.forFeature([v_color])],
  providers: [ColorsResolver, ColorsService]
})
export class ColorsModule {}
