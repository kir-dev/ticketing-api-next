import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateLabelDto } from './dto/create-label.dto'
import { UpdateLabelDto } from './dto/update-label.dto'

@Injectable()
export class LabelsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createLabelDto: CreateLabelDto) {
    return this.prisma.label.create({ data: createLabelDto })
  }

  findAll() {
    return this.prisma.label.findMany({})
  }

  async findOne(id: number) {
    const label = await this.prisma.label.findUnique({ where: { id } })
    if (label === null) {
      throw new NotFoundException('Nem létezik ilyen címke!')
    }
    return label
  }

  async update(id: number, updateLabelDto: UpdateLabelDto) {
    try {
      return await this.prisma.label.update({
        where: { id },
        data: updateLabelDto,
      })
    } catch {
      throw new NotFoundException('Nem létezik ilyen címke!')
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.label.delete({ where: { id } })
    } catch {
      throw new NotFoundException('Nem létezik ilyen címke!')
    }
  }
}
