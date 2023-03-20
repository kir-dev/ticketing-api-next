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
import { LabelsService } from './labels.service'

@ApiTags('labels')
@Controller('labels')
export class LabelsController {
  constructor(private readonly labelsService: LabelsService) {}

  @Post()
  create(@Body() createLabelDto: Prisma.LabelUncheckedCreateInput) {
    return this.labelsService.create(createLabelDto)
  }

  @Get()
  findAll() {
    return this.labelsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.labelsService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLabelDto: Prisma.LabelUncheckedUpdateInput,
  ) {
    return this.labelsService.update(+id, updateLabelDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.labelsService.remove(+id)
  }
}
