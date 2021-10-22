import { Injectable } from '@nestjs/common'

import { CreateCompanyBody } from './dto/create-company.body'
import { UpdateCompanyBody } from './dto/update-company.body'
import { PatchCompanyBody } from './dto/patch-company.body'
import { Company } from './entities/company.entity'

@Injectable()
export class CompaniesService {
  async create(createCompanyBody: CreateCompanyBody): Promise<Company> {
    return {
      _id: Math.floor(100000 + Math.random() * 900000).toString(),
      ...createCompanyBody,
    }
  }

  findAll() {
    return `This action returns all companies`
  }

  findOne(id: string) {
    return `This action returns a #${id} company`
  }

  async update(id: string, updateCompanyBody: UpdateCompanyBody): Promise<Company> {
    return {
      _id: id,
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
