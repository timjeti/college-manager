import * as PropertyJson  from './properties.json'
interface Prop{
  collegeName : String
}
export class Properties{
    private property : {} | undefined
    public getProperty(){
        this.property = PropertyJson
        return this.property
    }
}