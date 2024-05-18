export class TokenClass {


  public setData(key :any  , value : any){

    localStorage.setItem(key , JSON.stringify(value))

  }

  public getData(key : any){

   const data =  localStorage.getItem(key)

   return data ? JSON.parse(data) : null

  }

  public removeData(key :any ){

    localStorage.removeItem(key)

  }

}
