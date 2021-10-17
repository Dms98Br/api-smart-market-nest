import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { response } from 'express';
import { ResutlDto } from 'src/dto/result.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
var pool = require('../connections/connections')
@Injectable()
export class UsersService {

  create(createUserDto: CreateUserDto) {  
    return new Promise((resolve,rejects)=>{      
      try {
        var user = createUserDto;
        var sql_find_email = 'SELECT * from users WHERE email= ?';

        pool.query(sql_find_email,user.email,(err,result)=>{
          if (err) {            
            return rejects(err.message)
          }
          //* Se o objeto for maior que 0 significa que já existe esse usuário
          if (result.length>0) {
            //new BadRequestException('E-mail já cadastrado',"400")
            return rejects({
              statusCode: 400,
              message:'E-mail já cadastrado'
            });

          }

          user.password = bcrypt.hashSync(createUserDto.password,8)
          
          var sql = 'INSERT INTO users SET ?';
          pool.query(sql,user,(err,response)=>{
            if(err)
              return rejects(err.message)
            resolve({
              statusCode: 201,
              message:'Usuário criado'
            })

          })
        })
      } catch (error) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        }, HttpStatus.BAD_REQUEST);
      }
    })
    return 'This action adds a new user';
  }

  findAll() {
    return new Promise((resolve,rejects)=>{
      pool.query('Select * from users ', (err,users)=>{
        if (err) {
          return rejects(err)
        }
        resolve(users)
      });
    })
    return `This action returns all users`;
  }

  findOneEmail(email: string){
    return new Promise((resolve,rejects)=>{
      pool.query('Select * from users WHERE email=?',email, (err,users)=>{
        if (err) {
          return rejects(err.message)
        }
        resolve(users)
      });
    })
  }

  findOne(id: number) {
    return new Promise((resolve,rejects)=>{
      pool.query('Select * from users WHERE id_user=?',id, (err,users)=>{
        if (err) {
          return rejects(err.message)
        }
        resolve(users)
      });
    })
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
