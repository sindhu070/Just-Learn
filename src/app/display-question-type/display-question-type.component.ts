import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-display-question-type',
  templateUrl: './display-question-type.component.html',
  styleUrls: ['./display-question-type.component.css']
})
export class DisplayQuestionTypeComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA)private information:any) { }

  ngOnInit() {
    
  }
  close() {
  
  }
  

}
