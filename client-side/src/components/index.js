var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var compiler = require("compilex");

var app = express();
app.use(bodyParser());
var option = { stats: true };
compiler.init(option);
app.get("/", function (req, res) {
    res.sendfile(__dirname + "/index.html");
});
app.post("/compilecode", function (req, res) {
    var code = req.body.code;
    var input = req.body.input;
    var inputRadio = req.body.inputRadio;
    var lang = req.body.lang;

    var ans = "";
    if (lang === "C" || lang === "C++") {
        if (inputRadio === "true") {
            var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } };
            compiler.compileCPPWithInput(envData, code, input, function (data) {
                res.send(data);
                ans += data
                console.log(ans)

            });
        } else {
            var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } };
            compiler.compileCPP(envData, code, function (data) {
                res.send(data)
                ans += data
                console.log(ans)

            });
        }
    }
    if (lang === "Python") {
        if (inputRadio === "true") {
            var envData = { OS: "windows", options: { timeout: 10 } };
            compiler.compilePythonWithInput(envData, code, input, function (data) {
                res.send(data)
                ans += data
                console.log(ans)

            });
        } else {
            var envData = { OS: "windows", options: { timeout: 10 } };
            compiler.compilePython(envData, code, function (data) {
                res.send(data)
                ans += data
                console.log(data.output)

            });
        }
    }
});
app.listen(8000);

compiler.flush(function () {

    console.log("All files flushed");
});


