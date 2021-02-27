import { ServiceService } from './../../service/service.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  email = '';
  name = '';
  password = '';
  type = 'password';
  confirmPassword = '';
  spin = false;
  iconName = 'eye-off';
  userData: any = [];
  constructor(private http: HttpClient, private service: ServiceService, private navCtrl: NavController) { }

  ngOnInit() {
  }

  register(){
    if (this.email === '' || this.name === '' || this.password === '' || this.confirmPassword === ''){
      this.service.presentToast('Something is missing', 'bottom', 2000, 'danger');
      return;
    }
    if (this.password.localeCompare(this.confirmPassword) !== 0){
      this.service.presentToast('Password not matched', 'bottom', 2000, 'danger');
      return;
    }
    this.spin = true;
    const data = new FormData();
    data.append('email', this.email);
    data.append('name', this.name);
    data.append('password', this.password);
    this.http.post(this.service.baseUrl + 'register', data).subscribe((response) => {
      this.userData = response;
      console.log(response);
      if (this.userData.error === false){
        this.userData = this.userData.user;
        this.spin = false;
        this.email = '';
        this.name = '';
        this.password = '';
        this.confirmPassword = '';
        this.service.presentToastWithOptions('Account is Created', 'Activition Email is send to your Email Adderss.',
        'end', 'light', 'Proceed', '/login');
      }else{
        this.spin = false;
        this.service.presentToast(this.userData.error_data, 'bottom', 3000, 'warning');
      }
    }, (error) => {
      console.log(error);
      this.spin = false;
      this.service.presentToast(error.messsage, 'bottom', 3000, 'danger');
    });
  }

  showPassword(){
    if (this.iconName === 'eye-off'){
      this.iconName = 'eye';
      this.type = 'text';
    }else{
      this.iconName = 'eye-off';
      this.type = 'password';
    }
  }

}
