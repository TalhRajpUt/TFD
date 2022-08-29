import { Pipe, PipeTransform } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
@Pipe({
  name: 'news'
})
export class News implements PipeTransform {

  transform(value: string){
    return this.dom.bypassSecurityTrustResourceUrl(value);
  }

  constructor(private dom: DomSanitizer){

  }

}
