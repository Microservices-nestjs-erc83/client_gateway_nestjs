import { Module } from '@nestjs/common';
import { OrdersItemsController } from './orders-items.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, ORDER_ITEM_SERVICE } from 'src/config';
import { NatsModule } from '../transports/nats.module';

@Module({
  controllers: [OrdersItemsController],
  imports:[
    NatsModule,
  ]
})
export class OrdersItemsModule {}
