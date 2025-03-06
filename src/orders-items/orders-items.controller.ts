import { 
  Controller, 
  Post, 
  Body, 
  Inject 
} from '@nestjs/common';
import { CreateOrdersItemDto } from './dto/create-orders-item.dto';


import { ORDER_ITEM_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';

@Controller('orders-items')
export class OrdersItemsController {
  constructor(
    @Inject(ORDER_ITEM_SERVICE) private readonly orderItemClientMicro: ClientProxy
  ) {}

  @Post()
  createOrderItem(@Body() createOrdersItemDto: CreateOrdersItemDto) {
    
    return { createOrdersItemDto }
  
  }

}
