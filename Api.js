const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const compiler = require("compilex");
const option = { stats: true };
compiler.init(option);

// Middleware
app.use(bodyParser.json());

// Routes
app.use(
  "/codemirror-5.65.16",
  express.static(
    "C:/Users/Alive/Downloads/Web development/Online-Compiler/codemirror-5.65.16"
  )
);

app.get("/", function (req, res) {
  compiler.flush(() => {
    console.log("deleted");
  })
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/compile", function (req, res) {
  var code = req.body.code;
  var input = req.body.input;
  var lang = req.body.lang;
  try {
    if (lang == "cpp") {
      if (!input) {
        var envData = { OS: "windows", cmd: "g++", option:{timeout: 10000} };
        compiler.compileCPP(envData, code, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "error" });
          }
        });
      } else {
        var envData = { OS: "windows", cmd: "g++", option:{timeout: 10000} };
        compiler.compileCPPWithInput(envData, code, input, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "error" });
          }
        });
      }
    } else if (lang == "java") {
      if (!input) {
        var envData = { OS: "windows" };
        compiler.compileJava(envData, code, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "error" });
          }
        });
      } else {
        var envData = { OS: "windows" };
        compiler.compileJavaWithInput(envData, code, input, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "error" });
          }
        });
      }
    } else if(lang== "python") {
      if (!input) {
        var envData = { OS: "windows" };
        compiler.compilePython(envData, code, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "error" });
          }
        });
      } else {
        var envData = { OS: "windows" };
        compiler.compilePythonWithInput(envData, code, input, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "error" });
          }
        });
      }
    }
  } catch (e) {
    console.log("error");
  }
});

// Start server
app.listen(8000);
