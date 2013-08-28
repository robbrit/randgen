var randgen = require("./lib/randgen"),
    assert = require('assert');

test_norms(1000, 5, 1);
test_norms(1000, 500, 100);
test_pois(1000, 5, 1);
test_pois(1000, 500, 100);
test_chisq(1000, 5, 1);
test_chisq(1000, 500, 100);
   
function test_norms(n, mu, sigma) {
  var norms, xbar;
  norms  = randgen.rvnorm(n, mu, sigma);
  xbar = mean(norms);

  assert.equal(
    Math.round(xbar/mu),
    1,
    "Generated normal population has xbar " + 
    xbar +  " is not close to its expected value, " + mu + "."
  );
}

function test_pois(n, lambda) {
  var pois, xbar;
  pois = randgen.rvpoisson(n, lambda);
  xbar = mean(pois);

  assert.equal(
    Math.round(xbar/lambda),
    1,
    "Poisson population mean " + xbar +
    " is not close to the expected value " + lambda + "."
  );
}

function test_chisq(n, k) {
  var chisq, xbar;
   
  chisq = randgen.rvchisq(1000, k);
  xbar = mean(chisq);

  assert.equal(
    Math.round(xbar/k),
    1,
    "Chi-squared population mean " + xbar +
    " is not close to expected value " + k + "."
  );
}

function test_cauchy(n, loc, scale) {
  var cauchy = randgen.rvcauchy(1000);
  // it's complicated
}

function mean(arr) {
  var s = arr.reduce(sum, 0);
  return s / arr.length;
}

function sum(lhs, rhs) {
  return lhs + rhs;
}
