import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { TestimonialsService } from './testimonials.service';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Testimonials')
@Controller('testimonials')
export class TestimonialsController {
  constructor(private readonly testimonialsService: TestimonialsService) {}

  @Post()
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CLIENT')
  create(@Body() data: CreateTestimonialDto, @Req() req: any) {
    return this.testimonialsService.create(data, req.user.id);
  }

  @Get()
  findPublic() {
    return this.testimonialsService.findPublic();
  }

  @Get('featured')
  findFeatured() {
    return this.testimonialsService.findFeatured();
  }

  @Get('admin/list')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CLOWN')
  findAdmin() {
    return this.testimonialsService.findAdmin();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testimonialsService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CLOWN')
  update(@Param('id') id: string, @Body() data: UpdateTestimonialDto) {
    return this.testimonialsService.update(id, data);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CLOWN')
  remove(@Param('id') id: string) {
    return this.testimonialsService.remove(id);
  }
}