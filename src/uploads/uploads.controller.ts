import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadsService } from './uploads.service';

@ApiTags('Uploads')
@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) { }

  @Post('service-image')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['file'],
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Debe enviar una imagen');
    }

    const result = await this.uploadsService.uploadImage(file);

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  }

  @Post('gallery-image')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['file'],
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadGalleryImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Debe enviar una imagen');
    }

    const result = await this.uploadsService.uploadToFolder(
      file,
      'mundotilin/gallery/images',
      'image',
    );

    return {
      url: result.secure_url,
      publicId: result.public_id,
      type: 'IMAGE',
    };
  }

  @Post('gallery-video')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['file'],
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadGalleryVideo(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Debe enviar un video');
    }

    const result = await this.uploadsService.uploadToFolder(
      file,
      'mundotilin/gallery/videos',
      'video',
    );

    return {
      url: result.secure_url,
      publicId: result.public_id,
      type: 'VIDEO',
    };
  }

  @Post('testimonial-image')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['file'],
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadTestimonialImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Debe enviar una imagen');
    }

    const result = await this.uploadsService.uploadToFolder(
      file,
      'mundotilin/testimonials',
      'image',
    );

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  }

  @Post('payment-proof')
@ApiConsumes('multipart/form-data')
@ApiBody({
  schema: {
    type: 'object',
    properties: {
      file: {
        type: 'string',
        format: 'binary',
      },
    },
    required: ['file'],
  },
})
@UseInterceptors(FileInterceptor('file'))
async uploadPaymentProof(@UploadedFile() file: Express.Multer.File) {
  if (!file) {
    throw new BadRequestException('Debe enviar un comprobante');
  }

  const result = await this.uploadsService.uploadToFolder(
    file,
    'mundotilin/payments',
    'image',
  );

  return {
    url: result.secure_url,
    publicId: result.public_id,
  };
}
}