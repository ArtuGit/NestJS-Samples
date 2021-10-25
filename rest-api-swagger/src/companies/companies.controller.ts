import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger'

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

import { CompaniesService } from './companies.service'
import { CreateCompanyBody } from './dto/create-company.body'
import { UpdateCompanyBody } from './dto/update-company.body'
import { Company } from './entities/company.entity'

@ApiTags('Companies')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller({
  path: 'companies',
  version: '1',
})
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @ApiOkResponse({ type: Company })
  @Post()
  async create(@Body() createCompanyBody: CreateCompanyBody): Promise<Company> {
    return this.companiesService.create(createCompanyBody)
  }

  @Get()
  findAll(): Promise<Company[]> {
    return this.companiesService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Company> {
    return this.companiesService.findOne(id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCompanyBody: UpdateCompanyBody): Promise<Company> {
    return this.companiesService.update(id, updateCompanyBody)
  }

  @Patch(':id')
  patch(@Param('id') id: string, @Body() updateCompanyBody: UpdateCompanyBody): Promise<Company> {
    return this.companiesService.patch(id, updateCompanyBody)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.companiesService.remove(id)
  }
}
