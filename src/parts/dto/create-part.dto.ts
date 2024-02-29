export class CreatePartDto {
  part_project: string;
  part_no: string;
  part_name: string;
  supplier: string;
  materials: BOMDto[];
}

export class BOMDto {
  material_id: string;
  quantity: number;
  unit: string;
}
