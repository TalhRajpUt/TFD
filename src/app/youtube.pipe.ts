import { Pipe, PipeTransform } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
@Pipe({
  name: 'youtube'
})
export class YoutubePipe implements PipeTransform {

  transform(value: string){
    return this.dom.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + value);
  }

  constructor(private dom: DomSanitizer){

  }

}
