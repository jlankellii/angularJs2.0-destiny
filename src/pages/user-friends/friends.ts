import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NavController, NavParams} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Settings} from '../../providers/settings';

import {TranslateService} from '@ngx-translate/core';
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {AppConfig} from "../../util/AppConfig";
import {CommonServiceProvider} from "../../providers/common-service/common-service";
import {CodeEnum} from "../../util/codeEnum";

/**
 * The Settings page is a simple form that syncs with a Settings provider
 * to enable the user to customize settings for the app.
 *
 */
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html'
})
export class FriendsPage {
  users: any;

  // Our local settings object
  options: any;

  settingsReady = false;

  form: FormGroup;

  profileSettings = {
    page: 'profile',
    pageTitleKey: 'SETTINGS_PAGE_PROFILE'
  };

  page: string = 'main';
  pageTitleKey: string = 'SETTINGS_TITLE';
  pageTitle: string;

  subSettings: any = FriendsPage;

  constructor(public navCtrl: NavController,
              public settings: Settings,
              public formBuilder: FormBuilder,
              public navParams: NavParams,
              public translate: TranslateService,
              private  userService: UserServiceProvider,
              private commonServiceProvider: CommonServiceProvider,
              private storage: Storage) {
    this.storage.get(AppConfig.getUserStorageKey()).then((val) => {
      if (val && val['_id'] != null) {
        this.userService.queryUsers(val['_id']).subscribe(res => {
          this.users = res['data'];
        });
      }
    });
  }

  /*_buildForm() {
   let group: any = {
   option1: [this.options.option1],
   option2: [this.options.option2],
   option3: [this.options.option3]
   };

   switch (this.page) {
   case 'main':
   break;
   case 'profile':
   group = {
   option4: [this.options.option4]
   };
   break;
   }
   this.form = this.formBuilder.group(group);

   // Watch the form for changes, and
   this.form.valueChanges.subscribe((v) => {
   this.settings.merge(this.form.value);
   });
   }*/

  ionViewDidLoad() {
    // Build an empty form for the template to render
    //this.form = this.formBuilder.group({});
  }

  ionViewWillEnter() {
    // Build an empty form for the template to render
    /*this.form = this.formBuilder.group({});

     this.page = this.navParams.get('page') || this.page;
     this.pageTitleKey = this.navParams.get('pageTitleKey') || this.pageTitleKey;

     this.translate.get(this.pageTitleKey).subscribe((res) => {
     this.pageTitle = res;
     })
     this.settings.load().then(() => {
     this.settingsReady = true;
     this.options = this.settings.allSettings;

     this._buildForm();
     });*/
  }

  setFollow(user: any) {
    this.storage.get(AppConfig.getUserStorageKey()).then((val) => {
      if (val && val['_id'] != null) {
        this.userService.setFollow(val['_id'],user['_id']).subscribe(res => {
          if (res.isTrue(CodeEnum.APP_SUCCESS)){
            this.commonServiceProvider.infoShow("关注成功");
          }else{
            this.commonServiceProvider.infoShow(res.msg);
          }
        });
      }
    });
  }

  ngOnChanges() {
    console.log('Ng All Changes');
  }
}
