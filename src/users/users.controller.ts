import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
var pool = require('../connections/connections')

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('/criar-usuario')
  async create(@Body() createUserDto: CreateUserDto){
    return this.usersService.create(createUserDto)
    // try {
    //   return this.usersService.create(createUserDto)
    // } catch (error) {
    //   throw new HttpException({
    //     status: HttpStatus.BAD_REQUEST,
    //     error: error.message,
    //   }, HttpStatus.BAD_REQUEST);
    // }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @Get('email/:email')
  findOneEmail(@Param('email') email: string) {
    return this.usersService.findOneEmail(email);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
