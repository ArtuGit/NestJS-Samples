import { PartialType } from '@nestjs/swagger'

import { CreateCompanyBody } from './create-company.body'

export class UpdateCompanyBody extends PartialType(CreateCompanyBody) {}
