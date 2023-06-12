import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';


@Injectable()
export class HorizonApiService {

  constructor(private http: HttpClient) { }
  getIpAddress() {
    return this.http
      .get('https://ipinfo.io/json')
      .map(response => response || {});
  }
  callAPIPost(post_data, method_name, client_id) {
    var current_url = window.location.href;
    var url = current_url.includes('https:') ? environment.horizon_url + method_name : environment.horizon_http_url + method_name;

    if (client_id == "2") {
      post_data['secret_key'] = environment.horizon_secret_key;
      post_data['client_key'] = environment.horizon_client_key;
    }
    // console.log(post_data);
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(url, JSON.stringify(post_data), { headers: headers });
  }
  callAPIPostTravel(post_data, method_name, client_id) {
    // var current_url = window.location.href;
    var url = 'http://localhost:3000' + method_name;

    if (client_id == "2") {
      post_data['secret_key'] = environment.horizon_secret_key;
      post_data['client_key'] = environment.horizon_client_key;
    }
    // console.log(post_data);
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(url, JSON.stringify(post_data), { headers: headers });
  }

  CallAPIPostWithoutHeader(post_data, method_name) {
    var current_url = window.location.href;
    var url = current_url.includes('https:') ? environment.horizon_url + method_name : environment.horizon_http_url + method_name;
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(url, JSON.stringify(post_data), { headers: headers });
  }
  CallAPIPostAdmin(post_data, method_name) {
    var current_url = window.location.href;
    var url = current_url.includes('https:') ? "https://www.policyboss.com" + method_name : "http://www.policyboss.com" + method_name;
    console.log(post_data);
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(url, JSON.stringify(post_data), { headers: headers });
  }

  callAPIGet(get_data, method_name, client_id) {
    // if(method_name = 'dataSource'){
    // return this.http.get('http://localhost:3000/' + method_name);

    // }
    var current_url = window.location.href;
    var url = current_url.includes('https:') ? environment.horizon_url : environment.horizon_http_url;
    return this.http.get(url + method_name);
  }
  // getBenefits(method_name, client_id) {
  //   var current_url = window.location.href;
  //   // var url = current_url.includes('https:') ? environment.horizon_url_live : environment.horizon_url;
  //   var url = environment.horizon_url;
  //   return this.http.get(url + method_name);
  // }
  shareByWhatsapp(method_name, client_id) {
    return this.http.get(method_name);
  }

  getInsurerData(Insurer_Code) {
    console.log("Insurer_Code ", Insurer_Code);
    //  return this.http.get("https://origin-cdnh.policyboss.com/website/UI22/json/travel-insurance/" + Insurer_Code + ".json");
    return this.http.get("assets/json/" + Insurer_Code + ".json");
  }
  // getInsurerDataLocal(Insurer_Code) {
  //   // console.log("Insurer_Code ", Insurer_Code);
  //   return this.http.get('https://origin-cdnh.policyboss.com/website/UI22/json/car-insurance/' + Insurer_Code + ".json");
  //   // return this.http.get("http://www.policyboss.com/get-session");
  // }

  callAPIPostFastlane(url, post_data) {
    // console.log(post_data);
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8', );
    return this.http.post(url, JSON.stringify(post_data), { headers: headers });
  }
  uploadFile(post_data, method_name) {
    var current_url = window.location.href;
    var url = current_url.includes('https:') ? environment.horizon_url + method_name : environment.horizon_http_url + method_name;
    return this.http.post(url, post_data);
  }
  pb_Session(url) {
    var session_url = window.location.origin.includes('https') ? url : url.replace('https', 'http');
    return this.http.get(session_url);
  }
  pb_setSession(post_data, method_name) {
    var url = method_name;
    url = window.location.origin.includes('https') ? url : url.replace('https', 'http');
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(url, JSON.stringify(post_data), { headers: headers });
  }
  visitor_getSession() {
    let get_session_url = window.location.origin + "/get-session";
    get_session_url = 'https://www.policyboss.com/get-session';
    return this.http.get(get_session_url);
  }
  visitor_setSession(post_data, method_name) {
    let set_session_url = window.location.origin + "/set-session";
    set_session_url = 'https://www.policyboss.com/set-session';
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(set_session_url, post_data, { headers: headers });
  }
  visitor_callAPIPost(post_data, method_name) {
    let current_url = window.location.href;
    let url = current_url.includes('https:') ? environment.horizon_url + method_name : environment.horizon_http_url + method_name;
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(url, post_data);
  }
  visitor_IpAddress() {
    return this.http
      .get('https://api.ipify.org/?format=json')
      .map(response => response || {});
  }
  short_url_api(get_data, method_name, client_id) {
    var current_url = window.location.href;
    var url = current_url.includes('https:') ? environment.horizon_url : environment.horizon_http_url;
    return this.http.get(method_name);
  }
    getCountries(get_data, method_name, client_id){
    // var current_url = window.location.href;
    var url ="http://localhost:3000";
    // var url = current_url.includes('https:') ? environment.horizon_url : environment.horizon_http_url;
    return this.http.get(url + method_name);
  }

}
