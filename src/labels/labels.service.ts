import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';

@Injectable()
export class LabelsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createLabelDto: CreateLabelDto) {
    return this.prisma.label.create({ data: createLabelDto });
  }

  findAll() {
    return this.prisma.label.findMany({});
  }

  findOne(id: number) {
    return this.prisma.label.findUnique({ where: { id } });
  }

  update(id: number, updateLabelDto: UpdateLabelDto) {
    return this.prisma.label.update({ where: { id }, data: updateLabelDto });
  }

  remove(id: number) {
    return this.prisma.label.delete({ where: { id } });
  }
}
