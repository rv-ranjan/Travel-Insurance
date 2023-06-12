import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Location } from '@angular/common';
import { addDays, addMonths, addYears, getDate } from '@progress/kendo-date-math';
import { HorizonApiService } from '../horizon-api.service';
import { environment } from '../../environments/environment';
import { FormGroup, Validators, FormBuilder, EmailValidator } from '@angular/forms';
declare var $: any;
// declare var Android :any;
declare var upload_document: any;
@Component({
  selector: 'app-proposal-summary',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './proposal-summary.component.html',
  styleUrls: ['./proposal-summary.component.css']
})
export class ProposalSummaryComponent implements OnInit {
  @Input() inputFromParent: any;
  @Input() appVisitorData: any;
  url: string;
  is_posp: string = "";
  gender: string;
  mobile: string;
  relation: string;
  date_of_birth: string;
  email: string;
  pan_card: string;
  nominee_name: string;
  nominee_first_name: string;
  nominee_last_name: string;
  city: string;
  state: string;
  region: string;
  app_version: string = "";
  msg: string;
  created_on: string;
  current_time: string;
  ErrMsg: string;
  origin_url: string;
  eKYCfile_name: string;
  child_count: number;
  ss_id: number;
  member_count: number;
  Insurer_ID: number;
  CRN: number;
  ProductID: number;
  Final_Insurance_cover: number;
  IsError: boolean;
  OnlineAgreement_trip: boolean;
  dataStatusSuccess: boolean;
  PaymentLinkSend: boolean;
  show: boolean = true;
  loader: boolean = false;
  proposal_data: boolean = false;
  OnlineAgreement: boolean = false;
  showApp_version: boolean = false;
  opted_whatsapp: boolean = false;
  send_link: boolean = false;
  TermsForDigit: boolean = false;
  create_kyc_popup: Boolean = false;
  error_popup: Boolean = false;
  show_kyc_now: Boolean = false;
  success_popup: Boolean = false
  proceed_transaction: Boolean = false;
  fba_id: any;
  client_id: any;
  arn: any;
  ReqObj: any = {};
  Summary: any = {};
  contact_name: any;
  Proposal_Request: any = {};
  insurer_data: any = [];
  adult_count: any;
  permanent_address_1: any;
  permanent_address_2: any;
  permanent_address_3: any;
  permanent_pincode: any;
  member_name_adult: any = {};
  member_name_child: any = {};
  nominee_birth_date: any;
  insurer_json: any;
  Visiting_Countries: any = [];
  uploadedeKYCFile: any[] = [''];
  _nominee_relation: any;
  Same_As_nominee: any;
  Travel_purpose: any;
  final_premium: any;
  Insurance_cover: any;
  Insurer_logo: any;
  Final_insure_price: any
  net_premium: any;
  service_tax: any;
  srn: any;
  ip_address: any;
  geo_long: any;
  ip_city_state: any;
  sum_insured: any;
  isTopup: any;
  topupType: any;
  ElectronicPolicy: any;
  utm_source: any;
  utm_campaign: any;
  utm_medium: any;
  campaign_id: any;
  policy_tenure: any;
  geo_lat: any;
  whatsapp_mobile: any;
  error_message: any;
  Insurer_cover: any;
  existingDiseases: any = [];
  relation_with_insured: any;
  verify: any;
  question_1: any;
  question_2: any;
  Diseases: any = [];
  question_101: any;
  question_901: any;
  question_902: any;
  question_T002: any;
  question_T001: any;
  salutation: any;
  Insurer_Name: any;
  Plan_Name: any;
  Quote_Request: any;
  travel_insurance_type: any;
  short_url: any;
  OtpMobileNo = '';
  IsCustomer: any;
  Plan_occupation: any[];
  kycNameSalutationArray = ['MR', 'MISS', 'MISSES'];
  state_code: any;
  city_code: any;
  locality_code: any;
  _district_code: any;
  city_id: any;
  member_1_gender: any;
  member_2_gender: any;
  member_3_gender: any;
  member_4_gender: any;
  member_6_gender: any;
  member_5_gender: any;
  member_1_occupation: any;
  member_2_occupation: any;
  member_3_occupation: any;
  member_4_occupation: any;
  member_5_occupation: any;
  member_6_occupation: any;
  nominee_relation_val: any;
  salutation_json: any;
  Currency_symbol: any;
  trip_type: any;
  travelling_to: any;
  TravelStartDate: any;
  TravelEndDate: any;
  max_days: any;
  firstname: any;
  summary: Object;
  public _occupation: string;
  public Insurer_Code: string;
  public adult_members: Number[];
  public child_members: Number[];
  completeAddress: any;
  question_1101: any;
  Travel_purpose_json: any;
  Physician_name: any;
  Physician_number: any;
  question_903: any;
  redirect_url: any;
  kyc_full_name: any;
  file_name: any;
  dropdown_value: any;
  file_reader: any;
  event_val: any;
  create_kyc_data: any;
  eKycAadharDoc_file: any;
  showeKyc = false;
  alerted: boolean;
  kyc_no: any;
  Kyc_Redirect_Link: any;
  kyc_ref_no: any = "";
  ckyc_remarks: any;
  is_kyc_verified: boolean = false;
  ekycSearchType: string;
  eKycPanDoc_file: any;
  middle_name: any;
  last_name: any;
  first_name: any;
  Travel_purpose_value: any;
  request: any;
  doc_url: any = null;
  is_direct_proposal: boolean = false;
  directKyc: boolean = false;
  policynumber: any;
  pg_url: any;
  throughCreateButton = false;
  quote_day: string;
  quote_time: string;
  quote_date: string;
  current_date: string;
  current_day: string;
  // liveOnly: boolean = true;
  kyc_document_types = [];
  agent_name: any;
  agent_mobile: any;
  show_agent: boolean;
  agent_email: any;
  sub_fba_id: any;
  visitor_id: any;
  pan_saved_via_android = false;
  aadhar_saved_via_android = false;
  doc_saved_via_android = false;
  current_doc_field;
  question_101_code: any;
  otherDetails: any;
  visaType: any;
  visiting_city: any;
  proposal_details_res: any;
  query_params: string = "";



  constructor(private ActivatedRoute: ActivatedRoute, private fb: FormBuilder ,private location: Location, private _horizon: HorizonApiService, private _route: Router) { }

  ngOnInit() {

    this.inputFromParent = this.inputFromParent == undefined ? '' : this.inputFromParent;
    this.appVisitorData = this.appVisitorData == undefined ? '' : this.appVisitorData;

    $(".select-dropdown-box-li a").click(function () {
      var selText = $(this).text();
      $(this).closest('.input-field-box').find('.select-dropdown').val(selText);
    });

    $('.dropdown-list-col').click(function () {
      $('.dropdown-list-col').removeClass('active');
      $(this).addClass('active');
      $('.sort-dropdown-box').removeClass('show');
      $('.sort-dropdown-toggle').removeClass('show');
    });

    $(".ekycDob").datepicker({
      format: "dd-mm-yyyy",
      todayHighlight: true,
      autoclose: true,
      startView: 2,
      yearRange: "-4:+0",
      changeYear: true,
      changeMonth: true,
    });
    // setTimeout(() => {
    //   if (this.inputFromParent.hasOwnProperty('ss_id') && this.inputFromParent.ss_id != "") {
    //     // if(this.ss_id==0){

    //     // }
    //     this.ss_id = this.inputFromParent.ss_id;
    //     if (this.ss_id > 0) {
    //       this.location.replaceState(`proposal-summary?client_id=2&arn=${this.arn}&is_posp=NonPOSP&ss_id=${this.ss_id}`);
    //     }
    //     this.agent_name = this.inputFromParent['agent_name'];
    //     this.agent_email = this.inputFromParent['agent_email'];
    //     this.agent_mobile = this.inputFromParent['agent_mobile'];
    //     this.show_agent = true;
    //     this.fba_id = this.inputFromParent.fba_id;
    //     this.sub_fba_id = this.inputFromParent.sub_fba_id;
    //     // $(".Car a").attr('href', '/car-insurance');
    //     // $(".Bike a").attr('href', '/two-wheeler-insurance');
    //     // $(".CV a").attr('href', '/commercial-vehicle-insurance');
    //     // $(".Health a").attr('href', '/commercial-vehicle-insurance');
    //   }
    //     this.ss_id > 0 ? this.show = true : this.show = false;

    //   if (this.appVisitorData.hasOwnProperty('visitor_id') && this.appVisitorData.visitor_id != "") {
    //     this.visitor_id = this.appVisitorData.visitor_id;
    //   }
    //   this.getApilog(this.arn)
    // }, 100);


    this.origin_url = window.location.origin;
    this.loader = true;
    this.url = window.location.href;
    this.url = this.url.substring(0, this.url.lastIndexOf("=") + 1) + 0;
    this.ActivatedRoute.queryParams.subscribe(params => {
      this.client_id = params['client_id'];
      this.arn = params['arn'];
      this.is_posp = params['is_posp'];
      this.ss_id = params['ss_id'];

      this.ss_id > 0 ? this.show = true : this.show = false;
      if (this.arn) {

        this.getApilog(this.arn)
      }
    });

    // setTimeout(() => {

    // }, 1000);

    // this.getApilog(this.arn)
    //Custome Language Dropdown Select Bootstrap
    // $(".select-dropdown-box-li a").click(function () {
    //   var selText = $(this).text();
    //   $(this).closest('.input-field-box').find('.select-dropdown').val(selText);
    //   $(this).closest('.input-field-box').find('.select-dropdown').removeClass('show');
    //   $(this).closest('.input-field-box').find('.select-dropdown-box').removeClass('show');
    //   $(this).closest('.input-field-box').find('.select-dropdown-box-li').toggleClass('active');
    // });

    // $(".select-dropdown-box-li a").click(function () {
    //   var selText = $(this).text();
    //   $(this).closest('.input-field-box').find('.select-dropdown').val(selText);
    // $(this).closest('.input-field-box').find('.select-dropdown').removeClass('show');
    // $(this).closest('.input-field-box').find('.select-dropdown-box').removeClass('show');
    // });

    $('#close_button').click(function () {
      $('#KYC_popup').modal('hide');
    })
    $('#premium_breakup').click(function () {
      $('#remove').toggleClass('hidden-section');
    })

    $('.view-info-btn').click(function () {
      $('.summary-info-wrapper').toggleClass('btn-hidden');
      $('.policy-detail-modal .policy-info-listing').toggleClass('btn-hidden');
      $(this).text(($(this).text() == 'Hide Info' ? 'View Info' : 'Hide Info')).toggleClass("active");
    });

    if ($(window).width() > 992) {
      $('#car-proosal-detail-box').find('.summary-info-wrapper').removeClass('btn-hidden');
    }
    $('.show-detail').click(function () {
      $(this).text(($(this).text() == 'Hide Price Breakup' ? 'Show Price Breakup' : 'Hide Price Breakup')).toggleClass("active");
    })

    $('.kycDocumentInput').on('click', (e) => {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        this.current_doc_field = e.currentTarget.id;
        var err = 0;
        let document_id
        let DrivingLicenseRegex = new RegExp('^(([a-zA-Z]{2}[0-9]{2})|([a-zA-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$');
        let VoterIDRegex = new RegExp('^[a-zA-Z]{3}[0-9]{7}$');
        let PassportRegex = new RegExp('^[a-zA-Z][1-9]\\d\\s?\\d{4}[1-9]$');
        let UIDRegex = new RegExp('^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$');
        let NREGAJobCardRegex = new RegExp('^([a-zA-Z]{2}[0-9]{2}[0-9]{3}[0-9]{3}[0-9]{3}[0-9]+?)$');
        let GSTINRegex = new RegExp('^[0-9]{2}[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9A-Za-z]{1}Z[0-9A-Za-z]{1}$');
        let CKYCNumberRegex = '';
        if (this.ekycSearchType !== undefined && this.ekycSearchType !== '' && this.ekycSearchType !== null) {
          $('#ekycSearchTypeErr').html('');
          $('#ekycSearchType').removeClass('has-error', 'border-thick');
          if (this.Insurer_ID === 1 && this.ekycSearchType !== 'Pan' && this.ekycSearchType !== 'Aadhar') {
            let selectedDoctypeVal = $('#bajaj_DocNumber').val();
            if ((this.ekycSearchType + 'Regex')) {
              if (selectedDoctypeVal && selectedDoctypeVal.match(eval(this.ekycSearchType + 'Regex'))) {
                $('#bajaj_DocNumber').removeClass('has-error', 'border-thick');
                $('#ekycMobile-error').html('');
                $('#ekycBajaj' + this.ekycSearchType + 'Err').html('');
                document_id = $('#bajaj_DocNumber').val();
                // this.doc_saved_via_android = true;
              }
              else {
                $('#bajaj_DocNumber').addClass('has-error', 'border-thick');
                err++;
                $('#ekycBajaj' + this.ekycSearchType + 'Err').html('Enter Valid ' + this.ekycSearchType + ' Number');
              }
            } else {
              if (selectedDoctypeVal) {
                $('#bajaj_DocNumber').removeClass('has-error', 'border-thick');
                $('#ekycBajaj' + this.ekycSearchType + 'Err').html('');
              } else {
                $('#bajaj_DocNumber').addClass('has-error', 'border-thick');
                err++;
                $('#ekycBajaj' + this.ekycSearchType + 'Err').html('Enter ' + this.ekycSearchType + ' Number');
              }
            }
          }
          if (this.Insurer_ID === 26 && this.ekycSearchType !== 'Pan' && this.ekycSearchType !== 'Aadhar') {
            let selectedDoctypeVal = $('#star_DocNumber').val();
            if ((this.ekycSearchType + 'Regex')) {
              if (selectedDoctypeVal && selectedDoctypeVal.match(eval(this.ekycSearchType + 'Regex'))) {
                $('#star_DocNumber').removeClass('has-error', 'border-thick');
                $('#ekycMobile-error').html('');
                $('#ekycStar' + this.ekycSearchType + 'Err').html('');
                document_id = $('#star_DocNumber').val();
                // this.doc_saved_via_android = true;
              }
              else {
                $('#star_DocNumber').addClass('has-error', 'border-thick');
                err++;
                $('#ekycStar' + this.ekycSearchType + 'Err').html('Enter Valid ' + this.ekycSearchType + ' Number');
              }
            } else {
              if (selectedDoctypeVal) {
                $('#star_DocNumber').removeClass('has-error', 'border-thick');
                $('#ekycStar' + this.ekycSearchType + 'Err').html('');
              } else {
                $('#star_DocNumber').addClass('has-error', 'border-thick');
                err++;
                $('#ekycStar' + this.ekycSearchType + 'Err').html('Enter ' + this.ekycSearchType + ' Number');
              }
            }
          }
          if ((this.ekycSearchType == 'Aadhar' || this.ekycSearchType == 'Both') || (e.currentTarget.id === 'eKycAadharDoc' && (this.ekycSearchType == 'Aadhar' || this.ekycSearchType == 'Both'))) {
            var aadharNoPattern = /^\d{12}$/;
            if ($('#ekycAadhar').val().match(aadharNoPattern) != null) {
              $('#ekycAadhar').removeClass('has-error', 'border-thick');
              $('#ekycAadharErr').html('');
              document_id = $('#ekycAadhar').val();
              // this.aadhar_saved_via_android = true;
            } else {
              $('#ekycAadhar').addClass('has-error', 'border-thick');
              err++
              $('#ekycAadharErr').html('Enter valid aadhar number');
            }
          }
          if ((this.ekycSearchType == 'Pan' || this.ekycSearchType == 'Both') || (e.currentTarget.id === 'eKycPanDoc' && (this.ekycSearchType == 'Pan' || this.ekycSearchType == 'Both'))) {
            var pan = $("#ekycPan").val().toString().toUpperCase();
            var pattern = /[a-zA-Z]{3}[PCHFATBLJG]{1}[a-zA-Z]{1}[0-9]{4}[a-zA-Z]{1}$/;
            if (pan.match(pattern) != null) {
              if (this.summary['Proposal_Request']['pan']) {
                if (pan.toUpperCase() == this.summary['Proposal_Request']['pan'].toUpperCase()) {
                  $("#ekycPan").removeClass('has-error', 'border-thick');
                  $('#ekycPanErr').html('');
                  document_id = $('#ekycPan').val();
                  // this.pan_saved_via_android = true;
                } else {
                  $("#ekycPan").addClass('has-error', 'border-thick');
                  err++;
                  $('#ekycPanErr').html('PAN number differs from proposal form.');
                }
              } else {
                $("#ekycPan").removeClass('has-error', 'border-thick');
                $('#ekycPanErr').html('');
              }
            } else {
              $("#ekycPan").addClass('has-error', 'border-thick');
              err++;
              $('#ekycPanErr').html('Enter valid PAN number');
            }
          }
          if ($('#ekycDob').val() == '' || $('#ekycDob').val() == null || $('#ekycDob').val() == undefined) {
            $('#ekycDob').addClass('has-error', 'border-thick');
            err++;
            if (this.summary['Quote_Request'].vehicle_registration_type.toLowerCase() === "corporate") {
              $('#ekycDobErr').html('Enter date of incorporation');
            } else {
              $('#ekycDobErr').html('Enter date of birth');
            }
          } else {
            $('#ekycDob').removeClass('has-error', 'border-thick');
            $('#ekycDobErr').html('');
          }
        }
        if (err === 0) {
          upload_document(this.CRN, document_id, this.ekycSearchType, this.Insurer_ID);
        }
      };
    });


  };

  getApilog(arn) {
    var post_arn = {
      'api_reference_number': arn
    }
    var method_name = '/quote/api_log_summary';
    this._horizon.callAPIPost(post_arn, method_name, 2).subscribe(
      data => {
        this.summary = data;
        this.loader = false;
        this.ReqObj = data;
        this.Proposal_Request = data["Proposal_Request"];
        this.Summary = data["Summary"];
        this.Insurer_ID = data["PB_Master"]["Insurer"]["Insurer_ID"];
        if (this.Insurer_ID == 34) {
          $('.trip_hide').removeClass('hidden');
        }
        this.geo_lat = data['Proposal_Request']['geo_lat'];
        this.geo_long = data['Proposal_Request']['geo_long'];
        this.ip_address = data['Proposal_Request']['ip_address'];
        this.app_version = data['Proposal_Request']['app_version'];
        this.contact_name = data['Proposal_Request']['contact_name'];
        // this.firstname = this.contact_name.split(' ')[0];
        var contact_name_arr = this.contact_name.split(" ");
        this.first_name = contact_name_arr[0];
        this.middle_name = (contact_name_arr.slice(1, (contact_name_arr.length) - 1)).join(" ");
        this.last_name = contact_name_arr.length >= 2 ? contact_name_arr[(contact_name_arr.length) - 1] : "";

        // contact_name_arr.pop()
        // contact_name_arr.shift()
        // if (contact_name_arr.length >= 2) {
        //   this.middle_name = contact_name_arr.join(" ")
        // } else {
        //   this.middle_name = contact_name_arr.join("")
        // }
        this.Proposal_Request['first_name'] = this.first_name;
        this.Proposal_Request['middle_name'] = this.middle_name;
        this.Proposal_Request['last_name'] = this.last_name;
        this.gender = data['Proposal_Request']['gender'];
        this.Visiting_Countries = data['Proposal_Request']['visiting_countries'];
        this.visiting_city = data['Proposal_Request']['visiting_city'];
        this.city = data['Proposal_Request']['city'];
        this.state = data['Proposal_Request']['state'];
        this.region = data['Proposal_Request']['travelling_to_area'];
        this.final_premium = data['Last_Premium_Response']['final_premium'];
        this.CRN = data['Proposal_Request']['crn'];
        this.Insurance_cover = (data['Last_Premium_Response']['travel_insurance_si']).substring(1);
        this.Final_Insurance_cover = parseInt(this.Insurance_cover);
        this.Currency_symbol = (data['Last_Premium_Response']['travel_insurance_si']).substring(0, 1);
        this.Insurer_logo = data["PB_Master"]["Insurer"]["Insurer_Logo_Name"] == "" ? "" : (data["PB_Master"]["Insurer"]["Insurer_Logo_Name"].split(".")[0]);
        this.net_premium = data['Last_Premium_Response']['net_premium'];
        this.service_tax = data['Last_Premium_Response']['service_tax'];
        this.travel_insurance_type = data['Last_Premium_Response']['travel_insurance_type'];
        this.srn = data['Proposal_Request']['search_reference_number'];
        this.ElectronicPolicy = data['Proposal_Request']['electronic_policy'];
        this.whatsapp_mobile = data['Proposal_Request']['whatsapp_mobile'];
        this.question_T001 = data['Proposal_Request']['question_T001_details'];
        this.nominee_relation_val = data['Proposal_Request']['nominee_relation'];
        this.question_1 = data['Proposal_Request']['question_1_details'];
        this.question_101 = data['Proposal_Request']['question_101_details'];
        this.question_901 = data['Proposal_Request']['question_901_details'];
        this.question_902 = data['Proposal_Request']['question_902_details'];
        this.question_903 = data['Proposal_Request']['question_903_details'];
        this.question_1101 = data['Proposal_Request']['question_1101_details'];
        this.question_T002 = data['Proposal_Request']['question_T002_details'];
        this.Plan_Name = data['Summary']['Plan_Name'];
        this.Quote_Request = data['Quote_Request'];
        this.ProductID = data['Proposal_Request']['product_id'];
        this.member_1_gender = data['Proposal_Request']['member_1_gender'];
        this.member_2_gender = data['Proposal_Request']['member_2_gender'];
        this.member_3_gender = data['Proposal_Request']['member_3_gender'];
        this.member_4_gender = data['Proposal_Request']['member_4_gender'];
        this.member_5_gender = data['Proposal_Request']['member_5_gender'];
        this.member_6_gender = data['Proposal_Request']['member_6_gender'];
        this.trip_type = data['Proposal_Request']['trip_type'];
        this.travelling_to = data['Proposal_Request']['travelling_to_area'];
        this.TravelStartDate = data['Proposal_Request']['travel_start_date'];
        this.TravelStartDate = moment(this.TravelStartDate, 'YYYY-MM-DD').format('MMM DD, YYYY');
        this.TravelEndDate = data['Proposal_Request']['travel_end_date'];
        this.TravelEndDate = moment(this.TravelEndDate, 'YYYY-MM-DD').format('MMM DD, YYYY');
        this.max_days = data['Proposal_Request']['maximum_duration'];
        this.relation = data['Proposal_Request']['relation'];
        var date = this.Summary['Created_On']
        var formated_date = this.Summary['Created_On'].split('T')[0];
        this.quote_day = moment(formated_date, "YYYY-MM-DD").format('ddd');
        this.quote_date = moment(formated_date, "YYYY-MM-DD").format('MMM DD');
        this.quote_time = moment(date, "YYYY-MM-DD HH:mm:ss").format('HH:mm:ss');
        this.current_time = moment().format('HH:mm:ss');
        this.current_date = moment().format('MMM DD');
        this.current_day = moment().format('ddd');
        if (data['Quote_Request'] && data['Quote_Request'].hasOwnProperty('app_version') && (data['Quote_Request']['app_version'].includes('policyboss-')||data['Quote_Request']['app_version'].includes('IMAGIC_APP'))) {
          $('.mainHeader').hide();
          if(data['Quote_Request'].hasOwnProperty('query_params')){
            this.query_params = data['Quote_Request']['query_params'];
            // this.query_params = 'ss_id=16114&fba_id=68219&ip_address=10.0.3.64&mac_address=10.0.3.64&app_version=IMAGIC_APP';
        }
        }
        // if ((environment.horizon_http_url).includes('qa') && this.Insurer_ID == 44) {
        //   this.liveOnly = false;
        // }
        // else {
        //   this.liveOnly = true;
        // }
        $('#contact_name').val(this.contact_name)
        $('#contact_name').html(this.contact_name)
        if (this.show == true) {
          $('#Send_Payment_Link').removeClass('hidden');
          $('#agreement').hide();
          $('#Online_Payment').hide();
          this.IsCustomer = false;
        }
        else if (this.show == false) {
          $('#Online_Payment').show();
          $('#agreement').show();
          this.IsCustomer = true;
        }
        this._horizon.getInsurerData('KYCEligiblityList').subscribe(
          data => {
            var insurers = [];
            if (window.location.href.includes('qa-www.policyboss.com') || window.location.href.includes('localhost')) { 
              insurers = data[0]["insurers_QA"];
            } else {
              insurers = data[0]["insurers_LIVE"];
            }
            insurers.forEach((insurer) => {
              if (insurer['id'] == this.Insurer_ID) {
                if (insurer['is_active'] == 1) {
                  this.showeKyc = true;
                }
                if (insurer['is_direct_proposal'] == 1) {
                  this.is_direct_proposal = true;
                }
                if (insurer.hasOwnProperty('document_type') && insurer['document_type']) {
                  this.kyc_document_types = insurer['document_type'];
                }
              }
            });
            if (this.showeKyc) {
              if (this.Insurer_ID == 44 && this.show == false) {
                $('.ekycCheckBox,#erreKycNo').hide();
                $('#Online_Payment').hide();
                // $('.CreateKycDiv').show();
                $('.kycNameMismatch').show().html('KYC Required KYC is now Mandatory as per new IRDA Guidelines, since we did not find your existing KYC with your PAN and DOB, you will need to create New KYC... You will now be redirected to Insurer Portal for Creation of New KYC');
                $('.alertCreateKycBtn').show();
                $('.alertOkBtn').hide();
                // $('#triggerAlert').trigger('click');
                $('#alertModel').modal('show');
                this.showeKyc = false;
                $('.eKycDocLabelPan').html('Upload Profile Picture:')
              } else {
                this.call_saveKycDetails();
                $('.ekycCheckBox').show();
              }
            } else {
              $('.ekycCheckBox,#erreKycNo').hide();
              // if(this.Insurer_ID == 44){
              //   $('.payment_btn').hide();
              //   $('.CreateKycDiv').show();
              // }
            }
          }, error => {
            alert('This page needed some reload!');
            window.location.reload();
          });


        if (this.gender == "M") {
          this.gender = "Male";
        }
        else if (this.gender == "F") {
          this.gender = "Female";
        }
        this.mobile = data['Proposal_Request']['mobile'];
        this.completeAddress = data['Proposal_Request']['completeAddress'];
        this.permanent_address_1 = data['Proposal_Request']['permanent_address_1'];
        this.permanent_address_2 = data['Proposal_Request']['permanent_address_2'];
        this.permanent_address_3 = data['Proposal_Request']['permanent_address_3'];
        this.permanent_pincode = data['Proposal_Request']['permanent_pincode'];
        this.date_of_birth = moment(data['Proposal_Request']['birth_date'], 'YYYY-MM-DD').format('DD MMM YYYY');
        this.email = data['Proposal_Request']['email'];
        this.pan_card = data['Proposal_Request']['pan'];
        $('#whatsappMblNo').val(this.mobile);


        this.adult_count = data['Proposal_Request']['adult_count'];
        this.child_count = data['Proposal_Request']['child_count'];
        this.member_count = data['Proposal_Request']['member_count'];
        // this._occupation = data['Proposal_Request']["_occupation"];
        this.adult_members = Array.from(Array(this.adult_count - 0).keys());
        this.child_members = Array.from(Array(this.child_count - 0).keys());
        this.nominee_name = data['Proposal_Request']['nominee_name'];
        // this.nominee_first_name = this.nominee_name.split(" ")[0];
        // this.nominee_last_name = this.nominee_name.split(" ")[1];
        this.nominee_birth_date = data['Proposal_Request']['nominee_birth_date'] ? moment(data['Proposal_Request']['nominee_birth_date'], 'YYYY-MM-DD').format('DD MMMM YYYY') : ""
        this.Same_As_nominee = data['Proposal_Request']['same_as_for_nominee'];
        this.Travel_purpose = data['Proposal_Request']['otherDetailsData'];

        if (this.Same_As_nominee == true) {
          this.Same_As_nominee = "yes"
        }
        else if (this.Same_As_nominee == false) {
          this.Same_As_nominee = "no"
        }

        this.Insurer_Code = data["PB_Master"]["Insurer"]["Insurer_Code"];
        this.Insurer_Name = data["PB_Master"]["Insurer"]["Insurer_Name"];
        this.GetJsondata(data["Proposal_Request"]);

        if (this.Insurer_ID == 34 || this.Insurer_ID == 5 || this.Insurer_ID == 9) {
          var method_name = '/pincode/' + this.permanent_pincode + '/' + this.Insurer_ID;
          this._horizon.callAPIGet('', method_name, 2).subscribe(
            data => {
              this.state_code = data[0].State_Code;
              this.city_code = data[0].District_Code;
              this.locality_code = data[0].City_Id;
            });
        }
        else if (this.Insurer_ID == 11) {
          var method_name = '/pincode/' + this.permanent_pincode + '/9';
          this._horizon.callAPIGet('', method_name, 2).subscribe(
            data => {
              this.state_code = data[0].State_Code;
              this.city_code = data[0].District_Code;
              this.locality_code = data[0].City_Id;
            });
        }
        else if (this.Insurer_ID == 26) {
          var method_name = '/quote/starhealth_pincode/' + this.permanent_pincode;
          this._horizon.callAPIGet('', method_name, 2).subscribe(
            data => {
              console.log('pincodedata', data);
              // this._state = data['state_name'];
              // this._district = data['city'][0]['city_name'];
              this.city_code = data['city'][0]['city_id'];
            });
        }

        if (this.Insurer_ID == 44) {
          $('.ekycCheckBox').hide();
        }
      }, error => {
        alert("Technical Issue! Try again after some time");
        window.location.reload();
      })
  }

  GetJsondata(request) {
    this.insurer_json = this.Insurer_Code.replace(/\s/g, "");
    this._horizon.getInsurerData(this.insurer_json).subscribe(data => {
      this._occupation = data[0]["_occupation"] == undefined ? "" : data[0]["_occupation"];
      this.relation_with_insured = data[0]["_relation"] == undefined ? "" : data[0]["_relation"];
      this.existingDiseases = data[0]["_existingDiseases"] == undefined ? "" : data[0]["_existingDiseases"];
      this._nominee_relation = data[0]["nominee_relation"] == undefined ? "" : data[0]["nominee_relation"];
      this.salutation_json = data[0]["_salutations"] == undefined ? "" : data[0]["_salutations"];
      this.Travel_purpose_json = data[0]["_travelPurpose"] == undefined ? "" : data[0]["_travelPurpose"];
      this.otherDetails = data[0]["otherDetails"] == undefined ? "" : data[0]["otherDetails"];

      //setting proposalsummary values

      // if (this.Insurer_ID == 44) {
      //   var otherDetailsData = this.Travel_purpose[0].value;
      //   if (otherDetailsData == 'L') {
      //     this.Travel_purpose = "Leisure";
      //   }
      //   else if (otherDetailsData == 'B') {
      //     this.Travel_purpose = "Business";
      //   }
      //   else if (otherDetailsData == 'B') {
      //     this.Travel_purpose = "Business";
      //   }
      // }
      if (this.question_101_code == true) {
        $('#visaType').text('Yes');
      }
      else if (this.question_101_code == false) {
        $('#visaType').text('No');
      }
      if (this.question_T001 == true) {
        $('#hospitalize').text('Yes');
      }
      else if (this.question_T001 == false) {
        $('#hospitalize').text('No');
      }
      if (this.question_1 == true) {
        $('#trip_from_india').text('Yes');
      }
      else if (this.question_1 == false) {
        $('#trip_from_india').text('No');
      }
      if (this.question_901 == true) {
        $('#indian_citizen').text('Yes');
      }
      else if (this.question_901 == false) {
        $('#indian_citizen').text('No');
      }
      if (this.question_902 == true) {
        $('#immigration_visa').text('Yes');
      }
      else if (this.question_902 == false) {
        $('#immigration_visa').text('No');
      }
      if (this.question_903 == true) {
        $('#immigration').text('Yes');
      }
      else if (this.question_903 == false) {
        $('#immigration').text('No');
      }
      if (this.question_101 == true) {
        $('#trip_from_india').text('Yes');
      }
      else if (this.question_101 == false) {
        $('#trip_from_india').text('No');
      }
      if (this.question_T002 == true) {
        $('#under_any_policy').text('Yes');
      }
      else if (this.question_T002 == false) {
        $('#under_any_policy').text('No');
      }
      if (this.question_1101 == true) {
        $('#trip_from_india').text('Yes');
      }
      else if (this.question_1101 == false) {
        $('#trip_from_india').text('No');
      }

      $('#get_update_check').prop('checked', false);
      $.each(request, (key, value) => {
        $('#' + key).text(value);
        for (var d = 1; d <= this.adult_count; d++) {
          if (key == 'member_' + d + '_salutation') {
            if (this.salutation_json !== undefined) {
              for (var s = 0; s < this.salutation_json.length; s++) {
                if (this.salutation_json[s]['id'] == this.Proposal_Request[key]) {
                  $('#' + key).text(this.salutation_json[s]['name']);
                }
              }
            }
          }
          if (key == 'member_' + d + '_birth_date') {
            var birth_date = moment(value, 'YYYY-MM-DD').format('DD MMM YYYY');
            $('#' + key).text(birth_date);
          }
          if (key == 'member_' + d + '_passport_expiry') {
            var passport_date = moment(value, 'YYYY-MM-DD').format('DD MMM YYYY');
            $('#' + key).text(passport_date);
          }
          if (key == 'member_' + d + '_other_diseases') {
            $('#' + key).text(value);
            if (value == "") {
              $('#adult' + d + '_diseases').addClass('hidden');
              $('#adult' + d + '_meds').addClass('hidden');
              $('#adult' + d + '_suffering').addClass('hidden');
            }
          }

          if (key == 'member_' + d + '_gender') {

            if (value == "M") {
              $('#' + key).text("Male");
            }
            else {
              $('#' + key).text("Female");
            }
          }
          if (key == 'member_' + d + '_occupation') {
            for (var k = 0; k < this._occupation.length; k++) {
              if (this._occupation[k]['id'] == request[key]) {
                var occ_upation = this._occupation[k]['name'];
                $('#' + key).text(occ_upation);
              }
            }
          }
          if (key == 'member_' + d + '_ped') {
            this.verify = value;
            if (this.verify == "" || this.verify == null) {
              $('#adult' + d + 'diseases').addClass('hidden');
            }
            if (this.verify == "" || this.verify == null && d > 2) {
              $('#child' + d + 'diseases').addClass('hidden');
            }
            this.Diseases = [];
            for (var q = 0; q < value.length; q++) {
              if (this.Insurer_ID == 34 || this.Insurer_ID == 9 || this.Insurer_ID == 11 || this.Insurer_ID == 26 && value !== "") {
                this.existingDiseases.forEach(ped => {
                  console.log(parseInt(request[key][q].id));

                  if (ped.id == parseInt(request[key][q].id)) {
                    this.Diseases.push(ped.name);
                  }
                });
                $('#' + key).text(this.Diseases);
              }
              else {
                if (this.existingDiseases[d]['id'] == this.Proposal_Request[key]) {
                  $('#' + key).text(this.existingDiseases[d]['name']);
                }
              }
            }
          }
          for (var c = 3; c <= this.child_count + 3; c++) {
            if (key == 'member_' + c + '_salutation') {
              if (this.salutation_json !== undefined) {
                for (var s = 0; s < this.salutation_json.length; s++) {
                  if (this.salutation_json[s]['id'] == this.Proposal_Request[key]) {
                    $('#' + key).text(this.salutation_json[s]['name']);
                  }
                }
              }
            }
            if (key == 'member_' + c + '_passport_expiry') {
              var child_passport_date = moment(value, 'YYYY-MM-DD').format('DD MMM YYYY');
              $('#' + key).text(child_passport_date);
            }
            if (key == 'member_' + c + '_birth_date') {
              var child_birth_date = moment(value, 'YYYY-MM-DD').format('DD MMM YYYY');
              $('#' + key).text(child_birth_date);
            }
            if (key == 'member_' + c + '_ped') {
              this.verify = value;
              if (this.verify == "" || this.verify == null) {
                $('#adult' + c + 'diseases').addClass('hidden');
              }
              if (this.verify == "" || this.verify == null && c > 2) {
                $('#child' + c + 'diseases').addClass('hidden');
              }
              this.Diseases = [];
              for (var p = 0; p < value.length; p++) {
                if (this.Insurer_ID == 34 || this.Insurer_ID == 9 || this.Insurer_ID == 26 || this.Insurer_ID == 11 && value !== "") {
                  this.existingDiseases.forEach(ped => {
                    if (ped.id == request[key][p].id) {
                      this.Diseases.push(ped.name);
                    }
                  });
                  $('#' + key).text(this.Diseases);

                }
                else {
                  if (this.existingDiseases[p]['id'] == this.Proposal_Request[key]) {
                    $('#' + key).text(this.existingDiseases[p]['name']);
                  }
                }
              }
            }
            if (key == 'member_' + c + '_occupation') {
              for (var k = 0; k < this._occupation.length; k++) {
                if (this._occupation[k]['id'] == request[key]) {
                  var occ_upation = this._occupation[k]['name'];
                  $('#' + key).text(occ_upation);
                }
              }
            }
            if (key == 'member_' + c + '_other_diseases') {
              if (value == "") {
                $('#child' + c + '_diseases').addClass('hidden');
                $('#child' + c + '_meds').addClass('hidden');
                $('#child' + c + '_suffering').addClass('hidden');
              }
            }
            if (key == 'member_' + c + '_gender') {
              if (value == "M") {
                $('#' + key).text("Male");
              }
              else {
                $('#' + key).text("Female");
              }
            }
          }
        }
        for (var m = 1; m <= this.member_count; m++) {
          if (key == 'member_' + m + '_takes_meds') {
            if (value == "true") {
              $('#' + key).text('Yes');
            }
            else {
              $('#' + key).text('No');
            }
          }
        }
        for (var f = 1; f <= this.member_count; f++) {
          if (key == 'member_' + f + '_fullName' && value !== "") {
            $('#' + key).text(value);
            $('#' + key).css('text-transform', 'capitalize');
          }
        }
        if (key == 'relation') {
          if (this.relation_with_insured !== undefined) {
            for (var i = 0; i < this.relation_with_insured.length; i++) {
              if (this.relation_with_insured[i]['id'] == this.Proposal_Request[key]) {
                var relation = this.relation_with_insured[i]['name'];
                $('#' + key).text(relation);
              }
            }
          }
        }
        if (key == 'nominee_relation') {
          if (this._nominee_relation !== undefined) {
            for (var i = 0; i < this._nominee_relation.length; i++) {
              if (this._nominee_relation[i]['id'] == this.Proposal_Request[key]) {
                var nominee = this._nominee_relation[i]['name'];
                $('#' + key).text(nominee);
              }
            }
          }
        }
        if (key == 'salutation') {
          if (this.salutation_json !== undefined) {
            for (var s = 0; s < this.salutation_json.length; s++) {
              if (this.salutation_json[s]['id'] == this.Proposal_Request[key]) {
                var salutation = this.salutation_json[s]['name'];
                this.salutation = salutation;
              }
            }
          }
        }
        if (key == 'otherDetailsData') {
          if (this.Insurer_ID == 26) {
            for (var s = 0; s < this.Travel_purpose_json.length; s++) {
              if (this.Travel_purpose_json[s]['id'] == this.Travel_purpose[2].value) {
                var purpose = this.Travel_purpose_json[s]['name'];
                this.Travel_purpose_value = purpose;
              }
            }

            this.Physician_name = this.Travel_purpose[0].value;
            $('#Physician_name').text(this.Physician_name);
            this.Physician_number = this.Travel_purpose[1].value
            $('#Physician_number').text(this.Physician_number);
          }
          else if (this.Insurer_ID == 44) {
            for (var s = 0; s < this.Travel_purpose_json.length; s++) {
              if (this.Travel_purpose_json[s]['id'] == this.Travel_purpose[0].value) {
                var purpose = this.Travel_purpose_json[s]['name'];
                this.Travel_purpose = purpose;
              }
            }
          } 
          //    else if (this.Insurer_ID == 6) {
          //   for (var s = 0; s < this.otherDetails[0]['selectOptions'].length; s++) {
          //     if (this.otherDetails[0]['selectOptions'][s]['id'] == this.Travel_purpose[0].value) {
          //       var purpose = this.otherDetails[0]['selectOptions'][s]['optionText'];
          //       this.visaType =purpose;
          //     }
          //   }
          // }
        }
      })
    }, error => {
      alert("Technical Issue! Try again after some time");
      window.location.reload();
    })
  };
  KeyPressEvent(event: any, type) {
    let pattern;
    switch (type) {
      case 'Text': pattern = /[a-zA-Z ]/; break;
      case 'OnlyText': pattern = /[a-zA-Z]/; break;
      case 'Number': pattern = /[0-9\+\-\ ]/; break;
      case 'AlphaNumeric': pattern = /[a-zA-Z0-9 ]/; break;
      case 'Address': pattern = /[a-zA-Z0-9\-,\(\) ]/; break;
      case 'Pincode': pattern = /[0-9]/; break;
      case 'Mobile': pattern = /[0-9\+\-\ ]/; break;
      //case 'PAN':  pattern = /[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}/; break;
      case 'Passport': pattern = /[A-Z0-9]{7}/; break;
    }
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) { event.preventDefault(); }
  }
  ValidateNumber(event) {
    if (!(/^[0-9]*$/.test(event.target.value))) {
      event.target.value = "";
    }
  }
  proposal_initiate(post) {
    if (this.Same_As_nominee == true || this.Same_As_nominee == 'yes') {
      var nominee = "yes";
    }
    else {
      var nominee = "no";
    }
    var url = window.location.href;
    var nominee_rel = $("#nominee_relation").html();
    this.member_1_occupation = $('#member_1_occupation').html() == undefined ? "" : $('#member_1_occupation').html();
    this.member_2_occupation = $('#member_2_occupation').html() == undefined ? "" : $('#member_2_occupation').html();
    this.member_3_occupation = $('#member_3_occupation').html() == undefined ? "" : $('#member_3_occupation').html();
    this.member_4_occupation = $('#member_4_occupation').html() == undefined ? "" : $('#member_4_occupation').html();
    this.member_5_occupation = $('#member_5_occupation').html() == undefined ? "" : $('#member_5_occupation').html();
    this.member_6_occupation = $('#member_6_occupation').html() == undefined ? "" : $('#member_6_occupation').html();
    var member_1_salutation = $('#member_1_salutation').html() == undefined ? "" : $('#member_1_salutation').html();
    var member_2_salutation = $('#member_2_salutation').html() == undefined ? "" : $('#member_2_salutation').html();
    var member_3_salutation = $('#member_3_salutation').html() == undefined ? "" : $('#member_3_salutation').html();
    var member_4_salutation = $('#member_4_salutation').html() == undefined ? "" : $('#member_4_salutation').html();
    var member_5_salutation = $('#member_5_salutation').html() == undefined ? "" : $('#member_5_salutation').html();
    var member_6_salutation = $('#member_6_salutation').html() == undefined ? "" : $('#member_6_salutation').html();

    if (this.Insurer_ID == 44) {
      nominee_rel = "SELF";
      this.nominee_relation_val = "SELF"
    }
    if (this.Insurer_ID == 1) {
      nominee_rel = "SELF";
      this.nominee_relation_val = "SELF";
    }
    if (this.Insurer_ID == 26) {
      post.kyc_ref_no = this.kyc_ref_no;
    }
    if ($("#terms_of_condition_check").is(":checked")) {
      this.OnlineAgreement = true;
    }
    if (this.member_1_gender == "M") {
      this.member_1_gender = "Male";
    } else if (this.member_1_gender == "F") {
      this.member_1_gender = "Female";
    }
    if (this.member_2_gender == "M") {
      this.member_2_gender = "Male";
    } else if (this.member_2_gender == "F") {
      this.member_2_gender = "Female";
    }
    if (this.member_3_gender == "M") {
      this.member_3_gender = "Male"
    } else if (this.member_3_gender == "F") {
      this.member_3_gender = "Female";
    }
    if (this.member_4_gender == "M") {
      this.member_4_gender = "Male";
    } else if (this.member_4_gender == "F") {
      this.member_4_gender = "Female";
    }
    if (this.member_5_gender == "M") {
      this.member_5_gender = "Male";
    } else if (this.member_5_gender == "F") {
      this.member_5_gender = "Female";
    }
    if (this.member_6_gender == "M") {
      this.member_6_gender = "Male";
    } else if (this.member_6_gender == "F") {
      this.member_6_gender = "Female";
    }
    if(this.Insurer_ID == 6){
      post.other_detail_1_text = 'Non Immigrant';
      post.name = "question_101";
    }


    for (let m = 1; m <= this.adult_count; m++) {
      if ($('#member_' + m + '_ped').text().length == 0) {
        post['member_' + m + '_ped'] = "";
      }
    }
    for (var n = 3; n <= this.child_count + 2; n++) {
      if ($('#member_' + n + '_ped').text().length == 0) {
        post['member_' + n + '_ped'] = "";
      }
    }
    // post.same_as_for_nominee = this.Same_As_nominee,
    post.nominee_relation = this.nominee_relation_val,
    post.salutation_text = this.salutation,
    post.gender_text = this.gender,
    post.relation_text = $('#relation').text(),
    post.member_1_salutation_text = member_1_salutation == "" ? undefined : member_1_salutation,
    post.member_1_gender_text = this.member_1_gender == "" ? undefined : this.member_1_gender,
    post.member_1_occupation_text = this.member_1_occupation == "" ? undefined : this.member_1_occupation,
    post.member_2_salutation_text = member_2_salutation == "" ? undefined : member_2_salutation,
    post.member_2_gender_text = this.member_2_gender == "" ? undefined : this.member_2_gender,
    post.member_2_occupation_text = this.member_2_occupation == "" ? undefined : this.member_2_occupation,
    post.member_3_salutation_text = member_3_salutation == "" ? undefined : member_3_salutation,
    post.member_3_gender_text = this.member_3_gender == "" ? undefined : this.member_3_gender,
    post.member_3_occupation_text = this.member_3_occupation == "" ? undefined : this.member_3_occupation,
    post.member_4_salutation_text = member_4_salutation == "" ? undefined : member_4_salutation,
    post.member_4_gender_text = this.member_4_gender == "" ? undefined : this.member_4_gender,
    post.member_4_occupation_text = this.member_4_occupation == "" ? undefined : this.member_4_occupation,
    post.member_5_salutation_text = member_5_salutation == "" ? undefined : member_5_salutation,
    post.member_5_gender_text = this.member_5_gender == "" ? undefined : this.member_5_gender,
    post.member_5_occupation_text = this.member_5_occupation == "" ? undefined : this.member_5_occupation,
    post.member_6_salutation_text = member_6_salutation == "" ? undefined : member_6_salutation,
    post.member_6_gender_text = this.member_6_gender == "" ? undefined : this.member_6_gender,
    post.member_6_occupation_text = this.member_6_occupation == "" ? undefined : this.member_6_occupation;

    if (this.Insurer_ID == 44) {
      post.doc_url = this.doc_url;
      post.other_detail_1_text = this.Travel_purpose == "" ? undefined : this.Travel_purpose;
    }
    else if (this.Insurer_ID == 26) {
      post.other_detail_3_text = this.Travel_purpose == "" ? undefined : this.Travel_purpose;
    }
    if (this.kyc_no) {
      post.kyc_no = this.kyc_no;
    }
    post.kyc_ref_no = this.kyc_ref_no;

    post.nominee_relation_text = nominee_rel == undefined ? undefined : nominee_rel,
    post.hasOwnProperty('completeAddress') ? delete post['completeAddress'] : '';
    post.hasOwnProperty('first_name') ? delete post['first_name'] : '';
    post.hasOwnProperty('last_name') ? delete post['last_name'] : '';
    post.hasOwnProperty('middle_name') ? delete post['middle_name'] : '';

    post.permanent_state_code = this.state_code?this.state_code:this.Proposal_Request['permanent_state_code'],
    post.permanent_locality_code = this.locality_code,
    post.permanent_city_code = this.city_code?this.city_code:this.Proposal_Request['permanent_city_code'],
    post.permanent_state = this.state?this.state:this.Proposal_Request['permanent_state'],
    post.permanent_city = this.city?this.city:this.Proposal_Request['permanent_city'],
    post.proposal_url = url,
    post.search_reference_number = this.srn,
    post.api_reference_number = this.arn,
    post.insurer_id = this.Insurer_ID,
    post.execution_async = 'yes',
    post.method_type = 'Proposal',
    post.final_premium = parseInt(this.final_premium),
    post.net_premium = parseInt(this.net_premium),
    post.service_tax = parseInt(this.service_tax),
    post.nominee_birth_date = post.nominee_birth_date,
    post.app_version = (this.showApp_version == false ? this.app_version : "PolicyBoss.com");
    if (this.show == false) {
      post.online_agreement = this.OnlineAgreement;
    }
    post.electronic_policy = this.ElectronicPolicy;
    if (this.opted_whatsapp == true) {
      post.whatsapp_mobile = this.whatsapp_mobile;
      post.is_whatsapp_allow = 1;
    } else {
      post.whatsapp_mobile = "";
      post.is_whatsapp_allow = 0;
    }

    this.loader = true;
    this.msg = "Initiating Proposal Status ...";
    var method_name = '/quote/proposal_initiate';
    this._horizon.callAPIPost(post, method_name, this.client_id).subscribe(
      data => {
        if (data.hasOwnProperty('Status') && data['Status'] == "VALIDATION") {
          var cdate = moment(this.Summary.Created_On).toString();
          var curdate = moment().toString();
          this.error_message = data['Msg'];
          this.created_on = cdate.split("GMT")[0];
          this.current_time = curdate.split('GMT')[0];
          this.ErrMsg = 'Error : ' + this.error_message;
          // this.IsError = true;
          this.loader = false;
          $('.loader').hide();
          if (this.ErrMsg != undefined) {
            $('.AlertMsg').show();
            $('#AlertMsg').modal('show')
          }
          $("#Hidepopup").show();
        } else {
          var arn = data['Service_Log_Unique_Id'];
          var proposal_id = data.hasOwnProperty('Proposal_Id') ? data['Proposal_Id'] : 0;
          this.CheckProposalStatus(arn, proposal_id);
        }
      });
  }

  async Otpverification() {
    var err = 0;
    this.whatsapp_mobile = $('#whatsappMblNo').val();
    $('#erreKycNo').html('');
    $('#ekycNo').removeClass('err_border')
    $('#error_checked').addClass('hidden');
    $('#errwhatsappMblNo').addClass('hidden');
    $('#error_trip').addClass('hidden');
    $('#error_digit').addClass('hidden');
    $('#error_bajaj').addClass('hidden');
    $('#error_tata').addClass('hidden');
    $('#error_star').addClass('hidden');
    if (this.show == false) {
      if (!$("#terms_of_condition_check").is(":checked")) {
        err++;
        this.loader = false;
        $('#error_checked').removeClass('hidden');
      }
      if (this.Insurer_ID == 34 && !$("#get_trip_check").is(":checked")) {
        err++;
        this.loader = false;
        $('#error_trip').removeClass('hidden');
      }
      if (this.Insurer_ID == 26 && !$("#get_star_check").is(":checked")) {
        err++;
        this.loader = false;
        $('#error_star').removeClass('hidden');
      }
      if (this.Insurer_ID == 11 && !$("#get_tata_check").is(":checked")) {
        err++;
        this.loader = false;
        $('#error_tata').removeClass('hidden');
      }
      if (this.Insurer_ID == 44 && !$("#get_digit_check").is(":checked")) {
        err++;
        this.loader = false;
        $('#error_digit').removeClass('hidden');
      }
      if (this.Insurer_ID == 1 && !$("#get_bajaj_check").is(":checked")) {
        err++;
        this.loader = false;
        $('#error_bajaj').removeClass('hidden');
      }
      if (this.showeKyc === true && ($('#ekycNo').val() == null || $('#ekycNo').val() == undefined || $('#ekycNo').val() == '')) {
        err++
        this.loader = false;
        $('#ekycNo').addClass('has-error', 'border-thick');
        $('#erreKycNo').text('Please enter eKYC Number.');
        $('#erreKycNo').show();
      } else {
        $('#ekycNo').removeClass('has-error', 'border-thick');
        $('#erreKycNo').text('');
        $('#erreKycNo').hide();
      }
      // if ($('#ekycNo').is(':visible') == true) {
      //   if ($('#ekycNo').val() == "" || $('#ekycNo').val() == null || $('#ekycNo').val() == undefined) {
      //     $('#erreKycNo').html('Enter eKyc number.');
      //     $('#ekycNo').addClass('err_border')
      //     err++;
      //   }
      // }
      if ($("#get_update_check").is(":checked")) {
        var number = /[7-9]/;
        if ($("#whatsappMblNo").val() == '' || $("#whatsappMblNo").val() == null || $("#whatsappMblNo").val() == undefined || !number.test($("#whatsappMblNo").val()) || $("#whatsappMblNo").val().length < 10) {
          $('#errwhatsappMblNo').removeClass('hidden');
          err++;
        }
      }
      else {
        $('#errwhatsappMblNo').addClass('hidden');
      }
    }

    if (this.showeKyc) {
      if (this.proceed_transaction == false && err == 0) {
        if (this.Insurer_ID != 44) {
          await this.call_verifyKycDetails().catch((error) => {
            this.loader = false;
            $('#erreKycNo').html('Technical issue, please retry.');
            $('#erreKycNo').show();
          });
        }
      }
    } else {
      this.proceed_transaction = true;
    }
    if (err == 0 && this.show == false && this.proceed_transaction == true) {
      if ((this.IsCustomer == true && this.summary['Quote_Request'].hasOwnProperty('channel') && this.summary['Quote_Request'].channel == "DIRECT" && this.summary['Quote_Request'].hasOwnProperty('subchannel') && this.summary['Quote_Request']['subchannel'] == "DIRECT")) {
        var MobileNumber = this.summary['Proposal_Request']['mobile'];
        var ProductName = 'Travel';
        let Final_Premium = Math.round(this.final_premium);
        let Contact_name = this.summary['Proposal_Request'].contact_name;
        this.loader = true;
        this._horizon.callAPIGet('', "/generateOTP/" + MobileNumber + "/" + ' ' + "/" + ProductName + "/" + this.Insurer_ID + "/" + Final_Premium + "/" + Contact_name + "/" + this.CRN, 2).subscribe(response => {
          this.loader = false;
          this.OtpMobileNo = $("#ContactMobile").val();
          $(".SubFOSPopup").show();
          $('#lblerrormsg').text("");
        }
          , error => {
            this.loader = false;
            console.log(error);
          });
      } else {
        var MobileNumber = this.summary['Proposal_Request']['mobile'];
        var ProductName = 'Travel';
        let Final_Premium = Math.round(this.final_premium);
        let Contact_name = this.summary['Proposal_Request'].contact_name;
        this.loader = true;
        this._horizon.callAPIGet('', "/generateOTP/" + MobileNumber + "/" + ' ' + "/" + ProductName + "/" + this.Insurer_ID + "/" + Final_Premium + "/" + Contact_name + "/" + this.CRN, 2).subscribe(response => {
          this.loader = false;
          this.OtpMobileNo = $("#ContactMobile").val();
          $(".SubFOSPopup").show();
          $('#lblerrormsg').text("");
        }
          , error => {
            this.loader = false;
            console.log(error);
          });
      }

      // if (err == 0 && this.show == false && this.IsCustomer == true) {
      //   var MobileNumber = this.summary['Proposal_Request']['mobile'];
      //   var ProductName = 'Travel';
      //   let Final_Premium = Math.round(this.final_premium);
      //   let Contact_name = this.summary['Proposal_Request'].contact_name;
      //   this.loader = true;
      //   this._horizon.callAPIGet('', "/generateOTP/" + MobileNumber + "/" + ' ' + "/" + ProductName + "/" + this.Insurer_ID + "/" + Final_Premium + "/" + Contact_name + "/" + this.CRN, 2).subscribe(response => {
      //     this.loader = false;
      //     this.OtpMobileNo = $("#ContactMobile").val();
      //     $(".SubFOSPopup").show();
      //     $('#lblerrormsg').text("");
      //   }
      //     , error => {
      //       this.loader = false;
      //       console.log(error);
      //     });
      // }
    }
  }

  ResendOTPN() {
    var MobileNumber = this.summary['Proposal_Request']['mobile'];
    var Email = this.summary['Proposal_Request']['email'];
    var ProductName = 'Travel';
    let Final_Premium = Math.round(this.final_premium);
    let Contact_name = this.summary['Proposal_Request'].contact_name;
    this._horizon.callAPIGet('', "/resendOTP/" + MobileNumber + "/" + Email + "/" + ProductName + "/" + this.Insurer_ID + "/" + Final_Premium + "/" + Contact_name + "/" + this.CRN, 2).subscribe(response => {
    }, error => {
      console.log(error);
    });
  }

  VerifyOTPN() {
    var OTP = $("#txtotp").val();
    var VerifyOTP_udid = "";
    if (OTP != null && OTP != "") {
      this._horizon.callAPIGet('', "/verifyOTP/" + OTP + '/' + VerifyOTP_udid, 2).subscribe(response => {
        if (response["Msg"] == "Success") {
          $("#txtotp").val("");
          $('#lblerrormsg').text("");
          $(".SubFOSPopup").hide();
          $("#IsConfirmed").val("1");
          this.proposal_initiate(this.Proposal_Request);
        } else {
          $('#lblerrormsg').text("Please Enter valid OTP.");
        }
      }, error => {
        console.log(error);
      });
    } else {
      $('#lblerrormsg').text("Please Enter OTP.");
    }
  }

  CheckProposalStatus(arn, proposal_id) {
    var post_data = {
      api_reference_number: arn,
      Proposal_Id: proposal_id
    };
    var method_name = '/quote/proposal_details';
    this._horizon.callAPIPost(post_data, method_name, 2).subscribe(
      data => {
        var proposal_data = data;
        this.proposal_details_res = data;
        this.msg = "Checking Proposal Status ...";
        if ((proposal_data['Status'] != 'complete')) {
          $('.loader').hide();
          if (this.ErrMsg != undefined) {
            $('.AlertMsg').show();
            $('#AlertMsg').modal('show')
          }
          $("#Hidepopup").show();
          setTimeout(() => {
            this.CheckProposalStatus(proposal_data['Service_Log_Unique_Id'], proposal_id);
          }, 3000);
        }
        else {
          if (this.is_direct_proposal === true) {
            if (proposal_data['Error'] && proposal_data['Error'].Error_Code === "LM0055") {
              proposal_data['Error'] = null;
            }
            this.directKyc = true;
          }
          this.loader = false;
          var cdate = moment(this.Summary.Created_On).toString();
          var curdate = moment().toString();
          if (proposal_data['Error'] == "" || proposal_data['Error'] == null) {
            if (this.directKyc) {
              this.pg_url = proposal_data['Payment'].proposal_confirm_url;
              this.policynumber = proposal_data['Insurer_Transaction_Identifier'];
              // this.policynumber = 10023423424234;
              $('.loader').hide();
              // this.proposalError();
              // $('#alertModel').modal('show');
              this.proposalError();
              $('#CreateVerifyAlert').modal('show');
              // this.Kyc_Redirect_Link = response_json['Error'].Error_Msg;
              $('.redirectEkycBtnDiv2').on('click', () => {
                this.throughCreateButton = true;
                if (this.Insurer_ID == 44) {
                  this.call_verifyKycDetails().catch((error) => {
                    this.loader = false;
                    $('.verifyErrMsg').html('<div style="color:red;">KYC Status : Technical issue, please retry.</div>');
                  });;
                } else {
                  this.call_saveKycDetails();
                }
              });
              $('.verifyKycBtn').on('click', () => {
                this.throughCreateButton = false;
                if (this.Insurer_ID == 11) {
                  // this.call_verifyKycDetails();
                  this.call_tataaig_update_proposal_kyc();
                } else {
                  this.call_verifyKycDetails().catch((error) => {
                    this.loader = false;
                    // $('#erreKycNo').html('Technical issue, please retry.');
                    if (this.Insurer_ID == 44) {
                      $('.verifyErrMsg').html('<div style="color:red;">KYC Status : Technical issue, please retry.</div>');
                    }
                    // $('#erreKycNo').show();
                    // });
                  });
                }
              });
            } else {
              this.msg = "Going To Payment Gateway ...";
              if (this.ErrMsg != undefined) {
                $('.AlertMsg').show();
                $('#AlertMsg').modal('show')
              }
              $("#Hidepopup").show();
              window.location.href = proposal_data.hasOwnProperty('Payment') ? proposal_data['Payment'].proposal_confirm_url : this.url;
              // this.IsError = false;
              this.loader = false;
            }

          }
          else {
            this.proposalError();
            this.error_message = proposal_data['Error'].hasOwnProperty('Error_Specific') ? proposal_data['Error']['Error_Specific'] : proposal_data['Error']['Error_Desc'];
            this.created_on = cdate.split("GMT")[0];
            this.current_time = curdate.split('GMT')[0];
            this.ErrMsg = 'Error : ' + this.error_message;
            this.loader = false;
            // $('.header_errTxt').html("");
            $('.loader').hide();
            // $('#ProgressStatus').show();
            if (this.ErrMsg != undefined) {
              $('.AlertMsg').show();
              $('#AlertMsg').modal('show')
            }
            $("#Hidepopup").show();
          }
        }
      });
  }

  closeOTP() {
    $(".SubFOSPopup").hide();
  }

  send_payment_link(data_valid: any) {
    this.loader = true;
    data_valid.fba_id = this.fba_id;
    data_valid.agent_ip_address = this.ip_address;
    data_valid.agent_geo_lat = this.geo_lat;
    data_valid.agent_geo_long = this.geo_long;
    data_valid.app_version = this.app_version;
    this.send_link = true;
    this.msg = "Please Wait..!";
    var obj = {
      contact_name: this.contact_name,
      crn: this.CRN,
      product_name: "Travel",
      insurer_id: this.Insurer_ID,
      insurer_name: this.Insurer_Name,
      final_premium: this.final_premium,
      payment_link: `${window.location.pathname}?client_id=2&arn=${this.arn}&is_posp=NonPOSP&ss_id=0`,
      registration_no: "",
      plan_name: this.Plan_Name,
      phone_no: this.mobile,
      customer_email: this.email,


      search_reference_number: this.srn,
      agent_email: this.Quote_Request["posp_email_id"],
      salutation_text: this.salutation,
      insurance_type: this.travel_insurance_type
    }
    this.msg = "Sending mail to Customer ...";
    var method_name = '/quote/send_payment_link';
    this._horizon.callAPIPost(obj, method_name, this.client_id).subscribe(
      data => {
        var send_payment_success_id = data['Id'];
        if (data.hasOwnProperty('Status')) {
          if (data['Status'] == "Success" || data['Status'] == "SUCCESS") {
            this.loader = false;
            this.dataStatusSuccess = true;
            this.PaymentLinkSend = true;
            $('#Send_Payment_Link').addClass('disabled-tag').text('. . .');
            this.msg = "Mail Sent Successfully";
            this.short_url = data['Payment_Link'];
            if (this.send_link == true) {
              $('#submit_loader_popup').show();
            }
          }
          else {
            this.dataStatusSuccess = false;
            this.msg = data['Msg'];
          }
        }
        else {
          if (send_payment_success_id != null && send_payment_success_id != "") {
            this.dataStatusSuccess = true;
            this.PaymentLinkSend = true;
            $('#Send_Payment_Link').addClass('disabled-tag').text('. . .');
            this.msg = "Mail Sent Successfully";
            this.short_url = data['Payment_Link'];
          }
          else {
            this.dataStatusSuccess = false;
            this.msg = "Error to sent mail Successfully";
          }
        }
      });
  }

  hideProgress() {
    // $('.AlertMsg').hide();
    $('#AlertMsg').modal('hide');
  }

  whatsappUpdate() {
    if ($("#get_update_check").is(":checked")) {
      this.opted_whatsapp = true;
      $('.display_block').show();
      if ($("#whatsappMblNo").val().length == 0) {
        $("#whatsappMblNo").val($("#mobile").text());
      }
    }
    else {
      $('.display_block').hide();
      // $('#whatsappMblNo').val("");
    }
  }

  OnlineAgreementCheck(event) {
    if (event.target.checked) {
      this.OnlineAgreement = true;
    } else {
      this.OnlineAgreement = false;
    }
  }
  
  Show_TATA_Agreement() {
    var url = window.location.origin;
    var agreement;
    if (url.includes("qa")) {
      url = url.includes("https") ? "https://qa-horizon.policyboss.com:3443/travel_brochures" : "http://qa-horizon.policyboss.com:3000/travel_brochures";
    } else {
      url = url.includes("https") ? "https://www.policyboss.com/pdf-files" : "http://www.policyboss.com/pdf-files";
    }
    if (this.region === "Asia") {
      agreement = url + "/TATA_Travel/AsiaGuard-TermsCondition.pdf";
    } else {
      agreement = url + "/TATA_Travel/TravelGuard-TermsCondition.pdf";
    }
    window.open(agreement, "_blank");
  }
  ShowDigitAgreement() {
    $('#term_condition_popup').hide();
    $('#TermsForDigit').show();
    $('#condition_popup').show()
  }

  ShowAgreement() {
    $('#term_condition_popup').show();
    $('#TermsForDigit').hide();
    $('#condition_popup').show()
  }

  AgentOk() {
    $('#submit_loader_popup').hide()
    this.send_link = false;
    this.loader = false;
  }

  edit() {
    window.location.href = window.location.origin + '/travel-insurance/proposal?client_id=2&arn=' + this.arn + '&is_posp=NonPOSP&ss_id=' + this.ss_id;
    // this._route.navigate(['/proposal'], { relativeTo: this.ActivatedRoute, queryParams: { client_id: 2, arn: this.arn, is_posp: 'NonPOSP', ss_id: this.ss_id } });

  }

  call_saveKycDetails() {
    this.msg="";
    var req = {};
    req['Document_ID'] = this.pan_card;
    req['Document_Type'] = 'PAN';
    req['insurer_id'] = this.Insurer_ID;
    req['crn'] = this.CRN;
    req['user_kyc_no'] = $("#ekycNo").val();
    req['udid'] = this.summary['Proposal_Request'].udid;
    req['product_id'] = this.Quote_Request['product_id'];
    req['Proposal_Request'] = Object.assign({}, this.summary['Proposal_Request']);//this.summary['Proposal_Request'];
    req['Proposal_Request']['birth_date'] = moment(req['Proposal_Request']['birth_date'], 'YYYY-MM-DD').format('DD/MM/YYYY');
    req['Quote_Id'] = this.summary['Summary']['Insurer_Transaction_Identifier'] ? this.summary['Summary']['Insurer_Transaction_Identifier'] : "";
    req['Proposal_Id'] = '';
    req["search_type"] = "PAN";
    // req['vehicle_registration_type'] = this.request.vehicle_registration_type;
    req["proposal_url"] = window.location.href;
    this.loader = true;
    if(this.Insurer_ID === 11){
      req['Proposal_Id'] = this.proposal_details_res['Insurer_Transaction_Identifier'];
      req['Quote_Id'] = "";
    }
    var methodName = '/postservicecall/kyc_details/save_kyc_details';
    this._horizon.callAPIPost(req, methodName, 2).subscribe(
      response => {
        // response = { "KYC_Pan_No": "FAGPS8388E", "KYC_Number": "50018090746880", "KYC_FullName": "MR ASHUTOSHKUMAR SANTOSHKUMAR SINGH", "KYC_Ref_No": "", "KYC_Redirect_URL": "", "KYC_Insurer_ID": 11, "KYC_PB_CRN": 1066444, "KYC_Status": "FETCH_SUCCESS" }
        $('#erreKyc').hide().text('');
        this.loader = false;
        if (response && response.hasOwnProperty('ckyc_remarks') && response['ckyc_remarks'] && response['ckyc_remarks'] !== 'NA') {
          this.ckyc_remarks = response['ckyc_remarks'];
          if (response['ckyc_remarks'].hasOwnProperty('message') && response['ckyc_remarks']['message']) {
            $('.ckycRemarks').show().html(response['ckyc_remarks']['message']);
            if (this.is_direct_proposal) {
              $('.verifyErrMsg').html('<div style="color:red;">KYC Status : ' + response['ckyc_remarks']['message'] + '</div>');
            }
          } else if (typeof (response['ckyc_remarks'] == 'object')) {
            $('.ckycRemarks').show().html(JSON.stringify(response['ckyc_remarks']));
            if (this.is_direct_proposal) {
              $('.verifyErrMsg').html('<div style="color:red;">KYC Status : ' + JSON.stringify(response['ckyc_remarks']) + '</div>');
            }
          } else {
            $('.ckycRemarks').show().html(response['ckyc_remarks']);
            if (this.is_direct_proposal) {
              $('.verifyErrMsg').html('<div style="color:red;">KYC Status : ' + JSON.stringify(response['ckyc_remarks']) + '</div>');
            }
          }

          if (!this.is_direct_proposal) {
            $('.ckycRemarksDiv').show()
            $('.kycSuccessAlert').hide();
            // $('#triggerAlert').trigger('click');
            $('#alertModel').modal('show');

          }
        } else {
          if (response.hasOwnProperty('KYC_FullName') && response['KYC_FullName'] && response['KYC_FullName'] !== null && response['KYC_FullName'] !== "" && response['KYC_FullName'].trim() !== '' && response['KYC_FullName'] !== undefined && (!response['KYC_FullName'].includes('undefined'))) {
            var fullname = this.contact_name.trim();
            if (response['KYC_FullName'].trim().toUpperCase() !== fullname.toUpperCase()) {
              $('.kycNameMismatch').show().html('Dear Customer,<br>&nbsp;&nbsp;&nbsp;&nbsp;We have verified Proposal details, with KYC service. Policy will be issued on Proposer Name <u><b>"' + response['KYC_FullName'] + '"</b></u>');
              // $('#triggerAlert').trigger('click');
              $('.i_have_kyc_btn').hide();
              $('#alertModel').modal('show');
              if (this.kycNameSalutationArray.includes(response['KYC_FullName'].split(" ")[0].trim().toUpperCase())) {
                var kycNamearr = response['KYC_FullName'].split(' ')
                kycNamearr.shift()
                var kycName = kycNamearr.join(" ").toUpperCase()
              } else {
                var kycName = response['KYC_FullName'].toUpperCase()
              };

              $('#contact_name').html(kycName);
              $('#contact_name').val(kycName);
              this.Proposal_Request['contact_name'] = kycName;

            }
          }
          if (response && response.hasOwnProperty('KYC_Ref_No') && response['KYC_Ref_No']) {
            this.kyc_ref_no = response['KYC_Ref_No'];
          }
          if (response && response.hasOwnProperty('KYC_Status') && response['KYC_Status'].toUpperCase() === 'FETCH_SUCCESS' && response['KYC_Number']) {
            $('#ekycNo').show().val(response['KYC_Number']);
            this.kyc_no = response['KYC_Number'];
            // $('.alertMsg').html('Congratulations your KYC Number has been fetched. KYC Number -<br>'+ $('.alertMsg').html());
            $('.kycSuccessAlert').show();
            $('.i_have_kyc_btn').hide();
            $('.ckycRemarks').hide();
            if (this.is_direct_proposal) {
              $('.verifyErrMsg').html('<div>KYC Status : KYC Created, Please Verify KYC.</div>');
              $('.verifyKycBtn').css({ 'pointer-events': 'auto', 'background': '#1A81FF' });

            } else {
              // if (!this.alerted) { $('#triggerAlert').trigger('click'); };
              $('#alertModel').modal('show');

            }
          } else {
            // $('.CreateKycDiv').show();
            if (response && response.hasOwnProperty('KYC_Redirect_URL') && response['KYC_Redirect_URL']) {
              this.Kyc_Redirect_Link = response['KYC_Redirect_URL'];
              if (this.is_direct_proposal) {
                this.redirectToInsurer(false);
              } else {
                // if (!this.alerted) { $('#triggerAlert').trigger('click'); };
                $('#alertModel').modal('show');
                $('.kycNameMismatch').show().html('KYC Required KYC is now Mandatory as per new IRDA Guidelines, since we did not find your existing KYC with your PAN and DOB, you will need to create New KYC... You will now be redirected to Insurer Portal for Creation of New KYC');
                $('.alertredirectToInsurerBtn').show();
                $('.alertKycExistsBtn').show();
                $('.alertOkBtn').hide();
              }
            } else {
              if ([1, 44, 26].indexOf(this.Insurer_ID) > -1) {
                // if (!this.alerted) { $('#triggerAlert').trigger('click'); };
                $('#alertModel').modal('show');
                $('.kycNameMismatch').show().html('KYC Required KYC is now Mandatory as per new IRDA Guidelines, since we did not find your existing KYC with your PAN and DOB, you will need to create New KYC... You will now be redirected to Insurer Portal for Creation of New KYC');
                $('.alertCreateKycBtn').show();
                $('.alertOkBtn').hide();
              } else {
                if (this.is_direct_proposal) {
                  $('.verifyErrMsg').html('<div style="color:red;">KYC Status : Technical Issue! Please Retry.</div>');
                } else {
                  $('.ckycRemarksDiv').show();
                  $('.kycSuccessAlert').hide();
                  $('.kycNameMismatch').hide().html('');
                  $('.ckycRemarks').show().html('Technical Issue! Could Not Fetch KYC Details.');
                  // if (!this.alerted) { $('#triggerAlert').trigger('click'); };
                  $('#alertModel').modal('show');
                  $('.alertOkBtn').hide();
                  $('.alertCloseBtn').show();
                  $('.alertCreateKycBtn,.alertKycExistsBtn').hide();
                }
              }
            }
            if (response.hasOwnProperty('KYC_Number') && response['KYC_Number']) {
              $('#ekycNo').show().val(response['KYC_Number']);
              this.kyc_no = response['KYC_Number'];
            }
          }
        }
      },
      (error) => {
        this.loader = false;
        if (this.is_direct_proposal) {
          $('.verifyErrMsg').html('<div style="color:red;">KYC Status : Technical Issue! Please Retry.</div>');
        } else {
          console.log('Error in Fetch Service on Load.');
          $('.ckycRemarksDiv').show();
          $('.kycSuccessAlert').hide();
          $('.kycNameMismatch').hide().html('');
          $('.ckycRemarks').show().html('Technical Issue! Could Not Fetch KYC Details.');
          // if (!this.alerted) { $('#triggerAlert').trigger('click'); };
          $('#alertModel').modal('show');
          $('.alertOkBtn').hide();
          $('.alertCloseBtn').show();
        }
        // $('.CreateKycDiv').show();
      }
    )
  }

  hide_popup() {
    $('#condition_popup').hide();
  }

  backtohome() {
    this.query_params = this.query_params?('?'+this.query_params):"";
    window.location.href = window.location.origin + "/travel-insurance" + this.query_params;
  }

  showdigitagreement() {
    this.TermsForDigit = true;
  }
  showagreement() {
    this.TermsForDigit = false;
  }
  // ekycType(event, data, source) {
  //   console.log(event);
  //   var selectval = $(event).text();
  //   $('#ekycSearchType').val(selectval);
  //   $(this.event_val).closest('li').removeClass('active');
  //   // $(event).closest('.select-dropdown').removeClass('show');
  //   // $(event).closest('.select-dropdown-box').removeClass('show');
  //   // $(event).closest('.select-dropdown-box-li').toggleClass('active');
  //   // $(event).closest('.dropdown-list-row').removeClass("active");
  //   $(event).closest('li').addClass('active');
  //   this.event_val = event;
  //   this.create_kyc_data = data;
  //   this.dropdown_value = data == "CKYCNumber" ? "CKYC" : data;
  //   // this.selectDropdown(event, data, source);s
  //   if (source == 'eKyc') {
  //     $('#ekycPan,#ekycDob,#ekycAadhar,#ekycSearchType,#eKycDocspan,#ekycCKYC,#ekycGSTIN,#ekycJob_card,#ekycDriving,#ekycvoter_id,#ekycPassport').removeClass('err_border');
  //     $('#ekycPanErr,#ekycDobErr,#ekycAadharErr,#ekycSearchTypeErr,#ekycUploadAadharErr,#ekycPassportErr,#ekycvoter_idErr,#ekycDrivingErr,#ekycJob_cardErr,#ekycGSTINErr,#ekycCKYCErr').html('');
  //     // this.ekycSearchType = data;
  //     $('#ekycAadharDiv,#ekycPassportDiv,#ekycVoter_idDiv,#ekycDrivingDiv,#ekycJobDiv,#ekycGSTINDiv,#ekycCKYCDiv,#ekycPanDiv,#ekycDobDiv,#ekycUploadAadharDiv,#ekycBajajDiv,#ekycUploadBajajDocs').hide();

  //     // if (data == 'Both') {
  //     //   $('#ekycAadharDiv,#ekycPanDiv').show();
  //     // } else {
  //     //   $('#ekyc' + data + 'Div').show();
  //     // }
  //     if (data === 'Aadhar' || data === 'Pan' || data == 'Passport' || data == 'VoterID' || data == 'DrivingLicense' || data == 'NREGAJobCard' || data == 'GSTIN' || data == 'CKYCNumber') {
  //       $('#ekycUploadAadharDiv').show();
  //       $('#ekycDobDiv').show();
  //       if (data === 'Aadhar') {
  //         $('#ekycAadharDiv').show();
  //       }
  //       if (data === 'Pan') {
  //         $('#ekycPanDiv').show();
  //         $('#ekycPan').val(this.pan_card);
  //       }
  //       if (data === 'Passport') {
  //         $('#ekycPassportDiv').show();
  //       }
  //       if (data === 'VoterID') {
  //         $('#ekycVoter_idDiv').show();
  //       }
  //       if (data === 'DrivingLicense') {
  //         $('#ekycDrivingDiv').show();
  //       }
  //       if (data === 'NREGAJobCard') {
  //         $('#ekycJobDiv').show();
  //       }
  //       if (data === 'GSTIN') {
  //         $('#ekycGSTINDiv').show();
  //       }
  //       if (data === 'CKYCNumber') {
  //         $('#ekycCKYCDiv').show();
  //       }
  //     }
  //     else if (this.Insurer_ID == 1) {
  //       var label = {
  //         'Passport': 'Passport',
  //         'VoterID': 'Voter ID',
  //         'DrivingLicense': 'Driving License',
  //         'NREGAJobCard': 'NREGA Job Card',
  //         'GSTIN': 'GSTIN',
  //         'CKYCNumber': 'CKYC',
  //         'Aadhar': 'Aadhar'
  //       }
  //       $('#ekycDobDiv').show();
  //       $('#ekycBajajDiv').show();
  //       $('#ekycUploadBajajDocs').show();
  //       $('.ekyc_doc_label').html(label[data] + ' :&nbsp;');
  //       $('#bajaj_DocNumber').attr('placeholder', label[data]);
  //       $('.eKycDocLabel_Bajaj').text('Upload ' + label[data]);
  //     }
  //   }
  // };
  selectekycDob() {
    $(".ekycDob").datepicker({
      format: "dd-mm-yyyy",
      todayHighlight: true,
      autoclose: true,
      startView: 2,
      yearRange: "-4:+0",
      changeYear: true,
      changeMonth: true,
      startDate: addYears(new Date(), -100),
      endDate: addYears(new Date(), -18),
      onSelect: function (dob) {
        // $('#ekycAadhar').removeClass('has-error', 'border-thick');
        // $('#ekycAadhar').next(".valerr").hide();
      }
    }).datepicker('show');
  }

  submitEkyc = async (src) => {
    var err = 0;
    var req = {};
    $('#erreKycNo').hide();
    let DrivingLicenseRegex = new RegExp('^(([A-Z]{2}[0-9]{2})|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$');
    let VoterIDRegex = new RegExp('^[A-Z]{3}[0-9]{7}$');
    let PassportRegex = new RegExp('[A-Z]{1}[0-9]{7}');
    let UIDRegex = new RegExp('^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$');
    let NREGAJobCardRegex = new RegExp('^[a-zA-Z0-9]$');  // wrong regex
    let GSTINRegex = new RegExp('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$');
    let CKYCNumberRegex = '';
    if (src === 'popup') {
      if (this.ekycSearchType !== undefined && this.ekycSearchType !== '' && this.ekycSearchType !== null) {
        $('#ekycSearchTypeErr').html('');
        $('#ekycSearchType').removeClass('has-error', 'border-thick');

        // BAJAJ CHANGES
        if (this.Insurer_ID === 1 && this.ekycSearchType !== 'Pan' && this.ekycSearchType !== 'Aadhar') {
          let selectedDoctypeVal = $('#bajaj_DocNumber').val();
          if ((this.ekycSearchType + 'Regex')) {
            if (selectedDoctypeVal && selectedDoctypeVal.match(eval(this.ekycSearchType + 'Regex'))) {
              // if(selectedDoctypeVal && selectedDoctypeVal.match(PassportRegex)){
              $('#bajaj_DocNumber').removeClass('has-error', 'border-thick');
              $('#ekycMobile-error').html('');
              $('#ekycBajaj' + this.ekycSearchType + 'Err').html('');
              req["search_type"] = this.ekycSearchType;
              req["DocNo"] = selectedDoctypeVal;
              req["Document_Type"] = this.ekycSearchType;
              req["Document_ID"] = selectedDoctypeVal;
            }
            else {
              $('#bajaj_DocNumber').addClass('has-error', 'border-thick');
              err++;
              $('#ekycBajaj' + this.ekycSearchType + 'Err').html('Enter Valid ' + this.ekycSearchType + ' Number');
            }
          } else {
            if (selectedDoctypeVal) {
              $('#bajaj_DocNumber').removeClass('has-error', 'border-thick');
              $('#ekycBajaj' + this.ekycSearchType + 'Err').html('');
            } else {
              $('#bajaj_DocNumber').addClass('has-error', 'border-thick');
              err++;
              $('#ekycBajaj' + this.ekycSearchType + 'Err').html('Enter ' + this.ekycSearchType + ' Number');
            }
          }
          if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && this.doc_saved_via_android === true) {
            $('#BajajeKyc' + this.ekycSearchType + 'Doc').removeClass('has-error', 'border-thick');
            $('#ekycUploadBajaj' + this.ekycSearchType + 'Err').html('');
          } else {
            let selectedDocVal = $('#BajajeKycDoc').val();
            if (selectedDocVal) {
              var sizeinkb = parseFloat(((<HTMLInputElement>document.getElementById("BajajeKycDoc")).files[0].size / 1024) as any).toFixed(2);
              if (sizeinkb as any / 1000 > 4) {
                $('#BajajeKycDoc').addClass('has-error', 'border-thick');
                err++;
                $('#ekycUploadBajaj' + this.ekycSearchType + 'Err').html('File size more than 4mb.');
              } else {
                let a = await this.toBase64('BajajeKycDoc');
                if (a) {
                  $('#BajajeKyc' + this.ekycSearchType + 'Doc').removeClass('has-error', 'border-thick');
                  $('#ekycUploadBajaj' + this.ekycSearchType + 'Err').html('');
                  req['Doc1'] = this['BajajeKycDoc_file'];
                  var extension = selectedDocVal.split(".");
                  req['Doc1_Name'] = $('#BajajeKycDoc')[0].files[0].name;
                  // req['doc3_extension'] = extension[extension.length - 1];
                  req['Document_Type'] = this.ekycSearchType;
                } else {
                  $('#BajajeKycDoc').addClass('has-error', 'border-thick');
                  err++;
                  $('#ekycUploadBajaj' + this.ekycSearchType + 'Err').html('Please select document');
                }
              }
            }
            else {
              $('#BajajeKycDoc').addClass('has-error', 'border-thick');
              err++;
              $('#ekycUploadBajaj' + this.ekycSearchType + 'Err').html('Please select document');
            }
          }
        }
        if (this.Insurer_ID === 26 && this.ekycSearchType !== 'Pan' && this.ekycSearchType !== 'Aadhar') {
          let selectedDoctypeVal = $('#star_DocNumber').val();
          if ((this.ekycSearchType + 'Regex')) {
            if (selectedDoctypeVal && selectedDoctypeVal.match(eval(this.ekycSearchType + 'Regex'))) {
              // if(selectedDoctypeVal && selectedDoctypeVal.match(PassportRegex)){
              $('#star_DocNumber').removeClass('has-error', 'border-thick');
              $('#ekycMobile-error').html('');
              $('#ekycStar' + this.ekycSearchType + 'Err').html('');
              req["search_type"] = this.ekycSearchType;
              req[this.ekycSearchType] = selectedDoctypeVal;
              req["Document_Type"] = this.ekycSearchType;
              req["Document_ID"] = selectedDoctypeVal;
            }
            else {
              $('#star_DocNumber').addClass('has-error', 'border-thick');
              err++;
              $('#ekycStar' + this.ekycSearchType + 'Err').html('Enter Valid ' + this.ekycSearchType + ' Number');
            }
          } else {
            if (selectedDoctypeVal) {
              $('#star_DocNumber').removeClass('has-error', 'border-thick');
              $('#ekycStar' + this.ekycSearchType + 'Err').html('');
            } else {
              $('#star_DocNumber').addClass('has-error', 'border-thick');
              err++;
              $('#ekycStar' + this.ekycSearchType + 'Err').html('Enter ' + this.ekycSearchType + ' Number');
            }
          }
          if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && this.doc_saved_via_android === true) {
            $('#StareKycDocFront' + this.ekycSearchType + 'Doc').removeClass('has-error', 'border-thick');
            $('#ekycUploadStarFront' + this.ekycSearchType + 'Err').html('');
          } else {
            let selectedDocValFront = $('#StareKycDocFront').val();
            let selectedDocValBack = $('#StareKycDocBack').val();
            let selectedDocValpp = $('#StareKycDocProfilePicture').val();
            if (selectedDocValFront) {
              var sizeinkb = parseFloat(((<HTMLInputElement>document.getElementById("StareKycDocFront")).files[0].size / 1024) as any).toFixed(2);
              if (sizeinkb as any / 1000 > 4) {
                $('#StareKycDocFront').addClass('has-error', 'border-thick');
                err++;
                $('#ekycUploadStarFront' + this.ekycSearchType + 'Err').html('File size more than 4mb.');
              } else {
                let a = await this.toBase64('StareKycDocFront');
                if (a) {
                  $('#StareKycFront' + this.ekycSearchType + 'Doc').removeClass('has-error', 'border-thick');
                  $('#ekycUploadStarFront' + this.ekycSearchType + 'Err').html('');
                  req['Doc1'] = this['StareKycDocFront_file'];
                  var extension = selectedDocValFront.split(".");
                  req['Doc1_Name'] = $('#StareKycDocFront')[0].files[0].name;
                  // req['doc3_extension'] = extension[extension.length - 1];
                  req['Document_Type'] = this.ekycSearchType;
                } else {
                  $('#StareKycDocFront').addClass('has-error', 'border-thick');
                  err++;
                  $('#ekycUploadStarFront' + this.ekycSearchType + 'Err').html('Please select document');
                }
              }
            }
            else {
              $('#StareKycDocFront').addClass('has-error', 'border-thick');
              err++;
              $('#ekycUploadStarFront' + this.ekycSearchType + 'Err').html('Please select document');
            }

            if (selectedDocValBack) {
              var sizeinkb = parseFloat(((<HTMLInputElement>document.getElementById("StareKycDocBack")).files[0].size / 1024) as any).toFixed(2);
              if (sizeinkb as any / 1000 > 4) {
                $('#StareKycDocBack').addClass('has-error', 'border-thick');
                err++;
                $('#ekycUploadStarBack' + this.ekycSearchType + 'Err').html('File size more than 4mb.');
              } else {
                let a = await this.toBase64('StareKycDocBack');
                if (a) {
                  $('#StareKycBack' + this.ekycSearchType + 'Doc').removeClass('has-error', 'border-thick');
                  $('#ekycUploadStarBack' + this.ekycSearchType + 'Err').html('');
                  req['Doc2'] = this['StareKycDocBack_file'];
                  var extension = selectedDocValBack.split(".");
                  req['Doc2_Name'] = $('#StareKycDocBack')[0].files[0].name;
                  // req['doc3_extension'] = extension[extension.length - 1];
                  req['Document_Type'] = this.ekycSearchType;
                } else {
                  $('#StareKycDocBack').addClass('has-error', 'border-thick');
                  err++;
                  $('#ekycUploadStarBack' + this.ekycSearchType + 'Err').html('Please select document');
                }
              }
            }
            // else {
            //   $('#StareKycDocBack').addClass('has-error', 'border-thick');
            //   err++;
            //   $('#ekycUploadStarBack' + this.ekycSearchType + 'Err').html('Please select document');
            // }
            if (selectedDocValpp) {
              var sizeinkb = parseFloat(((<HTMLInputElement>document.getElementById("StareKycDocProfilePicture")).files[0].size / 1024) as any).toFixed(2);
              if (sizeinkb as any / 1000 > 4) {
                $('#StareKycDocProfilePicture').addClass('has-error', 'border-thick');
                err++;
                $('#ekycUploadStarProfilePictureDocs' + this.ekycSearchType + 'Err').html('File size more than 4mb.');
              } else {
                let a = await this.toBase64('StareKycDocProfilePicture');
                if (a) {
                  $('#StareKycFront' + this.ekycSearchType + 'Doc').removeClass('has-error', 'border-thick');
                  $('#ekycUploadStarProfilePictureDocs' + this.ekycSearchType + 'Err').html('');
                  req['Doc3'] = this['StareKycDocProfilePicture_file'];
                  var extension = selectedDocValpp.split(".");
                  req['Doc3_Name'] = $('#StareKycDocProfilePicture')[0].files[0].name;
                  // req['doc3_extension'] = extension[extension.length - 1];
                  req['Document_Type'] = this.ekycSearchType;
                } else {
                  $('#StareKycDocProfilePicture').addClass('has-error', 'border-thick');
                  err++;
                  $('#ekycUploadStarProfilePictureDocs' + this.ekycSearchType + 'Err').html('Please select document');
                }
              }
            }
            else {
              $('#StareKycDocProfilePicture').addClass('has-error', 'border-thick');
              err++;
              $('#ekycUploadStarProfilePictureDocs' + this.ekycSearchType + 'Err').html('Please select document');
            }
          }
        }
        if (this.ekycSearchType == 'Mobile') {
          if ($('#ekycMobile').val().length == 0 || this.checkMobile($('#ekycMobile')) == false) {
            $('#ekycMobile').addClass('has-error', 'border-thick');
            err++;
            $('#ekycMobileErr').html('Enter valid mobile number')
          } else {
            $('#ekycMobile').removeClass('has-error', 'border-thick');
            $('#ekycMobile-error').html('');
            $('#ekycMobileErr').html('')
            req["search_type"] = "MOBILE";
            req["mobile"] = $('#ekycMobile').val();
          }
        }
        if (this.ekycSearchType == 'Aadhar' || this.ekycSearchType == 'Both') {
          var aadharNoPattern = /^\d{12}$/;
          if ($('#ekycAadhar').val().match(aadharNoPattern) != null) {
            $('#ekycAadhar').removeClass('has-error', 'border-thick');
            $('#ekycAadharErr').html('');
          } else {
            $('#ekycAadhar').addClass('has-error', 'border-thick');
            err++
            $('#ekycAadharErr').html('Enter valid aadhar number');
          }
          req["search_type"] = "AADHAR";
          req["aadhar"] = $('#ekycAadhar').val();
          req["Document_Type"] = "AADHAR";
          req["Document_ID"] = $('#ekycAadhar').val();
        }
        if (this.ekycSearchType == 'Pan' || this.ekycSearchType == 'Both') {
          var pan = $("#ekycPan").val().toString().toUpperCase();
          var pattern = /[a-zA-Z]{3}[PCHFATBLJG]{1}[a-zA-Z]{1}[0-9]{4}[a-zA-Z]{1}$/;
          if (pan.match(pattern) != null) {
            if (this.summary['Proposal_Request']['pan']) {
              if (pan == this.summary['Proposal_Request']['pan']) {
                $("#ekycPan").removeClass('has-error', 'border-thick');
                $('#ekycPanErr').html('');
              } else {
                $("#ekycPan").addClass('has-error', 'border-thick');
                err++;
                $('#ekycPanErr').html('PAN number differs from proposal form.');
              }
            } else {
              $("#ekycPan").removeClass('has-error', 'border-thick');
              $('#ekycPanErr').html('');
            }
          } else {
            $("#ekycPan").addClass('has-error', 'border-thick');
            err++;
            $('#ekycPanErr').html('Enter valid PAN number');
          }
          req["search_type"] = "PAN";
          req["pan"] = $("#ekycPan").val().toUpperCase();
          req["Document_Type"] = "PAN";
          req["Document_ID"] = $('#ekycPan').val();
        }
        //if(this.ekycSearchType == 'Pan' || this.ekycSearchType == 'Aadhar' || this.ekycSearchType === 'Both'){
        if ($('#ekycDob').val() == '' || $('#ekycDob').val() == null || $('#ekycDob').val() == undefined) {
          $('#ekycDob').addClass('has-error', 'border-thick');
          err++;
          // if (this.summary['Quote_Request'].vehicle_registration_type.toLowerCase() === "corporate") {
          //   $('#ekycDobErr').html('Enter date of incorporation');
          // } else {
          //   $('#ekycDobErr').html('Enter date of birth');
          // }
        } else {
          req["dob"] = moment($('#ekycDob').val(), 'DD-MM-YYYY').format('DD/MM/YYYY');
          $('#ekycDob').removeClass('has-error', 'border-thick');
          $('#ekycDobErr').html('');
          // if (this.summary['Quote_Request'].vehicle_registration_type.toLowerCase() === "corporate") {
          //   req['date_of_incorporation'] = moment($('#ekycDob').val(), 'DD-MM-YYYY').format('DD/MM/YYYY');
          // } else {
          //   req["dob"] = moment($('#ekycDob').val(), 'DD-MM-YYYY').format('DD/MM/YYYY');
          // }
        }
        //Ekyc upload document validation start
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && this.aadhar_saved_via_android === true) {
          $('#eKycAadharDoc').removeClass('has-error', 'border-thick');
          $('#ekycUploadAadharErr').html('');
        } else {
          if ((this.ekycSearchType === 'Aadhar' || this.ekycSearchType === 'Both') && [1, 26].indexOf(this.Insurer_ID) > -1) {
            if ($('#eKycAadharDoc').val() == '' || $('#eKycAadharDoc').val() == null || $('#eKycAadharDoc').val() == undefined) {
              $('#eKycAadharDoc').addClass('has-error', 'border-thick');
              err++;
              $('#ekycUploadAadharErr').html('Please select document');
            } else {
              var sizeinkb = parseFloat(((<HTMLInputElement>document.getElementById("eKycAadharDoc")).files[0].size / 1024) as any).toFixed(2);
              if (sizeinkb as any / 1000 > 5) {
                $('#eKycAadharDoc').addClass('has-error', 'border-thick');
                err++;
                $('#ekycUploadAadharErr').html('File size more than 5 MB.');
              } else {
                let a = await this.toBase64('eKycAadharDoc');
                if (a) {
                  $('#eKycAadharDoc').removeClass('has-error', 'border-thick');
                  $('#ekycUploadAadharErr').html('');
                  // req['aadhar_image'] = this.eKycAadharDoc_file;
                  req['Doc1'] = this.eKycAadharDoc_file;
                  req['Doc1_Name'] = $('#eKycAadharDoc')[0].files[0].name;
                  // var extension = $('#eKycAadharDoc').val().split(".");
                  // req['aadhar_file_name'] = $('#eKycAadharDoc')[0].files[0].name;
                  // req['aadhar_file_extension'] = extension[extension.length - 1];
                } else {
                  $('#eKycAadharDoc').addClass('has-error', 'border-thick');
                  err++;
                  $('#ekycUploadAadharErr').html('Please select document');
                }
              }
            }
            if (this.Insurer_ID == 26) {
              let selectedDocValBack = $('#StareKycDocBack').val();
              let selectedDocValpp = $('#StareKycDocProfilePicture').val();

              if (selectedDocValBack) {
                var sizeinkb = parseFloat(((<HTMLInputElement>document.getElementById("StareKycDocBack")).files[0].size / 1024) as any).toFixed(2);
                if (sizeinkb as any / 1000 > 4) {
                  $('#StareKycDocBack').addClass('has-error', 'border-thick');
                  err++;
                  $('#ekycUploadStarBack' + this.ekycSearchType + 'Err').html('File size more than 4mb.');
                } else {
                  let a = await this.toBase64('StareKycDocBack');
                  if (a) {
                    $('#StareKycBack' + this.ekycSearchType + 'Doc').removeClass('has-error', 'border-thick');
                    $('#ekycUploadStarBack' + this.ekycSearchType + 'Err').html('');
                    req['Doc2'] = this['StareKycDocBack_file'];
                    var extension = selectedDocValBack.split(".");
                    req['Doc2_Name'] = $('#StareKycDocBack')[0].files[0].name;
                    // req['doc3_extension'] = extension[extension.length - 1];
                    req['Document_Type'] = this.ekycSearchType;
                  } else {
                    $('#StareKycDocBack').addClass('has-error', 'border-thick');
                    err++;
                    $('#ekycUploadStarBack' + this.ekycSearchType + 'Err').html('Please select document');
                  }
                }
              }
              // else {
              //   $('#StareKycDocBack').addClass('has-error', 'border-thick');
              //   err++;
              //   $('#ekycUploadStarBack' + this.ekycSearchType + 'Err').html('Please select document');
              // }
              if (selectedDocValpp) {
                var sizeinkb = parseFloat(((<HTMLInputElement>document.getElementById("StareKycDocProfilePicture")).files[0].size / 1024) as any).toFixed(2);
                if (sizeinkb as any / 1000 > 4) {
                  $('#StareKycDocProfilePicture').addClass('has-error', 'border-thick');
                  err++;
                  $('#ekycUploadStarProfilePictureDocs' + this.ekycSearchType + 'Err').html('File size more than 4mb.');
                } else {
                  let a = await this.toBase64('StareKycDocProfilePicture');
                  if (a) {
                    $('#StareKycFront' + this.ekycSearchType + 'Doc').removeClass('has-error', 'border-thick');
                    $('#ekycUploadStarProfilePictureDocs' + this.ekycSearchType + 'Err').html('');
                    req['Doc3'] = this['StareKycDocProfilePicture_file'];
                    var extension = selectedDocValpp.split(".");
                    req['Doc3_Name'] = $('#StareKycDocProfilePicture')[0].files[0].name;
                    // req['doc3_extension'] = extension[extension.length - 1];
                    req['Document_Type'] = this.ekycSearchType;
                  } else {
                    $('#StareKycDocProfilePicture').addClass('has-error', 'border-thick');
                    err++;
                    $('#ekycUploadStarProfilePictureDocs' + this.ekycSearchType + 'Err').html('Please select document');
                  }
                }
              }
              else {
                $('#StareKycDocProfilePicture').addClass('has-error', 'border-thick');
                err++;
                $('#ekycUploadStarProfilePictureDocs' + this.ekycSearchType + 'Err').html('Please select document');
              }
            }
          }

        }

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && this.pan_saved_via_android === true) {
          $('#eKycPanDoc').removeClass('has-error', 'border-thick');
          $('#ekycUploadPanErr').html('');
        } else {
          if ((this.ekycSearchType === 'Pan' || this.ekycSearchType === 'Both') && [44, 1].indexOf(this.Insurer_ID) > -1) {
            if ($('#eKycPanDoc').val() == '' || $('#eKycPanDoc').val() == null || $('#eKycPanDoc').val() == undefined) {
              $('#eKycPanDoc').addClass('has-error', 'border-thick');
              err++;
              $('#ekycUploadPanErr').html('Please select document');
            } else {
              var sizeinkb = parseFloat(((<HTMLInputElement>document.getElementById("eKycPanDoc")).files[0].size / 1024) as any).toFixed(2);
              if (sizeinkb as any / 1000 > 5) {
                $('#eKycPanDoc').addClass('has-error', 'border-thick');
                err++;
                $('#ekycUploadPanErr').html('File size more than 5 MB.');
              } else {
                let a = await this.toBase64('eKycPanDoc');
                if (a) {
                  $('#eKycPanDoc').removeClass('has-error', 'border-thick');
                  $('#ekycUploadPanErr').html('');
                  req['Doc1_Name'] = $('#eKycPanDoc')[0].files[0].name;
                  req['Doc1'] = this.eKycPanDoc_file;
                } else {
                  $('#eKycPanDoc').addClass('has-error', 'border-thick');
                  err++;
                  $('#ekycUploadPanErr').html('Please select document');
                }
              }
            }
          }
        }
        /* Old single doc code
        if($('#eKycDoc').val() == '' || $('#eKycDoc').val() ==null || $('#eKycDoc').val() == undefined){
          $('#eKycDoc').addClass('has-error', 'border-thick');
          err++;
          $('#ekycUploadDocErr').html('Please select document');
        }else{
          let a = await this.toBase64('eKycDoc');
          if(a){
            $('#eKycDoc').removeClass('has-error', 'border-thick');
            $('#ekycUploadDocErr').html('');
            if(this.ekycSearchType == 'Pan'){
              req['upload_pan'] = this.eKycDoc_file;
              //formData.append('upload_pan',this.uploadedeKYCFile['0'], this.uploadedeKYCFile['0'].name);
            }else{
              req['upload_aadhar'] = this.eKycDoc_file;
              //formData.append('upload_aadhar',this.uploadedeKYCFile['0'], this.uploadedeKYCFile['0'].name);
            }
          }else{
            $('#eKycDoc').addClass('has-error', 'border-thick');
            err++;
            $('#ekycUploadDocErr').html('Please select document');
          }
        }
        */
        //Ekyc upload document validation end
        //}
      } else {
        err++
        $('#ekycSearchType').addClass('has-error', 'border-thick');
        $('#ekycSearchTypeErr').html('Select search type');
      }
      if (this.ekycSearchType === 'Both') {
        req['search_type'] = 'BOTH';
      }
    }
    // else {
    //   if (this.is_kyc_verified && this.kyc_no !== $("#ekycNo").val()) {
    //     err++;
    //     $('#erreKycNo').html('Please enter correct KYC Number.');
    //   }
    //   req['search_type'] = 'VERIFY';
    //   req['user_kyc_no'] = $("#ekycNo").val();
    //   req['aadhar'] = this.summary['Proposal_Request'].aadhar ? this.summary['Proposal_Request'].aadhar : '';
    //   req['pan'] = this.summary['Proposal_Request'].pan ? this.summary['Proposal_Request'].pan.toUpperCase() : '';
    //   if (this.summary['Quote_Request'].vehicle_registration_type.toLowerCase() === "corporate") {
    //     req['date_of_incorporation'] = "";
    //   } else {
    //     req['dob'] = moment(this.summary['Proposal_Request'].birth_date, 'DD-MM-YYYY').format('DD/MM/YYYY');//this.change_formate(this.summary['Proposal_Request'].birth_date) ? this.change_formate(this.summary['Proposal_Request'].birth_date) : '';
    //   }
    // }
    if (err == 0) {
      req['Document_ID'] = this.pan_card;
      req['Document_Type'] = 'PAN';
      req['insurer_id'] = this.Insurer_ID;
      req['crn'] = this.CRN;
      req['udid'] = this.summary['Proposal_Request'].udid;
      req['Proposal_Request'] =  Object.assign({}, this.summary['Proposal_Request'])
      req['Proposal_Request']['birth_date'] = moment(req['Proposal_Request']['birth_date'], 'YYYY-MM-DD').format('DD/MM/YYYY');
      req['Quote_Id'] = this.summary['Summary']['Insurer_Transaction_Identifier'] ? this.summary['Summary']['Insurer_Transaction_Identifier'] : "";
      this.loader = true;
      var methodName = '/postservicecall/kyc_details/create_kyc_details';
      this._horizon.callAPIPost(req, methodName, 2).subscribe(response => {
        //  response = {"KYC_Doc_No":"897310324169","KYC_Number":"","KYC_FullName":"","KYC_Ref_No":"","KYC_Redirect_URL":"","KYC_Insurer_ID":26,"KYC_PB_CRN":1071449,"KYC_Status":"CREATE_FAIL","KYC_Search_Type":"Aadhar","KYC_Request":{"method":"POST","url":"https://securegw-uat.starhealth.in/api/proposal-service/v2/ckyc/generate","headers":{"Content-Type":"multipart/form-data","APIKEY":"af2d561cd6644c34bb8fc61926da5e8f","SECRETKEY":"5aedbe3f7f1048bd81b60a31ef2e011b"},"formData":{"bodyJson":"{\"genderId\":1,\"birthdate\":\"July 20, 1993\",\"occupationId\":\"1\",\"incomeSourceId\":1,\"isAnyonePEP\":0,\"idOrAddressProofDocumentId\":4,\"idOrAddressProofDocumentNumber\":\"4169\",\"pan\":\"FAGPS8388E\",\"titleId\":1,\"firstName\":\"ASHUTOSHKUMAR\",\"middleName\":\"SANTOSHKUMAR\",\"lastName\":\"SINGH\",\"familyRelationshipId\":1,\"familyMemberTitleId\":1,\"familyMemberFirstName\":\"SADAS\",\"familyMemberLastName\":\"SADSAD\",\"addressLineOne\":\"ASDAS ASDAS ASDAS ASDASD\",\"addressLineTwo\":\"400607-THANE (M CORP.)(THANE)\",\"cityName\":\"Thane\",\"districtName\":\"Thane\",\"stateCode\":\"MH\",\"countryCode\":\"IN\",\"postalCode\":\"400607\"}","idOrAddressProofDocumentFrontSide":{"value":{"_readableState":{"objectMode":false,"highWaterMark":65536,"buffer":{"head":null,"tail":null,"length":0},"length":0,"pipes":null,"pipesCount":0,"flowing":true,"ended":true,"endEmitted":true,"reading":false,"sync":false,"needReadable":false,"emittedReadable":false,"readableListening":false,"resumeScheduled":false,"defaultEncoding":"utf8","ranOut":false,"awaitDrain":0,"readingMore":false,"decoder":null,"encoding":null},"readable":false,"domain":null,"_events":{},"_eventsCount":3,"path":"D:\\Office\\HorizonAPI\\SourceCode//tmp/kyc_documents/1071449_Aadhar_front_26.jpeg","fd":null,"flags":"r","mode":438,"autoClose":true,"bytesRead":188922,"destroyed":true,"closed":true},"options":{"filename":"minal_voterid.jpeg","contentType":null}},"idOrAddressProofDocumentBackSide":{"value":{"_readableState":{"objectMode":false,"highWaterMark":65536,"buffer":{"head":null,"tail":null,"length":0},"length":0,"pipes":null,"pipesCount":0,"flowing":true,"ended":true,"endEmitted":true,"reading":false,"sync":false,"needReadable":false,"emittedReadable":false,"readableListening":false,"resumeScheduled":false,"defaultEncoding":"utf8","ranOut":false,"awaitDrain":0,"readingMore":false,"decoder":null,"encoding":null},"readable":false,"domain":null,"_events":{},"_eventsCount":3,"path":"D:\\Office\\HorizonAPI\\SourceCode//tmp/kyc_documents/1071449_Aadhar_back_26.jpeg","fd":null,"flags":"r","mode":438,"autoClose":true,"bytesRead":96905,"destroyed":true,"closed":true},"options":{"filename":"pancard_187.jpeg","contentType":null}},"photographDocument":{"value":{"_readableState":{"objectMode":false,"highWaterMark":65536,"buffer":{"head":null,"tail":null,"length":0},"length":0,"pipes":null,"pipesCount":0,"flowing":false,"ended":true,"endEmitted":true,"reading":false,"sync":false,"needReadable":false,"emittedReadable":false,"readableListening":false,"resumeScheduled":false,"defaultEncoding":"utf8","ranOut":false,"awaitDrain":0,"readingMore":false,"decoder":null,"encoding":null},"readable":false,"domain":null,"_events":{},"_eventsCount":3,"path":"D:\\Office\\HorizonAPI\\SourceCode//tmp/kyc_documents/1071449_profile_picture_26.jpeg","fd":null,"flags":"r","mode":438,"autoClose":true,"bytesRead":181447,"destroyed":true,"closed":true},"options":{"filename":"ANIKET.jpeg","contentType":null}}}},"KYC_Response":"","ckyc_remarks":["We have received a blank document. Please upload valid aadhar document or proceed with other document type."]}

      //  response = {"KYC_Doc_No":"477598742586","KYC_Number":"","KYC_FullName":"","KYC_Ref_No":"vockyc62361a2e052b","KYC_Redirect_URL":"","KYC_Insurer_ID":26,"KYC_PB_CRN":1071449,"KYC_Status":"CREATE_SUCCESS","KYC_Search_Type":"Aadhar","KYC_Request":{"method":"POST","url":"https://securegw-uat.starhealth.in/api/proposal-service/v2/ckyc/generate","headers":{"Content-Type":"multipart/form-data","APIKEY":"af2d561cd6644c34bb8fc61926da5e8f","SECRETKEY":"5aedbe3f7f1048bd81b60a31ef2e011b"},"formData":{"bodyJson":"{\"genderId\":1,\"birthdate\":\"July 20, 1993\",\"occupationId\":\"1\",\"incomeSourceId\":1,\"isAnyonePEP\":0,\"idOrAddressProofDocumentId\":4,\"idOrAddressProofDocumentNumber\":\"2586\",\"pan\":\"FAGPS8388E\",\"titleId\":1,\"firstName\":\"ASHUTOSHKUMAR\",\"middleName\":\"SANTOSHKUMAR\",\"lastName\":\"SINGH\",\"familyRelationshipId\":1,\"familyMemberTitleId\":1,\"familyMemberFirstName\":\"SADAS\",\"familyMemberLastName\":\"SADSAD\",\"addressLineOne\":\"ASDAS ASDAS ASDAS ASDASD\",\"addressLineTwo\":\"400607-THANE (M CORP.)(THANE)\",\"cityName\":\"Thane\",\"districtName\":\"Thane\",\"stateCode\":\"MH\",\"countryCode\":\"IN\",\"postalCode\":\"400607\"}","idOrAddressProofDocumentFrontSide":{"value":{"_readableState":{"objectMode":false,"highWaterMark":65536,"buffer":{"head":null,"tail":null,"length":0},"length":0,"pipes":null,"pipesCount":0,"flowing":false,"ended":true,"endEmitted":true,"reading":false,"sync":false,"needReadable":false,"emittedReadable":false,"readableListening":false,"resumeScheduled":false,"defaultEncoding":"utf8","ranOut":false,"awaitDrain":0,"readingMore":false,"decoder":null,"encoding":null},"readable":false,"domain":null,"_events":{},"_eventsCount":3,"path":"D:\\Office\\HorizonAPI\\SourceCode//tmp/kyc_documents/1071449_Aadhar_front_26.jpeg","fd":null,"flags":"r","mode":438,"autoClose":true,"bytesRead":96905,"destroyed":true,"closed":true},"options":{"filename":"pan.jpeg","contentType":null}},"idOrAddressProofDocumentBackSide":{"value":{"_readableState":{"objectMode":false,"highWaterMark":65536,"buffer":{"head":null,"tail":null,"length":0},"length":0,"pipes":null,"pipesCount":0,"flowing":false,"ended":true,"endEmitted":true,"reading":false,"sync":false,"needReadable":false,"emittedReadable":false,"readableListening":false,"resumeScheduled":false,"defaultEncoding":"utf8","ranOut":false,"awaitDrain":0,"readingMore":false,"decoder":null,"encoding":null},"readable":false,"domain":null,"_events":{},"_eventsCount":3,"path":"D:\\Office\\HorizonAPI\\SourceCode//tmp/kyc_documents/1071449_Aadhar_back_26.jpg","fd":null,"flags":"r","mode":438,"autoClose":true,"bytesRead":92311,"destroyed":true,"closed":true},"options":{"filename":"adhar.jpg","contentType":null}},"photographDocument":{"value":{"_readableState":{"objectMode":false,"highWaterMark":65536,"buffer":{"head":null,"tail":null,"length":0},"length":0,"pipes":null,"pipesCount":0,"flowing":true,"ended":true,"endEmitted":true,"reading":false,"sync":false,"needReadable":false,"emittedReadable":false,"readableListening":false,"resumeScheduled":false,"defaultEncoding":"utf8","ranOut":false,"awaitDrain":0,"readingMore":false,"decoder":null,"encoding":null},"readable":false,"domain":null,"_events":{},"_eventsCount":3,"path":"D:\\Office\\HorizonAPI\\SourceCode//tmp/kyc_documents/1071449_profile_picture_26.jpeg","fd":null,"flags":"r","mode":438,"autoClose":true,"bytesRead":96905,"destroyed":true,"closed":true},"options":{"filename":"PanCard_187.jpeg","contentType":null}}}},"KYC_Response":"","ckyc_remarks":"NA"}
        // response = { KYC_Status: 'CREATE_SUCCESS', Document_Path: 'sdfsdfds' }
        this.loader = false;
        // $('#triggerEkycRes').trigger('click')
        // $('#eKycModelResponse').modal('show');
        $('#eKycModel').modal('hide')
        $('#ekycResponseDivFailed,#ekycResponseDivSuccess').hide();
        $('#ekycResponseDiv').show();
        // $('#edelweissKycUrl,#edelweissKycNo,#ekycResponseDivErr,.ckycVCRemarks').hide().html('');
        $('#eKycModelResponse').modal('show');
        if (response && response.hasOwnProperty('KYC_Status') && response['KYC_Status'].toUpperCase() === 'CREATE_SUCCESS' && response.hasOwnProperty('KYC_Number') && response['KYC_Number']) {
          $('#ekycNo').val(response['KYC_Number']);
          //$('#edelweissKycNo').show().html('KYC Number - <u><b>' + response['KYC_Number'] + '</b></u>');
          $('#ekycNo,#ekycResponseDivSuccess').show();
          this.kyc_no = response['KYC_Number'];
          $('.ekycContinueBtn').show();
          $('#erreKyc').text('');
          $('#erreKyc').hide();
          $('.CreateKycDiv').hide();
          if (this.Insurer_ID == 1) {
            $('#ekycNo').attr('disabled', true);
            this.is_kyc_verified = true;
          }
        } else
        if (this.Insurer_ID == 26) {
          if (response && response.hasOwnProperty('KYC_Status') && response['KYC_Status'].toUpperCase() === 'CREATE_SUCCESS' && response.hasOwnProperty('KYC_Ref_No') && response['KYC_Ref_No']) {
            $('#ekycNo').val(response['KYC_Number']);
            //$('#edelweissKycNo').show().html('KYC Number - <u><b>' + response['KYC_Number'] + '</b></u>');
            $('#ekycNo,#ekycResponseDivSuccess').show();
            this.kyc_no = response['KYC_Ref_No'];
            $('.ekycContinueBtn').show();
            $('#erreKyc').text('');
            $('#erreKyc').hide();
            $('.CreateKycDiv').hide();
        } else if (response && response.hasOwnProperty('KYC_Status') && response['KYC_Status'].toUpperCase() === 'CREATE_FAIL' && response.hasOwnProperty('ckyc_remarks') && response['ckyc_remarks'] !='NA') {
          $('#ekycResponseDivFailed').show();
          $('.ckycVCRemarks').show().html(response['ckyc_remarks'][0]);
        }
      }else if (this.Insurer_ID == 44) {
            if (response && response.hasOwnProperty('KYC_Status') && response['KYC_Status'].toUpperCase() === 'CREATE_SUCCESS' && response.hasOwnProperty('Document_Path') && response['Document_Path']) {
              this.doc_url = response['Document_Path'];
              $('#ekycResponseDivSuccess').show();
              if (this.IsCustomer) {
                $('#Online_Payment').show();
              }
              $('.CreateKycDiv').hide();
            } else {
              $('#ekycResponseDivErr').show().html('Technical issue, please retry.');
            }
          } else {
            $('#ekycResponseDiv').show();
            $('#erreKyc').text('');
            $('#erreKyc').hide();
            if (response && response.hasOwnProperty('KYC_Redirect_URL') && response['KYC_Redirect_URL']) {
              // $('#edelweissRedirectUrl').show().html('To complete your KYC - <a style="color: #1A81FF;" href="' + response['KYC_Redirect_URL'] + '" target="_blank">' + 'Click Here </a>');
              // $('#edelweissKycUrl').show().html('eKYC Completion URL - <a style="color: #1A81FF;" href="' + response['KYC_Redirect_URL'] + '" target="_blank" id="redirectNClose">' + response['KYC_Redirect_URL'] + '</a>');
              // $("#redirectNClose").on('click', () => {
              //     this.closeEkyc();
              // });
              this.Kyc_Redirect_Link = response['KYC_Redirect_URL'];
              if (this.Kyc_Redirect_Link) {
                $('#ekycResponseDivErr').show().html('KYC Required KYC is now Mandatory as per new IRDA Guidelines, since we did not find your existing KYC with your PAN and DOB, you will need to create New KYC... You will now be redirected to Insurer Portal for Creation of New KYC');
                // $('#submitEkycBtnDiv').hide();
                $('.redirectEkycBtnDiv').show();
              }
            }

            if (response && response.hasOwnProperty('Status') && (response['Status'].toUpperCase() === 'FAIL' || response['Status'].toUpperCase() === 'PENDING')) {

              $('#ekycResponseDivErr').show().html(JSON.stringify(response['Msg']));

            }
            if (!response['KYC_Redirect_URL']) {

              //$('#ekycResponseDivErr').show().html('KYC Creation Failed');
              $('#ekycResponseDivFailed').show();
              $('.ckycVCRemarks').show().html('KYC Creation Failed');
            }

          }
      }, (error) => {
        this.loader = false;

        $('#ekycForm,#ekycResponseDivFailed,#ekycResponseDivSuccess').hide();
        $('#ekycResponseDiv').show();
        $('#edelweissKycUrl,#edelweissKycNo,#ekycResponseDivErr,.ckycVCRemarks').hide().html('');
        // $('#ekycResponseDivErr').show().html('Technical issue, please retry.');
        // $('.eKycCloseButton').show();
        $('#ekycResponseDivFailed').show();
        $('.ckycVCRemarks').show().html('Technical issue, please retry.');

      }
      )
    }
    this.Proposal_Request['doc_url'] = this.doc_url;
    // this.Proposal_Request['isKYCDone'] = false;
    // this.Proposal_Request['ckycReferenceDocId'] = "D07";
    // this.Proposal_Request['ckycReferenceNumber'] = this.Proposal_Request['pan']
    // this.Proposal_Request['__birth_date__'] = this.date_of_birth;
    // this.Proposal_Request['__photo_doc__'] = this.eKycPanDoc_file;
    this.Proposal_Request['kyc_no'] = "";
    this.Proposal_Request['kyc_ref_no'] = "";
  }
  toBase64 = id => new Promise((resolve, reject) => {
    var file = (<HTMLInputElement>document.querySelector('#' + id)).files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(this[id + '_file'] = reader.result);
    reader.onerror = error => reject(false);
    console.log(reader.result);

  });

  geteKycFiles(event) {
    var file = event.target.files[0].name;
    if (window.outerWidth > 575) {
      if (file && file.length > 21) {
        $(event.target).closest('.file-upload-wrap').find('.browse-file-name').contents()[0].nodeValue = file.substring(0, 20) + '...';
      } else {
        $(event.target).closest('.file-upload-wrap').find('.browse-file-name').contents()[0].nodeValue = file;
      }
    } else {
      if (file && file.length > 15) {
        $(event.target).closest('.file-upload-wrap').find('.browse-file-name').contents()[0].nodeValue = file.substring(0, 14) + '...';
      } else {
        $(event.target).closest('.file-upload-wrap').find('.browse-file-name').contents()[0].nodeValue = file;
      }
    }
    if (event.target.files.length != 0) {
      this.uploadedeKYCFile[0] = event.target.files[0];
      this.eKYCfile_name = event.target.id;
    } else {
      this.uploadedeKYCFile.pop();
    }
  }


  redirectToInsurer(close) {
    if (this.Kyc_Redirect_Link) {
      window.open(this.Kyc_Redirect_Link, "_blank");
      $('.verifyKycBtn').css({ 'pointer-events': 'auto', 'background': '#1A81FF' });
      if (close) {
        this.closeEkyc();
      }
      $('#alertModel').modal('hide');
    }
  }
  closeEkyc() {
    // $('#triggerEkyc').trigger('click');
    $('#eKycModelResponse').modal('hide');
  }
  closeAlert() {
    // $('#triggerAlert').trigger('click');
    $('#alertModel').modal('hide');
    $('.alertMsg,.kycNameMismatch,.ckycRemarks').html('');
  }
  changeKycVerfiedStatus() {
    this.proceed_transaction = false;
  }

  CreateKYC() {
    var delayTime = 0;

    // $('#triggerAlert').trigger('click');
    $('#alertModel').modal('hide');


    // if ($('#eKycModel').is(':visible')) {
    // $('#triggerEkyc').trigger('click');
    $('#eKycModel').modal('hide');
    delayTime = 500;
    // }
    $('#ekycUploadAadharDiv,#ekycUploadPanDiv').hide();
    // setTimeout(() => {
    if (this.Insurer_ID === 44) {
      this.triggerEkycModel('', '');
      // this.ekycSearchType = 'Pan';
      // this.ekycType('', 'Pan', 'eKyc');
      // $('.searchTypeDiv').hide();
      // $('#ekycUploadPanDiv').show();
      if (this.Insurer_ID == 44) {
        $('.ekycCheckBox').hide();
      }
    } else if (this.Insurer_ID === 1) {
      this.triggerEkycModel('', '');
      // this.ekycSearchType = 'Aadhar';
      // this.ekycType('','Aadhar','eKyc');
      // $('.searchTypeDiv').hide();
    } else if (this.Insurer_ID === 26) {
      this.triggerEkycModel('', '');

    } else {
      this.redirectToInsurer('');
      // this.triggerEkycModel('', '');
      // $('#ekycResponseDiv').show();
      // $('#ekycForm').hide();

      // if (this.Kyc_Redirect_Link) {
      //   $('#ekycResponseDivErr').show().html('KYC Required KYC is now Mandatory as per new IRDA Guidelines, since we did not find your existing KYC with your PAN and DOB, you will need to create New KYC... You will now be redirected to Insurer Portal for Creation of New KYC');
      //   $('.redirectEkycBtnDiv').show();
      // } else {
      //   $('#ekycContinueBtn').show();
      //   $('#ekycResponseDivErr').show().html('Your KYC is currently not available. Please retry after some time.');
      // }
    }
    // }, delayTime);
  }
  selectDropdown(event, data, source) {
    var selText = $(event).text();
    $(event).closest('.input-field-box').find('.select-dropdown').val(selText);
    $(event).closest('.input-field-box').find('.select-dropdown').removeClass('show');
    $(event).closest('.input-field-box').find('.select-dropdown-box').removeClass('show');
    if (source == 'browse') {
      $('#document_type').val(data);
    }
  };
  ekycType(event, data, source) {
    this.selectDropdown(event, data, source);
    if (source == 'eKyc') {
      if (data.toUpperCase().replace(/\s+/g, '') === "PROFILEPICTURE") {
        data = 'Pan';
      }


      $('#ekycPan,#ekycDob,#ekycAadhar,#ekycSearchType,#ekycMobile,#eKycAadharDoc,#eKycPanDoc').removeClass('has-error', 'border-thick');
      $('#ekycPanErr,#ekycDobErr,#ekycAadharErr,#ekycSearchTypeErr,#ekycMobileErr, #ekycUploadAadharErr, #ekycUploadPanErr,.ekycUploadDocErr').html('');
      this.ekycSearchType = data;
      $('#ekycMobileDiv,#ekycAadharDiv,#ekycPanDiv,#ekycDobDiv,#ekycUploadAadharDiv, #ekycUploadPanDiv,#ekycBajajDiv,#ekycStarDiv,#ekycUploadBajajDocs,#ekycUploadStarProfilePictureDocs,#ekycUploadStarDocsBack,#ekycUploadStarDocsFront').hide();
      if (this.Insurer_ID == 26) {
        $('#ekycUploadStarProfilePictureDocs').show();
        $('.eKycDocLabelAadhar').text('Aadhar Front');
        $('#ekycUploadStarDocsBack').show();
        $('.eKycDocLabel_StarBack').text('Aadhar Back(Optional)');


      }
      if (data.toUpperCase() == 'BOTH') {
        $('#ekycAadharDiv,#ekycPanDiv').show();
      } else {
        $('#ekyc' + data + 'Div').show();
      }
      if ((data.toUpperCase() === 'AADHAR' || data.toUpperCase() === 'PAN' || data.toUpperCase() == 'BOTH')) {
        $('#ekycDobDiv').show();
        if (data.toUpperCase() === 'AADHAR') {
          $('#ekycUploadAadharDiv').show();
        }
        if (data.toUpperCase() === 'PAN') {
          $('#ekycUploadPanDiv').show();
        }
        if (data.toUpperCase() === 'BOTH') {
          $('#ekycUploadAadharDiv, #ekycUploadPanDiv').show();
        }
      } else if (this.Insurer_ID == 1) {
        var label = {
          'Passport': 'Passport',
          'VoterID': 'Voter ID',
          'DrivingLicense': 'Driving License',
          'NREGAJobCard': 'NREGA Job Card',
          'GSTIN': 'GSTIN',
          'CKYCNumber': 'CKYC Number',
          'Aadhar': 'Aadhar'
        }
        $('#ekycDobDiv').show();
        $('#ekycBajajDiv').show();
        $('#ekycUploadBajajDocs').show();
        $('.ekycDocNoLabelBajaj').html(label[data] + ' :&nbsp;');
        $('#bajaj_DocNumber').attr('placeholder', label[data]);
        $('.eKycDocLabel_Bajaj').text('Upload ' + label[data]);
        this.bajajInputValidation(data);
      } else if (this.Insurer_ID == 26) {
        // $('#ekycDobDiv').show();

        var labels = {
          'Passport': 'Passport',
          'Voter_ID': 'Voter ID',
          'Driving_License': 'Driving License',
          'NPR': 'NPR',
          'NREGA_Job_Card': 'NREGA Job Card',
          'CKYC_Id': 'CKYC Number',
          'Aadhar': 'Aadhar'
        }
        $('#ekycDobDiv').show();
        if (data != 'CKYC_Id') {
          $('#ekycUploadStarProfilePictureDocs').show();
          $('#ekycUploadStarDocsFront').show();
          $('#ekycUploadStarDocsBack').show();
        } else {
          $('#ekycUploadStarProfilePictureDocs').hide();
          $('#ekycUploadStarDocsFront').hide();
          $('#ekycUploadStarDocsBack').hide();
        }
        $('#ekycStarDiv').show();
        $('.ekycDocNoLabelStar').html(labels[data] + ' :&nbsp;');
        $('#star_DocNumber').attr('placeholder', labels[data]);
        $('.eKycDocLabel_StarFront').text(labels[data] + ' Front');
        $('.eKycDocLabel_StarBack').text(labels[data] + ' Back(Optional)');
        this.starInputValidation(data);

      }
    }
  };

  bajajInputValidation(data) {
    let Maxlength: any;
    switch (data) {
      case 'Passport': Maxlength = 8; break;
      case 'VoterID': Maxlength = 10; break;
      case 'DrivingLicense': Maxlength = 16; break;
      case 'UID': Maxlength = 12; break;
      case 'NREGAJobCard': Maxlength = 16; break;
      case 'GSTIN': Maxlength = 15; break;
      case 'CKYCNumber': Maxlength = 10; break;
    }
    // BajajFieldsMaxlength = {}
    $('.bajaj_input_val').attr('maxlength', Maxlength);

  }

  starInputValidation(data) {
    let Maxlength: any;
    switch (data) {
      case 'Passport': Maxlength = 8; break;
      case 'VoterID': Maxlength = 10; break;
      case 'DrivingLicense': Maxlength = 16; break;
      case 'UID': Maxlength = 12; break;
      case 'NREGAJobCard': Maxlength = 16; break;
      case 'NPR': Maxlength = 15; break;
      case 'CKYCNumber': Maxlength = 10; break;
    }
    // StarFieldsMaxlength = {}
    $('.star_input_val').attr('maxlength', Maxlength);

  }

  async call_verifyKycDetails() {
    this.loader = true;
    var method_name = '/postservicecall/kyc_details/verifiy_kyc_details/' + this.CRN + '/' + this.Insurer_ID + '/' + (this.Insurer_ID == 44 ? this.policynumber : $("#ekycNo").val());
    let res_val = await this._horizon.callAPIGet('', method_name, 2).toPromise();
    //  res_val = {"KYC_Pan_No":"","KYC_Number":"","KYC_FullName":"","KYC_Ref_No":"","KYC_Redirect_URL":"","KYC_Insurer_ID":46,"KYC_PB_CRN":1064424,"KYC_Status":"VERIFY_SUCCESS"}
    // res_val = { "KYC_Pan_No": "FAGPS8388E", "KYC_Number": "D600599532", "KYC_FullName": "ASHUTOSHKUMAR SANTOSHKUMAR SINGH", "KYC_Ref_No": "", "KYC_Redirect_URL": window.location.href, "KYC_Insurer_ID": this.Insurer_ID, "KYC_PB_CRN": this.CRN, "KYC_Status": "VERIFY_SUCCESS" } //for digit
    this.loader = false;
    this.redirect_url = res_val['KYC_Redirect_URL'] ? res_val['KYC_Redirect_URL'] : "";
    if (res_val.hasOwnProperty('KYC_FullName') && res_val['KYC_FullName'] && res_val['KYC_FullName'] !== null && res_val['KYC_FullName'] !== "" && res_val['KYC_FullName'].trim() !== '' && res_val['KYC_FullName'] !== undefined && (!res_val['KYC_FullName'].includes('undefined'))) {
      var fullname = this.contact_name.trim();
      if (res_val['KYC_FullName'].trim().toUpperCase() !== fullname.toUpperCase()) {
        // $('.kycNameMismatch').show().html('Dear Customer,<br>&nbsp;&nbsp;&nbsp;&nbsp;We have verified Proposal details, with KYC service. Policy will be issued on Proposer Name <u><b>"' + res_val['KYC_FullName'] + '"</b></u>');
        // $('#triggerAlert').trigger('click');
        // this.alerted = true;
        if (this.kycNameSalutationArray.includes(res_val['KYC_FullName'].split(" ")[0].trim().toUpperCase())) {
          var kycNamearr = res_val['KYC_FullName'].split(' ')
          kycNamearr.shift()
          var kycName = kycNamearr.join(" ").toUpperCase()
        } else {
          var kycName = res_val['KYC_FullName'].toUpperCase()
        };

        $('#contact_name').html(kycName);
        $('#contact_name').val(kycName);
        this.Proposal_Request['contact_name'] = kycName;

      }
    }
    if (res_val && res_val.hasOwnProperty('ckyc_remarks') && res_val['ckyc_remarks'] && res_val['ckyc_remarks'] !== 'NA') {
      this.ckyc_remarks = res_val['ckyc_remarks'];
    }
    if (res_val && res_val.hasOwnProperty('KYC_Ref_No') && res_val['KYC_Ref_No']) {
      this.kyc_ref_no = res_val['KYC_Ref_No'];
    }
    if (res_val && res_val.hasOwnProperty('KYC_Status') && res_val['KYC_Status'].toUpperCase() === 'VERIFY_SUCCESS' && res_val.hasOwnProperty('KYC_Number') && res_val['KYC_Number']) {
      $('#ekycNo').val(res_val['KYC_Number']);
      this.kyc_no = res_val['KYC_Number'];
      $('#erreKyc').hide().text('');
      this.is_kyc_verified = true;
      // $('#ekycNo').prop('disabled',true)
      if (this.is_direct_proposal) {//if (this.InsurerID == 44) {
        if (this.throughCreateButton) {
          $('.verifyErrMsg').html('<div>KYC Status : KYC Created, Please Verify KYC.</div>');
          $('.verifyKycBtn').css({ 'pointer-events': 'auto', 'background': '#1A81FF' });
        } else {
          window.location.href = this.pg_url;
        }
      } else {
        this.proceed_transaction = true;
        // this.Otpverification();
      }
    } else {
      if (!this.is_direct_proposal) {//if (src !== 'popup') {
        // this.triggerEkycModel('', '');
        $('#eKycModelResponse').modal('show');
      }
      $('#ekycResponseDiv').show();
      // $('#ekycForm').hide();
      if (res_val.hasOwnProperty('KYC_Number') && res_val['KYC_Number']) {
        $('#ekycNo').show().val(res_val['KYC_Number']);
        this.kyc_no = res_val['KYC_Number'];
      }
      if (res_val && res_val.hasOwnProperty('Status') && res_val['Status'].toUpperCase() === 'FAIL' && res_val.hasOwnProperty('Msg') && res_val['Msg']) {
        $('#ekycResponseDivErr').show().html(JSON.stringify(res_val['Msg']));
      }
      if (res_val && res_val.hasOwnProperty('KYC_Redirect_URL') && res_val['KYC_Redirect_URL']) {
        this.Kyc_Redirect_Link = res_val['KYC_Redirect_URL'];
        $('#ekycResponseDivErr').show().html('KYC Required KYC is now Mandatory as per new IRDA Guidelines, since we did not find your existing KYC with your PAN and DOB, you will need to create New KYC... You will now be redirected to Insurer Portal for Creation of New KYC');
        $('.redirectEkycBtnDiv').show();
        // $('#eKycModel').show('hide')

      } else {
        $('.redirectEkycBtnDiv').hide();
        $('#ekycResponseDivFailed').show();
        $('.ckycVCRemarks').show().html('Your KYC verification failed. <br><br><p class="font-18 text-extralight transaction-title" style="margin-bottom: 20px;text-align: center;">KYC Number - <span class="transaction-id weight-700">' + $("#ekycNo").val() + '</span> </p>');
        // $('.#ekycForm').hide();
        // $('#eKycModel').show('hide')
      }
      if (res_val && res_val.hasOwnProperty('ckyc_remarks') && res_val['ckyc_remarks'] && res_val['ckyc_remarks'] !== 'NA') {
        $('#ekycResponseDivFailed').show();
        $('#ekycResponseDivErr').hide().html('');
        $('.redirectEkycBtnDiv').hide();
        if (res_val['ckyc_remarks'].hasOwnProperty('message') && res_val['ckyc_remarks']['message']) {
          $('.ckycVCRemarks').show().html(res_val['ckyc_remarks']['message']);
        } else if (typeof (res_val['ckyc_remarks'] == 'object')) {
          $('.ckycVCRemarks').show().html(JSON.stringify(res_val['ckyc_remarks']));
        } else {
          $('.ckycVCRemarks').show().html(res_val['ckyc_remarks']);
        }
      }
      if (this.is_direct_proposal) {//if (src === 'popup') {
        if (res_val && res_val.hasOwnProperty('ckyc_remarks') && res_val['ckyc_remarks'] && res_val['ckyc_remarks'] !== 'NA') {
          if (res_val['ckyc_remarks'].hasOwnProperty('message') && res_val['ckyc_remarks']['message']) {
            $('.verifyErrMsg').html('<div style="color:red;">KYC Status : ' + res_val['ckyc_remarks']['message'] + '</div>');
          } else if (typeof (res_val['ckyc_remarks'] == 'object')) {
            $('.verifyErrMsg').html('<div style="color:red;">KYC Status : ' + JSON.stringify(res_val['ckyc_remarks']) + '</div>');
          } else {
            if (res_val && res_val.hasOwnProperty('KYC_Redirect_URL') && res_val['KYC_Redirect_URL']) {
              $('.verifyErrMsg').html('<div style="color:red;">KYC Status : KYC Verification Is Pending.</div>');
            } else {
              $('.verifyErrMsg').html('<div style="color:red;">KYC Status : KYC Verification Failed.</div>');
            }
          }
        } else {
          if (res_val && res_val.hasOwnProperty('KYC_Redirect_URL') && res_val['KYC_Redirect_URL']) {
            this.Kyc_Redirect_Link = res_val['KYC_Redirect_URL'];
            if (this.throughCreateButton) {
              // window.open(this.Kyc_Redirect_Link, "_blank");
              this.redirectToInsurer(false);
            } else {
              $('.verifyErrMsg').html('<div style="color:red;">KYC Status : KYC Verification Is Pending.</div>');
            }
          } else {
            if (this.throughCreateButton) {
              $('.verifyErrMsg').html('<div style="color:red;">KYC Status : Technical issue, please retry.</div>');
            } else {
              $('.verifyErrMsg').html('<div style="color:red;">KYC Status : KYC Verification Failed.</div>');
            }
          }
        }
      }
    }
  }

  triggerEkycModel(event, src) {
    // if($('#ekyc').is(':checked') && src == 'checkbox'){
    //   event.preventDefault();
    // }
    //if((this.kyc_no === null || this.kyc_no === undefined || this.kyc_no === '') || (src == 'showResponse' || (src === 'iffco ') )){
    // $('.eKycCloseButton').hide();
    $('.ekycCheckBox').show();
    //to refresh ekyc popup
    this.ekycSearchType = '';
    $('.searchTypeDiv').show();
    $('#ekycUploadAadharDiv,#ekycUploadPanDiv,#ekycResponseDivFailed,#ekycResponseDivSuccess,.CreateKYCBtnDiv').hide();
    $('#ekycPan,#ekycDob,#ekycAadhar,#ekycSearchType,#ekycMobile,#eKycAadharDoc,#eKycPanDoc').removeClass('has-error', 'border-thick');
    $('#ekycPan,#ekycDob,#ekycAadhar,#ekycMobile,#eKycAadharDoc,#eKycPanDoc').val('');
    $('#ekycSearchType').val('Select Search Type');
    $('#ekycPanErr,#ekycDobErr,#ekycAadharErr,#ekycSearchTypeErr,#ekycMobileErr,#ekycUploadPanErr, #ekycUploadAadharErr').html('');
    $('#ekycMobileDiv,#ekycAadharDiv,#ekycPanDiv,#ekycDobDiv,#ekycUploadAadharDiv, #ekycUploadPanDiv,.redirectEkycBtnDiv,.ekycContinueBtn,#ekycBajajDiv,#ekycUploadBajajDocs').hide();
    $('.eKycDocspan').text('Browse a file');
    $('#ekycForm').show();
    $('#ekycResponseDiv').hide();
    $('#edelweissKycUrl,#edelweissKycNo').hide().html('');
    $('#check-item-60,#check-item-58,#check-item-59').prop('checked', false);
    $('.ekycPopupMsg').hide().html('');
    //autofill pan ,dob,aadhar
    if (this.summary['Proposal_Request'].pan !== "") {

      $('#ekycPan').val(this.summary['Proposal_Request'].pan.toUpperCase());
    }
    if (this.summary['Proposal_Request'].birth_date) {
      $('#ekycDob').val(moment(this.summary['Proposal_Request'].birth_date, 'YYYY-MM-DD').format('DD-MM-YYYY'));
    }
    if (this.summary['Proposal_Request'].aadhar) {
      $('#ekycAadhar').val(this.summary['Proposal_Request'].aadhar);
    }
    // $('#triggerEkyc').trigger('click');
    $('#eKycModel').modal('show');
    //}
  }
  checkMobile(input) {
    var pattern = new RegExp('^([6-9]{1}[0-9]{9})$');
    var dvid = "dv" + $(input).attr('id');
    if (pattern.test(input.val()) == false) {
      $('#' + dvid).addClass('Error');
      return false;
    } else {
      $('#' + dvid).removeClass('Error');
      return true;
    }
  }
  proposalError() {
    $('.CRN').text("CRN : " + this.CRN);
    var daten: any = new Date();
    daten = (daten.toString()).split("GMT");
    var quotedate = (new Date(this.summary['Summary'].Created_On).toString()).split("GMT")[0];
    $('.ErrInsurerName').text(this.summary['PB_Master'].Insurer.Insurer_Name);
    $('.ErrQuoteOn').text("Quote On : " + quotedate.replace(quotedate.substring(11, 15), ""));
    $('.ErrDateTime').text("Error On : " + daten[0].replace(daten[0].substring(11, 15), ""));
  }


  call_tataaig_update_proposal_kyc() {
    this.loader = true;
    $('.verifyErrMsg,#erreKycNo').html('');
    this._horizon.callAPIGet('', "/kyc_details/tataaig_update_proposal_kyc/" + this.summary['Proposal_Request'].udid, 2).subscribe(
      response => {
        // response = { "Insurer": "UPDATE_KYC", "Msg": { "errcode": "KYC002", "message": "kyc success", "status": "1" }, "Status": "KYC_UPDATE_SUCCESS" }
        this.loader = false;
        if (response.hasOwnProperty('KYC_FullName') && response['KYC_FullName'] && response['KYC_FullName'] !== null && response['KYC_FullName'] !== "" && response['KYC_FullName'].trim() !== '' && response['KYC_FullName'] !== undefined && (!response['KYC_FullName'].includes('undefined'))) {
          var fullname = this.contact_name.trim();
          if (response['KYC_FullName'].trim().toUpperCase() !== fullname.toUpperCase()) {
            // $('.kycNameMismatch').show().html('Dear Customer,<br>&nbsp;&nbsp;&nbsp;&nbsp;We have verified Proposal details, with KYC service. Policy will be issued on Proposer Name <u><b>"' + res_val['KYC_FullName'] + '"</b></u>');
            // $('#triggerAlert').trigger('click');
            // this.alerted = true;
            if (this.kycNameSalutationArray.includes(response['KYC_FullName'].split(" ")[0].trim().toUpperCase())) {
              var kycNamearr = response['KYC_FullName'].split(' ')
              kycNamearr.shift()
              var kycName = kycNamearr.join(" ").toUpperCase()
            } else {
              var kycName = response['KYC_FullName'].toUpperCase()
            };

            $('#contact_name').html(kycName);
            $('#contact_name').val(kycName);
            this.Proposal_Request['contact_name'] = kycName;

          }
        }
        if (response && response.hasOwnProperty('ckyc_remarks') && response['ckyc_remarks'] && response['ckyc_remarks'] !== 'NA') {
          this.ckyc_remarks = response['ckyc_remarks'];
        }
        if (response && response.hasOwnProperty('KYC_Ref_No') && response['KYC_Ref_No']) {
          this.kyc_ref_no = response['KYC_Ref_No'];
        }
        if (response && response.hasOwnProperty('Status') && response['Status'].toUpperCase() === 'KYC_UPDATE_SUCCESS') {
          this.is_kyc_verified = true;
          window.location.href = this.pg_url;
        } else {
          if (response.hasOwnProperty('KYC_Number') && response['KYC_Number']) {
            $('#ekycNo').show().val(response['KYC_Number']);
            this.kyc_no = response['KYC_Number'];
          }
          if (response && response.hasOwnProperty('KYC_Redirect_URL') && response['KYC_Redirect_URL']) {
            this.Kyc_Redirect_Link = response['KYC_Redirect_URL'];
            this.redirectToInsurer(false);
          } else {
            if (response && response.hasOwnProperty('Msg') && response['Msg'] && response['Msg'].hasOwnProperty('message') && response['Msg']['message']) {
              $('.verifyErrMsg').html('<div style="color:red;">' + response['Msg']['message'] + '</div>');
            } else {
              $('.verifyErrMsg').html('<div style="color:red;">KYC Number Not Generated</div>');
            }
          }
        }
      },
      (error) => {
        console.log(error);
        this.loader = false;
        $('.verifyErrMsg').html('<div style="color:red;">KYC Status : Technical issue, please retry.</div>');
      });
  }


  getImageData() {
    if ($('.AndroidReposnse').html().includes('|')) {
      $('.' + this.current_doc_field + 'Span').html('File Uploaded');
      if (this.current_doc_field === "eKycAadharDoc") {
        this.aadhar_saved_via_android = true;
      } else if (this.current_doc_field === "eKycPanDoc") {
        this.pan_saved_via_android = true;
      } else if (this.current_doc_field === "BajajeKycDoc" || this.current_doc_field === "StareKycDocFront") {
        this.doc_saved_via_android = true;
      }
    }
    // alert($('.AndroidReposnse').html());
    $('.' + this.current_doc_field + 'Span').html('Try Again');

  }

};




