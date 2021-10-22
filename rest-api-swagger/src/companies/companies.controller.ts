import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common'

import { CompaniesService } from './companies.service'
import { CreateCompanyBody } from './dto/create-company.body'
import { UpdateCompanyBody } from './dto/update-company.body'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { Company } from './entities/company.entity'

@ApiTags('Companies')
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
  findAll() {
    return this.companiesService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(+id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCompanyBody: UpdateCompanyBody) {
    return this.companiesService.update(+id, updateCompanyBody)
  }

  @Patch(':id')
  patch(@Param('id') id: string, @Body() updateCompanyBody: UpdateCompanyBody) {
    return this.companiesService.patch(+id, updateCompanyBody)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companiesService.remove(+id)
  }
}
