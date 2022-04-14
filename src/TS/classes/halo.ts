class Halo{
    starts:Array<number>
    ends:Array<number>
    colors:Array<string>
    x:number
    y:number
    radius:number
    moving:false|number
    constructor(starts:Array<number>,ends:Array<number>,colors:Array<string>,parent:{x:number,y:number,radius:number},moving:false|number) {
        this.starts=starts
        this.ends=ends
        this.colors=colors
        this.isValid=this.checkForValidity()
        this.x=parent.x
        this.y=parent.y
        this.radius=parent.radius
        this.moving=moving
    }
    private checkForValidity() {
        if (this.starts.length!=this.ends.length){
            throw new Error("Starts And Ends length must be the same");
            return false;
        }
        if (this.starts.length!=this.colors.length){
            throw new Error("Starts And Colors length must be the same");
            return false;
        }
        if (this.colors.length!=this.ends.length){
            throw new Error("Colors And Ends length must be the same");
            return false
        }
        if (this.starts.some((value)=>{return value>TWOPI||value<0})){
            throw new Error("Starts must be in the range 0-2*PI");
            return false;
        }
        if (this.ends.some((value)=>{return value>TWOPI||value<0})){
            throw new Error("Ends must be in the range 0-2*PI");
            return false
        }

        return true;
    }
    public range(index) : Array<number> {
        return [this.starts[index], this.ends[index],this.colors[index]]
    }
    public updateVals(parent:{x:number,y:number,radius:number}){
        this.x=parent.x
        this.y=parent.y
        this.radius=parent.radius
    }
    public update(dt:number,parent:{x:number,y:number,radius:number}){
        this.updateVals(parent)
        this.step(dt)
        this.fix()
    }
    public step(dt:number){
        switch (this.moving) {
            case false:
                break;
            case 1:
                for (let index = 0; index < this.starts.length; index++) {
                    this.starts[index]+=0.01*dt
                    this.ends[index]+=0.01*dt
                }
            case 2:
                for (let index = 0; index < this.starts.length; index++) {
                    this.speed = random(-0.5, 2)
                    this.starts[index]+=0.01*dt*speed
                    this.ends[index]+=0.01*dt*speed
                }
            default:
                break;
        }
    }
    public fix(){
        this.ends=this.ends.map((value)=>{clip(value,0,TWOPI)})
        this.starts=this.starts.map((value)=>{clip(value,0,TWOPI)})
        if (Math.max(this.ends)<TWOPI){
            this.ends[this.ends.indexOf(Math.max(this.ends))] = TWOPI
        }
        if (Math.min(this.starts) > 0) {
            //set the min to zero, if it is not already.
            this.starts[this.starts.indexOf(Math.min(this.starts))] = 0
        }
    }
    /**
     * draw
     * @param {number} w
     * @param {CanvasRenderingContext2D} canvas 
     * 
     */
    public draw(width) {
        let canvas = c
        for (let index = 0; index < this.starts.length; index++) {
            canvas.fillStyle=this.colors[index]
            canvas.beginPath()
            canvas.arc(this.x, this.y, this.radius + map(index, 0, this.starts.length, 0, width * 2), this.starts[index], this.ends[index])
            canvas.closePath()
            canvas.fill()
            canvas.stroke()
        }
    }
    
}