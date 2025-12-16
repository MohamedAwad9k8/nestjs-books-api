import { IsNumber, IsOptional, IsString } from "class-validator";
import { Type } from 'class-transformer';
export class SearchQueryDto {
  @IsOptional()
  @IsString()
  keyword?: string;
  
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  perPage?: number;
}