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
    Query,
    UseGuards,
    Req
} from '@nestjs/common';
import { BookService} from './book.service';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { SearchQueryDto } from './dto/search-query.dto';
import { MongoIDValidationPipe } from './pipes/mongo-id-validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/enums/roles.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('books')
export class BookController {
    constructor(private readonly bookService: BookService) {}
    
    @Get()
    @Roles(Role.USER)
    @UseGuards(AuthGuard(), RolesGuard)
    async getAllBooks(@Query() query: SearchQueryDto): Promise<Book[]> {
        return this.bookService.findAll(query);
    }

    @Post()
    @Roles(Role.ADMIN, Role.MODERATOR)
    @UseGuards(AuthGuard(), RolesGuard)
    async createBook(
        @Body() 
        book: CreateBookDto,
        @Req()
        req,
    ): Promise<Book> {
        return this.bookService.create(book, req.user);
    }

    @Get(':id')
    @Roles(Role.USER)
    @UseGuards(AuthGuard(), RolesGuard)
    async getBook(@Param('id', MongoIDValidationPipe) id: string): Promise<Book> {
        return this.bookService.findById(id);
    }

    @Put(':id')
    @Roles(Role.ADMIN, Role.MODERATOR)
    @UseGuards(AuthGuard(), RolesGuard)
    async updateBook(@Param('id', MongoIDValidationPipe) id: string, @Body() book: UpdateBookDto): Promise<Book> {
        return this.bookService.updateById(id, book);
    }

    @Delete(':id')
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard(), RolesGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteBook(@Param('id', MongoIDValidationPipe) id: string): Promise<void> {
        return this.bookService.deleteById(id);
    }
}
