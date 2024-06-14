import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersManagmentService {
  getHello(): string {
    return 'Hello World!';
  }
}
