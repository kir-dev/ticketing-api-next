import { IsInt, IsNotEmpty, Min } from 'class-validator'

export class Board {
  @IsInt()
  @Min(1)
  id: number

  @IsNotEmpty()
  title: string
}
