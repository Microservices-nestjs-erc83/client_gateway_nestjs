import { 
  Controller, 
  Post, 
  Body, 
  Inject, 
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Query,
  Patch
} from '@nestjs/common';
import { CreateOrdersItemDto } from './dto/create-orders-item.dto';


import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { OrderItemPaginationDto } from './dto/orderItem-pagination.dto';
import { StatusItemDto } from './dto/status.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('orders-items')
export class OrdersItemsController {
  constructor(
    @Inject(NATS_SERVICE) private readonly orderItemClientNats: ClientProxy,
  ) {}

  @Post()
  create(@Body() createOrdersItemDto: CreateOrdersItemDto) {
    return this.orderItemClientNats.send('createOrdersItem', createOrdersItemDto)
  
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe ) id: string ) {
    try {
      const order = await firstValueFrom(
        this.orderItemClientNats.send('findOneOrderItem', { id })
      );

      return order;
    } catch (error) {
      throw new RpcException( error )
    }
  }

  @Get()
  findAll( @Query() orderItemPaginationDto: OrderItemPaginationDto ) {
      return this.orderItemClientNats.send('findAllOrdersItems',  orderItemPaginationDto)
      //return this.orderClientMicro.send('findAllOrders', {});
  }

  @Patch(':id')
  changeStatus(
    @Param('id', ParseUUIDPipe ) id : string,
    @Body() statusItemDto : StatusItemDto,
  ) {
    try {
      return this.orderItemClientNats.send('changeOrderItemStatus', {
        id,
        status: statusItemDto.status
      })
    } catch ( error ) {
      throw new RpcException( error )
    }
  }

  @Get('status/:status')
  async findAllByStatus(
    @Param() statusItemDto: StatusItemDto, 
    @Query()  paginationDto : PaginationDto
  ) {
    try {

      return this.orderItemClientNats.send('findAllOrdersItems', {
        ...paginationDto,
        status: statusItemDto.status,
      })

    } catch (error) {
      throw new RpcException( error )
    }

  }

}
