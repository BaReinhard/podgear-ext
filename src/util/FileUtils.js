import fs from 'fs';
import path from  'path';
import { classes } from '../const/const';
import Axios from 'axios';


/**
 *
 * @param {String} key this is the item, skill, etc name
 * @returns {String} path to image, if image cannot be found returns null
 */
function getImagePath(key){
    return new Promise((resolve,rej)=>{

    try{
        let fileName = trimName(key);
        let itemPath = path.resolve(`/img/${fileName}.gif`);
        let defaultPath = path.resolve(`${__dirname}/../img/default/${fileName}.png`);
        let basePath = path.resolve(`${__dirname}/../img/${fileName}.png`);
        let runePath = path.resolve(`${__dirname}/../img/runes/${fileName}.png`);
        let res = fileExists(itemPath);
        const reader = new FileReader();

// This fires after the blob has been read/loaded.
reader.addEventListener('loadend', (e) => {
  const text = e.srcElement.result;
  resolve(text);
});
reader.readAsText(res[1]);

        // if(fileExists(basePath)){
        //     return basePath
        // }else if(fileExists(defaultPath)){
        //     return defaultPath;
        // }else if(fileExists(itemPath)){
        //     return itemPath;
        // }else if(fileExists(runePath)){
        //     return runePath
        // }else{
        //     for(let cls of classes){
        //         let classPath = path.resolve(`${__dirname}/img/skills/${cls}/${fileName}.png`)
        //         if(fileExists(classPath)){
        //             return classPath
        //         }
        //     }
        //     return null;
        // }

    }catch(err){
        console.log(err);
        return null;
    }
})


}
function fileExists(filePath){
    // try{
    //     return require(`${filePath}`)
    // }catch(err){
    //     console.log("File Doesnt Exist: ",filePath, err)
    //     return false;
    // }
    
    if(filePath){
        let req = new XMLHttpRequest();
        req.open('GET',filePath,false);
        req.send();
        console.log("HERES MY REQ",req)
        var blob = new Blob ([req.response], {type: 'image/png'});
        return [req.status===200,blob]
    }
    return [false,null];
//     var reader = new FileReader();
    
// return new Promise((res,rej)=>{
//     reader.onloadend = function(evt) {

//         if(evt.target.result == null) {
//             console.log("Null")
//            res(false);
//         } else {
//             console.log(evt)
//             res(true)
//         }         
//     };
//     reader.readAsDataURL(filePath);
// })
}

function trimName(name){
    return name.toLowerCase().replace(/ /g,"_")
}
module.exports = {
    getImagePath, classes
}