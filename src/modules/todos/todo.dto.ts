import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsString } from 'class-validator'

export class CreateTodoDto {
  @ApiProperty({ example: 'Learn nodejs' })
  @IsString()
  readonly title: string

  @ApiProperty({ example: 'some description' })
  @IsString()
  readonly description: string

  @ApiProperty({ example: false })
  @IsBoolean()
  readonly completed: boolean
}

export class UpdateTodoDto {
  @ApiProperty({ example: 'Learn nodejs' })
  @IsString()
  readonly title: string

  @ApiProperty({ example: 'some description' })
  @IsString()
  readonly description: string

  @ApiProperty({ example: false })
  @IsBoolean()
  readonly completed: boolean
}
