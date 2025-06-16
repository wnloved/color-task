import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColorsModule } from './colors/colors.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { env } from 'process';
import { config } from 'dotenv';
config();
@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: env.USER, 
    password: env.PASSWORD, 
    database: env.DATABASE, 
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }),
  GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      sortSchema: true,
      introspection: true,
      playground: true,
    }), ColorsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
