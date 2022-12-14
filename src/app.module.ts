import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DevicesModule } from './app/devices/devices.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      `${process.env.DB_PREFIX}://${process.env.DB_USERNAME}:${
        process.env.DB_PASSWORD + '@' + process.env.DB_HOST + process.env.DB
      }`,
    ),
    DevicesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
