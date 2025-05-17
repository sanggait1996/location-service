import { Module } from '@nestjs/common';
import { LocationsModule } from './modules/locations/location.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI), LocationsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
