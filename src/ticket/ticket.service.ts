import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TicketService {
  constructor(private readonly prisma: PrismaService) {}
  create(createTicketDto: Prisma.TicketCreateInput) {
    return this.prisma.ticket.create({ data: createTicketDto });
  }

  findAll() {
    return this.prisma.ticket.findMany();
  }

  async findOne(id: number) {
    const ticket = await this.prisma.ticket.findUnique({ where: { id } });
    if (ticket === null) {
      throw new HttpException('A hibajegy nem található', HttpStatus.NOT_FOUND);
    }
    return ticket;
  }

  update(id: number, updateTicketDto: Prisma.TicketUpdateInput) {
    return this.prisma.ticket.update({ where: { id }, data: updateTicketDto });
  }

  remove(id: number) {
    return this.prisma.ticket.delete({ where: { id } });
  }
}
