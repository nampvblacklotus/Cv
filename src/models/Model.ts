import { AxiosPromise, AxiosResponse } from 'axios';

interface ModelAttributes<T> {
  set(value: T): void;
  getAll(): T;
  get<K extends keyof T>(key: K): T[K];
}

interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

interface Events {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}

export interface HasId {
  id?: number;
}

export class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {}

  on = this.events.on;
  trigger = this.events.trigger;
  get = this.attributes.get;

  set(update: T): void {
    this.attributes.set(update);
    this.events.trigger('change');
  }

  fetch(): void {
    const id = this.get('id');

    if (typeof id !== 'number') {
      throw new Error('Cannot fetch without an id');
    }

    this.sync.fetch(id).then((response: AxiosResponse): void => {
      this.set(response.data);
    });
  }

  save(): void {
    this.sync
      .save(this.attributes.getAll())
      .then((response: AxiosResponse): void => {
        this.trigger('save');
        alert("Save thành công");
      })
      .catch(() => {
        this.trigger('error');
      });
  }
}
/*
Class Model được sử dụng để quản lý một đối tượng dữ liệu (T) có thuộc tính id từ server thông qua các yêu cầu HTTP sử dụng thư viện axios.
interface ModelAttributes<T>: Giao diện này định nghĩa một số phương thức để quản lý thuộc tính của đối tượng (T). 
Cụ thể là phương thức set để cập nhật giá trị thuộc tính, getAll để lấy tất cả thuộc tính 
và phương thức get<K extends keyof T>(key: K) để lấy giá trị của một thuộc tính cụ thể (key) từ đối tượng.

interface Sync<T>: định nghĩa các phương thức để thực hiện đồng bộ dữ liệu với server. Cụ thể là fetch(id: number) lấy dữ liệu từ server dựa trên id,
 và save(data: T) để lưu trữ dữ liệu (data) lên server.

interface Events: định nghĩa các phương thức để quản lý các sự kiện (events). 
Cụ thể là on(eventName: string, callback: () => void) để đăng ký một hàm callback cho một sự kiện cụ thể, 
và trigger(eventName: string) để kích hoạt các hàm callback đã đăng ký cho sự kiện đó.

export interface HasId: interface định nghĩa một thuộc tính id có kiểu số (number).
được sử dụng để kiểm tra các đối tượng có thuộc tính id kiểu số, 
từ đó đảm bảo rằng các phương thức của lớp Model chỉ áp dụng cho các đối tượng có thuộc tính id.

export class Model<T extends HasId>: Lớp Model này có kiểu generic T với ràng buộc là phải là một đối tượng có thuộc tính id kiểu số (đáp ứng giao diện HasId). Lớp này nhận vào ba tham số: attributes (kiểu ModelAttributes<T>), events (kiểu Events) và sync (kiểu Sync<T>). Những tham số này đại diện cho các thành phần chung cần thiết để quản lý đối tượng T.

Trong constructor của lớp, các thuộc tính on, trigger và get được gán bằng các phương thức tương ứng của events và attributes.

Phương thức set(update: T): void: Dùng để cập nhật giá trị của đối tượng T thông qua phương thức set của attributes. Sau khi cập nhật xong, nó kích hoạt sự kiện 'change' thông qua phương thức trigger của events.

Phương thức fetch(): void: Dùng để lấy dữ liệu từ server dựa trên id của đối tượng. Nó sử dụng phương thức get của attributes để lấy id, sau đó thực hiện yêu cầu HTTP GET thông qua sync.fetch(id), và sau khi nhận được phản hồi từ server, nó sử dụng phương thức set để cập nhật dữ liệu.

Phương thức save(): void: Dùng để lưu trữ dữ liệu của đối tượng lên server. Nó sử dụng phương thức getAll của attributes để lấy tất cả dữ liệu, sau đó thực hiện yêu cầu HTTP POST hoặc PUT thông qua sync.save(data). Nếu lưu trữ thành công, nó kích hoạt sự kiện 'save', nếu có lỗi thì kích hoạt sự kiện 'error'.

class Model này giúp quản lý và đồng bộ hóa một đối tượng dữ liệu (T) có thuộc tính id từ server thông qua các yêu cầu HTTP, đồng thời hỗ trợ quản lý các sự kiện liên quan tới đối tượng này.








*/