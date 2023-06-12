import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { HorizonApiService } from '../horizon-api.service';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./header.component.css',
  '../../assets/styles/style.css'
  ]
})
export class HeaderComponent implements OnInit {

  constructor(private horizon: HorizonApiService, private router: Router) { }

  agent_name: any;
  agent_desk_mob: any;
  session_id: string = "";
  show_agent: boolean = false;
  ss_id: any;
  UID: any;
  source = "";
  @Input() inputFromParent: any;

  ngOnInit() {
    (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ? this.source = "mobile" : this.source = "desktop";

    setTimeout(() => {
      if (this.inputFromParent.hasOwnProperty('session_id') && this.inputFromParent.session_id != "") {
        // console.log('inputFromParent', this.inputFromParent);
        if (this.source === "mobile") {
          this.agent_desk_mob = this.inputFromParent['agent_name'].split(' ')[0];
        } else {
          this.agent_desk_mob = this.inputFromParent['agent_name'];
        }
        this.agent_name = this.inputFromParent['agent_name'];
        this.session_id = this.inputFromParent['session_id'];
        this.ss_id = this.inputFromParent['ss_id'];
        this.UID = this.inputFromParent['UID'];
        $(".Car a").attr('href', '/car-insurance');
        $(".Bike a").attr('href', '/two-wheeler-insurance');
        $(".CV a").attr('href', '/commercial-vehicle-insurance');
        $(".Health a").attr('href', '/health-insurance');
        $('#login').attr('href', 'javascript:return false;');
        $('#login').attr('onclick', 'javascript:return false;');
      } else {
        this.ss_id = 0;
        this.show_agent = false;
        $(".term-insurance-visible,.profile-popup").hide();
        $('a[title="Login"]').attr('href', 'https://horizon.policyboss.com/sign-in?ref_login=' + window.location.href);
        $('.profile-popup').remove();
      }
    }, 1000);

    $("#auth_token").keypress(function () {
      if ($("#auth_token").val().length >= 6) {
        return false;
      }
    });
    if ($(window).width() < 578) {
      // $('#password_login').text('With Password');
      // $('#auth_login').text('With App Token');
      // $('#drop_down_li').css('width','109px');
      $('#login_span').css('font-size', '13px');
      // $('#login_input').css({'bottom':'3px', 'right' : '14px'});
      // $('#login_dropdown').css('top','2px');
    }

    $('#login_dropdown').click(function () {
      $('#drop_down_li').toggleClass('show');

    });
    $(document).mouseup(function (e) {
      var container = $("#login_dropdown");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        $('#drop_down_li').removeClass('show');
        $('#login_dropdown').removeClass('active');
      }
      else {
        $('#login_dropdown').toggleClass('active');
      }
    });
    $(document).mouseup(function (e) {
      var container = $(".language-dropdown1");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        $('.langdropdown').removeClass('show');
        $('.language-dropdown1').removeClass('active');
      }
      else {
        $('.language-dropdown1').toggleClass('active');
      }
    });

  }
  showLangDropdown() {
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      $(".langdropdown").toggleClass('show');
      $(".langdropdown").addClass('langdropdownmb');
      // $('.language-dropdown1').toggleClass('active');
    } else {

      $(".langdropdown").toggleClass('show');
      // $('.language-dropdown1').toggleClass('active');

    }
  }


  closeMenu() {
    $(".hamburger").removeClass("active");
  }

  showLoginPopup(ss_id) {
    if (ss_id > 0 && $('.profile-popup').css('display') === 'none') {
      $(".authTypeLoginDropdown").hide();
      $(".profile-popup").show();
    } else if (ss_id > 0 && $('.profile-popup').css('display') === 'block') {
      $(".profile-popup").hide();
    }
  }

  showTokenLoginPopup() {
    // $(".auth-token-popup").show();
    $('#auth').modal('show');
  }
  closeTokenPopup() {
    // $(".auth-token-popup").hide();
    $('#auth').modal('hide');
    $('.tokenErr').text("");
    $('#auth_token').removeClass('has-error');
    // $('#login_dropdown').removeClass('active');


  }
  verifyToken() {
    let err = 0;
    let auth_token = $("#auth_token").val();
    let user_agent = navigator.userAgent;

    if (auth_token === "" || auth_token === "null" || auth_token === null || auth_token === "undefined" || auth_token === undefined) {
      $('#auth_token').addClass('has-error');
      $('.tokenErr').text("Please Enter Token");
      err++;
    } else if (auth_token.length < 6 || auth_token.length > 6) {
      $('#auth_token').addClass('has-error');
      $('.tokenErr').text("Please Enter Valid Token");
      err++;
    } else {
      $('.tokenErr').text("");
      $('#auth_token').removeClass('has-error');
    }
    if (err === 0) {
      let verifyData = {
        "auth_token": auth_token.toUpperCase(),
        "user_agent": user_agent
      }
      var method_name = '/postservicecall/verify_web_auth_token';
      this.horizon.CallAPIPostWithoutHeader(verifyData, method_name).subscribe(
        data => {
          if (data && data.hasOwnProperty('Status') && data['Status'] === "SUCCESS") {
            let sessionData = {
              "auth_token": auth_token.toUpperCase(),
              "ref_login": window.location.href
            }
            // var method_name = (window.location.href.includes("https")) ? "https://www.policyboss.com/sign-in-app" : "http://www.policyboss.com/sign-in-app";
            var method_name = "/sign-in-app";
            this.horizon.CallAPIPostAdmin(sessionData, method_name).subscribe(
              auth_data => {
                if (auth_data) {
                  console.log(auth_data);
                  this.update_auth_token(auth_token);
                  // window.location.reload();
                }
              }, error => {
                console.log(error);
                this.update_auth_token(auth_token);
              }
            );
          } else {
            $('.tokenErr').text(data['Msg']);
          }
        },
      );
    }
  }

  update_auth_token(token) {
    let update_token = token.toUpperCase();
    var method_name = '/auth_tokens/update_auth_token_details/' + update_token;
    this.horizon.callAPIGet('', method_name, 2).subscribe(
      update_auth_data => {
        console.log(update_auth_data);
        window.location.reload();

      });
  }

  login_dropdown_value(val) {
    // var select_val = $(val).text();
    if (this.source === "mobile") {
      val = val == 'Login Via Password' ? 'Password' : 'Auth Token';
    }
    // if($(window).width() < 578){
    // val = val == 'With Password'? 'Password':'Auth Token';
    // }
    $('#login_span').text(val);

  }


}
