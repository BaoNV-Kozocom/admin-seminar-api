import { ApiProperty } from '@nestjs/swagger';

export class UpdateLinkDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  url: string;
  @ApiProperty()
  icon: string;
  @ApiProperty()
  description?: string;
}
