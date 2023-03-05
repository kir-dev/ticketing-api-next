import { Module } from '@nestjs/common';
import { LabelsService } from './labels.service';
import { LabelsController } from './labels.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [LabelsController],
  providers: [LabelsService],
  imports: [PrismaModule],
})
export class LabelsModule {}
