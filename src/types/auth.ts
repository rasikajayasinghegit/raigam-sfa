export interface UserPayload {
  token: string;
  userId: number;
  userName: string;
  personalName: string;
  roleId: number;
  role: string;
  subRoleId: number;
  subRole: string;
  userTypeId: number;
  userType: string;
  rangeId: number;
  range: string;
  areaIds: number[];
  territoryId: number;
  territoryName: string;
  distributorId: number;
  distributorName: string;
  userAgencyId: number;
  agencyName: string;
  gpsStatus: boolean;
  serverTime: string;
}
