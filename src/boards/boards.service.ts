import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { BoardDetails } from './dto/boardDetails.dto'

@Injectable()
export class BoardsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createBoardDto: Prisma.BoardUncheckedCreateInput) {
    return this.prisma.board.create({
      data: createBoardDto,
    })
  }

  findAll() {
    return this.prisma.board.findMany()
  }

  async findOne(id: number): Promise<BoardDetails> {
    const board = await this.prisma.board.findUnique({
      where: { id },
      include: { tickets: true },
    })
    if (board === null) {
      throw new NotFoundException('A tábla nem található')
    }
    return board
  }

  update(id: number, updateBoardDto: Prisma.BoardUncheckedUpdateInput) {
    return this.prisma.board.update({ where: { id }, data: updateBoardDto })
  }

  remove(id: number) {
    return this.prisma.board.delete({ where: { id } })
  }
}
