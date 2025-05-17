import { Module } from '@nestjs/common';
import { LocationsModule } from './modules/locations/location.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI!),
    LocationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
