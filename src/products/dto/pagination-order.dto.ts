import { IsOptional, IsEnum } from 'class-validator'
import { PaginationDto } from "src/common/dto/pagination.dto";

import { OrderStatus, OrderStatusList } from "src/orders/enum/order.enum";

export class PaginationOrderDto extends PaginationDto {

    @IsOptional()
    @IsEnum( OrderStatusList, {
        message: `Valid status are ${ OrderStatusList }`
    })
    status: OrderStatus

}
