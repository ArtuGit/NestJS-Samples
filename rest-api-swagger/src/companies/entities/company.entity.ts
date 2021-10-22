import { ApiProperty } from '@nestjs/swagger'

import { SalesFunnelStage } from '../interfaces/companies.interfaces'

export class Company {
  @ApiProperty({ type: String })
  _id: string

  @ApiProperty({ type: String })
  name: string

  @ApiProperty({ enum: SalesFunnelStage })
  salesFunnelStage: SalesFunnelStage

  @ApiProperty({ type: String })
  websiteURL?: string

  @ApiProperty({ type: String })
  logoURI?: string
}
