import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger/dist'
import { CreateTicketDto } from './dto/create-ticket.dto'
import { TicketDetails } from './dto/ticketDetails.dto'
import { UpdateTicketDto } from './dto/update-ticket.dto'
import { Ticket } from './entities/ticket.entity'
import { TicketService } from './ticket.service'

@ApiTags('tickets')
@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  create(@Body() createTicketDto: CreateTicketDto): Promise<Ticket> {
    return this.ticketService.create(createTicketDto)
  }

  @Get()
  findAll(): Promise<Ticket[]> {
    return this.ticketService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<TicketDetails> {
    return this.ticketService.findOne(id)
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTicketDto: UpdateTicketDto,
  ): Promise<Ticket> {
    return this.ticketService.update(id, updateTicketDto)
  }

  @Patch(':id/labels/:labelId')
  addLabel(
    @Param('id', ParseIntPipe) id: number,
    @Param('labelId', ParseIntPipe) labelId: number,
  ): Promise<Ticket> {
    return this.ticketService.addLabel(id, labelId)
  }

  @Delete(':id/labels/:labelId')
  removeLabel(
    @Param('id', ParseIntPipe) id: number,
    @Param('labelId', ParseIntPipe) labelId: number,
  ): Promise<Ticket> {
    return this.ticketService.removeLabel(id, labelId)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<Ticket> {
    return this.ticketService.remove(id)
  }
}
