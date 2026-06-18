import {Controller, Get, Param, UseGuards} from '@nestjs/common';
import {ApiTags, ApiBearerAuth} from '@nestjs/swagger';

import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiGetUsersDocs } from 'src/common/swagger/users/get-users.swagger';
import { ApiGetUserByIdDocs } from 'src/common/swagger/users/get-user-by-id.swagger';
import { ApiGetUserByCiDocs } from 'src/common/swagger/users/get-user-by-ci.swagger';

@ApiTags('Users')
@ApiBearerAuth('JWT-auth')
@Controller('users')
export class UsersController {constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CLOWN')
  @ApiGetUsersDocs()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get('search/ci/:ci')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CLOWN')
  @ApiGetUserByCiDocs()
  async findByCi(@Param('ci') ci: string) {
    return this.usersService.findByCi(ci)
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CLOWN')
  @ApiGetUserByIdDocs()
  async findById(
    @Param('id') id: string,
  ) {
    return this.usersService.findById(id);
  }
}