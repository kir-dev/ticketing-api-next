import { OmitType, PartialType } from '@nestjs/swagger'
import { IsInt, Min } from 'class-validator'
import { Ticket } from '../entities/ticket.entity'

export class UpdateTicketDto extends PartialType(OmitType(Ticket, ['id'])) {
  @IsInt()
  @Min(1)
  boardId: number
}
