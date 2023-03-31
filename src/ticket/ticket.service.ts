import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateTicketDto } from './dto/create-ticket.dto'
import { UpdateTicketDto } from './dto/update-ticket.dto'

@Injectable()
export class TicketService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTicketDto: CreateTicketDto) {
    try {
      return await this.prisma.ticket.create({ data: createTicketDto })
    } catch {
      throw new BadRequestException('Érvénytelen tábla azonosító!')
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

  async update(id: number, updateTicketDto: UpdateTicketDto) {
    try {
      return await this.prisma.ticket.update({
        where: { id },
        data: updateTicketDto,
      })
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2003') {
          throw new BadRequestException('Érvénytelen tábla azonosító!')
        }
        if (e.code === 'P2025') {
          throw new NotFoundException('A hibajegy nem található')
        }
      }
    }
  }

  async addLabel(id: number, labelId: number) {
    try {
      return await this.prisma.ticket.update({
        where: { id },
        data: { labels: { connect: { id: labelId } } },
      })
    } catch {
      throw new BadRequestException('Érvénytelen paraméterek!')
    }
  }

  async removeLabel(id: number, labelId: number) {
    try {
      return await this.prisma.ticket.update({
        where: { id },
        data: { labels: { disconnect: { id: labelId } } },
      })
    } catch {
      throw new BadRequestException('Érvénytelen paraméterek!')
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.ticket.delete({ where: { id } })
    } catch {
      throw new NotFoundException('A hibajegy nem található')
    }
  }
}
