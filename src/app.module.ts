import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { OrdersItemsModule } from './orders-items/orders-items.module';
import { NatsModule } from './transports/nats.module';

@Module({
  imports: [ProductsModule, OrdersModule, OrdersItemsModule, NatsModule],
})
export class AppModule {}
