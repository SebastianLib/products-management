import { Address } from "./Address";
import { USER_ROLE } from "./UserRole";

export interface User {
    id: number;
    email: string;
    fullName: string;
    mobile: string;
    role: USER_ROLE;
    addresses: Address[];
  }