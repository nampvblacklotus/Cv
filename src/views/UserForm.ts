import { User, UserProps } from '../models/User';
import { ApiSync } from '../models/ApiSync';
import { View } from './View';
import axios from 'axios';


export class UserForm extends View<User, UserProps> {
  eventsMap(): { [key: string]: () => void } {
    return {
      'click:.set-age': this.onSetAgeClick,
      'click:.set-name': this.onSetNameClick,
      'click:.set-email': this.onSetemailClick,
      'click:.set-phone': this.onSetphoneClick,
      'click:.save-model': this.onSaveClick,
      'click:.new-model': this.onAddClick,
      'click:.del-model': this.onDelClick
    };
  }
  onAddClick = (): void => {
    // this.model.setRandomAge();
    const inputName = document.getElementById("input") as HTMLInputElement;
    const inputAge = document.getElementById("input2") as HTMLInputElement;
    const inputEmail = document.getElementById("input3") as HTMLInputElement;
    const inputPhone = document.getElementById("input4") as HTMLInputElement;
    

    // Lấy giá trị của phần tử input
    const name = inputName.value;
    const age = inputAge.value;
    const email = inputEmail.value;
    const phone = inputPhone.value;

 
    
    
    
    
    
    const user = User.buildUser({ name, age, email, phone });
    user.save();
    window.location.reload();
  };
  onSaveClick = (): void => {
    this.model.save();
   
  };


  onDelClick = (): void => {
    const element = document.querySelector(".del-model");
    if (element) {
      const idString = element.getAttribute('data-id');
      if (idString) {
        const id = parseInt(idString);
        axios.delete(`http://localhost:3000/users/${id}`).then((res) => {
          console.log("Phần tử đã được xóa từ server");
          
          const user = res.data;
          console.log(res.data);
          window.location.reload();
          // Tiếp theo, bạn có thể thực hiện các hành động bổ sung sau khi xóa phần tử thành công từ server.
        }).catch((error) => {
          console.log("Lỗi xóa phần tử từ server:", error);
        });
      }
    }
  };

  onSetNameClick = (): void => {
    const input = document.getElementById("input") as HTMLInputElement;
    console.log(input);
    if (input) {
      const name = input.value;
      this.model.set({ name });
     
    }
  };
  onSetphoneClick = (): void => {
    const input4 = document.getElementById('input4') as HTMLInputElement;
    console.log(input4);
    if (input4) {
      const phone = input4.value;
      this.model.set({ phone });
     
    }
  };
  onSetemailClick = (): void => {
    const input3 = document.getElementById('input3') as HTMLInputElement;
    console.log(input3);
    if (input3) {
      const email = input3.value;
      this.model.set({ email });
     
    }
  };

  onSetAgeClick=():void =>{
    // this.model.setRandomAge();
    const inputElement = document.getElementById("input2") as HTMLInputElement;

  // Lấy giá trị của phần tử input
    const inputValue = inputElement.value;
    
    if (inputValue) {
      const age = Number.parseInt(inputValue);
      console.log(age);
      this.model.set({ age });
     
    }
  };

  template(): string {
    return `
    <div class="container mt-3">
    <div class="row">
        <form class="col">
            <div class=" mb-3">
              <label  class="form-label">Tên</label>
              <input id="input" value="${this.model.get('name')}" type="text" class="form-control" >
            </div>
    
            <button type="submit" class="set-name btn btn-primary">Sửa</button>
          </form>
          <form class="col">
            <div class=" mb-3">
              <label  class="form-label">Tuổi</label>
              <input id="input2" type="number" value="${this.model.get('age')}" class="form-control" >
            </div>
    
            <button class="set-age btn btn-primary">Sửa</button>
          </form>
    </div>
    <div class="row mb-3">
        <form class="col">
            <div class=" mb-3">
              <label  class="form-label">Email</label>
              <input id="input3" type="email" class="form-control" id="exampleInputEmail1" value="${this.model.get('email')}" aria-describedby="emailHelp">
            </div>
    
            <button class="set-email btn btn-primary">Sửa</button>
          </form>
    
         
          <form class="col" >
            <div class=" mb-3">
              <label  class="form-label">Số Điện Thoại</label>
              <input id="input4" value="${this.model.get('phone')}" type="text" class="form-control" >
            </div>
    
            <button  class="set-phone btn btn-primary">Sửa</button>
          </form>
    </div>
    <button class="save-model btn btn-primary">Save User</button>
    <button class="new-model btn btn-primary">Add User</button>
    <button data-id="${this.model.get('id')}" class="del-model btn btn-primary">Delete User</button>
</div>
    `;
  }
}
