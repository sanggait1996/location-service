import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { LocationsService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { Location } from './schemas/location.schema';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post()
  async create(
    @Body() createLocationDto: CreateLocationDto,
  ): Promise<Location> {
    return this.locationsService.create(createLocationDto);
  }

  @Get()
  async findAll(): Promise<Location[]> {
    return this.locationsService.findAll();
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any> {
    return this.locationsService.delete(id);
  }
}
