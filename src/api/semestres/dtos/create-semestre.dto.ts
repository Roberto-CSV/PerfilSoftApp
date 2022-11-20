import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSemestreDto {
  @IsNotEmpty()
  @IsNumber()
  public semestre?: number;
}
