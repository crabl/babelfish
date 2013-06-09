#Babelfish

####An experiment with in-browser C++ code
Prerequisites
* Node.js
* Clang 3.2 & LLVM tools

####Installation

Install all prerequisites and then run:
```
git clone git@github.com:crabl/babelfish.git
cd babelfish
node app
```

Open a new Chrome window, and open the Chrome inspector (F12).
Navigate to http://localhost:8080/ and see what happens in Chrome inspector!

####Modification
If you wish to modify the code that gets executed, edit the views/test.html file.
Please note that Emscripten generates MASSIVE output files.