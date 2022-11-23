import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateSemestreDto } from './dtos/create-semestre.dto';
import { UpdateSemestreDto } from './dtos/update-semestre.dto';
import { Semestre } from './entities/semestre.entity';
import { SemestresService } from './semestres.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Semestres')
@Controller()
export class SemestresController {
  constructor(private readonly semestresService: SemestresService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create new semestre' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        semestre: {
          type: 'Integer',
          example: 1,
          description: 'This is unique seemstre',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Semestre was created',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Semestre already exsits',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  create(@Body() newSemestre: CreateSemestreDto) {
    return this.semestresService.create(newSemestre);
  }

  @Get()
  @ApiOperation({ summary: 'Get all semestres' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All semestres list',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  getAll(): Promise<Semestre[]> {
    return this.semestresService.getAll();
  }

  @Get('byId/:id')
  @ApiOperation({ summary: 'Get one semestre by id' })
  @ApiParam({
    name: 'id',
    type: 'Integer',
    description: 'Searched semestre id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Semestre was found',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Semestre is not found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.semestresService.getById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update one semestre' })
  @ApiParam({
    name: 'id',
    type: 'Integer',
    description: 'Semestre id to update',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        semestre: {
          type: 'Integer',
          example: 1,
          description: 'This is unique seemstre',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Semestre was updated',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Semestre is not found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() rol: UpdateSemestreDto,
  ) {
    return this.semestresService.update(id, rol);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete one semestre by id' })
  @ApiParam({
    name: 'id',
    type: 'Integer',
    description: 'Semestre id to delete',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Semestre was deleted',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Semestre is not found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.semestresService.delete(id);
  }
}
