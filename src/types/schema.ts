export type BaseSchema = {
  id: string | number;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface IUser extends BaseSchema {
  active: boolean;
  email: string;
  userName: string;
  fullName: string;
  phone?: string;
  avatar?: string;
  role?: string;
}



