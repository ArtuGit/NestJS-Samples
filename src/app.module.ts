import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NodesModule } from './nodes/nodes.module';

@Module({
  imports: [NodesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
