import { ConflictException, Injectable } from '@nestjs/common';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { PrismaService } from 'nestjs-prisma';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class PartsService {
  constructor(private prismaService: PrismaService) {}

  async create(createPartDto: CreatePartDto) {
    try {
      const part = await this.prismaService.part.create({
        data: {
          partProject: createPartDto.part_project,
          partNumber: createPartDto.part_no,
          partName: createPartDto.part_name,
          supplier: createPartDto.supplier,
        },
      });
      const bom = createPartDto.materials.map((material) => {
        return this.prismaService.bOM.create({
          data: {
            partId: part.id,
            materialId: material.material_id,
            quantity: material.quantity,
            unitOfMeasure: material.unit,
          },
        });
      });
      return Promise.all(bom);
    } catch (e) {
      throw e ?? new RpcException(new ConflictException('There was problem'));
    }
  }

  async findAll({ pageNumber, pageSize }: any) {
    try {
      const datas = await this.prismaService.part.findMany({
        include: {
          BOM: {
            include: {
              material: true,
            },
          },
        },
        skip: (pageNumber - 1) * parseInt(pageSize), // Menghitung berapa data yang harus dilewati (skip)
        take: parseInt(pageSize), // Mengambil jumlah data sebanyak yang diinginkan (limit)
      });
      const formattedDatas = datas.map((data) => ({
        ...data,
      }));
      const count = await this.prismaService.part.count();
      return {
        data: formattedDatas,
        totalData: count,
        limit: pageSize,
        currentPage: pageNumber,
      };
    } catch (e) {
      throw new RpcException(new ConflictException('There was problem'));
    }
  }

  async findOne(id: string) {
    try {
      return await this.prismaService.part.findFirst({
        where: {
          partNumber: id,
        },
        include: {
          BOM: true,
        },
      });
    } catch (e) {
      throw new RpcException(new ConflictException('There was problem'));
    }
  }

  update(id: string, updatePartDto: UpdatePartDto) {
    try {
      return this.prismaService.part.update({
        where: {
          id: id,
        },
        data: {
          partProject: updatePartDto.part_project,
          partNumber: updatePartDto.part_no,
          partName: updatePartDto.part_name,
          supplier: updatePartDto.supplier,
        },
      });
    } catch (e) {
      throw new RpcException(new ConflictException('There was problem'));
    }
  }

  remove(id: string) {
    try {
      return this.prismaService.part.delete({
        where: {
          id: id,
        },
      });
    } catch (e) {
      throw new RpcException(new ConflictException('There was problem'));
    }
  }
}
