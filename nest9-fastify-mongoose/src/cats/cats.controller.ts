import { Controller, Get, Post, Body } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './cat.schema'
import { CreateCatBody } from './dto/create-cat.body';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}
  @Post()
  create(@Body() createCatBody: CreateCatBody): Promise<Cat> {
      return this.catsService.create(createCatBody)
  }
}
