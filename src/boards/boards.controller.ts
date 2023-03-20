import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Prisma } from '@prisma/client'
import { BoardsService } from './boards.service'

@ApiTags('boards')
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  create(@Body() createBoardDto: Prisma.BoardUncheckedCreateInput) {
    return this.boardsService.create(createBoardDto)
  }

  @Get()
  findAll() {
    return this.boardsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardsService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBoardDto: Prisma.BoardUncheckedUpdateInput,
  ) {
    return this.boardsService.update(+id, updateBoardDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardsService.remove(+id)
  }
}
