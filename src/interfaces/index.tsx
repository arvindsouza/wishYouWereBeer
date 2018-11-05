export interface IBeerObject{
  beerName: string,
  desc: string,
  img: string,
  rating: number
}

export interface IData{
  id: string,
  data: IBeerObject
}

export interface IAction{
  type: string,
  payload: any
}

export interface IReduxState{
  beers: IData[]
}

export interface IErrors{
  beerName: string,
  desc: string
}
