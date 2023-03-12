import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/prisma/prisma.module'
import { LabelsController } from './labels.controller'
import { LabelsService } from './labels.service'

@Module({
  controllers: [LabelsController],
  providers: [LabelsService],
  imports: [PrismaModule],
})
export class LabelsModule {}
