import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';

export interface Tile {
  name: string;
  cols: number;
  rows: number;
  url: string;
}

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss'],
})
export class ShowcaseComponent implements OnInit {
  constructor(private storageService: StorageService) {}

  tiles: Tile[] = [
    {
      name: 'top-right',
      url: 'https://images.wallpaperscraft.com/image/single/branch_flowering_cherry_106312_1280x800.jpg',
      cols: 3,
      rows: 1,
    },
    {
      name: 'top',
      url: 'https://images.wallpaperscraft.com/image/single/flower_close_up_leaves_85207_800x600.jpg',
      cols: 1,
      rows: 2,
    },
    {
      name: 'right',
      url: 'https://images.wallpaperscraft.com/image/single/child_river_dreams_127495_1366x768.jpg',
      cols: 1,
      rows: 1,
    },
    {
      name: 'bottom-right',
      url: 'https://images.wallpaperscraft.com/image/single/cocoa_marshmallow_plaid_118517_1366x768.jpg',
      cols: 1,
      rows: 1,
    },
    {
      name: 'bottom',
      url: 'https://images.wallpaperscraft.com/image/single/cyclists_sun_sky_102236_1280x720.jpg',
      cols: 1,
      rows: 1,
    },
    {
      name: 'bottom-left',
      url: 'https://images.wallpaperscraft.com/image/single/branches_leaves_frost_106020_2048x1436.jpg',
      cols: 2,
      rows: 2,
    },
    {
      name: 'left',
      url: 'https://images.wallpaperscraft.com/image/single/malayan_tiger_tiger_big_cat_894394_3835x2557.jpg',
      cols: 1,
      rows: 2,
    },
    {
      name: 'top-left',
      url: 'https://images.wallpaperscraft.com/image/single/algae_plant_macro_106345_1600x1200.jpg',
      cols: 1,
      rows: 3,
    },
    {
      name: 'bottom',
      url: 'https://images.wallpaperscraft.com/image/single/drops_dew_surface_49365_1920x1200.jpg',
      cols: 2,
      rows: 1,
    },
    {
      name: 'right',
      url: 'https://images.wallpaperscraft.com/image/single/flower_macro_blur_812007_1600x1200.jpg',
      cols: 1,
      rows: 1,
    },
  ];

  logged(): boolean {
    return this.storageService.isLoggedIn();
  }

  ngOnInit(): void {}
}
