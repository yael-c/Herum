import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-error-info',
  templateUrl: './error-info.component.html',
  styleUrls: ['./error-info.component.scss']
})
export class ErrorInfoComponent {

  @Input() errors: any;
  @Input() touched: boolean = false;

}
