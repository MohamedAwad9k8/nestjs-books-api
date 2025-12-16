import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './schemas/book.schema';
import { UpdateBookDto } from './dto/update-book.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { SearchQueryDto } from './dto/search-query.dto';
@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name) 
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

    async create(book: CreateBookDto): Promise<Book> {
        const res = await this.bookModel.create(book);
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
