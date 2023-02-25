import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { TicketModule } from './ticket/ticket.module';
import { BoardsModule } from './boards/boards.module';

@Module({
  imports: [PrismaModule, TicketModule, BoardsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
