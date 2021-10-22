import { Injectable } from '@nestjs/common'

import { CreateCompanyBody } from './dto/create-company.body'
import { UpdateCompanyBody } from './dto/update-company.body'
import { PatchCompanyBody } from './dto/patch-company.body'

@Injectable()
export class CompaniesService {
  create(createCompanyBody: CreateCompanyBody) {
    return 'This action adds a new company'
  }

  findAll() {
    return `This action returns all companies`
  }

  findOne(id: number) {
    return `This action returns a #${id} company`
  }

  update(id: number, updateCompanyBody: UpdateCompanyBody) {
    return `This action updates a #${id} company`
  }

  patch(id: number, updateCompanyBody: PatchCompanyBody) {
    return `This action patch a #${id} company`
  }

  remove(id: number) {
    return `This action removes a #${id} company`
  }
}
