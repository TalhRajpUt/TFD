import { Storage } from '@ionic/storage';
import { ServiceService } from './../../service/service.service';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.page.html',
  styleUrls: ['./forget.page.scss'],
})
export class ForgetPage implements OnInit {

  segment = 'update';
  spinner = false;
  verifying = false;
  email = '';
  title = 'Update Password';
  subTitle = 'Please verify your Account';
  oldPassword = '';
  newPassword = '';
  newCode = false;
  color = 'primary';
  verify = false;
  apiToken = '';
  constructor(private navCtrl: NavController, private http: HttpClient,
              private service: ServiceService, private storage: Storage) {}

  ngOnInit() {
  }

  goBack(){
    this.navCtrl.back();
  }

  forgetPass(){
    this.spinner = true;
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
      if (response !== null || response !== ''){
        this.email = response.email;
      }
    });
  }

}
