import { Component, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-error-info',
  templateUrl: './error-info.component.html',
  styleUrls: ['./error-info.component.scss'],
})
export class ErrorInfoComponent {
  @Input() errors: ValidationErrors | null = null;
  @Input() touched: boolean = false;
  @Input() dirty: boolean = false;
}
