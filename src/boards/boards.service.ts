import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createBoardDto: CreateBoardDto) {
    return this.prisma.board.create({
      data: createBoardDto,
    });
  }

  findAll() {
    return this.prisma.board.findMany();
  }

  async findOne(id: number) {
    const board = await this.prisma.board.findUnique({ where: { id } });
    if (board === null) {
      throw new HttpException('A tábla nem található', HttpStatus.NOT_FOUND);
    }
    return board;
  }

  update(id: number, updateBoardDto: UpdateBoardDto) {
    return this.prisma.board.update({ where: { id }, data: updateBoardDto });
  }

  remove(id: number) {
    return this.prisma.board.delete({ where: { id } });
  }
}
