import { PartialType } from '@nestjs/swagger'

import { CreateCompanyBody } from './create-company.body'
import { UpdateCompanyBody } from './update-company.body'

export class PatchCompanyBody extends PartialType(UpdateCompanyBody) {}
