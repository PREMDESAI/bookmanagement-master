import { IsNotEmpty } from 'class-validator';

export class UpdateBookDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  author: string;

  @IsNotEmpty()
  description: string;
}