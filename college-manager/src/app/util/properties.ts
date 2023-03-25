import PropertyJson from './properties.json'


interface Prop{
  collegeName : String
}

export class Properties{
    private property : {}

    public getProperty(){
        this.property = PropertyJson
        return this.property
    }
    
}