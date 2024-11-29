import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { Book } from './entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],  // Import TypeORM feature with Book entity
  controllers: [BookController],  // Add controller
  providers: [BookService],  // Add service
})
export class BookModule {}