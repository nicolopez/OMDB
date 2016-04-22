var app = module.exports = require('appjs');
var fileRead = require('./file-read.js');
var fileManager = new fileRead('/home/nico/Documentos');
app.serveFilesFrom(__dirname + '/content');

var window = app.createWindow({
    width  : 800,
    height : 600,
    icons  : __dirname + '/content/icons'
});

window.on('create', function(){
    console.log("Window Created");
    // Logs for debugging
    console.log('first load------------_>' , fileManager.getFiles());
    console.log('refresh load ------>' , fileManager.getFiles('/home/nico/Imágenes', true));
    console.log('load cache------------_>' , fileManager.getFiles());

    window.frame.show();
    window.frame.center();
});

window.on('ready', function(){
    console.log("Window Ready");
    window.process = process;
    window.module = module;

    function F12(e){ return e.keyIdentifier === 'F12' }
    function Command_Option_J(e){ return e.keyCode === 74 && e.metaKey && e.altKey }

    window.addEventListener('keydown', function(e){
        if (F12(e) || Command_Option_J(e)) {
            window.frame.openDevTools();
        }
    });
});

window.on('close', function(){
    console.log("Window Closed");
});
