import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateSemestreDto {
  @IsNotEmpty()
  @IsNumber()
  public semestre?: number;
}