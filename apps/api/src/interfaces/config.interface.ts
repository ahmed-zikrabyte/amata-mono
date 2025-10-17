export interface IConfig {
  _id?: string;
  globalDiscount: number;
  gst: {
    igst: number;
    cgst: number;
    sgst: number;
  };
  contactInfo: {
    phoneNumber: string;
    email: string;
    address: string;
    googleMapLink: string;
  };
}