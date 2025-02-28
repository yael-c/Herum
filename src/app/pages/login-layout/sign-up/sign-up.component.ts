import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SignUpData } from 'src/app/models/Internal/SignUpData';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: [
    './sign-up.component.scss',
    '../../../../app/shared/styles/forms.scss',
  ],
})
export class SignUpComponent implements OnInit {
  @Output() onSignUp = new EventEmitter<SignUpData>();

  options: { name: string; id: string }[] = [
    {
      name: 'סדיר',
      id: 'sadir',
    },
    {
      name: 'מילואים',
      id: 'miluim',
    },
  ];

  selectedOption: string = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    
  }

  _onSubmit() {
    
  }
}