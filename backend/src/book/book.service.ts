import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async findAll(title?: string, page: number = 1, limit: number = 10): Promise<{ books: Book[]; totalPages: number }> {
    const queryBuilder = this.bookRepository.createQueryBuilder('book');  
    
    if (title) {
      queryBuilder.where('book.title ILIKE :title', { title: `%${title}%` });
    }  
    
    const [books, total] = await queryBuilder
      .skip((page - 1) * limit) 
      .take(limit) 
      .getManyAndCount();
  
    
    const totalPages = Math.ceil(total / limit);
  
    return { books, totalPages }; 
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: { id },
    });

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return book;
  }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const existingBook = await this.bookRepository.findOne({
      where: { title: createBookDto.title },
    });

    if (existingBook) {
      throw new ConflictException('Book with this title already exists');
    }
    const book = this.bookRepository.create(createBookDto);
    return this.bookRepository.save(book);
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.findOne(id);
    Object.assign(book, updateBookDto);
    return this.bookRepository.save(book);
  }

  async remove(id: number): Promise<void> {
    const book = await this.findOne(id);
    await this.bookRepository.remove(book);
  }
}