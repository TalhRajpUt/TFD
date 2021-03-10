import { Storage } from '@ionic/storage';
import { ServiceService } from './../../service/service.service';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.page.html',
  styleUrls: ['./forget.page.scss'],
})
export class ForgetPage implements OnInit {

  segment = 'forget';
  spinner = false;
  verifying = false;
  email = '';
  title = 'Forget Password';
  subTitle = 'Please verify your Account';
  oldPassword = '';
  newPassword = '';
  apiCode = '';
  userCode = '';
  codematched = false;
  newCode = false;
  color = 'primary';
  color2 = 'primary';
  verify = false;
  apiToken = '';
  constructor(private navCtrl: NavController, private http: HttpClient,
              private service: ServiceService, private storage: Storage) {}

  ngOnInit() {
  }

  goBack(){
    this.navCtrl.back();
  }
  validateEmail(){
    if (this.email === ''){
      this.service.presentToast('Email is required', 'bottom', 2500, 'warning');
      return;
    }
    this.verifying = true;
    let code: any = [];
    const data = new FormData();
    data.append('email', this.email);
    this.http.post(this.service.baseUrl + 'forget', data).subscribe((response) => {
      code = response;
      if (code.error === true){
        this.service.presentToast(code.error_data, 'bottom', 2000, 'danger');
      }else{
        this.service.presentToast('Verification Code is send at ' + this.email, 'bottom', 2500, 'success');
        this.apiCode = code.code;
        this.apiToken = code.api_token;
        this.color2 = 'success';
      }
      this.verifying = false;
    }, (error) => {
      this.verifying = false;
      this.service.presentToast('Something went wrong', 'bottom', 2000, 'danger');
    });
  }

  validateCode(){
    if (this.userCode !== ''){
      if (this.userCode === this.apiCode){
        this.codematched = true;
        this.color = 'success';
      }else{
        this.service.presentToast('Incorrect Code', 'bottom', 2000, 'danger');
      }
    }
  }

  validateLogIn(){
    let user: any = [];
    if (this.oldPassword !== ''){
      if (this.oldPassword.length < 6){
        this.service.presentToast('Password must be 6 Digits', 'botttom', 1000, 'warning');
      }else{
        this.verifying = true;
        const data = new FormData();
        data.append('email', this.email);
        data.append('password', this.oldPassword);
        this.http.post(this.service.baseUrl + 'login', data).subscribe((response) => {
          user = response;
          if (user.error === true){
            this.service.presentToast('Incorrect Password', 'bottom', 2000, 'danger');
          }else{
            console.log(user);
            this.color = 'success';
            this.apiToken = user.user.api_token;
            this.verify = true;
          }
          this.verifying = false;
        }, (error) => {
          this.service.presentToast('Something went wrong', 'bottom', 2000, 'danger');
          this.verifying = false;
        });
      }
    }
  }

  updatePassword(){
    let user: any = [];
    if (this.newPassword !== ''){
      if (this.newPassword.length < 6){
        this.service.presentToast('Password must be 6 Digits', 'botttom', 1000, 'warning');
      }else{
        this.spinner = true;
        const data = new FormData();
        console.log(this.apiToken);
        data.append('api_token', this.apiToken);
        data.append('password', this.newPassword);
        this.http.post(this.service.baseUrl + 'update', data).subscribe((response) => {
          user = response;
          if (user.error === true){
            this.spinner = false;
            this.service.presentToast(user.error_data, 'bottom', 2000, 'danger');
          }else{
            this.service.presentToast('Password is Updated', 'bottom', 2000, 'danger');
            this.spinner = false;
            this.navCtrl.back();
          }
        }, (error) => {
          this.service.presentToast('Something went wrong', 'bottom', 2000, 'danger');
          this.spinner = false;
        });
      }
    }
  }

  async ionViewDidEnter(){
    await this.storage.get('user').then((response) => {
      console.log(response);
      if (response === null || response === ''){
      }else{
        this.email = response.email;
      }
    });
  }

}
