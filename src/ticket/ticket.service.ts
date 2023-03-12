import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateTicketDto } from './dto/create-ticket.dto'
import { UpdateTicketDto } from './dto/update-ticket.dto'

@Injectable()
export class TicketService {
  constructor(private readonly prisma: PrismaService) {}
  create(createTicketDto: CreateTicketDto) {
    return this.prisma.ticket.create({ data: createTicketDto })
  }

  findAll() {
    return this.prisma.ticket.findMany()
  }

  async findOne(id: number) {
    const ticket = await this.prisma.ticket.findUnique({
      where: { id },
      include: { labels: true },
    })
    if (ticket === null) {
      throw new HttpException('A hibajegy nem található', HttpStatus.NOT_FOUND)
    }
    return ticket
  }

  update(id: number, updateTicketDto: UpdateTicketDto) {
    return this.prisma.ticket.update({ where: { id }, data: updateTicketDto })
  }

  addLabel(id: number, labelId: number) {
    try {
      return this.prisma.ticket.update({
        where: { id },
        data: { labels: { connect: { id: labelId } } },
      })
    } catch {
      throw new HttpException('Invalid aparameters', HttpStatus.BAD_REQUEST)
    }
  }

  removeLabel(id: number, labelId: number) {
    try {
      return this.prisma.ticket.update({
        where: { id },
        data: { labels: { disconnect: { id: labelId } } },
      })
    } catch {
      throw new HttpException('Invalid aparameters', HttpStatus.BAD_REQUEST)
    }
  }

  remove(id: number) {
    return this.prisma.ticket.delete({ where: { id } })
  }
}
