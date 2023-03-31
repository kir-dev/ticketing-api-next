import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { BoardsService } from './boards.service'
import { BoardDetails } from './dto/boardDetails.dto'
import { CreateBoardDto } from './dto/create-board.dto'
import { UpdateBoardDto } from './dto/update-board.dto'
import { Board } from './entities/board.entity'

@ApiTags('boards')
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  create(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardsService.create(createBoardDto)
  }

  @Get()
  findAll(): Promise<Board[]> {
    return this.boardsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<BoardDetails> {
    return this.boardsService.findOne(id)
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBoardDto: UpdateBoardDto,
  ): Promise<Board> {
    return this.boardsService.update(id, updateBoardDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<Board> {
    return this.boardsService.remove(id)
  }
}
