export interface PartnerDto {
  id: string;
  representativeName: string;
  businessNumber: string | null;
  companyName: string;
  businessType: string | null;
  businessCategory: string | null;
  postCode: string | null;
  addressName: string | null;
  addressDetail: string | null;
  email: string | null;
  phoneNumber: string | null;
  faxNumber: string | null;
  createdAt: Date;
  updatedAt: Date;
}
