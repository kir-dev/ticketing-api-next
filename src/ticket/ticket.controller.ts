import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger/dist'
import { Prisma } from '@prisma/client'
import { TicketDetails } from './dto/ticketDetails.dto'
import { Ticket } from './entities/ticket.entity'
import { TicketService } from './ticket.service'

@ApiTags('tickets')
@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  create(
    @Body() createTicketDto: Prisma.TicketUncheckedCreateInput,
  ): Promise<Ticket> {
    return this.ticketService.create(createTicketDto)
  }

  @Get()
  findAll(): Promise<Ticket[]> {
    return this.ticketService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<TicketDetails> {
    return this.ticketService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTicketDto: Prisma.TicketUncheckedUpdateInput,
  ): Promise<Ticket> {
    return this.ticketService.update(+id, updateTicketDto)
  }

  @Patch(':id/labels/:labelId')
  addLabel(
    @Param('id') id: string,
    @Param('labelId') labelId: string,
  ): Promise<Ticket> {
    return this.ticketService.addLabel(+id, +labelId)
  }

  @Delete(':id/labels/:labelId')
  removeLabel(
    @Param('id') id: string,
    @Param('labelId') labelId: string,
  ): Promise<Ticket> {
    return this.ticketService.removeLabel(+id, +labelId)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Ticket> {
    return this.ticketService.remove(+id)
  }
}
