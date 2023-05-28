let img;
let density = 2; // how many sections to split the cell
let divisions = 1; // how many sections to subDivide

//let cells = [];
let hueValues = [];
let bValues = [];

let cells = [];

function preload(){
  img = loadImage("test1.jpg");
}

function setup() {
  //img.resize(400, 0);

  //colorMode(HSB, 255, 255, 255);
  createCanvas(img.width, img.height);
  noStroke();

  let hs = [];
  let ss = [];
  let bs = [];
  
  for(let x = 0; x < width; x++){
    for(let y = 0; y < height; y++){
      let c = img.get(x, y);

      let HSBValues = RGBToHSB(c[0], c[1], c[2]);
      hs.push(HSBValues[0]);
      ss.push(HSBValues[1]);
      bs.push(HSBValues[2]);
    }
  }
  
  //noLoop();
  //newCells.push(new cell(x, y, wid, hei, data));

  cells.push(new cell(0, 0, width, height, hs, ss, bs));

  //noLoop();
  //
  //image(img, 0, 0);
  //cells.push(img);
  //createCanvas(400, 400);
  //image(img, 0, 0);

  //procedure();
}

function draw() {

  //let theta = hueAverage(hueValues);
  //let h = map(theta, 0, TWO_PI, 0, 360);


  for(let i = 0; i < cells.length; i++){
    cells[i].show();
  }

  

  procedure();

  if(frameCount >= 10){
    //noLoop();
  }
  //window.print("Frame: " + frameCount);
 // background(0, 0, average(bValues));
}

function procedure(){
  let newCells = [];

  
  for(let i = 0; i < cells.length; i++){
    
    // for every cell
    let c = cells[i];

    let wid = c.wid / density;
    let hei = c.hei / density;

    //window.print(i);

    for(let j = 0; j < density; j++){


      for(let k = 0; k < density; k++){

        //window.print("deep");
        // for every new cell
        
        let y = c.y + hei * k;
        let x = c.x + wid * j;

        let hs = [];
        let ss = [];
        let bs = [];

        
        for(let xx = x; xx < x + wid; xx++){
          for(let yy = y; yy < y + hei; yy++){
            let c = img.get(xx, yy);

            let HSBValues = RGBToHSB(c[0], c[1], c[2]);
            hs.push(HSBValues[0]);
            ss.push(HSBValues[1]);
            bs.push(HSBValues[2]);
          }
        }
        
        //if(random(1) < 0.15) continue;

        let brightnessDeviation = getStandardDeviation(bs);
        if(brightnessDeviation < 4) continue;
        //window.print(brightnessDeviation);
        newCells.push(new cell(x, y, wid, hei, hs, ss, bs));
      
      }

    }
  }
  
  cells = [];
  for(let i = 0; i < newCells.length; i++){
    cells.push(newCells[i]);
  }
  
}

function average(values){

    let sum = 0;

    for(let i = 0; i < values.length; i++){
      sum += values[i];
    }

    return sum / values.length;

}

// https://iter.ca/post/hue-avg/#:~:text=Here%E2%80%99s%20the%20process%20to%20find%20one%20%28click%20it,of%20the%20average%20point%20is%20the%20circular%20average.
function hueAverage(hues) {
  // Convert each hue to a point on the unit circle
  const points = hues.map(hue => [Math.cos(hue / 360 * TWO_PI), Math.sin(hue / 360 * TWO_PI)]);

  // Find the average point
  const averagePoint = [
    points.reduce((prev, cur) => prev + cur[0], 0) / points.length, // x
    points.reduce((prev, cur) => prev + cur[1], 0) / points.length, // y
  ];

  // Get the angle of the average point
  return Math.atan2(averagePoint[1], averagePoint[0]);
}

function recursive( cell){

  // divide the cell according to the density

  // calculate each cells s.d

  // 



}

// https://stackoverflow.com/questions/7343890/standard-deviation-javascript
function getStandardDeviation (array) {
  const n = array.length
  const mean = array.reduce((a, b) => a + b) / n
  return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
}

//https://www.30secondsofcode.org/js/s/rgb-to-hsb/
const RGBToHSB = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const v = Math.max(r, g, b),
    n = v - Math.min(r, g, b);
  const h =
    n === 0 ? 0 : n && v === r ? (g - b) / n : v === g ? 2 + (b - r) / n : 4 + (r - g) / n;
  return [60 * (h < 0 ? h + 6 : h), v && (n / v) * 100, v * 100];
};

//https://www.30secondsofcode.org/js/s/hsb-to-rgb/
const HSBToRGB = (h, s, b) => {
  s /= 100;
  b /= 100;
  const k = (n) => (n + h / 60) % 6;
  const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
  return [255 * f(5), 255 * f(3), 255 * f(1)];
};
