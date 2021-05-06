import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNodeDto } from './dto/create-node.dto';
import { UpdateNodeDto } from './dto/update-node.dto';
import { Node } from './entities/node.entity';

@Injectable()
export class NodesService {
  constructor(
    @InjectRepository(Node)
    private readonly nodesRepository: Repository<Node>,
  ) {}

  create(createNodeDto: CreateNodeDto): Promise<Node> {
    const node = new Node();
    node.title = createNodeDto.title;
    node.description = createNodeDto.description;
    node.isActive = createNodeDto.isActive;
    return this.nodesRepository.save(node);
  }

  async findAll(): Promise<Node[]> {
    return this.nodesRepository.find();
  }

  async update(id: number, updateNodeDto: UpdateNodeDto) {
    const node = await this.nodesRepository.findOne(id);
    if (updateNodeDto.title) {
      node.title = updateNodeDto.title;
    }
    if (updateNodeDto.description) {
      node.description = updateNodeDto.description;
    }
    if (updateNodeDto.isActive) {
      node.isActive = updateNodeDto.isActive;
    }
    await this.nodesRepository.update(id, node);
    return node;
  }

  findOne(id: string): Promise<Node> {
    return this.nodesRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.nodesRepository.delete(id);
  }
}
