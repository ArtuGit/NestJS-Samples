import { Injectable } from '@nestjs/common'

import { CreateCompanyBody } from './dto/create-company.body'
import { UpdateCompanyBody } from './dto/update-company.body'
import { PatchCompanyBody } from './dto/patch-company.body'
import { Company } from './entities/company.entity'
import { ICompany } from './types/companies.types'
import { companiesStorage } from './storage/companies.storage'

@Injectable()
export class CompaniesService {
  private readonly companies: ICompany[]

  constructor() {
    this.companies = companiesStorage
  }

  async create(createCompanyBody: CreateCompanyBody): Promise<Company> {
    const id = (100000 + Math.random() * 900000).toString()
    const company: Company = {
      id,
      ...createCompanyBody,
    }
    this.companies.push(company)
    return company
  }

  async findAll(): Promise<Company[]> {
    return this.companies
  }

  findOne(id: string) {
    return `This action returns a #${id} company`
  }

  async update(id: string, updateCompanyBody: UpdateCompanyBody): Promise<Company> {
    return {
      id,
      ...updateCompanyBody,
    }
  }

  patch(id: string, patchCompanyBody: PatchCompanyBody) {
    return `This action patch a #${id} company`
  }

  remove(id: string) {
    return `This action removes a #${id} company`
  }
}
