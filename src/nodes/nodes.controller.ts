import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NodesService } from './nodes.service';
import { CreateNodeDto } from './dto/create-node.dto';
import { UpdateNodeDto } from './dto/update-node.dto';

@Controller('nodes')
export class NodesController {
  constructor(private readonly nodesService: NodesService) {}

  @Post()
  create(@Body() createNodeDto: CreateNodeDto) {
    return this.nodesService.create(createNodeDto);
  }

  @Get()
  findAll() {
    return this.nodesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nodesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNodeDto: UpdateNodeDto) {
    return this.nodesService.update(+id, updateNodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nodesService.remove(+id);
  }
}
