import { Injectable } from '@nestjs/common';
import cloudinary from './cloudinary.config';
import { CloudinaryUploadResult } from './interfaces/cloudinary-upload-result.interface';

@Injectable()
export class UploadsService {
    async uploadImage(
        file: Express.Multer.File,
    ): Promise<CloudinaryUploadResult> {
        return new Promise<CloudinaryUploadResult>((resolve, reject) => {
            cloudinary.uploader
                .upload_stream(
                    {
                        folder: 'mundotilin/services',
                    },
                    (error, result) => {
                        if (error) return reject(error);

                        resolve({
                            secure_url: result!.secure_url,
                            public_id: result!.public_id,
                        });
                    },
                )
                .end(file.buffer);
        });
    }

    async uploadToFolder(
        file: Express.Multer.File,
        folder: string,
        resourceType: 'image' | 'video' = 'image',
    ) {
        return new Promise<any>((resolve, reject) => {
            cloudinary.uploader
                .upload_stream(
                    {
                        folder,
                        resource_type: resourceType,
                    },
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result);
                    },
                )
                .end(file.buffer);
        });
    }
}