import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { Items } from '../../providers/providers';

import { Item } from '../../models/item';

@Component({
  selector: 'page-bosuan',
  templateUrl: 'bosuan.html'
})
export class BosuanPage {
  currentItems: Item[];

  constructor(public navCtrl: NavController, public items: Items, public modalCtrl: ModalController) {
    this.currentItems = this.items.query();
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

}
