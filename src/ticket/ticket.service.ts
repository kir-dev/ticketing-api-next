import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class TicketService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createTicketDto: Prisma.TicketUncheckedCreateInput) {
    try {
      return await this.prisma.ticket.create({ data: createTicketDto })
    } catch (e) {
      console.log(e)
      throw new BadRequestException('hibas request')
    }
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

  remove(id: number) {
    return this.prisma.ticket.delete({ where: { id } })
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
}
