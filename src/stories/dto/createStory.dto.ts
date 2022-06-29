import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateStoryDto {
  @IsNotEmpty({ message: 'Title cannot be empty' })
  @ApiProperty({ type: String })
  title: string;

  @ApiProperty({ type: String })
  desc: string;

  @ApiProperty({ type: [], required: false })
  image: [];

  @ApiProperty({ type: Date, required: true })
  createdStory: Date;
}