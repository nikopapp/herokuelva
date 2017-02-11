// this module is used for testing
module.exports.check = function check(x, out, message) {
    if (x == out) return;
    if (message) console.log("Test failed:", message);
    else console.log("Test failed: \nExpected", out, "\nActual: ", x);
    console.trace();
    process.exit(1);
}
