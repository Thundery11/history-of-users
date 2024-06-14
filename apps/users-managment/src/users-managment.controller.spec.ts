import { Test, TestingModule } from '@nestjs/testing';
import { UsersManagmentController } from './users-managment.controller';
import { UsersManagmentService } from './users-managment.service';

describe('UsersManagmentController', () => {
  let usersManagmentController: UsersManagmentController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersManagmentController],
      providers: [UsersManagmentService],
    }).compile();

    usersManagmentController = app.get<UsersManagmentController>(UsersManagmentController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(usersManagmentController.getHello()).toBe('Hello World!');
    });
  });
});
