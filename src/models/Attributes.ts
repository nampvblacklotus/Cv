export class Attributes<T extends object> {
  constructor(private data: T) {}

  get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key];
  };

  set(update: T): void {
    Object.assign(this.data, update);
  }

  getAll(): T {
    return this.data;
  }
}

// Lớp Attributes có khả năng làm việc với một loạt các đối tượng có kiểu T khác nhau, 
// do đó nó rất linh hoạt và có thể tái sử dụng trong nhiều tình huống khác nhau.
// Điều này giúp tiết kiệm thời gian và giảm sự trùng lặp trong việc viết mã.
/*

get: Đây là một hàm generic (hàm có khai báo kiểu generic) dùng để lấy giá trị của một thuộc tính (property) từ đối tượng data. 
Hàm này nhận một tham số key kiểu K, với K là kiểu của các thuộc tính trong đối tượng T. 
Hàm trả về giá trị tương ứng của thuộc tính key.

set: Đây là hàm dùng để cập nhật dữ liệu trong đối tượng data. 
Hàm nhận một đối tượng update có kiểu T và sử dụng Object.assign để sao chép các thuộc tính từ update vào đối tượng data, 
làm thay đổi dữ liệu trong đối tượng.

getAll: Đây là hàm trả về toàn bộ đối tượng data, giúp lấy tất cả các thuộc tính và giá trị của chúng.
*/