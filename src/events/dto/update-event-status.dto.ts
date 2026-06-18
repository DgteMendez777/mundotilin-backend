import { ApiProperty } from "@nestjs/swagger";
import { event_status } from "@prisma/client";
import { IsEnum } from "class-validator";

export class UpdateEventStatusDto {
    @ApiProperty({
        enum: event_status,
        example: event_status.CONFIRMED,
        description: 'Nuevo estado del evento'
    })
    @IsEnum(event_status)
    status: event_status
}