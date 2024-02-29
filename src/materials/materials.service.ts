import { ConflictException, Injectable } from '@nestjs/common';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { PrismaService } from 'nestjs-prisma';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class MaterialsService {
  constructor(private prismaService: PrismaService) {}

  create(createMaterialDto: CreateMaterialDto) {
    try {
      return this.prismaService.material.create({
        data: {
          partType: createMaterialDto.part_type,
          partNumber: createMaterialDto.part_number,
          partName: createMaterialDto.part_name,
          supplier: createMaterialDto.supplier,
        },
      });
    } catch (e) {
      throw e ?? new RpcException(new ConflictException('There was problem'));
    }
  }

  async findAll({ pageNumber, pageSize }: any) {
    try {
      let datas = [];
      if (pageNumber && pageSize) {
        datas = await this.prismaService.material.findMany({
          skip: (pageNumber - 1) * parseInt(pageSize), // Menghitung berapa data yang harus dilewati (skip)
          take: parseInt(pageSize), // Mengambil jumlah data sebanyak yang diinginkan (limit)
        });
      } else {
        datas = await this.prismaService.material.findMany();
      }
      const formattedDatas = datas.map((data: any) => ({
        ...data,
      }));
      const count = await this.prismaService.material.count();
      return {
        data: formattedDatas,
        totalData: count,
        limit: pageSize ? pageSize : count,
        currentPage: pageNumber ? pageNumber : 1,
      };
    } catch (e) {
      throw new RpcException(new ConflictException('There was problem'));
    }
  }

  findOne(id: string) {
    try {
      return this.prismaService.material.findUnique({
        where: {
          id: id,
        },
      });
    } catch (e) {
      throw new RpcException(new ConflictException('There was problem'));
    }
  }

  update(id: string, updateMaterialDto: UpdateMaterialDto) {
    try {
      return this.prismaService.material.update({
        where: {
          id: id,
        },
        data: {
          partType: updateMaterialDto.part_type,
          partNumber: updateMaterialDto.part_number,
          partName: updateMaterialDto.part_name,
          supplier: updateMaterialDto.supplier,
        },
      });
    } catch (e) {
      throw new RpcException(new ConflictException('There was problem'));
    }
  }

  remove(id: string) {
    try {
      return this.prismaService.material.delete({
        where: {
          id: id,
        },
      });
    } catch (e) {
      throw new RpcException(new ConflictException('There was problem'));
    }
  }
}
