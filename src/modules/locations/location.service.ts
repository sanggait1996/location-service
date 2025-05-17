import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLocationDto } from './dto/create-location.dto';
import { Location, LocationDocument } from './schemas/location.schema';

@Injectable()
export class LocationsService {
  constructor(
    @InjectModel(Location.name) private locationModel: Model<LocationDocument>,
  ) {}

  /**
   * Create a new location
   */
  async create(createLocationDto: CreateLocationDto): Promise<Location> {
    const createdLocation = new this.locationModel(createLocationDto);
    return createdLocation.save();
  }

  /**
   * Find all locations
   */
  async findAll(): Promise<Location[]> {
    return this.locationModel.find().exec();
  }

  /**
   * Delete a location by id
   */
  async delete(id: string): Promise<any> {
    return this.locationModel.findByIdAndDelete(id).exec();
  }
}
