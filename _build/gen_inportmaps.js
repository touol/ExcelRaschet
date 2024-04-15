import glob from 'glob';
import fs from 'fs';
import path from 'path';

const emptyFolderRecursive = function (directoryPath) {
  if (fs.existsSync(directoryPath)) {
    fs.readdirSync(directoryPath).forEach((file, index) => {
      const curPath = path.join(directoryPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        emptyFolderRecursive(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    //fs.rmdirSync(directoryPath);
  }
};
emptyFolderRecursive('./_build/primevue/')

glob("./node_modules/primevue/**/*.esm.min.js", {}, function (er, files) {
  // files is an array of filenames.
  // If the `nonull` option is set, and nothing
  // was found, then files is ["**/*.js"]
  // er is an error object or null.
  // console.log(files)
  let packages = []
  let importmaps = {}
  files.forEach(function(entry) {
    let split = entry.split("/")
    split.splice(0, 1)
    split.splice(0, 1)
    let k = split.length - 1
    let file = split[k]
    split.splice(k, 1)
    //console.log(file);
    let name = split.join("/");
    file = split.join(".") + '.esm.min.js';
    //console.log(name);
    packages.push(name)
    importmaps[name] = file
    fs.copyFile(entry, './_build/primevue/'+file, (err) => {
      if (err) {
        console.log("Error Found:", err);
      }
    }); 
  });
  console.log(importmaps);
  fs.writeFile('./_build/primevue/importmaps.json', JSON.stringify(importmaps), function (err) {
    if (err) throw err;
    console.log('It\'s saved!');
  });
  fs.writeFile('./external_packages.json', JSON.stringify(packages), function (err) {
    if (err) throw err;
    console.log('It\'s saved!');
  });
  
})

