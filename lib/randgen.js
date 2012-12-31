// Generate uniformly distributed random numbers
var runif = function(min, max){
  if (min === undefined){
    min = 0;
  }
  if (max === undefined){
    max = 1;
  }
  return Math.random() * (max - min) + min;
}

// Generate normally-distributed random nubmers
// Algorithm adapted from:
// http://c-faq.com/lib/gaussian.html
var rnorm = function(mean, stdev){
  if (mean === undefined){
    mean = 0.0;
  }
  if (stdev === undefined){
    stdev = 1.0;
  }
  if (rnorm.v2 === null){
    var u1, u2, v1, v2, s;
    do {
      u1 = Math.random();
      u2 = Math.random();

      v1 = 2 * u1 - 1;
      v2 = 2 * u2 - 1;
      s = v1 * v1 + v2 * v2;
    } while (s == 0 || s >= 1);

    rnorm.v2 = v2 * Math.sqrt(-2 * Math.log(s) / s);
    return stdev * v1 * Math.sqrt(-2 * Math.log(s) / s) + mean;
  } else {
    v2 = rnorm.v2;
    rnorm.v2 = null;
    return stdev * v2 + mean;
  }
}

rnorm.v2 = null;

// Generate Chi-square distributed random numbers
var rchisq = function(degreesOfFreedom) {
  if (degreesOfFreedom === undefined){
    degreesOfFreedom = 1;
  }
  var sum = 0.0;
  var z;
  for (var i = 0; i < degreesOfFreedom; i++){
    z = rnorm();
    sum += z * z;
  }

  return sum;
}

// Generate Poisson distributed random numbers
var rpoisson = function(lambda){
  if (lambda === undefined){
    lambda = 1;
  }
  var l = Math.exp(-lambda);
  var k = 0;
  var p = 1.0;
  do {
    k++;
    p *= Math.random();
  } while (p > l);

  return k - 1;
}

// Generate Cauchy distributed random numbers
var rcauchy = function(loc, scale){
  if (loc === undefined){
    loc = 0.0;
  }
  if (scale === undefined){
    scale = 1.0;
  }
  var n1 = rnorm();
  var n2;
  do {
    n2 = rnorm();
  } while (n2 == 0.0);

  return loc + scale * n1 / n2;
}

// Vectorize a random generator
var vectorize = function(generator){
  return function(){
    var n = arguments["0"];
    delete arguments["0"];
    var result = new Array(n);
    for (var i = 0; i < n; i++){
      result[i] = generator.apply(this, arguments);
    }
    return result;
  };
};

// Generate a histogram from a list of numbers
var histogram = function(data, binCount){
  binCount = binCount || 10;

  var max = Math.max.apply(this, data);
  var min = Math.min.apply(this, data);

  // edge case: max == min
  if (max == min){
    return [data.length];
  }

  var bins = new Array(binCount);

  // zero each bin
  for (var i = 0; i < binCount; i++){
    bins[i] = 0;
  }

  var scaled;
  for (var i = 0; i < data.length; i++){
    // scale it to be between 0 and 1
    scaled = (data[i] - min) / (max - min);

    // scale it up to the histogram size
    scaled *= binCount;

    // drop it in a bin
    scaled = Math.floor(scaled);

    // edge case: the max
    if (scaled == binCount) { scaled--; }

    bins[scaled]++;
  }

  return bins;
}

exports.runif = runif;
exports.rnorm = rnorm;
exports.rchisq = rchisq;
exports.rpoisson = rpoisson;
exports.rcauchy = rcauchy;

exports.rvunif = vectorize(runif);
exports.rvnorm = vectorize(rnorm);
exports.rvchisq = vectorize(rchisq);
exports.rvpoisson = vectorize(rpoisson);
exports.rvcauchy = vectorize(rcauchy);

exports.histogram = histogram;
