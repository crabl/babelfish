function add_new_script(data, textStatus, jqXHR) {
   var jsc = document.createElement('script'); jsc.type = 'text/javascript';
   jsc.innerHTML = data;
   var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(jsc, s);
}

function compile_cpp(script, i) {
   $.post("http://orion.crabl.net:8080/cpp", {"script": script}).done(function(data) {
	    add_new_script(data, i);
      });
}

$(document).ready(function() {
      console.log("Hello from Babelfish");
      var cppScripts = $("script[type='text/cpp']");

      for(var i = 0; i < cppScripts.length; i++) {
	 console.log("Compiling CPP");
	 compile_cpp(cppScripts[i].innerHTML, i);
      }
});