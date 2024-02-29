import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MaterialsService } from './materials.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';

@Controller()
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @MessagePattern('createMaterial')
  create(@Payload() createMaterialDto: CreateMaterialDto) {
    return this.materialsService.create(createMaterialDto);
  }

  @MessagePattern('findAllMaterials')
  findAll(@Payload() options: any) {
    return this.materialsService.findAll(options);
  }

  @MessagePattern('findOneMaterial')
  findOne(@Payload() id: string) {
    return this.materialsService.findOne(id);
  }

  @MessagePattern('updateMaterial')
  update(@Payload() updateMaterialDto: UpdateMaterialDto) {
    return this.materialsService.update(
      updateMaterialDto.id,
      updateMaterialDto,
    );
  }

  @MessagePattern('removeMaterial')
  remove(@Payload() id: string) {
    return this.materialsService.remove(id);
  }
}
