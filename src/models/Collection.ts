import axios, { AxiosResponse } from 'axios';
import { Eventing } from './Eventing';

export class Collection<T, K> {
  models: T[] = [];
  events: Eventing = new Eventing();

  constructor(public rootUrl: string, public deserialize: (json: K) => T) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch(): void {
    axios.get(this.rootUrl).then((response: AxiosResponse) => {
      response.data.forEach((value: K) => {
        this.models.push(this.deserialize(value));
      });

      this.trigger('change');
    });
  }
}
/*
models: T[] = [];: Thuộc tính models là một mảng (array) chứa các đối tượng kiểu T.

events: Eventing = new Eventing();: Thuộc tính events là một đối tượng của lớp Eventing, được sử dụng để quản lý các sự kiện.

constructor(public rootUrl: string, public deserialize: (json: K) => T) {}: Hàm khởi tạo (constructor) của lớp Collection.
 Nhận vào hai tham số rootUrl kiểu chuỗi (string) và deserialize kiểu hàm. rootUrl là URL gốc của API từ server mà lớp này sẽ tương tác. 
 deserialize là một hàm dùng để chuyển đổi dữ liệu từ dạng K (được nhận từ server) sang dạng T (kiểu đối tượng mà lớp Collection quản lý).

get on(): Đây là một thuộc tính getter cho phép truy cập vào phương thức on của đối tượng events.

get trigger(): Đây là một thuộc tính getter cho phép truy cập vào phương thức trigger của đối tượng events.

fetch(): void: Phương thức fetch dùng để thực hiện yêu cầu HTTP GET tới server để lấy dữ liệu từ URL rootUrl. 
Sau khi nhận được phản hồi từ server, nó sử dụng deserialize để chuyển đổi dữ liệu và đưa vào mảng models. Sau khi hoàn tất việc chuyển đổi, phương thức gọi phương thức trigger('change') để thông báo rằng dữ liệu đã thay đổi.

Class Collection này giúp quản lý và đồng bộ hóa một tập hợp (collection) các đối tượng T từ server thông qua các yêu cầu HTTP,
 cũng như cung cấp các tính năng quản lý sự kiện thông qua đối tượng Eventing.








*/