type Callback = () => void;

export class Eventing {
  events: { [key: string]: Callback[] } = {};

  on = (eventName: string, callback: Callback): void => {
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  };

  trigger = (eventName: string): void => {
    const handlers = this.events[eventName];

    if (!handlers || handlers.length === 0) {
      return;
    }

    handlers.forEach(callback => {
      callback();
    });
  };
}
/** 
 
 type Callback = () => void;: Đây là khai báo kiểu cho một hàm gọi lại (callback). 
 Hàm callback này không nhận tham số và không có giá trị trả về (void).

events: { [key: string]: Callback[] } = {};: Đây là một thuộc tính đối tượng dùng để lưu trữ các sự kiện (events) 
và danh sách các hàm callback liên quan tới từng sự kiện. 
Là một đối tượng với các key là tên sự kiện (kiểu chuỗi - string) và giá trị là một mảng chứa các hàm callback (kiểu Callback[]).

on = (eventName: string, callback: Callback): void => {...};: Phương thức on được sử dụng để đăng ký một hàm callback cho một sự kiện cụ thể. 
Khi gọi phương thức này với tên sự kiện (eventName) và hàm callback (callback), thêm hàm callback vào danh sách các hàm callback liên quan tới sự kiện đó trong thuộc tính events.

trigger = (eventName: string): void => {...};: Phương thức trigger được sử dụng để kích hoạt các hàm callback đã đăng ký cho một sự kiện cụ thể. 
Khi gọi phương thức này với tên sự kiện (eventName), nó sẽ lấy danh sách các hàm callback tương ứng từ thuộc tính events và gọi lần lượt các hàm callback đó.

Class Eventing giúp quản lý các sự kiện và hàm callback liên quan trong ứng dụng. 
Khi một sự kiện được kích hoạt, các hàm callback đã đăng ký cho sự kiện đó sẽ được thực thi theo thứ tự. 
Điều này cho phép ứng dụng xử lý các hành động hoặc cập nhật trạng thái phù hợp khi có các sự kiện xảy ra.
 
 
 */