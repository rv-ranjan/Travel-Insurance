import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../quote/quote.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }
  agent_name: any;
  session_id: string = "";
  show_agent: boolean = false;
  ss_id: any;
  @Input() inputFromParent: any;

  ngOnInit() {
    setTimeout(() => {
      if (this.ss_id > 0) {
        $(".term-insurance-visible").show();
      }
    }, 1000)
    $(".js_accordion").click(function () {
      $(this).toggleClass('active');
    });
    setTimeout(() => {
      if (this.inputFromParent.hasOwnProperty('session_id') && this.inputFromParent.session_id != "") {
        $(".Car a").attr('href', '/car-insurance');
        $(".Bike a").attr('href', '/two-wheeler-insurance');
        $(".CV a").attr('href', '/commercial-vehicle-insurance');
        $(".Health a").attr('href', '/health-insurance');
      } else {
        $(".term-insurance-visible,.profile-popup").hide();
      }
    }, 1000);
  }

}
