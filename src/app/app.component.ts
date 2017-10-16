import {Component, ViewChild} from '@angular/core';
import {Platform, Nav, Config} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {FirstRunPage, MainPage} from '../pages/pages';
import {BosuanPage} from '../pages/bosuan/bosuan';
import {LoginPage} from '../pages/user-login/login';
import {CommunityPage} from '../pages/community/community';
import {FriendsPage} from '../pages/user-friends/friends';
import {TabsPage} from '../pages/tabs/tabs';
import {TutorialPage} from '../pages/tutorial/tutorial';
import {WelcomePage} from '../pages/welcome/welcome';

import {Settings} from '../providers/providers';

import {TranslateService} from '@ngx-translate/core'
import {AppConfig} from "../util/AppConfig";

@Component({
  template: `
    <ion-menu [content]="content">
      <ion-header>
        <ion-toolbar>
          <ion-title>Pages</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content>
        <ion-list>
          <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
            {{p.title}}
          </button>
        </ion-list>
      </ion-content>

    </ion-menu>
    <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  // rootPage = FirstRunPage;
  rootPage;
  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    {title: 'Tutorial', component: TutorialPage},
    {title: 'Welcome', component: WelcomePage},
    {title: 'Tabs', component: TabsPage},
    {title: 'Login', component: LoginPage},
    {title: 'Bosuan', component: BosuanPage},
    {title: 'Settings', component: FriendsPage},
    {title: 'Community', component: CommunityPage}
  ]

  constructor(private translate: TranslateService,
              private platform: Platform,
              settings: Settings,
              private config: Config,
              private statusBar: StatusBar,
              private splashScreen: SplashScreen,
              private storage: Storage) {
    this.initTranslate();
    this.statusBar.styleDefault();
    // this.statusBar.overlaysWebView(false);
    // this.statusBar.backgroundColorByHexString("#000");
    /*
     this.statusBar.overlaysWebView(false);
     this.statusBar.backgroundColorByName("gray");*/
    this.splashScreen.hide();
    this.storage.get('firstIn').then((result) => {
        if (result) {
          //判断是否登录了
          this.storage.get(AppConfig.getUserStorageKey()).then((val) => {
            if (val && val['_id'] != null) {
              this.rootPage = MainPage;
            }else{
              this.rootPage = WelcomePage;
            }
          });

        }
        else {
          this.storage.set('firstIn', true);
          this.rootPage = FirstRunPage;
        }
      }
    );

  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //this.statusBar.backgroundColorByName("gray");
      //this.splashScreen.hide();
    });
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');

    if (this.translate.getBrowserLang() !== undefined) {
      this.translate.use(this.translate.getBrowserLang());
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
