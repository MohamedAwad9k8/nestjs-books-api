import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './schemas/book.schema';
import { UpdateBookDto } from './dto/update-book.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { SearchQueryDto } from './dto/search-query.dto';
import { BOOK_SCHEMA_NAME } from './book.constants';
import { User } from 'src/auth/schemas/user.schema';
@Injectable()
export class BookService {
    constructor(
        @InjectModel(BOOK_SCHEMA_NAME) 
        private bookModel: Model<Book>
    ) {}

    async findAll(query: SearchQueryDto): Promise<Book[]>{
        const resPerPage = query.perPage || 2;
        const currentPage = query.page || 1;
        const skip = resPerPage * (currentPage - 1);
        const keyword = query.keyword ? {
            title: {
                $regex: query.keyword,
                $options: 'i'
            }
        } : {};

        const books = await this.bookModel
         .find({ ...keyword })
         .limit(resPerPage)
         .skip(skip);
        return books;
    }

    async create(book: CreateBookDto, user: User): Promise<Book> {
        const data = Object.assign(book, {user: user._id});
        const res = await this.bookModel.create(data);
        return res;
    }

    async findById(id: string): Promise<Book>{
        const book = await this.bookModel.findById(id);
        if (!book) {
            throw new NotFoundException('Book not found');
        }
        return book;
    }

    async updateById(id: string, book: UpdateBookDto): Promise<Book>{
        
        const res = await this.bookModel.findByIdAndUpdate(id, book, { new: true,runValidators: true});
        if (!res) {
            throw new NotFoundException('Book not found');
        } 
        return res;
        
    }

    async deleteById(id: string): Promise<void>{
        
        const res = await this.bookModel.findByIdAndDelete(id);
        if (!res) {
            throw new NotFoundException('Book not found');
        } 
        
    }
}
