import { Injectable } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { Link } from './entities/link.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UpdateLinkDto } from './dto/update-link.dto';
import { removeFile } from 'src/helpers/config';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Link) private linkRepository: Repository<Link>,
  ) {}

  async getAll(): Promise<Link[]> {
    return await this.linkRepository.find();
  }

  async create(createLinkDto: CreateLinkDto, file: string): Promise<Link> {
    return await this.linkRepository.save({
      ...createLinkDto,
      icon: file,
    });
  }

  async update(
    id: number,
    updateLinkDto: UpdateLinkDto,
    file: string,
  ): Promise<UpdateResult> {
    const oldUrlIcon = await this.linkRepository.findOne({
      where: {
        id,
      },
      select: ['icon'],
    });
    if (oldUrlIcon.icon) {
      await removeFile(oldUrlIcon.icon);
    }
    return await this.linkRepository.update(
      { id },
      {
        ...updateLinkDto,
        icon: file,
      },
    );
  }

  async delete(id: number): Promise<DeleteResult> {
    const oldUrlIcon = await this.linkRepository.findOne({
      where: {
        id,
      },
      select: ['icon'],
    });
    await removeFile(oldUrlIcon.icon);
    return await this.linkRepository.delete({ id });
  }
}
