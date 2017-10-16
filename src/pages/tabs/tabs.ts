import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {TranslateService} from '@ngx-translate/core';


import {Tab1Root} from '../pages';
import {Tab2Root} from '../pages';
import {Tab3Root} from '../pages';
import {Tab4Root} from '../pages';
import {SocketServiceProvider} from "../../providers/socket-service/socket-service";

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = Tab1Root;
  tab2Root: any = Tab2Root;
  tab3Root: any = Tab3Root;
  tab4Root: any = Tab4Root;

  tab1Title = " ";
  tab2Title = " ";
  tab3Title = " ";
  tab4Title = " ";

  constructor(public navCtrl: NavController,
              public translateService: TranslateService,
              private socket: SocketServiceProvider
  ) {
    translateService.get(['TAB1_TITLE', 'TAB2_TITLE', 'TAB3_TITLE', 'TAB4_TITLE']).subscribe(values => {
      this.tab1Title = values['TAB1_TITLE'];
      this.tab2Title = values['TAB2_TITLE'];
      this.tab3Title = values['TAB3_TITLE'];
      this.tab4Title = values['TAB4_TITLE'];
    });



  }
 /* ionViewDidEnter() {
    this.socket.socketService.subscribe(event => {
      if (event.category === 'getMessage') {
        console.log("tabs from:" + event.data.from + "/ to:" + event.data.to + " /msg:" + event.data.message);
      }
    });
  }*/
}
