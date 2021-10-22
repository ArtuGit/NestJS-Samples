import { ApiProperty } from '@nestjs/swagger'
import { SalesFunnelStage } from '../interfaces/companies.interfaces'

export class CreateCompanyBody {
  @ApiProperty({ type: String })
  name: string

  @ApiProperty({ enum: SalesFunnelStage })
  salesFunnelStage: SalesFunnelStage

  @ApiProperty({ type: String })
  websiteURL: string
}
