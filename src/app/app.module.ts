import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http,JsonpModule  } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage, IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';

import { BosuanPage } from '../pages/bosuan/bosuan';
import { LoginPage } from '../pages/user-login/login';
import { CommunityPage } from '../pages/community/community';
import { FriendsPage } from '../pages/user-friends/friends';
import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { WelcomePage } from '../pages/welcome/welcome';

import { MyPage } from '../pages/user-center/my';
import { MyInfoPage } from '../pages/user-center/myInfo';

import { Api } from '../providers/api';
import { Items } from '../mocks/providers/items';
import { Settings } from '../providers/settings';
import { User } from '../providers/user';
import { HttpApi } from '../providers/httpApi';

import { Camera } from '@ionic-native/camera';
import { GoogleMaps } from '@ionic-native/google-maps';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpServiceProvider } from '../providers/http-service/http-service';
import { UserServiceProvider } from '../providers/user-service/user-service';
import {UserRegisterPage} from "../pages/user-register/user-register";
import { CommonServiceProvider } from '../providers/common-service/common-service';
import { SocketServiceProvider } from '../providers/socket-service/socket-service';
import {ChatBoxPage} from "../pages/user-center/chatbox";
import {MyMessagePage} from "../pages/user-center/myMessage";

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default friends for your app.
   *
   * You can add new friends options at any time. Once the friends are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
    option1: true,
    option2: 'Ionitron J. Framework',
    option3: '3',
    option4: 'Hello'
  });
}

@NgModule({
  declarations: [
    MyApp,
    BosuanPage,
    LoginPage,
    CommunityPage,
    FriendsPage,
    TabsPage,
    TutorialPage,
    WelcomePage,
    MyPage,
    MyInfoPage,
    UserRegisterPage,
    ChatBoxPage,
    MyMessagePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages: 'true' //隐藏全部子页面tabs
    }),
    IonicStorageModule.forRoot({
      name: '__minggetu',
      driverOrder: ['localstorage','sqlite', 'websql', 'indexeddb']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BosuanPage,
    LoginPage,
    CommunityPage,
    FriendsPage,
    TabsPage,
    TutorialPage,
    WelcomePage,
    MyPage,
    MyInfoPage,
    UserRegisterPage,
    ChatBoxPage,
    MyMessagePage
  ],
  providers: [
    HttpApi,
    Api,
    Items,
    User,
    Camera,
    GoogleMaps,
    SplashScreen,
    StatusBar,
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    HttpServiceProvider,
    UserServiceProvider,
    CommonServiceProvider,
    SocketServiceProvider
  ]
})
export class AppModule { }
