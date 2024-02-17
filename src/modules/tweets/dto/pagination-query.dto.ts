import { IsNumber, IsOptional, IsPositive } from "class-validator";

export class PaginationQuery {
    @IsNumber()
    @IsPositive()
    @IsOptional()
    limit: number;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    offSet: number;
}