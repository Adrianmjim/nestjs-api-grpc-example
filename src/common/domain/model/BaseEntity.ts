export interface BaseEntity {
  createdAt: Date;
  id: string;
  updatedAt: Date | undefined;
  version: number;
}
