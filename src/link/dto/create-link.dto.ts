import { ApiProperty } from '@nestjs/swagger';

export class CreateLinkDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  url: string;
  @ApiProperty()
  icon: string;
  @ApiProperty()
  description?: string;
}
