import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { TicketService } from './ticket.service'

@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  create(@Body() createTicketDto: Prisma.TicketUncheckedCreateInput) {
    return this.ticketService.create(createTicketDto)
  }

  @Post(':id/addLabel/:labelId')
  addLabel(@Param('id') ticketId: string, @Param('labelId') labelId: string) {
    return this.ticketService.addLabel(+ticketId, +labelId)
  }

  @Post(':id/removeLabel/:labelId')
  removeLabel(
    @Param('id') ticketId: string,
    @Param('labelId') labelId: string,
  ) {
    return this.ticketService.removeLabel(+ticketId, +labelId)
  }

  @Get()
  findAll() {
    return this.ticketService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTicketDto: Prisma.TicketUncheckedUpdateInput,
  ) {
    return this.ticketService.update(+id, updateTicketDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketService.remove(+id)
  }
}
