import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class Utility{

    isContainJson(data:any){
        try{
            JSON.parse(data);
        }
        catch(error){
            return false;
        }
        return true;
    }
    getRange(data:any){
        if(this.isContainJson(data)){
            let parseData=JSON.parse(data)[0];
            console.log(parseData);
            return {min:parseData.name,max:parseData.value}
        }
        return null;
    }
    getDDLists(data:any){
        if(this.isContainJson(data)){
            return JSON.parse(data);
           
        }
        return null;
    }
}