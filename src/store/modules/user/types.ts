export type RoleType = '' | '*' | 'admin' | 'user';
export interface UserState {
  username?: string;
  nickname?: string;
  avatar?: string;
  job?: string;
  organization?: string;
  location?: string;
  email?: string;
  introduction?: string;
  personalWebsite?: string;
  jobName?: string;
  organizationName?: string;
  locationName?: string;
  phone?: string;
  registrationDate?: string;
  accountId?: string;
  certification?: number;
  role: RoleType;
  roles: RoleType[];
  createTime: string;
  updateTime: string;
}
