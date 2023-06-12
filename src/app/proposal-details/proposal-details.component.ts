import { Component, OnInit, Input, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HorizonApiService } from '../horizon-api.service';
import { environment } from "../../environments/environment";
import * as moment from 'moment';
import { Location } from '@angular/common';


declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-proposal-details',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './proposal-details.component.html',
  styleUrls: ['./proposal-details.component.css',
  ]
})

export class ProposalDetailsComponent implements OnInit {
  @Input() inputFromParent: any;
  @Input() appVisitorData: any;
  loader: boolean;
  show_and: boolean = false;
  suffering_since_year = [];
  dob_month: any[];
  current_day: number;
  current_year: number;
  current_month: number;
  passport_date = [];
  passport_month = [];
  passport_exp_year = [];
  yyyymmdd: string;
  adult_year = [];
  year: any;
  month: any;
  day: any;
  months = [];
  member_1_birth_date: any;
  Sum_Insured: any;
  Service_Tax: any;
  Net_Premium: any;
  Final_Premium: any;
  insurer_logo_name: string;
  proposalForm: FormGroup;
  CheckAllValidations: boolean = false;
  MedicalQsError: boolean = false;
  insurer_data: any = [];
  medical_data: any = [];
  NOForAll = 'no';
  ismedquestnschecked = 'no';
  public _insurerQue: any;
  public _salutations: string;
  public _otherPEDoptions: string;
  public _nomineeDetails: string;
  public _relation: string;
  public _nomineeRelation: string;
  public _existingDiseases: string;
  public _occupation: string;
  public _travelPurpose: any;
  public otherDetails: any;
  errOnOtherDetail: boolean = false;
  otherDetailsData: any;
  travel_start_date: string = "";
  travel_end_date: string = "";
  max_days: string = "";
  travelling_to: string = "";
  Saltext: string;
  contact_name: string = "";
  birth_date: string = "";
  pan: string = "";
  gender: string = "";
  email: string = "";
  mobile: string = "";
  crn: number;
  srn: string = "";
  arn: string = "";
  is_posp: string = "";
  show: boolean = false;
  travel_insurance_type: any;
  ss_id: any;
  fba_id: string = "";
  app_version: string = "";
  url: string;
  proposal_req_ssid: string = "";
  client_id: string = "";
  ProductPlan_Id: number;
  Insurer_Code: string;
  Insurer_Name: string;
  trip_type: string;
  Plan_Name: string;
  sum_insured: any;
  Insurer_Logo_Name: string;
  Insurer_ID: number;
  net_premium: any;
  service_tax: any;
  final_premium: any;
  udid: string;
  ReqObj: any;
  Summary: any;
  Quote_Request: any;
  Proposal_Request: any;
  proposal_data: boolean = false;
  error_count: number = 0;
  member_array: any[];
  online_agreement: boolean = false;
  ip_address: any = "";
  geo_lat: any = 0;
  geo_long: any = 0;
  ip_city_state: any = "";
  short_url: string = "";
  posp_source: number;
  CheckforMblNo: boolean = false;
  opted_whatsapp: boolean = false;
  whatsapp_mobile: string = "";
  check_EIA: boolean = false;
  AccNoBar: boolean = false;
  LinkBar: boolean = false;
  eia_number: string = "";
  insurance_repo_name: string = "";
  loading: boolean = false;
  is_form_valid: boolean = false;
  showApp_version: boolean = false;
  showAgreement: boolean = false;
  msg: string = "";
  error_message: any;
  created_on: any;
  current_time: any;
  IsError: boolean = false;
  ErrMsg: string = "";
  member_quearray: any = [];
  No_For_All = 'no';
  SameAsNomineeAddress: any = false;
  permanent_pincode;
  cities: any[];
  visiting_cities: any[];
  nominee_address: string = "";
  nominee_pincode: string = "";
  nominee_city_name: string = "";
  nominee_state_name: string = "";
  loader_success: boolean = false;
  dataStatusSuccess: boolean = false;
  send_link: boolean = false;
  PaymentLinkSend: boolean = false;
  Is_Customer: boolean = true;
  agent_id: any;
  is_agent: boolean = false;
  public _pincode: string;
  public _pincodeDetails: {};
  public _locality: {};
  public _locality_code: {};
  public areaId: string = '';
  public _state: {};
  public _state_code: {};
  public _district: {};
  public _district_code: {};
  public adult_count: number = 2;
  public child_count: number = 4;

  //for multiselect dropdown
  disabled = false;
  ShowFilter = false;
  limitSelection = false;
  hasTravelCountries: boolean = false;
  vistingcountry = [];
  medicalDetails = {};
  selectedItems = [];
  dropdownSettings: any = [];
  diseaseDropdownSettings: any = [];
  adult_members: any[];
  child_members: Number[];
  error_msg = {
    "Salutation": "Please select title",
    "ContactName": "Please enter Name",
    "ContactMiddleName": "Please Enter alphabets only",
    "ContactLastName": "Please Enter alphabets only",
    "DOBofOwner": "Please select DOB",
    "ContactMobile": "Please enter valid mobile number",
    "ContactEmail": "Please enter valid email address",
    "MaritalStatus": "Please select Marital Status",
    "PANNo": "Enter Valid Pan no",
    "ContactOccupationId": "Please select Occupation",
    "RegisteredAddress": "Please enter valid registered Address",
    "ddlRegisteredCityId": "Please select RegisteredCity",
    "NomineeOtherRelation": "Please enter valid Nominee Relation",
    "NomineeRelationID": "Please select valid Nominee Relation",
    "NomineeName": "Enter Nominee Name",
    "NomineeDOB": "Please select NomineeDOB",
    "ContactPinCode": "Please enter pincode",
    "ddlContactCityID": "Please select locality",
    "RegisteredCityName": "Please enter city",
    "RegisteredStateName": "Please enter state",
    "ContactCityName": "Please enter pincode",
    "StateName": "Please enter pincode",
  };
  Currency_symbol: any;
  TravelStartDate: any;
  TravelEndDate: any;
  min_passport_date: any;
  adult_day: any;
  nominee_day: any[];
  nominee_months: any[];
  sub_fba_id: string;
  mac_address: string;
  ProductID: string;
  dob_dd = [];
  dob_mm = [];
  dob_yy = [];
  dob_yy_child = [];
  countries_array = [];
  visting_countries_array: any;
  visting_countries_object: any = [];
  visiting_countries_autofill: any;
  memb_1_ped = [];
  memb_2_ped = [];
  memb_3_ped = [];
  memb_4_ped = [];
  memb_5_ped = [];
  memb_6_ped = [];
  member_count: number;
  _existing_disease_autofill = [];
  _existing_disease_autofill_child = [];
  member_1_ped = [];
  member_2_ped = [];
  member_3_ped = [];
  member_4_ped = [];
  member_5_ped = [];
  member_6_ped = [];
  // liveOnly: boolean = true;
  agent_email: any;
  agent_name: any;
  agent_mobile: any;
  visitor_id: any;
  mobile_view: boolean = false;
  hasTravelCities: boolean = false;
  visting_cities_object: any[];
  visiting_cities_autofill: any;
  cities_array = [];
  visting_cities_array: { City_Code: any; City_Name: any; };
  TravelCity: any[];
  cityArray = [];
  TcityArray = [];
  query_params: any = "";

  constructor(private _horizon: HorizonApiService, private location: Location, private fb: FormBuilder, private ActivatedRoute: ActivatedRoute, private _route: Router) {
    this.url = window.location.href;
    this.getClientBrowserDetails();

    this.proposalForm = this.fb.group({
      // PERSONAL INFORMATION
      'salutation': '',
      'contact_name': '',
      'email': '',
      'mobile': '',
      'pan': ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      'birth_date': '',
      'gender': '',
      'relation': '',
      // 'travel_start_date': '',
      'visiting_countries': '',
      'visiting_city': '',
      // 'travel_purpose': '',

      // CONTACT INFORMATION
      'permanent_pincode': '',
      'completeAddress': '',
      'permanent_address_1': '',
      'permanent_address_2': '',
      'permanent_address_3': '',
      'city': '',
      'permanent_city': '',
      'permanent_city_code': '',
      'state': '',
      'permanent_state': '',
      'permanent_state_code': '',
      'locality': '',
      'permanent_locality_code': '',

      // INSURED MEMBER DETAILS (SELF, SPOUSE, KID1)
      'member_1_salutation': '',
      'member_1_fullName': '',
      'member_1_birth_date': '',
      'member_1_gender': '',
      'member_1_passport': '',
      'member_1_passport_expiry': '',
      'member_1_ped': '',
      'member_1_other_diseases': '',
      'member_1_takes_meds': '',
      'member_1_suffering_since': '',
      'member_1_occupation': '',
      'member_1_nominee_relation': '',
      'member_1_nominee_name': '',

      'member_2_salutation': '',
      'member_2_fullName': '',
      'member_2_birth_date': '',
      'member_2_gender': '',
      'member_2_passport': '',
      'member_2_passport_expiry': '',
      'member_2_ped': '',
      'member_2_other_diseases': '',
      'member_2_takes_meds': '',
      'member_2_suffering_since': '',
      'member_2_occupation': '',
      'member_2_nominee_relation': '',
      'member_2_nominee_name': '',

      'member_3_salutation': '',
      'member_3_fullName': '',
      'member_3_birth_date': '',
      'member_3_gender': '',
      'member_3_passport': '',
      'member_3_passport_expiry': '',
      'member_3_ped': '',
      'member_3_other_diseases': '',
      'member_3_takes_meds': '',
      'member_3_suffering_since': '',
      'member_3_occupation': '',
      'member_3_nominee_relation': '',
      'member_3_nominee_name': '',

      'member_4_salutation': '',
      'member_4_fullName': '',
      'member_4_birth_date': '',
      'member_4_gender': '',
      'member_4_passport': '',
      'member_4_passport_expiry': '',
      'member_4_ped': '',
      'member_4_other_diseases': '',
      'member_4_takes_meds': '',
      'member_4_suffering_since': '',
      'member_4_occupation': '',
      'member_4_nominee_relation': '',
      'member_4_nominee_name': '',

      'member_5_salutation': '',
      'member_5_fullName': '',
      'member_5_birth_date': '',
      'member_5_gender': '',
      'member_5_passport': '',
      'member_5_passport_expiry': '',
      'member_5_ped': '',
      'member_5_other_diseases': '',
      'member_5_takes_meds': '',
      'member_5_suffering_since': '',
      'member_5_occupation': '',
      'member_5_nominee_relation': '',
      'member_5_nominee_name': '',

      'member_6_salutation': '',
      'member_6_fullName': '',
      'member_6_birth_date': '',
      'member_6_gender': '',
      'member_6_passport': '',
      'member_6_passport_expiry': '',
      'member_6_ped': '',
      'member_6_other_diseases': '',
      'member_6_takes_meds': '',
      'member_6_suffering_since': '',
      'member_6_occupation': '',
      'member_6_nominee_relation': '',
      'member_6_nominee_name': '',

      // NOMINEE INFORMATION
      'same_as_for_nominee': '',
      'nominee_name': '',
      'nominee_birth_date': '',
      'nominee_address': '',
      'nominee_pincode': '',
      'nominee_city_name': '',
      'nominee_state_name': '',
      'nominee_relation': '',

      //Declarations
      'otherDetailsData': '',

      // Online Agreement
      'online_agreement': '',
      'electronic_policy': '',

      'net_premium': '',
      'final_premium': '',
      'service_tax': '',
      'no_for_all': '',
      'is_medquestns_checked': '',
      'items': new FormControl()
    });
  }

  ICICIcity() {
    $("#city").autocomplete({
      source: (request, response) => {
        var append_data = [];
        var str = $("#city").val();
        var strLen = str.length;
        var count = 0;
        append_data = this.cities.filter((name) => {
          if ((name.District.substring(0, strLen)).toLowerCase() == str.toLowerCase()) {
            count++;
          }
          return ((name.District.substring(0, strLen)).toLowerCase() == str.toLowerCase()) && count <= 15;
        });
        if (count == 0) {
          // append_data = [{ 'District': 'NO SUCH CITY', 'District_Code': "","State_Code":"","State":"" }];
        }
        response($.map(append_data, (index, val) => {
          return { label: index.District, city_id: index.District_Code, State_Code: index.State_Code, State_Name: index.State, Locality_Code: index.Locality_Code };
        }));
      },
      minLength: 2,
      appendTo: "#autoComplete4",
      classes: {
        "ui-autocomplete": "search-autocomplete"
      },
      select: (event, ui) => {
        if (ui.item.label == 'NO SUCH CITY') {
          // this.citySelected = false;
          $("#city").val(''); //ui.item is your object from the array
          // $("#pincode").val('');
          $('#city_id').val('');
        }
        else {
          $("#city").val(ui.item.label); //ui.item is your object from the array
          // $("#pincode").val(ui.item.pincode);
          this.proposalForm.controls['permanent_state'].setValue(ui.item.State_Name);
          this.proposalForm.controls['permanent_state_code'].setValue(ui.item.State_Code);
          this.proposalForm.controls['permanent_locality_code'].setValue(ui.item.Locality_Code);
          this.proposalForm.controls['permanent_city'].setValue(ui.item.label);
          this.proposalForm.controls['permanent_city_code'].setValue(ui.item.city_id);
          $('#city_id').val(ui.item.city_id);
          $('#state').val(ui.item.State_Name);
          // this.citySelected = true;
        }
        return false;
      }
    });
    $("#autoComplete4").click('li', function () {
      $(this).closest('.input-field-box').find('.ui-menu-item-wrapper').removeClass("active")
      $(this).addClass("active");  // adding active class
    });
  }
  ngOnInit() {
    this.inputFromParent = this.inputFromParent == undefined ? '' : this.inputFromParent;
    this.appVisitorData = this.appVisitorData == undefined ? '' : this.appVisitorData;
    // setTimeout(() => {
    //   if (this.inputFromParent.hasOwnProperty('ss_id') && this.inputFromParent.ss_id != "") {

    //     this.ss_id = this.inputFromParent.ss_id;

    //     if (this.ss_id > 0) {
    //       this.location.replaceState(`proposal?client_id=2&arn=${this.arn}&is_posp=NonPOSP&ss_id=${this.ss_id}`);

    //     }
    //     this.agent_name = this.inputFromParent['agent_name'];
    //     this.agent_email = this.inputFromParent['agent_email'];
    //     this.agent_mobile = this.inputFromParent['agent_mobile'];
    //     this.show_and = true;
    //     this.fba_id = this.inputFromParent.fba_id;
    //     this.sub_fba_id = this.inputFromParent.sub_fba_id;
    //     // $(".Car a").attr('href', '/car-insurance');
    //     // $(".Bike a").attr('href', '/two-wheeler-insurance');
    //     // $(".CV a").attr('href', '/commercial-vehicle-insurance');
    //     // $(".Health a").attr('href', '/commercial-vehicle-insurance');
    //   }
    //   if (this.ss_id > 0) {
    //     this.is_agent = true;
    //     this.agent_id = this.ss_id;
    //     this.Is_Customer = false;
    //     $('.payBtn').css('visibility', 'visible');
    //   } else {
    //     this.is_agent = false;
    //     this.Is_Customer = true;

    //   }
    //   if (this.appVisitorData.hasOwnProperty('visitor_id') && this.appVisitorData.visitor_id != "") {
    //     this.visitor_id = this.appVisitorData.visitor_id;
    //   }
    //   this.getApilog(this.arn);
    // }, 100);


    this.ActivatedRoute.queryParams.subscribe(params => {
      this.client_id = params['client_id'];
      this.arn = params['arn'];
      if (params['ss_id'] !== undefined) {
        this.ss_id = params['ss_id'];
        if (this.ss_id > 0) {
          this.is_agent = true;
          this.agent_id = this.ss_id;
          this.Is_Customer = false;
          $('.payBtn').css('visibility', 'visible');
        } else {
          this.is_agent = false;
          this.Is_Customer = true;
        }
        this.getApilog(this.arn);

      }

    });
    // setTimeout(() => {

    // }, 1000);


    window.scrollTo(0, 0);

    //Preloader Js
    $(".loader").fadeOut("slow");

    if ($(window).width() < 992) {
      $('.car-proposal-policy-info.policy-info-listing').addClass('btn-hidden');
      $('.summary-info-wrapper').addClass('btn-hidden');
    }

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
    });

    $('.show-detail').click(function () {
      $('#car-proosal-detail-box').find('.insurance-price-breakup-area').toggleClass('hidden-section');
      $('.policy-detail-modal .policy-info-listing').toggleClass('btn-hidden');
      $(this).text(($(this).text() == 'Hide Price Breakup' ? 'Show Price Breakup' : 'Hide Price Breakup'))
        .toggleClass("active");
      $(this).parent(".insurance-price-breakup-area").find(".insurance-price-list").toggleClass('hidden-section');
    });

    if ($(window).width() < 992) {
      this.mobile_view = true
      $('#car-proosal-detail-box').find('.insurance-price-breakup-area').removeClass('hidden-section');
    } else {
      this.mobile_view = false
    }

    $(document).on('keypress', '.number-field', function (e) {
      if ($(e.target).prop('value').length >= 10) {
        if (e.keyCode != 32) { return false }
      }
    });

    $(document).on('keypress', '#permanent_pincode', function (e) {
      if ($(e.target).prop('value').length >= 6) {
        if (e.keyCode != 32) { return false }
      }
    });

    $(".number-field").attr("maxlength", "10");
    $(".number-field").keypress(function (e) {
      var kk = e.which;
      if (kk < 48 || kk > 57)
        e.preventDefault();
    });

    $('.other-detail-area').find('.check-input:checkbox').change(function () {
      if ($(this).is(':checked')) {
        $('.other-detail-area').find('.no-check[type="radio"]').prop('checked', true);
      }
      else {
        $('.other-detail-area').find('.no-check[type="radio"]').prop('checked', false);
      }
    });

    $('.other-detail-area').find('.yes-check[type="radio"]').change(function () {
      if ($(this).is(':checked')) {
        $('.other-detail-area').find('.check-input:checkbox').prop('checked', false);
      }
    });

    //Tab Change With Buttons

    $('.btn-prev').click(function (e) {
      e.preventDefault();
      var next_tab = $('.tab-change-wrap > .active').prev('.tab-change-btn');
      next_tab.trigger('click');
    });

    $('.genderCheck').is(':checked', () => {
      // console.log('genderIsCheck');
      $('#gender-err').html('')
    })

    //Bootstrap Tooltip
    $('[data-bs-toggle="tooltip"]').tooltip();

    //Custome Dropdown Select Bootstrap
    $(".select-dropdown-box-li a").click(function () {
      var selText = $(this).text();
      $(this).closest('.input-field-box').find('.select-dropdown').val(selText);
      // $(this).closest('.input-field-box').find('.select-dropdown').removeClass('show');
      // $(this).closest('.input-field-box').find('.select-dropdown-box').removeClass('show');
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

    //Get Dropdown value
    $('#js-dropdown-links-1 .js_click_link').click(function () {
      $('.input-field-box').find('#dropdownMenuButton4 .js-dropdown-value').text($(this).text());
    });
    $('#js-dropdown-links-2 .js_click_link').click(function () {
      $('.result-filter-box-area').find('#dropdownMenuButton4 .js-dropdown-value').text($(this).text());
    });

    $('#tel').on("keyup", function () {
      this.value = this.value.replace(/ /g, '');
      var number = this.value;
      this.value = number.replace(/\B(?=(\d{5})+(?!\d))/g, " ");
    });


  };
  visiting_city_funct() {
    $("#visiting_cities").autocomplete({
      source: (request, response) => {
        var append_data = [];
        var str = $("#visiting_cities").val();
        var strLen = str.length;
        var count = 0;
        this.TravelCity = append_data = this.visiting_cities.filter((name) => {
          if ((name.City_Name.substring(0, strLen)).toLowerCase() == str.toLowerCase()) {
            count++;
          }
          return ((name.City_Name.substring(0, strLen)).toLowerCase() == str.toLowerCase()) && count <= 15;
        });
        if (count == 0) {
          append_data = [{ 'City_Name': 'NO SUCH CITY', 'City_Code': "", "Country_Code": "", "Country": "" }];
        }
        response($.map(append_data, (index, val) => {
          return { label: index.City_Name, city_id: index.City_Code, Country_Code: index.Country_Code, Country: index.Country };
        }));
      },
      minLength: 1,
      appendTo: "#autoComplete3",
      classes: {
        "ui-autocomplete": "search-autocomplete"
      },
      select: (event, ui) => {
        if (ui.item.label == 'NO SUCH CITY') {
          // this.citySelected = false;
          $("#visiting_cities").val(''); //ui.item is your object from the array
          // $("#pincode").val('');
          $('#city_id').val('');
        }
        else {
          var visiting_city = {
            City_Code: ui.item.city_id,
            City_Name: ui.item.label,
            Country: ui.item.Country,
            Country_Code: ui.item.Country_Code
          }
          this.proposalForm.controls['visiting_city'].setValue(visiting_city);
          $("#visiting_cities").val(ui.item.label); //ui.item is your object from the array
          // $("#pincode").val(ui.item.pincode);
          $('#city_id').val(ui.item.city_id);
          // this.citySelected = true;
        }
        return false;
      }
    });

    $("#autoComplete3").click('li', function () {
      $(this).closest('.input-field-box').find('.ui-menu-item-wrapper').removeClass("active")
      $(this).addClass("active");  // adding active class
    });
  }
  getApilog(arn: string) {
    $('.loading').show();
    this.adult_members = Array.from(Array(this.adult_count - 0).keys());
    this.child_members = Array.from(Array(this.child_count - 0).keys());
    var post_arn = {
      'api_reference_number': arn
    }
    var method_name = '/quote/api_log_summary';
    this._horizon.callAPIPost(post_arn, method_name, 2).subscribe((data) => {
      // console.log('apilog data ', data);
      this.ReqObj = data;
      if (data["Proposal_Request"] != null) {
        this.proposal_data = true;
      }
      this.adult_count = data["Quote_Request"]["adult_count"];
      this.child_count = data["Quote_Request"]["child_count"];
      this.adult_members = Array.from(Array(this.adult_count).keys());
      this.child_members = Array.from(Array(this.child_count).keys());
      this.Insurer_Code = data["PB_Master"]["Insurer"]["Insurer_Code"];
      this.Insurer_ID = data["PB_Master"]["Insurer"]["Insurer_ID"];
      this.Summary = data["Summary"];
      this.Quote_Request = data["Quote_Request"];
      this.Proposal_Request = data["Proposal_Request"];
      this.Plan_Name = data["Summary"]["Plan_Name"];
      this.crn = data["Quote_Request"]["crn"];
      this.member_count = data["Quote_Request"]["member_count"];
      this.Final_Premium = data["Last_Premium_Response"]["final_premium"]
      this.final_premium = this.currency_format(data["Last_Premium_Response"]["final_premium"]);
      this.net_premium = this.currency_format(data["Last_Premium_Response"]["net_premium"]);
      this.service_tax = this.currency_format(data["Last_Premium_Response"]["service_tax"]);
      this.Sum_Insured = data["Last_Premium_Response"]["travel_insurance_si"];
      this.Currency_symbol = (data['Last_Premium_Response']['travel_insurance_si']).substring(0, 1);
      this.sum_insured = this.currency_format(data["Last_Premium_Response"]["travel_insurance_si"]);
      this.srn = data["Summary"]["Request_Unique_Id"];
      this.udid = data["Quote_Request"]["udid"];
      this.trip_type = data["Quote_Request"]["trip_type"];
      this.travel_start_date = data["Quote_Request"]["travel_start_date"];
      this.travel_end_date = data["Quote_Request"]["travel_end_date"];
      this.max_days = data["Quote_Request"]["maximum_duration"];
      this.travelling_to = data["Quote_Request"]["travelling_to_area"];
      this.travel_insurance_type = data["Quote_Request"]["travel_insurance_type"];
      this.ProductPlan_Id = data["Summary"]["Plan_Id"];
      this.Insurer_Logo_Name = data["PB_Master"]["Insurer"]["Insurer_Logo_Name"];
      this.insurer_logo_name = this.Insurer_Logo_Name.split(".")[0] + '.webp';
      this.Insurer_Name = data["PB_Master"]["Insurer"]["Insurer_Name"];
      this.posp_source = data["Quote_Request"]["posp_sources"];
      this.gender = data["Quote_Request"]["member_1_gender"];
      this.contact_name = data["Quote_Request"]["contact_name"];
      this.member_1_birth_date = data["Quote_Request"]["member_1_birth_date"];
      this.TravelStartDate = moment(this.travel_start_date, 'YYYY-MM-DD').format('MMM DD, YYYY');
      this.TravelEndDate = moment(this.travel_end_date, 'YYYY-MM-DD').format('MMM DD, YYYY');
      this.mobile = data["Quote_Request"]["mobile"];
      this.email = data["Quote_Request"]["email"];
      this.fba_id = data["Quote_Request"]["fba_id"];
      this.proposal_req_ssid = data["Quote_Request"]["ss_id"] == (undefined || "") ? 0 : data["Quote_Request"]["ss_id"];
      this.app_version = data["Quote_Request"]["app_version"];
      this.ProductID = data["Quote_Request"]["product_id"];
      this.mac_address = data["Quote_Request"]["mac_address"];
      this.sub_fba_id = data["Quote_Request"]["sub_fba_id"];
      // if ((environment.horizon_http_url).includes('qa') && this.Insurer_ID == 44) {
      //   this.liveOnly = false;
      // }
      // else {
      //   this.liveOnly = true;
      // }
      if ([26, 4, 5, 6, 44, 11].includes(this.Insurer_ID)) {
        this.getTravelingCountries();
      }
      if (data['Quote_Request'] && data['Quote_Request'].hasOwnProperty('app_version') && (data['Quote_Request']['app_version'].includes('policyboss-') ||data['Quote_Request']['app_version'].includes('IMAGIC_APP'))) {
        $('.mainHeader').hide();
        if(data['Quote_Request'].hasOwnProperty('query_params')){
            this.query_params = data['Quote_Request']['query_params'];
            // this.query_params = 'ss_id=16114&fba_id=68219&ip_address=10.0.3.64&mac_address=10.0.3.64&app_version=IMAGIC_APP';
        }
      }
      this.GetJsondata(data["Proposal_Request"]);
      // this.proposalForm.controls['contact_name'].setValue(data["Quote_Request"]["contact_name"]);
      if (this.Insurer_ID == 6) {
        var method_name = '/city/' + this.Insurer_ID;
        var cityDetails = this._horizon.callAPIGet('', method_name, 2).subscribe(
          data => {
            this.cities = data as any[];
            this.cities.forEach(element => {
              this.cityArray.push(element.City);

            });
          });
      }
      if (this.proposal_data == false) {
        $('#city').val("");
        $('#state').val("");
      }

      if (this.proposal_data) {
        for (var key in data["Proposal_Request"]) {
          if (typeof this.proposalForm.controls[key] != "undefined" && data["Proposal_Request"][key] != "" && data["Proposal_Request"][key] != null) {
            this.proposalForm.controls[key].setValue(data["Proposal_Request"][key]);
            this[key] = data["Proposal_Request"][key];

          }
        }
        if (data["Proposal_Request"].hasOwnProperty("nominee_name") && data["Proposal_Request"]["nominee_name"]) {
          let nominee_name = data["Proposal_Request"]["nominee_name"];
          $('#nominee_name').val(nominee_name);

          // $('#nominee_name').val(nominee_name.split(" ")[0]);
          // $('#nominee_last_name').val(nominee_name.split(" ")[1]);

        }
        for (var i = 1; i <= this.adult_count; i++) {
          if (data["Proposal_Request"].hasOwnProperty("member_" + i + "_passport_expiry") && data["Proposal_Request"]["member_" + i + "_passport_expiry"]) {
            this.proposalForm.controls["member_" + i + "_passport_expiry"].setValue(data["Proposal_Request"]["member_" + i + "_passport_expiry"]);
            this.yyyymmdd = this.proposalForm.get("member_" + i + "_passport_expiry").value;

            $('#member_' + i + '_passport_expiry_year').val(moment(this.yyyymmdd).format('YYYY'));
            $('#member_' + i + '_passport_expiry_month').val(moment(this.yyyymmdd).format('MM'));
            $('#member_' + i + '_passport_expiry_day').val(moment(this.yyyymmdd).format('DD'));
          }
        //   if (data["Proposal_Request"].hasOwnProperty("member_" + i + "_nominee_name") && data["Proposal_Request"]["member_" + i + "_nominee_name"]) {
        //     this.proposalForm.controls["member_" + i + "_nominee_name"].setValue(data["Proposal_Request"]["member_" + i + "_nominee_name"]);
          
        // }
          
        }

        for (var i = 3; i <= this.child_count + 2; i++) {
          if (data["Proposal_Request"].hasOwnProperty("member_" + i + "_passport_expiry") && data["Proposal_Request"]["member_" + i + "_passport_expiry"]) {
            this.proposalForm.controls["member_" + i + "_passport_expiry"].setValue(data["Proposal_Request"]["member_" + i + "_passport_expiry"]);
            this.yyyymmdd = this.proposalForm.get("member_" + i + "_passport_expiry").value;

            $('#member_' + i + '_passport_expiry_year').val(moment(this.yyyymmdd).format('YYYY'));
            $('#member_' + i + '_passport_expiry_month').val(moment(this.yyyymmdd).format('MM'));
            $('#member_' + i + '_passport_expiry_day').val(moment(this.yyyymmdd).format('DD'));
          }
        }

        for (var i = 1; i <= this.adult_count; i++) {
          if (data["Proposal_Request"].hasOwnProperty("member_" + i + "_suffering_since") && !(data["Proposal_Request"]["member_" + i + "_suffering_since"] == "")) {
            this.proposalForm.controls["member_" + i + "_suffering_since"].setValue(data["Proposal_Request"]["member_" + i + "_suffering_since"]);
            this.yyyymmdd = this.proposalForm.get("member_" + i + "_suffering_since").value;

            let month: any = moment(this.yyyymmdd).format('MM');
            let year = moment(this.yyyymmdd).format('YYYY');
            $('#member_' + i + '_suffering_since_month').val(month);
            $('#member_' + i + '_suffering_since_year').val(year);
          }
        }

        for (var i = 3; i <= this.child_count + 2; i++) {
          if (data["Proposal_Request"].hasOwnProperty("member_" + i + "_suffering_since") && !(data["Proposal_Request"]["member_" + i + "_suffering_since"] == "")) {
            this.proposalForm.controls["member_" + i + "_suffering_since"].setValue(data["Proposal_Request"]["member_" + i + "_suffering_since"]);
            this.yyyymmdd = this.proposalForm.get("member_" + i + "_suffering_since").value;
            let month: any = moment(this.yyyymmdd).format('MM');
            let year = moment(this.yyyymmdd).format('YYYY');
            $('#member_' + i + '_suffering_since_month').val(month);
            $('#member_' + i + '_suffering_since_year').val(year);
          }
        }

        if (data["Proposal_Request"].hasOwnProperty("nominee_birth_date") && data["Proposal_Request"]["nominee_birth_date"]) {
          this.proposalForm.controls["nominee_birth_date"].setValue(data["Proposal_Request"]["nominee_birth_date"]);
          this.yyyymmdd = this.proposalForm.get("nominee_birth_date").value;

          $('#nominee_dob_year').val(moment(this.yyyymmdd).format('YYYY'));
          $('#nominee_dob_month').val(moment(this.yyyymmdd).format('MM'));
          $('#nominee_dob_day').val(moment(this.yyyymmdd).format('DD'));
        }

        if (data["Proposal_Request"].hasOwnProperty("visiting_countries") && data["Proposal_Request"]["visiting_countries"]) {
          this.visiting_countries_autofill = data["Proposal_Request"]['visiting_countries'];
          for (var i = 0; i < this.visiting_countries_autofill.length; i++) {
            var value_visit_country = this.visiting_countries_autofill[i]['item_text'];
            this.countries_array.push(value_visit_country);
          }
        }
        if (data["Proposal_Request"].hasOwnProperty("visiting_city") && data["Proposal_Request"]["visiting_city"]) {
          var cityName = this.Proposal_Request["visiting_city"]['City_Name']
          $('#visiting_cities').val(cityName);

        }

        if (data["Proposal_Request"]["permanent_pincode"] > 0) {
          this.GetPincodeDetails(data["Proposal_Request"]["permanent_pincode"]);
        }
        this.Saltext = data["Proposal_Request"]["salutation_text"];
        this.proposalForm.controls['nominee_name'].setValue(data["Proposal_Request"]["nominee_name"]);
        this.proposalForm.controls['nominee_birth_date'].setValue(data["Proposal_Request"]["nominee_birth_date"]);
        this.proposalForm.controls['nominee_relation'].setValue(data["Proposal_Request"]["nominee_relation"]);
        this.SameAsNomineeAddress = data["Proposal_Request"]["same_as_for_nominee"];
        this.nominee_address = data["Proposal_Request"]["nominee_address"];
        this.nominee_pincode = data["Proposal_Request"]["nominee_pincode"];
        this.nominee_city_name = data["Proposal_Request"]["nominee_city_name"];
        this.NOForAll = data["Proposal_Request"]["no_for_all"];
        this.ismedquestnschecked = data["Proposal_Request"]["is_medquestns_checked"];

        if (this.SameAsNomineeAddress == 'yes' || this.SameAsNomineeAddress == true) {
          this.setNomineeInfo(this.nominee_address, this.nominee_pincode, this.nominee_city_name);
          this.SameAsNomineeAddress = true;
        } else {
          this.setNomineeInfo(this.nominee_address, this.nominee_pincode, this.nominee_city_name);
          this.SameAsNomineeAddress = false;
        };
        this.otherDetailsData = data["Proposal_Request"]["otherDetailsData"];
        if (this.Insurer_ID == 6) {
          $('#city').val(data["Proposal_Request"]["permanent_city"]);
          this._district_code = data["Proposal_Request"]["permanent_city_code"];
          this._state = data["Proposal_Request"]["permanent_state"];
          this._state_code = data["Proposal_Request"]["permanent_state_code"];
        }
        this.proposalForm.controls['birth_date'].setValue(data["Proposal_Request"]["birth_date"]);
        this.yyyymmdd = this.proposalForm.get('birth_date').value;
        $('#year').val(moment(this.yyyymmdd).year());
        $('#month').val(moment(this.yyyymmdd).format('MM'));
        $('#day').val(moment(this.yyyymmdd).format('DD'));
        for (var i = 1; i <= this.adult_count; i++) {
          if (data["Proposal_Request"].hasOwnProperty("member_" + i + "_birth_date")) {
            // this.proposalForm.controls["member_" + i + "_birth_date"].setValue(data["Quote_Request"]["member_" + i + "_birth_date"]);
            this.yyyymmdd = this.proposalForm.get("member_" + i + "_birth_date").value;
            $('#member_' + i + '_year').val(moment(this.yyyymmdd).format('YYYY'));
            $('#member_' + i + '_month').val(moment(this.yyyymmdd).format('MM'));
            $('#member_' + i + '_day').val(moment(this.yyyymmdd).format('DD'));
          }
        }

        for (var i = 3; i <= this.child_count + 2; i++) {
          if (data["Proposal_Request"].hasOwnProperty("member_" + i + "_birth_date")) {
            // this.proposalForm.controls["member_" + i + "_birth_date"].setValue(data["Quote_Request"]["member_" + i + "_birth_date"]);
            this.yyyymmdd = this.proposalForm.get("member_" + i + "_birth_date").value;
            $('#member_' + i + '_year').val(moment(this.yyyymmdd).format('YYYY'));
            $('#member_' + i + '_month').val(moment(this.yyyymmdd).format('MM'));
            $('#member_' + i + '_day').val(moment(this.yyyymmdd).format('DD'));
          }
        }
      } else {
        // this.proposalForm.controls['birth_date'].setValue(data["Quote_Request"]["member_1_birth_date"]);
        // this.yyyymmdd = this.proposalForm.get('birth_date').value;
        // $('#year').val(moment(this.yyyymmdd).format('YYYY'));
        // $('#month').val(moment(this.yyyymmdd).format('MM'));
        // $('#day').val(moment(this.yyyymmdd).format('DD'));
        // for (var i = 1; i <= this.adult_count; i++) {
        //   this.proposalForm.controls["member_" + i + "_birth_date"].setValue(data["Quote_Request"]["member_" + i + "_birth_date"]);
        //   this.yyyymmdd = this.proposalForm.get("member_" + i + "_birth_date").value;
        //   $('#member_' + i + '_year').val(moment(this.yyyymmdd).format('YYYY'));
        //   $('#member_' + i + '_month').val(moment(this.yyyymmdd).format('MM'));
        //   $('#member_' + i + '_day').val(moment(this.yyyymmdd).format('DD'));
        // }
        // for (var i = 3; i <= this.child_count + 2; i++) {
        //   this.proposalForm.controls["member_" + i + "_birth_date"].setValue(data["Quote_Request"]["member_" + i + "_birth_date"]);
        //   this.yyyymmdd = this.proposalForm.get("member_" + i + "_birth_date").value;
        //   $('#member_' + i + '_year').val(moment(this.yyyymmdd).format('YYYY'));
        //   $('#member_' + i + '_month').val(moment(this.yyyymmdd).format('MM'));
        //   $('#member_' + i + '_day').val(moment(this.yyyymmdd).format('DD'));
        // }
      }
      this.setDateDropDown();
      $('.loading').hide();
    }, (error) => {
      console.log('error:', error);
    });


  }

  getTravelingCountries() {
    var method_name = '/traveling_countries/' + this.travelling_to + '/' + this.Insurer_ID;
    this._horizon.callAPIGet('', method_name, 2).subscribe(
      data => {
        var countrydata: any = [];
        countrydata = data;
        if (this.Insurer_ID == 6) { // icici cities
          this.hasTravelCities = true;
          const keys_to_keep = ['City_Code', 'City_Name', 'Country_Code', 'Country'];
          var result = countrydata.map(e => {
            let obj = {};
            keys_to_keep.forEach(k => obj[k] = e[k])
            return obj;
          });
          this.visiting_cities = result;
          this.visiting_cities.forEach(element => {
            this.TcityArray.push(element.City_Name);

          });

        } else {
          this.hasTravelCountries = true;
          var countries = [];
          for (var i = 0; i < countrydata.length; i++) {
            let country = { item_id: countrydata[i].Country_Code, item_text: countrydata[i].Country };
            countries.push(country);
          }
          this.vistingcountry = countries;
        }

        setTimeout(() => {

          for (var i = 0; i < this.countries_array.length; i++) {
            for (var j = 0; j < this.vistingcountry.length; j++) {
              if (this.vistingcountry[j]['item_text'].includes(this.countries_array[i])) {
                $('#' + this.vistingcountry[j]['item_id']).addClass('active');
              }
            }
          }

        }, 1000);
      });
  }

  GetJsondata(request) {
    var insurer_json = this.Insurer_Code.replace(/\s/g, "");
    this._horizon.getInsurerData(insurer_json).subscribe((data) => {
      this.insurer_data = data[0];
      this._insurerQue = this.insurer_data["QueSubqueArray"];
      this._salutations = this.insurer_data["_salutations"];
      this._existingDiseases = this.insurer_data["_existingDiseases"];
      this._relation = this.insurer_data["_relation"];
      this.medicalDetails = this._existingDiseases;
      this._occupation = this.insurer_data["_occupation"];
      this._nomineeRelation = data[0]["nominee_relation"] != undefined ? data[0]["nominee_relation"] : this._relation;

      var selectedPED1 = [];
      var selectedPED2 = [];
      var selectedPED3 = [];
      var selectedPED4 = [];
      var selectedPED5 = [];
      var selectedPED6 = [];

      if (this.proposal_data) {

        $.each(request, (key) => {
          if (key == 'relation') {
            for (var k = 0; k < this._relation.length; k++) {
              if (this._relation[k]['id'] == request[key]) {
                $('#' + key + '1').val(this._relation[k]['name']);
              }
            }
          }
          if (key == 'nominee_relation') {
            for (var k = 0; k < this._nomineeRelation.length; k++) {
              if (this._nomineeRelation[k]['id'] == request[key]) {
                $('#' + key + '1').val(this._nomineeRelation[k]['name']);
              }
            }
          }
          if (key == 'salutation') {
            for (var k = 0; k < this._salutations.length; k++) {
              if (this._salutations[k]['id'] == request[key]) {
                $('#' + key + '1').val(this._salutations[k]['name']);
              }
            }
          }
          for (var j = 1; j <= this.adult_count; j++) {
            if (key == 'member_' + j + '_salutation') {
              for (var k = 0; k < this._salutations.length; k++) {
                if (this._salutations[k]['id'] == request[key]) {
                  $('#' + key + '1').val(this._salutations[k]['name']);
                }
              }
            }
            if (key == 'member_' + j + '_nominee_relation') {
              for (var k = 0; k < this._salutations.length; k++) {
                if (this._nomineeRelation[k]['id'] == request[key]) {
                  $('#' + key + '1').val(this._nomineeRelation[k]['name']);
                }
              }
            }
          }
          for (var j = 3; j <= this.child_count + 2; j++) {
            if (key == 'member_' + j + '_salutation') {
              for (var k = 0; k < this._salutations.length; k++) {
                if (this._salutations[k]['id'] == request[key]) {
                  $('#' + key + '1').val(this._salutations[k]['name']);
                }
              }
            }
            if (key == 'member_' + j + '_nominee_relation') {
              for (var k = 0; k < this._salutations.length; k++) {
                if (this._nomineeRelation[k]['id'] == request[key]) {
                  $('#' + key + '1').val(this._nomineeRelation[k]['name']);
                }
              }
            }
          }
          for (var j = 1; j <= this.adult_count; j++) {
            if (key == 'member_' + j + '_occupation') {
              for (var k = 0; k < this._occupation.length; k++) {
                if (this._occupation[k]['id'] == request[key]) {
                  $('#' + key + '1').val(this._occupation[k]['name']);
                }
              }
            }
          }
          for (var j = 3; j <= this.child_count + 2; j++) {
            if (key == 'member_' + j + '_occupation') {
              for (var k = 0; k < this._occupation.length; k++) {
                if (this._occupation[k]['id'] == request[key]) {
                  $('#' + key + '1').val(this._occupation[k]['name']);
                }
              }
            }
          }
        });
        if (this.Proposal_Request.hasOwnProperty("visiting_city") && this.Proposal_Request["visiting_city"]) {
          var cityName = this.Proposal_Request["visiting_city"]['City_Name']
          $('#visiting_cities').val(cityName);
        }
        for (var que in this._insurerQue) {
          var obj = {
            name: 'question_' + this._insurerQue[que].QuestionId,
          };
          obj['question_' + this._insurerQue[que].QuestionId + '_type'] = this.Proposal_Request['question_' + this._insurerQue[que].QuestionId + '_type'];
          obj['question_' + this._insurerQue[que].QuestionId + '_details'] = this.Proposal_Request['question_' + this._insurerQue[que].QuestionId + '_details'];
          obj['question_' + this._insurerQue[que].QuestionId + '_code'] = this._insurerQue[que].QuestionId;
          this.member_quearray.push(obj);
        }

        setTimeout(() => {
          for (let p = 1; p <= this.adult_count; p++) {
            this._existing_disease_autofill = [];
            if (this.Proposal_Request.hasOwnProperty('member_' + p + '_ped') && this.Proposal_Request['member_' + p + '_ped']) {

              var value_disease = this.Proposal_Request['member_' + p + '_ped'];
              for (var g = 0; g < value_disease.length; g++) {

                var value_disease_text = value_disease[g]['name'];
                this._existing_disease_autofill.push(value_disease_text)
                for (var h = 0; h < this._existingDiseases.length; h++) {
                  if (this._existingDiseases[h]['name'].includes(value_disease[g]['name'])) {
                    $('#' + this._existingDiseases[h]['id'] + p).addClass('active');
                  }
                }
              }
              if (this._existing_disease_autofill.includes('Any Other')) {
                $('.Pre_existing_' + p).css('display', 'block')
              }
              $('#member_' + p + '_ped').val(this._existing_disease_autofill);
            }
          }
          for (let p = 3; p <= this.child_count + 2; p++) {
            this._existing_disease_autofill_child = [];
            if (this.Proposal_Request.hasOwnProperty('member_' + p + '_ped') && this.Proposal_Request['member_' + p + '_ped']) {

              var value_disease_child = this.Proposal_Request['member_' + p + '_ped'];
              for (var g = 0; g < value_disease_child.length; g++) {

                var value_disease_text_child = value_disease_child[g]['name'];
                this._existing_disease_autofill_child.push(value_disease_text_child)
                for (var h = 0; h < this._existingDiseases.length; h++) {
                  if (this._existingDiseases[h]['name'].includes(value_disease_child[g]['name'])) {
                    $('#' + this._existingDiseases[h]['id'] + p).addClass('active');
                  }
                }
              }
              if (this._existing_disease_autofill_child.includes('Any Other')) {
                $('.Pre_existing_' + p).css('display', 'block')
              }
              $('#member_' + p + '_ped').val(this._existing_disease_autofill_child);
            }
          }
        }, 1000);

      } else {
        for (var que in this._insurerQue) {
          var obj = {
            name: 'question_' + this._insurerQue[que].QuestionId
          };
          obj['question_' + this._insurerQue[que].QuestionId + '_type'] = 'flag';
          obj['question_' + this._insurerQue[que].QuestionId + '_details'] = false;
          obj['question_' + this._insurerQue[que].QuestionId + '_code'] = this._insurerQue[que].QuestionId;
          this.member_quearray.push(obj);
        }
        // console.log('this.member_quearray', this.member_quearray);
      }
      this._nomineeDetails = this.insurer_data["_nomineeDetails"];
      this._travelPurpose = this.insurer_data["_travelPurpose"];
      this.otherDetails = this.insurer_data["otherDetails"];
    }, (error) => {
      console.log(error);
    })
  }
  trimValue(event) {
    event.target.value = event.target.value.replace(/\s+/g, ' ');
  }
  ValidateNumber(event) {
    if (!(/^[0-9]*$/.test(event.target.value))) {
      event.target.value = "";
    }
  }

  KeyPressEvent(event: any, type) {
    let pattern;
    switch (type) {
      case 'Text':
        pattern = /[a-zA-Z ]/;
        break;
      case 'OnlyText':
        pattern = /[a-zA-Z]/;
        break;
      case 'FullName': pattern = /^[A-Za-z]+[ ]{1}[A-Za-z]+$/;
        break;
      case 'OnlyNumber': pattern = /^[0-9]{0,}$/;
        break;
      case 'Number':
        pattern = /[0-9\+\-\ ]/;
        break;
      case 'AlphaNumeric':
        pattern = /[a-zA-Z0-9 ]/;
        break;
      case 'Address':
        pattern = /[a-zA-Z0-9\-\/,\(\) ]/;

        break;
      case 'Pincode':
        pattern = /[0-9]/;
        break;
    }
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) { event.preventDefault(); }
  }

  getdropdown(event) {
    var selText = $(event).text();
    $(event).closest('.input-field-box').find('.select-dropdown').val(selText);
    $(event).closest('.input-field-box').find('.select-dropdown').removeClass('show');
    $(event).closest('.input-field-box').find('.select-dropdown-box').removeClass('show');
  }

  activeDropdown(event: any, value, source, j: any) {
    $('.dropdown-list-col').removeClass('active');
    $(event).addClass('active');
    $('.sort-dropdown-box').removeClass('show');
    $('.sort-dropdown-toggle').removeClass('show');
    if (source == "relation") {
      // if (value.toLowerCase() === 'self' || value.toLowerCase() === '11' || value.toLowerCase() === '345') {
      //   // $('#day,#month,#year').attr('disabled', true);
      //   // $('#day').val(moment(this.member_1_birth_date).format('DD'));
      //   // $('#month').val(moment(this.member_1_birth_date).format('MM'));
      //   // $('#year').val(moment(this.member_1_birth_date).format('YYYY'));
      // } else {
      //   // $('#day,#month,#year').attr('disabled', false);
      // }
      $('#relation').val(value);
    }
    if (source == "select_Q") {
      $('#other_detail_' + j).val(value);
    }
    if (source == "nominee_relation") {
      if (this.Insurer_ID == 11) {
        $('#member_' + j + '_nominee_relation').val(value);
      } else {
        $('#nominee_relation').val(value);
      }
    }
    if (source == 'occupation') {
      $('#member_' + j + '_occupation').val(value);
    }
    if (source == 'nominee_dob_year' || source == 'nominee_dob_month') {
      var day = parseInt($('#nominee_dob_day').val());
      var year = $('#nominee_dob_year').val();
      if (source == "nominee_dob_year") {
        year == this.current_year - 18 ? $('#nominee_dob_month').val('') : "";
        this.nominee_months = year == this.current_year - 18
          ? Array.from({ length: this.current_month }, (_, i) => i + 1)
          : Array.from({ length: 12 }, (_, i) => i + 1);

        // if (year == (this.current_year - 18)) {
        //   $('#nominee_dob_month').val('');
        //   var min_dob_month = this.current_month;
        //   this.nominee_months = [];
        //   for (var i = min_dob_month; i >= 1; i--) {
        //     this.nominee_months.push(i);
        //   }
        //   this.nominee_months = this.nominee_months.reverse();
        // } else {
        //   this.nominee_months = [];
        //   for (var i = 12; i >= 1; i--) {
        //     this.nominee_months.push(i);
        //   }
        //   this.nominee_months = this.nominee_months.reverse();
        // }
      }
      if (source == 'nominee_dob_month' || (year != "" && $('#nominee_dob_month').val() != "")) {
        var month: any = parseInt($('#nominee_dob_month').val());
        month === this.current_month + 1 && year == this.current_year - 18 ? $('#nominee_dob_day').val('') : "";
        this.nominee_day = month === this.current_month + 1 && year == this.current_year - 18
          ? Array.from({ length: this.current_day }, (_, i) => i + 1)
          : Array.from({ length: this.getDaysInMonths(year, month) }, (_, i) => i + 1);

        // if (month == this.current_month + 1 && year == (this.current_year - 18)) {
        //   $('#nominee_dob_day').val('');
        //   this.nominee_day = [];
        //   for (var i = this.current_day; i >= 1; i--) {
        //     this.nominee_day.push(i);
        //   }
        //   this.nominee_day = this.nominee_day.reverse();
        // } else {
        //   // $('#nominee_dob_day').val('');
        //   var nominee_date = this.getDaysInMonths(year, month);
        //   this.nominee_day = [];
        //   for (var i = nominee_date; i >= 1; i--) {
        //     this.nominee_day.push(i);
        //   }
        //   this.nominee_day = this.nominee_day.reverse();
        // }
      }
    }
    if (source == 'adult_year' || source == 'adult_month') {
      var year: any = parseInt($('#year').val());

      if (source == "adult_year") {
        year === this.current_year - 18 ? $('#month').val('') : "";
        this.months = year === this.current_year - 18
          ? Array.from({ length: this.current_month }, (_, i) => i + 1)
          : Array.from({ length: 12 }, (_, i) => i + 1);

        // if (year == this.current_year - 18) {
        //   $('#month').val('');
        //   var min_dob_month = this.current_month;
        //   this.months = [];
        //   for (var i = min_dob_month; i >= 1; i--) {
        //     this.months.push(i);
        //   }
        //   this.months = this.months.reverse();
        // } else {
        //   this.months = [];
        //   for (var i = 12; i >= 1; i--) {
        //     this.months.push(i);
        //   }
        //   this.months = this.months.reverse();
        // }
      }
      if (source == 'adult_month' || (year != "" && month != "")) {
        var month: any = $('#month').val() == "" ? "" : $('#month').val();
        month == this.current_month + 1 && year == this.current_year - 18 ? $('#day').val('') : "";
        this.day = month == this.current_month + 1 && year == this.current_year - 18
          ? Array.from({ length: this.current_day }, (_, i) => i + 1)
          : Array.from({ length: this.getDaysInMonths(year, month) }, (_, i) => i + 1);

        // if (month == this.current_month + 1 && year == this.current_year - 18) {
        //   $('#day').val('');
        //   this.day = [];
        //   for (var i = this.current_day; i >= 1; i--) {
        //     this.day.push(i);
        //   }
        //   this.day = this.day.reverse();
        // } else {
        //   // $('#day').val('');
        //   var adult_date = this.getDaysInMonths(year, month);
        //   this.day = [];
        //   for (var i = adult_date; i >= 1; i--) {
        //     this.day.push(i);
        //   }
        //   this.day = this.day.reverse();
        // }
      }
    }

    if (source === 'member_suffering_since_year') {
      const year = parseInt(value);

      year == this.current_year ? $('#member_' + j + '_suffering_since_month').val('') : "";
      this.months = year === this.current_year
        ? Array.from({ length: this.current_month }, (_, i) => i + 1)
        : Array.from({ length: 12 }, (_, i) => i + 1);

      // if (year == this.current_year) {
      //   $('#member_' + j + '_suffering_since_month').val("");
      //   var min_dob_month = this.current_month;
      //   this.months = [];
      //   for (var i = min_dob_month; i >= 1; i--) {
      //     this.months.push(i);
      //   }
      //   this.months = this.months.reverse();
      // } else {
      //   this.months = [];
      //   for (var i = 12; i >= 1; i--) {
      //     this.months.push(i);
      //   }
      //   this.months = this.months.reverse();
      // }
    }


    if (source == 'salutation') {
      $('#member_' + j + '_salutation').val(value);
    }
    if (source == 'main_salutation') {
      $('#salutation').val(value);
    }
  }

  callPincodeDetails() {
    var pincode = $('#permanent_pincode').val();
    if (pincode == undefined || pincode == "") {
      $('#city').val('');
      $('#state').val('');
    } else {
      this.GetPincodeDetails(pincode);
    }
  }

  GetPincodeDetails(_pincode) {
    if (this.Insurer_ID == 6) { }
    else if (this.Insurer_ID == 44) {
      var method_name = '/getPinDetails/' + _pincode;
      this._horizon.callAPIGet('', method_name, 2).subscribe(
        data => {
          // console.log('digit pincodedata', data);
          this._state = data['State'];
          this._district = data['City'];
          this.proposalForm.controls["state"].setValue(this._state);
          this.proposalForm.controls["city"].setValue(this._district);
        });
    } else if (this.Insurer_ID == 26) {
      var method_name = '/quote/starhealth_pincode/' + _pincode;
      this._horizon.callAPIGet('', method_name, 2).subscribe(
        data => {
          this._state = data['state_name'];
          this._district = data['city'][0]['city_name'];
          this._district_code = data['city'][0]['city_id'];
          this.proposalForm.controls["state"].setValue(this._state);
          this.proposalForm.controls["city"].setValue(this._district);

        });
    } else {
      if (this.Insurer_ID === 2 || this.Insurer_ID === 1 || this.Insurer_ID === 11) {
        var method_name = '/pincode/' + _pincode + '/9';
      } else {
        var method_name = '/pincode/' + _pincode + '/' + this.Insurer_ID;
      }
      this._horizon.callAPIGet('', method_name, 2).subscribe(
        data => {
          this._state = data[0].State;
          this._locality = data;
          this._district = data[0].District;
          this._state_code = data[0].State_Code;
          this._locality_code = data[0].City_Id;
          this._district_code = data[0].District_Code;
          this.proposalForm.controls["state"].setValue(this._state);
          this.proposalForm.controls["city"].setValue(this._district);
        });
    }
  }

  getClientBrowserDetails() {
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          this.showPosition(position)
        },
        error => {
          console.log('Position Unavailable');
          // console.log(error);
        }
      );
    }
  }

  showPosition(position) {
    this.geo_lat = position.coords.latitude;
    this.geo_long = position.coords.longitude;
    this._horizon.getIpAddress().subscribe(data => {
      // console.log("Ip data", data);
      this.ip_address = data["ip"];
      this.ip_city_state = data["city"] + "_" + data["region"];
    });
  }

  CheckPattern(Input, Type) {
    let pattern;
    switch (Type) {
      case 'Text': pattern = new RegExp('^[a-zA-Z ]+$'); break;
      case 'OnlyText': pattern = new RegExp('^[a-zA-Z]+$'); break;
      case 'Number': pattern = new RegExp('^[0-9]*$'); break;
      case 'FullName': pattern = new RegExp('^[A-Za-z]+[ ]{1}[A-Za-z]+$'); break;
      case 'AlphaNumeric': pattern = new RegExp('^[a-zA-Z0-9 ]+$'); break;
      case 'Address': pattern = new RegExp('^[a-zA-Z0-9-,./ ]+$'); break;
      case 'District': pattern = new RegExp('^[a-zA-Z\(\) ]+$'); break;
      case 'PassportNumber': pattern = new RegExp("[A-Z]{1}[0-9]{7}"); break;
      case 'Pan': pattern = new RegExp('[A-Z]{5}[0-9]{4}[A-Z]{1}'); break;
    }
    if (pattern.test(Input) == false) { return false; }
  }

  IsProposerSelf() {
    var sal = ((<HTMLInputElement>document.getElementById('salutation')).value);
    var sal1 = ((<HTMLInputElement>document.getElementById('salutation1')).value);
    var full_name = ((<HTMLInputElement>document.getElementById('contact_name')).value);
    // var birth_date = $('#year').val() + '-' + $('#month').val() + '-' + $('#day').val()
    this.gender = $("input[type='radio'][name='gender']:checked").val();
    var relation = ((<HTMLInputElement>document.getElementById('relation')).value);

    if (relation != '0' && relation != '') {
      var rel_with_insured = $('#relation1').val().toLowerCase();
      if (rel_with_insured == "self") {
        ((<HTMLInputElement>document.getElementById("member_1_salutation")).value) = sal;
        ((<HTMLInputElement>document.getElementById("member_1_salutation1")).value) = sal1;
        ((<HTMLInputElement>document.getElementById("member_1_fullName")).value) = full_name;
        ((<HTMLInputElement>document.getElementById("member_1_year")).value) = $('#year').val();
        ((<HTMLInputElement>document.getElementById("member_1_day")).value) = $('#day').val();
        ((<HTMLInputElement>document.getElementById("member_1_month")).value) = $('#month').val();
        for (let i = 0; i < document.getElementsByClassName('member_1_gender').length; i++) {
          if ($('.member_1_gender')[i].value == this.gender) {
            $('.member_1_gender')[i].checked = true;
          } else {
            $('.member_1_gender')[i].checked = false;

          }
        }
        $("#member_1_salutation1,#member_1_fullName,#member_1_year,#member_1_day,#member_1_month").attr('disabled', true);
        $('.member_1_gender').attr('disabled', true);
        $("#member_1_salutation1,#member_1_fullName").removeClass('has-errors');
        $('.member_1_gender').removeClass('has-errors');
        $("#salutation_1,#_salutation_1,#fullname_1-err").html("");

        if (this.adult_count > 1) {
          if (this.gender == 'M') {
            (<HTMLInputElement>document.getElementById("check-item-2-F")).checked = true;
            (<HTMLInputElement>document.getElementById("check-item-2-M")).checked = false;
          } else if (this.gender == 'F') {
            (<HTMLInputElement>document.getElementById("check-item-2-M")).checked = true;
            (<HTMLInputElement>document.getElementById("check-item-2-F")).checked = false;
          }
          $('.member_2_gender').removeClass('has-errors').attr('disabled', true);
        }
      }
      else {
        // ((<HTMLInputElement>document.getElementById("member_1_year")).value) ="";
        // ((<HTMLInputElement>document.getElementById("member_1_day")).value) ="";
        $("#member_1_salutation1,#member_1_fullName,#member_1_year,#member_1_day,#member_1_month").attr('disabled', false);
        // ((<HTMLInputElement>document.getElementById("member_1_month")).value) = "";
        if (((<HTMLInputElement>document.getElementById("member_1_fullName")).value) == full_name) {
          $("#member_1_fullName,#member_1_salutation").val("").attr('disabled', false);
          $("#member_1_salutation1").val("Title").attr('disabled', false);

          if (![1, 44].includes(this.Insurer_ID)) {
            $("#member_1_occupation,#member_1_occupation1").val("").attr('disabled', false);
          }
        }
        $('.member_1_gender').attr('disabled', false);
      }
    }
  }

  next1(e, data_valid) {
    e.preventDefault();
    e.stopPropagation();
    var err: number = 0;
    var sal = ((<HTMLInputElement>document.getElementById('salutation')).value);
    var name = ((<HTMLInputElement>document.getElementById('contact_name')).value);
    var mobile = ((<HTMLInputElement>document.getElementById('mobile')).value);
    var email = ((<HTMLInputElement>document.getElementById('email')).value);
    var birth_date = $('#year').val() + '-' + $('#month').val() + '-' + $('#day').val();
    let day = $('#day').val();
    let month = $('#month').val();
    let year = $('#year').val();
    var gender = $("input[type='radio'][name='gender']:checked").val()
    var relation = ((<HTMLInputElement>document.getElementById('relation')).value);
    let dobValid = false;
    if (sal == '' || sal == '0') {
      err++;
      document.getElementById('salutation1').classList.add('has-errors');
      $('#sal-err').html('Please select salutation');
    } else {
      $('#sal-err').html('');
      this.proposalForm.controls['salutation'].setValue(sal);
      var salutationText = $('#salutation1').val().toLowerCase();

      if (relation != '0' && relation != '') {
        var relationText = $('#relation1').val().toLowerCase();
      }
      if ((salutationText == "mr" && gender == "F") || ((salutationText == "mrs" || salutationText == "miss") && gender == "M")
        || (salutationText == "mr" && relationText == "mother") || ((salutationText == "mrs" || salutationText == "miss") && relationText == "father")) {
        document.getElementById('salutation1').classList.add('has-errors');
        err++;
        $('#sal-err').html('Please select correct salutation');
      }
      else {
        document.getElementById('salutation1').classList.remove('has-errors');
        $('#sal-err').html('');
      }
    }

    if (name == "" || name.length < 3 || this.CheckPattern(name, 'Text') == false) {
      $('#contact_name-err').html('Please enter the name')
      document.getElementById("contact_name").classList.add("has-errors"); err++;
    } else {
      const MyName = name.split(" ");
      if (MyName.length < 2 || MyName[1] == "") {
        $('#contact_name-err').html('Please enter the full name');
        document.getElementById("contact_name").classList.add("has-errors"); err++;
      } else {
        $('#contact_name-err').html('');
        this.proposalForm.controls["contact_name"].setValue(name);
        document.getElementById("contact_name").classList.remove("has-errors");
      }
    }

    if (mobile == '') {
      document.getElementById('mobile').classList.add('has-errors'); err++;
      $('#mobile-err').html('Please enter your moblie no.');
    } else {
      var mobilepattern = new RegExp('^[6-9]{1}[0-9]{9}$');
      if (mobilepattern.test(mobile) == false) {
        $('#mobile-err').html('Mobile number is invalid');
        document.getElementById('mobile').classList.add('has-errors'); err++;
      } else {
        $('#mobile-err').html('');
        document.getElementById('mobile').classList.remove('has-errors');
      }
    }

    if (email == '') {
      $('#email-err').html('Please enter email address');
      document.getElementById('email').classList.add('has-errors'); err++;
    } else {
      var re = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      if (!re.test(email)) {
        document.getElementById('email').classList.add('has-errors');
        $('#email-err').html('Enter valid email address');
        err++;
      }
      else {
        document.getElementById('email').classList.remove('has-errors');
        $('#email-err').html('')
      }
    }

    // if (day == "" || day == undefined) {
    //   $('#day').addClass("has-errors");
    //   err++;
    // } else {
    //   $('#day').removeClass("has-errors");
    //   dob_f = true;
    // }
    // if (month == "" || month == undefined) {
    //   $('#month').addClass("has-errors");
    //   err++;
    // } else {
    //   $('#month').removeClass("has-errors");
    //   dob_f = true;
    // }
    // if (year == "" || year == undefined) {
    //   $('#year').addClass("has-errors");
    //   err++;
    // } else {
    //   $('#year').removeClass("has-errors");
    //   dob_f = true;
    // }
    const dobFields = ['#day', '#month', '#year'];
    dobFields.forEach(field => {
      const value = $(field).val();
      if (!value) {
        $(field).addClass('has-errors');
        dobValid = false;
      } else {
        dobValid = true;
        $(field).removeClass('has-errors');
      }
    });

    if (birth_date == "--" || birth_date == null || dobValid == false) {
      $('#birth_date-err').html('Select Date of Birth'); err++;
    }
    else if (!moment(birth_date, 'YYYY-MM-DD', true).isValid()) {
      $('#birth_date-err').html('Please Select Valid DOB');
      $('#day,#month,#year').addClass("has-errors");
      err++
    } else if (moment().diff(moment(birth_date), 'years') < 18) {
      $('#day,#month,#year').addClass("has-errors");
      $('#birth_date-err').html('Age should be at least 18 years old'); err++;
      err++;
    } else {
      $('#birth_date-err').html('');
      this.proposalForm.controls["birth_date"].setValue(birth_date);
    }

    if (gender == '' || gender == "0" || gender == undefined) {
      err++;
      $('#gender-err').html('Gender is required');
      $('.gender').addClass('has-errors');
    } else {
      $('#gender-err').html('');
      $('.gender').removeClass('has-errors');
      if ((salutationText == "mr" && gender == "F") || ((salutationText == "mrs" || salutationText == "miss") && gender == "M")) {
        err++;
        document.getElementById('salutation1').classList.add('has-errors');
        $('.gender').addClass('has-errors');
      }
      else {
        $('.gender').removeClass('has-errors');

      }
    }

    if (relation == '') {
      err++;
      $('#relation-err').html('Please select relation');
      document.getElementById('relation1').classList.add('has-errors');
    } else {
      document.getElementById('relation1').classList.remove('has-errors');
      $('#relation-err').html('');
      this.proposalForm.controls['relation'].setValue(relation);

    }


    var pan = ((<HTMLInputElement>document.getElementById('pan')).value);
    var PanPattern = new RegExp('^[a-zA-Z]{3}[PCHFATBLJG]{1}[a-zA-Z]{1}[0-9]{4}[a-zA-Z]{1}$');
    if (pan != '') {
      if (PanPattern.test(pan.toUpperCase()) == false) {
        err++;
        $('#pan-err').html('Please enter valid pan no.');
        document.getElementById('pan').classList.add('has-errors');
      } else {
        $('#pan-err').html('');
        document.getElementById('pan').classList.remove('has-errors');
      }
    } else {
      if (pan == '') {
        err++;
        $('#pan-err').html('Please enter pan no.');
        document.getElementById('pan').classList.add('has-errors');
      } else {
        $('#pan-err').html('');
        document.getElementById('pan').classList.remove('has-errors');
      }
    }


    if (this.hasTravelCountries) {
      this.visting_countries_object = [];
      if (this.countries_array.length > 0) {
        document.getElementById('visiting_countries').classList.remove('invalidField');
        $('#travelCountries-err').html('');
        for (var i = 0; i < this.vistingcountry.length; i++) {
          if (this.countries_array.includes(this.vistingcountry[i]['item_text'])) {
            // $('#visiting_countries').val(this.vistingcountry[i]['item_text']);
            var country_name = this.vistingcountry[i]['item_text'];
            var country_id = this.vistingcountry[i]['item_id'];
            this.visting_countries_array = { 'item_id': country_id, 'item_text': country_name }
            this.visting_countries_object.push(this.visting_countries_array)
            // this.Proposal_Request.controls['visiting_countries'].setValue(this.vistingcountry[i]['id']);
            // this.Proposal_Request['visiting_countries'] = this.vistingcountry[i]['Country_Code'];

          }

        }

        //   this.proposalForm.controls['visiting_countries'].setValue({});
        this.proposalForm.controls['visiting_countries'].setValue(this.visting_countries_object);
        // this.Proposal_Request['visiting_countries'] = this.visting_countries_object
      }

      else {
        err++;
        document.getElementById('visiting_countries').classList.add('invalidField');
        $('#travelCountries-err').html('Select Visiting Country');
      }
      //   if (data_valid.visiting_countries.length > 0) {
      //     document.getElementById('visiting_countries').classList.remove('invalidField');
      //     $('#travelCountries-err').html('');
      //   }
      //   else {
      //     err++;
      //     document.getElementById('visiting_countries').classList.add('invalidField');
      //     $('#travelCountries-err').html('Select Visiting Country');
      //   }
      // }
      // if (this.Insurer_ID == 6) { // traveling citites
      //   if (data_valid.visiting_city != '' && typeof data_valid.visiting_city === 'object') {
      //     document.getElementById('visiting_city').classList.remove('invalidField');
      //   } else {
      //     document.getElementById('visiting_city').classList.add('invalidField');
      //     err++;
      //   }
    }

    if (this.hasTravelCities) {
      this.visting_cities_object = [];

      var visiting_cities = $('#visiting_cities').val();
      if (visiting_cities) {
        if (this.TcityArray.includes(visiting_cities)) {
          $('#visiting_cities').removeClass('has-errors');
          $('#visiting_cities_err').html('');
          // this.proposalForm.controls['visiting_city'].setValue(visiting_cities);
        } else {
          $('#visiting_cities').addClass('has-errors');
          $('#visiting_cities_err').html('Please enter valid city'); err++;
        }
      }
      else {
        $('#visiting_cities').addClass('has-errors');
        $('#visiting_cities_err').html('Please enter city'); err++;
      }

      //   this.proposalForm.controls['visiting_countries'].setValue({});
      // this.Proposal_Request['visiting_countries'] = this.visting_countries_object
      // }

      // else {
      //   err++;
      //   document.getElementById('visiting_cities').classList.add('invalidField');
      //   $('#travelCities-err').html('Select Visiting Cities');
      // }
      //   if (data_valid.visiting_countries.length > 0) {
      //     document.getElementById('visiting_countries').classList.remove('invalidField');
      //     $('#travelCountries-err').html('');
      //   }
      //   else {
      //     err++;
      //     document.getElementById('visiting_countries').classList.add('invalidField');
      //     $('#travelCountries-err').html('Select Visiting Country');
      //   }
      // }
      // if (this.Insurer_ID == 6) { // traveling citites
      //   if (data_valid.visiting_city != '' && typeof data_valid.visiting_city === 'object') {
      //     document.getElementById('visiting_city').classList.remove('invalidField');
      //   } else {
      //     document.getElementById('visiting_city').classList.add('invalidField');
      //     err++;
      //   }
    }

    if (err == 0) {
      this.IsProposerSelf();
      $('.loading').show();
      var next_tab = this.mobile_view ? $('.tab-change-wrap > .active').next('.tab-change-btn') : $('.tab-change-wrap > .active').next('.tab-change-btn')[0]['id'];
      this.update_user_data(this.proposalForm.value);
      if (next_tab.length > 0) {
        if (this.mobile_view) {
          next_tab.attr('data-bs-toggle', 'tab');
          next_tab.trigger('click');

        } else {
          $('#' + next_tab).attr('data-bs-toggle', 'tab');
          $('#' + next_tab).trigger('click');
        }
        $('.tab-change-wrap > .active').prev('.tab-change-btn').addClass('finished');
      } else {
        $('.nav-tabs li:eq(0) a').trigger('click');
      }
    } else {
      e.preventDefault();
      e.stopPropagation();

    }
  };

  next2(e, data_valid) {
    e.preventDefault();
    e.stopPropagation();
    var err: number = 0;
    var permanent_pincode = $('.permanent_pincode').val();
    var state = $('#state').val();
    var city = $('#city').val();
    var address = $('#address').val();
    // var permanent_address_2 = $('#permanent_address_2').val();
    // var permanent_address_3 = $('#permanent_address_3').val();
    if (permanent_pincode == '') {
      err++;
      $('#pincode-err').html('Please enter pincode');
      $('.permanent_pincode').addClass('has-errors');
    } else if (this.CheckPattern(permanent_pincode, 'Number') == false || permanent_pincode.length !== 6) {
      err++;
      $('#pincode-err').html('Invalid pincode');
      $('.permanent_pincode').addClass('has-errors');
    }
    else {
      $('#pincode-err').html('');
      $('.permanent_pincode').removeClass('has-errors');

      if (this.hasOwnProperty('Proposal_Request') && this.Proposal_Request && this.Proposal_Request.hasOwnProperty('same_as_for_nominee') && this.Proposal_Request['same_as_for_nominee'] === 'yes') {
        // console.log('hello everyone');
        this.setNomineeInfo($('#completeAddress').val(), $('#permanent_pincode').val(), $('#city').val());
        this.SameAsNomineeAddress = true;
      };
    }

    if (state == '') {
      err++;
      $('#state-err').html('Please enter state');
      document.getElementById('state').classList.add('has-errors');
    } else {
      $('#state-err').html('')
      document.getElementById('state').classList.remove('has-errors');
    }
    if (this.Insurer_ID == 6) {
      if (city) {
        if (this.cityArray.includes(city)) {
          $('#city').removeClass('has-errors');
          $('#city-err').html('');
        } else {
          err++
          $('#city').addClass('has-errors');
          $('#city-err').html('Please enter valid city');
        }
      } else {
        $('#city').addClass('has-errors');
        $('#city_err').html('Please enter city'); err++;
      }
    } else {
      if (city) {
        $('#city').removeClass('has-errors');
        $('#city-err').html('');
      } else {
        $('#city').addClass('has-errors');
        $('#city_err').html('Please enter city'); err++;
      }
    }

    $('#address').val($('#address').val().trim());
    $('#completeAddress').val($('#address').val().trim());
    $('#permanent_pincode').val($('#permanent_pincode').val().trim());
    if ($('#address').val() === "" || this.checkAddress($('#address')) === false) {

      $('#address').addClass('has-errors');
      $('#address-err').html(this.error_msg['RegisteredAddress']);
      err++;
    } else {
      $('#address').removeClass('has-errors');
      $('#address-err').html("");
      if (this.hasOwnProperty('Proposal_Request') && this.Proposal_Request && this.Proposal_Request.hasOwnProperty('permanent_address_2') && this.Proposal_Request['permanent_address_2'] && this.Proposal_Request['permanent_address_2'].trim() === ($('#permanent_pincode').val() + '-' + $('#city').val())) {
        this.Proposal_Request['permanent_address_2'] = '';
      }
      let addrArray = $('#address').val().replace(/\s+/g, ' ').trim().split(' ');
      let RegisteredAddress1 = '';
      let RegisteredAddress2 = '';
      let RegisteredAddress3 = '';
      let isRegisteredAddress1Done = false;
      let isRegisteredAddress2Done = false;
      for (var i = 0; i < addrArray.length; i++) {
        if ((RegisteredAddress1.trim() + ' ' + addrArray[i]).split('').length <= 25 && isRegisteredAddress1Done === false) {
          RegisteredAddress1 += ' ' + addrArray[i];
        } else if ((RegisteredAddress1.trim().length < 25 && isRegisteredAddress1Done === false)) {
          RegisteredAddress1 += ' ' + addrArray[i];
          isRegisteredAddress1Done = true;
        } else if ((RegisteredAddress2.trim() + ' ' + addrArray[i]).split('').length <= 25 && isRegisteredAddress2Done === false) {
          isRegisteredAddress1Done = true;
          RegisteredAddress2 += ' ' + addrArray[i];
        } else {
          isRegisteredAddress1Done = true;
          isRegisteredAddress2Done = true;
          RegisteredAddress3 += ' ' + addrArray[i];
        }
      }
      if (RegisteredAddress2 === '') {
        if ($('#permanent_pincode').val()) {
          RegisteredAddress2 = $('#permanent_pincode').val() + '-' + $('#city').val();
        }
      }
      $('#RegisteredAddress1').val(RegisteredAddress1.trim());
      $('#RegisteredAddress2').val(RegisteredAddress2.trim());
      $('#RegisteredAddress3').val(RegisteredAddress3.trim());
      $('#address').val(address);
      this.proposalForm.controls['permanent_address_1'].setValue($('#RegisteredAddress1').val());
      this.proposalForm.controls['permanent_address_2'].setValue($('#RegisteredAddress2').val());
      this.proposalForm.controls['permanent_address_3'].setValue($('#RegisteredAddress3').val());
      this.proposalForm.controls['completeAddress'].setValue($('#completeAddress').val());
      this.proposalForm.controls['city'].setValue($('#city').val());
      this.proposalForm.controls['state'].setValue($('#state').val());
      this.Proposal_Request['permanent_address_1'] = $('#RegisteredAddress1').val();
      this.Proposal_Request['permanent_address_2'] = $('#RegisteredAddress2').val();
      this.Proposal_Request['permanent_address_3'] = $('#RegisteredAddress3').val();
      this.Proposal_Request['state'] = $('#state').val();
      this.Proposal_Request['city'] = $('#city').val();
      this.Proposal_Request['completeAddress'] = $('#completeAddress').val() ? $('#completeAddress').val() : '';

    }

    if (this.hasOwnProperty('Proposal_Request') && this.Proposal_Request && this.Proposal_Request.hasOwnProperty('same_as_for_nominee') && this.Proposal_Request['same_as_for_nominee'] === 'yes') {
      // console.log('hello everyone');
      this.setNomineeInfo($('#completeAddress').val(), $('#permanent_pincode').val(), $('#city').val());
      this.SameAsNomineeAddress = true;

    };

    if (err == 0) {
      $('.loading').show();
      var next_tab = this.mobile_view ? $('.tab-change-wrap > .active').next('.tab-change-btn') : $('.tab-change-wrap > .active').next('.tab-change-btn')[0]['id'];

      this.update_user_data(this.proposalForm.value);
      if (next_tab.length > 0) {
        if (this.mobile_view) {
          next_tab.attr('data-bs-toggle', 'tab');
          next_tab.trigger('click');
        } else {
          $('#' + next_tab).attr('data-bs-toggle', 'tab');
          $('#' + next_tab).trigger('click');
        }

        $('.tab-change-wrap > .active').prev('.tab-change-btn').addClass('finished');
      } else {
        $('.nav-tabs li:eq(0) a').trigger('click');
      }
    } else {
      e.preventDefault();
      e.stopPropagation();
    }

  };
  next3(e, data_valid) {
    e.preventDefault();
    e.stopPropagation();
    var member_passport_number = [];
    var count = 0;
    var err: number = 0;
    var adult_count = this.adult_count;
    var child_count = this.child_count;

    if (this.proposal_data) {
      if (this.ismedquestnschecked === 'yes') {
        if (this.NOForAll === 'yes') {
          (<HTMLInputElement>document.getElementById('noForAll')).checked = true;
          for (var x = 0; x < this._insurerQue.length; x++) {
            (<HTMLInputElement>document.getElementById('selectAll_' + this._insurerQue[x]['QuestionId'])).checked = true;
          }
        }
        for (var ind = 0; ind < this._insurerQue.length; ind++) {
          var index_member_quearray = this.member_quearray.findIndex(x => x.name == 'question_' + this._insurerQue[ind]['QuestionId']);
          if (this.Proposal_Request['question_' + this._insurerQue[ind]['QuestionId'] + '_type'] === 'flag') {
            this.member_quearray[index_member_quearray]['question_' + this._insurerQue[ind]['QuestionId'] + '_type'] = 'flag';
            this.member_quearray[index_member_quearray]['question_' + this._insurerQue[ind]['QuestionId'] + '_code'] = this._insurerQue[ind]['QuestionId'];
            if (this.Proposal_Request['question_' + this._insurerQue[ind]['QuestionId'] + '_details'] === false) {
              count++;
              (<HTMLInputElement>document.getElementById('selectAll_' + this._insurerQue[ind]['QuestionId'])).checked = true;
              this.member_quearray[index_member_quearray]['question_' + this._insurerQue[ind]['QuestionId'] + '_details'] = false;
            } else if (this.Proposal_Request['question_' + this._insurerQue[ind]['QuestionId'] + '_details'] === "") {
              (<HTMLInputElement>document.getElementById('selectAll_' + this._insurerQue[ind]['QuestionId'])).checked = false;
              this.member_quearray[index_member_quearray]['question_' + this._insurerQue[ind]['QuestionId'] + '_details'] = false;
            } else {
              (<HTMLInputElement>document.getElementById('question_' + this._insurerQue[ind]['QuestionId'])).checked = true;
              this.member_quearray[index_member_quearray]['question_' + this._insurerQue[ind]['QuestionId'] + '_details'] = true;
            }
          }
        }
        if (this.Insurer_ID !== 1 && this.Insurer_ID !== 11) {
          if (count === this._insurerQue.length) {
            ((<HTMLInputElement>document.getElementById("noForAll"))).checked = true;
          }
          else {
            ((<HTMLInputElement>document.getElementById("noForAll"))).checked = false;
          }
        }
      }
    }


    if (this.Insurer_ID == 34 || this.Insurer_ID == 9 || this.Insurer_ID == 11 || this.Insurer_ID == 26) {
      this.member_1_ped = [];
      this.member_2_ped = [];
      this.member_3_ped = [];
      this.member_4_ped = [];
      this.member_5_ped = [];
      this.member_6_ped = [];
      var memb_1_val = $('#member_1_ped').val() == undefined ? '' : $('#member_1_ped').val();
      var memb_2_val = $('#member_2_ped').val() == undefined ? '' : $('#member_2_ped').val();
      var memb_3_val = $('#member_3_ped').val() == undefined ? '' : $('#member_3_ped').val();
      var memb_4_val = $('#member_4_ped').val() == undefined ? '' : $('#member_4_ped').val();
      var memb_5_val = $('#member_5_ped').val() == undefined ? '' : $('#member_5_ped').val();
      var memb_6_val = $('#member_6_ped').val() == undefined ? '' : $('#member_6_ped').val();
      for (let i = 0; i < this._existingDiseases.length; i++) {
        if (memb_1_val.includes(this._existingDiseases[i]['name'])) {
          var member_1_ped_disease_name = this._existingDiseases[i]['name'];
          var member_1_ped_disease_id = this._existingDiseases[i]['id'];
          var member_1_disease_array = { 'id': member_1_ped_disease_id, 'name': member_1_ped_disease_name }
          this.member_1_ped.push(member_1_disease_array)
        }
        if (memb_2_val.includes(this._existingDiseases[i]['name'])) {
          var member_2_ped_disease_name = this._existingDiseases[i]['name'];
          var member_2_ped_disease_id = this._existingDiseases[i]['id'];
          var member_2_disease_array = { 'id': member_2_ped_disease_id, 'name': member_2_ped_disease_name }
          this.member_2_ped.push(member_2_disease_array)
        }
        if (memb_3_val.includes(this._existingDiseases[i]['name'])) {
          var member_3_ped_disease_name = this._existingDiseases[i]['name'];
          var member_3_ped_disease_id = this._existingDiseases[i]['id'];
          var member_3_disease_array = { 'id': member_3_ped_disease_id, 'name': member_3_ped_disease_name }
          this.member_3_ped.push(member_3_disease_array)
        }
        if (memb_4_val.includes(this._existingDiseases[i]['name'])) {
          var member_4_ped_disease_name = this._existingDiseases[i]['name'];
          var member_4_ped_disease_id = this._existingDiseases[i]['id'];
          var member_4_disease_array = { 'id': member_4_ped_disease_id, 'name': member_4_ped_disease_name }
          this.member_4_ped.push(member_4_disease_array)
        }
        if (memb_5_val.includes(this._existingDiseases[i]['name'])) {
          var member_5_ped_disease_name = this._existingDiseases[i]['name'];
          var member_5_ped_disease_id = this._existingDiseases[i]['id'];
          var member_5_disease_array = { 'id': member_5_ped_disease_id, 'name': member_5_ped_disease_name }
          this.member_5_ped.push(member_5_disease_array)
        }
        if (memb_6_val.includes(this._existingDiseases[i]['name'])) {
          var member_6_ped_disease_name = this._existingDiseases[i]['name'];
          var member_6_ped_disease_id = this._existingDiseases[i]['id'];
          var member_6_disease_array = { 'id': member_6_ped_disease_id, 'name': member_6_ped_disease_name }
          this.member_6_ped.push(member_6_disease_array)
        }
      }
      if (this.member_1_ped.length == 0) {
        this.member_1_ped.toString()
      }
      if (this.member_2_ped.length == 0) {
        this.member_2_ped.toString()
      }
      if (this.member_3_ped.length == 0) {
        this.member_3_ped.toString()
      }
      if (this.member_4_ped.length == 0) {
        this.member_4_ped.toString()
      }
      if (this.member_5_ped.length == 0) {
        this.member_5_ped.toString()
      }
      if (this.member_6_ped.length == 0) {
        this.member_6_ped.toString()
      }
      this.proposalForm.controls["member_1_ped"].setValue(this.member_1_ped);
      this.proposalForm.controls["member_2_ped"].setValue(this.member_2_ped);
      this.proposalForm.controls["member_3_ped"].setValue(this.member_3_ped);
      this.proposalForm.controls["member_4_ped"].setValue(this.member_4_ped);
      this.proposalForm.controls["member_5_ped"].setValue(this.member_5_ped);
      this.proposalForm.controls["member_6_ped"].setValue(this.member_6_ped);

    }

    for (let i = 1; i <= adult_count; i++) {
      var MySal = "";
      MySal = (<HTMLInputElement>document.getElementById("member_" + i + "_salutation")).value;

      if (MySal == "" || MySal == "0") {
        $('#salutation_' + i).html('Please select salutation')
        document.getElementById("member_" + i + "_salutation1").classList.add("has-errors"); err++;
      } else {
        $('#salutation_' + i).html('')
        this.proposalForm.controls["member_" + i + "_salutation"].setValue(MySal);
        document.getElementById("member_" + i + "_salutation1").classList.remove("has-errors");
      }

      var FullName = "";
      FullName = ((<HTMLInputElement>document.getElementById("member_" + i + "_fullName")).value).trim();
      FullName = FullName.trim();

      if (FullName == "" || FullName.length < 3 || this.CheckPattern(FullName, 'Text') == false) {

        $('#fullname_' + i + '-err').html('Please enter the name');
        document.getElementById("member_" + i + "_fullName").classList.add("has-errors"); err++;
      } else {
        const MyName = FullName.split(" ");
        if (MyName.length < 2 || MyName[1] == "") {
          $('#fullname_' + i + '-err').html('Please enter the fullname');
          document.getElementById("member_" + i + "_fullName").classList.add("has-errors"); err++;
        } else {
          $('#fullname_' + i + '-err').html('')
          this.proposalForm.controls["member_" + i + "_fullName"].setValue(FullName);
          document.getElementById("member_" + i + "_fullName").classList.remove("has-errors");
        }
      }
      if (this.Insurer_ID == 11) {

        let nominee_name = $('#member_' + i + '_nominee_name').val();
        let nominee_relation = $('#member_' + i + '_nominee_relation').val();

        if (nominee_name == "" || nominee_name.length < 3 || this.CheckPattern(nominee_name, 'Text') == false) {
          $('#member_' + i + '_nominee_name_err').html('Please enter the name')
          document.getElementById("member_" + i + "_nominee_name").classList.add("has-errors"); err++;
        } else {
          const Myname = nominee_name.split(" ");
          if (Myname.length < 2 || Myname[1] == "") {
            $('#member_' + i + '_nominee_name_err').html('Please enter the full name');
            document.getElementById("member_" + i + "_nominee_name").classList.add("has-errors"); err++;
          } else {
            $('#member_' + i + '_nominee_name_err').html('');
            this.proposalForm.controls["member_" + i + "_nominee_name"].setValue(nominee_name);
            document.getElementById("member_" + i + "_nominee_name").classList.remove("has-errors");
          }
        }

        if (nominee_relation == "0" || nominee_relation == "" || nominee_relation == undefined) {
          $('#member_' + i + '_nominee_relation_err').html('Select Nominee Relation');
          document.getElementById('member_' + i + '_nominee_relation1').classList.add("has-errors");
          err++;
        } else {
          $('#member_' + i + '_nominee_relation_err').html('');
          document.getElementById('member_' + i + '_nominee_relation1').classList.remove("has-errors");
          this.proposalForm.controls['member_' + i + '_nominee_relation'].setValue(nominee_relation);
        }

      }
      var MyGender = "";
      MyGender = $('.member_' + i + '_gender:checked').val() == undefined ? "" : $('.member_' + i + '_gender:checked').val();

      if (MyGender == "") {
        $('.member_' + i + '_gender').addClass("has-errors");
        $('#gender_' + i).html('Please select gender')
        err++;
      } else {
        $('#gender_' + i).html('')
        this.proposalForm.controls["member_" + i + "_gender"].setValue(MyGender);
        $('.member_' + i + '_gender').removeClass("has-errors");
      }

      var salutationText = $("#member_" + i + "_salutation1").val().toLowerCase().trim();
      if ((salutationText == "mr" && MyGender == "F") || ((salutationText == "mrs" || salutationText == "miss") && MyGender == "M")) {
        err++;
        $('#_salutation_' + i).html('Please select correct salutation');
        document.getElementById("member_" + i + "_salutation1").classList.add("has-errors");
      } else {
        this.proposalForm.controls["member_" + i + "_salutation"].setValue(MySal);
        $('#_salutation_' + i).html('');
      }
      var today: any, age1: any, dob: any;
      var year1 = $('#member_' + i + '_year').val();
      var month1 = $('#member_' + i + '_month').val();
      var day1 = $('#member_' + i + '_day').val();
      dob = year1 + '-' + month1 + '-' + day1;
      var MyDOB = moment(dob, "YYYY-MM-DD").format("YYYY-MM-DD");

      if (year1 == '' || year1 == 'YYYY') {
        $('#dob_' + i + '_err').html(this.error_msg['DOBofOwner']); err++;
        $('#member_' + i + '_day').addClass('has-errors');
        $('#member_' + i + '_month').addClass('has-errors');
        $('#member_' + i + '_year').addClass('has-errors');
        err++;
      } else if (day1 == '' || day1 == 'DD') {
        $('#member_' + i + '_day').addClass('has-errors'); err++;
      } else if (month1 == '' || month1 == 'MM') {
        $('#member_' + i + '_month').addClass('has-errors'); err++;
      } else if (!moment(dob, 'YYYY-MM-DD', true).isValid()) {
        $('#member_' + i + '_day').addClass('has-errors');
        $('#member_' + i + '_month').addClass('has-errors');
        $('#member_' + i + '_year').addClass('has-errors');
        $('#dob_' + i + '_err').html('Please Select Valid DOB'); err++;
      } else if (moment().diff(moment(dob), 'years') < 18) {
        $('#member_' + i + '_day').addClass('has-errors');
        $('#member_' + i + '_month').addClass('has-errors');
        $('#member_' + i + '_year').addClass('has-errors');
        $('#dob_' + i + '_err').html('Adult member should be at least 18 years old'); err++;
      }
      else {
        $('#member_' + i + '_day').removeClass('has-errors');
        $('#member_' + i + '_month').removeClass('has-errors');
        $('#member_' + i + '_year').removeClass('has-errors');
        $('#dob_' + i + '_err').html("");
        this.proposalForm.controls['member_' + i + '_birth_date'].setValue(MyDOB);
      }

      var passportNo = "";
      var passportregex = new RegExp("[A-Z]{1}[0-9]{7}");
      passportNo = ((<HTMLInputElement>document.getElementById("member_" + i + "_passport")).value);
      if (passportNo == "" || passportNo == null) {
        $('#passportNo_' + i).html('Please enter passport no.');
        document.getElementById("member_" + i + "_passport").classList.add("has-errors"); err++;
      }
      else if (!passportregex.test(passportNo)) {
        $('#passportNo_' + i).html('Please enter vaild passport no.');
        document.getElementById("member_" + i + "_passport").classList.add("has-errors"); err++;
      } else {
        $('#passportNo_' + i).html('');
        this.proposalForm.controls["member_" + i + "_passport"].setValue(passportNo);
        document.getElementById("member_" + i + "_passport").classList.remove("has-errors");
        if (member_passport_number.length === 0) {
          member_passport_number.push(passportNo);
        } else if (member_passport_number.indexOf(passportNo) > -1) {
          $('#_passportNo_' + i).html('You have already written this passport no. for other member');
          document.getElementById("member_" + i + "_passport").classList.add("has-errors"); err++;
        } else {
          $('#_passportNo_' + i).html('');
          member_passport_number.push(passportNo);
        }
      }

      var passportexp = "";
      var day = $('#member_' + i + '_passport_expiry_day').val();
      var month = $('#member_' + i + '_passport_expiry_month').val();
      var year = $('#member_' + i + '_passport_expiry_year').val();
      var valid = false;

      passportexp = year + '-' + month + '-' + day;
      if (day == "" || day == undefined) {
        $('#member_' + i + '_passport_expiry_day').addClass("has-errors");
        err++;
      } else {
        $('#member_' + i + '_passport_expiry_day').removeClass("has-errors");
        valid = true;
      }
      if (month == "" || month == undefined) {
        $('#member_' + i + '_passport_expiry_month').addClass("has-errors");
        err++;
      } else {
        $('#member_' + i + '_passport_expiry_month').removeClass("has-errors");
        valid = true;
      }
      if (year == "" || year == undefined) {
        $('#member_' + i + '_passport_expiry_year').addClass("has-errors");
        err++;
      } else {
        $('#member_' + i + '_passport_expiry_year').removeClass("has-errors");
        valid = true;
      }
      if (passportexp == "--" || passportexp == null || valid == false) {
        $('#passportExp_' + i).html('Select passport expiry date');
        err++
      } else if (!this.PassportvalidateDateRange(passportexp) || !moment(passportexp, 'YYYY-MM-DD', true).isValid()) {
        $('#passportExp_' + i).html('Select valid passport expiry date');
        $('#member_' + i + '_passport_expiry_day').addClass("has-errors");
        $('#member_' + i + '_passport_expiry_month').addClass("has-errors");
        $('#member_' + i + '_passport_expiry_year').addClass("has-errors");
        err++
      }
      else {
        $('#passportExp_' + i).html('');
        this.proposalForm.controls["member_" + i + "_passport_expiry"].setValue(passportexp);
      }

      if (![1, 5, 44].includes(this.Insurer_ID)) {
        if (![6].includes(this.Insurer_ID)) {
          var insuredMedicalQues = $("#member_" + i + "_ped").val().split(',');
          // var filterdiseaseName = [];
          // if (insuredMedicalQues.length > 0) {
          //   for (var p in insuredMedicalQues) {
          //     filterdiseaseName.push(insuredMedicalQues[p].name);
          //   }
          // }
          if (insuredMedicalQues.includes("Any Other")) {
            var diseaseName = "";
            diseaseName = ((<HTMLInputElement>document.getElementById("member_" + i + "_other_diseases")).value);
            if (diseaseName == "") {
              $('#Mention_Disease_Name_' + i + '-err').html('Enter diseases name');
              document.getElementById("member_" + i + "_other_diseases").classList.add("has-errors");
              err++;
            } else {
              $('#Mention_Disease_Name_' + i + '-err').html('');
              this.proposalForm.controls["member_" + i + "_other_diseases"].setValue(diseaseName);
              document.getElementById("member_" + i + "_other_diseases").classList.remove("has-errors");
            }

            var takingMedicine = "";
            takingMedicine = $('.member_' + i + '_takes_meds:checked').val() == undefined ? "" : $('.member_' + i + '_takes_meds:checked').val();

            if (takingMedicine == "" || takingMedicine == "0") {
              $('#member_' + i + '_takes_meds-err').html('Please select yes or no');
              err++;
            } else {
              $('#member_' + i + '_takes_meds-err').html('');
              this.proposalForm.controls["member_" + i + "_takes_meds"].setValue(takingMedicine);
            }
            var sufferingflag = false;
            // var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            var sufferingSince = "";
            var suffering_month = $('#member_' + i + '_suffering_since_month').val() == undefined ? "" : $('#member_' + i + '_suffering_since_month').val();
            var suffering_year = $('#member_' + i + '_suffering_since_year').val() == undefined ? "" : $('#member_' + i + '_suffering_since_year').val();
            // suffering_month = suffering_month;
            suffering_month = moment(suffering_month, 'MM').format('MMMM');
            if (suffering_month == "" || suffering_month == 'Invalid date') {
              err++;
              var sufferingflag = false;
              document.getElementById("member_" + i + "_suffering_since_month").classList.add("has-errors");
            } else {
              var sufferingflag = true;
              document.getElementById("member_" + i + "_suffering_since_month").classList.remove("has-errors");
            }
            if (suffering_year == "") {
              var sufferingflag = false;
              err++;
              document.getElementById("member_" + i + "_suffering_since_year").classList.add("has-errors");
            } else {
              var sufferingflag = true;
              document.getElementById("member_" + i + "_suffering_since_year").classList.remove("has-errors");
            }
            sufferingSince = suffering_month + " " + suffering_year;
            if (sufferingflag == false || sufferingSince == undefined || sufferingSince == "") {
              $('#Suffering_Since_' + i).html('Select year & month');
              err++;
            } else {
              $('#Suffering_Since_' + i).html('');
              this.proposalForm.controls["member_" + i + "_suffering_since"].setValue(sufferingSince);
            }
          } else {
            ((<HTMLInputElement>document.getElementById('member_' + i + '_other_diseases')).value) = "";
            ((<HTMLInputElement>document.getElementById('member_' + i + '_suffering_since_month')).value) = "";
            ((<HTMLInputElement>document.getElementById('member_' + i + '_suffering_since_year')).value) = "";
            this.proposalForm.controls["member_" + i + "_other_diseases"].setValue("");
            $('.member_' + i + '_takes_meds').checked = false;
            this.proposalForm.controls["member_" + i + "_takes_meds"].setValue("");
            this.proposalForm.controls["member_" + i + "_suffering_since"].setValue("");
          }
        }

        var occupation = "";
        occupation = (<HTMLInputElement>document.getElementById("member_" + i + "_occupation")).value == undefined ? "" : (<HTMLInputElement>document.getElementById("member_" + i + "_occupation")).value;
        if (occupation == "" || occupation == "0") {
          $('#occupation_' + i).html('Select Occupation');
          document.getElementById("member_" + i + "_occupation1").classList.add("has-errors"); err++;
        } else {
          $('#occupation_' + i).html('');
          this.proposalForm.controls["member_" + i + "_occupation"].setValue(occupation);
          document.getElementById("member_" + i + "_occupation1").classList.remove("has-errors");
        }
      }
    }

    for (let i = 3; i <= child_count + 2; i++) {
      var MySal = "";
      MySal = (<HTMLInputElement>document.getElementById("member_" + i + "_salutation")).value;

      if (MySal == "" || MySal == "0") {
        $('#salutation_' + i).html('Please select salutation')
        document.getElementById("member_" + i + "_salutation1").classList.add("has-errors"); err++;
      } else {
        $('#salutation_' + i).html('')
        this.proposalForm.controls["member_" + i + "_salutation"].setValue(MySal);
        document.getElementById("member_" + i + "_salutation1").classList.remove("has-errors");
      }

      var FullName = "";
      FullName = ((<HTMLInputElement>document.getElementById("member_" + i + "_fullName")).value).trim();
      FullName = FullName.trim();

      if (FullName == "" || FullName.length < 3 || this.CheckPattern(FullName, 'Text') == false) {
        document.getElementById("member_" + i + "_fullName").classList.add("has-errors"); err++;
        $('#fullname_' + i + '-err').html('Please enter the name');
      } else {
        const MyName = FullName.split(" ");
        if (MyName.length < 2 || MyName[1] == "") {
          $('#fullname_' + i + '-err').html('Please enter the fullname');
          document.getElementById("member_" + i + "_fullName").classList.add("has-errors"); err++;
        } else {
          $('#fullname_' + i + '-err').html('');
          this.proposalForm.controls["member_" + i + "_fullName"].setValue(FullName);
          document.getElementById("member_" + i + "_fullName").classList.remove("has-errors");
        }
      }

      if (this.Insurer_ID == 11) {

        let nominee_name = $('#member_' + i + '_nominee_name').val();
        let nominee_relation = $('#member_' + i + '_nominee_relation').val();

        if (nominee_name == "" || nominee_name.length < 3 || this.CheckPattern(nominee_name, 'Text') == false) {
          $('#member_' + i + '_nominee_name_err').html('Please enter the name')
          document.getElementById("member_" + i + "_nominee_name").classList.add("has-errors"); err++;
        } else {
          const Myname = nominee_name.split(" ");
          if (Myname.length < 2 || Myname[1] == "") {
            $('#member_' + i + '_nominee_name_err').html('Please enter the full name');
            document.getElementById("member_" + i + "_nominee_name").classList.add("has-errors"); err++;
          } else {
            $('#member_' + i + '_nominee_name_err').html('');
            this.proposalForm.controls["member_" + i + "_nominee_name"].setValue(nominee_name);
            document.getElementById("member_" + i + "_nominee_name").classList.remove("has-errors");
          }
        }

        if (nominee_relation == "0" || nominee_relation == "" || nominee_relation == undefined) {
          $('#member_' + i + '_nominee_relation_err').html('Select Nominee Relation');
          document.getElementById('member_' + i + '_nominee_relation1').classList.add("has-errors");
          err++;
        } else {
          $('#member_' + i + '_nominee_relation_err').html('');
          document.getElementById('member_' + i + '_nominee_relation1').classList.remove("has-errors");
          this.proposalForm.controls['member_' + i + '_nominee_relation'].setValue(nominee_relation);
        }

      }

      var MyGender = "";
      MyGender = $('.member_' + i + '_gender:checked').val() == undefined ? "" : $('.member_' + i + '_gender:checked').val();

      if (MyGender == "") {
        $('#gender_' + i).html('Please select gender');
        $('.member_' + i + '_gender').addClass("has-errors");
        err++;
      } else {
        $('#gender_' + i).html('')
        this.proposalForm.controls["member_" + i + "_gender"].setValue(MyGender);
        $('.member_' + i + '_gender').removeClass("has-errors");
      }
      var salutationText = $("#member_" + i + "_salutation1").val().toLowerCase().trim();
      if ((salutationText == "mr" && MyGender == "F") || ((salutationText == "mrs" || salutationText == "miss") && MyGender == "M")) {
        err++;
        $('#_salutation_' + i).html('Please select correct salutation');
        document.getElementById("member_" + i + "_salutation1").classList.add("has-errors");
      } else {
        this.proposalForm.controls["member_" + i + "_salutation"].setValue(MySal);
        $('#_salutation_' + i).html('');
      }


      var today: any, age1: any, dob: any;
      var year1 = $('#member_' + i + '_year').val();
      var month1 = $('#member_' + i + '_month').val();
      var day1 = $('#member_' + i + '_day').val();
      dob = year1 + '-' + month1 + '-' + day1;
      var MyDOB = moment(dob, "YYYY-MM-DD").format("YYYY-MM-DD");

      if (year1 == '' || year1 == 'YYYY') {
        $('#dob_child_' + i + '_err').html(this.error_msg['DOBofOwner']); err++;
        $('#member_' + i + '_day').addClass('has-errors');
        $('#member_' + i + '_month').addClass('has-errors');
        $('#member_' + i + '_year').addClass('has-errors');
        err++;
      } else if (day1 == '' || day1 == 'DD') {
        $('#member_' + i + '_day').addClass('has-errors'); err++;
      } else if (month1 == '' || month1 == 'MM') {
        $('#member_' + i + '_month').addClass('has-errors'); err++;
      } else if (!moment(dob, 'YYYY-MM-DD', true).isValid() || moment(dob, 'YYYY-MM-DD').isAfter(moment().subtract(3, 'M').format('YYYY-MM-DD'))) {
        $('#member_' + i + '_day').addClass('has-errors');
        $('#member_' + i + '_month').addClass('has-errors');
        $('#member_' + i + '_year').addClass('has-errors');
        $('#dob_child_' + i + '_err').html('Please Select Valid DOB'); err++;
      } else if (moment().diff(moment(dob), 'years') >= 18) {
        $('#member_' + i + '_day').addClass('has-errors');
        $('#member_' + i + '_month').addClass('has-errors');
        $('#member_' + i + '_year').addClass('has-errors');
        $('#dob_child_' + i + '_err').html('Child member age should be less than 18'); err++;
      } else {
        $('#member_' + i + '_day').removeClass('has-errors');
        $('#member_' + i + '_month').removeClass('has-errors');
        $('#member_' + i + '_year').removeClass('has-errors');
        $('#dob_child_' + i + '_err').html("");
        this.proposalForm.controls['member_' + i + '_birth_date'].setValue(MyDOB);
      }

      var passportNo = "";
      var passportregex = new RegExp("[A-Z]{1}[0-9]{7}");
      passportNo = ((<HTMLInputElement>document.getElementById("member_" + i + "_passport")).value);

      if (passportNo == "" || passportNo == null) {
        $('#passportNo_' + i).html('Please enter passport no.');
        document.getElementById("member_" + i + "_passport").classList.add("has-errors"); err++;
      }
      else if (!passportregex.test(passportNo)) {
        $('#passportNo_' + i).html('Please enter vaild passport no.');
        document.getElementById("member_" + i + "_passport").classList.add("has-errors"); err++;
      } else {
        $('#passportNo_' + i).html('')
        this.proposalForm.controls["member_" + i + "_passport"].setValue(passportNo);
        document.getElementById("member_" + i + "_passport").classList.remove("has-errors");

        if (member_passport_number.indexOf(passportNo) > -1) {
          document.getElementById("member_" + i + "_passport").classList.add("has-errors");
          err++;
          $('#_passportNo_' + i).html('You have already written this passport no. for other member');
        } else {
          member_passport_number.push(passportNo);
          $('#_passportNo_' + i).html('');
        }
      }

      var passportexp = "";
      var day = $('#member_' + i + '_passport_expiry_day').val();
      var month = $('#member_' + i + '_passport_expiry_month').val();
      var year = $('#member_' + i + '_passport_expiry_year').val();
      var valid = false;

      passportexp = year + '-' + month + '-' + day;
      if (day == "" || day == undefined) {
        $('#member_' + i + '_passport_expiry_day').addClass("has-errors");
        err++;
      } else {
        $('#member_' + i + '_passport_expiry_day').removeClass("has-errors");
        valid = true;
      }
      if (month == "" || month == undefined) {
        $('#member_' + i + '_passport_expiry_month').addClass("has-errors");
        err++;
      } else {
        $('#member_' + i + '_passport_expiry_month').removeClass("has-errors");
        valid = true;
      }
      if (year == "" || year == undefined) {
        $('#member_' + i + '_passport_expiry_year').addClass("has-errors");
        err++;
      } else {
        $('#member_' + i + '_passport_expiry_year').removeClass("has-errors");
        valid = true;
      }

      if (passportexp == "--" || passportexp == null || valid == false) {
        $('#passportExp_' + i).html('Select passport expiry date');
        err++
      } else if (!this.PassportvalidateDateRange(passportexp) || !moment(passportexp, 'YYYY-MM-DD', true).isValid()) {
        $('#passportExp_' + i).html('Select valid passport expiry date');
        $('#member_' + i + '_passport_expiry_day').addClass("has-errors");
        $('#member_' + i + '_passport_expiry_month').addClass("has-errors");
        $('#member_' + i + '_passport_expiry_year').addClass("has-errors");
        err++
      }
      else {
        $('#passportExp_' + i).html('');
        this.proposalForm.controls["member_" + i + "_passport_expiry"].setValue(passportexp);
      }
      if (![1, 5, 44].includes(this.Insurer_ID)) {
        if (![6].includes(this.Insurer_ID)) {
          var insuredMedicalQues = $("#member_" + i + "_ped").val().split(',');

          if (insuredMedicalQues.includes("Any Other")) {
            var diseaseName = "";
            diseaseName = ((<HTMLInputElement>document.getElementById("member_" + i + "_other_diseases")).value);
            if (diseaseName == "") {
              $('#Mention_Disease_Name_' + i + '-err').html('Enter diseases name');
              document.getElementById("member_" + i + "_other_diseases").classList.add("has-errors");
              err++;
            } else {
              $('#Mention_Disease_Name_' + i + '-err').html('');
              this.proposalForm.controls["member_" + i + "_other_diseases"].setValue(diseaseName);
              document.getElementById("member_" + i + "_other_diseases").classList.remove("has-errors");
            }

            var takingMedicine = "";
            takingMedicine = $('.member_' + i + '_takes_meds:checked').val() == undefined ? "" : $('.member_' + i + '_takes_meds:checked').val();

            if (takingMedicine == "" || takingMedicine == "0") {
              $('#member_' + i + '_takes_meds-err').html('Please select yes or no');
              err++;
            } else {
              $('#member_' + i + '_takes_meds-err').html('');
              this.proposalForm.controls["member_" + i + "_takes_meds"].setValue(takingMedicine);
            }
            var sufferingflag = false;
            var sufferingSince = "";
            var suffering_month = $('#member_' + i + '_suffering_since_month').val() == undefined ? "" : $('#member_' + i + '_suffering_since_month').val();
            var suffering_year = $('#member_' + i + '_suffering_since_year').val() == undefined ? "" : $('#member_' + i + '_suffering_since_year').val();
            suffering_month = moment(suffering_month, 'MM').format('MMMM');
            if (suffering_month == "" || suffering_month == 'Invalid date') {
              err++;
              var sufferingflag = false;
              document.getElementById("member_" + i + "_suffering_since_month").classList.add("has-errors");
            } else {
              var sufferingflag = true;
              document.getElementById("member_" + i + "_suffering_since_month").classList.remove("has-errors");
            }
            if (suffering_year == "") {
              var sufferingflag = false;
              err++;
              document.getElementById("member_" + i + "_suffering_since_year").classList.add("has-errors");
            } else {
              var sufferingflag = true;
              document.getElementById("member_" + i + "_suffering_since_year").classList.remove("has-errors");
            }
            sufferingSince = suffering_month + " " + suffering_year;
            if (sufferingflag == false || sufferingSince == undefined || sufferingSince == "") {
              $('#Suffering_Since_' + i).html('Select year & month');
              err++;
            } else {
              $('#Suffering_Since_' + i).html('');
              this.proposalForm.controls["member_" + i + "_suffering_since"].setValue(sufferingSince);
            }
          } else {
            ((<HTMLInputElement>document.getElementById('member_' + i + '_other_diseases')).value) = "";
            this.proposalForm.controls["member_" + i + "_other_diseases"].setValue("");
            $('.member_' + i + '_takes_meds').checked = false;
            this.proposalForm.controls["member_" + i + "_takes_meds"].setValue("");
            this.proposalForm.controls["member_" + i + "_suffering_since"].setValue("");

          }
        }
        var occupation = "";
        occupation = (<HTMLInputElement>document.getElementById("member_" + i + "_occupation")).value;
        if (occupation == "" || occupation == "0") {
          $('#occupation_' + i).html('Select Occupation');
          document.getElementById("member_" + i + "_occupation1").classList.add("has-errors"); err++;
        } else {
          $('#occupation_' + i).html('');
          this.proposalForm.controls["member_" + i + "_occupation"].setValue(occupation);
          document.getElementById("member_" + i + "_occupation1").classList.remove("has-errors");
        }
      }
    }
    if (err == 0) {
      $('.loading').show();

      var next_tab = this.mobile_view ? $('.tab-change-wrap > .active').next('.tab-change-btn') : $('.tab-change-wrap > .active').next('.tab-change-btn')[0]['id'];


      this.update_user_data(this.proposalForm.value);
      if (next_tab.length > 0) {
        if (!this.mobile_view) {
          $('#' + next_tab).attr('data-bs-toggle', 'tab');
          $('#' + next_tab).trigger('click');
        }
        else {
          next_tab.attr('data-bs-toggle', 'tab');
          next_tab.trigger('click');
        }
        $('.tab-change-wrap > .active').prev('.tab-change-btn').addClass('finished');
      } else {
        $('.nav-tabs li:eq(0) a').trigger('click');
      }
    } else {
      e.preventDefault();
      e.stopPropagation();
    }
  };
  next4(e, data_valid) {
    e.preventDefault();
    e.stopPropagation();
    if (![103, 109, 112, 115, 126, 128].includes(this.ProductPlan_Id)) {
      this.show_and = true;
    }
    if (this.proposal_data && this.otherDetailsData != undefined && this.otherDetailsData.length > 0) {
      this.otherDetailsData.forEach((details, i) => {
        $('#other_detail_' + details.id).val(details.value);
        if (this.otherDetails[i].type == 'select') {
          var index = (this.otherDetails[i].selectOptions).findIndex(x => x.id == details.value);
          $('#other_detail_' + details.id + '_1').val(this.otherDetails[i].selectOptions[index].optionText);
        }
      });
    }
    if (![34, 5, 6].includes(this.Insurer_ID)) {
      if (((this.otherDetailsData != "" && this.otherDetailsData != undefined)) && this._travelPurpose != undefined) {
        this._travelPurpose.forEach(detail => {
          if (detail.id == this.otherDetailsData[0].value)

            $('#other_detail_' + this.otherDetailsData[0].id + '_1').val(detail.name);
        });
      }
    }
    var err = 0;
    var nominee_name = ((<HTMLInputElement>document.getElementById("nominee_name")).value).trim();
    // var nominee_last_name = ((<HTMLInputElement>document.getElementById("nominee_last_name")).value).trim();
    var FirstName = "";
    var LastName = "";
    // FirstName = (<HTMLInputElement>document.getElementById("nominee_name")).value;
    // FirstName = FirstName.trim();
    // if (nominee_name == "" || nominee_name.length < 3) {
    //   $('#nominee_first_name_err').html('Please enter nominee First Name');
    //   document.getElementById("nominee_name").classList.add("has-errors");
    //   err++;
    // } else {
    //   var NomineeFirstName = nominee_name.split(" ");
    //   if (NomineeFirstName.length >= 2) {
    //     $('#nominee_first_name_err').html('Please enter nominee first name only');
    //     document.getElementById("nominee_name").classList.add("has-errors");
    //     err++;
    //   } else {
    //     $('#nominee_first_name_err').html('');
    //     document.getElementById("nominee_name").classList.remove("has-errors");
    //     // this.proposalForm.controls["nominee_name"].setValue(FullName);
    //   }
    // }

    // if (nominee_last_name == "" || nominee_last_name.length < 3) {
    //   $('#nominee_last_name_err').html('Please enter nominee Last Name');
    //   document.getElementById("nominee_last_name").classList.add("has-errors");
    //   err++;
    // } else {
    //   var NomineeLastName = nominee_last_name.split(" ");
    //   if (NomineeLastName.length >= 2) {
    //     $('#nominee_last_name_err').html('Please enter nominee first name only');
    //     document.getElementById("nominee_last_name").classList.add("has-errors");
    //     err++;
    //   } else {
    //     $('#nominee_last_name_err').html('');
    //     document.getElementById("nominee_last_name").classList.remove("has-errors");
    //     this.proposalForm.controls["nominee_name"].setValue(nominee_name + " " + nominee_last_name);
    //   }
    // }

    if (nominee_name == "" || nominee_name.length < 3 || this.CheckPattern(nominee_name, 'Text') == false) {
      $('#nominee_name_err').html('Please enter the name')
      document.getElementById("nominee_name").classList.add("has-errors"); err++;
    } else {
      const Myname = nominee_name.split(" ");
      if (Myname.length < 2 || Myname[1] == "") {
        $('#nominee_name_err').html('Please enter the full name');
        document.getElementById("nominee_name").classList.add("has-errors"); err++;
      } else {
        $('#nominee_name_err').html('');
        this.proposalForm.controls["nominee_name"].setValue(nominee_name);
        document.getElementById("nominee_name").classList.remove("has-errors");
      }
    }
    // if (this.liveOnly) {
    var nominee_birth_date = "";
    var day = $('#nominee_dob_day').val();
    var month = $('#nominee_dob_month').val();
    var year = $('#nominee_dob_year').val();
    var valid = false;
    nominee_birth_date = year + '-' + month + '-' + day;
    if (day == "" || day == undefined) {
      $('#nominee_dob_day').addClass("has-errors");
      err++;
    } else {
      $('#nominee_dob_day').removeClass("has-errors");
      valid = true;
    }
    if (month == "" || month == undefined) {
      $('#nominee_dob_month').addClass("has-errors");
      err++;
    } else {
      $('#nominee_dob_month').removeClass("has-errors");
      valid = true;
    }
    if (year == "" || year == undefined) {
      $('#nominee_dob_year').addClass("has-errors");
      err++;
    } else {
      $('#nominee_dob_year').removeClass("has-errors");
      valid = true;
    }
    if (nominee_birth_date == "--" || nominee_birth_date == null || valid == false) {
      $('#nominee_birthdate_err').html('Select Nominee Birthdate');
    } else if (!moment(nominee_birth_date, 'YYYY-MM-DD', true).isValid()) {
      $('#nominee_birthdate_err').html('Select Valid Nominee Birthdate');
      $('#nominee_dob_day,#nominee_dob_month,#nominee_dob_year').addClass("has-errors");
      err++;
    } else if (moment().diff(moment(nominee_birth_date), 'years') < 18) {
      $('#nominee_dob_day,#nominee_dob_month,#nominee_dob_year').addClass("has-errors");
      $('#nominee_birthdate_err').html('Age should be at least 18 years old'); err++;
      err++;
    } else {
      this.proposalForm.controls["nominee_birth_date"].setValue(nominee_birth_date);
      $('#nominee_birthdate_err').html('');
    }
    // }
    if (![1, 6, 44].includes(this.Insurer_ID)) {
      var nominee_relation = ((<HTMLInputElement>document.getElementById("nominee_relation")).value);
      if (nominee_relation == "0" || nominee_relation == "") {
        $('#nominee-relation-err').html('Select Nominee Relation');
        document.getElementById("nominee_relation1").classList.add("has-errors");
        err++;
      } else {
        $('#nominee-relation-err').html('');
        document.getElementById("nominee_relation1").classList.remove("has-errors");
        this.proposalForm.controls['nominee_relation'].setValue(nominee_relation);
      }
      if (![5].includes(this.Insurer_ID)) {
        var nominee_address = ((<HTMLInputElement>document.getElementById("nominee_address")).value).trim();
        if (nominee_address == "") {
          $('#nominee-address-err').html('Please Nominee Address');
          document.getElementById("nominee_address").classList.add("has-errors"); err++;
        } else {
          $('#nominee-address-err').html('');
          document.getElementById("nominee_address").classList.remove("has-errors");
          this.proposalForm.controls["nominee_address"].setValue(nominee_address);
        }
        var nominee_pincode = $('.nominee_pincode').val().trim();
        if (nominee_pincode == "" || nominee_pincode.length != 6) {
          $('.nominee_pincode').addClass('has-errors');
          $('#nominee-pincode-err').html('Please Nominee Pincode');
          err++;
        } else {
          $('#nominee-pincode-err').html('');
          $('.nominee_pincode').removeClass('has-errors');
          this.proposalForm.controls["nominee_pincode"].setValue(nominee_pincode);
        }
        var nominee_city_name = ((<HTMLInputElement>document.getElementById("nominee_city_name")).value).trim();
        if (nominee_city_name == "") {
          $('#nominee-city-err').html('Please Nominee City');
          document.getElementById("nominee_city_name").classList.add("has-errors"); err++;
        } else {
          $('#nominee-city-err').html('');
          document.getElementById("nominee_city_name").classList.remove("has-errors");
          this.proposalForm.controls['nominee_city_name'].setValue(nominee_city_name);
        }
      }
    }
    if (err == 0) {

      $('.loading').show();
      var next_tab = this.mobile_view ? $('.tab-change-wrap > .active').next('.tab-change-btn') : $('.tab-change-wrap > .active').next('.tab-change-btn')[0]['id'];

      this.update_user_data(this.proposalForm.value);
      if (next_tab.length > 0) {
        if (!this.mobile_view) {
          $('#' + next_tab).attr('data-bs-toggle', 'tab');
          $('#' + next_tab).trigger('click');
        }
        else {
          next_tab.attr('data-bs-toggle', 'tab');
          next_tab.trigger('click');
        }
        $('.tab-change-wrap > .active').prev('.tab-change-btn').addClass('finished');
      } else {
        $('.nav-tabs li:eq(0) a').trigger('click');
      }
    } else {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  GotoSummary(e, data_valid) {
    e.preventDefault();
    e.stopPropagation();
    var medicalErr = 0;
    var medicalErrTemp = 0;
    if (this.Insurer_ID !== 11 && this.Insurer_ID !== 1) {
      if (((<HTMLInputElement>document.getElementById("noForAll"))).checked == false) {
        for (var queTemp in this._insurerQue) {
          if (((<HTMLInputElement>document.getElementById("selectAll_" + this._insurerQue[queTemp].QuestionId))).checked == true) {
            medicalErrTemp = 0;
          }
          else if (((<HTMLInputElement>document.getElementById("selectAll_" + this._insurerQue[queTemp].QuestionId))).checked == false) {
            var count = 0;
            if (((<HTMLInputElement>document.getElementById("question_" + this._insurerQue[queTemp].QuestionId))).checked == true) {
              count++;
            }
            else if (((<HTMLInputElement>document.getElementById("question_" + this._insurerQue[queTemp].QuestionId))).checked == false) { medicalErrTemp = 1; }
            if (count > 0) { medicalErrTemp = 0; }
            else { medicalErrTemp = 1; }
            if (medicalErrTemp == 1) { medicalErr++; }
          }
        }
      }
    } else if (this.Insurer_ID === 1 || (this.Insurer_ID === 11)) {
      for (var queTemp in this._insurerQue) {
        if (((<HTMLInputElement>document.getElementById("selectAll_" + this._insurerQue[queTemp].QuestionId))).checked == true) {
          medicalErrTemp = 0;
        }
        else if (((<HTMLInputElement>document.getElementById("selectAll_" + this._insurerQue[queTemp].QuestionId))).checked == false) {
          var count = 0;
          if (((<HTMLInputElement>document.getElementById("question_" + this._insurerQue[queTemp].QuestionId))).checked == true) {
            count++;
          }
          else if (((<HTMLInputElement>document.getElementById("question_" + this._insurerQue[queTemp].QuestionId))).checked == false) { medicalErrTemp = 1; }
          if (count > 0) { medicalErrTemp = 0; }
          else { medicalErrTemp = 1; }
          if (medicalErrTemp == 1) { medicalErr++; }
        }
      }
    }
    if (this.otherDetails != undefined && this.otherDetails.length > 0) {
      this.validateOtherDetails();
      if (this.errOnOtherDetail === false) {
        data_valid['otherDetailsData'] = this.otherDetailsData;
      }
    }
    if (medicalErr > 0 || this.errOnOtherDetail === true) {
      this.MedicalQsError = true;
      this.error_count = 1;
      if (this.errOnOtherDetail === true && medicalErr == 0) {
        this.MedicalQsError = false;
      }
    }
    else {
      this.MedicalQsError = false;
      if (!this.CheckAllValidations) {
        $('.loading').show();
        // var next_tab = $('.tab-change-wrap > .active').next('.tab-change-btn');
        this.update_user_data(this.proposalForm.value, "gotosummary");
        // if (next_tab.length > 0) {
        //   next_tab.attr('data-bs-toggle', 'tab');
        //   next_tab.trigger('click');
        //   $('.tab-change-wrap > .active').prev('.tab-change-btn').addClass('finished');
        // } else {
        //   $('.nav-tabs li:eq(0) a').trigger('click');
        // }
      }
      e.preventDefault();
      e.stopPropagation();
      this.error_count = 0;
    }
  };

  validateOtherDetails() {
    var err = 0;
    var input_val = '';
    var pattern;
    var detailData = [];
    this.otherDetails.forEach((questn) => {
      input_val = $("#other_detail_" + questn.QuestionId).val();
      if (questn.type === 'text' || questn.type === 'numeric') {
        pattern = new RegExp(questn.regex);
        if (input_val === '' || !pattern.test(input_val) || input_val === null) {
          $("#other_detail_" + questn.QuestionId + '1').addClass("has-errors"); err++;
        }
      } else if (questn.type === 'select') {
        if (input_val === '' || input_val === 'Select' || input_val === null) {
          $("#other_detail_" + questn.QuestionId + "1").addClass("has-errors"); err++;
          $("#other_detail_" + questn.QuestionId + "_err").html('Select the option');
        } else {
          $("#other_detail_" + questn.QuestionId + "1").removeClass("has-errors");
          $("#other_detail_" + questn.QuestionId).html('');
        }
      }
      var detailsObj = { 'id': questn.QuestionId, 'ins_questnId': questn.Ins_QuestnId, 'Ins_field': questn.Ins_fieldName, 'value': input_val };
      detailData.push(detailsObj);
      this.otherDetailsData = detailData;
      if (err > 0) {
        this.errOnOtherDetail = true;
      } else {
        this.errOnOtherDetail = false;
        this.otherDetailsData = detailData;
        // this.proposalForm.controls['otherDetailsData'].setValue(detailData);
        // console.log(detailData);
      }
    });

  }

  update_user_data(obj, value = "") {
    // if (!this.Proposal_Request) {
    //   // this.throughtPR = false;
    //   for (var key in this.Proposal_Request['Quote_Request']) {
    //     if (!obj.hasOwnProperty(key) || (obj.hasOwnProperty(key) && (obj[key] == '' || obj[key] == 0))) {
    //       // do something
    //       obj[key] = this.Proposal_Request['Quote_Request'][key.trim()];
    //     }
    //   }
    // } else {
    //   // this.throughtPR = true
    //   for (var key in this.Proposal_Request['Proposal_Request']) {
    //     if (!obj.hasOwnProperty(key) || (obj.hasOwnProperty(key) && (obj[key] == '' || obj[key] == 0))) {
    //       // do something
    //       obj[key] = this.Proposal_Request['Proposal_Request'][key.trim()];
    //     }
    //   }
    // }

    for (var key in this.ReqObj.Quote_Request) {
      if (!obj.hasOwnProperty(key) || (obj.hasOwnProperty(key) && (obj[key] == '' || obj[key] == 0))) {
        // do something
        obj[key] = this.ReqObj.Quote_Request[key.trim()];
      }
    }
    this.Proposal_Request = obj;
    for (var x in this.member_quearray) {
      for (var key in this.member_quearray[x]) {
        obj[key] = this.member_quearray[x][key.trim()];
      }
    }
    obj["ss_id"] = this.proposal_req_ssid;
    obj["insurer_id"] = this.Insurer_ID;
    obj["data_type"] = "proposal";
    obj["search_reference_number"] = this.srn;
    obj["api_reference_number"] = this.arn;
    obj["online_agreement"] = this.online_agreement;
    if (this.opted_whatsapp == true) {
      obj.whatsapp_mobile = this.whatsapp_mobile;
      obj.is_whatsapp_allow = 1;
    } else {
      obj.whatsapp_mobile = "";
      obj.is_whatsapp_allow = 0;
    }
    obj.eia_number = this.eia_number;
    obj.insurance_repo_name = this.insurance_repo_name;

    var method_name = '/quote/save_user_data';
    this._horizon.callAPIPost(obj, method_name, this.client_id).subscribe(
      data => {
        if (data.hasOwnProperty("Msg") && data["Msg"]) {
          if (data["Msg"] == "Data saved") {
            // this.Proposal_Request = obj;
            if (value === "gotosummary") {
              this.redirectToSummary();
            }
            $('.loading').hide();
          }
        }

      },
      error => {
        console.log(error);
      }
    );
  }

  showPaymentLinkPopup() {
    this.Proposal_Request = this.Proposal_Request || {};
    let err = 0;
    var salutationText = $("#salutation1").val().toLowerCase();
    if (salutationText == '' || salutationText == null || salutationText == undefined || salutationText.toLowerCase() == 'title' || salutationText == "0") {
      $("#salutation1").addClass("has-errors");
      err++;
      $('#sal-err').html(this.error_msg['Salutation']);
    } else {
      $('#salutation1').removeClass('has-errors');
      $('#sal-err').html('');
      this.Proposal_Request['salutation_text'] = salutationText;
      this.Proposal_Request['salutation'] = $('#salutation').val();
    }
    var FullName = $('#contact_name').val();
    FullName = FullName.trim();

    if (FullName == "" || FullName == "NO NAME" || FullName == "NO" || FullName == "NAME" || FullName.length < 3 || this.CheckPattern(FullName, 'Text') == false) {
      $('#contact_name').addClass('has-errors'); err++;
      $('#contact_name-err').html(this.error_msg['ContactName']);
    } else {
      const MyName = FullName.split(" ");
      if (MyName.length < 2 || MyName[1] == "") {
        $('#contact_name').addClass('has-errors'); err++;
      } else {
        $('#contact_name').removeClass("has-errors");
        $('#contact_name-err').html('');
        this.Proposal_Request['contact_name'] = FullName;
      }
    }

    var gender = $("input[type='radio'][name='gender']:checked").val()
    if (gender == '' || gender == "0" || gender == undefined) {
      err++;
      $('#gender-err').html('Gender is required');
      $('.gender').addClass('has-errors');
    } else {
      $('#gender-err').html('');
      $('.gender').removeClass('has-errors');
      if ((salutationText == "mr" && gender == "F") || ((salutationText == "mrs" || salutationText == "miss") && gender == "M")) {
        err++;
        $('#sal-err').html('Select correct salution according to gender');
        document.getElementById('salutation1').classList.add('has-errors');
        $('.gender').addClass('has-errors');
      }
      else {
        $('#sal-err').html('');
        this.Proposal_Request['gender'] = gender;
        $('.gender').removeClass('has-errors');
      }
    }
    let email_id = $('#email').val();
    if (email_id === '') {
      err++;
      $('#email').addClass('has-errors');
      $('#email-err').html(this.error_msg['ContactEmail']);
    } else {
      var re = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      if (!re.test(email_id)) {
        err++;
        $('#email').addClass('has-errors');
        $('#email-err').html(this.error_msg['ContactEmail']);
      } else {
        $('#email').removeClass('has-errors');
        $('#email-err').html('');
        this.proposalForm.controls['email'].setValue(email_id);
        this.Proposal_Request['email'] = email_id;
        $('#paymentLinkPopEmail').val(email_id);
      }
    }
    var pan = $('#pan').val() == undefined ? "" : $('#pan').val();
    if (pan.length > 0) {
      var pan = $('#pan').val().trim().toUpperCase();
      if (this.CheckPattern(pan, 'Pan') == false) {
        $('#pan').addClass('has-errors');
        err++;
        $('#pan-err').html(this.error_msg['PANNo']);
      } else {
        $('#pan').removeClass('has-errors');
        $('#pan-err').html('');
        this.proposalForm.controls['pan'].setValue(pan);
        this.Proposal_Request['pan'] = pan;
      }
    }
    var mobile = $("#mobile").val() == undefined ? "" : $("#mobile").val();
    if (mobile !== '') {
      var mobilepattern = new RegExp('^[6-9]{1}[0-9]{9}$');
      if (mobilepattern.test(mobile) == false) {
        $('#mobile').addClass('has-errors'); err++;
        $('#mobile-err').html(this.error_msg['ContactMobile']);
      } else {
        $('#mobile').removeClass('has-errors');
        $('#mobile-err').html('');
        this.proposalForm.controls['mobile'].setValue(mobile);
        this.Proposal_Request['mobile'] = mobile;
      }
    }
    if (err === 0) {
      this.update_user_data(this.Proposal_Request);
      $('#saveProposalModal').modal('show');
    }
  }
  send_payment_link(data_valid) {
    $('.loading').show();
    $('#saveProposalModal').modal('hide');

    data_valid.fba_id = this.fba_id;
    data_valid.agent_ip_address = this.ip_address;
    data_valid.agent_geo_lat = this.geo_lat;
    data_valid.agent_geo_long = this.geo_long;
    data_valid.app_version = this.app_version;
    this.send_link = true;
    this.msg = "Please Wait..!";
    var obj = {
      contact_name: $('#contact_name').val(),
      crn: this.crn,
      product_name: "Travel",
      insurer_id: this.Insurer_ID,
      insurer_name: this.Insurer_Name,
      final_premium: this.Final_Premium,
      payment_link: `${window.location.pathname}?client_id=2&arn=${this.arn}&is_posp=NonPOSP&ss_id=0`,
      registration_no: "",
      plan_name: this.Plan_Name,
      phone_no: $('#mobile').val(),
      customer_email: $('#paymentLinkPopEmail').val(),
      search_reference_number: this.srn,
      agent_email: this.Quote_Request["posp_email_id"],
      salutation_text: data_valid.salutation_text === undefined ? $("#salutation1").val().toLowerCase() : data_valid.salutation_text
    }
    this.msg = "Sending mail to Customer ...";
    var method_name = '/quote/send_payment_link';
    this._horizon.callAPIPost(obj, method_name, this.client_id).subscribe(
      data => {
        var send_payment_success_id = data['Id'];
        if (data.hasOwnProperty('Status')) {
          if (data['Status'] == "Success" || data['Status'] == "SUCCESS") {
            $('.loading').hide()
            this.dataStatusSuccess = true;
            this.PaymentLinkSend = true;
            $('.payBtn').addClass('disabled-tag').text('. . .');
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
            $('.payBtn').addClass('disabled-tag').text('. . .');
            this.msg = "Mail Sent Successfully";
            this.short_url = data['Payment_Link'];
          }
          else {
            this.dataStatusSuccess = false;
            this.msg = "Error to sent mail Successfully";
          }
        }
      }
    );
  }
  SameAsPermanentAdd(event) {
    if (event.target.value == 'yes') {
      let nominee_address = $("#completeAddress").val();
      //  let nominee_check = nominee_address.slice(-1);
      //  if(nominee_check==","){
      //   nominee_address = nominee_address.slice(0, -1);
      //  }
      ((<HTMLInputElement>document.getElementById("nominee_address")).value) = nominee_address;
      $('.nominee_pincode').val($('.permanent_pincode').val());
      ((<HTMLInputElement>document.getElementById("nominee_city_name")).value) = ((<HTMLInputElement>document.getElementById("city")).value);
      this.SameAsNomineeAddress = true;
      this.nominee_address = ((<HTMLInputElement>document.getElementById("nominee_address")).value);
      this.nominee_pincode = $('.nominee_pincode').val();
      this.nominee_city_name = ((<HTMLInputElement>document.getElementById("nominee_city_name")).value);
    } else {
      this.SameAsNomineeAddress = false;
      ((<HTMLInputElement>document.getElementById("nominee_address")).value) = "";
      $('.nominee_pincode').val('');
      ((<HTMLInputElement>document.getElementById("nominee_city_name")).value) = "";
    }
  }
  setNomineeInfo(nom_addr: string, nom_pincode: string, nom_city: string) {
    ((<HTMLInputElement>document.getElementById("nominee_address")).value) = nom_addr;
    $('.nominee_pincode').val(nom_pincode);
    ((<HTMLInputElement>document.getElementById("nominee_city_name")).value) = nom_city;
    this.proposalForm.controls['nominee_address'].setValue(nom_addr);
    this.proposalForm.controls['nominee_pincode'].setValue(nom_pincode);
    this.proposalForm.controls['nominee_city_name'].setValue(nom_city);
  }

  UncheckAll(event) {
    if (event === true) {
      this.NOForAll = 'yes';
      this.ismedquestnschecked = 'yes';
      this.proposalForm.controls['no_for_all'].setValue(this.NOForAll);
      this.proposalForm.controls['is_medquestns_checked'].setValue(this.ismedquestnschecked);
      for (var que in this._insurerQue) {
        ((<HTMLInputElement>document.getElementById("question_" + this._insurerQue[que].QuestionId))).checked = false;
        ((<HTMLInputElement>document.getElementById("selectAll_" + this._insurerQue[que].QuestionId))).checked = true;
        var index_member_quearray = this.member_quearray.findIndex(x => x.name == 'question_' + this._insurerQue[que].QuestionId);
        this.member_quearray[index_member_quearray]['question_' + this._insurerQue[que].QuestionId + '_type'] = 'flag';
        this.member_quearray[index_member_quearray]['question_' + this._insurerQue[que].QuestionId + '_details'] = false;
        this.member_quearray[index_member_quearray]['question_' + this._insurerQue[que].QuestionId + '_code'] = this._insurerQue[que].QuestionId;
      }
      this.MedicalQsError = false;
    } else {
      this.NOForAll = 'no';
      this.proposalForm.controls['no_for_all'].setValue(this.NOForAll);
      for (var que in this._insurerQue) {
        ((<HTMLInputElement>document.getElementById("question_" + this._insurerQue[que].QuestionId))).checked = false;
        ((<HTMLInputElement>document.getElementById("selectAll_" + this._insurerQue[que].QuestionId))).checked = false;
        var index_member_quearray = this.member_quearray.findIndex(x => x.name == 'question_' + this._insurerQue[que].QuestionId);
        this.member_quearray[index_member_quearray]['question_' + this._insurerQue[que].QuestionId + '_type'] = 'flag';
        this.member_quearray[index_member_quearray]['question_' + this._insurerQue[que].QuestionId + '_details'] = "";
        this.member_quearray[index_member_quearray]['question_' + this._insurerQue[que].QuestionId + '_code'] = this._insurerQue[que].QuestionId;
      }
      this.MedicalQsError = true;
    }
  }
  checkIfSelected(QuestList_Member) {
    var QuestId = QuestList_Member;
    var SubQueelement = ((<HTMLInputElement>document.getElementById("question_" + QuestId)));
    if (SubQueelement.checked === true) {
      this.NOForAll = 'no';
      this.ismedquestnschecked = 'yes';
      this.proposalForm.controls['no_for_all'].setValue(this.NOForAll);
      this.proposalForm.controls['is_medquestns_checked'].setValue(this.ismedquestnschecked);
      ((<HTMLInputElement>document.getElementById("selectAll_" + QuestId))).checked = false;
      if (this.Insurer_ID !== 1 && this.Insurer_ID !== 11) {
        ((<HTMLInputElement>document.getElementById("noForAll"))).checked = false;
      }
      var index = this._insurerQue.findIndex(x => x.QuestionId === QuestId);
    }
    if (((<HTMLInputElement>document.getElementById("question_" + QuestId))).checked == true) {
      var index = this._insurerQue.findIndex(x => x.QuestionId == QuestId);
      var index_member_quearray = this.member_quearray.findIndex(x => x.name == 'question_' + QuestId);
      this.member_quearray[index_member_quearray]['question_' + QuestId + '_type'] = 'flag';
      this.member_quearray[index_member_quearray]['question_' + QuestId + '_details'] = true;
      this.member_quearray[index_member_quearray]['question_' + QuestId + '_code'] = QuestId;
    }
  }
  redirectToSummary() {
    // this._route.navigate(['/proposal-summary'], { relativeTo: this.ActivatedRoute, queryParams: { client_id: 2, arn: this.arn, is_posp: 'NonPOSP', ss_id: this.ss_id } });

    window.location.href = window.location.origin + '/travel-insurance/proposal-summary' + '?client_id=2&arn=' + this.arn + '&is_posp=NonPOSP&ss_id=' + this.ss_id;
  }
  SelectAll(QuestList) {
    var Queelement = ((<HTMLInputElement>document.getElementById("selectAll_" + QuestList)));
    if (this.Insurer_ID !== 1 && this.Insurer_ID !== 11) {
      ((<HTMLInputElement>document.getElementById("noForAll"))).checked = false;
    }
    if (Queelement.checked == true) {
      this.ismedquestnschecked = 'yes';
      this.proposalForm.controls['is_medquestns_checked'].setValue(this.ismedquestnschecked);
      ((<HTMLInputElement>document.getElementById("question_" + QuestList))).checked = false;
      var index_member_quearray = this.member_quearray.findIndex(x => x.name == 'question_' + QuestList);
      this.member_quearray[index_member_quearray]['question_' + QuestList + '_type'] = 'flag';
      this.member_quearray[index_member_quearray]['question_' + QuestList + '_details'] = false;
      this.member_quearray[index_member_quearray]['question_' + QuestList + '_code'] = QuestList;
    }
    if (this.Insurer_ID !== 1 && this.Insurer_ID !== 11) {
      if ($('.no_for_indivdual:checked').length == $('.no_for_indivdual').length) {
        ((<HTMLInputElement>document.getElementById("noForAll"))).checked = true;
        this.MedicalQsError = false;
      } else {
        ((<HTMLInputElement>document.getElementById("noForAll"))).checked = false;
      }
    }
  }

  TATAAgreement(value) {
    var url = window.location.origin;
    var agreement;
    if (url.includes("qa")) {
      url = url.includes("https") ? "https://qa-horizon.policyboss.com:3443/travel_brochures" : "http://qa-horizon.policyboss.com:3000/travel_brochures";
    } else {
      url = url.includes("https") ? "https://www.policyboss.com/pdf-files" : "http://www.policyboss.com/pdf-files";
    }
    if (value === "wording" || value === "brochure") {
      if (this.travelling_to === "Asia") {
        agreement = value === "wording" ? url + "/TATA_Travel/Asia_Travel_Guard_Wording.pdf" : url + "/TATA_Travel/Asia_Travel_Guard_Brochure.pdf";
      } else {
        agreement = value === "wording" ? url + "/TATA_Travel/Travel_Guard_Wording.pdf" : url + "/TATA_Travel/Travel_Guard_Brochure.pdf";
      }
    } else {
      agreement = value === "claimForm" ? url + "/TATA_Travel/TATA_Claim_Form.pdf" : url + "/TATA_Travel/TATA_CLAIMS_PROCEDURE.doc";
    }
    window.open(agreement, "_blank");
  }

  BrochureWordings(value) {
    let url = window.location.origin;
    if (url.includes("qa")) {
      url = url.includes("https") ? "https://qa-horizon.policyboss.com:3443/travel_brochures" : "http://qa-horizon.policyboss.com:3000/travel_brochures";
    } else {
      url = url.includes("https") ? "https://www.policyboss.com/pdf-files" : "http://www.policyboss.com/pdf-files";
    }

    let document_url;
    if (value === "wording" || value === "brochure") {
      if (this.Insurer_ID === 9) {
        if (this.travelling_to == 'Asia') {
          document_url = value === "wording" ? url + "/Reliance_Travel/Reliance_Asia_Wordings.pdf" : url + "/Reliance_Travel/Reliance_Asia_Brochure.pdf";
        } else if (this.travelling_to == 'Europe') {
          document_url = value === "wording" ? url + "/Reliance_Travel/Reliance_Schengen_Wordings.pdf" : url + "/Reliance_Travel/Reliance_Schengen_Brochure.pdf";
        } else if (this.travelling_to == 'WorldWide' || this.travelling_to == 'WWExUSCanada') {
          document_url = value === "wording" ? url + "/Reliance_Travel/Reliance_WW&WWExUSCanada_Wordings.pdf" : url + "/Reliance_Travel/Reliance_WW&WWExUSCanada_Brochure.pdf";
        }

      } else if (this.Insurer_ID === 1) {
        if ([104, 106, 111, 116, 121, 123, 124, 129, 130].includes(this.ProductPlan_Id)) {// Bajaj corporate
          document_url = value === "wording" ? url + "/Bajaj_Travel/Bajaj_Prime_Corporate_Wordings.pdf" : url + "/Bajaj_Travel/Bajaj_Prime_Corporate_Brochure.pdf";
        } else if ([101, 102, 122].includes(this.ProductPlan_Id)) {//  Bajaj Individual
          document_url = value === "wording" ? url + "/Bajaj_Travel/Bajaj_Prime_Individual_Wordings.pdf" : url + "/Bajaj_Travel/Bajaj_Prime_Individual_Brochure.pdf";
        } else if ([105, 110].includes(this.ProductPlan_Id)) {   //  Bajaj Family
          document_url = value === "wording" ? url + "/Bajaj_Travel/Bajaj_Prime_Family_Wordings.pdf" : url + "/Bajaj_Travel/Bajaj_Prime_Family_Brochure.pdf";
        } else if ([103, 109, 112, 115, 126, 128].includes(this.ProductPlan_Id)) { // Bajaj elite
          document_url = value === "brochure" ? url + "/Bajaj_Travel/Bajaj_Elite_Brochure.pdf" : "";
        }
      }
      else if (this.Insurer_ID == 44) {
        document_url = value === "wording" ? url + "/GoDigit_Travel/GoDigit_Wordings.pdf" : "";
      }
      else if (this.Insurer_ID == 34) {
        document_url = value === "wording" ? url + "/Care_Travel/Care_Explore_Wordings.pdf" : url + "/Care_Travel/Care_Explore_Brochure.pdf";
      } else if (this.Insurer_ID == 5) {
        document_url = value === "wording" ? url + "/Hdfc_Travel/Hdfc_Wordings.pdf" : url + "/Hdfc_Travel/Hdfc_Brochure.pdf";
      } else if (this.Insurer_ID == 6) {
        document_url = value === "wording" ? url + "/Icici_Travel/Icici_International_Wordings.pdf" : url + "/Icici_Travel/Icici_International_Brochure.pdf";
      }
    }
    window.open(document_url, "_blank");
  }

  Pre_existing_select(event, i) {
    if (event.name === "Any Other") {
      $(".Pre_existing_" + i).show();
    }
  }
  Pre_existing_Unselect(event, i) {
    if (event.name === "Any Other") {
      $(".Pre_existing_" + i).hide();
    }
  }

  AgentOk() {
    $('#submit_loader_popup').hide();
    this.send_link = false;
    this.loader_success = false;
  }
  BackToHome() {
    this.query_params = this.query_params?('?'+this.query_params):"";
    window.location.href = window.location.origin + "/travel-insurance" + this.query_params;
  }
  back2quotes() {
    if ((this.app_version && this.app_version.includes('policyboss-')) && (this.ss_id !== null && this.ss_id !== undefined && this.ss_id !== 0 && this.fba_id !== "" && this.fba_id !== undefined && this.fba_id !== "0" && this.app_version !== "" && this.app_version !== undefined && this.app_version !== "0")) {
      window.location.href = window.location.origin + '/travel-insurance/quotes?SID=' + this.srn + '&ClientID=2' + "&ss_id=" + this.ss_id + "&fba_id=" + this.fba_id + "&sub_fba_id=" + this.sub_fba_id + "&ip_address=" + this.ip_address + "&mac_address=" + this.mac_address + "&app_version=" + this.app_version + "&product_id=" + this.ProductID;
    } else {
      window.location.href = window.location.origin + '/travel-insurance/quotes?SID=' + this.srn + '&ClientID=2';
    }
  }

  currency_format(curr) {
    if (/[$_€]/.test(curr)) {
      var currency = + curr.replace(/[$_€]/g, '');
      return currency.toLocaleString();
    } else {
      currency = parseInt(curr);
      return currency.toLocaleString('en-IN');
    }
  }

  setDateDropDown() {
    this.current_day = moment().date();
    this.current_month = moment().month() + 1;
    this.current_year = moment().year();
    this.dob_dd = Array(31).fill(1).map((x, i) => i < 9 ? "0" + (i + 1) : (i + 1).toString());
    this.dob_mm = Array(12).fill(1).map((x, i) => i < 9 ? "0" + (i + 1) : (i + 1).toString());
    this.nominee_months = Array(12).fill(1).map((x, i) => (i + 1).toString());
    this.nominee_day = Array(31).fill(1).map((x, i) => (i + 1).toString());
    this.day = Array(31).fill(1).map((x, i) => (i + 1).toString());
    this.months = Array(12).fill(1).map((x, i) => (i + 1).toString());
    this.dob_yy = Array.from({ length: 63 }, (_, i) => this.current_year - 18 - i);
    // for (let yy = this.current_year - 18; yy >= this.current_year - 80; yy--) {
    //   this.dob_yy.push(yy);
    // }

    this.dob_yy_child = Array.from({ length: 19 }, (_, i) => this.current_year - i);
    // for (let yy = this.current_year; yy >= this.current_year - 18; yy--) {
    //   this.dob_yy_child.push(yy);
    // }

    var max_passport_year = this.trip_type === 'MULTI' ? moment(this.travel_start_date).year() + 12 : moment(this.travel_start_date).year() + 11;
    var max = this.current_year - 18;
    var min = max - 82;
    var d = moment(this.travel_start_date);
    this.min_passport_date = this.trip_type === 'MULTI' ? moment().set({ 'year': d.year() + 1, 'month': d.month(), 'date': d.date(), 'hour': 0, 'minute': 0, 'second': 0, 'millisecond': 0 }) : moment(this.travel_end_date);
    for (var i = moment().year(); i >= min; i--) {
      this.suffering_since_year.push(i);
    }
    for (var i = max_passport_year; i >= this.min_passport_date.year(); i--) {
      this.passport_exp_year.unshift(i);
    }
    // this.passport_exp_year = this.passport_exp_year.reverse();
    for (var i = 12; i >= 1; i--) {
      this.passport_month.unshift(i);
    }
    // this.passport_month = this.passport_month.reverse();
    for (var i = 31; i >= 1; i--) {
      this.passport_date.unshift(i);
    }
    // this.passport_date = this.passport_date.reverse();
    for (var i = max; i >= min; i--) {
      this.adult_year.push(i);
    }

    let month = $('#month').val();
    let year = $('#year').val();
    if (month && year) {
      this.day = month == this.current_month && year == this.current_year - 18
        ? Array.from({ length: this.current_day }, (_, i) => i + 1)
        : Array.from({ length: this.getDaysInMonths(year, month) }, (_, i) => i + 1);
      // if (month == this.current_month && year == this.current_year - 18) { 
      //   this.day = [];
      //   for (var i = this.current_day; i >= 1; i--) {
      //     this.day.push(i);
      //   }
      //   this.day = this.day.reverse();
      // } else {
      //   var adult_date = this.getDaysInMonths(year, month);
      //   this.day = [];
      //   for (var i = adult_date; i >= 1; i--) {
      //     this.day.push(i);
      //   }
      //   this.day = this.day.reverse();
      // }
      this.months = year == this.current_year - 18
        ? Array.from({ length: this.current_month }, (_, i) => i + 1)
        : Array.from({ length: 12 }, (_, i) => i + 1);
      // if (year == this.current_year - 18) {
      //   var min_dob_month = this.current_month;
      //   this.months = [];
      //   for (var i = min_dob_month; i >= 1; i--) {
      //     this.months.push(i);
      //   }
      //   this.months = this.months.reverse();
      // } else {
      //   this.months = [];
      //   for (var i = 12; i >= 1; i--) {
      //     this.months.push(i);
      //   }
      //   this.months = this.months.reverse();
      // }
    }
    let nominee_month = $('#nominee_dob_month').val();
    let nominee_year = $('#nominee_dob_year').val();
    if (nominee_month && nominee_year) {
      this.nominee_day = month == this.current_month && year == this.current_year - 18
        ? Array.from({ length: this.current_day }, (_, i) => i + 1)
        : Array.from({ length: this.getDaysInMonths(year, month) }, (_, i) => i + 1);
      // if (month == this.current_month && year == (this.current_year - 18)) {
      //   this.nominee_day = [];
      //   for (var i = this.current_day; i >= 1; i--) {
      //     this.nominee_day.push(i);
      //   }
      //   this.nominee_day = this.nominee_day.reverse();
      // } else {
      //   var nominee_date = this.getDaysInMonths(year, month);
      //   this.nominee_day = [];
      //   for (var i = nominee_date; i >= 1; i--) {
      //     this.nominee_day.push(i);
      //   }
      //   this.nominee_day = this.nominee_day.reverse();
      // }
      this.nominee_months = year == this.current_year - 18
        ? Array.from({ length: this.current_month }, (_, i) => i + 1)
        : Array.from({ length: 12 }, (_, i) => i + 1);
      // if (year == (this.current_year - 18)) {
      //   var min_dob_month = this.current_month;
      //   this.nominee_months = [];
      //   for (var i = min_dob_month; i >= 1; i--) {
      //     this.nominee_months.push(i);
      //   }
      //   this.nominee_months = this.nominee_months.reverse();
      // } else {
      //   this.nominee_months = [];
      //   for (var i = 12; i >= 1; i--) {
      //     this.nominee_months.push(i);
      //   }
      //   this.nominee_months = this.nominee_months.reverse();
      // }
    }
  }
  visiting_countries_dropdown(val) {
    // $('.countriesShow').addClass('show');

    var countries_val = $(val).text();
    if (this.countries_array.includes(countries_val) == true) {
      $(val).closest('li').toggleClass("active");
      var index_val = this.countries_array.indexOf(countries_val);
      this.countries_array.splice(index_val, 1);
    } else if (this.countries_array.length < 5) {
      $(val).closest('li').toggleClass("active");
      this.countries_array.push(countries_val);
      $(val).closest('.input-field-box').find('input').val(this.countries_array);
    }
  }



  dropdown_value(val) {
    $(val).closest('li').toggleClass("active");
    for (var v = 1; v <= this.adult_count; v++) {
      this.memb_1_ped = [];
      var membs_ped_val = $('#member_' + v + '_ped').val() == undefined ? "" : $('#member_' + v + '_ped').val();
      let pedValues: any = membs_ped_val ? membs_ped_val.split(',') : '';
      if (pedValues && pedValues.length > 0) {
        this.memb_1_ped = membs_ped_val.split(',');
      }
      var region_val = $(val).text();
      if (val.id == 'member_' + v + '_ped_anchor') {
        if (this.memb_1_ped.includes(region_val) == true) {
          var index_val_disease = this.memb_1_ped.indexOf(region_val);
          this.memb_1_ped.splice(index_val_disease, 1);
          if ((this.Insurer_ID == 9 || this.Insurer_ID == 11) && this.memb_1_ped.includes('Any Other') == false) {
            $('.Pre_existing_' + v).css('display', 'none')
          }
          $(val).closest('.input-field-box').find('input').val(this.memb_1_ped);
        }
        else {
          this.memb_1_ped.push(region_val);
          if ((this.Insurer_ID == 9 || this.Insurer_ID == 11) && this.memb_1_ped.includes('Any Other') == true) {
            $('.Pre_existing_' + v).css('display', 'block')
          }
          $(val).closest('.input-field-box').find('input').val(this.memb_1_ped);
        }
      }
    }

    for (var v = 3; v <= this.child_count + 2; v++) {
      this.memb_1_ped = [];
      var membs_ped_val = $('#member_' + v + '_ped').val() == undefined ? "" : $('#member_' + v + '_ped').val();
      let pedValues: any = membs_ped_val ? membs_ped_val.split(',') : '';
      if (pedValues && pedValues.length > 0) {
        this.memb_1_ped = membs_ped_val.split(',');
      }
      var region_val = $(val).text();
      if (val.id == 'member_' + v + '_ped_anchor') {
        if (this.memb_1_ped.includes(region_val) == true) {
          var index_val_disease = this.memb_1_ped.indexOf(region_val);
          this.memb_1_ped.splice(index_val_disease, 1);
          if ((this.Insurer_ID == 9 || this.Insurer_ID == 11) && this.memb_1_ped.includes('Any Other') == false) {
            $('.Pre_existing_' + v).css('display', 'none')
          }
          $(val).closest('.input-field-box').find('input').val(this.memb_1_ped);
        }
        else {
          this.memb_1_ped.push(region_val);
          if ((this.Insurer_ID == 9 || this.Insurer_ID == 11) && this.memb_1_ped.includes('Any Other') == true) {
            $('.Pre_existing_' + v).css('display', 'block')
          }
          $(val).closest('.input-field-box').find('input').val(this.memb_1_ped);
        }
      }
    }
  }

  checkAddress(input) {
    var pattern = /^[a-zA-Z0-9(),.'"/&:;\- ]/;
    var dvid = $(input).attr('id');
    if (pattern.test(input.val()) == false) {
      $(dvid).addClass('has-errors', 'border-thick');
      return false;
    } else {
      $(dvid).removeClass('has-errors', 'border-thick');
      return true;
    }
  }

  PassportvalidateDateRange(Date) {
    var Date: any = moment(Date, 'YYYY-MM-DD');
    var a = (Date >= this.min_passport_date);
    return a;

  };

  getDaysInMonths(year, month) {
    var yymm = year + "-" + month;
    return moment(yymm, "YYYY-MM").daysInMonth();
  }

  Dropdown_close(e) {
    e.stopPropagation();
  }


}
