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
    const id = Math.floor(10000000 + Math.random() * 90000000).toString()
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

  async findOne(id: string): Promise<Company> {
    return this.companies.find((company) => company.id === id)
  }

  async update(id: string, updateCompanyBody: UpdateCompanyBody): Promise<Company> {
    const exCompId = this.companies.findIndex((el) => el.id === id)
    this.companies[exCompId] = {
      id,
      ...updateCompanyBody,
    }
    return this.companies[exCompId]
  }

  async patch(id: string, patchCompanyBody: PatchCompanyBody): Promise<Company> {
    const exCompId = this.companies.findIndex((el) => el.id === id)
    const exComp = this.companies[exCompId]
    this.companies[exCompId] = {
      ...exComp,
      ...patchCompanyBody,
    }
    return this.companies[exCompId]
  }

  remove(id: string) {
    return `This action removes a #${id} company`
  }
}
