import { Packages } from '@prisma/client';

export class PackageEntity implements Packages {
  id: number;
  trackingNumber: string;
  userId: number;
}
