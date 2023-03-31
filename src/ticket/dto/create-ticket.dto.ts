import { OmitType } from '@nestjs/swagger'
import { IsInt, Min } from 'class-validator'
import { Ticket } from '../entities/ticket.entity'

export class CreateTicketDto extends OmitType(Ticket, ['id', 'phase']) {
  @IsInt()
  @Min(1)
  boardId: number
}
