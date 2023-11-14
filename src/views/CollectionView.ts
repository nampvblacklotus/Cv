import { Collection } from '../models/Collection';

export abstract class CollectionView<T, K> {
  constructor(public parent: Element, public collection: Collection<T, K>) {}

  abstract renderItem(model: T, itemParent: Element): void;

  render(): void {
    this.parent.innerHTML = '';
    const templateElement = document.createElement('template');
    for (let model of this.collection.models) {
      const itemParent = document.createElement('div');
      this.renderItem(model, itemParent);
      templateElement.content.append(itemParent);
    }

    this.parent.append(templateElement.content);
  }
}
/*
render(): void { ... }: Phương thức render dùng để hiển thị các mục của Collection trong phần tử giao diện parent. 
Trước tiên, nó xóa hết nội dung của parent bằng cách gán giá trị rỗng cho thuộc tính innerHTML. 
Sau đó, nó tạo một phần tử templateElement dùng để tạo một vùng chứa các mục Collection.
 phương thức renderItem() được gọi cho từng đối tượng model trong Collection. 
 Nó tạo một phần tử itemParent là một phần tử con trong templateElement để chứa mục của đối tượng model. 
 Sau đó, nội dung của itemParent được cập nhật bằng cách gọi phương thức renderItem(model, itemParent).
Khi một lớp được khai báo là trừu tượng, bạn không thể tạo một đối tượng trực tiếp từ lớp đó. 
Thay vào đó, bạn phải tạo một lớp con kế thừa từ lớp trừu tượng và triển khai các phương thức trừu tượng bị thiếu trong lớp con.
lớp trừu tượng giúp tạo ra các mô hình chung và contact giữa các lớp con và lớp cha, 
đồng thời tăng tính trừu tượng và sự linh hoạt trong lập trình. 
Nó là một công cụ hữu ích để tạo các kiểu dữ liệu chung và đảm bảo tính nhất quán trong kiến trúc ứng dụng.
*/ 