// import { TwitterConnect } from '@ionic-native/twitter-connect/ngx';
import { Router } from '@angular/router';
import { ServiceService } from './../../service/service.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email = '';
  password = '';
  type = 'password';
  spin = false;
  iconName = 'eye-off';
  userData: any = [];
  constructor(private http: HttpClient, private service: ServiceService, private router: Router,
              private storage: Storage) { }

  ngOnInit() {
  }

  login(){
    if (this.email === '' || this.password === ''){
      this.service.presentToast('Something is missing', 'bottom', 2000, 'danger');
      return;
    }
    this.spin = true;
    const data = new FormData();
    data.append('email', this.email);
    data.append('password', this.password);
    this.http.post(this.service.baseUrl + 'login', data).subscribe(async (response) => {
      this.userData = response;
      console.log(response);
      if (this.userData.error === false){
        this.userData = this.userData.user;
        if (this.userData.email_verified === 1){
          await this.updateFirebase(this.email);
          this.email = '';
          this.password = '';
          this.router.navigateByUrl('/tabs', {replaceUrl: true});
        }else{
          this.service.presentToast('Your Account is not Verified', 'bottom', 2000, 'warning');
        }
        this.spin = false;
      }else{
        this.spin = false;
        this.service.presentToast(this.userData.error_data, 'bottom', 3000, 'danger');
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

  async updateFirebase(email: string){
    console.log(email);
    await this.storage.set('user', this.userData).then();
    let token: string;
    let apiResponse: any = [];
    await this.storage.get('token').then((response) => {
      token = response;
    });
    const data = new FormData();
    data.append('email', email);
    data.append('firebase_token', token);
    this.http.post(this.service.baseUrl + 'firebase/register', data).subscribe(async (response) => {
      console.log(response);
      apiResponse = response;
      if (apiResponse.error === false){
        await this.storage.set('user', apiResponse.user).then();
        return true;
      }
      else{
        return false;
      }
    }, (error) => {
      console.log(error);
      return false;
    });
  }

  forgetPassword(){
    this.service.segment = 'Forget';
    this.router.navigateByUrl('/forget');
  }

  // twitterLogin(){
  //   this.twitter.login().then((detail) => {
  //     console.clear();
  //     console.log(detail);
  //     this.storage.set('keys', detail).then();
  //     this.twitter.showUser().then((userProfile) => {
  //       console.log(userProfile);
  //       this.router.navigateByUrl('/tabs', {replaceUrl: true});
  //     });
  //   }, (error) => {
  //     console.clear();
  //     console.log(error);
  //   });
  // }

}
