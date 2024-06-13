import { ApiProperty } from '@nestjs/swagger';

export class SortingQueryParams {
  @ApiProperty({ required: false })
  sortBy: string;
  @ApiProperty({ required: false })
  sortDirection: string;
  @ApiProperty({ required: false })
  pageNumber: number;
  @ApiProperty({ required: false })
  pageSize: number;
}
