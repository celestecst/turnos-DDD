import { IsString, IsNotEmpty, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AgendarTurnoDto {
  @ApiProperty({ example: 'cliente-123', description: 'ID del cleinte' })
  @IsString()
  @IsNotEmpty()
  clienteId!: string;

  @ApiProperty({ example: 'doc-456', description: 'ID del profesional' })
  @IsString()
  @IsNotEmpty()
  profesionalId!: string;

  @ApiProperty({
    example: '2026-10-25T10:00:00Z',
    description: 'Fecha en formato ISO',
  })
  @IsDateString()
  fechaHora!: string;
}
