import { 
    Controller, 
    Get, 
    Post, 
    Put, 
    Delete,
    Body, 
    Param, 
    HttpStatus, 
    HttpCode, 
    Query
} from '@nestjs/common';
import { BookService} from './book.service';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { SearchQueryDto } from './dto/search-query.dto';
import { MongoIDValidationPipe } from './pipes/mongo-id-validation.pipe';
@Controller('books')
export class BooksController {
    constructor(private readonly bookService: BookService) {}
    @Get()
    async getAllBooks(@Query() query: SearchQueryDto): Promise<Book[]> {
        return this.bookService.findAll(query);
    }

    @Post()
    async createBook(@Body() book: CreateBookDto): Promise<Book> {
        return this.bookService.create(book);
    }

    @Get(':id')
    async getBook(@Param('id', MongoIDValidationPipe) id: string): Promise<Book> {
        return this.bookService.findById(id);
    }

    @Put(':id')
    async updateBook(@Param('id', MongoIDValidationPipe) id: string, @Body() book: UpdateBookDto): Promise<Book> {
        return this.bookService.updateById(id, book);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteBook(@Param('id', MongoIDValidationPipe) id: string): Promise<void> {
        return this.bookService.deleteById(id);
    }
}
