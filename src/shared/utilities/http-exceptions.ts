import { HttpException, HttpStatus } from "@nestjs/common";

export function notFoundException(id: number, entityName: string) {
  return new HttpException(
    `${entityName} with id ${id} is not found`,
    HttpStatus.NOT_FOUND,
  );
}

export function existsException(entityName: string) {
  return new HttpException(
    `${entityName} is already exists`,
    HttpStatus.CONFLICT,
  );
}