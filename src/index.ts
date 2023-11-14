import axios from 'axios';
import { UserList } from './views/UserList';
import { Collection } from './models/Collection';
import { UserProps, User } from './models/User';
import { UserForm } from './views/UserForm';
import { UserEdit } from './views/UserEdit';
import { UserShow } from './views/UserShow';

// Khai báo biến id để tham chiếu đến user cần lấy dữ liệu ban đầu
let id = 1;

// Khởi tạo collection users với URL endpoint và hàm chuyển đổi dữ liệu
const users = new Collection(
  `http://localhost:3000/users/${id}`,
  (json: UserProps) => {
    return User.buildUser(json);
  }
);

// Gọi hàm để render dữ liệu ban đầu với id = 1
renderInitialData();

// Gọi API để lấy danh sách users và tạo các option trong dropdown
axios.get('http://localhost:3000/users/').then((res) => {
  const usersData = res.data;
  usersData.forEach((user: any) => {
    const html = `
      <option value="${user.id}">${user.name}</option>
    `;
    document.querySelector('#user_id')!.innerHTML += html;
  });
});

// Lắng nghe sự kiện thay đổi của dropdown
var select = document.getElementById('user_id') as HTMLSelectElement;
if (select) {
  select.addEventListener('change', async function () {
    const id = parseInt(this.value);
    console.log(id);
    const user = User.buildUser({ id: id });
    await user.fetch();
    console.log(user.get('name'));

    const root = document.getElementById('root');

    if (root) {
      const userForm = new UserForm(root, user);
      const userEdit = new UserEdit(root, user);

      userForm.render();
      userEdit.render();
    } else {
      throw new Error('Root element not found');
    }

    users.on('change', () => {
      const root = document.getElementById('root');

      if (root) {
        new UserList(root, users).render();
        new UserShow(root, user).render();
      }
    });
  });
}

// Hàm để render dữ liệu ban đầu với id = 1
async function renderInitialData() {
  const user = User.buildUser({ id: id });
  await user.fetch();
  console.log(user.get('name'));

  const root = document.getElementById('root');

  if (root) {
    const userForm = new UserForm(root, user);
    const userEdit = new UserEdit(root, user);

    userForm.render();
    userEdit.render();
  } else {
    throw new Error('Root element not found');
  }

  users.on('change', () => {
    const root = document.getElementById('root');

    if (root) {
      new UserList(root, users).render();
      new UserShow(root, user).render();
    }
  });
}
