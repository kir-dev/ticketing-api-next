import { IsIn, IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator'

export enum Phase {
  CREATED = 'CREATED',
  IN_PROGRESS = 'IN_PROGRESS',
  UNDER_REVIEW = 'UNDER_REVIEW',
  CLOSED = 'CLOSED',
}

export class Ticket {
  @IsInt()
  @Min(1)
  id: number

  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  description: string

  @IsOptional()
  @IsIn(['CREATED', 'IN_PROGRESS', 'UNDER_REVIEW', 'CLOSED'])
  phase: string
}
