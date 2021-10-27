import { Injectable, UnprocessableEntityException } from '@nestjs/common'
import { hash } from 'bcrypt'

import { usersStorage } from './storage/users.storage'
import { IUser } from './interfaces/user.interface'

@Injectable()
export class UsersService {
  private readonly users: IUser[]

  constructor() {
    this.users = usersStorage
  }

  public async register(username: string, password: string): Promise<IUser> {
    const exUser = await this.findOneByUserName(username)

    if (exUser) {
      throw new UnprocessableEntityException(`Username '${username}' already in use`)
    }

    const id = Math.floor(10000000 + Math.random() * 90000000).toString()
    const passwordHashed = await hash(password, 10)
    const user: IUser = {
      id,
      username,
      password: passwordHashed,
    }
    this.users.push(user)
    return user
  }

  async findOneById(id: string): Promise<IUser> {
    return this.users.find((user) => user.id === id)
  }

  async findOneByUserName(username: string): Promise<IUser> {
    return this.users.find((user) => user.username === username)
  }
}
