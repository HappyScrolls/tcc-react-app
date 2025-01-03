export interface IMemberInfo {
  no: number;
  accountId: string | null;
  name: string | null;
  email: string | null;
  profilePhoto: string | null;
  birthDate: string | null;
  mobileNo: string | null;
}

export interface IAdditionalMembberInfo {
  name: string | null;
  mobileNo: string;
  birthDate: string;
  profilePhoto?: string;
}
