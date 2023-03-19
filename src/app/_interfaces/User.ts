import { MyPhotos } from './my-photos';
import { Role } from './Role';

export interface User {
  id: number;
  name: string;
  surname: string;
  username: string;
  email: string;
  password: string;
  roles: Role[];
  follows?: String[];
  followers?: String[];
}
