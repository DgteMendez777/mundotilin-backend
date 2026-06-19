import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { GalleryService } from './gallery.service';
import { CreateGalleryMediaDto } from './dto/create-gallery-media.dto';
import { UpdateGalleryMediaDto } from './dto/update-gallery-media.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Gallery')
@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Post()
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CLOWN')
  create(@Body() data: CreateGalleryMediaDto) {
    return this.galleryService.create(data);
  }

  @Get()
  findPublic() {
    return this.galleryService.findPublic();
  }

  @Get('featured')
  findFeatured() {
    return this.galleryService.findFeatured();
  }

  @Get('admin/list')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CLOWN')
  findAdmin() {
    return this.galleryService.findAdmin();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.galleryService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CLOWN')
  update(
    @Param('id') id: string,
    @Body() data: UpdateGalleryMediaDto,
  ) {
    return this.galleryService.update(id, data);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CLOWN')
  remove(@Param('id') id: string) {
    return this.galleryService.remove(id);
  }
}