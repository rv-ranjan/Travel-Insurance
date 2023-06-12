import { Component, OnInit, Input, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { environment } from "../../environments/environment";

import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { filter, map, toArray } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import { HorizonApiService } from "../horizon-api.service";
import { DatePipe } from '@angular/common'
import { from } from 'rxjs/observable/from';
import * as html2canvas from "html2canvas";
import jsPDF from 'jspdf';
import * as moment from 'moment';
import { IfStmt } from '@angular/compiler';
declare var $: any;

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./quote.component.css',
    '../../assets/styles/style.css',
    '../../assets/styles/pb_tooltip.scss',
    '../../assets/styles/globalvar.css',
    '../../assets/styles/mdtimepicker.css'
  ]
})
export class QuoteComponent implements OnInit {
  checked_insurer = [];
  remain: string;
  reloadDivshow: boolean = true;
  agent_firstname: any;
  WindowWidth: number;
  in_on: boolean = false;
  si_on: boolean = false;
  pdfDate: any;
  createTime: string;
  UID: any;
  agent_name: any;
  agent_email: any;
  agent_mobile: any;
  show_agent: boolean = false;
  visitor_id: string = "";
  benefitList: any[];
  compareCount: number;
  ng_set_Pincode: any;
  eldest_member_age: number = 0;
  child_count: number = 0;
  adult_count: number = 0;
  final_response: any[];
  value: any;
  show_htl: boolean = false;
  @Input() inputFromParent: any;
  @Input() appVisitorData: any;
  compareList = [];
  filter_count: number = 0;
  filter_on: boolean = false;
  ins_data: [string, {}][];
  ins_info = {};
  slider_ins_Id = [];
  in_checked: any = [];
  si_checked: string = "";
  slider_IN = [];
  travel_insurance_type: any;
  siteURL = "";
  view = '';
  ss_id: number;
  arn: string;
  srn: string;
  client_id = 2;
  pb_crn = 0;
  StatusCount = 0;
  response_1 = [];
  summary = [];
  slider_SI = [];
  si_selected;
  travel_start_date;
  travel_end_date;
  travel_region;
  trip_type;
  sub_fba_id: any;
  fba_id: any;
  agent_source: any;
  Premium_list: any[];
  insurer_list: any;
  RequestCore: any;
  filter_plan_count: any;
  geo_area: any;
  filter_ins_count: any;
  travelling_to_area;
  member_count: any;
  member_1_age: any;
  Plan_Cnt: any;
  member_2_age: any = "";
  member_3_age: any = "";
  member_4_age: any = "";
  member_5_age: any = "";
  member_6_age: any = "";
  Insurer_Name: any;
  CreateTime: any;
  CurrentTime: any;
  response_2: any;
  count_num: number;

  SingleTripType: boolean = false;
  MultiTripType: boolean = false;
  maximum_duration: any;
  Travel_start_date: any;
  Travel_end_date: any;
  geo_lat: any = 0;
  geo_long: any = 0;
  ip_address: any = '';
  ip_city_state: string = '';
  utm_source: any;
  app_version: any;
  showShareBtn: boolean = true;
  mac_address: any;
  utm_medium: any;
  utm_campaign: any;
  campaign_id: any;
  origin_udid: any;
  ProductID: any;
  lead_type: any;
  member_3_birth_date: any;
  member_5_birth_date: any;
  member_4_birth_date: any;
  member_6_birth_date: any;
  member_3_age_: any
  member_4_age_: any
  member_5_age_: any
  member_6_age_: any
  quoteLength: any;
  all_member_age_: string = "";
  all_member_age: string;
  mob_view: boolean = false;
  Status_Count_for_10_sec: number = 0;
  Insurer_Name_pd: any;
  Sum_Insured_pd: any;
  Sum_Insured_format_pd: string;
  service_log_id: any;
  arn_pd: void;
  benefitList_pd: any;
  BenefitsDetails: any[];
  plan_name_pd: any;
  final_premium_pd: any;
  net_premium_pd: any;
  service_tax_pd: any;
  Insurer_Logo_Name_pd: string;
  constructor(private service: HorizonApiService, private _route: Router, private http: HttpClient, private ActivatedRoute: ActivatedRoute, public datepipe: DatePipe) { }

  ngOnInit() {

    window.scrollTo(0, 0);

    //Preloader Js
    $(".loader").fadeOut("slow");

    $('#buy_now_btn').click(function () {
      $('#buy_now_btn').removeClass('animate');
      $(this).addClass('active');
      setTimeout(function () {
        $('#buy_now_btn').addClass('animate');
      }, 1000);
      var delay = 3000;
      var url = 'car-proposal-details.html'
      setTimeout(function () { window.location.href = url; }, delay);
    });

    $(".select-all-input").closest('.check-item-box').click(function () {
      $(this).closest('.check-item-area').find(".check-input").prop('checked', $('.select-all-input').prop('checked'));
    });

    $('input.check-input:checkbox').change(function (e) {
      if (!$('input.deselect-all:checkbox')) {
        $(this).closest('.detail-select-row').find('input.deselect-all:checkbox').prop('checked', false);
      }
    });

    //View Info Toggle
    $('.view-info-btn').click(function () {
      $('#car-proosal-detail-box').find('.policy-info-listing').toggleClass('btn-hidden');
      $('.summary-info-wrapper').toggleClass('btn-hidden');
      $('.policy-detail-modal .policy-info-listing').toggleClass('btn-hidden');
      $(this).text(($(this).text() == 'View Info' ? 'Hide Info' : 'View Info'))
        .toggleClass("active");
    })

    $('#limit_apply_btn').click(function () {
      if (($('input.value-input').val() < 10000000) || ($('input.value-input').val() > 200000000)) {
        $('input.value-input').val(10000000);
      }
    });

    $('#compare_btn').click(function () {
      $('#compare_count').trigger('click');
    });
    $('#compare_count').click(function () {
      const no_of_comparison = $('.count-btn').text();
      if (no_of_comparison == 3) {
        $('#planComparisonModal').find('.modal-dialog').removeClass('wrapper-750');
        $('#planComparisonModal').find('.modal-dialog').addClass('wrapper-945');
      }
      else {
        $('#planComparisonModal').find('.modal-dialog').removeClass('wrapper-945');
        $('#planComparisonModal').find('.modal-dialog').addClass('wrapper-750');
      }
    });

    //Addons Add btn
    $(".addons-apply-btn").click(function () {
      $('.value-block').addClass('addons-added');
      $('.addons-area').addClass('addons-added');
      $('.depreciation-area').addClass('addons-added');
    });

    //Bootstrap Tooltip
    $('[data-bs-toggle="tooltip"]').tooltip();

    //Bootstrap Accordion Collapse
    if ($(window).width() >= 768) {
      $('.accordion-button').each(function () {
        $(this).attr('data-bs-toggle', '');
      })
    } else {
      $('.accordion-button').each(function () {
        $(this).addClass('collapsed')
        $(this).attr('data-bs-toggle', 'collapse');
      })
      $('.location-listing-area').each(function () {
        $(this).removeClass('show');
      })
    }

    $('.accordion-button-working').attr('data-bs-toggle', '');
    $('.accordion-button-working').addClass('collapsed')
    $('.accordion-button-working').attr('data-bs-toggle', 'collapse');

    $('.profile-button').click(function () {
      $('.profile-box-area').toggleClass('profile-active');
      setTimeout(function () {
        $('.profile-detail-area').toggleClass('open');
      }, 400);
    });

    $('.apply-btn').on('click', function () {
      $(".dropdown-toggle").trigger("click");
    });

    //Custome Dropdown Select Bootstrap
    $(".select-dropdown-box li a").click(function () {
      var selText = $(this).text();
      $(this).closest('.input-field-box').find('.select-dropdown').val(selText);
      $(this).closest('.input-field-box').find('.select-dropdown').removeClass('show');
      $(this).closest('.input-field-box').find('.select-dropdown-box').removeClass('show');
    });

    //Input Field
    $('.input-field').change(function (e) {
      if ((e.val) !== '') {
        $(this).addClass('input-change');
      } else if ((e.val) == '') {
        $(this).removeClass('input-change');
      }
    })

    //Prevent Dropdown close on click inside
    $('.dropdown-menu').on('click', function (e) {
      e.stopPropagation();
    });

    //Click active
    $('.dropdown-list-col').click(function () {
      $('.dropdown-list-col').removeClass('active');
      $(this).addClass('active');
      $('.sort-dropdown-box').removeClass('show');
      $('.sort-dropdown-toggle').removeClass('show');
    });
    $('.dropdown-list-col1').click(function () {
      $('.dropdown-list-col1').removeClass('active');
      $(this).addClass('active');
      $('.sort-dropdown-box').removeClass('show');
      $('.sort-dropdown-toggle').removeClass('show');
    });

    //Get Dropdown value 
    $('#js-dropdown-links-1 .js_click_link').click(function () {
      $('.input-field-box').find('#dropdownMenuButton4 .js-dropdown-value').text($(this).text());
    });
    $('#js-dropdown-links-2 .js_click_link').click(function () {
      $('.result-filter-box-area').find('#dropdownMenuButton4 .js-dropdown-value').text($(this).text());
    });

    //Toggle on click
    $('.js_modal_close').on('click', function () {
      $('body').removeClass('active');
      $('html').removeClass('active');
    })

    //Burger Menu JS
    $('#dismiss, .overlay').on('click', function () {
      $('#sidebar').removeClass('active');
      $('body').removeClass('active');
      $('.mainmainubtn').removeClass('active');
      $('btnjs').removeClass('active');
      $('.overlay').fadeOut();
    });

    $('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
      $('body').toggleClass('active');
      $('.mainmainubtn').toggleClass('active');
      $('.btnjs').toggleClass('active');
      $('.overlay').fadeIn();
      $('.overlay-appear').toggleClass('active');
      $('.collapse.in').toggleClass('in');
      $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });

    $('.notification-btn').on('click', function () {
      setTimeout(function () {
        $('body').toggleClass('notification_active');
      });
    });

    $('.abc').on('click', function () {
      $('body').removeClass('notification_active');
      $('#sidebar').removeClass('active');
      $('body').removeClass('active');
      $('btnjs').removeClass('active');
    });

    //Burger Menu JS
    $('#dismiss1, .overlay').on('click', function () {
      $('.menuicon').removeClass('active');
      $('.navbarLink1').removeClass('active');
      $('body').removeClass('active1');
      $('.overlay').fadeOut();
    });

    $('#sidebarCollapse1').on('click', function () {
      $('.menuicon').toggleClass('active');
      $('.navbarLink1').toggleClass('active');
      $('body').toggleClass('active1');
      $('.overlay').fadeIn();
      $('.collapse.in').toggleClass('in');
      $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });

    $('.hamburger').on('click', function () {
      $(this).toggleClass('active');
      $('html').toggleClass('active');
      $('.dropdown-icon').removeClass('active');
      $('.dropdown-menu').removeClass('show');
    });

    $(function () {
      if ($(window).width() < 992) {
        $(".dropdown-link-box").click(function () {
          $(this).removeClass('js_link');
          if ($(this).find('.dropdown-menu').hasClass('show')) {
            $(this).find('.dropdown-menu').slideUp();
            $(this).removeClass('active');
            $(this).find('.dropdown-menu').removeClass('show');
          } else {
            $('.dropdown-menu.show').slideUp();
            $('.dropdown-menu.show').parent('.dropdown-link-box').removeClass('active');
            $('.dropdown-menu.show').removeClass('show');
            $(this).addClass('active');
            $(this).find('.dropdown-menu').slideDown();
            $(this).find('.dropdown-menu').addClass('show');
          }
        });
      }
    });
    $('.profile-box-li').hide();

    this.getClientBrowserDetails();
    this.ActivatedRoute.queryParams.subscribe(params => {
      this.srn = params['SID'];
      this.app_version = 'PolicyBoss.com';
      this.utm_source = params['utm_source'] != undefined ? params['utm_source'] : '';
      this.utm_medium = params['utm_medium'] != undefined ? params['utm_medium'] : '';
      this.utm_campaign = params['utm_campaign'] != undefined ? params['utm_campaign'] : '';
      this.campaign_id = params['campaign_id'] != undefined ? params['campaign_id'] : '';
      this.origin_udid = params['udid'] != undefined ? params['udid'] : '';
      this.app_version = params['app_version'] != undefined ? params['app_version'] : '';
      if (this.app_version && this.app_version.includes('policyboss-')) {
        this.showShareBtn = false;
        this.ss_id = params['ss_id'] != undefined ? params['ss_id'] : 0;
        this.fba_id = params['fba_id'] != undefined ? params['fba_id'] : '';
        this.ip_address = params['ip_address'] != undefined ? params['ip_address'] : '';
        this.mac_address = params['mac_address'] != undefined ? params['mac_address'] : '';
        if (params['ClientID']) {
          this.client_id = params['ClientID'];
        }
        else if (params['client_id']) {
          this.client_id = params['client_id'];
        }
        this.ProductID = params['product_id'] != undefined ? params['product_id'] : '';
        this.sub_fba_id = params['sub_fba_id'] != undefined ? params['sub_fba_id'] : 0;
      }
      if (this.srn !== undefined && this.srn != '' && this.srn != null) {
        this.StatusCount = 0;
        this.getPremiumList(this.srn);
      }
    }, (err) => {
      console.log(err);
    });

    setTimeout(() => {
      if (this.inputFromParent.hasOwnProperty('ss_id') && this.inputFromParent.ss_id != "") {
        this.ss_id = this.inputFromParent.ss_id;
        this.agent_name = this.inputFromParent['agent_name'];
        this.agent_email = this.inputFromParent['agent_email'];
        this.agent_mobile = this.inputFromParent['agent_mobile'];
        this.show_agent = true;
        this.fba_id = this.inputFromParent.fba_id;
        this.sub_fba_id = this.inputFromParent.sub_fba_id;
        // $(".Car a").attr('href', '/car-insurance');
        // $(".Bike a").attr('href', '/two-wheeler-insurance');
        // $(".CV a").attr('href', '/commercial-vehicle-insurance');
        // $(".Health a").attr('href', '/commercial-vehicle-insurance');
      }
      if (this.appVisitorData.hasOwnProperty('visitor_id') && this.appVisitorData.visitor_id != "") {
        this.visitor_id = this.appVisitorData.visitor_id;
      }
    }, 1000);

    var windowSize = $(window).width();
    if (windowSize <= 575) {
      this.mob_view = true
    }
  };// ngOninitENDS

  getClientBrowserDetails() {
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          this.showPosition(position)
        },
        error => {
          console.log('Position Unavailable');
        }
      );
    }
  }

  showPosition(position) {
    this.geo_lat = position.coords.latitude;
    this.geo_long = position.coords.longitude;
    this.service.getIpAddress().subscribe(data => {
      // console.log("Ip data", data);
      this.ip_address = data["ip"];
      this.ip_city_state = data["city"] + "_" + data["region"];
      //var loc = data["loc"];
      // this.loc_data = loc.split(",");
      //this.geo_lat = this.loc_data[0];
      //this.geo_long = this.loc_data[1];
    });
  }

  

  getPremiumList(srn) {
    // console.log('srn:', srn);
    // $('.loading').show();
    var RequestData = {
      "search_reference_number": srn,
      "client_key": "CLIENT-CNTP6NYE-CU9N-DUZW-CSPI-SH1IS4DOVHB9",
      "secret_key": "SECRET-HZ07QRWY-JIBT-XRMQ-ZP95-J0RWP3DYRACW"
    };
    var method_name = '/quote/premium_list_db';
    this.service.callAPIPost(RequestData, method_name, 2).subscribe(data => {
      // console.log(data);
      if (data !== null && data['Msg'] !== "Not Authorized") {
        this.response_1 = data['Response_1'];
        this.final_response = [...this.response_1];
        this.response_2 = data['Response'];
        // console.log('data:', data);
        this.lowToHight();
        this.summary = data['Summary'];
        this.RequestCore = data['Summary'].Request_Core;
        this.trip_type = this.summary['Request_Core']['trip_type'];
        this.travel_insurance_type = this.summary['Request_Core']['travel_insurance_type'];
        this.travelling_to_area = this.summary['Request_Core']['travelling_to_area'];
        this.member_count = this.summary['Request_Core']['member_count'];
        this.pb_crn = this.summary['PB_CRN'];
        this.ss_id = this.ss_id > 0 ? this.ss_id : data['Summary']['Request_Core'].ss_id;
        this.trip_type = this.summary['Request_Core']['trip_type'];
        this.Plan_Cnt = this.summary['Plan_Cnt'];
        this.adult_count = this.summary['Request_Core'].adult_count;
        this.child_count = this.summary['Request_Core'].child_count;
        this.Insurer_Name = data['Response_1']['Insurer_Name'];
        this.member_1_age = this.summary['Request_Core']['member_1_age'];
        this.member_2_age = this.summary['Request_Core']['member_2_age'];
        this.member_3_age = this.summary['Request_Core']['member_3_age'];
        this.member_4_age = this.summary['Request_Core']['member_4_age'];
        this.member_5_age = this.summary['Request_Core']['member_5_age'];
        this.member_6_age = this.summary['Request_Core']['member_6_age'];
        this.all_member_age_ = "",
          this.member_3_birth_date = this.summary['Request_Core']['member_3_birth_date'];
        this.member_4_birth_date = this.summary['Request_Core']['member_4_birth_date'];
        this.member_5_birth_date = this.summary['Request_Core']['member_5_birth_date'];
        this.member_6_birth_date = this.summary['Request_Core']['member_6_birth_date'];
        var child_members = [this.member_3_birth_date, this.member_4_birth_date, this.member_5_birth_date, this.member_6_birth_date]
        child_members.forEach((element, i) => {
          if (this['member_' + (i + 3) + '_age'] == 0) {
            // var past_date = new Date(element);
            // var current_date = new Date();
            // var difference = (current_date.getFullYear() * 12 + current_date.getMonth()) - (past_date.getFullYear() * 12 + past_date.getMonth());
            var past_date = moment(element);
            var current_date = moment();
            var difference = (current_date.year() * 12 + current_date.month()) - (past_date.year() * 12 + past_date.month());
            this['member_' + (i + 3) + '_age_'] = difference;
          }
        });
        for (let i = 1; i <= (this.adult_count); i++) {
          this.all_member_age_ += this['member_' + i + '_age'] == undefined ? "" : (this['member_' + i + '_age'] == 0 ? this['member_' + i + '_age_'] + ' Mths,' : this['member_' + i + '_age'] + ' Yrs,')
        }
        for (let i = 3; i <= (this.child_count + 2); i++) {
          this.all_member_age_ += this['member_' + i + '_age'] == undefined ? "" : (this['member_' + i + '_age'] == 0 ? this['member_' + i + '_age_'] + ' Mths,' : this['member_' + i + '_age'] + ' Yrs,')
        }
        // for (let i = 1; i <= (this.adult_count); i++) {
        //   this.all_member_age_ += this['member_' + i + '_age'] == undefined ? "" : this['member_' + i + '_age'] + ' Yrs,'
        // }
        //  for (let i = 3; i <= (this.child_count+2); i++) {
        //   this.all_member_age_ += this['member_' + i + '_age'] == undefined ? "" : this['member_' + i + '_age'] + ' Yrs,'
        // }
        this.all_member_age_ = (this.all_member_age_.split(',')).join(", ");
        this.all_member_age = this.all_member_age_.substring(0, this.all_member_age_.length - 2);

        this.CreateTime = moment(data['Summary'].Created_On);
        this.travel_start_date = data['Summary']['Request_Core']['travel_start_date'];
        this.travel_end_date = data['Summary']['Request_Core']['travel_end_date'];

        this.eldest_member_age = this.summary['Request_Product'].elder_member_age;
        this.Travel_start_date = data['Summary']['Request_Core']['travel_start_date'];
        this.Travel_end_date = data['Summary']['Request_Core']['travel_end_date'];
        this.travel_start_date = moment(this.travel_start_date, 'YYYY-MM-DD').format('MMM DD, YYYY');
        this.createTime = moment(this.CreateTime, 'YYYY-MM-DD').format('MMM DD,YYYY');

        this.utm_source = data['Summary']['Request_Core']['utm_source'];
        this.utm_medium = data['Summary']['Request_Core']['utm_medium'];
        this.utm_campaign = data['Summary']['Request_Core']['utm_campaign'];
        this.campaign_id = data['Summary']['Request_Core']['campaign_id'];
        this.origin_udid = data['Summary']['Request_Core']['origin_udid'];
        this.lead_type = data['Summary']['Request_Core']['lead_type'];
        if ( this.RequestCore &&  this.RequestCore.hasOwnProperty('app_version') && ( this.RequestCore['app_version'].includes('policyboss-')|| this.RequestCore['app_version'].includes('IMAGIC_APP'))) {
          $('.mainHeader').hide();
          $('.footer-section').hide();
        };
        if (this.trip_type === "SINGLE") {
          this.travel_end_date = moment(this.travel_end_date, 'YYYY-MM-DD').format('MMM DD, YYYY');
        }
        this.response_1.forEach((res) => {
          this.callTravelBenefit(res.Insurer_Id, res.Plan_Id, this.travelling_to_area, this.travel_insurance_type, this.trip_type);

          if (!this.slider_SI.includes(res.Sum_Insured)) {
            this.slider_SI.push(res.Sum_Insured);

          }

          if (!this.slider_ins_Id.includes(res.Insurer_Id)) {
            this.slider_ins_Id.push(res.Insurer_Id);
          }
        });

        this.response_2.forEach((res) => {
          if (!this.slider_IN.includes(res.Insurer.Insurer_Code)) {
            this.slider_IN.push(res.Insurer.Insurer_Code);
          }
        })

        this.sort_si();
        // var ins_info = {}

        this.slider_IN.forEach((key, value) => {
          this.ins_info[key] = this.slider_ins_Id[value];
        });

        this.ins_data = Object.entries(this.ins_info);
        // console.log('ins_data:', this.ins_data);

        this.StatusCount++;
        var is_tata_available = false;
        this.CurrentTime = moment();
        let DateDiff = this.CurrentTime.diff(this.CreateTime);
        Object.keys(data['Response']).forEach(key => {
          if (data['Response'][key]['Insurer_Id'] === 11) {
            is_tata_available = true;
          }
        });
        var is_Complete: boolean = false;
        if (data['Summary']['Status'] === "complete" && is_tata_available) {
          is_Complete = true;
          this.reloadDivshow = false;
          // console.log('StatusCount:',this.StatusCount)
        } else {
          if (DateDiff >= 30000 && is_tata_available) {
            is_Complete = true;
            this.reloadDivshow = false;
          } else if (!is_tata_available && DateDiff >= 60000) {
            is_Complete = true;
            this.reloadDivshow = false;
          } else {
            if (this.StatusCount > 3) {
              if ((this.StatusCount > 3 && data['Summary']['Status'] !== "complete") || (this.StatusCount > 3 && data['Summary']['Status'] == "complete" && !is_tata_available)) {
                this.Status_Count_for_10_sec++;
                if (this.Status_Count_for_10_sec > 4 && is_tata_available) {
                  is_Complete = true;
                  this.reloadDivshow = false;

                } else if (this.Status_Count_for_10_sec > 7 && !is_tata_available) {
                  is_Complete = true;
                  this.reloadDivshow = false;

                } else {
                  setTimeout(() => {
                    this.getPremiumList(this.srn);
                  }, 10000);
                }
              } else {
                is_Complete = true;
                this.reloadDivshow = false;

              }
            }
            else {
              setTimeout(() => {
                this.reloadDivshow = true;
                this.getPremiumList(this.srn);

              }, 3000);
            }
          }
        }
        for (let i = 0; i <= 4; i++) {
          if ($('.destination').find('a.select-dropdown-box-link')[i].innerHTML == this.travelling_to_area) {
            $('.destination').find('li.select-dropdown-box-li')[i].click()
          }
        }

        $('#GeographicalArea').val(this.travelling_to_area);
        if (this.trip_type == 'SINGLE') {
          this.SingleTripType = true;
          $('#travel_start_date').val(moment(this.Travel_start_date, 'YYYY-MM-DD').format('DD-MMM-YYYY'));
          $('#travel_return_date').val(moment(this.Travel_end_date, 'YYYY-MM-DD').format('DD-MMM-YYYY'));
          $('.single').show();
          $('.end_date').show();
          $('.maxtripdays_dropdown').hide();
        } else {
          this.MultiTripType = true;
          this.maximum_duration = this.summary['Request_Core']['maximum_duration'];
          $('#trip_date').val(this.getMaxDateRange(this.maximum_duration));
          $('.single').hide();
          $('.maxtripdays_dropdown').show();
          $('.end_date').hide();  
          $('#travel_start_date').val(moment(this.Travel_start_date, 'YYYY-MM-DD').format('DD-MMM-YYYY'));
            for (let i = 0; i <= 3; i++) {
              if ($('.max_days').find('a.select-dropdown-box-link')[i].innerHTML.split('-')[1] == this.maximum_duration) {
                $('.max_days').find('li.select-dropdown-box-li')[i].click()
              }
            }
        }

        var new_date = moment(this.Travel_start_date, 'YYYY-MM-DD').add(1, 'days').format('DD/MM/YYYY');
        var max_end_date = moment(new_date, 'DD/MM/YYYY').add(178, 'days').format('DD/MM/YYYY');

        $("#travel_start_date").datepicker({
          startDate: '+1d',
          format: 'dd-M-yyyy',
          endDate: '+5m +28d',
          autoclose: true
        });
        $("#travel_return_date").datepicker({
          startDate: new_date,
          format: 'dd-M-yyyy',
          endDate: max_end_date,
          autoclose: true
        });
        // $("#travel_return_date").datepicker('startDate', new_date);
        // $("#travel_return_date").datepicker('endDate', max_end_date);
        // $('.loading').hide();
        $("#travel_start_date").change(function (e) {
          var Start_Date_Val = $('#travel_start_date').val();
          if (Start_Date_Val !== null || Start_Date_Val !== "") {
            $("#travel_return_date").prop("disabled", false)
          }
        });

        $("#travel_start_date").on("changeDate", (e) => {
          var travel_date = $("#travel_start_date").val();
          var traveler_start_date_1 = moment(travel_date, "DD/MMM/YYYY").add(1, 'days').format('DD/MM/YYYY');
          var forenddate = moment(travel_date, "DD/MMM/YYYY").add(179, 'days').format('DD-MM-YYYY');
          $('#travel_return_date').datepicker('setStartDate', traveler_start_date_1);
          $('#travel_return_date').datepicker('setEndDate', forenddate);
          $('#travel_return_date').datepicker('setDate', traveler_start_date_1);
          $('#travel_return_date').val("");
        });
      }
    }, err => {
      console.log(err);
    })
  };


  currency_format(curr) {
    if (/[$_€]/.test(curr)) {
      var currency = + curr.replace(/[$_€]/g, '');
      return currency.toLocaleString();
    } else {
      currency = parseInt(curr);
      return currency.toLocaleString('en-IN');
    }
  }

  highToLow() {
    this.show_htl = true;
    this.final_response.sort((a, b) => {
      return b.Premium_Breakup['final_premium'] - a.Premium_Breakup['final_premium'];
    });
  };

  lowToHight() {
    this.show_htl = false;
    this.final_response.sort((a, b) => {
      return a.Premium_Breakup['final_premium'] - b.Premium_Breakup['final_premium'];
    });
  };

  callTravelBenefit(ins_id, plan_id, area, ins_type, trip_type) {
    let benefitTypes = ['Hospitalization Expenses', 'Loss of Passport', 'Personal Liability', 'Trip Delay'];
    let benefitIcons = ['expense', 'passport', 'accident', 'delay'];

    let method_name = '';
    if ((environment.horizon_http_url).includes('qa')) {
      method_name = '/benefit/' + ins_id + '/' + plan_id + '/' + area + '/' + ins_type;
    } else if (environment.horizon_http_url.includes('localhost')) {
      method_name = '/travel_benefit/benefit/' + ins_id + '/' + plan_id + '/' + area + '/' + ins_type;
    } else {
      method_name = '/travel_benefit/benefit/' + ins_id + '/' + plan_id + '/' + area + '/' + ins_type + '/' + trip_type;
    }

    this.service.callAPIGet("", method_name, 2).subscribe(data => {
      if (Object.keys(data).length === 0) {
        benefitIcons.forEach(icon => {
          $(`#${icon}_${plan_id}`).attr('src', 'https://origin-cdnh.policyboss.com/website/UI22/images/icons/red-x-line-icon.svg');
        });
        return;
      }
      benefitTypes.forEach((benefit, i) => {
        if (data[benefit] !== 'NA' && data.hasOwnProperty(benefit)) {
          return;
        }
        $(`#${benefitIcons[i]}_${plan_id}`).attr('src', 'https://origin-cdnh.policyboss.com/website/UI22/images/icons/red-x-line-icon.svg');
      });
    }, (err) => {
      console.error(err);
    });
  }
  sort_si() {
    this.slider_SI.sort((a, b) => {
      a = parseFloat(a.replace("$", ''));
      b = parseFloat(b.replace("$", ''));
      return a - b;
    });
  };
 async compareBenefit(ins_id, plan_id, area, ins_type, trip_type,source) {
    if ((environment.horizon_http_url).includes('qa')) {
      var method_name = '/benefit/' + ins_id + '/' + plan_id + '/' + area + '/' + ins_type;
    } else if (environment.horizon_http_url.includes('localhost')) {
      var method_name = '/travel_benefit/benefit/' + ins_id + '/' + plan_id + '/' + area + '/' + ins_type;
    } else {
      var method_name = '/travel_benefit/benefit/' + ins_id + '/' + plan_id + '/' + area + '/' + ins_type + '/' + trip_type;
    }
    this.benefitList = [];
   let res_val = await this.service.callAPIGet("", method_name, 2).toPromise();
  //  .subscribe(data => {
      var keys = Object.keys(res_val);
      if (keys.length != 0) {
        // console.log('compareBenefit:', data);
       this.benefitList.push(res_val);
       if(source = 'pd'){
        return this.benefitList;
       }
      }
      else {
        return [];
      }
    // }, err => {
    //   console.log(err);
    // })
  }

  // CompareCheckModel(index_value, plan_id, insurerId, sum_insured, finalPremium, insurer_logo, insurer_name, plan_name, ARN) {
  //   if (($('#check-item-' + plan_id).is(':checked'))) {
  //     if (!(this.compareList.map(a => a.Plan_Id).includes(plan_id))) {
  //       this.compareBenefit(insurerId, plan_id, this.travelling_to_area, this.travel_insurance_type, this.trip_type);
  //       var DetailObj = {
  //         id: index_value,
  //         Plan_Id: plan_id,
  //         Insurer_Id: insurerId,
  //         Sum_Insured: sum_insured,
  //         final_premium: finalPremium,
  //         Insurer_Logo_Name: insurer_logo,
  //         Insurer_Name: insurer_name,
  //         Plan_Name: plan_name,
  //         arn: ARN,
  //         benefit_list: this.benefitList
  //       }

  //       this.compareList.push(DetailObj);
  //     }
  //   } else {
  //     this.compareList.splice(this.compareList.findIndex(x => x.Plan_Id === plan_id), 1);
  //     console.log('compareList:', this.compareList);
  //     this.compareCount = this.compareList.length;
  //   }
  //   if (this.compareList.length == 0) {
  //     $('.noneSelected').attr('data-bs-target', '#WhatsappOnClickProposalModal');
  //     $('.plan-comparison-section').hide(300);
  //   }
  //   else if (this.compareList.length > 3) {
  //     $('#alertPopup').modal('show');
  //     this.compareList.splice(this.compareList.findIndex(x => x.Plan_Id === plan_id), 1);
  //     return false;
  //   }
  //   else if (this.compareList.length >= 1) {
  //     $('.plan-comparison-section').show(300);
  //     this.compareCount = this.compareList.length;
  //     $('.noneEmailSelected').attr('data-bs-target', '#saveProposalModal');
  //     $('.noneMobileSelected').attr('data-bs-target', '#WhatsappProposalModal');
  //   }
  // };

 async CompareCheckModel(index_value, plan_id, insurerId, sum_insured, finalPremium, insurer_logo, insurer_name, plan_name, ARN) {
    const $checkItem = $('#check-item-' + plan_id);
    if (!$checkItem.is(':checked')) {
      this.compareList = this.compareList.filter(x => x.Plan_Id !== plan_id);
      this.compareCount = this.compareList.length;
      $('.plan-comparison-section').toggle(this.compareList.length > 0);
      if (this.compareList.length == 0) {
        $('.noneSelected').attr('data-bs-target', '#WhatsappOnClickProposalModal');
      } else {
        $('.noneEmailSelected').attr('data-bs-target', '#saveProposalModal');
        $('.noneMobileSelected').attr('data-bs-target', '#WhatsappProposalModal');
      }
      return;
    }

    if (this.compareList.findIndex(x => x.Plan_Id === plan_id) !== -1) return;

   await this.compareBenefit(insurerId, plan_id, this.travelling_to_area, this.travel_insurance_type, this.trip_type,'').catch((error) => {
    console.log('CompareCheckModel:',error);
  });;
    this.compareList.push({
      id: index_value,
      Plan_Id: plan_id,
      Insurer_Id: insurerId,
      Sum_Insured: sum_insured,
      final_premium: finalPremium,
      Insurer_Logo_Name: insurer_logo,
      Insurer_Name: insurer_name,
      Plan_Name: plan_name,
      arn: ARN,
      benefit_list: this.benefitList
    });
    this.compareCount = this.compareList.length;

    if (this.compareList.length > 3) {
      $('#alertPopup').modal('show');
      this.compareList.splice(this.compareList.findIndex(x => x.Plan_Id === plan_id), 1);
      this.compareCount = this.compareList.length;
      return false;
    }

    $('.plan-comparison-section').toggle(this.compareList.length > 0);

    if (this.compareList.length == 0) {
      $('.noneSelected').attr('data-bs-target', '#WhatsappOnClickProposalModal');
    } else {
      $('.noneEmailSelected').attr('data-bs-target', '#saveProposalModal');
      $('.noneMobileSelected').attr('data-bs-target', '#WhatsappProposalModal');
    }
  };
  compareinsurers() {
    // var PdfDate;
    this.pdfDate = moment().format('MMM DD, YYYY');
  }

  downloadAsPDF() {
    if (this.mob_view) {
      $('.font-16').addClass('font-for-pdf');
      $('.plan-comparison-main').addClass('plan-comparison-main-pdf')
    } else {
      $('.font-16').removeClass('font-for-pdf');
      $('.plan-comparison-main').removeClass('plan-comparison-main-pdf')
    }

    $('.loading').show();
    var data = document.getElementById('maindv_comparequotes');
    $('.secdv_comparequotes').show();
    $('.addCompareDetails').show();
    $('.btn-area').hide();

    html2canvas(data, { logging: true, letterRendering: 1, allowTaint: false, useCORS: true, scale: "2" }).then((canvas) => {
      var imgWidth = 220;
      var pageHeight = 290;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jsPDF("p", "mm", "a4", true);
      var position = 0;
      const img = new Image();
      img.src = contentDataURL;
      const pdfWidth = pdf.internal.pageSize.getWidth();
      pdf.addImage(img, 'PNG', 0, 0, pdfWidth, imgHeight);
      heightLeft -= pageHeight;
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(img, 'PNG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save(this.pb_crn + '.pdf');
      $('.loading').hide();
    });
    setTimeout(() => {
      $(".btn-area").show();
      $('.secdv_comparequotes').hide();
      $('.addCompareDetails').hide();
      $('.font-16').removeClass('font-for-pdf');
      $('.plan-comparison-main').removeClass('plan-comparison-main-pdf')

    }, 25);
    var post = {};
    post['ss_id'] = this.ss_id;
    const current_date = moment();
    post['datetime'] = current_date.format('YYYY-MM-DDThh:mm:ss');
    post['pdf_file_name'] = this.pb_crn;
    post['crn'] = this.pb_crn;
    post['product_id'] = 4;
    post['udid'] = this.srn.split('_')[1];
    var method_name = '/postservicecall/quote_download_history';
    this.service.callAPIPost(post, method_name, 2).subscribe(
      data => {
        console.log('Inserted', data);
      },
      error => {
        console.log('error', error);
      });
  }

  ComparePlanClose(plan_id) {
    this.compareList.splice(this.compareList.findIndex(x => x.Plan_Id === plan_id), 1);
    $('#check-item-' + plan_id).prop('checked', false);
    this.compareCount = this.compareList.length;
    if (this.compareList.length == 0) {
      $('.plan-comparison-section').hide(300);
      $('.noneSelected').attr('data-bs-target', '#WhatsappOnClickProposalModal');
    }
  }

  closeComparebtw() {
    $('.plan-list-chechkbox').prop('checked', false);
    this.compareList.splice(0, this.compareList.length);
    this.compareCount = this.compareList.length;
    $('.plan-comparison-section').hide(300);
    $('.noneSelected').attr('data-bs-target', '#WhatsappOnClickProposalModal');

  }

  ShareOnEmail() {
    var emailAddress = $('#send_email').val();
    if (emailAddress == "" || emailAddress == null || emailAddress == undefined || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailAddress)) {
      $('#send_email').addClass('ErrorMsg');
      $('.shareEmailError').show();
    } else {
      $('#send_email').removeClass('ErrorMsg');
      $('.shareEmailError').show();
    }
  };

  shareOnWhatsapp(type) {
    var whatsappMessage = "";
    var mobileNo = $('#send_mobile').val();
    if (type === "send" && (mobileNo == "" || mobileNo == null || mobileNo == undefined)) {
      $('#send_mobile').addClass('ErrorMsg');
      $('.shareNumError').show().text("Please Enter Mobile Number");
    } else if (mobileNo != "" && !/^[6-9]{1}[0-9]{9}$/.test(mobileNo)) {
      $('#send_mobile').addClass('ErrorMsg');
      $(".shareNumError").show().text("Please Enter Valid Mobile Number");
    }
    else {
      $('#send_mobile').removeClass('ErrorMsg');
      $('.shareNumError').hide();
      let URL = "";
      if (window.location.href.includes("localhost")) {
        URL = encodeURIComponent('https://www.policyboss.com/travel-insurance/quotes?SID=SRN-YZ83RPF2-W3CQ-DCDC-OFNU-K2QYIK1F6ZQM_5979674&ClientID=2');
      } else {
        URL = encodeURIComponent(window.location.href);
      }
      let bitlyURL = "https://horizon.policyboss.com:5443/short_url/create?longUrl=" + URL;
      this.service.shareByWhatsapp(bitlyURL, 2).subscribe((data) => {
        if (data && data.hasOwnProperty("Short_Url")) {
          whatsappMessage = "";
          whatsappMessage = "Hi,\r\n" +
            "Please find below quotes for " + "*" + this.adult_count + " Adult + " + this.child_count + "* : \n";
          let msg = "";
          let benefitTypes = ['Hospitalization Expenses', 'Loss of Passport', 'Personal Liability', 'Trip Delay'];
          for (var key in this.compareList) {
            msg += "\n" +
              "*Insurer:* " + this.compareList[key].Insurer_Name + '\n' +
              "*Plan:* " + this.compareList[key].Plan_Name + '\n' +
              "*Insurance Cover:* " + this.compareList[key].Sum_Insured[0] + " " + (this.currency_format(this.compareList[key].Sum_Insured)) + '\n' +
              "*Premium:* " + '₹ ' + (this.currency_format(this.compareList[key].final_premium)) + " (Inc. GST)" + '\n' +
              '*-------FEATURES-------*' + '\n';
            if (this.compareList[key].benefit_list && this.compareList[key].benefit_list.length > 0) {
              benefitTypes.forEach((benefit, i) => {
                if (this.compareList[key].benefit_list[0][benefit] != 'NA' && this.compareList[key].benefit_list[0].hasOwnProperty(benefit)) {
                  msg += `*${benefit}:* ${this.compareList[key].benefit_list[0][benefit]}\n`;
                } else {
                  msg += `*${benefit}:* NA\n`
                }
              });
            } else {
              msg += "*Hospitalization Expenses:* " + 'NA' + '\n';
              msg += "*Loss of Passport:* " + 'NA' + '\n';
              msg += "*Personal Liability:* " + 'NA' + '\n';
              msg += "*Trip Delay:* " + 'NA' + '\n';
            }
          }
          whatsappMessage += `${msg}\n*Quotes Link*: "${data['Short_Url']}\n\n`;
          if (type === "send") {
            var WhatsappMessage = encodeURIComponent(whatsappMessage);
            window.open("https://api.whatsapp.com/send/?phone=91" + mobileNo + "&text=" + WhatsappMessage + "&app_absent=0");
          } else if (type === "copy") {
            this.copy(whatsappMessage);
          }
        } else {
          $('.shareError').show();
        }
      }, (erorr) => {
        console.log('erorr:', erorr);
        $('.shareError').show();
      })
    }
  };

  removeShareError() {
    $('#send_mobile').removeClass('ErrorMsg');
  }
  si_dropDown() {
    if (this.si_on) {
      this.slider_SI.forEach((element, i) => {
        if (element === this.si_checked) {
          $('#check-item-si-' + i).prop("checked", true);
        } else {
          $('#check-item-si-' + i).prop("checked", false);
        }
      });
    }
    else {
      $('.si_check').prop('checked', false);
    }
  }

  reset() {
    this.checked_insurer = [];
  }
  setcheckbox(value) {
    var checkEvent = (<HTMLInputElement>document.getElementById("check-item-in-" + value));
    if (checkEvent.checked == true && value == "all") {
      this.checked_insurer = [];
      this.checked_insurer = [...this.slider_ins_Id];
      console.log('this.checked_insurer:', this.checked_insurer);
    } else {
      if (checkEvent.checked == false && value == "all") {
        this.checked_insurer = [];
      }
      if (checkEvent.checked == true && value != 'all') {
        this.checked_insurer.push(value);
        if (this.slider_ins_Id.length == this.checked_insurer.length) {
          $('#check-item-in-all').prop('checked', true);
        } else {
          $('#check-item-in-all').prop('checked', false);
        }
      } else {
        this.checked_insurer.splice(this.checked_insurer.indexOf(value), 1);
        $('#check-item-in-all').prop('checked', false);
      }
    }
  }

  in_dropDown() {
    if (this.in_on) {
      if (this.in_checked.length == this.slider_ins_Id.length) {
        $('#check-item-in-all').prop('checked', true);
      } else {
        $('#check-item-in-all').prop('checked', false);
      }
      this.slider_ins_Id.forEach((element) => {
        if (this.in_checked.includes(element.toString())) {
          $('#check-item-in-' + element).prop("checked", true);
        } else {
          $('#check-item-in-' + element).prop("checked", false);
        }
      })
    } else {
      $('#check-item-in-all').prop('checked', false);
      $('.in_check').prop('checked', false);
    }
  }

  Ins_Filter_() {
    if (($('.si_check').is(':checked')) && ($('.in_check').is(':checked'))) {
      this.filter_on = true;
      this.filter_count = 0;
      this.si_on = true;
      this.in_on = true;
      this.si_checked = $('.si_check:checked').val();
      var selected_si = JSON.parse(this.si_checked.substring(1).toString());
      if (this.si_checked.includes('$')) {
        $('.selected_si').html('$' + selected_si.toLocaleString("en-IN"));
      } else {
        $('.selected_si').html('€' + selected_si.toLocaleString("en-IN"));
      }

      this.in_checked = $('.in_check:checked').map(function () { return $(this).val() }).get();
      var selected_si_lenght = this.in_checked.length;
      $('.selected_in').html(selected_si_lenght + ' Selected');
      const source = from(this.response_1);
      source.pipe(
        filter(member => this.in_checked.includes(member.Insurer_Id.toString()) && member.Sum_Insured == this.si_checked),
        toArray()
      ).subscribe(res => {
        this.filter_count += res.length;
        this.final_response = res;
        if (this.show_htl) {
          this.highToLow();
        } else {
          this.lowToHight();
        }
      })
    }
    else if (($('.si_check').is(':checked')) || ($('.in_check').is(':checked'))) {
      this.filter_on = true;
      this.filter_count = 0;
      this.si_checked = $('.si_check:checked').val();
      if (($('.si_check').is(':checked'))) {
        var selected_si = JSON.parse(this.si_checked.substring(1).toString());
        if (this.si_checked.includes('$')) {
          $('.selected_si').html('$' + selected_si.toLocaleString("en-IN"));
        } else {
          $('.selected_si').html('€' + selected_si.toLocaleString("en-IN"));
        }
        this.si_on = true;
      } else {
        $('.selected_si').html('Select');
        this.si_on = false;
      }
      this.in_checked = $('.in_check:checked').map(function () { return $(this).val() }).get();
      if (($('.in_check').is(':checked'))) {
        var selected_si_lenght = this.in_checked.length;
        $('.selected_in').html(selected_si_lenght + ' Selected');
        this.in_on = true;
      } else {
        $('.selected_in').html('Select');
        this.in_on = false;
      }

      const source = from(this.response_1);
      source.pipe(
        filter(member => this.in_checked.includes(member.Insurer_Id.toString()) || member.Sum_Insured == this.si_checked),
        toArray()
      ).subscribe(res => {
        this.filter_count += res.length;
        this.final_response = res;
        if (this.show_htl) {
          this.highToLow();
        } else {
          this.lowToHight();
        }
      })
    }
    else {
      this.si_on = false;
      this.in_on = false;
      this.filter_on = true;
      this.filter_count = 0;
      $('.selected_si').html('Select');
      $('.selected_in').html('Select');
      this.final_response = this.response_1;
      this.filter_count += this.final_response.length;
      if (this.show_htl) {
        this.highToLow();
      } else {
        this.lowToHight();
      }
    }
  }

  TripType(e, tripType) {
    if (tripType == 'SINGLE') {
      this.SingleTripType = true;
      this.MultiTripType = false;
      $('.single').show();
      $('.end_date').show();
      $('.maxtripdays_dropdown').hide();
      $('#trip_date').removeClass('ErrorMsg');
      $('#travel_return_date').removeClass('ErrorMsg');
      $('#travel_start_date').removeClass('ErrorMsg');
      $('#GeographicalArea').removeClass('ErrorMsg');

    } else {
      this.MultiTripType = true;
      this.SingleTripType = false;

      $('#GeographicalArea').val("");
      $('.single').hide();
      $('.destination').find('li').removeClass('active');
      $('.maxtripdays_dropdown').show();
      $('.end_date').hide();
      $('#trip_date').removeClass('ErrorMsg');
      $('#travel_return_date').removeClass('ErrorMsg');
      $('#travel_start_date').removeClass('ErrorMsg');
      $('#GeographicalArea').removeClass('ErrorMsg');
    }

  }
  validateTravel(e) {
    var isModify = false;
    var err = 0;
    var region = $('#GeographicalArea').val();
    var v_start_date = moment($("#travel_start_date").val()).format('YYYY-MM-DD');
    var v_end_date = moment($("#travel_return_date").val()).format('YYYY-MM-DD');
    var v_trip_type = $('.triptype:checked').val();
    var v_max_dur = $("#trip_date").val();
    if (region == this.travelling_to_area && v_start_date == this.Travel_start_date && v_trip_type == this.trip_type) {
      if (v_trip_type == 'SINGLE' && v_end_date == this.Travel_end_date) {
        isModify = false;
      } else if (v_trip_type == 'MULTI' && v_max_dur == this.maximum_duration) {
        isModify = false;
      } else {
        isModify = true;
      }
    } else {
      isModify = true;
    }
    if ($('#GeographicalArea').val() === null || $('#GeographicalArea').val() === '') {
      err++;
      $("#GeographicalArea").addClass('ErrorMsg');
    }
    if ($("#travel_start_date").val() === '') {
      err++;
      $("#travel_start_date").addClass('ErrorMsg');
    }
    if (($("#travel_return_date").val() === '' || $("#travel_return_date").val() === null) && $('.triptype:checked').val() == 'SINGLE') {
      err++;
      $("#travel_return_date").addClass('ErrorMsg');
    }
    if (($("#trip_date").val() === '' || $("#trip_date").val() === null) && $('.triptype:checked').val() == 'MULTI') {
      err++;
      $("#trip_date").addClass('ErrorMsg');
    }

    if (err == 0 && isModify) {
      $('.loading').show();
      this.premium_initiate();
    }
    else if (isModify == false) {
      $('#policyInfromationModal').modal('hide');
    }
    else {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  premium_initiate() {
    var edit_max_duration;
    var edit_trip_type = $('.triptype:checked').val();
    var edit_travel_start_date = $('#travel_start_date').val();
    // var destination =  $('#GeographicalArea').val() == "WorldWide Excl. US/Canada" ? "WWExUSCanada" : destination;
    var destination = $('#GeographicalArea').val();
    if (edit_trip_type === "SINGLE") {
      var edit_travel_end_date = $('#travel_return_date').val();
      edit_max_duration = "0";
    } else {
      edit_travel_end_date = "";
      edit_max_duration = $('#trip_date').val().split('-')[1];
    }
    var post_keys = {
      "city_id": '',
      "client_name": "",
      "client_id": '',
      "client_key": "",
      "secret_key": "",
      "ip_address": '',
      "ip_city_state": '',
      "geo_long": '',
      "geo_lat": '',
      "ss_id": '',
      "fba_id": '',
      "sub_fba_id": '',
      "agent_source": '',
      "member_count": '',
      "adult_count": '',
      "child_count": '',
      "member_6_relation": "",
      "member_6_birth_date": '',
      "member_6_gender": "",
      "member_5_relation": "",
      "member_5_birth_date": '',
      "member_5_gender": "",
      "member_4_relation": "",
      "member_4_birth_date": '',
      "member_4_gender": "",
      "member_3_relation": "",
      "member_3_birth_date": '',
      "member_3_gender": "",
      "member_2_relation": "",
      "member_2_birth_date": '',
      "member_2_gender": "",
      "member_1_relation": "",
      "member_1_birth_date": '',
      "member_1_gender": "M",
      "mobile": '',
      "email": '',
      "contact_name": '',
      "travel_insurance_si": "0",
      "travelling_to_area": '',
      "travel_start_date": '',
      "travel_end_date": '',
      "maximum_duration": '',
      "travel_insurance_type": '',
      "trip_type": '',
      "execution_async": "",
      "method_type": "",
      "product_id": "",
      "insurer_selected": "",
      "utm_source": "",
      "app_version": "PolicyBoss.com"
    }
    var post = {};
    for (const [key] of Object.entries(post_keys)) {
      post[key] = this.summary['Request_Core'][key];
    }
    post['crn'] = this.pb_crn;
    post["ss_id"] = this.RequestCore.hasOwnProperty('ss_id') && this.RequestCore['ss_id'] !== "" && this.RequestCore['ss_id'] !== null && this.RequestCore['ss_id'] !== undefined && this.RequestCore['ss_id'] !== 0 ? this.RequestCore['ss_id'] : this.ss_id;
    post["fba_id"] = this.RequestCore.hasOwnProperty('fba_id') && this.RequestCore['fba_id'] !== "" && this.RequestCore['fba_id'] !== null && this.RequestCore['fba_id'] !== undefined && this.RequestCore['fba_id'] !== 0 ? this.RequestCore['fba_id'] : this.fba_id;
    post["sub_fba_id"] = this.RequestCore.hasOwnProperty('sub_fba_id') && this.RequestCore['sub_fba_id'] !== "" && this.RequestCore['sub_fba_id'] !== null && this.RequestCore['sub_fba_id'] !== undefined ? this.RequestCore['sub_fba_id'] : this.sub_fba_id ? this.sub_fba_id : 0;
    post["ip_address"] = this.ip_address;
    post["geo_lat"] = this.geo_lat;
    post["geo_long"] = this.geo_long;
    post["ip_city_state"] = this.ip_city_state;
    post["app_version"] = this.app_version.includes('policyboss-') ? 'policyboss-' : 'PolicyBoss.com';
    post["trip_type"] = edit_trip_type;
    post["maximum_duration"] = edit_max_duration;
    post["travel_start_date"] = moment(edit_travel_start_date).format('YYYY-MM-DD');
    if (edit_trip_type == 'SINGLE') {
      post["travel_end_date"] = moment(edit_travel_end_date).format('YYYY-MM-DD');
    } else {
      post["travel_end_date"] = edit_travel_end_date;
    }
    post["travelling_to_area"] = destination;
    post["visitor_id"] = this.visitor_id ? this.visitor_id : "";
    post['ui_source'] = "UI22";

    if (this.mac_address) {
      post['mac_address'] = this.mac_address;
    }
    if (this.utm_source != '' && this.utm_source != null) { post["utm_source"] = this.utm_source; }
    if (this.utm_medium != '' && this.utm_medium != null) { post["utm_medium"] = this.utm_medium; }
    if (this.utm_campaign != '' && this.utm_campaign != null) { post["utm_campaign"] = this.utm_campaign; }
    if (this.campaign_id != '' && this.campaign_id != null) { post["campaign_id"] = this.campaign_id; }
    // console.log('premium_initiate =>', post);


    var method_name = '/quote/premium_initiate';
    this.service.callAPIPost(post, method_name, 2).subscribe(data => {
      // console.log(data);
      if (data !== null && data['Msg'] !== "Not Authorized") {
        if ((data.hasOwnProperty("Details")) && ((data.hasOwnProperty("Summary")) ? ((data['Summary'].hasOwnProperty("Request_Unique_Id")) || (data['Summary'].Request_Unique_Id == "")) : true)) { }
        else {
          // console.log(data);
          var srn = data['Summary']['Request_Unique_Id'];
          if ((this.app_version && this.app_version.includes('policyboss-')) && (this.ss_id !== null && this.ss_id !== undefined && this.ss_id !== 0 && this.fba_id !== "" && this.fba_id !== undefined && this.fba_id !== "0" && this.app_version !== "" && this.app_version !== undefined && this.app_version !== "0")) {
            window.location.href = window.location.origin + window.location.pathname + '?SID=' + srn + '&ClientID=2' + "&ss_id=" + this.ss_id + "&fba_id=" + this.fba_id + "&sub_fba_id=" + this.sub_fba_id + "&ip_address=" + this.ip_address + "&mac_address=" + this.mac_address + "&app_version=" + this.app_version + "&product_id=" + this.ProductID;
            $('.loading').hide();

          }
          else {
            window.location.href = window.location.origin + '/travel-insurance/quotes?SID=' + srn + '&ClientID=2';
            $('.loading').hide();

          }
        }
      }
    }, (error) => {
      console.log(error);
    })
  };

  getMaxDateRange(max) {
    if (max == '30') {
      return '0-30';
    }
    else if (max == '45') {
      return '30-45';
    }
    else if (max == '60') {
      return '45-60';
    }
    else if (max == '60') {
      return '60-90';
    }
  }
  editPopup() {
    $('#GeographicalArea').val(this.travelling_to_area);
    $('#travel_start_date').val(moment(this.Travel_start_date, 'YYYY-MM-DD').format('DD-MMM-YYYY'));
    if (this.trip_type == 'SINGLE') {
      this.SingleTripType = true;
      this.MultiTripType = false;
      $('.single').show();
      $('.end_date').show();
      $('.maxtripdays_dropdown').hide();
      $('#travel_return_date').val(moment(this.Travel_end_date, 'YYYY-MM-DD').format('DD-MMM-YYYY'));
    } else {
      this.SingleTripType = false;
      this.MultiTripType = true;
      $('.single').hide();
      $('.maxtripdays_dropdown').show();
      $('.end_date').hide();
      $('#trip_date').val(this.getMaxDateRange(this.maximum_duration));
    }
  }

  proposal_redirect(arn) {
    window.location.href = window.location.origin + '/travel-insurance/proposal' + '?client_id=2&arn=' + arn + '&is_posp=NonPOSP&ss_id=' + this.ss_id;
  }

  copy(test) {
    console.log('copy it:', test);

    navigator['clipboard'].writeText(test);
  }

 async AllBenefits(insurer){
      console.log('AllBenefits:',insurer);
      this.Insurer_Logo_Name_pd = insurer.Insurer_Logo_Name.split('.')[0] + '.webp';
      this.Sum_Insured_format_pd = insurer.Sum_Insured.includes("$")===true?'$':'€';
      this.Sum_Insured_pd = insurer.Sum_Insured;
      this.service_log_id = insurer.Service_Log_Unique_Id.split('_')[1];
      this.arn_pd = insurer.Service_Log_Unique_Id;
      this.plan_name_pd = insurer.Plan_Name;
      this.Insurer_Name_pd = insurer.Insurer_Name;
      this.final_premium_pd = insurer.Premium_Breakup.final_premium;
      this.net_premium_pd = insurer.Premium_Breakup.net_premium;
      this.service_tax_pd = insurer.Premium_Breakup.service_tax;
      this.benefitList_pd = await this.compareBenefit(insurer.Insurer_Id, insurer.Plan_Id, this.travelling_to_area, this.travel_insurance_type, this.trip_type,'pd').catch((error) => {
        console.log('AllBenefits:',error);
      });
       console.log('benefitList',this.benefitList_pd[0])
            //  console.log('benefitList',this.benefitList_pd[0]);
            var insurerbenefits
        if(this.benefitList_pd[0]){

           insurerbenefits =  Object.entries(this.benefitList_pd[0]);
        }else{
          insurerbenefits =[]
        }
      //  insurerbenefits.forEach((res) => {
      //   res[0] = res[0].replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ' ');
      // });
      
    this.BenefitsDetails = insurerbenefits;
  }
  
}
