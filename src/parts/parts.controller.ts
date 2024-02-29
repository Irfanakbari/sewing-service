import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PartsService } from './parts.service';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';

@Controller()
export class PartsController {
  constructor(private readonly partsService: PartsService) {}

  @MessagePattern('createPart')
  create(@Payload() createPartDto: CreatePartDto) {
    return this.partsService.create(createPartDto);
  }

  @MessagePattern('findAllParts')
  findAll(@Payload() options: any) {
    return this.partsService.findAll(options);
  }

  @MessagePattern('findOnePart')
  findOne(@Payload() id: string) {
    return this.partsService.findOne(id);
  }

  @MessagePattern('updatePart')
  update(@Payload() updatePartDto: UpdatePartDto) {
    return this.partsService.update(updatePartDto.id, updatePartDto);
  }

  @MessagePattern('removePart')
  remove(@Payload() id: string) {
    return this.partsService.remove(id);
  }
}
