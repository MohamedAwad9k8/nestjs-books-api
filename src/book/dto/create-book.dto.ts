import { IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Category } from "../schemas/book.schema";
import { User } from "src/auth/schemas/user.schema";

export class CreateBookDto {
    @IsString()
    @IsNotEmpty()
    readonly title: string;
    
    @IsString()
    @IsNotEmpty()
    readonly author: string;
    
    @IsString()
    @IsNotEmpty()
    readonly description: string;
    
    @IsNumber()
    @IsNotEmpty()
    readonly price: number;
    
    @IsEnum(Category, {message: "Please enter a correct Category!"})
    @IsNotEmpty()
    readonly category: Category;

    @IsEmpty()
    readonly user: User;
}