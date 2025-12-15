import { Module } from '@nestjs/common';
import { BooksController } from './book.controller';
import { BookService } from './book.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from './schemas/book.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: "Book", schema: BookSchema }])],
  controllers: [BooksController],
  providers: [BookService]
})
export class BooksModule {}
