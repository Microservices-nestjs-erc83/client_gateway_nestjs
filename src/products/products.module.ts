import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { ProductsController } from './products.controller';
import { envs, NATS_SERVICE } from 'src/config';

@Module({
  controllers: [ProductsController],
  providers: [],
  imports:[
    ClientsModule.register([
      { 
        name: NATS_SERVICE, 
        transport: Transport.NATS,
        options: {
          //host: envs.productsMicroserviceHost,
          //port: envs.productsMicroservicePort
          servers: envs.natsServers,
        },
      }  
    ])
  ]
})
export class ProductsModule {
  // see my envs
  //constructor() {     
  //  console.log({ envs })
  //}
}
