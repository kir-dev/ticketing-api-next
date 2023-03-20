import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class TicketService {
  constructor(private readonly prisma: PrismaService) {}
  create(createTicketDto: Prisma.TicketUncheckedCreateInput) {
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
      throw new NotFoundException('A hibajegy nem található')
    }
    return ticket
  }

  update(id: number, updateTicketDto: Prisma.TicketUncheckedUpdateInput) {
    return this.prisma.ticket.update({ where: { id }, data: updateTicketDto })
  }

  addLabel(id: number, labelId: number) {
    return this.prisma.ticket.update({
      where: { id },
      data: { labels: { connect: { id: labelId } } },
    })
  }

  removeLabel(id: number, labelId: number) {
    return this.prisma.ticket.update({
      where: { id },
      data: { labels: { disconnect: { id: labelId } } },
    })
  }

  remove(id: number) {
    return this.prisma.ticket.delete({ where: { id } })
  }
}
