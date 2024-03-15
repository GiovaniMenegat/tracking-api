export interface findAllPackagesByUserResponse {
  username: string;
  email: string;
  packages: Package[];
}

export interface Package {
  trackingNumber: string;
}
