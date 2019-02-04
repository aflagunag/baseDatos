var loopback = require('loopback');
var fs = require("fs");
var path = require('path');
var app = require(path.resolve(__dirname, '../server/server'));
var outputPath = path.resolve(__dirname, '../server/models');
var modelConfigPath = path.resolve(__dirname, '../server/model-config.json');
var ds = app.datasources.BASEDATOS;

var arreglo = [];

function schemaCB(err, schema) {
    if (schema) {
        console.log("Discover Schema success: " + schema.name);
        arreglo[schema.name] = {
            dataSource: ds.name,
            public: true
        };

        var path = outputPath + '\\' + convertModelNameToFileName(schema.name);
        fs.writeFile(path + '.json', JSON.stringify(schema, null, 2), function (err) {
            if (err) {
                console.log("Error guardando archivo .json : ", err);
            } else {
                //app.model(schema.name); // Register the model with app
                console.log("JSON saved to " + path);
                fs.writeFile(path + '.js', defaultJsFileContents(schema.name), function (err) {
                    if (err) {
                        console.log("Error guardando archivo .js: ", err);
                    } else {
                        console.log("ok js ");
                        //app.model(schema.name); // Register the model with app
                    }
                });
            }
        });
    }
    if (err) {
        console.error(err);
        return;
    }
    return;
};

function convertModelNameToFileName(modelName) {
    return modelName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
function defaultJsFileContents(modelName) {
    return '\'use strict\' \n\nmodule.exports = function(' + modelName + '){};'
}


function updateModelConfig(arreglo) {
    // var cfg = JSON.parse(fs.readFileSync(modelConfigPath));
    console.log("ds", ds.name);
    // cfg[schema.name] = {
    //     dataSource: ds.name,
    //     public: true
    // };
    //console.log("cfg", cfg);

    console.log("ARREGLO: ", arreglo);

    fs.writeFile(modelConfigPath, JSON.stringify(arreglo, null, 2), function (err) {
        if (err) {
            console.log(err);
        } else {
            //app.model(schema.name); // Register the model with app
            console.log("JSON saved to " + modelConfigPath);
        }
    });


}

function modelosCB(err, tablas) {
    if (err) { console.log(err); }
    else if (tablas) {
        console.log("Tablas: ", tablas);
        
        arreglo = JSON.parse(fs.readFileSync(modelConfigPath));
        console.log("LONGITUD: ", tablas.length);

        tablas.forEach(function (definicion) {
            console.log("iteracion: ", definicion.name);           
            ds.discoverSchema('AD_REF_LIST', { schema: 'BASEDATOS', associations: true, views: true }, schemaCB);
        });

       setTimeout(function () { updateModelConfig(arreglo) }, 7000);
    };
    //ds.disconnect();
} 


ds.discoverModelDefinitions({ schema: 'BASEDATOS' }, modelosCB);

//ds.discoverSchema('PRUEBA_RELACION', {schema:'prueba', associations:true, all:true},schemaCB);
//ds.discoverAndBuildModels('PRUEBA_RELACION', {schema:'prueba', relations: true, all:true , associations:true}, schemaCB);
