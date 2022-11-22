import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DevicesDto } from './dto/devices.dto';
import { PaginationDto } from './dto/pagination.dto';
import { Devices, DevicesDoc, DevicesModel } from './schema/device.schema';

@Injectable()
export class DevicesService {
  constructor(@InjectModel(Devices.name) private devicesModel: DevicesModel) {}

  async GetById(_id: number): Promise<object> {
    return await this.devicesModel.findOne({ _id });
  }

  async GetAll(paginationDto: PaginationDto): Promise<object> {
    const query = await this.devicesModel
      .find()
      .sort({ _id: 1 })
      .limit(paginationDto.limit)
      .skip(paginationDto.skip);

    return query;
  }

  async create(devicesDto: DevicesDto): Promise<object> {
    const deviceData = {
      ...devicesDto,
    };

    const device = this.devicesModel.build(deviceData, this.devicesModel);
    return await device.save();
  }

  async update(_id: number, devicesDto: DevicesDto): Promise<object> {
    const device: DevicesDoc = await this.devicesModel.findOne({ _id });

    if (device) {
      device.name = devicesDto.name;
      device.ip = devicesDto.ip;
      device.disk = devicesDto.disk;
      device.os = devicesDto.os;
      device.price = devicesDto.price;
      device.cpu = devicesDto.cpu;
      device.ram = devicesDto.ram;
      return await device.save();
    }
    return device;
  }

  async DeleteById(_id): Promise<object> {
    const device = await this.devicesModel.deleteOne({
      _id: _id,
    });
    return device;
  }
}