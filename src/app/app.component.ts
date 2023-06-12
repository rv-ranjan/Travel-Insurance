import { Component, AfterViewInit, Renderer2,OnInit } from '@angular/core';
// import { $ } from 'protractor';
import { environment } from '../environments/environment';
import { HorizonApiService } from './horizon-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/map';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit,OnInit{
  constructor(private horizon: HorizonApiService, private ActivatedRoute: ActivatedRoute, private renderer: Renderer2) { }
  title = 'app';
  show_agent: boolean = false;
  session_id: string = "";
  currentURL: string;
  ss_id: any;
  agent_name: any;
  agent_email: any;
  agent_mobile: any;
  fba_id: string = "";
  sub_fba_id: any;
  Is_Employee: boolean = false;
  UID: string;
  ErrorMessage: string = '';
  wallet_session_ssid: any;
  wallet_session_data_ssid: any;
  sessionData = {};
  inputFromParent: any;
  component: boolean = false;
  app_version: any;
  utm_source: any;
  utm_medium: any;
  utm_campaign: any;
  campaign_id: any;
  policyBossPro: boolean = false; 
  is_proposal: boolean = false;
  visitor_id: string = "";
  visitor_history_id: string;
  insert_Count:number = 0;
  update_Count:number = 0;
  device_type:string;
  user_agent:string;
  appVisitorData: any;
  visitorObj = {};
  componentType;
  is_quotes = false;
  is_proposal_details = false;
  is_proposal_summary = false;
  ngAfterViewInit() {
    let loader = this.renderer.selectRootElement('.index-loading');
    this.renderer.setStyle(loader, 'display', 'none');
  }
  ngOnInit() {
    this.currentURL = window.location.href;
    this.is_quotes = false;
    this.is_proposal_details = false;
    this.is_proposal_summary = false;
    if (this.currentURL.includes('/quotes')) {
      this.component = true;
      this.componentType = 'quotes';
      this.is_quotes = true;
    }
    if (this.currentURL.includes('/proposal-summary')) {
      this.is_proposal = true;
      this.componentType = 'proposal-summary';
      this.is_proposal_summary = true;
      this.is_proposal_details = false;
      
    }
    else if (this.currentURL.includes('/proposal')) {
      this.is_proposal = true;
      this.componentType = 'proposal-details';
      this.is_proposal_details = true;
      this.is_proposal_summary = false;
    }

   
    var session_url = environment.pb_get_session_url;
	  if (window.location.hostname.includes('pro.policyboss.com')) {
      session_url = environment.pro_get_session_url;
    }
    this.horizon.pb_Session(session_url).subscribe(
      data => {
      //  data = {"cookie":{"originalMaxAge":6000000,"expires":"2022-10-19T07:17:11.029Z","httpOnly":false,"domain":"policyboss.com","path":"/"},"transaction":{"visitor_id":831875},"login_response":{"UserName":"Anuj Baliram Singh","FBAId":56265,"FBAStatus":"","Fullname":"Anuj Baliram Singh","POSPStatus":"","EmailID":"anuj.singh@policyboss.com","MobiNumb1":9619160851,"SuppAgentId":8067,"EmpCode":110560,"RoleId":23,"Source":0,"client_id":2,"IsFirstLogin":0,"LIveURL":0,"LastloginDate":0,"Validfrom":"","UserType":"","RewardPoint":0,"strPassword":"","IsDemo":0,"FSM":"","IsMagiSale":0,"LeadId":0,"Sub_Fba_Id":"","Is_Employee":"Y","Result":"Success","Message":"Authentication Succesfull!","Status":0,"Sources":0},"user":{"session_id":"nCTn47TEVXHqta3ZRVqpIoXLqVlsxdhs","email":"anuj.singh@policyboss.com","mobile":9619160851,"fullname":"Anuj Baliram Singh","role_id":23,"role_detail":{"channel":"ALL","ownership":"ST","title":"SuperAdmin","role":["Employee","SuperAdmin"],"allowed_product":["ALL"],"allowed_make":["ALL"]},"ss_id":8067,"fba_id":56265,"erp_id":110560,"sub_fba_id":0,"uid":110560,"website_session":{"session_id":"nCTn47TEVXHqta3ZRVqpIoXLqVlsxdhs","agent_name":"Anuj Baliram Singh","agent_city":"NA","fba_id":56265,"sub_fba_id":0,"agent_source":0,"AgentClientFBAID":null,"agent_email":"anuj.singh@policyboss.com","agent_mobile":9619160851,"UID":110560,"Is_Employee":"Y","client_id":2,"agent_id":8067,"agent_rm_name":"NA","role_detail":{"channel":"ALL","ownership":"ST","title":"SuperAdmin","role":["Employee","SuperAdmin"],"allowed_product":["ALL"],"allowed_make":["ALL"]}},"direct":{"cnt_posp":0,"cnt_dsa":0,"cnt_cse":0},"team":{"cnt_posp":0,"cnt_dsa":0,"cnt_cse":6},"profile":{"Ss_Id":8067,"Business_Phone_Number":"9619160851","Official_Email":"anuj.singh@policyboss.com","Email":"anujsingh2511@gmail.com","Phone":"9619160851","Direct_Reporting_UID":107602,"Dept_Segment":"IT_Development","Dept_Short_Name":"IT","Emp_Category":"-","Sub_Process":"IT_Development","Process":"IT_Development","Sub_Vertical":"IT","Vertical":"Support","Director_CXO_Name":"Susheel Tejuja","VH_HOD_Name":"Chiragkumar Sevantilal Modi","RH_Name":"-","BH_Name":"-","LM_Name":"-","ALM_Name":"-","TL_Name":"-","Band":5,"Designation":"Deputy General Manager","DOJ":"2018-05-10","Branch":"Mumbai_M","Company":"Datacomp","Software_ID":"ANUJ BALIRAM SINGH","Employee_Name":"Anuj Baliram Singh","EMP_ID":550005,"HRMS_ID":10550005,"UID":110560,"__v":0,"_id":"634f36facd793d826da8b22f"}},"users_assigned":{"Profile":{"Ss_Id":8067,"Business_Phone_Number":"9619160851","Official_Email":"anuj.singh@policyboss.com","Email":"anujsingh2511@gmail.com","Phone":"9619160851","Direct_Reporting_UID":107602,"Dept_Segment":"IT_Development","Dept_Short_Name":"IT","Emp_Category":"-","Sub_Process":"IT_Development","Process":"IT_Development","Sub_Vertical":"IT","Vertical":"Support","Director_CXO_Name":"Susheel Tejuja","VH_HOD_Name":"Chiragkumar Sevantilal Modi","RH_Name":"-","BH_Name":"-","LM_Name":"-","ALM_Name":"-","TL_Name":"-","Band":5,"Designation":"Deputy General Manager","DOJ":"2018-05-10","Branch":"Mumbai_M","Company":"Datacomp","Software_ID":"ANUJ BALIRAM SINGH","Employee_Name":"Anuj Baliram Singh","EMP_ID":550005,"HRMS_ID":10550005,"UID":110560,"__v":0,"_id":"634f36facd793d826da8b22f"},"Direct":{"POSP":[],"DSA":[],"CSE":[]},"Team":{"POSP":[],"DSA":[],"CSE":[16114,16115,64496,107889,107890,114118]}}};
        this.inputFromParent = data;
        if (data.hasOwnProperty('user') && data['user']) {
          this.show_agent = true;
          this.ss_id = data['user'].hasOwnProperty('ss_id') ? data['user']['ss_id'] : "";
          this.fba_id = data['user'].hasOwnProperty('fba_id') ? data['user']['fba_id'] : "";
          this.sub_fba_id = data['user'].hasOwnProperty('sub_fba_id') ? data['user']['sub_fba_id'] : "";
          this.agent_name = data['user']['website_session']['agent_name'];
          this.agent_email = data['user']['website_session']['agent_email'];
          this.agent_mobile = data['user']['website_session']['agent_mobile'];
          this.Is_Employee = data['user']['website_session']['Is_Employee'] == "Y" ? true : false;
          this.UID = data['user']['website_session']['UID'];
          this.session_id = data['user']['session_id'];
          this.wallet_session_ssid = data['user']['website_session']['agent_id'];
        }
        else {
          this.ss_id = 0;
        }
        console.log('session data', data);

        this.sessionData = {
          ss_id: this.ss_id,
          agent_name: this.agent_name,
          agent_email: this.agent_email,
          agent_mobile: this.agent_mobile,
          fba_id: this.fba_id,
          sub_fba_id: this.sub_fba_id,
          Is_Employee: this.Is_Employee,
          UID: this.UID,
          session_id: this.session_id,
          wallet_session_ssid: this.wallet_session_ssid
        }
      },
      error => {
        this.ErrorMessage = error;
        this.ss_id = 0;
        console.log('Error in get Session');
        console.log('session error', error);
      }
    );

    this.ActivatedRoute.queryParams.subscribe(params => {
      this.utm_source = params['utm_source'] != undefined ? params['utm_source'] : '';
      this.app_version = params['app_version'] != undefined ? params['app_version'] : '';
      if(this.app_version.includes('policyboss-')){
        this.policyBossPro = true;
      }
      this.utm_medium = params['utm_medium'] != undefined ? params['utm_medium'] : '';
      this.utm_campaign = params['utm_campaign'] != undefined ? params['utm_campaign'] : '';
      this.campaign_id = params['campaign_id'] != undefined ? params['campaign_id'] : '';
    },
    error => {
      this.ErrorMessage = error;
      console.log('Error in get queryParams');
      console.log('queryParams error', error);
    });
    this.onLoadComponent(this.componentType);
  }
  onLoadComponent(component) {
    this.update_Count = 0;
    this.horizon.visitor_getSession().subscribe(
      data => {
       this.appVisitorData = data; 
       if (data.hasOwnProperty('user') && data['user']) {
          this.ss_id = data['user'].hasOwnProperty('ss_id') ? data['user']['ss_id'] : "";
          this.fba_id = data['user'].hasOwnProperty('fba_id') ? data['user']['fba_id'] : "";
        }
        if (data.hasOwnProperty('transaction')) {
          let trans_data;
          if (data.hasOwnProperty('transaction') && data['transaction'] && data['transaction'].hasOwnProperty('visitor_id') && data['transaction'].visitor_id) {
            this.visitor_id = data['transaction']['visitor_id'];
            this.saveVisitorData('update');
            setInterval(() => {
              this.saveVisitorData('update');
            }, 30000);
          }
        } else {
          this.saveVisitorData('insert');
          setInterval(() => {
            this.saveVisitorData('update');
          }, 30000);
        }
        // console.log('session data', data);
        this.visitorObj = {
          visitor_id: this.visitor_id
        }
      },
      error => {
        this.saveVisitorData('insert');
        setInterval(() => {
          this.saveVisitorData('update');
        }, 30000);
        console.log('Error in get Session', error);
      }
    );
  }
  saveVisitorData(operation) {
    // device type and userAgent Changes
   var ua = navigator.userAgent;
   if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
     this.device_type = "TABLET";
   }
   else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
     this.device_type = "MOBILE";
   }
   else {
     this.device_type = 'DESKTOP'
   }
   this.user_agent = navigator.userAgent;
   let ipAddress = '';
   let app_visitor_id = this.visitor_id ? this.visitor_id : '';
   let methodName = (operation === 'update' ? ('/postservicecall/app_visitor/update_data/' + app_visitor_id) : ('/postservicecall/app_visitor/save_data'));
   this.horizon.visitor_IpAddress().subscribe(
     (ip_data) => {
       if (ip_data.hasOwnProperty('ip') && ip_data['ip']) {
         ipAddress = ip_data['ip'];
         let visitor_data = {};
         if (operation === 'insert') {
           this.insert_Count++;
           visitor_data = {
             "app_type": "Travel_Website",
             "ss_id": this.ss_id ? this.ss_id : 0,
             "fba_id": this.fba_id ? this.fba_id : 0,
             "IP_Address": ipAddress,
             "query_string": window.location.href.split("?")[1] ? window.location.href.split("?")[1] : '',
             "Last_Visited_Url": window.location.href,
             "device_type": this.device_type ? this.device_type : '',
             "user_agent": this.user_agent ? this.user_agent :  ''
           };
         }
         else if (operation === 'update') {
           this.update_Count++;
           visitor_data = {
             "app_type": "Travel_Website",
             "ss_id": this.ss_id ? this.ss_id : 0,
             "fba_id": this.fba_id ? this.fba_id : 0,
             "Last_Visited_Url": window.location.href,
             "device_type": this.device_type ? this.device_type : '',
             "user_agent": this.user_agent ? this.user_agent :  ''
           };
         }
         // insert & update visitor data
         this.horizon.visitor_callAPIPost(visitor_data, methodName).subscribe(
           (data) => {
             if (operation === 'insert') {
               this.visitor_id = data['visitor_Id']; // data get from DB
               let visitor_Data = {
                 "visitor_id": this.visitor_id
               };
               this.horizon.visitor_setSession(visitor_Data, '').subscribe(
                 data => {
                   console.log('set-session::response::', data);
                   if (data.hasOwnProperty('transaction')) {
                     console.log("Session set");
                   }
                 },
                 error => {
                   console.log('set-session::error::', error);
                 });
             }
             if (this.update_Count === 1 && operation === "update" && this.insert_Count === 0 ) {
               this.saveVisitorHistory();
              }
              // this.currentComponent.visitor_id = this.visitor_id; // to send note in all component 
           },
           (error) => {
             console.log('Error in ', operation, ' service call');
            
           });
       } else {
         console.log("IP address is not available");
       }
     },
     (error) => {
       console.log('Error in Ip service call');
     });
  }
  saveVisitorHistory() {
    let visitor_history_data = {
      "visited_url": window.location.href,
      "visitor_Id": this.visitor_id,
      "device_type": this.device_type,
      "user_agent": this.user_agent
    };
    let methodName = '/postservicecall/app_visitor_history/save_data'

    this.horizon.visitor_callAPIPost(visitor_history_data, methodName).subscribe(
      (data) => {
        console.log('visitor updated against visitor id', data);
        this.visitor_history_id = data['visitor_Id']; // data get from DB
      },
      (error) => {
        console.log('Error in visitor_history  service call');
      });
  }

}