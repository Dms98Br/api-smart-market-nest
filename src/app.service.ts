import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! 11';
  }
  getTeste(): string{
    return 'Teste deu certo'
  }
}