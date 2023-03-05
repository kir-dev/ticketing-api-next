import { IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';

export class Label {
  @IsInt()
  @Min(1)
  id: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsOptional()
  color: string;

  @IsOptional()
  createdAt: Date;
}
