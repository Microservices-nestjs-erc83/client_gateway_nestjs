<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Client Gateway.</p>
    <p align="center">


## Description

El gateway es el punto de comunicación entre nuestros clientes y nuestros servicios.
Es el encargado de recibir las peticiones, enviarlas a los servicios correspondientes y devolver la respuesta al cliente.

## 1. Clonar el repositorio



## 2. Instalar dependencias

```bash
$ yarn install
```

## 3. Crear un archivo `.env` basado en el `.env.template`

## 4. Tener levantados los microservicios que se van a consumir


## 5. Levantar proyecto con:

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev
```

## 6 Usar Nats como microservicio

```sh
docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats
```