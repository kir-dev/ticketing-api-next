import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateTicketDto } from './dto/create-ticket.dto'
import { UpdateTicketDto } from './dto/update-ticket.dto'

@Injectable()
export class TicketService {
  constructor(private readonly prisma: PrismaService) {}
  create(createTicketDto: CreateTicketDto) {
    return 'Create ticket'
  }

  findAll() {
    return this.prisma.ticket.findMany()
  }

  async findOne(id: number) {
    const ticket = await this.prisma.ticket.findUnique({
      where: { id },
    })
    if (ticket === null) {
      throw new NotFoundException('A hibajegy nem található')
    }
    return ticket
  }

  update(id: number, updateTicketDto: UpdateTicketDto) {
    return 'Update ticket'
  }

  remove(id: number) {
    return 'Delete ticket'
  }
}
