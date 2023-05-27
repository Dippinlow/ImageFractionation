class cell{


    constructor(x, y, wid, hei, hs, ss, bs){

        //colorMode(HSB, 360, 100, 100);

        this.x = x;
        this.y = y;
        this.wid = wid;
        this.hei = hei;
        this.hs = hs;
        this.ss = ss;
        this.bs = bs;

    }

    show(){

        //this.h = this.hs[floor(this.hs.length / 2)];
        this.h = hueAverage(this.hs) / TWO_PI * 360;
        this.s = average(this.ss);
        this.b = average(this.bs);

        //window.print("h " + this.h);
        //window.print("s " + this.s);
        //window.print("b " + this.b);
        //this.h = 180;

        this.RGBValues = HSBToRGB(this.h, this.s, this.b);

        fill(this.RGBValues[0], this.RGBValues[1], this.RGBValues[2], 200);

        rect(this.x, this.y, this.wid, this.hei, this.wid/2);


    }

    
}