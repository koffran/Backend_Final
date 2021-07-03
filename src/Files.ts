const fs = require('fs');

export default class Files{
    path:string;
    constructor(path:string){
    this.path = path;
}

async save(data:any){

   fs.writeFile(this.path,JSON.stringify(data),(error:Error) =>{
       if(error){
           console.log(error);
           return
       }
   });                          
}

async read(){
    try{
       const data = await fs.promises.readFile(this.path,'utf-8')
       return data;

    }catch {
        return [];
    }        
}

async delete(){
        fs.unlink(this.path, (error:Error) =>{
            if (error) {
                console.log(error);
                return;
            }
        });
   
}
}