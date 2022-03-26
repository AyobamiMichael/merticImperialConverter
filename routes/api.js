'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get(function (req, res){
     var input = req.query.input;
    var initNum = convertHandler.getNum(input);
     var initUnit = convertHandler.getUnit(input);
    let  initUnit1;
       if(initUnit === 'l' || initUnit === 'L'){
           initUnit1 = initUnit.toUpperCase();
       }else{
          initUnit1 = initUnit.toLowerCase();
       }
    
    var returnNum = convertHandler.convert(initNum,initUnit1);

    var returnUnit = convertHandler.getReturnUnit(initUnit1);

    var toString = convertHandler.getString(initNum, initUnit1, returnNum, returnUnit);



     if(initNum === 'invalid number' && initUnit1 === 'invalid unit'){
        res.json('invalid number and unit')
      }

     if(initNum === 'invalid number'){
        res.json('invalid number')
      }  
    
    if(initUnit1 === 'invalid unit'){
        res.json('invalid unit')
      }  
    

 let responseObject = {}
      responseObject['initNum'] = initNum
      responseObject['initUnit'] = initUnit1
      responseObject['returnNum'] = Number(returnNum)
      responseObject['returnUnit'] = returnUnit
      responseObject['string'] = toString
    
      res.json(responseObject)
      
    
    
  })
};

