import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class Utility{

    isContainJson(data:any){
        try{
            let parseData= JSON.parse(data);
            if(typeof(parseData) =='object')
                return true;
            else
                return false;
        }
        catch(error){
            return false;
        }
        return true;
    }
    generateGuid() : string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
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