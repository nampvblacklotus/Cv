import { View } from './View';
import { User, UserProps } from '../models/User';

export class UserShow extends View<User, UserProps> {
  template(): string {
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
</head>
<body>
<ul id="users-list">
    <!-- Phần tử ul dùng để hiển thị danh sách người dùng -->
  </ul>

    <div class="container mt-5">
        
        <div class="row">
          <div class="col col-lg-3">
            <div class="card" style="width: 18rem;">
                <img src="https://scontent.fsgn13-2.fna.fbcdn.net/v/t39.30808-6/331223869_1177521516231543_4120169294300123492_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeF_xbQasgI5IKRwSmLsQSmLXEdWWx4aY6ZcR1ZbHhpjpl9Y8z1qfKWUaXwtP4s6tnQP5WHpVulysgptMu0y9wxT&_nc_ohc=t-ujU6fIBfsAX8TNgOs&_nc_ht=scontent.fsgn13-2.fna&oh=00_AfAJZghbV9iFAc3jLqkJgt_uUcQ5CCFROnB1pGNW9JW3RQ&oe=6558663D" class="img-thumbnail" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${this.model.get('name')}</h5>
                  <h5 class="card-title">${this.model.get('age')} tuổi</h5>
                  <p class="card-text">Kĩ sư lập trình Website</p>
                  
                </div>
              </div>
              
              <div class="card mt-3" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">Học vấn </h5>
                  <p >Cao đẳng FPT Polytechnic<br><strong>Ngành lập trình Website</strong></p>
                  
                </div>
              </div>
              <div class="card mt-3" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">Các kỹ năng </h5>
                  <p ><span><strong>Ngôn ngữ lập trình</strong><br> ( HTML, JavaScript, PHP, ReactJS, Angular)
                  </span><br><span><strong>Công cụ văn phòng</strong><br>(Word, Excel, PowerPoint)</span></p>
                </div>
              </div>
              <div class="card mt-3" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">Contact </h5>
                  <p id="telephone">Phone<br><strong>${this.model.get('phone')}</strong></p>
                  <p >Email<br><strong>${this.model.get('email')}</strong></p>
                </div>
              </div>

          </div>
          <div class="col">
            
            <div class="card mb-3 " >
                <p class="m-3"><i class="fas fa-briefcase stroke-transparent"></i>&nbsp;&nbsp;&nbsp;<strong>Dự án cá nhân</strong></p>
                <ul>
                    <li>
                        <p class="tags">Tham gia cùng với nhóm xây dựng Website bán hàng online <br><span>Dự án mẫu, Dự
                                án 1 | <span>2023</span></span></p>
                        <p class="tags">GitHub: <span>https://github.com/nampvblacklotus/DuAn1</span></p> 
                    </li>
                    <li>
                        <p class="tags">Dự án Typecript <br><span> Tạo Cv bằng TypeScript | <span>2023</span></span></p>
                        <p class="tags">GitHub: <span>https://github.com/nampvblacklotus/Cv</span></p> 
                    </li>
                    
                </ul>
            </div>
            <div class="card">
                <p class="m-3"><i class="fas fa-graduation-cap stroke-transparent"></i>&nbsp;&nbsp;&nbsp;<strong>Kĩ năng cá nhân</strong></p>
                <ul>
                    <li>
                        <p class="tags">Xây Dựng Website<br><span>Xây dựng bằng HTML, CSS và JavaScript và có sẵn trong nhiều ngôn
                                ngữ lập
                                trình khác nhau có đầy đủ chức năng.</span></p>
                        
                    </li>
                    <li>
                        <p class="tags">Bootstrap<br><span>Framework CSS phổ biến được sử dụng để thiết kế các trang web
                                đáp ứng.
                                Nó cung cấp các thành phần UI và các lớp CSS.</span></p>
                        
                    </li>
                    <li>
                        <p class="tags">React<br><span>Thư viện JavaScript phổ biến được sử dụng để xây dựng các ứng
                                dụng web động.</span>
                        </p>
                        
                    </li>
                    <li>
                        <p class="tags">Các kiến thức cơ bản về MySQL và MongoDB<br><span>Nắm được cơ cấu để tạo bảng, các chi tiết của bảng và cách kết nối CSDL.</span>
                        </p>
                        
                    </li>
                    <li>
                        <p class="tags">PHP<br><span>Nắm được PHP cơ bản.</span>
                        </p>
                        
                    </li>
                </ul>
            </div>

            <div class="card mb-3">
                <p class="m-3"><i class="fa-solid fa-award"></i>&nbsp;&nbsp;&nbsp;<strong>Giải Thưởng</strong></p>
                <ul>
                    <li>
                        <p class="tags">Sinh Viên giỏi <br><span>Các kỳ 1, 2, 3 <span> năm 2022</span></span></p>
                        
                    </li>
                    
                    
                </ul>
            </div>
            <div class="card mb-3">
                <p class="m-3"><i class="fa-solid fa-gamepad"></i>&nbsp;&nbsp;&nbsp;<strong>Sở Thích</strong></p>
                <ul>
                    <li>
                        <p class="tags">Chơi game cùng bạn bè</p>
                        
                    </li>
                    
                    
                </ul>
            </div>
          </div>
          
        </div>
    </div>
    
      
</body>
</html>
    `;
  }
}
