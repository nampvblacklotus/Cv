import { Model, HasId } from '../models/Model';

export abstract class View<T extends Model<K>, K extends HasId> {
  regions: { [key: string]: Element } = {};

  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }
  abstract template(): string;
  regionsMap(): { [key: string]: string } {
    return {};
  }

  eventsMap(): { [key: string]: () => void } {
    return {};
  }

  bindModel(): void {
    this.model.on('change', () => {
      this.render();
    });
  }

  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();

    for (let eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(':');

      fragment.querySelectorAll(selector).forEach((element) => {
        element.addEventListener(eventName, eventsMap[eventKey]);
      });
    }
  }

  mapRegions(fragment: DocumentFragment): void {
    const regionsMap = this.regionsMap();

    for (let key in regionsMap) {
      const selector = regionsMap[key];
      const element = fragment.querySelector(selector);

      if (element) {
        this.regions[key] = element;
      }
    }
  }

  onRender(): void {}

  render(): void {
    this.parent.innerHTML = '';

    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();
    this.bindEvents(templateElement.content);
    this.mapRegions(templateElement.content);

    this.onRender();

    this.parent.append(templateElement.content);
  }
}
/**
 Cú pháp #document.fragment không phải là một phần của HTML thông thường. 
 Nó chỉ ra rằng nội dung trong <template> sẽ được coi là một DocumentFragment. 
 DocumentFragment là một loại đối tượng trong DOM cho phép chứa các nút (nodes) của DOM 
 như một nhóm nhưng không thể xuất hiện trong DOM tree. 
 Nó hữu ích khi muốn thêm nhiều phần tử vào DOM cùng một lúc mà không gây ra nhiều lần tác động vào cấu trúc DOM, 
 giúp tối ưu hiệu suất của ứng dụng.

 Các chức năng quan trọng trong lớp View:
 regions: Đây là một đối tượng (object) chứa các cặp key-value, trong đó key là một chuỗi đại diện cho tên (region) trong giao diện, và value là một đối tượng DOM Element đại diện cho vùng (region) cụ thể trên trang web. Vùng (region) là nơi mà các phần tử giao diện sẽ được chèn vào sau khi render.
 constructor: Constructor của lớp View, chấp nhận hai đối số:

parent: Đối tượng DOM Element, là nơi mà giao diện sẽ được chèn vào.
model: Một đối tượng mô hình (Model) được cung cấp để hiển thị dữ liệu từ mô hình này.
template: Phương thức trừu tượng (abstract method) không có thân, nhằm định nghĩa mẫu (template) HTML cho giao diện cụ thể. Các lớp con cần triển khai phương thức này để cung cấp template HTML của chính họ.

regionsMap: Phương thức trừu tượng (abstract method) trả về một đối tượng chứa các cặp key-value, trong đó key là tên vùng (region) cần ánh xạ và value là một chuỗi đại diện cho selector CSS của vùng này trong template HTML. Lớp con cần triển khai phương thức này để cung cấp ánh xạ vùng (region) của chính họ.

eventsMap: Phương thức trả về một đối tượng chứa các cặp key-value, trong đó key là một chuỗi đại diện cho sự kiện DOM và selector CSS của phần tử sẽ gắn sự kiện này. Value là một hàm xử lý sự kiện (event handler) sẽ được gọi khi sự kiện xảy ra. Lớp con có thể triển khai phương thức này để cung cấp ánh xạ các sự kiện của chính nó.

bindModel: Phương thức này được gọi trong constructor để liên kết mô hình (model) với view. Khi mô hình thay đổi, view sẽ tự động render lại.

bindEvents: Phương thức này nhận vào một đối tượng DocumentFragment (đại diện cho một phần của template HTML), và gắn các sự kiện (event) vào các phần tử được chỉ định trong eventsMap. Điều này giúp xử lý các sự kiện trên giao diện.

mapRegions: Phương thức này nhận vào một đối tượng DocumentFragment, và ánh xạ các vùng trong regionsMap với các phần tử trong template HTML. Sau đó, các vùng này sẽ được lưu vào thuộc tính regions của view, để có thể thao tác với chúng sau này.

onRender: Phương thức trống (empty method) mà lớp con có thể triển khai nếu cần thực hiện các hành động sau khi giao diện được render.

render: Phương thức này dùng để render giao diện. Quá trình render bao gồm:
      Xóa nội dung hiện tại của phần tử parent.
      Tạo một templateElement mới, và cung cấp template HTML từ phương thức template() để chèn vào.
      Gắn các sự kiện (events) vào các phần tử trong template.
      Ánh xạ và lưu các vùng (regions) vào thuộc tính regions.
      Gọi phương thức onRender().
      Chèn nội dung của templateElement vào phần tử parent.

Lưu ý rằng lớp View là một lớp trừu tượng, không thể khởi tạo trực tiếp, mà cần được kế thừa và triển khai các phương thức trừu tượng template, regionsMap và eventsMap trong lớp con để sử dụng.
 */