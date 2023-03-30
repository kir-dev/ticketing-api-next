import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class LabelsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createLabelDto: Prisma.LabelCreateInput) {
    return this.prisma.label.create({ data: createLabelDto })
  }

  findAll() {
    return this.prisma.label.findMany({})
  }

  async findOne(id: number) {
    const label = await this.prisma.label.findUnique({ where: { id } })
    if (label === null) {
      throw new NotFoundException('Címke nem található!')
    }
    return label
  }

  update(id: number, updateLabelDto: Prisma.LabelUpdateInput) {
    return this.prisma.label.update({ where: { id }, data: updateLabelDto })
  }

  remove(id: number) {
    return this.prisma.label.delete({ where: { id } })
  }
}
