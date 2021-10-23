import { Injectable } from '@nestjs/common'
import { usersStorage } from './storage/users.storage'
import { IUser } from './interfaces/user.interface'

@Injectable()
export class UsersService {
  private readonly users: IUser[]

  constructor() {
    this.users = usersStorage
  }

  async findOne(username: string): Promise<IUser> {
    return this.users.find((user) => user.username === username)
  }
}
