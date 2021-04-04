var odex = require('odex');

let initialValue = [1,0,0,1]
let time = 0;
let y;

var s = new odex.Solver(4);
var system = function(x, y) {
    m1= initialValue[4] || 1;
    m2= initialValue[5] || 1;
    g=1;

    return [
        y[1],
        (y[3]*y[3]*y[0] - g*m2/m1)*(1/(1+m2/m1)),          //y[3]*y[3]*y[0] - T/m,
        y[3],
        -2*y[3]*y[1]/y[0]
    ];
}




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
