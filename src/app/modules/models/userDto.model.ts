export interface UserDto
{
     id? :number;
     email :string;  
     companyId?:number;   
     companyName?:string;     
     userName?:string;       
     firstName?:string;      
     lastName?:string;     
     externalId? :string;  
     roleName?:string;
     roleId?:string;
     isBlocked? :boolean;      
     isAcceptedTerms? :boolean;
     isInvited:boolean;
}