import { Module } from '@nestjs/common';
import { OrdersItemsController } from './orders-items.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, ORDER_ITEM_SERVICE } from 'src/config';

@Module({
  controllers: [OrdersItemsController],
  imports:[
      ClientsModule.register([
        {
          name: ORDER_ITEM_SERVICE,
          transport: Transport.TCP,
          options: {
            host: envs.ordersItemMicroserviceHost,
            port: envs.ordersItemMicroservicePort
          }
        }
      ])
    ]
})
export class OrdersItemsModule {}
