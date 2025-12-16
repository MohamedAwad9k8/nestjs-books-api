import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from './schemas/book.schema';
import { BOOK_SCHEMA_NAME } from './book.constants';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  imports: [
    AuthModule, 
    MongooseModule.forFeature([{ name: BOOK_SCHEMA_NAME, schema: BookSchema }])
  ],
  controllers: [BookController],
  providers: [BookService]
})
export class BookModule {}
