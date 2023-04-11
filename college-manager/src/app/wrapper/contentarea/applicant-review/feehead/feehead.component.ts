import { Component } from '@angular/core';
import { FeeheadService } from 'src/app/services/administration/feehead.service';

@Component({
  selector: 'app-feehead',
  templateUrl: './feehead.component.html',
  styleUrls: ['./feehead.component.css']
})
export class FeeheadComponent {
  newFeehead = '';
  feeheadList : []

  constructor(private feeServ : FeeheadService){
    this.getFeeheads()
  }

  


  addFeehead(){
    console.log("adding fee head now...")
    if(this.newFeehead == ''){
      alert('Feehead Name should be proided')
      return
    }
    
    let data = {
      "feeheadName" : this.newFeehead
    }
    // this.feeServ.addFeehead(data).subs
    this.feeServ.addFeehead(data).subscribe({
      next:(res) => {
        console.log(res)
      },
      error:(msg) => {
        console.log(msg)
      }

    })
  }

  getFeeheads(){
    // this.feeServ.addFeehead(data).subs
    this.feeServ.getFeeheads().subscribe({
      next:(res) => {
        console.log(res)
        this.feeheadList = res.feeheads
      },
      error:(msg) => {
        console.log(msg)
      }

    })
  }

}
