import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

rateone = false
ratetwo= false
ratethree = false
ratefour = false
ratefive = false
  constructor() { }

  ngOnInit(): void {
  }
  rateOne() {
 this.rateone = !this.rateone
}

rateTwo() {
  this.ratetwo = !this.ratetwo
}
rateThree() {
  this.ratethree = !this.ratethree
}
rateFour() {
  this.ratefour = !this.ratefour
}
rateFive() {
  this.ratefive = !this.ratefive
}
}
