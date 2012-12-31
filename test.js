var randgen = require("./lib/randgen");

var norms = randgen.rvnorm(200, 5, 1);
console.log("Normal:", randgen.histogram(norms));

var pois = randgen.rvpoisson(200, 5);
console.log("Poisson:", randgen.histogram(pois));

var chisq = randgen.rvchisq(200, 10);
console.log("Chisq:", randgen.histogram(chisq));

var cauchy = randgen.rvcauchy(200);
console.log("Cauchy:", randgen.histogram(cauchy));
