import { ApiProperty } from '@nestjs/swagger'

export class User {
  @ApiProperty({ type: Number })
  userId: number

  @ApiProperty({ type: String })
  username: string
}

export interface IUser {
  userId: number
  username: string
}
