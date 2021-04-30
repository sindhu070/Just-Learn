import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { GreetingsComponent } from './greetings/greetings.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private matDialog:MatDialog) {}
  title = 'Just-Learn';
  value1: number = 10; 
  public Name = "";
  public msg = 'Sindhu is great';
  public showAlert() :void {
    alert("Button was clicked");
  }

  openDialog() {
    let dialogRef = this.matDialog.open(GreetingsComponent,{
      data: {
        name:"sindhu",
        age:21
      }

    });
    dialogRef.afterClosed().subscribe(result=> {
      console.log(`dialog result:${result}`)});

  }
}
