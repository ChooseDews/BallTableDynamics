var odex = require('odex');


var s = new odex.Solver(4);
var system = function(x, y) {
    m1=1;
    m2=1;
    g=1;
    mu=0.05;

    return [
        y[1],
        (y[3]*y[3]*y[0] - g*m2/m1   -mu*g*y[1]/Math.sqrt(y[1]*y[1] + y[0]*y[0]*y[3]*y[3]) )*(1/(1+m2/m1)),          //y[3]*y[3]*y[0] - T/m,
        y[3],
        -2*y[3]*y[1]/y[0] - mu*g*y[3]/Math.sqrt(y[1]*y[1] + y[0]*y[0]*y[3]*y[3])
    ];
}

let initialValue = [1,0,0,1]
let time = 0;
let y;



module.exports = {
    step(dt){
        currentValues = y || initialValue;
        sol = s.solve(system, 0, currentValues, dt);   // final x value
        y = sol.y;
        time=time+dt;
        if(y[0] < 0.01){
            time=0;
            y=null;
        }
        return {...sol, time};
    },
    reset(initalVals){
        y=null;
        initialValue = initalVals;
        time=0;
    },
    reload(){
        time = 0;
        y=null;
    }
}
