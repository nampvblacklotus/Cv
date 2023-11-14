import { Model } from './Model';
import { Attributes } from './Attributes';
import { ApiSync } from './ApiSync';
import { Eventing } from './Eventing';
import { Collection } from './Collection';

export interface UserProps {
  id?: number;
  name?: string;
  age?: number|string;
  phone?: string;
  email?: string;
  avt?: string;
}

const rootUrl = 'http://localhost:3000/users';

export class User extends Model<UserProps> {
  static buildUser(attrs: UserProps): User {
    return new User(
      new Attributes<UserProps>(attrs),
      new Eventing(),
      new ApiSync<UserProps>(rootUrl)
    );
  }

  static buildUserCollection(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(rootUrl, (json: UserProps) =>
      User.buildUser(json)
    );
  }
  setAge(): void { 
    const age= this.setAge;
  
    console.log(age);
  }
  // setRandomAge(): void {
  //   const age = Math.round(Math.random() * 100);
  //   this.set({ age });
  // }
}
/*
export class User extends Model<UserProps> { ... }: Lớp User là một lớp con (sub class) của lớp Model<UserProps>. 
Lớp này kế thừa và sử dụng các tính năng đã được định nghĩa trong lớp Model, 
cho phép quản lý dữ liệu và đồng bộ hóa dữ liệu giữa client và server dành cho đối tượng người dùng.

static buildUser(attrs: UserProps): User { ... }: Phương thức tĩnh buildUser dùng để xây dựng một đối tượng User từ các thuộc tính được cung cấp trong đối số attrs. 
Phương thức này tạo một đối tượng User mới với các thành phần cần thiết như Attributes, Eventing, và ApiSync để quản lý và đồng bộ hóa dữ liệu của người dùng.

static buildUserCollection(): Collection<User, UserProps> { ... }: Phương thức tĩnh buildUserCollection dùng để xây dựng một đối tượng Collection<User, UserProps>,
 chứa danh sách các đối tượng người dùng. Nó sử dụng phương thức buildUser để tạo từng đối tượng người dùng và thêm vào trong Collection.
this.set({ age });: Đây là câu lệnh gọi phương thức set() của lớp User. Phương thức set() được sử dụng để cập nhật giá trị của đối tượng User

*/