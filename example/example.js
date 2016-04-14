#!/usr/bin/env node

var fs = require('fs');
var vagrant = require('../index');

process.env.NODE_DEBUG = true;

vagrant.globalStatus(function(err, out) {
    console.log(err, out);
});

vagrant.version(function(err, out) {
    console.log(err, out);
});

var machine = vagrant.create({ cwd: process.cwd(), env: process.env });

function onInit(err, out) {
    if(err) throw new Error(err);
    
    machine.on('progress', function() {
        console.log('download progress: ', [].slice.call(arguments));
    });

   machine.on('vagrant-progress', function(arguments) {
        console.log('Vagrant progress: ', arguments);
    });

    machine.up(function(err, out) {
        if(err) throw new Error(err);
        
        machine.status(function(err, out) {
            console.log(err, out);
            
            machine.sshConfig(function(err, out) {
                console.log(err, out);
            
                machine.suspend(function(err, out) {
                    console.log(err, out);
                    
                    machine.resume(function(err, out) {
                        console.log(err, out);
                        
                        machine.halt(function(err, out) {
                            console.log(err, out);
                        
                            machine.destroy(function(err, out) {
                                console.log(err, out);
                                
                                vagrant.globalStatus(function(err, out) {
                                    console.log(err, out);
                                });

                                fs.unlinkSync('./Vagrantfile')
                            });
                        });
                    });
                });
            });
        });
    });
}

machine.init('ubuntu/trusty64', onInit);

//*/
