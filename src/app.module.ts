import { Module } from '@nestjs/common';
import { LocationsModule } from './modules/locations/location.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://location-service-mongodb:27017/location-service',
    ),
    LocationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
