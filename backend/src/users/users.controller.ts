import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.getAll();
  }

  @Post()
  createUser(@Body() body: { email: string; name?: string }) {
    return this.usersService.create(body.email, body.name);
  }
}

