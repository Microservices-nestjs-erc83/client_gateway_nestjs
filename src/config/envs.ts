import 'dotenv/config'
import * as joi from 'joi'

interface EnvVars {
    PORT: number
    PRODUCT_MICROSERVICE_HOST: string
    PRODUCT_MICROSERVICE_PORT: number
    
    ORDER_MICROSERVICE_HOST: string
    ORDER_MICROSERVICE_PORT: number
    
    ORDER_ITEM_MICROSERVICE_HOST: string
    ORDER_ITEM_MICROSERVICE_PORT: number
}

const envsSchema = joi.object({
    PORT: joi.number().required(),
    
    PRODUCT_MICROSERVICE_HOST: joi.string().required(),
    PRODUCT_MICROSERVICE_PORT: joi.number().required(),
    
    ORDER_MICROSERVICE_HOST: joi.string().required(),
    ORDER_MICROSERVICE_PORT: joi.number().required(),
    
    ORDER_ITEM_MICROSERVICE_HOST: joi.string().required(),
    ORDER_ITEM_MICROSERVICE_PORT: joi.number().required(),

})
.unknown(true)          // mas variables de entorno permitidas de la app


const { error, value } = envsSchema.validate( process.env )

if( error ) {
    throw new Error(`Config validation error: ${ error.message }`)
}

const envVars: EnvVars = value              // agregamos el tipado    envVars.PORT

export const envs = {
    port: envVars.PORT,
    productsMicroserviceHost: envVars.PRODUCT_MICROSERVICE_HOST,
    productsMicroservicePort: envVars.PRODUCT_MICROSERVICE_PORT,
    ordersMicroserviceHost: envVars.ORDER_MICROSERVICE_HOST,
    ordersMicroservicePort: envVars.ORDER_MICROSERVICE_PORT,
    ordersItemMicroserviceHost: envVars.ORDER_ITEM_MICROSERVICE_HOST,
    ordersItemMicroservicePort: envVars.ORDER_ITEM_MICROSERVICE_PORT,
}







