import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { BoardsModule } from './boards/boards.module'
import { LabelsModule } from './labels/labels.module'
import { PrismaModule } from './prisma/prisma.module'
import { TicketModule } from './ticket/ticket.module'

@Module({
  imports: [PrismaModule, TicketModule, BoardsModule, LabelsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
