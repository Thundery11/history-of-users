import { Controller, Get, Put } from '@nestjs/common';
import { UsersManagmentService } from '../users-managment.service';

@Controller('user-management')
export class UsersManagmentController {
  constructor(private readonly userManagementService: UsersManagmentService) {}

  @Put('fix-problems')
  async fixUserProblems() {
    const result = await this.userManagementService.fixUserProblems();
    return {
      message: 'User problems updated successfully',
      updatedUsers: result,
    };
  }
}
