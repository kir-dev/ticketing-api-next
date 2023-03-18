import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { BoardDetails } from './dto/boardDetails.dto'
import { CreateBoardDto } from './dto/create-board.dto'
import { UpdateBoardDto } from './dto/update-board.dto'

@Injectable()
export class BoardsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createBoardDto: CreateBoardDto) {
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

  async update(id: number, updateBoardDto: UpdateBoardDto) {
    try {
      return await this.prisma.board.update({
        where: { id },
        data: updateBoardDto,
      })
    } catch {
      throw new NotFoundException('A tábla nem található!')
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.board.delete({ where: { id } })
    } catch {
      throw new NotFoundException('A tábla nem található!')
    }
  }
}
