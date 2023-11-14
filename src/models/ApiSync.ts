import axios, { AxiosPromise } from 'axios';

interface HasId {
  id?: number;
}

export class ApiSync<T extends HasId> {
  constructor(public rootUrl: string) {}

  fetch(id: number): AxiosPromise {
    return axios.get(`${this.rootUrl}/${id}`);
  }

  save(data: T): AxiosPromise {
    const { id } = data;

    if (id) {
      return axios.put(`${this.rootUrl}/${id}`, data);
    } else {
      return axios.post(this.rootUrl, data);
    }
  }
}
/*
- Lơp ApiSync đồng bộ hóa dữ liệu giữa đối tượng T và server thông qua các yêu cầu HTTP sử dụng thư viện axios.
- interface HasId: Đây là một (interface) định nghĩa một thuộc tính id có kiểu số (number). 
được sử dụng để kiểm tra các đối tượng có thuộc tính id kiểu số, từ đó đảm bảo rằng các phương thức của lớp ApiSync chỉ áp dụng cho các đối tượng có thuộc tính id.

- class ApiSync<T extends HasId>: Lớp này có kiểu generic T với ràng buộc là phải là một đối tượng có thuộc tính id kiểu số (đáp ứng HasId). 
Lớp này nhận vào một tham số rootUrl kiểu chuỗi (string), đại diện cho URL gốc của API mà lớp này sẽ tương tác.

- fetch(id: number): AxiosPromise: Phương thức fetch dùng để thực hiện yêu cầu HTTP GET tới server để lấy dữ liệu của đối tượng có id tương ứng. 
Nó trả về một AxiosPromise, đại diện cho một promise của thư viện axios để xử lý kết quả từ yêu cầu.

- save(data: T): AxiosPromise: Phương thức save dùng để thực hiện yêu cầu HTTP POST hoặc PUT tùy thuộc vào việc đối tượng có id hay không. 
Nếu đối tượng có id, nó sẽ thực hiện yêu cầu HTTP PUT để cập nhật dữ liệu đối tượng lên server. 
Ngược lại, nếu đối tượng không có id, nó sẽ thực hiện yêu cầu HTTP POST để tạo đối tượng mới trên server.
 Phương thức này cũng trả về một AxiosPromise để xử lý kết quả từ yêu cầu.

Tóm lại, lớp ApiSync này giúp thực hiện các yêu cầu HTTP đến server để đồng bộ hóa dữ liệu giữa đối tượng T và server, đồng thời kiểm tra và đảm bảo rằng các đối tượng có thuộc tính id kiểu số để áp dụng các phương thức của lớp.
*/
