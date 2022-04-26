import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  date:any = new Date();
  month:any = new Date();

  //1800000 - 30 minutes; //3600000 - 1 hour;    
  timer = 1800000;
  
  imgPath: any;
  currentGreeting: any;

  // Images
  // morning
  morningImages = [
  'https://images.wallpaperscraft.ru/image/single/klever_priroda_rasteniya_utro_svet_trava_87050_1920x1080.jpg',
  'https://images.wallpaperscraft.ru/image/single/voshod_tuman_derevia_133599_1920x1080.jpg',
  'https://images.wallpaperscraft.ru/image/single/franciya_ozero_led_moroz_iney_zima_nebo_utro_svet_60950_1920x1080.jpg',
  'https://images.wallpaperscraft.ru/image/single/rassvet_solnce_svet_utro_derevya_les_berega_trava_kustarniki_probuzhdenie_62644_1920x1080.jpg',
  'https://images.wallpaperscraft.ru/image/single/ozero_derevia_tuman_192600_1920x1080.jpg',
  'https://images.wallpaperscraft.ru/image/single/rassvet_gorizont_pole_133665_1920x1080.jpg',
  'https://images.wallpaperscraft.ru/image/single/holmy_derevia_tuman_157442_1920x1080.jpg',
  'https://images.wallpaperscraft.ru/image/single/kruzhka_kofe_kniga_utro_117548_1920x1080.jpg'
  ];

  // afternoon
  afternoonImages = [
    'https://images.wallpaperscraft.ru/image/single/poberezhe_more_mayak_volny_den_1150_1920x1080.jpg',
    'https://images.wallpaperscraft.ru/image/single/alpy_gory_ozero_den_nebo_930_1920x1080.jpg',
    'https://images.wallpaperscraft.ru/image/single/vysota_gory_reka_oblaka_den_48050_1920x1080.jpg',
    'https://images.wallpaperscraft.ru/image/single/poberezhe_susha_voda_skaly_den_30262_1920x1080.jpg',
    'https://images.wallpaperscraft.ru/image/single/derevya_iney_zima_reka_istok_techenie_den_48450_1920x1080.jpg',
    'https://images.wallpaperscraft.ru/image/single/reka_les_ozero_zelenyy_leto_den_vodoem_46087_1920x1080.jpg',
    'https://images.wallpaperscraft.ru/image/single/vodopad_palmy_skaly_obryv_yarkie_den_53996_1920x1080.jpg',
    'https://images.wallpaperscraft.ru/image/single/peyzazh_more_bereg_skaly_oblaka_den_48065_1920x1080.jpg'
  ];

  // night
  nightImages = [
    'https://images.wallpaperscraft.ru/image/single/luna_noch_tuchi_115806_1920x1080.jpg',
    'https://images.wallpaperscraft.ru/image/single/nochnoj_gorod_panorama_poberezhe_128128_1920x1080.jpg',
    'https://images.wallpaperscraft.ru/image/single/nochnoj_gorod_gorod_luna_223879_1920x1080.jpg',
    'https://images.wallpaperscraft.ru/image/single/nebo_luna_noch_81866_1920x1080.jpg',
    'https://images.wallpaperscraft.ru/image/single/zvezdy_nebo_noch_113553_1920x1080.jpg',
    'https://images.wallpaperscraft.ru/image/single/palmy_noch_oblaka_119839_1920x1080.jpg',
    'https://images.wallpaperscraft.ru/image/single/palmy_noch_siluety_92462_1920x1080.jpg',
    'https://images.wallpaperscraft.ru/image/single/derevya_noch_nebo_116884_1920x1080.jpg'
  ];

  // Greeting
  greeting = [
    'Good morning!',
    'Good afternoon!',
    'Good evening!'
  ];

  constructor() { 
    setInterval(() => {
      this.date = new Date()
    }, 1000)
    this.month = new Date();
  }

  ngOnInit(): void {
    this.changeBackground();
  }

  changeBackground() {
    let data = new Date();
    if(data.getHours() < 12) {
      this.imgPath = this.morningImages[Math.floor(Math.random() * this.morningImages.length)];
      this.currentGreeting = this.greeting[0];
    } else if (data.getHours() < 18) {
      this.imgPath = this.afternoonImages[Math.floor(Math.random() * this.afternoonImages.length)];
      this.currentGreeting = this.greeting[1];
    } else {
      this.imgPath = this.nightImages[Math.floor(Math.random() * this.nightImages.length)];
      this.currentGreeting = this.greeting[2];
    }
    setInterval(() => {
      let data = new Date();
      if(data.getHours() < 12) {
        this.imgPath = this.morningImages[Math.floor(Math.random() * this.morningImages.length)];
        this.currentGreeting = this.greeting[0];
      } else if (data.getHours() < 18) {
        this.imgPath = this.afternoonImages[Math.floor(Math.random() * this.afternoonImages.length)];
        this.currentGreeting = this.greeting[1];
      } else {
        this.imgPath = this.nightImages[Math.floor(Math.random() * this.nightImages.length)];
        this.currentGreeting = this.greeting[2];
      }
      console.log("True");
      console.log(this.timer);    
    }, this.timer) 
  }

}
