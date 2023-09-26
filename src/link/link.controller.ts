import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { LinkService } from './link.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { Link } from './entities/link.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageConfig } from 'src/helpers/config';
import { UpdateLinkDto } from './dto/update-link.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { validationFile } from 'src/helpers/ultis';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

@Controller('links')
@ApiTags('Links')
export class LinkController {
  constructor(private linkService: LinkService) {}

  @Get()
  getAll(): Promise<Link[]> {
    return this.linkService.getAll();
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        url: { type: 'string' },
        icon: {
          type: 'string',
          format: 'binary',
        },
        description: { type: 'string' },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('icon', {
      storage: storageConfig(),
      fileFilter(req, file, callback) {
        validationFile(req, file, callback);
      },
    }),
  )
  create(
    @Req() req: { fileValidationError: string },
    @Body() createDto: CreateLinkDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Link> {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    if (!file) {
      throw new BadRequestException('File is required');
    }
    return this.linkService.create(
      createDto,
      file.destination + '/' + file.filename,
    );
  }

  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        url: { type: 'string' },
        icon: {
          type: 'string',
          format: 'binary',
        },
        description: { type: 'string' },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('icon', {
      storage: storageConfig(),
      fileFilter(req, file, callback) {
        validationFile(req, file, callback);
      },
    }),
  )
  update(
    @Param('id') id: string,
    @Req() req: { fileValidationError: string },
    @Body() updateDto: UpdateLinkDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UpdateResult> {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    if (!file) {
      throw new BadRequestException('File is required');
    }
    return this.linkService.update(
      Number(id),
      updateDto,
      file.destination + '/' + file.filename,
    );
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.linkService.delete(Number(id));
  }
}
