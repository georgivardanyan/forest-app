export enum Species {
  pine = 'pine',
  spruce = 'spruce',
  birch = 'birch',
  other = 'other',
}

export interface IForestStand {
  id: number
  lng: number
  lat: number
  main_species: Species
  relative_vol: number
  age: number
  size: number
}
