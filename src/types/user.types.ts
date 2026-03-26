export interface UserAttributes {
  id: string;
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  role: "user" | "admin" | "superAdmin";
}

export interface UserCreationAttributes {
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  role: "user" | "admin" | "superAdmin";
}
