(function(global) {global.
__DEV__=true;

global.__BUNDLE_START_TIME__=Date.now();
})(typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
(function(global) {var 
modules=Object.create(null);
var inGuard=false;

function define(id,factory){
modules[id]={
factory:factory,
module:{exports:{}},
isInitialized:false,
hasError:false};


if(__DEV__){
babelHelpers.extends(modules[id].module,{
hot:{
acceptCallback:null,
accept:function(callback){
modules[id].module.hot.acceptCallback=callback;}}});}}






function _require(id){
var mod=modules[id];
if(mod&&mod.isInitialized){
return mod.module.exports;}


return requireImpl(id);}


function requireImpl(id){
if(global.ErrorUtils&&!inGuard){
inGuard=true;
var returnValue;
try{
returnValue=requireImpl.apply(this,arguments);}
catch(e){
global.ErrorUtils.reportFatalError(e);}

inGuard=false;
return returnValue;}


var mod=modules[id];
if(!mod){
var msg='Requiring unknown module "'+id+'"';
if(__DEV__){
msg+='. If you are sure the module is there, try restarting the packager or running "npm install".';}

throw new Error(msg);}


if(mod.hasError){
throw new Error(
'Requiring module "'+id+'" which threw an exception');}








if(__DEV__){var 
Systrace=_require.Systrace;}


try{


mod.isInitialized=true;

if(__DEV__){
Systrace.beginEvent('JS_require_'+id);}




mod.factory.call(global,global,_require,mod.module,mod.module.exports);

if(__DEV__){
Systrace.endEvent();}}

catch(e){
mod.hasError=true;
mod.isInitialized=false;
throw e;}


return mod.module.exports;}


if(__DEV__){
_require.Systrace={beginEvent:function(){},endEvent:function(){}};}


global.__d=define;
global.require=_require;

if(__DEV__){(function(){
function accept(id,factory,inverseDependencies){
var mod=modules[id];

if(!mod){
define(id,factory);
return true;}


if(!mod.module.hot){
console.warn(
'Cannot accept module because Hot Module Replacement '+
'API was not installed.');

return false;}



if(factory){
mod.factory=factory;}

mod.isInitialized=false;
_require(id);

if(mod.module.hot.acceptCallback){
mod.module.hot.acceptCallback();
return true;}else 
{

if(!inverseDependencies){
throw new Error('Undefined `inverseDependencies`');}



return acceptAll(inverseDependencies[id],inverseDependencies);}}



function acceptAll(modules,inverseDependencies){
if(modules.length===0){
return true;}


var notAccepted=modules.filter(function(module){
return !accept(module,undefined,inverseDependencies);});


var parents=[];
for(var i=0;i<notAccepted.length;i++){

if(inverseDependencies[notAccepted[i]].length===0){
return false;}


parents.pushAll(inverseDependencies[notAccepted[i]]);}


return acceptAll(parents,inverseDependencies);}


global.__accept=accept;})();}
})(typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
(function(global) {Object.

















assign=function(target,sources){
if(__DEV__){
if(target==null){
throw new TypeError('Object.assign target cannot be null or undefined');}

if(typeof target!=='object'&&typeof target!=='function'){
throw new TypeError(
'In this environment the target of assign MUST be an object.'+
'This error is a performance optimization and not spec compliant.');}}




for(var nextIndex=1;nextIndex<arguments.length;nextIndex++){
var nextSource=arguments[nextIndex];
if(nextSource==null){
continue;}


if(__DEV__){
if(typeof nextSource!=='object'&&
typeof nextSource!=='function'){
throw new TypeError(
'In this environment the sources for assign MUST be an object.'+
'This error is a performance optimization and not spec compliant.');}}








for(var key in nextSource){
if(__DEV__){
var hasOwnProperty=Object.prototype.hasOwnProperty;
if(!hasOwnProperty.call(nextSource,key)){
throw new TypeError(
'One of the sources for assign has an enumerable key on the '+
'prototype chain. This is an edge case that we do not support. '+
'This error is a performance optimization and not spec compliant.');}}



target[key]=nextSource[key];}}



return target;};
})(typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
(function(global) {var 

















inspect=function(){























function inspect(obj,opts){
var ctx={
seen:[],
stylize:stylizeNoColor};

return formatValue(ctx,obj,opts.depth);}


function stylizeNoColor(str,styleType){
return str;}


function arrayToHash(array){
var hash={};

array.forEach(function(val,idx){
hash[val]=true;});


return hash;}



function formatValue(ctx,value,recurseTimes){

var primitive=formatPrimitive(ctx,value);
if(primitive){
return primitive;}



var keys=Object.keys(value);
var visibleKeys=arrayToHash(keys);



if(isError(value)&&(
keys.indexOf('message')>=0||keys.indexOf('description')>=0)){
return formatError(value);}



if(keys.length===0){
if(isFunction(value)){
var name=value.name?': '+value.name:'';
return ctx.stylize('[Function'+name+']','special');}

if(isRegExp(value)){
return ctx.stylize(RegExp.prototype.toString.call(value),'regexp');}

if(isDate(value)){
return ctx.stylize(Date.prototype.toString.call(value),'date');}

if(isError(value)){
return formatError(value);}}



var base='',array=false,braces=['{','}'];


if(isArray(value)){
array=true;
braces=['[',']'];}



if(isFunction(value)){
var n=value.name?': '+value.name:'';
base=' [Function'+n+']';}



if(isRegExp(value)){
base=' '+RegExp.prototype.toString.call(value);}



if(isDate(value)){
base=' '+Date.prototype.toUTCString.call(value);}



if(isError(value)){
base=' '+formatError(value);}


if(keys.length===0&&(!array||value.length==0)){
return braces[0]+base+braces[1];}


if(recurseTimes<0){
if(isRegExp(value)){
return ctx.stylize(RegExp.prototype.toString.call(value),'regexp');}else 
{
return ctx.stylize('[Object]','special');}}



ctx.seen.push(value);

var output;
if(array){
output=formatArray(ctx,value,recurseTimes,visibleKeys,keys);}else 
{
output=keys.map(function(key){
return formatProperty(ctx,value,recurseTimes,visibleKeys,key,array);});}



ctx.seen.pop();

return reduceToSingleString(output,base,braces);}



function formatPrimitive(ctx,value){
if(isUndefined(value))
return ctx.stylize('undefined','undefined');
if(isString(value)){
var simple='\''+JSON.stringify(value).replace(/^"|"$/g,'').
replace(/'/g,"\\'").
replace(/\\"/g,'"')+'\'';
return ctx.stylize(simple,'string');}

if(isNumber(value))
return ctx.stylize(''+value,'number');
if(isBoolean(value))
return ctx.stylize(''+value,'boolean');

if(isNull(value))
return ctx.stylize('null','null');}



function formatError(value){
return '['+Error.prototype.toString.call(value)+']';}



function formatArray(ctx,value,recurseTimes,visibleKeys,keys){
var output=[];
for(var i=0,l=value.length;i<l;++i){
if(hasOwnProperty(value,String(i))){
output.push(formatProperty(ctx,value,recurseTimes,visibleKeys,
String(i),true));}else 
{
output.push('');}}


keys.forEach(function(key){
if(!key.match(/^\d+$/)){
output.push(formatProperty(ctx,value,recurseTimes,visibleKeys,
key,true));}});


return output;}



function formatProperty(ctx,value,recurseTimes,visibleKeys,key,array){
var name,str,desc;
desc=Object.getOwnPropertyDescriptor(value,key)||{value:value[key]};
if(desc.get){
if(desc.set){
str=ctx.stylize('[Getter/Setter]','special');}else 
{
str=ctx.stylize('[Getter]','special');}}else 

{
if(desc.set){
str=ctx.stylize('[Setter]','special');}}


if(!hasOwnProperty(visibleKeys,key)){
name='['+key+']';}

if(!str){
if(ctx.seen.indexOf(desc.value)<0){
if(isNull(recurseTimes)){
str=formatValue(ctx,desc.value,null);}else 
{
str=formatValue(ctx,desc.value,recurseTimes-1);}

if(str.indexOf('\n')>-1){
if(array){
str=str.split('\n').map(function(line){
return '  '+line;}).
join('\n').substr(2);}else 
{
str='\n'+str.split('\n').map(function(line){
return '   '+line;}).
join('\n');}}}else 


{
str=ctx.stylize('[Circular]','special');}}


if(isUndefined(name)){
if(array&&key.match(/^\d+$/)){
return str;}

name=JSON.stringify(''+key);
if(name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)){
name=name.substr(1,name.length-2);
name=ctx.stylize(name,'name');}else 
{
name=name.replace(/'/g,"\\'").
replace(/\\"/g,'"').
replace(/(^"|"$)/g,"'");
name=ctx.stylize(name,'string');}}



return name+': '+str;}



function reduceToSingleString(output,base,braces){
var numLinesEst=0;
var length=output.reduce(function(prev,cur){
numLinesEst++;
if(cur.indexOf('\n')>=0)numLinesEst++;
return prev+cur.replace(/\u001b\[\d\d?m/g,'').length+1;},
0);

if(length>60){
return braces[0]+(
base===''?'':base+'\n ')+
' '+
output.join(',\n  ')+
' '+
braces[1];}


return braces[0]+base+' '+output.join(', ')+' '+braces[1];}





function isArray(ar){
return Array.isArray(ar);}


function isBoolean(arg){
return typeof arg==='boolean';}


function isNull(arg){
return arg===null;}


function isNullOrUndefined(arg){
return arg==null;}


function isNumber(arg){
return typeof arg==='number';}


function isString(arg){
return typeof arg==='string';}


function isSymbol(arg){
return typeof arg==='symbol';}


function isUndefined(arg){
return arg===void 0;}


function isRegExp(re){
return isObject(re)&&objectToString(re)==='[object RegExp]';}


function isObject(arg){
return typeof arg==='object'&&arg!==null;}


function isDate(d){
return isObject(d)&&objectToString(d)==='[object Date]';}


function isError(e){
return isObject(e)&&(
objectToString(e)==='[object Error]'||e instanceof Error);}


function isFunction(arg){
return typeof arg==='function';}


function isPrimitive(arg){
return arg===null||
typeof arg==='boolean'||
typeof arg==='number'||
typeof arg==='string'||
typeof arg==='symbol'||
typeof arg==='undefined';}


function objectToString(o){
return Object.prototype.toString.call(o);}


function hasOwnProperty(obj,prop){
return Object.prototype.hasOwnProperty.call(obj,prop);}


return inspect;}();



var OBJECT_COLUMN_NAME='(index)';
var LOG_LEVELS={
trace:0,
info:1,
warn:2,
error:3};


function setupConsole(global){
if(!global.nativeLoggingHook){
return;}


function getNativeLogFunction(level){
return function(){
var str;
if(arguments.length===1&&typeof arguments[0]==='string'){
str=arguments[0];}else 
{
str=Array.prototype.map.call(arguments,function(arg){
return inspect(arg,{depth:10});}).
join(', ');}


var logLevel=level;
if(str.slice(0,9)==='Warning: '&&logLevel>=LOG_LEVELS.error){



logLevel=LOG_LEVELS.warn;}

global.nativeLoggingHook(str,logLevel);};}



var repeat=function(element,n){
return Array.apply(null,Array(n)).map(function(){return element;});};


function consoleTablePolyfill(rows){

if(!Array.isArray(rows)){
var data=rows;
rows=[];
for(var key in data){
if(data.hasOwnProperty(key)){
var row=data[key];
row[OBJECT_COLUMN_NAME]=key;
rows.push(row);}}}



if(rows.length===0){
global.nativeLoggingHook('',LOG_LEVELS.info);
return;}


var columns=Object.keys(rows[0]).sort();
var stringRows=[];
var columnWidths=[];



columns.forEach(function(k,i){
columnWidths[i]=k.length;
for(var j=0;j<rows.length;j++){
var cellStr=rows[j][k].toString();
stringRows[j]=stringRows[j]||[];
stringRows[j][i]=cellStr;
columnWidths[i]=Math.max(columnWidths[i],cellStr.length);}});





var joinRow=function(row,space){
var cells=row.map(function(cell,i){
var extraSpaces=repeat(' ',columnWidths[i]-cell.length).join('');
return cell+extraSpaces;});

space=space||' ';
return cells.join(space+'|'+space);};


var separators=columnWidths.map(function(columnWidth){
return repeat('-',columnWidth).join('');});

var separatorRow=joinRow(separators,'-');
var header=joinRow(columns);
var table=[header,separatorRow];

for(var i=0;i<rows.length;i++){
table.push(joinRow(stringRows[i]));}






global.nativeLoggingHook('\n'+table.join('\n'),LOG_LEVELS.info);}



var originalConsole=global.console;
var descriptor=Object.getOwnPropertyDescriptor(global,'console');
if(descriptor){
Object.defineProperty(global,'originalConsole',descriptor);}


var console={
error:getNativeLogFunction(LOG_LEVELS.error),
info:getNativeLogFunction(LOG_LEVELS.info),
log:getNativeLogFunction(LOG_LEVELS.info),
warn:getNativeLogFunction(LOG_LEVELS.warn),
trace:getNativeLogFunction(LOG_LEVELS.trace),
table:consoleTablePolyfill};



Object.defineProperty(global,'console',{
value:console,
configurable:descriptor?descriptor.configurable:true,
enumerable:descriptor?descriptor.enumerable:true,
writable:descriptor?descriptor.writable:true});





if(__DEV__&&originalConsole){
Object.keys(console).forEach(function(methodName){
var reactNativeMethod=console[methodName];
if(originalConsole[methodName]){
console[methodName]=function(){
originalConsole[methodName].apply(originalConsole,arguments);
reactNativeMethod.apply(console,arguments);};}});}}






if(typeof module!=='undefined'){
module.exports=setupConsole;}else 
{
setupConsole(global);}
})(typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
(function(global) {var 















ErrorUtils={
_inGuard:0,
_globalHandler:null,
setGlobalHandler:function(fun){
ErrorUtils._globalHandler=fun;},

getGlobalHandler:function(){
return ErrorUtils._globalHandler;},

reportError:function(error){
ErrorUtils._globalHandler&&ErrorUtils._globalHandler(error);},

reportFatalError:function(error){
ErrorUtils._globalHandler&&ErrorUtils._globalHandler(error,true);},

applyWithGuard:function(fun,context,args){
try{
ErrorUtils._inGuard++;
return fun.apply(context,args);}
catch(e){
ErrorUtils.reportError(e);}finally 
{
ErrorUtils._inGuard--;}},


applyWithGuardIfNeeded:function(fun,context,args){
if(ErrorUtils.inGuard()){
return fun.apply(context,args);}else 
{
ErrorUtils.applyWithGuard(fun,context,args);}},


inGuard:function(){
return ErrorUtils._inGuard;},

guard:function(fun,name,context){
if(typeof fun!=='function'){
console.warn('A function must be passed to ErrorUtils.guard, got ',fun);
return null;}

name=name||fun.name||'<generated guard>';
function guarded(){
return (
ErrorUtils.applyWithGuard(
fun,
context||this,
arguments,
null,
name));}




return guarded;}};


global.ErrorUtils=ErrorUtils;






function setupErrorGuard(){
var onError=function(e){
global.console.error('Error: '+e.message+', stack:\n'+e.stack);};

global.ErrorUtils.setGlobalHandler(onError);}


setupErrorGuard();
})(typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
(function(global) {if(











!String.prototype.startsWith){
String.prototype.startsWith=function(search){
'use strict';
if(this==null){
throw TypeError();}

var string=String(this);
var pos=arguments.length>1?
Number(arguments[1])||0:0;
var start=Math.min(Math.max(pos,0),string.length);
return string.indexOf(String(search),pos)===start;};}



if(!String.prototype.endsWith){
String.prototype.endsWith=function(search){
'use strict';
if(this==null){
throw TypeError();}

var string=String(this);
var stringLength=string.length;
var searchString=String(search);
var pos=arguments.length>1?
Number(arguments[1])||0:stringLength;
var end=Math.min(Math.max(pos,0),stringLength);
var start=end-searchString.length;
if(start<0){
return false;}

return string.lastIndexOf(searchString,start)===start;};}



if(!String.prototype.repeat){
String.prototype.repeat=function(count){
'use strict';
if(this==null){
throw TypeError();}

var string=String(this);
count=Number(count)||0;
if(count<0||count===Infinity){
throw RangeError();}

if(count===1){
return string;}

var result='';
while(count){
if(count&1){
result+=string;}

if(count>>=1){
string+=string;}}


return result;};}



if(!String.prototype.includes){
String.prototype.includes=function(search,start){
'use strict';
if(typeof start!=='number'){
start=0;}


if(start+search.length>this.length){
return false;}else 
{
return this.indexOf(search,start)!==-1;}};}
})(typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
(function(global) {function 









findIndex(predicate,context){
if(this==null){
throw new TypeError(
'Array.prototype.findIndex called on null or undefined');}


if(typeof predicate!=='function'){
throw new TypeError('predicate must be a function');}

var list=Object(this);
var length=list.length>>>0;
for(var i=0;i<length;i++){
if(predicate.call(context,list[i],i,list)){
return i;}}


return -1;}


if(!Array.prototype.findIndex){
Object.defineProperty(Array.prototype,'findIndex',{
enumerable:false,
writable:true,
configurable:true,
value:findIndex});}




if(!Array.prototype.find){
Object.defineProperty(Array.prototype,'find',{
enumerable:false,
writable:true,
configurable:true,
value:function(predicate,context){
if(this==null){
throw new TypeError(
'Array.prototype.find called on null or undefined');}


var index=findIndex.call(this,predicate,context);
return index===-1?undefined:this[index];}});}
})(typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
(function(global) {if(












!Array.from){
Array.from=function(arrayLike){
if(arrayLike==null){
throw new TypeError('Object is null or undefined');}



var mapFn=arguments[1];
var thisArg=arguments[2];

var C=this;
var items=Object(arrayLike);
var symbolIterator=typeof Symbol==='function'?typeof Symbol==='function'?
Symbol.iterator:'@@iterator':
'@@iterator';
var mapping=typeof mapFn==='function';
var usingIterator=typeof items[symbolIterator]==='function';
var key=0;
var ret;
var value;

if(usingIterator){
ret=typeof C==='function'?
new C():
[];
var it=items[symbolIterator]();
var next;

while(!(next=it.next()).done){
value=next.value;

if(mapping){
value=mapFn.call(thisArg,value,key);}


ret[key]=value;
key+=1;}


ret.length=key;
return ret;}


var len=items.length;
if(isNaN(len)||len<0){
len=0;}


ret=typeof C==='function'?
new C(len):
new Array(len);

while(key<len){
value=items[key];

if(mapping){
value=mapFn.call(thisArg,value,key);}


ret[key]=value;

key+=1;}


ret.length=key;
return ret;};}
})(typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
(function(global) {(






function(){

var hasOwnProperty=Object.prototype.hasOwnProperty;






if(typeof Object.entries!=='function'){
Object.entries=function(object){

if(object==null){
throw new TypeError('Object.entries called on non-object');}


var entries=[];
for(var key in object){
if(hasOwnProperty.call(object,key)){
entries.push([key,object[key]]);}}


return entries;};}








if(typeof Object.values!=='function'){
Object.values=function(object){

if(object==null){
throw new TypeError('Object.values called on non-object');}


var values=[];
for(var key in object){
if(hasOwnProperty.call(object,key)){
values.push(object[key]);}}


return values;};}})();
})(typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
(function(global) {var 
















babelHelpers=global.babelHelpers={};

babelHelpers.createRawReactElement=function(){
var REACT_ELEMENT_TYPE=typeof Symbol==="function"&&(typeof Symbol==="function"?Symbol.for:"@@for")&&(typeof Symbol==="function"?Symbol.for:"@@for")("react.element")||0xeac7;
return function createRawReactElement(type,key,props){
return {
$$typeof:REACT_ELEMENT_TYPE,
type:type,
key:key,
ref:null,
props:props,
_owner:null};};}();




babelHelpers.classCallCheck=function(instance,Constructor){
if(!(instance instanceof Constructor)){
throw new TypeError("Cannot call a class as a function");}};



babelHelpers.createClass=function(){
function defineProperties(target,props){
for(var i=0;i<props.length;i++){
var descriptor=props[i];
descriptor.enumerable=descriptor.enumerable||false;
descriptor.configurable=true;
if("value" in descriptor)descriptor.writable=true;
Object.defineProperty(target,descriptor.key,descriptor);}}



return function(Constructor,protoProps,staticProps){
if(protoProps)defineProperties(Constructor.prototype,protoProps);
if(staticProps)defineProperties(Constructor,staticProps);
return Constructor;};}();



babelHelpers.defineProperty=function(obj,key,value){
if(key in obj){
Object.defineProperty(obj,key,{
value:value,
enumerable:true,
configurable:true,
writable:true});}else 

{
obj[key]=value;}


return obj;};


babelHelpers._extends=babelHelpers.extends=Object.assign||function(target){
for(var i=1;i<arguments.length;i++){
var source=arguments[i];

for(var key in source){
if(Object.prototype.hasOwnProperty.call(source,key)){
target[key]=source[key];}}}




return target;};


babelHelpers.get=function get(object,property,receiver){
if(object===null)object=Function.prototype;
var desc=Object.getOwnPropertyDescriptor(object,property);

if(desc===undefined){
var parent=Object.getPrototypeOf(object);

if(parent===null){
return undefined;}else 
{
return get(parent,property,receiver);}}else 

if("value" in desc){
return desc.value;}else 
{
var getter=desc.get;

if(getter===undefined){
return undefined;}


return getter.call(receiver);}};



babelHelpers.inherits=function(subClass,superClass){
if(typeof superClass!=="function"&&superClass!==null){
throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}


subClass.prototype=Object.create(superClass&&superClass.prototype,{
constructor:{
value:subClass,
enumerable:false,
writable:true,
configurable:true}});


if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;};


babelHelpers.interopRequireDefault=function(obj){
return obj&&obj.__esModule?obj:{
default:obj};};



babelHelpers.interopRequireWildcard=function(obj){
if(obj&&obj.__esModule){
return obj;}else 
{
var newObj={};

if(obj!=null){
for(var key in obj){
if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}



newObj.default=obj;
return newObj;}};



babelHelpers.objectWithoutProperties=function(obj,keys){
var target={};

for(var i in obj){
if(keys.indexOf(i)>=0)continue;
if(!Object.prototype.hasOwnProperty.call(obj,i))continue;
target[i]=obj[i];}


return target;};


babelHelpers.possibleConstructorReturn=function(self,call){
if(!self){
throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}


return call&&(typeof call==="object"||typeof call==="function")?call:self;};


babelHelpers.slicedToArray=function(){
function sliceIterator(arr,i){
var _arr=[];
var _n=true;
var _d=false;
var _e=undefined;

try{
for(var _i=arr[typeof Symbol==="function"?Symbol.iterator:"@@iterator"](),_s;!(_n=(_s=_i.next()).done);_n=true){
_arr.push(_s.value);

if(i&&_arr.length===i)break;}}

catch(err){
_d=true;
_e=err;}finally 
{
try{
if(!_n&&_i["return"])_i["return"]();}finally 
{
if(_d)throw _e;}}



return _arr;}


return function(arr,i){
if(Array.isArray(arr)){
return arr;}else 
if((typeof Symbol==="function"?Symbol.iterator:"@@iterator") in Object(arr)){
return sliceIterator(arr,i);}else 
{
throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}();




babelHelpers.taggedTemplateLiteral=function(strings,raw){
return Object.freeze(Object.defineProperties(strings,{
raw:{
value:Object.freeze(raw)}}));};




babelHelpers.toArray=function(arr){
return Array.isArray(arr)?arr:Array.from(arr);};


babelHelpers.toConsumableArray=function(arr){
if(Array.isArray(arr)){
for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}

return arr2;}else 
{
return Array.from(arr);}};
})(typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
__d(0 /* zhihuzhuanlan/index.ios.js */, function(global, require, module, exports) {var _reactNative=require(339 /* react-native */);var _reactNative2=babelHelpers.interopRequireDefault(_reactNative);


var _app=require(345 /* ./app/app.js */);var _app2=babelHelpers.interopRequireDefault(_app);

var _reactRedux=require(635 /* react-redux */);

var _createStore=require(355 /* ./app/store/createStore.js */);var _createStore2=babelHelpers.interopRequireDefault(_createStore);var 


AppRegistry=_reactNative2.default.AppRegistry;var 
StatusBar=_reactNative2.default.StatusBar;


StatusBar.setBarStyle('default');

var zhihuzhuanlan=_reactNative2.default.createClass({displayName:'zhihuzhuanlan',
render:function(){
return (
_reactNative2.default.createElement(_reactRedux.Provider,{style:{flex:1},store:_createStore2.default},
_reactNative2.default.createElement(_app2.default,null)));}});





AppRegistry.registerComponent('zhihuzhuanlan',function(){return zhihuzhuanlan;});
});
__d(339 /* react-native/Libraries/react-native/react-native.js */, function(global, require, module, exports) {'use strict';












var ReactNative=babelHelpers.extends({

get ActivityIndicatorIOS(){return require(1 /* ActivityIndicatorIOS */);},
get ART(){return require(171 /* ReactNativeART */);},
get DatePickerIOS(){return require(173 /* DatePickerIOS */);},
get DrawerLayoutAndroid(){return require(174 /* DrawerLayoutAndroid */);},
get Image(){return require(175 /* Image */);},
get ImageEditor(){return require(176 /* ImageEditor */);},
get ImageStore(){return require(177 /* ImageStore */);},
get ListView(){return require(178 /* ListView */);},
get MapView(){return require(188 /* MapView */);},
get Modal(){return require(189 /* Modal */);},
get Navigator(){return require(190 /* Navigator */);},
get NavigatorIOS(){return require(206 /* NavigatorIOS */);},
get Picker(){return require(208 /* Picker */);},
get PickerIOS(){return require(209 /* PickerIOS */);},
get ProgressBarAndroid(){return require(211 /* ProgressBarAndroid */);},
get ProgressViewIOS(){return require(212 /* ProgressViewIOS */);},
get ScrollView(){return require(181 /* ScrollView */);},
get SegmentedControlIOS(){return require(213 /* SegmentedControlIOS */);},
get SliderIOS(){return require(214 /* SliderIOS */);},
get SnapshotViewIOS(){return require(215 /* SnapshotViewIOS */);},
get Switch(){return require(216 /* Switch */);},
get PullToRefreshViewAndroid(){return require(217 /* PullToRefreshViewAndroid */);},
get RecyclerViewBackedScrollView(){return require(218 /* RecyclerViewBackedScrollView */);},
get RefreshControl(){return require(219 /* RefreshControl */);},
get StatusBar(){return require(220 /* StatusBar */);},
get SwitchAndroid(){return require(221 /* SwitchAndroid */);},
get SwitchIOS(){return require(222 /* SwitchIOS */);},
get TabBarIOS(){return require(223 /* TabBarIOS */);},
get Text(){return require(225 /* Text */);},
get TextInput(){return require(230 /* TextInput */);},
get ToastAndroid(){return require(239 /* ToastAndroid */);},
get ToolbarAndroid(){return require(240 /* ToolbarAndroid */);},
get Touchable(){return require(226 /* Touchable */);},
get TouchableHighlight(){return require(241 /* TouchableHighlight */);},
get TouchableNativeFeedback(){return require(243 /* TouchableNativeFeedback */);},
get TouchableOpacity(){return require(244 /* TouchableOpacity */);},
get TouchableWithoutFeedback(){return require(237 /* TouchableWithoutFeedback */);},
get View(){return require(127 /* View */);},
get ViewPagerAndroid(){return require(251 /* ViewPagerAndroid */);},
get WebView(){return require(252 /* WebView */);},


get ActionSheetIOS(){return require(253 /* ActionSheetIOS */);},
get AdSupportIOS(){return require(254 /* AdSupportIOS */);},
get Alert(){return require(53 /* Alert */);},
get AlertIOS(){return require(54 /* AlertIOS */);},
get Animated(){return require(245 /* Animated */);},
get AppRegistry(){return require(255 /* AppRegistry */);},
get AppState(){return require(282 /* AppState */);},
get AppStateIOS(){return require(283 /* AppStateIOS */);},
get AsyncStorage(){return require(284 /* AsyncStorage */);},
get BackAndroid(){return require(285 /* BackAndroid */);},
get CameraRoll(){return require(286 /* CameraRoll */);},
get Clipboard(){return require(287 /* Clipboard */);},
get DatePickerAndroid(){return require(289 /* DatePickerAndroid */);},
get Dimensions(){return require(150 /* Dimensions */);},
get Easing(){return require(247 /* Easing */);},
get ImagePickerIOS(){return require(290 /* ImagePickerIOS */);},
get IntentAndroid(){return require(291 /* IntentAndroid */);},
get InteractionManager(){return require(113 /* InteractionManager */);},
get LayoutAnimation(){return require(292 /* LayoutAnimation */);},
get Linking(){return require(293 /* Linking */);},
get LinkingIOS(){return require(294 /* LinkingIOS */);},
get NavigationExperimental(){return require(295 /* NavigationExperimental */);},
get NetInfo(){return require(320 /* NetInfo */);},
get PanResponder(){return require(203 /* PanResponder */);},
get PixelRatio(){return require(149 /* PixelRatio */);},
get PushNotificationIOS(){return require(321 /* PushNotificationIOS */);},
get Settings(){return require(322 /* Settings */);},
get StatusBarIOS(){return require(323 /* StatusBarIOS */);},
get StyleSheet(){return require(148 /* StyleSheet */);},
get TimePickerAndroid(){return require(324 /* TimePickerAndroid */);},
get UIManager(){return require(10 /* UIManager */);},
get Vibration(){return require(325 /* Vibration */);},
get VibrationIOS(){return require(326 /* VibrationIOS */);},


get DeviceEventEmitter(){return require(22 /* RCTDeviceEventEmitter */);},
get NativeAppEventEmitter(){return require(90 /* RCTNativeAppEventEmitter */);},
get NativeModules(){return require(11 /* NativeModules */);},
get Platform(){return require(4 /* Platform */);},
get processColor(){return require(30 /* processColor */);},
get requireNativeComponent(){return require(146 /* requireNativeComponent */);},


get ColorPropType(){return require(134 /* ColorPropType */);},
get EdgeInsetsPropType(){return require(128 /* EdgeInsetsPropType */);},
get PointPropType(){return require(182 /* PointPropType */);},


addons:{
get LinkedStateMixin(){return require(327 /* LinkedStateMixin */);},
Perf:undefined,
get PureRenderMixin(){return require(305 /* ReactComponentWithPureRenderMixin */);},
get TestModule(){return require(11 /* NativeModules */).TestModule;},
TestUtils:undefined,
get batchedUpdates(){return require(75 /* ReactUpdates */).batchedUpdates;},
get cloneWithProps(){return require(333 /* cloneWithProps */);},
get createFragment(){return require(335 /* ReactFragment */).create;},
get update(){return require(336 /* update */);}}},




require(47 /* React */));


if(__DEV__){
Object.defineProperty(ReactNative.addons,'Perf',{
enumerable:true,
get:function(){return require(270 /* ReactDefaultPerf */);}});

Object.defineProperty(ReactNative.addons,'TestUtils',{
enumerable:true,
get:function(){return require(337 /* ReactTestUtils */);}});}



module.exports=ReactNative;
});
__d(1 /* ActivityIndicatorIOS */, function(global, require, module, exports) {'use strict';












var NativeMethodsMixin=require(2 /* NativeMethodsMixin */);
var PropTypes=require(41 /* ReactPropTypes */);
var React=require(47 /* React */);
var StyleSheet=require(148 /* StyleSheet */);
var View=require(127 /* View */);

var requireNativeComponent=require(146 /* requireNativeComponent */);

var GRAY='#999999';








var ActivityIndicatorIOS=React.createClass({displayName:'ActivityIndicatorIOS',
mixins:[NativeMethodsMixin],

propTypes:babelHelpers.extends({},
View.propTypes,{



animating:PropTypes.bool,



color:PropTypes.string,



hidesWhenStopped:PropTypes.bool,



size:PropTypes.oneOf([
'small',
'large']),






onLayout:PropTypes.func}),


getDefaultProps:function(){
return {
animating:true,
color:GRAY,
hidesWhenStopped:true,
size:'small'};},



render:function(){var _props=
this.props;var onLayout=_props.onLayout;var style=_props.style;var props=babelHelpers.objectWithoutProperties(_props,['onLayout','style']);
var sizeStyle=this.props.size==='large'?styles.sizeLarge:styles.sizeSmall;
return (
React.createElement(View,{
onLayout:onLayout,
style:[styles.container,style]},
React.createElement(RCTActivityIndicatorView,babelHelpers.extends({},props,{style:sizeStyle}))));}});





var styles=StyleSheet.create({
container:{
alignItems:'center',
justifyContent:'center'},

sizeSmall:{
width:20,
height:20},

sizeLarge:{
width:36,
height:36}});



var RCTActivityIndicatorView=requireNativeComponent(
'RCTActivityIndicatorView',
ActivityIndicatorIOS,
{nativeOnly:{activityIndicatorViewStyle:true}});


module.exports=ActivityIndicatorIOS;
});
__d(2 /* NativeMethodsMixin */, function(global, require, module, exports) {'use strict';












var ReactNativeAttributePayload=require(3 /* ReactNativeAttributePayload */);
var TextInputState=require(9 /* TextInputState */);
var UIManager=require(10 /* UIManager */);

var findNodeHandle=require(37 /* findNodeHandle */);
var invariant=require(363 /* fbjs/lib/invariant */);
























function warnForStyleProps(props,validAttributes){
for(var key in validAttributes.style){
if(!(validAttributes[key]||props[key]===undefined)){
console.error(
'You are setting the style `{ '+key+': ... }` as a prop. You '+
'should nest it in a style object. '+
'E.g. `{ style: { '+key+': ... } }`');}}}

















var NativeMethodsMixin={

















measure:function(callback){
UIManager.measure(
findNodeHandle(this),
mountSafeCallback(this,callback));},


















measureInWindow:function(callback){
UIManager.measureInWindow(
findNodeHandle(this),
mountSafeCallback(this,callback));},











measureLayout:function(
relativeToNativeNode,
onSuccess,
onFail)
{
UIManager.measureLayout(
findNodeHandle(this),
relativeToNativeNode,
mountSafeCallback(this,onFail),
mountSafeCallback(this,onSuccess));},









setNativeProps:function(nativeProps){
if(__DEV__){
warnForStyleProps(nativeProps,this.viewConfig.validAttributes);}


var updatePayload=ReactNativeAttributePayload.create(
nativeProps,
this.viewConfig.validAttributes);


UIManager.updateView(
findNodeHandle(this),
this.viewConfig.uiViewClassName,
updatePayload);},







focus:function(){
TextInputState.focusTextInput(findNodeHandle(this));},





blur:function(){
TextInputState.blurTextInput(findNodeHandle(this));}};



function throwOnStylesProp(component,props){
if(props.styles!==undefined){
var owner=component._owner||null;
var name=component.constructor.displayName;
var msg='`styles` is not a supported property of `'+name+'`, did '+
'you mean `style` (singular)?';
if(owner&&owner.constructor&&owner.constructor.displayName){
msg+='\n\nCheck the `'+owner.constructor.displayName+'` parent '+
' component.';}

throw new Error(msg);}}


if(__DEV__){



var NativeMethodsMixin_DEV=NativeMethodsMixin;
invariant(
!NativeMethodsMixin_DEV.componentWillMount&&
!NativeMethodsMixin_DEV.componentWillReceiveProps,
'Do not override existing functions.');

NativeMethodsMixin_DEV.componentWillMount=function(){
throwOnStylesProp(this,this.props);};

NativeMethodsMixin_DEV.componentWillReceiveProps=function(newProps){
throwOnStylesProp(this,newProps);};}







var mountSafeCallback=function(context,callback){
return function(){
if(!callback||context.isMounted&&!context.isMounted()){
return;}

return callback.apply(context,arguments);};};



module.exports=NativeMethodsMixin;
});
__d(3 /* ReactNativeAttributePayload */, function(global, require, module, exports) {'use strict';












var Platform=require(4 /* Platform */);

var deepDiffer=require(5 /* deepDiffer */);
var styleDiffer=require(6 /* styleDiffer */);
var flattenStyle=require(7 /* flattenStyle */);














function translateKey(propKey){
if(propKey==='transform'){




if(Platform.OS==='android'){
return 'decomposedMatrix';}else 
{
return 'transformMatrix';}}


return propKey;}


function defaultDiffer(prevProp,nextProp){
if(typeof nextProp!=='object'||nextProp===null){

return true;}else 
{

return deepDiffer(prevProp,nextProp);}}



function diffNestedProperty(
updatePayload,
prevProp,
nextProp,
validAttributes)
{





if(!styleDiffer(prevProp,nextProp)){
return updatePayload;}




var previousFlattenedStyle=flattenStyle(prevProp);
var nextFlattenedStyle=flattenStyle(nextProp);

if(!previousFlattenedStyle||!nextFlattenedStyle){
if(nextFlattenedStyle){
return addProperties(
updatePayload,
nextFlattenedStyle,
validAttributes);}


if(previousFlattenedStyle){
return clearProperties(
updatePayload,
previousFlattenedStyle,
validAttributes);}


return updatePayload;}



return diffProperties(
updatePayload,
previousFlattenedStyle,
nextFlattenedStyle,
validAttributes);}























function clearNestedProperty(
updatePayload,
prevProp,
validAttributes)
{

return diffNestedProperty(updatePayload,prevProp,{},validAttributes);}








function diffProperties(
updatePayload,
prevProps,
nextProps,
validAttributes)
{
var attributeConfig;
var nextProp;
var prevProp;

for(var propKey in nextProps){
attributeConfig=validAttributes[propKey];
if(!attributeConfig){
continue;}


var altKey=translateKey(propKey);
if(!validAttributes[altKey]){

altKey=propKey;}


if(updatePayload&&updatePayload[altKey]!==undefined){


continue;}

prevProp=prevProps[propKey];
nextProp=nextProps[propKey];



if(typeof nextProp==='function'){
nextProp=true;


if(typeof prevProp==='function'){
prevProp=true;}}



if(prevProp===nextProp){
continue;}



if(typeof attributeConfig!=='object'){

if(defaultDiffer(prevProp,nextProp)){

(updatePayload||(updatePayload={}))[altKey]=nextProp;}}else 

if(typeof attributeConfig.diff==='function'||
typeof attributeConfig.process==='function'){

var shouldUpdate=prevProp===undefined||(
typeof attributeConfig.diff==='function'?
attributeConfig.diff(prevProp,nextProp):
defaultDiffer(prevProp,nextProp));

if(shouldUpdate){
var nextValue=typeof attributeConfig.process==='function'?
attributeConfig.process(nextProp):
nextProp;
(updatePayload||(updatePayload={}))[altKey]=nextValue;}}else 

{

updatePayload=diffNestedProperty(
updatePayload,
prevProp,
nextProp,
attributeConfig);}}







for(var propKey in prevProps){
if(nextProps[propKey]!==undefined){
continue;}

attributeConfig=validAttributes[propKey];
if(!attributeConfig){
continue;}


prevProp=prevProps[propKey];
if(prevProp===undefined){
continue;}


if(typeof attributeConfig!=='object'||
typeof attributeConfig.diff==='function'||
typeof attributeConfig.process==='function'){



(updatePayload||(updatePayload={}))[translateKey(propKey)]=null;}else 
{



updatePayload=clearNestedProperty(
updatePayload,
prevProp,
attributeConfig);}}



return updatePayload;}





function addProperties(
updatePayload,
props,
validAttributes)
{
return diffProperties(updatePayload,{},props,validAttributes);}






function clearProperties(
updatePayload,
prevProps,
validAttributes)
{
return diffProperties(updatePayload,prevProps,{},validAttributes);}


var ReactNativeAttributePayload={

create:function(
props,
validAttributes)
{
return addProperties(
null,
props,
validAttributes);},



diff:function(
prevProps,
nextProps,
validAttributes)
{
return diffProperties(
null,
prevProps,
nextProps,
validAttributes);}};





module.exports=ReactNativeAttributePayload;
});
__d(4 /* Platform */, function(global, require, module, exports) {'use strict';













var Platform={
OS:'ios'};


module.exports=Platform;
});
__d(5 /* deepDiffer */, function(global, require, module, exports) {'use strict';















var deepDiffer=function(one,two){
if(one===two){

return false;}

if(typeof one==='function'&&typeof two==='function'){

return false;}

if(typeof one!=='object'||one===null){

return one!==two;}

if(typeof two!=='object'||two===null){


return true;}

if(one.constructor!==two.constructor){
return true;}

if(Array.isArray(one)){

var len=one.length;
if(two.length!==len){
return true;}

for(var ii=0;ii<len;ii++){
if(deepDiffer(one[ii],two[ii])){
return true;}}}else 


{
for(var key in one){
if(deepDiffer(one[key],two[key])){
return true;}}


for(var twoKey in two){


if(one[twoKey]===undefined&&two[twoKey]!==undefined){
return true;}}}



return false;};


module.exports=deepDiffer;
});
__d(6 /* styleDiffer */, function(global, require, module, exports) {'use strict';












var deepDiffer=require(5 /* deepDiffer */);

function styleDiffer(a,b){
return !styleEqual(a,b);}


function styleEqual(a,b){
if(!a){
return !b;}

if(!b){
return !a;}

if(typeof a!==typeof b){
return false;}

if(typeof a==='number'){
return a===b;}


if(Array.isArray(a)){
if(!Array.isArray(b)||a.length!==b.length){
return false;}

for(var i=0;i<a.length;++i){
if(!styleEqual(a[i],b[i])){
return false;}}


return true;}


for(var key in a){
if(deepDiffer(a[key],b[key])){
return false;}}



for(var key in b){
if(!a.hasOwnProperty(key)){
return false;}}



return true;}


module.exports=styleDiffer;
});
__d(7 /* flattenStyle */, function(global, require, module, exports) {'use strict';












var StyleSheetRegistry=require(8 /* StyleSheetRegistry */);
var invariant=require(363 /* fbjs/lib/invariant */);



function getStyle(style){
if(typeof style==='number'){
return StyleSheetRegistry.getStyleByID(style);}

return style;}


function flattenStyle(style){
if(!style){
return undefined;}

invariant(style!==true,'style may be false but not true');

if(!Array.isArray(style)){
return getStyle(style);}


var result={};
for(var i=0;i<style.length;++i){
var computedStyle=flattenStyle(style[i]);
if(computedStyle){
for(var key in computedStyle){
result[key]=computedStyle[key];

if(__DEV__){
var value=computedStyle[key];}}}}




return result;}


module.exports=flattenStyle;
});
__d(8 /* StyleSheetRegistry */, function(global, require, module, exports) {'use strict';












var styles={};
var uniqueID=1;
var emptyStyle={};var 

StyleSheetRegistry=function(){function StyleSheetRegistry(){babelHelpers.classCallCheck(this,StyleSheetRegistry);}babelHelpers.createClass(StyleSheetRegistry,null,[{key:'registerStyle',value:function registerStyle(
style){
var id=++uniqueID;
if(__DEV__){
Object.freeze(style);}

styles[id]=style;
return id;}},{key:'getStyleByID',value:function getStyleByID(


id){
if(!id){


return emptyStyle;}


var style=styles[id];
if(!style){
console.warn('Invalid style with id `'+id+'`. Skipping ...');
return emptyStyle;}

return style;}}]);return StyleSheetRegistry;}();



module.exports=StyleSheetRegistry;
});
__d(363 /* fbjs/lib/invariant.js */, function(global, require, module, exports) {'use strict';






















function invariant(condition,format,a,b,c,d,e,f){
if(process.env.NODE_ENV!=='production'){
if(format===undefined){
throw new Error('invariant requires an error message argument');}}



if(!condition){
var error;
if(format===undefined){
error=new Error('Minified exception occurred; use the non-minified dev environment '+'for the full error message and additional helpful warnings.');}else 
{
var args=[a,b,c,d,e,f];
var argIndex=0;
error=new Error(format.replace(/%s/g,function(){
return args[argIndex++];}));

error.name='Invariant Violation';}


error.framesToPop=1;
throw error;}}



module.exports=invariant;
});
__d(9 /* TextInputState */, function(global, require, module, exports) {'use strict';
















var Platform=require(4 /* Platform */);
var UIManager=require(10 /* UIManager */);

var TextInputState={



_currentlyFocusedID:null,





currentlyFocusedField:function(){
return this._currentlyFocusedID;},







focusTextInput:function(textFieldID){
if(this._currentlyFocusedID!==textFieldID&&textFieldID!==null){
this._currentlyFocusedID=textFieldID;
if(Platform.OS==='ios'){
UIManager.focus(textFieldID);}else 
if(Platform.OS==='android'){
UIManager.dispatchViewManagerCommand(
textFieldID,
UIManager.AndroidTextInput.Commands.focusTextInput,
null);}}},










blurTextInput:function(textFieldID){
if(this._currentlyFocusedID===textFieldID&&textFieldID!==null){
this._currentlyFocusedID=null;
if(Platform.OS==='ios'){
UIManager.blur(textFieldID);}else 
if(Platform.OS==='android'){
UIManager.dispatchViewManagerCommand(
textFieldID,
UIManager.AndroidTextInput.Commands.blurTextInput,
null);}}}};






module.exports=TextInputState;
});
__d(10 /* UIManager */, function(global, require, module, exports) {'use strict';












var UIManager=require(11 /* NativeModules */).UIManager;
var findNodeHandle=require(37 /* findNodeHandle */);

if(!UIManager.setChildren){




UIManager._cachedIndexArray=function(size){
var cachedResult=this._cachedIndexArray._cache[size];
if(!cachedResult){
var arr=[];
for(var i=0;i<size;i++){
arr[i]=i;}

this._cachedIndexArray._cache[size]=arr;
return arr;}else 
{
return cachedResult;}};


UIManager._cachedIndexArray._cache={};




UIManager.setChildren=function(containerTag,createdTags){
var indexes=this._cachedIndexArray(createdTags.length);
UIManager.manageChildren(containerTag,null,null,createdTags,indexes,null);};}



var _takeSnapshot=UIManager.takeSnapshot;


















UIManager.takeSnapshot=function _callee(
view,
options){return regeneratorRuntime.async(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:if(






_takeSnapshot){_context.next=3;break;}
console.warn('UIManager.takeSnapshot is not available on this platform');return _context.abrupt('return');case 3:


if(typeof view!=='number'&&view!=='window'){
view=findNodeHandle(view)||'window';}return _context.abrupt('return',

_takeSnapshot(view,options));case 5:case 'end':return _context.stop();}}},null,this);};


module.exports=UIManager;
});
__d(11 /* NativeModules */, function(global, require, module, exports) {'use strict';












var BatchedBridge=require(12 /* BatchedBridge */);
var RemoteModules=BatchedBridge.RemoteModules;

function normalizePrefix(moduleName){
return moduleName.replace(/^(RCT|RK)/,'');}





Object.keys(RemoteModules).forEach(function(moduleName){
var strippedName=normalizePrefix(moduleName);
if(RemoteModules['RCT'+strippedName]&&RemoteModules['RK'+strippedName]){
throw new Error(
'Module cannot be registered as both RCT and RK: '+moduleName);}


if(strippedName!==moduleName){
RemoteModules[strippedName]=RemoteModules[moduleName];
delete RemoteModules[moduleName];}});







var NativeModules={};
Object.keys(RemoteModules).forEach(function(moduleName){
Object.defineProperty(NativeModules,moduleName,{
enumerable:true,
get:function(){
var module=RemoteModules[moduleName];
if(module&&typeof module.moduleID==='number'&&global.nativeRequireModuleConfig){
var json=global.nativeRequireModuleConfig(moduleName);
var config=json&&JSON.parse(json);
module=config&&BatchedBridge.processModuleConfig(config,module.moduleID);
RemoteModules[moduleName]=module;}

return module;}});});













var UIManager=NativeModules.UIManager;
UIManager&&Object.keys(UIManager).forEach(function(viewName){
var viewConfig=UIManager[viewName];
if(viewConfig.Manager){(function(){
var constants=void 0;

Object.defineProperty(viewConfig,'Constants',{
enumerable:true,
get:function(){
if(constants){
return constants;}

constants={};
var viewManager=NativeModules[normalizePrefix(viewConfig.Manager)];
viewManager&&Object.keys(viewManager).forEach(function(key){
var value=viewManager[key];
if(typeof value!=='function'){
constants[key]=value;}});


return constants;}});


var commands=void 0;

Object.defineProperty(viewConfig,'Commands',{
enumerable:true,
get:function(){
if(commands){
return commands;}

commands={};
var viewManager=NativeModules[normalizePrefix(viewConfig.Manager)];
viewManager&&Object.keys(viewManager).forEach(function(key,index){
var value=viewManager[key];
if(typeof value==='function'){
commands[key]=index;}});


return commands;}});})();}});





module.exports=NativeModules;
});
__d(12 /* BatchedBridge */, function(global, require, module, exports) {'use strict';











var MessageQueue=require(13 /* MessageQueue */);

var BatchedBridge=new MessageQueue(
__fbBatchedBridgeConfig.remoteModuleConfig,
__fbBatchedBridgeConfig.localModulesConfig);




var Systrace=require(14 /* Systrace */);
var JSTimersExecution=require(17 /* JSTimersExecution */);

BatchedBridge.registerCallableModule('Systrace',Systrace);
BatchedBridge.registerCallableModule('JSTimersExecution',JSTimersExecution);

if(__DEV__){
BatchedBridge.registerCallableModule('HMRClient',require(20 /* HMRClient */));}








Object.defineProperty(global,'__fbBatchedBridge',{value:BatchedBridge});

module.exports=BatchedBridge;
});
__d(13 /* MessageQueue */, function(global, require, module, exports) {'use strict';














var Systrace=require(14 /* Systrace */);
var ErrorUtils=require(16 /* ErrorUtils */);
var JSTimersExecution=require(17 /* JSTimersExecution */);
var Platform=require(4 /* Platform */);

var invariant=require(363 /* fbjs/lib/invariant */);
var keyMirror=require(362 /* fbjs/lib/keyMirror */);
var stringifySafe=require(19 /* stringifySafe */);

var MODULE_IDS=0;
var METHOD_IDS=1;
var PARAMS=2;
var CALL_IDS=3;
var MIN_TIME_BETWEEN_FLUSHES_MS=5;

var TRACE_TAG_REACT_APPS=1<<17;

var SPY_MODE=false;

var MethodTypes=keyMirror({
remote:null,
remoteAsync:null});


var guard=function(fn){
try{
fn();}
catch(error){
ErrorUtils.reportFatalError(error);}};var 



MessageQueue=function(){

function MessageQueue(remoteModules,localModules){var _this=this;babelHelpers.classCallCheck(this,MessageQueue);
this.RemoteModules={};

this._callableModules={};
this._queue=[[],[],[],0];
this._moduleTable={};
this._methodTable={};
this._callbacks=[];
this._callbackID=0;
this._callID=0;
this._lastFlush=0;
this._eventLoopStartTime=new Date().getTime();

[
'invokeCallbackAndReturnFlushedQueue',
'callFunctionReturnFlushedQueue',
'flushedQueue'].
forEach(function(fn){return _this[fn]=_this[fn].bind(_this);});

var modulesConfig=this._genModulesConfig(remoteModules);
this._genModules(modulesConfig);
localModules&&this._genLookupTables(
this._genModulesConfig(localModules),this._moduleTable,this._methodTable);


this._debugInfo={};
this._remoteModuleTable={};
this._remoteMethodTable={};
this._genLookupTables(
modulesConfig,this._remoteModuleTable,this._remoteMethodTable);}babelHelpers.createClass(MessageQueue,[{key:'callFunctionReturnFlushedQueue',value:function callFunctionReturnFlushedQueue(






module,method,args){var _this2=this;
guard(function(){
_this2.__callFunction(module,method,args);
_this2.__callImmediates();});


return this.flushedQueue();}},{key:'invokeCallbackAndReturnFlushedQueue',value:function invokeCallbackAndReturnFlushedQueue(


cbID,args){var _this3=this;
guard(function(){
_this3.__invokeCallback(cbID,args);
_this3.__callImmediates();});


return this.flushedQueue();}},{key:'flushedQueue',value:function flushedQueue()


{
this.__callImmediates();

var queue=this._queue;
this._queue=[[],[],[],this._callID];
return queue[0].length?queue:null;}},{key:'processModuleConfig',value:function processModuleConfig(


config,moduleID){
var module=this._genModule(config,moduleID);
this._genLookup(config,moduleID,this._remoteModuleTable,this._remoteMethodTable);
return module;}},{key:'getEventLoopRunningTime',value:function getEventLoopRunningTime()


{
return new Date().getTime()-this._eventLoopStartTime;}},{key:'__callImmediates',value:function __callImmediates()






{
Systrace.beginEvent('JSTimersExecution.callImmediates()');
guard(function(){return JSTimersExecution.callImmediates();});
Systrace.endEvent();}},{key:'__nativeCall',value:function __nativeCall(


module,method,params,onFail,onSucc){
if(onFail||onSucc){

this._callbackID>1<<5&&(
this._debugInfo[this._callbackID>>5]=null);

this._debugInfo[this._callbackID>>1]=[module,method];
onFail&&params.push(this._callbackID);
this._callbacks[this._callbackID++]=onFail;
onSucc&&params.push(this._callbackID);
this._callbacks[this._callbackID++]=onSucc;}


global.nativeTraceBeginAsyncFlow&&
global.nativeTraceBeginAsyncFlow(TRACE_TAG_REACT_APPS,'native',this._callID);
this._callID++;

this._queue[MODULE_IDS].push(module);
this._queue[METHOD_IDS].push(method);
this._queue[PARAMS].push(params);

var now=new Date().getTime();
if(global.nativeFlushQueueImmediate&&
now-this._lastFlush>=MIN_TIME_BETWEEN_FLUSHES_MS){
global.nativeFlushQueueImmediate(this._queue);
this._queue=[[],[],[],this._callID];
this._lastFlush=now;}

Systrace.counterEvent('pending_js_to_native_queue',this._queue[0].length);
if(__DEV__&&SPY_MODE&&isFinite(module)){
console.log('JS->N : '+this._remoteModuleTable[module]+'.'+
this._remoteMethodTable[module][method]+'('+JSON.stringify(params)+')');}}},{key:'__callFunction',value:function __callFunction(



module,method,args){
this._lastFlush=new Date().getTime();
this._eventLoopStartTime=this._lastFlush;
if(isFinite(module)){
method=this._methodTable[module][method];
module=this._moduleTable[module];}

Systrace.beginEvent(module+'.'+method+'()');
if(__DEV__&&SPY_MODE){
console.log('N->JS : '+module+'.'+method+'('+JSON.stringify(args)+')');}

var moduleMethods=this._callableModules[module];
invariant(
!!moduleMethods,
'Module %s is not a registered callable module.',
module);

moduleMethods[method].apply(moduleMethods,args);
Systrace.endEvent();}},{key:'__invokeCallback',value:function __invokeCallback(


cbID,args){
this._lastFlush=new Date().getTime();
this._eventLoopStartTime=this._lastFlush;
var callback=this._callbacks[cbID];
var debug=this._debugInfo[cbID>>1];
var module=debug&&this._remoteModuleTable[debug[0]];
var method=debug&&this._remoteMethodTable[debug[0]][debug[1]];
invariant(
callback,'Callback with id '+
cbID+': '+module+'.'+method+'() not found');

var profileName=debug?'<callback for '+module+'.'+method+'>':cbID;
if(callback&&SPY_MODE&&__DEV__){
console.log('N->JS : '+profileName+'('+JSON.stringify(args)+')');}

Systrace.beginEvent('MessageQueue.invokeCallback('+
profileName+', '+stringifySafe(args)+')');
this._callbacks[cbID&~1]=null;
this._callbacks[cbID|1]=null;
callback.apply(null,args);
Systrace.endEvent();}},{key:'_genModulesConfig',value:function _genModulesConfig(











modules){
if(Array.isArray(modules)){
return modules;}else 
{
var moduleArray=[];
var moduleNames=Object.keys(modules);
for(var i=0,l=moduleNames.length;i<l;i++){
var moduleName=moduleNames[i];
var moduleConfig=modules[moduleName];
var _module=[moduleName];
if(moduleConfig.constants){
_module.push(moduleConfig.constants);}

var methodsConfig=moduleConfig.methods;
if(methodsConfig){
var methods=[];
var asyncMethods=[];
var methodNames=Object.keys(methodsConfig);
for(var j=0,ll=methodNames.length;j<ll;j++){
var methodName=methodNames[j];
var methodConfig=methodsConfig[methodName];
methods[methodConfig.methodID]=methodName;
if(methodConfig.type===MethodTypes.remoteAsync){
asyncMethods.push(methodConfig.methodID);}}


if(methods.length){
_module.push(methods);
if(asyncMethods.length){
_module.push(asyncMethods);}}}



moduleArray[moduleConfig.moduleID]=_module;}

return moduleArray;}}},{key:'_genLookupTables',value:function _genLookupTables(



modulesConfig,moduleTable,methodTable){var _this4=this;
modulesConfig.forEach(function(config,moduleID){
_this4._genLookup(config,moduleID,moduleTable,methodTable);});}},{key:'_genLookup',value:function _genLookup(



config,moduleID,moduleTable,methodTable){
if(!config){
return;}


var moduleName=void 0,methods=void 0;
if(moduleHasConstants(config)){var _config=babelHelpers.slicedToArray(
config,3);moduleName=_config[0];methods=_config[2];}else 
{var _config2=babelHelpers.slicedToArray(
config,2);moduleName=_config2[0];methods=_config2[1];}


moduleTable[moduleID]=moduleName;
methodTable[moduleID]=babelHelpers.extends({},methods);}},{key:'_genModules',value:function _genModules(


remoteModules){var _this5=this;
remoteModules.forEach(function(config,moduleID){
_this5._genModule(config,moduleID);});}},{key:'_genModule',value:function _genModule(



config,moduleID){var _this6=this;
if(!config){
return;}


var moduleName=void 0,constants=void 0,methods=void 0,asyncMethods=void 0;
if(moduleHasConstants(config)){var _config3=babelHelpers.slicedToArray(
config,4);moduleName=_config3[0];constants=_config3[1];methods=_config3[2];asyncMethods=_config3[3];}else 
{var _config4=babelHelpers.slicedToArray(
config,3);moduleName=_config4[0];methods=_config4[1];asyncMethods=_config4[2];}


var module={};
methods&&methods.forEach(function(methodName,methodID){
var methodType=
asyncMethods&&arrayContains(asyncMethods,methodID)?
MethodTypes.remoteAsync:MethodTypes.remote;
module[methodName]=_this6._genMethod(moduleID,methodID,methodType);});

babelHelpers.extends(module,constants);

if(!constants&&!methods&&!asyncMethods){
module.moduleID=moduleID;}


this.RemoteModules[moduleName]=module;
return module;}},{key:'_genMethod',value:function _genMethod(


module,method,type){
var fn=null;
var self=this;
if(type===MethodTypes.remoteAsync){
fn=function(){for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}
return new Promise(function(resolve,reject){
self.__nativeCall(
module,
method,
args,
function(data){
resolve(data);},

function(errorData){
var error=createErrorFromErrorData(errorData);
reject(error);});});};}else 



{
fn=function(){for(var _len2=arguments.length,args=Array(_len2),_key2=0;_key2<_len2;_key2++){args[_key2]=arguments[_key2];}
var lastArg=args.length>0?args[args.length-1]:null;
var secondLastArg=args.length>1?args[args.length-2]:null;
var hasSuccCB=typeof lastArg==='function';
var hasErrorCB=typeof secondLastArg==='function';
hasErrorCB&&invariant(
hasSuccCB,
'Cannot have a non-function arg after a function arg.');

var numCBs=hasSuccCB+hasErrorCB;
var onSucc=hasSuccCB?lastArg:null;
var onFail=hasErrorCB?secondLastArg:null;
args=args.slice(0,args.length-numCBs);
return self.__nativeCall(module,method,args,onFail,onSucc);};}


fn.type=type;
return fn;}},{key:'registerCallableModule',value:function registerCallableModule(


name,methods){
this._callableModules[name]=methods;}}]);return MessageQueue;}();




function moduleHasConstants(moduleArray){
return !Array.isArray(moduleArray[1]);}


function arrayContains(array,value){
return array.indexOf(value)!==-1;}


function createErrorFromErrorData(errorData){var 

message=

errorData.message;var extraErrorInfo=babelHelpers.objectWithoutProperties(errorData,['message']);
var error=new Error(message);
error.framesToPop=1;
return babelHelpers.extends(error,extraErrorInfo);}


module.exports=MessageQueue;
});
__d(14 /* Systrace */, function(global, require, module, exports) {'use strict';
























var GLOBAL=GLOBAL||this;
var TRACE_TAG_REACT_APPS=1<<17;
var TRACE_TAG_JSC_CALLS=1<<27;

var _enabled=false;
var _asyncCookie=0;
var _ReactPerf=null;
function ReactPerf(){
if(!_ReactPerf){
_ReactPerf=require(15 /* ReactPerf */);}

return _ReactPerf;}


var Systrace={
setEnabled:function(enabled){
if(_enabled!==enabled){
if(enabled){
global.nativeTraceBeginLegacy&&global.nativeTraceBeginLegacy(TRACE_TAG_JSC_CALLS);}else 
{
global.nativeTraceEndLegacy&&global.nativeTraceEndLegacy(TRACE_TAG_JSC_CALLS);}}


_enabled=enabled;

ReactPerf().enableMeasure=enabled;},





beginEvent:function(profileName){
if(_enabled){
profileName=typeof profileName==='function'?
profileName():profileName;
global.nativeTraceBeginSection(TRACE_TAG_REACT_APPS,profileName);}},



endEvent:function(){
if(_enabled){
global.nativeTraceEndSection(TRACE_TAG_REACT_APPS);}},








beginAsyncEvent:function(profileName){
var cookie=_asyncCookie;
if(_enabled){
_asyncCookie++;
profileName=typeof profileName==='function'?
profileName():profileName;
global.nativeTraceBeginAsyncSection(TRACE_TAG_REACT_APPS,profileName,cookie,0);}

return cookie;},


endAsyncEvent:function(profileName,cookie){
if(_enabled){
profileName=typeof profileName==='function'?
profileName():profileName;
global.nativeTraceEndAsyncSection(TRACE_TAG_REACT_APPS,profileName,cookie,0);}},






counterEvent:function(profileName,value){
if(_enabled){
profileName=typeof profileName==='function'?
profileName():profileName;
global.nativeTraceCounter&&
global.nativeTraceCounter(TRACE_TAG_REACT_APPS,profileName,value);}},



reactPerfMeasure:function(objName,fnName,func){
return function(component){
if(!_enabled){
return func.apply(this,arguments);}


var name=objName==='ReactCompositeComponent'&&this.getName()||'';
Systrace.beginEvent(objName+'.'+fnName+'('+name+')');
var ret=func.apply(this,arguments);
Systrace.endEvent();
return ret;};},



swizzleReactPerf:function(){
ReactPerf().injection.injectMeasure(Systrace.reactPerfMeasure);},






attachToRelayProfiler:function(relayProfiler){
relayProfiler.attachProfileHandler('*',function(name){
var cookie=Systrace.beginAsyncEvent(name);
return function(){
Systrace.endAsyncEvent(name,cookie);};});



relayProfiler.attachAggregateHandler('*',function(name,callback){
Systrace.beginEvent(name);
callback();
Systrace.endEvent();});},





swizzleJSON:function(){
Systrace.measureMethods(JSON,'JSON',[
'parse',
'stringify']);},











measureMethods:function(object,objectName,methodNames){
if(!__DEV__){
return;}


methodNames.forEach(function(methodName){
object[methodName]=Systrace.measure(
objectName,
methodName,
object[methodName]);});},













measure:function(objName,fnName,func){
if(!__DEV__){
return func;}


var profileName=objName+'.'+fnName;
return function(){
if(!_enabled){
return func.apply(this,arguments);}


Systrace.beginEvent(profileName);
var ret=func.apply(this,arguments);
Systrace.endEvent();
return ret;};}};




Systrace.setEnabled(global.__RCTProfileIsProfiling||false);

if(__DEV__){




require.Systrace=Systrace;}


module.exports=Systrace;
});
__d(15 /* ReactPerf */, function(global, require, module, exports) {'use strict';

















var ReactPerf={




enableMeasure:false,





storedMeasure:_noMeasure,






measureMethods:function(object,objectName,methodNames){
if(process.env.NODE_ENV!=='production'){
for(var key in methodNames){
if(!methodNames.hasOwnProperty(key)){
continue;}

object[key]=ReactPerf.measure(objectName,methodNames[key],object[key]);}}},












measure:function(objName,fnName,func){
if(process.env.NODE_ENV!=='production'){
var measuredFunc=null;
var wrapper=function(){
if(ReactPerf.enableMeasure){
if(!measuredFunc){
measuredFunc=ReactPerf.storedMeasure(objName,fnName,func);}

return measuredFunc.apply(this,arguments);}

return func.apply(this,arguments);};

wrapper.displayName=objName+'_'+fnName;
return wrapper;}

return func;},


injection:{



injectMeasure:function(measure){
ReactPerf.storedMeasure=measure;}}};












function _noMeasure(objName,fnName,func){
return func;}


module.exports=ReactPerf;
});
__d(16 /* ErrorUtils */, function(global, require, module, exports) {var 











GLOBAL=this;













module.exports=GLOBAL.ErrorUtils;
});
__d(17 /* JSTimersExecution */, function(global, require, module, exports) {'use strict';











var invariant=require(363 /* fbjs/lib/invariant */);
var keyMirror=require(362 /* fbjs/lib/keyMirror */);
var performanceNow=require(361 /* fbjs/lib/performanceNow */);
var warning=require(368 /* fbjs/lib/warning */);
var Systrace=require(14 /* Systrace */);






var JSTimersExecution={
GUID:1,
Type:keyMirror({
setTimeout:null,
setInterval:null,
requestAnimationFrame:null,
setImmediate:null}),



callbacks:[],
types:[],
timerIDs:[],
immediates:[],






callTimer:function(timerID){
warning(timerID<=JSTimersExecution.GUID,'Tried to call timer with ID '+timerID+' but no such timer exists');
var timerIndex=JSTimersExecution.timerIDs.indexOf(timerID);





if(timerIndex===-1){
return;}

var type=JSTimersExecution.types[timerIndex];
var callback=JSTimersExecution.callbacks[timerIndex];


if(type===JSTimersExecution.Type.setTimeout||
type===JSTimersExecution.Type.setImmediate||
type===JSTimersExecution.Type.requestAnimationFrame){
JSTimersExecution._clearIndex(timerIndex);}


try{
if(type===JSTimersExecution.Type.setTimeout||
type===JSTimersExecution.Type.setInterval||
type===JSTimersExecution.Type.setImmediate){
callback();}else 
if(type===JSTimersExecution.Type.requestAnimationFrame){
var currentTime=performanceNow();
callback(currentTime);}else 
{
console.error('Tried to call a callback with invalid type: '+type);
return;}}

catch(e){

JSTimersExecution.errors=JSTimersExecution.errors||[];
JSTimersExecution.errors.push(e);}},







callTimers:function(timerIDs){
invariant(timerIDs.length!==0,'Probably shouldn\'t call "callTimers" with no timerIDs');

JSTimersExecution.errors=null;
timerIDs.forEach(JSTimersExecution.callTimer);

var errors=JSTimersExecution.errors;
if(errors){
var errorCount=errors.length;
if(errorCount>1){


for(var ii=1;ii<errorCount;ii++){
require(18 /* JSTimers */).setTimeout(
function(error){throw error;}.bind(null,errors[ii]),
0);}}



throw errors[0];}},







callImmediatesPass:function(){
Systrace.beginEvent('JSTimersExecution.callImmediatesPass()');



if(JSTimersExecution.immediates.length>0){
var passImmediates=JSTimersExecution.immediates.slice();
JSTimersExecution.immediates=[];



for(var i=0;i<passImmediates.length;++i){
JSTimersExecution.callTimer(passImmediates[i]);}}



Systrace.endEvent();

return JSTimersExecution.immediates.length>0;},






callImmediates:function(){
JSTimersExecution.errors=null;
while(JSTimersExecution.callImmediatesPass()){}
if(JSTimersExecution.errors){
JSTimersExecution.errors.forEach(function(error){return (
require(18 /* JSTimers */).setTimeout(function(){throw error;},0));});}},




_clearIndex:function(i){
JSTimersExecution.timerIDs[i]=null;
JSTimersExecution.callbacks[i]=null;
JSTimersExecution.types[i]=null;}};



module.exports=JSTimersExecution;
});
__d(362 /* fbjs/lib/keyMirror.js */, function(global, require, module, exports) {'use strict';












var invariant=require(363 /* ./invariant */);



















var keyMirror=function(obj){
var ret={};
var key;
!(obj instanceof Object&&!Array.isArray(obj))?process.env.NODE_ENV!=='production'?invariant(false,'keyMirror(...): Argument must be an object.'):invariant(false):undefined;
for(key in obj){
if(!obj.hasOwnProperty(key)){
continue;}

ret[key]=key;}

return ret;};


module.exports=keyMirror;
});
__d(361 /* fbjs/lib/performanceNow.js */, function(global, require, module, exports) {'use strict';












var performance=require(366 /* ./performance */);

var performanceNow;






if(performance.now){
performanceNow=function(){
return performance.now();};}else 

{
performanceNow=function(){
return Date.now();};}



module.exports=performanceNow;
});
__d(366 /* fbjs/lib/performance.js */, function(global, require, module, exports) {'use strict';












var ExecutionEnvironment=require(367 /* ./ExecutionEnvironment */);

var performance;

if(ExecutionEnvironment.canUseDOM){
performance=window.performance||window.msPerformance||window.webkitPerformance;}


module.exports=performance||{};
});
__d(367 /* fbjs/lib/ExecutionEnvironment.js */, function(global, require, module, exports) {'use strict';











var canUseDOM=!!(typeof window!=='undefined'&&window.document&&window.document.createElement);







var ExecutionEnvironment={

canUseDOM:canUseDOM,

canUseWorkers:typeof Worker!=='undefined',

canUseEventListeners:canUseDOM&&!!(window.addEventListener||window.attachEvent),

canUseViewport:canUseDOM&&!!window.screen,

isInWorker:!canUseDOM};



module.exports=ExecutionEnvironment;
});
__d(368 /* fbjs/lib/warning.js */, function(global, require, module, exports) {'use strict';











var emptyFunction=require(369 /* ./emptyFunction */);








var warning=emptyFunction;

if(process.env.NODE_ENV!=='production'){
warning=function(condition,format){
for(var _len=arguments.length,args=Array(_len>2?_len-2:0),_key=2;_key<_len;_key++){
args[_key-2]=arguments[_key];}


if(format===undefined){
throw new Error('`warning(condition, format, ...args)` requires a warning '+'message argument');}


if(format.indexOf('Failed Composite propType: ')===0){
return;}


if(!condition){
var argIndex=0;
var message='Warning: '+format.replace(/%s/g,function(){
return args[argIndex++];});

if(typeof console!=='undefined'){
console.error(message);}

try{



throw new Error(message);}
catch(x){}}};}




module.exports=warning;
});
__d(369 /* fbjs/lib/emptyFunction.js */, function(global, require, module, exports) {"use strict";











function makeEmptyFunction(arg){
return function(){
return arg;};}








function emptyFunction(){}

emptyFunction.thatReturns=makeEmptyFunction;
emptyFunction.thatReturnsFalse=makeEmptyFunction(false);
emptyFunction.thatReturnsTrue=makeEmptyFunction(true);
emptyFunction.thatReturnsNull=makeEmptyFunction(null);
emptyFunction.thatReturnsThis=function(){
return this;};

emptyFunction.thatReturnsArgument=function(arg){
return arg;};


module.exports=emptyFunction;
});
__d(18 /* JSTimers */, function(global, require, module, exports) {'use strict';













var RCTTiming=require(11 /* NativeModules */).Timing;
var JSTimersExecution=require(17 /* JSTimersExecution */);






var JSTimers={
Types:JSTimersExecution.Types,





_getFreeIndex:function(){
var freeIndex=JSTimersExecution.timerIDs.indexOf(null);
if(freeIndex===-1){
freeIndex=JSTimersExecution.timerIDs.length;}

return freeIndex;},






setTimeout:function(func,duration){for(var _len=arguments.length,args=Array(_len>2?_len-2:0),_key=2;_key<_len;_key++){args[_key-2]=arguments[_key];}
var newID=JSTimersExecution.GUID++;
var freeIndex=JSTimers._getFreeIndex();
JSTimersExecution.timerIDs[freeIndex]=newID;
JSTimersExecution.callbacks[freeIndex]=function(){
return func.apply(undefined,args);};

JSTimersExecution.types[freeIndex]=JSTimersExecution.Type.setTimeout;
RCTTiming.createTimer(newID,duration||0,Date.now(),false);
return newID;},






setInterval:function(func,duration){for(var _len2=arguments.length,args=Array(_len2>2?_len2-2:0),_key2=2;_key2<_len2;_key2++){args[_key2-2]=arguments[_key2];}
var newID=JSTimersExecution.GUID++;
var freeIndex=JSTimers._getFreeIndex();
JSTimersExecution.timerIDs[freeIndex]=newID;
JSTimersExecution.callbacks[freeIndex]=function(){
return func.apply(undefined,args);};

JSTimersExecution.types[freeIndex]=JSTimersExecution.Type.setInterval;
RCTTiming.createTimer(newID,duration||0,Date.now(),true);
return newID;},






setImmediate:function(func){for(var _len3=arguments.length,args=Array(_len3>1?_len3-1:0),_key3=1;_key3<_len3;_key3++){args[_key3-1]=arguments[_key3];}
var newID=JSTimersExecution.GUID++;
var freeIndex=JSTimers._getFreeIndex();
JSTimersExecution.timerIDs[freeIndex]=newID;
JSTimersExecution.callbacks[freeIndex]=function(){
return func.apply(undefined,args);};

JSTimersExecution.types[freeIndex]=JSTimersExecution.Type.setImmediate;
JSTimersExecution.immediates.push(newID);
return newID;},





requestAnimationFrame:function(func){
var newID=JSTimersExecution.GUID++;
var freeIndex=JSTimers._getFreeIndex();
JSTimersExecution.timerIDs[freeIndex]=newID;
JSTimersExecution.callbacks[freeIndex]=func;
JSTimersExecution.types[freeIndex]=JSTimersExecution.Type.requestAnimationFrame;
RCTTiming.createTimer(newID,1,Date.now(),false);
return newID;},


clearTimeout:function(timerID){
JSTimers._clearTimerID(timerID);},


clearInterval:function(timerID){
JSTimers._clearTimerID(timerID);},


clearImmediate:function(timerID){
JSTimers._clearTimerID(timerID);
var index=JSTimersExecution.immediates.indexOf(timerID);
if(index!==-1){
JSTimersExecution.immediates.splice(index,1);}},



cancelAnimationFrame:function(timerID){
JSTimers._clearTimerID(timerID);},


_clearTimerID:function(timerID){


if(timerID==null){
return;}


var index=JSTimersExecution.timerIDs.indexOf(timerID);

if(index!==-1){
JSTimersExecution._clearIndex(index);
if(JSTimersExecution.types[index]!==JSTimersExecution.Type.setImmediate){
RCTTiming.deleteTimer(timerID);}}}};





module.exports=JSTimers;
});
__d(19 /* stringifySafe */, function(global, require, module, exports) {'use strict';
















function stringifySafe(arg){
var ret;
var type=typeof arg;
if(arg===undefined){
ret='undefined';}else 
if(arg===null){
ret='null';}else 
if(type==='string'){
ret='"'+arg+'"';}else 
if(type==='function'){
try{
ret=arg.toString();}
catch(e){
ret='[function unknown]';}}else 

{


try{
ret=JSON.stringify(arg);}
catch(e){
if(typeof arg.toString==='function'){
try{
ret=arg.toString();}
catch(E){}}}}



return ret||'["'+type+'" failed to stringify]';}


module.exports=stringifySafe;
});
__d(20 /* HMRClient */, function(global, require, module, exports) {'use strict';












var Platform=require(4 /* Platform */);
var invariant=require(363 /* fbjs/lib/invariant */);





var HMRClient={
enable:function(platform,bundleEntry,host,port){
invariant(platform,'Missing required parameter `platform`');
invariant(bundleEntry,'Missing required paramenter `bundleEntry`');
invariant(host,'Missing required paramenter `host`');




var WebSocket=require(21 /* WebSocket */);

var wsHostPort=port!==null&&port!==''?
host+':'+port:
host;


var wsUrl='ws://'+wsHostPort+'/hot?'+('platform='+
platform+'&')+('bundleEntry='+
bundleEntry.replace('.bundle','.js'));

var activeWS=new WebSocket(wsUrl);
activeWS.onerror=function(e){
var error='Hot loading isn\'t working because it cannot connect to the development server.\n\nTry the following to fix the issue:\n- Ensure that the packager server is running and available on the same network';






if(Platform.OS==='ios'){
error+='\n- Ensure that the Packager server URL is correctly set in AppDelegate';}else 



{
error+='\n- Ensure that your device/emulator is connected to your machine and has USB debugging enabled - run \'adb devices\' to see a list of connected devices\n- If you\'re on a physical device connected to the same machine, run \'adb reverse tcp:8081 tcp:8081\' to forward requests from your device\n- If your device is on the same Wi-Fi network, set \'Debug server host & port for device\' in \'Dev settings\' to your machine\'s IP address and the port of the local dev server - e.g. 10.0.1.1:8081';}







error+='\n\nURL: '+


host+':'+port+'\n\nError: '+

e.message;


throw new Error(error);};

activeWS.onmessage=function(_ref){var data=_ref.data;

var HMRLoadingView=require(29 /* HMRLoadingView */);

data=JSON.parse(data);

switch(data.type){
case 'update-start':{
HMRLoadingView.showMessage('Hot Loading...');
break;}

case 'update':{var _ret=function(){var _data$body=





data.body;var modules=_data$body.modules;var sourceMappingURLs=_data$body.sourceMappingURLs;var sourceURLs=_data$body.sourceURLs;var inverseDependencies=_data$body.inverseDependencies;

if(Platform.OS==='ios'){
var RCTRedBox=require(11 /* NativeModules */).RedBox;
RCTRedBox&&RCTRedBox.dismiss&&RCTRedBox.dismiss();}else 
{
var RCTExceptionsManager=require(11 /* NativeModules */).ExceptionsManager;
RCTExceptionsManager&&RCTExceptionsManager.dismissRedbox&&RCTExceptionsManager.dismissRedbox();}


var serverHost=void 0;

if(Platform.OS==='android'){
serverHost=require(11 /* NativeModules */).AndroidConstants.ServerHost;}else 
{
serverHost=port?host+':'+port:host;}


modules.forEach(function(_ref2,i){var id=_ref2.id;var code=_ref2.code;
code=code+'\n\n'+sourceMappingURLs[i];

require(32 /* SourceMapsCache */).fetch({
text:code,
url:'http://'+serverHost+sourceURLs[i],
sourceMappingURL:sourceMappingURLs[i]});





var injectFunction=typeof global.nativeInjectHMRUpdate==='function'?
global.nativeInjectHMRUpdate:
eval;

code=['__accept(',

id+',','function(global,require,module,exports){',''+

code,
'\n},',''+
JSON.stringify(inverseDependencies),');'].

join('');

injectFunction(code,sourceURLs[i]);});


HMRLoadingView.hide();
return 'break';}();if(_ret==='break')break;}

case 'update-done':{
HMRLoadingView.hide();
break;}

case 'error':{
HMRLoadingView.hide();
throw new Error(data.body.type+' '+data.body.description);}

default:{
throw new Error('Unexpected message: '+data);}}};}};






module.exports=HMRClient;
});
__d(21 /* WebSocket */, function(global, require, module, exports) {'use strict';












var RCTDeviceEventEmitter=require(22 /* RCTDeviceEventEmitter */);
var RCTWebSocketModule=require(11 /* NativeModules */).WebSocketModule;

var Platform=require(4 /* Platform */);
var WebSocketBase=require(27 /* WebSocketBase */);
var WebSocketEvent=require(28 /* WebSocketEvent */);

var base64=require(377 /* base64-js */);

var WebSocketId=0;
var CLOSE_NORMAL=1000;var 







WebSocket=function(_WebSocketBase){babelHelpers.inherits(WebSocket,_WebSocketBase);function WebSocket(){babelHelpers.classCallCheck(this,WebSocket);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(WebSocket).apply(this,arguments));}babelHelpers.createClass(WebSocket,[{key:'connectToSocketImpl',value:function connectToSocketImpl(



url,protocols,headers){
this._socketId=WebSocketId++;

RCTWebSocketModule.connect(url,protocols,headers,this._socketId);

this._registerEvents(this._socketId);}},{key:'closeConnectionImpl',value:function closeConnectionImpl(


code,reason){
this._closeWebSocket(this._socketId,code,reason);}},{key:'cancelConnectionImpl',value:function cancelConnectionImpl()


{
this._closeWebSocket(this._socketId);}},{key:'sendStringImpl',value:function sendStringImpl(


message){
RCTWebSocketModule.send(message,this._socketId);}},{key:'sendArrayBufferImpl',value:function sendArrayBufferImpl()


{

console.warn('Sending ArrayBuffers is not yet supported');}},{key:'_closeWebSocket',value:function _closeWebSocket(


id,code,reason){
if(Platform.OS==='android'){



var statusCode=typeof code==='number'?code:CLOSE_NORMAL;
var closeReason=typeof reason==='string'?reason:'';
RCTWebSocketModule.close(statusCode,closeReason,id);}else 
{
RCTWebSocketModule.close(id);}}},{key:'_unregisterEvents',value:function _unregisterEvents()



{
this._subs.forEach(function(e){return e.remove();});
this._subs=[];}},{key:'_registerEvents',value:function _registerEvents(


id){var _this2=this;
this._subs=[
RCTDeviceEventEmitter.addListener('websocketMessage',function(ev){
if(ev.id!==id){
return;}

var event=new WebSocketEvent('message',{
data:ev.type==='binary'?base64.toByteArray(ev.data).buffer:ev.data});

_this2.onmessage&&_this2.onmessage(event);
_this2.dispatchEvent(event);}),

RCTDeviceEventEmitter.addListener('websocketOpen',function(ev){
if(ev.id!==id){
return;}

_this2.readyState=_this2.OPEN;
var event=new WebSocketEvent('open');
_this2.onopen&&_this2.onopen(event);
_this2.dispatchEvent(event);}),

RCTDeviceEventEmitter.addListener('websocketClosed',function(ev){
if(ev.id!==id){
return;}

_this2.readyState=_this2.CLOSED;
var event=new WebSocketEvent('close');
event.code=ev.code;
event.reason=ev.reason;
_this2.onclose&&_this2.onclose(event);
_this2.dispatchEvent(event);
_this2._unregisterEvents();
_this2.close();}),

RCTDeviceEventEmitter.addListener('websocketFailed',function(ev){
if(ev.id!==id){
return;}

var event=new WebSocketEvent('error');
event.message=ev.message;
_this2.onerror&&_this2.onerror(event);
_this2.onclose&&_this2.onclose(event);
_this2.dispatchEvent(event);
_this2._unregisterEvents();
_this2.close();})];}}]);return WebSocket;}(WebSocketBase);





module.exports=WebSocket;
});
__d(22 /* RCTDeviceEventEmitter */, function(global, require, module, exports) {'use strict';












var EventEmitter=require(23 /* EventEmitter */);
var BatchedBridge=require(12 /* BatchedBridge */);

var RCTDeviceEventEmitter=new EventEmitter();

BatchedBridge.registerCallableModule(
'RCTDeviceEventEmitter',
RCTDeviceEventEmitter);


module.exports=RCTDeviceEventEmitter;
});
__d(23 /* EventEmitter */, function(global, require, module, exports) {var 












EmitterSubscription=require(24 /* EmitterSubscription */);
var ErrorUtils=require(16 /* ErrorUtils */);
var EventSubscriptionVendor=require(26 /* EventSubscriptionVendor */);
var emptyFunction=require(369 /* fbjs/lib/emptyFunction */);
var invariant=require(363 /* fbjs/lib/invariant */);var 














EventEmitter=function(){



function EventEmitter(){babelHelpers.classCallCheck(this,EventEmitter);
this._subscriber=new EventSubscriptionVendor();}babelHelpers.createClass(EventEmitter,[{key:'addListener',value:function addListener(

















eventType,listener,context){
return this._subscriber.addSubscription(
eventType,
new EmitterSubscription(this._subscriber,listener,context));}},{key:'once',value:function once(












eventType,listener,context){
var emitter=this;
return this.addListener(eventType,function(){
emitter.removeCurrentListener();
listener.apply(context,arguments);});}},{key:'removeAllListeners',value:function removeAllListeners(










eventType){
this._subscriber.removeAllSubscriptions(eventType);}},{key:'removeCurrentListener',value:function removeCurrentListener()























{
invariant(
!!this._currentSubscription,
'Not in an emitting cycle; there is no current subscription');

this._subscriber.removeSubscription(this._currentSubscription);}},{key:'listeners',value:function listeners(









eventType){
var subscriptions=this._subscriber.getSubscriptionsForType(eventType);
return subscriptions?
subscriptions.filter(emptyFunction.thatReturnsTrue).map(
function(subscription){
return subscription.listener;}):

[];}},{key:'emit',value:function emit(
















eventType){
var subscriptions=this._subscriber.getSubscriptionsForType(eventType);
if(subscriptions){
var keys=Object.keys(subscriptions);
for(var ii=0;ii<keys.length;ii++){
var key=keys[ii];
var subscription=subscriptions[key];


if(subscription){
this._currentSubscription=subscription;
subscription.listener.apply(
subscription.context,
Array.prototype.slice.call(arguments,1));}}



this._currentSubscription=null;}}}]);return EventEmitter;}();




module.exports=EventEmitter;
});
__d(24 /* EmitterSubscription */, function(global, require, module, exports) {'use strict';



















var EventSubscription=require(25 /* EventSubscription */);var 




EmitterSubscription=function(_EventSubscription){babelHelpers.inherits(EmitterSubscription,_EventSubscription);









function EmitterSubscription(subscriber,listener,context){babelHelpers.classCallCheck(this,EmitterSubscription);var _this=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(EmitterSubscription).call(this,
subscriber));
_this.listener=listener;
_this.context=context;return _this;}return EmitterSubscription;}(EventSubscription);



module.exports=EmitterSubscription;
});
__d(25 /* EventSubscription */, function(global, require, module, exports) {'use strict';var 






















EventSubscription=function(){





function EventSubscription(subscriber){babelHelpers.classCallCheck(this,EventSubscription);
this.subscriber=subscriber;}babelHelpers.createClass(EventSubscription,[{key:'remove',value:function remove()





{
this.subscriber.removeSubscription(this);}}]);return EventSubscription;}();



module.exports=EventSubscription;
});
__d(26 /* EventSubscriptionVendor */, function(global, require, module, exports) {'use strict';


















var invariant=require(363 /* fbjs/lib/invariant */);var 





EventSubscriptionVendor=function(){

function EventSubscriptionVendor(){babelHelpers.classCallCheck(this,EventSubscriptionVendor);
this._subscriptionsForType={};
this._currentSubscription=null;}babelHelpers.createClass(EventSubscriptionVendor,[{key:'addSubscription',value:function addSubscription(









eventType,subscription){
invariant(
subscription.subscriber===this,
'The subscriber of the subscription is incorrectly set.');
if(!this._subscriptionsForType[eventType]){
this._subscriptionsForType[eventType]=[];}

var key=this._subscriptionsForType[eventType].length;
this._subscriptionsForType[eventType].push(subscription);
subscription.eventType=eventType;
subscription.key=key;
return subscription;}},{key:'removeAllSubscriptions',value:function removeAllSubscriptions(








eventType){
if(eventType===undefined){
this._subscriptionsForType={};}else 
{
delete this._subscriptionsForType[eventType];}}},{key:'removeSubscription',value:function removeSubscription(









subscription){
var eventType=subscription.eventType;
var key=subscription.key;

var subscriptionsForType=this._subscriptionsForType[eventType];
if(subscriptionsForType){
delete subscriptionsForType[key];}}},{key:'getSubscriptionsForType',value:function getSubscriptionsForType(















eventType){
return this._subscriptionsForType[eventType];}}]);return EventSubscriptionVendor;}();



module.exports=EventSubscriptionVendor;
});
__d(27 /* WebSocketBase */, function(global, require, module, exports) {'use strict';












var EventTarget=require(371 /* event-target-shim */);

var CONNECTING=0;
var OPEN=1;
var CLOSING=2;
var CLOSED=3;var 




WebSocketBase=function(_EventTarget){babelHelpers.inherits(WebSocketBase,_EventTarget);

















function WebSocketBase(url,protocols,options){babelHelpers.classCallCheck(this,WebSocketBase);var _this=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(WebSocketBase).call(this));

_this.CONNECTING=CONNECTING;
_this.OPEN=OPEN;
_this.CLOSING=CLOSING;
_this.CLOSED=CLOSED;

if(typeof protocols==='string'){
protocols=[protocols];}


if(!Array.isArray(protocols)){
protocols=null;}


_this.readyState=_this.CONNECTING;
_this.connectToSocketImpl(url,protocols,options);return _this;}babelHelpers.createClass(WebSocketBase,[{key:'close',value:function close()


{
if(this.readyState===this.CLOSING||
this.readyState===this.CLOSED){
return;}


if(this.readyState===this.CONNECTING){
this.cancelConnectionImpl();}


this.readyState=this.CLOSING;
this.closeConnectionImpl();}},{key:'send',value:function send(


data){
if(this.readyState===this.CONNECTING){
throw new Error('INVALID_STATE_ERR');}


if(typeof data==='string'){
this.sendStringImpl(data);}else 
if(data instanceof ArrayBuffer){
this.sendArrayBufferImpl(data);}else 
{
throw new Error('Not supported data type');}}},{key:'closeConnectionImpl',value:function closeConnectionImpl()



{
throw new Error('Subclass must define closeConnectionImpl method');}},{key:'connectToSocketImpl',value:function connectToSocketImpl(


url,protocols,options){
throw new Error('Subclass must define connectToSocketImpl method');}},{key:'cancelConnectionImpl',value:function cancelConnectionImpl()


{
throw new Error('Subclass must define cancelConnectionImpl method');}},{key:'sendStringImpl',value:function sendStringImpl(


message){
throw new Error('Subclass must define sendStringImpl method');}},{key:'sendArrayBufferImpl',value:function sendArrayBufferImpl()


{
throw new Error('Subclass must define sendArrayBufferImpl method');}}]);return WebSocketBase;}(EventTarget);



WebSocketBase.CONNECTING=CONNECTING;
WebSocketBase.OPEN=OPEN;
WebSocketBase.CLOSING=CLOSING;
WebSocketBase.CLOSED=CLOSED;

module.exports=WebSocketBase;
});
__d(371 /* event-target-shim/lib/event-target.js */, function(global, require, module, exports) {"use strict";











var Commons=require(370 /* ./commons */);
var CustomEventTarget=require(374 /* ./custom-event-target */);
var EventWrapper=require(372 /* ./event-wrapper */);
var LISTENERS=Commons.LISTENERS;
var CAPTURE=Commons.CAPTURE;
var BUBBLE=Commons.BUBBLE;
var ATTRIBUTE=Commons.ATTRIBUTE;
var newNode=Commons.newNode;
var defineCustomEventTarget=CustomEventTarget.defineCustomEventTarget;
var createEventWrapper=EventWrapper.createEventWrapper;
var STOP_IMMEDIATE_PROPAGATION_FLAG=
EventWrapper.STOP_IMMEDIATE_PROPAGATION_FLAG;











var HAS_EVENTTARGET_INTERFACE=
typeof window!=="undefined"&&
typeof window.EventTarget!=="undefined";












var EventTarget=module.exports=function EventTarget(){
if(this instanceof EventTarget){









Object.defineProperty(this,LISTENERS,{value:Object.create(null)});}else 

if(arguments.length===1&&Array.isArray(arguments[0])){
return defineCustomEventTarget(EventTarget,arguments[0]);}else 

if(arguments.length>0){
var types=Array(arguments.length);
for(var i=0;i<arguments.length;++i){
types[i]=arguments[i];}







return defineCustomEventTarget(EventTarget,types);}else 

{
throw new TypeError("Cannot call a class as a function");}};



EventTarget.prototype=Object.create(
(HAS_EVENTTARGET_INTERFACE?window.EventTarget:Object).prototype,
{
constructor:{
value:EventTarget,
writable:true,
configurable:true},


addEventListener:{
value:function addEventListener(type,listener,capture){
if(listener==null){
return false;}

if(typeof listener!=="function"&&typeof listener!=="object"){
throw new TypeError("\"listener\" is not an object.");}


var kind=capture?CAPTURE:BUBBLE;
var node=this[LISTENERS][type];
if(node==null){
this[LISTENERS][type]=newNode(listener,kind);
return true;}


var prev=null;
while(node!=null){
if(node.listener===listener&&node.kind===kind){

return false;}

prev=node;
node=node.next;}


prev.next=newNode(listener,kind);
return true;},

configurable:true,
writable:true},


removeEventListener:{
value:function removeEventListener(type,listener,capture){
if(listener==null){
return false;}


var kind=capture?CAPTURE:BUBBLE;
var prev=null;
var node=this[LISTENERS][type];
while(node!=null){
if(node.listener===listener&&node.kind===kind){
if(prev==null){
this[LISTENERS][type]=node.next;}else 

{
prev.next=node.next;}

return true;}


prev=node;
node=node.next;}


return false;},

configurable:true,
writable:true},


dispatchEvent:{
value:function dispatchEvent(event){

var node=this[LISTENERS][event.type];
if(node==null){
return true;}



var wrapped=createEventWrapper(event,this);



while(node!=null){
if(typeof node.listener==="function"){
node.listener.call(this,wrapped);}else 

if(node.kind!==ATTRIBUTE&&typeof node.listener.handleEvent==="function"){
node.listener.handleEvent(wrapped);}


if(wrapped[STOP_IMMEDIATE_PROPAGATION_FLAG]){
break;}

node=node.next;}


return !wrapped.defaultPrevented;},

configurable:true,
writable:true}});
});
__d(370 /* event-target-shim/lib/commons.js */, function(global, require, module, exports) {"use strict";














var createUniqueKey=exports.createUniqueKey=typeof Symbol!=="undefined"?
Symbol:
function createUniqueKey(name){
return "[["+name+"_"+Math.random().toFixed(8).slice(2)+"]]";};








exports.LISTENERS=createUniqueKey("listeners");







exports.CAPTURE=1;







exports.BUBBLE=2;







exports.ATTRIBUTE=3;
















exports.newNode=function newNode(listener,kind){
return {listener:listener,kind:kind,next:null};};
});
__d(374 /* event-target-shim/lib/custom-event-target.js */, function(global, require, module, exports) {"use strict";











var Commons=require(370 /* ./commons */);
var LISTENERS=Commons.LISTENERS;
var ATTRIBUTE=Commons.ATTRIBUTE;
var newNode=Commons.newNode;












function getAttributeListener(eventTarget,type){
var node=eventTarget[LISTENERS][type];
while(node!=null){
if(node.kind===ATTRIBUTE){
return node.listener;}

node=node.next;}

return null;}










function setAttributeListener(eventTarget,type,listener){
if(typeof listener!=="function"&&typeof listener!=="object"){
listener=null;}


var prev=null;
var node=eventTarget[LISTENERS][type];
while(node!=null){
if(node.kind===ATTRIBUTE){

if(prev==null){
eventTarget[LISTENERS][type]=node.next;}else 

{
prev.next=node.next;}}else 


{
prev=node;}


node=node.next;}



if(listener!=null){
if(prev==null){
eventTarget[LISTENERS][type]=newNode(listener,ATTRIBUTE);}else 

{
prev.next=newNode(listener,ATTRIBUTE);}}}















exports.defineCustomEventTarget=function(EventTargetBase,types){
function EventTarget(){
EventTargetBase.call(this);}


var descripter={
constructor:{
value:EventTarget,
configurable:true,
writable:true}};



types.forEach(function(type){
descripter["on"+type]={
get:function(){return getAttributeListener(this,type);},
set:function(listener){setAttributeListener(this,type,listener);},
configurable:true,
enumerable:true};});



EventTarget.prototype=Object.create(EventTargetBase.prototype,descripter);

return EventTarget;};
});
__d(372 /* event-target-shim/lib/event-wrapper.js */, function(global, require, module, exports) {"use strict";











var createUniqueKey=require(370 /* ./commons */).createUniqueKey;











var STOP_IMMEDIATE_PROPAGATION_FLAG=
createUniqueKey("stop_immediate_propagation_flag");







var CANCELED_FLAG=createUniqueKey("canceled_flag");







var ORIGINAL_EVENT=createUniqueKey("original_event");







var wrapperPrototypeDefinition=Object.freeze({
stopPropagation:Object.freeze({
value:function stopPropagation(){
var e=this[ORIGINAL_EVENT];
if(typeof e.stopPropagation==="function"){
e.stopPropagation();}},


writable:true,
configurable:true}),


stopImmediatePropagation:Object.freeze({
value:function stopImmediatePropagation(){
this[STOP_IMMEDIATE_PROPAGATION_FLAG]=true;

var e=this[ORIGINAL_EVENT];
if(typeof e.stopImmediatePropagation==="function"){
e.stopImmediatePropagation();}},


writable:true,
configurable:true}),


preventDefault:Object.freeze({
value:function preventDefault(){
if(this.cancelable===true){
this[CANCELED_FLAG]=true;}


var e=this[ORIGINAL_EVENT];
if(typeof e.preventDefault==="function"){
e.preventDefault();}},


writable:true,
configurable:true}),


defaultPrevented:Object.freeze({
get:function defaultPrevented(){return this[CANCELED_FLAG];},
enumerable:true,
configurable:true})});







exports.STOP_IMMEDIATE_PROPAGATION_FLAG=STOP_IMMEDIATE_PROPAGATION_FLAG;












exports.createEventWrapper=function createEventWrapper(event,eventTarget){
var timeStamp=
typeof event.timeStamp==="number"?event.timeStamp:Date.now();

var propertyDefinition={
type:{value:event.type,enumerable:true},
target:{value:eventTarget,enumerable:true},
currentTarget:{value:eventTarget,enumerable:true},
eventPhase:{value:2,enumerable:true},
bubbles:{value:Boolean(event.bubbles),enumerable:true},
cancelable:{value:Boolean(event.cancelable),enumerable:true},
timeStamp:{value:timeStamp,enumerable:true},
isTrusted:{value:false,enumerable:true}};

propertyDefinition[STOP_IMMEDIATE_PROPAGATION_FLAG]={value:false,writable:true};
propertyDefinition[CANCELED_FLAG]={value:false,writable:true};
propertyDefinition[ORIGINAL_EVENT]={value:event};


if(typeof event.detail!=="undefined"){
propertyDefinition.detail={value:event.detail,enumerable:true};}


return Object.create(
Object.create(event,wrapperPrototypeDefinition),
propertyDefinition);};
});
__d(28 /* WebSocketEvent */, function(global, require, module, exports) {'use strict';var 




















WebSocketEvent=
function WebSocketEvent(type,eventInitDict){babelHelpers.classCallCheck(this,WebSocketEvent);
this.type=type.toString();
babelHelpers.extends(this,eventInitDict);};



module.exports=WebSocketEvent;
});
__d(377 /* base64-js/lib/b64.js */, function(global, require, module, exports) {var lookup='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

;(function(exports){
'use strict';

var Arr=typeof Uint8Array!=='undefined'?
Uint8Array:
Array;

var PLUS='+'.charCodeAt(0);
var SLASH='/'.charCodeAt(0);
var NUMBER='0'.charCodeAt(0);
var LOWER='a'.charCodeAt(0);
var UPPER='A'.charCodeAt(0);
var PLUS_URL_SAFE='-'.charCodeAt(0);
var SLASH_URL_SAFE='_'.charCodeAt(0);

function decode(elt){
var code=elt.charCodeAt(0);
if(code===PLUS||
code===PLUS_URL_SAFE)
return 62;
if(code===SLASH||
code===SLASH_URL_SAFE)
return 63;
if(code<NUMBER)
return -1;
if(code<NUMBER+10)
return code-NUMBER+26+26;
if(code<UPPER+26)
return code-UPPER;
if(code<LOWER+26)
return code-LOWER+26;}


function b64ToByteArray(b64){
var i,j,l,tmp,placeHolders,arr;

if(b64.length%4>0){
throw new Error('Invalid string. Length must be a multiple of 4');}







var len=b64.length;
placeHolders='='===b64.charAt(len-2)?2:'='===b64.charAt(len-1)?1:0;


arr=new Arr(b64.length*3/4-placeHolders);


l=placeHolders>0?b64.length-4:b64.length;

var L=0;

function push(v){
arr[L++]=v;}


for(i=0,j=0;i<l;i+=4,j+=3){
tmp=decode(b64.charAt(i))<<18|decode(b64.charAt(i+1))<<12|decode(b64.charAt(i+2))<<6|decode(b64.charAt(i+3));
push((tmp&0xFF0000)>>16);
push((tmp&0xFF00)>>8);
push(tmp&0xFF);}


if(placeHolders===2){
tmp=decode(b64.charAt(i))<<2|decode(b64.charAt(i+1))>>4;
push(tmp&0xFF);}else 
if(placeHolders===1){
tmp=decode(b64.charAt(i))<<10|decode(b64.charAt(i+1))<<4|decode(b64.charAt(i+2))>>2;
push(tmp>>8&0xFF);
push(tmp&0xFF);}


return arr;}


function uint8ToBase64(uint8){
var i,
extraBytes=uint8.length%3,
output="",
temp,length;

function encode(num){
return lookup.charAt(num);}


function tripletToBase64(num){
return encode(num>>18&0x3F)+encode(num>>12&0x3F)+encode(num>>6&0x3F)+encode(num&0x3F);}



for(i=0,length=uint8.length-extraBytes;i<length;i+=3){
temp=(uint8[i]<<16)+(uint8[i+1]<<8)+uint8[i+2];
output+=tripletToBase64(temp);}



switch(extraBytes){
case 1:
temp=uint8[uint8.length-1];
output+=encode(temp>>2);
output+=encode(temp<<4&0x3F);
output+='==';
break;
case 2:
temp=(uint8[uint8.length-2]<<8)+uint8[uint8.length-1];
output+=encode(temp>>10);
output+=encode(temp>>4&0x3F);
output+=encode(temp<<2&0x3F);
output+='=';
break;}


return output;}


exports.toByteArray=b64ToByteArray;
exports.fromByteArray=uint8ToBase64;})(
typeof exports==='undefined'?this.base64js={}:exports);
});
__d(29 /* HMRLoadingView */, function(global, require, module, exports) {'use strict';













var processColor=require(30 /* processColor */);var _require=
require(11 /* NativeModules */);var DevLoadingView=_require.DevLoadingView;var 

HMRLoadingView=function(){function HMRLoadingView(){babelHelpers.classCallCheck(this,HMRLoadingView);}babelHelpers.createClass(HMRLoadingView,null,[{key:'showMessage',value:function showMessage(
message){
DevLoadingView.showMessage(
message,
processColor('#000000'),
processColor('#aaaaaa'));}},{key:'hide',value:function hide()



{
DevLoadingView.hide();}}]);return HMRLoadingView;}();



module.exports=HMRLoadingView;
});
__d(30 /* processColor */, function(global, require, module, exports) {'use strict';











var Platform=require(4 /* Platform */);

var normalizeColor=require(31 /* normalizeColor */);


function processColor(color){
if(color===undefined||color===null){
return color;}


var int32Color=normalizeColor(color);
if(int32Color===null){
return undefined;}



int32Color=(int32Color<<24|int32Color>>>8)>>>0;

if(Platform.OS==='android'){




int32Color=int32Color|0x0;}

return int32Color;}


module.exports=processColor;
});
__d(31 /* normalizeColor */, function(global, require, module, exports) {'use strict';













function normalizeColor(color){
var match;

if(typeof color==='number'){
if(color>>>0===color&&color>=0&&color<=0xffffffff){
return color;}

return null;}



if(match=matchers.hex6.exec(color)){
return parseInt(match[1]+'ff',16)>>>0;}


if(names.hasOwnProperty(color)){
return names[color];}


if(match=matchers.rgb.exec(color)){
return (
parse255(match[1])<<24|
parse255(match[2])<<16|
parse255(match[3])<<8|
0x000000ff)>>>
0;}


if(match=matchers.rgba.exec(color)){
return (
parse255(match[1])<<24|
parse255(match[2])<<16|
parse255(match[3])<<8|
parse1(match[4]))>>>
0;}


if(match=matchers.hex3.exec(color)){
return parseInt(
match[1]+match[1]+
match[2]+match[2]+
match[3]+match[3]+
'ff',
16)>>>
0;}



if(match=matchers.hex8.exec(color)){
return parseInt(match[1],16)>>>0;}


if(match=matchers.hex4.exec(color)){
return parseInt(
match[1]+match[1]+
match[2]+match[2]+
match[3]+match[3]+
match[4]+match[4],
16)>>>
0;}


if(match=matchers.hsl.exec(color)){
return (
hslToRgb(
parse360(match[1]),
parsePercentage(match[2]),
parsePercentage(match[3]))|

0x000000ff)>>>
0;}


if(match=matchers.hsla.exec(color)){
return (
hslToRgb(
parse360(match[1]),
parsePercentage(match[2]),
parsePercentage(match[3]))|

parse1(match[4]))>>>
0;}


return null;}


function hue2rgb(p,q,t){
if(t<0){
t+=1;}

if(t>1){
t-=1;}

if(t<1/6){
return p+(q-p)*6*t;}

if(t<1/2){
return q;}

if(t<2/3){
return p+(q-p)*(2/3-t)*6;}

return p;}


function hslToRgb(h,s,l){
var q=l<0.5?l*(1+s):l+s-l*s;
var p=2*l-q;
var r=hue2rgb(p,q,h+1/3);
var g=hue2rgb(p,q,h);
var b=hue2rgb(p,q,h-1/3);

return (
Math.round(r*255)<<24|
Math.round(g*255)<<16|
Math.round(b*255)<<8);}




var NUMBER='[-+]?\\d*\\.?\\d+';
var PERCENTAGE=NUMBER+'%';

function call(){for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}
return '\\(\\s*('+args.join(')\\s*,\\s*(')+')\\s*\\)';}


var matchers={
rgb:new RegExp('rgb'+call(NUMBER,NUMBER,NUMBER)),
rgba:new RegExp('rgba'+call(NUMBER,NUMBER,NUMBER,NUMBER)),
hsl:new RegExp('hsl'+call(NUMBER,PERCENTAGE,PERCENTAGE)),
hsla:new RegExp('hsla'+call(NUMBER,PERCENTAGE,PERCENTAGE,NUMBER)),
hex3:/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
hex4:/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
hex6:/^#([0-9a-fA-F]{6})$/,
hex8:/^#([0-9a-fA-F]{8})$/};


function parse255(str){
var int=parseInt(str,10);
if(int<0){
return 0;}

if(int>255){
return 255;}

return int;}


function parse360(str){
var int=parseFloat(str);
return (int%360+360)%360/360;}


function parse1(str){
var num=parseFloat(str);
if(num<0){
return 0;}

if(num>1){
return 255;}

return Math.round(num*255);}


function parsePercentage(str){

var int=parseFloat(str,10);
if(int<0){
return 0;}

if(int>100){
return 1;}

return int/100;}


var names={
transparent:0x00000000,


aliceblue:0xf0f8ffff,
antiquewhite:0xfaebd7ff,
aqua:0x00ffffff,
aquamarine:0x7fffd4ff,
azure:0xf0ffffff,
beige:0xf5f5dcff,
bisque:0xffe4c4ff,
black:0x000000ff,
blanchedalmond:0xffebcdff,
blue:0x0000ffff,
blueviolet:0x8a2be2ff,
brown:0xa52a2aff,
burlywood:0xdeb887ff,
burntsienna:0xea7e5dff,
cadetblue:0x5f9ea0ff,
chartreuse:0x7fff00ff,
chocolate:0xd2691eff,
coral:0xff7f50ff,
cornflowerblue:0x6495edff,
cornsilk:0xfff8dcff,
crimson:0xdc143cff,
cyan:0x00ffffff,
darkblue:0x00008bff,
darkcyan:0x008b8bff,
darkgoldenrod:0xb8860bff,
darkgray:0xa9a9a9ff,
darkgreen:0x006400ff,
darkgrey:0xa9a9a9ff,
darkkhaki:0xbdb76bff,
darkmagenta:0x8b008bff,
darkolivegreen:0x556b2fff,
darkorange:0xff8c00ff,
darkorchid:0x9932ccff,
darkred:0x8b0000ff,
darksalmon:0xe9967aff,
darkseagreen:0x8fbc8fff,
darkslateblue:0x483d8bff,
darkslategray:0x2f4f4fff,
darkslategrey:0x2f4f4fff,
darkturquoise:0x00ced1ff,
darkviolet:0x9400d3ff,
deeppink:0xff1493ff,
deepskyblue:0x00bfffff,
dimgray:0x696969ff,
dimgrey:0x696969ff,
dodgerblue:0x1e90ffff,
firebrick:0xb22222ff,
floralwhite:0xfffaf0ff,
forestgreen:0x228b22ff,
fuchsia:0xff00ffff,
gainsboro:0xdcdcdcff,
ghostwhite:0xf8f8ffff,
gold:0xffd700ff,
goldenrod:0xdaa520ff,
gray:0x808080ff,
green:0x008000ff,
greenyellow:0xadff2fff,
grey:0x808080ff,
honeydew:0xf0fff0ff,
hotpink:0xff69b4ff,
indianred:0xcd5c5cff,
indigo:0x4b0082ff,
ivory:0xfffff0ff,
khaki:0xf0e68cff,
lavender:0xe6e6faff,
lavenderblush:0xfff0f5ff,
lawngreen:0x7cfc00ff,
lemonchiffon:0xfffacdff,
lightblue:0xadd8e6ff,
lightcoral:0xf08080ff,
lightcyan:0xe0ffffff,
lightgoldenrodyellow:0xfafad2ff,
lightgray:0xd3d3d3ff,
lightgreen:0x90ee90ff,
lightgrey:0xd3d3d3ff,
lightpink:0xffb6c1ff,
lightsalmon:0xffa07aff,
lightseagreen:0x20b2aaff,
lightskyblue:0x87cefaff,
lightslategray:0x778899ff,
lightslategrey:0x778899ff,
lightsteelblue:0xb0c4deff,
lightyellow:0xffffe0ff,
lime:0x00ff00ff,
limegreen:0x32cd32ff,
linen:0xfaf0e6ff,
magenta:0xff00ffff,
maroon:0x800000ff,
mediumaquamarine:0x66cdaaff,
mediumblue:0x0000cdff,
mediumorchid:0xba55d3ff,
mediumpurple:0x9370dbff,
mediumseagreen:0x3cb371ff,
mediumslateblue:0x7b68eeff,
mediumspringgreen:0x00fa9aff,
mediumturquoise:0x48d1ccff,
mediumvioletred:0xc71585ff,
midnightblue:0x191970ff,
mintcream:0xf5fffaff,
mistyrose:0xffe4e1ff,
moccasin:0xffe4b5ff,
navajowhite:0xffdeadff,
navy:0x000080ff,
oldlace:0xfdf5e6ff,
olive:0x808000ff,
olivedrab:0x6b8e23ff,
orange:0xffa500ff,
orangered:0xff4500ff,
orchid:0xda70d6ff,
palegoldenrod:0xeee8aaff,
palegreen:0x98fb98ff,
paleturquoise:0xafeeeeff,
palevioletred:0xdb7093ff,
papayawhip:0xffefd5ff,
peachpuff:0xffdab9ff,
peru:0xcd853fff,
pink:0xffc0cbff,
plum:0xdda0ddff,
powderblue:0xb0e0e6ff,
purple:0x800080ff,
rebeccapurple:0x663399ff,
red:0xff0000ff,
rosybrown:0xbc8f8fff,
royalblue:0x4169e1ff,
saddlebrown:0x8b4513ff,
salmon:0xfa8072ff,
sandybrown:0xf4a460ff,
seagreen:0x2e8b57ff,
seashell:0xfff5eeff,
sienna:0xa0522dff,
silver:0xc0c0c0ff,
skyblue:0x87ceebff,
slateblue:0x6a5acdff,
slategray:0x708090ff,
slategrey:0x708090ff,
snow:0xfffafaff,
springgreen:0x00ff7fff,
steelblue:0x4682b4ff,
tan:0xd2b48cff,
teal:0x008080ff,
thistle:0xd8bfd8ff,
tomato:0xff6347ff,
turquoise:0x40e0d0ff,
violet:0xee82eeff,
wheat:0xf5deb3ff,
white:0xffffffff,
whitesmoke:0xf5f5f5ff,
yellow:0xffff00ff,
yellowgreen:0x9acd32ff};


module.exports=normalizeColor;
});
__d(32 /* SourceMapsCache */, function(global, require, module, exports) {'use strict';











var getObjectValues=require(33 /* getObjectValues */);
var SourceMapsUtils=require(34 /* SourceMapsUtils */);

var sourceMapsCache={};

var SourceMapsCache={
mainSourceMapID:'main',

fetch:function(_ref){var text=_ref.text;var url=_ref.url;var fullSourceMappingURL=_ref.fullSourceMappingURL;
var sourceMappingURL=fullSourceMappingURL?
fullSourceMappingURL:
SourceMapsUtils.extractSourceMapURL({text:text,url:url});

sourceMapsCache[sourceMappingURL]=SourceMapsUtils.fetchSourceMap(
sourceMappingURL);},



getSourceMaps:function(){
fetchMainSourceMap();
return Promise.all(getObjectValues(sourceMapsCache));}};



function fetchMainSourceMap(){
if(!sourceMapsCache[SourceMapsCache.mainSourceMapID]){
sourceMapsCache[SourceMapsCache.mainSourceMapID]=
SourceMapsUtils.fetchMainSourceMap();}}



module.exports=SourceMapsCache;
});
__d(33 /* getObjectValues */, function(global, require, module, exports) {function 


























getObjectValues(obj){
var values=[];
for(var key in obj){
values.push(obj[key]);}

return values;}


module.exports=getObjectValues;
});
__d(34 /* SourceMapsUtils */, function(global, require, module, exports) {'use strict';













var Promise=require(35 /* Promise */);
var NativeModules=require(11 /* NativeModules */);
var SourceMapConsumer=require(36 /* SourceMap */).SourceMapConsumer;
var SourceMapURL=require(340 /* ./source-map-url */);

var RCTSourceCode=NativeModules.SourceCode;
var RCTNetworking=NativeModules.Networking;

var SourceMapsUtils={
fetchMainSourceMap:function(){
return SourceMapsUtils._getMainSourceMapURL().then(function(url){return (
SourceMapsUtils.fetchSourceMap(url));});},



fetchSourceMap:function(sourceMappingURL){
return fetch(sourceMappingURL).
then(function(response){return response.text();}).
then(function(map){return new SourceMapConsumer(map);});},


extractSourceMapURL:function(data){
var url=data.url;
var text=data.text;
var fullSourceMappingURL=data.fullSourceMappingURL;
if(fullSourceMappingURL){
return fullSourceMappingURL;}

var mapURL=SourceMapURL.getFrom(text);
if(!mapURL){
return null;}

if(!url){
return null;}

var baseURLs=url.match(/(.+:\/\/.*?)\//);
if(!baseURLs||baseURLs.length<2){
return null;}

return baseURLs[1]+mapURL;},


_getMainSourceMapURL:function(){
if(global.RAW_SOURCE_MAP){
return Promise.resolve(global.RAW_SOURCE_MAP);}


if(!RCTSourceCode){
return Promise.reject(new Error('RCTSourceCode module is not available'));}


if(!RCTNetworking){

return Promise.reject(new Error('RCTNetworking module is not available'));}


return RCTSourceCode.getScriptText().
then(SourceMapsUtils.extractSourceMapURL).
then(function(url){
if(url===null){
return Promise.reject(new Error('No source map URL found. May be running from bundled file.'));}

return Promise.resolve(url);});}};




module.exports=SourceMapsUtils;
});
__d(35 /* Promise */, function(global, require, module, exports) {'use strict';












var Promise=require(373 /* fbjs/lib/Promise.native */);

if(__DEV__){
require(383 /* promise/setimmediate/rejection-tracking */).enable({
allRejections:true,
onUnhandled:function(id,error){var 
message=error.message;var stack=error.stack;
var warning=
'Possible Unhandled Promise Rejection (id: '+id+'):\n'+(
message==null?'':message+'\n')+(
stack==null?'':stack);
console.warn(warning);},

onHandled:function(id){
var warning=
'Promise Rejection Handled (id: '+id+')\n'+
'This means you can ignore any previous messages of the form '+('"Possible Unhandled Promise Rejection (id: '+
id+'):"');
console.warn(warning);}});}




module.exports=Promise;
});
__d(373 /* fbjs/lib/Promise.native.js */, function(global, require, module, exports) {'use strict';














var Promise=require(375 /* promise/setimmediate/es6-extensions */);
require(376 /* promise/setimmediate/done */);




Promise.prototype['finally']=function(onSettled){
return this.then(onSettled,onSettled);};


module.exports=Promise;
});
__d(375 /* promise/setimmediate/es6-extensions.js */, function(global, require, module, exports) {'use strict';



var Promise=require(378 /* ./core.js */);

module.exports=Promise;



var TRUE=valuePromise(true);
var FALSE=valuePromise(false);
var NULL=valuePromise(null);
var UNDEFINED=valuePromise(undefined);
var ZERO=valuePromise(0);
var EMPTYSTRING=valuePromise('');

function valuePromise(value){
var p=new Promise(Promise._61);
p._81=1;
p._65=value;
return p;}

Promise.resolve=function(value){
if(value instanceof Promise)return value;

if(value===null)return NULL;
if(value===undefined)return UNDEFINED;
if(value===true)return TRUE;
if(value===false)return FALSE;
if(value===0)return ZERO;
if(value==='')return EMPTYSTRING;

if(typeof value==='object'||typeof value==='function'){
try{
var then=value.then;
if(typeof then==='function'){
return new Promise(then.bind(value));}}

catch(ex){
return new Promise(function(resolve,reject){
reject(ex);});}}



return valuePromise(value);};


Promise.all=function(arr){
var args=Array.prototype.slice.call(arr);

return new Promise(function(resolve,reject){
if(args.length===0)return resolve([]);
var remaining=args.length;
function res(i,val){
if(val&&(typeof val==='object'||typeof val==='function')){
if(val instanceof Promise&&val.then===Promise.prototype.then){
while(val._81===3){
val=val._65;}

if(val._81===1)return res(i,val._65);
if(val._81===2)reject(val._65);
val.then(function(val){
res(i,val);},
reject);
return;}else 
{
var then=val.then;
if(typeof then==='function'){
var p=new Promise(then.bind(val));
p.then(function(val){
res(i,val);},
reject);
return;}}}



args[i]=val;
if(--remaining===0){
resolve(args);}}


for(var i=0;i<args.length;i++){
res(i,args[i]);}});};




Promise.reject=function(value){
return new Promise(function(resolve,reject){
reject(value);});};



Promise.race=function(values){
return new Promise(function(resolve,reject){
values.forEach(function(value){
Promise.resolve(value).then(resolve,reject);});});};






Promise.prototype['catch']=function(onRejected){
return this.then(null,onRejected);};
});
__d(378 /* promise/setimmediate/core.js */, function(global, require, module, exports) {'use strict';



function noop(){}


















var LAST_ERROR=null;
var IS_ERROR={};
function getThen(obj){
try{
return obj.then;}
catch(ex){
LAST_ERROR=ex;
return IS_ERROR;}}



function tryCallOne(fn,a){
try{
return fn(a);}
catch(ex){
LAST_ERROR=ex;
return IS_ERROR;}}


function tryCallTwo(fn,a,b){
try{
fn(a,b);}
catch(ex){
LAST_ERROR=ex;
return IS_ERROR;}}



module.exports=Promise;

function Promise(fn){
if(typeof this!=='object'){
throw new TypeError('Promises must be constructed via new');}

if(typeof fn!=='function'){
throw new TypeError('not a function');}

this._45=0;
this._81=0;
this._65=null;
this._54=null;
if(fn===noop)return;
doResolve(fn,this);}

Promise._10=null;
Promise._97=null;
Promise._61=noop;

Promise.prototype.then=function(onFulfilled,onRejected){
if(this.constructor!==Promise){
return safeThen(this,onFulfilled,onRejected);}

var res=new Promise(noop);
handle(this,new Handler(onFulfilled,onRejected,res));
return res;};


function safeThen(self,onFulfilled,onRejected){
return new self.constructor(function(resolve,reject){
var res=new Promise(noop);
res.then(resolve,reject);
handle(self,new Handler(onFulfilled,onRejected,res));});}

;
function handle(self,deferred){
while(self._81===3){
self=self._65;}

if(Promise._10){
Promise._10(self);}

if(self._81===0){
if(self._45===0){
self._45=1;
self._54=deferred;
return;}

if(self._45===1){
self._45=2;
self._54=[self._54,deferred];
return;}

self._54.push(deferred);
return;}

handleResolved(self,deferred);}


function handleResolved(self,deferred){
setImmediate(function(){
var cb=self._81===1?deferred.onFulfilled:deferred.onRejected;
if(cb===null){
if(self._81===1){
resolve(deferred.promise,self._65);}else 
{
reject(deferred.promise,self._65);}

return;}

var ret=tryCallOne(cb,self._65);
if(ret===IS_ERROR){
reject(deferred.promise,LAST_ERROR);}else 
{
resolve(deferred.promise,ret);}});}



function resolve(self,newValue){

if(newValue===self){
return reject(
self,
new TypeError('A promise cannot be resolved with itself.'));}


if(
newValue&&(
typeof newValue==='object'||typeof newValue==='function'))
{
var then=getThen(newValue);
if(then===IS_ERROR){
return reject(self,LAST_ERROR);}

if(
then===self.then&&
newValue instanceof Promise)
{
self._81=3;
self._65=newValue;
finale(self);
return;}else 
if(typeof then==='function'){
doResolve(then.bind(newValue),self);
return;}}


self._81=1;
self._65=newValue;
finale(self);}


function reject(self,newValue){
self._81=2;
self._65=newValue;
if(Promise._97){
Promise._97(self,newValue);}

finale(self);}

function finale(self){
if(self._45===1){
handle(self,self._54);
self._54=null;}

if(self._45===2){
for(var i=0;i<self._54.length;i++){
handle(self,self._54[i]);}

self._54=null;}}



function Handler(onFulfilled,onRejected,promise){
this.onFulfilled=typeof onFulfilled==='function'?onFulfilled:null;
this.onRejected=typeof onRejected==='function'?onRejected:null;
this.promise=promise;}








function doResolve(fn,promise){
var done=false;
var res=tryCallTwo(fn,function(value){
if(done)return;
done=true;
resolve(promise,value);},
function(reason){
if(done)return;
done=true;
reject(promise,reason);});

if(!done&&res===IS_ERROR){
done=true;
reject(promise,LAST_ERROR);}}
});
__d(376 /* promise/setimmediate/done.js */, function(global, require, module, exports) {'use strict';

var Promise=require(378 /* ./core.js */);

module.exports=Promise;
Promise.prototype.done=function(onFulfilled,onRejected){
var self=arguments.length?this.then.apply(this,arguments):this;
self.then(null,function(err){
setTimeout(function(){
throw err;},
0);});};
});
__d(383 /* promise/setimmediate/rejection-tracking.js */, function(global, require, module, exports) {'use strict';

var Promise=require(378 /* ./core */);

var DEFAULT_WHITELIST=[
ReferenceError,
TypeError,
RangeError];


var enabled=false;
exports.disable=disable;
function disable(){
enabled=false;
Promise._10=null;
Promise._97=null;}


exports.enable=enable;
function enable(options){
options=options||{};
if(enabled)disable();
enabled=true;
var id=0;
var displayId=0;
var rejections={};
Promise._10=function(promise){
if(
promise._81===2&&
rejections[promise._72])
{
if(rejections[promise._72].logged){
onHandled(promise._72);}else 
{
clearTimeout(rejections[promise._72].timeout);}

delete rejections[promise._72];}};


Promise._97=function(promise,err){
if(promise._45===0){
promise._72=id++;
rejections[promise._72]={
displayId:null,
error:err,
timeout:setTimeout(
onUnhandled.bind(null,promise._72),




matchWhitelist(err,DEFAULT_WHITELIST)?
100:
2000),

logged:false};}};



function onUnhandled(id){
if(
options.allRejections||
matchWhitelist(
rejections[id].error,
options.whitelist||DEFAULT_WHITELIST))

{
rejections[id].displayId=displayId++;
if(options.onUnhandled){
rejections[id].logged=true;
options.onUnhandled(
rejections[id].displayId,
rejections[id].error);}else 

{
rejections[id].logged=true;
logError(
rejections[id].displayId,
rejections[id].error);}}}




function onHandled(id){
if(rejections[id].logged){
if(options.onHandled){
options.onHandled(rejections[id].displayId,rejections[id].error);}else 
if(!rejections[id].onUnhandled){
console.warn(
'Promise Rejection Handled (id: '+rejections[id].displayId+'):');

console.warn(
'  This means you can ignore any previous messages of the form "Possible Unhandled Promise Rejection" with id '+
rejections[id].displayId+'.');}}}}






function logError(id,error){
console.warn('Possible Unhandled Promise Rejection (id: '+id+'):');
var errStr=(error&&(error.stack||error))+'';
errStr.split('\n').forEach(function(line){
console.warn('  '+line);});}



function matchWhitelist(error,list){
return list.some(function(cls){
return error instanceof cls;});}
});
__d(36 /* SourceMap */, function(global, require, module, exports) {var 























scope={};
wrapper.call(scope);

module.exports=scope.sourceMap;

function wrapper(){














function define(moduleName,deps,payload){
if(typeof moduleName!="string"){
throw new TypeError('Expected string, got: '+moduleName);}


if(arguments.length==2){
payload=deps;}


if(moduleName in define.modules){
throw new Error("Module already defined: "+moduleName);}

define.modules[moduleName]=payload;}
;




define.modules={};










function Domain(){
this.modules={};
this._currentModule=null;}


(function(){
















Domain.prototype.require=function(deps,callback){
if(Array.isArray(deps)){
var params=deps.map(function(dep){
return this.lookup(dep);},
this);
if(callback){
callback.apply(null,params);}

return undefined;}else 

{
return this.lookup(deps);}};



function normalize(path){
var bits=path.split('/');
var i=1;
while(i<bits.length){
if(bits[i]==='..'){
bits.splice(i-1,1);}else 
if(bits[i]==='.'){
bits.splice(i,1);}else 
{
i++;}}


return bits.join('/');}


function join(a,b){
a=a.trim();
b=b.trim();
if(/^\//.test(b)){
return b;}else 
{
return a.replace(/\/*$/,'/')+b;}}



function dirname(path){
var bits=path.split('/');
bits.pop();
return bits.join('/');}








Domain.prototype.lookup=function(moduleName){
if(/^\./.test(moduleName)){
moduleName=normalize(join(dirname(this._currentModule),moduleName));}


if(moduleName in this.modules){
var module=this.modules[moduleName];
return module;}


if(!(moduleName in define.modules)){
throw new Error("Module not defined: "+moduleName);}


var module=define.modules[moduleName];

if(typeof module=="function"){
var exports={};
var previousModule=this._currentModule;
this._currentModule=moduleName;
module(this.require.bind(this),exports,{id:moduleName,uri:""});
this._currentModule=previousModule;
module=exports;}



this.modules[moduleName]=module;

return module;};})();




define.Domain=Domain;
define.globalDomain=new Domain();
var require=define.globalDomain.require.bind(define.globalDomain);






define('source-map/source-map-generator',['require','exports','module','source-map/base64-vlq','source-map/util','source-map/array-set'],function(require,exports,module){

var base64VLQ=require('./base64-vlq');
var util=require('./util');
var ArraySet=require('./array-set').ArraySet;









function SourceMapGenerator(aArgs){
this._file=util.getArg(aArgs,'file');
this._sourceRoot=util.getArg(aArgs,'sourceRoot',null);
this._sources=new ArraySet();
this._names=new ArraySet();
this._mappings=[];
this._sourcesContents=null;}


SourceMapGenerator.prototype._version=3;






SourceMapGenerator.fromSourceMap=
function SourceMapGenerator_fromSourceMap(aSourceMapConsumer){
var sourceRoot=aSourceMapConsumer.sourceRoot;
var generator=new SourceMapGenerator({
file:aSourceMapConsumer.file,
sourceRoot:sourceRoot});

aSourceMapConsumer.eachMapping(function(mapping){
var newMapping={
generated:{
line:mapping.generatedLine,
column:mapping.generatedColumn}};



if(mapping.source){
newMapping.source=mapping.source;
if(sourceRoot){
newMapping.source=util.relative(sourceRoot,newMapping.source);}


newMapping.original={
line:mapping.originalLine,
column:mapping.originalColumn};


if(mapping.name){
newMapping.name=mapping.name;}}



generator.addMapping(newMapping);});

aSourceMapConsumer.sources.forEach(function(sourceFile){
var content=aSourceMapConsumer.sourceContentFor(sourceFile);
if(content){
generator.setSourceContent(sourceFile,content);}});


return generator;};












SourceMapGenerator.prototype.addMapping=
function SourceMapGenerator_addMapping(aArgs){
var generated=util.getArg(aArgs,'generated');
var original=util.getArg(aArgs,'original',null);
var source=util.getArg(aArgs,'source',null);
var name=util.getArg(aArgs,'name',null);

this._validateMapping(generated,original,source,name);

if(source&&!this._sources.has(source)){
this._sources.add(source);}


if(name&&!this._names.has(name)){
this._names.add(name);}


this._mappings.push({
generatedLine:generated.line,
generatedColumn:generated.column,
originalLine:original!=null&&original.line,
originalColumn:original!=null&&original.column,
source:source,
name:name});};






SourceMapGenerator.prototype.setSourceContent=
function SourceMapGenerator_setSourceContent(aSourceFile,aSourceContent){
var source=aSourceFile;
if(this._sourceRoot){
source=util.relative(this._sourceRoot,source);}


if(aSourceContent!==null){


if(!this._sourcesContents){
this._sourcesContents={};}

this._sourcesContents[util.toSetString(source)]=aSourceContent;}else 
{


delete this._sourcesContents[util.toSetString(source)];
if(Object.keys(this._sourcesContents).length===0){
this._sourcesContents=null;}}};














SourceMapGenerator.prototype.applySourceMap=
function SourceMapGenerator_applySourceMap(aSourceMapConsumer,aSourceFile){

if(!aSourceFile){
aSourceFile=aSourceMapConsumer.file;}

var sourceRoot=this._sourceRoot;

if(sourceRoot){
aSourceFile=util.relative(sourceRoot,aSourceFile);}



var newSources=new ArraySet();
var newNames=new ArraySet();


this._mappings.forEach(function(mapping){
if(mapping.source===aSourceFile&&mapping.originalLine){

var original=aSourceMapConsumer.originalPositionFor({
line:mapping.originalLine,
column:mapping.originalColumn});

if(original.source!==null){

if(sourceRoot){
mapping.source=util.relative(sourceRoot,original.source);}else 
{
mapping.source=original.source;}

mapping.originalLine=original.line;
mapping.originalColumn=original.column;
if(original.name!==null&&mapping.name!==null){


mapping.name=original.name;}}}




var source=mapping.source;
if(source&&!newSources.has(source)){
newSources.add(source);}


var name=mapping.name;
if(name&&!newNames.has(name)){
newNames.add(name);}},


this);
this._sources=newSources;
this._names=newNames;


aSourceMapConsumer.sources.forEach(function(sourceFile){
var content=aSourceMapConsumer.sourceContentFor(sourceFile);
if(content){
if(sourceRoot){
sourceFile=util.relative(sourceRoot,sourceFile);}

this.setSourceContent(sourceFile,content);}},

this);};













SourceMapGenerator.prototype._validateMapping=
function SourceMapGenerator_validateMapping(aGenerated,aOriginal,aSource,
aName){
if(aGenerated&&'line' in aGenerated&&'column' in aGenerated&&
aGenerated.line>0&&aGenerated.column>=0&&
!aOriginal&&!aSource&&!aName){

return;}else 

if(aGenerated&&'line' in aGenerated&&'column' in aGenerated&&
aOriginal&&'line' in aOriginal&&'column' in aOriginal&&
aGenerated.line>0&&aGenerated.column>=0&&
aOriginal.line>0&&aOriginal.column>=0&&
aSource){

return;}else 

{
throw new Error('Invalid mapping: '+JSON.stringify({
generated:aGenerated,
source:aSource,
orginal:aOriginal,
name:aName}));}};








SourceMapGenerator.prototype._serializeMappings=
function SourceMapGenerator_serializeMappings(){
var previousGeneratedColumn=0;
var previousGeneratedLine=1;
var previousOriginalColumn=0;
var previousOriginalLine=0;
var previousName=0;
var previousSource=0;
var result='';
var mapping;






this._mappings.sort(util.compareByGeneratedPositions);

for(var i=0,len=this._mappings.length;i<len;i++){
mapping=this._mappings[i];

if(mapping.generatedLine!==previousGeneratedLine){
previousGeneratedColumn=0;
while(mapping.generatedLine!==previousGeneratedLine){
result+=';';
previousGeneratedLine++;}}else 


{
if(i>0){
if(!util.compareByGeneratedPositions(mapping,this._mappings[i-1])){
continue;}

result+=',';}}



result+=base64VLQ.encode(mapping.generatedColumn-
previousGeneratedColumn);
previousGeneratedColumn=mapping.generatedColumn;

if(mapping.source){
result+=base64VLQ.encode(this._sources.indexOf(mapping.source)-
previousSource);
previousSource=this._sources.indexOf(mapping.source);


result+=base64VLQ.encode(mapping.originalLine-1-
previousOriginalLine);
previousOriginalLine=mapping.originalLine-1;

result+=base64VLQ.encode(mapping.originalColumn-
previousOriginalColumn);
previousOriginalColumn=mapping.originalColumn;

if(mapping.name){
result+=base64VLQ.encode(this._names.indexOf(mapping.name)-
previousName);
previousName=this._names.indexOf(mapping.name);}}}




return result;};


SourceMapGenerator.prototype._generateSourcesContent=
function SourceMapGenerator_generateSourcesContent(aSources,aSourceRoot){
return aSources.map(function(source){
if(!this._sourcesContents){
return null;}

if(aSourceRoot){
source=util.relative(aSourceRoot,source);}

var key=util.toSetString(source);
return Object.prototype.hasOwnProperty.call(this._sourcesContents,
key)?
this._sourcesContents[key]:
null;},
this);};





SourceMapGenerator.prototype.toJSON=
function SourceMapGenerator_toJSON(){
var map={
version:this._version,
file:this._file,
sources:this._sources.toArray(),
names:this._names.toArray(),
mappings:this._serializeMappings()};

if(this._sourceRoot){
map.sourceRoot=this._sourceRoot;}

if(this._sourcesContents){
map.sourcesContent=this._generateSourcesContent(map.sources,map.sourceRoot);}


return map;};





SourceMapGenerator.prototype.toString=
function SourceMapGenerator_toString(){
return JSON.stringify(this);};


exports.SourceMapGenerator=SourceMapGenerator;});






































define('source-map/base64-vlq',['require','exports','module','source-map/base64'],function(require,exports,module){

var base64=require('./base64');













var VLQ_BASE_SHIFT=5;


var VLQ_BASE=1<<VLQ_BASE_SHIFT;


var VLQ_BASE_MASK=VLQ_BASE-1;


var VLQ_CONTINUATION_BIT=VLQ_BASE;







function toVLQSigned(aValue){
return aValue<0?
(-aValue<<1)+1:
(aValue<<1)+0;}








function fromVLQSigned(aValue){
var isNegative=(aValue&1)===1;
var shifted=aValue>>1;
return isNegative?
-shifted:
shifted;}





exports.encode=function base64VLQ_encode(aValue){
var encoded="";
var digit;

var vlq=toVLQSigned(aValue);

do {
digit=vlq&VLQ_BASE_MASK;
vlq>>>=VLQ_BASE_SHIFT;
if(vlq>0){


digit|=VLQ_CONTINUATION_BIT;}

encoded+=base64.encode(digit);}while(
vlq>0);

return encoded;};






exports.decode=function base64VLQ_decode(aStr){
var i=0;
var strLen=aStr.length;
var result=0;
var shift=0;
var continuation,digit;

do {
if(i>=strLen){
throw new Error("Expected more digits in base 64 VLQ value.");}

digit=base64.decode(aStr.charAt(i++));
continuation=!!(digit&VLQ_CONTINUATION_BIT);
digit&=VLQ_BASE_MASK;
result=result+(digit<<shift);
shift+=VLQ_BASE_SHIFT;}while(
continuation);

return {
value:fromVLQSigned(result),
rest:aStr.slice(i)};};});










define('source-map/base64',['require','exports','module'],function(require,exports,module){

var charToIntMap={};
var intToCharMap={};

'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.
split('').
forEach(function(ch,index){
charToIntMap[ch]=index;
intToCharMap[index]=ch;});





exports.encode=function base64_encode(aNumber){
if(aNumber in intToCharMap){
return intToCharMap[aNumber];}

throw new TypeError("Must be between 0 and 63: "+aNumber);};





exports.decode=function base64_decode(aChar){
if(aChar in charToIntMap){
return charToIntMap[aChar];}

throw new TypeError("Not a valid base 64 digit: "+aChar);};});









define('source-map/util',['require','exports','module'],function(require,exports,module){











function getArg(aArgs,aName,aDefaultValue){
if(aName in aArgs){
return aArgs[aName];}else 
if(arguments.length===3){
return aDefaultValue;}else 
{
throw new Error('"'+aName+'" is a required argument.');}}


exports.getArg=getArg;

var urlRegexp=/([\w+\-.]+):\/\/((\w+:\w+)@)?([\w.]+)?(:(\d+))?(\S+)?/;
var dataUrlRegexp=/^data:.+\,.+/;

function urlParse(aUrl){
var match=aUrl.match(urlRegexp);
if(!match){
return null;}

return {
scheme:match[1],
auth:match[3],
host:match[4],
port:match[6],
path:match[7]};}


exports.urlParse=urlParse;

function urlGenerate(aParsedUrl){
var url=aParsedUrl.scheme+"://";
if(aParsedUrl.auth){
url+=aParsedUrl.auth+"@";}

if(aParsedUrl.host){
url+=aParsedUrl.host;}

if(aParsedUrl.port){
url+=":"+aParsedUrl.port;}

if(aParsedUrl.path){
url+=aParsedUrl.path;}

return url;}

exports.urlGenerate=urlGenerate;

function join(aRoot,aPath){
var url;

if(aPath.match(urlRegexp)||aPath.match(dataUrlRegexp)){
return aPath;}


if(aPath.charAt(0)==='/'&&(url=urlParse(aRoot))){
url.path=aPath;
return urlGenerate(url);}


return aRoot.replace(/\/$/,'')+'/'+aPath;}

exports.join=join;










function toSetString(aStr){
return '$'+aStr;}

exports.toSetString=toSetString;

function fromSetString(aStr){
return aStr.substr(1);}

exports.fromSetString=fromSetString;

function relative(aRoot,aPath){
aRoot=aRoot.replace(/\/$/,'');

var url=urlParse(aRoot);
if(aPath.charAt(0)=="/"&&url&&url.path=="/"){
return aPath.slice(1);}


return aPath.indexOf(aRoot+'/')===0?
aPath.substr(aRoot.length+1):
aPath;}

exports.relative=relative;

function strcmp(aStr1,aStr2){
var s1=aStr1||"";
var s2=aStr2||"";
return (s1>s2)-(s1<s2);}










function compareByOriginalPositions(mappingA,mappingB,onlyCompareOriginal){
var cmp;

cmp=strcmp(mappingA.source,mappingB.source);
if(cmp){
return cmp;}


cmp=mappingA.originalLine-mappingB.originalLine;
if(cmp){
return cmp;}


cmp=mappingA.originalColumn-mappingB.originalColumn;
if(cmp||onlyCompareOriginal){
return cmp;}


cmp=strcmp(mappingA.name,mappingB.name);
if(cmp){
return cmp;}


cmp=mappingA.generatedLine-mappingB.generatedLine;
if(cmp){
return cmp;}


return mappingA.generatedColumn-mappingB.generatedColumn;}
;
exports.compareByOriginalPositions=compareByOriginalPositions;










function compareByGeneratedPositions(mappingA,mappingB,onlyCompareGenerated){
var cmp;

cmp=mappingA.generatedLine-mappingB.generatedLine;
if(cmp){
return cmp;}


cmp=mappingA.generatedColumn-mappingB.generatedColumn;
if(cmp||onlyCompareGenerated){
return cmp;}


cmp=strcmp(mappingA.source,mappingB.source);
if(cmp){
return cmp;}


cmp=mappingA.originalLine-mappingB.originalLine;
if(cmp){
return cmp;}


cmp=mappingA.originalColumn-mappingB.originalColumn;
if(cmp){
return cmp;}


return strcmp(mappingA.name,mappingB.name);}
;
exports.compareByGeneratedPositions=compareByGeneratedPositions;});








define('source-map/array-set',['require','exports','module','source-map/util'],function(require,exports,module){

var util=require('./util');







function ArraySet(){
this._array=[];
this._set={};}





ArraySet.fromArray=function ArraySet_fromArray(aArray,aAllowDuplicates){
var set=new ArraySet();
for(var i=0,len=aArray.length;i<len;i++){
set.add(aArray[i],aAllowDuplicates);}

return set;};







ArraySet.prototype.add=function ArraySet_add(aStr,aAllowDuplicates){
var isDuplicate=this.has(aStr);
var idx=this._array.length;
if(!isDuplicate||aAllowDuplicates){
this._array.push(aStr);}

if(!isDuplicate){
this._set[util.toSetString(aStr)]=idx;}};








ArraySet.prototype.has=function ArraySet_has(aStr){
return Object.prototype.hasOwnProperty.call(this._set,
util.toSetString(aStr));};







ArraySet.prototype.indexOf=function ArraySet_indexOf(aStr){
if(this.has(aStr)){
return this._set[util.toSetString(aStr)];}

throw new Error('"'+aStr+'" is not in the set.');};







ArraySet.prototype.at=function ArraySet_at(aIdx){
if(aIdx>=0&&aIdx<this._array.length){
return this._array[aIdx];}

throw new Error('No element indexed by '+aIdx);};







ArraySet.prototype.toArray=function ArraySet_toArray(){
return this._array.slice();};


exports.ArraySet=ArraySet;});








define('source-map/source-map-consumer',['require','exports','module','source-map/util','source-map/binary-search','source-map/array-set','source-map/base64-vlq'],function(require,exports,module){

var util=require('./util');
var binarySearch=require('./binary-search');
var ArraySet=require('./array-set').ArraySet;
var base64VLQ=require('./base64-vlq');































function SourceMapConsumer(aSourceMap){
var sourceMap=aSourceMap;
if(typeof aSourceMap==='string'){
sourceMap=JSON.parse(aSourceMap.replace(/^\)\]\}'/,''));}


var version=util.getArg(sourceMap,'version');
var sources=util.getArg(sourceMap,'sources');


var names=util.getArg(sourceMap,'names',[]);
var sourceRoot=util.getArg(sourceMap,'sourceRoot',null);
var sourcesContent=util.getArg(sourceMap,'sourcesContent',null);
var mappings=util.getArg(sourceMap,'mappings');
var file=util.getArg(sourceMap,'file',null);



if(version!=this._version){
throw new Error('Unsupported version: '+version);}






this._names=ArraySet.fromArray(names,true);
this._sources=ArraySet.fromArray(sources,true);

this.sourceRoot=sourceRoot;
this.sourcesContent=sourcesContent;
this._mappings=mappings;
this.file=file;}









SourceMapConsumer.fromSourceMap=
function SourceMapConsumer_fromSourceMap(aSourceMap){
var smc=Object.create(SourceMapConsumer.prototype);

smc._names=ArraySet.fromArray(aSourceMap._names.toArray(),true);
smc._sources=ArraySet.fromArray(aSourceMap._sources.toArray(),true);
smc.sourceRoot=aSourceMap._sourceRoot;
smc.sourcesContent=aSourceMap._generateSourcesContent(smc._sources.toArray(),
smc.sourceRoot);
smc.file=aSourceMap._file;

smc.__generatedMappings=aSourceMap._mappings.slice().
sort(util.compareByGeneratedPositions);
smc.__originalMappings=aSourceMap._mappings.slice().
sort(util.compareByOriginalPositions);

return smc;};





SourceMapConsumer.prototype._version=3;




Object.defineProperty(SourceMapConsumer.prototype,'sources',{
get:function(){
return this._sources.toArray().map(function(s){
return this.sourceRoot?util.join(this.sourceRoot,s):s;},
this);}});

































SourceMapConsumer.prototype.__generatedMappings=null;
Object.defineProperty(SourceMapConsumer.prototype,'_generatedMappings',{
get:function(){
if(!this.__generatedMappings){
this.__generatedMappings=[];
this.__originalMappings=[];
this._parseMappings(this._mappings,this.sourceRoot);}


return this.__generatedMappings;}});



SourceMapConsumer.prototype.__originalMappings=null;
Object.defineProperty(SourceMapConsumer.prototype,'_originalMappings',{
get:function(){
if(!this.__originalMappings){
this.__generatedMappings=[];
this.__originalMappings=[];
this._parseMappings(this._mappings,this.sourceRoot);}


return this.__originalMappings;}});








SourceMapConsumer.prototype._parseMappings=
function SourceMapConsumer_parseMappings(aStr,aSourceRoot){
var generatedLine=1;
var previousGeneratedColumn=0;
var previousOriginalLine=0;
var previousOriginalColumn=0;
var previousSource=0;
var previousName=0;
var mappingSeparator=/^[,;]/;
var str=aStr;
var mapping;
var temp;

while(str.length>0){
if(str.charAt(0)===';'){
generatedLine++;
str=str.slice(1);
previousGeneratedColumn=0;}else 

if(str.charAt(0)===','){
str=str.slice(1);}else 

{
mapping={};
mapping.generatedLine=generatedLine;


temp=base64VLQ.decode(str);
mapping.generatedColumn=previousGeneratedColumn+temp.value;
previousGeneratedColumn=mapping.generatedColumn;
str=temp.rest;

if(str.length>0&&!mappingSeparator.test(str.charAt(0))){

temp=base64VLQ.decode(str);
mapping.source=this._sources.at(previousSource+temp.value);
previousSource+=temp.value;
str=temp.rest;
if(str.length===0||mappingSeparator.test(str.charAt(0))){
throw new Error('Found a source, but no line and column');}



temp=base64VLQ.decode(str);
mapping.originalLine=previousOriginalLine+temp.value;
previousOriginalLine=mapping.originalLine;

mapping.originalLine+=1;
str=temp.rest;
if(str.length===0||mappingSeparator.test(str.charAt(0))){
throw new Error('Found a source and line, but no column');}



temp=base64VLQ.decode(str);
mapping.originalColumn=previousOriginalColumn+temp.value;
previousOriginalColumn=mapping.originalColumn;
str=temp.rest;

if(str.length>0&&!mappingSeparator.test(str.charAt(0))){

temp=base64VLQ.decode(str);
mapping.name=this._names.at(previousName+temp.value);
previousName+=temp.value;
str=temp.rest;}}



this.__generatedMappings.push(mapping);
if(typeof mapping.originalLine==='number'){
this.__originalMappings.push(mapping);}}}




this.__originalMappings.sort(util.compareByOriginalPositions);};






SourceMapConsumer.prototype._findMapping=
function SourceMapConsumer_findMapping(aNeedle,aMappings,aLineName,
aColumnName,aComparator){





if(aNeedle[aLineName]<=0){
throw new TypeError('Line must be greater than or equal to 1, got '+
aNeedle[aLineName]);}

if(aNeedle[aColumnName]<0){
throw new TypeError('Column must be greater than or equal to 0, got '+
aNeedle[aColumnName]);}


return binarySearch.search(aNeedle,aMappings,aComparator);};

















SourceMapConsumer.prototype.originalPositionFor=
function SourceMapConsumer_originalPositionFor(aArgs){
var needle={
generatedLine:util.getArg(aArgs,'line'),
generatedColumn:util.getArg(aArgs,'column')};


var mapping=this._findMapping(needle,
this._generatedMappings,
"generatedLine",
"generatedColumn",
util.compareByGeneratedPositions);

if(mapping){
var source=util.getArg(mapping,'source',null);
if(source&&this.sourceRoot){
source=util.join(this.sourceRoot,source);}

return {
source:source,
line:util.getArg(mapping,'originalLine',null),
column:util.getArg(mapping,'originalColumn',null),
name:util.getArg(mapping,'name',null)};}



return {
source:null,
line:null,
column:null,
name:null};};








SourceMapConsumer.prototype.sourceContentFor=
function SourceMapConsumer_sourceContentFor(aSource){
if(!this.sourcesContent){
return null;}


if(this.sourceRoot){
aSource=util.relative(this.sourceRoot,aSource);}


if(this._sources.has(aSource)){
return this.sourcesContent[this._sources.indexOf(aSource)];}


var url;
if(this.sourceRoot&&(
url=util.urlParse(this.sourceRoot))){




var fileUriAbsPath=aSource.replace(/^file:\/\//,"");
if(url.scheme=="file"&&
this._sources.has(fileUriAbsPath)){
return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)];}


if((!url.path||url.path=="/")&&
this._sources.has("/"+aSource)){
return this.sourcesContent[this._sources.indexOf("/"+aSource)];}}



throw new Error('"'+aSource+'" is not in the SourceMap.');};
















SourceMapConsumer.prototype.generatedPositionFor=
function SourceMapConsumer_generatedPositionFor(aArgs){
var needle={
source:util.getArg(aArgs,'source'),
originalLine:util.getArg(aArgs,'line'),
originalColumn:util.getArg(aArgs,'column')};


if(this.sourceRoot){
needle.source=util.relative(this.sourceRoot,needle.source);}


var mapping=this._findMapping(needle,
this._originalMappings,
"originalLine",
"originalColumn",
util.compareByOriginalPositions);

if(mapping){
return {
line:util.getArg(mapping,'generatedLine',null),
column:util.getArg(mapping,'generatedColumn',null)};}



return {
line:null,
column:null};};



SourceMapConsumer.GENERATED_ORDER=1;
SourceMapConsumer.ORIGINAL_ORDER=2;

















SourceMapConsumer.prototype.eachMapping=
function SourceMapConsumer_eachMapping(aCallback,aContext,aOrder){
var context=aContext||null;
var order=aOrder||SourceMapConsumer.GENERATED_ORDER;

var mappings;
switch(order){
case SourceMapConsumer.GENERATED_ORDER:
mappings=this._generatedMappings;
break;
case SourceMapConsumer.ORIGINAL_ORDER:
mappings=this._originalMappings;
break;
default:
throw new Error("Unknown order of iteration.");}


var sourceRoot=this.sourceRoot;
mappings.map(function(mapping){
var source=mapping.source;
if(source&&sourceRoot){
source=util.join(sourceRoot,source);}

return {
source:source,
generatedLine:mapping.generatedLine,
generatedColumn:mapping.generatedColumn,
originalLine:mapping.originalLine,
originalColumn:mapping.originalColumn,
name:mapping.name};}).

forEach(aCallback,context);};


exports.SourceMapConsumer=SourceMapConsumer;});








define('source-map/binary-search',['require','exports','module'],function(require,exports,module){










function recursiveSearch(aLow,aHigh,aNeedle,aHaystack,aCompare){










var mid=Math.floor((aHigh-aLow)/2)+aLow;
var cmp=aCompare(aNeedle,aHaystack[mid],true);
if(cmp===0){

return aHaystack[mid];}else 

if(cmp>0){

if(aHigh-mid>1){

return recursiveSearch(mid,aHigh,aNeedle,aHaystack,aCompare);}



return aHaystack[mid];}else 

{

if(mid-aLow>1){

return recursiveSearch(aLow,mid,aNeedle,aHaystack,aCompare);}



return aLow<0?
null:
aHaystack[aLow];}}
















exports.search=function search(aNeedle,aHaystack,aCompare){
return aHaystack.length>0?
recursiveSearch(-1,aHaystack.length,aNeedle,aHaystack,aCompare):
null;};});









define('source-map/source-node',['require','exports','module','source-map/source-map-generator','source-map/util'],function(require,exports,module){

var SourceMapGenerator=require('./source-map-generator').SourceMapGenerator;
var util=require('./util');













function SourceNode(aLine,aColumn,aSource,aChunks,aName){
this.children=[];
this.sourceContents={};
this.line=aLine===undefined?null:aLine;
this.column=aColumn===undefined?null:aColumn;
this.source=aSource===undefined?null:aSource;
this.name=aName===undefined?null:aName;
if(aChunks!=null)this.add(aChunks);}








SourceNode.fromStringWithSourceMap=
function SourceNode_fromStringWithSourceMap(aGeneratedCode,aSourceMapConsumer){


var node=new SourceNode();



var remainingLines=aGeneratedCode.split('\n');


var lastGeneratedLine=1,lastGeneratedColumn=0;




var lastMapping=null;

aSourceMapConsumer.eachMapping(function(mapping){
if(lastMapping===null){



while(lastGeneratedLine<mapping.generatedLine){
node.add(remainingLines.shift()+"\n");
lastGeneratedLine++;}

if(lastGeneratedColumn<mapping.generatedColumn){
var nextLine=remainingLines[0];
node.add(nextLine.substr(0,mapping.generatedColumn));
remainingLines[0]=nextLine.substr(mapping.generatedColumn);
lastGeneratedColumn=mapping.generatedColumn;}}else 

{


if(lastGeneratedLine<mapping.generatedLine){
var code="";

do {
code+=remainingLines.shift()+"\n";
lastGeneratedLine++;
lastGeneratedColumn=0;}while(
lastGeneratedLine<mapping.generatedLine);


if(lastGeneratedColumn<mapping.generatedColumn){
var nextLine=remainingLines[0];
code+=nextLine.substr(0,mapping.generatedColumn);
remainingLines[0]=nextLine.substr(mapping.generatedColumn);
lastGeneratedColumn=mapping.generatedColumn;}


addMappingWithCode(lastMapping,code);}else 
{



var nextLine=remainingLines[0];
var code=nextLine.substr(0,mapping.generatedColumn-
lastGeneratedColumn);
remainingLines[0]=nextLine.substr(mapping.generatedColumn-
lastGeneratedColumn);
lastGeneratedColumn=mapping.generatedColumn;
addMappingWithCode(lastMapping,code);}}


lastMapping=mapping;},
this);



addMappingWithCode(lastMapping,remainingLines.join("\n"));


aSourceMapConsumer.sources.forEach(function(sourceFile){
var content=aSourceMapConsumer.sourceContentFor(sourceFile);
if(content){
node.setSourceContent(sourceFile,content);}});



return node;

function addMappingWithCode(mapping,code){
if(mapping===null||mapping.source===undefined){
node.add(code);}else 
{
node.add(new SourceNode(mapping.originalLine,
mapping.originalColumn,
mapping.source,
code,
mapping.name));}}};










SourceNode.prototype.add=function SourceNode_add(aChunk){
if(Array.isArray(aChunk)){
aChunk.forEach(function(chunk){
this.add(chunk);},
this);}else 

if(aChunk instanceof SourceNode||typeof aChunk==="string"){
if(aChunk){
this.children.push(aChunk);}}else 


{
throw new TypeError(
"Expected a SourceNode, string, or an array of SourceNodes and strings. Got "+aChunk);}


return this;};








SourceNode.prototype.prepend=function SourceNode_prepend(aChunk){
if(Array.isArray(aChunk)){
for(var i=aChunk.length-1;i>=0;i--){
this.prepend(aChunk[i]);}}else 


if(aChunk instanceof SourceNode||typeof aChunk==="string"){
this.children.unshift(aChunk);}else 

{
throw new TypeError(
"Expected a SourceNode, string, or an array of SourceNodes and strings. Got "+aChunk);}


return this;};









SourceNode.prototype.walk=function SourceNode_walk(aFn){
var chunk;
for(var i=0,len=this.children.length;i<len;i++){
chunk=this.children[i];
if(chunk instanceof SourceNode){
chunk.walk(aFn);}else 

{
if(chunk!==''){
aFn(chunk,{source:this.source,
line:this.line,
column:this.column,
name:this.name});}}}};











SourceNode.prototype.join=function SourceNode_join(aSep){
var newChildren;
var i;
var len=this.children.length;
if(len>0){
newChildren=[];
for(i=0;i<len-1;i++){
newChildren.push(this.children[i]);
newChildren.push(aSep);}

newChildren.push(this.children[i]);
this.children=newChildren;}

return this;};









SourceNode.prototype.replaceRight=function SourceNode_replaceRight(aPattern,aReplacement){
var lastChild=this.children[this.children.length-1];
if(lastChild instanceof SourceNode){
lastChild.replaceRight(aPattern,aReplacement);}else 

if(typeof lastChild==='string'){
this.children[this.children.length-1]=lastChild.replace(aPattern,aReplacement);}else 

{
this.children.push(''.replace(aPattern,aReplacement));}

return this;};









SourceNode.prototype.setSourceContent=
function SourceNode_setSourceContent(aSourceFile,aSourceContent){
this.sourceContents[util.toSetString(aSourceFile)]=aSourceContent;};








SourceNode.prototype.walkSourceContents=
function SourceNode_walkSourceContents(aFn){
for(var i=0,len=this.children.length;i<len;i++){
if(this.children[i] instanceof SourceNode){
this.children[i].walkSourceContents(aFn);}}



var sources=Object.keys(this.sourceContents);
for(var i=0,len=sources.length;i<len;i++){
aFn(util.fromSetString(sources[i]),this.sourceContents[sources[i]]);}};







SourceNode.prototype.toString=function SourceNode_toString(){
var str="";
this.walk(function(chunk){
str+=chunk;});

return str;};






SourceNode.prototype.toStringWithSourceMap=function SourceNode_toStringWithSourceMap(aArgs){
var generated={
code:"",
line:1,
column:0};

var map=new SourceMapGenerator(aArgs);
var sourceMappingActive=false;
var lastOriginalSource=null;
var lastOriginalLine=null;
var lastOriginalColumn=null;
var lastOriginalName=null;
this.walk(function(chunk,original){
generated.code+=chunk;
if(original.source!==null&&
original.line!==null&&
original.column!==null){
if(lastOriginalSource!==original.source||
lastOriginalLine!==original.line||
lastOriginalColumn!==original.column||
lastOriginalName!==original.name){
map.addMapping({
source:original.source,
original:{
line:original.line,
column:original.column},

generated:{
line:generated.line,
column:generated.column},

name:original.name});}


lastOriginalSource=original.source;
lastOriginalLine=original.line;
lastOriginalColumn=original.column;
lastOriginalName=original.name;
sourceMappingActive=true;}else 
if(sourceMappingActive){
map.addMapping({
generated:{
line:generated.line,
column:generated.column}});


lastOriginalSource=null;
sourceMappingActive=false;}

chunk.split('').forEach(function(ch){
if(ch==='\n'){
generated.line++;
generated.column=0;}else 
{
generated.column++;}});});



this.walkSourceContents(function(sourceFile,sourceContent){
map.setSourceContent(sourceFile,sourceContent);});


return {code:generated.code,map:map};};


exports.SourceNode=SourceNode;});





this.sourceMap={
SourceMapConsumer:require('source-map/source-map-consumer').SourceMapConsumer,
SourceMapGenerator:require('source-map/source-map-generator').SourceMapGenerator,
SourceNode:require('source-map/source-node').SourceNode};}
});
__d(340 /* react-native/Libraries/JavaScriptAppEngine/Initialization/source-map-url.js */, function(global, require, module, exports) {(














function(){
var define=null;




void function(root,factory){
if(typeof define==="function"&&define.amd){
define(factory);}else 
if(typeof exports==="object"){
module.exports=factory();}else 
{
root.sourceMappingURL=factory();}}(

this,function(){

var innerRegex=/[#@] source(?:Mapping)?URL=([^\s'"]*)/;

var regex=RegExp(
"(?:"+
"/\\*"+
"(?:\\s*\r?\n(?://)?)?"+
"(?:"+innerRegex.source+")"+
"\\s*"+
"\\*/"+
"|"+
"//(?:"+innerRegex.source+")"+
")"+
"\\s*$");


return {

regex:regex,
_innerRegex:innerRegex,

getFrom:function(code){
var match=code.match(regex);
return match?match[1]||match[2]||"":null;},


existsIn:function(code){
return regex.test(code);},


removeFrom:function(code){
return code.replace(regex,"");},


insertBefore:function(code,string){
var match=code.match(regex);
if(match){
return code.slice(0,match.index)+string+code.slice(match.index);}else 
{
return code+string;}}};});})();
});
__d(37 /* findNodeHandle */, function(global, require, module, exports) {'use strict';













var ReactCurrentOwner=require(38 /* ReactCurrentOwner */);
var ReactInstanceMap=require(39 /* ReactInstanceMap */);
var ReactNativeTagHandles=require(40 /* ReactNativeTagHandles */);

var invariant=require(363 /* fbjs/lib/invariant */);
var warning=require(368 /* fbjs/lib/warning */);































function findNodeHandle(componentOrHandle){
if(__DEV__){
var owner=ReactCurrentOwner.current;
if(owner!==null){
warning(
owner._warnedAboutRefsInRender,
'%s is accessing findNodeHandle inside its render(). '+
'render() should be a pure function of props and state. It should '+
'never access something that requires stale data from the previous '+
'render, such as refs. Move this logic to componentDidMount and '+
'componentDidUpdate instead.',
owner.getName()||'A component');

owner._warnedAboutRefsInRender=true;}}


if(componentOrHandle==null){
return null;}

if(typeof componentOrHandle==='number'){

return componentOrHandle;}


var component=componentOrHandle;



var internalInstance=ReactInstanceMap.get(component);
if(internalInstance){
return ReactNativeTagHandles.rootNodeIDToTag[internalInstance._rootNodeID];}else 
{
var rootNodeID=component._rootNodeID;
if(rootNodeID){
return ReactNativeTagHandles.rootNodeIDToTag[rootNodeID];}else 
{
invariant(


typeof component==='object'&&
'_rootNodeID' in component||


component.render!=null&&
typeof component.render==='function',

'findNodeHandle(...): Argument is not a component '+
'(type: %s, keys: %s)',
typeof component,
Object.keys(component));

invariant(
false,
'findNodeHandle(...): Unable to find node handle for unmounted '+
'component.');}}}





module.exports=findNodeHandle;
});
__d(38 /* ReactCurrentOwner */, function(global, require, module, exports) {'use strict';


















var ReactCurrentOwner={





current:null};



module.exports=ReactCurrentOwner;
});
__d(39 /* ReactInstanceMap */, function(global, require, module, exports) {'use strict';




















var ReactInstanceMap={






remove:function(key){
key._reactInternalInstance=undefined;},


get:function(key){
return key._reactInternalInstance;},


has:function(key){
return key._reactInternalInstance!==undefined;},


set:function(key,value){
key._reactInternalInstance=value;}};




module.exports=ReactInstanceMap;
});
__d(40 /* ReactNativeTagHandles */, function(global, require, module, exports) {'use strict';












var invariant=require(363 /* fbjs/lib/invariant */);
var warning=require(368 /* fbjs/lib/warning */);














var INITIAL_TAG_COUNT=1;
var NATIVE_TOP_ROOT_ID_SEPARATOR='{TOP_LEVEL}';
var ReactNativeTagHandles={
tagsStartAt:INITIAL_TAG_COUNT,
tagCount:INITIAL_TAG_COUNT,

allocateTag:function(){

while(this.reactTagIsNativeTopRootID(ReactNativeTagHandles.tagCount)){
ReactNativeTagHandles.tagCount++;}

var tag=ReactNativeTagHandles.tagCount;
ReactNativeTagHandles.tagCount++;
return tag;},











associateRootNodeIDWithMountedNodeHandle:function(
rootNodeID,
tag)
{
warning(rootNodeID&&tag,'Root node or tag is null when associating');
if(rootNodeID&&tag){
ReactNativeTagHandles.tagToRootNodeID[tag]=rootNodeID;
ReactNativeTagHandles.rootNodeIDToTag[rootNodeID]=tag;}},



allocateRootNodeIDForTag:function(tag){
invariant(
this.reactTagIsNativeTopRootID(tag),
'Expect a native root tag, instead got ',tag);

return '.r['+tag+']'+NATIVE_TOP_ROOT_ID_SEPARATOR;},


reactTagIsNativeTopRootID:function(reactTag){

return reactTag%10===1;},


getNativeTopRootIDFromNodeID:function(nodeID){
if(!nodeID){
return null;}

var index=nodeID.indexOf(NATIVE_TOP_ROOT_ID_SEPARATOR);
if(index===-1){
return null;}

return nodeID.substr(0,index+NATIVE_TOP_ROOT_ID_SEPARATOR.length);},














mostRecentMountedNodeHandleForRootNodeID:function(
rootNodeID)
{
return ReactNativeTagHandles.rootNodeIDToTag[rootNodeID];},


tagToRootNodeID:[],

rootNodeIDToTag:{}};


module.exports=ReactNativeTagHandles;
});
__d(41 /* ReactPropTypes */, function(global, require, module, exports) {'use strict';












var ReactElement=require(42 /* ./ReactElement */);
var ReactPropTypeLocationNames=require(45 /* ./ReactPropTypeLocationNames */);

var emptyFunction=require(379 /* fbjs/lib/emptyFunction */);
var getIteratorFn=require(46 /* ./getIteratorFn */);
















































var ANONYMOUS='<<anonymous>>';

var ReactPropTypes={
array:createPrimitiveTypeChecker('array'),
bool:createPrimitiveTypeChecker('boolean'),
func:createPrimitiveTypeChecker('function'),
number:createPrimitiveTypeChecker('number'),
object:createPrimitiveTypeChecker('object'),
string:createPrimitiveTypeChecker('string'),

any:createAnyTypeChecker(),
arrayOf:createArrayOfTypeChecker,
element:createElementTypeChecker(),
instanceOf:createInstanceTypeChecker,
node:createNodeChecker(),
objectOf:createObjectOfTypeChecker,
oneOf:createEnumTypeChecker,
oneOfType:createUnionTypeChecker,
shape:createShapeTypeChecker};


function createChainableTypeChecker(validate){
function checkType(isRequired,props,propName,componentName,location,propFullName){
componentName=componentName||ANONYMOUS;
propFullName=propFullName||propName;
if(props[propName]==null){
var locationName=ReactPropTypeLocationNames[location];
if(isRequired){
return new Error('Required '+locationName+' `'+propFullName+'` was not specified in '+('`'+componentName+'`.'));}

return null;}else 
{
return validate(props,propName,componentName,location,propFullName);}}



var chainedCheckType=checkType.bind(null,false);
chainedCheckType.isRequired=checkType.bind(null,true);

return chainedCheckType;}


function createPrimitiveTypeChecker(expectedType){
function validate(props,propName,componentName,location,propFullName){
var propValue=props[propName];
var propType=getPropType(propValue);
if(propType!==expectedType){
var locationName=ReactPropTypeLocationNames[location];



var preciseType=getPreciseType(propValue);

return new Error('Invalid '+locationName+' `'+propFullName+'` of type '+('`'+preciseType+'` supplied to `'+componentName+'`, expected ')+('`'+expectedType+'`.'));}

return null;}

return createChainableTypeChecker(validate);}


function createAnyTypeChecker(){
return createChainableTypeChecker(emptyFunction.thatReturns(null));}


function createArrayOfTypeChecker(typeChecker){
function validate(props,propName,componentName,location,propFullName){
var propValue=props[propName];
if(!Array.isArray(propValue)){
var locationName=ReactPropTypeLocationNames[location];
var propType=getPropType(propValue);
return new Error('Invalid '+locationName+' `'+propFullName+'` of type '+('`'+propType+'` supplied to `'+componentName+'`, expected an array.'));}

for(var i=0;i<propValue.length;i++){
var error=typeChecker(propValue,i,componentName,location,propFullName+'['+i+']');
if(error instanceof Error){
return error;}}


return null;}

return createChainableTypeChecker(validate);}


function createElementTypeChecker(){
function validate(props,propName,componentName,location,propFullName){
if(!ReactElement.isValidElement(props[propName])){
var locationName=ReactPropTypeLocationNames[location];
return new Error('Invalid '+locationName+' `'+propFullName+'` supplied to '+('`'+componentName+'`, expected a single ReactElement.'));}

return null;}

return createChainableTypeChecker(validate);}


function createInstanceTypeChecker(expectedClass){
function validate(props,propName,componentName,location,propFullName){
if(!(props[propName] instanceof expectedClass)){
var locationName=ReactPropTypeLocationNames[location];
var expectedClassName=expectedClass.name||ANONYMOUS;
var actualClassName=getClassName(props[propName]);
return new Error('Invalid '+locationName+' `'+propFullName+'` of type '+('`'+actualClassName+'` supplied to `'+componentName+'`, expected ')+('instance of `'+expectedClassName+'`.'));}

return null;}

return createChainableTypeChecker(validate);}


function createEnumTypeChecker(expectedValues){
if(!Array.isArray(expectedValues)){
return createChainableTypeChecker(function(){
return new Error('Invalid argument supplied to oneOf, expected an instance of array.');});}



function validate(props,propName,componentName,location,propFullName){
var propValue=props[propName];
for(var i=0;i<expectedValues.length;i++){
if(propValue===expectedValues[i]){
return null;}}



var locationName=ReactPropTypeLocationNames[location];
var valuesString=JSON.stringify(expectedValues);
return new Error('Invalid '+locationName+' `'+propFullName+'` of value `'+propValue+'` '+('supplied to `'+componentName+'`, expected one of '+valuesString+'.'));}

return createChainableTypeChecker(validate);}


function createObjectOfTypeChecker(typeChecker){
function validate(props,propName,componentName,location,propFullName){
var propValue=props[propName];
var propType=getPropType(propValue);
if(propType!=='object'){
var locationName=ReactPropTypeLocationNames[location];
return new Error('Invalid '+locationName+' `'+propFullName+'` of type '+('`'+propType+'` supplied to `'+componentName+'`, expected an object.'));}

for(var key in propValue){
if(propValue.hasOwnProperty(key)){
var error=typeChecker(propValue,key,componentName,location,propFullName+'.'+key);
if(error instanceof Error){
return error;}}}



return null;}

return createChainableTypeChecker(validate);}


function createUnionTypeChecker(arrayOfTypeCheckers){
if(!Array.isArray(arrayOfTypeCheckers)){
return createChainableTypeChecker(function(){
return new Error('Invalid argument supplied to oneOfType, expected an instance of array.');});}



function validate(props,propName,componentName,location,propFullName){
for(var i=0;i<arrayOfTypeCheckers.length;i++){
var checker=arrayOfTypeCheckers[i];
if(checker(props,propName,componentName,location,propFullName)==null){
return null;}}



var locationName=ReactPropTypeLocationNames[location];
return new Error('Invalid '+locationName+' `'+propFullName+'` supplied to '+('`'+componentName+'`.'));}

return createChainableTypeChecker(validate);}


function createNodeChecker(){
function validate(props,propName,componentName,location,propFullName){
if(!isNode(props[propName])){
var locationName=ReactPropTypeLocationNames[location];
return new Error('Invalid '+locationName+' `'+propFullName+'` supplied to '+('`'+componentName+'`, expected a ReactNode.'));}

return null;}

return createChainableTypeChecker(validate);}


function createShapeTypeChecker(shapeTypes){
function validate(props,propName,componentName,location,propFullName){
var propValue=props[propName];
var propType=getPropType(propValue);
if(propType!=='object'){
var locationName=ReactPropTypeLocationNames[location];
return new Error('Invalid '+locationName+' `'+propFullName+'` of type `'+propType+'` '+('supplied to `'+componentName+'`, expected `object`.'));}

for(var key in shapeTypes){
var checker=shapeTypes[key];
if(!checker){
continue;}

var error=checker(propValue,key,componentName,location,propFullName+'.'+key);
if(error){
return error;}}


return null;}

return createChainableTypeChecker(validate);}


function isNode(propValue){
switch(typeof propValue){
case 'number':
case 'string':
case 'undefined':
return true;
case 'boolean':
return !propValue;
case 'object':
if(Array.isArray(propValue)){
return propValue.every(isNode);}

if(propValue===null||ReactElement.isValidElement(propValue)){
return true;}


var iteratorFn=getIteratorFn(propValue);
if(iteratorFn){
var iterator=iteratorFn.call(propValue);
var step;
if(iteratorFn!==propValue.entries){
while(!(step=iterator.next()).done){
if(!isNode(step.value)){
return false;}}}else 


{

while(!(step=iterator.next()).done){
var entry=step.value;
if(entry){
if(!isNode(entry[1])){
return false;}}}}}else 




{
return false;}


return true;
default:
return false;}}




function getPropType(propValue){
var propType=typeof propValue;
if(Array.isArray(propValue)){
return 'array';}

if(propValue instanceof RegExp){



return 'object';}

return propType;}




function getPreciseType(propValue){
var propType=getPropType(propValue);
if(propType==='object'){
if(propValue instanceof Date){
return 'date';}else 
if(propValue instanceof RegExp){
return 'regexp';}}


return propType;}



function getClassName(propValue){
if(!propValue.constructor||!propValue.constructor.name){
return '<<anonymous>>';}

return propValue.constructor.name;}


module.exports=ReactPropTypes;
});
__d(42 /* ReactElement */, function(global, require, module, exports) {'use strict';












var ReactCurrentOwner=require(38 /* ./ReactCurrentOwner */);

var assign=require(43 /* ./Object.assign */);
var canDefineProperty=require(44 /* ./canDefineProperty */);



var REACT_ELEMENT_TYPE=typeof Symbol==='function'&&Symbol['for']&&Symbol['for']('react.element')||0xeac7;

var RESERVED_PROPS={
key:true,
ref:true,
__self:true,
__source:true};




















var ReactElement=function(type,key,ref,self,source,owner,props){
var element={

$$typeof:REACT_ELEMENT_TYPE,


type:type,
key:key,
ref:ref,
props:props,


_owner:owner};


if(process.env.NODE_ENV!=='production'){




element._store={};





if(canDefineProperty){
Object.defineProperty(element._store,'validated',{
configurable:false,
enumerable:false,
writable:true,
value:false});


Object.defineProperty(element,'_self',{
configurable:false,
enumerable:false,
writable:false,
value:self});



Object.defineProperty(element,'_source',{
configurable:false,
enumerable:false,
writable:false,
value:source});}else 

{
element._store.validated=false;
element._self=self;
element._source=source;}

Object.freeze(element.props);
Object.freeze(element);}


return element;};


ReactElement.createElement=function(type,config,children){
var propName;


var props={};

var key=null;
var ref=null;
var self=null;
var source=null;

if(config!=null){
ref=config.ref===undefined?null:config.ref;
key=config.key===undefined?null:''+config.key;
self=config.__self===undefined?null:config.__self;
source=config.__source===undefined?null:config.__source;

for(propName in config){
if(config.hasOwnProperty(propName)&&!RESERVED_PROPS.hasOwnProperty(propName)){
props[propName]=config[propName];}}}






var childrenLength=arguments.length-2;
if(childrenLength===1){
props.children=children;}else 
if(childrenLength>1){
var childArray=Array(childrenLength);
for(var i=0;i<childrenLength;i++){
childArray[i]=arguments[i+2];}

props.children=childArray;}



if(type&&type.defaultProps){
var defaultProps=type.defaultProps;
for(propName in defaultProps){
if(typeof props[propName]==='undefined'){
props[propName]=defaultProps[propName];}}}




return ReactElement(type,key,ref,self,source,ReactCurrentOwner.current,props);};


ReactElement.createFactory=function(type){
var factory=ReactElement.createElement.bind(null,type);





factory.type=type;
return factory;};


ReactElement.cloneAndReplaceKey=function(oldElement,newKey){
var newElement=ReactElement(oldElement.type,newKey,oldElement.ref,oldElement._self,oldElement._source,oldElement._owner,oldElement.props);

return newElement;};


ReactElement.cloneAndReplaceProps=function(oldElement,newProps){
var newElement=ReactElement(oldElement.type,oldElement.key,oldElement.ref,oldElement._self,oldElement._source,oldElement._owner,newProps);

if(process.env.NODE_ENV!=='production'){

newElement._store.validated=oldElement._store.validated;}


return newElement;};


ReactElement.cloneElement=function(element,config,children){
var propName;


var props=assign({},element.props);


var key=element.key;
var ref=element.ref;

var self=element._self;



var source=element._source;


var owner=element._owner;

if(config!=null){
if(config.ref!==undefined){

ref=config.ref;
owner=ReactCurrentOwner.current;}

if(config.key!==undefined){
key=''+config.key;}


for(propName in config){
if(config.hasOwnProperty(propName)&&!RESERVED_PROPS.hasOwnProperty(propName)){
props[propName]=config[propName];}}}






var childrenLength=arguments.length-2;
if(childrenLength===1){
props.children=children;}else 
if(childrenLength>1){
var childArray=Array(childrenLength);
for(var i=0;i<childrenLength;i++){
childArray[i]=arguments[i+2];}

props.children=childArray;}


return ReactElement(element.type,key,ref,self,source,owner,props);};







ReactElement.isValidElement=function(object){
return typeof object==='object'&&object!==null&&object.$$typeof===REACT_ELEMENT_TYPE;};


module.exports=ReactElement;
});
__d(43 /* Object.assign */, function(global, require, module, exports) {'use strict';














function assign(target,sources){
if(target==null){
throw new TypeError('Object.assign target cannot be null or undefined');}


var to=Object(target);
var hasOwnProperty=Object.prototype.hasOwnProperty;

for(var nextIndex=1;nextIndex<arguments.length;nextIndex++){
var nextSource=arguments[nextIndex];
if(nextSource==null){
continue;}


var from=Object(nextSource);






for(var key in from){
if(hasOwnProperty.call(from,key)){
to[key]=from[key];}}}




return to;}


module.exports=assign;
});
__d(44 /* canDefineProperty */, function(global, require, module, exports) {'use strict';












var canDefineProperty=false;
if(process.env.NODE_ENV!=='production'){
try{
Object.defineProperty({},'x',{get:function(){}});
canDefineProperty=true;}
catch(x){}}




module.exports=canDefineProperty;
});
__d(45 /* ReactPropTypeLocationNames */, function(global, require, module, exports) {'use strict';












var ReactPropTypeLocationNames={};

if(process.env.NODE_ENV!=='production'){
ReactPropTypeLocationNames={
prop:'prop',
context:'context',
childContext:'child context'};}



module.exports=ReactPropTypeLocationNames;
});
__d(379 /* fbjs/lib/emptyFunction.js */, function(global, require, module, exports) {"use strict";












function makeEmptyFunction(arg){
return function(){
return arg;};}








function emptyFunction(){}

emptyFunction.thatReturns=makeEmptyFunction;
emptyFunction.thatReturnsFalse=makeEmptyFunction(false);
emptyFunction.thatReturnsTrue=makeEmptyFunction(true);
emptyFunction.thatReturnsNull=makeEmptyFunction(null);
emptyFunction.thatReturnsThis=function(){
return this;};

emptyFunction.thatReturnsArgument=function(arg){
return arg;};


module.exports=emptyFunction;
});
__d(46 /* getIteratorFn */, function(global, require, module, exports) {'use strict';














var ITERATOR_SYMBOL=typeof Symbol==='function'&&(typeof Symbol==='function'?Symbol.iterator:'@@iterator');
var FAUX_ITERATOR_SYMBOL='@@iterator';















function getIteratorFn(maybeIterable){
var iteratorFn=maybeIterable&&(ITERATOR_SYMBOL&&maybeIterable[ITERATOR_SYMBOL]||maybeIterable[FAUX_ITERATOR_SYMBOL]);
if(typeof iteratorFn==='function'){
return iteratorFn;}}



module.exports=getIteratorFn;
});
__d(47 /* React */, function(global, require, module, exports) {'use strict';












module.exports=require(48 /* ReactNative */);
});
__d(48 /* ReactNative */, function(global, require, module, exports) {'use strict';














var ReactNativeDefaultInjection=require(49 /* ReactNativeDefaultInjection */);

var ReactChildren=require(165 /* ReactChildren */);
var ReactClass=require(166 /* ReactClass */);
var ReactComponent=require(167 /* ReactComponent */);
var ReactCurrentOwner=require(38 /* ReactCurrentOwner */);
var ReactElement=require(42 /* ReactElement */);
var ReactElementValidator=require(169 /* ReactElementValidator */);
var ReactInstanceHandles=require(68 /* ReactInstanceHandles */);
var ReactNativeMount=require(70 /* ReactNativeMount */);
var ReactPropTypes=require(41 /* ReactPropTypes */);
var ReactUpdates=require(75 /* ReactUpdates */);

var findNodeHandle=require(37 /* findNodeHandle */);
var invariant=require(363 /* fbjs/lib/invariant */);
var onlyChild=require(170 /* onlyChild */);
var warning=require(368 /* fbjs/lib/warning */);

ReactNativeDefaultInjection.inject();

var createElement=ReactElement.createElement;
var createFactory=ReactElement.createFactory;
var cloneElement=ReactElement.cloneElement;

if(__DEV__){
createElement=ReactElementValidator.createElement;
createFactory=ReactElementValidator.createFactory;
cloneElement=ReactElementValidator.cloneElement;}


var resolveDefaultProps=function(element){

var defaultProps=element.type.defaultProps;
var props=element.props;
for(var propName in defaultProps){
if(props[propName]===undefined){
props[propName]=defaultProps[propName];}}};





var augmentElement=function(element){
if(__DEV__){
invariant(
false,
'This optimized path should never be used in DEV mode because '+
'it does not provide validation. Check your JSX transform.');}


element._owner=ReactCurrentOwner.current;
if(element.type.defaultProps){
resolveDefaultProps(element);}

return element;};


var render=function(
element,
mountInto,
callback)
{
return ReactNativeMount.renderComponent(element,mountInto,callback);};


var ReactNative={
hasReactNativeInitialized:false,
Children:{
map:ReactChildren.map,
forEach:ReactChildren.forEach,
count:ReactChildren.count,
toArray:ReactChildren.toArray,
only:onlyChild},

Component:ReactComponent,
PropTypes:ReactPropTypes,
createClass:ReactClass.createClass,
createElement:createElement,
createFactory:createFactory,
cloneElement:cloneElement,
_augmentElement:augmentElement,
findNodeHandle:findNodeHandle,
render:render,
unmountComponentAtNode:ReactNativeMount.unmountComponentAtNode,


unstable_batchedUpdates:ReactUpdates.batchedUpdates,



__spread:Object.assign,

unmountComponentAtNodeAndRemoveContainer:ReactNativeMount.unmountComponentAtNodeAndRemoveContainer,
isValidClass:ReactElement.isValidFactory,
isValidElement:ReactElement.isValidElement,


renderComponent:function(
element,
mountInto,
callback)
{
warning('Use React.render instead of React.renderComponent');
return ReactNative.render(element,mountInto,callback);}};






if(
typeof __REACT_DEVTOOLS_GLOBAL_HOOK__!=='undefined'&&
typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.inject==='function'){
__REACT_DEVTOOLS_GLOBAL_HOOK__.inject({
CurrentOwner:ReactCurrentOwner,
InstanceHandles:ReactInstanceHandles,
Mount:ReactNativeMount,
Reconciler:require(71 /* ReactReconciler */),
TextComponent:require(87 /* ReactNativeTextComponent */)});}



module.exports=ReactNative;
});
__d(49 /* ReactNativeDefaultInjection */, function(global, require, module, exports) {'use strict';

















require(50 /* InitializeJavaScriptAppEngine */);

var EventPluginHub=require(92 /* EventPluginHub */);
var EventPluginUtils=require(94 /* EventPluginUtils */);
var IOSDefaultEventPluginOrder=require(99 /* IOSDefaultEventPluginOrder */);
var IOSNativeBridgeEventPlugin=require(100 /* IOSNativeBridgeEventPlugin */);
var NodeHandle=require(106 /* NodeHandle */);
var ReactElement=require(42 /* ReactElement */);
var ReactComponentEnvironment=require(81 /* ReactComponentEnvironment */);
var ReactDefaultBatchingStrategy=require(107 /* ReactDefaultBatchingStrategy */);
var ReactEmptyComponent=require(84 /* ReactEmptyComponent */);
var ReactInstanceHandles=require(68 /* ReactInstanceHandles */);
var ReactNativeComponentEnvironment=require(108 /* ReactNativeComponentEnvironment */);
var ReactNativeGlobalInteractionHandler=require(112 /* ReactNativeGlobalInteractionHandler */);
var ReactNativeGlobalResponderHandler=require(117 /* ReactNativeGlobalResponderHandler */);
var ReactNativeMount=require(70 /* ReactNativeMount */);
var ReactNativeTextComponent=require(87 /* ReactNativeTextComponent */);
var ReactNativeComponent=require(86 /* ReactNativeComponent */);
var ReactUpdates=require(75 /* ReactUpdates */);
var ResponderEventPlugin=require(118 /* ResponderEventPlugin */);
var UniversalWorkerNodeHandle=require(122 /* UniversalWorkerNodeHandle */);

var invariant=require(363 /* fbjs/lib/invariant */);


require(123 /* RCTEventEmitter */);
require(126 /* RCTLog */);
require(17 /* JSTimersExecution */);

function inject(){



EventPluginHub.injection.injectEventPluginOrder(IOSDefaultEventPluginOrder);
EventPluginHub.injection.injectInstanceHandle(ReactInstanceHandles);

ResponderEventPlugin.injection.injectGlobalResponderHandler(
ReactNativeGlobalResponderHandler);


ResponderEventPlugin.injection.injectGlobalInteractionHandler(
ReactNativeGlobalInteractionHandler);






EventPluginHub.injection.injectEventPluginsByName({
'ResponderEventPlugin':ResponderEventPlugin,
'IOSNativeBridgeEventPlugin':IOSNativeBridgeEventPlugin});


ReactUpdates.injection.injectReconcileTransaction(
ReactNativeComponentEnvironment.ReactReconcileTransaction);


ReactUpdates.injection.injectBatchingStrategy(
ReactDefaultBatchingStrategy);


ReactComponentEnvironment.injection.injectEnvironment(
ReactNativeComponentEnvironment);


var EmptyComponent=function(){

var View=require(127 /* View */);
return ReactElement.createElement(View,{
collapsable:true,
style:{position:'absolute'}});};


ReactEmptyComponent.injection.injectEmptyComponent(EmptyComponent);

EventPluginUtils.injection.injectMount(ReactNativeMount);

ReactNativeComponent.injection.injectTextComponentClass(
ReactNativeTextComponent);

ReactNativeComponent.injection.injectGenericComponentClass(function(tag){

var info='';
if(typeof tag==='string'&&/^[a-z]/.test(tag)){
info+=' Each component name should start with an uppercase letter.';}

invariant(false,'Expected a component class, got %s.%s',tag,info);});


NodeHandle.injection.injectImplementation(UniversalWorkerNodeHandle);}


module.exports={
inject:inject};
});
__d(50 /* InitializeJavaScriptAppEngine */, function(global, require, module, exports) {require(























417 /* regenerator/runtime */);

if(typeof GLOBAL==='undefined'){
global.GLOBAL=this;}


if(typeof window==='undefined'){
global.window=GLOBAL;}


function setUpConsole(){

var ExceptionsManager=require(51 /* ExceptionsManager */);
ExceptionsManager.installConsoleErrorReporter();}

















function polyfillGlobal(name,newValue){var scope=arguments.length<=2||arguments[2]===undefined?GLOBAL:arguments[2];
var descriptor=Object.getOwnPropertyDescriptor(scope,name)||{




writable:true};


if(scope[name]!==undefined){
var backupName='original'+name[0].toUpperCase()+name.substr(1);
Object.defineProperty(scope,backupName,babelHelpers.extends({},descriptor,{value:scope[name]}));}


Object.defineProperty(scope,name,babelHelpers.extends({},descriptor,{value:newValue}));}





function polyfillIfNeeded(name,polyfill){var scope=arguments.length<=2||arguments[2]===undefined?GLOBAL:arguments[2];var descriptor=arguments.length<=3||arguments[3]===undefined?{}:arguments[3];
if(scope[name]===undefined){
Object.defineProperty(scope,name,babelHelpers.extends({},descriptor,{value:polyfill}));}}



function setUpErrorHandler(){
if(global.__fbDisableExceptionsManager){
return;}


function handleError(e,isFatal){
try{
require(51 /* ExceptionsManager */).handleException(e,isFatal);}
catch(ee){
console.log('Failed to print error: ',ee.message);}}



var ErrorUtils=require(16 /* ErrorUtils */);
ErrorUtils.setGlobalHandler(handleError);}









function setUpTimers(){
var JSTimers=require(18 /* JSTimers */);
GLOBAL.setTimeout=JSTimers.setTimeout;
GLOBAL.setInterval=JSTimers.setInterval;
GLOBAL.setImmediate=JSTimers.setImmediate;
GLOBAL.clearTimeout=JSTimers.clearTimeout;
GLOBAL.clearInterval=JSTimers.clearInterval;
GLOBAL.clearImmediate=JSTimers.clearImmediate;
GLOBAL.cancelAnimationFrame=JSTimers.clearInterval;
GLOBAL.requestAnimationFrame=function(cb){

return JSTimers.requestAnimationFrame(cb);};}



function setUpAlert(){
if(!GLOBAL.alert){
GLOBAL.alert=function(text){


require(53 /* Alert */).alert('Alert',''+text);};}}




function setUpPromise(){


GLOBAL.Promise=require(35 /* Promise */);}


function setUpXHR(){


polyfillGlobal('XMLHttpRequest',require(55 /* XMLHttpRequest */));
polyfillGlobal('FormData',require(56 /* FormData */));

var fetchPolyfill=require(59 /* fetch */);
polyfillGlobal('fetch',fetchPolyfill.fetch);
polyfillGlobal('Headers',fetchPolyfill.Headers);
polyfillGlobal('Request',fetchPolyfill.Request);
polyfillGlobal('Response',fetchPolyfill.Response);}


function setUpGeolocation(){
polyfillIfNeeded('navigator',{},GLOBAL,{
writable:true,
enumerable:true,
configurable:true});

polyfillGlobal('geolocation',require(60 /* Geolocation */),GLOBAL.navigator);}


function setUpMapAndSet(){
polyfillGlobal('Map',require(62 /* Map */));
polyfillGlobal('Set',require(66 /* Set */));}


function setUpProduct(){
Object.defineProperty(GLOBAL.navigator,'product',{value:'ReactNative'});}


function setUpWebSockets(){
polyfillGlobal('WebSocket',require(21 /* WebSocket */));}


function setUpProfile(){
if(__DEV__){
var Systrace=require(14 /* Systrace */);
Systrace.swizzleReactPerf();}}



function setUpProcessEnv(){
GLOBAL.process=GLOBAL.process||{};
GLOBAL.process.env=GLOBAL.process.env||{};
if(!GLOBAL.process.env.NODE_ENV){
GLOBAL.process.env.NODE_ENV=__DEV__?'development':'production';}}



function setUpNumber(){
polyfillIfNeeded('EPSILON',Math.pow(2,-52),Number);
polyfillIfNeeded('MAX_SAFE_INTEGER',Math.pow(2,53)-1,Number);
polyfillIfNeeded('MIN_SAFE_INTEGER',-(Math.pow(2,53)-1),Number);}


function setUpDevTools(){

if(__DEV__){
if(!window.document&&require(4 /* Platform */).OS==='ios'){
var setupDevtools=require(67 /* setupDevtools */);
setupDevtools();}}}




setUpProcessEnv();
setUpConsole();
setUpTimers();
setUpAlert();
setUpPromise();
setUpErrorHandler();
setUpXHR();
setUpGeolocation();
setUpMapAndSet();
setUpProduct();
setUpWebSockets();
setUpProfile();
setUpNumber();
setUpDevTools();



if(__DEV__){
require(88 /* RCTDebugComponentOwnership */);}

require(22 /* RCTDeviceEventEmitter */);
require(90 /* RCTNativeAppEventEmitter */);
require(91 /* PerformanceLogger */);

if(__DEV__){

require(391 /* react-transform-hmr */);}
});
__d(417 /* regenerator/runtime.js */, function(global, require, module, exports) {!









function(global){
"use strict";

var hasOwn=Object.prototype.hasOwnProperty;
var undefined;
var $Symbol=typeof Symbol==="function"?Symbol:{};
var iteratorSymbol=$Symbol.iterator||"@@iterator";
var toStringTagSymbol=$Symbol.toStringTag||"@@toStringTag";

var inModule=typeof module==="object";
var runtime=global.regeneratorRuntime;
if(runtime){
if(inModule){


module.exports=runtime;}



return;}




runtime=global.regeneratorRuntime=inModule?module.exports:{};

function wrap(innerFn,outerFn,self,tryLocsList){

var generator=Object.create((outerFn||Generator).prototype);
var context=new Context(tryLocsList||[]);



generator._invoke=makeInvokeMethod(innerFn,self,context);

return generator;}

runtime.wrap=wrap;











function tryCatch(fn,obj,arg){
try{
return {type:"normal",arg:fn.call(obj,arg)};}
catch(err){
return {type:"throw",arg:err};}}



var GenStateSuspendedStart="suspendedStart";
var GenStateSuspendedYield="suspendedYield";
var GenStateExecuting="executing";
var GenStateCompleted="completed";



var ContinueSentinel={};





function Generator(){}
function GeneratorFunction(){}
function GeneratorFunctionPrototype(){}

var Gp=GeneratorFunctionPrototype.prototype=Generator.prototype;
GeneratorFunction.prototype=Gp.constructor=GeneratorFunctionPrototype;
GeneratorFunctionPrototype.constructor=GeneratorFunction;
GeneratorFunctionPrototype[toStringTagSymbol]=GeneratorFunction.displayName="GeneratorFunction";



function defineIteratorMethods(prototype){
["next","throw","return"].forEach(function(method){
prototype[method]=function(arg){
return this._invoke(method,arg);};});}




runtime.isGeneratorFunction=function(genFun){
var ctor=typeof genFun==="function"&&genFun.constructor;
return ctor?
ctor===GeneratorFunction||


(ctor.displayName||ctor.name)==="GeneratorFunction":
false;};


runtime.mark=function(genFun){
if(Object.setPrototypeOf){
Object.setPrototypeOf(genFun,GeneratorFunctionPrototype);}else 
{
genFun.__proto__=GeneratorFunctionPrototype;
if(!(toStringTagSymbol in genFun)){
genFun[toStringTagSymbol]="GeneratorFunction";}}


genFun.prototype=Object.create(Gp);
return genFun;};







runtime.awrap=function(arg){
return new AwaitArgument(arg);};


function AwaitArgument(arg){
this.arg=arg;}


function AsyncIterator(generator){
function invoke(method,arg,resolve,reject){
var record=tryCatch(generator[method],generator,arg);
if(record.type==="throw"){
reject(record.arg);}else 
{
var result=record.arg;
var value=result.value;
if(value instanceof AwaitArgument){
return Promise.resolve(value.arg).then(function(value){
invoke("next",value,resolve,reject);},
function(err){
invoke("throw",err,resolve,reject);});}



return Promise.resolve(value).then(function(unwrapped){















result.value=unwrapped;
resolve(result);},
reject);}}



if(typeof process==="object"&&process.domain){
invoke=process.domain.bind(invoke);}


var previousPromise;

function enqueue(method,arg){
function callInvokeWithMethodAndArg(){
return new Promise(function(resolve,reject){
invoke(method,arg,resolve,reject);});}



return previousPromise=












previousPromise?previousPromise.then(
callInvokeWithMethodAndArg,


callInvokeWithMethodAndArg):
callInvokeWithMethodAndArg();}




this._invoke=enqueue;}


defineIteratorMethods(AsyncIterator.prototype);




runtime.async=function(innerFn,outerFn,self,tryLocsList){
var iter=new AsyncIterator(
wrap(innerFn,outerFn,self,tryLocsList));


return runtime.isGeneratorFunction(outerFn)?
iter:
iter.next().then(function(result){
return result.done?result.value:iter.next();});};



function makeInvokeMethod(innerFn,self,context){
var state=GenStateSuspendedStart;

return function invoke(method,arg){
if(state===GenStateExecuting){
throw new Error("Generator is already running");}


if(state===GenStateCompleted){
if(method==="throw"){
throw arg;}




return doneResult();}


while(true){
var delegate=context.delegate;
if(delegate){
if(method==="return"||
method==="throw"&&delegate.iterator[method]===undefined){


context.delegate=null;



var returnMethod=delegate.iterator["return"];
if(returnMethod){
var record=tryCatch(returnMethod,delegate.iterator,arg);
if(record.type==="throw"){


method="throw";
arg=record.arg;
continue;}}



if(method==="return"){


continue;}}



var record=tryCatch(
delegate.iterator[method],
delegate.iterator,
arg);


if(record.type==="throw"){
context.delegate=null;



method="throw";
arg=record.arg;
continue;}





method="next";
arg=undefined;

var info=record.arg;
if(info.done){
context[delegate.resultName]=info.value;
context.next=delegate.nextLoc;}else 
{
state=GenStateSuspendedYield;
return info;}


context.delegate=null;}


if(method==="next"){
if(state===GenStateSuspendedYield){
context.sent=arg;}else 
{
context.sent=undefined;}}else 


if(method==="throw"){
if(state===GenStateSuspendedStart){
state=GenStateCompleted;
throw arg;}


if(context.dispatchException(arg)){


method="next";
arg=undefined;}}else 


if(method==="return"){
context.abrupt("return",arg);}


state=GenStateExecuting;

var record=tryCatch(innerFn,self,context);
if(record.type==="normal"){


state=context.done?
GenStateCompleted:
GenStateSuspendedYield;

var info={
value:record.arg,
done:context.done};


if(record.arg===ContinueSentinel){
if(context.delegate&&method==="next"){


arg=undefined;}}else 

{
return info;}}else 


if(record.type==="throw"){
state=GenStateCompleted;


method="throw";
arg=record.arg;}}};}







defineIteratorMethods(Gp);

Gp[iteratorSymbol]=function(){
return this;};


Gp[toStringTagSymbol]="Generator";

Gp.toString=function(){
return "[object Generator]";};


function pushTryEntry(locs){
var entry={tryLoc:locs[0]};

if(1 in locs){
entry.catchLoc=locs[1];}


if(2 in locs){
entry.finallyLoc=locs[2];
entry.afterLoc=locs[3];}


this.tryEntries.push(entry);}


function resetTryEntry(entry){
var record=entry.completion||{};
record.type="normal";
delete record.arg;
entry.completion=record;}


function Context(tryLocsList){



this.tryEntries=[{tryLoc:"root"}];
tryLocsList.forEach(pushTryEntry,this);
this.reset(true);}


runtime.keys=function(object){
var keys=[];
for(var key in object){
keys.push(key);}

keys.reverse();



return function next(){
while(keys.length){
var key=keys.pop();
if(key in object){
next.value=key;
next.done=false;
return next;}}






next.done=true;
return next;};};



function values(iterable){
if(iterable){
var iteratorMethod=iterable[iteratorSymbol];
if(iteratorMethod){
return iteratorMethod.call(iterable);}


if(typeof iterable.next==="function"){
return iterable;}


if(!isNaN(iterable.length)){
var i=-1,next=function next(){
while(++i<iterable.length){
if(hasOwn.call(iterable,i)){
next.value=iterable[i];
next.done=false;
return next;}}



next.value=undefined;
next.done=true;

return next;};


return next.next=next;}}




return {next:doneResult};}

runtime.values=values;

function doneResult(){
return {value:undefined,done:true};}


Context.prototype={
constructor:Context,

reset:function(skipTempReset){
this.prev=0;
this.next=0;
this.sent=undefined;
this.done=false;
this.delegate=null;

this.tryEntries.forEach(resetTryEntry);

if(!skipTempReset){
for(var name in this){

if(name.charAt(0)==="t"&&
hasOwn.call(this,name)&&
!isNaN(+name.slice(1))){
this[name]=undefined;}}}},





stop:function(){
this.done=true;

var rootEntry=this.tryEntries[0];
var rootRecord=rootEntry.completion;
if(rootRecord.type==="throw"){
throw rootRecord.arg;}


return this.rval;},


dispatchException:function(exception){
if(this.done){
throw exception;}


var context=this;
function handle(loc,caught){
record.type="throw";
record.arg=exception;
context.next=loc;
return !!caught;}


for(var i=this.tryEntries.length-1;i>=0;--i){
var entry=this.tryEntries[i];
var record=entry.completion;

if(entry.tryLoc==="root"){



return handle("end");}


if(entry.tryLoc<=this.prev){
var hasCatch=hasOwn.call(entry,"catchLoc");
var hasFinally=hasOwn.call(entry,"finallyLoc");

if(hasCatch&&hasFinally){
if(this.prev<entry.catchLoc){
return handle(entry.catchLoc,true);}else 
if(this.prev<entry.finallyLoc){
return handle(entry.finallyLoc);}}else 


if(hasCatch){
if(this.prev<entry.catchLoc){
return handle(entry.catchLoc,true);}}else 


if(hasFinally){
if(this.prev<entry.finallyLoc){
return handle(entry.finallyLoc);}}else 


{
throw new Error("try statement without catch or finally");}}}},





abrupt:function(type,arg){
for(var i=this.tryEntries.length-1;i>=0;--i){
var entry=this.tryEntries[i];
if(entry.tryLoc<=this.prev&&
hasOwn.call(entry,"finallyLoc")&&
this.prev<entry.finallyLoc){
var finallyEntry=entry;
break;}}



if(finallyEntry&&(
type==="break"||
type==="continue")&&
finallyEntry.tryLoc<=arg&&
arg<=finallyEntry.finallyLoc){


finallyEntry=null;}


var record=finallyEntry?finallyEntry.completion:{};
record.type=type;
record.arg=arg;

if(finallyEntry){
this.next=finallyEntry.finallyLoc;}else 
{
this.complete(record);}


return ContinueSentinel;},


complete:function(record,afterLoc){
if(record.type==="throw"){
throw record.arg;}


if(record.type==="break"||
record.type==="continue"){
this.next=record.arg;}else 
if(record.type==="return"){
this.rval=record.arg;
this.next="end";}else 
if(record.type==="normal"&&afterLoc){
this.next=afterLoc;}},



finish:function(finallyLoc){
for(var i=this.tryEntries.length-1;i>=0;--i){
var entry=this.tryEntries[i];
if(entry.finallyLoc===finallyLoc){
this.complete(entry.completion,entry.afterLoc);
resetTryEntry(entry);
return ContinueSentinel;}}},




"catch":function(tryLoc){
for(var i=this.tryEntries.length-1;i>=0;--i){
var entry=this.tryEntries[i];
if(entry.tryLoc===tryLoc){
var record=entry.completion;
if(record.type==="throw"){
var thrown=record.arg;
resetTryEntry(entry);}

return thrown;}}





throw new Error("illegal catch attempt");},


delegateYield:function(iterable,resultName,nextLoc){
this.delegate={
iterator:values(iterable),
resultName:resultName,
nextLoc:nextLoc};


return ContinueSentinel;}};}(






typeof global==="object"?global:
typeof window==="object"?window:
typeof self==="object"?self:this);
});
__d(51 /* ExceptionsManager */, function(global, require, module, exports) {'use strict';












var exceptionID=0;




function reportException(e,isFatal){
var parseErrorStack=require(52 /* parseErrorStack */);
var RCTExceptionsManager=require(11 /* NativeModules */).ExceptionsManager;

var currentExceptionID=++exceptionID;
if(RCTExceptionsManager){
var stack=parseErrorStack(e);
if(isFatal){
RCTExceptionsManager.reportFatalException(e.message,stack,currentExceptionID);}else 
{
RCTExceptionsManager.reportSoftException(e.message,stack,currentExceptionID);}

if(__DEV__){
require(32 /* SourceMapsCache */).getSourceMaps().then(function(sourceMaps){
var prettyStack=parseErrorStack(e,sourceMaps);
RCTExceptionsManager.updateExceptionMessage(
e.message,
prettyStack,
currentExceptionID);}).


catch(function(error){


console.warn('Unable to load source map: '+error.message);});}}}








function handleException(e,isFatal){




if(!e.message){
e=new Error(e);}


(console._errorOriginal||console.error)(e.message);
reportException(e,isFatal);}






function installConsoleErrorReporter(){

if(console._errorOriginal){
return;}

console._errorOriginal=console.error.bind(console);
console.error=function reactConsoleError(){
console._errorOriginal.apply(null,arguments);
if(!console.reportErrorsAsExceptions){
return;}


if(arguments[0]&&arguments[0].stack){
reportException(arguments[0],false);}else 
{
var stringifySafe=require(19 /* stringifySafe */);
var str=Array.prototype.map.call(arguments,stringifySafe).join(', ');
if(str.slice(0,10)==='"Warning: '){



return;}

var error=new Error('console.error: '+str);
error.framesToPop=1;
reportException(error,false);}};


if(console.reportErrorsAsExceptions===undefined){
console.reportErrorsAsExceptions=true;}}



module.exports={handleException:handleException,installConsoleErrorReporter:installConsoleErrorReporter};
});
__d(52 /* parseErrorStack */, function(global, require, module, exports) {'use strict';











var stacktraceParser=require(380 /* stacktrace-parser */);

function resolveSourceMaps(sourceMapInstance,stackFrame){
try{
var orig=sourceMapInstance.originalPositionFor({
line:stackFrame.lineNumber,
column:stackFrame.column});

if(orig){

var queryStringStartIndex=orig.source.indexOf('?');
stackFrame.file=queryStringStartIndex===-1?
orig.source:
orig.source.substring(0,queryStringStartIndex);
stackFrame.lineNumber=orig.line;
stackFrame.column=orig.column;}}

catch(innerEx){}}



function parseErrorStack(e,sourceMaps){
if(!e||!e.stack){
return [];}


var stack=Array.isArray(e.stack)?e.stack:stacktraceParser.parse(e.stack);

var framesToPop=e.framesToPop||0;
while(framesToPop--){
stack.shift();}


if(sourceMaps){
sourceMaps.forEach(function(sourceMap,index){
stack.forEach(function(frame){
if(frame.file.indexOf(sourceMap.file)!==-1||
frame.file.replace('.map','.bundle').indexOf(
sourceMap.file)!==
-1){
resolveSourceMaps(sourceMap,frame);}});});}





return stack;}


module.exports=parseErrorStack;
});
__d(380 /* stacktrace-parser/index.js */, function(global, require, module, exports) {module.exports=require(381 /* ./lib/stacktrace-parser.js */);
});
__d(381 /* stacktrace-parser/lib/stacktrace-parser.js */, function(global, require, module, exports) {var 

UNKNOWN_FUNCTION='<unknown>';

var StackTraceParser={




parse:function(stackString){
var chrome=/^\s*at (?:(?:(?:Anonymous function)?|((?:\[object object\])?\S+(?: \[as \S+\])?)) )?\(?((?:file|http|https):.*?):(\d+)(?::(\d+))?\)?\s*$/i,
gecko=/^(?:\s*(\S*)(?:\((.*?)\))?@)?(\S.*?):(\d+)(?::(\d+))?\s*$/i,
node=/^\s*at (?:((?:\[object object\])?\S+(?: \[as \S+\])?) )?\(?(.*?):(\d+)(?::(\d+))?\)?\s*$/i,
lines=stackString.split('\n'),
stack=[],
parts,
element;

for(var i=0,j=lines.length;i<j;++i){
if(parts=gecko.exec(lines[i])){
element={
'file':parts[3],
'methodName':parts[1]||UNKNOWN_FUNCTION,
'lineNumber':+parts[4],
'column':parts[5]?+parts[5]:null};}else 

if(parts=chrome.exec(lines[i])){
element={
'file':parts[2],
'methodName':parts[1]||UNKNOWN_FUNCTION,
'lineNumber':+parts[3],
'column':parts[4]?+parts[4]:null};}else 

if(parts=node.exec(lines[i])){
element={
'file':parts[2],
'methodName':parts[1]||UNKNOWN_FUNCTION,
'lineNumber':+parts[3],
'column':parts[4]?+parts[4]:null};}else 

{
continue;}


stack.push(element);}


return stack;}};




module.exports=StackTraceParser;
});
__d(53 /* Alert */, function(global, require, module, exports) {'use strict';












var AlertIOS=require(54 /* AlertIOS */);
var Platform=require(4 /* Platform */);
var DialogModuleAndroid=require(11 /* NativeModules */).DialogManagerAndroid;var 















































Alert=function(){function Alert(){babelHelpers.classCallCheck(this,Alert);}babelHelpers.createClass(Alert,null,[{key:'alert',value:function alert(


title,
message,
buttons,
type)
{
if(Platform.OS==='ios'){
if(typeof type!=='undefined'){
console.warn('Alert.alert() with a 4th "type" parameter is deprecated and will be removed. Use AlertIOS.prompt() instead.');
AlertIOS.alert(title,message,buttons,type);
return;}

AlertIOS.alert(title,message,buttons);}else 
if(Platform.OS==='android'){
AlertAndroid.alert(title,message,buttons);}}}]);return Alert;}();var 







AlertAndroid=function(){function AlertAndroid(){babelHelpers.classCallCheck(this,AlertAndroid);}babelHelpers.createClass(AlertAndroid,null,[{key:'alert',value:function alert(


title,
message,
buttons)
{
var config={
title:title||'',
message:message||''};



var validButtons=buttons?buttons.slice(0,3):[{text:'OK'}];
var buttonPositive=validButtons.pop();
var buttonNegative=validButtons.pop();
var buttonNeutral=validButtons.pop();
if(buttonNeutral){
config=babelHelpers.extends({},config,{buttonNeutral:buttonNeutral.text||''});}

if(buttonNegative){
config=babelHelpers.extends({},config,{buttonNegative:buttonNegative.text||''});}

if(buttonPositive){
config=babelHelpers.extends({},config,{buttonPositive:buttonPositive.text||''});}

DialogModuleAndroid.showAlert(
config,
function(errorMessage){return console.warn(message);},
function(action,buttonKey){
if(action!==DialogModuleAndroid.buttonClicked){
return;}

if(buttonKey===DialogModuleAndroid.buttonNeutral){
buttonNeutral.onPress&&buttonNeutral.onPress();}else 
if(buttonKey===DialogModuleAndroid.buttonNegative){
buttonNegative.onPress&&buttonNegative.onPress();}else 
if(buttonKey===DialogModuleAndroid.buttonPositive){
buttonPositive.onPress&&buttonPositive.onPress();}});}}]);return AlertAndroid;}();






module.exports=Alert;
});
__d(54 /* AlertIOS */, function(global, require, module, exports) {'use strict';












var RCTAlertManager=require(11 /* NativeModules */).AlertManager;var 






























AlertIOS=function(){function AlertIOS(){babelHelpers.classCallCheck(this,AlertIOS);}babelHelpers.createClass(AlertIOS,null,[{key:'alert',value:function alert(

























title,
message,
callbackOrButtons,
type)
{
if(typeof type!=='undefined'){
console.warn('AlertIOS.alert() with a 4th "type" parameter is deprecated and will be removed. Use AlertIOS.prompt() instead.');
this.prompt(title,message,callbackOrButtons,type);
return;}

this.prompt(title,message,callbackOrButtons,'default');}},{key:'prompt',value:function prompt(











































title,
message,
callbackOrButtons)


{var type=arguments.length<=3||arguments[3]===undefined?'plain-text':arguments[3];var defaultValue=arguments[4];
if(typeof type==='function'){
console.warn(
'You passed a callback function as the "type" argument to AlertIOS.prompt(). React Native is '+
'assuming  you want to use the deprecated AlertIOS.prompt(title, defaultValue, buttons, callback) '+
'signature. The current signature is AlertIOS.prompt(title, message, callbackOrButtons, type, defaultValue) '+
'and the old syntax will be removed in a future version.');

var callback=type;
var defaultValue=message;
RCTAlertManager.alertWithArgs({
title:title||undefined,
type:'plain-text',
defaultValue:defaultValue},
function(id,value){
callback(value);});

return;}


var callbacks=[];
var buttons=[];
var cancelButtonKey;
var destructiveButtonKey;
if(typeof callbackOrButtons==='function'){
callbacks=[callbackOrButtons];}else 

if(callbackOrButtons instanceof Array){
callbackOrButtons.forEach(function(btn,index){
callbacks[index]=btn.onPress;
if(btn.style==='cancel'){
cancelButtonKey=String(index);}else 
if(btn.style==='destructive'){
destructiveButtonKey=String(index);}

if(btn.text||index<(callbackOrButtons||[]).length-1){
var btnDef={};
btnDef[index]=btn.text||'';
buttons.push(btnDef);}});}




RCTAlertManager.alertWithArgs({
title:title||undefined,
message:message||undefined,
buttons:buttons,
type:type||undefined,
defaultValue:defaultValue,
cancelButtonKey:cancelButtonKey,
destructiveButtonKey:destructiveButtonKey},
function(id,value){
var cb=callbacks[id];
cb&&cb(value);});}}]);return AlertIOS;}();




module.exports=AlertIOS;
});
__d(55 /* XMLHttpRequest */, function(global, require, module, exports) {'use strict';












var FormData=require(56 /* FormData */);
var RCTNetworking=require(57 /* RCTNetworking */);

var XMLHttpRequestBase=require(58 /* XMLHttpRequestBase */);var 

XMLHttpRequest=function(_XMLHttpRequestBase){babelHelpers.inherits(XMLHttpRequest,_XMLHttpRequestBase);
function XMLHttpRequest(){babelHelpers.classCallCheck(this,XMLHttpRequest);var _this=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(XMLHttpRequest).call(this));


_this.upload={};return _this;}babelHelpers.createClass(XMLHttpRequest,[{key:'sendImpl',value:function sendImpl(


method,url,headers,data,timeout){
if(typeof data==='string'){
data={string:data};}else 
if(data instanceof FormData){
data={formData:data.getParts()};}

RCTNetworking.sendRequest(
{
method:method,
url:url,
data:data,
headers:headers,
incrementalUpdates:this.onreadystatechange?true:false,
timeout:timeout},

this.didCreateRequest.bind(this));}}]);return XMLHttpRequest;}(XMLHttpRequestBase);




module.exports=XMLHttpRequest;
});
__d(56 /* FormData */, function(global, require, module, exports) {'use strict';var 














































FormData=function(){


function FormData(){babelHelpers.classCallCheck(this,FormData);
this._parts=[];}babelHelpers.createClass(FormData,[{key:'append',value:function append(


key,value){





this._parts.push([key,value]);}},{key:'getParts',value:function getParts()


{
return this._parts.map(function(_ref){var _ref2=babelHelpers.slicedToArray(_ref,2);var name=_ref2[0];var value=_ref2[1];
var contentDisposition='form-data; name="'+name+'"';

if(typeof value!=='object'){
value=''+value;}



var headers={'content-disposition':contentDisposition};





if(typeof value==='object'){
if(typeof value.name==='string'){
headers['content-disposition']+='; filename="'+value.name+'"';}

if(typeof value.type==='string'){
headers['content-type']=value.type;}

return babelHelpers.extends({},value,{headers:headers,fieldName:name});}


return {string:String(value),headers:headers,fieldName:name};});}}]);return FormData;}();




module.exports=FormData;
});
__d(57 /* RCTNetworking */, function(global, require, module, exports) {'use strict';











var RCTNetworkingNative=require(11 /* NativeModules */).Networking;var 




RCTNetworking=function(){function RCTNetworking(){babelHelpers.classCallCheck(this,RCTNetworking);}babelHelpers.createClass(RCTNetworking,null,[{key:'sendRequest',value:function sendRequest(

query,callback){
RCTNetworkingNative.sendRequest(query,callback);}},{key:'abortRequest',value:function abortRequest(


requestId){
RCTNetworkingNative.cancelRequest(requestId);}}]);return RCTNetworking;}();




module.exports=RCTNetworking;
});
__d(58 /* XMLHttpRequestBase */, function(global, require, module, exports) {'use strict';












var RCTNetworking=require(57 /* RCTNetworking */);
var RCTDeviceEventEmitter=require(22 /* RCTDeviceEventEmitter */);
var invariant=require(363 /* fbjs/lib/invariant */);

var UNSENT=0;
var OPENED=1;
var HEADERS_RECEIVED=2;
var LOADING=3;
var DONE=4;var 




XMLHttpRequestBase=function(){







































function XMLHttpRequestBase(){babelHelpers.classCallCheck(this,XMLHttpRequestBase);
this.UNSENT=UNSENT;
this.OPENED=OPENED;
this.HEADERS_RECEIVED=HEADERS_RECEIVED;
this.LOADING=LOADING;
this.DONE=DONE;

this.onreadystatechange=null;
this.onload=null;
this.upload=undefined;
this.timeout=0;

this._reset();
this._method=null;
this._url=null;
this._aborted=false;}babelHelpers.createClass(XMLHttpRequestBase,[{key:'_reset',value:function _reset()


{
this.readyState=this.UNSENT;
this.responseHeaders=undefined;
this.responseText='';
this.response=null;
this.responseType='';
this.status=0;
delete this.responseURL;

this._requestId=null;

this._headers={};
this._sent=false;
this._lowerCaseResponseHeaders={};

this._clearSubscriptions();}},{key:'didCreateRequest',value:function didCreateRequest(


requestId){var _this=this;
this._requestId=requestId;
this._subscriptions.push(RCTDeviceEventEmitter.addListener(
'didSendNetworkData',
function(args){var _didUploadProgress2;return (_didUploadProgress2=_this._didUploadProgress).call.apply(_didUploadProgress2,[_this].concat(babelHelpers.toConsumableArray(args)));}));

this._subscriptions.push(RCTDeviceEventEmitter.addListener(
'didReceiveNetworkResponse',
function(args){var _didReceiveResponse2;return (_didReceiveResponse2=_this._didReceiveResponse).call.apply(_didReceiveResponse2,[_this].concat(babelHelpers.toConsumableArray(args)));}));

this._subscriptions.push(RCTDeviceEventEmitter.addListener(
'didReceiveNetworkData',
function(args){var _didReceiveData2;return (_didReceiveData2=_this._didReceiveData).call.apply(_didReceiveData2,[_this].concat(babelHelpers.toConsumableArray(args)));}));

this._subscriptions.push(RCTDeviceEventEmitter.addListener(
'didCompleteNetworkResponse',
function(args){var _didCompleteResponse2;return (_didCompleteResponse2=_this._didCompleteResponse).call.apply(_didCompleteResponse2,[_this].concat(babelHelpers.toConsumableArray(args)));}));}},{key:'_didUploadProgress',value:function _didUploadProgress(



requestId,progress,total){
if(requestId===this._requestId&&this.upload&&this.upload.onprogress){
var event={
lengthComputable:true,
loaded:progress,
total:total};

this.upload.onprogress(event);}}},{key:'_didReceiveResponse',value:function _didReceiveResponse(



requestId,status,responseHeaders,responseURL){
if(requestId===this._requestId){
this.status=status;
this.setResponseHeaders(responseHeaders);
this.setReadyState(this.HEADERS_RECEIVED);
if(responseURL||responseURL===''){
this.responseURL=responseURL;}else 
{
delete this.responseURL;}}}},{key:'_didReceiveData',value:function _didReceiveData(




requestId,responseText){
if(requestId===this._requestId){
if(!this.responseText){
this.responseText=responseText;}else 
{
this.responseText+=responseText;}

switch(this.responseType){
case '':
case 'text':
this.response=this.responseText;
break;
case 'blob':

invariant(
typeof Blob==='function','responseType "blob" is only supported on platforms with native Blob support');


this.response=new Blob([this.responseText]);
break;
default:
invariant(false,'responseType "'+this.responseType+'" is unsupported');}

this.setReadyState(this.LOADING);}}},{key:'_didCompleteResponse',value:function _didCompleteResponse(



requestId,error){
if(requestId===this._requestId){
if(error){
this.responseText=error;}

this._clearSubscriptions();
this._requestId=null;
this.setReadyState(this.DONE);}}},{key:'_clearSubscriptions',value:function _clearSubscriptions()



{
(this._subscriptions||[]).forEach(function(sub){
sub.remove();});

this._subscriptions=[];}},{key:'getAllResponseHeaders',value:function getAllResponseHeaders()


{
if(!this.responseHeaders){

return null;}

var headers=this.responseHeaders||{};
return Object.keys(headers).map(function(headerName){
return headerName+': '+headers[headerName];}).
join('\n');}},{key:'getResponseHeader',value:function getResponseHeader(


header){
var value=this._lowerCaseResponseHeaders[header.toLowerCase()];
return value!==undefined?value:null;}},{key:'setRequestHeader',value:function setRequestHeader(


header,value){
if(this.readyState!==this.OPENED){
throw new Error('Request has not been opened');}

this._headers[header.toLowerCase()]=value;}},{key:'open',value:function open(


method,url,async){

if(this.readyState!==this.UNSENT){
throw new Error('Cannot open, already sending');}

if(async!==undefined&&!async){

throw new Error('Synchronous http requests are not supported');}

if(!url){
throw new Error('Cannot load an empty url');}

this._reset();
this._method=method;
this._url=url;
this._aborted=false;
this.setReadyState(this.OPENED);}},{key:'sendImpl',value:function sendImpl(


method,url,headers,data,timeout){
throw new Error('Subclass must define sendImpl method');}},{key:'send',value:function send(


data){
if(this.readyState!==this.OPENED){
throw new Error('Request has not been opened');}

if(this._sent){
throw new Error('Request has already been sent');}

this._sent=true;
this.sendImpl(this._method,this._url,this._headers,data,this.timeout);}},{key:'abort',value:function abort()


{
this._aborted=true;
if(this._requestId){
RCTNetworking.abortRequest(this._requestId);}



if(!(this.readyState===this.UNSENT||
this.readyState===this.OPENED&&!this._sent||
this.readyState===this.DONE)){
this._reset();
this.setReadyState(this.DONE);}


this._reset();}},{key:'setResponseHeaders',value:function setResponseHeaders(


responseHeaders){
this.responseHeaders=responseHeaders||null;
var headers=responseHeaders||{};
this._lowerCaseResponseHeaders=
Object.keys(headers).reduce(function(lcaseHeaders,headerName){
lcaseHeaders[headerName.toLowerCase()]=headers[headerName];
return lcaseHeaders;},
{});}},{key:'setReadyState',value:function setReadyState(


newState){
this.readyState=newState;

var onreadystatechange=this.onreadystatechange;
if(onreadystatechange){


onreadystatechange.call(this,null);}

if(newState===this.DONE&&!this._aborted){
this._sendLoad();}}},{key:'_sendLoad',value:function _sendLoad()



{

var onload=this.onload;
if(onload){


onload(null);}}}]);return XMLHttpRequestBase;}();




XMLHttpRequestBase.UNSENT=UNSENT;
XMLHttpRequestBase.OPENED=OPENED;
XMLHttpRequestBase.HEADERS_RECEIVED=HEADERS_RECEIVED;
XMLHttpRequestBase.LOADING=LOADING;
XMLHttpRequestBase.DONE=DONE;

module.exports=XMLHttpRequestBase;
});
__d(59 /* fetch */, function(global, require, module, exports) {'use strict';
















var self={};

/**
 * Copyright (c) 2014 GitHub, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @preserve-header
 */
(function(){
'use strict';

if(self.fetch){
return;}


function normalizeName(name){
if(typeof name!=='string'){
name=String(name);}

if(/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)){
throw new TypeError('Invalid character in header field name');}

return name.toLowerCase();}


function normalizeValue(value){
if(typeof value!=='string'){
value=String(value);}

return value;}


function Headers(headers){
this.map={};

if(headers instanceof Headers){
headers.forEach(function(value,name){
this.append(name,value);},
this);}else 

if(headers){
Object.getOwnPropertyNames(headers).forEach(function(name){
this.append(name,headers[name]);},
this);}}



Headers.prototype.append=function(name,value){
name=normalizeName(name);
value=normalizeValue(value);
var list=this.map[name];
if(!list){
list=[];
this.map[name]=list;}

list.push(value);};


Headers.prototype['delete']=function(name){
delete this.map[normalizeName(name)];};


Headers.prototype.get=function(name){
var values=this.map[normalizeName(name)];
return values?values[0]:null;};


Headers.prototype.getAll=function(name){
return this.map[normalizeName(name)]||[];};


Headers.prototype.has=function(name){
return this.map.hasOwnProperty(normalizeName(name));};


Headers.prototype.set=function(name,value){
this.map[normalizeName(name)]=[normalizeValue(value)];};


Headers.prototype.forEach=function(callback,thisArg){
Object.getOwnPropertyNames(this.map).forEach(function(name){
this.map[name].forEach(function(value){
callback.call(thisArg,value,name,this);},
this);},
this);};


function consumed(body){
if(body.bodyUsed){
return Promise.reject(new TypeError('Already read'));}

body.bodyUsed=true;}


function fileReaderReady(reader){
return new Promise(function(resolve,reject){
reader.onload=function(){
resolve(reader.result);};

reader.onerror=function(){
reject(reader.error);};});}




function readBlobAsArrayBuffer(blob){
var reader=new FileReader();
reader.readAsArrayBuffer(blob);
return fileReaderReady(reader);}


function readBlobAsText(blob){
var reader=new FileReader();
reader.readAsText(blob);
return fileReaderReady(reader);}


var support={
blob:typeof FileReader==='function'&&typeof Blob==='function'&&function(){
try{
new Blob();
return true;}
catch(e){
return false;}}(),


formData:typeof FormData==='function',
arrayBuffer:typeof ArrayBuffer==='function'};


function Body(){
this.bodyUsed=false;

this._initBody=function(body){
this._bodyInit=body;
if(typeof body==='string'){
this._bodyText=body;}else 
if(support.blob&&Blob.prototype.isPrototypeOf(body)){
this._bodyBlob=body;}else 
if(support.formData&&FormData.prototype.isPrototypeOf(body)){
this._bodyFormData=body;}else 
if(!body){
this._bodyText='';}else 
if(support.arrayBuffer&&ArrayBuffer.prototype.isPrototypeOf(body)){}else 


{
throw new Error('unsupported BodyInit type');}


if(!this.headers.get('content-type')){
if(typeof body==='string'){
this.headers.set('content-type','text/plain;charset=UTF-8');}else 
if(this._bodyBlob&&this._bodyBlob.type){
this.headers.set('content-type',this._bodyBlob.type);}}};




if(support.blob){
this.blob=function(){
var rejected=consumed(this);
if(rejected){
return rejected;}


if(this._bodyBlob){
return Promise.resolve(this._bodyBlob);}else 
if(this._bodyFormData){
throw new Error('could not read FormData body as blob');}else 
{
return Promise.resolve(new Blob([this._bodyText]));}};



this.arrayBuffer=function(){
return this.blob().then(readBlobAsArrayBuffer);};


this.text=function(){
var rejected=consumed(this);
if(rejected){
return rejected;}


if(this._bodyBlob){
return readBlobAsText(this._bodyBlob);}else 
if(this._bodyFormData){
throw new Error('could not read FormData body as text');}else 
{
return Promise.resolve(this._bodyText);}};}else 


{
this.text=function(){
var rejected=consumed(this);
return rejected?rejected:Promise.resolve(this._bodyText);};}



if(support.formData){
this.formData=function(){
return this.text().then(decode);};}



this.json=function(){
return this.text().then(JSON.parse);};


return this;}



var methods=['DELETE','GET','HEAD','OPTIONS','POST','PUT'];

function normalizeMethod(method){
var upcased=method.toUpperCase();
return methods.indexOf(upcased)>-1?upcased:method;}


function Request(input,options){
options=options||{};
var body=options.body;
if(Request.prototype.isPrototypeOf(input)){
if(input.bodyUsed){
throw new TypeError('Already read');}

this.url=input.url;
this.credentials=input.credentials;
if(!options.headers){
this.headers=new Headers(input.headers);}

this.method=input.method;
this.mode=input.mode;
if(!body){
body=input._bodyInit;
input.bodyUsed=true;}}else 

{
this.url=input;}


this.credentials=options.credentials||this.credentials||'omit';
if(options.headers||!this.headers){
this.headers=new Headers(options.headers);}

this.method=normalizeMethod(options.method||this.method||'GET');
this.mode=options.mode||this.mode||null;
this.referrer=null;

if((this.method==='GET'||this.method==='HEAD')&&body){
throw new TypeError('Body not allowed for GET or HEAD requests');}

this._initBody(body);}


Request.prototype.clone=function(){
return new Request(this);};


function decode(body){
var form=new FormData();
body.trim().split('&').forEach(function(bytes){
if(bytes){
var split=bytes.split('=');
var name=split.shift().replace(/\+/g,' ');
var value=split.join('=').replace(/\+/g,' ');
form.append(decodeURIComponent(name),decodeURIComponent(value));}});


return form;}


function headers(xhr){
var head=new Headers();
var pairs=xhr.getAllResponseHeaders().trim().split('\n');
pairs.forEach(function(header){
var split=header.trim().split(':');
var key=split.shift().trim();
var value=split.join(':').trim();
head.append(key,value);});

return head;}


Body.call(Request.prototype);

function Response(bodyInit,options){
if(!options){
options={};}


this.type='default';
this.status=options.status;
this.ok=this.status>=200&&this.status<300;
this.statusText=options.statusText;
this.headers=options.headers instanceof Headers?options.headers:new Headers(options.headers);
this.url=options.url||'';
this._initBody(bodyInit);}

Body.call(Response.prototype);

Response.prototype.clone=function(){
return new Response(this._bodyInit,{
status:this.status,
statusText:this.statusText,
headers:new Headers(this.headers),
url:this.url});};



Response.error=function(){
var response=new Response(null,{status:0,statusText:''});
response.type='error';
return response;};


var redirectStatuses=[301,302,303,307,308];

Response.redirect=function(url,status){
if(redirectStatuses.indexOf(status)===-1){
throw new RangeError('Invalid status code');}


return new Response(null,{status:status,headers:{location:url}});};


self.Headers=Headers;
self.Request=Request;
self.Response=Response;

self.fetch=function(input,init){
return new Promise(function(resolve,reject){
var request;
if(Request.prototype.isPrototypeOf(input)&&!init){
request=input;}else 
{
request=new Request(input,init);}


var xhr=new XMLHttpRequest();

function responseURL(){
if('responseURL' in xhr){
return xhr.responseURL;}



if(/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())){
return xhr.getResponseHeader('X-Request-URL');}


return;}


xhr.onload=function(){
var status=xhr.status===1223?204:xhr.status;
if(status<100||status>599){
reject(new TypeError('Network request failed'));
return;}


var options={
status:status,
statusText:xhr.statusText,
headers:headers(xhr),
url:responseURL()};

var body='response' in xhr?xhr.response:xhr.responseText;
resolve(new Response(body,options));};


xhr.onerror=function(){
reject(new TypeError('Network request failed'));};


xhr.open(request.method,request.url,true);

if(request.credentials==='include'){
xhr.withCredentials=true;}


if('responseType' in xhr&&support.blob){
xhr.responseType='blob';}


request.headers.forEach(function(value,name){
xhr.setRequestHeader(name,value);});


xhr.send(typeof request._bodyInit==='undefined'?null:request._bodyInit);});};


self.fetch.polyfill=true;})();



module.exports=self;
});
__d(60 /* Geolocation */, function(global, require, module, exports) {'use strict';












var RCTDeviceEventEmitter=require(22 /* RCTDeviceEventEmitter */);
var RCTLocationObserver=require(11 /* NativeModules */).LocationObserver;

var invariant=require(363 /* fbjs/lib/invariant */);
var logError=require(61 /* logError */);
var warning=require(368 /* fbjs/lib/warning */);

var subscriptions=[];

var updatesEnabled=false;
























var Geolocation={





getCurrentPosition:function(
geo_success,
geo_error,
geo_options)
{
invariant(
typeof geo_success==='function',
'Must provide a valid geo_success callback.');

RCTLocationObserver.getCurrentPosition(
geo_options||{},
geo_success,
geo_error||logError);},







watchPosition:function(success,error,options){
if(!updatesEnabled){
RCTLocationObserver.startObserving(options||{});
updatesEnabled=true;}

var watchID=subscriptions.length;
subscriptions.push([
RCTDeviceEventEmitter.addListener(
'geolocationDidChange',
success),

error?RCTDeviceEventEmitter.addListener(
'geolocationError',
error):
null]);

return watchID;},


clearWatch:function(watchID){
var sub=subscriptions[watchID];
if(!sub){


return;}


sub[0].remove();

var sub1=sub[1];sub1&&sub1.remove();
subscriptions[watchID]=undefined;
var noWatchers=true;
for(var ii=0;ii<subscriptions.length;ii++){
if(subscriptions[ii]){
noWatchers=false;}}


if(noWatchers){
Geolocation.stopObserving();}},



stopObserving:function(){
if(updatesEnabled){
RCTLocationObserver.stopObserving();
updatesEnabled=false;
for(var ii=0;ii<subscriptions.length;ii++){
var sub=subscriptions[ii];
if(sub){
warning('Called stopObserving with existing subscriptions.');
sub[0].remove();

var sub1=sub[1];sub1&&sub1.remove();}}


subscriptions=[];}}};




module.exports=Geolocation;
});
__d(61 /* logError */, function(global, require, module, exports) {'use strict';

















var logError=function(){
if(arguments.length===1&&arguments[0] instanceof Error){
var err=arguments[0];
console.error('Error: "'+err.message+'".  Stack:\n'+err.stack);}else 
{
console.error.apply(console,arguments);}};



module.exports=logError;
});
__d(62 /* Map */, function(global, require, module, exports) {var 



















guid=require(63 /* guid */);
var isNode=require(382 /* fbjs/lib/isNode */);
var toIterator=require(64 /* toIterator */);
var _shouldPolyfillES6Collection=require(65 /* _shouldPolyfillES6Collection */);

module.exports=function(global,undefined){




if(!_shouldPolyfillES6Collection('Map')){
return global.Map;}

























































var KIND_KEY='key';
var KIND_VALUE='value';
var KIND_KEY_VALUE='key+value';



var KEY_PREFIX='$map_';



var SECRET_SIZE_PROP;
if(__DEV__){
SECRET_SIZE_PROP='$size'+guid();}



var OLD_IE_HASH_PREFIX='IE_HASH_';var 

Map=function(){










function Map(iterable){babelHelpers.classCallCheck(this,Map);
if(!isObject(this)){
throw new TypeError('Wrong map object type.');}


initMap(this);

if(iterable!=null){
var it=toIterator(iterable);
var next;
while(!(next=it.next()).done){
if(!isObject(next.value)){
throw new TypeError('Expected iterable items to be pair objects.');}

this.set(next.value[0],next.value[1]);}}}babelHelpers.createClass(Map,[{key:'clear',value:function clear()








{
initMap(this);}},{key:'has',value:function has(









key){
var index=getIndex(this,key);
return !!(index!=null&&this._mapData[index]);}},{key:'set',value:function set(










key,value){
var index=getIndex(this,key);

if(index!=null&&this._mapData[index]){
this._mapData[index][1]=value;}else 
{
index=this._mapData.push([
key,
value])-
1;
setIndex(this,key,index);
if(__DEV__){
this[SECRET_SIZE_PROP]+=1;}else 
{
this.size+=1;}}



return this;}},{key:'get',value:function get(









key){
var index=getIndex(this,key);
if(index==null){
return undefined;}else 
{
return this._mapData[index][1];}}},{key:'delete',value:function _delete(











key){
var index=getIndex(this,key);
if(index!=null&&this._mapData[index]){
setIndex(this,key,undefined);
this._mapData[index]=undefined;
if(__DEV__){
this[SECRET_SIZE_PROP]-=1;}else 
{
this.size-=1;}

return true;}else 
{
return false;}}},{key:'entries',value:function entries()










{
return new MapIterator(this,KIND_KEY_VALUE);}},{key:'keys',value:function keys()








{
return new MapIterator(this,KIND_KEY);}},{key:'values',value:function values()








{
return new MapIterator(this,KIND_VALUE);}},{key:'forEach',value:function forEach(











callback,thisArg){
if(typeof callback!=='function'){
throw new TypeError('Callback must be callable.');}


var boundCallback=callback.bind(thisArg||undefined);
var mapData=this._mapData;




for(var i=0;i<mapData.length;i++){
var entry=mapData[i];
if(entry!=null){
boundCallback(entry[1],entry[0],this);}}}}]);return Map;}();






Map.prototype[toIterator.ITERATOR_SYMBOL]=Map.prototype.entries;var 

MapIterator=function(){









function MapIterator(map,kind){babelHelpers.classCallCheck(this,MapIterator);
if(!(isObject(map)&&map['_mapData'])){
throw new TypeError('Object is not a map.');}


if([KIND_KEY,KIND_KEY_VALUE,KIND_VALUE].indexOf(kind)===-1){
throw new Error('Invalid iteration kind.');}


this._map=map;
this._nextIndex=0;
this._kind=kind;}babelHelpers.createClass(MapIterator,[{key:'next',value:function next()








{
if(!this instanceof Map){
throw new TypeError('Expected to be called on a MapIterator.');}


var map=this._map;
var index=this._nextIndex;
var kind=this._kind;

if(map==null){
return createIterResultObject(undefined,true);}


var entries=map['_mapData'];

while(index<entries.length){
var record=entries[index];

index+=1;
this._nextIndex=index;

if(record){
if(kind===KIND_KEY){
return createIterResultObject(record[0],false);}else 
if(kind===KIND_VALUE){
return createIterResultObject(record[1],false);}else 
if(kind){
return createIterResultObject(record,false);}}}




this._map=undefined;

return createIterResultObject(undefined,true);}}]);return MapIterator;}();






MapIterator.prototype[toIterator.ITERATOR_SYMBOL]=function(){
return this;};













function getIndex(map,key){
if(isObject(key)){
var hash=getHash(key);
return map._objectIndex[hash];}else 
{
var prefixedKey=KEY_PREFIX+key;
if(typeof key==='string'){
return map._stringIndex[prefixedKey];}else 
{
return map._otherIndex[prefixedKey];}}}










function setIndex(map,key,index){
var shouldDelete=index==null;

if(isObject(key)){
var hash=getHash(key);
if(shouldDelete){
delete map._objectIndex[hash];}else 
{
map._objectIndex[hash]=index;}}else 

{
var prefixedKey=KEY_PREFIX+key;
if(typeof key==='string'){
if(shouldDelete){
delete map._stringIndex[prefixedKey];}else 
{
map._stringIndex[prefixedKey]=index;}}else 

{
if(shouldDelete){
delete map._otherIndex[prefixedKey];}else 
{
map._otherIndex[prefixedKey]=index;}}}}










function initMap(map){






map._mapData=[];







map._objectIndex={};


map._stringIndex={};


map._otherIndex={};







if(__DEV__){
if(isES5){



if(map.hasOwnProperty(SECRET_SIZE_PROP)){
map[SECRET_SIZE_PROP]=0;}else 
{
Object.defineProperty(map,SECRET_SIZE_PROP,{
value:0,
writable:true});

Object.defineProperty(map,'size',{
set:function(v){
console.error(
'PLEASE FIX ME: You are changing the map size property which '+
'should not be writable and will break in production.');

throw new Error('The map size property is not writable.');},

get:function(){return map[SECRET_SIZE_PROP];}});}




return;}}





map.size=0;}








function isObject(o){
return o!=null&&(typeof o==='object'||typeof o==='function');}









function createIterResultObject(value,done){
return {value:value,done:done};}



var isES5=function(){
try{
Object.defineProperty({},'x',{});
return true;}
catch(e){
return false;}}();









function isExtensible(o){
if(!isES5){
return true;}else 
{
return Object.isExtensible(o);}}











function getIENodeHash(node){
var uniqueID;
switch(node.nodeType){
case 1:
uniqueID=node.uniqueID;
break;
case 9:
uniqueID=node.documentElement.uniqueID;
break;
default:
return null;}


if(uniqueID){
return OLD_IE_HASH_PREFIX+uniqueID;}else 
{
return null;}}



var getHash=function(){
var propIsEnumerable=Object.prototype.propertyIsEnumerable;
var hashProperty=guid();
var hashCounter=0;







return function getHash(o){
if(o[hashProperty]){
return o[hashProperty];}else 
if(!isES5&&
o.propertyIsEnumerable&&
o.propertyIsEnumerable[hashProperty]){
return o.propertyIsEnumerable[hashProperty];}else 
if(!isES5&&
isNode(o)&&
getIENodeHash(o)){
return getIENodeHash(o);}else 
if(!isES5&&o[hashProperty]){
return o[hashProperty];}


if(isExtensible(o)){
hashCounter+=1;
if(isES5){
Object.defineProperty(o,hashProperty,{
enumerable:false,
writable:false,
configurable:false,
value:hashCounter});}else 

if(o.propertyIsEnumerable){




o.propertyIsEnumerable=function(){
return propIsEnumerable.apply(this,arguments);};

o.propertyIsEnumerable[hashProperty]=hashCounter;}else 
if(isNode(o)){




o[hashProperty]=hashCounter;}else 
{
throw new Error('Unable to set a non-enumerable property on object.');}

return hashCounter;}else 
{
throw new Error('Non-extensible objects are not allowed as keys.');}};}();




return Map;}(
Function('return this')());
});
__d(63 /* guid */, function(global, require, module, exports) {function 

























guid(){
return 'f'+(Math.random()*(1<<30)).toString(16).replace('.','');}


module.exports=guid;
});
__d(382 /* fbjs/lib/isNode.js */, function(global, require, module, exports) {'use strict';
















function isNode(object){
return !!(object&&(typeof Node==='function'?object instanceof Node:typeof object==='object'&&typeof object.nodeType==='number'&&typeof object.nodeName==='string'));}


module.exports=isNode;
});
__d(64 /* toIterator */, function(global, require, module, exports) {var 






























KIND_KEY='key';
var KIND_VALUE='value';
var KIND_KEY_VAL='key+value';

var ITERATOR_SYMBOL=typeof Symbol==='function'?typeof Symbol==='function'?
Symbol.iterator:'@@iterator':
'@@iterator';

var toIterator=function(){
if(!(Array.prototype[ITERATOR_SYMBOL]&&
String.prototype[ITERATOR_SYMBOL])){

return function(){var 
ArrayIterator=function(){

function ArrayIterator(array,kind){babelHelpers.classCallCheck(this,ArrayIterator);
if(!Array.isArray(array)){
throw new TypeError('Object is not an Array');}

this._iteratedObject=array;
this._kind=kind;
this._nextIndex=0;}babelHelpers.createClass(ArrayIterator,[{key:'next',value:function next()



{
if(!this instanceof ArrayIterator){
throw new TypeError('Object is not an ArrayIterator');}


if(this._iteratedObject==null){
return createIterResultObject(undefined,true);}


var array=this._iteratedObject;
var len=this._iteratedObject.length;
var index=this._nextIndex;
var kind=this._kind;

if(index>=len){
this._iteratedObject=undefined;
return createIterResultObject(undefined,true);}


this._nextIndex=index+1;

if(kind===KIND_KEY){
return createIterResultObject(index,false);}else 
if(kind===KIND_VALUE){
return createIterResultObject(array[index],false);}else 
if(kind===KIND_KEY_VAL){
return createIterResultObject([index,array[index]],false);}}},{key:




'@@iterator',value:function iterator(){
return this;}}]);return ArrayIterator;}();var 



StringIterator=function(){

function StringIterator(string){babelHelpers.classCallCheck(this,StringIterator);
if(typeof string!=='string'){
throw new TypeError('Object is not a string');}

this._iteratedString=string;
this._nextIndex=0;}babelHelpers.createClass(StringIterator,[{key:'next',value:function next()



{
if(!this instanceof StringIterator){
throw new TypeError('Object is not a StringIterator');}


if(this._iteratedString==null){
return createIterResultObject(undefined,true);}


var index=this._nextIndex;
var s=this._iteratedString;
var len=s.length;

if(index>=len){
this._iteratedString=undefined;
return createIterResultObject(undefined,true);}


var ret;
var first=s.charCodeAt(index);

if(first<0xD800||first>0xDBFF||index+1===len){
ret=s[index];}else 
{
var second=s.charCodeAt(index+1);
if(second<0xDC00||second>0xDFFF){
ret=s[index];}else 
{
ret=s[index]+s[index+1];}}



this._nextIndex=index+ret.length;

return createIterResultObject(ret,false);}},{key:



'@@iterator',value:function iterator(){
return this;}}]);return StringIterator;}();




function createIterResultObject(value,done){
return {value:value,done:done};}


return function(object,kind){
if(typeof object==='string'){
return new StringIterator(object);}else 
if(Array.isArray(object)){
return new ArrayIterator(object,kind||KIND_VALUE);}else 
{
return object[ITERATOR_SYMBOL]();}};}();}else 



{
return function(object){
return object[ITERATOR_SYMBOL]();};}}();








babelHelpers.extends(toIterator,{
KIND_KEY:KIND_KEY,
KIND_VALUE:KIND_VALUE,
KIND_KEY_VAL:KIND_KEY_VAL,
ITERATOR_SYMBOL:ITERATOR_SYMBOL});


module.exports=toIterator;
});
__d(65 /* _shouldPolyfillES6Collection */, function(global, require, module, exports) {function 
























shouldPolyfillES6Collection(collectionName){
var Collection=global[collectionName];
if(Collection==null){
return true;}






if(typeof global.Symbol!=='function'){
return true;}


var proto=Collection.prototype;




return Collection==null||
typeof Collection!=='function'||
typeof proto.clear!=='function'||
new Collection().size!==0||
typeof proto.keys!=='function'||
typeof proto.forEach!=='function';}


module.exports=shouldPolyfillES6Collection;
});
__d(66 /* Set */, function(global, require, module, exports) {var 



















Map=require(62 /* Map */);
var toIterator=require(64 /* toIterator */);
var _shouldPolyfillES6Collection=require(65 /* _shouldPolyfillES6Collection */);

module.exports=function(global,undefined){





if(!_shouldPolyfillES6Collection('Set')){
return global.Set;}var 











































Set=function(){










function Set(iterable){babelHelpers.classCallCheck(this,Set);
if(this==null||
typeof this!=='object'&&typeof this!=='function'){
throw new TypeError('Wrong set object type.');}


initSet(this);

if(iterable!=null){
var it=toIterator(iterable);
var next;
while(!(next=it.next()).done){
this.add(next.value);}}}babelHelpers.createClass(Set,[{key:'add',value:function add(












value){
this._map.set(value,value);
this.size=this._map.size;
return this;}},{key:'clear',value:function clear()







{
initSet(this);}},{key:'delete',value:function _delete(











value){
var ret=this._map.delete(value);
this.size=this._map.size;
return ret;}},{key:'entries',value:function entries()







{
return this._map.entries();}},{key:'forEach',value:function forEach(









callback){
var thisArg=arguments[1];
var it=this._map.keys();
var next;
while(!(next=it.next()).done){
callback.call(thisArg,next.value,next.value,this);}}},{key:'has',value:function has(











value){
return this._map.has(value);}},{key:'values',value:function values()







{
return this._map.values();}}]);return Set;}();




Set.prototype[toIterator.ITERATOR_SYMBOL]=Set.prototype.values;


Set.prototype.keys=Set.prototype.values;

function initSet(set){
set._map=new Map();
set.size=set._map.size;}


return Set;}(
Function('return this')());
});
__d(67 /* setupDevtools */, function(global, require, module, exports) {'use strict';












function setupDevtools(){
var messageListeners=[];
var closeListeners=[];
var ws=new window.WebSocket('ws://localhost:8097/devtools');

var FOR_BACKEND={
resolveRNStyle:require(7 /* flattenStyle */),
wall:{
listen:function(fn){
messageListeners.push(fn);},

onClose:function(fn){
closeListeners.push(fn);},

send:function(data){
ws.send(JSON.stringify(data));}}};



ws.onclose=handleClose;
ws.onerror=handleClose;
ws.onopen=function(){
tryToConnect();};


var hasClosed=false;
function handleClose(){
if(!hasClosed){
hasClosed=true;
setTimeout(setupDevtools,200);
closeListeners.forEach(function(fn){return fn();});}}



function tryToConnect(){
ws.send('attach:agent');
var _interval=setInterval(function(){return ws.send('attach:agent');},500);
ws.onmessage=function(evt){
if(evt.data.indexOf('eval:')===0){
clearInterval(_interval);
initialize(evt.data.slice('eval:'.length));}};}




function initialize(text){
try{

eval(text);}
catch(e){
console.error('Failed to eval: '+e.message);
return;}

window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject({
CurrentOwner:require(38 /* ReactCurrentOwner */),
InstanceHandles:require(68 /* ReactInstanceHandles */),
Mount:require(70 /* ReactNativeMount */),
Reconciler:require(71 /* ReactReconciler */),
TextComponent:require(87 /* ReactNativeTextComponent */)});

ws.onmessage=handleMessage;}


function handleMessage(evt){


var data;
try{
data=JSON.parse(evt.data);}
catch(e){
return console.error('failed to parse json: '+evt.data);}


if(data.$close||data.$error){
closeListeners.forEach(function(fn){return fn();});
window.__REACT_DEVTOOLS_GLOBAL_HOOK__.emit('shutdown');
tryToConnect();
return;}

if(data.$open){
return;}

messageListeners.forEach(function(fn){
try{
fn(data);}
catch(e){



console.log(data);
throw e;}});}}





module.exports=setupDevtools;
});
__d(68 /* ReactInstanceHandles */, function(global, require, module, exports) {'use strict';













var ReactRootIndex=require(69 /* ./ReactRootIndex */);

var invariant=require(384 /* fbjs/lib/invariant */);

var SEPARATOR='.';
var SEPARATOR_LENGTH=SEPARATOR.length;




var MAX_TREE_DEPTH=10000;








function getReactRootIDString(index){
return SEPARATOR+index.toString(36);}










function isBoundary(id,index){
return id.charAt(index)===SEPARATOR||index===id.length;}









function isValidID(id){
return id===''||id.charAt(0)===SEPARATOR&&id.charAt(id.length-1)!==SEPARATOR;}










function isAncestorIDOf(ancestorID,descendantID){
return descendantID.indexOf(ancestorID)===0&&isBoundary(descendantID,ancestorID.length);}









function getParentID(id){
return id?id.substr(0,id.lastIndexOf(SEPARATOR)):'';}











function getNextDescendantID(ancestorID,destinationID){
!(isValidID(ancestorID)&&isValidID(destinationID))?process.env.NODE_ENV!=='production'?invariant(false,'getNextDescendantID(%s, %s): Received an invalid React DOM ID.',ancestorID,destinationID):invariant(false):undefined;
!isAncestorIDOf(ancestorID,destinationID)?process.env.NODE_ENV!=='production'?invariant(false,'getNextDescendantID(...): React has made an invalid assumption about '+'the DOM hierarchy. Expected `%s` to be an ancestor of `%s`.',ancestorID,destinationID):invariant(false):undefined;
if(ancestorID===destinationID){
return ancestorID;}



var start=ancestorID.length+SEPARATOR_LENGTH;
var i;
for(i=start;i<destinationID.length;i++){
if(isBoundary(destinationID,i)){
break;}}


return destinationID.substr(0,i);}













function getFirstCommonAncestorID(oneID,twoID){
var minLength=Math.min(oneID.length,twoID.length);
if(minLength===0){
return '';}

var lastCommonMarkerIndex=0;

for(var i=0;i<=minLength;i++){
if(isBoundary(oneID,i)&&isBoundary(twoID,i)){
lastCommonMarkerIndex=i;}else 
if(oneID.charAt(i)!==twoID.charAt(i)){
break;}}


var longestCommonID=oneID.substr(0,lastCommonMarkerIndex);
!isValidID(longestCommonID)?process.env.NODE_ENV!=='production'?invariant(false,'getFirstCommonAncestorID(%s, %s): Expected a valid React DOM ID: %s',oneID,twoID,longestCommonID):invariant(false):undefined;
return longestCommonID;}















function traverseParentPath(start,stop,cb,arg,skipFirst,skipLast){
start=start||'';
stop=stop||'';
!(start!==stop)?process.env.NODE_ENV!=='production'?invariant(false,'traverseParentPath(...): Cannot traverse from and to the same ID, `%s`.',start):invariant(false):undefined;
var traverseUp=isAncestorIDOf(stop,start);
!(traverseUp||isAncestorIDOf(start,stop))?process.env.NODE_ENV!=='production'?invariant(false,'traverseParentPath(%s, %s, ...): Cannot traverse from two IDs that do '+'not have a parent path.',start,stop):invariant(false):undefined;

var depth=0;
var traverse=traverseUp?getParentID:getNextDescendantID;
for(var id=start;;id=traverse(id,stop)){
var ret;
if((!skipFirst||id!==start)&&(!skipLast||id!==stop)){
ret=cb(id,traverseUp,arg);}

if(ret===false||id===stop){

break;}

!(depth++<MAX_TREE_DEPTH)?process.env.NODE_ENV!=='production'?invariant(false,'traverseParentPath(%s, %s, ...): Detected an infinite loop while '+'traversing the React DOM ID tree. This may be due to malformed IDs: %s',start,stop,id):invariant(false):undefined;}}










var ReactInstanceHandles={





createReactRootID:function(){
return getReactRootIDString(ReactRootIndex.createReactRootIndex());},










createReactID:function(rootID,name){
return rootID+name;},










getReactRootIDFromNodeID:function(id){
if(id&&id.charAt(0)===SEPARATOR&&id.length>1){
var index=id.indexOf(SEPARATOR,1);
return index>-1?id.substr(0,index):id;}

return null;},
















traverseEnterLeave:function(leaveID,enterID,cb,upArg,downArg){
var ancestorID=getFirstCommonAncestorID(leaveID,enterID);
if(ancestorID!==leaveID){
traverseParentPath(leaveID,ancestorID,cb,upArg,false,true);}

if(ancestorID!==enterID){
traverseParentPath(ancestorID,enterID,cb,downArg,true,false);}},













traverseTwoPhase:function(targetID,cb,arg){
if(targetID){
traverseParentPath('',targetID,cb,arg,true,false);
traverseParentPath(targetID,'',cb,arg,false,true);}},






traverseTwoPhaseSkipTarget:function(targetID,cb,arg){
if(targetID){
traverseParentPath('',targetID,cb,arg,true,true);
traverseParentPath(targetID,'',cb,arg,true,true);}},















traverseAncestors:function(targetID,cb,arg){
traverseParentPath('',targetID,cb,arg,true,false);},


getFirstCommonAncestorID:getFirstCommonAncestorID,





_getNextDescendantID:getNextDescendantID,

isAncestorIDOf:isAncestorIDOf,

SEPARATOR:SEPARATOR};



module.exports=ReactInstanceHandles;
});
__d(69 /* ReactRootIndex */, function(global, require, module, exports) {'use strict';













var ReactRootIndexInjection={



injectCreateReactRootIndex:function(_createReactRootIndex){
ReactRootIndex.createReactRootIndex=_createReactRootIndex;}};



var ReactRootIndex={
createReactRootIndex:null,
injection:ReactRootIndexInjection};


module.exports=ReactRootIndex;
});
__d(384 /* fbjs/lib/invariant.js */, function(global, require, module, exports) {'use strict';























function invariant(condition,format,a,b,c,d,e,f){
if(process.env.NODE_ENV!=='production'){
if(format===undefined){
throw new Error('invariant requires an error message argument');}}



if(!condition){
var error;
if(format===undefined){
error=new Error('Minified exception occurred; use the non-minified dev environment '+'for the full error message and additional helpful warnings.');}else 
{
var args=[a,b,c,d,e,f];
var argIndex=0;
error=new Error(format.replace(/%s/g,function(){
return args[argIndex++];}));

error.name='Invariant Violation';}


error.framesToPop=1;
throw error;}}



module.exports=invariant;
});
__d(70 /* ReactNativeMount */, function(global, require, module, exports) {'use strict';












var ReactElement=require(42 /* ReactElement */);
var ReactNativeTagHandles=require(40 /* ReactNativeTagHandles */);
var ReactPerf=require(15 /* ReactPerf */);
var ReactReconciler=require(71 /* ReactReconciler */);
var ReactUpdateQueue=require(74 /* ReactUpdateQueue */);
var ReactUpdates=require(75 /* ReactUpdates */);
var UIManager=require(10 /* UIManager */);

var emptyObject=require(385 /* fbjs/lib/emptyObject */);
var instantiateReactComponent=require(79 /* instantiateReactComponent */);
var shouldUpdateReactComponent=require(83 /* shouldUpdateReactComponent */);

function instanceNumberToChildRootID(rootNodeID,instanceNumber){
return rootNodeID+'['+instanceNumber+']';}







var TopLevelWrapper=function(){};
TopLevelWrapper.prototype.isReactComponent={};
if(__DEV__){
TopLevelWrapper.displayName='TopLevelWrapper';}

TopLevelWrapper.prototype.render=function(){

return this.props;};










function mountComponentIntoNode(
componentInstance,
rootID,
container,
transaction){
var markup=ReactReconciler.mountComponent(
componentInstance,rootID,transaction,emptyObject);

componentInstance._renderedComponent._topLevelWrapper=componentInstance;
ReactNativeMount._mountImageIntoNode(markup,container);}









function batchedMountComponentIntoNode(
componentInstance,
rootID,
container){
var transaction=ReactUpdates.ReactReconcileTransaction.getPooled();
transaction.perform(
mountComponentIntoNode,
null,
componentInstance,
rootID,
container,
transaction);

ReactUpdates.ReactReconcileTransaction.release(transaction);}






var ReactNativeMount={
instanceCount:0,

_instancesByContainerID:{},


findNodeHandle:require(37 /* findNodeHandle */),
nativeTagToRootNodeID:function(nativeTag){
return ReactNativeTagHandles.tagToRootNodeID[nativeTag];},






renderComponent:function(
nextElement,
containerTag,
callback)
{
var nextWrappedElement=new ReactElement(
TopLevelWrapper,
null,
null,
null,
null,
null,
nextElement);


var topRootNodeID=ReactNativeTagHandles.tagToRootNodeID[containerTag];
if(topRootNodeID){
var prevComponent=ReactNativeMount._instancesByContainerID[topRootNodeID];
if(prevComponent){
var prevWrappedElement=prevComponent._currentElement;
var prevElement=prevWrappedElement.props;
if(shouldUpdateReactComponent(prevElement,nextElement)){
ReactUpdateQueue.enqueueElementInternal(prevComponent,nextWrappedElement);
if(callback){
ReactUpdateQueue.enqueueCallbackInternal(prevComponent,callback);}

return prevComponent;}else 
{
ReactNativeMount.unmountComponentAtNode(containerTag);}}}




if(!ReactNativeTagHandles.reactTagIsNativeTopRootID(containerTag)){
console.error('You cannot render into anything but a top root');
return;}


var topRootNodeID=ReactNativeTagHandles.allocateRootNodeIDForTag(containerTag);
ReactNativeTagHandles.associateRootNodeIDWithMountedNodeHandle(
topRootNodeID,
containerTag);


var instance=instantiateReactComponent(nextWrappedElement);
ReactNativeMount._instancesByContainerID[topRootNodeID]=instance;

var childRootNodeID=instanceNumberToChildRootID(
topRootNodeID,
ReactNativeMount.instanceCount++);






ReactUpdates.batchedUpdates(
batchedMountComponentIntoNode,
instance,
childRootNodeID,
topRootNodeID);

var component=instance.getPublicInstance();
if(callback){
callback.call(component);}

return component;},






_mountImageIntoNode:ReactPerf.measure(

'ReactComponentBrowserEnvironment',
'mountImageIntoNode',
function(mountImage,containerID){


ReactNativeTagHandles.associateRootNodeIDWithMountedNodeHandle(
mountImage.rootNodeID,
mountImage.tag);

UIManager.setChildren(
ReactNativeTagHandles.mostRecentMountedNodeHandleForRootNodeID(containerID),
[mountImage.tag]);}),












unmountComponentAtNodeAndRemoveContainer:function(
containerTag)
{
ReactNativeMount.unmountComponentAtNode(containerTag);

UIManager.removeRootView(containerTag);},







unmountComponentAtNode:function(containerTag){
if(!ReactNativeTagHandles.reactTagIsNativeTopRootID(containerTag)){
console.error('You cannot render into anything but a top root');
return false;}


var containerID=ReactNativeTagHandles.tagToRootNodeID[containerTag];
var instance=ReactNativeMount._instancesByContainerID[containerID];
if(!instance){
return false;}

ReactNativeMount.unmountComponentFromNode(instance,containerID);
delete ReactNativeMount._instancesByContainerID[containerID];
return true;},











unmountComponentFromNode:function(
instance,
containerID)
{

ReactReconciler.unmountComponent(instance);
var containerTag=
ReactNativeTagHandles.mostRecentMountedNodeHandleForRootNodeID(containerID);
UIManager.removeSubviewsFromContainerWithID(containerTag);},


getNode:function(rootNodeID){
return ReactNativeTagHandles.rootNodeIDToTag[rootNodeID];},


getID:function(nativeTag){
return ReactNativeTagHandles.tagToRootNodeID[nativeTag];}};



ReactNativeMount.renderComponent=ReactPerf.measure(
'ReactMount',
'_renderNewRootComponent',
ReactNativeMount.renderComponent);


module.exports=ReactNativeMount;
});
__d(71 /* ReactReconciler */, function(global, require, module, exports) {'use strict';












var ReactRef=require(72 /* ./ReactRef */);





function attachRefs(){
ReactRef.attachRefs(this,this._currentElement);}


var ReactReconciler={











mountComponent:function(internalInstance,rootID,transaction,context){
var markup=internalInstance.mountComponent(rootID,transaction,context);
if(internalInstance._currentElement&&internalInstance._currentElement.ref!=null){
transaction.getReactMountReady().enqueue(attachRefs,internalInstance);}

return markup;},








unmountComponent:function(internalInstance){
ReactRef.detachRefs(internalInstance,internalInstance._currentElement);
internalInstance.unmountComponent();},











receiveComponent:function(internalInstance,nextElement,transaction,context){
var prevElement=internalInstance._currentElement;

if(nextElement===prevElement&&context===internalInstance._context){










return;}


var refsChanged=ReactRef.shouldUpdateRefs(prevElement,nextElement);

if(refsChanged){
ReactRef.detachRefs(internalInstance,prevElement);}


internalInstance.receiveComponent(nextElement,transaction,context);

if(refsChanged&&internalInstance._currentElement&&internalInstance._currentElement.ref!=null){
transaction.getReactMountReady().enqueue(attachRefs,internalInstance);}},










performUpdateIfNecessary:function(internalInstance,transaction){
internalInstance.performUpdateIfNecessary(transaction);}};




module.exports=ReactReconciler;
});
__d(72 /* ReactRef */, function(global, require, module, exports) {'use strict';












var ReactOwner=require(73 /* ./ReactOwner */);

var ReactRef={};

function attachRef(ref,component,owner){
if(typeof ref==='function'){
ref(component.getPublicInstance());}else 
{

ReactOwner.addComponentAsRefTo(component,ref,owner);}}



function detachRef(ref,component,owner){
if(typeof ref==='function'){
ref(null);}else 
{

ReactOwner.removeComponentAsRefFrom(component,ref,owner);}}



ReactRef.attachRefs=function(instance,element){
if(element===null||element===false){
return;}

var ref=element.ref;
if(ref!=null){
attachRef(ref,instance,element._owner);}};



ReactRef.shouldUpdateRefs=function(prevElement,nextElement){












var prevEmpty=prevElement===null||prevElement===false;
var nextEmpty=nextElement===null||nextElement===false;

return (

prevEmpty||nextEmpty||nextElement._owner!==prevElement._owner||nextElement.ref!==prevElement.ref);};



ReactRef.detachRefs=function(instance,element){
if(element===null||element===false){
return;}

var ref=element.ref;
if(ref!=null){
detachRef(ref,instance,element._owner);}};



module.exports=ReactRef;
});
__d(73 /* ReactOwner */, function(global, require, module, exports) {'use strict';












var invariant=require(384 /* fbjs/lib/invariant */);































var ReactOwner={






isValidOwner:function(object){
return !!(object&&typeof object.attachRef==='function'&&typeof object.detachRef==='function');},











addComponentAsRefTo:function(component,ref,owner){
!ReactOwner.isValidOwner(owner)?process.env.NODE_ENV!=='production'?invariant(false,'addComponentAsRefTo(...): Only a ReactOwner can have refs. You might '+'be adding a ref to a component that was not created inside a component\'s '+'`render` method, or you have multiple copies of React loaded '+'(details: https://fb.me/react-refs-must-have-owner).'):invariant(false):undefined;
owner.attachRef(ref,component);},











removeComponentAsRefFrom:function(component,ref,owner){
!ReactOwner.isValidOwner(owner)?process.env.NODE_ENV!=='production'?invariant(false,'removeComponentAsRefFrom(...): Only a ReactOwner can have refs. You might '+'be removing a ref to a component that was not created inside a component\'s '+'`render` method, or you have multiple copies of React loaded '+'(details: https://fb.me/react-refs-must-have-owner).'):invariant(false):undefined;


if(owner.getPublicInstance().refs[ref]===component.getPublicInstance()){
owner.detachRef(ref);}}};





module.exports=ReactOwner;
});
__d(74 /* ReactUpdateQueue */, function(global, require, module, exports) {'use strict';












var ReactCurrentOwner=require(38 /* ./ReactCurrentOwner */);
var ReactElement=require(42 /* ./ReactElement */);
var ReactInstanceMap=require(39 /* ./ReactInstanceMap */);
var ReactUpdates=require(75 /* ./ReactUpdates */);

var assign=require(43 /* ./Object.assign */);
var invariant=require(384 /* fbjs/lib/invariant */);
var warning=require(386 /* fbjs/lib/warning */);

function enqueueUpdate(internalInstance){
ReactUpdates.enqueueUpdate(internalInstance);}


function getInternalInstanceReadyForUpdate(publicInstance,callerName){
var internalInstance=ReactInstanceMap.get(publicInstance);
if(!internalInstance){
if(process.env.NODE_ENV!=='production'){



process.env.NODE_ENV!=='production'?warning(!callerName,'%s(...): Can only update a mounted or mounting component. '+'This usually means you called %s() on an unmounted component. '+'This is a no-op. Please check the code for the %s component.',callerName,callerName,publicInstance.constructor.displayName):undefined;}

return null;}


if(process.env.NODE_ENV!=='production'){
process.env.NODE_ENV!=='production'?warning(ReactCurrentOwner.current==null,'%s(...): Cannot update during an existing state transition '+'(such as within `render`). Render methods should be a pure function '+'of props and state.',callerName):undefined;}


return internalInstance;}






var ReactUpdateQueue={








isMounted:function(publicInstance){
if(process.env.NODE_ENV!=='production'){
var owner=ReactCurrentOwner.current;
if(owner!==null){
process.env.NODE_ENV!=='production'?warning(owner._warnedAboutRefsInRender,'%s is accessing isMounted inside its render() function. '+'render() should be a pure function of props and state. It should '+'never access something that requires stale data from the previous '+'render, such as refs. Move this logic to componentDidMount and '+'componentDidUpdate instead.',owner.getName()||'A component'):undefined;
owner._warnedAboutRefsInRender=true;}}


var internalInstance=ReactInstanceMap.get(publicInstance);
if(internalInstance){



return !!internalInstance._renderedComponent;}else 
{
return false;}},











enqueueCallback:function(publicInstance,callback){
!(typeof callback==='function')?process.env.NODE_ENV!=='production'?invariant(false,'enqueueCallback(...): You called `setProps`, `replaceProps`, '+'`setState`, `replaceState`, or `forceUpdate` with a callback that '+'isn\'t callable.'):invariant(false):undefined;
var internalInstance=getInternalInstanceReadyForUpdate(publicInstance);






if(!internalInstance){
return null;}


if(internalInstance._pendingCallbacks){
internalInstance._pendingCallbacks.push(callback);}else 
{
internalInstance._pendingCallbacks=[callback];}





enqueueUpdate(internalInstance);},


enqueueCallbackInternal:function(internalInstance,callback){
!(typeof callback==='function')?process.env.NODE_ENV!=='production'?invariant(false,'enqueueCallback(...): You called `setProps`, `replaceProps`, '+'`setState`, `replaceState`, or `forceUpdate` with a callback that '+'isn\'t callable.'):invariant(false):undefined;
if(internalInstance._pendingCallbacks){
internalInstance._pendingCallbacks.push(callback);}else 
{
internalInstance._pendingCallbacks=[callback];}

enqueueUpdate(internalInstance);},















enqueueForceUpdate:function(publicInstance){
var internalInstance=getInternalInstanceReadyForUpdate(publicInstance,'forceUpdate');

if(!internalInstance){
return;}


internalInstance._pendingForceUpdate=true;

enqueueUpdate(internalInstance);},













enqueueReplaceState:function(publicInstance,completeState){
var internalInstance=getInternalInstanceReadyForUpdate(publicInstance,'replaceState');

if(!internalInstance){
return;}


internalInstance._pendingStateQueue=[completeState];
internalInstance._pendingReplaceState=true;

enqueueUpdate(internalInstance);},












enqueueSetState:function(publicInstance,partialState){
var internalInstance=getInternalInstanceReadyForUpdate(publicInstance,'setState');

if(!internalInstance){
return;}


var queue=internalInstance._pendingStateQueue||(internalInstance._pendingStateQueue=[]);
queue.push(partialState);

enqueueUpdate(internalInstance);},









enqueueSetProps:function(publicInstance,partialProps){
var internalInstance=getInternalInstanceReadyForUpdate(publicInstance,'setProps');
if(!internalInstance){
return;}

ReactUpdateQueue.enqueueSetPropsInternal(internalInstance,partialProps);},


enqueueSetPropsInternal:function(internalInstance,partialProps){
var topLevelWrapper=internalInstance._topLevelWrapper;
!topLevelWrapper?process.env.NODE_ENV!=='production'?invariant(false,'setProps(...): You called `setProps` on a '+'component with a parent. This is an anti-pattern since props will '+'get reactively updated when rendered. Instead, change the owner\'s '+'`render` method to pass the correct value as props to the component '+'where it is created.'):invariant(false):undefined;



var wrapElement=topLevelWrapper._pendingElement||topLevelWrapper._currentElement;
var element=wrapElement.props;
var props=assign({},element.props,partialProps);
topLevelWrapper._pendingElement=ReactElement.cloneAndReplaceProps(wrapElement,ReactElement.cloneAndReplaceProps(element,props));

enqueueUpdate(topLevelWrapper);},









enqueueReplaceProps:function(publicInstance,props){
var internalInstance=getInternalInstanceReadyForUpdate(publicInstance,'replaceProps');
if(!internalInstance){
return;}

ReactUpdateQueue.enqueueReplacePropsInternal(internalInstance,props);},


enqueueReplacePropsInternal:function(internalInstance,props){
var topLevelWrapper=internalInstance._topLevelWrapper;
!topLevelWrapper?process.env.NODE_ENV!=='production'?invariant(false,'replaceProps(...): You called `replaceProps` on a '+'component with a parent. This is an anti-pattern since props will '+'get reactively updated when rendered. Instead, change the owner\'s '+'`render` method to pass the correct value as props to the component '+'where it is created.'):invariant(false):undefined;



var wrapElement=topLevelWrapper._pendingElement||topLevelWrapper._currentElement;
var element=wrapElement.props;
topLevelWrapper._pendingElement=ReactElement.cloneAndReplaceProps(wrapElement,ReactElement.cloneAndReplaceProps(element,props));

enqueueUpdate(topLevelWrapper);},


enqueueElementInternal:function(internalInstance,newElement){
internalInstance._pendingElement=newElement;
enqueueUpdate(internalInstance);}};




module.exports=ReactUpdateQueue;
});
__d(75 /* ReactUpdates */, function(global, require, module, exports) {'use strict';












var CallbackQueue=require(76 /* ./CallbackQueue */);
var PooledClass=require(77 /* ./PooledClass */);
var ReactPerf=require(15 /* ./ReactPerf */);
var ReactReconciler=require(71 /* ./ReactReconciler */);
var Transaction=require(78 /* ./Transaction */);

var assign=require(43 /* ./Object.assign */);
var invariant=require(384 /* fbjs/lib/invariant */);

var dirtyComponents=[];
var asapCallbackQueue=CallbackQueue.getPooled();
var asapEnqueued=false;

var batchingStrategy=null;

function ensureInjected(){
!(ReactUpdates.ReactReconcileTransaction&&batchingStrategy)?process.env.NODE_ENV!=='production'?invariant(false,'ReactUpdates: must inject a reconcile transaction class and batching '+'strategy'):invariant(false):undefined;}


var NESTED_UPDATES={
initialize:function(){
this.dirtyComponentsLength=dirtyComponents.length;},

close:function(){
if(this.dirtyComponentsLength!==dirtyComponents.length){





dirtyComponents.splice(0,this.dirtyComponentsLength);
flushBatchedUpdates();}else 
{
dirtyComponents.length=0;}}};




var UPDATE_QUEUEING={
initialize:function(){
this.callbackQueue.reset();},

close:function(){
this.callbackQueue.notifyAll();}};



var TRANSACTION_WRAPPERS=[NESTED_UPDATES,UPDATE_QUEUEING];

function ReactUpdatesFlushTransaction(){
this.reinitializeTransaction();
this.dirtyComponentsLength=null;
this.callbackQueue=CallbackQueue.getPooled();
this.reconcileTransaction=ReactUpdates.ReactReconcileTransaction.getPooled(false);}


assign(ReactUpdatesFlushTransaction.prototype,Transaction.Mixin,{
getTransactionWrappers:function(){
return TRANSACTION_WRAPPERS;},


destructor:function(){
this.dirtyComponentsLength=null;
CallbackQueue.release(this.callbackQueue);
this.callbackQueue=null;
ReactUpdates.ReactReconcileTransaction.release(this.reconcileTransaction);
this.reconcileTransaction=null;},


perform:function(method,scope,a){


return Transaction.Mixin.perform.call(this,this.reconcileTransaction.perform,this.reconcileTransaction,method,scope,a);}});



PooledClass.addPoolingTo(ReactUpdatesFlushTransaction);

function batchedUpdates(callback,a,b,c,d,e){
ensureInjected();
batchingStrategy.batchedUpdates(callback,a,b,c,d,e);}









function mountOrderComparator(c1,c2){
return c1._mountOrder-c2._mountOrder;}


function runBatchedUpdates(transaction){
var len=transaction.dirtyComponentsLength;
!(len===dirtyComponents.length)?process.env.NODE_ENV!=='production'?invariant(false,'Expected flush transaction\'s stored dirty-components length (%s) to '+'match dirty-components array length (%s).',len,dirtyComponents.length):invariant(false):undefined;




dirtyComponents.sort(mountOrderComparator);

for(var i=0;i<len;i++){



var component=dirtyComponents[i];




var callbacks=component._pendingCallbacks;
component._pendingCallbacks=null;

ReactReconciler.performUpdateIfNecessary(component,transaction.reconcileTransaction);

if(callbacks){
for(var j=0;j<callbacks.length;j++){
transaction.callbackQueue.enqueue(callbacks[j],component.getPublicInstance());}}}}





var flushBatchedUpdates=function(){




while(dirtyComponents.length||asapEnqueued){
if(dirtyComponents.length){
var transaction=ReactUpdatesFlushTransaction.getPooled();
transaction.perform(runBatchedUpdates,null,transaction);
ReactUpdatesFlushTransaction.release(transaction);}


if(asapEnqueued){
asapEnqueued=false;
var queue=asapCallbackQueue;
asapCallbackQueue=CallbackQueue.getPooled();
queue.notifyAll();
CallbackQueue.release(queue);}}};



flushBatchedUpdates=ReactPerf.measure('ReactUpdates','flushBatchedUpdates',flushBatchedUpdates);





function enqueueUpdate(component){
ensureInjected();







if(!batchingStrategy.isBatchingUpdates){
batchingStrategy.batchedUpdates(enqueueUpdate,component);
return;}


dirtyComponents.push(component);}






function asap(callback,context){
!batchingStrategy.isBatchingUpdates?process.env.NODE_ENV!=='production'?invariant(false,'ReactUpdates.asap: Can\'t enqueue an asap callback in a context where'+'updates are not being batched.'):invariant(false):undefined;
asapCallbackQueue.enqueue(callback,context);
asapEnqueued=true;}


var ReactUpdatesInjection={
injectReconcileTransaction:function(ReconcileTransaction){
!ReconcileTransaction?process.env.NODE_ENV!=='production'?invariant(false,'ReactUpdates: must provide a reconcile transaction class'):invariant(false):undefined;
ReactUpdates.ReactReconcileTransaction=ReconcileTransaction;},


injectBatchingStrategy:function(_batchingStrategy){
!_batchingStrategy?process.env.NODE_ENV!=='production'?invariant(false,'ReactUpdates: must provide a batching strategy'):invariant(false):undefined;
!(typeof _batchingStrategy.batchedUpdates==='function')?process.env.NODE_ENV!=='production'?invariant(false,'ReactUpdates: must provide a batchedUpdates() function'):invariant(false):undefined;
!(typeof _batchingStrategy.isBatchingUpdates==='boolean')?process.env.NODE_ENV!=='production'?invariant(false,'ReactUpdates: must provide an isBatchingUpdates boolean attribute'):invariant(false):undefined;
batchingStrategy=_batchingStrategy;}};



var ReactUpdates={






ReactReconcileTransaction:null,

batchedUpdates:batchedUpdates,
enqueueUpdate:enqueueUpdate,
flushBatchedUpdates:flushBatchedUpdates,
injection:ReactUpdatesInjection,
asap:asap};


module.exports=ReactUpdates;
});
__d(76 /* CallbackQueue */, function(global, require, module, exports) {'use strict';












var PooledClass=require(77 /* ./PooledClass */);

var assign=require(43 /* ./Object.assign */);
var invariant=require(384 /* fbjs/lib/invariant */);












function CallbackQueue(){
this._callbacks=null;
this._contexts=null;}


assign(CallbackQueue.prototype,{








enqueue:function(callback,context){
this._callbacks=this._callbacks||[];
this._contexts=this._contexts||[];
this._callbacks.push(callback);
this._contexts.push(context);},








notifyAll:function(){
var callbacks=this._callbacks;
var contexts=this._contexts;
if(callbacks){
!(callbacks.length===contexts.length)?process.env.NODE_ENV!=='production'?invariant(false,'Mismatched list of contexts in callback queue'):invariant(false):undefined;
this._callbacks=null;
this._contexts=null;
for(var i=0;i<callbacks.length;i++){
callbacks[i].call(contexts[i]);}

callbacks.length=0;
contexts.length=0;}},








reset:function(){
this._callbacks=null;
this._contexts=null;},





destructor:function(){
this.reset();}});




PooledClass.addPoolingTo(CallbackQueue);

module.exports=CallbackQueue;
});
__d(77 /* PooledClass */, function(global, require, module, exports) {'use strict';












var invariant=require(384 /* fbjs/lib/invariant */);








var oneArgumentPooler=function(copyFieldsFrom){
var Klass=this;
if(Klass.instancePool.length){
var instance=Klass.instancePool.pop();
Klass.call(instance,copyFieldsFrom);
return instance;}else 
{
return new Klass(copyFieldsFrom);}};



var twoArgumentPooler=function(a1,a2){
var Klass=this;
if(Klass.instancePool.length){
var instance=Klass.instancePool.pop();
Klass.call(instance,a1,a2);
return instance;}else 
{
return new Klass(a1,a2);}};



var threeArgumentPooler=function(a1,a2,a3){
var Klass=this;
if(Klass.instancePool.length){
var instance=Klass.instancePool.pop();
Klass.call(instance,a1,a2,a3);
return instance;}else 
{
return new Klass(a1,a2,a3);}};



var fourArgumentPooler=function(a1,a2,a3,a4){
var Klass=this;
if(Klass.instancePool.length){
var instance=Klass.instancePool.pop();
Klass.call(instance,a1,a2,a3,a4);
return instance;}else 
{
return new Klass(a1,a2,a3,a4);}};



var fiveArgumentPooler=function(a1,a2,a3,a4,a5){
var Klass=this;
if(Klass.instancePool.length){
var instance=Klass.instancePool.pop();
Klass.call(instance,a1,a2,a3,a4,a5);
return instance;}else 
{
return new Klass(a1,a2,a3,a4,a5);}};



var standardReleaser=function(instance){
var Klass=this;
!(instance instanceof Klass)?process.env.NODE_ENV!=='production'?invariant(false,'Trying to release an instance into a pool of a different type.'):invariant(false):undefined;
instance.destructor();
if(Klass.instancePool.length<Klass.poolSize){
Klass.instancePool.push(instance);}};



var DEFAULT_POOL_SIZE=10;
var DEFAULT_POOLER=oneArgumentPooler;










var addPoolingTo=function(CopyConstructor,pooler){
var NewKlass=CopyConstructor;
NewKlass.instancePool=[];
NewKlass.getPooled=pooler||DEFAULT_POOLER;
if(!NewKlass.poolSize){
NewKlass.poolSize=DEFAULT_POOL_SIZE;}

NewKlass.release=standardReleaser;
return NewKlass;};


var PooledClass={
addPoolingTo:addPoolingTo,
oneArgumentPooler:oneArgumentPooler,
twoArgumentPooler:twoArgumentPooler,
threeArgumentPooler:threeArgumentPooler,
fourArgumentPooler:fourArgumentPooler,
fiveArgumentPooler:fiveArgumentPooler};


module.exports=PooledClass;
});
__d(78 /* Transaction */, function(global, require, module, exports) {'use strict';












var invariant=require(384 /* fbjs/lib/invariant */);






























































var Mixin={







reinitializeTransaction:function(){
this.transactionWrappers=this.getTransactionWrappers();
if(this.wrapperInitData){
this.wrapperInitData.length=0;}else 
{
this.wrapperInitData=[];}

this._isInTransaction=false;},


_isInTransaction:false,





getTransactionWrappers:null,

isInTransaction:function(){
return !!this._isInTransaction;},



















perform:function(method,scope,a,b,c,d,e,f){
!!this.isInTransaction()?process.env.NODE_ENV!=='production'?invariant(false,'Transaction.perform(...): Cannot initialize a transaction when there '+'is already an outstanding transaction.'):invariant(false):undefined;
var errorThrown;
var ret;
try{
this._isInTransaction=true;




errorThrown=true;
this.initializeAll(0);
ret=method.call(scope,a,b,c,d,e,f);
errorThrown=false;}finally 
{
try{
if(errorThrown){


try{
this.closeAll(0);}
catch(err){}}else 
{


this.closeAll(0);}}finally 

{
this._isInTransaction=false;}}


return ret;},


initializeAll:function(startIndex){
var transactionWrappers=this.transactionWrappers;
for(var i=startIndex;i<transactionWrappers.length;i++){
var wrapper=transactionWrappers[i];
try{




this.wrapperInitData[i]=Transaction.OBSERVED_ERROR;
this.wrapperInitData[i]=wrapper.initialize?wrapper.initialize.call(this):null;}finally 
{
if(this.wrapperInitData[i]===Transaction.OBSERVED_ERROR){



try{
this.initializeAll(i+1);}
catch(err){}}}}},











closeAll:function(startIndex){
!this.isInTransaction()?process.env.NODE_ENV!=='production'?invariant(false,'Transaction.closeAll(): Cannot close transaction when none are open.'):invariant(false):undefined;
var transactionWrappers=this.transactionWrappers;
for(var i=startIndex;i<transactionWrappers.length;i++){
var wrapper=transactionWrappers[i];
var initData=this.wrapperInitData[i];
var errorThrown;
try{




errorThrown=true;
if(initData!==Transaction.OBSERVED_ERROR&&wrapper.close){
wrapper.close.call(this,initData);}

errorThrown=false;}finally 
{
if(errorThrown){



try{
this.closeAll(i+1);}
catch(e){}}}}



this.wrapperInitData.length=0;}};



var Transaction={

Mixin:Mixin,




OBSERVED_ERROR:{}};



module.exports=Transaction;
});
__d(386 /* fbjs/lib/warning.js */, function(global, require, module, exports) {'use strict';












var emptyFunction=require(379 /* ./emptyFunction */);








var warning=emptyFunction;

if(process.env.NODE_ENV!=='production'){
warning=function(condition,format){
for(var _len=arguments.length,args=Array(_len>2?_len-2:0),_key=2;_key<_len;_key++){
args[_key-2]=arguments[_key];}


if(format===undefined){
throw new Error('`warning(condition, format, ...args)` requires a warning '+'message argument');}


if(format.indexOf('Failed Composite propType: ')===0){
return;}


if(!condition){
var argIndex=0;
var message='Warning: '+format.replace(/%s/g,function(){
return args[argIndex++];});

if(typeof console!=='undefined'){
console.error(message);}

try{



throw new Error(message);}
catch(x){}}};}




module.exports=warning;
});
__d(385 /* fbjs/lib/emptyObject.js */, function(global, require, module, exports) {'use strict';











var emptyObject={};

if(process.env.NODE_ENV!=='production'){
Object.freeze(emptyObject);}


module.exports=emptyObject;
});
__d(79 /* instantiateReactComponent */, function(global, require, module, exports) {'use strict';













var ReactCompositeComponent=require(80 /* ./ReactCompositeComponent */);
var ReactEmptyComponent=require(84 /* ./ReactEmptyComponent */);
var ReactNativeComponent=require(86 /* ./ReactNativeComponent */);

var assign=require(43 /* ./Object.assign */);
var invariant=require(384 /* fbjs/lib/invariant */);
var warning=require(386 /* fbjs/lib/warning */);


var ReactCompositeComponentWrapper=function(){};
assign(ReactCompositeComponentWrapper.prototype,ReactCompositeComponent.Mixin,{
_instantiateReactComponent:instantiateReactComponent});


function getDeclarationErrorAddendum(owner){
if(owner){
var name=owner.getName();
if(name){
return ' Check the render method of `'+name+'`.';}}


return '';}









function isInternalComponentType(type){
return typeof type==='function'&&typeof type.prototype!=='undefined'&&typeof type.prototype.mountComponent==='function'&&typeof type.prototype.receiveComponent==='function';}









function instantiateReactComponent(node){
var instance;

if(node===null||node===false){
instance=new ReactEmptyComponent(instantiateReactComponent);}else 
if(typeof node==='object'){
var element=node;
!(element&&(typeof element.type==='function'||typeof element.type==='string'))?process.env.NODE_ENV!=='production'?invariant(false,'Element type is invalid: expected a string (for built-in components) '+'or a class/function (for composite components) but got: %s.%s',element.type==null?element.type:typeof element.type,getDeclarationErrorAddendum(element._owner)):invariant(false):undefined;


if(typeof element.type==='string'){
instance=ReactNativeComponent.createInternalComponent(element);}else 
if(isInternalComponentType(element.type)){



instance=new element.type(element);}else 
{
instance=new ReactCompositeComponentWrapper();}}else 

if(typeof node==='string'||typeof node==='number'){
instance=ReactNativeComponent.createInstanceForText(node);}else 
{
!false?process.env.NODE_ENV!=='production'?invariant(false,'Encountered invalid React node of type %s',typeof node):invariant(false):undefined;}


if(process.env.NODE_ENV!=='production'){
process.env.NODE_ENV!=='production'?warning(typeof instance.construct==='function'&&typeof instance.mountComponent==='function'&&typeof instance.receiveComponent==='function'&&typeof instance.unmountComponent==='function','Only React Components can be mounted.'):undefined;}



instance.construct(node);




instance._mountIndex=0;
instance._mountImage=null;

if(process.env.NODE_ENV!=='production'){
instance._isOwnerNecessary=false;
instance._warnedAboutRefsInRender=false;}




if(process.env.NODE_ENV!=='production'){
if(Object.preventExtensions){
Object.preventExtensions(instance);}}



return instance;}


module.exports=instantiateReactComponent;
});
__d(80 /* ReactCompositeComponent */, function(global, require, module, exports) {'use strict';












var ReactComponentEnvironment=require(81 /* ./ReactComponentEnvironment */);
var ReactCurrentOwner=require(38 /* ./ReactCurrentOwner */);
var ReactElement=require(42 /* ./ReactElement */);
var ReactInstanceMap=require(39 /* ./ReactInstanceMap */);
var ReactPerf=require(15 /* ./ReactPerf */);
var ReactPropTypeLocations=require(82 /* ./ReactPropTypeLocations */);
var ReactPropTypeLocationNames=require(45 /* ./ReactPropTypeLocationNames */);
var ReactReconciler=require(71 /* ./ReactReconciler */);
var ReactUpdateQueue=require(74 /* ./ReactUpdateQueue */);

var assign=require(43 /* ./Object.assign */);
var emptyObject=require(387 /* fbjs/lib/emptyObject */);
var invariant=require(384 /* fbjs/lib/invariant */);
var shouldUpdateReactComponent=require(83 /* ./shouldUpdateReactComponent */);
var warning=require(386 /* fbjs/lib/warning */);

function getDeclarationErrorAddendum(component){
var owner=component._currentElement._owner||null;
if(owner){
var name=owner.getName();
if(name){
return ' Check the render method of `'+name+'`.';}}


return '';}


function StatelessComponent(Component){}
StatelessComponent.prototype.render=function(){
var Component=ReactInstanceMap.get(this)._currentElement.type;
return Component(this.props,this.context,this.updater);};



































var nextMountID=1;




var ReactCompositeComponentMixin={








construct:function(element){
this._currentElement=element;
this._rootNodeID=null;
this._instance=null;


this._pendingElement=null;
this._pendingStateQueue=null;
this._pendingReplaceState=false;
this._pendingForceUpdate=false;

this._renderedComponent=null;

this._context=null;
this._mountOrder=0;
this._topLevelWrapper=null;


this._pendingCallbacks=null;},











mountComponent:function(rootID,transaction,context){
this._context=context;
this._mountOrder=nextMountID++;
this._rootNodeID=rootID;

var publicProps=this._processProps(this._currentElement.props);
var publicContext=this._processContext(context);

var Component=this._currentElement.type;


var inst;
var renderedElement;





var canInstantiate='prototype' in Component;

if(canInstantiate){
if(process.env.NODE_ENV!=='production'){
ReactCurrentOwner.current=this;
try{
inst=new Component(publicProps,publicContext,ReactUpdateQueue);}finally 
{
ReactCurrentOwner.current=null;}}else 

{
inst=new Component(publicProps,publicContext,ReactUpdateQueue);}}



if(!canInstantiate||inst===null||inst===false||ReactElement.isValidElement(inst)){
renderedElement=inst;
inst=new StatelessComponent(Component);}


if(process.env.NODE_ENV!=='production'){


if(inst.render==null){
process.env.NODE_ENV!=='production'?warning(false,'%s(...): No `render` method found on the returned component '+'instance: you may have forgotten to define `render`, returned '+'null/false from a stateless component, or tried to render an '+'element whose type is a function that isn\'t a React component.',Component.displayName||Component.name||'Component'):undefined;}else 
{


process.env.NODE_ENV!=='production'?warning(Component.prototype&&Component.prototype.isReactComponent||!canInstantiate||!(inst instanceof Component),'%s(...): React component classes must extend React.Component.',Component.displayName||Component.name||'Component'):undefined;}}





inst.props=publicProps;
inst.context=publicContext;
inst.refs=emptyObject;
inst.updater=ReactUpdateQueue;

this._instance=inst;


ReactInstanceMap.set(inst,this);

if(process.env.NODE_ENV!=='production'){



process.env.NODE_ENV!=='production'?warning(!inst.getInitialState||inst.getInitialState.isReactClassApproved,'getInitialState was defined on %s, a plain JavaScript class. '+'This is only supported for classes created using React.createClass. '+'Did you mean to define a state property instead?',this.getName()||'a component'):undefined;
process.env.NODE_ENV!=='production'?warning(!inst.getDefaultProps||inst.getDefaultProps.isReactClassApproved,'getDefaultProps was defined on %s, a plain JavaScript class. '+'This is only supported for classes created using React.createClass. '+'Use a static property to define defaultProps instead.',this.getName()||'a component'):undefined;
process.env.NODE_ENV!=='production'?warning(!inst.propTypes,'propTypes was defined as an instance property on %s. Use a static '+'property to define propTypes instead.',this.getName()||'a component'):undefined;
process.env.NODE_ENV!=='production'?warning(!inst.contextTypes,'contextTypes was defined as an instance property on %s. Use a '+'static property to define contextTypes instead.',this.getName()||'a component'):undefined;
process.env.NODE_ENV!=='production'?warning(typeof inst.componentShouldUpdate!=='function','%s has a method called '+'componentShouldUpdate(). Did you mean shouldComponentUpdate()? '+'The name is phrased as a question because the function is '+'expected to return a value.',this.getName()||'A component'):undefined;
process.env.NODE_ENV!=='production'?warning(typeof inst.componentDidUnmount!=='function','%s has a method called '+'componentDidUnmount(). But there is no such lifecycle method. '+'Did you mean componentWillUnmount()?',this.getName()||'A component'):undefined;
process.env.NODE_ENV!=='production'?warning(typeof inst.componentWillRecieveProps!=='function','%s has a method called '+'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?',this.getName()||'A component'):undefined;}


var initialState=inst.state;
if(initialState===undefined){
inst.state=initialState=null;}

!(typeof initialState==='object'&&!Array.isArray(initialState))?process.env.NODE_ENV!=='production'?invariant(false,'%s.state: must be set to an object or null',this.getName()||'ReactCompositeComponent'):invariant(false):undefined;

this._pendingStateQueue=null;
this._pendingReplaceState=false;
this._pendingForceUpdate=false;

if(inst.componentWillMount){
inst.componentWillMount();


if(this._pendingStateQueue){
inst.state=this._processPendingState(inst.props,inst.context);}}




if(renderedElement===undefined){
renderedElement=this._renderValidatedComponent();}


this._renderedComponent=this._instantiateReactComponent(renderedElement);

var markup=ReactReconciler.mountComponent(this._renderedComponent,rootID,transaction,this._processChildContext(context));
if(inst.componentDidMount){
transaction.getReactMountReady().enqueue(inst.componentDidMount,inst);}


return markup;},








unmountComponent:function(){
var inst=this._instance;

if(inst.componentWillUnmount){
inst.componentWillUnmount();}


ReactReconciler.unmountComponent(this._renderedComponent);
this._renderedComponent=null;
this._instance=null;




this._pendingStateQueue=null;
this._pendingReplaceState=false;
this._pendingForceUpdate=false;
this._pendingCallbacks=null;
this._pendingElement=null;



this._context=null;
this._rootNodeID=null;
this._topLevelWrapper=null;




ReactInstanceMap.remove(inst);},
















_maskContext:function(context){
var maskedContext=null;
var Component=this._currentElement.type;
var contextTypes=Component.contextTypes;
if(!contextTypes){
return emptyObject;}

maskedContext={};
for(var contextName in contextTypes){
maskedContext[contextName]=context[contextName];}

return maskedContext;},










_processContext:function(context){
var maskedContext=this._maskContext(context);
if(process.env.NODE_ENV!=='production'){
var Component=this._currentElement.type;
if(Component.contextTypes){
this._checkPropTypes(Component.contextTypes,maskedContext,ReactPropTypeLocations.context);}}


return maskedContext;},







_processChildContext:function(currentContext){
var Component=this._currentElement.type;
var inst=this._instance;
var childContext=inst.getChildContext&&inst.getChildContext();
if(childContext){
!(typeof Component.childContextTypes==='object')?process.env.NODE_ENV!=='production'?invariant(false,'%s.getChildContext(): childContextTypes must be defined in order to '+'use getChildContext().',this.getName()||'ReactCompositeComponent'):invariant(false):undefined;
if(process.env.NODE_ENV!=='production'){
this._checkPropTypes(Component.childContextTypes,childContext,ReactPropTypeLocations.childContext);}

for(var name in childContext){
!(name in Component.childContextTypes)?process.env.NODE_ENV!=='production'?invariant(false,'%s.getChildContext(): key "%s" is not defined in childContextTypes.',this.getName()||'ReactCompositeComponent',name):invariant(false):undefined;}

return assign({},currentContext,childContext);}

return currentContext;},











_processProps:function(newProps){
if(process.env.NODE_ENV!=='production'){
var Component=this._currentElement.type;
if(Component.propTypes){
this._checkPropTypes(Component.propTypes,newProps,ReactPropTypeLocations.prop);}}


return newProps;},










_checkPropTypes:function(propTypes,props,location){


var componentName=this.getName();
for(var propName in propTypes){
if(propTypes.hasOwnProperty(propName)){
var error;
try{


!(typeof propTypes[propName]==='function')?process.env.NODE_ENV!=='production'?invariant(false,'%s: %s type `%s` is invalid; it must be a function, usually '+'from React.PropTypes.',componentName||'React class',ReactPropTypeLocationNames[location],propName):invariant(false):undefined;
error=propTypes[propName](props,propName,componentName,location);}
catch(ex){
error=ex;}

if(error instanceof Error){



var addendum=getDeclarationErrorAddendum(this);

if(location===ReactPropTypeLocations.prop){

process.env.NODE_ENV!=='production'?warning(false,'Failed Composite propType: %s%s',error.message,addendum):undefined;}else 
{
process.env.NODE_ENV!=='production'?warning(false,'Failed Context Types: %s%s',error.message,addendum):undefined;}}}}},






receiveComponent:function(nextElement,transaction,nextContext){
var prevElement=this._currentElement;
var prevContext=this._context;

this._pendingElement=null;

this.updateComponent(transaction,prevElement,nextElement,prevContext,nextContext);},









performUpdateIfNecessary:function(transaction){
if(this._pendingElement!=null){
ReactReconciler.receiveComponent(this,this._pendingElement||this._currentElement,transaction,this._context);}


if(this._pendingStateQueue!==null||this._pendingForceUpdate){
this.updateComponent(transaction,this._currentElement,this._currentElement,this._context,this._context);}},


















updateComponent:function(transaction,prevParentElement,nextParentElement,prevUnmaskedContext,nextUnmaskedContext){
var inst=this._instance;

var nextContext=this._context===nextUnmaskedContext?inst.context:this._processContext(nextUnmaskedContext);
var nextProps;


if(prevParentElement===nextParentElement){


nextProps=nextParentElement.props;}else 
{
nextProps=this._processProps(nextParentElement.props);




if(inst.componentWillReceiveProps){
inst.componentWillReceiveProps(nextProps,nextContext);}}



var nextState=this._processPendingState(nextProps,nextContext);

var shouldUpdate=this._pendingForceUpdate||!inst.shouldComponentUpdate||inst.shouldComponentUpdate(nextProps,nextState,nextContext);

if(process.env.NODE_ENV!=='production'){
process.env.NODE_ENV!=='production'?warning(typeof shouldUpdate!=='undefined','%s.shouldComponentUpdate(): Returned undefined instead of a '+'boolean value. Make sure to return true or false.',this.getName()||'ReactCompositeComponent'):undefined;}


if(shouldUpdate){
this._pendingForceUpdate=false;

this._performComponentUpdate(nextParentElement,nextProps,nextState,nextContext,transaction,nextUnmaskedContext);}else 
{


this._currentElement=nextParentElement;
this._context=nextUnmaskedContext;
inst.props=nextProps;
inst.state=nextState;
inst.context=nextContext;}},



_processPendingState:function(props,context){
var inst=this._instance;
var queue=this._pendingStateQueue;
var replace=this._pendingReplaceState;
this._pendingReplaceState=false;
this._pendingStateQueue=null;

if(!queue){
return inst.state;}


if(replace&&queue.length===1){
return queue[0];}


var nextState=assign({},replace?queue[0]:inst.state);
for(var i=replace?1:0;i<queue.length;i++){
var partial=queue[i];
assign(nextState,typeof partial==='function'?partial.call(inst,nextState,props,context):partial);}


return nextState;},














_performComponentUpdate:function(nextElement,nextProps,nextState,nextContext,transaction,unmaskedContext){
var inst=this._instance;

var hasComponentDidUpdate=Boolean(inst.componentDidUpdate);
var prevProps;
var prevState;
var prevContext;
if(hasComponentDidUpdate){
prevProps=inst.props;
prevState=inst.state;
prevContext=inst.context;}


if(inst.componentWillUpdate){
inst.componentWillUpdate(nextProps,nextState,nextContext);}


this._currentElement=nextElement;
this._context=unmaskedContext;
inst.props=nextProps;
inst.state=nextState;
inst.context=nextContext;

this._updateRenderedComponent(transaction,unmaskedContext);

if(hasComponentDidUpdate){
transaction.getReactMountReady().enqueue(inst.componentDidUpdate.bind(inst,prevProps,prevState,prevContext),inst);}},









_updateRenderedComponent:function(transaction,context){
var prevComponentInstance=this._renderedComponent;
var prevRenderedElement=prevComponentInstance._currentElement;
var nextRenderedElement=this._renderValidatedComponent();
if(shouldUpdateReactComponent(prevRenderedElement,nextRenderedElement)){
ReactReconciler.receiveComponent(prevComponentInstance,nextRenderedElement,transaction,this._processChildContext(context));}else 
{

var thisID=this._rootNodeID;
var prevComponentID=prevComponentInstance._rootNodeID;
ReactReconciler.unmountComponent(prevComponentInstance);

this._renderedComponent=this._instantiateReactComponent(nextRenderedElement);
var nextMarkup=ReactReconciler.mountComponent(this._renderedComponent,thisID,transaction,this._processChildContext(context));
this._replaceNodeWithMarkupByID(prevComponentID,nextMarkup);}},






_replaceNodeWithMarkupByID:function(prevComponentID,nextMarkup){
ReactComponentEnvironment.replaceNodeWithMarkupByID(prevComponentID,nextMarkup);},





_renderValidatedComponentWithoutOwnerOrContext:function(){
var inst=this._instance;
var renderedComponent=inst.render();
if(process.env.NODE_ENV!=='production'){

if(typeof renderedComponent==='undefined'&&inst.render._isMockFunction){


renderedComponent=null;}}



return renderedComponent;},





_renderValidatedComponent:function(){
var renderedComponent;
ReactCurrentOwner.current=this;
try{
renderedComponent=this._renderValidatedComponentWithoutOwnerOrContext();}finally 
{
ReactCurrentOwner.current=null;}

!(

renderedComponent===null||renderedComponent===false||ReactElement.isValidElement(renderedComponent))?process.env.NODE_ENV!=='production'?invariant(false,'%s.render(): A valid ReactComponent must be returned. You may have '+'returned undefined, an array or some other invalid object.',this.getName()||'ReactCompositeComponent'):invariant(false):undefined;
return renderedComponent;},










attachRef:function(ref,component){
var inst=this.getPublicInstance();
!(inst!=null)?process.env.NODE_ENV!=='production'?invariant(false,'Stateless function components cannot have refs.'):invariant(false):undefined;
var publicComponentInstance=component.getPublicInstance();
if(process.env.NODE_ENV!=='production'){
var componentName=component&&component.getName?component.getName():'a component';
process.env.NODE_ENV!=='production'?warning(publicComponentInstance!=null,'Stateless function components cannot be given refs '+'(See ref "%s" in %s created by %s). '+'Attempts to access this ref will fail.',ref,componentName,this.getName()):undefined;}

var refs=inst.refs===emptyObject?inst.refs={}:inst.refs;
refs[ref]=publicComponentInstance;},









detachRef:function(ref){
var refs=this.getPublicInstance().refs;
delete refs[ref];},








getName:function(){
var type=this._currentElement.type;
var constructor=this._instance&&this._instance.constructor;
return type.displayName||constructor&&constructor.displayName||type.name||constructor&&constructor.name||null;},










getPublicInstance:function(){
var inst=this._instance;
if(inst instanceof StatelessComponent){
return null;}

return inst;},



_instantiateReactComponent:null};



ReactPerf.measureMethods(ReactCompositeComponentMixin,'ReactCompositeComponent',{
mountComponent:'mountComponent',
updateComponent:'updateComponent',
_renderValidatedComponent:'_renderValidatedComponent'});


var ReactCompositeComponent={

Mixin:ReactCompositeComponentMixin};



module.exports=ReactCompositeComponent;
});
__d(81 /* ReactComponentEnvironment */, function(global, require, module, exports) {'use strict';












var invariant=require(384 /* fbjs/lib/invariant */);

var injected=false;

var ReactComponentEnvironment={






unmountIDFromEnvironment:null,





replaceNodeWithMarkupByID:null,





processChildrenUpdates:null,

injection:{
injectEnvironment:function(environment){
!!injected?process.env.NODE_ENV!=='production'?invariant(false,'ReactCompositeComponent: injectEnvironment() can only be called once.'):invariant(false):undefined;
ReactComponentEnvironment.unmountIDFromEnvironment=environment.unmountIDFromEnvironment;
ReactComponentEnvironment.replaceNodeWithMarkupByID=environment.replaceNodeWithMarkupByID;
ReactComponentEnvironment.processChildrenUpdates=environment.processChildrenUpdates;
injected=true;}}};





module.exports=ReactComponentEnvironment;
});
__d(82 /* ReactPropTypeLocations */, function(global, require, module, exports) {'use strict';












var keyMirror=require(388 /* fbjs/lib/keyMirror */);

var ReactPropTypeLocations=keyMirror({
prop:null,
context:null,
childContext:null});


module.exports=ReactPropTypeLocations;
});
__d(388 /* fbjs/lib/keyMirror.js */, function(global, require, module, exports) {'use strict';













var invariant=require(384 /* ./invariant */);



















var keyMirror=function(obj){
var ret={};
var key;
!(obj instanceof Object&&!Array.isArray(obj))?process.env.NODE_ENV!=='production'?invariant(false,'keyMirror(...): Argument must be an object.'):invariant(false):undefined;
for(key in obj){
if(!obj.hasOwnProperty(key)){
continue;}

ret[key]=key;}

return ret;};


module.exports=keyMirror;
});
__d(387 /* fbjs/lib/emptyObject.js */, function(global, require, module, exports) {'use strict';












var emptyObject={};

if(process.env.NODE_ENV!=='production'){
Object.freeze(emptyObject);}


module.exports=emptyObject;
});
__d(83 /* shouldUpdateReactComponent */, function(global, require, module, exports) {'use strict';
























function shouldUpdateReactComponent(prevElement,nextElement){
var prevEmpty=prevElement===null||prevElement===false;
var nextEmpty=nextElement===null||nextElement===false;
if(prevEmpty||nextEmpty){
return prevEmpty===nextEmpty;}


var prevType=typeof prevElement;
var nextType=typeof nextElement;
if(prevType==='string'||prevType==='number'){
return nextType==='string'||nextType==='number';}else 
{
return nextType==='object'&&prevElement.type===nextElement.type&&prevElement.key===nextElement.key;}

return false;}


module.exports=shouldUpdateReactComponent;
});
__d(84 /* ReactEmptyComponent */, function(global, require, module, exports) {'use strict';












var ReactElement=require(42 /* ./ReactElement */);
var ReactEmptyComponentRegistry=require(85 /* ./ReactEmptyComponentRegistry */);
var ReactReconciler=require(71 /* ./ReactReconciler */);

var assign=require(43 /* ./Object.assign */);

var placeholderElement;

var ReactEmptyComponentInjection={
injectEmptyComponent:function(component){
placeholderElement=ReactElement.createElement(component);}};



function registerNullComponentID(){
ReactEmptyComponentRegistry.registerNullComponentID(this._rootNodeID);}


var ReactEmptyComponent=function(instantiate){
this._currentElement=null;
this._rootNodeID=null;
this._renderedComponent=instantiate(placeholderElement);};

assign(ReactEmptyComponent.prototype,{
construct:function(element){},
mountComponent:function(rootID,transaction,context){
transaction.getReactMountReady().enqueue(registerNullComponentID,this);
this._rootNodeID=rootID;
return ReactReconciler.mountComponent(this._renderedComponent,rootID,transaction,context);},

receiveComponent:function(){},
unmountComponent:function(rootID,transaction,context){
ReactReconciler.unmountComponent(this._renderedComponent);
ReactEmptyComponentRegistry.deregisterNullComponentID(this._rootNodeID);
this._rootNodeID=null;
this._renderedComponent=null;}});



ReactEmptyComponent.injection=ReactEmptyComponentInjection;

module.exports=ReactEmptyComponent;
});
__d(85 /* ReactEmptyComponentRegistry */, function(global, require, module, exports) {'use strict';














var nullComponentIDsRegistry={};





function isNullComponentID(id){
return !!nullComponentIDsRegistry[id];}






function registerNullComponentID(id){
nullComponentIDsRegistry[id]=true;}






function deregisterNullComponentID(id){
delete nullComponentIDsRegistry[id];}


var ReactEmptyComponentRegistry={
isNullComponentID:isNullComponentID,
registerNullComponentID:registerNullComponentID,
deregisterNullComponentID:deregisterNullComponentID};


module.exports=ReactEmptyComponentRegistry;
});
__d(86 /* ReactNativeComponent */, function(global, require, module, exports) {'use strict';












var assign=require(43 /* ./Object.assign */);
var invariant=require(384 /* fbjs/lib/invariant */);

var autoGenerateWrapperClass=null;
var genericComponentClass=null;

var tagToComponentClass={};
var textComponentClass=null;

var ReactNativeComponentInjection={


injectGenericComponentClass:function(componentClass){
genericComponentClass=componentClass;},



injectTextComponentClass:function(componentClass){
textComponentClass=componentClass;},



injectComponentClasses:function(componentClasses){
assign(tagToComponentClass,componentClasses);}};









function getComponentClassForElement(element){
if(typeof element.type==='function'){
return element.type;}

var tag=element.type;
var componentClass=tagToComponentClass[tag];
if(componentClass==null){
tagToComponentClass[tag]=componentClass=autoGenerateWrapperClass(tag);}

return componentClass;}








function createInternalComponent(element){
!genericComponentClass?process.env.NODE_ENV!=='production'?invariant(false,'There is no registered component for the tag %s',element.type):invariant(false):undefined;
return new genericComponentClass(element.type,element.props);}






function createInstanceForText(text){
return new textComponentClass(text);}






function isTextComponent(component){
return component instanceof textComponentClass;}


var ReactNativeComponent={
getComponentClassForElement:getComponentClassForElement,
createInternalComponent:createInternalComponent,
createInstanceForText:createInstanceForText,
isTextComponent:isTextComponent,
injection:ReactNativeComponentInjection};


module.exports=ReactNativeComponent;
});
__d(87 /* ReactNativeTextComponent */, function(global, require, module, exports) {'use strict';












var ReactNativeTagHandles=require(40 /* ReactNativeTagHandles */);
var UIManager=require(10 /* UIManager */);

var assign=require(43 /* Object.assign */);
var invariant=require(363 /* fbjs/lib/invariant */);

var ReactNativeTextComponent=function(props){};



assign(ReactNativeTextComponent.prototype,{

construct:function(text){

this._currentElement=text;
this._stringText=''+text;
this._rootNodeID=null;},


mountComponent:function(rootID,transaction,context){
invariant(
context.isInAParentText,
'RawText "'+this._stringText+'" must be wrapped in an explicit '+
'<Text> component.');

this._rootNodeID=rootID;
var tag=ReactNativeTagHandles.allocateTag();
var nativeTopRootID=ReactNativeTagHandles.getNativeTopRootIDFromNodeID(rootID);
UIManager.createView(
tag,
'RCTRawText',
nativeTopRootID?ReactNativeTagHandles.rootNodeIDToTag[nativeTopRootID]:null,
{text:this._stringText});

return {
rootNodeID:rootID,
tag:tag};},



receiveComponent:function(nextText,transaction,context){
if(nextText!==this._currentElement){
this._currentElement=nextText;
var nextStringText=''+nextText;
if(nextStringText!==this._stringText){
this._stringText=nextStringText;
UIManager.updateView(
ReactNativeTagHandles.mostRecentMountedNodeHandleForRootNodeID(
this._rootNodeID),

'RCTRawText',
{text:this._stringText});}}},





unmountComponent:function(){
this._currentElement=null;
this._stringText=null;
this._rootNodeID=null;}});




module.exports=ReactNativeTextComponent;
});
__d(88 /* RCTDebugComponentOwnership */, function(global, require, module, exports) {'use strict';
















var BatchedBridge=require(12 /* BatchedBridge */);
var DebugComponentOwnershipModule=require(11 /* NativeModules */).DebugComponentOwnershipModule;
var InspectorUtils=require(89 /* InspectorUtils */);
var ReactNativeTagHandles=require(40 /* ReactNativeTagHandles */);

function componentToString(component){
return component.getName?component.getName():'Unknown';}


function getRootTagForTag(tag){
var rootNodeID=ReactNativeTagHandles.tagToRootNodeID[tag];
if(!rootNodeID){
return null;}

var rootID=ReactNativeTagHandles.getNativeTopRootIDFromNodeID(rootNodeID);
if(!rootID){
return null;}

return ReactNativeTagHandles.rootNodeIDToTag[rootID];}


var RCTDebugComponentOwnership={








getOwnerHierarchy:function(requestID,tag){
var rootTag=getRootTagForTag(tag);
var instance=InspectorUtils.findInstanceByNativeTag(rootTag,tag);
var ownerHierarchy=instance?
InspectorUtils.getOwnerHierarchy(instance).map(componentToString):
null;
DebugComponentOwnershipModule.receiveOwnershipHierarchy(requestID,tag,ownerHierarchy);}};



BatchedBridge.registerCallableModule(
'RCTDebugComponentOwnership',
RCTDebugComponentOwnership);


module.exports=RCTDebugComponentOwnership;
});
__d(89 /* InspectorUtils */, function(global, require, module, exports) {'use strict';











var ReactInstanceHandles=require(68 /* ReactInstanceHandles */);
var ReactInstanceMap=require(39 /* ReactInstanceMap */);
var ReactNativeMount=require(70 /* ReactNativeMount */);
var ReactNativeTagHandles=require(40 /* ReactNativeTagHandles */);

function traverseOwnerTreeUp(hierarchy,instance){
if(instance){
hierarchy.unshift(instance);
traverseOwnerTreeUp(hierarchy,instance._currentElement._owner);}}



function findInstance(component,targetID){
if(targetID===findRootNodeID(component)){
return component;}

if(component._renderedComponent){
return findInstance(component._renderedComponent,targetID);}else 
{
for(var key in component._renderedChildren){
var child=component._renderedChildren[key];
if(ReactInstanceHandles.isAncestorIDOf(findRootNodeID(child),targetID)){
var instance=findInstance(child,targetID);
if(instance){
return instance;}}}}}






function findRootNodeID(component){
var internalInstance=ReactInstanceMap.get(component);
return internalInstance?internalInstance._rootNodeID:component._rootNodeID;}


function findInstanceByNativeTag(rootTag,nativeTag){
var containerID=ReactNativeTagHandles.tagToRootNodeID[rootTag];
var rootInstance=ReactNativeMount._instancesByContainerID[containerID];
var targetID=ReactNativeTagHandles.tagToRootNodeID[nativeTag];
if(!targetID){
return undefined;}

return findInstance(rootInstance,targetID);}


function getOwnerHierarchy(instance){
var hierarchy=[];
traverseOwnerTreeUp(hierarchy,instance);
return hierarchy;}


module.exports={findInstanceByNativeTag:findInstanceByNativeTag,getOwnerHierarchy:getOwnerHierarchy};
});
__d(90 /* RCTNativeAppEventEmitter */, function(global, require, module, exports) {'use strict';












var BatchedBridge=require(12 /* BatchedBridge */);
var EventEmitter=require(23 /* EventEmitter */);

var RCTNativeAppEventEmitter=new EventEmitter();

BatchedBridge.registerCallableModule(
'RCTNativeAppEventEmitter',
RCTNativeAppEventEmitter);


module.exports=RCTNativeAppEventEmitter;
});
__d(91 /* PerformanceLogger */, function(global, require, module, exports) {'use strict';











var BatchedBridge=require(12 /* BatchedBridge */);

var performanceNow=require(361 /* fbjs/lib/performanceNow */);

var timespans={};
var extras={};





var PerformanceLogger={
addTimespan:function(key,lengthInMs,description){
if(timespans[key]){
if(__DEV__){
console.log(
'PerformanceLogger: Attempting to add a timespan that already exists ',
key);}


return;}


timespans[key]={
description:description,
totalTime:lengthInMs};},



startTimespan:function(key,description){
if(timespans[key]){
if(__DEV__){
console.log(
'PerformanceLogger: Attempting to start a timespan that already exists ',
key);}


return;}


timespans[key]={
description:description,
startTime:performanceNow()};},



stopTimespan:function(key){
if(!timespans[key]||!timespans[key].startTime){
if(__DEV__){
console.log(
'PerformanceLogger: Attempting to end a timespan that has not started ',
key);}


return;}

if(timespans[key].endTime){
if(__DEV__){
console.log(
'PerformanceLogger: Attempting to end a timespan that has already ended ',
key);}


return;}


timespans[key].endTime=performanceNow();
timespans[key].totalTime=
timespans[key].endTime-timespans[key].startTime;},


clear:function(){
timespans={};
extras={};},


clearExceptTimespans:function(keys){
timespans=Object.keys(timespans).reduce(function(previous,key){
if(keys.indexOf(key)!==-1){
previous[key]=timespans[key];}

return previous;},
{});
extras={};},


getTimespans:function(){
return timespans;},


hasTimespan:function(key){
return !!timespans[key];},


logTimespans:function(){
for(var key in timespans){
if(timespans[key].totalTime){
console.log(key+': '+timespans[key].totalTime+'ms');}}},




addTimespans:function(newTimespans,labels){
for(var i=0,l=newTimespans.length;i<l;i+=2){
var label=labels[i/2];
PerformanceLogger.addTimespan(
label,
newTimespans[i+1]-newTimespans[i],
label);}},




setExtra:function(key,value){
if(extras[key]){
if(__DEV__){
console.log(
'PerformanceLogger: Attempting to set an extra that already exists ',
key);}


return;}

extras[key]=value;},


getExtras:function(){
return extras;}};



BatchedBridge.registerCallableModule(
'PerformanceLogger',
PerformanceLogger);


module.exports=PerformanceLogger;
});
__d(391 /* react-transform-hmr/lib/index.js */, function(global, require, module, exports) {'use strict';

Object.defineProperty(exports,'__esModule',{
value:true});


var _slicedToArray=function(){function sliceIterator(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[typeof Symbol==='function'?Symbol.iterator:'@@iterator'](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break;}}catch(err){_d=true;_e=err;}finally {try{if(!_n&&_i['return'])_i['return']();}finally {if(_d)throw _e;}}return _arr;}return function(arr,i){if(Array.isArray(arr)){return arr;}else if((typeof Symbol==='function'?Symbol.iterator:'@@iterator') in Object(arr)){return sliceIterator(arr,i);}else {throw new TypeError('Invalid attempt to destructure non-iterable instance');}};}();

exports['default']=proxyReactComponents;

function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}

var _reactProxy=require(389 /* react-proxy */);

var _globalWindow=require(519 /* global/window */);

var _globalWindow2=_interopRequireDefault(_globalWindow);

var componentProxies=undefined;
if(_globalWindow2['default'].__reactComponentProxies){
componentProxies=_globalWindow2['default'].__reactComponentProxies;}else 
{
componentProxies={};
Object.defineProperty(_globalWindow2['default'],'__reactComponentProxies',{
configurable:true,
enumerable:false,
writable:false,
value:componentProxies});}



function proxyReactComponents(_ref){
var filename=_ref.filename;
var components=_ref.components;
var imports=_ref.imports;
var locals=_ref.locals;

var _imports=_slicedToArray(imports,1);

var React=_imports[0];

var _locals=_slicedToArray(locals,1);

var hot=_locals[0].hot;

if(!React.Component){
throw new Error('imports[0] for react-transform-hmr does not look like React.');}


if(!hot||typeof hot.accept!=='function'){
throw new Error('locals[0] does not appear to be a `module` object with Hot Module '+'replacement API enabled. You should disable react-transform-hmr in '+'production by using `env` section in Babel configuration. See the '+'example in README: https://github.com/gaearon/react-transform-hmr');}


if(Object.keys(components).some(function(key){
return !components[key].isInFunction;}))
{
hot.accept(function(err){
if(err){
console.warn('[React Transform HMR] There was an error updating '+filename+':');
console.error(err);}});}




var forceUpdate=(0,_reactProxy.getForceUpdate)(React);

return function wrapWithProxy(ReactClass,uniqueId){
var _components$uniqueId=components[uniqueId];
var _components$uniqueId$isInFunction=_components$uniqueId.isInFunction;
var isInFunction=_components$uniqueId$isInFunction===undefined?false:_components$uniqueId$isInFunction;
var _components$uniqueId$displayName=_components$uniqueId.displayName;
var displayName=_components$uniqueId$displayName===undefined?uniqueId:_components$uniqueId$displayName;

if(isInFunction){
return ReactClass;}


var globalUniqueId=filename+'$'+uniqueId;
if(componentProxies[globalUniqueId]){
(function(){
console.info('[React Transform HMR] Patching '+displayName);
var instances=componentProxies[globalUniqueId].update(ReactClass);
setTimeout(function(){
return instances.forEach(forceUpdate);});})();}else 


{
componentProxies[globalUniqueId]=(0,_reactProxy.createProxy)(ReactClass);}


return componentProxies[globalUniqueId].get();};}



module.exports=exports['default'];
});
__d(389 /* react-proxy/modules/index.js */, function(global, require, module, exports) {'use strict';

Object.defineProperty(exports,"__esModule",{
value:true});

exports.getForceUpdate=exports.createProxy=undefined;

var _supportsProtoAssignment=require(390 /* ./supportsProtoAssignment */);

var _supportsProtoAssignment2=_interopRequireDefault(_supportsProtoAssignment);

var _createClassProxy=require(399 /* ./createClassProxy */);

var _createClassProxy2=_interopRequireDefault(_createClassProxy);

var _reactDeepForceUpdate=require(516 /* react-deep-force-update */);

var _reactDeepForceUpdate2=_interopRequireDefault(_reactDeepForceUpdate);

function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

if(!(0,_supportsProtoAssignment2.default)()){
console.warn('This JavaScript environment does not support __proto__. '+'This means that react-proxy is unable to proxy React components. '+'Features that rely on react-proxy, such as react-transform-hmr, '+'will not function as expected.');}


exports.createProxy=_createClassProxy2.default;
exports.getForceUpdate=_reactDeepForceUpdate2.default;
});
__d(390 /* react-proxy/modules/supportsProtoAssignment.js */, function(global, require, module, exports) {"use strict";

Object.defineProperty(exports,"__esModule",{
value:true});

exports.default=supportsProtoAssignment;
var x={};
var y={supports:true};
try{
x.__proto__=y;}
catch(err){}

function supportsProtoAssignment(){
return x.supports||false;}
;
});
__d(399 /* react-proxy/modules/createClassProxy.js */, function(global, require, module, exports) {'use strict';

Object.defineProperty(exports,"__esModule",{
value:true});


var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};

var _slicedToArray=function(){function sliceIterator(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[typeof Symbol==="function"?Symbol.iterator:"@@iterator"](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break;}}catch(err){_d=true;_e=err;}finally {try{if(!_n&&_i["return"])_i["return"]();}finally {if(_d)throw _e;}}return _arr;}return function(arr,i){if(Array.isArray(arr)){return arr;}else if((typeof Symbol==="function"?Symbol.iterator:"@@iterator") in Object(arr)){return sliceIterator(arr,i);}else {throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}();

exports.default=proxyClass;
exports.default=createClassProxy;

var _find=require(392 /* lodash/find */);

var _find2=_interopRequireDefault(_find);

var _createPrototypeProxy=require(501 /* ./createPrototypeProxy */);

var _createPrototypeProxy2=_interopRequireDefault(_createPrototypeProxy);

var _bindAutoBindMethods=require(517 /* ./bindAutoBindMethods */);

var _bindAutoBindMethods2=_interopRequireDefault(_bindAutoBindMethods);

var _deleteUnknownAutoBindMethods=require(518 /* ./deleteUnknownAutoBindMethods */);

var _deleteUnknownAutoBindMethods2=_interopRequireDefault(_deleteUnknownAutoBindMethods);

var _supportsProtoAssignment=require(390 /* ./supportsProtoAssignment */);

var _supportsProtoAssignment2=_interopRequireDefault(_supportsProtoAssignment);

function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else {return Array.from(arr);}}

var RESERVED_STATICS=['length','name','arguments','caller','prototype','toString'];

function isEqualDescriptor(a,b){
if(!a&&!b){
return true;}

if(!a||!b){
return false;}

for(var key in a){
if(a[key]!==b[key]){
return false;}}


return true;}




var allProxies=[];
function findProxy(Component){
var pair=(0,_find2.default)(allProxies,function(_ref){
var _ref2=_slicedToArray(_ref,1);

var key=_ref2[0];
return key===Component;});

return pair?pair[1]:null;}

function addProxy(Component,proxy){
allProxies.push([Component,proxy]);}


function proxyClass(InitialComponent){


var existingProxy=findProxy(InitialComponent);
if(existingProxy){
return existingProxy;}


var prototypeProxy=(0,_createPrototypeProxy2.default)();
var CurrentComponent=undefined;
var ProxyComponent=undefined;

var staticDescriptors={};
function wasStaticModifiedByUser(key){

var currentDescriptor=Object.getOwnPropertyDescriptor(ProxyComponent,key);
return !isEqualDescriptor(staticDescriptors[key],currentDescriptor);}


function instantiate(factory,context,params){
var component=factory();

try{
return component.apply(context,params);}
catch(err){
(function(){

var instance=new (Function.prototype.bind.apply(component,[null].concat(_toConsumableArray(params))))();

Object.keys(instance).forEach(function(key){
if(RESERVED_STATICS.indexOf(key)>-1){
return;}

context[key]=instance[key];});})();}}





try{

ProxyComponent=new Function('factory','instantiate','return function '+(InitialComponent.name||'ProxyComponent')+'() {\n         return instantiate(factory, this, arguments);\n      }')(function(){
return CurrentComponent;},
instantiate);}
catch(err){

ProxyComponent=function ProxyComponent(){
return instantiate(function(){
return CurrentComponent;},
this,arguments);};}




ProxyComponent.prototype=prototypeProxy.get();


ProxyComponent.toString=function toString(){
return CurrentComponent.toString();};


function update(NextComponent){
if(typeof NextComponent!=='function'){
throw new Error('Expected a constructor.');}



var existingProxy=findProxy(NextComponent);
if(existingProxy){
return update(existingProxy.__getCurrent());}



CurrentComponent=NextComponent;


var mountedInstances=prototypeProxy.update(NextComponent.prototype);


ProxyComponent.prototype.constructor=ProxyComponent;


ProxyComponent.__proto__=NextComponent.__proto__;


Object.getOwnPropertyNames(NextComponent).forEach(function(key){
if(RESERVED_STATICS.indexOf(key)>-1){
return;}


var staticDescriptor=_extends({},Object.getOwnPropertyDescriptor(NextComponent,key),{
configurable:true});



if(!wasStaticModifiedByUser(key)){
Object.defineProperty(ProxyComponent,key,staticDescriptor);
staticDescriptors[key]=staticDescriptor;}});




Object.getOwnPropertyNames(ProxyComponent).forEach(function(key){
if(RESERVED_STATICS.indexOf(key)>-1){
return;}



if(NextComponent.hasOwnProperty(key)){
return;}



var descriptor=Object.getOwnPropertyDescriptor(ProxyComponent,key);
if(descriptor&&!descriptor.configurable){
return;}



if(!wasStaticModifiedByUser(key)){
delete ProxyComponent[key];
delete staticDescriptors[key];}});




ProxyComponent.displayName=NextComponent.displayName||NextComponent.name;


mountedInstances.forEach(_bindAutoBindMethods2.default);
mountedInstances.forEach(_deleteUnknownAutoBindMethods2.default);


return mountedInstances;}
;

function get(){
return ProxyComponent;}


function getCurrent(){
return CurrentComponent;}


update(InitialComponent);

var proxy={get:get,update:update};
addProxy(ProxyComponent,proxy);

Object.defineProperty(proxy,'__getCurrent',{
configurable:false,
writable:false,
enumerable:false,
value:getCurrent});


return proxy;}


function createFallback(Component){
var CurrentComponent=Component;

return {
get:function get(){
return CurrentComponent;},

update:function update(NextComponent){
CurrentComponent=NextComponent;}};}




function createClassProxy(Component){
return Component.__proto__&&(0,_supportsProtoAssignment2.default)()?proxyClass(Component):createFallback(Component);}
});
__d(392 /* lodash/find.js */, function(global, require, module, exports) {var baseEach=require(393 /* ./_baseEach */),
baseFind=require(420 /* ./_baseFind */),
baseFindIndex=require(421 /* ./_baseFindIndex */),
baseIteratee=require(419 /* ./_baseIteratee */),
isArray=require(413 /* ./isArray */);





































function find(collection,predicate){
predicate=baseIteratee(predicate,3);
if(isArray(collection)){
var index=baseFindIndex(collection,predicate);
return index>-1?collection[index]:undefined;}

return baseFind(collection,predicate,baseEach);}


module.exports=find;
});
__d(393 /* lodash/_baseEach.js */, function(global, require, module, exports) {var baseForOwn=require(394 /* ./_baseForOwn */),
createBaseEach=require(418 /* ./_createBaseEach */);









var baseEach=createBaseEach(baseForOwn);

module.exports=baseEach;
});
__d(394 /* lodash/_baseForOwn.js */, function(global, require, module, exports) {var baseFor=require(395 /* ./_baseFor */),
keys=require(397 /* ./keys */);









function baseForOwn(object,iteratee){
return object&&baseFor(object,iteratee,keys);}


module.exports=baseForOwn;
});
__d(395 /* lodash/_baseFor.js */, function(global, require, module, exports) {var createBaseFor=require(396 /* ./_createBaseFor */);












var baseFor=createBaseFor();

module.exports=baseFor;
});
__d(396 /* lodash/_createBaseFor.js */, function(global, require, module, exports) {function 






createBaseFor(fromRight){
return function(object,iteratee,keysFunc){
var index=-1,
iterable=Object(object),
props=keysFunc(object),
length=props.length;

while(length--){
var key=props[fromRight?length:++index];
if(iteratee(iterable[key],key,iterable)===false){
break;}}


return object;};}



module.exports=createBaseFor;
});
__d(397 /* lodash/keys.js */, function(global, require, module, exports) {var baseHas=require(398 /* ./_baseHas */),
baseKeys=require(401 /* ./_baseKeys */),
indexKeys=require(403 /* ./_indexKeys */),
isArrayLike=require(407 /* ./isArrayLike */),
isIndex=require(415 /* ./_isIndex */),
isPrototype=require(416 /* ./_isPrototype */);





























function keys(object){
var isProto=isPrototype(object);
if(!(isProto||isArrayLike(object))){
return baseKeys(object);}

var indexes=indexKeys(object),
skipIndexes=!!indexes,
result=indexes||[],
length=result.length;

for(var key in object){
if(baseHas(object,key)&&
!(skipIndexes&&(key=='length'||isIndex(key,length)))&&
!(isProto&&key=='constructor')){
result.push(key);}}


return result;}


module.exports=keys;
});
__d(398 /* lodash/_baseHas.js */, function(global, require, module, exports) {var getPrototype=require(400 /* ./_getPrototype */);


var objectProto=Object.prototype;


var hasOwnProperty=objectProto.hasOwnProperty;









function baseHas(object,key){



return hasOwnProperty.call(object,key)||
typeof object=='object'&&key in object&&getPrototype(object)===null;}


module.exports=baseHas;
});
__d(400 /* lodash/_getPrototype.js */, function(global, require, module, exports) {var 
nativeGetPrototype=Object.getPrototypeOf;








function getPrototype(value){
return nativeGetPrototype(Object(value));}


module.exports=getPrototype;
});
__d(401 /* lodash/_baseKeys.js */, function(global, require, module, exports) {var 
nativeKeys=Object.keys;









function baseKeys(object){
return nativeKeys(Object(object));}


module.exports=baseKeys;
});
__d(403 /* lodash/_indexKeys.js */, function(global, require, module, exports) {var baseTimes=require(402 /* ./_baseTimes */),
isArguments=require(405 /* ./isArguments */),
isArray=require(413 /* ./isArray */),
isLength=require(411 /* ./isLength */),
isString=require(414 /* ./isString */);









function indexKeys(object){
var length=object?object.length:undefined;
if(isLength(length)&&(
isArray(object)||isString(object)||isArguments(object))){
return baseTimes(length,String);}

return null;}


module.exports=indexKeys;
});
__d(402 /* lodash/_baseTimes.js */, function(global, require, module, exports) {function 








baseTimes(n,iteratee){
var index=-1,
result=Array(n);

while(++index<n){
result[index]=iteratee(index);}

return result;}


module.exports=baseTimes;
});
__d(405 /* lodash/isArguments.js */, function(global, require, module, exports) {var isArrayLikeObject=require(404 /* ./isArrayLikeObject */);


var argsTag='[object Arguments]';


var objectProto=Object.prototype;


var hasOwnProperty=objectProto.hasOwnProperty;






var objectToString=objectProto.toString;


var propertyIsEnumerable=objectProto.propertyIsEnumerable;



















function isArguments(value){

return isArrayLikeObject(value)&&hasOwnProperty.call(value,'callee')&&(
!propertyIsEnumerable.call(value,'callee')||objectToString.call(value)==argsTag);}


module.exports=isArguments;
});
__d(404 /* lodash/isArrayLikeObject.js */, function(global, require, module, exports) {var isArrayLike=require(407 /* ./isArrayLike */),
isObjectLike=require(412 /* ./isObjectLike */);


























function isArrayLikeObject(value){
return isObjectLike(value)&&isArrayLike(value);}


module.exports=isArrayLikeObject;
});
__d(407 /* lodash/isArrayLike.js */, function(global, require, module, exports) {var getLength=require(406 /* ./_getLength */),
isFunction=require(409 /* ./isFunction */),
isLength=require(411 /* ./isLength */);


























function isArrayLike(value){
return value!=null&&isLength(getLength(value))&&!isFunction(value);}


module.exports=isArrayLike;
});
__d(406 /* lodash/_getLength.js */, function(global, require, module, exports) {var baseProperty=require(408 /* ./_baseProperty */);












var getLength=baseProperty('length');

module.exports=getLength;
});
__d(408 /* lodash/_baseProperty.js */, function(global, require, module, exports) {function 






baseProperty(key){
return function(object){
return object==null?undefined:object[key];};}



module.exports=baseProperty;
});
__d(409 /* lodash/isFunction.js */, function(global, require, module, exports) {var isObject=require(410 /* ./isObject */);


var funcTag='[object Function]',
genTag='[object GeneratorFunction]';


var objectProto=Object.prototype;






var objectToString=objectProto.toString;



















function isFunction(value){



var tag=isObject(value)?objectToString.call(value):'';
return tag==funcTag||tag==genTag;}


module.exports=isFunction;
});
__d(410 /* lodash/isObject.js */, function(global, require, module, exports) {function 
























isObject(value){
var type=typeof value;
return !!value&&(type=='object'||type=='function');}


module.exports=isObject;
});
__d(411 /* lodash/isLength.js */, function(global, require, module, exports) {var 
MAX_SAFE_INTEGER=9007199254740991;




























function isLength(value){
return typeof value=='number'&&
value>-1&&value%1==0&&value<=MAX_SAFE_INTEGER;}


module.exports=isLength;
});
__d(412 /* lodash/isObjectLike.js */, function(global, require, module, exports) {function 























isObjectLike(value){
return !!value&&typeof value=='object';}


module.exports=isObjectLike;
});
__d(413 /* lodash/isArray.js */, function(global, require, module, exports) {var 
























isArray=Array.isArray;

module.exports=isArray;
});
__d(414 /* lodash/isString.js */, function(global, require, module, exports) {var isArray=require(413 /* ./isArray */),
isObjectLike=require(412 /* ./isObjectLike */);


var stringTag='[object String]';


var objectProto=Object.prototype;






var objectToString=objectProto.toString;



















function isString(value){
return typeof value=='string'||
!isArray(value)&&isObjectLike(value)&&objectToString.call(value)==stringTag;}


module.exports=isString;
});
__d(415 /* lodash/_isIndex.js */, function(global, require, module, exports) {var 
MAX_SAFE_INTEGER=9007199254740991;


var reIsUint=/^(?:0|[1-9]\d*)$/;









function isIndex(value,length){
value=typeof value=='number'||reIsUint.test(value)?+value:-1;
length=length==null?MAX_SAFE_INTEGER:length;
return value>-1&&value%1==0&&value<length;}


module.exports=isIndex;
});
__d(416 /* lodash/_isPrototype.js */, function(global, require, module, exports) {var 
objectProto=Object.prototype;








function isPrototype(value){
var Ctor=value&&value.constructor,
proto=typeof Ctor=='function'&&Ctor.prototype||objectProto;

return value===proto;}


module.exports=isPrototype;
});
__d(418 /* lodash/_createBaseEach.js */, function(global, require, module, exports) {var isArrayLike=require(407 /* ./isArrayLike */);









function createBaseEach(eachFunc,fromRight){
return function(collection,iteratee){
if(collection==null){
return collection;}

if(!isArrayLike(collection)){
return eachFunc(collection,iteratee);}

var length=collection.length,
index=fromRight?length:-1,
iterable=Object(collection);

while(fromRight?index--:++index<length){
if(iteratee(iterable[index],index,iterable)===false){
break;}}


return collection;};}



module.exports=createBaseEach;
});
__d(420 /* lodash/_baseFind.js */, function(global, require, module, exports) {function 












baseFind(collection,predicate,eachFunc,retKey){
var result;
eachFunc(collection,function(value,key,collection){
if(predicate(value,key,collection)){
result=retKey?key:value;
return false;}});


return result;}


module.exports=baseFind;
});
__d(421 /* lodash/_baseFindIndex.js */, function(global, require, module, exports) {function 









baseFindIndex(array,predicate,fromRight){
var length=array.length,
index=fromRight?length:-1;

while(fromRight?index--:++index<length){
if(predicate(array[index],index,array)){
return index;}}


return -1;}


module.exports=baseFindIndex;
});
__d(419 /* lodash/_baseIteratee.js */, function(global, require, module, exports) {var baseMatches=require(422 /* ./_baseMatches */),
baseMatchesProperty=require(479 /* ./_baseMatchesProperty */),
identity=require(488 /* ./identity */),
isArray=require(413 /* ./isArray */),
property=require(489 /* ./property */);








function baseIteratee(value){


if(typeof value=='function'){
return value;}

if(value==null){
return identity;}

if(typeof value=='object'){
return isArray(value)?
baseMatchesProperty(value[0],value[1]):
baseMatches(value);}

return property(value);}


module.exports=baseIteratee;
});
__d(422 /* lodash/_baseMatches.js */, function(global, require, module, exports) {var baseIsMatch=require(426 /* ./_baseIsMatch */),
getMatchData=require(471 /* ./_getMatchData */),
matchesStrictComparable=require(476 /* ./_matchesStrictComparable */);








function baseMatches(source){
var matchData=getMatchData(source);
if(matchData.length==1&&matchData[0][2]){
return matchesStrictComparable(matchData[0][0],matchData[0][1]);}

return function(object){
return object===source||baseIsMatch(object,source,matchData);};}



module.exports=baseMatches;
});
__d(426 /* lodash/_baseIsMatch.js */, function(global, require, module, exports) {var Stack=require(425 /* ./_Stack */),
baseIsEqual=require(456 /* ./_baseIsEqual */);


var UNORDERED_COMPARE_FLAG=1,
PARTIAL_COMPARE_FLAG=2;











function baseIsMatch(object,source,matchData,customizer){
var index=matchData.length,
length=index,
noCustomizer=!customizer;

if(object==null){
return !length;}

object=Object(object);
while(index--){
var data=matchData[index];
if(noCustomizer&&data[2]?
data[1]!==object[data[0]]:
!(data[0] in object))
{
return false;}}


while(++index<length){
data=matchData[index];
var key=data[0],
objValue=object[key],
srcValue=data[1];

if(noCustomizer&&data[2]){
if(objValue===undefined&&!(key in object)){
return false;}}else 

{
var stack=new Stack();
if(customizer){
var result=customizer(objValue,srcValue,key,object,source,stack);}

if(!(result===undefined?
baseIsEqual(srcValue,objValue,customizer,UNORDERED_COMPARE_FLAG|PARTIAL_COMPARE_FLAG,stack):
result))
{
return false;}}}



return true;}


module.exports=baseIsMatch;
});
__d(425 /* lodash/_Stack.js */, function(global, require, module, exports) {var stackClear=require(423 /* ./_stackClear */),
stackDelete=require(424 /* ./_stackDelete */),
stackGet=require(430 /* ./_stackGet */),
stackHas=require(432 /* ./_stackHas */),
stackSet=require(435 /* ./_stackSet */);








function Stack(values){
var index=-1,
length=values?values.length:0;

this.clear();
while(++index<length){
var entry=values[index];
this.set(entry[0],entry[1]);}}




Stack.prototype.clear=stackClear;
Stack.prototype['delete']=stackDelete;
Stack.prototype.get=stackGet;
Stack.prototype.has=stackHas;
Stack.prototype.set=stackSet;

module.exports=Stack;
});
__d(423 /* lodash/_stackClear.js */, function(global, require, module, exports) {function 






stackClear(){
this.__data__={'array':[],'map':null};}


module.exports=stackClear;
});
__d(424 /* lodash/_stackDelete.js */, function(global, require, module, exports) {var assocDelete=require(427 /* ./_assocDelete */);










function stackDelete(key){
var data=this.__data__,
array=data.array;

return array?assocDelete(array,key):data.map['delete'](key);}


module.exports=stackDelete;
});
__d(427 /* lodash/_assocDelete.js */, function(global, require, module, exports) {var assocIndexOf=require(428 /* ./_assocIndexOf */);


var arrayProto=Array.prototype;


var splice=arrayProto.splice;









function assocDelete(array,key){
var index=assocIndexOf(array,key);
if(index<0){
return false;}

var lastIndex=array.length-1;
if(index==lastIndex){
array.pop();}else 
{
splice.call(array,index,1);}

return true;}


module.exports=assocDelete;
});
__d(428 /* lodash/_assocIndexOf.js */, function(global, require, module, exports) {var eq=require(429 /* ./eq */);









function assocIndexOf(array,key){
var length=array.length;
while(length--){
if(eq(array[length][0],key)){
return length;}}


return -1;}


module.exports=assocIndexOf;
});
__d(429 /* lodash/eq.js */, function(global, require, module, exports) {function 































eq(value,other){
return value===other||value!==value&&other!==other;}


module.exports=eq;
});
__d(430 /* lodash/_stackGet.js */, function(global, require, module, exports) {var assocGet=require(431 /* ./_assocGet */);










function stackGet(key){
var data=this.__data__,
array=data.array;

return array?assocGet(array,key):data.map.get(key);}


module.exports=stackGet;
});
__d(431 /* lodash/_assocGet.js */, function(global, require, module, exports) {var assocIndexOf=require(428 /* ./_assocIndexOf */);









function assocGet(array,key){
var index=assocIndexOf(array,key);
return index<0?undefined:array[index][1];}


module.exports=assocGet;
});
__d(432 /* lodash/_stackHas.js */, function(global, require, module, exports) {var assocHas=require(433 /* ./_assocHas */);










function stackHas(key){
var data=this.__data__,
array=data.array;

return array?assocHas(array,key):data.map.has(key);}


module.exports=stackHas;
});
__d(433 /* lodash/_assocHas.js */, function(global, require, module, exports) {var assocIndexOf=require(428 /* ./_assocIndexOf */);









function assocHas(array,key){
return assocIndexOf(array,key)>-1;}


module.exports=assocHas;
});
__d(435 /* lodash/_stackSet.js */, function(global, require, module, exports) {var MapCache=require(439 /* ./_MapCache */),
assocSet=require(454 /* ./_assocSet */);


var LARGE_ARRAY_SIZE=200;











function stackSet(key,value){
var data=this.__data__,
array=data.array;

if(array){
if(array.length<LARGE_ARRAY_SIZE-1){
assocSet(array,key,value);}else 
{
data.array=null;
data.map=new MapCache(array);}}


var map=data.map;
if(map){
map.set(key,value);}

return this;}


module.exports=stackSet;
});
__d(439 /* lodash/_MapCache.js */, function(global, require, module, exports) {var mapClear=require(434 /* ./_mapClear */),
mapDelete=require(445 /* ./_mapDelete */),
mapGet=require(451 /* ./_mapGet */),
mapHas=require(452 /* ./_mapHas */),
mapSet=require(453 /* ./_mapSet */);








function MapCache(values){
var index=-1,
length=values?values.length:0;

this.clear();
while(++index<length){
var entry=values[index];
this.set(entry[0],entry[1]);}}




MapCache.prototype.clear=mapClear;
MapCache.prototype['delete']=mapDelete;
MapCache.prototype.get=mapGet;
MapCache.prototype.has=mapHas;
MapCache.prototype.set=mapSet;

module.exports=MapCache;
});
__d(434 /* lodash/_mapClear.js */, function(global, require, module, exports) {var Hash=require(437 /* ./_Hash */),
Map=require(441 /* ./_Map */);








function mapClear(){
this.__data__={
'hash':new Hash(),
'map':Map?new Map():[],
'string':new Hash()};}



module.exports=mapClear;
});
__d(437 /* lodash/_Hash.js */, function(global, require, module, exports) {var nativeCreate=require(436 /* ./_nativeCreate */);


var objectProto=Object.prototype;








function Hash(){}


Hash.prototype=nativeCreate?nativeCreate(null):objectProto;

module.exports=Hash;
});
__d(436 /* lodash/_nativeCreate.js */, function(global, require, module, exports) {var getNative=require(438 /* ./_getNative */);


var nativeCreate=getNative(Object,'create');

module.exports=nativeCreate;
});
__d(438 /* lodash/_getNative.js */, function(global, require, module, exports) {var isNative=require(447 /* ./isNative */);









function getNative(object,key){
var value=object[key];
return isNative(value)?value:undefined;}


module.exports=getNative;
});
__d(447 /* lodash/isNative.js */, function(global, require, module, exports) {var isFunction=require(409 /* ./isFunction */),
isHostObject=require(440 /* ./_isHostObject */),
isObject=require(410 /* ./isObject */),
toSource=require(442 /* ./_toSource */);





var reRegExpChar=/[\\^$.*+?()[\]{}|]/g;


var reIsHostCtor=/^\[object .+?Constructor\]$/;


var objectProto=Object.prototype;


var funcToString=Function.prototype.toString;


var hasOwnProperty=objectProto.hasOwnProperty;


var reIsNative=RegExp('^'+
funcToString.call(hasOwnProperty).replace(reRegExpChar,'\\$&').
replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,'$1.*?')+'$');




















function isNative(value){
if(!isObject(value)){
return false;}

var pattern=isFunction(value)||isHostObject(value)?reIsNative:reIsHostCtor;
return pattern.test(toSource(value));}


module.exports=isNative;
});
__d(440 /* lodash/_isHostObject.js */, function(global, require, module, exports) {function 






isHostObject(value){


var result=false;
if(value!=null&&typeof value.toString!='function'){
try{
result=!!(value+'');}
catch(e){}}

return result;}


module.exports=isHostObject;
});
__d(442 /* lodash/_toSource.js */, function(global, require, module, exports) {var 
funcToString=Function.prototype.toString;








function toSource(func){
if(func!=null){
try{
return funcToString.call(func);}
catch(e){}
try{
return func+'';}
catch(e){}}

return '';}


module.exports=toSource;
});
__d(441 /* lodash/_Map.js */, function(global, require, module, exports) {var getNative=require(438 /* ./_getNative */),
root=require(444 /* ./_root */);


var Map=getNative(root,'Map');

module.exports=Map;
});
__d(444 /* lodash/_root.js */, function(global, require, module, exports) {var checkGlobal=require(443 /* ./_checkGlobal */);


var objectTypes={
'function':true,
'object':true};



var freeExports=objectTypes[typeof exports]&&exports&&!exports.nodeType?
exports:
undefined;


var freeModule=objectTypes[typeof module]&&module&&!module.nodeType?
module:
undefined;


var freeGlobal=checkGlobal(freeExports&&freeModule&&typeof global=='object'&&global);


var freeSelf=checkGlobal(objectTypes[typeof self]&&self);


var freeWindow=checkGlobal(objectTypes[typeof window]&&window);


var thisGlobal=checkGlobal(objectTypes[typeof this]&&this);







var root=freeGlobal||
freeWindow!==(thisGlobal&&thisGlobal.window)&&freeWindow||
freeSelf||thisGlobal||Function('return this')();

module.exports=root;
});
__d(443 /* lodash/_checkGlobal.js */, function(global, require, module, exports) {function 






checkGlobal(value){
return value&&value.Object===Object?value:null;}


module.exports=checkGlobal;
});
__d(445 /* lodash/_mapDelete.js */, function(global, require, module, exports) {var Map=require(441 /* ./_Map */),
assocDelete=require(427 /* ./_assocDelete */),
hashDelete=require(446 /* ./_hashDelete */),
isKeyable=require(449 /* ./_isKeyable */);










function mapDelete(key){
var data=this.__data__;
if(isKeyable(key)){
return hashDelete(typeof key=='string'?data.string:data.hash,key);}

return Map?data.map['delete'](key):assocDelete(data.map,key);}


module.exports=mapDelete;
});
__d(446 /* lodash/_hashDelete.js */, function(global, require, module, exports) {var hashHas=require(448 /* ./_hashHas */);









function hashDelete(hash,key){
return hashHas(hash,key)&&delete hash[key];}


module.exports=hashDelete;
});
__d(448 /* lodash/_hashHas.js */, function(global, require, module, exports) {var nativeCreate=require(436 /* ./_nativeCreate */);


var objectProto=Object.prototype;


var hasOwnProperty=objectProto.hasOwnProperty;









function hashHas(hash,key){
return nativeCreate?hash[key]!==undefined:hasOwnProperty.call(hash,key);}


module.exports=hashHas;
});
__d(449 /* lodash/_isKeyable.js */, function(global, require, module, exports) {function 






isKeyable(value){
var type=typeof value;
return type=='number'||type=='boolean'||
type=='string'&&value!='__proto__'||value==null;}


module.exports=isKeyable;
});
__d(451 /* lodash/_mapGet.js */, function(global, require, module, exports) {var Map=require(441 /* ./_Map */),
assocGet=require(431 /* ./_assocGet */),
hashGet=require(450 /* ./_hashGet */),
isKeyable=require(449 /* ./_isKeyable */);










function mapGet(key){
var data=this.__data__;
if(isKeyable(key)){
return hashGet(typeof key=='string'?data.string:data.hash,key);}

return Map?data.map.get(key):assocGet(data.map,key);}


module.exports=mapGet;
});
__d(450 /* lodash/_hashGet.js */, function(global, require, module, exports) {var nativeCreate=require(436 /* ./_nativeCreate */);


var HASH_UNDEFINED='__lodash_hash_undefined__';


var objectProto=Object.prototype;


var hasOwnProperty=objectProto.hasOwnProperty;









function hashGet(hash,key){
if(nativeCreate){
var result=hash[key];
return result===HASH_UNDEFINED?undefined:result;}

return hasOwnProperty.call(hash,key)?hash[key]:undefined;}


module.exports=hashGet;
});
__d(452 /* lodash/_mapHas.js */, function(global, require, module, exports) {var Map=require(441 /* ./_Map */),
assocHas=require(433 /* ./_assocHas */),
hashHas=require(448 /* ./_hashHas */),
isKeyable=require(449 /* ./_isKeyable */);










function mapHas(key){
var data=this.__data__;
if(isKeyable(key)){
return hashHas(typeof key=='string'?data.string:data.hash,key);}

return Map?data.map.has(key):assocHas(data.map,key);}


module.exports=mapHas;
});
__d(453 /* lodash/_mapSet.js */, function(global, require, module, exports) {var Map=require(441 /* ./_Map */),
assocSet=require(454 /* ./_assocSet */),
hashSet=require(455 /* ./_hashSet */),
isKeyable=require(449 /* ./_isKeyable */);











function mapSet(key,value){
var data=this.__data__;
if(isKeyable(key)){
hashSet(typeof key=='string'?data.string:data.hash,key,value);}else 
if(Map){
data.map.set(key,value);}else 
{
assocSet(data.map,key,value);}

return this;}


module.exports=mapSet;
});
__d(454 /* lodash/_assocSet.js */, function(global, require, module, exports) {var assocIndexOf=require(428 /* ./_assocIndexOf */);









function assocSet(array,key,value){
var index=assocIndexOf(array,key);
if(index<0){
array.push([key,value]);}else 
{
array[index][1]=value;}}



module.exports=assocSet;
});
__d(455 /* lodash/_hashSet.js */, function(global, require, module, exports) {var nativeCreate=require(436 /* ./_nativeCreate */);


var HASH_UNDEFINED='__lodash_hash_undefined__';









function hashSet(hash,key,value){
hash[key]=nativeCreate&&value===undefined?HASH_UNDEFINED:value;}


module.exports=hashSet;
});
__d(456 /* lodash/_baseIsEqual.js */, function(global, require, module, exports) {var baseIsEqualDeep=require(458 /* ./_baseIsEqualDeep */),
isObject=require(410 /* ./isObject */),
isObjectLike=require(412 /* ./isObjectLike */);
















function baseIsEqual(value,other,customizer,bitmask,stack){
if(value===other){
return true;}

if(value==null||other==null||!isObject(value)&&!isObjectLike(other)){
return value!==value&&other!==other;}

return baseIsEqualDeep(value,other,baseIsEqual,customizer,bitmask,stack);}


module.exports=baseIsEqual;
});
__d(458 /* lodash/_baseIsEqualDeep.js */, function(global, require, module, exports) {var Stack=require(425 /* ./_Stack */),
equalArrays=require(459 /* ./_equalArrays */),
equalByTag=require(464 /* ./_equalByTag */),
equalObjects=require(469 /* ./_equalObjects */),
getTag=require(467 /* ./_getTag */),
isArray=require(413 /* ./isArray */),
isHostObject=require(440 /* ./_isHostObject */),
isTypedArray=require(477 /* ./isTypedArray */);


var PARTIAL_COMPARE_FLAG=2;


var argsTag='[object Arguments]',
arrayTag='[object Array]',
objectTag='[object Object]';


var objectProto=Object.prototype;


var hasOwnProperty=objectProto.hasOwnProperty;
















function baseIsEqualDeep(object,other,equalFunc,customizer,bitmask,stack){
var objIsArr=isArray(object),
othIsArr=isArray(other),
objTag=arrayTag,
othTag=arrayTag;

if(!objIsArr){
objTag=getTag(object);
objTag=objTag==argsTag?objectTag:objTag;}

if(!othIsArr){
othTag=getTag(other);
othTag=othTag==argsTag?objectTag:othTag;}

var objIsObj=objTag==objectTag&&!isHostObject(object),
othIsObj=othTag==objectTag&&!isHostObject(other),
isSameTag=objTag==othTag;

if(isSameTag&&!objIsObj){
stack||(stack=new Stack());
return objIsArr||isTypedArray(object)?
equalArrays(object,other,equalFunc,customizer,bitmask,stack):
equalByTag(object,other,objTag,equalFunc,customizer,bitmask,stack);}

if(!(bitmask&PARTIAL_COMPARE_FLAG)){
var objIsWrapped=objIsObj&&hasOwnProperty.call(object,'__wrapped__'),
othIsWrapped=othIsObj&&hasOwnProperty.call(other,'__wrapped__');

if(objIsWrapped||othIsWrapped){
var objUnwrapped=objIsWrapped?object.value():object,
othUnwrapped=othIsWrapped?other.value():other;

stack||(stack=new Stack());
return equalFunc(objUnwrapped,othUnwrapped,customizer,bitmask,stack);}}


if(!isSameTag){
return false;}

stack||(stack=new Stack());
return equalObjects(object,other,equalFunc,customizer,bitmask,stack);}


module.exports=baseIsEqualDeep;
});
__d(459 /* lodash/_equalArrays.js */, function(global, require, module, exports) {var arraySome=require(457 /* ./_arraySome */);


var UNORDERED_COMPARE_FLAG=1,
PARTIAL_COMPARE_FLAG=2;















function equalArrays(array,other,equalFunc,customizer,bitmask,stack){
var index=-1,
isPartial=bitmask&PARTIAL_COMPARE_FLAG,
isUnordered=bitmask&UNORDERED_COMPARE_FLAG,
arrLength=array.length,
othLength=other.length;

if(arrLength!=othLength&&!(isPartial&&othLength>arrLength)){
return false;}


var stacked=stack.get(array);
if(stacked){
return stacked==other;}

var result=true;
stack.set(array,other);


while(++index<arrLength){
var arrValue=array[index],
othValue=other[index];

if(customizer){
var compared=isPartial?
customizer(othValue,arrValue,index,other,array,stack):
customizer(arrValue,othValue,index,array,other,stack);}

if(compared!==undefined){
if(compared){
continue;}

result=false;
break;}


if(isUnordered){
if(!arraySome(other,function(othValue){
return arrValue===othValue||
equalFunc(arrValue,othValue,customizer,bitmask,stack);}))
{
result=false;
break;}}else 

if(!(
arrValue===othValue||
equalFunc(arrValue,othValue,customizer,bitmask,stack)))
{
result=false;
break;}}


stack['delete'](array);
return result;}


module.exports=equalArrays;
});
__d(457 /* lodash/_arraySome.js */, function(global, require, module, exports) {function 









arraySome(array,predicate){
var index=-1,
length=array.length;

while(++index<length){
if(predicate(array[index],index,array)){
return true;}}


return false;}


module.exports=arraySome;
});
__d(464 /* lodash/_equalByTag.js */, function(global, require, module, exports) {var Symbol=require(460 /* ./_Symbol */),
Uint8Array=require(461 /* ./_Uint8Array */),
equalArrays=require(459 /* ./_equalArrays */),
mapToArray=require(462 /* ./_mapToArray */),
setToArray=require(463 /* ./_setToArray */);


var UNORDERED_COMPARE_FLAG=1,
PARTIAL_COMPARE_FLAG=2;


var boolTag='[object Boolean]',
dateTag='[object Date]',
errorTag='[object Error]',
mapTag='[object Map]',
numberTag='[object Number]',
regexpTag='[object RegExp]',
setTag='[object Set]',
stringTag='[object String]',
symbolTag='[object Symbol]';

var arrayBufferTag='[object ArrayBuffer]',
dataViewTag='[object DataView]';


var symbolProto=Symbol?typeof Symbol==='function'?Symbol.prototype:'@@prototype':undefined,
symbolValueOf=symbolProto?symbolProto.valueOf:undefined;



















function equalByTag(object,other,tag,equalFunc,customizer,bitmask,stack){
switch(tag){
case dataViewTag:
if(object.byteLength!=other.byteLength||
object.byteOffset!=other.byteOffset){
return false;}

object=object.buffer;
other=other.buffer;

case arrayBufferTag:
if(object.byteLength!=other.byteLength||
!equalFunc(new Uint8Array(object),new Uint8Array(other))){
return false;}

return true;

case boolTag:
case dateTag:



return +object==+other;

case errorTag:
return object.name==other.name&&object.message==other.message;

case numberTag:

return object!=+object?other!=+other:object==+other;

case regexpTag:
case stringTag:



return object==other+'';

case mapTag:
var convert=mapToArray;

case setTag:
var isPartial=bitmask&PARTIAL_COMPARE_FLAG;
convert||(convert=setToArray);

if(object.size!=other.size&&!isPartial){
return false;}


var stacked=stack.get(object);
if(stacked){
return stacked==other;}

bitmask|=UNORDERED_COMPARE_FLAG;
stack.set(object,other);


return equalArrays(convert(object),convert(other),equalFunc,customizer,bitmask,stack);

case symbolTag:
if(symbolValueOf){
return symbolValueOf.call(object)==symbolValueOf.call(other);}}


return false;}


module.exports=equalByTag;
});
__d(460 /* lodash/_Symbol.js */, function(global, require, module, exports) {var root=require(444 /* ./_root */);


var Symbol=root.Symbol;

module.exports=Symbol;
});
__d(461 /* lodash/_Uint8Array.js */, function(global, require, module, exports) {var root=require(444 /* ./_root */);


var Uint8Array=root.Uint8Array;

module.exports=Uint8Array;
});
__d(462 /* lodash/_mapToArray.js */, function(global, require, module, exports) {function 






mapToArray(map){
var index=-1,
result=Array(map.size);

map.forEach(function(value,key){
result[++index]=[key,value];});

return result;}


module.exports=mapToArray;
});
__d(463 /* lodash/_setToArray.js */, function(global, require, module, exports) {function 






setToArray(set){
var index=-1,
result=Array(set.size);

set.forEach(function(value){
result[++index]=value;});

return result;}


module.exports=setToArray;
});
__d(469 /* lodash/_equalObjects.js */, function(global, require, module, exports) {var baseHas=require(398 /* ./_baseHas */),
keys=require(397 /* ./keys */);


var PARTIAL_COMPARE_FLAG=2;















function equalObjects(object,other,equalFunc,customizer,bitmask,stack){
var isPartial=bitmask&PARTIAL_COMPARE_FLAG,
objProps=keys(object),
objLength=objProps.length,
othProps=keys(other),
othLength=othProps.length;

if(objLength!=othLength&&!isPartial){
return false;}

var index=objLength;
while(index--){
var key=objProps[index];
if(!(isPartial?key in other:baseHas(other,key))){
return false;}}



var stacked=stack.get(object);
if(stacked){
return stacked==other;}

var result=true;
stack.set(object,other);

var skipCtor=isPartial;
while(++index<objLength){
key=objProps[index];
var objValue=object[key],
othValue=other[key];

if(customizer){
var compared=isPartial?
customizer(othValue,objValue,key,other,object,stack):
customizer(objValue,othValue,key,object,other,stack);}


if(!(compared===undefined?
objValue===othValue||equalFunc(objValue,othValue,customizer,bitmask,stack):
compared))
{
result=false;
break;}

skipCtor||(skipCtor=key=='constructor');}

if(result&&!skipCtor){
var objCtor=object.constructor,
othCtor=other.constructor;


if(objCtor!=othCtor&&
'constructor' in object&&'constructor' in other&&
!(typeof objCtor=='function'&&objCtor instanceof objCtor&&
typeof othCtor=='function'&&othCtor instanceof othCtor)){
result=false;}}


stack['delete'](object);
return result;}


module.exports=equalObjects;
});
__d(467 /* lodash/_getTag.js */, function(global, require, module, exports) {var DataView=require(465 /* ./_DataView */),
Map=require(441 /* ./_Map */),
Promise=require(466 /* ./_Promise */),
Set=require(468 /* ./_Set */),
WeakMap=require(470 /* ./_WeakMap */),
toSource=require(442 /* ./_toSource */);


var mapTag='[object Map]',
objectTag='[object Object]',
promiseTag='[object Promise]',
setTag='[object Set]',
weakMapTag='[object WeakMap]';

var dataViewTag='[object DataView]';


var objectProto=Object.prototype;






var objectToString=objectProto.toString;


var dataViewCtorString=toSource(DataView),
mapCtorString=toSource(Map),
promiseCtorString=toSource(Promise),
setCtorString=toSource(Set),
weakMapCtorString=toSource(WeakMap);








function getTag(value){
return objectToString.call(value);}




if(DataView&&getTag(new DataView(new ArrayBuffer(1)))!=dataViewTag||
Map&&getTag(new Map())!=mapTag||
Promise&&getTag(Promise.resolve())!=promiseTag||
Set&&getTag(new Set())!=setTag||
WeakMap&&getTag(new WeakMap())!=weakMapTag){
getTag=function(value){
var result=objectToString.call(value),
Ctor=result==objectTag?value.constructor:undefined,
ctorString=Ctor?toSource(Ctor):undefined;

if(ctorString){
switch(ctorString){
case dataViewCtorString:return dataViewTag;
case mapCtorString:return mapTag;
case promiseCtorString:return promiseTag;
case setCtorString:return setTag;
case weakMapCtorString:return weakMapTag;}}


return result;};}



module.exports=getTag;
});
__d(465 /* lodash/_DataView.js */, function(global, require, module, exports) {var getNative=require(438 /* ./_getNative */),
root=require(444 /* ./_root */);


var DataView=getNative(root,'DataView');

module.exports=DataView;
});
__d(466 /* lodash/_Promise.js */, function(global, require, module, exports) {var getNative=require(438 /* ./_getNative */),
root=require(444 /* ./_root */);


var Promise=getNative(root,'Promise');

module.exports=Promise;
});
__d(468 /* lodash/_Set.js */, function(global, require, module, exports) {var getNative=require(438 /* ./_getNative */),
root=require(444 /* ./_root */);


var Set=getNative(root,'Set');

module.exports=Set;
});
__d(470 /* lodash/_WeakMap.js */, function(global, require, module, exports) {var getNative=require(438 /* ./_getNative */),
root=require(444 /* ./_root */);


var WeakMap=getNative(root,'WeakMap');

module.exports=WeakMap;
});
__d(477 /* lodash/isTypedArray.js */, function(global, require, module, exports) {var isLength=require(411 /* ./isLength */),
isObjectLike=require(412 /* ./isObjectLike */);


var argsTag='[object Arguments]',
arrayTag='[object Array]',
boolTag='[object Boolean]',
dateTag='[object Date]',
errorTag='[object Error]',
funcTag='[object Function]',
mapTag='[object Map]',
numberTag='[object Number]',
objectTag='[object Object]',
regexpTag='[object RegExp]',
setTag='[object Set]',
stringTag='[object String]',
weakMapTag='[object WeakMap]';

var arrayBufferTag='[object ArrayBuffer]',
dataViewTag='[object DataView]',
float32Tag='[object Float32Array]',
float64Tag='[object Float64Array]',
int8Tag='[object Int8Array]',
int16Tag='[object Int16Array]',
int32Tag='[object Int32Array]',
uint8Tag='[object Uint8Array]',
uint8ClampedTag='[object Uint8ClampedArray]',
uint16Tag='[object Uint16Array]',
uint32Tag='[object Uint32Array]';


var typedArrayTags={};
typedArrayTags[float32Tag]=typedArrayTags[float64Tag]=
typedArrayTags[int8Tag]=typedArrayTags[int16Tag]=
typedArrayTags[int32Tag]=typedArrayTags[uint8Tag]=
typedArrayTags[uint8ClampedTag]=typedArrayTags[uint16Tag]=
typedArrayTags[uint32Tag]=true;
typedArrayTags[argsTag]=typedArrayTags[arrayTag]=
typedArrayTags[arrayBufferTag]=typedArrayTags[boolTag]=
typedArrayTags[dataViewTag]=typedArrayTags[dateTag]=
typedArrayTags[errorTag]=typedArrayTags[funcTag]=
typedArrayTags[mapTag]=typedArrayTags[numberTag]=
typedArrayTags[objectTag]=typedArrayTags[regexpTag]=
typedArrayTags[setTag]=typedArrayTags[stringTag]=
typedArrayTags[weakMapTag]=false;


var objectProto=Object.prototype;






var objectToString=objectProto.toString;



















function isTypedArray(value){
return isObjectLike(value)&&
isLength(value.length)&&!!typedArrayTags[objectToString.call(value)];}


module.exports=isTypedArray;
});
__d(471 /* lodash/_getMatchData.js */, function(global, require, module, exports) {var isStrictComparable=require(473 /* ./_isStrictComparable */),
toPairs=require(472 /* ./toPairs */);








function getMatchData(object){
var result=toPairs(object),
length=result.length;

while(length--){
result[length][2]=isStrictComparable(result[length][1]);}

return result;}


module.exports=getMatchData;
});
__d(473 /* lodash/_isStrictComparable.js */, function(global, require, module, exports) {var isObject=require(410 /* ./isObject */);









function isStrictComparable(value){
return value===value&&!isObject(value);}


module.exports=isStrictComparable;
});
__d(472 /* lodash/toPairs.js */, function(global, require, module, exports) {var baseToPairs=require(474 /* ./_baseToPairs */),
keys=require(397 /* ./keys */);
























function toPairs(object){
return baseToPairs(object,keys(object));}


module.exports=toPairs;
});
__d(474 /* lodash/_baseToPairs.js */, function(global, require, module, exports) {var arrayMap=require(475 /* ./_arrayMap */);










function baseToPairs(object,props){
return arrayMap(props,function(key){
return [key,object[key]];});}



module.exports=baseToPairs;
});
__d(475 /* lodash/_arrayMap.js */, function(global, require, module, exports) {function 








arrayMap(array,iteratee){
var index=-1,
length=array.length,
result=Array(length);

while(++index<length){
result[index]=iteratee(array[index],index,array);}

return result;}


module.exports=arrayMap;
});
__d(476 /* lodash/_matchesStrictComparable.js */, function(global, require, module, exports) {function 








matchesStrictComparable(key,srcValue){
return function(object){
if(object==null){
return false;}

return object[key]===srcValue&&(
srcValue!==undefined||key in Object(object));};}



module.exports=matchesStrictComparable;
});
__d(479 /* lodash/_baseMatchesProperty.js */, function(global, require, module, exports) {var baseIsEqual=require(456 /* ./_baseIsEqual */),
get=require(478 /* ./get */),
hasIn=require(492 /* ./hasIn */),
isKey=require(486 /* ./_isKey */),
isStrictComparable=require(473 /* ./_isStrictComparable */),
matchesStrictComparable=require(476 /* ./_matchesStrictComparable */);


var UNORDERED_COMPARE_FLAG=1,
PARTIAL_COMPARE_FLAG=2;









function baseMatchesProperty(path,srcValue){
if(isKey(path)&&isStrictComparable(srcValue)){
return matchesStrictComparable(path,srcValue);}

return function(object){
var objValue=get(object,path);
return objValue===undefined&&objValue===srcValue?
hasIn(object,path):
baseIsEqual(srcValue,objValue,undefined,UNORDERED_COMPARE_FLAG|PARTIAL_COMPARE_FLAG);};}



module.exports=baseMatchesProperty;
});
__d(478 /* lodash/get.js */, function(global, require, module, exports) {var baseGet=require(480 /* ./_baseGet */);


























function get(object,path,defaultValue){
var result=object==null?undefined:baseGet(object,path);
return result===undefined?defaultValue:result;}


module.exports=get;
});
__d(480 /* lodash/_baseGet.js */, function(global, require, module, exports) {var castPath=require(481 /* ./_castPath */),
isKey=require(486 /* ./_isKey */);









function baseGet(object,path){
path=isKey(path,object)?[path]:castPath(path);

var index=0,
length=path.length;

while(object!=null&&index<length){
object=object[path[index++]];}

return index&&index==length?object:undefined;}


module.exports=baseGet;
});
__d(481 /* lodash/_castPath.js */, function(global, require, module, exports) {var isArray=require(413 /* ./isArray */),
stringToPath=require(482 /* ./_stringToPath */);








function castPath(value){
return isArray(value)?value:stringToPath(value);}


module.exports=castPath;
});
__d(482 /* lodash/_stringToPath.js */, function(global, require, module, exports) {var memoize=require(483 /* ./memoize */),
toString=require(484 /* ./toString */);


var rePropName=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]/g;


var reEscapeChar=/\\(\\)?/g;








var stringToPath=memoize(function(string){
var result=[];
toString(string).replace(rePropName,function(match,number,quote,string){
result.push(quote?string.replace(reEscapeChar,'$1'):number||match);});

return result;});


module.exports=stringToPath;
});
__d(483 /* lodash/memoize.js */, function(global, require, module, exports) {var MapCache=require(439 /* ./_MapCache */);


var FUNC_ERROR_TEXT='Expected a function';













































function memoize(func,resolver){
if(typeof func!='function'||resolver&&typeof resolver!='function'){
throw new TypeError(FUNC_ERROR_TEXT);}

var memoized=function(){
var args=arguments,
key=resolver?resolver.apply(this,args):args[0],
cache=memoized.cache;

if(cache.has(key)){
return cache.get(key);}

var result=func.apply(this,args);
memoized.cache=cache.set(key,result);
return result;};

memoized.cache=new (memoize.Cache||MapCache)();
return memoized;}



memoize.Cache=MapCache;

module.exports=memoize;
});
__d(484 /* lodash/toString.js */, function(global, require, module, exports) {var Symbol=require(460 /* ./_Symbol */),
isSymbol=require(485 /* ./isSymbol */);


var INFINITY=1/0;


var symbolProto=Symbol?typeof Symbol==='function'?Symbol.prototype:'@@prototype':undefined,
symbolToString=symbolProto?symbolProto.toString:undefined;






















function toString(value){

if(typeof value=='string'){
return value;}

if(value==null){
return '';}

if(isSymbol(value)){
return symbolToString?symbolToString.call(value):'';}

var result=value+'';
return result=='0'&&1/value==-INFINITY?'-0':result;}


module.exports=toString;
});
__d(485 /* lodash/isSymbol.js */, function(global, require, module, exports) {var isObjectLike=require(412 /* ./isObjectLike */);


var symbolTag='[object Symbol]';


var objectProto=Object.prototype;






var objectToString=objectProto.toString;



















function isSymbol(value){
return typeof value=='symbol'||
isObjectLike(value)&&objectToString.call(value)==symbolTag;}


module.exports=isSymbol;
});
__d(486 /* lodash/_isKey.js */, function(global, require, module, exports) {var isArray=require(413 /* ./isArray */),
isSymbol=require(485 /* ./isSymbol */);


var reIsDeepProp=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
reIsPlainProp=/^\w*$/;









function isKey(value,object){
var type=typeof value;
if(type=='number'||type=='symbol'){
return true;}

return !isArray(value)&&(
isSymbol(value)||reIsPlainProp.test(value)||!reIsDeepProp.test(value)||
object!=null&&value in Object(object));}


module.exports=isKey;
});
__d(492 /* lodash/hasIn.js */, function(global, require, module, exports) {var baseHasIn=require(487 /* ./_baseHasIn */),
hasPath=require(491 /* ./_hasPath */);



























function hasIn(object,path){
return object!=null&&hasPath(object,path,baseHasIn);}


module.exports=hasIn;
});
__d(487 /* lodash/_baseHasIn.js */, function(global, require, module, exports) {function 







baseHasIn(object,key){
return key in Object(object);}


module.exports=baseHasIn;
});
__d(491 /* lodash/_hasPath.js */, function(global, require, module, exports) {var castPath=require(481 /* ./_castPath */),
isArguments=require(405 /* ./isArguments */),
isArray=require(413 /* ./isArray */),
isIndex=require(415 /* ./_isIndex */),
isKey=require(486 /* ./_isKey */),
isLength=require(411 /* ./isLength */),
isString=require(414 /* ./isString */);










function hasPath(object,path,hasFunc){
path=isKey(path,object)?[path]:castPath(path);

var result,
index=-1,
length=path.length;

while(++index<length){
var key=path[index];
if(!(result=object!=null&&hasFunc(object,key))){
break;}

object=object[key];}

if(result){
return result;}

var length=object?object.length:0;
return !!length&&isLength(length)&&isIndex(key,length)&&(
isArray(object)||isString(object)||isArguments(object));}


module.exports=hasPath;
});
__d(488 /* lodash/identity.js */, function(global, require, module, exports) {function 















identity(value){
return value;}


module.exports=identity;
});
__d(489 /* lodash/property.js */, function(global, require, module, exports) {var baseProperty=require(408 /* ./_baseProperty */),
basePropertyDeep=require(490 /* ./_basePropertyDeep */),
isKey=require(486 /* ./_isKey */);























function property(path){
return isKey(path)?baseProperty(path):basePropertyDeep(path);}


module.exports=property;
});
__d(490 /* lodash/_basePropertyDeep.js */, function(global, require, module, exports) {var baseGet=require(480 /* ./_baseGet */);








function basePropertyDeep(path){
return function(object){
return baseGet(object,path);};}



module.exports=basePropertyDeep;
});
__d(501 /* react-proxy/modules/createPrototypeProxy.js */, function(global, require, module, exports) {'use strict';

Object.defineProperty(exports,"__esModule",{
value:true});

exports.default=createPrototypeProxy;

var _assign=require(494 /* lodash/assign */);

var _assign2=_interopRequireDefault(_assign);

var _difference=require(503 /* lodash/difference */);

var _difference2=_interopRequireDefault(_difference);

function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

function createPrototypeProxy(){
var proxy={};
var current=null;
var mountedInstances=[];




function proxyToString(name){

return function toString(){
if(typeof current[name]==='function'){
return current[name].toString();}else 
{
return '<method was deleted>';}};}







function proxyMethod(name){

var proxiedMethod=function proxiedMethod(){
if(typeof current[name]==='function'){
return current[name].apply(this,arguments);}};




(0,_assign2.default)(proxiedMethod,current[name]);
proxiedMethod.toString=proxyToString(name);

return proxiedMethod;}





function proxiedComponentDidMount(){
mountedInstances.push(this);
if(typeof current.componentDidMount==='function'){
return current.componentDidMount.apply(this,arguments);}}


proxiedComponentDidMount.toString=proxyToString('componentDidMount');




function proxiedComponentWillUnmount(){
var index=mountedInstances.indexOf(this);

if(index!==-1){
mountedInstances.splice(index,1);}

if(typeof current.componentWillUnmount==='function'){
return current.componentWillUnmount.apply(this,arguments);}}


proxiedComponentWillUnmount.toString=proxyToString('componentWillUnmount');




function defineProxyProperty(name,descriptor){
Object.defineProperty(proxy,name,descriptor);}





function defineProxyPropertyWithValue(name,value){
var _ref=Object.getOwnPropertyDescriptor(current,name)||{};

var _ref$enumerable=_ref.enumerable;
var enumerable=_ref$enumerable===undefined?false:_ref$enumerable;
var _ref$writable=_ref.writable;
var writable=_ref$writable===undefined?true:_ref$writable;


defineProxyProperty(name,{
configurable:true,
enumerable:enumerable,
writable:writable,
value:value});}






function createAutoBindMap(){
if(!current.__reactAutoBindMap){
return;}


var __reactAutoBindMap={};
for(var name in current.__reactAutoBindMap){
if(typeof proxy[name]==='function'&&current.__reactAutoBindMap.hasOwnProperty(name)){
__reactAutoBindMap[name]=proxy[name];}}



return __reactAutoBindMap;}





function createAutoBindPairs(){
var __reactAutoBindPairs=[];

for(var i=0;i<current.__reactAutoBindPairs.length;i+=2){
var name=current.__reactAutoBindPairs[i];
var method=proxy[name];

if(typeof method==='function'){
__reactAutoBindPairs.push(name,method);}}



return __reactAutoBindPairs;}





function update(next){

current=next;


var currentNames=Object.getOwnPropertyNames(current);
var previousName=Object.getOwnPropertyNames(proxy);
var removedNames=(0,_difference2.default)(previousName,currentNames);


removedNames.forEach(function(name){
delete proxy[name];});



currentNames.forEach(function(name){
var descriptor=Object.getOwnPropertyDescriptor(current,name);
if(typeof descriptor.value==='function'){

defineProxyPropertyWithValue(name,proxyMethod(name));}else 
{

defineProxyProperty(name,descriptor);}});




defineProxyPropertyWithValue('componentDidMount',proxiedComponentDidMount);
defineProxyPropertyWithValue('componentWillUnmount',proxiedComponentWillUnmount);

if(current.hasOwnProperty('__reactAutoBindMap')){
defineProxyPropertyWithValue('__reactAutoBindMap',createAutoBindMap());}


if(current.hasOwnProperty('__reactAutoBindPairs')){
defineProxyPropertyWithValue('__reactAutoBindPairs',createAutoBindPairs());}



proxy.__proto__=next;

return mountedInstances;}





function get(){
return proxy;}


return {
update:update,
get:get};}

;
});
__d(494 /* lodash/assign.js */, function(global, require, module, exports) {var assignValue=require(493 /* ./_assignValue */),
copyObject=require(495 /* ./_copyObject */),
createAssigner=require(496 /* ./_createAssigner */),
isArrayLike=require(407 /* ./isArrayLike */),
isPrototype=require(416 /* ./_isPrototype */),
keys=require(397 /* ./keys */);


var objectProto=Object.prototype;


var hasOwnProperty=objectProto.hasOwnProperty;


var propertyIsEnumerable=objectProto.propertyIsEnumerable;


var nonEnumShadows=!propertyIsEnumerable.call({'valueOf':1},'valueOf');
































var assign=createAssigner(function(object,source){
if(nonEnumShadows||isPrototype(source)||isArrayLike(source)){
copyObject(source,keys(source),object);
return;}

for(var key in source){
if(hasOwnProperty.call(source,key)){
assignValue(object,key,source[key]);}}});




module.exports=assign;
});
__d(493 /* lodash/_assignValue.js */, function(global, require, module, exports) {var eq=require(429 /* ./eq */);


var objectProto=Object.prototype;


var hasOwnProperty=objectProto.hasOwnProperty;











function assignValue(object,key,value){
var objValue=object[key];
if(!(hasOwnProperty.call(object,key)&&eq(objValue,value))||
value===undefined&&!(key in object)){
object[key]=value;}}



module.exports=assignValue;
});
__d(495 /* lodash/_copyObject.js */, function(global, require, module, exports) {var assignValue=require(493 /* ./_assignValue */);











function copyObject(source,props,object,customizer){
object||(object={});

var index=-1,
length=props.length;

while(++index<length){
var key=props[index];

var newValue=customizer?
customizer(object[key],source[key],key,object,source):
source[key];

assignValue(object,key,newValue);}

return object;}


module.exports=copyObject;
});
__d(496 /* lodash/_createAssigner.js */, function(global, require, module, exports) {var isIterateeCall=require(497 /* ./_isIterateeCall */),
rest=require(498 /* ./rest */);








function createAssigner(assigner){
return rest(function(object,sources){
var index=-1,
length=sources.length,
customizer=length>1?sources[length-1]:undefined,
guard=length>2?sources[2]:undefined;

customizer=typeof customizer=='function'?(
length--,customizer):
undefined;

if(guard&&isIterateeCall(sources[0],sources[1],guard)){
customizer=length<3?undefined:customizer;
length=1;}

object=Object(object);
while(++index<length){
var source=sources[index];
if(source){
assigner(object,source,index,customizer);}}


return object;});}



module.exports=createAssigner;
});
__d(497 /* lodash/_isIterateeCall.js */, function(global, require, module, exports) {var eq=require(429 /* ./eq */),
isArrayLike=require(407 /* ./isArrayLike */),
isIndex=require(415 /* ./_isIndex */),
isObject=require(410 /* ./isObject */);











function isIterateeCall(value,index,object){
if(!isObject(object)){
return false;}

var type=typeof index;
if(type=='number'?
isArrayLike(object)&&isIndex(index,object.length):
type=='string'&&index in object)
{
return eq(object[index],value);}

return false;}


module.exports=isIterateeCall;
});
__d(498 /* lodash/rest.js */, function(global, require, module, exports) {var apply=require(499 /* ./_apply */),
toInteger=require(500 /* ./toInteger */);


var FUNC_ERROR_TEXT='Expected a function';


var nativeMax=Math.max;


























function rest(func,start){
if(typeof func!='function'){
throw new TypeError(FUNC_ERROR_TEXT);}

start=nativeMax(start===undefined?func.length-1:toInteger(start),0);
return function(){
var args=arguments,
index=-1,
length=nativeMax(args.length-start,0),
array=Array(length);

while(++index<length){
array[index]=args[start+index];}

switch(start){
case 0:return func.call(this,array);
case 1:return func.call(this,args[0],array);
case 2:return func.call(this,args[0],args[1],array);}

var otherArgs=Array(start+1);
index=-1;
while(++index<start){
otherArgs[index]=args[index];}

otherArgs[start]=array;
return apply(func,this,otherArgs);};}



module.exports=rest;
});
__d(499 /* lodash/_apply.js */, function(global, require, module, exports) {function 









apply(func,thisArg,args){
var length=args.length;
switch(length){
case 0:return func.call(thisArg);
case 1:return func.call(thisArg,args[0]);
case 2:return func.call(thisArg,args[0],args[1]);
case 3:return func.call(thisArg,args[0],args[1],args[2]);}

return func.apply(thisArg,args);}


module.exports=apply;
});
__d(500 /* lodash/toInteger.js */, function(global, require, module, exports) {var toNumber=require(502 /* ./toNumber */);


var INFINITY=1/0,
MAX_INTEGER=1.7976931348623157e+308;



























function toInteger(value){
if(!value){
return value===0?value:0;}

value=toNumber(value);
if(value===INFINITY||value===-INFINITY){
var sign=value<0?-1:1;
return sign*MAX_INTEGER;}

var remainder=value%1;
return value===value?remainder?value-remainder:value:0;}


module.exports=toInteger;
});
__d(502 /* lodash/toNumber.js */, function(global, require, module, exports) {var isFunction=require(409 /* ./isFunction */),
isObject=require(410 /* ./isObject */),
isSymbol=require(485 /* ./isSymbol */);


var NAN=0/0;


var reTrim=/^\s+|\s+$/g;


var reIsBadHex=/^[-+]0x[0-9a-f]+$/i;


var reIsBinary=/^0b[01]+$/i;


var reIsOctal=/^0o[0-7]+$/i;


var freeParseInt=parseInt;
























function toNumber(value){
if(typeof value=='number'){
return value;}

if(isSymbol(value)){
return NAN;}

if(isObject(value)){
var other=isFunction(value.valueOf)?value.valueOf():value;
value=isObject(other)?other+'':other;}

if(typeof value!='string'){
return value===0?value:+value;}

value=value.replace(reTrim,'');
var isBinary=reIsBinary.test(value);
return isBinary||reIsOctal.test(value)?
freeParseInt(value.slice(2),isBinary?2:8):
reIsBadHex.test(value)?NAN:+value;}


module.exports=toNumber;
});
__d(503 /* lodash/difference.js */, function(global, require, module, exports) {var baseDifference=require(507 /* ./_baseDifference */),
baseFlatten=require(515 /* ./_baseFlatten */),
isArrayLikeObject=require(404 /* ./isArrayLikeObject */),
rest=require(498 /* ./rest */);



















var difference=rest(function(array,values){
return isArrayLikeObject(array)?
baseDifference(array,baseFlatten(values,1,isArrayLikeObject,true)):
[];});


module.exports=difference;
});
__d(507 /* lodash/_baseDifference.js */, function(global, require, module, exports) {var SetCache=require(504 /* ./_SetCache */),
arrayIncludes=require(505 /* ./_arrayIncludes */),
arrayIncludesWith=require(512 /* ./_arrayIncludesWith */),
arrayMap=require(475 /* ./_arrayMap */),
baseUnary=require(509 /* ./_baseUnary */),
cacheHas=require(511 /* ./_cacheHas */);


var LARGE_ARRAY_SIZE=200;












function baseDifference(array,values,iteratee,comparator){
var index=-1,
includes=arrayIncludes,
isCommon=true,
length=array.length,
result=[],
valuesLength=values.length;

if(!length){
return result;}

if(iteratee){
values=arrayMap(values,baseUnary(iteratee));}

if(comparator){
includes=arrayIncludesWith;
isCommon=false;}else 

if(values.length>=LARGE_ARRAY_SIZE){
includes=cacheHas;
isCommon=false;
values=new SetCache(values);}

outer: 
while(++index<length){
var value=array[index],
computed=iteratee?iteratee(value):value;

if(isCommon&&computed===computed){
var valuesIndex=valuesLength;
while(valuesIndex--){
if(values[valuesIndex]===computed){
continue outer;}}


result.push(value);}else 

if(!includes(values,computed,comparator)){
result.push(value);}}


return result;}


module.exports=baseDifference;
});
__d(504 /* lodash/_SetCache.js */, function(global, require, module, exports) {var MapCache=require(439 /* ./_MapCache */),
cachePush=require(510 /* ./_cachePush */);









function SetCache(values){
var index=-1,
length=values?values.length:0;

this.__data__=new MapCache();
while(++index<length){
this.push(values[index]);}}




SetCache.prototype.push=cachePush;

module.exports=SetCache;
});
__d(510 /* lodash/_cachePush.js */, function(global, require, module, exports) {var isKeyable=require(449 /* ./_isKeyable */);


var HASH_UNDEFINED='__lodash_hash_undefined__';









function cachePush(value){
var map=this.__data__;
if(isKeyable(value)){
var data=map.__data__,
hash=typeof value=='string'?data.string:data.hash;

hash[value]=HASH_UNDEFINED;}else 

{
map.set(value,HASH_UNDEFINED);}}



module.exports=cachePush;
});
__d(505 /* lodash/_arrayIncludes.js */, function(global, require, module, exports) {var baseIndexOf=require(506 /* ./_baseIndexOf */);










function arrayIncludes(array,value){
return !!array.length&&baseIndexOf(array,value,0)>-1;}


module.exports=arrayIncludes;
});
__d(506 /* lodash/_baseIndexOf.js */, function(global, require, module, exports) {var indexOfNaN=require(508 /* ./_indexOfNaN */);










function baseIndexOf(array,value,fromIndex){
if(value!==value){
return indexOfNaN(array,fromIndex);}

var index=fromIndex-1,
length=array.length;

while(++index<length){
if(array[index]===value){
return index;}}


return -1;}


module.exports=baseIndexOf;
});
__d(508 /* lodash/_indexOfNaN.js */, function(global, require, module, exports) {function 








indexOfNaN(array,fromIndex,fromRight){
var length=array.length,
index=fromIndex+(fromRight?0:-1);

while(fromRight?index--:++index<length){
var other=array[index];
if(other!==other){
return index;}}


return -1;}


module.exports=indexOfNaN;
});
__d(512 /* lodash/_arrayIncludesWith.js */, function(global, require, module, exports) {function 








arrayIncludesWith(array,value,comparator){
var index=-1,
length=array.length;

while(++index<length){
if(comparator(value,array[index])){
return true;}}


return false;}


module.exports=arrayIncludesWith;
});
__d(509 /* lodash/_baseUnary.js */, function(global, require, module, exports) {function 






baseUnary(func){
return function(value){
return func(value);};}



module.exports=baseUnary;
});
__d(511 /* lodash/_cacheHas.js */, function(global, require, module, exports) {var isKeyable=require(449 /* ./_isKeyable */);


var HASH_UNDEFINED='__lodash_hash_undefined__';









function cacheHas(cache,value){
var map=cache.__data__;
if(isKeyable(value)){
var data=map.__data__,
hash=typeof value=='string'?data.string:data.hash;

return hash[value]===HASH_UNDEFINED;}

return map.has(value);}


module.exports=cacheHas;
});
__d(515 /* lodash/_baseFlatten.js */, function(global, require, module, exports) {var arrayPush=require(513 /* ./_arrayPush */),
isFlattenable=require(514 /* ./_isFlattenable */);












function baseFlatten(array,depth,predicate,isStrict,result){
var index=-1,
length=array.length;

predicate||(predicate=isFlattenable);
result||(result=[]);

while(++index<length){
var value=array[index];
if(depth>0&&predicate(value)){
if(depth>1){

baseFlatten(value,depth-1,predicate,isStrict,result);}else 
{
arrayPush(result,value);}}else 

if(!isStrict){
result[result.length]=value;}}


return result;}


module.exports=baseFlatten;
});
__d(513 /* lodash/_arrayPush.js */, function(global, require, module, exports) {function 







arrayPush(array,values){
var index=-1,
length=values.length,
offset=array.length;

while(++index<length){
array[offset+index]=values[index];}

return array;}


module.exports=arrayPush;
});
__d(514 /* lodash/_isFlattenable.js */, function(global, require, module, exports) {var isArguments=require(405 /* ./isArguments */),
isArray=require(413 /* ./isArray */),
isArrayLikeObject=require(404 /* ./isArrayLikeObject */);








function isFlattenable(value){
return isArrayLikeObject(value)&&(isArray(value)||isArguments(value));}


module.exports=isFlattenable;
});
__d(517 /* react-proxy/modules/bindAutoBindMethods.js */, function(global, require, module, exports) {'use strict';

Object.defineProperty(exports,"__esModule",{
value:true});

exports.default=bindAutoBindMethods;












function bindAutoBindMethod(component,method){
var boundMethod=method.bind(component);

boundMethod.__reactBoundContext=component;
boundMethod.__reactBoundMethod=method;
boundMethod.__reactBoundArguments=null;

var componentName=component.constructor.displayName,
_bind=boundMethod.bind;

boundMethod.bind=function(newThis){
var args=Array.prototype.slice.call(arguments,1);
if(newThis!==component&&newThis!==null){
console.warn('bind(): React component methods may only be bound to the '+'component instance. See '+componentName);}else 
if(!args.length){
console.warn('bind(): You are binding a component method to the component. '+'React does this for you automatically in a high-performance '+'way, so you can safely remove this call. See '+componentName);
return boundMethod;}


var reboundMethod=_bind.apply(boundMethod,arguments);
reboundMethod.__reactBoundContext=component;
reboundMethod.__reactBoundMethod=method;
reboundMethod.__reactBoundArguments=args;

return reboundMethod;};


return boundMethod;}


function bindAutoBindMethodsFromMap(component){
for(var autoBindKey in component.__reactAutoBindMap){
if(!component.__reactAutoBindMap.hasOwnProperty(autoBindKey)){
return;}





if(component.hasOwnProperty(autoBindKey)&&component[autoBindKey].__reactBoundContext===component){
continue;}


var method=component.__reactAutoBindMap[autoBindKey];
component[autoBindKey]=bindAutoBindMethod(component,method);}}



function bindAutoBindMethods(component){
if(component.__reactAutoBindPairs){
bindAutoBindMethodsFromArray(component);}else 
if(component.__reactAutoBindMap){
bindAutoBindMethodsFromMap(component);}}



function bindAutoBindMethodsFromArray(component){
var pairs=component.__reactAutoBindPairs;

if(!pairs){
return;}


for(var i=0;i<pairs.length;i+=2){
var autoBindKey=pairs[i];

if(component.hasOwnProperty(autoBindKey)&&component[autoBindKey].__reactBoundContext===component){
continue;}


var method=pairs[i+1];

component[autoBindKey]=bindAutoBindMethod(component,method);}}
});
__d(518 /* react-proxy/modules/deleteUnknownAutoBindMethods.js */, function(global, require, module, exports) {'use strict';

Object.defineProperty(exports,"__esModule",{
value:true});

exports.default=deleteUnknownAutoBindMethods;
function shouldDeleteClassicInstanceMethod(component,name){
if(component.__reactAutoBindMap&&component.__reactAutoBindMap.hasOwnProperty(name)){

return false;}


if(component.__reactAutoBindPairs&&component.__reactAutoBindPairs.indexOf(name)>=0){

return false;}


if(component[name].__reactBoundArguments!==null){

return false;}




return true;}


function shouldDeleteModernInstanceMethod(component,name){
var prototype=component.constructor.prototype;

var prototypeDescriptor=Object.getOwnPropertyDescriptor(prototype,name);

if(!prototypeDescriptor||!prototypeDescriptor.get){

return false;}


if(prototypeDescriptor.get().length!==component[name].length){

return false;}




return true;}


function shouldDeleteInstanceMethod(component,name){
var descriptor=Object.getOwnPropertyDescriptor(component,name);
if(typeof descriptor.value!=='function'){

return;}


if(component.__reactAutoBindMap||component.__reactAutoBindPairs){

return shouldDeleteClassicInstanceMethod(component,name);}else 
{

return shouldDeleteModernInstanceMethod(component,name);}}














function deleteUnknownAutoBindMethods(component){
var names=Object.getOwnPropertyNames(component);

names.forEach(function(name){
if(shouldDeleteInstanceMethod(component,name)){
delete component[name];}});}
});
__d(516 /* react-deep-force-update/lib/index.js */, function(global, require, module, exports) {"use strict";

exports.__esModule=true;
exports["default"]=getForceUpdate;
function traverseRenderedChildren(internalInstance,callback,argument){
callback(internalInstance,argument);

if(internalInstance._renderedComponent){
traverseRenderedChildren(internalInstance._renderedComponent,callback,argument);}else 
{
for(var key in internalInstance._renderedChildren){
if(internalInstance._renderedChildren.hasOwnProperty(key)){
traverseRenderedChildren(internalInstance._renderedChildren[key],callback,argument);}}}}





function setPendingForceUpdate(internalInstance){
if(internalInstance._pendingForceUpdate===false){
internalInstance._pendingForceUpdate=true;}}



function forceUpdateIfPending(internalInstance,React){
if(internalInstance._pendingForceUpdate===true){
var publicInstance=internalInstance._instance;
React.Component.prototype.forceUpdate.call(publicInstance);}}



function getForceUpdate(React){
return function(instance){
var internalInstance=instance._reactInternalInstance;
traverseRenderedChildren(internalInstance,setPendingForceUpdate);
traverseRenderedChildren(internalInstance,forceUpdateIfPending,React);};}



module.exports=exports["default"];
});
__d(519 /* global/window.js */, function(global, require, module, exports) {if(typeof window!=="undefined"){
module.exports=window;}else 
if(typeof global!=="undefined"){
module.exports=global;}else 
if(typeof self!=="undefined"){
module.exports=self;}else 
{
module.exports={};}
});
__d(92 /* EventPluginHub */, function(global, require, module, exports) {'use strict';












var EventPluginRegistry=require(93 /* ./EventPluginRegistry */);
var EventPluginUtils=require(94 /* ./EventPluginUtils */);
var ReactErrorUtils=require(96 /* ./ReactErrorUtils */);

var accumulateInto=require(97 /* ./accumulateInto */);
var forEachAccumulated=require(98 /* ./forEachAccumulated */);
var invariant=require(384 /* fbjs/lib/invariant */);
var warning=require(386 /* fbjs/lib/warning */);




var listenerBank={};





var eventQueue=null;








var executeDispatchesAndRelease=function(event,simulated){
if(event){
EventPluginUtils.executeDispatchesInOrder(event,simulated);

if(!event.isPersistent()){
event.constructor.release(event);}}};



var executeDispatchesAndReleaseSimulated=function(e){
return executeDispatchesAndRelease(e,true);};

var executeDispatchesAndReleaseTopLevel=function(e){
return executeDispatchesAndRelease(e,false);};






var InstanceHandle=null;

function validateInstanceHandle(){
var valid=InstanceHandle&&InstanceHandle.traverseTwoPhase&&InstanceHandle.traverseEnterLeave;
process.env.NODE_ENV!=='production'?warning(valid,'InstanceHandle not injected before use!'):undefined;}
























var EventPluginHub={




injection:{





injectMount:EventPluginUtils.injection.injectMount,





injectInstanceHandle:function(InjectedInstanceHandle){
InstanceHandle=InjectedInstanceHandle;
if(process.env.NODE_ENV!=='production'){
validateInstanceHandle();}},



getInstanceHandle:function(){
if(process.env.NODE_ENV!=='production'){
validateInstanceHandle();}

return InstanceHandle;},






injectEventPluginOrder:EventPluginRegistry.injectEventPluginOrder,




injectEventPluginsByName:EventPluginRegistry.injectEventPluginsByName},



eventNameDispatchConfigs:EventPluginRegistry.eventNameDispatchConfigs,

registrationNameModules:EventPluginRegistry.registrationNameModules,








putListener:function(id,registrationName,listener){
!(typeof listener==='function')?process.env.NODE_ENV!=='production'?invariant(false,'Expected %s listener to be a function, instead got type %s',registrationName,typeof listener):invariant(false):undefined;

var bankForRegistrationName=listenerBank[registrationName]||(listenerBank[registrationName]={});
bankForRegistrationName[id]=listener;

var PluginModule=EventPluginRegistry.registrationNameModules[registrationName];
if(PluginModule&&PluginModule.didPutListener){
PluginModule.didPutListener(id,registrationName,listener);}},








getListener:function(id,registrationName){
var bankForRegistrationName=listenerBank[registrationName];
return bankForRegistrationName&&bankForRegistrationName[id];},








deleteListener:function(id,registrationName){
var PluginModule=EventPluginRegistry.registrationNameModules[registrationName];
if(PluginModule&&PluginModule.willDeleteListener){
PluginModule.willDeleteListener(id,registrationName);}


var bankForRegistrationName=listenerBank[registrationName];

if(bankForRegistrationName){
delete bankForRegistrationName[id];}},








deleteAllListeners:function(id){
for(var registrationName in listenerBank){
if(!listenerBank[registrationName][id]){
continue;}


var PluginModule=EventPluginRegistry.registrationNameModules[registrationName];
if(PluginModule&&PluginModule.willDeleteListener){
PluginModule.willDeleteListener(id,registrationName);}


delete listenerBank[registrationName][id];}},














extractEvents:function(topLevelType,topLevelTarget,topLevelTargetID,nativeEvent,nativeEventTarget){
var events;
var plugins=EventPluginRegistry.plugins;
for(var i=0;i<plugins.length;i++){

var possiblePlugin=plugins[i];
if(possiblePlugin){
var extractedEvents=possiblePlugin.extractEvents(topLevelType,topLevelTarget,topLevelTargetID,nativeEvent,nativeEventTarget);
if(extractedEvents){
events=accumulateInto(events,extractedEvents);}}}



return events;},









enqueueEvents:function(events){
if(events){
eventQueue=accumulateInto(eventQueue,events);}},








processEventQueue:function(simulated){


var processingEventQueue=eventQueue;
eventQueue=null;
if(simulated){
forEachAccumulated(processingEventQueue,executeDispatchesAndReleaseSimulated);}else 
{
forEachAccumulated(processingEventQueue,executeDispatchesAndReleaseTopLevel);}

!!eventQueue?process.env.NODE_ENV!=='production'?invariant(false,'processEventQueue(): Additional events were enqueued while processing '+'an event queue. Support for this has not yet been implemented.'):invariant(false):undefined;

ReactErrorUtils.rethrowCaughtError();},





__purge:function(){
listenerBank={};},


__getListenerBank:function(){
return listenerBank;}};




module.exports=EventPluginHub;
});
__d(93 /* EventPluginRegistry */, function(global, require, module, exports) {'use strict';













var invariant=require(384 /* fbjs/lib/invariant */);




var EventPluginOrder=null;




var namesToPlugins={};






function recomputePluginOrdering(){
if(!EventPluginOrder){

return;}

for(var pluginName in namesToPlugins){
var PluginModule=namesToPlugins[pluginName];
var pluginIndex=EventPluginOrder.indexOf(pluginName);
!(pluginIndex>-1)?process.env.NODE_ENV!=='production'?invariant(false,'EventPluginRegistry: Cannot inject event plugins that do not exist in '+'the plugin ordering, `%s`.',pluginName):invariant(false):undefined;
if(EventPluginRegistry.plugins[pluginIndex]){
continue;}

!PluginModule.extractEvents?process.env.NODE_ENV!=='production'?invariant(false,'EventPluginRegistry: Event plugins must implement an `extractEvents` '+'method, but `%s` does not.',pluginName):invariant(false):undefined;
EventPluginRegistry.plugins[pluginIndex]=PluginModule;
var publishedEvents=PluginModule.eventTypes;
for(var eventName in publishedEvents){
!publishEventForPlugin(publishedEvents[eventName],PluginModule,eventName)?process.env.NODE_ENV!=='production'?invariant(false,'EventPluginRegistry: Failed to publish event `%s` for plugin `%s`.',eventName,pluginName):invariant(false):undefined;}}}












function publishEventForPlugin(dispatchConfig,PluginModule,eventName){
!!EventPluginRegistry.eventNameDispatchConfigs.hasOwnProperty(eventName)?process.env.NODE_ENV!=='production'?invariant(false,'EventPluginHub: More than one plugin attempted to publish the same '+'event name, `%s`.',eventName):invariant(false):undefined;
EventPluginRegistry.eventNameDispatchConfigs[eventName]=dispatchConfig;

var phasedRegistrationNames=dispatchConfig.phasedRegistrationNames;
if(phasedRegistrationNames){
for(var phaseName in phasedRegistrationNames){
if(phasedRegistrationNames.hasOwnProperty(phaseName)){
var phasedRegistrationName=phasedRegistrationNames[phaseName];
publishRegistrationName(phasedRegistrationName,PluginModule,eventName);}}


return true;}else 
if(dispatchConfig.registrationName){
publishRegistrationName(dispatchConfig.registrationName,PluginModule,eventName);
return true;}

return false;}










function publishRegistrationName(registrationName,PluginModule,eventName){
!!EventPluginRegistry.registrationNameModules[registrationName]?process.env.NODE_ENV!=='production'?invariant(false,'EventPluginHub: More than one plugin attempted to publish the same '+'registration name, `%s`.',registrationName):invariant(false):undefined;
EventPluginRegistry.registrationNameModules[registrationName]=PluginModule;
EventPluginRegistry.registrationNameDependencies[registrationName]=PluginModule.eventTypes[eventName].dependencies;}







var EventPluginRegistry={




plugins:[],




eventNameDispatchConfigs:{},




registrationNameModules:{},




registrationNameDependencies:{},










injectEventPluginOrder:function(InjectedEventPluginOrder){
!!EventPluginOrder?process.env.NODE_ENV!=='production'?invariant(false,'EventPluginRegistry: Cannot inject event plugin ordering more than '+'once. You are likely trying to load more than one copy of React.'):invariant(false):undefined;

EventPluginOrder=Array.prototype.slice.call(InjectedEventPluginOrder);
recomputePluginOrdering();},












injectEventPluginsByName:function(injectedNamesToPlugins){
var isOrderingDirty=false;
for(var pluginName in injectedNamesToPlugins){
if(!injectedNamesToPlugins.hasOwnProperty(pluginName)){
continue;}

var PluginModule=injectedNamesToPlugins[pluginName];
if(!namesToPlugins.hasOwnProperty(pluginName)||namesToPlugins[pluginName]!==PluginModule){
!!namesToPlugins[pluginName]?process.env.NODE_ENV!=='production'?invariant(false,'EventPluginRegistry: Cannot inject two different event plugins '+'using the same name, `%s`.',pluginName):invariant(false):undefined;
namesToPlugins[pluginName]=PluginModule;
isOrderingDirty=true;}}


if(isOrderingDirty){
recomputePluginOrdering();}},










getPluginModuleForEvent:function(event){
var dispatchConfig=event.dispatchConfig;
if(dispatchConfig.registrationName){
return EventPluginRegistry.registrationNameModules[dispatchConfig.registrationName]||null;}

for(var phase in dispatchConfig.phasedRegistrationNames){
if(!dispatchConfig.phasedRegistrationNames.hasOwnProperty(phase)){
continue;}

var PluginModule=EventPluginRegistry.registrationNameModules[dispatchConfig.phasedRegistrationNames[phase]];
if(PluginModule){
return PluginModule;}}


return null;},






_resetEventPlugins:function(){
EventPluginOrder=null;
for(var pluginName in namesToPlugins){
if(namesToPlugins.hasOwnProperty(pluginName)){
delete namesToPlugins[pluginName];}}


EventPluginRegistry.plugins.length=0;

var eventNameDispatchConfigs=EventPluginRegistry.eventNameDispatchConfigs;
for(var eventName in eventNameDispatchConfigs){
if(eventNameDispatchConfigs.hasOwnProperty(eventName)){
delete eventNameDispatchConfigs[eventName];}}



var registrationNameModules=EventPluginRegistry.registrationNameModules;
for(var registrationName in registrationNameModules){
if(registrationNameModules.hasOwnProperty(registrationName)){
delete registrationNameModules[registrationName];}}}};






module.exports=EventPluginRegistry;
});
__d(94 /* EventPluginUtils */, function(global, require, module, exports) {'use strict';












var EventConstants=require(95 /* ./EventConstants */);
var ReactErrorUtils=require(96 /* ./ReactErrorUtils */);

var invariant=require(384 /* fbjs/lib/invariant */);
var warning=require(386 /* fbjs/lib/warning */);









var injection={
Mount:null,
injectMount:function(InjectedMount){
injection.Mount=InjectedMount;
if(process.env.NODE_ENV!=='production'){
process.env.NODE_ENV!=='production'?warning(InjectedMount&&InjectedMount.getNode&&InjectedMount.getID,'EventPluginUtils.injection.injectMount(...): Injected Mount '+'module is missing getNode or getID.'):undefined;}}};




var topLevelTypes=EventConstants.topLevelTypes;

function isEndish(topLevelType){
return topLevelType===topLevelTypes.topMouseUp||topLevelType===topLevelTypes.topTouchEnd||topLevelType===topLevelTypes.topTouchCancel;}


function isMoveish(topLevelType){
return topLevelType===topLevelTypes.topMouseMove||topLevelType===topLevelTypes.topTouchMove;}

function isStartish(topLevelType){
return topLevelType===topLevelTypes.topMouseDown||topLevelType===topLevelTypes.topTouchStart;}


var validateEventDispatches;
if(process.env.NODE_ENV!=='production'){
validateEventDispatches=function(event){
var dispatchListeners=event._dispatchListeners;
var dispatchIDs=event._dispatchIDs;

var listenersIsArr=Array.isArray(dispatchListeners);
var idsIsArr=Array.isArray(dispatchIDs);
var IDsLen=idsIsArr?dispatchIDs.length:dispatchIDs?1:0;
var listenersLen=listenersIsArr?dispatchListeners.length:dispatchListeners?1:0;

process.env.NODE_ENV!=='production'?warning(idsIsArr===listenersIsArr&&IDsLen===listenersLen,'EventPluginUtils: Invalid `event`.'):undefined;};}










function executeDispatch(event,simulated,listener,domID){
var type=event.type||'unknown-event';
event.currentTarget=injection.Mount.getNode(domID);
if(simulated){
ReactErrorUtils.invokeGuardedCallbackWithCatch(type,listener,event,domID);}else 
{
ReactErrorUtils.invokeGuardedCallback(type,listener,event,domID);}

event.currentTarget=null;}





function executeDispatchesInOrder(event,simulated){
var dispatchListeners=event._dispatchListeners;
var dispatchIDs=event._dispatchIDs;
if(process.env.NODE_ENV!=='production'){
validateEventDispatches(event);}

if(Array.isArray(dispatchListeners)){
for(var i=0;i<dispatchListeners.length;i++){
if(event.isPropagationStopped()){
break;}


executeDispatch(event,simulated,dispatchListeners[i],dispatchIDs[i]);}}else 

if(dispatchListeners){
executeDispatch(event,simulated,dispatchListeners,dispatchIDs);}

event._dispatchListeners=null;
event._dispatchIDs=null;}









function executeDispatchesInOrderStopAtTrueImpl(event){
var dispatchListeners=event._dispatchListeners;
var dispatchIDs=event._dispatchIDs;
if(process.env.NODE_ENV!=='production'){
validateEventDispatches(event);}

if(Array.isArray(dispatchListeners)){
for(var i=0;i<dispatchListeners.length;i++){
if(event.isPropagationStopped()){
break;}


if(dispatchListeners[i](event,dispatchIDs[i])){
return dispatchIDs[i];}}}else 


if(dispatchListeners){
if(dispatchListeners(event,dispatchIDs)){
return dispatchIDs;}}


return null;}





function executeDispatchesInOrderStopAtTrue(event){
var ret=executeDispatchesInOrderStopAtTrueImpl(event);
event._dispatchIDs=null;
event._dispatchListeners=null;
return ret;}











function executeDirectDispatch(event){
if(process.env.NODE_ENV!=='production'){
validateEventDispatches(event);}

var dispatchListener=event._dispatchListeners;
var dispatchID=event._dispatchIDs;
!!Array.isArray(dispatchListener)?process.env.NODE_ENV!=='production'?invariant(false,'executeDirectDispatch(...): Invalid `event`.'):invariant(false):undefined;
var res=dispatchListener?dispatchListener(event,dispatchID):null;
event._dispatchListeners=null;
event._dispatchIDs=null;
return res;}






function hasDispatches(event){
return !!event._dispatchListeners;}





var EventPluginUtils={
isEndish:isEndish,
isMoveish:isMoveish,
isStartish:isStartish,

executeDirectDispatch:executeDirectDispatch,
executeDispatchesInOrder:executeDispatchesInOrder,
executeDispatchesInOrderStopAtTrue:executeDispatchesInOrderStopAtTrue,
hasDispatches:hasDispatches,

getNode:function(id){
return injection.Mount.getNode(id);},

getID:function(node){
return injection.Mount.getID(node);},


injection:injection};


module.exports=EventPluginUtils;
});
__d(95 /* EventConstants */, function(global, require, module, exports) {'use strict';












var keyMirror=require(388 /* fbjs/lib/keyMirror */);

var PropagationPhases=keyMirror({bubbled:null,captured:null});




var topLevelTypes=keyMirror({
topAbort:null,
topBlur:null,
topCanPlay:null,
topCanPlayThrough:null,
topChange:null,
topClick:null,
topCompositionEnd:null,
topCompositionStart:null,
topCompositionUpdate:null,
topContextMenu:null,
topCopy:null,
topCut:null,
topDoubleClick:null,
topDrag:null,
topDragEnd:null,
topDragEnter:null,
topDragExit:null,
topDragLeave:null,
topDragOver:null,
topDragStart:null,
topDrop:null,
topDurationChange:null,
topEmptied:null,
topEncrypted:null,
topEnded:null,
topError:null,
topFocus:null,
topInput:null,
topKeyDown:null,
topKeyPress:null,
topKeyUp:null,
topLoad:null,
topLoadedData:null,
topLoadedMetadata:null,
topLoadStart:null,
topMouseDown:null,
topMouseMove:null,
topMouseOut:null,
topMouseOver:null,
topMouseUp:null,
topPaste:null,
topPause:null,
topPlay:null,
topPlaying:null,
topProgress:null,
topRateChange:null,
topReset:null,
topScroll:null,
topSeeked:null,
topSeeking:null,
topSelectionChange:null,
topStalled:null,
topSubmit:null,
topSuspend:null,
topTextInput:null,
topTimeUpdate:null,
topTouchCancel:null,
topTouchEnd:null,
topTouchMove:null,
topTouchStart:null,
topVolumeChange:null,
topWaiting:null,
topWheel:null});


var EventConstants={
topLevelTypes:topLevelTypes,
PropagationPhases:PropagationPhases};


module.exports=EventConstants;
});
__d(96 /* ReactErrorUtils */, function(global, require, module, exports) {'use strict';













var caughtError=null;









function invokeGuardedCallback(name,func,a,b){
try{
return func(a,b);}
catch(x){
if(caughtError===null){
caughtError=x;}

return undefined;}}



var ReactErrorUtils={
invokeGuardedCallback:invokeGuardedCallback,





invokeGuardedCallbackWithCatch:invokeGuardedCallback,





rethrowCaughtError:function(){
if(caughtError){
var error=caughtError;
caughtError=null;
throw error;}}};




if(process.env.NODE_ENV!=='production'){




if(typeof window!=='undefined'&&typeof window.dispatchEvent==='function'&&typeof document!=='undefined'&&typeof document.createEvent==='function'){
var fakeNode=document.createElement('react');
ReactErrorUtils.invokeGuardedCallback=function(name,func,a,b){
var boundFunc=func.bind(null,a,b);
var evtType='react-'+name;
fakeNode.addEventListener(evtType,boundFunc,false);
var evt=document.createEvent('Event');
evt.initEvent(evtType,false,false);
fakeNode.dispatchEvent(evt);
fakeNode.removeEventListener(evtType,boundFunc,false);};}}




module.exports=ReactErrorUtils;
});
__d(97 /* accumulateInto */, function(global, require, module, exports) {'use strict';












var invariant=require(384 /* fbjs/lib/invariant */);















function accumulateInto(current,next){
!(next!=null)?process.env.NODE_ENV!=='production'?invariant(false,'accumulateInto(...): Accumulated items must not be null or undefined.'):invariant(false):undefined;
if(current==null){
return next;}




var currentIsArray=Array.isArray(current);
var nextIsArray=Array.isArray(next);

if(currentIsArray&&nextIsArray){
current.push.apply(current,next);
return current;}


if(currentIsArray){
current.push(next);
return current;}


if(nextIsArray){

return [current].concat(next);}


return [current,next];}


module.exports=accumulateInto;
});
__d(98 /* forEachAccumulated */, function(global, require, module, exports) {'use strict';



















var forEachAccumulated=function(arr,cb,scope){
if(Array.isArray(arr)){
arr.forEach(cb,scope);}else 
if(arr){
cb.call(scope,arr);}};



module.exports=forEachAccumulated;
});
__d(99 /* IOSDefaultEventPluginOrder */, function(global, require, module, exports) {'use strict';












var IOSDefaultEventPluginOrder=[
'ResponderEventPlugin',
'IOSNativeBridgeEventPlugin'];


module.exports=IOSDefaultEventPluginOrder;
});
__d(100 /* IOSNativeBridgeEventPlugin */, function(global, require, module, exports) {'use strict';












var EventPropagators=require(101 /* EventPropagators */);
var SyntheticEvent=require(102 /* SyntheticEvent */);
var UIManager=require(10 /* UIManager */);

var merge=require(103 /* merge */);
var warning=require(368 /* fbjs/lib/warning */);

var customBubblingEventTypes=UIManager.customBubblingEventTypes;
var customDirectEventTypes=UIManager.customDirectEventTypes;

var allTypesByEventName={};

for(var bubblingTypeName in customBubblingEventTypes){
allTypesByEventName[bubblingTypeName]=customBubblingEventTypes[bubblingTypeName];}


for(var directTypeName in customDirectEventTypes){
warning(
!customBubblingEventTypes[directTypeName],
'Event cannot be both direct and bubbling: %s',
directTypeName);

allTypesByEventName[directTypeName]=customDirectEventTypes[directTypeName];}


var IOSNativeBridgeEventPlugin={

eventTypes:merge(customBubblingEventTypes,customDirectEventTypes),









extractEvents:function(
topLevelType,
topLevelTarget,
topLevelTargetID,
nativeEvent)
{
var bubbleDispatchConfig=customBubblingEventTypes[topLevelType];
var directDispatchConfig=customDirectEventTypes[topLevelType];
var event=SyntheticEvent.getPooled(
bubbleDispatchConfig||directDispatchConfig,
topLevelTargetID,
nativeEvent);

if(bubbleDispatchConfig){
EventPropagators.accumulateTwoPhaseDispatches(event);}else 
if(directDispatchConfig){
EventPropagators.accumulateDirectDispatches(event);}else 
{
return null;}

return event;}};



module.exports=IOSNativeBridgeEventPlugin;
});
__d(101 /* EventPropagators */, function(global, require, module, exports) {'use strict';












var EventConstants=require(95 /* ./EventConstants */);
var EventPluginHub=require(92 /* ./EventPluginHub */);

var warning=require(386 /* fbjs/lib/warning */);

var accumulateInto=require(97 /* ./accumulateInto */);
var forEachAccumulated=require(98 /* ./forEachAccumulated */);

var PropagationPhases=EventConstants.PropagationPhases;
var getListener=EventPluginHub.getListener;





function listenerAtPhase(id,event,propagationPhase){
var registrationName=event.dispatchConfig.phasedRegistrationNames[propagationPhase];
return getListener(id,registrationName);}








function accumulateDirectionalDispatches(domID,upwards,event){
if(process.env.NODE_ENV!=='production'){
process.env.NODE_ENV!=='production'?warning(domID,'Dispatching id must not be null'):undefined;}

var phase=upwards?PropagationPhases.bubbled:PropagationPhases.captured;
var listener=listenerAtPhase(domID,event,phase);
if(listener){
event._dispatchListeners=accumulateInto(event._dispatchListeners,listener);
event._dispatchIDs=accumulateInto(event._dispatchIDs,domID);}}










function accumulateTwoPhaseDispatchesSingle(event){
if(event&&event.dispatchConfig.phasedRegistrationNames){
EventPluginHub.injection.getInstanceHandle().traverseTwoPhase(event.dispatchMarker,accumulateDirectionalDispatches,event);}}






function accumulateTwoPhaseDispatchesSingleSkipTarget(event){
if(event&&event.dispatchConfig.phasedRegistrationNames){
EventPluginHub.injection.getInstanceHandle().traverseTwoPhaseSkipTarget(event.dispatchMarker,accumulateDirectionalDispatches,event);}}








function accumulateDispatches(id,ignoredDirection,event){
if(event&&event.dispatchConfig.registrationName){
var registrationName=event.dispatchConfig.registrationName;
var listener=getListener(id,registrationName);
if(listener){
event._dispatchListeners=accumulateInto(event._dispatchListeners,listener);
event._dispatchIDs=accumulateInto(event._dispatchIDs,id);}}}









function accumulateDirectDispatchesSingle(event){
if(event&&event.dispatchConfig.registrationName){
accumulateDispatches(event.dispatchMarker,null,event);}}



function accumulateTwoPhaseDispatches(events){
forEachAccumulated(events,accumulateTwoPhaseDispatchesSingle);}


function accumulateTwoPhaseDispatchesSkipTarget(events){
forEachAccumulated(events,accumulateTwoPhaseDispatchesSingleSkipTarget);}


function accumulateEnterLeaveDispatches(leave,enter,fromID,toID){
EventPluginHub.injection.getInstanceHandle().traverseEnterLeave(fromID,toID,accumulateDispatches,leave,enter);}


function accumulateDirectDispatches(events){
forEachAccumulated(events,accumulateDirectDispatchesSingle);}













var EventPropagators={
accumulateTwoPhaseDispatches:accumulateTwoPhaseDispatches,
accumulateTwoPhaseDispatchesSkipTarget:accumulateTwoPhaseDispatchesSkipTarget,
accumulateDirectDispatches:accumulateDirectDispatches,
accumulateEnterLeaveDispatches:accumulateEnterLeaveDispatches};


module.exports=EventPropagators;
});
__d(102 /* SyntheticEvent */, function(global, require, module, exports) {'use strict';













var PooledClass=require(77 /* ./PooledClass */);

var assign=require(43 /* ./Object.assign */);
var emptyFunction=require(379 /* fbjs/lib/emptyFunction */);
var warning=require(386 /* fbjs/lib/warning */);





var EventInterface={
type:null,
target:null,

currentTarget:emptyFunction.thatReturnsNull,
eventPhase:null,
bubbles:null,
cancelable:null,
timeStamp:function(event){
return event.timeStamp||Date.now();},

defaultPrevented:null,
isTrusted:null};



















function SyntheticEvent(dispatchConfig,dispatchMarker,nativeEvent,nativeEventTarget){
this.dispatchConfig=dispatchConfig;
this.dispatchMarker=dispatchMarker;
this.nativeEvent=nativeEvent;

var Interface=this.constructor.Interface;
for(var propName in Interface){
if(!Interface.hasOwnProperty(propName)){
continue;}

var normalize=Interface[propName];
if(normalize){
this[propName]=normalize(nativeEvent);}else 
{
if(propName==='target'){
this.target=nativeEventTarget;}else 
{
this[propName]=nativeEvent[propName];}}}




var defaultPrevented=nativeEvent.defaultPrevented!=null?nativeEvent.defaultPrevented:nativeEvent.returnValue===false;
if(defaultPrevented){
this.isDefaultPrevented=emptyFunction.thatReturnsTrue;}else 
{
this.isDefaultPrevented=emptyFunction.thatReturnsFalse;}

this.isPropagationStopped=emptyFunction.thatReturnsFalse;}


assign(SyntheticEvent.prototype,{

preventDefault:function(){
this.defaultPrevented=true;
var event=this.nativeEvent;
if(process.env.NODE_ENV!=='production'){
process.env.NODE_ENV!=='production'?warning(event,'This synthetic event is reused for performance reasons. If you\'re '+'seeing this, you\'re calling `preventDefault` on a '+'released/nullified synthetic event. This is a no-op. See '+'https://fb.me/react-event-pooling for more information.'):undefined;}

if(!event){
return;}


if(event.preventDefault){
event.preventDefault();}else 
{
event.returnValue=false;}

this.isDefaultPrevented=emptyFunction.thatReturnsTrue;},


stopPropagation:function(){
var event=this.nativeEvent;
if(process.env.NODE_ENV!=='production'){
process.env.NODE_ENV!=='production'?warning(event,'This synthetic event is reused for performance reasons. If you\'re '+'seeing this, you\'re calling `stopPropagation` on a '+'released/nullified synthetic event. This is a no-op. See '+'https://fb.me/react-event-pooling for more information.'):undefined;}

if(!event){
return;}


if(event.stopPropagation){
event.stopPropagation();}else 
{
event.cancelBubble=true;}

this.isPropagationStopped=emptyFunction.thatReturnsTrue;},







persist:function(){
this.isPersistent=emptyFunction.thatReturnsTrue;},







isPersistent:emptyFunction.thatReturnsFalse,




destructor:function(){
var Interface=this.constructor.Interface;
for(var propName in Interface){
this[propName]=null;}

this.dispatchConfig=null;
this.dispatchMarker=null;
this.nativeEvent=null;}});




SyntheticEvent.Interface=EventInterface;







SyntheticEvent.augmentClass=function(Class,Interface){
var Super=this;

var prototype=Object.create(Super.prototype);
assign(prototype,Class.prototype);
Class.prototype=prototype;
Class.prototype.constructor=Class;

Class.Interface=assign({},Super.Interface,Interface);
Class.augmentClass=Super.augmentClass;

PooledClass.addPoolingTo(Class,PooledClass.fourArgumentPooler);};


PooledClass.addPoolingTo(SyntheticEvent,PooledClass.fourArgumentPooler);

module.exports=SyntheticEvent;
});
__d(103 /* merge */, function(global, require, module, exports) {"use strict";
































var mergeInto=require(104 /* mergeInto */);








var merge=function(one,two){
var result={};
mergeInto(result,one);
mergeInto(result,two);
return result;};


module.exports=merge;
});
__d(104 /* mergeInto */, function(global, require, module, exports) {"use strict";

































var mergeHelpers=require(105 /* mergeHelpers */);

var checkMergeObjectArg=mergeHelpers.checkMergeObjectArg;
var checkMergeIntoObjectArg=mergeHelpers.checkMergeIntoObjectArg;







function mergeInto(one,two){
checkMergeIntoObjectArg(one);
if(two!=null){
checkMergeObjectArg(two);
for(var key in two){
if(!two.hasOwnProperty(key)){
continue;}

one[key]=two[key];}}}




module.exports=mergeInto;
});
__d(105 /* mergeHelpers */, function(global, require, module, exports) {"use strict";


































var invariant=require(363 /* fbjs/lib/invariant */);
var keyMirror=require(362 /* fbjs/lib/keyMirror */);





var MAX_MERGE_DEPTH=36;







var isTerminal=function(o){
return typeof o!=='object'||o===null;};


var mergeHelpers={

MAX_MERGE_DEPTH:MAX_MERGE_DEPTH,

isTerminal:isTerminal,







normalizeMergeArg:function(arg){
return arg===undefined||arg===null?{}:arg;},










checkMergeArrayArgs:function(one,two){
invariant(
Array.isArray(one)&&Array.isArray(two),
'Tried to merge arrays, instead got %s and %s.',
one,
two);},







checkMergeObjectArgs:function(one,two){
mergeHelpers.checkMergeObjectArg(one);
mergeHelpers.checkMergeObjectArg(two);},





checkMergeObjectArg:function(arg){
invariant(
!isTerminal(arg)&&!Array.isArray(arg),
'Tried to merge an object, instead got %s.',
arg);},






checkMergeIntoObjectArg:function(arg){
invariant(
(!isTerminal(arg)||typeof arg==='function')&&!Array.isArray(arg),
'Tried to merge into an object, instead got %s.',
arg);},









checkMergeLevel:function(level){
invariant(
level<MAX_MERGE_DEPTH,
'Maximum deep merge depth exceeded. You may be attempting to merge '+
'circular structures in an unsupported way.');},








checkArrayStrategy:function(strategy){
invariant(
strategy===undefined||strategy in mergeHelpers.ArrayStrategies,
'You must provide an array strategy to deep merge functions to '+
'instruct the deep merge how to resolve merging two arrays.');},










ArrayStrategies:keyMirror({
Clobber:true,
IndexByIndex:true})};




module.exports=mergeHelpers;
});
__d(106 /* NodeHandle */, function(global, require, module, exports) {var 




























































NodeHandle={



injection:{
injectImplementation:function(Impl){
NodeHandle._Implementation=Impl;}},



_Implementation:null,





getRootNodeID:function(nodeHandle){
return NodeHandle._Implementation.getRootNodeID(nodeHandle);}};



module.exports=NodeHandle;
});
__d(107 /* ReactDefaultBatchingStrategy */, function(global, require, module, exports) {'use strict';












var ReactUpdates=require(75 /* ./ReactUpdates */);
var Transaction=require(78 /* ./Transaction */);

var assign=require(43 /* ./Object.assign */);
var emptyFunction=require(379 /* fbjs/lib/emptyFunction */);

var RESET_BATCHED_UPDATES={
initialize:emptyFunction,
close:function(){
ReactDefaultBatchingStrategy.isBatchingUpdates=false;}};



var FLUSH_BATCHED_UPDATES={
initialize:emptyFunction,
close:ReactUpdates.flushBatchedUpdates.bind(ReactUpdates)};


var TRANSACTION_WRAPPERS=[FLUSH_BATCHED_UPDATES,RESET_BATCHED_UPDATES];

function ReactDefaultBatchingStrategyTransaction(){
this.reinitializeTransaction();}


assign(ReactDefaultBatchingStrategyTransaction.prototype,Transaction.Mixin,{
getTransactionWrappers:function(){
return TRANSACTION_WRAPPERS;}});



var transaction=new ReactDefaultBatchingStrategyTransaction();

var ReactDefaultBatchingStrategy={
isBatchingUpdates:false,





batchedUpdates:function(callback,a,b,c,d,e){
var alreadyBatchingUpdates=ReactDefaultBatchingStrategy.isBatchingUpdates;

ReactDefaultBatchingStrategy.isBatchingUpdates=true;


if(alreadyBatchingUpdates){
callback(a,b,c,d,e);}else 
{
transaction.perform(callback,null,a,b,c,d,e);}}};




module.exports=ReactDefaultBatchingStrategy;
});
__d(108 /* ReactNativeComponentEnvironment */, function(global, require, module, exports) {'use strict';












var ReactNativeDOMIDOperations=require(109 /* ReactNativeDOMIDOperations */);
var ReactNativeReconcileTransaction=require(111 /* ReactNativeReconcileTransaction */);

var ReactNativeComponentEnvironment={

processChildrenUpdates:ReactNativeDOMIDOperations.dangerouslyProcessChildrenUpdates,

replaceNodeWithMarkupByID:ReactNativeDOMIDOperations.dangerouslyReplaceNodeWithMarkupByID,






unmountIDFromEnvironment:function(){},






clearNode:function(){},



ReactReconcileTransaction:ReactNativeReconcileTransaction};


module.exports=ReactNativeComponentEnvironment;
});
__d(109 /* ReactNativeDOMIDOperations */, function(global, require, module, exports) {'use strict';












var ReactNativeTagHandles=require(40 /* ReactNativeTagHandles */);
var ReactMultiChildUpdateTypes=require(110 /* ReactMultiChildUpdateTypes */);
var ReactPerf=require(15 /* ReactPerf */);
var UIManager=require(10 /* UIManager */);













var dangerouslyProcessChildrenUpdates=function(childrenUpdates,markupList){
if(!childrenUpdates.length){
return;}

var byContainerTag={};


for(var i=0;i<childrenUpdates.length;i++){
var update=childrenUpdates[i];
var containerTag=ReactNativeTagHandles.mostRecentMountedNodeHandleForRootNodeID(update.parentID);
var updates=byContainerTag[containerTag]||(byContainerTag[containerTag]={});
if(update.type===ReactMultiChildUpdateTypes.MOVE_EXISTING){
(updates.moveFromIndices||(updates.moveFromIndices=[])).push(update.fromIndex);
(updates.moveToIndices||(updates.moveToIndices=[])).push(update.toIndex);}else 
if(update.type===ReactMultiChildUpdateTypes.REMOVE_NODE){
(updates.removeAtIndices||(updates.removeAtIndices=[])).push(update.fromIndex);}else 
if(update.type===ReactMultiChildUpdateTypes.INSERT_MARKUP){
var mountImage=markupList[update.markupIndex];
var tag=mountImage.tag;
var rootNodeID=mountImage.rootNodeID;
ReactNativeTagHandles.associateRootNodeIDWithMountedNodeHandle(rootNodeID,tag);
(updates.addAtIndices||(updates.addAtIndices=[])).push(update.toIndex);
(updates.addChildTags||(updates.addChildTags=[])).push(tag);}}





for(var updateParentTagString in byContainerTag){
var updateParentTagNumber=+updateParentTagString;
var childUpdatesToSend=byContainerTag[updateParentTagNumber];
UIManager.manageChildren(
updateParentTagNumber,
childUpdatesToSend.moveFromIndices,
childUpdatesToSend.moveToIndices,
childUpdatesToSend.addChildTags,
childUpdatesToSend.addAtIndices,
childUpdatesToSend.removeAtIndices);}};








var ReactNativeDOMIDOperations={
dangerouslyProcessChildrenUpdates:ReactPerf.measure(

'ReactDOMIDOperations',
'dangerouslyProcessChildrenUpdates',
dangerouslyProcessChildrenUpdates),








dangerouslyReplaceNodeWithMarkupByID:ReactPerf.measure(
'ReactDOMIDOperations',
'dangerouslyReplaceNodeWithMarkupByID',
function(id,mountImage){
var oldTag=ReactNativeTagHandles.mostRecentMountedNodeHandleForRootNodeID(id);
UIManager.replaceExistingNonRootView(oldTag,mountImage.tag);
ReactNativeTagHandles.associateRootNodeIDWithMountedNodeHandle(id,mountImage.tag);})};




module.exports=ReactNativeDOMIDOperations;
});
__d(110 /* ReactMultiChildUpdateTypes */, function(global, require, module, exports) {'use strict';












var keyMirror=require(388 /* fbjs/lib/keyMirror */);









var ReactMultiChildUpdateTypes=keyMirror({
INSERT_MARKUP:null,
MOVE_EXISTING:null,
REMOVE_NODE:null,
SET_MARKUP:null,
TEXT_CONTENT:null});


module.exports=ReactMultiChildUpdateTypes;
});
__d(111 /* ReactNativeReconcileTransaction */, function(global, require, module, exports) {'use strict';












var CallbackQueue=require(76 /* CallbackQueue */);
var PooledClass=require(77 /* PooledClass */);
var Transaction=require(78 /* Transaction */);





var ON_DOM_READY_QUEUEING={



initialize:function(){
this.reactMountReady.reset();},





close:function(){
this.reactMountReady.notifyAll();}};








var TRANSACTION_WRAPPERS=[ON_DOM_READY_QUEUEING];















function ReactNativeReconcileTransaction(){
this.reinitializeTransaction();
this.reactMountReady=CallbackQueue.getPooled(null);}


var Mixin={







getTransactionWrappers:function(){
return TRANSACTION_WRAPPERS;},






getReactMountReady:function(){
return this.reactMountReady;},






destructor:function(){
CallbackQueue.release(this.reactMountReady);
this.reactMountReady=null;}};



babelHelpers.extends(
ReactNativeReconcileTransaction.prototype,
Transaction.Mixin,
ReactNativeReconcileTransaction,
Mixin);


PooledClass.addPoolingTo(ReactNativeReconcileTransaction);

module.exports=ReactNativeReconcileTransaction;
});
__d(112 /* ReactNativeGlobalInteractionHandler */, function(global, require, module, exports) {'use strict';












var InteractionManager=require(113 /* InteractionManager */);



var interactionHandle=null;

var ReactNativeGlobalInteractionHandler={
onChange:function(numberActiveTouches){
if(numberActiveTouches===0){
if(interactionHandle){
InteractionManager.clearInteractionHandle(interactionHandle);
interactionHandle=null;}}else 

if(!interactionHandle){
interactionHandle=InteractionManager.createInteractionHandle();}}};




module.exports=ReactNativeGlobalInteractionHandler;
});
__d(113 /* InteractionManager */, function(global, require, module, exports) {'use strict';












var BatchedBridge=require(12 /* BatchedBridge */);
var EventEmitter=require(23 /* EventEmitter */);
var Set=require(66 /* Set */);
var TaskQueue=require(114 /* TaskQueue */);

var invariant=require(363 /* fbjs/lib/invariant */);
var keyMirror=require(362 /* fbjs/lib/keyMirror */);
var setImmediate=require(115 /* setImmediate */);




var _emitter=new EventEmitter();


















































var InteractionManager={
Events:keyMirror({
interactionStart:true,
interactionComplete:true}),





runAfterInteractions:function(task){
return new Promise(function(resolve){
_scheduleUpdate();
if(task){
_taskQueue.enqueue(task);}

var name=task&&task.name||'?';
_taskQueue.enqueue({run:resolve,name:'resolve '+name});});},






createInteractionHandle:function(){
_scheduleUpdate();
var handle=++_inc;
_addInteractionSet.add(handle);
return handle;},





clearInteractionHandle:function(handle){
invariant(
!!handle,
'Must provide a handle to clear.');

_scheduleUpdate();
_addInteractionSet.delete(handle);
_deleteInteractionSet.add(handle);},


addListener:_emitter.addListener.bind(_emitter),






setDeadline:function(deadline){
_deadline=deadline;}};



var _interactionSet=new Set();
var _addInteractionSet=new Set();
var _deleteInteractionSet=new Set();
var _taskQueue=new TaskQueue({onMoreTasks:_scheduleUpdate});
var _nextUpdateHandle=0;
var _inc=0;
var _deadline=-1;




function _scheduleUpdate(){
if(!_nextUpdateHandle){
if(_deadline>0){
_nextUpdateHandle=setTimeout(_processUpdate,0);}else 
{
_nextUpdateHandle=setImmediate(_processUpdate);}}}







function _processUpdate(){
_nextUpdateHandle=0;

var interactionCount=_interactionSet.size;
_addInteractionSet.forEach(function(handle){return (
_interactionSet.add(handle));});

_deleteInteractionSet.forEach(function(handle){return (
_interactionSet.delete(handle));});

var nextInteractionCount=_interactionSet.size;

if(interactionCount!==0&&nextInteractionCount===0){

_emitter.emit(InteractionManager.Events.interactionComplete);}else 
if(interactionCount===0&&nextInteractionCount!==0){

_emitter.emit(InteractionManager.Events.interactionStart);}



if(nextInteractionCount===0){
while(_taskQueue.hasTasksToProcess()){
_taskQueue.processNext();
if(_deadline>0&&
BatchedBridge.getEventLoopRunningTime()>=_deadline){

_scheduleUpdate();
break;}}}



_addInteractionSet.clear();
_deleteInteractionSet.clear();}


module.exports=InteractionManager;
});
__d(114 /* TaskQueue */, function(global, require, module, exports) {'use strict';












var ErrorUtils=require(16 /* ErrorUtils */);

var invariant=require(363 /* fbjs/lib/invariant */);var 



























TaskQueue=function(){







function TaskQueue(_ref){var onMoreTasks=_ref.onMoreTasks;babelHelpers.classCallCheck(this,TaskQueue);
this._onMoreTasks=onMoreTasks;
this._queueStack=[{tasks:[],popable:false}];}babelHelpers.createClass(TaskQueue,[{key:'enqueue',value:function enqueue(







task){
this._getCurrentQueue().push(task);}},{key:'hasTasksToProcess',value:function hasTasksToProcess()












{
return this._getCurrentQueue().length>0;}},{key:'processNext',value:function processNext()





{
var queue=this._getCurrentQueue();
if(queue.length){
var task=queue.shift();
try{
if(task.gen){
this._genPromise(task);}else 
if(task.run){
task.run();}else 
{
invariant(
typeof task==='function',
'Expected Function, SimpleTask, or PromiseTask, but got: '+
JSON.stringify(task));

task();}}

catch(e){
e.message='TaskQueue: Error with task'+(task.name||' ')+': '+
e.message;
ErrorUtils.reportError(e);}}}},{key:'_getCurrentQueue',value:function _getCurrentQueue()







{
var stackIdx=this._queueStack.length-1;
var queue=this._queueStack[stackIdx];
if(queue.popable&&
queue.tasks.length===0&&
this._queueStack.length>1){
this._queueStack.pop();
return this._getCurrentQueue();}else 
{
return queue.tasks;}}},{key:'_genPromise',value:function _genPromise(



task){var _this=this;




this._queueStack.push({tasks:[],popable:false});
var stackIdx=this._queueStack.length-1;
ErrorUtils.applyWithGuard(task.gen).
then(function(){
_this._queueStack[stackIdx].popable=true;
_this.hasTasksToProcess()&&_this._onMoreTasks();}).

catch(function(ex){
console.warn(
'TaskQueue: Error resolving Promise in task '+task.name,
ex);

throw ex;});}}]);return TaskQueue;}();





module.exports=TaskQueue;
});
__d(115 /* setImmediate */, function(global, require, module, exports) {module.
















exports=global.setImmediate||
require(116 /* ImmediateImplementation */).setImmediate;
});
__d(116 /* ImmediateImplementation */, function(global, require, module, exports) {/**
 * @generated SignedSource<<57d0446bbd1186485d372efe6b323dca>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright (c) 2012 Barnesandnoble.com, llc, Donavon West, and Domenic
 * Denicola
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @preserve-header
 * @providesModule ImmediateImplementation
 */

(function(global,undefined){
"use strict";

var nextHandle=1;
var tasksByHandle={};
var queueHead={};
var queueTail=queueHead;
var currentlyRunningATask=false;
var doc=global.document;
var setImmediate;

function addFromSetImmediateArguments(args){
var handler=args[0];
args=Array.prototype.slice.call(args,1);
tasksByHandle[nextHandle]=function(){
handler.apply(undefined,args);};

queueTail=queueTail.next={handle:nextHandle++};
return queueTail.handle;}


function flushQueue(){
var next,task;
while(!currentlyRunningATask&&(next=queueHead.next)){
queueHead=next;
if(task=tasksByHandle[next.handle]){
currentlyRunningATask=true;
try{
task();
currentlyRunningATask=false;}finally 
{
clearImmediate(next.handle);
if(currentlyRunningATask){
currentlyRunningATask=false;






if(queueHead.next){
setImmediate(flushQueue);}}}}}}







function clearImmediate(handle){
delete tasksByHandle[handle];}


function canUsePostMessage(){


if(global.postMessage&&!global.importScripts){
var postMessageIsAsynchronous=true;

var onMessage=function(){
postMessageIsAsynchronous=false;
if(global.removeEventListener){
global.removeEventListener("message",onMessage,false);}else 
{
global.detachEvent("onmessage",onMessage);}};



if(global.addEventListener){
global.addEventListener("message",onMessage,false);}else 
if(global.attachEvent){
global.attachEvent("onmessage",onMessage);}else 
{
return false;}


global.postMessage("","*");
return postMessageIsAsynchronous;}}



function installPostMessageImplementation(){


var messagePrefix="setImmediate$"+Math.random()+"$";
var onGlobalMessage=function(event){
if(event.source===global&&
typeof event.data==="string"&&
event.data.indexOf(messagePrefix)===0){
flushQueue();}};



if(global.addEventListener){
global.addEventListener("message",onGlobalMessage,false);}else 
{
global.attachEvent("onmessage",onGlobalMessage);}


setImmediate=function(){
var handle=addFromSetImmediateArguments(arguments);
global.postMessage(messagePrefix+handle,"*");
return handle;};}



function installMessageChannelImplementation(){
var channel=new MessageChannel();
channel.port1.onmessage=flushQueue;
setImmediate=function(){
var handle=addFromSetImmediateArguments(arguments);
channel.port2.postMessage(handle);
return handle;};}



function installReadyStateChangeImplementation(){
var html=doc.documentElement;
setImmediate=function(){
var handle=addFromSetImmediateArguments(arguments);


var script=doc.createElement("script");
script.onreadystatechange=function(){
script.onreadystatechange=null;
html.removeChild(script);
script=null;
flushQueue();};

html.appendChild(script);
return handle;};}



function installSetTimeoutImplementation(){
setImmediate=function(){
setTimeout(flushQueue,0);
return addFromSetImmediateArguments(arguments);};}



if(canUsePostMessage()){

installPostMessageImplementation();}else 

if(global.MessageChannel){

installMessageChannelImplementation();}else 

if(doc&&"onreadystatechange" in doc.createElement("script")){

installReadyStateChangeImplementation();}else 

{

installSetTimeoutImplementation();}


exports.setImmediate=setImmediate;
exports.clearImmediate=clearImmediate;})(
Function("return this")());
});
__d(117 /* ReactNativeGlobalResponderHandler */, function(global, require, module, exports) {'use strict';












var ReactNativeTagHandles=require(40 /* ReactNativeTagHandles */);
var UIManager=require(10 /* UIManager */);

var ReactNativeGlobalResponderHandler={
onChange:function(from,to,blockNativeResponder){
if(to!==null){
UIManager.setJSResponder(
ReactNativeTagHandles.mostRecentMountedNodeHandleForRootNodeID(to),
blockNativeResponder);}else 

{
UIManager.clearJSResponder();}}};




module.exports=ReactNativeGlobalResponderHandler;
});
__d(118 /* ResponderEventPlugin */, function(global, require, module, exports) {'use strict';












var EventConstants=require(95 /* ./EventConstants */);
var EventPluginUtils=require(94 /* ./EventPluginUtils */);
var EventPropagators=require(101 /* ./EventPropagators */);
var ReactInstanceHandles=require(68 /* ./ReactInstanceHandles */);
var ResponderSyntheticEvent=require(119 /* ./ResponderSyntheticEvent */);
var ResponderTouchHistoryStore=require(120 /* ./ResponderTouchHistoryStore */);

var accumulate=require(121 /* ./accumulate */);
var invariant=require(384 /* fbjs/lib/invariant */);
var keyOf=require(520 /* fbjs/lib/keyOf */);

var isStartish=EventPluginUtils.isStartish;
var isMoveish=EventPluginUtils.isMoveish;
var isEndish=EventPluginUtils.isEndish;
var executeDirectDispatch=EventPluginUtils.executeDirectDispatch;
var hasDispatches=EventPluginUtils.hasDispatches;
var executeDispatchesInOrderStopAtTrue=EventPluginUtils.executeDispatchesInOrderStopAtTrue;





var responderID=null;





var trackedTouchCount=0;




var previousActiveTouches=0;

var changeResponder=function(nextResponderID,blockNativeResponder){
var oldResponderID=responderID;
responderID=nextResponderID;
if(ResponderEventPlugin.GlobalResponderHandler!==null){
ResponderEventPlugin.GlobalResponderHandler.onChange(oldResponderID,nextResponderID,blockNativeResponder);}};



var eventTypes={




startShouldSetResponder:{
phasedRegistrationNames:{
bubbled:keyOf({onStartShouldSetResponder:null}),
captured:keyOf({onStartShouldSetResponderCapture:null})}},












scrollShouldSetResponder:{
phasedRegistrationNames:{
bubbled:keyOf({onScrollShouldSetResponder:null}),
captured:keyOf({onScrollShouldSetResponderCapture:null})}},










selectionChangeShouldSetResponder:{
phasedRegistrationNames:{
bubbled:keyOf({onSelectionChangeShouldSetResponder:null}),
captured:keyOf({onSelectionChangeShouldSetResponderCapture:null})}},







moveShouldSetResponder:{
phasedRegistrationNames:{
bubbled:keyOf({onMoveShouldSetResponder:null}),
captured:keyOf({onMoveShouldSetResponderCapture:null})}},






responderStart:{registrationName:keyOf({onResponderStart:null})},
responderMove:{registrationName:keyOf({onResponderMove:null})},
responderEnd:{registrationName:keyOf({onResponderEnd:null})},
responderRelease:{registrationName:keyOf({onResponderRelease:null})},
responderTerminationRequest:{
registrationName:keyOf({onResponderTerminationRequest:null})},

responderGrant:{registrationName:keyOf({onResponderGrant:null})},
responderReject:{registrationName:keyOf({onResponderReject:null})},
responderTerminate:{registrationName:keyOf({onResponderTerminate:null})}};




































































































































































































function setResponderAndExtractTransfer(topLevelType,topLevelTargetID,nativeEvent,nativeEventTarget){
var shouldSetEventType=isStartish(topLevelType)?eventTypes.startShouldSetResponder:isMoveish(topLevelType)?eventTypes.moveShouldSetResponder:topLevelType===EventConstants.topLevelTypes.topSelectionChange?eventTypes.selectionChangeShouldSetResponder:eventTypes.scrollShouldSetResponder;


var bubbleShouldSetFrom=!responderID?topLevelTargetID:ReactInstanceHandles.getFirstCommonAncestorID(responderID,topLevelTargetID);





var skipOverBubbleShouldSetFrom=bubbleShouldSetFrom===responderID;
var shouldSetEvent=ResponderSyntheticEvent.getPooled(shouldSetEventType,bubbleShouldSetFrom,nativeEvent,nativeEventTarget);
shouldSetEvent.touchHistory=ResponderTouchHistoryStore.touchHistory;
if(skipOverBubbleShouldSetFrom){
EventPropagators.accumulateTwoPhaseDispatchesSkipTarget(shouldSetEvent);}else 
{
EventPropagators.accumulateTwoPhaseDispatches(shouldSetEvent);}

var wantsResponderID=executeDispatchesInOrderStopAtTrue(shouldSetEvent);
if(!shouldSetEvent.isPersistent()){
shouldSetEvent.constructor.release(shouldSetEvent);}


if(!wantsResponderID||wantsResponderID===responderID){
return null;}

var extracted;
var grantEvent=ResponderSyntheticEvent.getPooled(eventTypes.responderGrant,wantsResponderID,nativeEvent,nativeEventTarget);
grantEvent.touchHistory=ResponderTouchHistoryStore.touchHistory;

EventPropagators.accumulateDirectDispatches(grantEvent);
var blockNativeResponder=executeDirectDispatch(grantEvent)===true;
if(responderID){

var terminationRequestEvent=ResponderSyntheticEvent.getPooled(eventTypes.responderTerminationRequest,responderID,nativeEvent,nativeEventTarget);
terminationRequestEvent.touchHistory=ResponderTouchHistoryStore.touchHistory;
EventPropagators.accumulateDirectDispatches(terminationRequestEvent);
var shouldSwitch=!hasDispatches(terminationRequestEvent)||executeDirectDispatch(terminationRequestEvent);
if(!terminationRequestEvent.isPersistent()){
terminationRequestEvent.constructor.release(terminationRequestEvent);}


if(shouldSwitch){
var terminateType=eventTypes.responderTerminate;
var terminateEvent=ResponderSyntheticEvent.getPooled(terminateType,responderID,nativeEvent,nativeEventTarget);
terminateEvent.touchHistory=ResponderTouchHistoryStore.touchHistory;
EventPropagators.accumulateDirectDispatches(terminateEvent);
extracted=accumulate(extracted,[grantEvent,terminateEvent]);
changeResponder(wantsResponderID,blockNativeResponder);}else 
{
var rejectEvent=ResponderSyntheticEvent.getPooled(eventTypes.responderReject,wantsResponderID,nativeEvent,nativeEventTarget);
rejectEvent.touchHistory=ResponderTouchHistoryStore.touchHistory;
EventPropagators.accumulateDirectDispatches(rejectEvent);
extracted=accumulate(extracted,rejectEvent);}}else 

{
extracted=accumulate(extracted,grantEvent);
changeResponder(wantsResponderID,blockNativeResponder);}

return extracted;}










function canTriggerTransfer(topLevelType,topLevelTargetID,nativeEvent){
return topLevelTargetID&&(



topLevelType===EventConstants.topLevelTypes.topScroll&&!nativeEvent.responderIgnoreScroll||trackedTouchCount>0&&topLevelType===EventConstants.topLevelTypes.topSelectionChange||isStartish(topLevelType)||isMoveish(topLevelType));}









function noResponderTouches(nativeEvent){
var touches=nativeEvent.touches;
if(!touches||touches.length===0){
return true;}

for(var i=0;i<touches.length;i++){
var activeTouch=touches[i];
var target=activeTouch.target;
if(target!==null&&target!==undefined&&target!==0){

var isAncestor=ReactInstanceHandles.isAncestorIDOf(responderID,EventPluginUtils.getID(target));
if(isAncestor){
return false;}}}



return true;}


var ResponderEventPlugin={

getResponderID:function(){
return responderID;},


eventTypes:eventTypes,













extractEvents:function(topLevelType,topLevelTarget,topLevelTargetID,nativeEvent,nativeEventTarget){
if(isStartish(topLevelType)){
trackedTouchCount+=1;}else 
if(isEndish(topLevelType)){
trackedTouchCount-=1;
!(trackedTouchCount>=0)?process.env.NODE_ENV!=='production'?invariant(false,'Ended a touch event which was not counted in trackedTouchCount.'):invariant(false):undefined;}


ResponderTouchHistoryStore.recordTouchTrack(topLevelType,nativeEvent,nativeEventTarget);

var extracted=canTriggerTransfer(topLevelType,topLevelTargetID,nativeEvent)?setResponderAndExtractTransfer(topLevelType,topLevelTargetID,nativeEvent,nativeEventTarget):null;










var isResponderTouchStart=responderID&&isStartish(topLevelType);
var isResponderTouchMove=responderID&&isMoveish(topLevelType);
var isResponderTouchEnd=responderID&&isEndish(topLevelType);
var incrementalTouch=isResponderTouchStart?eventTypes.responderStart:isResponderTouchMove?eventTypes.responderMove:isResponderTouchEnd?eventTypes.responderEnd:null;

if(incrementalTouch){
var gesture=ResponderSyntheticEvent.getPooled(incrementalTouch,responderID,nativeEvent,nativeEventTarget);
gesture.touchHistory=ResponderTouchHistoryStore.touchHistory;
EventPropagators.accumulateDirectDispatches(gesture);
extracted=accumulate(extracted,gesture);}


var isResponderTerminate=responderID&&topLevelType===EventConstants.topLevelTypes.topTouchCancel;
var isResponderRelease=responderID&&!isResponderTerminate&&isEndish(topLevelType)&&noResponderTouches(nativeEvent);
var finalTouch=isResponderTerminate?eventTypes.responderTerminate:isResponderRelease?eventTypes.responderRelease:null;
if(finalTouch){
var finalEvent=ResponderSyntheticEvent.getPooled(finalTouch,responderID,nativeEvent,nativeEventTarget);
finalEvent.touchHistory=ResponderTouchHistoryStore.touchHistory;
EventPropagators.accumulateDirectDispatches(finalEvent);
extracted=accumulate(extracted,finalEvent);
changeResponder(null);}


var numberActiveTouches=ResponderTouchHistoryStore.touchHistory.numberActiveTouches;
if(ResponderEventPlugin.GlobalInteractionHandler&&numberActiveTouches!==previousActiveTouches){
ResponderEventPlugin.GlobalInteractionHandler.onChange(numberActiveTouches);}

previousActiveTouches=numberActiveTouches;

return extracted;},


GlobalResponderHandler:null,
GlobalInteractionHandler:null,

injection:{





injectGlobalResponderHandler:function(GlobalResponderHandler){
ResponderEventPlugin.GlobalResponderHandler=GlobalResponderHandler;},






injectGlobalInteractionHandler:function(GlobalInteractionHandler){
ResponderEventPlugin.GlobalInteractionHandler=GlobalInteractionHandler;}}};




module.exports=ResponderEventPlugin;
});
__d(119 /* ResponderSyntheticEvent */, function(global, require, module, exports) {'use strict';













var SyntheticEvent=require(102 /* ./SyntheticEvent */);






var ResponderEventInterface={
touchHistory:function(nativeEvent){
return null;}};









function ResponderSyntheticEvent(dispatchConfig,dispatchMarker,nativeEvent,nativeEventTarget){
SyntheticEvent.call(this,dispatchConfig,dispatchMarker,nativeEvent,nativeEventTarget);}


SyntheticEvent.augmentClass(ResponderSyntheticEvent,ResponderEventInterface);

module.exports=ResponderSyntheticEvent;
});
__d(120 /* ResponderTouchHistoryStore */, function(global, require, module, exports) {'use strict';












var EventPluginUtils=require(94 /* ./EventPluginUtils */);

var invariant=require(384 /* fbjs/lib/invariant */);

var isMoveish=EventPluginUtils.isMoveish;
var isStartish=EventPluginUtils.isStartish;
var isEndish=EventPluginUtils.isEndish;

var MAX_TOUCH_BANK=20;
















var touchHistory={
touchBank:[],
numberActiveTouches:0,



indexOfSingleActiveTouch:-1,
mostRecentTimeStamp:0};


var timestampForTouch=function(touch){



return touch.timeStamp||touch.timestamp;};







var initializeTouchData=function(touch){
return {
touchActive:true,
startTimeStamp:timestampForTouch(touch),
startPageX:touch.pageX,
startPageY:touch.pageY,
currentPageX:touch.pageX,
currentPageY:touch.pageY,
currentTimeStamp:timestampForTouch(touch),
previousPageX:touch.pageX,
previousPageY:touch.pageY,
previousTimeStamp:timestampForTouch(touch)};};



var reinitializeTouchTrack=function(touchTrack,touch){
touchTrack.touchActive=true;
touchTrack.startTimeStamp=timestampForTouch(touch);
touchTrack.startPageX=touch.pageX;
touchTrack.startPageY=touch.pageY;
touchTrack.currentPageX=touch.pageX;
touchTrack.currentPageY=touch.pageY;
touchTrack.currentTimeStamp=timestampForTouch(touch);
touchTrack.previousPageX=touch.pageX;
touchTrack.previousPageY=touch.pageY;
touchTrack.previousTimeStamp=timestampForTouch(touch);};


var validateTouch=function(touch){
var identifier=touch.identifier;
!(identifier!=null)?process.env.NODE_ENV!=='production'?invariant(false,'Touch object is missing identifier'):invariant(false):undefined;
if(identifier>MAX_TOUCH_BANK){
console.warn('Touch identifier '+identifier+' is greater than maximum '+'supported '+MAX_TOUCH_BANK+' which causes performance issues '+'backfilling array locations for all of the indices.');}};



var recordStartTouchData=function(touch){
var touchBank=touchHistory.touchBank;
var identifier=touch.identifier;
var touchTrack=touchBank[identifier];
if(process.env.NODE_ENV!=='production'){
validateTouch(touch);}

if(touchTrack){
reinitializeTouchTrack(touchTrack,touch);}else 
{
touchBank[touch.identifier]=initializeTouchData(touch);}

touchHistory.mostRecentTimeStamp=timestampForTouch(touch);};


var recordMoveTouchData=function(touch){
var touchBank=touchHistory.touchBank;
var touchTrack=touchBank[touch.identifier];
if(process.env.NODE_ENV!=='production'){
validateTouch(touch);
!touchTrack?process.env.NODE_ENV!=='production'?invariant(false,'Touch data should have been recorded on start'):invariant(false):undefined;}

touchTrack.touchActive=true;
touchTrack.previousPageX=touchTrack.currentPageX;
touchTrack.previousPageY=touchTrack.currentPageY;
touchTrack.previousTimeStamp=touchTrack.currentTimeStamp;
touchTrack.currentPageX=touch.pageX;
touchTrack.currentPageY=touch.pageY;
touchTrack.currentTimeStamp=timestampForTouch(touch);
touchHistory.mostRecentTimeStamp=timestampForTouch(touch);};


var recordEndTouchData=function(touch){
var touchBank=touchHistory.touchBank;
var touchTrack=touchBank[touch.identifier];
if(process.env.NODE_ENV!=='production'){
validateTouch(touch);
!touchTrack?process.env.NODE_ENV!=='production'?invariant(false,'Touch data should have been recorded on start'):invariant(false):undefined;}

touchTrack.previousPageX=touchTrack.currentPageX;
touchTrack.previousPageY=touchTrack.currentPageY;
touchTrack.previousTimeStamp=touchTrack.currentTimeStamp;
touchTrack.currentPageX=touch.pageX;
touchTrack.currentPageY=touch.pageY;
touchTrack.currentTimeStamp=timestampForTouch(touch);
touchTrack.touchActive=false;
touchHistory.mostRecentTimeStamp=timestampForTouch(touch);};


var ResponderTouchHistoryStore={
recordTouchTrack:function(topLevelType,nativeEvent){
var touchBank=touchHistory.touchBank;
if(isMoveish(topLevelType)){
nativeEvent.changedTouches.forEach(recordMoveTouchData);}else 
if(isStartish(topLevelType)){
nativeEvent.changedTouches.forEach(recordStartTouchData);
touchHistory.numberActiveTouches=nativeEvent.touches.length;
if(touchHistory.numberActiveTouches===1){
touchHistory.indexOfSingleActiveTouch=nativeEvent.touches[0].identifier;}}else 

if(isEndish(topLevelType)){
nativeEvent.changedTouches.forEach(recordEndTouchData);
touchHistory.numberActiveTouches=nativeEvent.touches.length;
if(touchHistory.numberActiveTouches===1){
for(var i=0;i<touchBank.length;i++){
var touchTrackToCheck=touchBank[i];
if(touchTrackToCheck!=null&&touchTrackToCheck.touchActive){
touchHistory.indexOfSingleActiveTouch=i;
break;}}


if(process.env.NODE_ENV!=='production'){
var activeTouchData=touchBank[touchHistory.indexOfSingleActiveTouch];
var foundActive=activeTouchData!=null&&!!activeTouchData.touchActive;
!foundActive?process.env.NODE_ENV!=='production'?invariant(false,'Cannot find single active touch'):invariant(false):undefined;}}}},





touchHistory:touchHistory};


module.exports=ResponderTouchHistoryStore;
});
__d(121 /* accumulate */, function(global, require, module, exports) {'use strict';












var invariant=require(384 /* fbjs/lib/invariant */);








function accumulate(current,next){
!(next!=null)?process.env.NODE_ENV!=='production'?invariant(false,'accumulate(...): Accumulated items must be not be null or undefined.'):invariant(false):undefined;
if(current==null){
return next;}else 
{


var currentIsArray=Array.isArray(current);
var nextIsArray=Array.isArray(next);
if(currentIsArray){
return current.concat(next);}else 
{
if(nextIsArray){
return [current].concat(next);}else 
{
return [current,next];}}}}





module.exports=accumulate;
});
__d(520 /* fbjs/lib/keyOf.js */, function(global, require, module, exports) {"use strict";






















var keyOf=function(oneKeyObj){
var key;
for(key in oneKeyObj){
if(!oneKeyObj.hasOwnProperty(key)){
continue;}

return key;}

return null;};


module.exports=keyOf;
});
__d(122 /* UniversalWorkerNodeHandle */, function(global, require, module, exports) {var 



ReactNativeTagHandles=require(40 /* ReactNativeTagHandles */);

var invariant=require(363 /* fbjs/lib/invariant */);

var UniversalWorkerNodeHandle={
getRootNodeID:function(nodeHandle){
invariant(
nodeHandle!==undefined&&nodeHandle!==null&&nodeHandle!==0,
'No node handle defined');

return ReactNativeTagHandles.tagToRootNodeID[nodeHandle];}};



module.exports=UniversalWorkerNodeHandle;
});
__d(123 /* RCTEventEmitter */, function(global, require, module, exports) {'use strict';












var BatchedBridge=require(12 /* BatchedBridge */);
var ReactNativeEventEmitter=require(124 /* ReactNativeEventEmitter */);

BatchedBridge.registerCallableModule(
'RCTEventEmitter',
ReactNativeEventEmitter);



module.exports=ReactNativeEventEmitter;
});
__d(124 /* ReactNativeEventEmitter */, function(global, require, module, exports) {'use strict';












var EventPluginHub=require(92 /* EventPluginHub */);
var ReactEventEmitterMixin=require(125 /* ReactEventEmitterMixin */);
var ReactNativeTagHandles=require(40 /* ReactNativeTagHandles */);
var NodeHandle=require(106 /* NodeHandle */);
var EventConstants=require(95 /* EventConstants */);

var merge=require(103 /* merge */);
var warning=require(368 /* fbjs/lib/warning */);

var topLevelTypes=EventConstants.topLevelTypes;







var EMPTY_NATIVE_EVENT={};








var touchSubsequence=function(touches,indices){
var ret=[];
for(var i=0;i<indices.length;i++){
ret.push(touches[indices[i]]);}

return ret;};













var removeTouchesAtIndices=function(
touches,
indices)
{
var rippedOut=[];


var temp=touches;
for(var i=0;i<indices.length;i++){
var index=indices[i];
rippedOut.push(touches[index]);
temp[index]=null;}

var fillAt=0;
for(var j=0;j<temp.length;j++){
var cur=temp[j];
if(cur!==null){
temp[fillAt++]=cur;}}


temp.length=fillAt;
return rippedOut;};











var ReactNativeEventEmitter=merge(ReactEventEmitterMixin,{

registrationNames:EventPluginHub.registrationNameModules,

putListener:EventPluginHub.putListener,

getListener:EventPluginHub.getListener,

deleteListener:EventPluginHub.deleteListener,

deleteAllListeners:EventPluginHub.deleteAllListeners,











_receiveRootNodeIDEvent:function(
rootNodeID,
topLevelType,
nativeEventParam)
{
var nativeEvent=nativeEventParam||EMPTY_NATIVE_EVENT;
ReactNativeEventEmitter.handleTopLevel(
topLevelType,
rootNodeID,
rootNodeID,
nativeEvent,
nativeEvent.target);},










receiveEvent:function(
tag,
topLevelType,
nativeEventParam)
{
var rootNodeID=ReactNativeTagHandles.tagToRootNodeID[tag];
ReactNativeEventEmitter._receiveRootNodeIDEvent(
rootNodeID,
topLevelType,
nativeEventParam);},



























receiveTouches:function(
eventTopLevelType,
touches,
changedIndices)
{
var changedTouches=
eventTopLevelType===topLevelTypes.topTouchEnd||
eventTopLevelType===topLevelTypes.topTouchCancel?
removeTouchesAtIndices(touches,changedIndices):
touchSubsequence(touches,changedIndices);

for(var jj=0;jj<changedTouches.length;jj++){
var touch=changedTouches[jj];


touch.changedTouches=changedTouches;
touch.touches=touches;
var nativeEvent=touch;
var rootNodeID=null;
var target=nativeEvent.target;
if(target!==null&&target!==undefined){
if(target<ReactNativeTagHandles.tagsStartAt){
if(__DEV__){
warning(
false,
'A view is reporting that a touch occured on tag zero.');}}else 


{
rootNodeID=NodeHandle.getRootNodeID(target);}}


ReactNativeEventEmitter._receiveRootNodeIDEvent(
rootNodeID,
eventTopLevelType,
nativeEvent);}}});





module.exports=ReactNativeEventEmitter;
});
__d(125 /* ReactEventEmitterMixin */, function(global, require, module, exports) {'use strict';












var EventPluginHub=require(92 /* ./EventPluginHub */);

function runEventQueueInBatch(events){
EventPluginHub.enqueueEvents(events);
EventPluginHub.processEventQueue(false);}


var ReactEventEmitterMixin={










handleTopLevel:function(topLevelType,topLevelTarget,topLevelTargetID,nativeEvent,nativeEventTarget){
var events=EventPluginHub.extractEvents(topLevelType,topLevelTarget,topLevelTargetID,nativeEvent,nativeEventTarget);
runEventQueueInBatch(events);}};



module.exports=ReactEventEmitterMixin;
});
__d(126 /* RCTLog */, function(global, require, module, exports) {'use strict';












var BatchedBridge=require(12 /* BatchedBridge */);

var invariant=require(363 /* fbjs/lib/invariant */);

var levelsMap={
log:'log',
info:'info',
warn:'warn',
error:'error',
fatal:'error'};var 


RCTLog=function(){function RCTLog(){babelHelpers.classCallCheck(this,RCTLog);}babelHelpers.createClass(RCTLog,null,[{key:'logIfNoNativeHook',value:function logIfNoNativeHook()

{
var args=Array.prototype.slice.call(arguments);
var level=args.shift();
var logFn=levelsMap[level];
invariant(
logFn,
'Level "'+level+'" not one of '+Object.keys(levelsMap));

if(typeof global.nativeLoggingHook==='undefined'){

console[logFn].apply(console,args);}

return true;}}]);return RCTLog;}();



BatchedBridge.registerCallableModule(
'RCTLog',
RCTLog);


module.exports=RCTLog;
});
__d(127 /* View */, function(global, require, module, exports) {'use strict';












var EdgeInsetsPropType=require(128 /* EdgeInsetsPropType */);
var NativeMethodsMixin=require(2 /* NativeMethodsMixin */);
var PropTypes=require(41 /* ReactPropTypes */);
var React=require(47 /* React */);
var ReactNativeStyleAttributes=require(130 /* ReactNativeStyleAttributes */);
var ReactNativeViewAttributes=require(144 /* ReactNativeViewAttributes */);
var StyleSheetPropType=require(145 /* StyleSheetPropType */);
var UIManager=require(10 /* UIManager */);
var ViewStylePropTypes=require(139 /* ViewStylePropTypes */);

var requireNativeComponent=require(146 /* requireNativeComponent */);

var stylePropType=StyleSheetPropType(ViewStylePropTypes);

var AccessibilityTraits=[
'none',
'button',
'link',
'header',
'search',
'image',
'selected',
'plays',
'key',
'text',
'summary',
'disabled',
'frequentUpdates',
'startsMedia',
'adjustable',
'allowsDirectInteraction',
'pageTurn'];


var AccessibilityComponentType=[
'none',
'button',
'radiobutton_checked',
'radiobutton_unchecked'];


var forceTouchAvailable=UIManager.RCTView.Constants&&
UIManager.RCTView.Constants.forceTouchAvailable||false;

var statics={
AccessibilityTraits:AccessibilityTraits,
AccessibilityComponentType:AccessibilityComponentType,




forceTouchAvailable:forceTouchAvailable};






















var View=React.createClass({displayName:'View',
mixins:[NativeMethodsMixin],





viewConfig:{
uiViewClassName:'RCTView',
validAttributes:ReactNativeViewAttributes.RCTView},


statics:babelHelpers.extends({},
statics),


propTypes:{




accessible:PropTypes.bool,






accessibilityLabel:PropTypes.string,






accessibilityComponentType:PropTypes.oneOf(AccessibilityComponentType),








accessibilityLiveRegion:PropTypes.oneOf([
'none',
'polite',
'assertive']),


















importantForAccessibility:PropTypes.oneOf([
'auto',
'yes',
'no',
'no-hide-descendants']),







accessibilityTraits:PropTypes.oneOfType([
PropTypes.oneOf(AccessibilityTraits),
PropTypes.arrayOf(PropTypes.oneOf(AccessibilityTraits))]),






onAccessibilityTap:PropTypes.func,





onMagicTap:PropTypes.func,





testID:PropTypes.string,






onResponderGrant:PropTypes.func,
onResponderMove:PropTypes.func,
onResponderReject:PropTypes.func,
onResponderRelease:PropTypes.func,
onResponderTerminate:PropTypes.func,
onResponderTerminationRequest:PropTypes.func,
onStartShouldSetResponder:PropTypes.func,
onStartShouldSetResponderCapture:PropTypes.func,
onMoveShouldSetResponder:PropTypes.func,
onMoveShouldSetResponderCapture:PropTypes.func,












hitSlop:EdgeInsetsPropType,










onLayout:PropTypes.func,


































pointerEvents:PropTypes.oneOf([
'box-none',
'none',
'box-only',
'auto']),

style:stylePropType,









removeClippedSubviews:PropTypes.bool,














renderToHardwareTextureAndroid:PropTypes.bool,














shouldRasterizeIOS:PropTypes.bool,








collapsable:PropTypes.bool,






















needsOffscreenAlphaCompositing:PropTypes.bool},


render:function(){




return React.createElement(RCTView,this.props);}});



var RCTView=requireNativeComponent('RCTView',View,{
nativeOnly:{
nativeBackgroundAndroid:true}});



if(__DEV__){
var viewConfig=UIManager.viewConfigs&&UIManager.viewConfigs.RCTView||{};
for(var prop in viewConfig.nativeProps){
var viewAny=View;
if(!viewAny.propTypes[prop]&&!ReactNativeStyleAttributes[prop]){
throw new Error(
'View is missing propType for native prop `'+prop+'`');}}}





var ViewToExport=RCTView;
if(__DEV__){
ViewToExport=View;}else 
{
babelHelpers.extends(RCTView,statics);}


module.exports=ViewToExport;
});
__d(128 /* EdgeInsetsPropType */, function(global, require, module, exports) {'use strict';












var PropTypes=require(41 /* ReactPropTypes */);

var createStrictShapeTypeChecker=require(129 /* createStrictShapeTypeChecker */);

var EdgeInsetsPropType=createStrictShapeTypeChecker({
top:PropTypes.number,
left:PropTypes.number,
bottom:PropTypes.number,
right:PropTypes.number});


module.exports=EdgeInsetsPropType;
});
__d(129 /* createStrictShapeTypeChecker */, function(global, require, module, exports) {'use strict';












var ReactPropTypeLocationNames=require(45 /* ReactPropTypeLocationNames */);

var invariant=require(363 /* fbjs/lib/invariant */);
var merge=require(103 /* merge */);

function createStrictShapeTypeChecker(
shapeTypes)
{
function checkType(isRequired,props,propName,componentName,location){
if(!props[propName]){
if(isRequired){
invariant(
false,
'Required object `'+propName+'` was not specified in '+('`'+
componentName+'`.'));}


return;}

var propValue=props[propName];
var propType=typeof propValue;
var locationName=
location&&ReactPropTypeLocationNames[location]||'(unknown)';
if(propType!=='object'){
invariant(
false,
'Invalid '+locationName+' `'+propName+'` of type `'+propType+'` '+('supplied to `'+
componentName+'`, expected `object`.'));}




var allKeys=merge(props[propName],shapeTypes);
for(var key in allKeys){
var checker=shapeTypes[key];
if(!checker){
invariant(
false,
'Invalid props.'+propName+' key `'+key+'` supplied to `'+componentName+'`.'+'\nBad object: '+
JSON.stringify(props[propName],null,'  ')+'\nValid keys: '+
JSON.stringify(Object.keys(shapeTypes),null,'  '));}


var error=checker(propValue,key,componentName,location);
if(error){
invariant(
false,
error.message+'\nBad object: '+
JSON.stringify(props[propName],null,'  '));}}}




function chainedCheckType(
props,
propName,
componentName,
location)
{
return checkType(false,props,propName,componentName,location);}

chainedCheckType.isRequired=checkType.bind(null,true);
return chainedCheckType;}


module.exports=createStrictShapeTypeChecker;
});
__d(130 /* ReactNativeStyleAttributes */, function(global, require, module, exports) {'use strict';













var ImageStylePropTypes=require(131 /* ImageStylePropTypes */);
var TextStylePropTypes=require(138 /* TextStylePropTypes */);
var ViewStylePropTypes=require(139 /* ViewStylePropTypes */);

var keyMirror=require(362 /* fbjs/lib/keyMirror */);
var matricesDiffer=require(140 /* matricesDiffer */);
var processColor=require(30 /* processColor */);
var processTransform=require(141 /* processTransform */);
var sizesDiffer=require(143 /* sizesDiffer */);

var ReactNativeStyleAttributes=babelHelpers.extends({},
keyMirror(ViewStylePropTypes),
keyMirror(TextStylePropTypes),
keyMirror(ImageStylePropTypes));


ReactNativeStyleAttributes.transform={process:processTransform};
ReactNativeStyleAttributes.transformMatrix={diff:matricesDiffer};
ReactNativeStyleAttributes.shadowOffset={diff:sizesDiffer};


ReactNativeStyleAttributes.decomposedMatrix='decomposedMatrix';

var colorAttributes={process:processColor};
ReactNativeStyleAttributes.backgroundColor=colorAttributes;
ReactNativeStyleAttributes.borderBottomColor=colorAttributes;
ReactNativeStyleAttributes.borderColor=colorAttributes;
ReactNativeStyleAttributes.borderLeftColor=colorAttributes;
ReactNativeStyleAttributes.borderRightColor=colorAttributes;
ReactNativeStyleAttributes.borderTopColor=colorAttributes;
ReactNativeStyleAttributes.color=colorAttributes;
ReactNativeStyleAttributes.shadowColor=colorAttributes;
ReactNativeStyleAttributes.textDecorationColor=colorAttributes;
ReactNativeStyleAttributes.tintColor=colorAttributes;
ReactNativeStyleAttributes.textShadowColor=colorAttributes;
ReactNativeStyleAttributes.overlayColor=colorAttributes;

module.exports=ReactNativeStyleAttributes;
});
__d(131 /* ImageStylePropTypes */, function(global, require, module, exports) {'use strict';












var ImageResizeMode=require(132 /* ImageResizeMode */);
var LayoutPropTypes=require(133 /* LayoutPropTypes */);
var ReactPropTypes=require(41 /* ReactPropTypes */);
var ColorPropType=require(134 /* ColorPropType */);
var ShadowPropTypesIOS=require(135 /* ShadowPropTypesIOS */);
var TransformPropTypes=require(136 /* TransformPropTypes */);

var ImageStylePropTypes=babelHelpers.extends({},
LayoutPropTypes,
ShadowPropTypesIOS,
TransformPropTypes,{
resizeMode:ReactPropTypes.oneOf(Object.keys(ImageResizeMode)),
backfaceVisibility:ReactPropTypes.oneOf(['visible','hidden']),
backgroundColor:ColorPropType,
borderColor:ColorPropType,
borderWidth:ReactPropTypes.number,
borderRadius:ReactPropTypes.number,
overflow:ReactPropTypes.oneOf(['visible','hidden']),






tintColor:ColorPropType,
opacity:ReactPropTypes.number,

















overlayColor:ReactPropTypes.string});


module.exports=ImageStylePropTypes;
});
__d(132 /* ImageResizeMode */, function(global, require, module, exports) {'use strict';












var keyMirror=require(362 /* fbjs/lib/keyMirror */);





var ImageResizeMode=keyMirror({




contain:null,




cover:null,





stretch:null,





center:null});


module.exports=ImageResizeMode;
});
__d(133 /* LayoutPropTypes */, function(global, require, module, exports) {'use strict';












var ReactPropTypes=require(41 /* ReactPropTypes */);













var LayoutPropTypes={
width:ReactPropTypes.number,
height:ReactPropTypes.number,
top:ReactPropTypes.number,
left:ReactPropTypes.number,
right:ReactPropTypes.number,
bottom:ReactPropTypes.number,
margin:ReactPropTypes.number,
marginVertical:ReactPropTypes.number,
marginHorizontal:ReactPropTypes.number,
marginTop:ReactPropTypes.number,
marginBottom:ReactPropTypes.number,
marginLeft:ReactPropTypes.number,
marginRight:ReactPropTypes.number,
padding:ReactPropTypes.number,
paddingVertical:ReactPropTypes.number,
paddingHorizontal:ReactPropTypes.number,
paddingTop:ReactPropTypes.number,
paddingBottom:ReactPropTypes.number,
paddingLeft:ReactPropTypes.number,
paddingRight:ReactPropTypes.number,
borderWidth:ReactPropTypes.number,
borderTopWidth:ReactPropTypes.number,
borderRightWidth:ReactPropTypes.number,
borderBottomWidth:ReactPropTypes.number,
borderLeftWidth:ReactPropTypes.number,

position:ReactPropTypes.oneOf([
'absolute',
'relative']),



flexDirection:ReactPropTypes.oneOf([
'row',
'column']),



flexWrap:ReactPropTypes.oneOf([
'wrap',
'nowrap']),




justifyContent:ReactPropTypes.oneOf([
'flex-start',
'flex-end',
'center',
'space-between',
'space-around']),




alignItems:ReactPropTypes.oneOf([
'flex-start',
'flex-end',
'center',
'stretch']),




alignSelf:ReactPropTypes.oneOf([
'auto',
'flex-start',
'flex-end',
'center',
'stretch']),



flex:ReactPropTypes.number};


module.exports=LayoutPropTypes;
});
__d(134 /* ColorPropType */, function(global, require, module, exports) {'use strict';











var ReactPropTypes=require(41 /* ReactPropTypes */);
var ReactPropTypeLocationNames=require(45 /* ReactPropTypeLocationNames */);

var normalizeColor=require(31 /* normalizeColor */);

var colorPropType=function(isRequired,props,propName,componentName,location,propFullName){
var color=props[propName];
if(color===undefined||color===null){
if(isRequired){
var locationName=ReactPropTypeLocationNames[location];
return new Error(
'Required '+locationName+' `'+(propFullName||propName)+
'` was not specified in `'+componentName+'`.');}


return;}


if(typeof color==='number'){



return;}


if(normalizeColor(color)===null){
var locationName=ReactPropTypeLocationNames[location];
return new Error(
'Invalid '+locationName+' `'+(propFullName||propName)+
'` supplied to `'+componentName+'`: '+color+'\n'+'Valid color formats are\n  - \'#f0f\' (#rgb)\n  - \'#f0fc\' (#rgba)\n  - \'#ff00ff\' (#rrggbb)\n  - \'#ff00ff00\' (#rrggbbaa)\n  - \'rgb(255, 255, 255)\'\n  - \'rgba(255, 255, 255, 1.0)\'\n  - \'hsl(360, 100%, 100%)\'\n  - \'hsla(360, 100%, 100%, 1.0)\'\n  - \'transparent\'\n  - \'red\'\n  - 0xff00ff00 (0xrrggbbaa)\n');}};
















var ColorPropType=colorPropType.bind(null,false);
ColorPropType.isRequired=colorPropType.bind(null,true);

module.exports=ColorPropType;
});
__d(135 /* ShadowPropTypesIOS */, function(global, require, module, exports) {'use strict';












var ColorPropType=require(134 /* ColorPropType */);
var ReactPropTypes=require(41 /* ReactPropTypes */);

var ShadowPropTypesIOS={




shadowColor:ColorPropType,




shadowOffset:ReactPropTypes.shape(
{width:ReactPropTypes.number,height:ReactPropTypes.number}),





shadowOpacity:ReactPropTypes.number,




shadowRadius:ReactPropTypes.number};


module.exports=ShadowPropTypesIOS;
});
__d(136 /* TransformPropTypes */, function(global, require, module, exports) {'use strict';












var ReactPropTypes=require(41 /* ReactPropTypes */);
var deprecatedPropType=require(137 /* deprecatedPropType */);

var ArrayOfNumberPropType=ReactPropTypes.arrayOf(ReactPropTypes.number);

var TransformMatrixPropType=function(
props,
propName,
componentName)
{
if(props.transform&&props.transformMatrix){
return new Error(
'transformMatrix and transform styles cannot be used on the same '+
'component');}


return ArrayOfNumberPropType(props,propName,componentName);};


var TransformPropTypes={
transform:ReactPropTypes.arrayOf(
ReactPropTypes.oneOfType([
ReactPropTypes.shape({perspective:ReactPropTypes.number}),
ReactPropTypes.shape({rotate:ReactPropTypes.string}),
ReactPropTypes.shape({rotateX:ReactPropTypes.string}),
ReactPropTypes.shape({rotateY:ReactPropTypes.string}),
ReactPropTypes.shape({rotateZ:ReactPropTypes.string}),
ReactPropTypes.shape({scale:ReactPropTypes.number}),
ReactPropTypes.shape({scaleX:ReactPropTypes.number}),
ReactPropTypes.shape({scaleY:ReactPropTypes.number}),
ReactPropTypes.shape({translateX:ReactPropTypes.number}),
ReactPropTypes.shape({translateY:ReactPropTypes.number}),
ReactPropTypes.shape({skewX:ReactPropTypes.string}),
ReactPropTypes.shape({skewY:ReactPropTypes.string})])),


transformMatrix:TransformMatrixPropType,


scaleX:deprecatedPropType(ReactPropTypes.number,'Use the transform prop instead.'),
scaleY:deprecatedPropType(ReactPropTypes.number,'Use the transform prop instead.'),
rotation:deprecatedPropType(ReactPropTypes.number,'Use the transform prop instead.'),
translateX:deprecatedPropType(ReactPropTypes.number,'Use the transform prop instead.'),
translateY:deprecatedPropType(ReactPropTypes.number,'Use the transform prop instead.')};


module.exports=TransformPropTypes;
});
__d(137 /* deprecatedPropType */, function(global, require, module, exports) {'use strict';












var UIManager=require(10 /* UIManager */);




function deprecatedPropType(
propType,
explanation)
{
return function validate(props,propName,componentName){

if(!UIManager[componentName]&&props[propName]!==undefined){
console.warn('`'+propName+'` supplied to `'+componentName+'` has been deprecated. '+explanation);}


return propType(props,propName,componentName);};}



module.exports=deprecatedPropType;
});
__d(138 /* TextStylePropTypes */, function(global, require, module, exports) {'use strict';












var ReactPropTypes=require(41 /* ReactPropTypes */);
var ColorPropType=require(134 /* ColorPropType */);
var ViewStylePropTypes=require(139 /* ViewStylePropTypes */);


var TextStylePropTypes=babelHelpers.extends(Object.create(ViewStylePropTypes),{
color:ColorPropType,
fontFamily:ReactPropTypes.string,
fontSize:ReactPropTypes.number,
fontStyle:ReactPropTypes.oneOf(['normal','italic']),





fontWeight:ReactPropTypes.oneOf(
['normal','bold',
'100','200','300','400','500','600','700','800','900']),

textShadowOffset:ReactPropTypes.shape(
{width:ReactPropTypes.number,height:ReactPropTypes.number}),

textShadowRadius:ReactPropTypes.number,
textShadowColor:ColorPropType,



letterSpacing:ReactPropTypes.number,
lineHeight:ReactPropTypes.number,



textAlign:ReactPropTypes.oneOf(
['auto','left','right','center','justify']),




textAlignVertical:ReactPropTypes.oneOf(
['auto','top','bottom','center']),




textDecorationLine:ReactPropTypes.oneOf(
['none','underline','line-through','underline line-through']),




textDecorationStyle:ReactPropTypes.oneOf(
['solid','double','dotted','dashed']),




textDecorationColor:ColorPropType,



writingDirection:ReactPropTypes.oneOf(
['auto','ltr','rtl'])});



module.exports=TextStylePropTypes;
});
__d(139 /* ViewStylePropTypes */, function(global, require, module, exports) {'use strict';












var LayoutPropTypes=require(133 /* LayoutPropTypes */);
var ReactPropTypes=require(41 /* ReactPropTypes */);
var ColorPropType=require(134 /* ColorPropType */);
var ShadowPropTypesIOS=require(135 /* ShadowPropTypesIOS */);
var TransformPropTypes=require(136 /* TransformPropTypes */);




var ViewStylePropTypes=babelHelpers.extends({},
LayoutPropTypes,
ShadowPropTypesIOS,
TransformPropTypes,{
backfaceVisibility:ReactPropTypes.oneOf(['visible','hidden']),
backgroundColor:ColorPropType,
borderColor:ColorPropType,
borderTopColor:ColorPropType,
borderRightColor:ColorPropType,
borderBottomColor:ColorPropType,
borderLeftColor:ColorPropType,
borderRadius:ReactPropTypes.number,
borderTopLeftRadius:ReactPropTypes.number,
borderTopRightRadius:ReactPropTypes.number,
borderBottomLeftRadius:ReactPropTypes.number,
borderBottomRightRadius:ReactPropTypes.number,
borderStyle:ReactPropTypes.oneOf(['solid','dotted','dashed']),
borderWidth:ReactPropTypes.number,
borderTopWidth:ReactPropTypes.number,
borderRightWidth:ReactPropTypes.number,
borderBottomWidth:ReactPropTypes.number,
borderLeftWidth:ReactPropTypes.number,
opacity:ReactPropTypes.number,
overflow:ReactPropTypes.oneOf(['visible','hidden']),







elevation:ReactPropTypes.number});


module.exports=ViewStylePropTypes;
});
__d(140 /* matricesDiffer */, function(global, require, module, exports) {'use strict';




















var matricesDiffer=function(one,two){
if(one===two){
return false;}

return !one||!two||
one[12]!==two[12]||
one[13]!==two[13]||
one[14]!==two[14]||
one[5]!==two[5]||
one[10]!==two[10]||
one[1]!==two[1]||
one[2]!==two[2]||
one[3]!==two[3]||
one[4]!==two[4]||
one[6]!==two[6]||
one[7]!==two[7]||
one[8]!==two[8]||
one[9]!==two[9]||
one[11]!==two[11]||
one[15]!==two[15];};


module.exports=matricesDiffer;
});
__d(141 /* processTransform */, function(global, require, module, exports) {'use strict';












var MatrixMath=require(142 /* MatrixMath */);
var Platform=require(4 /* Platform */);

var invariant=require(363 /* fbjs/lib/invariant */);
var stringifySafe=require(19 /* stringifySafe */);









function processTransform(transform){
var result=MatrixMath.createIdentityMatrix();

transform.forEach(function(transformation){
var key=Object.keys(transformation)[0];
var value=transformation[key];
if(__DEV__){
_validateTransform(key,value,transformation);}


switch(key){
case 'matrix':
MatrixMath.multiplyInto(result,result,value);
break;
case 'perspective':
_multiplyTransform(result,MatrixMath.reusePerspectiveCommand,[value]);
break;
case 'rotateX':
_multiplyTransform(result,MatrixMath.reuseRotateXCommand,[_convertToRadians(value)]);
break;
case 'rotateY':
_multiplyTransform(result,MatrixMath.reuseRotateYCommand,[_convertToRadians(value)]);
break;
case 'rotate':
case 'rotateZ':
_multiplyTransform(result,MatrixMath.reuseRotateZCommand,[_convertToRadians(value)]);
break;
case 'scale':
_multiplyTransform(result,MatrixMath.reuseScaleCommand,[value]);
break;
case 'scaleX':
_multiplyTransform(result,MatrixMath.reuseScaleXCommand,[value]);
break;
case 'scaleY':
_multiplyTransform(result,MatrixMath.reuseScaleYCommand,[value]);
break;
case 'translate':
_multiplyTransform(result,MatrixMath.reuseTranslate3dCommand,[value[0],value[1],value[2]||0]);
break;
case 'translateX':
_multiplyTransform(result,MatrixMath.reuseTranslate2dCommand,[value,0]);
break;
case 'translateY':
_multiplyTransform(result,MatrixMath.reuseTranslate2dCommand,[0,value]);
break;
case 'skewX':
_multiplyTransform(result,MatrixMath.reuseSkewXCommand,[_convertToRadians(value)]);
break;
case 'skewY':
_multiplyTransform(result,MatrixMath.reuseSkewYCommand,[_convertToRadians(value)]);
break;
default:
throw new Error('Invalid transform name: '+key);}});







if(Platform.OS==='android'){
return MatrixMath.decomposeMatrix(result);}

return result;}





function _multiplyTransform(
result,
matrixMathFunction,
args)
{
var matrixToApply=MatrixMath.createIdentityMatrix();
var argsWithIdentity=[matrixToApply].concat(args);
matrixMathFunction.apply(this,argsWithIdentity);
MatrixMath.multiplyInto(result,result,matrixToApply);}






function _convertToRadians(value){
var floatValue=parseFloat(value,10);
return value.indexOf('rad')>-1?floatValue:floatValue*Math.PI/180;}


function _validateTransform(key,value,transformation){
invariant(
!value.getValue,
'You passed an Animated.Value to a normal component. '+
'You need to wrap that component in an Animated. For example, '+
'replace <View /> by <Animated.View />.');


var multivalueTransforms=[
'matrix',
'translate'];

if(multivalueTransforms.indexOf(key)!==-1){
invariant(
Array.isArray(value),
'Transform with key of %s must have an array as the value: %s',
key,
stringifySafe(transformation));}


switch(key){
case 'matrix':
invariant(
value.length===9||value.length===16,
'Matrix transform must have a length of 9 (2d) or 16 (3d). '+
'Provided matrix has a length of %s: %s',
value.length,
stringifySafe(transformation));

break;
case 'translate':
break;
case 'rotateX':
case 'rotateY':
case 'rotateZ':
case 'rotate':
case 'skewX':
case 'skewY':
invariant(
typeof value==='string',
'Transform with key of "%s" must be a string: %s',
key,
stringifySafe(transformation));

invariant(
value.indexOf('deg')>-1||value.indexOf('rad')>-1,
'Rotate transform must be expressed in degrees (deg) or radians '+
'(rad): %s',
stringifySafe(transformation));

break;
case 'perspective':
invariant(
typeof value==='number',
'Transform with key of "%s" must be a number: %s',
key,
stringifySafe(transformation));

invariant(
value!==0,
'Transform with key of "%s" cannot be zero: %s',
key,
stringifySafe(transformation));

break;
default:
invariant(
typeof value==='number',
'Transform with key of "%s" must be a number: %s',
key,
stringifySafe(transformation));}}




module.exports=processTransform;
});
__d(142 /* MatrixMath */, function(global, require, module, exports) {'use strict';








var invariant=require(363 /* fbjs/lib/invariant */);





var MatrixMath={
createIdentityMatrix:function(){
return [
1,0,0,0,
0,1,0,0,
0,0,1,0,
0,0,0,1];},



createCopy:function(m){
return [
m[0],m[1],m[2],m[3],
m[4],m[5],m[6],m[7],
m[8],m[9],m[10],m[11],
m[12],m[13],m[14],m[15]];},



createOrthographic:function(left,right,bottom,top,near,far){
var a=2/(right-left);
var b=2/(top-bottom);
var c=-2/(far-near);

var tx=-(right+left)/(right-left);
var ty=-(top+bottom)/(top-bottom);
var tz=-(far+near)/(far-near);

return [
a,0,0,0,
0,b,0,0,
0,0,c,0,
tx,ty,tz,1];},



createFrustum:function(left,right,bottom,top,near,far){
var r_width=1/(right-left);
var r_height=1/(top-bottom);
var r_depth=1/(near-far);
var x=2*(near*r_width);
var y=2*(near*r_height);
var A=(right+left)*r_width;
var B=(top+bottom)*r_height;
var C=(far+near)*r_depth;
var D=2*(far*near*r_depth);
return [
x,0,0,0,
0,y,0,0,
A,B,C,-1,
0,0,D,0];},









createPerspective:function(fovInRadians,aspect,near,far){
var h=1/Math.tan(fovInRadians/2);
var r_depth=1/(near-far);
var C=(far+near)*r_depth;
var D=2*(far*near*r_depth);
return [
h/aspect,0,0,0,
0,h,0,0,
0,0,C,-1,
0,0,D,0];},



createTranslate2d:function(x,y){
var mat=MatrixMath.createIdentityMatrix();
MatrixMath.reuseTranslate2dCommand(mat,x,y);
return mat;},


reuseTranslate2dCommand:function(matrixCommand,x,y){
matrixCommand[12]=x;
matrixCommand[13]=y;},


reuseTranslate3dCommand:function(matrixCommand,x,y,z){
matrixCommand[12]=x;
matrixCommand[13]=y;
matrixCommand[14]=z;},


createScale:function(factor){
var mat=MatrixMath.createIdentityMatrix();
MatrixMath.reuseScaleCommand(mat,factor);
return mat;},


reuseScaleCommand:function(matrixCommand,factor){
matrixCommand[0]=factor;
matrixCommand[5]=factor;},


reuseScale3dCommand:function(matrixCommand,x,y,z){
matrixCommand[0]=x;
matrixCommand[5]=y;
matrixCommand[10]=z;},


reusePerspectiveCommand:function(matrixCommand,p){
matrixCommand[11]=-1/p;},


reuseScaleXCommand:function(matrixCommand,factor){
matrixCommand[0]=factor;},


reuseScaleYCommand:function(matrixCommand,factor){
matrixCommand[5]=factor;},


reuseScaleZCommand:function(matrixCommand,factor){
matrixCommand[10]=factor;},


reuseRotateXCommand:function(matrixCommand,radians){
matrixCommand[5]=Math.cos(radians);
matrixCommand[6]=Math.sin(radians);
matrixCommand[9]=-Math.sin(radians);
matrixCommand[10]=Math.cos(radians);},


reuseRotateYCommand:function(matrixCommand,amount){
matrixCommand[0]=Math.cos(amount);
matrixCommand[2]=-Math.sin(amount);
matrixCommand[8]=Math.sin(amount);
matrixCommand[10]=Math.cos(amount);},



reuseRotateZCommand:function(matrixCommand,radians){
matrixCommand[0]=Math.cos(radians);
matrixCommand[1]=Math.sin(radians);
matrixCommand[4]=-Math.sin(radians);
matrixCommand[5]=Math.cos(radians);},


createRotateZ:function(radians){
var mat=MatrixMath.createIdentityMatrix();
MatrixMath.reuseRotateZCommand(mat,radians);
return mat;},


reuseSkewXCommand:function(matrixCommand,radians){
matrixCommand[4]=Math.sin(radians);
matrixCommand[5]=Math.cos(radians);},


reuseSkewYCommand:function(matrixCommand,radians){
matrixCommand[0]=Math.cos(radians);
matrixCommand[1]=Math.sin(radians);},


multiplyInto:function(out,a,b){
var a00=a[0],a01=a[1],a02=a[2],a03=a[3],
a10=a[4],a11=a[5],a12=a[6],a13=a[7],
a20=a[8],a21=a[9],a22=a[10],a23=a[11],
a30=a[12],a31=a[13],a32=a[14],a33=a[15];

var b0=b[0],b1=b[1],b2=b[2],b3=b[3];
out[0]=b0*a00+b1*a10+b2*a20+b3*a30;
out[1]=b0*a01+b1*a11+b2*a21+b3*a31;
out[2]=b0*a02+b1*a12+b2*a22+b3*a32;
out[3]=b0*a03+b1*a13+b2*a23+b3*a33;

b0=b[4];b1=b[5];b2=b[6];b3=b[7];
out[4]=b0*a00+b1*a10+b2*a20+b3*a30;
out[5]=b0*a01+b1*a11+b2*a21+b3*a31;
out[6]=b0*a02+b1*a12+b2*a22+b3*a32;
out[7]=b0*a03+b1*a13+b2*a23+b3*a33;

b0=b[8];b1=b[9];b2=b[10];b3=b[11];
out[8]=b0*a00+b1*a10+b2*a20+b3*a30;
out[9]=b0*a01+b1*a11+b2*a21+b3*a31;
out[10]=b0*a02+b1*a12+b2*a22+b3*a32;
out[11]=b0*a03+b1*a13+b2*a23+b3*a33;

b0=b[12];b1=b[13];b2=b[14];b3=b[15];
out[12]=b0*a00+b1*a10+b2*a20+b3*a30;
out[13]=b0*a01+b1*a11+b2*a21+b3*a31;
out[14]=b0*a02+b1*a12+b2*a22+b3*a32;
out[15]=b0*a03+b1*a13+b2*a23+b3*a33;},


determinant:function(matrix){var _matrix=babelHelpers.slicedToArray(





matrix,16);var m00=_matrix[0];var m01=_matrix[1];var m02=_matrix[2];var m03=_matrix[3];var m10=_matrix[4];var m11=_matrix[5];var m12=_matrix[6];var m13=_matrix[7];var m20=_matrix[8];var m21=_matrix[9];var m22=_matrix[10];var m23=_matrix[11];var m30=_matrix[12];var m31=_matrix[13];var m32=_matrix[14];var m33=_matrix[15];
return (
m03*m12*m21*m30-m02*m13*m21*m30-
m03*m11*m22*m30+m01*m13*m22*m30+
m02*m11*m23*m30-m01*m12*m23*m30-
m03*m12*m20*m31+m02*m13*m20*m31+
m03*m10*m22*m31-m00*m13*m22*m31-
m02*m10*m23*m31+m00*m12*m23*m31+
m03*m11*m20*m32-m01*m13*m20*m32-
m03*m10*m21*m32+m00*m13*m21*m32+
m01*m10*m23*m32-m00*m11*m23*m32-
m02*m11*m20*m33+m01*m12*m20*m33+
m02*m10*m21*m33-m00*m12*m21*m33-
m01*m10*m22*m33+m00*m11*m22*m33);},










inverse:function(matrix){
var det=MatrixMath.determinant(matrix);
if(!det){
return matrix;}var _matrix2=babelHelpers.slicedToArray(






matrix,16);var m00=_matrix2[0];var m01=_matrix2[1];var m02=_matrix2[2];var m03=_matrix2[3];var m10=_matrix2[4];var m11=_matrix2[5];var m12=_matrix2[6];var m13=_matrix2[7];var m20=_matrix2[8];var m21=_matrix2[9];var m22=_matrix2[10];var m23=_matrix2[11];var m30=_matrix2[12];var m31=_matrix2[13];var m32=_matrix2[14];var m33=_matrix2[15];
return [
(m12*m23*m31-m13*m22*m31+m13*m21*m32-m11*m23*m32-m12*m21*m33+m11*m22*m33)/det,
(m03*m22*m31-m02*m23*m31-m03*m21*m32+m01*m23*m32+m02*m21*m33-m01*m22*m33)/det,
(m02*m13*m31-m03*m12*m31+m03*m11*m32-m01*m13*m32-m02*m11*m33+m01*m12*m33)/det,
(m03*m12*m21-m02*m13*m21-m03*m11*m22+m01*m13*m22+m02*m11*m23-m01*m12*m23)/det,
(m13*m22*m30-m12*m23*m30-m13*m20*m32+m10*m23*m32+m12*m20*m33-m10*m22*m33)/det,
(m02*m23*m30-m03*m22*m30+m03*m20*m32-m00*m23*m32-m02*m20*m33+m00*m22*m33)/det,
(m03*m12*m30-m02*m13*m30-m03*m10*m32+m00*m13*m32+m02*m10*m33-m00*m12*m33)/det,
(m02*m13*m20-m03*m12*m20+m03*m10*m22-m00*m13*m22-m02*m10*m23+m00*m12*m23)/det,
(m11*m23*m30-m13*m21*m30+m13*m20*m31-m10*m23*m31-m11*m20*m33+m10*m21*m33)/det,
(m03*m21*m30-m01*m23*m30-m03*m20*m31+m00*m23*m31+m01*m20*m33-m00*m21*m33)/det,
(m01*m13*m30-m03*m11*m30+m03*m10*m31-m00*m13*m31-m01*m10*m33+m00*m11*m33)/det,
(m03*m11*m20-m01*m13*m20-m03*m10*m21+m00*m13*m21+m01*m10*m23-m00*m11*m23)/det,
(m12*m21*m30-m11*m22*m30-m12*m20*m31+m10*m22*m31+m11*m20*m32-m10*m21*m32)/det,
(m01*m22*m30-m02*m21*m30+m02*m20*m31-m00*m22*m31-m01*m20*m32+m00*m21*m32)/det,
(m02*m11*m30-m01*m12*m30-m02*m10*m31+m00*m12*m31+m01*m10*m32-m00*m11*m32)/det,
(m01*m12*m20-m02*m11*m20+m02*m10*m21-m00*m12*m21-m01*m10*m22+m00*m11*m22)/det];},






transpose:function(m){
return [
m[0],m[4],m[8],m[12],
m[1],m[5],m[9],m[13],
m[2],m[6],m[10],m[14],
m[3],m[7],m[11],m[15]];},






multiplyVectorByMatrix:function(
v,
m)
{var _v=babelHelpers.slicedToArray(
v,4);var vx=_v[0];var vy=_v[1];var vz=_v[2];var vw=_v[3];
return [
vx*m[0]+vy*m[4]+vz*m[8]+vw*m[12],
vx*m[1]+vy*m[5]+vz*m[9]+vw*m[13],
vx*m[2]+vy*m[6]+vz*m[10]+vw*m[14],
vx*m[3]+vy*m[7]+vz*m[11]+vw*m[15]];},






v3Length:function(a){
return Math.sqrt(a[0]*a[0]+a[1]*a[1]+a[2]*a[2]);},





v3Normalize:function(
vector,
v3Length)
{
var im=1/(v3Length||MatrixMath.v3Length(vector));
return [
vector[0]*im,
vector[1]*im,
vector[2]*im];},







v3Dot:function(a,b){
return a[0]*b[0]+
a[1]*b[1]+
a[2]*b[2];},






v3Combine:function(
a,
b,
aScale,
bScale)
{
return [
aScale*a[0]+bScale*b[0],
aScale*a[1]+bScale*b[1],
aScale*a[2]+bScale*b[2]];},







v3Cross:function(a,b){
return [
a[1]*b[2]-a[2]*b[1],
a[2]*b[0]-a[0]*b[2],
a[0]*b[1]-a[1]*b[0]];},



















quaternionToDegreesXYZ:function(q,matrix,row){var _q=babelHelpers.slicedToArray(
q,4);var qx=_q[0];var qy=_q[1];var qz=_q[2];var qw=_q[3];
var qw2=qw*qw;
var qx2=qx*qx;
var qy2=qy*qy;
var qz2=qz*qz;
var test=qx*qy+qz*qw;
var unit=qw2+qx2+qy2+qz2;
var conv=180/Math.PI;

if(test>0.49999*unit){
return [0,2*Math.atan2(qx,qw)*conv,90];}

if(test<-0.49999*unit){
return [0,-2*Math.atan2(qx,qw)*conv,-90];}


return [
MatrixMath.roundTo3Places(
Math.atan2(2*qx*qw-2*qy*qz,1-2*qx2-2*qz2)*conv),

MatrixMath.roundTo3Places(
Math.atan2(2*qy*qw-2*qx*qz,1-2*qy2-2*qz2)*conv),

MatrixMath.roundTo3Places(
Math.asin(2*qx*qy+2*qz*qw)*conv)];},








roundTo3Places:function(n){
var arr=n.toString().split('e');
return Math.round(arr[0]+'e'+(arr[1]?+arr[1]-3:3))*0.001;},













decomposeMatrix:function(transformMatrix){

invariant(
transformMatrix.length===16,
'Matrix decomposition needs a list of 3d matrix values, received %s',
transformMatrix);



var perspective=[];
var quaternion=[];
var scale=[];
var skew=[];
var translation=[];



if(!transformMatrix[15]){
return;}

var matrix=[];
var perspectiveMatrix=[];
for(var i=0;i<4;i++){
matrix.push([]);
for(var j=0;j<4;j++){
var value=transformMatrix[i*4+j]/transformMatrix[15];
matrix[i].push(value);
perspectiveMatrix.push(j===3?0:value);}}


perspectiveMatrix[15]=1;


if(!MatrixMath.determinant(perspectiveMatrix)){
return;}



if(matrix[0][3]!==0||matrix[1][3]!==0||matrix[2][3]!==0){


var rightHandSide=[
matrix[0][3],
matrix[1][3],
matrix[2][3],
matrix[3][3]];




var inversePerspectiveMatrix=MatrixMath.inverse(
perspectiveMatrix);

var transposedInversePerspectiveMatrix=MatrixMath.transpose(
inversePerspectiveMatrix);

var perspective=MatrixMath.multiplyVectorByMatrix(
rightHandSide,
transposedInversePerspectiveMatrix);}else 

{

perspective[0]=perspective[1]=perspective[2]=0;
perspective[3]=1;}



for(var i=0;i<3;i++){
translation[i]=matrix[3][i];}




var row=[];
for(i=0;i<3;i++){
row[i]=[
matrix[i][0],
matrix[i][1],
matrix[i][2]];}




scale[0]=MatrixMath.v3Length(row[0]);
row[0]=MatrixMath.v3Normalize(row[0],scale[0]);


skew[0]=MatrixMath.v3Dot(row[0],row[1]);
row[1]=MatrixMath.v3Combine(row[1],row[0],1.0,-skew[0]);


skew[0]=MatrixMath.v3Dot(row[0],row[1]);
row[1]=MatrixMath.v3Combine(row[1],row[0],1.0,-skew[0]);


scale[1]=MatrixMath.v3Length(row[1]);
row[1]=MatrixMath.v3Normalize(row[1],scale[1]);
skew[0]/=scale[1];


skew[1]=MatrixMath.v3Dot(row[0],row[2]);
row[2]=MatrixMath.v3Combine(row[2],row[0],1.0,-skew[1]);
skew[2]=MatrixMath.v3Dot(row[1],row[2]);
row[2]=MatrixMath.v3Combine(row[2],row[1],1.0,-skew[2]);


scale[2]=MatrixMath.v3Length(row[2]);
row[2]=MatrixMath.v3Normalize(row[2],scale[2]);
skew[1]/=scale[2];
skew[2]/=scale[2];




var pdum3=MatrixMath.v3Cross(row[1],row[2]);
if(MatrixMath.v3Dot(row[0],pdum3)<0){
for(i=0;i<3;i++){
scale[i]*=-1;
row[i][0]*=-1;
row[i][1]*=-1;
row[i][2]*=-1;}}




quaternion[0]=
0.5*Math.sqrt(Math.max(1+row[0][0]-row[1][1]-row[2][2],0));
quaternion[1]=
0.5*Math.sqrt(Math.max(1-row[0][0]+row[1][1]-row[2][2],0));
quaternion[2]=
0.5*Math.sqrt(Math.max(1-row[0][0]-row[1][1]+row[2][2],0));
quaternion[3]=
0.5*Math.sqrt(Math.max(1+row[0][0]+row[1][1]+row[2][2],0));

if(row[2][1]>row[1][2]){
quaternion[0]=-quaternion[0];}

if(row[0][2]>row[2][0]){
quaternion[1]=-quaternion[1];}

if(row[1][0]>row[0][1]){
quaternion[2]=-quaternion[2];}



var rotationDegrees;
if(
quaternion[0]<0.001&&quaternion[0]>=0&&
quaternion[1]<0.001&&quaternion[1]>=0)
{

rotationDegrees=[0,0,MatrixMath.roundTo3Places(
Math.atan2(row[0][1],row[0][0])*180/Math.PI)];}else 

{
rotationDegrees=MatrixMath.quaternionToDegreesXYZ(quaternion,matrix,row);}



return {
rotationDegrees:rotationDegrees,
perspective:perspective,
quaternion:quaternion,
scale:scale,
skew:skew,
translation:translation,

rotate:rotationDegrees[2],
rotateX:rotationDegrees[0],
rotateY:rotationDegrees[1],
scaleX:scale[0],
scaleY:scale[1],
translateX:translation[0],
translateY:translation[1]};}};





module.exports=MatrixMath;
});
__d(143 /* sizesDiffer */, function(global, require, module, exports) {'use strict';






var dummySize={width:undefined,height:undefined};

var sizesDiffer=function(one,two){
one=one||dummySize;
two=two||dummySize;
return one!==two&&(
one.width!==two.width||
one.height!==two.height);};



module.exports=sizesDiffer;
});
__d(144 /* ReactNativeViewAttributes */, function(global, require, module, exports) {'use strict';












var ReactNativeStyleAttributes=require(130 /* ReactNativeStyleAttributes */);

var ReactNativeViewAttributes={};

ReactNativeViewAttributes.UIView={
pointerEvents:true,
accessible:true,
accessibilityLabel:true,
accessibilityComponentType:true,
accessibilityLiveRegion:true,
accessibilityTraits:true,
importantForAccessibility:true,
testID:true,
renderToHardwareTextureAndroid:true,
shouldRasterizeIOS:true,
onLayout:true,
onAccessibilityTap:true,
onMagicTap:true,
collapsable:true,
needsOffscreenAlphaCompositing:true,
style:ReactNativeStyleAttributes};


ReactNativeViewAttributes.RCTView=babelHelpers.extends({},
ReactNativeViewAttributes.UIView,{






removeClippedSubviews:true});


module.exports=ReactNativeViewAttributes;
});
__d(145 /* StyleSheetPropType */, function(global, require, module, exports) {'use strict';












var createStrictShapeTypeChecker=require(129 /* createStrictShapeTypeChecker */);
var flattenStyle=require(7 /* flattenStyle */);

function StyleSheetPropType(
shape)
{
var shapePropType=createStrictShapeTypeChecker(shape);
return function(props,propName,componentName,location){
var newProps=props;
if(props[propName]){

newProps={};
newProps[propName]=flattenStyle(props[propName]);}

return shapePropType(newProps,propName,componentName,location);};}



module.exports=StyleSheetPropType;
});
__d(146 /* requireNativeComponent */, function(global, require, module, exports) {'use strict';












var ReactNativeStyleAttributes=require(130 /* ReactNativeStyleAttributes */);
var UIManager=require(10 /* UIManager */);
var UnimplementedView=require(147 /* UnimplementedView */);

var createReactNativeComponentClass=require(152 /* createReactNativeComponentClass */);

var insetsDiffer=require(159 /* insetsDiffer */);
var pointsDiffer=require(160 /* pointsDiffer */);
var matricesDiffer=require(140 /* matricesDiffer */);
var processColor=require(30 /* processColor */);
var resolveAssetSource=require(161 /* resolveAssetSource */);
var sizesDiffer=require(143 /* sizesDiffer */);
var verifyPropTypes=require(164 /* verifyPropTypes */);
var warning=require(368 /* fbjs/lib/warning */);


















function requireNativeComponent(
viewName,
componentInterface,
extraConfig)
{
var viewConfig=UIManager[viewName];
if(!viewConfig||!viewConfig.NativeProps){
warning(false,'Native component for "%s" does not exist',viewName);
return UnimplementedView;}

var nativeProps=babelHelpers.extends({},
UIManager.RCTView.NativeProps,
viewConfig.NativeProps);

viewConfig.uiViewClassName=viewName;
viewConfig.validAttributes={};
viewConfig.propTypes=componentInterface&&componentInterface.propTypes;
for(var key in nativeProps){
var useAttribute=false;
var attribute={};

var differ=TypeToDifferMap[nativeProps[key]];
if(differ){
attribute.diff=differ;
useAttribute=true;}


var processor=TypeToProcessorMap[nativeProps[key]];
if(processor){
attribute.process=processor;
useAttribute=true;}


viewConfig.validAttributes[key]=useAttribute?attribute:true;}







viewConfig.validAttributes.style=ReactNativeStyleAttributes;

if(__DEV__){
componentInterface&&verifyPropTypes(
componentInterface,
viewConfig,
extraConfig&&extraConfig.nativeOnly);}


return createReactNativeComponentClass(viewConfig);}


var TypeToDifferMap={

CATransform3D:matricesDiffer,
CGPoint:pointsDiffer,
CGSize:sizesDiffer,
UIEdgeInsets:insetsDiffer};




function processColorArray(colors){
return colors&&colors.map(processColor);}


var TypeToProcessorMap={

CGColor:processColor,
CGColorArray:processColorArray,
UIColor:processColor,
UIColorArray:processColorArray,
CGImage:resolveAssetSource,
UIImage:resolveAssetSource,
RCTImageSource:resolveAssetSource,

Color:processColor,
ColorArray:processColorArray};


module.exports=requireNativeComponent;
});
__d(147 /* UnimplementedView */, function(global, require, module, exports) {'use strict';








var React=require(47 /* React */);
var StyleSheet=require(148 /* StyleSheet */);

var UnimplementedView=React.createClass({displayName:'UnimplementedView',
setNativeProps:function(){},




render:function(){

var View=require(127 /* View */);
return (
React.createElement(View,{style:[styles.unimplementedView,this.props.style]},
this.props.children));}});





var styles=StyleSheet.create({
unimplementedView:{
borderWidth:1,
borderColor:'red',
alignSelf:'flex-start'}});



module.exports=UnimplementedView;
});
__d(148 /* StyleSheet */, function(global, require, module, exports) {'use strict';












var PixelRatio=require(149 /* PixelRatio */);
var StyleSheetRegistry=require(8 /* StyleSheetRegistry */);
var StyleSheetValidation=require(151 /* StyleSheetValidation */);

var flatten=require(7 /* flattenStyle */);

var hairlineWidth=PixelRatio.roundToNearestPixel(0.4);
if(hairlineWidth===0){
hairlineWidth=1/PixelRatio.get();}














































module.exports={

















hairlineWidth:hairlineWidth,

flatten:flatten,




create:function(obj){
var result={};
for(var key in obj){
StyleSheetValidation.validateStyle(key,obj);
result[key]=StyleSheetRegistry.registerStyle(obj[key]);}

return result;}};
});
__d(149 /* PixelRatio */, function(global, require, module, exports) {'use strict';












var Dimensions=require(150 /* Dimensions */);var 


















PixelRatio=function(){function PixelRatio(){babelHelpers.classCallCheck(this,PixelRatio);}babelHelpers.createClass(PixelRatio,null,[{key:'get',value:function get()


















{
return Dimensions.get('window').scale;}},{key:'getFontScale',value:function getFontScale()













{
return Dimensions.get('window').fontScale||PixelRatio.get();}},{key:'getPixelSizeForLayoutSize',value:function getPixelSizeForLayoutSize(







layoutSize){
return Math.round(layoutSize*PixelRatio.get());}},{key:'roundToNearestPixel',value:function roundToNearestPixel(








layoutSize){
var ratio=PixelRatio.get();
return Math.round(layoutSize*ratio)/ratio;}},{key:'startDetecting',value:function startDetecting()



{}}]);return PixelRatio;}();


module.exports=PixelRatio;
});
__d(150 /* Dimensions */, function(global, require, module, exports) {'use strict';












var Platform=require(4 /* Platform */);
var UIManager=require(10 /* UIManager */);
var RCTDeviceEventEmitter=require(22 /* RCTDeviceEventEmitter */);

var invariant=require(363 /* fbjs/lib/invariant */);

var dimensions={};var 
Dimensions=function(){function Dimensions(){babelHelpers.classCallCheck(this,Dimensions);}babelHelpers.createClass(Dimensions,null,[{key:'set',value:function set(






dims){



if(dims&&dims.windowPhysicalPixels){

dims=JSON.parse(JSON.stringify(dims));

var windowPhysicalPixels=dims.windowPhysicalPixels;
dims.window={
width:windowPhysicalPixels.width/windowPhysicalPixels.scale,
height:windowPhysicalPixels.height/windowPhysicalPixels.scale,
scale:windowPhysicalPixels.scale,
fontScale:windowPhysicalPixels.fontScale};

if(Platform.OS==='android'){

var screenPhysicalPixels=dims.screenPhysicalPixels;
dims.screen={
width:screenPhysicalPixels.width/screenPhysicalPixels.scale,
height:screenPhysicalPixels.height/screenPhysicalPixels.scale,
scale:screenPhysicalPixels.scale,
fontScale:screenPhysicalPixels.fontScale};



delete dims.screenPhysicalPixels;}else 
{
dims.screen=dims.window;}


delete dims.windowPhysicalPixels;}


babelHelpers.extends(dimensions,dims);}},{key:'get',value:function get(

















dim){
invariant(dimensions[dim],'No dimension set for key '+dim);
return dimensions[dim];}}]);return Dimensions;}();



Dimensions.set(UIManager.Dimensions);
RCTDeviceEventEmitter.addListener('didUpdateDimensions',function(update){
Dimensions.set(update);});


module.exports=Dimensions;
});
__d(151 /* StyleSheetValidation */, function(global, require, module, exports) {'use strict';












var ImageStylePropTypes=require(131 /* ImageStylePropTypes */);
var ReactPropTypeLocations=require(82 /* ReactPropTypeLocations */);
var TextStylePropTypes=require(138 /* TextStylePropTypes */);
var ViewStylePropTypes=require(139 /* ViewStylePropTypes */);

var invariant=require(363 /* fbjs/lib/invariant */);var 

StyleSheetValidation=function(){function StyleSheetValidation(){babelHelpers.classCallCheck(this,StyleSheetValidation);}babelHelpers.createClass(StyleSheetValidation,null,[{key:'validateStyleProp',value:function validateStyleProp(
prop,style,caller){
if(!__DEV__){
return;}

if(allStylePropTypes[prop]===undefined){
var message1='"'+prop+'" is not a valid style property.';
var message2='\nValid style props: '+
JSON.stringify(Object.keys(allStylePropTypes).sort(),null,'  ');
styleError(message1,style,caller,message2);}

var error=allStylePropTypes[prop](
style,
prop,
caller,
ReactPropTypeLocations.prop);

if(error){
styleError(error.message,style,caller);}}},{key:'validateStyle',value:function validateStyle(



name,styles){
if(!__DEV__){
return;}

for(var prop in styles[name]){
StyleSheetValidation.validateStyleProp(prop,styles[name],'StyleSheet '+name);}}},{key:'addValidStylePropTypes',value:function addValidStylePropTypes(



stylePropTypes){
for(var key in stylePropTypes){
allStylePropTypes[key]=stylePropTypes[key];}}}]);return StyleSheetValidation;}();




var styleError=function(message1,style,caller,message2){
invariant(
false,
message1+'\n'+(caller||'<<unknown>>')+': '+
JSON.stringify(style,null,'  ')+(message2||''));};



var allStylePropTypes={};

StyleSheetValidation.addValidStylePropTypes(ImageStylePropTypes);
StyleSheetValidation.addValidStylePropTypes(TextStylePropTypes);
StyleSheetValidation.addValidStylePropTypes(ViewStylePropTypes);

module.exports=StyleSheetValidation;
});
__d(152 /* createReactNativeComponentClass */, function(global, require, module, exports) {'use strict';













var ReactNativeBaseComponent=require(153 /* ReactNativeBaseComponent */);












var createReactNativeComponentClass=function(
viewConfig)
{
var Constructor=function(element){
this._currentElement=element;

this._rootNodeID=null;
this._renderedChildren=null;};

Constructor.displayName=viewConfig.uiViewClassName;
Constructor.viewConfig=viewConfig;
Constructor.propTypes=viewConfig.propTypes;
Constructor.prototype=new ReactNativeBaseComponent(viewConfig);
Constructor.prototype.constructor=Constructor;

return Constructor;};


module.exports=createReactNativeComponentClass;
});
__d(153 /* ReactNativeBaseComponent */, function(global, require, module, exports) {'use strict';












var NativeMethodsMixin=require(2 /* NativeMethodsMixin */);
var ReactNativeAttributePayload=require(3 /* ReactNativeAttributePayload */);
var ReactNativeEventEmitter=require(124 /* ReactNativeEventEmitter */);
var ReactNativeTagHandles=require(40 /* ReactNativeTagHandles */);
var ReactMultiChild=require(154 /* ReactMultiChild */);
var UIManager=require(10 /* UIManager */);

var deepFreezeAndThrowOnMutationInDev=require(158 /* deepFreezeAndThrowOnMutationInDev */);
var invariant=require(363 /* fbjs/lib/invariant */);
var warning=require(368 /* fbjs/lib/warning */);

var registrationNames=ReactNativeEventEmitter.registrationNames;
var putListener=ReactNativeEventEmitter.putListener;
var deleteListener=ReactNativeEventEmitter.deleteListener;
var deleteAllListeners=ReactNativeEventEmitter.deleteAllListeners;














var ReactNativeBaseComponent=function(
viewConfig)
{
this.viewConfig=viewConfig;};






ReactNativeBaseComponent.Mixin={
getPublicInstance:function(){

return this;},


construct:function(element){
this._currentElement=element;},


unmountComponent:function(){
deleteAllListeners(this._rootNodeID);
this.unmountChildren();
this._rootNodeID=null;},










initializeChildren:function(children,containerTag,transaction,context){
var mountImages=this.mountChildren(children,transaction,context);



if(mountImages.length){



var createdTags=[];
for(var i=0,l=mountImages.length;i<l;i++){
var mountImage=mountImages[i];
var childTag=mountImage.tag;
var childID=mountImage.rootNodeID;
warning(
mountImage&&mountImage.rootNodeID&&mountImage.tag,
'Mount image returned does not have required data');

ReactNativeTagHandles.associateRootNodeIDWithMountedNodeHandle(
childID,
childTag);

createdTags[i]=mountImage.tag;}

UIManager.setChildren(containerTag,createdTags);}},











receiveComponent:function(nextElement,transaction,context){
var prevElement=this._currentElement;
this._currentElement=nextElement;

if(__DEV__){
for(var key in this.viewConfig.validAttributes){
if(nextElement.props.hasOwnProperty(key)){
deepFreezeAndThrowOnMutationInDev(nextElement.props[key]);}}}




var updatePayload=ReactNativeAttributePayload.diff(
prevElement.props,
nextElement.props,
this.viewConfig.validAttributes);


if(updatePayload){
UIManager.updateView(
ReactNativeTagHandles.mostRecentMountedNodeHandleForRootNodeID(this._rootNodeID),
this.viewConfig.uiViewClassName,
updatePayload);}



this._reconcileListenersUponUpdate(
prevElement.props,
nextElement.props);

this.updateChildren(nextElement.props.children,transaction,context);},





_registerListenersUponCreation:function(initialProps){
for(var key in initialProps){


if(registrationNames[key]&&initialProps[key]){
var listener=initialProps[key];
putListener(this._rootNodeID,key,listener);}}},









_reconcileListenersUponUpdate:function(prevProps,nextProps){
for(var key in nextProps){
if(registrationNames[key]&&nextProps[key]!==prevProps[key]){
if(nextProps[key]){
putListener(this._rootNodeID,key,nextProps[key]);}else 
{
deleteListener(this._rootNodeID,key);}}}},










mountComponent:function(rootID,transaction,context){
this._rootNodeID=rootID;

var tag=ReactNativeTagHandles.allocateTag();

if(__DEV__){
for(var key in this.viewConfig.validAttributes){
if(this._currentElement.props.hasOwnProperty(key)){
deepFreezeAndThrowOnMutationInDev(this._currentElement.props[key]);}}}




var updatePayload=ReactNativeAttributePayload.create(
this._currentElement.props,
this.viewConfig.validAttributes);


var nativeTopRootID=ReactNativeTagHandles.getNativeTopRootIDFromNodeID(rootID);
if(nativeTopRootID==null){
invariant(
false,
'nativeTopRootID not found for tag '+tag+' view type '+
this.viewConfig.uiViewClassName+' with rootID '+rootID);}

UIManager.createView(
tag,
this.viewConfig.uiViewClassName,
ReactNativeTagHandles.rootNodeIDToTag[nativeTopRootID],
updatePayload);


this._registerListenersUponCreation(this._currentElement.props);
this.initializeChildren(
this._currentElement.props.children,
tag,
transaction,
context);

return {
rootNodeID:rootID,
tag:tag};}};








babelHelpers.extends(
ReactNativeBaseComponent.prototype,
ReactMultiChild.Mixin,
ReactNativeBaseComponent.Mixin,
NativeMethodsMixin);


module.exports=ReactNativeBaseComponent;
});
__d(154 /* ReactMultiChild */, function(global, require, module, exports) {'use strict';













var ReactComponentEnvironment=require(81 /* ./ReactComponentEnvironment */);
var ReactMultiChildUpdateTypes=require(110 /* ./ReactMultiChildUpdateTypes */);

var ReactCurrentOwner=require(38 /* ./ReactCurrentOwner */);
var ReactReconciler=require(71 /* ./ReactReconciler */);
var ReactChildReconciler=require(155 /* ./ReactChildReconciler */);

var flattenChildren=require(157 /* ./flattenChildren */);








var updateDepth=0;









var updateQueue=[];







var markupQueue=[];









function enqueueInsertMarkup(parentID,markup,toIndex){

updateQueue.push({
parentID:parentID,
parentNode:null,
type:ReactMultiChildUpdateTypes.INSERT_MARKUP,
markupIndex:markupQueue.push(markup)-1,
content:null,
fromIndex:null,
toIndex:toIndex});}











function enqueueMove(parentID,fromIndex,toIndex){

updateQueue.push({
parentID:parentID,
parentNode:null,
type:ReactMultiChildUpdateTypes.MOVE_EXISTING,
markupIndex:null,
content:null,
fromIndex:fromIndex,
toIndex:toIndex});}










function enqueueRemove(parentID,fromIndex){

updateQueue.push({
parentID:parentID,
parentNode:null,
type:ReactMultiChildUpdateTypes.REMOVE_NODE,
markupIndex:null,
content:null,
fromIndex:fromIndex,
toIndex:null});}










function enqueueSetMarkup(parentID,markup){

updateQueue.push({
parentID:parentID,
parentNode:null,
type:ReactMultiChildUpdateTypes.SET_MARKUP,
markupIndex:null,
content:markup,
fromIndex:null,
toIndex:null});}










function enqueueTextContent(parentID,textContent){

updateQueue.push({
parentID:parentID,
parentNode:null,
type:ReactMultiChildUpdateTypes.TEXT_CONTENT,
markupIndex:null,
content:textContent,
fromIndex:null,
toIndex:null});}








function processQueue(){
if(updateQueue.length){
ReactComponentEnvironment.processChildrenUpdates(updateQueue,markupQueue);
clearQueue();}}








function clearQueue(){
updateQueue.length=0;
markupQueue.length=0;}








var ReactMultiChild={








Mixin:{

_reconcilerInstantiateChildren:function(nestedChildren,transaction,context){
if(process.env.NODE_ENV!=='production'){
if(this._currentElement){
try{
ReactCurrentOwner.current=this._currentElement._owner;
return ReactChildReconciler.instantiateChildren(nestedChildren,transaction,context);}finally 
{
ReactCurrentOwner.current=null;}}}



return ReactChildReconciler.instantiateChildren(nestedChildren,transaction,context);},


_reconcilerUpdateChildren:function(prevChildren,nextNestedChildrenElements,transaction,context){
var nextChildren;
if(process.env.NODE_ENV!=='production'){
if(this._currentElement){
try{
ReactCurrentOwner.current=this._currentElement._owner;
nextChildren=flattenChildren(nextNestedChildrenElements);}finally 
{
ReactCurrentOwner.current=null;}

return ReactChildReconciler.updateChildren(prevChildren,nextChildren,transaction,context);}}


nextChildren=flattenChildren(nextNestedChildrenElements);
return ReactChildReconciler.updateChildren(prevChildren,nextChildren,transaction,context);},










mountChildren:function(nestedChildren,transaction,context){
var children=this._reconcilerInstantiateChildren(nestedChildren,transaction,context);
this._renderedChildren=children;
var mountImages=[];
var index=0;
for(var name in children){
if(children.hasOwnProperty(name)){
var child=children[name];

var rootID=this._rootNodeID+name;
var mountImage=ReactReconciler.mountComponent(child,rootID,transaction,context);
child._mountIndex=index++;
mountImages.push(mountImage);}}


return mountImages;},








updateTextContent:function(nextContent){
updateDepth++;
var errorThrown=true;
try{
var prevChildren=this._renderedChildren;

ReactChildReconciler.unmountChildren(prevChildren);

for(var name in prevChildren){
if(prevChildren.hasOwnProperty(name)){
this._unmountChild(prevChildren[name]);}}



this.setTextContent(nextContent);
errorThrown=false;}finally 
{
updateDepth--;
if(!updateDepth){
if(errorThrown){
clearQueue();}else 
{
processQueue();}}}},











updateMarkup:function(nextMarkup){
updateDepth++;
var errorThrown=true;
try{
var prevChildren=this._renderedChildren;

ReactChildReconciler.unmountChildren(prevChildren);
for(var name in prevChildren){
if(prevChildren.hasOwnProperty(name)){
this._unmountChildByName(prevChildren[name],name);}}


this.setMarkup(nextMarkup);
errorThrown=false;}finally 
{
updateDepth--;
if(!updateDepth){
if(errorThrown){
clearQueue();}else 
{
processQueue();}}}},












updateChildren:function(nextNestedChildrenElements,transaction,context){
updateDepth++;
var errorThrown=true;
try{
this._updateChildren(nextNestedChildrenElements,transaction,context);
errorThrown=false;}finally 
{
updateDepth--;
if(!updateDepth){
if(errorThrown){
clearQueue();}else 
{
processQueue();}}}},














_updateChildren:function(nextNestedChildrenElements,transaction,context){
var prevChildren=this._renderedChildren;
var nextChildren=this._reconcilerUpdateChildren(prevChildren,nextNestedChildrenElements,transaction,context);
this._renderedChildren=nextChildren;
if(!nextChildren&&!prevChildren){
return;}

var name;


var lastIndex=0;
var nextIndex=0;
for(name in nextChildren){
if(!nextChildren.hasOwnProperty(name)){
continue;}

var prevChild=prevChildren&&prevChildren[name];
var nextChild=nextChildren[name];
if(prevChild===nextChild){
this.moveChild(prevChild,nextIndex,lastIndex);
lastIndex=Math.max(prevChild._mountIndex,lastIndex);
prevChild._mountIndex=nextIndex;}else 
{
if(prevChild){

lastIndex=Math.max(prevChild._mountIndex,lastIndex);
this._unmountChild(prevChild);}


this._mountChildByNameAtIndex(nextChild,name,nextIndex,transaction,context);}

nextIndex++;}


for(name in prevChildren){
if(prevChildren.hasOwnProperty(name)&&!(nextChildren&&nextChildren.hasOwnProperty(name))){
this._unmountChild(prevChildren[name]);}}},










unmountChildren:function(){
var renderedChildren=this._renderedChildren;
ReactChildReconciler.unmountChildren(renderedChildren);
this._renderedChildren=null;},










moveChild:function(child,toIndex,lastIndex){



if(child._mountIndex<lastIndex){
enqueueMove(this._rootNodeID,child._mountIndex,toIndex);}},










createChild:function(child,mountImage){
enqueueInsertMarkup(this._rootNodeID,mountImage,child._mountIndex);},








removeChild:function(child){
enqueueRemove(this._rootNodeID,child._mountIndex);},








setTextContent:function(textContent){
enqueueTextContent(this._rootNodeID,textContent);},








setMarkup:function(markup){
enqueueSetMarkup(this._rootNodeID,markup);},













_mountChildByNameAtIndex:function(child,name,index,transaction,context){

var rootID=this._rootNodeID+name;
var mountImage=ReactReconciler.mountComponent(child,rootID,transaction,context);
child._mountIndex=index;
this.createChild(child,mountImage);},










_unmountChild:function(child){
this.removeChild(child);
child._mountIndex=null;}}};






module.exports=ReactMultiChild;
});
__d(155 /* ReactChildReconciler */, function(global, require, module, exports) {'use strict';













var ReactReconciler=require(71 /* ./ReactReconciler */);

var instantiateReactComponent=require(79 /* ./instantiateReactComponent */);
var shouldUpdateReactComponent=require(83 /* ./shouldUpdateReactComponent */);
var traverseAllChildren=require(156 /* ./traverseAllChildren */);
var warning=require(386 /* fbjs/lib/warning */);

function instantiateChild(childInstances,child,name){

var keyUnique=childInstances[name]===undefined;
if(process.env.NODE_ENV!=='production'){
process.env.NODE_ENV!=='production'?warning(keyUnique,'flattenChildren(...): Encountered two children with the same key, '+'`%s`. Child keys must be unique; when two children share a key, only '+'the first child will be used.',name):undefined;}

if(child!=null&&keyUnique){
childInstances[name]=instantiateReactComponent(child,null);}}








var ReactChildReconciler={








instantiateChildren:function(nestedChildNodes,transaction,context){
if(nestedChildNodes==null){
return null;}

var childInstances={};
traverseAllChildren(nestedChildNodes,instantiateChild,childInstances);
return childInstances;},












updateChildren:function(prevChildren,nextChildren,transaction,context){





if(!nextChildren&&!prevChildren){
return null;}

var name;
for(name in nextChildren){
if(!nextChildren.hasOwnProperty(name)){
continue;}

var prevChild=prevChildren&&prevChildren[name];
var prevElement=prevChild&&prevChild._currentElement;
var nextElement=nextChildren[name];
if(prevChild!=null&&shouldUpdateReactComponent(prevElement,nextElement)){
ReactReconciler.receiveComponent(prevChild,nextElement,transaction,context);
nextChildren[name]=prevChild;}else 
{
if(prevChild){
ReactReconciler.unmountComponent(prevChild,name);}


var nextChildInstance=instantiateReactComponent(nextElement,null);
nextChildren[name]=nextChildInstance;}}



for(name in prevChildren){
if(prevChildren.hasOwnProperty(name)&&!(nextChildren&&nextChildren.hasOwnProperty(name))){
ReactReconciler.unmountComponent(prevChildren[name]);}}


return nextChildren;},









unmountChildren:function(renderedChildren){
for(var name in renderedChildren){
if(renderedChildren.hasOwnProperty(name)){
var renderedChild=renderedChildren[name];
ReactReconciler.unmountComponent(renderedChild);}}}};






module.exports=ReactChildReconciler;
});
__d(156 /* traverseAllChildren */, function(global, require, module, exports) {'use strict';












var ReactCurrentOwner=require(38 /* ./ReactCurrentOwner */);
var ReactElement=require(42 /* ./ReactElement */);
var ReactInstanceHandles=require(68 /* ./ReactInstanceHandles */);

var getIteratorFn=require(46 /* ./getIteratorFn */);
var invariant=require(384 /* fbjs/lib/invariant */);
var warning=require(386 /* fbjs/lib/warning */);

var SEPARATOR=ReactInstanceHandles.SEPARATOR;
var SUBSEPARATOR=':';






var userProvidedKeyEscaperLookup={
'=':'=0',
'.':'=1',
':':'=2'};


var userProvidedKeyEscapeRegex=/[=.:]/g;

var didWarnAboutMaps=false;

function userProvidedKeyEscaper(match){
return userProvidedKeyEscaperLookup[match];}









function getComponentKey(component,index){
if(component&&component.key!=null){

return wrapUserProvidedKey(component.key);}


return index.toString(36);}








function escapeUserProvidedKey(text){
return (''+text).replace(userProvidedKeyEscapeRegex,userProvidedKeyEscaper);}









function wrapUserProvidedKey(key){
return '$'+escapeUserProvidedKey(key);}










function traverseAllChildrenImpl(children,nameSoFar,callback,traverseContext){
var type=typeof children;

if(type==='undefined'||type==='boolean'){

children=null;}


if(children===null||type==='string'||type==='number'||ReactElement.isValidElement(children)){
callback(traverseContext,children,


nameSoFar===''?SEPARATOR+getComponentKey(children,0):nameSoFar);
return 1;}


var child;
var nextName;
var subtreeCount=0;
var nextNamePrefix=nameSoFar===''?SEPARATOR:nameSoFar+SUBSEPARATOR;

if(Array.isArray(children)){
for(var i=0;i<children.length;i++){
child=children[i];
nextName=nextNamePrefix+getComponentKey(child,i);
subtreeCount+=traverseAllChildrenImpl(child,nextName,callback,traverseContext);}}else 

{
var iteratorFn=getIteratorFn(children);
if(iteratorFn){
var iterator=iteratorFn.call(children);
var step;
if(iteratorFn!==children.entries){
var ii=0;
while(!(step=iterator.next()).done){
child=step.value;
nextName=nextNamePrefix+getComponentKey(child,ii++);
subtreeCount+=traverseAllChildrenImpl(child,nextName,callback,traverseContext);}}else 

{
if(process.env.NODE_ENV!=='production'){
process.env.NODE_ENV!=='production'?warning(didWarnAboutMaps,'Using Maps as children is not yet fully supported. It is an '+'experimental feature that might be removed. Convert it to a '+'sequence / iterable of keyed ReactElements instead.'):undefined;
didWarnAboutMaps=true;}


while(!(step=iterator.next()).done){
var entry=step.value;
if(entry){
child=entry[1];
nextName=nextNamePrefix+wrapUserProvidedKey(entry[0])+SUBSEPARATOR+getComponentKey(child,0);
subtreeCount+=traverseAllChildrenImpl(child,nextName,callback,traverseContext);}}}}else 



if(type==='object'){
var addendum='';
if(process.env.NODE_ENV!=='production'){
addendum=' If you meant to render a collection of children, use an array '+'instead or wrap the object using createFragment(object) from the '+'React add-ons.';
if(children._isReactElement){
addendum=' It looks like you\'re using an element created by a different '+'version of React. Make sure to use only one copy of React.';}

if(ReactCurrentOwner.current){
var name=ReactCurrentOwner.current.getName();
if(name){
addendum+=' Check the render method of `'+name+'`.';}}}



var childrenString=String(children);
!false?process.env.NODE_ENV!=='production'?invariant(false,'Objects are not valid as a React child (found: %s).%s',childrenString==='[object Object]'?'object with keys {'+Object.keys(children).join(', ')+'}':childrenString,addendum):invariant(false):undefined;}}



return subtreeCount;}


















function traverseAllChildren(children,callback,traverseContext){
if(children==null){
return 0;}


return traverseAllChildrenImpl(children,'',callback,traverseContext);}


module.exports=traverseAllChildren;
});
__d(157 /* flattenChildren */, function(global, require, module, exports) {'use strict';












var traverseAllChildren=require(156 /* ./traverseAllChildren */);
var warning=require(386 /* fbjs/lib/warning */);






function flattenSingleChildIntoContext(traverseContext,child,name){

var result=traverseContext;
var keyUnique=result[name]===undefined;
if(process.env.NODE_ENV!=='production'){
process.env.NODE_ENV!=='production'?warning(keyUnique,'flattenChildren(...): Encountered two children with the same key, '+'`%s`. Child keys must be unique; when two children share a key, only '+'the first child will be used.',name):undefined;}

if(keyUnique&&child!=null){
result[name]=child;}}








function flattenChildren(children){
if(children==null){
return children;}

var result={};
traverseAllChildren(children,flattenSingleChildIntoContext,result);
return result;}


module.exports=flattenChildren;
});
__d(158 /* deepFreezeAndThrowOnMutationInDev */, function(global, require, module, exports) {'use strict';






























function deepFreezeAndThrowOnMutationInDev(object){
if(__DEV__){
if(typeof object!=='object'||
object===null||
Object.isFrozen(object)||
Object.isSealed(object)){
return;}


for(var key in object){
if(object.hasOwnProperty(key)){
object.__defineGetter__(key,identity.bind(null,object[key]));
object.__defineSetter__(key,throwOnImmutableMutation.bind(null,key));}}



Object.freeze(object);
Object.seal(object);

for(var key in object){
if(object.hasOwnProperty(key)){
deepFreezeAndThrowOnMutationInDev(object[key]);}}}}





function throwOnImmutableMutation(key,value){
throw Error(
'You attempted to set the key `'+key+'` with the value `'+
JSON.stringify(value)+'` on an object that is meant to be immutable '+
'and has been frozen.');}



function identity(value){
return value;}


module.exports=deepFreezeAndThrowOnMutationInDev;
});
__d(159 /* insetsDiffer */, function(global, require, module, exports) {'use strict';



















var dummyInsets={
top:undefined,
left:undefined,
right:undefined,
bottom:undefined};


var insetsDiffer=function(
one,
two)
{
one=one||dummyInsets;
two=two||dummyInsets;
return one!==two&&(
one.top!==two.top||
one.left!==two.left||
one.right!==two.right||
one.bottom!==two.bottom);};



module.exports=insetsDiffer;
});
__d(160 /* pointsDiffer */, function(global, require, module, exports) {'use strict';

















var dummyPoint={x:undefined,y:undefined};

var pointsDiffer=function(one,two){
one=one||dummyPoint;
two=two||dummyPoint;
return one!==two&&(
one.x!==two.x||
one.y!==two.y);};



module.exports=pointsDiffer;
});
__d(161 /* resolveAssetSource */, function(global, require, module, exports) {'use strict';
















var AssetRegistry=require(162 /* AssetRegistry */);
var AssetSourceResolver=require(163 /* AssetSourceResolver */);var _require=
require(11 /* NativeModules */);var SourceCode=_require.SourceCode;

var _customSourceTransformer=void 0,_serverURL=void 0,_bundleSourcePath=void 0;

function getDevServerURL(){
if(_serverURL===undefined){
var scriptURL=SourceCode.scriptURL;
var match=scriptURL&&scriptURL.match(/^https?:\/\/.*?\//);
if(match){

_serverURL=match[0];}else 
{

_serverURL=null;}}


return _serverURL;}


function getBundleSourcePath(){
if(_bundleSourcePath===undefined){
var scriptURL=SourceCode.scriptURL;
if(!scriptURL){

_bundleSourcePath=null;
return _bundleSourcePath;}

if(scriptURL.startsWith('assets://')){

_bundleSourcePath=null;
return _bundleSourcePath;}

if(scriptURL.startsWith('file://')){

_bundleSourcePath=scriptURL.substring(7,scriptURL.lastIndexOf('/')+1);}else 
{
_bundleSourcePath=scriptURL.substring(0,scriptURL.lastIndexOf('/')+1);}}



return _bundleSourcePath;}


function setCustomSourceTransformer(
transformer)
{
_customSourceTransformer=transformer;}






function resolveAssetSource(source){
if(typeof source==='object'){
return source;}


var asset=AssetRegistry.getAssetByID(source);
if(!asset){
return null;}


var resolver=new AssetSourceResolver(getDevServerURL(),getBundleSourcePath(),asset);
if(_customSourceTransformer){
return _customSourceTransformer(resolver);}

return resolver.defaultAsset();}


module.exports=resolveAssetSource;
module.exports.pickScale=AssetSourceResolver.pickScale;
module.exports.setCustomSourceTransformer=setCustomSourceTransformer;
});
__d(162 /* AssetRegistry */, function(global, require, module, exports) {'use strict';




















var assets=[];

function registerAsset(asset){


return assets.push(asset);}


function getAssetByID(assetId){
return assets[assetId-1];}


module.exports={registerAsset:registerAsset,getAssetByID:getAssetByID};
});
__d(163 /* AssetSourceResolver */, function(global, require, module, exports) {var 





















PixelRatio=require(149 /* PixelRatio */);
var Platform=require(4 /* Platform */);

var assetPathUtils=require(341 /* ../../local-cli/bundle/assetPathUtils */);
var invariant=require(363 /* fbjs/lib/invariant */);




function getScaledAssetPath(asset){
var scale=AssetSourceResolver.pickScale(asset.scales,PixelRatio.get());
var scaleSuffix=scale===1?'':'@'+scale+'x';
var assetDir=assetPathUtils.getBasePath(asset);
return assetDir+'/'+asset.name+scaleSuffix+'.'+asset.type;}





function getAssetPathInDrawableFolder(asset){
var scale=AssetSourceResolver.pickScale(asset.scales,PixelRatio.get());
var drawbleFolder=assetPathUtils.getAndroidDrawableFolderName(asset,scale);
var fileName=assetPathUtils.getAndroidResourceIdentifier(asset);
return drawbleFolder+'/'+fileName+'.'+asset.type;}var 


AssetSourceResolver=function(){







function AssetSourceResolver(serverUrl,bundlePath,asset){babelHelpers.classCallCheck(this,AssetSourceResolver);
this.serverUrl=serverUrl;
this.bundlePath=bundlePath;
this.asset=asset;}babelHelpers.createClass(AssetSourceResolver,[{key:'isLoadedFromServer',value:function isLoadedFromServer()


{
return !!this.serverUrl;}},{key:'isLoadedFromFileSystem',value:function isLoadedFromFileSystem()


{
return !!this.bundlePath;}},{key:'defaultAsset',value:function defaultAsset()


{
if(this.isLoadedFromServer()){
return this.assetServerURL();}


if(Platform.OS==='android'){
return this.isLoadedFromFileSystem()?
this.drawableFolderInBundle():
this.resourceIdentifierWithoutScale();}else 
{
return this.scaledAssetPathInBundle();}}},{key:'assetServerURL',value:function assetServerURL()







{
invariant(!!this.serverUrl,'need server to load from');
return this.fromSource(
this.serverUrl+getScaledAssetPath(this.asset)+
'?platform='+Platform.OS+'&hash='+this.asset.hash);}},{key:'scaledAssetPath',value:function scaledAssetPath()







{
return this.fromSource(getScaledAssetPath(this.asset));}},{key:'scaledAssetPathInBundle',value:function scaledAssetPathInBundle()






{
var path=this.bundlePath||'';
return this.fromSource(path+getScaledAssetPath(this.asset));}},{key:'resourceIdentifierWithoutScale',value:function resourceIdentifierWithoutScale()








{
invariant(Platform.OS==='android','resource identifiers work on Android');
return this.fromSource(assetPathUtils.getAndroidResourceIdentifier(this.asset));}},{key:'drawableFolderInBundle',value:function drawableFolderInBundle()







{
var path=this.bundlePath||'';
return this.fromSource(
'file://'+path+getAssetPathInDrawableFolder(this.asset));}},{key:'fromSource',value:function fromSource(



source){
return {
__packager_asset:true,
width:this.asset.width,
height:this.asset.height,
uri:source,
scale:AssetSourceResolver.pickScale(this.asset.scales,PixelRatio.get())};}}],[{key:'pickScale',value:function pickScale(



scales,deviceScale){

for(var i=0;i<scales.length;i++){
if(scales[i]>=deviceScale){
return scales[i];}}






return scales[scales.length-1]||1;}}]);return AssetSourceResolver;}();




module.exports=AssetSourceResolver;
});
__d(341 /* react-native/local-cli/bundle/assetPathUtils.js */, function(global, require, module, exports) {'use strict';









function getAndroidAssetSuffix(scale){
switch(scale){
case 0.75:return 'ldpi';
case 1:return 'mdpi';
case 1.5:return 'hdpi';
case 2:return 'xhdpi';
case 3:return 'xxhdpi';
case 4:return 'xxxhdpi';}}



function getAndroidDrawableFolderName(asset,scale){
var suffix=getAndroidAssetSuffix(scale);
if(!suffix){
throw new Error(
'Don\'t know which android drawable suffix to use for asset: '+
JSON.stringify(asset));}


var androidFolder='drawable-'+suffix;
return androidFolder;}


function getAndroidResourceIdentifier(asset){
var folderPath=getBasePath(asset);
return (folderPath+'/'+asset.name).
toLowerCase().
replace(/\//g,'_').
replace(/([^a-z0-9_])/g,'').
replace(/^assets_/,'');}


function getBasePath(asset){
var basePath=asset.httpServerLocation;
if(basePath[0]==='/'){
basePath=basePath.substr(1);}

return basePath;}


module.exports={
getAndroidAssetSuffix:getAndroidAssetSuffix,
getAndroidDrawableFolderName:getAndroidDrawableFolderName,
getAndroidResourceIdentifier:getAndroidResourceIdentifier,
getBasePath:getBasePath};
});
__d(164 /* verifyPropTypes */, function(global, require, module, exports) {'use strict';












var ReactNativeStyleAttributes=require(130 /* ReactNativeStyleAttributes */);







function verifyPropTypes(
componentInterface,
viewConfig,
nativePropsToIgnore)
{
if(!viewConfig){
return;}

var componentName=componentInterface.name||
componentInterface.displayName||
'unknown';
if(!componentInterface.propTypes){
throw new Error(
'`'+componentName+'` has no propTypes defined`');}



var nativeProps=viewConfig.NativeProps;
for(var prop in nativeProps){
if(!componentInterface.propTypes[prop]&&
!ReactNativeStyleAttributes[prop]&&(
!nativePropsToIgnore||!nativePropsToIgnore[prop])){
var message;
if(componentInterface.propTypes.hasOwnProperty(prop)){
message='`'+componentName+'` has incorrectly defined propType for native prop `'+
viewConfig.uiViewClassName+'.'+prop+'` of native type `'+nativeProps[prop];}else 
{
message='`'+componentName+'` has no propType for native prop `'+
viewConfig.uiViewClassName+'.'+prop+'` of native type `'+
nativeProps[prop]+'`';}
;
message+='\nIf you haven\'t changed this prop yourself, this usually means that '+
'your versions of the native code and JavaScript code are out of sync. Updating both '+
'should make this error go away.';
throw new Error(message);}}}




module.exports=verifyPropTypes;
});
__d(165 /* ReactChildren */, function(global, require, module, exports) {'use strict';












var PooledClass=require(77 /* ./PooledClass */);
var ReactElement=require(42 /* ./ReactElement */);

var emptyFunction=require(379 /* fbjs/lib/emptyFunction */);
var traverseAllChildren=require(156 /* ./traverseAllChildren */);

var twoArgumentPooler=PooledClass.twoArgumentPooler;
var fourArgumentPooler=PooledClass.fourArgumentPooler;

var userProvidedKeyEscapeRegex=/\/(?!\/)/g;
function escapeUserProvidedKey(text){
return (''+text).replace(userProvidedKeyEscapeRegex,'//');}










function ForEachBookKeeping(forEachFunction,forEachContext){
this.func=forEachFunction;
this.context=forEachContext;
this.count=0;}

ForEachBookKeeping.prototype.destructor=function(){
this.func=null;
this.context=null;
this.count=0;};

PooledClass.addPoolingTo(ForEachBookKeeping,twoArgumentPooler);

function forEachSingleChild(bookKeeping,child,name){
var func=bookKeeping.func;
var context=bookKeeping.context;

func.call(context,child,bookKeeping.count++);}












function forEachChildren(children,forEachFunc,forEachContext){
if(children==null){
return children;}

var traverseContext=ForEachBookKeeping.getPooled(forEachFunc,forEachContext);
traverseAllChildren(children,forEachSingleChild,traverseContext);
ForEachBookKeeping.release(traverseContext);}











function MapBookKeeping(mapResult,keyPrefix,mapFunction,mapContext){
this.result=mapResult;
this.keyPrefix=keyPrefix;
this.func=mapFunction;
this.context=mapContext;
this.count=0;}

MapBookKeeping.prototype.destructor=function(){
this.result=null;
this.keyPrefix=null;
this.func=null;
this.context=null;
this.count=0;};

PooledClass.addPoolingTo(MapBookKeeping,fourArgumentPooler);

function mapSingleChildIntoContext(bookKeeping,child,childKey){
var result=bookKeeping.result;
var keyPrefix=bookKeeping.keyPrefix;
var func=bookKeeping.func;
var context=bookKeeping.context;

var mappedChild=func.call(context,child,bookKeeping.count++);
if(Array.isArray(mappedChild)){
mapIntoWithKeyPrefixInternal(mappedChild,result,childKey,emptyFunction.thatReturnsArgument);}else 
if(mappedChild!=null){
if(ReactElement.isValidElement(mappedChild)){
mappedChild=ReactElement.cloneAndReplaceKey(mappedChild,


keyPrefix+(mappedChild!==child?escapeUserProvidedKey(mappedChild.key||'')+'/':'')+childKey);}

result.push(mappedChild);}}



function mapIntoWithKeyPrefixInternal(children,array,prefix,func,context){
var escapedPrefix='';
if(prefix!=null){
escapedPrefix=escapeUserProvidedKey(prefix)+'/';}

var traverseContext=MapBookKeeping.getPooled(array,escapedPrefix,func,context);
traverseAllChildren(children,mapSingleChildIntoContext,traverseContext);
MapBookKeeping.release(traverseContext);}













function mapChildren(children,func,context){
if(children==null){
return children;}

var result=[];
mapIntoWithKeyPrefixInternal(children,result,null,func,context);
return result;}


function forEachSingleChildDummy(traverseContext,child,name){
return null;}









function countChildren(children,context){
return traverseAllChildren(children,forEachSingleChildDummy,null);}






function toArray(children){
var result=[];
mapIntoWithKeyPrefixInternal(children,result,null,emptyFunction.thatReturnsArgument);
return result;}


var ReactChildren={
forEach:forEachChildren,
map:mapChildren,
mapIntoWithKeyPrefixInternal:mapIntoWithKeyPrefixInternal,
count:countChildren,
toArray:toArray};


module.exports=ReactChildren;
});
__d(166 /* ReactClass */, function(global, require, module, exports) {'use strict';












var ReactComponent=require(167 /* ./ReactComponent */);
var ReactElement=require(42 /* ./ReactElement */);
var ReactPropTypeLocations=require(82 /* ./ReactPropTypeLocations */);
var ReactPropTypeLocationNames=require(45 /* ./ReactPropTypeLocationNames */);
var ReactNoopUpdateQueue=require(168 /* ./ReactNoopUpdateQueue */);

var assign=require(43 /* ./Object.assign */);
var emptyObject=require(387 /* fbjs/lib/emptyObject */);
var invariant=require(384 /* fbjs/lib/invariant */);
var keyMirror=require(388 /* fbjs/lib/keyMirror */);
var keyOf=require(520 /* fbjs/lib/keyOf */);
var warning=require(386 /* fbjs/lib/warning */);

var MIXINS_KEY=keyOf({mixins:null});




var SpecPolicy=keyMirror({



DEFINE_ONCE:null,




DEFINE_MANY:null,



OVERRIDE_BASE:null,





DEFINE_MANY_MERGED:null});


var injectedMixins=[];

var warnedSetProps=false;
function warnSetProps(){
if(!warnedSetProps){
warnedSetProps=true;
process.env.NODE_ENV!=='production'?warning(false,'setProps(...) and replaceProps(...) are deprecated. '+'Instead, call render again at the top level.'):undefined;}}

























var ReactClassInterface={







mixins:SpecPolicy.DEFINE_MANY,








statics:SpecPolicy.DEFINE_MANY,







propTypes:SpecPolicy.DEFINE_MANY,







contextTypes:SpecPolicy.DEFINE_MANY,







childContextTypes:SpecPolicy.DEFINE_MANY,













getDefaultProps:SpecPolicy.DEFINE_MANY_MERGED,















getInitialState:SpecPolicy.DEFINE_MANY_MERGED,





getChildContext:SpecPolicy.DEFINE_MANY_MERGED,

















render:SpecPolicy.DEFINE_ONCE,










componentWillMount:SpecPolicy.DEFINE_MANY,











componentDidMount:SpecPolicy.DEFINE_MANY,




















componentWillReceiveProps:SpecPolicy.DEFINE_MANY,





















shouldComponentUpdate:SpecPolicy.DEFINE_ONCE,
















componentWillUpdate:SpecPolicy.DEFINE_MANY,













componentDidUpdate:SpecPolicy.DEFINE_MANY,












componentWillUnmount:SpecPolicy.DEFINE_MANY,













updateComponent:SpecPolicy.OVERRIDE_BASE};












var RESERVED_SPEC_KEYS={
displayName:function(Constructor,displayName){
Constructor.displayName=displayName;},

mixins:function(Constructor,mixins){
if(mixins){
for(var i=0;i<mixins.length;i++){
mixSpecIntoComponent(Constructor,mixins[i]);}}},



childContextTypes:function(Constructor,childContextTypes){
if(process.env.NODE_ENV!=='production'){
validateTypeDef(Constructor,childContextTypes,ReactPropTypeLocations.childContext);}

Constructor.childContextTypes=assign({},Constructor.childContextTypes,childContextTypes);},

contextTypes:function(Constructor,contextTypes){
if(process.env.NODE_ENV!=='production'){
validateTypeDef(Constructor,contextTypes,ReactPropTypeLocations.context);}

Constructor.contextTypes=assign({},Constructor.contextTypes,contextTypes);},





getDefaultProps:function(Constructor,getDefaultProps){
if(Constructor.getDefaultProps){
Constructor.getDefaultProps=createMergedResultFunction(Constructor.getDefaultProps,getDefaultProps);}else 
{
Constructor.getDefaultProps=getDefaultProps;}},


propTypes:function(Constructor,propTypes){
if(process.env.NODE_ENV!=='production'){
validateTypeDef(Constructor,propTypes,ReactPropTypeLocations.prop);}

Constructor.propTypes=assign({},Constructor.propTypes,propTypes);},

statics:function(Constructor,statics){
mixStaticSpecIntoComponent(Constructor,statics);},

autobind:function(){}};


function validateTypeDef(Constructor,typeDef,location){
for(var propName in typeDef){
if(typeDef.hasOwnProperty(propName)){


process.env.NODE_ENV!=='production'?warning(typeof typeDef[propName]==='function','%s: %s type `%s` is invalid; it must be a function, usually from '+'React.PropTypes.',Constructor.displayName||'ReactClass',ReactPropTypeLocationNames[location],propName):undefined;}}}




function validateMethodOverride(proto,name){
var specPolicy=ReactClassInterface.hasOwnProperty(name)?ReactClassInterface[name]:null;


if(ReactClassMixin.hasOwnProperty(name)){
!(specPolicy===SpecPolicy.OVERRIDE_BASE)?process.env.NODE_ENV!=='production'?invariant(false,'ReactClassInterface: You are attempting to override '+'`%s` from your class specification. Ensure that your method names '+'do not overlap with React methods.',name):invariant(false):undefined;}



if(proto.hasOwnProperty(name)){
!(specPolicy===SpecPolicy.DEFINE_MANY||specPolicy===SpecPolicy.DEFINE_MANY_MERGED)?process.env.NODE_ENV!=='production'?invariant(false,'ReactClassInterface: You are attempting to define '+'`%s` on your component more than once. This conflict may be due '+'to a mixin.',name):invariant(false):undefined;}}







function mixSpecIntoComponent(Constructor,spec){
if(!spec){
return;}


!(typeof spec!=='function')?process.env.NODE_ENV!=='production'?invariant(false,'ReactClass: You\'re attempting to '+'use a component class as a mixin. Instead, just use a regular object.'):invariant(false):undefined;
!!ReactElement.isValidElement(spec)?process.env.NODE_ENV!=='production'?invariant(false,'ReactClass: You\'re attempting to '+'use a component as a mixin. Instead, just use a regular object.'):invariant(false):undefined;

var proto=Constructor.prototype;




if(spec.hasOwnProperty(MIXINS_KEY)){
RESERVED_SPEC_KEYS.mixins(Constructor,spec.mixins);}


for(var name in spec){
if(!spec.hasOwnProperty(name)){
continue;}


if(name===MIXINS_KEY){

continue;}


var property=spec[name];
validateMethodOverride(proto,name);

if(RESERVED_SPEC_KEYS.hasOwnProperty(name)){
RESERVED_SPEC_KEYS[name](Constructor,property);}else 
{




var isReactClassMethod=ReactClassInterface.hasOwnProperty(name);
var isAlreadyDefined=proto.hasOwnProperty(name);
var isFunction=typeof property==='function';
var shouldAutoBind=isFunction&&!isReactClassMethod&&!isAlreadyDefined&&spec.autobind!==false;

if(shouldAutoBind){
if(!proto.__reactAutoBindMap){
proto.__reactAutoBindMap={};}

proto.__reactAutoBindMap[name]=property;
proto[name]=property;}else 
{
if(isAlreadyDefined){
var specPolicy=ReactClassInterface[name];


!(isReactClassMethod&&(specPolicy===SpecPolicy.DEFINE_MANY_MERGED||specPolicy===SpecPolicy.DEFINE_MANY))?process.env.NODE_ENV!=='production'?invariant(false,'ReactClass: Unexpected spec policy %s for key %s '+'when mixing in component specs.',specPolicy,name):invariant(false):undefined;



if(specPolicy===SpecPolicy.DEFINE_MANY_MERGED){
proto[name]=createMergedResultFunction(proto[name],property);}else 
if(specPolicy===SpecPolicy.DEFINE_MANY){
proto[name]=createChainedFunction(proto[name],property);}}else 

{
proto[name]=property;
if(process.env.NODE_ENV!=='production'){


if(typeof property==='function'&&spec.displayName){
proto[name].displayName=spec.displayName+'_'+name;}}}}}}}








function mixStaticSpecIntoComponent(Constructor,statics){
if(!statics){
return;}

for(var name in statics){
var property=statics[name];
if(!statics.hasOwnProperty(name)){
continue;}


var isReserved=name in RESERVED_SPEC_KEYS;
!!isReserved?process.env.NODE_ENV!=='production'?invariant(false,'ReactClass: You are attempting to define a reserved '+'property, `%s`, that shouldn\'t be on the "statics" key. Define it '+'as an instance property instead; it will still be accessible on the '+'constructor.',name):invariant(false):undefined;

var isInherited=name in Constructor;
!!isInherited?process.env.NODE_ENV!=='production'?invariant(false,'ReactClass: You are attempting to define '+'`%s` on your component more than once. This conflict may be '+'due to a mixin.',name):invariant(false):undefined;
Constructor[name]=property;}}










function mergeIntoWithNoDuplicateKeys(one,two){
!(one&&two&&typeof one==='object'&&typeof two==='object')?process.env.NODE_ENV!=='production'?invariant(false,'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.'):invariant(false):undefined;

for(var key in two){
if(two.hasOwnProperty(key)){
!(one[key]===undefined)?process.env.NODE_ENV!=='production'?invariant(false,'mergeIntoWithNoDuplicateKeys(): '+'Tried to merge two objects with the same key: `%s`. This conflict '+'may be due to a mixin; in particular, this may be caused by two '+'getInitialState() or getDefaultProps() methods returning objects '+'with clashing keys.',key):invariant(false):undefined;
one[key]=two[key];}}


return one;}










function createMergedResultFunction(one,two){
return function mergedResult(){
var a=one.apply(this,arguments);
var b=two.apply(this,arguments);
if(a==null){
return b;}else 
if(b==null){
return a;}

var c={};
mergeIntoWithNoDuplicateKeys(c,a);
mergeIntoWithNoDuplicateKeys(c,b);
return c;};}











function createChainedFunction(one,two){
return function chainedFunction(){
one.apply(this,arguments);
two.apply(this,arguments);};}










function bindAutoBindMethod(component,method){
var boundMethod=method.bind(component);
if(process.env.NODE_ENV!=='production'){
boundMethod.__reactBoundContext=component;
boundMethod.__reactBoundMethod=method;
boundMethod.__reactBoundArguments=null;
var componentName=component.constructor.displayName;
var _bind=boundMethod.bind;

boundMethod.bind=function(newThis){
for(var _len=arguments.length,args=Array(_len>1?_len-1:0),_key=1;_key<_len;_key++){
args[_key-1]=arguments[_key];}





if(newThis!==component&&newThis!==null){
process.env.NODE_ENV!=='production'?warning(false,'bind(): React component methods may only be bound to the '+'component instance. See %s',componentName):undefined;}else 
if(!args.length){
process.env.NODE_ENV!=='production'?warning(false,'bind(): You are binding a component method to the component. '+'React does this for you automatically in a high-performance '+'way, so you can safely remove this call. See %s',componentName):undefined;
return boundMethod;}

var reboundMethod=_bind.apply(boundMethod,arguments);
reboundMethod.__reactBoundContext=component;
reboundMethod.__reactBoundMethod=method;
reboundMethod.__reactBoundArguments=args;
return reboundMethod;};}



return boundMethod;}







function bindAutoBindMethods(component){
for(var autoBindKey in component.__reactAutoBindMap){
if(component.__reactAutoBindMap.hasOwnProperty(autoBindKey)){
var method=component.__reactAutoBindMap[autoBindKey];
component[autoBindKey]=bindAutoBindMethod(component,method);}}}








var ReactClassMixin={





replaceState:function(newState,callback){
this.updater.enqueueReplaceState(this,newState);
if(callback){
this.updater.enqueueCallback(this,callback);}},









isMounted:function(){
return this.updater.isMounted(this);},











setProps:function(partialProps,callback){
if(process.env.NODE_ENV!=='production'){
warnSetProps();}

this.updater.enqueueSetProps(this,partialProps);
if(callback){
this.updater.enqueueCallback(this,callback);}},












replaceProps:function(newProps,callback){
if(process.env.NODE_ENV!=='production'){
warnSetProps();}

this.updater.enqueueReplaceProps(this,newProps);
if(callback){
this.updater.enqueueCallback(this,callback);}}};




var ReactClassComponent=function(){};
assign(ReactClassComponent.prototype,ReactComponent.prototype,ReactClassMixin);






var ReactClass={








createClass:function(spec){
var Constructor=function(props,context,updater){



if(process.env.NODE_ENV!=='production'){
process.env.NODE_ENV!=='production'?warning(this instanceof Constructor,'Something is calling a React component directly. Use a factory or '+'JSX instead. See: https://fb.me/react-legacyfactory'):undefined;}



if(this.__reactAutoBindMap){
bindAutoBindMethods(this);}


this.props=props;
this.context=context;
this.refs=emptyObject;
this.updater=updater||ReactNoopUpdateQueue;

this.state=null;




var initialState=this.getInitialState?this.getInitialState():null;
if(process.env.NODE_ENV!=='production'){

if(typeof initialState==='undefined'&&this.getInitialState._isMockFunction){


initialState=null;}}


!(typeof initialState==='object'&&!Array.isArray(initialState))?process.env.NODE_ENV!=='production'?invariant(false,'%s.getInitialState(): must return an object or null',Constructor.displayName||'ReactCompositeComponent'):invariant(false):undefined;

this.state=initialState;};

Constructor.prototype=new ReactClassComponent();
Constructor.prototype.constructor=Constructor;

injectedMixins.forEach(mixSpecIntoComponent.bind(null,Constructor));

mixSpecIntoComponent(Constructor,spec);


if(Constructor.getDefaultProps){
Constructor.defaultProps=Constructor.getDefaultProps();}


if(process.env.NODE_ENV!=='production'){




if(Constructor.getDefaultProps){
Constructor.getDefaultProps.isReactClassApproved={};}

if(Constructor.prototype.getInitialState){
Constructor.prototype.getInitialState.isReactClassApproved={};}}



!Constructor.prototype.render?process.env.NODE_ENV!=='production'?invariant(false,'createClass(...): Class specification must implement a `render` method.'):invariant(false):undefined;

if(process.env.NODE_ENV!=='production'){
process.env.NODE_ENV!=='production'?warning(!Constructor.prototype.componentShouldUpdate,'%s has a method called '+'componentShouldUpdate(). Did you mean shouldComponentUpdate()? '+'The name is phrased as a question because the function is '+'expected to return a value.',spec.displayName||'A component'):undefined;
process.env.NODE_ENV!=='production'?warning(!Constructor.prototype.componentWillRecieveProps,'%s has a method called '+'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?',spec.displayName||'A component'):undefined;}



for(var methodName in ReactClassInterface){
if(!Constructor.prototype[methodName]){
Constructor.prototype[methodName]=null;}}



return Constructor;},


injection:{
injectMixin:function(mixin){
injectedMixins.push(mixin);}}};





module.exports=ReactClass;
});
__d(167 /* ReactComponent */, function(global, require, module, exports) {'use strict';












var ReactNoopUpdateQueue=require(168 /* ./ReactNoopUpdateQueue */);

var canDefineProperty=require(44 /* ./canDefineProperty */);
var emptyObject=require(387 /* fbjs/lib/emptyObject */);
var invariant=require(384 /* fbjs/lib/invariant */);
var warning=require(386 /* fbjs/lib/warning */);




function ReactComponent(props,context,updater){
this.props=props;
this.context=context;
this.refs=emptyObject;


this.updater=updater||ReactNoopUpdateQueue;}


ReactComponent.prototype.isReactComponent={};


























ReactComponent.prototype.setState=function(partialState,callback){
!(typeof partialState==='object'||typeof partialState==='function'||partialState==null)?process.env.NODE_ENV!=='production'?invariant(false,'setState(...): takes an object of state variables to update or a '+'function which returns an object of state variables.'):invariant(false):undefined;
if(process.env.NODE_ENV!=='production'){
process.env.NODE_ENV!=='production'?warning(partialState!=null,'setState(...): You passed an undefined or null state object; '+'instead, use forceUpdate().'):undefined;}

this.updater.enqueueSetState(this,partialState);
if(callback){
this.updater.enqueueCallback(this,callback);}};

















ReactComponent.prototype.forceUpdate=function(callback){
this.updater.enqueueForceUpdate(this);
if(callback){
this.updater.enqueueCallback(this,callback);}};








if(process.env.NODE_ENV!=='production'){
var deprecatedAPIs={
getDOMNode:['getDOMNode','Use ReactDOM.findDOMNode(component) instead.'],
isMounted:['isMounted','Instead, make sure to clean up subscriptions and pending requests in '+'componentWillUnmount to prevent memory leaks.'],
replaceProps:['replaceProps','Instead, call render again at the top level.'],
replaceState:['replaceState','Refactor your code to use setState instead (see '+'https://github.com/facebook/react/issues/3236).'],
setProps:['setProps','Instead, call render again at the top level.']};

var defineDeprecationWarning=function(methodName,info){
if(canDefineProperty){
Object.defineProperty(ReactComponent.prototype,methodName,{
get:function(){
process.env.NODE_ENV!=='production'?warning(false,'%s(...) is deprecated in plain JavaScript React classes. %s',info[0],info[1]):undefined;
return undefined;}});}};




for(var fnName in deprecatedAPIs){
if(deprecatedAPIs.hasOwnProperty(fnName)){
defineDeprecationWarning(fnName,deprecatedAPIs[fnName]);}}}




module.exports=ReactComponent;
});
__d(168 /* ReactNoopUpdateQueue */, function(global, require, module, exports) {'use strict';












var warning=require(386 /* fbjs/lib/warning */);

function warnTDZ(publicInstance,callerName){
if(process.env.NODE_ENV!=='production'){
process.env.NODE_ENV!=='production'?warning(false,'%s(...): Can only update a mounted or mounting component. '+'This usually means you called %s() on an unmounted component. '+'This is a no-op. Please check the code for the %s component.',callerName,callerName,publicInstance.constructor&&publicInstance.constructor.displayName||''):undefined;}}






var ReactNoopUpdateQueue={








isMounted:function(publicInstance){
return false;},










enqueueCallback:function(publicInstance,callback){},














enqueueForceUpdate:function(publicInstance){
warnTDZ(publicInstance,'forceUpdate');},













enqueueReplaceState:function(publicInstance,completeState){
warnTDZ(publicInstance,'replaceState');},












enqueueSetState:function(publicInstance,partialState){
warnTDZ(publicInstance,'setState');},









enqueueSetProps:function(publicInstance,partialProps){
warnTDZ(publicInstance,'setProps');},









enqueueReplaceProps:function(publicInstance,props){
warnTDZ(publicInstance,'replaceProps');}};




module.exports=ReactNoopUpdateQueue;
});
__d(169 /* ReactElementValidator */, function(global, require, module, exports) {'use strict';



















var ReactElement=require(42 /* ./ReactElement */);
var ReactPropTypeLocations=require(82 /* ./ReactPropTypeLocations */);
var ReactPropTypeLocationNames=require(45 /* ./ReactPropTypeLocationNames */);
var ReactCurrentOwner=require(38 /* ./ReactCurrentOwner */);

var canDefineProperty=require(44 /* ./canDefineProperty */);
var getIteratorFn=require(46 /* ./getIteratorFn */);
var invariant=require(384 /* fbjs/lib/invariant */);
var warning=require(386 /* fbjs/lib/warning */);

function getDeclarationErrorAddendum(){
if(ReactCurrentOwner.current){
var name=ReactCurrentOwner.current.getName();
if(name){
return ' Check the render method of `'+name+'`.';}}


return '';}







var ownerHasKeyUseWarning={};

var loggedTypeFailures={};











function validateExplicitKey(element,parentType){
if(!element._store||element._store.validated||element.key!=null){
return;}

element._store.validated=true;

var addenda=getAddendaForKeyUse('uniqueKey',element,parentType);
if(addenda===null){

return;}

process.env.NODE_ENV!=='production'?warning(false,'Each child in an array or iterator should have a unique "key" prop.'+'%s%s%s',addenda.parentOrOwner||'',addenda.childOwner||'',addenda.url||''):undefined;}












function getAddendaForKeyUse(messageType,element,parentType){
var addendum=getDeclarationErrorAddendum();
if(!addendum){
var parentName=typeof parentType==='string'?parentType:parentType.displayName||parentType.name;
if(parentName){
addendum=' Check the top-level render call using <'+parentName+'>.';}}



var memoizer=ownerHasKeyUseWarning[messageType]||(ownerHasKeyUseWarning[messageType]={});
if(memoizer[addendum]){
return null;}

memoizer[addendum]=true;

var addenda={
parentOrOwner:addendum,
url:' See https://fb.me/react-warning-keys for more information.',
childOwner:null};





if(element&&element._owner&&element._owner!==ReactCurrentOwner.current){

addenda.childOwner=' It was passed a child from '+element._owner.getName()+'.';}


return addenda;}











function validateChildKeys(node,parentType){
if(typeof node!=='object'){
return;}

if(Array.isArray(node)){
for(var i=0;i<node.length;i++){
var child=node[i];
if(ReactElement.isValidElement(child)){
validateExplicitKey(child,parentType);}}}else 


if(ReactElement.isValidElement(node)){

if(node._store){
node._store.validated=true;}}else 

if(node){
var iteratorFn=getIteratorFn(node);

if(iteratorFn){
if(iteratorFn!==node.entries){
var iterator=iteratorFn.call(node);
var step;
while(!(step=iterator.next()).done){
if(ReactElement.isValidElement(step.value)){
validateExplicitKey(step.value,parentType);}}}}}}
















function checkPropTypes(componentName,propTypes,props,location){
for(var propName in propTypes){
if(propTypes.hasOwnProperty(propName)){
var error;



try{


!(typeof propTypes[propName]==='function')?process.env.NODE_ENV!=='production'?invariant(false,'%s: %s type `%s` is invalid; it must be a function, usually from '+'React.PropTypes.',componentName||'React class',ReactPropTypeLocationNames[location],propName):invariant(false):undefined;
error=propTypes[propName](props,propName,componentName,location);}
catch(ex){
error=ex;}

process.env.NODE_ENV!=='production'?warning(!error||error instanceof Error,'%s: type specification of %s `%s` is invalid; the type checker '+'function must return `null` or an `Error` but returned a %s. '+'You may have forgotten to pass an argument to the type checker '+'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and '+'shape all require an argument).',componentName||'React class',ReactPropTypeLocationNames[location],propName,typeof error):undefined;
if(error instanceof Error&&!(error.message in loggedTypeFailures)){


loggedTypeFailures[error.message]=true;

var addendum=getDeclarationErrorAddendum();
process.env.NODE_ENV!=='production'?warning(false,'Failed propType: %s%s',error.message,addendum):undefined;}}}}











function validatePropTypes(element){
var componentClass=element.type;
if(typeof componentClass!=='function'){
return;}

var name=componentClass.displayName||componentClass.name;
if(componentClass.propTypes){
checkPropTypes(name,componentClass.propTypes,element.props,ReactPropTypeLocations.prop);}

if(typeof componentClass.getDefaultProps==='function'){
process.env.NODE_ENV!=='production'?warning(componentClass.getDefaultProps.isReactClassApproved,'getDefaultProps is only used on classic React.createClass '+'definitions. Use a static property named `defaultProps` instead.'):undefined;}}



var ReactElementValidator={

createElement:function(type,props,children){
var validType=typeof type==='string'||typeof type==='function';


process.env.NODE_ENV!=='production'?warning(validType,'React.createElement: type should not be null, undefined, boolean, or '+'number. It should be a string (for DOM elements) or a ReactClass '+'(for composite components).%s',getDeclarationErrorAddendum()):undefined;

var element=ReactElement.createElement.apply(this,arguments);



if(element==null){
return element;}







if(validType){
for(var i=2;i<arguments.length;i++){
validateChildKeys(arguments[i],type);}}



validatePropTypes(element);

return element;},


createFactory:function(type){
var validatedFactory=ReactElementValidator.createElement.bind(null,type);

validatedFactory.type=type;

if(process.env.NODE_ENV!=='production'){
if(canDefineProperty){
Object.defineProperty(validatedFactory,'type',{
enumerable:false,
get:function(){
process.env.NODE_ENV!=='production'?warning(false,'Factory.type is deprecated. Access the class directly '+'before passing it to createFactory.'):undefined;
Object.defineProperty(this,'type',{
value:type});

return type;}});}}





return validatedFactory;},


cloneElement:function(element,props,children){
var newElement=ReactElement.cloneElement.apply(this,arguments);
for(var i=2;i<arguments.length;i++){
validateChildKeys(arguments[i],newElement.type);}

validatePropTypes(newElement);
return newElement;}};




module.exports=ReactElementValidator;
});
__d(170 /* onlyChild */, function(global, require, module, exports) {'use strict';











var ReactElement=require(42 /* ./ReactElement */);

var invariant=require(384 /* fbjs/lib/invariant */);












function onlyChild(children){
!ReactElement.isValidElement(children)?process.env.NODE_ENV!=='production'?invariant(false,'onlyChild must be passed a children with exactly one child.'):invariant(false):undefined;
return children;}


module.exports=onlyChild;
});
__d(171 /* ReactNativeART */, function(global, require, module, exports) {'use strict';











var Color=require(524 /* art/core/color */);
var Path=require(172 /* ARTSerializablePath */);
var Transform=require(522 /* art/core/transform */);

var React=require(47 /* React */);
var ReactNativeViewAttributes=require(144 /* ReactNativeViewAttributes */);

var createReactNativeComponentClass=require(152 /* createReactNativeComponentClass */);
var merge=require(103 /* merge */);



function arrayDiffer(a,b){
if(a==null){
return true;}

if(a.length!==b.length){
return true;}

for(var i=0;i<a.length;i++){
if(a[i]!==b[i]){
return true;}}


return false;}


function fontAndLinesDiffer(a,b){
if(a===b){
return false;}

if(a.font!==b.font){
if(a.font===null){
return true;}

if(b.font===null){
return true;}


if(
a.font.fontFamily!==b.font.fontFamily||
a.font.fontSize!==b.font.fontSize||
a.font.fontWeight!==b.font.fontWeight||
a.font.fontStyle!==b.font.fontStyle)
{
return true;}}


return arrayDiffer(a.lines,b.lines);}




var SurfaceViewAttributes=merge(ReactNativeViewAttributes.UIView,{});





var NodeAttributes={
transform:{diff:arrayDiffer},
opacity:true};


var GroupAttributes=merge(NodeAttributes,{
clipping:{diff:arrayDiffer}});


var RenderableAttributes=merge(NodeAttributes,{
fill:{diff:arrayDiffer},
stroke:{diff:arrayDiffer},
strokeWidth:true,
strokeCap:true,
strokeJoin:true,
strokeDash:{diff:arrayDiffer}});


var ShapeAttributes=merge(RenderableAttributes,{
d:{diff:arrayDiffer}});


var TextAttributes=merge(RenderableAttributes,{
alignment:true,
frame:{diff:fontAndLinesDiffer},
path:{diff:arrayDiffer}});




var NativeSurfaceView=createReactNativeComponentClass({
validAttributes:SurfaceViewAttributes,
uiViewClassName:'ARTSurfaceView'});


var NativeGroup=createReactNativeComponentClass({
validAttributes:GroupAttributes,
uiViewClassName:'ARTGroup'});


var NativeShape=createReactNativeComponentClass({
validAttributes:ShapeAttributes,
uiViewClassName:'ARTShape'});


var NativeText=createReactNativeComponentClass({
validAttributes:TextAttributes,
uiViewClassName:'ARTText'});




function childrenAsString(children){
if(!children){
return '';}

if(typeof children==='string'){
return children;}

if(children.length){
return children.join('\n');}

return '';}




var Surface=React.createClass({displayName:'Surface',

render:function(){
var props=this.props;
var w=extractNumber(props.width,0);
var h=extractNumber(props.height,0);
return (
React.createElement(NativeSurfaceView,{style:[props.style,{width:w,height:h}]},
this.props.children));}});











function extractNumber(value,defaultValue){
if(value==null){
return defaultValue;}

return +value;}


var pooledTransform=new Transform();

function extractTransform(props){
var scaleX=props.scaleX!=null?props.scaleX:
props.scale!=null?props.scale:1;
var scaleY=props.scaleY!=null?props.scaleY:
props.scale!=null?props.scale:1;

pooledTransform.
transformTo(1,0,0,1,0,0).
move(props.x||0,props.y||0).
rotate(props.rotation||0,props.originX,props.originY).
scale(scaleX,scaleY,props.originX,props.originY);

if(props.transform!=null){
pooledTransform.transform(props.transform);}


return [
pooledTransform.xx,pooledTransform.yx,
pooledTransform.xy,pooledTransform.yy,
pooledTransform.x,pooledTransform.y];}



function extractOpacity(props){

if(props.visible===false){
return 0;}

if(props.opacity==null){
return 1;}

return +props.opacity;}







var Group=React.createClass({displayName:'Group',

render:function(){
var props=this.props;
return (
React.createElement(NativeGroup,{
opacity:extractOpacity(props),
transform:extractTransform(props)},
this.props.children));}});






var ClippingRectangle=React.createClass({displayName:'ClippingRectangle',

render:function(){
var props=this.props;
var x=extractNumber(props.x,0);
var y=extractNumber(props.y,0);
var w=extractNumber(props.width,0);
var h=extractNumber(props.height,0);
var clipping=new Path().
moveTo(x,y).
line(w,0).
line(0,h).
line(w,0).
close().
toJSON();

var propsExcludingXAndY=merge(props);
delete propsExcludingXAndY.x;
delete propsExcludingXAndY.y;
return (
React.createElement(NativeGroup,{
clipping:clipping,
opacity:extractOpacity(props),
transform:extractTransform(propsExcludingXAndY)},
this.props.children));}});








var SOLID_COLOR=0;
var LINEAR_GRADIENT=1;
var RADIAL_GRADIENT=2;
var PATTERN=3;

function insertColorIntoArray(color,targetArray,atIndex){
var c=new Color(color);
targetArray[atIndex+0]=c.red/255;
targetArray[atIndex+1]=c.green/255;
targetArray[atIndex+2]=c.blue/255;
targetArray[atIndex+3]=c.alpha;}


function insertColorsIntoArray(stops,targetArray,atIndex){
var i=0;
if('length' in stops){
while(i<stops.length){
insertColorIntoArray(stops[i],targetArray,atIndex+i*4);
i++;}}else 

{
for(var offset in stops){
insertColorIntoArray(stops[offset],targetArray,atIndex+i*4);
i++;}}


return atIndex+i*4;}


function insertOffsetsIntoArray(stops,targetArray,atIndex,multi,reverse){
var offsetNumber;
var i=0;
if('length' in stops){
while(i<stops.length){
offsetNumber=i/(stops.length-1)*multi;
targetArray[atIndex+i]=reverse?1-offsetNumber:offsetNumber;
i++;}}else 

{
for(var offsetString in stops){
offsetNumber=+offsetString*multi;
targetArray[atIndex+i]=reverse?1-offsetNumber:offsetNumber;
i++;}}


return atIndex+i;}


function insertColorStopsIntoArray(stops,targetArray,atIndex){
var lastIndex=insertColorsIntoArray(stops,targetArray,atIndex);
insertOffsetsIntoArray(stops,targetArray,lastIndex,1,false);}


function insertDoubleColorStopsIntoArray(stops,targetArray,atIndex){
var lastIndex=insertColorsIntoArray(stops,targetArray,atIndex);
lastIndex=insertColorsIntoArray(stops,targetArray,lastIndex);
lastIndex=insertOffsetsIntoArray(stops,targetArray,lastIndex,0.5,false);
insertOffsetsIntoArray(stops,targetArray,lastIndex,0.5,true);}


function applyBoundingBoxToBrushData(brushData,props){
var type=brushData[0];
var width=+props.width;
var height=+props.height;
if(type===LINEAR_GRADIENT){
brushData[1]*=width;
brushData[2]*=height;
brushData[3]*=width;
brushData[4]*=height;}else 
if(type===RADIAL_GRADIENT){
brushData[1]*=width;
brushData[2]*=height;
brushData[3]*=width;
brushData[4]*=height;
brushData[5]*=width;
brushData[6]*=height;}else 
if(type===PATTERN){}}




function extractBrush(colorOrBrush,props){
if(colorOrBrush==null){
return null;}

if(colorOrBrush._brush){
if(colorOrBrush._bb){





applyBoundingBoxToBrushData(colorOrBrush._brush,props);
colorOrBrush._bb=false;}

return colorOrBrush._brush;}

var c=new Color(colorOrBrush);
return [SOLID_COLOR,c.red/255,c.green/255,c.blue/255,c.alpha];}


function extractColor(color){
if(color==null){
return null;}

var c=new Color(color);
return [c.red/255,c.green/255,c.blue/255,c.alpha];}


function extractStrokeCap(strokeCap){
switch(strokeCap){
case 'butt':return 0;
case 'square':return 2;
default:return 1;}}



function extractStrokeJoin(strokeJoin){
switch(strokeJoin){
case 'miter':return 0;
case 'bevel':return 2;
default:return 1;}}








var Shape=React.createClass({displayName:'Shape',

render:function(){
var props=this.props;
var path=props.d||childrenAsString(props.children);
var d=new Path(path).toJSON();
return (
React.createElement(NativeShape,{
fill:extractBrush(props.fill,props),
opacity:extractOpacity(props),
stroke:extractColor(props.stroke),
strokeCap:extractStrokeCap(props.strokeCap),
strokeDash:props.strokeDash||null,
strokeJoin:extractStrokeJoin(props.strokeJoin),
strokeWidth:extractNumber(props.strokeWidth,1),
transform:extractTransform(props),

d:d}));}});








var cachedFontObjectsFromString={};

var fontFamilyPrefix=/^[\s"']*/;
var fontFamilySuffix=/[\s"']*$/;

function extractSingleFontFamily(fontFamilyString){



return fontFamilyString.split(',')[0].
replace(fontFamilyPrefix,'').
replace(fontFamilySuffix,'');}


function parseFontString(font){
if(cachedFontObjectsFromString.hasOwnProperty(font)){
return cachedFontObjectsFromString[font];}

var regexp=/^\s*((?:(?:normal|bold|italic)\s+)*)(?:(\d+(?:\.\d+)?)[ptexm\%]*(?:\s*\/.*?)?\s+)?\s*\"?([^\"]*)/i;
var match=regexp.exec(font);
if(!match){
return null;}

var fontFamily=extractSingleFontFamily(match[3]);
var fontSize=+match[2]||12;
var isBold=/bold/.exec(match[1]);
var isItalic=/italic/.exec(match[1]);
cachedFontObjectsFromString[font]={
fontFamily:fontFamily,
fontSize:fontSize,
fontWeight:isBold?'bold':'normal',
fontStyle:isItalic?'italic':'normal'};

return cachedFontObjectsFromString[font];}


function extractFont(font){
if(font==null){
return null;}

if(typeof font==='string'){
return parseFontString(font);}

var fontFamily=extractSingleFontFamily(font.fontFamily);
var fontSize=+font.fontSize||12;
return {

fontFamily:fontFamily,
fontSize:fontSize,
fontWeight:font.fontWeight,
fontStyle:font.fontStyle};}



var newLine=/\n/g;
function extractFontAndLines(font,text){
return {font:extractFont(font),lines:text.split(newLine)};}


function extractAlignment(alignment){
switch(alignment){
case 'right':
return 1;
case 'center':
return 2;
default:
return 0;}}



var Text=React.createClass({displayName:'Text',

render:function(){
var props=this.props;
var textPath=props.path?new Path(props.path).toJSON():null;
var textFrame=extractFontAndLines(
props.font,
childrenAsString(props.children));

return (
React.createElement(NativeText,{
fill:extractBrush(props.fill,props),
opacity:extractOpacity(props),
stroke:extractColor(props.stroke),
strokeCap:extractStrokeCap(props.strokeCap),
strokeDash:props.strokeDash||null,
strokeJoin:extractStrokeJoin(props.strokeJoin),
strokeWidth:extractNumber(props.strokeWidth,1),
transform:extractTransform(props),

alignment:extractAlignment(props.alignment),
frame:textFrame,
path:textPath}));}});








function LinearGradient(stops,x1,y1,x2,y2){
var type=LINEAR_GRADIENT;

if(arguments.length<5){
var angle=(x1==null?270:x1)*Math.PI/180;

var x=Math.cos(angle);
var y=-Math.sin(angle);
var l=(Math.abs(x)+Math.abs(y))/2;

x*=l;y*=l;

x1=0.5-x;
x2=0.5+x;
y1=0.5-y;
y2=0.5+y;
this._bb=true;}else 
{
this._bb=false;}


var brushData=[type,+x1,+y1,+x2,+y2];
insertColorStopsIntoArray(stops,brushData,5);
this._brush=brushData;}


function RadialGradient(stops,fx,fy,rx,ry,cx,cy){
if(ry==null){
ry=rx;}

if(cx==null){
cx=fx;}

if(cy==null){
cy=fy;}

if(fx==null){


fx=fy=rx=ry=cx=cy=0.5;
this._bb=true;}else 
{
this._bb=false;}





var brushData=[RADIAL_GRADIENT,+fx,+fy,+rx*2,+ry*2,+cx,+cy];
insertDoubleColorStopsIntoArray(stops,brushData,7);
this._brush=brushData;}


function Pattern(url,width,height,left,top){
this._brush=[PATTERN,url,+left||0,+top||0,+width,+height];}





function CSSBackgroundPattern(){
return new Color('rgba(0,0,0,0)');}


var ReactART={
LinearGradient:LinearGradient,
RadialGradient:RadialGradient,
Pattern:Pattern,
Transform:Transform,
Path:Path,
Surface:Surface,
Group:Group,
ClippingRectangle:ClippingRectangle,
Shape:Shape,
Text:Text,
CSSBackgroundPattern:CSSBackgroundPattern};


module.exports=ReactART;
});
__d(524 /* art/core/color.js */, function(global, require, module, exports) {var colors={
maroon:'#800000',red:'#ff0000',orange:'#ffA500',yellow:'#ffff00',olive:'#808000',
purple:'#800080',fuchsia:"#ff00ff",white:'#ffffff',lime:'#00ff00',green:'#008000',
navy:'#000080',blue:'#0000ff',aqua:'#00ffff',teal:'#008080',
black:'#000000',silver:'#c0c0c0',gray:'#808080'};


var map=function(array,fn){
var results=[];
for(var i=0,l=array.length;i<l;i++){
results[i]=fn(array[i],i);}
return results;};


var Color=function(color,type){

if(color.isColor){

this.red=color.red;
this.green=color.green;
this.blue=color.blue;
this.alpha=color.alpha;}else 

{

var namedColor=colors[color];
if(namedColor){
color=namedColor;
type='hex';}


switch(typeof color){
case 'string':if(!type)type=(type=color.match(/^rgb|^hsb|^hsl/))?type[0]:'hex';break;
case 'object':type=type||'rgb';color=color.toString();break;
case 'number':type='hex';color=color.toString(16);break;}


color=Color['parse'+type.toUpperCase()](color);
this.red=color[0];
this.green=color[1];
this.blue=color[2];
this.alpha=color[3];}


this.isColor=true;};



var limit=function(number,min,max){
return Math.min(max,Math.max(min,number));};


var listMatch=/([-.\d]+\%?)\s*,\s*([-.\d]+\%?)\s*,\s*([-.\d]+\%?)\s*,?\s*([-.\d]*\%?)/;
var hexMatch=/^#?([a-f0-9]{1,2})([a-f0-9]{1,2})([a-f0-9]{1,2})([a-f0-9]{0,2})$/i;

Color.parseRGB=function(color){
return map(color.match(listMatch).slice(1),function(bit,i){
if(bit)bit=parseFloat(bit)*(bit[bit.length-1]=='%'?2.55:1);
return i<3?Math.round((bit%=256)<0?bit+256:bit):limit(bit===''?1:Number(bit),0,1);});};



Color.parseHEX=function(color){
if(color.length==1)color=color+color+color;
return map(color.match(hexMatch).slice(1),function(bit,i){
if(i==3)return bit?parseInt(bit,16)/255:1;
return parseInt(bit.length==1?bit+bit:bit,16);});};



Color.parseHSB=function(color){
var hsb=map(color.match(listMatch).slice(1),function(bit,i){
if(bit)bit=parseFloat(bit);
if(i===0)return Math.round((bit%=360)<0?bit+360:bit);else 
if(i<3)return limit(Math.round(bit),0,100);else 
return limit(bit===''?1:Number(bit),0,1);});


var a=hsb[3];
var br=Math.round(hsb[2]/100*255);
if(hsb[1]==0)return [br,br,br,a];

var hue=hsb[0];
var f=hue%60;
var p=Math.round(hsb[2]*(100-hsb[1])/10000*255);
var q=Math.round(hsb[2]*(6000-hsb[1]*f)/600000*255);
var t=Math.round(hsb[2]*(6000-hsb[1]*(60-f))/600000*255);

switch(Math.floor(hue/60)){
case 0:return [br,t,p,a];
case 1:return [q,br,p,a];
case 2:return [p,br,t,a];
case 3:return [p,q,br,a];
case 4:return [t,p,br,a];
default:return [br,p,q,a];}};



Color.parseHSL=function(color){
var hsb=map(color.match(listMatch).slice(1),function(bit,i){
if(bit)bit=parseFloat(bit);
if(i===0)return Math.round((bit%=360)<0?bit+360:bit);else 
if(i<3)return limit(Math.round(bit),0,100);else 
return limit(bit===''?1:Number(bit),0,1);});


var h=hsb[0]/60;
var s=hsb[1]/100;
var l=hsb[2]/100;
var a=hsb[3];

var c=(1-Math.abs(2*l-1))*s;
var x=c*(1-Math.abs(h%2-1));
var m=l-c/2;

var p=Math.round((c+m)*255);
var q=Math.round((x+m)*255);
var t=Math.round(m*255);

switch(Math.floor(h)){
case 0:return [p,q,t,a];
case 1:return [q,p,t,a];
case 2:return [t,p,q,a];
case 3:return [t,q,p,a];
case 4:return [q,t,p,a];
default:return [p,t,q,a];}};



var toString=function(type,array){
if(array[3]!=1)type+='a';else 
array.pop();
return type+'('+array.join(', ')+')';};


Color.prototype={

toHSB:function(array){
var red=this.red,green=this.green,blue=this.blue,alpha=this.alpha;

var max=Math.max(red,green,blue),min=Math.min(red,green,blue),delta=max-min;
var hue=0,saturation=delta!=0?delta/max:0,brightness=max/255;
if(saturation){
var rr=(max-red)/delta,gr=(max-green)/delta,br=(max-blue)/delta;
hue=red==max?br-gr:green==max?2+rr-br:4+gr-rr;
if((hue/=6)<0)hue++;}


var hsb=[Math.round(hue*360),Math.round(saturation*100),Math.round(brightness*100),alpha];

return array?hsb:toString('hsb',hsb);},


toHSL:function(array){
var red=this.red,green=this.green,blue=this.blue,alpha=this.alpha;

var max=Math.max(red,green,blue),min=Math.min(red,green,blue),delta=max-min;
var hue=0,saturation=delta!=0?delta/(255-Math.abs(max+min-255)):0,lightness=(max+min)/512;
if(saturation){
var rr=(max-red)/delta,gr=(max-green)/delta,br=(max-blue)/delta;
hue=red==max?br-gr:green==max?2+rr-br:4+gr-rr;
if((hue/=6)<0)hue++;}


var hsl=[Math.round(hue*360),Math.round(saturation*100),Math.round(lightness*100),alpha];

return array?hsl:toString('hsl',hsl);},


toHEX:function(array){

var a=this.alpha;
var alpha=(a=Math.round(a*255).toString(16)).length==1?a+a:a;

var hex=map([this.red,this.green,this.blue],function(bit){
bit=bit.toString(16);
return bit.length==1?'0'+bit:bit;});


return array?hex.concat(alpha):'#'+hex.join('')+(alpha=='ff'?'':alpha);},


toRGB:function(array){
var rgb=[this.red,this.green,this.blue,this.alpha];
return array?rgb:toString('rgb',rgb);}};




Color.prototype.toString=Color.prototype.toRGB;

Color.hex=function(hex){
return new Color(hex,'hex');};


if(this.hex==null)this.hex=Color.hex;

Color.hsb=function(h,s,b,a){
return new Color([h||0,s||0,b||0,a==null?1:a],'hsb');};


if(this.hsb==null)this.hsb=Color.hsb;

Color.hsl=function(h,s,l,a){
return new Color([h||0,s||0,l||0,a==null?1:a],'hsl');};


if(this.hsl==null)this.hsl=Color.hsl;

Color.rgb=function(r,g,b,a){
return new Color([r||0,g||0,b||0,a==null?1:a],'rgb');};


if(this.rgb==null)this.rgb=Color.rgb;

Color.detach=function(color){
color=new Color(color);
return [Color.rgb(color.red,color.green,color.blue).toString(),color.alpha];};


module.exports=Color;
});
__d(172 /* ARTSerializablePath */, function(global, require, module, exports) {'use strict';













var Class=require(521 /* art/core/class.js */);
var Path=require(526 /* art/core/path.js */);

var MOVE_TO=0;
var CLOSE=1;
var LINE_TO=2;
var CURVE_TO=3;
var ARC=4;

var SerializablePath=Class(Path,{

initialize:function(path){
this.reset();
if(path instanceof SerializablePath){
this.path=path.path.slice(0);}else 
if(path){
if(path.applyToPath){
path.applyToPath(this);}else 
{
this.push(path);}}},




onReset:function(){
this.path=[];},


onMove:function(sx,sy,x,y){
this.path.push(MOVE_TO,x,y);},


onLine:function(sx,sy,x,y){
this.path.push(LINE_TO,x,y);},


onBezierCurve:function(sx,sy,p1x,p1y,p2x,p2y,x,y){
this.path.push(CURVE_TO,p1x,p1y,p2x,p2y,x,y);},


_arcToBezier:Path.prototype.onArc,

onArc:function(sx,sy,ex,ey,cx,cy,rx,ry,sa,ea,ccw,rotation){
if(rx!==ry||rotation){
return this._arcToBezier(
sx,sy,ex,ey,cx,cy,rx,ry,sa,ea,ccw,rotation);}


this.path.push(ARC,cx,cy,rx,sa,ea,ccw?0:1);},


onClose:function(){
this.path.push(CLOSE);},


toJSON:function(){
return this.path;}});




module.exports=SerializablePath;
});
__d(521 /* art/core/class.js */, function(global, require, module, exports) {module.exports=function(mixins){
var proto={};
for(var i=0,l=arguments.length;i<l;i++){
var mixin=arguments[i];
if(typeof mixin=='function')mixin=mixin.prototype;
for(var key in mixin){proto[key]=mixin[key];}}

if(!proto.initialize)proto.initialize=function(){};
proto.constructor=function(a,b,c,d,e,f,g,h){
return new proto.initialize(a,b,c,d,e,f,g,h);};

proto.constructor.prototype=proto.initialize.prototype=proto;
return proto.constructor;};
});
__d(526 /* art/core/path.js */, function(global, require, module, exports) {var Class=require(521 /* ./class */);

module.exports=Class({

initialize:function(path){
this.reset().push(path);},




push:function(){
var p=Array.prototype.join.call(arguments,' ').
match(/[a-df-z]|[\-+]?(?:[\d\.]e[\-+]?|[^\s\-+,a-z])+/ig);
if(!p)return this;

var last,cmd=p[0],i=1;
while(cmd){
switch(cmd){
case 'm':this.move(p[i++],p[i++]);break;
case 'l':this.line(p[i++],p[i++]);break;
case 'c':this.curve(p[i++],p[i++],p[i++],p[i++],p[i++],p[i++]);break;
case 's':this.curve(p[i++],p[i++],null,null,p[i++],p[i++]);break;
case 'q':this.curve(p[i++],p[i++],p[i++],p[i++]);break;
case 't':this.curve(p[i++],p[i++]);break;
case 'a':this.arc(p[i+5],p[i+6],p[i],p[i+1],p[i+3],! +p[i+4],p[i+2]);i+=7;break;
case 'h':this.line(p[i++],0);break;
case 'v':this.line(0,p[i++]);break;

case 'M':this.moveTo(p[i++],p[i++]);break;
case 'L':this.lineTo(p[i++],p[i++]);break;
case 'C':this.curveTo(p[i++],p[i++],p[i++],p[i++],p[i++],p[i++]);break;
case 'S':this.curveTo(p[i++],p[i++],null,null,p[i++],p[i++]);break;
case 'Q':this.curveTo(p[i++],p[i++],p[i++],p[i++]);break;
case 'T':this.curveTo(p[i++],p[i++]);break;
case 'A':this.arcTo(p[i+5],p[i+6],p[i],p[i+1],p[i+3],! +p[i+4],p[i+2]);i+=7;break;
case 'H':this.lineTo(p[i++],this.penY);break;
case 'V':this.lineTo(this.penX,p[i++]);break;

case 'Z':case 'z':this.close();break;
default:cmd=last;i--;continue;}


last=cmd;
if(last=='m')last='l';else 
if(last=='M')last='L';
cmd=p[i++];}

return this;},




reset:function(){
this.penX=this.penY=0;
this.penDownX=this.penDownY=null;
this._pivotX=this._pivotY=0;
this.onReset();
return this;},


move:function(x,y){
this.onMove(this.penX,this.penY,this._pivotX=this.penX+=+x,this._pivotY=this.penY+=+y);
return this;},

moveTo:function(x,y){
this.onMove(this.penX,this.penY,this._pivotX=this.penX=+x,this._pivotY=this.penY=+y);
return this;},


line:function(x,y){
return this.lineTo(this.penX+ +x,this.penY+ +y);},

lineTo:function(x,y){
if(this.penDownX==null){this.penDownX=this.penX;this.penDownY=this.penY;}
this.onLine(this.penX,this.penY,this._pivotX=this.penX=+x,this._pivotY=this.penY=+y);
return this;},


curve:function(c1x,c1y,c2x,c2y,ex,ey){
var x=this.penX,y=this.penY;
return this.curveTo(
x+ +c1x,y+ +c1y,
c2x==null?null:x+ +c2x,
c2y==null?null:y+ +c2y,
ex==null?null:x+ +ex,
ey==null?null:y+ +ey);},


curveTo:function(c1x,c1y,c2x,c2y,ex,ey){
var x=this.penX,y=this.penY;
if(c2x==null){
c2x=+c1x;c2y=+c1y;
c1x=x*2-(this._pivotX||0);c1y=y*2-(this._pivotY||0);}

if(ex==null){
this._pivotX=+c1x;this._pivotY=+c1y;
ex=+c2x;ey=+c2y;
c2x=(ex+ +c1x*2)/3;c2y=(ey+ +c1y*2)/3;
c1x=(x+ +c1x*2)/3;c1y=(y+ +c1y*2)/3;}else 
{
this._pivotX=+c2x;this._pivotY=+c2y;}

if(this.penDownX==null){this.penDownX=x;this.penDownY=y;}
this.onBezierCurve(x,y,+c1x,+c1y,+c2x,+c2y,this.penX=+ex,this.penY=+ey);
return this;},


arc:function(x,y,rx,ry,outer,counterClockwise,rotation){
return this.arcTo(this.penX+ +x,this.penY+ +y,rx,ry,outer,counterClockwise,rotation);},

arcTo:function(x,y,rx,ry,outer,counterClockwise,rotation){
ry=Math.abs(+ry||+rx||+y-this.penY);
rx=Math.abs(+rx||+x-this.penX);

if(!rx||!ry||x==this.penX&&y==this.penY)return this.lineTo(x,y);

var tX=this.penX,tY=this.penY,clockwise=! +counterClockwise,large=!! +outer;

var rad=rotation?rotation*Math.PI/180:0,cos=Math.cos(rad),sin=Math.sin(rad);
x-=tX;y-=tY;


var cx=cos*x/2+sin*y/2,
cy=-sin*x/2+cos*y/2,
rxry=rx*rx*ry*ry,
rycx=ry*ry*cx*cx,
rxcy=rx*rx*cy*cy,
a=rxry-rxcy-rycx;

if(a<0){
a=Math.sqrt(1-a/rxry);
rx*=a;ry*=a;
cx=x/2;cy=y/2;}else 
{
a=Math.sqrt(a/(rxcy+rycx));
if(large==clockwise)a=-a;
var cxd=-a*cy*rx/ry,
cyd=a*cx*ry/rx;
cx=cos*cxd-sin*cyd+x/2;
cy=sin*cxd+cos*cyd+y/2;}



var xx=cos/rx,yx=sin/rx,
xy=-sin/ry,yy=cos/ry;


var sa=Math.atan2(xy*-cx+yy*-cy,xx*-cx+yx*-cy),
ea=Math.atan2(xy*(x-cx)+yy*(y-cy),xx*(x-cx)+yx*(y-cy));

cx+=tX;cy+=tY;
x+=tX;y+=tY;


if(this.penDownX==null){this.penDownX=this.penX;this.penDownY=this.penY;}
this.onArc(
tX,tY,this._pivotX=this.penX=x,this._pivotY=this.penY=y,
cx,cy,rx,ry,sa,ea,!clockwise,rotation);

return this;},


counterArc:function(x,y,rx,ry,outer){
return this.arc(x,y,rx,ry,outer,true);},

counterArcTo:function(x,y,rx,ry,outer){
return this.arcTo(x,y,rx,ry,outer,true);},


close:function(){
if(this.penDownX!=null){
this.onClose(this.penX,this.penY,this.penX=this.penDownX,this.penY=this.penDownY);
this.penDownX=null;}

return this;},




onReset:function(){},


onMove:function(sx,sy,ex,ey){},


onLine:function(sx,sy,ex,ey){
this.onBezierCurve(sx,sy,sx,sy,ex,ey,ex,ey);},


onBezierCurve:function(sx,sy,c1x,c1y,c2x,c2y,ex,ey){
var gx=ex-sx,gy=ey-sy,
g=gx*gx+gy*gy,
v1,v2,cx,cy,u;

cx=c1x-sx;cy=c1y-sy;
u=cx*gx+cy*gy;

if(u>g){
cx-=gx;
cy-=gy;}else 
if(u>0&&g!=0){
cx-=u/g*gx;
cy-=u/g*gy;}


v1=cx*cx+cy*cy;

cx=c2x-sx;cy=c2y-sy;
u=cx*gx+cy*gy;

if(u>g){
cx-=gx;
cy-=gy;}else 
if(u>0&&g!=0){
cx-=u/g*gx;
cy-=u/g*gy;}


v2=cx*cx+cy*cy;

if(v1<0.01&&v2<0.01){
this.onLine(sx,sy,ex,ey);
return;}



if(isNaN(v1)||isNaN(v2)){
throw new Error('Bad input');}



var s1x=(c1x+c2x)*0.5,s1y=(c1y+c2y)*0.5,
l1x=(c1x+sx)*0.5,l1y=(c1y+sy)*0.5,
l2x=(l1x+s1x)*0.5,l2y=(l1y+s1y)*0.5,
r2x=(ex+c2x)*0.5,r2y=(ey+c2y)*0.5,
r1x=(r2x+s1x)*0.5,r1y=(r2y+s1y)*0.5,
l2r1x=(l2x+r1x)*0.5,l2r1y=(l2y+r1y)*0.5;


this.onBezierCurve(sx,sy,l1x,l1y,l2x,l2y,l2r1x,l2r1y);
this.onBezierCurve(l2r1x,l2r1y,r1x,r1y,r2x,r2y,ex,ey);},


onArc:function(sx,sy,ex,ey,cx,cy,rx,ry,sa,ea,ccw,rotation){

var rad=rotation?rotation*Math.PI/180:0,cos=Math.cos(rad),sin=Math.sin(rad),
xx=cos*rx,yx=-sin*ry,
xy=sin*rx,yy=cos*ry;


var arc=ea-sa;
if(arc<0&&!ccw)arc+=Math.PI*2;else 
if(arc>0&&ccw)arc-=Math.PI*2;

var n=Math.ceil(Math.abs(arc/(Math.PI/2))),
step=arc/n,
k=4/3*Math.tan(step/4);

var x=Math.cos(sa),y=Math.sin(sa);

for(var i=0;i<n;i++){
var cp1x=x-k*y,cp1y=y+k*x;

sa+=step;
x=Math.cos(sa);y=Math.sin(sa);

var cp2x=x+k*y,cp2y=y-k*x;

this.onBezierCurve(
sx,sy,
cx+xx*cp1x+yx*cp1y,cy+xy*cp1x+yy*cp1y,
cx+xx*cp2x+yx*cp2y,cy+xy*cp2x+yy*cp2y,
sx=cx+xx*x+yx*y,sy=cy+xy*x+yy*y);}},




onClose:function(sx,sy,ex,ey){
this.onLine(sx,sy,ex,ey);}});
});
__d(522 /* art/core/transform.js */, function(global, require, module, exports) {var Class=require(521 /* ./class */);

function Transform(xx,yx,xy,yy,x,y){
if(xx&&typeof xx=='object'){
yx=xx.yx;yy=xx.yy;y=xx.y;
xy=xx.xy;x=xx.x;xx=xx.xx;}

this.xx=xx==null?1:xx;
this.yx=yx||0;
this.xy=xy||0;
this.yy=yy==null?1:yy;
this.x=(x==null?this.x:x)||0;
this.y=(y==null?this.y:y)||0;
this._transform();
return this;}
;

module.exports=Class({

initialize:Transform,

_transform:function(){},

xx:1,yx:0,x:0,
xy:0,yy:1,y:0,

transform:function(xx,yx,xy,yy,x,y){
var m=this;
if(xx&&typeof xx=='object'){
yx=xx.yx;yy=xx.yy;y=xx.y;
xy=xx.xy;x=xx.x;xx=xx.xx;}

if(!x)x=0;
if(!y)y=0;
return this.transformTo(
m.xx*xx+m.xy*yx,
m.yx*xx+m.yy*yx,
m.xx*xy+m.xy*yy,
m.yx*xy+m.yy*yy,
m.xx*x+m.xy*y+m.x,
m.yx*x+m.yy*y+m.y);},



transformTo:Transform,

translate:function(x,y){
return this.transform(1,0,0,1,x,y);},


move:function(x,y){
this.x+=x||0;
this.y+=y||0;
this._transform();
return this;},


scale:function(x,y){
if(y==null)y=x;
return this.transform(x,0,0,y,0,0);},


rotate:function(deg,x,y){
if(x==null||y==null){
x=(this.left||0)+(this.width||0)/2;
y=(this.top||0)+(this.height||0)/2;}


var rad=deg*Math.PI/180,sin=Math.sin(rad),cos=Math.cos(rad);

this.transform(1,0,0,1,x,y);
var m=this;

return this.transformTo(
cos*m.xx-sin*m.yx,
sin*m.xx+cos*m.yx,
cos*m.xy-sin*m.yy,
sin*m.xy+cos*m.yy,
m.x,
m.y).
transform(1,0,0,1,-x,-y);},


moveTo:function(x,y){
var m=this;
return this.transformTo(m.xx,m.yx,m.xy,m.yy,x,y);},


rotateTo:function(deg,x,y){
var m=this;
var flip=m.yx/m.xx>m.yy/m.xy?-1:1;
if(m.xx<0?m.xy>=0:m.xy<0)flip=-flip;
return this.rotate(deg-Math.atan2(flip*m.yx,flip*m.xx)*180/Math.PI,x,y);},


scaleTo:function(x,y){

var m=this;

var h=Math.sqrt(m.xx*m.xx+m.yx*m.yx);
m.xx/=h;m.yx/=h;

h=Math.sqrt(m.yy*m.yy+m.xy*m.xy);
m.yy/=h;m.xy/=h;

return this.scale(x,y);},


resizeTo:function(width,height){
var w=this.width,h=this.height;
if(!w||!h)return this;
return this.scaleTo(width/w,height/h);},
















inversePoint:function(x,y){
var a=this.xx,b=this.yx,
c=this.xy,d=this.yy,
e=this.x,f=this.y;
var det=b*c-a*d;
if(det==0)return null;
return {
x:(d*(e-x)+c*(y-f))/det,
y:(a*(f-y)+b*(x-e))/det};},



point:function(x,y){
var m=this;
return {
x:m.xx*x+m.xy*y+m.x,
y:m.yx*x+m.yy*y+m.y};}});
});
__d(173 /* DatePickerIOS */, function(global, require, module, exports) {'use strict';














var NativeMethodsMixin=require(2 /* NativeMethodsMixin */);
var PropTypes=require(41 /* ReactPropTypes */);
var React=require(47 /* React */);
var RCTDatePickerIOSConsts=require(10 /* UIManager */).RCTDatePicker.Constants;
var StyleSheet=require(148 /* StyleSheet */);
var View=require(127 /* View */);

var requireNativeComponent=require(146 /* requireNativeComponent */);














var DatePickerIOS=React.createClass({displayName:'DatePickerIOS',

_picker:undefined,

mixins:[NativeMethodsMixin],

propTypes:babelHelpers.extends({},
View.propTypes,{



date:PropTypes.instanceOf(Date).isRequired,








onDateChange:PropTypes.func.isRequired,






maximumDate:PropTypes.instanceOf(Date),






minimumDate:PropTypes.instanceOf(Date),




mode:PropTypes.oneOf(['date','time','datetime']),




minuteInterval:PropTypes.oneOf([1,2,3,4,5,6,10,12,15,20,30]),








timeZoneOffsetInMinutes:PropTypes.number}),


getDefaultProps:function(){
return {
mode:'datetime'};},



_onChange:function(event){
var nativeTimeStamp=event.nativeEvent.timestamp;
this.props.onDateChange&&this.props.onDateChange(
new Date(nativeTimeStamp));

this.props.onChange&&this.props.onChange(event);





var propsTimeStamp=this.props.date.getTime();
if(this._picker&&nativeTimeStamp!==propsTimeStamp){
this._picker.setNativeProps({
date:propsTimeStamp});}},




render:function(){var _this=this;
var props=this.props;
return (
React.createElement(View,{style:props.style},
React.createElement(RCTDatePickerIOS,{
ref:function(picker){return _this._picker=picker;},
style:styles.datePickerIOS,
date:props.date.getTime(),
maximumDate:
props.maximumDate?props.maximumDate.getTime():undefined,

minimumDate:
props.minimumDate?props.minimumDate.getTime():undefined,

mode:props.mode,
minuteInterval:props.minuteInterval,
timeZoneOffsetInMinutes:props.timeZoneOffsetInMinutes,
onChange:this._onChange})));}});






var styles=StyleSheet.create({
datePickerIOS:{
height:RCTDatePickerIOSConsts.ComponentHeight,
width:RCTDatePickerIOSConsts.ComponentWidth}});



var RCTDatePickerIOS=requireNativeComponent('RCTDatePicker',DatePickerIOS,{
nativeOnly:{onChange:true}});


module.exports=DatePickerIOS;
});
__d(174 /* DrawerLayoutAndroid */, function(global, require, module, exports) {'use strict';











module.exports=require(147 /* UnimplementedView */);
});
__d(175 /* Image */, function(global, require, module, exports) {'use strict';












var EdgeInsetsPropType=require(128 /* EdgeInsetsPropType */);
var ImageResizeMode=require(132 /* ImageResizeMode */);
var ImageStylePropTypes=require(131 /* ImageStylePropTypes */);
var NativeMethodsMixin=require(2 /* NativeMethodsMixin */);
var PropTypes=require(41 /* ReactPropTypes */);
var React=require(47 /* React */);
var ReactNativeViewAttributes=require(144 /* ReactNativeViewAttributes */);
var View=require(127 /* View */);
var StyleSheet=require(148 /* StyleSheet */);
var StyleSheetPropType=require(145 /* StyleSheetPropType */);

var flattenStyle=require(7 /* flattenStyle */);
var invariant=require(363 /* fbjs/lib/invariant */);
var requireNativeComponent=require(146 /* requireNativeComponent */);
var resolveAssetSource=require(161 /* resolveAssetSource */);
var warning=require(368 /* fbjs/lib/warning */);var _require=




require(11 /* NativeModules */);var ImageViewManager=_require.ImageViewManager;var NetworkImageViewManager=_require.NetworkImageViewManager;

























var Image=React.createClass({displayName:'Image',
propTypes:{
style:StyleSheetPropType(ImageStylePropTypes),





source:PropTypes.oneOfType([
PropTypes.shape({
uri:PropTypes.string}),


PropTypes.number]),





defaultSource:PropTypes.oneOfType([
PropTypes.shape({
uri:PropTypes.string}),


PropTypes.number]),





accessible:PropTypes.bool,





accessibilityLabel:PropTypes.string,




blurRadius:PropTypes.number,








capInsets:EdgeInsetsPropType,















resizeMode:PropTypes.oneOf(['cover','contain','stretch']),




testID:PropTypes.string,




onLayout:PropTypes.func,



onLoadStart:PropTypes.func,




onProgress:PropTypes.func,




onError:PropTypes.func,



onLoad:PropTypes.func,



onLoadEnd:PropTypes.func},


statics:{
resizeMode:ImageResizeMode,













getSize:function(
uri,
success,
failure)
{
ImageViewManager.getSize(uri,success,failure||function(){
console.warn('Failed to get size for image: '+uri);});}},




mixins:[NativeMethodsMixin],





viewConfig:{
uiViewClassName:'UIView',
validAttributes:ReactNativeViewAttributes.UIView},


contextTypes:{
isInAParentText:React.PropTypes.bool},


render:function(){
var source=resolveAssetSource(this.props.source)||{};var 
width=source.width;var height=source.height;var uri=source.uri;
var style=flattenStyle([{width:width,height:height},styles.base,this.props.style])||{};

var isNetwork=uri&&uri.match(/^https?:/);
var RawImage=isNetwork?RCTNetworkImageView:RCTImageView;
var resizeMode=this.props.resizeMode||(style||{}).resizeMode||'cover';
var tintColor=(style||{}).tintColor;



if(isNetwork&&(tintColor||this.props.blurRadius)){
RawImage=RCTImageView;}


if(this.props.src){
console.warn('The <Image> component requires a `source` property rather than `src`.');}


if(this.context.isInAParentText){
RawImage=RCTVirtualImage;
if(!width||!height){
console.warn('You must specify a width and height for the image %s',uri);}}



return (
React.createElement(RawImage,babelHelpers.extends({},
this.props,{
style:style,
resizeMode:resizeMode,
tintColor:tintColor,
source:source})));}});





var styles=StyleSheet.create({
base:{
overflow:'hidden'}});



var RCTImageView=requireNativeComponent('RCTImageView',Image);
var RCTNetworkImageView=NetworkImageViewManager?requireNativeComponent('RCTNetworkImageView',Image):RCTImageView;
var RCTVirtualImage=requireNativeComponent('RCTVirtualImage',Image);


module.exports=Image;
});
__d(176 /* ImageEditor */, function(global, require, module, exports) {'use strict';












var RCTImageEditingManager=require(11 /* NativeModules */).ImageEditingManager;var 




































ImageEditor=function(){function ImageEditor(){babelHelpers.classCallCheck(this,ImageEditor);}babelHelpers.createClass(ImageEditor,null,[{key:'cropImage',value:function cropImage(











uri,
cropData,
success,
failure)
{
RCTImageEditingManager.cropImage(uri,cropData,success,failure);}}]);return ImageEditor;}();



module.exports=ImageEditor;
});
__d(177 /* ImageStore */, function(global, require, module, exports) {'use strict';












var RCTImageStoreManager=require(11 /* NativeModules */).ImageStoreManager;var 

ImageStore=function(){function ImageStore(){babelHelpers.classCallCheck(this,ImageStore);}babelHelpers.createClass(ImageStore,null,[{key:'hasImageForTag',value:function hasImageForTag(




uri,callback){
if(RCTImageStoreManager.hasImageForTag){
RCTImageStoreManager.hasImageForTag(uri,callback);}else 
{
console.warn('hasImageForTag() not implemented');}}},{key:'removeImageForTag',value:function removeImageForTag(











uri){
if(RCTImageStoreManager.removeImageForTag){
RCTImageStoreManager.removeImageForTag(uri);}else 
{
console.warn('removeImageForTag() not implemented');}}},{key:'addImageFromBase64',value:function addImageFromBase64(















base64ImageData,
success,
failure)
{
RCTImageStoreManager.addImageFromBase64(base64ImageData,success,failure);}},{key:'getBase64ForTag',value:function getBase64ForTag(














uri,
success,
failure)
{
RCTImageStoreManager.getBase64ForTag(uri,success,failure);}}]);return ImageStore;}();



module.exports=ImageStore;
});
__d(178 /* ListView */, function(global, require, module, exports) {'use strict';
































var ListViewDataSource=require(179 /* ListViewDataSource */);
var React=require(47 /* React */);
var RCTScrollViewManager=require(11 /* NativeModules */).ScrollViewManager;
var ScrollView=require(181 /* ScrollView */);
var ScrollResponder=require(183 /* ScrollResponder */);
var StaticRenderer=require(187 /* StaticRenderer */);
var TimerMixin=require(523 /* react-timer-mixin */);

var isEmpty=require(180 /* isEmpty */);
var merge=require(103 /* merge */);

var PropTypes=React.PropTypes;

var DEFAULT_PAGE_SIZE=1;
var DEFAULT_INITIAL_ROWS=10;
var DEFAULT_SCROLL_RENDER_AHEAD=1000;
var DEFAULT_END_REACHED_THRESHOLD=1000;
var DEFAULT_SCROLL_CALLBACK_THROTTLE=50;
var SCROLLVIEW_REF='listviewscroll';


















































var ListView=React.createClass({displayName:'ListView',
mixins:[ScrollResponder.Mixin,TimerMixin],

statics:{
DataSource:ListViewDataSource},









propTypes:babelHelpers.extends({},
ScrollView.propTypes,{

dataSource:PropTypes.instanceOf(ListViewDataSource).isRequired,








renderSeparator:PropTypes.func,











renderRow:PropTypes.func.isRequired,





initialListSize:PropTypes.number,





onEndReached:PropTypes.func,



onEndReachedThreshold:PropTypes.number,







pageSize:PropTypes.number,








renderFooter:PropTypes.func,
renderHeader:PropTypes.func,









renderSectionHeader:PropTypes.func,






renderScrollComponent:React.PropTypes.func.isRequired,




scrollRenderAheadDistance:React.PropTypes.number,









onChangeVisibleRows:React.PropTypes.func,





removeClippedSubviews:React.PropTypes.bool,








stickyHeaderIndices:PropTypes.arrayOf(PropTypes.number),





enableEmptySections:PropTypes.bool}),





getMetrics:function(){
return {
contentLength:this.scrollProperties.contentLength,
totalRows:this.props.enableEmptySections?this.props.dataSource.getRowAndSectionCount():this.props.dataSource.getRowCount(),
renderedRows:this.state.curRenderedRowsCount,
visibleRows:Object.keys(this._visibleRows).length};},








getScrollResponder:function(){
return this.refs[SCROLLVIEW_REF]&&
this.refs[SCROLLVIEW_REF].getScrollResponder&&
this.refs[SCROLLVIEW_REF].getScrollResponder();},


scrollTo:function(){var _refs$SCROLLVIEW_REF;
this.refs[SCROLLVIEW_REF]&&
this.refs[SCROLLVIEW_REF].scrollTo&&
(_refs$SCROLLVIEW_REF=this.refs[SCROLLVIEW_REF]).scrollTo.apply(_refs$SCROLLVIEW_REF,arguments);},


setNativeProps:function(props){
this.refs[SCROLLVIEW_REF]&&
this.refs[SCROLLVIEW_REF].setNativeProps(props);},






getDefaultProps:function(){
return {
initialListSize:DEFAULT_INITIAL_ROWS,
pageSize:DEFAULT_PAGE_SIZE,
renderScrollComponent:function(props){return React.createElement(ScrollView,props);},
scrollRenderAheadDistance:DEFAULT_SCROLL_RENDER_AHEAD,
onEndReachedThreshold:DEFAULT_END_REACHED_THRESHOLD,
stickyHeaderIndices:[]};},



getInitialState:function(){
return {
curRenderedRowsCount:this.props.initialListSize,
highlightedRow:{}};},



getInnerViewNode:function(){
return this.refs[SCROLLVIEW_REF].getInnerViewNode();},


componentWillMount:function(){

this.scrollProperties={
visibleLength:null,
contentLength:null,
offset:0};

this._childFrames=[];
this._visibleRows={};
this._prevRenderedRowsCount=0;
this._sentEndForContentLength=null;},


componentDidMount:function(){var _this=this;


this.requestAnimationFrame(function(){
_this._measureAndUpdateScrollProps();});},



componentWillReceiveProps:function(nextProps){var _this2=this;
if(this.props.dataSource!==nextProps.dataSource||
this.props.initialListSize!==nextProps.initialListSize){
this.setState(function(state,props){
_this2._prevRenderedRowsCount=0;
return {
curRenderedRowsCount:Math.min(
Math.max(
state.curRenderedRowsCount,
props.initialListSize),

props.enableEmptySections?props.dataSource.getRowAndSectionCount():props.dataSource.getRowCount())};},


function(){return _this2._renderMoreRowsIfNeeded();});}},



componentDidUpdate:function(){var _this3=this;
this.requestAnimationFrame(function(){
_this3._measureAndUpdateScrollProps();});},



onRowHighlighted:function(sectionID,rowID){
this.setState({highlightedRow:{sectionID:sectionID,rowID:rowID}});},


render:function(){
var bodyComponents=[];

var dataSource=this.props.dataSource;
var allRowIDs=dataSource.rowIdentities;
var rowCount=0;
var sectionHeaderIndices=[];

var header=this.props.renderHeader&&this.props.renderHeader();
var footer=this.props.renderFooter&&this.props.renderFooter();
var totalIndex=header?1:0;

for(var sectionIdx=0;sectionIdx<allRowIDs.length;sectionIdx++){
var sectionID=dataSource.sectionIdentities[sectionIdx];
var rowIDs=allRowIDs[sectionIdx];
if(rowIDs.length===0){
if(this.props.enableEmptySections===undefined){
var warning=require(368 /* fbjs/lib/warning */);
warning(false,'In next release empty section headers will be rendered.'+
' In this release you can use \'enableEmptySections\' flag to render empty section headers.');
continue;}else 
{
var invariant=require(363 /* fbjs/lib/invariant */);
invariant(
this.props.enableEmptySections,
'In next release \'enableEmptySections\' flag will be deprecated, empty section headers will always be rendered.'+
' If empty section headers are not desirable their indices should be excluded from sectionIDs object.'+
' In this release \'enableEmptySections\' may only have value \'true\' to allow empty section headers rendering.');}}



if(this.props.renderSectionHeader){
var shouldUpdateHeader=rowCount>=this._prevRenderedRowsCount&&
dataSource.sectionHeaderShouldUpdate(sectionIdx);
bodyComponents.push(
React.createElement(StaticRenderer,{
key:'s_'+sectionID,
shouldUpdate:!!shouldUpdateHeader,
render:this.props.renderSectionHeader.bind(
null,
dataSource.getSectionHeaderData(sectionIdx),
sectionID)}));



sectionHeaderIndices.push(totalIndex++);}


for(var rowIdx=0;rowIdx<rowIDs.length;rowIdx++){
var rowID=rowIDs[rowIdx];
var comboID=sectionID+'_'+rowID;
var shouldUpdateRow=rowCount>=this._prevRenderedRowsCount&&
dataSource.rowShouldUpdate(sectionIdx,rowIdx);
var row=
React.createElement(StaticRenderer,{
key:'r_'+comboID,
shouldUpdate:!!shouldUpdateRow,
render:this.props.renderRow.bind(
null,
dataSource.getRowData(sectionIdx,rowIdx),
sectionID,
rowID,
this.onRowHighlighted)});


bodyComponents.push(row);
totalIndex++;

if(this.props.renderSeparator&&(
rowIdx!==rowIDs.length-1||sectionIdx===allRowIDs.length-1)){
var adjacentRowHighlighted=
this.state.highlightedRow.sectionID===sectionID&&(
this.state.highlightedRow.rowID===rowID||
this.state.highlightedRow.rowID===rowIDs[rowIdx+1]);

var separator=this.props.renderSeparator(
sectionID,
rowID,
adjacentRowHighlighted);

if(separator){
bodyComponents.push(separator);
totalIndex++;}}


if(++rowCount===this.state.curRenderedRowsCount){
break;}}


if(rowCount>=this.state.curRenderedRowsCount){
break;}}var _props=






this.props;var renderScrollComponent=_props.renderScrollComponent;var props=babelHelpers.objectWithoutProperties(_props,['renderScrollComponent']);
if(!props.scrollEventThrottle){
props.scrollEventThrottle=DEFAULT_SCROLL_CALLBACK_THROTTLE;}

if(props.removeClippedSubviews===undefined){
props.removeClippedSubviews=true;}

babelHelpers.extends(props,{
onScroll:this._onScroll,
stickyHeaderIndices:this.props.stickyHeaderIndices.concat(sectionHeaderIndices),



onKeyboardWillShow:undefined,
onKeyboardWillHide:undefined,
onKeyboardDidShow:undefined,
onKeyboardDidHide:undefined});




return React.cloneElement(renderScrollComponent(props),{
ref:SCROLLVIEW_REF,
onContentSizeChange:this._onContentSizeChange,
onLayout:this._onLayout},
header,bodyComponents,footer);},






_measureAndUpdateScrollProps:function(){
var scrollComponent=this.getScrollResponder();
if(!scrollComponent||!scrollComponent.getInnerViewNode){
return;}




RCTScrollViewManager&&RCTScrollViewManager.calculateChildFrames&&
RCTScrollViewManager.calculateChildFrames(
React.findNodeHandle(scrollComponent),
this._updateVisibleRows);},



_onContentSizeChange:function(width,height){
var contentLength=!this.props.horizontal?height:width;
if(contentLength!==this.scrollProperties.contentLength){
this.scrollProperties.contentLength=contentLength;
this._updateVisibleRows();
this._renderMoreRowsIfNeeded();}

this.props.onContentSizeChange&&this.props.onContentSizeChange(width,height);},


_onLayout:function(event){var _event$nativeEvent$la=
event.nativeEvent.layout;var width=_event$nativeEvent$la.width;var height=_event$nativeEvent$la.height;
var visibleLength=!this.props.horizontal?height:width;
if(visibleLength!==this.scrollProperties.visibleLength){
this.scrollProperties.visibleLength=visibleLength;
this._updateVisibleRows();
this._renderMoreRowsIfNeeded();}

this.props.onLayout&&this.props.onLayout(event);},


_maybeCallOnEndReached:function(event){
if(this.props.onEndReached&&
this.scrollProperties.contentLength!==this._sentEndForContentLength&&
this._getDistanceFromEnd(this.scrollProperties)<this.props.onEndReachedThreshold&&
this.state.curRenderedRowsCount===(this.props.enableEmptySections?this.props.dataSource.getRowAndSectionCount():this.props.dataSource.getRowCount())){
this._sentEndForContentLength=this.scrollProperties.contentLength;
this.props.onEndReached(event);
return true;}

return false;},


_renderMoreRowsIfNeeded:function(){
if(this.scrollProperties.contentLength===null||
this.scrollProperties.visibleLength===null||
this.state.curRenderedRowsCount===(this.props.enableEmptySections?this.props.dataSource.getRowAndSectionCount():this.props.dataSource.getRowCount())){
this._maybeCallOnEndReached();
return;}


var distanceFromEnd=this._getDistanceFromEnd(this.scrollProperties);
if(distanceFromEnd<this.props.scrollRenderAheadDistance){
this._pageInNewRows();}},



_pageInNewRows:function(){var _this4=this;
this.setState(function(state,props){
var rowsToRender=Math.min(
state.curRenderedRowsCount+props.pageSize,
props.enableEmptySections?props.dataSource.getRowAndSectionCount():props.dataSource.getRowCount());

_this4._prevRenderedRowsCount=state.curRenderedRowsCount;
return {
curRenderedRowsCount:rowsToRender};},

function(){
_this4._measureAndUpdateScrollProps();
_this4._prevRenderedRowsCount=_this4.state.curRenderedRowsCount;});},



_getDistanceFromEnd:function(scrollProperties){
return scrollProperties.contentLength-scrollProperties.visibleLength-scrollProperties.offset;},


_updateVisibleRows:function(updatedFrames){var _this5=this;
if(!this.props.onChangeVisibleRows){
return;}

if(updatedFrames){
updatedFrames.forEach(function(newFrame){
_this5._childFrames[newFrame.index]=merge(newFrame);});}


var isVertical=!this.props.horizontal;
var dataSource=this.props.dataSource;
var visibleMin=this.scrollProperties.offset;
var visibleMax=visibleMin+this.scrollProperties.visibleLength;
var allRowIDs=dataSource.rowIdentities;

var header=this.props.renderHeader&&this.props.renderHeader();
var totalIndex=header?1:0;
var visibilityChanged=false;
var changedRows={};
for(var sectionIdx=0;sectionIdx<allRowIDs.length;sectionIdx++){
var rowIDs=allRowIDs[sectionIdx];
if(rowIDs.length===0){
continue;}

var sectionID=dataSource.sectionIdentities[sectionIdx];
if(this.props.renderSectionHeader){
totalIndex++;}

var visibleSection=this._visibleRows[sectionID];
if(!visibleSection){
visibleSection={};}

for(var rowIdx=0;rowIdx<rowIDs.length;rowIdx++){
var rowID=rowIDs[rowIdx];
var frame=this._childFrames[totalIndex];
totalIndex++;
if(!frame){
break;}

var rowVisible=visibleSection[rowID];
var min=isVertical?frame.y:frame.x;
var max=min+(isVertical?frame.height:frame.width);
if(min>visibleMax||max<visibleMin){
if(rowVisible){
visibilityChanged=true;
delete visibleSection[rowID];
if(!changedRows[sectionID]){
changedRows[sectionID]={};}

changedRows[sectionID][rowID]=false;}}else 

if(!rowVisible){
visibilityChanged=true;
visibleSection[rowID]=true;
if(!changedRows[sectionID]){
changedRows[sectionID]={};}

changedRows[sectionID][rowID]=true;}}


if(!isEmpty(visibleSection)){
this._visibleRows[sectionID]=visibleSection;}else 
if(this._visibleRows[sectionID]){
delete this._visibleRows[sectionID];}}


visibilityChanged&&this.props.onChangeVisibleRows(this._visibleRows,changedRows);},


_onScroll:function(e){
var isVertical=!this.props.horizontal;
this.scrollProperties.visibleLength=e.nativeEvent.layoutMeasurement[
isVertical?'height':'width'];

this.scrollProperties.contentLength=e.nativeEvent.contentSize[
isVertical?'height':'width'];

this.scrollProperties.offset=e.nativeEvent.contentOffset[
isVertical?'y':'x'];

this._updateVisibleRows(e.nativeEvent.updatedChildFrames);
if(!this._maybeCallOnEndReached(e)){
this._renderMoreRowsIfNeeded();}


if(this.props.onEndReached&&
this._getDistanceFromEnd(this.scrollProperties)>this.props.onEndReachedThreshold){

this._sentEndForContentLength=null;}


this.props.onScroll&&this.props.onScroll(e);}});



module.exports=ListView;
});
__d(179 /* ListViewDataSource */, function(global, require, module, exports) {'use strict';





























var invariant=require(363 /* fbjs/lib/invariant */);
var isEmpty=require(180 /* isEmpty */);
var warning=require(368 /* fbjs/lib/warning */);

function defaultGetRowData(
dataBlob,
sectionID,
rowID)
{
return dataBlob[sectionID][rowID];}


function defaultGetSectionHeaderData(
dataBlob,
sectionID)
{
return dataBlob[sectionID];}var 













































ListViewDataSource=function(){


























function ListViewDataSource(params){babelHelpers.classCallCheck(this,ListViewDataSource);
invariant(
params&&typeof params.rowHasChanged==='function',
'Must provide a rowHasChanged function.');

this._rowHasChanged=params.rowHasChanged;
this._getRowData=params.getRowData||defaultGetRowData;
this._sectionHeaderHasChanged=params.sectionHeaderHasChanged;
this._getSectionHeaderData=
params.getSectionHeaderData||defaultGetSectionHeaderData;

this._dataBlob=null;
this._dirtyRows=[];
this._dirtySections=[];
this._cachedRowCount=0;



this.rowIdentities=[];
this.sectionIdentities=[];}babelHelpers.createClass(ListViewDataSource,[{key:'cloneWithRows',value:function cloneWithRows(



















dataBlob,
rowIdentities)
{
var rowIds=rowIdentities?[rowIdentities]:null;
if(!this._sectionHeaderHasChanged){
this._sectionHeaderHasChanged=function(){return false;};}

return this.cloneWithRowsAndSections({s1:dataBlob},['s1'],rowIds);}},{key:'cloneWithRowsAndSections',value:function cloneWithRowsAndSections(














dataBlob,
sectionIdentities,
rowIdentities)
{
invariant(
typeof this._sectionHeaderHasChanged==='function',
'Must provide a sectionHeaderHasChanged function with section data.');

invariant(
!sectionIdentities||!rowIdentities||sectionIdentities.length===rowIdentities.length,
'row and section ids lengths must be the same');


var newSource=new ListViewDataSource({
getRowData:this._getRowData,
getSectionHeaderData:this._getSectionHeaderData,
rowHasChanged:this._rowHasChanged,
sectionHeaderHasChanged:this._sectionHeaderHasChanged});

newSource._dataBlob=dataBlob;
if(sectionIdentities){
newSource.sectionIdentities=sectionIdentities;}else 
{
newSource.sectionIdentities=Object.keys(dataBlob);}

if(rowIdentities){
newSource.rowIdentities=rowIdentities;}else 
{
newSource.rowIdentities=[];
newSource.sectionIdentities.forEach(function(sectionID){
newSource.rowIdentities.push(Object.keys(dataBlob[sectionID]));});}


newSource._cachedRowCount=countRows(newSource.rowIdentities);

newSource._calculateDirtyArrays(
this._dataBlob,
this.sectionIdentities,
this.rowIdentities);


return newSource;}},{key:'getRowCount',value:function getRowCount()


{
return this._cachedRowCount;}},{key:'getRowAndSectionCount',value:function getRowAndSectionCount()


{
return this._cachedRowCount+this.sectionIdentities.length;}},{key:'rowShouldUpdate',value:function rowShouldUpdate(





sectionIndex,rowIndex){
var needsUpdate=this._dirtyRows[sectionIndex][rowIndex];
warning(needsUpdate!==undefined,
'missing dirtyBit for section, row: '+sectionIndex+', '+rowIndex);
return needsUpdate;}},{key:'getRowData',value:function getRowData(





sectionIndex,rowIndex){
var sectionID=this.sectionIdentities[sectionIndex];
var rowID=this.rowIdentities[sectionIndex][rowIndex];
warning(
sectionID!==undefined&&rowID!==undefined,
'rendering invalid section, row: '+sectionIndex+', '+rowIndex);

return this._getRowData(this._dataBlob,sectionID,rowID);}},{key:'getRowIDForFlatIndex',value:function getRowIDForFlatIndex(






index){
var accessIndex=index;
for(var ii=0;ii<this.sectionIdentities.length;ii++){
if(accessIndex>=this.rowIdentities[ii].length){
accessIndex-=this.rowIdentities[ii].length;}else 
{
return this.rowIdentities[ii][accessIndex];}}


return null;}},{key:'getSectionIDForFlatIndex',value:function getSectionIDForFlatIndex(






index){
var accessIndex=index;
for(var ii=0;ii<this.sectionIdentities.length;ii++){
if(accessIndex>=this.rowIdentities[ii].length){
accessIndex-=this.rowIdentities[ii].length;}else 
{
return this.sectionIdentities[ii];}}


return null;}},{key:'getSectionLengths',value:function getSectionLengths()





{
var results=[];
for(var ii=0;ii<this.sectionIdentities.length;ii++){
results.push(this.rowIdentities[ii].length);}

return results;}},{key:'sectionHeaderShouldUpdate',value:function sectionHeaderShouldUpdate(





sectionIndex){
var needsUpdate=this._dirtySections[sectionIndex];
warning(needsUpdate!==undefined,
'missing dirtyBit for section: '+sectionIndex);
return needsUpdate;}},{key:'getSectionHeaderData',value:function getSectionHeaderData(





sectionIndex){
if(!this._getSectionHeaderData){
return null;}

var sectionID=this.sectionIdentities[sectionIndex];
warning(sectionID!==undefined,
'renderSection called on invalid section: '+sectionIndex);
return this._getSectionHeaderData(this._dataBlob,sectionID);}},{key:'_calculateDirtyArrays',value:function _calculateDirtyArrays(






















prevDataBlob,
prevSectionIDs,
prevRowIDs)
{

var prevSectionsHash=keyedDictionaryFromArray(prevSectionIDs);
var prevRowsHash={};
for(var ii=0;ii<prevRowIDs.length;ii++){
var sectionID=prevSectionIDs[ii];
warning(
!prevRowsHash[sectionID],
'SectionID appears more than once: '+sectionID);

prevRowsHash[sectionID]=keyedDictionaryFromArray(prevRowIDs[ii]);}



this._dirtySections=[];
this._dirtyRows=[];

var dirty;
for(var sIndex=0;sIndex<this.sectionIdentities.length;sIndex++){
var sectionID=this.sectionIdentities[sIndex];

dirty=!prevSectionsHash[sectionID];
var sectionHeaderHasChanged=this._sectionHeaderHasChanged;
if(!dirty&&sectionHeaderHasChanged){
dirty=sectionHeaderHasChanged(
this._getSectionHeaderData(prevDataBlob,sectionID),
this._getSectionHeaderData(this._dataBlob,sectionID));}


this._dirtySections.push(!!dirty);

this._dirtyRows[sIndex]=[];
for(var rIndex=0;rIndex<this.rowIdentities[sIndex].length;rIndex++){
var rowID=this.rowIdentities[sIndex][rIndex];

dirty=
!prevSectionsHash[sectionID]||
!prevRowsHash[sectionID][rowID]||
this._rowHasChanged(
this._getRowData(prevDataBlob,sectionID,rowID),
this._getRowData(this._dataBlob,sectionID,rowID));

this._dirtyRows[sIndex].push(!!dirty);}}}}]);return ListViewDataSource;}();





function countRows(allRowIDs){
var totalRows=0;
for(var sectionIdx=0;sectionIdx<allRowIDs.length;sectionIdx++){
var rowIDs=allRowIDs[sectionIdx];
totalRows+=rowIDs.length;}

return totalRows;}


function keyedDictionaryFromArray(arr){
if(isEmpty(arr)){
return {};}

var result={};
for(var ii=0;ii<arr.length;ii++){
var key=arr[ii];
warning(!result[key],'Value appears more than once in array: '+key);
result[key]=true;}

return result;}



module.exports=ListViewDataSource;
});
__d(180 /* isEmpty */, function(global, require, module, exports) {function 



















isEmpty(obj){
if(Array.isArray(obj)){
return obj.length===0;}else 
if(typeof obj==='object'){
for(var i in obj){
return false;}

return true;}else 
{
return !obj;}}



module.exports=isEmpty;
});
__d(181 /* ScrollView */, function(global, require, module, exports) {'use strict';












var EdgeInsetsPropType=require(128 /* EdgeInsetsPropType */);
var Platform=require(4 /* Platform */);
var PointPropType=require(182 /* PointPropType */);
var RCTScrollView=require(11 /* NativeModules */).UIManager.RCTScrollView;
var RCTScrollViewManager=require(11 /* NativeModules */).ScrollViewManager;
var React=require(47 /* React */);
var ReactNativeViewAttributes=require(144 /* ReactNativeViewAttributes */);
var ScrollResponder=require(183 /* ScrollResponder */);
var StyleSheet=require(148 /* StyleSheet */);
var StyleSheetPropType=require(145 /* StyleSheetPropType */);
var View=require(127 /* View */);
var ViewStylePropTypes=require(139 /* ViewStylePropTypes */);

var deepDiffer=require(5 /* deepDiffer */);
var deprecatedPropType=require(137 /* deprecatedPropType */);
var dismissKeyboard=require(185 /* dismissKeyboard */);
var flattenStyle=require(7 /* flattenStyle */);
var insetsDiffer=require(159 /* insetsDiffer */);
var invariant=require(363 /* fbjs/lib/invariant */);
var pointsDiffer=require(160 /* pointsDiffer */);
var requireNativeComponent=require(146 /* requireNativeComponent */);
var processDecelerationRate=require(186 /* processDecelerationRate */);
var PropTypes=React.PropTypes;

var SCROLLVIEW='ScrollView';
var INNERVIEW='InnerScrollView';
















var ScrollView=React.createClass({displayName:'ScrollView',
propTypes:babelHelpers.extends({},
View.propTypes,{






automaticallyAdjustContentInsets:PropTypes.bool,





contentInset:EdgeInsetsPropType,





contentOffset:PointPropType,







bounces:PropTypes.bool,






bouncesZoom:PropTypes.bool,






alwaysBounceHorizontal:PropTypes.bool,






alwaysBounceVertical:PropTypes.bool,







centerContent:PropTypes.bool,















contentContainerStyle:StyleSheetPropType(ViewStylePropTypes),










decelerationRate:PropTypes.oneOfType([
PropTypes.oneOf(['fast','normal']),
PropTypes.number]),





horizontal:PropTypes.bool,







indicatorStyle:PropTypes.oneOf([
'default',
'black',
'white']),






directionalLockEnabled:PropTypes.bool,





canCancelContentTouches:PropTypes.bool,








keyboardDismissMode:PropTypes.oneOf([
'none',
'interactive',
'on-drag']),







keyboardShouldPersistTaps:PropTypes.bool,




maximumZoomScale:PropTypes.number,




minimumZoomScale:PropTypes.number,




onScroll:PropTypes.func,




onScrollAnimationEnd:PropTypes.func,





onContentSizeChange:PropTypes.func,






pagingEnabled:PropTypes.bool,




scrollEnabled:PropTypes.bool,












scrollEventThrottle:PropTypes.number,






scrollIndicatorInsets:EdgeInsetsPropType,





scrollsToTop:PropTypes.bool,






sendMomentumEvents:PropTypes.bool,



showsHorizontalScrollIndicator:PropTypes.bool,



showsVerticalScrollIndicator:PropTypes.bool,








stickyHeaderIndices:PropTypes.arrayOf(PropTypes.number),
style:StyleSheetPropType(ViewStylePropTypes),







snapToInterval:PropTypes.number,








snapToAlignment:PropTypes.oneOf([
'start',
'center',
'end']),







removeClippedSubviews:PropTypes.bool,




zoomScale:PropTypes.number,







refreshControl:PropTypes.element,




onRefreshStart:deprecatedPropType(
PropTypes.func,
'Use the `refreshControl` prop instead.')}),



mixins:[ScrollResponder.Mixin],

getInitialState:function(){
return this.scrollResponderMixinGetInitialState();},


setNativeProps:function(props){
this.refs[SCROLLVIEW].setNativeProps(props);},


endRefreshing:function(){
RCTScrollViewManager.endRefreshing(
React.findNodeHandle(this));},









getScrollResponder:function(){
return this;},


getScrollableNode:function(){
return React.findNodeHandle(this.refs[SCROLLVIEW]);},


getInnerViewNode:function(){
return React.findNodeHandle(this.refs[INNERVIEW]);},












scrollTo:function(
y,
x,
animated)
{
if(typeof y==='number'){
console.warn('`scrollTo(y, x, animated)` is deprecated. Use `scrollTo({x: 5, y: 5, animated: true})` instead.');}else 
{var _ref=
y||{};x=_ref.x;y=_ref.y;animated=_ref.animated;}


this.getScrollResponder().scrollResponderScrollTo({x:x||0,y:y||0,animated:animated!==false});},





scrollWithoutAnimationTo:function(){var y=arguments.length<=0||arguments[0]===undefined?0:arguments[0];var x=arguments.length<=1||arguments[1]===undefined?0:arguments[1];
console.warn('`scrollWithoutAnimationTo` is deprecated. Use `scrollTo` instead');
this.scrollTo({x:x,y:y,animated:false});},


handleScroll:function(e){
if(__DEV__){
if(this.props.onScroll&&!this.props.scrollEventThrottle&&Platform.OS==='ios'){
console.log(
'You specified `onScroll` on a <ScrollView> but not '+
'`scrollEventThrottle`. You will only receive one event. '+
'Using `16` you get all the events but be aware that it may '+
'cause frame drops, use a bigger number if you don\'t need as '+
'much precision.');}}



if(Platform.OS==='android'){
if(this.props.keyboardDismissMode==='on-drag'){
dismissKeyboard();}}


this.scrollResponderHandleScroll(e);},


_handleContentOnLayout:function(e){var _e$nativeEvent$layout=
e.nativeEvent.layout;var width=_e$nativeEvent$layout.width;var height=_e$nativeEvent$layout.height;
this.props.onContentSizeChange&&this.props.onContentSizeChange(width,height);},


render:function(){
var contentContainerStyle=[
this.props.horizontal&&styles.contentContainerHorizontal,
this.props.contentContainerStyle];

if(__DEV__&&this.props.style){
var style=flattenStyle(this.props.style);
var childLayoutProps=['alignItems','justifyContent'].
filter(function(prop){return style&&style[prop]!==undefined;});
invariant(
childLayoutProps.length===0,
'ScrollView child layout ('+JSON.stringify(childLayoutProps)+
') must be applied through the contentContainerStyle prop.');}



var contentSizeChangeProps={};
if(this.props.onContentSizeChange){
contentSizeChangeProps={
onLayout:this._handleContentOnLayout};}



var contentContainer=
React.createElement(View,babelHelpers.extends({},
contentSizeChangeProps,{
ref:INNERVIEW,
style:contentContainerStyle,
removeClippedSubviews:this.props.removeClippedSubviews,
collapsable:false}),
this.props.children);


var alwaysBounceHorizontal=
this.props.alwaysBounceHorizontal!==undefined?
this.props.alwaysBounceHorizontal:
this.props.horizontal;

var alwaysBounceVertical=
this.props.alwaysBounceVertical!==undefined?
this.props.alwaysBounceVertical:
!this.props.horizontal;

var props=babelHelpers.extends({},
this.props,{
alwaysBounceHorizontal:alwaysBounceHorizontal,
alwaysBounceVertical:alwaysBounceVertical,
style:[styles.base,this.props.style],
onTouchStart:this.scrollResponderHandleTouchStart,
onTouchMove:this.scrollResponderHandleTouchMove,
onTouchEnd:this.scrollResponderHandleTouchEnd,
onScrollBeginDrag:this.scrollResponderHandleScrollBeginDrag,
onScrollEndDrag:this.scrollResponderHandleScrollEndDrag,
onMomentumScrollBegin:this.scrollResponderHandleMomentumScrollBegin,
onMomentumScrollEnd:this.scrollResponderHandleMomentumScrollEnd,
onStartShouldSetResponder:this.scrollResponderHandleStartShouldSetResponder,
onStartShouldSetResponderCapture:this.scrollResponderHandleStartShouldSetResponderCapture,
onScrollShouldSetResponder:this.scrollResponderHandleScrollShouldSetResponder,
onScroll:this.handleScroll,
onResponderGrant:this.scrollResponderHandleResponderGrant,
onResponderTerminationRequest:this.scrollResponderHandleTerminationRequest,
onResponderTerminate:this.scrollResponderHandleTerminate,
onResponderRelease:this.scrollResponderHandleResponderRelease,
onResponderReject:this.scrollResponderHandleResponderReject,
sendMomentumEvents:this.props.onMomentumScrollBegin||this.props.onMomentumScrollEnd?true:false});


var onRefreshStart=this.props.onRefreshStart;
if(onRefreshStart){


props.onRefreshStart=
function(){onRefreshStart&&onRefreshStart(this.endRefreshing);}.bind(this);}var 


decelerationRate=this.props.decelerationRate;
if(decelerationRate){
props.decelerationRate=processDecelerationRate(decelerationRate);}


var ScrollViewClass;
if(Platform.OS==='ios'){
ScrollViewClass=RCTScrollView;}else 
if(Platform.OS==='android'){
if(this.props.horizontal){
ScrollViewClass=AndroidHorizontalScrollView;}else 
{
ScrollViewClass=AndroidScrollView;}}


invariant(
ScrollViewClass!==undefined,
'ScrollViewClass must not be undefined');


var refreshControl=this.props.refreshControl;
if(refreshControl){
if(Platform.OS==='ios'){

return (
React.createElement(ScrollViewClass,babelHelpers.extends({},props,{ref:SCROLLVIEW}),
refreshControl,
contentContainer));}else 


if(Platform.OS==='android'){



return React.cloneElement(
refreshControl,
{style:props.style},
React.createElement(ScrollViewClass,babelHelpers.extends({},props,{style:styles.base,ref:SCROLLVIEW}),
contentContainer));}}




return (
React.createElement(ScrollViewClass,babelHelpers.extends({},props,{ref:SCROLLVIEW}),
contentContainer));}});





var styles=StyleSheet.create({
base:{
flex:1},

contentContainerHorizontal:{
alignSelf:'flex-start',
flexDirection:'row'}});



var validAttributes=babelHelpers.extends({},
ReactNativeViewAttributes.UIView,{
alwaysBounceHorizontal:true,
alwaysBounceVertical:true,
automaticallyAdjustContentInsets:true,
bounces:true,
centerContent:true,
contentInset:{diff:insetsDiffer},
contentOffset:{diff:pointsDiffer},
decelerationRate:true,
horizontal:true,
indicatorStyle:true,
keyboardDismissMode:true,
keyboardShouldPersistTaps:true,
maximumZoomScale:true,
minimumZoomScale:true,
pagingEnabled:true,
removeClippedSubviews:true,
scrollEnabled:true,
scrollIndicatorInsets:{diff:insetsDiffer},
scrollsToTop:true,
showsHorizontalScrollIndicator:true,
showsVerticalScrollIndicator:true,
snapToInterval:true,
snapToAlignment:true,
stickyHeaderIndices:{diff:deepDiffer},
scrollEventThrottle:true,
zoomScale:true});


if(Platform.OS==='android'){
var AndroidScrollView=requireNativeComponent('RCTScrollView',ScrollView);
var AndroidHorizontalScrollView=requireNativeComponent(
'AndroidHorizontalScrollView',
ScrollView);}else 

if(Platform.OS==='ios'){
var RCTScrollView=requireNativeComponent('RCTScrollView',ScrollView);}


module.exports=ScrollView;
});
__d(182 /* PointPropType */, function(global, require, module, exports) {'use strict';












var PropTypes=require(41 /* ReactPropTypes */);

var createStrictShapeTypeChecker=require(129 /* createStrictShapeTypeChecker */);

var PointPropType=createStrictShapeTypeChecker({
x:PropTypes.number,
y:PropTypes.number});


module.exports=PointPropType;
});
__d(183 /* ScrollResponder */, function(global, require, module, exports) {'use strict';












var Dimensions=require(150 /* Dimensions */);
var Platform=require(4 /* Platform */);
var RCTDeviceEventEmitter=require(22 /* RCTDeviceEventEmitter */);
var React=require(47 /* React */);
var Subscribable=require(184 /* Subscribable */);
var TextInputState=require(9 /* TextInputState */);
var UIManager=require(10 /* UIManager */);var _require=

require(11 /* NativeModules */);var ScrollViewManager=_require.ScrollViewManager;

var invariant=require(363 /* fbjs/lib/invariant */);
var warning=require(368 /* fbjs/lib/warning */);

















































































var IS_ANIMATING_TOUCH_START_THRESHOLD_MS=16;










var ScrollResponderMixin={
mixins:[Subscribable.Mixin],
scrollResponderMixinGetInitialState:function(){
return {
isTouching:false,
lastMomentumScrollBeginTime:0,
lastMomentumScrollEndTime:0,






observedScrollSinceBecomingResponder:false,
becameResponderWhileAnimating:false};},






scrollResponderHandleScrollShouldSetResponder:function(){
return this.state.isTouching;},



























scrollResponderHandleStartShouldSetResponder:function(){
return false;},













scrollResponderHandleStartShouldSetResponderCapture:function(e){

var currentlyFocusedTextInput=TextInputState.currentlyFocusedField();
if(!this.props.keyboardShouldPersistTaps&&
currentlyFocusedTextInput!=null&&
e.target!==currentlyFocusedTextInput){
return true;}

return this.scrollResponderIsAnimating();},












scrollResponderHandleResponderReject:function(){
warning(false,"ScrollView doesn't take rejection well - scrolls anyway");},

















scrollResponderHandleTerminationRequest:function(){
return !this.state.observedScrollSinceBecomingResponder;},







scrollResponderHandleTouchEnd:function(e){
var nativeEvent=e.nativeEvent;
this.state.isTouching=nativeEvent.touches.length!==0;
this.props.onTouchEnd&&this.props.onTouchEnd(e);},





scrollResponderHandleResponderRelease:function(e){
this.props.onResponderRelease&&this.props.onResponderRelease(e);



var currentlyFocusedTextInput=TextInputState.currentlyFocusedField();
if(!this.props.keyboardShouldPersistTaps&&
currentlyFocusedTextInput!=null&&
e.target!==currentlyFocusedTextInput&&
!this.state.observedScrollSinceBecomingResponder&&
!this.state.becameResponderWhileAnimating){
this.props.onScrollResponderKeyboardDismissed&&
this.props.onScrollResponderKeyboardDismissed(e);
TextInputState.blurTextInput(currentlyFocusedTextInput);}},



scrollResponderHandleScroll:function(e){
this.state.observedScrollSinceBecomingResponder=true;
this.props.onScroll&&this.props.onScroll(e);},





scrollResponderHandleResponderGrant:function(e){
this.state.observedScrollSinceBecomingResponder=false;
this.props.onResponderGrant&&this.props.onResponderGrant(e);
this.state.becameResponderWhileAnimating=this.scrollResponderIsAnimating();},









scrollResponderHandleScrollBeginDrag:function(e){
this.props.onScrollBeginDrag&&this.props.onScrollBeginDrag(e);},





scrollResponderHandleScrollEndDrag:function(e){
this.props.onScrollEndDrag&&this.props.onScrollEndDrag(e);},





scrollResponderHandleMomentumScrollBegin:function(e){
this.state.lastMomentumScrollBeginTime=Date.now();
this.props.onMomentumScrollBegin&&this.props.onMomentumScrollBegin(e);},





scrollResponderHandleMomentumScrollEnd:function(e){
this.state.lastMomentumScrollEndTime=Date.now();
this.props.onMomentumScrollEnd&&this.props.onMomentumScrollEnd(e);},













scrollResponderHandleTouchStart:function(e){
this.state.isTouching=true;
this.props.onTouchStart&&this.props.onTouchStart(e);},













scrollResponderHandleTouchMove:function(e){
this.props.onTouchMove&&this.props.onTouchMove(e);},







scrollResponderIsAnimating:function(){
var now=Date.now();
var timeSinceLastMomentumScrollEnd=now-this.state.lastMomentumScrollEndTime;
var isAnimating=timeSinceLastMomentumScrollEnd<IS_ANIMATING_TOUCH_START_THRESHOLD_MS||
this.state.lastMomentumScrollEndTime<this.state.lastMomentumScrollBeginTime;
return isAnimating;},







scrollResponderGetScrollableNode:function(){
return this.getScrollableNode?
this.getScrollableNode():
React.findNodeHandle(this);},













scrollResponderScrollTo:function(
x,
y,
animated)
{
if(typeof x==='number'){
console.warn('`scrollResponderScrollTo(x, y, animated)` is deprecated. Use `scrollResponderScrollTo({x: 5, y: 5, animated: true})` instead.');}else 
{var _ref=
x||{};x=_ref.x;y=_ref.y;animated=_ref.animated;}

UIManager.dispatchViewManagerCommand(
this.scrollResponderGetScrollableNode(),
UIManager.RCTScrollView.Commands.scrollTo,
[x||0,y||0,animated!==false]);},






scrollResponderScrollWithoutAnimationTo:function(offsetX,offsetY){
console.warn('`scrollResponderScrollWithoutAnimationTo` is deprecated. Use `scrollResponderScrollTo` instead');
this.scrollResponderScrollTo({x:offsetX,y:offsetY,animated:false});},








scrollResponderZoomTo:function(
rect,
animated)
{
if(Platform.OS==='android'){
invariant('zoomToRect is not implemented');}else 
{
if('animated' in rect){var 
animated=rect.animated;var rect=babelHelpers.objectWithoutProperties(rect,['animated']);}else 
if(typeof animated!=='undefined'){
console.warn('`scrollResponderZoomTo` `animated` argument is deprecated. Use `options.animated` instead');}

ScrollViewManager.zoomToRect(this.scrollResponderGetScrollableNode(),rect,animated!==false);}},













scrollResponderScrollNativeHandleToKeyboard:function(nodeHandle,additionalOffset,preventNegativeScrollOffset){
this.additionalScrollOffset=additionalOffset||0;
this.preventNegativeScrollOffset=!!preventNegativeScrollOffset;
UIManager.measureLayout(
nodeHandle,
React.findNodeHandle(this.getInnerViewNode()),
this.scrollResponderTextInputFocusError,
this.scrollResponderInputMeasureAndScrollToKeyboard);},













scrollResponderInputMeasureAndScrollToKeyboard:function(left,top,width,height){
var keyboardScreenY=Dimensions.get('window').height;
if(this.keyboardWillOpenTo){
keyboardScreenY=this.keyboardWillOpenTo.endCoordinates.screenY;}

var scrollOffsetY=top-keyboardScreenY+height+this.additionalScrollOffset;





if(this.preventNegativeScrollOffset){
scrollOffsetY=Math.max(0,scrollOffsetY);}

this.scrollResponderScrollTo({x:0,y:scrollOffsetY,animated:true});

this.additionalOffset=0;
this.preventNegativeScrollOffset=false;},


scrollResponderTextInputFocusError:function(e){
console.error('Error measuring text field: ',e);},








componentWillMount:function(){
this.keyboardWillOpenTo=null;
this.additionalScrollOffset=0;
this.addListenerOn(RCTDeviceEventEmitter,'keyboardWillShow',this.scrollResponderKeyboardWillShow);
this.addListenerOn(RCTDeviceEventEmitter,'keyboardWillHide',this.scrollResponderKeyboardWillHide);
this.addListenerOn(RCTDeviceEventEmitter,'keyboardDidShow',this.scrollResponderKeyboardDidShow);
this.addListenerOn(RCTDeviceEventEmitter,'keyboardDidHide',this.scrollResponderKeyboardDidHide);},






























scrollResponderKeyboardWillShow:function(e){
this.keyboardWillOpenTo=e;
this.props.onKeyboardWillShow&&this.props.onKeyboardWillShow(e);},


scrollResponderKeyboardWillHide:function(e){
this.keyboardWillOpenTo=null;
this.props.onKeyboardWillHide&&this.props.onKeyboardWillHide(e);},


scrollResponderKeyboardDidShow:function(e){


if(e){
this.keyboardWillOpenTo=e;}

this.props.onKeyboardDidShow&&this.props.onKeyboardDidShow(e);},


scrollResponderKeyboardDidHide:function(e){
this.keyboardWillOpenTo=null;
this.props.onKeyboardDidHide&&this.props.onKeyboardDidHide(e);}};




var ScrollResponder={
Mixin:ScrollResponderMixin};


module.exports=ScrollResponder;
});
__d(184 /* Subscribable */, function(global, require, module, exports) {'use strict';






















var Subscribable={};

Subscribable.Mixin={

componentWillMount:function(){
this._subscribableSubscriptions=[];},


componentWillUnmount:function(){
this._subscribableSubscriptions.forEach(
function(subscription){return subscription.remove();});

this._subscribableSubscriptions=null;},















addListenerOn:function(
eventEmitter,
eventType,
listener,
context)
{
this._subscribableSubscriptions.push(
eventEmitter.addListener(eventType,listener,context));}};




module.exports=Subscribable;
});
__d(185 /* dismissKeyboard */, function(global, require, module, exports) {'use strict';








var TextInputState=require(9 /* TextInputState */);

function dismissKeyboard(){
TextInputState.blurTextInput(TextInputState.currentlyFocusedField());}


module.exports=dismissKeyboard;
});
__d(186 /* processDecelerationRate */, function(global, require, module, exports) {'use strict';











function processDecelerationRate(decelerationRate){
if(decelerationRate==='normal'){
decelerationRate=0.998;}else 
if(decelerationRate==='fast'){
decelerationRate=0.99;}

return decelerationRate;}


module.exports=processDecelerationRate;
});
__d(187 /* StaticRenderer */, function(global, require, module, exports) {'use strict';












var React=require(47 /* React */);

var StaticRenderer=React.createClass({displayName:'StaticRenderer',
propTypes:{
shouldUpdate:React.PropTypes.bool.isRequired,
render:React.PropTypes.func.isRequired},


shouldComponentUpdate:function(nextProps){
return nextProps.shouldUpdate;},


render:function(){
return this.props.render();}});



module.exports=StaticRenderer;
});
__d(523 /* react-timer-mixin/TimerMixin.js */, function(global, require, module, exports) {'use strict';










var GLOBAL=typeof window==='undefined'?global:window;

var setter=function(_setter,_clearer,array){
return function(callback,delta){
var id=_setter(function(){
_clearer.call(this,id);
callback.apply(this,arguments);}.
bind(this),delta);

if(!this[array]){
this[array]=[id];}else 
{
this[array].push(id);}

return id;};};



var clearer=function(_clearer,array){
return function(id){
if(this[array]){
var index=this[array].indexOf(id);
if(index!==-1){
this[array].splice(index,1);}}


_clearer(id);};};



var _timeouts='TimerMixin_timeouts';
var _clearTimeout=clearer(GLOBAL.clearTimeout,_timeouts);
var _setTimeout=setter(GLOBAL.setTimeout,_clearTimeout,_timeouts);

var _intervals='TimerMixin_intervals';
var _clearInterval=clearer(GLOBAL.clearInterval,_intervals);
var _setInterval=setter(GLOBAL.setInterval,function(){},_intervals);

var _immediates='TimerMixin_immediates';
var _clearImmediate=clearer(GLOBAL.clearImmediate,_immediates);
var _setImmediate=setter(GLOBAL.setImmediate,_clearImmediate,_immediates);

var _rafs='TimerMixin_rafs';
var _cancelAnimationFrame=clearer(GLOBAL.cancelAnimationFrame,_rafs);
var _requestAnimationFrame=setter(GLOBAL.requestAnimationFrame,_cancelAnimationFrame,_rafs);

var TimerMixin={
componentWillUnmount:function(){
this[_timeouts]&&this[_timeouts].forEach(function(id){
GLOBAL.clearTimeout(id);});

this[_timeouts]=null;
this[_intervals]&&this[_intervals].forEach(function(id){
GLOBAL.clearInterval(id);});

this[_intervals]=null;
this[_immediates]&&this[_immediates].forEach(function(id){
GLOBAL.clearImmediate(id);});

this[_immediates]=null;
this[_rafs]&&this[_rafs].forEach(function(id){
GLOBAL.cancelAnimationFrame(id);});

this[_rafs]=null;},


setTimeout:_setTimeout,
clearTimeout:_clearTimeout,

setInterval:_setInterval,
clearInterval:_clearInterval,

setImmediate:_setImmediate,
clearImmediate:_clearImmediate,

requestAnimationFrame:_requestAnimationFrame,
cancelAnimationFrame:_cancelAnimationFrame};


module.exports=TimerMixin;
});
__d(188 /* MapView */, function(global, require, module, exports) {'use strict';












var ColorPropType=require(134 /* ColorPropType */);
var EdgeInsetsPropType=require(128 /* EdgeInsetsPropType */);
var Image=require(175 /* Image */);
var NativeMethodsMixin=require(2 /* NativeMethodsMixin */);
var Platform=require(4 /* Platform */);
var React=require(47 /* React */);
var StyleSheet=require(148 /* StyleSheet */);
var View=require(127 /* View */);

var deprecatedPropType=require(137 /* deprecatedPropType */);
var processColor=require(30 /* processColor */);
var resolveAssetSource=require(161 /* resolveAssetSource */);
var requireNativeComponent=require(146 /* requireNativeComponent */);











var MapView=React.createClass({displayName:'MapView',

mixins:[NativeMethodsMixin],

propTypes:babelHelpers.extends({},
View.propTypes,{




style:View.propTypes.style,








showsUserLocation:React.PropTypes.bool,







followUserLocation:React.PropTypes.bool,






showsPointsOfInterest:React.PropTypes.bool,






showsCompass:React.PropTypes.bool,





zoomEnabled:React.PropTypes.bool,








rotateEnabled:React.PropTypes.bool,








pitchEnabled:React.PropTypes.bool,





scrollEnabled:React.PropTypes.bool,










mapType:React.PropTypes.oneOf([
'standard',
'satellite',
'hybrid']),








region:React.PropTypes.shape({



latitude:React.PropTypes.number.isRequired,
longitude:React.PropTypes.number.isRequired,





latitudeDelta:React.PropTypes.number,
longitudeDelta:React.PropTypes.number}),






annotations:React.PropTypes.arrayOf(React.PropTypes.shape({



latitude:React.PropTypes.number.isRequired,
longitude:React.PropTypes.number.isRequired,




animateDrop:React.PropTypes.bool,




draggable:React.PropTypes.bool,




onDragStateChange:React.PropTypes.func,





onFocus:React.PropTypes.func,





onBlur:React.PropTypes.func,




title:React.PropTypes.string,
subtitle:React.PropTypes.string,




leftCalloutView:React.PropTypes.element,
rightCalloutView:React.PropTypes.element,
detailCalloutView:React.PropTypes.element,










tintColor:ColorPropType,




image:Image.propTypes.source,




view:React.PropTypes.element,




id:React.PropTypes.string,




hasLeftCallout:deprecatedPropType(
React.PropTypes.bool,
'Use `leftCalloutView` instead.'),

hasRightCallout:deprecatedPropType(
React.PropTypes.bool,
'Use `rightCalloutView` instead.'),

onLeftCalloutPress:deprecatedPropType(
React.PropTypes.func,
'Use `leftCalloutView` instead.'),

onRightCalloutPress:deprecatedPropType(
React.PropTypes.func,
'Use `rightCalloutView` instead.')})),







overlays:React.PropTypes.arrayOf(React.PropTypes.shape({



coordinates:React.PropTypes.arrayOf(React.PropTypes.shape({
latitude:React.PropTypes.number.isRequired,
longitude:React.PropTypes.number.isRequired})),





lineWidth:React.PropTypes.number,
strokeColor:ColorPropType,
fillColor:ColorPropType,




id:React.PropTypes.string})),






maxDelta:React.PropTypes.number,





minDelta:React.PropTypes.number,






legalLabelInsets:EdgeInsetsPropType,




onRegionChange:React.PropTypes.func,




onRegionChangeComplete:React.PropTypes.func,




onAnnotationPress:React.PropTypes.func,




active:React.PropTypes.bool}),


statics:{







PinColors:{
RED:'#ff3b30',
GREEN:'#4cd964',
PURPLE:'#c969e0'}},



render:function(){var _this=this;
var children=[];var _props=this.props;var annotations=_props.annotations;var overlays=_props.overlays;var followUserLocation=_props.followUserLocation;
annotations=annotations&&annotations.map(function(annotation){var 

id=






annotation.id;var image=annotation.image;var tintColor=annotation.tintColor;var view=annotation.view;var leftCalloutView=annotation.leftCalloutView;var rightCalloutView=annotation.rightCalloutView;var detailCalloutView=annotation.detailCalloutView;

if(!view&&image&&tintColor){
view=React.createElement(Image,{
style:{
tintColor:processColor(tintColor)},

source:image});

image=undefined;}

if(view){
if(image){
console.warn('`image` and `view` both set on annotation. Image will be ignored.');}

var viewIndex=children.length;
children.push(React.cloneElement(view,{
style:[styles.annotationView,view.props.style||{}]}));}


if(leftCalloutView){
var leftCalloutViewIndex=children.length;
children.push(React.cloneElement(leftCalloutView,{
style:[styles.calloutView,leftCalloutView.props.style||{}]}));}


if(rightCalloutView){
var rightCalloutViewIndex=children.length;
children.push(React.cloneElement(rightCalloutView,{
style:[styles.calloutView,rightCalloutView.props.style||{}]}));}


if(detailCalloutView){
var detailCalloutViewIndex=children.length;
children.push(React.cloneElement(detailCalloutView,{
style:[styles.calloutView,detailCalloutView.props.style||{}]}));}



var result=babelHelpers.extends({},
annotation,{
tintColor:tintColor&&processColor(tintColor),
image:image,
viewIndex:viewIndex,
leftCalloutViewIndex:leftCalloutViewIndex,
rightCalloutViewIndex:rightCalloutViewIndex,
detailCalloutViewIndex:detailCalloutViewIndex,
view:undefined,
leftCalloutView:undefined,
rightCalloutView:undefined,
detailCalloutView:undefined});

result.id=id||encodeURIComponent(JSON.stringify(result));
result.image=image&&resolveAssetSource(image);
return result;});

overlays=overlays&&overlays.map(function(overlay){var 
id=overlay.id;var fillColor=overlay.fillColor;var strokeColor=overlay.strokeColor;
var result=babelHelpers.extends({},
overlay,{
strokeColor:strokeColor&&processColor(strokeColor),
fillColor:fillColor&&processColor(fillColor)});

result.id=id||encodeURIComponent(JSON.stringify(result));
return result;});


var findByAnnotationId=function(annotationId){
if(!annotations){
return null;}

for(var i=0,l=annotations.length;i<l;i++){
if(annotations[i].id===annotationId){
return annotations[i];}}


return null;};



var onPress=void 0,onAnnotationDragStateChange=void 0,onAnnotationFocus=void 0,onAnnotationBlur=void 0;
if(annotations){
onPress=function(event){
if(event.nativeEvent.action==='annotation-click'){

_this.props.onAnnotationPress&&
_this.props.onAnnotationPress(event.nativeEvent.annotation);}else 
if(event.nativeEvent.action==='callout-click'){
var annotation=findByAnnotationId(event.nativeEvent.annotationId);
if(annotation){

if(event.nativeEvent.side==='left'&&annotation.onLeftCalloutPress){
annotation.onLeftCalloutPress(event.nativeEvent);}else 
if(event.nativeEvent.side==='right'&&annotation.onRightCalloutPress){
annotation.onRightCalloutPress(event.nativeEvent);}}}};




onAnnotationDragStateChange=function(event){
var annotation=findByAnnotationId(event.nativeEvent.annotationId);
if(annotation){

annotation.latitude=event.nativeEvent.latitude;
annotation.longitude=event.nativeEvent.longitude;

annotation.onDragStateChange&&
annotation.onDragStateChange(event.nativeEvent);}};


onAnnotationFocus=function(event){
var annotation=findByAnnotationId(event.nativeEvent.annotationId);
if(annotation&&annotation.onFocus){
annotation.onFocus(event.nativeEvent);}};


onAnnotationBlur=function(event){
var annotation=findByAnnotationId(event.nativeEvent.annotationId);
if(annotation&&annotation.onBlur){
annotation.onBlur(event.nativeEvent);}};}





if(this.props.onRegionChange||this.props.onRegionChangeComplete){
var onChange=function(event){
if(event.nativeEvent.continuous){
_this.props.onRegionChange&&
_this.props.onRegionChange(event.nativeEvent.region);}else 
{
_this.props.onRegionChangeComplete&&
_this.props.onRegionChangeComplete(event.nativeEvent.region);}};}





if(followUserLocation===undefined){
followUserLocation=this.props.showUserLocation;}


return (
React.createElement(RCTMap,babelHelpers.extends({},
this.props,{
annotations:annotations,
children:children,
followUserLocation:followUserLocation,
overlays:overlays,
onPress:onPress,
onChange:onChange,
onAnnotationDragStateChange:onAnnotationDragStateChange,
onAnnotationFocus:onAnnotationFocus,
onAnnotationBlur:onAnnotationBlur})));}});





var styles=StyleSheet.create({
annotationView:{
position:'absolute',
backgroundColor:'transparent'},

calloutView:{
position:'absolute',
backgroundColor:'white'}});



var RCTMap=requireNativeComponent('RCTMap',MapView,{
nativeOnly:{
onAnnotationDragStateChange:true,
onAnnotationFocus:true,
onAnnotationBlur:true,
onChange:true,
onPress:true}});



module.exports=MapView;
});
__d(189 /* Modal */, function(global, require, module, exports) {'use strict';












var PropTypes=require(41 /* ReactPropTypes */);
var React=require(47 /* React */);
var StyleSheet=require(148 /* StyleSheet */);
var View=require(127 /* View */);

var requireNativeComponent=require(146 /* requireNativeComponent */);
var RCTModalHostView=requireNativeComponent('RCTModalHostView',null);var 














Modal=function(_React$Component){babelHelpers.inherits(Modal,_React$Component);function Modal(){babelHelpers.classCallCheck(this,Modal);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(Modal).apply(this,arguments));}babelHelpers.createClass(Modal,[{key:'render',value:function render()
{
if(this.props.visible===false){
return null;}


if(this.props.transparent){
var containerBackgroundColor={backgroundColor:'transparent'};}


return (
React.createElement(RCTModalHostView,{
animated:this.props.animated,
transparent:this.props.transparent,
onRequestClose:this.props.onRequestClose,
onShow:this.props.onShow,
style:styles.modal},
React.createElement(View,{style:[styles.container,containerBackgroundColor]},
this.props.children)));}}]);return Modal;}(React.Component);






Modal.propTypes={
animated:PropTypes.bool,
transparent:PropTypes.bool,
visible:PropTypes.bool,
onRequestClose:PropTypes.func,
onShow:PropTypes.func};


Modal.defaultProps={
visible:true};


var styles=StyleSheet.create({
modal:{
position:'absolute'},

container:{
position:'absolute',
left:0,
top:0}});



module.exports=Modal;
});
__d(190 /* Navigator */, function(global, require, module, exports) {'use strict';




























var AnimationsDebugModule=require(11 /* NativeModules */).AnimationsDebugModule;
var Dimensions=require(150 /* Dimensions */);
var InteractionMixin=require(191 /* InteractionMixin */);
var NavigationContext=require(192 /* NavigationContext */);
var NavigatorBreadcrumbNavigationBar=require(196 /* NavigatorBreadcrumbNavigationBar */);
var NavigatorNavigationBar=require(201 /* NavigatorNavigationBar */);
var NavigatorSceneConfigs=require(202 /* NavigatorSceneConfigs */);
var PanResponder=require(203 /* PanResponder */);
var React=require(47 /* React */);
var StyleSheet=require(148 /* StyleSheet */);
var Subscribable=require(184 /* Subscribable */);
var TimerMixin=require(523 /* react-timer-mixin */);
var View=require(127 /* View */);

var clamp=require(205 /* clamp */);
var deprecatedPropType=require(137 /* deprecatedPropType */);
var flattenStyle=require(7 /* flattenStyle */);
var invariant=require(363 /* fbjs/lib/invariant */);
var rebound=require(539 /* rebound */);

var PropTypes=React.PropTypes;




var SCREEN_WIDTH=Dimensions.get('window').width;
var SCREEN_HEIGHT=Dimensions.get('window').height;
var SCENE_DISABLED_NATIVE_PROPS={
pointerEvents:'none',
style:{
top:SCREEN_HEIGHT,
bottom:-SCREEN_HEIGHT,
opacity:0}};



var __uid=0;
function getuid(){
return __uid++;}


function getRouteID(route){
if(route===null||typeof route!=='object'){
return String(route);}


var key='__navigatorRouteID';

if(!route.hasOwnProperty(key)){
Object.defineProperty(route,key,{
enumerable:false,
configurable:false,
writable:false,
value:getuid()});}


return route[key];}



var styles=StyleSheet.create({
container:{
flex:1,
overflow:'hidden'},

defaultSceneStyle:{
position:'absolute',
left:0,
right:0,
bottom:0,
top:0},

baseScene:{
position:'absolute',
overflow:'hidden',
left:0,
right:0,
bottom:0,
top:0},

disabledScene:{
top:SCREEN_HEIGHT,
bottom:-SCREEN_HEIGHT},

transitioner:{
flex:1,
backgroundColor:'transparent',
overflow:'hidden'}});



var GESTURE_ACTIONS=[
'pop',
'jumpBack',
'jumpForward'];






























































var Navigator=React.createClass({displayName:'Navigator',

propTypes:{









configureScene:PropTypes.func,










renderScene:PropTypes.func.isRequired,







initialRoute:PropTypes.object,






initialRouteStack:PropTypes.arrayOf(PropTypes.object),




onWillFocus:PropTypes.func,





onDidFocus:PropTypes.func,





navigationBar:PropTypes.node,




navigator:PropTypes.object,




sceneStyle:View.propTypes.style},


statics:{
BreadcrumbNavigationBar:NavigatorBreadcrumbNavigationBar,
NavigationBar:NavigatorNavigationBar,
SceneConfigs:NavigatorSceneConfigs},


mixins:[TimerMixin,InteractionMixin,Subscribable.Mixin],

getDefaultProps:function(){
return {
configureScene:function(){return NavigatorSceneConfigs.PushFromRight;},
sceneStyle:styles.defaultSceneStyle};},



getInitialState:function(){var _this=this;
this._navigationBarNavigator=this.props.navigationBarNavigator||this;

this._renderedSceneMap=new Map();

var routeStack=this.props.initialRouteStack||[this.props.initialRoute];
invariant(
routeStack.length>=1,
'Navigator requires props.initialRoute or props.initialRouteStack.');

var initialRouteIndex=routeStack.length-1;
if(this.props.initialRoute){
initialRouteIndex=routeStack.indexOf(this.props.initialRoute);
invariant(
initialRouteIndex!==-1,
'initialRoute is not in initialRouteStack.');}


return {
sceneConfigStack:routeStack.map(
function(route){return _this.props.configureScene(route,routeStack);}),

routeStack:routeStack,
presentedIndex:initialRouteIndex,
transitionFromIndex:null,
activeGesture:null,
pendingGestureProgress:null,
transitionQueue:[]};},



componentWillMount:function(){var _this2=this;

this.__defineGetter__('navigationContext',this._getNavigationContext);

this._subRouteFocus=[];
this.parentNavigator=this.props.navigator;
this._handlers={};
this.springSystem=new rebound.SpringSystem();
this.spring=this.springSystem.createSpring();
this.spring.setRestSpeedThreshold(0.05);
this.spring.setCurrentValue(0).setAtRest();
this.spring.addListener({
onSpringEndStateChange:function(){
if(!_this2._interactionHandle){
_this2._interactionHandle=_this2.createInteractionHandle();}},


onSpringUpdate:function(){
_this2._handleSpringUpdate();},

onSpringAtRest:function(){
_this2._completeTransition();}});


this.panGesture=PanResponder.create({
onMoveShouldSetPanResponder:this._handleMoveShouldSetPanResponder,
onPanResponderRelease:this._handlePanResponderRelease,
onPanResponderMove:this._handlePanResponderMove,
onPanResponderTerminate:this._handlePanResponderTerminate});

this._interactionHandle=null;
this._emitWillFocus(this.state.routeStack[this.state.presentedIndex]);},


componentDidMount:function(){
this._handleSpringUpdate();
this._emitDidFocus(this.state.routeStack[this.state.presentedIndex]);},


componentWillUnmount:function(){
if(this._navigationContext){
this._navigationContext.dispose();
this._navigationContext=null;}


this.spring.destroy();

if(this._interactionHandle){
this.clearInteractionHandle(this._interactionHandle);}},










immediatelyResetRouteStack:function(nextRouteStack){var _this3=this;
var destIndex=nextRouteStack.length-1;
this.setState({
routeStack:nextRouteStack,
sceneConfigStack:nextRouteStack.map(
function(route){return _this3.props.configureScene(route,nextRouteStack);}),

presentedIndex:destIndex,
activeGesture:null,
transitionFromIndex:null,
transitionQueue:[]},
function(){
_this3._handleSpringUpdate();
_this3._navBar&&_this3._navBar.immediatelyRefresh();
_this3._emitDidFocus(_this3.state.routeStack[_this3.state.presentedIndex]);});},



_transitionTo:function(destIndex,velocity,jumpSpringTo,cb){
if(destIndex===this.state.presentedIndex){
return;}

if(this.state.transitionFromIndex!==null){
this.state.transitionQueue.push({
destIndex:destIndex,
velocity:velocity,
cb:cb});

return;}

this.state.transitionFromIndex=this.state.presentedIndex;
this.state.presentedIndex=destIndex;
this.state.transitionCb=cb;
this._onAnimationStart();
if(AnimationsDebugModule){
AnimationsDebugModule.startRecordingFps();}

var sceneConfig=this.state.sceneConfigStack[this.state.transitionFromIndex]||
this.state.sceneConfigStack[this.state.presentedIndex];
invariant(
sceneConfig,
'Cannot configure scene at index '+this.state.transitionFromIndex);

if(jumpSpringTo!=null){
this.spring.setCurrentValue(jumpSpringTo);}

this.spring.setOvershootClampingEnabled(true);
this.spring.getSpringConfig().friction=sceneConfig.springFriction;
this.spring.getSpringConfig().tension=sceneConfig.springTension;
this.spring.setVelocity(velocity||sceneConfig.defaultTransitionVelocity);
this.spring.setEndValue(1);},






_handleSpringUpdate:function(){
if(!this.isMounted()){
return;}


if(this.state.transitionFromIndex!=null){
this._transitionBetween(
this.state.transitionFromIndex,
this.state.presentedIndex,
this.spring.getCurrentValue());}else 

if(this.state.activeGesture!=null){
var presentedToIndex=this.state.presentedIndex+this._deltaForGestureAction(this.state.activeGesture);
this._transitionBetween(
this.state.presentedIndex,
presentedToIndex,
this.spring.getCurrentValue());}},







_completeTransition:function(){
if(!this.isMounted()){
return;}


if(this.spring.getCurrentValue()!==1&&this.spring.getCurrentValue()!==0){


if(this.state.pendingGestureProgress){
this.state.pendingGestureProgress=null;}

return;}

this._onAnimationEnd();
var presentedIndex=this.state.presentedIndex;
var didFocusRoute=this._subRouteFocus[presentedIndex]||this.state.routeStack[presentedIndex];
this._emitDidFocus(didFocusRoute);
if(AnimationsDebugModule){
AnimationsDebugModule.stopRecordingFps(Date.now());}

this.state.transitionFromIndex=null;
this.spring.setCurrentValue(0).setAtRest();
this._hideScenes();
if(this.state.transitionCb){
this.state.transitionCb();
this.state.transitionCb=null;}

if(this._interactionHandle){
this.clearInteractionHandle(this._interactionHandle);
this._interactionHandle=null;}

if(this.state.pendingGestureProgress){


var gestureToIndex=this.state.presentedIndex+this._deltaForGestureAction(this.state.activeGesture);
this._enableScene(gestureToIndex);
this.spring.setEndValue(this.state.pendingGestureProgress);
return;}

if(this.state.transitionQueue.length){
var queuedTransition=this.state.transitionQueue.shift();
this._enableScene(queuedTransition.destIndex);
this._emitWillFocus(this.state.routeStack[queuedTransition.destIndex]);
this._transitionTo(
queuedTransition.destIndex,
queuedTransition.velocity,
null,
queuedTransition.cb);}},




_emitDidFocus:function(route){
this.navigationContext.emit('didfocus',{route:route});

if(this.props.onDidFocus){
this.props.onDidFocus(route);}},



_emitWillFocus:function(route){
this.navigationContext.emit('willfocus',{route:route});

var navBar=this._navBar;
if(navBar&&navBar.handleWillFocus){
navBar.handleWillFocus(route);}

if(this.props.onWillFocus){
this.props.onWillFocus(route);}},






_hideScenes:function(){
var gesturingToIndex=null;
if(this.state.activeGesture){
gesturingToIndex=this.state.presentedIndex+this._deltaForGestureAction(this.state.activeGesture);}

for(var i=0;i<this.state.routeStack.length;i++){
if(i===this.state.presentedIndex||
i===this.state.transitionFromIndex||
i===gesturingToIndex){
continue;}

this._disableScene(i);}},






_disableScene:function(sceneIndex){
this.refs['scene_'+sceneIndex]&&
this.refs['scene_'+sceneIndex].setNativeProps(SCENE_DISABLED_NATIVE_PROPS);},





_enableScene:function(sceneIndex){

var sceneStyle=flattenStyle([styles.baseScene,this.props.sceneStyle]);

var enabledSceneNativeProps={
pointerEvents:'auto',
style:{
top:sceneStyle.top,
bottom:sceneStyle.bottom}};


if(sceneIndex!==this.state.transitionFromIndex&&
sceneIndex!==this.state.presentedIndex){


enabledSceneNativeProps.style.opacity=0;}

this.refs['scene_'+sceneIndex]&&
this.refs['scene_'+sceneIndex].setNativeProps(enabledSceneNativeProps);},


_onAnimationStart:function(){
var fromIndex=this.state.presentedIndex;
var toIndex=this.state.presentedIndex;
if(this.state.transitionFromIndex!=null){
fromIndex=this.state.transitionFromIndex;}else 
if(this.state.activeGesture){
toIndex=this.state.presentedIndex+this._deltaForGestureAction(this.state.activeGesture);}

this._setRenderSceneToHardwareTextureAndroid(fromIndex,true);
this._setRenderSceneToHardwareTextureAndroid(toIndex,true);
var navBar=this._navBar;
if(navBar&&navBar.onAnimationStart){
navBar.onAnimationStart(fromIndex,toIndex);}},



_onAnimationEnd:function(){
var max=this.state.routeStack.length-1;
for(var index=0;index<=max;index++){
this._setRenderSceneToHardwareTextureAndroid(index,false);}


var navBar=this._navBar;
if(navBar&&navBar.onAnimationEnd){
navBar.onAnimationEnd();}},



_setRenderSceneToHardwareTextureAndroid:function(sceneIndex,shouldRenderToHardwareTexture){
var viewAtIndex=this.refs['scene_'+sceneIndex];
if(viewAtIndex===null||viewAtIndex===undefined){
return;}

viewAtIndex.setNativeProps({renderToHardwareTextureAndroid:shouldRenderToHardwareTexture});},


_handleTouchStart:function(){
this._eligibleGestures=GESTURE_ACTIONS;},


_handleMoveShouldSetPanResponder:function(e,gestureState){
var sceneConfig=this.state.sceneConfigStack[this.state.presentedIndex];
if(!sceneConfig){
return false;}

this._expectingGestureGrant=
this._matchGestureAction(this._eligibleGestures,sceneConfig.gestures,gestureState);
return !!this._expectingGestureGrant;},


_doesGestureOverswipe:function(gestureName){
var wouldOverswipeBack=this.state.presentedIndex<=0&&(
gestureName==='pop'||gestureName==='jumpBack');
var wouldOverswipeForward=this.state.presentedIndex>=this.state.routeStack.length-1&&
gestureName==='jumpForward';
return wouldOverswipeForward||wouldOverswipeBack;},


_deltaForGestureAction:function(gestureAction){
switch(gestureAction){
case 'pop':
case 'jumpBack':
return -1;
case 'jumpForward':
return 1;
default:
invariant(false,'Unsupported gesture action '+gestureAction);
return;}},



_handlePanResponderRelease:function(e,gestureState){var _this4=this;
var sceneConfig=this.state.sceneConfigStack[this.state.presentedIndex];
var releaseGestureAction=this.state.activeGesture;
if(!releaseGestureAction){

return;}

var releaseGesture=sceneConfig.gestures[releaseGestureAction];
var destIndex=this.state.presentedIndex+this._deltaForGestureAction(this.state.activeGesture);
if(this.spring.getCurrentValue()===0){

this.spring.setCurrentValue(0).setAtRest();
this._completeTransition();
return;}

var isTravelVertical=releaseGesture.direction==='top-to-bottom'||releaseGesture.direction==='bottom-to-top';
var isTravelInverted=releaseGesture.direction==='right-to-left'||releaseGesture.direction==='bottom-to-top';
var velocity,gestureDistance;
if(isTravelVertical){
velocity=isTravelInverted?-gestureState.vy:gestureState.vy;
gestureDistance=isTravelInverted?-gestureState.dy:gestureState.dy;}else 
{
velocity=isTravelInverted?-gestureState.vx:gestureState.vx;
gestureDistance=isTravelInverted?-gestureState.dx:gestureState.dx;}

var transitionVelocity=clamp(-10,velocity,10);
if(Math.abs(velocity)<releaseGesture.notMoving){

var hasGesturedEnoughToComplete=gestureDistance>releaseGesture.fullDistance*releaseGesture.stillCompletionRatio;
transitionVelocity=hasGesturedEnoughToComplete?releaseGesture.snapVelocity:-releaseGesture.snapVelocity;}

if(transitionVelocity<0||this._doesGestureOverswipe(releaseGestureAction)){


if(this.state.transitionFromIndex==null){

var transitionBackToPresentedIndex=this.state.presentedIndex;

this.state.presentedIndex=destIndex;
this._transitionTo(
transitionBackToPresentedIndex,
-transitionVelocity,
1-this.spring.getCurrentValue());}}else 


{

this._emitWillFocus(this.state.routeStack[destIndex]);
this._transitionTo(
destIndex,
transitionVelocity,
null,
function(){
if(releaseGestureAction==='pop'){
_this4._cleanScenesPastIndex(destIndex);}});}




this._detachGesture();},


_handlePanResponderTerminate:function(e,gestureState){
if(this.state.activeGesture==null){
return;}

var destIndex=this.state.presentedIndex+this._deltaForGestureAction(this.state.activeGesture);
this._detachGesture();
var transitionBackToPresentedIndex=this.state.presentedIndex;

this.state.presentedIndex=destIndex;
this._transitionTo(
transitionBackToPresentedIndex,
null,
1-this.spring.getCurrentValue());},



_attachGesture:function(gestureId){
this.state.activeGesture=gestureId;
var gesturingToIndex=this.state.presentedIndex+this._deltaForGestureAction(this.state.activeGesture);
this._enableScene(gesturingToIndex);},


_detachGesture:function(){
this.state.activeGesture=null;
this.state.pendingGestureProgress=null;
this._hideScenes();},


_handlePanResponderMove:function(e,gestureState){
if(this._isMoveGestureAttached!==undefined){
invariant(
this._expectingGestureGrant,
'Responder granted unexpectedly.');

this._attachGesture(this._expectingGestureGrant);
this._onAnimationStart();
this._expectingGestureGrant=undefined;}


var sceneConfig=this.state.sceneConfigStack[this.state.presentedIndex];
if(this.state.activeGesture){
var gesture=sceneConfig.gestures[this.state.activeGesture];
return this._moveAttachedGesture(gesture,gestureState);}

var matchedGesture=this._matchGestureAction(GESTURE_ACTIONS,sceneConfig.gestures,gestureState);
if(matchedGesture){
this._attachGesture(matchedGesture);}},



_moveAttachedGesture:function(gesture,gestureState){
var isTravelVertical=gesture.direction==='top-to-bottom'||gesture.direction==='bottom-to-top';
var isTravelInverted=gesture.direction==='right-to-left'||gesture.direction==='bottom-to-top';
var distance=isTravelVertical?gestureState.dy:gestureState.dx;
distance=isTravelInverted?-distance:distance;
var gestureDetectMovement=gesture.gestureDetectMovement;
var nextProgress=(distance-gestureDetectMovement)/(
gesture.fullDistance-gestureDetectMovement);
if(nextProgress<0&&gesture.isDetachable){
var gesturingToIndex=this.state.presentedIndex+this._deltaForGestureAction(this.state.activeGesture);
this._transitionBetween(this.state.presentedIndex,gesturingToIndex,0);
this._detachGesture();
if(this.state.pendingGestureProgress!=null){
this.spring.setCurrentValue(0);}

return;}

if(this._doesGestureOverswipe(this.state.activeGesture)){
var frictionConstant=gesture.overswipe.frictionConstant;
var frictionByDistance=gesture.overswipe.frictionByDistance;
var frictionRatio=1/(frictionConstant+Math.abs(nextProgress)*frictionByDistance);
nextProgress*=frictionRatio;}

nextProgress=clamp(0,nextProgress,1);
if(this.state.transitionFromIndex!=null){
this.state.pendingGestureProgress=nextProgress;}else 
if(this.state.pendingGestureProgress){
this.spring.setEndValue(nextProgress);}else 
{
this.spring.setCurrentValue(nextProgress);}},



_matchGestureAction:function(eligibleGestures,gestures,gestureState){var _this5=this;
if(!gestures||!eligibleGestures||!eligibleGestures.some){
return null;}

var matchedGesture=null;
eligibleGestures.some(function(gestureName,gestureIndex){
var gesture=gestures[gestureName];
if(!gesture){
return;}

if(gesture.overswipe==null&&_this5._doesGestureOverswipe(gestureName)){

return false;}

var isTravelVertical=gesture.direction==='top-to-bottom'||gesture.direction==='bottom-to-top';
var isTravelInverted=gesture.direction==='right-to-left'||gesture.direction==='bottom-to-top';
var currentLoc=isTravelVertical?gestureState.moveY:gestureState.moveX;
var travelDist=isTravelVertical?gestureState.dy:gestureState.dx;
var oppositeAxisTravelDist=
isTravelVertical?gestureState.dx:gestureState.dy;
var edgeHitWidth=gesture.edgeHitWidth;
if(isTravelInverted){
currentLoc=-currentLoc;
travelDist=-travelDist;
oppositeAxisTravelDist=-oppositeAxisTravelDist;
edgeHitWidth=isTravelVertical?
-(SCREEN_HEIGHT-edgeHitWidth):
-(SCREEN_WIDTH-edgeHitWidth);}

var moveStartedInRegion=gesture.edgeHitWidth==null||
currentLoc<edgeHitWidth;
if(!moveStartedInRegion){
return false;}

var moveTravelledFarEnough=travelDist>=gesture.gestureDetectMovement;
if(!moveTravelledFarEnough){
return false;}

var directionIsCorrect=Math.abs(travelDist)>Math.abs(oppositeAxisTravelDist)*gesture.directionRatio;
if(directionIsCorrect){
matchedGesture=gestureName;
return true;}else 
{
_this5._eligibleGestures=_this5._eligibleGestures.slice().splice(gestureIndex,1);}});


return matchedGesture||null;},


_transitionSceneStyle:function(fromIndex,toIndex,progress,index){
var viewAtIndex=this.refs['scene_'+index];
if(viewAtIndex===null||viewAtIndex===undefined){
return;}


var sceneConfigIndex=fromIndex<toIndex?toIndex:fromIndex;
var sceneConfig=this.state.sceneConfigStack[sceneConfigIndex];

if(!sceneConfig){
sceneConfig=this.state.sceneConfigStack[sceneConfigIndex-1];}

var styleToUse={};
var useFn=index<fromIndex||index<toIndex?
sceneConfig.animationInterpolators.out:
sceneConfig.animationInterpolators.into;
var directionAdjustedProgress=fromIndex<toIndex?progress:1-progress;
var didChange=useFn(styleToUse,directionAdjustedProgress);
if(didChange){
viewAtIndex.setNativeProps({style:styleToUse});}},



_transitionBetween:function(fromIndex,toIndex,progress){
this._transitionSceneStyle(fromIndex,toIndex,progress,fromIndex);
this._transitionSceneStyle(fromIndex,toIndex,progress,toIndex);
var navBar=this._navBar;
if(navBar&&navBar.updateProgress&&toIndex>=0&&fromIndex>=0){
navBar.updateProgress(progress,fromIndex,toIndex);}},



_handleResponderTerminationRequest:function(){
return false;},


_getDestIndexWithinBounds:function(n){
var currentIndex=this.state.presentedIndex;
var destIndex=currentIndex+n;
invariant(
destIndex>=0,
'Cannot jump before the first route.');

var maxIndex=this.state.routeStack.length-1;
invariant(
maxIndex>=destIndex,
'Cannot jump past the last route.');

return destIndex;},


_jumpN:function(n){
var destIndex=this._getDestIndexWithinBounds(n);
this._enableScene(destIndex);
this._emitWillFocus(this.state.routeStack[destIndex]);
this._transitionTo(destIndex);},


jumpTo:function(route){
var destIndex=this.state.routeStack.indexOf(route);
invariant(
destIndex!==-1,
'Cannot jump to route that is not in the route stack');

this._jumpN(destIndex-this.state.presentedIndex);},


jumpForward:function(){
this._jumpN(1);},


jumpBack:function(){
this._jumpN(-1);},


push:function(route){var _this6=this;
invariant(!!route,'Must supply route to push');
var activeLength=this.state.presentedIndex+1;
var activeStack=this.state.routeStack.slice(0,activeLength);
var activeAnimationConfigStack=this.state.sceneConfigStack.slice(0,activeLength);
var nextStack=activeStack.concat([route]);
var destIndex=nextStack.length-1;
var nextAnimationConfigStack=activeAnimationConfigStack.concat([
this.props.configureScene(route,nextStack)]);

this._emitWillFocus(nextStack[destIndex]);
this.setState({
routeStack:nextStack,
sceneConfigStack:nextAnimationConfigStack},
function(){
_this6._enableScene(destIndex);
_this6._transitionTo(destIndex);});},



_popN:function(n){var _this7=this;
if(n===0){
return;}

invariant(
this.state.presentedIndex-n>=0,
'Cannot pop below zero');

var popIndex=this.state.presentedIndex-n;
this._enableScene(popIndex);
this._emitWillFocus(this.state.routeStack[popIndex]);
this._transitionTo(
popIndex,
null,
null,
function(){
_this7._cleanScenesPastIndex(popIndex);});},




pop:function(){
if(this.state.transitionQueue.length){






return;}


if(this.state.presentedIndex>0){
this._popN(1);}},









replaceAtIndex:function(route,index,cb){var _this8=this;
invariant(!!route,'Must supply route to replace');
if(index<0){
index+=this.state.routeStack.length;}


if(this.state.routeStack.length<=index){
return;}


var nextRouteStack=this.state.routeStack.slice();
var nextAnimationModeStack=this.state.sceneConfigStack.slice();
nextRouteStack[index]=route;
nextAnimationModeStack[index]=this.props.configureScene(route,nextRouteStack);

if(index===this.state.presentedIndex){
this._emitWillFocus(route);}

this.setState({
routeStack:nextRouteStack,
sceneConfigStack:nextAnimationModeStack},
function(){
if(index===_this8.state.presentedIndex){
_this8._emitDidFocus(route);}

cb&&cb();});},






replace:function(route){
this.replaceAtIndex(route,this.state.presentedIndex);},





replacePrevious:function(route){
this.replaceAtIndex(route,this.state.presentedIndex-1);},


popToTop:function(){
this.popToRoute(this.state.routeStack[0]);},


popToRoute:function(route){
var indexOfRoute=this.state.routeStack.indexOf(route);
invariant(
indexOfRoute!==-1,
'Calling popToRoute for a route that doesn\'t exist!');

var numToPop=this.state.presentedIndex-indexOfRoute;
this._popN(numToPop);},


replacePreviousAndPop:function(route){
if(this.state.routeStack.length<2){
return;}

this.replacePrevious(route);
this.pop();},


resetTo:function(route){var _this9=this;
invariant(!!route,'Must supply route to push');
this.replaceAtIndex(route,0,function(){


if(_this9.state.presentedIndex>0){
_this9._popN(_this9.state.presentedIndex);}});},




getCurrentRoutes:function(){

return this.state.routeStack.slice();},


_cleanScenesPastIndex:function(index){
var newStackLength=index+1;

if(newStackLength<this.state.routeStack.length){
this.setState({
sceneConfigStack:this.state.sceneConfigStack.slice(0,newStackLength),
routeStack:this.state.routeStack.slice(0,newStackLength)});}},




_renderScene:function(route,i){var _this10=this;
var disabledSceneStyle=null;
var disabledScenePointerEvents='auto';
if(i!==this.state.presentedIndex){
disabledSceneStyle=styles.disabledScene;
disabledScenePointerEvents='none';}

return (
React.createElement(View,{
key:'scene_'+getRouteID(route),
ref:'scene_'+i,
onStartShouldSetResponderCapture:function(){
return _this10.state.transitionFromIndex!=null||_this10.state.transitionFromIndex!=null;},

pointerEvents:disabledScenePointerEvents,
style:[styles.baseScene,this.props.sceneStyle,disabledSceneStyle]},
this.props.renderScene(
route,
this)));},





_renderNavigationBar:function(){var _this11=this;var 
navigationBar=this.props.navigationBar;
if(!navigationBar){
return null;}

return React.cloneElement(navigationBar,{
ref:function(navBar){
_this11._navBar=navBar;
if(navigationBar&&typeof navigationBar.ref==='function'){
navigationBar.ref(navBar);}},


navigator:this._navigationBarNavigator,
navState:this.state});},



render:function(){var _this12=this;
var newRenderedSceneMap=new Map();
var scenes=this.state.routeStack.map(function(route,index){
var renderedScene;
if(_this12._renderedSceneMap.has(route)&&
index!==_this12.state.presentedIndex){
renderedScene=_this12._renderedSceneMap.get(route);}else 
{
renderedScene=_this12._renderScene(route,index);}

newRenderedSceneMap.set(route,renderedScene);
return renderedScene;});

this._renderedSceneMap=newRenderedSceneMap;
return (
React.createElement(View,{style:[styles.container,this.props.style]},
React.createElement(View,babelHelpers.extends({
style:styles.transitioner},
this.panGesture.panHandlers,{
onTouchStart:this._handleTouchStart,
onResponderTerminationRequest:
this._handleResponderTerminationRequest}),

scenes),

this._renderNavigationBar()));},




_getNavigationContext:function(){
if(!this._navigationContext){
this._navigationContext=new NavigationContext();}

return this._navigationContext;}});



module.exports=Navigator;
});
__d(191 /* InteractionMixin */, function(global, require, module, exports) {'use strict';







var InteractionManager=require(113 /* InteractionManager */);






var InteractionMixin={
componentWillUnmount:function(){
while(this._interactionMixinHandles.length){
InteractionManager.clearInteractionHandle(
this._interactionMixinHandles.pop());}},




_interactionMixinHandles:[],

createInteractionHandle:function(){
var handle=InteractionManager.createInteractionHandle();
this._interactionMixinHandles.push(handle);
return handle;},


clearInteractionHandle:function(clearHandle){
InteractionManager.clearInteractionHandle(clearHandle);
this._interactionMixinHandles=this._interactionMixinHandles.filter(
function(handle){return handle!==clearHandle;});},








runAfterInteractions:function(callback){
InteractionManager.runAfterInteractions(callback);}};



module.exports=InteractionMixin;
});
__d(192 /* NavigationContext */, function(global, require, module, exports) {'use strict';




























var NavigationEvent=require(193 /* NavigationEvent */);
var NavigationEventEmitter=require(194 /* NavigationEventEmitter */);
var NavigationTreeNode=require(195 /* NavigationTreeNode */);

var Set=require(66 /* Set */);

var emptyFunction=require(369 /* fbjs/lib/emptyFunction */);
var invariant=require(363 /* fbjs/lib/invariant */);var 




AT_TARGET=


NavigationEvent.AT_TARGET;var BUBBLING_PHASE=NavigationEvent.BUBBLING_PHASE;var CAPTURING_PHASE=NavigationEvent.CAPTURING_PHASE;



var LegacyEventTypes=new Set([
'willfocus',
'didfocus']);var 





NavigationContext=function(){







function NavigationContext(){babelHelpers.classCallCheck(this,NavigationContext);
this._bubbleEventEmitter=new NavigationEventEmitter(this);
this._captureEventEmitter=new NavigationEventEmitter(this);
this._currentRoute=null;


this.__node=new NavigationTreeNode(this);

this._emitCounter=0;
this._emitQueue=[];

this.addListener('willfocus',this._onFocus);
this.addListener('didfocus',this._onFocus);}babelHelpers.createClass(NavigationContext,[{key:'appendChild',value:function appendChild(
























childContext){
this.__node.appendChild(childContext.__node);}},{key:'addListener',value:function addListener(



eventType,
listener,
useCapture)
{
if(LegacyEventTypes.has(eventType)){
useCapture=false;}


var emitter=useCapture?
this._captureEventEmitter:
this._bubbleEventEmitter;

if(emitter){
return emitter.addListener(eventType,listener,this);}else 
{
return {remove:emptyFunction};}}},{key:'emit',value:function emit(



eventType,data,didEmitCallback){var _this=this;
if(this._emitCounter>0){


var args=Array.prototype.slice.call(arguments);
this._emitQueue.push(args);
return;}


this._emitCounter++;

if(LegacyEventTypes.has(eventType)){

this.__emit(
eventType,
data,
null,
{
defaultPrevented:false,
eventPhase:AT_TARGET,
propagationStopped:true,
target:this});}else 


{
var targets=[this];
var parentTarget=this.parent;
while(parentTarget){
targets.unshift(parentTarget);
parentTarget=parentTarget.parent;}


var propagationStopped=false;
var defaultPrevented=false;
var callback=function(event){
propagationStopped=propagationStopped||event.isPropagationStopped();
defaultPrevented=defaultPrevented||event.defaultPrevented;};



targets.some(function(currentTarget){
if(propagationStopped){
return true;}


var extraInfo={
defaultPrevented:defaultPrevented,
eventPhase:CAPTURING_PHASE,
propagationStopped:propagationStopped,
target:_this};


currentTarget.__emit(eventType,data,callback,extraInfo);},
this);


targets.reverse().some(function(currentTarget){
if(propagationStopped){
return true;}

var extraInfo={
defaultPrevented:defaultPrevented,
eventPhase:BUBBLING_PHASE,
propagationStopped:propagationStopped,
target:_this};

currentTarget.__emit(eventType,data,callback,extraInfo);},
this);}


if(didEmitCallback){
var event=NavigationEvent.pool(eventType,this,data);
propagationStopped&&event.stopPropagation();
defaultPrevented&&event.preventDefault();
didEmitCallback.call(this,event);
event.dispose();}


this._emitCounter--;
while(this._emitQueue.length){
var args=this._emitQueue.shift();
this.emit.apply(this,args);}}},{key:'dispose',value:function dispose()



{

this._bubbleEventEmitter&&this._bubbleEventEmitter.removeAllListeners();
this._captureEventEmitter&&this._captureEventEmitter.removeAllListeners();
this._bubbleEventEmitter=null;
this._captureEventEmitter=null;
this._currentRoute=null;}},{key:'__emit',value:function __emit(




eventType,
data,
didEmitCallback,
extraInfo)
{
var emitter;
switch(extraInfo.eventPhase){
case CAPTURING_PHASE:
emitter=this._captureEventEmitter;
break;

case AT_TARGET:
emitter=this._bubbleEventEmitter;
break;

case BUBBLING_PHASE:
emitter=this._bubbleEventEmitter;
break;

default:
invariant(false,'invalid event phase %s',extraInfo.eventPhase);}


if(extraInfo.target===this){

extraInfo.eventPhase=AT_TARGET;}


if(emitter){
emitter.emit(
eventType,
data,
didEmitCallback,
extraInfo);}}},{key:'_onFocus',value:function _onFocus(




event){
invariant(
event.data&&event.data.hasOwnProperty('route'),
'event type "%s" should provide route',
event.type);


this._currentRoute=event.data.route;}},{key:'parent',get:function(){var parent=this.__node.getParent();return parent?parent.getValue():null;}},{key:'top',get:function(){var result=null;var parentNode=this.__node.getParent();while(parentNode){result=parentNode.getValue();parentNode=parentNode.getParent();}return result;}},{key:'currentRoute',get:function(){return this._currentRoute;}}]);return NavigationContext;}();



module.exports=NavigationContext;
});
__d(193 /* NavigationEvent */, function(global, require, module, exports) {'use strict';




























var invariant=require(363 /* fbjs/lib/invariant */);var 

NavigationEventPool=function(){


function NavigationEventPool(){babelHelpers.classCallCheck(this,NavigationEventPool);
this._list=[];}babelHelpers.createClass(NavigationEventPool,[{key:'get',value:function get(


type,currentTarget,data){
var event;
if(this._list.length>0){
event=this._list.pop();
event.constructor.call(event,type,currentTarget,data);}else 
{
event=new NavigationEvent(type,currentTarget,data);}

return event;}},{key:'put',value:function put(


event){
this._list.push(event);}}]);return NavigationEventPool;}();



var _navigationEventPool=new NavigationEventPool();var 























NavigationEvent=function(){babelHelpers.createClass(NavigationEvent,null,[{key:'pool',value:function pool(


















type,currentTarget,data){
return _navigationEventPool.get(type,currentTarget,data);}}]);


function NavigationEvent(type,currentTarget,data){babelHelpers.classCallCheck(this,NavigationEvent);
this.target=currentTarget;
this.eventPhase=NavigationEvent.NONE;

this._type=type;
this._currentTarget=currentTarget;
this._data=data;
this._defaultPrevented=false;
this._disposed=false;
this._propagationStopped=false;}babelHelpers.createClass(NavigationEvent,[{key:'preventDefault',value:function preventDefault()






















{
this._defaultPrevented=true;}},{key:'stopPropagation',value:function stopPropagation()


{
this._propagationStopped=true;}},{key:'stop',value:function stop()


{
this.preventDefault();
this.stopPropagation();}},{key:'isPropagationStopped',value:function isPropagationStopped()


{
return this._propagationStopped;}},{key:'dispose',value:function dispose()







{
invariant(!this._disposed,'NavigationEvent is already disposed');
this._disposed=true;


this.target=null;
this.eventPhase=NavigationEvent.NONE;
this._type=null;
this._currentTarget=null;
this._data=null;
this._defaultPrevented=false;


_navigationEventPool.put(this);}},{key:'type',get:function(){return this._type;}},{key:'currentTarget',get:function(){return this._currentTarget;}},{key:'data',get:function(){return this._data;}},{key:'defaultPrevented',get:function(){return this._defaultPrevented;}}]);return NavigationEvent;}();










NavigationEvent.NONE=0;


NavigationEvent.CAPTURING_PHASE=1;



NavigationEvent.AT_TARGET=2;





NavigationEvent.BUBBLING_PHASE=3;

module.exports=NavigationEvent;
});
__d(194 /* NavigationEventEmitter */, function(global, require, module, exports) {'use strict';




























var EventEmitter=require(23 /* EventEmitter */);
var NavigationEvent=require(193 /* NavigationEvent */);var 








NavigationEventEmitter=function(_EventEmitter){babelHelpers.inherits(NavigationEventEmitter,_EventEmitter);




function NavigationEventEmitter(target){babelHelpers.classCallCheck(this,NavigationEventEmitter);var _this=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(NavigationEventEmitter).call(this));

_this._emitting=false;
_this._emitQueue=[];
_this._target=target;return _this;}babelHelpers.createClass(NavigationEventEmitter,[{key:'emit',value:function emit(



eventType,
data,
didEmitCallback,
extraInfo)
{
if(this._emitting){


var args=Array.prototype.slice.call(arguments);
this._emitQueue.push(args);
return;}


this._emitting=true;

var event=NavigationEvent.pool(eventType,this._target,data);

if(extraInfo){
if(extraInfo.target){
event.target=extraInfo.target;}


if(extraInfo.eventPhase){
event.eventPhase=extraInfo.eventPhase;}


if(extraInfo.defaultPrevented){
event.preventDefault();}


if(extraInfo.propagationStopped){
event.stopPropagation();}}





babelHelpers.get(Object.getPrototypeOf(NavigationEventEmitter.prototype),'emit',this).call(this,String(eventType),event);

if(typeof didEmitCallback==='function'){
didEmitCallback.call(this._target,event);}

event.dispose();

this._emitting=false;

while(this._emitQueue.length){
var args=this._emitQueue.shift();
this.emit.apply(this,args);}}}]);return NavigationEventEmitter;}(EventEmitter);




module.exports=NavigationEventEmitter;
});
__d(195 /* NavigationTreeNode */, function(global, require, module, exports) {'use strict';









var invariant=require(363 /* fbjs/lib/invariant */);
var immutable=require(604 /* immutable */);var 

List=immutable.List;var 






NavigationTreeNode=function(){






function NavigationTreeNode(value){babelHelpers.classCallCheck(this,NavigationTreeNode);
this.__parent=null;
this._children=new List();
this._value=value;}babelHelpers.createClass(NavigationTreeNode,[{key:'getValue',value:function getValue()


{
return this._value;}},{key:'getParent',value:function getParent()


{
return this.__parent;}},{key:'getChildrenCount',value:function getChildrenCount()


{
return this._children.size;}},{key:'getChildAt',value:function getChildAt(


index){
return index>-1&&index<this._children.size?
this._children.get(index):
null;}},{key:'appendChild',value:function appendChild(


child){
if(child.__parent){
child.__parent.removeChild(child);}

child.__parent=this;
this._children=this._children.push(child);}},{key:'removeChild',value:function removeChild(


child){
var index=this._children.indexOf(child);

invariant(
index>-1,
'The node to be removed is not a child of this node.');


child.__parent=null;

this._children=this._children.splice(index,1);}},{key:'indexOf',value:function indexOf(


child){
return this._children.indexOf(child);}},{key:'forEach',value:function forEach(


callback,context){
this._children.forEach(callback,context);}},{key:'map',value:function map(


callback,context){
return this._children.map(callback,context).toJS();}},{key:'some',value:function some(


callback,context){
return this._children.some(callback,context);}}]);return NavigationTreeNode;}();




module.exports=NavigationTreeNode;
});
__d(604 /* immutable/dist/immutable.js */, function(global, require, module, exports) {(








function(global,factory){
typeof exports==='object'&&typeof module!=='undefined'?module.exports=factory():
typeof define==='function'&&define.amd?define(factory):
global.Immutable=factory();})(
this,function(){'use strict';var SLICE$0=Array.prototype.slice;

function createClass(ctor,superClass){
if(superClass){
ctor.prototype=Object.create(superClass.prototype);}

ctor.prototype.constructor=ctor;}


function Iterable(value){
return isIterable(value)?value:Seq(value);}



createClass(KeyedIterable,Iterable);
function KeyedIterable(value){
return isKeyed(value)?value:KeyedSeq(value);}



createClass(IndexedIterable,Iterable);
function IndexedIterable(value){
return isIndexed(value)?value:IndexedSeq(value);}



createClass(SetIterable,Iterable);
function SetIterable(value){
return isIterable(value)&&!isAssociative(value)?value:SetSeq(value);}




function isIterable(maybeIterable){
return !!(maybeIterable&&maybeIterable[IS_ITERABLE_SENTINEL]);}


function isKeyed(maybeKeyed){
return !!(maybeKeyed&&maybeKeyed[IS_KEYED_SENTINEL]);}


function isIndexed(maybeIndexed){
return !!(maybeIndexed&&maybeIndexed[IS_INDEXED_SENTINEL]);}


function isAssociative(maybeAssociative){
return isKeyed(maybeAssociative)||isIndexed(maybeAssociative);}


function isOrdered(maybeOrdered){
return !!(maybeOrdered&&maybeOrdered[IS_ORDERED_SENTINEL]);}


Iterable.isIterable=isIterable;
Iterable.isKeyed=isKeyed;
Iterable.isIndexed=isIndexed;
Iterable.isAssociative=isAssociative;
Iterable.isOrdered=isOrdered;

Iterable.Keyed=KeyedIterable;
Iterable.Indexed=IndexedIterable;
Iterable.Set=SetIterable;


var IS_ITERABLE_SENTINEL='@@__IMMUTABLE_ITERABLE__@@';
var IS_KEYED_SENTINEL='@@__IMMUTABLE_KEYED__@@';
var IS_INDEXED_SENTINEL='@@__IMMUTABLE_INDEXED__@@';
var IS_ORDERED_SENTINEL='@@__IMMUTABLE_ORDERED__@@';


var DELETE='delete';


var SHIFT=5;
var SIZE=1<<SHIFT;
var MASK=SIZE-1;



var NOT_SET={};


var CHANGE_LENGTH={value:false};
var DID_ALTER={value:false};

function MakeRef(ref){
ref.value=false;
return ref;}


function SetRef(ref){
ref&&(ref.value=true);}





function OwnerID(){}


function arrCopy(arr,offset){
offset=offset||0;
var len=Math.max(0,arr.length-offset);
var newArr=new Array(len);
for(var ii=0;ii<len;ii++){
newArr[ii]=arr[ii+offset];}

return newArr;}


function ensureSize(iter){
if(iter.size===undefined){
iter.size=iter.__iterate(returnTrue);}

return iter.size;}


function wrapIndex(iter,index){







if(typeof index!=='number'){
var uint32Index=index>>>0;
if(''+uint32Index!==index||uint32Index===4294967295){
return NaN;}

index=uint32Index;}

return index<0?ensureSize(iter)+index:index;}


function returnTrue(){
return true;}


function wholeSlice(begin,end,size){
return (begin===0||size!==undefined&&begin<=-size)&&(
end===undefined||size!==undefined&&end>=size);}


function resolveBegin(begin,size){
return resolveIndex(begin,size,0);}


function resolveEnd(end,size){
return resolveIndex(end,size,size);}


function resolveIndex(index,size,defaultIndex){
return index===undefined?
defaultIndex:
index<0?
Math.max(0,size+index):
size===undefined?
index:
Math.min(size,index);}




var ITERATE_KEYS=0;
var ITERATE_VALUES=1;
var ITERATE_ENTRIES=2;

var REAL_ITERATOR_SYMBOL=typeof Symbol==='function'&&(typeof Symbol==='function'?Symbol.iterator:'@@iterator');
var FAUX_ITERATOR_SYMBOL='@@iterator';

var ITERATOR_SYMBOL=REAL_ITERATOR_SYMBOL||FAUX_ITERATOR_SYMBOL;


function Iterator(next){
this.next=next;}


Iterator.prototype.toString=function(){
return '[Iterator]';};



Iterator.KEYS=ITERATE_KEYS;
Iterator.VALUES=ITERATE_VALUES;
Iterator.ENTRIES=ITERATE_ENTRIES;

Iterator.prototype.inspect=
Iterator.prototype.toSource=function(){return this.toString();};
Iterator.prototype[ITERATOR_SYMBOL]=function(){
return this;};



function iteratorValue(type,k,v,iteratorResult){
var value=type===0?k:type===1?v:[k,v];
iteratorResult?iteratorResult.value=value:iteratorResult={
value:value,done:false};

return iteratorResult;}


function iteratorDone(){
return {value:undefined,done:true};}


function hasIterator(maybeIterable){
return !!getIteratorFn(maybeIterable);}


function isIterator(maybeIterator){
return maybeIterator&&typeof maybeIterator.next==='function';}


function getIterator(iterable){
var iteratorFn=getIteratorFn(iterable);
return iteratorFn&&iteratorFn.call(iterable);}


function getIteratorFn(iterable){
var iteratorFn=iterable&&(
REAL_ITERATOR_SYMBOL&&iterable[REAL_ITERATOR_SYMBOL]||
iterable[FAUX_ITERATOR_SYMBOL]);

if(typeof iteratorFn==='function'){
return iteratorFn;}}



function isArrayLike(value){
return value&&typeof value.length==='number';}


createClass(Seq,Iterable);
function Seq(value){
return value===null||value===undefined?emptySequence():
isIterable(value)?value.toSeq():seqFromValue(value);}


Seq.of=function(){
return Seq(arguments);};


Seq.prototype.toSeq=function(){
return this;};


Seq.prototype.toString=function(){
return this.__toString('Seq {','}');};


Seq.prototype.cacheResult=function(){
if(!this._cache&&this.__iterateUncached){
this._cache=this.entrySeq().toArray();
this.size=this._cache.length;}

return this;};




Seq.prototype.__iterate=function(fn,reverse){
return seqIterate(this,fn,reverse,true);};




Seq.prototype.__iterator=function(type,reverse){
return seqIterator(this,type,reverse,true);};




createClass(KeyedSeq,Seq);
function KeyedSeq(value){
return value===null||value===undefined?
emptySequence().toKeyedSeq():
isIterable(value)?
isKeyed(value)?value.toSeq():value.fromEntrySeq():
keyedSeqFromValue(value);}


KeyedSeq.prototype.toKeyedSeq=function(){
return this;};




createClass(IndexedSeq,Seq);
function IndexedSeq(value){
return value===null||value===undefined?emptySequence():
!isIterable(value)?indexedSeqFromValue(value):
isKeyed(value)?value.entrySeq():value.toIndexedSeq();}


IndexedSeq.of=function(){
return IndexedSeq(arguments);};


IndexedSeq.prototype.toIndexedSeq=function(){
return this;};


IndexedSeq.prototype.toString=function(){
return this.__toString('Seq [',']');};


IndexedSeq.prototype.__iterate=function(fn,reverse){
return seqIterate(this,fn,reverse,false);};


IndexedSeq.prototype.__iterator=function(type,reverse){
return seqIterator(this,type,reverse,false);};




createClass(SetSeq,Seq);
function SetSeq(value){
return (
value===null||value===undefined?emptySequence():
!isIterable(value)?indexedSeqFromValue(value):
isKeyed(value)?value.entrySeq():value).
toSetSeq();}


SetSeq.of=function(){
return SetSeq(arguments);};


SetSeq.prototype.toSetSeq=function(){
return this;};




Seq.isSeq=isSeq;
Seq.Keyed=KeyedSeq;
Seq.Set=SetSeq;
Seq.Indexed=IndexedSeq;

var IS_SEQ_SENTINEL='@@__IMMUTABLE_SEQ__@@';

Seq.prototype[IS_SEQ_SENTINEL]=true;



createClass(ArraySeq,IndexedSeq);
function ArraySeq(array){
this._array=array;
this.size=array.length;}


ArraySeq.prototype.get=function(index,notSetValue){
return this.has(index)?this._array[wrapIndex(this,index)]:notSetValue;};


ArraySeq.prototype.__iterate=function(fn,reverse){
var array=this._array;
var maxIndex=array.length-1;
for(var ii=0;ii<=maxIndex;ii++){
if(fn(array[reverse?maxIndex-ii:ii],ii,this)===false){
return ii+1;}}


return ii;};


ArraySeq.prototype.__iterator=function(type,reverse){
var array=this._array;
var maxIndex=array.length-1;
var ii=0;
return new Iterator(function()
{return ii>maxIndex?
iteratorDone():
iteratorValue(type,ii,array[reverse?maxIndex-ii++:ii++]);});};





createClass(ObjectSeq,KeyedSeq);
function ObjectSeq(object){
var keys=Object.keys(object);
this._object=object;
this._keys=keys;
this.size=keys.length;}


ObjectSeq.prototype.get=function(key,notSetValue){
if(notSetValue!==undefined&&!this.has(key)){
return notSetValue;}

return this._object[key];};


ObjectSeq.prototype.has=function(key){
return this._object.hasOwnProperty(key);};


ObjectSeq.prototype.__iterate=function(fn,reverse){
var object=this._object;
var keys=this._keys;
var maxIndex=keys.length-1;
for(var ii=0;ii<=maxIndex;ii++){
var key=keys[reverse?maxIndex-ii:ii];
if(fn(object[key],key,this)===false){
return ii+1;}}


return ii;};


ObjectSeq.prototype.__iterator=function(type,reverse){
var object=this._object;
var keys=this._keys;
var maxIndex=keys.length-1;
var ii=0;
return new Iterator(function(){
var key=keys[reverse?maxIndex-ii:ii];
return ii++>maxIndex?
iteratorDone():
iteratorValue(type,key,object[key]);});};



ObjectSeq.prototype[IS_ORDERED_SENTINEL]=true;


createClass(IterableSeq,IndexedSeq);
function IterableSeq(iterable){
this._iterable=iterable;
this.size=iterable.length||iterable.size;}


IterableSeq.prototype.__iterateUncached=function(fn,reverse){
if(reverse){
return this.cacheResult().__iterate(fn,reverse);}

var iterable=this._iterable;
var iterator=getIterator(iterable);
var iterations=0;
if(isIterator(iterator)){
var step;
while(!(step=iterator.next()).done){
if(fn(step.value,iterations++,this)===false){
break;}}}



return iterations;};


IterableSeq.prototype.__iteratorUncached=function(type,reverse){
if(reverse){
return this.cacheResult().__iterator(type,reverse);}

var iterable=this._iterable;
var iterator=getIterator(iterable);
if(!isIterator(iterator)){
return new Iterator(iteratorDone);}

var iterations=0;
return new Iterator(function(){
var step=iterator.next();
return step.done?step:iteratorValue(type,iterations++,step.value);});};





createClass(IteratorSeq,IndexedSeq);
function IteratorSeq(iterator){
this._iterator=iterator;
this._iteratorCache=[];}


IteratorSeq.prototype.__iterateUncached=function(fn,reverse){
if(reverse){
return this.cacheResult().__iterate(fn,reverse);}

var iterator=this._iterator;
var cache=this._iteratorCache;
var iterations=0;
while(iterations<cache.length){
if(fn(cache[iterations],iterations++,this)===false){
return iterations;}}


var step;
while(!(step=iterator.next()).done){
var val=step.value;
cache[iterations]=val;
if(fn(val,iterations++,this)===false){
break;}}


return iterations;};


IteratorSeq.prototype.__iteratorUncached=function(type,reverse){
if(reverse){
return this.cacheResult().__iterator(type,reverse);}

var iterator=this._iterator;
var cache=this._iteratorCache;
var iterations=0;
return new Iterator(function(){
if(iterations>=cache.length){
var step=iterator.next();
if(step.done){
return step;}

cache[iterations]=step.value;}

return iteratorValue(type,iterations,cache[iterations++]);});};








function isSeq(maybeSeq){
return !!(maybeSeq&&maybeSeq[IS_SEQ_SENTINEL]);}


var EMPTY_SEQ;

function emptySequence(){
return EMPTY_SEQ||(EMPTY_SEQ=new ArraySeq([]));}


function keyedSeqFromValue(value){
var seq=
Array.isArray(value)?new ArraySeq(value).fromEntrySeq():
isIterator(value)?new IteratorSeq(value).fromEntrySeq():
hasIterator(value)?new IterableSeq(value).fromEntrySeq():
typeof value==='object'?new ObjectSeq(value):
undefined;
if(!seq){
throw new TypeError(
'Expected Array or iterable object of [k, v] entries, '+
'or keyed object: '+value);}


return seq;}


function indexedSeqFromValue(value){
var seq=maybeIndexedSeqFromValue(value);
if(!seq){
throw new TypeError(
'Expected Array or iterable object of values: '+value);}


return seq;}


function seqFromValue(value){
var seq=maybeIndexedSeqFromValue(value)||
typeof value==='object'&&new ObjectSeq(value);
if(!seq){
throw new TypeError(
'Expected Array or iterable object of values, or keyed object: '+value);}


return seq;}


function maybeIndexedSeqFromValue(value){
return (
isArrayLike(value)?new ArraySeq(value):
isIterator(value)?new IteratorSeq(value):
hasIterator(value)?new IterableSeq(value):
undefined);}



function seqIterate(seq,fn,reverse,useKeys){
var cache=seq._cache;
if(cache){
var maxIndex=cache.length-1;
for(var ii=0;ii<=maxIndex;ii++){
var entry=cache[reverse?maxIndex-ii:ii];
if(fn(entry[1],useKeys?entry[0]:ii,seq)===false){
return ii+1;}}


return ii;}

return seq.__iterateUncached(fn,reverse);}


function seqIterator(seq,type,reverse,useKeys){
var cache=seq._cache;
if(cache){
var maxIndex=cache.length-1;
var ii=0;
return new Iterator(function(){
var entry=cache[reverse?maxIndex-ii:ii];
return ii++>maxIndex?
iteratorDone():
iteratorValue(type,useKeys?entry[0]:ii-1,entry[1]);});}


return seq.__iteratorUncached(type,reverse);}


function fromJS(json,converter){
return converter?
fromJSWith(converter,json,'',{'':json}):
fromJSDefault(json);}


function fromJSWith(converter,json,key,parentJSON){
if(Array.isArray(json)){
return converter.call(parentJSON,key,IndexedSeq(json).map(function(v,k){return fromJSWith(converter,v,k,json);}));}

if(isPlainObj(json)){
return converter.call(parentJSON,key,KeyedSeq(json).map(function(v,k){return fromJSWith(converter,v,k,json);}));}

return json;}


function fromJSDefault(json){
if(Array.isArray(json)){
return IndexedSeq(json).map(fromJSDefault).toList();}

if(isPlainObj(json)){
return KeyedSeq(json).map(fromJSDefault).toMap();}

return json;}


function isPlainObj(value){
return value&&(value.constructor===Object||value.constructor===undefined);}
























































function is(valueA,valueB){
if(valueA===valueB||valueA!==valueA&&valueB!==valueB){
return true;}

if(!valueA||!valueB){
return false;}

if(typeof valueA.valueOf==='function'&&
typeof valueB.valueOf==='function'){
valueA=valueA.valueOf();
valueB=valueB.valueOf();
if(valueA===valueB||valueA!==valueA&&valueB!==valueB){
return true;}

if(!valueA||!valueB){
return false;}}


if(typeof valueA.equals==='function'&&
typeof valueB.equals==='function'&&
valueA.equals(valueB)){
return true;}

return false;}


function deepEqual(a,b){
if(a===b){
return true;}


if(
!isIterable(b)||
a.size!==undefined&&b.size!==undefined&&a.size!==b.size||
a.__hash!==undefined&&b.__hash!==undefined&&a.__hash!==b.__hash||
isKeyed(a)!==isKeyed(b)||
isIndexed(a)!==isIndexed(b)||
isOrdered(a)!==isOrdered(b))
{
return false;}


if(a.size===0&&b.size===0){
return true;}


var notAssociative=!isAssociative(a);

if(isOrdered(a)){
var entries=a.entries();
return b.every(function(v,k){
var entry=entries.next().value;
return entry&&is(entry[1],v)&&(notAssociative||is(entry[0],k));})&&
entries.next().done;}


var flipped=false;

if(a.size===undefined){
if(b.size===undefined){
if(typeof a.cacheResult==='function'){
a.cacheResult();}}else 

{
flipped=true;
var _=a;
a=b;
b=_;}}



var allEqual=true;
var bSize=b.__iterate(function(v,k){
if(notAssociative?!a.has(v):
flipped?!is(v,a.get(k,NOT_SET)):!is(a.get(k,NOT_SET),v)){
allEqual=false;
return false;}});



return allEqual&&a.size===bSize;}


createClass(Repeat,IndexedSeq);

function Repeat(value,times){
if(!(this instanceof Repeat)){
return new Repeat(value,times);}

this._value=value;
this.size=times===undefined?Infinity:Math.max(0,times);
if(this.size===0){
if(EMPTY_REPEAT){
return EMPTY_REPEAT;}

EMPTY_REPEAT=this;}}



Repeat.prototype.toString=function(){
if(this.size===0){
return 'Repeat []';}

return 'Repeat [ '+this._value+' '+this.size+' times ]';};


Repeat.prototype.get=function(index,notSetValue){
return this.has(index)?this._value:notSetValue;};


Repeat.prototype.includes=function(searchValue){
return is(this._value,searchValue);};


Repeat.prototype.slice=function(begin,end){
var size=this.size;
return wholeSlice(begin,end,size)?this:
new Repeat(this._value,resolveEnd(end,size)-resolveBegin(begin,size));};


Repeat.prototype.reverse=function(){
return this;};


Repeat.prototype.indexOf=function(searchValue){
if(is(this._value,searchValue)){
return 0;}

return -1;};


Repeat.prototype.lastIndexOf=function(searchValue){
if(is(this._value,searchValue)){
return this.size;}

return -1;};


Repeat.prototype.__iterate=function(fn,reverse){
for(var ii=0;ii<this.size;ii++){
if(fn(this._value,ii,this)===false){
return ii+1;}}


return ii;};


Repeat.prototype.__iterator=function(type,reverse){var this$0=this;
var ii=0;
return new Iterator(function()
{return ii<this$0.size?iteratorValue(type,ii++,this$0._value):iteratorDone();});};



Repeat.prototype.equals=function(other){
return other instanceof Repeat?
is(this._value,other._value):
deepEqual(other);};



var EMPTY_REPEAT;

function invariant(condition,error){
if(!condition)throw new Error(error);}


createClass(Range,IndexedSeq);

function Range(start,end,step){
if(!(this instanceof Range)){
return new Range(start,end,step);}

invariant(step!==0,'Cannot step a Range by 0');
start=start||0;
if(end===undefined){
end=Infinity;}

step=step===undefined?1:Math.abs(step);
if(end<start){
step=-step;}

this._start=start;
this._end=end;
this._step=step;
this.size=Math.max(0,Math.ceil((end-start)/step-1)+1);
if(this.size===0){
if(EMPTY_RANGE){
return EMPTY_RANGE;}

EMPTY_RANGE=this;}}



Range.prototype.toString=function(){
if(this.size===0){
return 'Range []';}

return 'Range [ '+
this._start+'...'+this._end+(
this._step>1?' by '+this._step:'')+
' ]';};


Range.prototype.get=function(index,notSetValue){
return this.has(index)?
this._start+wrapIndex(this,index)*this._step:
notSetValue;};


Range.prototype.includes=function(searchValue){
var possibleIndex=(searchValue-this._start)/this._step;
return possibleIndex>=0&&
possibleIndex<this.size&&
possibleIndex===Math.floor(possibleIndex);};


Range.prototype.slice=function(begin,end){
if(wholeSlice(begin,end,this.size)){
return this;}

begin=resolveBegin(begin,this.size);
end=resolveEnd(end,this.size);
if(end<=begin){
return new Range(0,0);}

return new Range(this.get(begin,this._end),this.get(end,this._end),this._step);};


Range.prototype.indexOf=function(searchValue){
var offsetValue=searchValue-this._start;
if(offsetValue%this._step===0){
var index=offsetValue/this._step;
if(index>=0&&index<this.size){
return index;}}


return -1;};


Range.prototype.lastIndexOf=function(searchValue){
return this.indexOf(searchValue);};


Range.prototype.__iterate=function(fn,reverse){
var maxIndex=this.size-1;
var step=this._step;
var value=reverse?this._start+maxIndex*step:this._start;
for(var ii=0;ii<=maxIndex;ii++){
if(fn(value,ii,this)===false){
return ii+1;}

value+=reverse?-step:step;}

return ii;};


Range.prototype.__iterator=function(type,reverse){
var maxIndex=this.size-1;
var step=this._step;
var value=reverse?this._start+maxIndex*step:this._start;
var ii=0;
return new Iterator(function(){
var v=value;
value+=reverse?-step:step;
return ii>maxIndex?iteratorDone():iteratorValue(type,ii++,v);});};



Range.prototype.equals=function(other){
return other instanceof Range?
this._start===other._start&&
this._end===other._end&&
this._step===other._step:
deepEqual(this,other);};



var EMPTY_RANGE;

createClass(Collection,Iterable);
function Collection(){
throw TypeError('Abstract');}



createClass(KeyedCollection,Collection);function KeyedCollection(){}

createClass(IndexedCollection,Collection);function IndexedCollection(){}

createClass(SetCollection,Collection);function SetCollection(){}


Collection.Keyed=KeyedCollection;
Collection.Indexed=IndexedCollection;
Collection.Set=SetCollection;

var imul=
typeof Math.imul==='function'&&Math.imul(0xffffffff,2)===-2?
Math.imul:
function imul(a,b){
a=a|0;
b=b|0;
var c=a&0xffff;
var d=b&0xffff;

return c*d+((a>>>16)*d+c*(b>>>16)<<16>>>0)|0;};






function smi(i32){
return i32>>>1&0x40000000|i32&0xBFFFFFFF;}


function hash(o){
if(o===false||o===null||o===undefined){
return 0;}

if(typeof o.valueOf==='function'){
o=o.valueOf();
if(o===false||o===null||o===undefined){
return 0;}}


if(o===true){
return 1;}

var type=typeof o;
if(type==='number'){
var h=o|0;
if(h!==o){
h^=o*0xFFFFFFFF;}

while(o>0xFFFFFFFF){
o/=0xFFFFFFFF;
h^=o;}

return smi(h);}

if(type==='string'){
return o.length>STRING_HASH_CACHE_MIN_STRLEN?cachedHashString(o):hashString(o);}

if(typeof o.hashCode==='function'){
return o.hashCode();}

if(type==='object'){
return hashJSObj(o);}

if(typeof o.toString==='function'){
return hashString(o.toString());}

throw new Error('Value type '+type+' cannot be hashed.');}


function cachedHashString(string){
var hash=stringHashCache[string];
if(hash===undefined){
hash=hashString(string);
if(STRING_HASH_CACHE_SIZE===STRING_HASH_CACHE_MAX_SIZE){
STRING_HASH_CACHE_SIZE=0;
stringHashCache={};}

STRING_HASH_CACHE_SIZE++;
stringHashCache[string]=hash;}

return hash;}



function hashString(string){






var hash=0;
for(var ii=0;ii<string.length;ii++){
hash=31*hash+string.charCodeAt(ii)|0;}

return smi(hash);}


function hashJSObj(obj){
var hash;
if(usingWeakMap){
hash=weakMap.get(obj);
if(hash!==undefined){
return hash;}}



hash=obj[UID_HASH_KEY];
if(hash!==undefined){
return hash;}


if(!canDefineProperty){
hash=obj.propertyIsEnumerable&&obj.propertyIsEnumerable[UID_HASH_KEY];
if(hash!==undefined){
return hash;}


hash=getIENodeHash(obj);
if(hash!==undefined){
return hash;}}



hash=++objHashUID;
if(objHashUID&0x40000000){
objHashUID=0;}


if(usingWeakMap){
weakMap.set(obj,hash);}else 
if(isExtensible!==undefined&&isExtensible(obj)===false){
throw new Error('Non-extensible objects are not allowed as keys.');}else 
if(canDefineProperty){
Object.defineProperty(obj,UID_HASH_KEY,{
'enumerable':false,
'configurable':false,
'writable':false,
'value':hash});}else 

if(obj.propertyIsEnumerable!==undefined&&
obj.propertyIsEnumerable===obj.constructor.prototype.propertyIsEnumerable){




obj.propertyIsEnumerable=function(){
return this.constructor.prototype.propertyIsEnumerable.apply(this,arguments);};

obj.propertyIsEnumerable[UID_HASH_KEY]=hash;}else 
if(obj.nodeType!==undefined){




obj[UID_HASH_KEY]=hash;}else 
{
throw new Error('Unable to set a non-enumerable property on object.');}


return hash;}



var isExtensible=Object.isExtensible;


var canDefineProperty=function(){
try{
Object.defineProperty({},'@',{});
return true;}
catch(e){
return false;}}();





function getIENodeHash(node){
if(node&&node.nodeType>0){
switch(node.nodeType){
case 1:
return node.uniqueID;
case 9:
return node.documentElement&&node.documentElement.uniqueID;}}}





var usingWeakMap=typeof WeakMap==='function';
var weakMap;
if(usingWeakMap){
weakMap=new WeakMap();}


var objHashUID=0;

var UID_HASH_KEY='__immutablehash__';
if(typeof Symbol==='function'){
UID_HASH_KEY=Symbol(UID_HASH_KEY);}


var STRING_HASH_CACHE_MIN_STRLEN=16;
var STRING_HASH_CACHE_MAX_SIZE=255;
var STRING_HASH_CACHE_SIZE=0;
var stringHashCache={};

function assertNotInfinite(size){
invariant(
size!==Infinity,
'Cannot perform this action with an infinite size.');}



createClass(Map,KeyedCollection);



function Map(value){
return value===null||value===undefined?emptyMap():
isMap(value)&&!isOrdered(value)?value:
emptyMap().withMutations(function(map){
var iter=KeyedIterable(value);
assertNotInfinite(iter.size);
iter.forEach(function(v,k){return map.set(k,v);});});}



Map.prototype.toString=function(){
return this.__toString('Map {','}');};




Map.prototype.get=function(k,notSetValue){
return this._root?
this._root.get(0,undefined,k,notSetValue):
notSetValue;};




Map.prototype.set=function(k,v){
return updateMap(this,k,v);};


Map.prototype.setIn=function(keyPath,v){
return this.updateIn(keyPath,NOT_SET,function(){return v;});};


Map.prototype.remove=function(k){
return updateMap(this,k,NOT_SET);};


Map.prototype.deleteIn=function(keyPath){
return this.updateIn(keyPath,function(){return NOT_SET;});};


Map.prototype.update=function(k,notSetValue,updater){
return arguments.length===1?
k(this):
this.updateIn([k],notSetValue,updater);};


Map.prototype.updateIn=function(keyPath,notSetValue,updater){
if(!updater){
updater=notSetValue;
notSetValue=undefined;}

var updatedValue=updateInDeepMap(
this,
forceIterator(keyPath),
notSetValue,
updater);

return updatedValue===NOT_SET?undefined:updatedValue;};


Map.prototype.clear=function(){
if(this.size===0){
return this;}

if(this.__ownerID){
this.size=0;
this._root=null;
this.__hash=undefined;
this.__altered=true;
return this;}

return emptyMap();};




Map.prototype.merge=function(){
return mergeIntoMapWith(this,undefined,arguments);};


Map.prototype.mergeWith=function(merger){var iters=SLICE$0.call(arguments,1);
return mergeIntoMapWith(this,merger,iters);};


Map.prototype.mergeIn=function(keyPath){var iters=SLICE$0.call(arguments,1);
return this.updateIn(
keyPath,
emptyMap(),
function(m){return typeof m.merge==='function'?
m.merge.apply(m,iters):
iters[iters.length-1];});};



Map.prototype.mergeDeep=function(){
return mergeIntoMapWith(this,deepMerger,arguments);};


Map.prototype.mergeDeepWith=function(merger){var iters=SLICE$0.call(arguments,1);
return mergeIntoMapWith(this,deepMergerWith(merger),iters);};


Map.prototype.mergeDeepIn=function(keyPath){var iters=SLICE$0.call(arguments,1);
return this.updateIn(
keyPath,
emptyMap(),
function(m){return typeof m.mergeDeep==='function'?
m.mergeDeep.apply(m,iters):
iters[iters.length-1];});};



Map.prototype.sort=function(comparator){

return OrderedMap(sortFactory(this,comparator));};


Map.prototype.sortBy=function(mapper,comparator){

return OrderedMap(sortFactory(this,comparator,mapper));};




Map.prototype.withMutations=function(fn){
var mutable=this.asMutable();
fn(mutable);
return mutable.wasAltered()?mutable.__ensureOwner(this.__ownerID):this;};


Map.prototype.asMutable=function(){
return this.__ownerID?this:this.__ensureOwner(new OwnerID());};


Map.prototype.asImmutable=function(){
return this.__ensureOwner();};


Map.prototype.wasAltered=function(){
return this.__altered;};


Map.prototype.__iterator=function(type,reverse){
return new MapIterator(this,type,reverse);};


Map.prototype.__iterate=function(fn,reverse){var this$0=this;
var iterations=0;
this._root&&this._root.iterate(function(entry){
iterations++;
return fn(entry[1],entry[0],this$0);},
reverse);
return iterations;};


Map.prototype.__ensureOwner=function(ownerID){
if(ownerID===this.__ownerID){
return this;}

if(!ownerID){
this.__ownerID=ownerID;
this.__altered=false;
return this;}

return makeMap(this.size,this._root,ownerID,this.__hash);};



function isMap(maybeMap){
return !!(maybeMap&&maybeMap[IS_MAP_SENTINEL]);}


Map.isMap=isMap;

var IS_MAP_SENTINEL='@@__IMMUTABLE_MAP__@@';

var MapPrototype=Map.prototype;
MapPrototype[IS_MAP_SENTINEL]=true;
MapPrototype[DELETE]=MapPrototype.remove;
MapPrototype.removeIn=MapPrototype.deleteIn;






function ArrayMapNode(ownerID,entries){
this.ownerID=ownerID;
this.entries=entries;}


ArrayMapNode.prototype.get=function(shift,keyHash,key,notSetValue){
var entries=this.entries;
for(var ii=0,len=entries.length;ii<len;ii++){
if(is(key,entries[ii][0])){
return entries[ii][1];}}


return notSetValue;};


ArrayMapNode.prototype.update=function(ownerID,shift,keyHash,key,value,didChangeSize,didAlter){
var removed=value===NOT_SET;

var entries=this.entries;
var idx=0;
for(var len=entries.length;idx<len;idx++){
if(is(key,entries[idx][0])){
break;}}


var exists=idx<len;

if(exists?entries[idx][1]===value:removed){
return this;}


SetRef(didAlter);
(removed||!exists)&&SetRef(didChangeSize);

if(removed&&entries.length===1){
return;}


if(!exists&&!removed&&entries.length>=MAX_ARRAY_MAP_SIZE){
return createNodes(ownerID,entries,key,value);}


var isEditable=ownerID&&ownerID===this.ownerID;
var newEntries=isEditable?entries:arrCopy(entries);

if(exists){
if(removed){
idx===len-1?newEntries.pop():newEntries[idx]=newEntries.pop();}else 
{
newEntries[idx]=[key,value];}}else 

{
newEntries.push([key,value]);}


if(isEditable){
this.entries=newEntries;
return this;}


return new ArrayMapNode(ownerID,newEntries);};





function BitmapIndexedNode(ownerID,bitmap,nodes){
this.ownerID=ownerID;
this.bitmap=bitmap;
this.nodes=nodes;}


BitmapIndexedNode.prototype.get=function(shift,keyHash,key,notSetValue){
if(keyHash===undefined){
keyHash=hash(key);}

var bit=1<<((shift===0?keyHash:keyHash>>>shift)&MASK);
var bitmap=this.bitmap;
return (bitmap&bit)===0?notSetValue:
this.nodes[popCount(bitmap&bit-1)].get(shift+SHIFT,keyHash,key,notSetValue);};


BitmapIndexedNode.prototype.update=function(ownerID,shift,keyHash,key,value,didChangeSize,didAlter){
if(keyHash===undefined){
keyHash=hash(key);}

var keyHashFrag=(shift===0?keyHash:keyHash>>>shift)&MASK;
var bit=1<<keyHashFrag;
var bitmap=this.bitmap;
var exists=(bitmap&bit)!==0;

if(!exists&&value===NOT_SET){
return this;}


var idx=popCount(bitmap&bit-1);
var nodes=this.nodes;
var node=exists?nodes[idx]:undefined;
var newNode=updateNode(node,ownerID,shift+SHIFT,keyHash,key,value,didChangeSize,didAlter);

if(newNode===node){
return this;}


if(!exists&&newNode&&nodes.length>=MAX_BITMAP_INDEXED_SIZE){
return expandNodes(ownerID,nodes,bitmap,keyHashFrag,newNode);}


if(exists&&!newNode&&nodes.length===2&&isLeafNode(nodes[idx^1])){
return nodes[idx^1];}


if(exists&&newNode&&nodes.length===1&&isLeafNode(newNode)){
return newNode;}


var isEditable=ownerID&&ownerID===this.ownerID;
var newBitmap=exists?newNode?bitmap:bitmap^bit:bitmap|bit;
var newNodes=exists?newNode?
setIn(nodes,idx,newNode,isEditable):
spliceOut(nodes,idx,isEditable):
spliceIn(nodes,idx,newNode,isEditable);

if(isEditable){
this.bitmap=newBitmap;
this.nodes=newNodes;
return this;}


return new BitmapIndexedNode(ownerID,newBitmap,newNodes);};





function HashArrayMapNode(ownerID,count,nodes){
this.ownerID=ownerID;
this.count=count;
this.nodes=nodes;}


HashArrayMapNode.prototype.get=function(shift,keyHash,key,notSetValue){
if(keyHash===undefined){
keyHash=hash(key);}

var idx=(shift===0?keyHash:keyHash>>>shift)&MASK;
var node=this.nodes[idx];
return node?node.get(shift+SHIFT,keyHash,key,notSetValue):notSetValue;};


HashArrayMapNode.prototype.update=function(ownerID,shift,keyHash,key,value,didChangeSize,didAlter){
if(keyHash===undefined){
keyHash=hash(key);}

var idx=(shift===0?keyHash:keyHash>>>shift)&MASK;
var removed=value===NOT_SET;
var nodes=this.nodes;
var node=nodes[idx];

if(removed&&!node){
return this;}


var newNode=updateNode(node,ownerID,shift+SHIFT,keyHash,key,value,didChangeSize,didAlter);
if(newNode===node){
return this;}


var newCount=this.count;
if(!node){
newCount++;}else 
if(!newNode){
newCount--;
if(newCount<MIN_HASH_ARRAY_MAP_SIZE){
return packNodes(ownerID,nodes,newCount,idx);}}



var isEditable=ownerID&&ownerID===this.ownerID;
var newNodes=setIn(nodes,idx,newNode,isEditable);

if(isEditable){
this.count=newCount;
this.nodes=newNodes;
return this;}


return new HashArrayMapNode(ownerID,newCount,newNodes);};





function HashCollisionNode(ownerID,keyHash,entries){
this.ownerID=ownerID;
this.keyHash=keyHash;
this.entries=entries;}


HashCollisionNode.prototype.get=function(shift,keyHash,key,notSetValue){
var entries=this.entries;
for(var ii=0,len=entries.length;ii<len;ii++){
if(is(key,entries[ii][0])){
return entries[ii][1];}}


return notSetValue;};


HashCollisionNode.prototype.update=function(ownerID,shift,keyHash,key,value,didChangeSize,didAlter){
if(keyHash===undefined){
keyHash=hash(key);}


var removed=value===NOT_SET;

if(keyHash!==this.keyHash){
if(removed){
return this;}

SetRef(didAlter);
SetRef(didChangeSize);
return mergeIntoNode(this,ownerID,shift,keyHash,[key,value]);}


var entries=this.entries;
var idx=0;
for(var len=entries.length;idx<len;idx++){
if(is(key,entries[idx][0])){
break;}}


var exists=idx<len;

if(exists?entries[idx][1]===value:removed){
return this;}


SetRef(didAlter);
(removed||!exists)&&SetRef(didChangeSize);

if(removed&&len===2){
return new ValueNode(ownerID,this.keyHash,entries[idx^1]);}


var isEditable=ownerID&&ownerID===this.ownerID;
var newEntries=isEditable?entries:arrCopy(entries);

if(exists){
if(removed){
idx===len-1?newEntries.pop():newEntries[idx]=newEntries.pop();}else 
{
newEntries[idx]=[key,value];}}else 

{
newEntries.push([key,value]);}


if(isEditable){
this.entries=newEntries;
return this;}


return new HashCollisionNode(ownerID,this.keyHash,newEntries);};





function ValueNode(ownerID,keyHash,entry){
this.ownerID=ownerID;
this.keyHash=keyHash;
this.entry=entry;}


ValueNode.prototype.get=function(shift,keyHash,key,notSetValue){
return is(key,this.entry[0])?this.entry[1]:notSetValue;};


ValueNode.prototype.update=function(ownerID,shift,keyHash,key,value,didChangeSize,didAlter){
var removed=value===NOT_SET;
var keyMatch=is(key,this.entry[0]);
if(keyMatch?value===this.entry[1]:removed){
return this;}


SetRef(didAlter);

if(removed){
SetRef(didChangeSize);
return;}


if(keyMatch){
if(ownerID&&ownerID===this.ownerID){
this.entry[1]=value;
return this;}

return new ValueNode(ownerID,this.keyHash,[key,value]);}


SetRef(didChangeSize);
return mergeIntoNode(this,ownerID,shift,hash(key),[key,value]);};






ArrayMapNode.prototype.iterate=
HashCollisionNode.prototype.iterate=function(fn,reverse){
var entries=this.entries;
for(var ii=0,maxIndex=entries.length-1;ii<=maxIndex;ii++){
if(fn(entries[reverse?maxIndex-ii:ii])===false){
return false;}}};




BitmapIndexedNode.prototype.iterate=
HashArrayMapNode.prototype.iterate=function(fn,reverse){
var nodes=this.nodes;
for(var ii=0,maxIndex=nodes.length-1;ii<=maxIndex;ii++){
var node=nodes[reverse?maxIndex-ii:ii];
if(node&&node.iterate(fn,reverse)===false){
return false;}}};




ValueNode.prototype.iterate=function(fn,reverse){
return fn(this.entry);};


createClass(MapIterator,Iterator);

function MapIterator(map,type,reverse){
this._type=type;
this._reverse=reverse;
this._stack=map._root&&mapIteratorFrame(map._root);}


MapIterator.prototype.next=function(){
var type=this._type;
var stack=this._stack;
while(stack){
var node=stack.node;
var index=stack.index++;
var maxIndex;
if(node.entry){
if(index===0){
return mapIteratorValue(type,node.entry);}}else 

if(node.entries){
maxIndex=node.entries.length-1;
if(index<=maxIndex){
return mapIteratorValue(type,node.entries[this._reverse?maxIndex-index:index]);}}else 

{
maxIndex=node.nodes.length-1;
if(index<=maxIndex){
var subNode=node.nodes[this._reverse?maxIndex-index:index];
if(subNode){
if(subNode.entry){
return mapIteratorValue(type,subNode.entry);}

stack=this._stack=mapIteratorFrame(subNode,stack);}

continue;}}


stack=this._stack=this._stack.__prev;}

return iteratorDone();};



function mapIteratorValue(type,entry){
return iteratorValue(type,entry[0],entry[1]);}


function mapIteratorFrame(node,prev){
return {
node:node,
index:0,
__prev:prev};}



function makeMap(size,root,ownerID,hash){
var map=Object.create(MapPrototype);
map.size=size;
map._root=root;
map.__ownerID=ownerID;
map.__hash=hash;
map.__altered=false;
return map;}


var EMPTY_MAP;
function emptyMap(){
return EMPTY_MAP||(EMPTY_MAP=makeMap(0));}


function updateMap(map,k,v){
var newRoot;
var newSize;
if(!map._root){
if(v===NOT_SET){
return map;}

newSize=1;
newRoot=new ArrayMapNode(map.__ownerID,[[k,v]]);}else 
{
var didChangeSize=MakeRef(CHANGE_LENGTH);
var didAlter=MakeRef(DID_ALTER);
newRoot=updateNode(map._root,map.__ownerID,0,undefined,k,v,didChangeSize,didAlter);
if(!didAlter.value){
return map;}

newSize=map.size+(didChangeSize.value?v===NOT_SET?-1:1:0);}

if(map.__ownerID){
map.size=newSize;
map._root=newRoot;
map.__hash=undefined;
map.__altered=true;
return map;}

return newRoot?makeMap(newSize,newRoot):emptyMap();}


function updateNode(node,ownerID,shift,keyHash,key,value,didChangeSize,didAlter){
if(!node){
if(value===NOT_SET){
return node;}

SetRef(didAlter);
SetRef(didChangeSize);
return new ValueNode(ownerID,keyHash,[key,value]);}

return node.update(ownerID,shift,keyHash,key,value,didChangeSize,didAlter);}


function isLeafNode(node){
return node.constructor===ValueNode||node.constructor===HashCollisionNode;}


function mergeIntoNode(node,ownerID,shift,keyHash,entry){
if(node.keyHash===keyHash){
return new HashCollisionNode(ownerID,keyHash,[node.entry,entry]);}


var idx1=(shift===0?node.keyHash:node.keyHash>>>shift)&MASK;
var idx2=(shift===0?keyHash:keyHash>>>shift)&MASK;

var newNode;
var nodes=idx1===idx2?
[mergeIntoNode(node,ownerID,shift+SHIFT,keyHash,entry)]:(
newNode=new ValueNode(ownerID,keyHash,entry),idx1<idx2?[node,newNode]:[newNode,node]);

return new BitmapIndexedNode(ownerID,1<<idx1|1<<idx2,nodes);}


function createNodes(ownerID,entries,key,value){
if(!ownerID){
ownerID=new OwnerID();}

var node=new ValueNode(ownerID,hash(key),[key,value]);
for(var ii=0;ii<entries.length;ii++){
var entry=entries[ii];
node=node.update(ownerID,0,undefined,entry[0],entry[1]);}

return node;}


function packNodes(ownerID,nodes,count,excluding){
var bitmap=0;
var packedII=0;
var packedNodes=new Array(count);
for(var ii=0,bit=1,len=nodes.length;ii<len;ii++,bit<<=1){
var node=nodes[ii];
if(node!==undefined&&ii!==excluding){
bitmap|=bit;
packedNodes[packedII++]=node;}}


return new BitmapIndexedNode(ownerID,bitmap,packedNodes);}


function expandNodes(ownerID,nodes,bitmap,including,node){
var count=0;
var expandedNodes=new Array(SIZE);
for(var ii=0;bitmap!==0;ii++,bitmap>>>=1){
expandedNodes[ii]=bitmap&1?nodes[count++]:undefined;}

expandedNodes[including]=node;
return new HashArrayMapNode(ownerID,count+1,expandedNodes);}


function mergeIntoMapWith(map,merger,iterables){
var iters=[];
for(var ii=0;ii<iterables.length;ii++){
var value=iterables[ii];
var iter=KeyedIterable(value);
if(!isIterable(value)){
iter=iter.map(function(v){return fromJS(v);});}

iters.push(iter);}

return mergeIntoCollectionWith(map,merger,iters);}


function deepMerger(existing,value,key){
return existing&&existing.mergeDeep&&isIterable(value)?
existing.mergeDeep(value):
is(existing,value)?existing:value;}


function deepMergerWith(merger){
return function(existing,value,key){
if(existing&&existing.mergeDeepWith&&isIterable(value)){
return existing.mergeDeepWith(merger,value);}

var nextValue=merger(existing,value,key);
return is(existing,nextValue)?existing:nextValue;};}



function mergeIntoCollectionWith(collection,merger,iters){
iters=iters.filter(function(x){return x.size!==0;});
if(iters.length===0){
return collection;}

if(collection.size===0&&!collection.__ownerID&&iters.length===1){
return collection.constructor(iters[0]);}

return collection.withMutations(function(collection){
var mergeIntoMap=merger?
function(value,key){
collection.update(key,NOT_SET,function(existing)
{return existing===NOT_SET?value:merger(existing,value,key);});}:


function(value,key){
collection.set(key,value);};

for(var ii=0;ii<iters.length;ii++){
iters[ii].forEach(mergeIntoMap);}});}




function updateInDeepMap(existing,keyPathIter,notSetValue,updater){
var isNotSet=existing===NOT_SET;
var step=keyPathIter.next();
if(step.done){
var existingValue=isNotSet?notSetValue:existing;
var newValue=updater(existingValue);
return newValue===existingValue?existing:newValue;}

invariant(
isNotSet||existing&&existing.set,
'invalid keyPath');

var key=step.value;
var nextExisting=isNotSet?NOT_SET:existing.get(key,NOT_SET);
var nextUpdated=updateInDeepMap(
nextExisting,
keyPathIter,
notSetValue,
updater);

return nextUpdated===nextExisting?existing:
nextUpdated===NOT_SET?existing.remove(key):
(isNotSet?emptyMap():existing).set(key,nextUpdated);}


function popCount(x){
x=x-(x>>1&0x55555555);
x=(x&0x33333333)+(x>>2&0x33333333);
x=x+(x>>4)&0x0f0f0f0f;
x=x+(x>>8);
x=x+(x>>16);
return x&0x7f;}


function setIn(array,idx,val,canEdit){
var newArray=canEdit?array:arrCopy(array);
newArray[idx]=val;
return newArray;}


function spliceIn(array,idx,val,canEdit){
var newLen=array.length+1;
if(canEdit&&idx+1===newLen){
array[idx]=val;
return array;}

var newArray=new Array(newLen);
var after=0;
for(var ii=0;ii<newLen;ii++){
if(ii===idx){
newArray[ii]=val;
after=-1;}else 
{
newArray[ii]=array[ii+after];}}


return newArray;}


function spliceOut(array,idx,canEdit){
var newLen=array.length-1;
if(canEdit&&idx===newLen){
array.pop();
return array;}

var newArray=new Array(newLen);
var after=0;
for(var ii=0;ii<newLen;ii++){
if(ii===idx){
after=1;}

newArray[ii]=array[ii+after];}

return newArray;}


var MAX_ARRAY_MAP_SIZE=SIZE/4;
var MAX_BITMAP_INDEXED_SIZE=SIZE/2;
var MIN_HASH_ARRAY_MAP_SIZE=SIZE/4;

createClass(List,IndexedCollection);



function List(value){
var empty=emptyList();
if(value===null||value===undefined){
return empty;}

if(isList(value)){
return value;}

var iter=IndexedIterable(value);
var size=iter.size;
if(size===0){
return empty;}

assertNotInfinite(size);
if(size>0&&size<SIZE){
return makeList(0,size,SHIFT,null,new VNode(iter.toArray()));}

return empty.withMutations(function(list){
list.setSize(size);
iter.forEach(function(v,i){return list.set(i,v);});});}



List.of=function(){
return this(arguments);};


List.prototype.toString=function(){
return this.__toString('List [',']');};




List.prototype.get=function(index,notSetValue){
index=wrapIndex(this,index);
if(index>=0&&index<this.size){
index+=this._origin;
var node=listNodeFor(this,index);
return node&&node.array[index&MASK];}

return notSetValue;};




List.prototype.set=function(index,value){
return updateList(this,index,value);};


List.prototype.remove=function(index){
return !this.has(index)?this:
index===0?this.shift():
index===this.size-1?this.pop():
this.splice(index,1);};


List.prototype.insert=function(index,value){
return this.splice(index,0,value);};


List.prototype.clear=function(){
if(this.size===0){
return this;}

if(this.__ownerID){
this.size=this._origin=this._capacity=0;
this._level=SHIFT;
this._root=this._tail=null;
this.__hash=undefined;
this.__altered=true;
return this;}

return emptyList();};


List.prototype.push=function(){
var values=arguments;
var oldSize=this.size;
return this.withMutations(function(list){
setListBounds(list,0,oldSize+values.length);
for(var ii=0;ii<values.length;ii++){
list.set(oldSize+ii,values[ii]);}});};




List.prototype.pop=function(){
return setListBounds(this,0,-1);};


List.prototype.unshift=function(){
var values=arguments;
return this.withMutations(function(list){
setListBounds(list,-values.length);
for(var ii=0;ii<values.length;ii++){
list.set(ii,values[ii]);}});};




List.prototype.shift=function(){
return setListBounds(this,1);};




List.prototype.merge=function(){
return mergeIntoListWith(this,undefined,arguments);};


List.prototype.mergeWith=function(merger){var iters=SLICE$0.call(arguments,1);
return mergeIntoListWith(this,merger,iters);};


List.prototype.mergeDeep=function(){
return mergeIntoListWith(this,deepMerger,arguments);};


List.prototype.mergeDeepWith=function(merger){var iters=SLICE$0.call(arguments,1);
return mergeIntoListWith(this,deepMergerWith(merger),iters);};


List.prototype.setSize=function(size){
return setListBounds(this,0,size);};




List.prototype.slice=function(begin,end){
var size=this.size;
if(wholeSlice(begin,end,size)){
return this;}

return setListBounds(
this,
resolveBegin(begin,size),
resolveEnd(end,size));};



List.prototype.__iterator=function(type,reverse){
var index=0;
var values=iterateList(this,reverse);
return new Iterator(function(){
var value=values();
return value===DONE?
iteratorDone():
iteratorValue(type,index++,value);});};



List.prototype.__iterate=function(fn,reverse){
var index=0;
var values=iterateList(this,reverse);
var value;
while((value=values())!==DONE){
if(fn(value,index++,this)===false){
break;}}


return index;};


List.prototype.__ensureOwner=function(ownerID){
if(ownerID===this.__ownerID){
return this;}

if(!ownerID){
this.__ownerID=ownerID;
return this;}

return makeList(this._origin,this._capacity,this._level,this._root,this._tail,ownerID,this.__hash);};



function isList(maybeList){
return !!(maybeList&&maybeList[IS_LIST_SENTINEL]);}


List.isList=isList;

var IS_LIST_SENTINEL='@@__IMMUTABLE_LIST__@@';

var ListPrototype=List.prototype;
ListPrototype[IS_LIST_SENTINEL]=true;
ListPrototype[DELETE]=ListPrototype.remove;
ListPrototype.setIn=MapPrototype.setIn;
ListPrototype.deleteIn=
ListPrototype.removeIn=MapPrototype.removeIn;
ListPrototype.update=MapPrototype.update;
ListPrototype.updateIn=MapPrototype.updateIn;
ListPrototype.mergeIn=MapPrototype.mergeIn;
ListPrototype.mergeDeepIn=MapPrototype.mergeDeepIn;
ListPrototype.withMutations=MapPrototype.withMutations;
ListPrototype.asMutable=MapPrototype.asMutable;
ListPrototype.asImmutable=MapPrototype.asImmutable;
ListPrototype.wasAltered=MapPrototype.wasAltered;



function VNode(array,ownerID){
this.array=array;
this.ownerID=ownerID;}




VNode.prototype.removeBefore=function(ownerID,level,index){
if(index===level?1<<level:0||this.array.length===0){
return this;}

var originIndex=index>>>level&MASK;
if(originIndex>=this.array.length){
return new VNode([],ownerID);}

var removingFirst=originIndex===0;
var newChild;
if(level>0){
var oldChild=this.array[originIndex];
newChild=oldChild&&oldChild.removeBefore(ownerID,level-SHIFT,index);
if(newChild===oldChild&&removingFirst){
return this;}}


if(removingFirst&&!newChild){
return this;}

var editable=editableVNode(this,ownerID);
if(!removingFirst){
for(var ii=0;ii<originIndex;ii++){
editable.array[ii]=undefined;}}


if(newChild){
editable.array[originIndex]=newChild;}

return editable;};


VNode.prototype.removeAfter=function(ownerID,level,index){
if(index===(level?1<<level:0)||this.array.length===0){
return this;}

var sizeIndex=index-1>>>level&MASK;
if(sizeIndex>=this.array.length){
return this;}


var newChild;
if(level>0){
var oldChild=this.array[sizeIndex];
newChild=oldChild&&oldChild.removeAfter(ownerID,level-SHIFT,index);
if(newChild===oldChild&&sizeIndex===this.array.length-1){
return this;}}



var editable=editableVNode(this,ownerID);
editable.array.splice(sizeIndex+1);
if(newChild){
editable.array[sizeIndex]=newChild;}

return editable;};




var DONE={};

function iterateList(list,reverse){
var left=list._origin;
var right=list._capacity;
var tailPos=getTailOffset(right);
var tail=list._tail;

return iterateNodeOrLeaf(list._root,list._level,0);

function iterateNodeOrLeaf(node,level,offset){
return level===0?
iterateLeaf(node,offset):
iterateNode(node,level,offset);}


function iterateLeaf(node,offset){
var array=offset===tailPos?tail&&tail.array:node&&node.array;
var from=offset>left?0:left-offset;
var to=right-offset;
if(to>SIZE){
to=SIZE;}

return function(){
if(from===to){
return DONE;}

var idx=reverse?--to:from++;
return array&&array[idx];};}



function iterateNode(node,level,offset){
var values;
var array=node&&node.array;
var from=offset>left?0:left-offset>>level;
var to=(right-offset>>level)+1;
if(to>SIZE){
to=SIZE;}

return function(){
do {
if(values){
var value=values();
if(value!==DONE){
return value;}

values=null;}

if(from===to){
return DONE;}

var idx=reverse?--to:from++;
values=iterateNodeOrLeaf(
array&&array[idx],level-SHIFT,offset+(idx<<level));}while(

true);};}}




function makeList(origin,capacity,level,root,tail,ownerID,hash){
var list=Object.create(ListPrototype);
list.size=capacity-origin;
list._origin=origin;
list._capacity=capacity;
list._level=level;
list._root=root;
list._tail=tail;
list.__ownerID=ownerID;
list.__hash=hash;
list.__altered=false;
return list;}


var EMPTY_LIST;
function emptyList(){
return EMPTY_LIST||(EMPTY_LIST=makeList(0,0,SHIFT));}


function updateList(list,index,value){
index=wrapIndex(list,index);

if(index!==index){
return list;}


if(index>=list.size||index<0){
return list.withMutations(function(list){
index<0?
setListBounds(list,index).set(0,value):
setListBounds(list,0,index+1).set(index,value);});}



index+=list._origin;

var newTail=list._tail;
var newRoot=list._root;
var didAlter=MakeRef(DID_ALTER);
if(index>=getTailOffset(list._capacity)){
newTail=updateVNode(newTail,list.__ownerID,0,index,value,didAlter);}else 
{
newRoot=updateVNode(newRoot,list.__ownerID,list._level,index,value,didAlter);}


if(!didAlter.value){
return list;}


if(list.__ownerID){
list._root=newRoot;
list._tail=newTail;
list.__hash=undefined;
list.__altered=true;
return list;}

return makeList(list._origin,list._capacity,list._level,newRoot,newTail);}


function updateVNode(node,ownerID,level,index,value,didAlter){
var idx=index>>>level&MASK;
var nodeHas=node&&idx<node.array.length;
if(!nodeHas&&value===undefined){
return node;}


var newNode;

if(level>0){
var lowerNode=node&&node.array[idx];
var newLowerNode=updateVNode(lowerNode,ownerID,level-SHIFT,index,value,didAlter);
if(newLowerNode===lowerNode){
return node;}

newNode=editableVNode(node,ownerID);
newNode.array[idx]=newLowerNode;
return newNode;}


if(nodeHas&&node.array[idx]===value){
return node;}


SetRef(didAlter);

newNode=editableVNode(node,ownerID);
if(value===undefined&&idx===newNode.array.length-1){
newNode.array.pop();}else 
{
newNode.array[idx]=value;}

return newNode;}


function editableVNode(node,ownerID){
if(ownerID&&node&&ownerID===node.ownerID){
return node;}

return new VNode(node?node.array.slice():[],ownerID);}


function listNodeFor(list,rawIndex){
if(rawIndex>=getTailOffset(list._capacity)){
return list._tail;}

if(rawIndex<1<<list._level+SHIFT){
var node=list._root;
var level=list._level;
while(node&&level>0){
node=node.array[rawIndex>>>level&MASK];
level-=SHIFT;}

return node;}}



function setListBounds(list,begin,end){


if(begin!==undefined){
begin=begin|0;}

if(end!==undefined){
end=end|0;}

var owner=list.__ownerID||new OwnerID();
var oldOrigin=list._origin;
var oldCapacity=list._capacity;
var newOrigin=oldOrigin+begin;
var newCapacity=end===undefined?oldCapacity:end<0?oldCapacity+end:oldOrigin+end;
if(newOrigin===oldOrigin&&newCapacity===oldCapacity){
return list;}



if(newOrigin>=newCapacity){
return list.clear();}


var newLevel=list._level;
var newRoot=list._root;


var offsetShift=0;
while(newOrigin+offsetShift<0){
newRoot=new VNode(newRoot&&newRoot.array.length?[undefined,newRoot]:[],owner);
newLevel+=SHIFT;
offsetShift+=1<<newLevel;}

if(offsetShift){
newOrigin+=offsetShift;
oldOrigin+=offsetShift;
newCapacity+=offsetShift;
oldCapacity+=offsetShift;}


var oldTailOffset=getTailOffset(oldCapacity);
var newTailOffset=getTailOffset(newCapacity);


while(newTailOffset>=1<<newLevel+SHIFT){
newRoot=new VNode(newRoot&&newRoot.array.length?[newRoot]:[],owner);
newLevel+=SHIFT;}



var oldTail=list._tail;
var newTail=newTailOffset<oldTailOffset?
listNodeFor(list,newCapacity-1):
newTailOffset>oldTailOffset?new VNode([],owner):oldTail;


if(oldTail&&newTailOffset>oldTailOffset&&newOrigin<oldCapacity&&oldTail.array.length){
newRoot=editableVNode(newRoot,owner);
var node=newRoot;
for(var level=newLevel;level>SHIFT;level-=SHIFT){
var idx=oldTailOffset>>>level&MASK;
node=node.array[idx]=editableVNode(node.array[idx],owner);}

node.array[oldTailOffset>>>SHIFT&MASK]=oldTail;}



if(newCapacity<oldCapacity){
newTail=newTail&&newTail.removeAfter(owner,0,newCapacity);}



if(newOrigin>=newTailOffset){
newOrigin-=newTailOffset;
newCapacity-=newTailOffset;
newLevel=SHIFT;
newRoot=null;
newTail=newTail&&newTail.removeBefore(owner,0,newOrigin);}else 


if(newOrigin>oldOrigin||newTailOffset<oldTailOffset){
offsetShift=0;


while(newRoot){
var beginIndex=newOrigin>>>newLevel&MASK;
if(beginIndex!==newTailOffset>>>newLevel&MASK){
break;}

if(beginIndex){
offsetShift+=(1<<newLevel)*beginIndex;}

newLevel-=SHIFT;
newRoot=newRoot.array[beginIndex];}



if(newRoot&&newOrigin>oldOrigin){
newRoot=newRoot.removeBefore(owner,newLevel,newOrigin-offsetShift);}

if(newRoot&&newTailOffset<oldTailOffset){
newRoot=newRoot.removeAfter(owner,newLevel,newTailOffset-offsetShift);}

if(offsetShift){
newOrigin-=offsetShift;
newCapacity-=offsetShift;}}



if(list.__ownerID){
list.size=newCapacity-newOrigin;
list._origin=newOrigin;
list._capacity=newCapacity;
list._level=newLevel;
list._root=newRoot;
list._tail=newTail;
list.__hash=undefined;
list.__altered=true;
return list;}

return makeList(newOrigin,newCapacity,newLevel,newRoot,newTail);}


function mergeIntoListWith(list,merger,iterables){
var iters=[];
var maxSize=0;
for(var ii=0;ii<iterables.length;ii++){
var value=iterables[ii];
var iter=IndexedIterable(value);
if(iter.size>maxSize){
maxSize=iter.size;}

if(!isIterable(value)){
iter=iter.map(function(v){return fromJS(v);});}

iters.push(iter);}

if(maxSize>list.size){
list=list.setSize(maxSize);}

return mergeIntoCollectionWith(list,merger,iters);}


function getTailOffset(size){
return size<SIZE?0:size-1>>>SHIFT<<SHIFT;}


createClass(OrderedMap,Map);



function OrderedMap(value){
return value===null||value===undefined?emptyOrderedMap():
isOrderedMap(value)?value:
emptyOrderedMap().withMutations(function(map){
var iter=KeyedIterable(value);
assertNotInfinite(iter.size);
iter.forEach(function(v,k){return map.set(k,v);});});}



OrderedMap.of=function(){
return this(arguments);};


OrderedMap.prototype.toString=function(){
return this.__toString('OrderedMap {','}');};




OrderedMap.prototype.get=function(k,notSetValue){
var index=this._map.get(k);
return index!==undefined?this._list.get(index)[1]:notSetValue;};




OrderedMap.prototype.clear=function(){
if(this.size===0){
return this;}

if(this.__ownerID){
this.size=0;
this._map.clear();
this._list.clear();
return this;}

return emptyOrderedMap();};


OrderedMap.prototype.set=function(k,v){
return updateOrderedMap(this,k,v);};


OrderedMap.prototype.remove=function(k){
return updateOrderedMap(this,k,NOT_SET);};


OrderedMap.prototype.wasAltered=function(){
return this._map.wasAltered()||this._list.wasAltered();};


OrderedMap.prototype.__iterate=function(fn,reverse){var this$0=this;
return this._list.__iterate(
function(entry){return entry&&fn(entry[1],entry[0],this$0);},
reverse);};



OrderedMap.prototype.__iterator=function(type,reverse){
return this._list.fromEntrySeq().__iterator(type,reverse);};


OrderedMap.prototype.__ensureOwner=function(ownerID){
if(ownerID===this.__ownerID){
return this;}

var newMap=this._map.__ensureOwner(ownerID);
var newList=this._list.__ensureOwner(ownerID);
if(!ownerID){
this.__ownerID=ownerID;
this._map=newMap;
this._list=newList;
return this;}

return makeOrderedMap(newMap,newList,ownerID,this.__hash);};



function isOrderedMap(maybeOrderedMap){
return isMap(maybeOrderedMap)&&isOrdered(maybeOrderedMap);}


OrderedMap.isOrderedMap=isOrderedMap;

OrderedMap.prototype[IS_ORDERED_SENTINEL]=true;
OrderedMap.prototype[DELETE]=OrderedMap.prototype.remove;



function makeOrderedMap(map,list,ownerID,hash){
var omap=Object.create(OrderedMap.prototype);
omap.size=map?map.size:0;
omap._map=map;
omap._list=list;
omap.__ownerID=ownerID;
omap.__hash=hash;
return omap;}


var EMPTY_ORDERED_MAP;
function emptyOrderedMap(){
return EMPTY_ORDERED_MAP||(EMPTY_ORDERED_MAP=makeOrderedMap(emptyMap(),emptyList()));}


function updateOrderedMap(omap,k,v){
var map=omap._map;
var list=omap._list;
var i=map.get(k);
var has=i!==undefined;
var newMap;
var newList;
if(v===NOT_SET){
if(!has){
return omap;}

if(list.size>=SIZE&&list.size>=map.size*2){
newList=list.filter(function(entry,idx){return entry!==undefined&&i!==idx;});
newMap=newList.toKeyedSeq().map(function(entry){return entry[0];}).flip().toMap();
if(omap.__ownerID){
newMap.__ownerID=newList.__ownerID=omap.__ownerID;}}else 

{
newMap=map.remove(k);
newList=i===list.size-1?list.pop():list.set(i,undefined);}}else 

{
if(has){
if(v===list.get(i)[1]){
return omap;}

newMap=map;
newList=list.set(i,[k,v]);}else 
{
newMap=map.set(k,list.size);
newList=list.set(list.size,[k,v]);}}


if(omap.__ownerID){
omap.size=newMap.size;
omap._map=newMap;
omap._list=newList;
omap.__hash=undefined;
return omap;}

return makeOrderedMap(newMap,newList);}


createClass(ToKeyedSequence,KeyedSeq);
function ToKeyedSequence(indexed,useKeys){
this._iter=indexed;
this._useKeys=useKeys;
this.size=indexed.size;}


ToKeyedSequence.prototype.get=function(key,notSetValue){
return this._iter.get(key,notSetValue);};


ToKeyedSequence.prototype.has=function(key){
return this._iter.has(key);};


ToKeyedSequence.prototype.valueSeq=function(){
return this._iter.valueSeq();};


ToKeyedSequence.prototype.reverse=function(){var this$0=this;
var reversedSequence=reverseFactory(this,true);
if(!this._useKeys){
reversedSequence.valueSeq=function(){return this$0._iter.toSeq().reverse();};}

return reversedSequence;};


ToKeyedSequence.prototype.map=function(mapper,context){var this$0=this;
var mappedSequence=mapFactory(this,mapper,context);
if(!this._useKeys){
mappedSequence.valueSeq=function(){return this$0._iter.toSeq().map(mapper,context);};}

return mappedSequence;};


ToKeyedSequence.prototype.__iterate=function(fn,reverse){var this$0=this;
var ii;
return this._iter.__iterate(
this._useKeys?
function(v,k){return fn(v,k,this$0);}:(
ii=reverse?resolveSize(this):0,
function(v){return fn(v,reverse?--ii:ii++,this$0);}),
reverse);};



ToKeyedSequence.prototype.__iterator=function(type,reverse){
if(this._useKeys){
return this._iter.__iterator(type,reverse);}

var iterator=this._iter.__iterator(ITERATE_VALUES,reverse);
var ii=reverse?resolveSize(this):0;
return new Iterator(function(){
var step=iterator.next();
return step.done?step:
iteratorValue(type,reverse?--ii:ii++,step.value,step);});};



ToKeyedSequence.prototype[IS_ORDERED_SENTINEL]=true;


createClass(ToIndexedSequence,IndexedSeq);
function ToIndexedSequence(iter){
this._iter=iter;
this.size=iter.size;}


ToIndexedSequence.prototype.includes=function(value){
return this._iter.includes(value);};


ToIndexedSequence.prototype.__iterate=function(fn,reverse){var this$0=this;
var iterations=0;
return this._iter.__iterate(function(v){return fn(v,iterations++,this$0);},reverse);};


ToIndexedSequence.prototype.__iterator=function(type,reverse){
var iterator=this._iter.__iterator(ITERATE_VALUES,reverse);
var iterations=0;
return new Iterator(function(){
var step=iterator.next();
return step.done?step:
iteratorValue(type,iterations++,step.value,step);});};





createClass(ToSetSequence,SetSeq);
function ToSetSequence(iter){
this._iter=iter;
this.size=iter.size;}


ToSetSequence.prototype.has=function(key){
return this._iter.includes(key);};


ToSetSequence.prototype.__iterate=function(fn,reverse){var this$0=this;
return this._iter.__iterate(function(v){return fn(v,v,this$0);},reverse);};


ToSetSequence.prototype.__iterator=function(type,reverse){
var iterator=this._iter.__iterator(ITERATE_VALUES,reverse);
return new Iterator(function(){
var step=iterator.next();
return step.done?step:
iteratorValue(type,step.value,step.value,step);});};





createClass(FromEntriesSequence,KeyedSeq);
function FromEntriesSequence(entries){
this._iter=entries;
this.size=entries.size;}


FromEntriesSequence.prototype.entrySeq=function(){
return this._iter.toSeq();};


FromEntriesSequence.prototype.__iterate=function(fn,reverse){var this$0=this;
return this._iter.__iterate(function(entry){


if(entry){
validateEntry(entry);
var indexedIterable=isIterable(entry);
return fn(
indexedIterable?entry.get(1):entry[1],
indexedIterable?entry.get(0):entry[0],
this$0);}},


reverse);};


FromEntriesSequence.prototype.__iterator=function(type,reverse){
var iterator=this._iter.__iterator(ITERATE_VALUES,reverse);
return new Iterator(function(){
while(true){
var step=iterator.next();
if(step.done){
return step;}

var entry=step.value;


if(entry){
validateEntry(entry);
var indexedIterable=isIterable(entry);
return iteratorValue(
type,
indexedIterable?entry.get(0):entry[0],
indexedIterable?entry.get(1):entry[1],
step);}}});};







ToIndexedSequence.prototype.cacheResult=
ToKeyedSequence.prototype.cacheResult=
ToSetSequence.prototype.cacheResult=
FromEntriesSequence.prototype.cacheResult=
cacheResultThrough;


function flipFactory(iterable){
var flipSequence=makeSequence(iterable);
flipSequence._iter=iterable;
flipSequence.size=iterable.size;
flipSequence.flip=function(){return iterable;};
flipSequence.reverse=function(){
var reversedSequence=iterable.reverse.apply(this);
reversedSequence.flip=function(){return iterable.reverse();};
return reversedSequence;};

flipSequence.has=function(key){return iterable.includes(key);};
flipSequence.includes=function(key){return iterable.has(key);};
flipSequence.cacheResult=cacheResultThrough;
flipSequence.__iterateUncached=function(fn,reverse){var this$0=this;
return iterable.__iterate(function(v,k){return fn(k,v,this$0)!==false;},reverse);};

flipSequence.__iteratorUncached=function(type,reverse){
if(type===ITERATE_ENTRIES){
var iterator=iterable.__iterator(type,reverse);
return new Iterator(function(){
var step=iterator.next();
if(!step.done){
var k=step.value[0];
step.value[0]=step.value[1];
step.value[1]=k;}

return step;});}


return iterable.__iterator(
type===ITERATE_VALUES?ITERATE_KEYS:ITERATE_VALUES,
reverse);};


return flipSequence;}



function mapFactory(iterable,mapper,context){
var mappedSequence=makeSequence(iterable);
mappedSequence.size=iterable.size;
mappedSequence.has=function(key){return iterable.has(key);};
mappedSequence.get=function(key,notSetValue){
var v=iterable.get(key,NOT_SET);
return v===NOT_SET?
notSetValue:
mapper.call(context,v,key,iterable);};

mappedSequence.__iterateUncached=function(fn,reverse){var this$0=this;
return iterable.__iterate(
function(v,k,c){return fn(mapper.call(context,v,k,c),k,this$0)!==false;},
reverse);};


mappedSequence.__iteratorUncached=function(type,reverse){
var iterator=iterable.__iterator(ITERATE_ENTRIES,reverse);
return new Iterator(function(){
var step=iterator.next();
if(step.done){
return step;}

var entry=step.value;
var key=entry[0];
return iteratorValue(
type,
key,
mapper.call(context,entry[1],key,iterable),
step);});};



return mappedSequence;}



function reverseFactory(iterable,useKeys){
var reversedSequence=makeSequence(iterable);
reversedSequence._iter=iterable;
reversedSequence.size=iterable.size;
reversedSequence.reverse=function(){return iterable;};
if(iterable.flip){
reversedSequence.flip=function(){
var flipSequence=flipFactory(iterable);
flipSequence.reverse=function(){return iterable.flip();};
return flipSequence;};}


reversedSequence.get=function(key,notSetValue)
{return iterable.get(useKeys?key:-1-key,notSetValue);};
reversedSequence.has=function(key)
{return iterable.has(useKeys?key:-1-key);};
reversedSequence.includes=function(value){return iterable.includes(value);};
reversedSequence.cacheResult=cacheResultThrough;
reversedSequence.__iterate=function(fn,reverse){var this$0=this;
return iterable.__iterate(function(v,k){return fn(v,k,this$0);},!reverse);};

reversedSequence.__iterator=
function(type,reverse){return iterable.__iterator(type,!reverse);};
return reversedSequence;}



function filterFactory(iterable,predicate,context,useKeys){
var filterSequence=makeSequence(iterable);
if(useKeys){
filterSequence.has=function(key){
var v=iterable.get(key,NOT_SET);
return v!==NOT_SET&&!!predicate.call(context,v,key,iterable);};

filterSequence.get=function(key,notSetValue){
var v=iterable.get(key,NOT_SET);
return v!==NOT_SET&&predicate.call(context,v,key,iterable)?
v:notSetValue;};}


filterSequence.__iterateUncached=function(fn,reverse){var this$0=this;
var iterations=0;
iterable.__iterate(function(v,k,c){
if(predicate.call(context,v,k,c)){
iterations++;
return fn(v,useKeys?k:iterations-1,this$0);}},

reverse);
return iterations;};

filterSequence.__iteratorUncached=function(type,reverse){
var iterator=iterable.__iterator(ITERATE_ENTRIES,reverse);
var iterations=0;
return new Iterator(function(){
while(true){
var step=iterator.next();
if(step.done){
return step;}

var entry=step.value;
var key=entry[0];
var value=entry[1];
if(predicate.call(context,value,key,iterable)){
return iteratorValue(type,useKeys?key:iterations++,value,step);}}});};




return filterSequence;}



function countByFactory(iterable,grouper,context){
var groups=Map().asMutable();
iterable.__iterate(function(v,k){
groups.update(
grouper.call(context,v,k,iterable),
0,
function(a){return a+1;});});


return groups.asImmutable();}



function groupByFactory(iterable,grouper,context){
var isKeyedIter=isKeyed(iterable);
var groups=(isOrdered(iterable)?OrderedMap():Map()).asMutable();
iterable.__iterate(function(v,k){
groups.update(
grouper.call(context,v,k,iterable),
function(a){return a=a||[],a.push(isKeyedIter?[k,v]:v),a;});});


var coerce=iterableClass(iterable);
return groups.map(function(arr){return reify(iterable,coerce(arr));});}



function sliceFactory(iterable,begin,end,useKeys){
var originalSize=iterable.size;



if(begin!==undefined){
begin=begin|0;}

if(end!==undefined){
end=end|0;}


if(wholeSlice(begin,end,originalSize)){
return iterable;}


var resolvedBegin=resolveBegin(begin,originalSize);
var resolvedEnd=resolveEnd(end,originalSize);




if(resolvedBegin!==resolvedBegin||resolvedEnd!==resolvedEnd){
return sliceFactory(iterable.toSeq().cacheResult(),begin,end,useKeys);}






var resolvedSize=resolvedEnd-resolvedBegin;
var sliceSize;
if(resolvedSize===resolvedSize){
sliceSize=resolvedSize<0?0:resolvedSize;}


var sliceSeq=makeSequence(iterable);



sliceSeq.size=sliceSize===0?sliceSize:iterable.size&&sliceSize||undefined;

if(!useKeys&&isSeq(iterable)&&sliceSize>=0){
sliceSeq.get=function(index,notSetValue){
index=wrapIndex(this,index);
return index>=0&&index<sliceSize?
iterable.get(index+resolvedBegin,notSetValue):
notSetValue;};}



sliceSeq.__iterateUncached=function(fn,reverse){var this$0=this;
if(sliceSize===0){
return 0;}

if(reverse){
return this.cacheResult().__iterate(fn,reverse);}

var skipped=0;
var isSkipping=true;
var iterations=0;
iterable.__iterate(function(v,k){
if(!(isSkipping&&(isSkipping=skipped++<resolvedBegin))){
iterations++;
return fn(v,useKeys?k:iterations-1,this$0)!==false&&
iterations!==sliceSize;}});


return iterations;};


sliceSeq.__iteratorUncached=function(type,reverse){
if(sliceSize!==0&&reverse){
return this.cacheResult().__iterator(type,reverse);}


var iterator=sliceSize!==0&&iterable.__iterator(type,reverse);
var skipped=0;
var iterations=0;
return new Iterator(function(){
while(skipped++<resolvedBegin){
iterator.next();}

if(++iterations>sliceSize){
return iteratorDone();}

var step=iterator.next();
if(useKeys||type===ITERATE_VALUES){
return step;}else 
if(type===ITERATE_KEYS){
return iteratorValue(type,iterations-1,undefined,step);}else 
{
return iteratorValue(type,iterations-1,step.value[1],step);}});};




return sliceSeq;}



function takeWhileFactory(iterable,predicate,context){
var takeSequence=makeSequence(iterable);
takeSequence.__iterateUncached=function(fn,reverse){var this$0=this;
if(reverse){
return this.cacheResult().__iterate(fn,reverse);}

var iterations=0;
iterable.__iterate(function(v,k,c)
{return predicate.call(context,v,k,c)&&++iterations&&fn(v,k,this$0);});

return iterations;};

takeSequence.__iteratorUncached=function(type,reverse){var this$0=this;
if(reverse){
return this.cacheResult().__iterator(type,reverse);}

var iterator=iterable.__iterator(ITERATE_ENTRIES,reverse);
var iterating=true;
return new Iterator(function(){
if(!iterating){
return iteratorDone();}

var step=iterator.next();
if(step.done){
return step;}

var entry=step.value;
var k=entry[0];
var v=entry[1];
if(!predicate.call(context,v,k,this$0)){
iterating=false;
return iteratorDone();}

return type===ITERATE_ENTRIES?step:
iteratorValue(type,k,v,step);});};


return takeSequence;}



function skipWhileFactory(iterable,predicate,context,useKeys){
var skipSequence=makeSequence(iterable);
skipSequence.__iterateUncached=function(fn,reverse){var this$0=this;
if(reverse){
return this.cacheResult().__iterate(fn,reverse);}

var isSkipping=true;
var iterations=0;
iterable.__iterate(function(v,k,c){
if(!(isSkipping&&(isSkipping=predicate.call(context,v,k,c)))){
iterations++;
return fn(v,useKeys?k:iterations-1,this$0);}});


return iterations;};

skipSequence.__iteratorUncached=function(type,reverse){var this$0=this;
if(reverse){
return this.cacheResult().__iterator(type,reverse);}

var iterator=iterable.__iterator(ITERATE_ENTRIES,reverse);
var skipping=true;
var iterations=0;
return new Iterator(function(){
var step,k,v;
do {
step=iterator.next();
if(step.done){
if(useKeys||type===ITERATE_VALUES){
return step;}else 
if(type===ITERATE_KEYS){
return iteratorValue(type,iterations++,undefined,step);}else 
{
return iteratorValue(type,iterations++,step.value[1],step);}}


var entry=step.value;
k=entry[0];
v=entry[1];
skipping&&(skipping=predicate.call(context,v,k,this$0));}while(
skipping);
return type===ITERATE_ENTRIES?step:
iteratorValue(type,k,v,step);});};


return skipSequence;}



function concatFactory(iterable,values){
var isKeyedIterable=isKeyed(iterable);
var iters=[iterable].concat(values).map(function(v){
if(!isIterable(v)){
v=isKeyedIterable?
keyedSeqFromValue(v):
indexedSeqFromValue(Array.isArray(v)?v:[v]);}else 
if(isKeyedIterable){
v=KeyedIterable(v);}

return v;}).
filter(function(v){return v.size!==0;});

if(iters.length===0){
return iterable;}


if(iters.length===1){
var singleton=iters[0];
if(singleton===iterable||
isKeyedIterable&&isKeyed(singleton)||
isIndexed(iterable)&&isIndexed(singleton)){
return singleton;}}



var concatSeq=new ArraySeq(iters);
if(isKeyedIterable){
concatSeq=concatSeq.toKeyedSeq();}else 
if(!isIndexed(iterable)){
concatSeq=concatSeq.toSetSeq();}

concatSeq=concatSeq.flatten(true);
concatSeq.size=iters.reduce(
function(sum,seq){
if(sum!==undefined){
var size=seq.size;
if(size!==undefined){
return sum+size;}}},



0);

return concatSeq;}



function flattenFactory(iterable,depth,useKeys){
var flatSequence=makeSequence(iterable);
flatSequence.__iterateUncached=function(fn,reverse){
var iterations=0;
var stopped=false;
function flatDeep(iter,currentDepth){var this$0=this;
iter.__iterate(function(v,k){
if((!depth||currentDepth<depth)&&isIterable(v)){
flatDeep(v,currentDepth+1);}else 
if(fn(v,useKeys?k:iterations++,this$0)===false){
stopped=true;}

return !stopped;},
reverse);}

flatDeep(iterable,0);
return iterations;};

flatSequence.__iteratorUncached=function(type,reverse){
var iterator=iterable.__iterator(type,reverse);
var stack=[];
var iterations=0;
return new Iterator(function(){
while(iterator){
var step=iterator.next();
if(step.done!==false){
iterator=stack.pop();
continue;}

var v=step.value;
if(type===ITERATE_ENTRIES){
v=v[1];}

if((!depth||stack.length<depth)&&isIterable(v)){
stack.push(iterator);
iterator=v.__iterator(type,reverse);}else 
{
return useKeys?step:iteratorValue(type,iterations++,v,step);}}


return iteratorDone();});};


return flatSequence;}



function flatMapFactory(iterable,mapper,context){
var coerce=iterableClass(iterable);
return iterable.toSeq().map(
function(v,k){return coerce(mapper.call(context,v,k,iterable));}).
flatten(true);}



function interposeFactory(iterable,separator){
var interposedSequence=makeSequence(iterable);
interposedSequence.size=iterable.size&&iterable.size*2-1;
interposedSequence.__iterateUncached=function(fn,reverse){var this$0=this;
var iterations=0;
iterable.__iterate(function(v,k)
{return (!iterations||fn(separator,iterations++,this$0)!==false)&&
fn(v,iterations++,this$0)!==false;},
reverse);

return iterations;};

interposedSequence.__iteratorUncached=function(type,reverse){
var iterator=iterable.__iterator(ITERATE_VALUES,reverse);
var iterations=0;
var step;
return new Iterator(function(){
if(!step||iterations%2){
step=iterator.next();
if(step.done){
return step;}}


return iterations%2?
iteratorValue(type,iterations++,separator):
iteratorValue(type,iterations++,step.value,step);});};


return interposedSequence;}



function sortFactory(iterable,comparator,mapper){
if(!comparator){
comparator=defaultComparator;}

var isKeyedIterable=isKeyed(iterable);
var index=0;
var entries=iterable.toSeq().map(
function(v,k){return [k,v,index++,mapper?mapper(v,k,iterable):v];}).
toArray();
entries.sort(function(a,b){return comparator(a[3],b[3])||a[2]-b[2];}).forEach(
isKeyedIterable?
function(v,i){entries[i].length=2;}:
function(v,i){entries[i]=v[1];});

return isKeyedIterable?KeyedSeq(entries):
isIndexed(iterable)?IndexedSeq(entries):
SetSeq(entries);}



function maxFactory(iterable,comparator,mapper){
if(!comparator){
comparator=defaultComparator;}

if(mapper){
var entry=iterable.toSeq().
map(function(v,k){return [v,mapper(v,k,iterable)];}).
reduce(function(a,b){return maxCompare(comparator,a[1],b[1])?b:a;});
return entry&&entry[0];}else 
{
return iterable.reduce(function(a,b){return maxCompare(comparator,a,b)?b:a;});}}



function maxCompare(comparator,a,b){
var comp=comparator(b,a);


return comp===0&&b!==a&&(b===undefined||b===null||b!==b)||comp>0;}



function zipWithFactory(keyIter,zipper,iters){
var zipSequence=makeSequence(keyIter);
zipSequence.size=new ArraySeq(iters).map(function(i){return i.size;}).min();


zipSequence.__iterate=function(fn,reverse){













var iterator=this.__iterator(ITERATE_VALUES,reverse);
var step;
var iterations=0;
while(!(step=iterator.next()).done){
if(fn(step.value,iterations++,this)===false){
break;}}


return iterations;};

zipSequence.__iteratorUncached=function(type,reverse){
var iterators=iters.map(function(i)
{return i=Iterable(i),getIterator(reverse?i.reverse():i);});

var iterations=0;
var isDone=false;
return new Iterator(function(){
var steps;
if(!isDone){
steps=iterators.map(function(i){return i.next();});
isDone=steps.some(function(s){return s.done;});}

if(isDone){
return iteratorDone();}

return iteratorValue(
type,
iterations++,
zipper.apply(null,steps.map(function(s){return s.value;})));});};



return zipSequence;}





function reify(iter,seq){
return isSeq(iter)?seq:iter.constructor(seq);}


function validateEntry(entry){
if(entry!==Object(entry)){
throw new TypeError('Expected [K, V] tuple: '+entry);}}



function resolveSize(iter){
assertNotInfinite(iter.size);
return ensureSize(iter);}


function iterableClass(iterable){
return isKeyed(iterable)?KeyedIterable:
isIndexed(iterable)?IndexedIterable:
SetIterable;}


function makeSequence(iterable){
return Object.create(
(
isKeyed(iterable)?KeyedSeq:
isIndexed(iterable)?IndexedSeq:
SetSeq).
prototype);}



function cacheResultThrough(){
if(this._iter.cacheResult){
this._iter.cacheResult();
this.size=this._iter.size;
return this;}else 
{
return Seq.prototype.cacheResult.call(this);}}



function defaultComparator(a,b){
return a>b?1:a<b?-1:0;}


function forceIterator(keyPath){
var iter=getIterator(keyPath);
if(!iter){


if(!isArrayLike(keyPath)){
throw new TypeError('Expected iterable or array-like: '+keyPath);}

iter=getIterator(Iterable(keyPath));}

return iter;}


createClass(Record,KeyedCollection);

function Record(defaultValues,name){
var hasInitialized;

var RecordType=function Record(values){
if(values instanceof RecordType){
return values;}

if(!(this instanceof RecordType)){
return new RecordType(values);}

if(!hasInitialized){
hasInitialized=true;
var keys=Object.keys(defaultValues);
setProps(RecordTypePrototype,keys);
RecordTypePrototype.size=keys.length;
RecordTypePrototype._name=name;
RecordTypePrototype._keys=keys;
RecordTypePrototype._defaultValues=defaultValues;}

this._map=Map(values);};


var RecordTypePrototype=RecordType.prototype=Object.create(RecordPrototype);
RecordTypePrototype.constructor=RecordType;

return RecordType;}


Record.prototype.toString=function(){
return this.__toString(recordName(this)+' {','}');};




Record.prototype.has=function(k){
return this._defaultValues.hasOwnProperty(k);};


Record.prototype.get=function(k,notSetValue){
if(!this.has(k)){
return notSetValue;}

var defaultVal=this._defaultValues[k];
return this._map?this._map.get(k,defaultVal):defaultVal;};




Record.prototype.clear=function(){
if(this.__ownerID){
this._map&&this._map.clear();
return this;}

var RecordType=this.constructor;
return RecordType._empty||(RecordType._empty=makeRecord(this,emptyMap()));};


Record.prototype.set=function(k,v){
if(!this.has(k)){
throw new Error('Cannot set unknown key "'+k+'" on '+recordName(this));}

var newMap=this._map&&this._map.set(k,v);
if(this.__ownerID||newMap===this._map){
return this;}

return makeRecord(this,newMap);};


Record.prototype.remove=function(k){
if(!this.has(k)){
return this;}

var newMap=this._map&&this._map.remove(k);
if(this.__ownerID||newMap===this._map){
return this;}

return makeRecord(this,newMap);};


Record.prototype.wasAltered=function(){
return this._map.wasAltered();};


Record.prototype.__iterator=function(type,reverse){var this$0=this;
return KeyedIterable(this._defaultValues).map(function(_,k){return this$0.get(k);}).__iterator(type,reverse);};


Record.prototype.__iterate=function(fn,reverse){var this$0=this;
return KeyedIterable(this._defaultValues).map(function(_,k){return this$0.get(k);}).__iterate(fn,reverse);};


Record.prototype.__ensureOwner=function(ownerID){
if(ownerID===this.__ownerID){
return this;}

var newMap=this._map&&this._map.__ensureOwner(ownerID);
if(!ownerID){
this.__ownerID=ownerID;
this._map=newMap;
return this;}

return makeRecord(this,newMap,ownerID);};



var RecordPrototype=Record.prototype;
RecordPrototype[DELETE]=RecordPrototype.remove;
RecordPrototype.deleteIn=
RecordPrototype.removeIn=MapPrototype.removeIn;
RecordPrototype.merge=MapPrototype.merge;
RecordPrototype.mergeWith=MapPrototype.mergeWith;
RecordPrototype.mergeIn=MapPrototype.mergeIn;
RecordPrototype.mergeDeep=MapPrototype.mergeDeep;
RecordPrototype.mergeDeepWith=MapPrototype.mergeDeepWith;
RecordPrototype.mergeDeepIn=MapPrototype.mergeDeepIn;
RecordPrototype.setIn=MapPrototype.setIn;
RecordPrototype.update=MapPrototype.update;
RecordPrototype.updateIn=MapPrototype.updateIn;
RecordPrototype.withMutations=MapPrototype.withMutations;
RecordPrototype.asMutable=MapPrototype.asMutable;
RecordPrototype.asImmutable=MapPrototype.asImmutable;


function makeRecord(likeRecord,map,ownerID){
var record=Object.create(Object.getPrototypeOf(likeRecord));
record._map=map;
record.__ownerID=ownerID;
return record;}


function recordName(record){
return record._name||record.constructor.name||'Record';}


function setProps(prototype,names){
try{
names.forEach(setProp.bind(undefined,prototype));}
catch(error){}}




function setProp(prototype,name){
Object.defineProperty(prototype,name,{
get:function(){
return this.get(name);},

set:function(value){
invariant(this.__ownerID,'Cannot set on an immutable record.');
this.set(name,value);}});}




createClass(Set,SetCollection);



function Set(value){
return value===null||value===undefined?emptySet():
isSet(value)&&!isOrdered(value)?value:
emptySet().withMutations(function(set){
var iter=SetIterable(value);
assertNotInfinite(iter.size);
iter.forEach(function(v){return set.add(v);});});}



Set.of=function(){
return this(arguments);};


Set.fromKeys=function(value){
return this(KeyedIterable(value).keySeq());};


Set.prototype.toString=function(){
return this.__toString('Set {','}');};




Set.prototype.has=function(value){
return this._map.has(value);};




Set.prototype.add=function(value){
return updateSet(this,this._map.set(value,true));};


Set.prototype.remove=function(value){
return updateSet(this,this._map.remove(value));};


Set.prototype.clear=function(){
return updateSet(this,this._map.clear());};




Set.prototype.union=function(){var iters=SLICE$0.call(arguments,0);
iters=iters.filter(function(x){return x.size!==0;});
if(iters.length===0){
return this;}

if(this.size===0&&!this.__ownerID&&iters.length===1){
return this.constructor(iters[0]);}

return this.withMutations(function(set){
for(var ii=0;ii<iters.length;ii++){
SetIterable(iters[ii]).forEach(function(value){return set.add(value);});}});};




Set.prototype.intersect=function(){var iters=SLICE$0.call(arguments,0);
if(iters.length===0){
return this;}

iters=iters.map(function(iter){return SetIterable(iter);});
var originalSet=this;
return this.withMutations(function(set){
originalSet.forEach(function(value){
if(!iters.every(function(iter){return iter.includes(value);})){
set.remove(value);}});});};





Set.prototype.subtract=function(){var iters=SLICE$0.call(arguments,0);
if(iters.length===0){
return this;}

iters=iters.map(function(iter){return SetIterable(iter);});
var originalSet=this;
return this.withMutations(function(set){
originalSet.forEach(function(value){
if(iters.some(function(iter){return iter.includes(value);})){
set.remove(value);}});});};





Set.prototype.merge=function(){
return this.union.apply(this,arguments);};


Set.prototype.mergeWith=function(merger){var iters=SLICE$0.call(arguments,1);
return this.union.apply(this,iters);};


Set.prototype.sort=function(comparator){

return OrderedSet(sortFactory(this,comparator));};


Set.prototype.sortBy=function(mapper,comparator){

return OrderedSet(sortFactory(this,comparator,mapper));};


Set.prototype.wasAltered=function(){
return this._map.wasAltered();};


Set.prototype.__iterate=function(fn,reverse){var this$0=this;
return this._map.__iterate(function(_,k){return fn(k,k,this$0);},reverse);};


Set.prototype.__iterator=function(type,reverse){
return this._map.map(function(_,k){return k;}).__iterator(type,reverse);};


Set.prototype.__ensureOwner=function(ownerID){
if(ownerID===this.__ownerID){
return this;}

var newMap=this._map.__ensureOwner(ownerID);
if(!ownerID){
this.__ownerID=ownerID;
this._map=newMap;
return this;}

return this.__make(newMap,ownerID);};



function isSet(maybeSet){
return !!(maybeSet&&maybeSet[IS_SET_SENTINEL]);}


Set.isSet=isSet;

var IS_SET_SENTINEL='@@__IMMUTABLE_SET__@@';

var SetPrototype=Set.prototype;
SetPrototype[IS_SET_SENTINEL]=true;
SetPrototype[DELETE]=SetPrototype.remove;
SetPrototype.mergeDeep=SetPrototype.merge;
SetPrototype.mergeDeepWith=SetPrototype.mergeWith;
SetPrototype.withMutations=MapPrototype.withMutations;
SetPrototype.asMutable=MapPrototype.asMutable;
SetPrototype.asImmutable=MapPrototype.asImmutable;

SetPrototype.__empty=emptySet;
SetPrototype.__make=makeSet;

function updateSet(set,newMap){
if(set.__ownerID){
set.size=newMap.size;
set._map=newMap;
return set;}

return newMap===set._map?set:
newMap.size===0?set.__empty():
set.__make(newMap);}


function makeSet(map,ownerID){
var set=Object.create(SetPrototype);
set.size=map?map.size:0;
set._map=map;
set.__ownerID=ownerID;
return set;}


var EMPTY_SET;
function emptySet(){
return EMPTY_SET||(EMPTY_SET=makeSet(emptyMap()));}


createClass(OrderedSet,Set);



function OrderedSet(value){
return value===null||value===undefined?emptyOrderedSet():
isOrderedSet(value)?value:
emptyOrderedSet().withMutations(function(set){
var iter=SetIterable(value);
assertNotInfinite(iter.size);
iter.forEach(function(v){return set.add(v);});});}



OrderedSet.of=function(){
return this(arguments);};


OrderedSet.fromKeys=function(value){
return this(KeyedIterable(value).keySeq());};


OrderedSet.prototype.toString=function(){
return this.__toString('OrderedSet {','}');};



function isOrderedSet(maybeOrderedSet){
return isSet(maybeOrderedSet)&&isOrdered(maybeOrderedSet);}


OrderedSet.isOrderedSet=isOrderedSet;

var OrderedSetPrototype=OrderedSet.prototype;
OrderedSetPrototype[IS_ORDERED_SENTINEL]=true;

OrderedSetPrototype.__empty=emptyOrderedSet;
OrderedSetPrototype.__make=makeOrderedSet;

function makeOrderedSet(map,ownerID){
var set=Object.create(OrderedSetPrototype);
set.size=map?map.size:0;
set._map=map;
set.__ownerID=ownerID;
return set;}


var EMPTY_ORDERED_SET;
function emptyOrderedSet(){
return EMPTY_ORDERED_SET||(EMPTY_ORDERED_SET=makeOrderedSet(emptyOrderedMap()));}


createClass(Stack,IndexedCollection);



function Stack(value){
return value===null||value===undefined?emptyStack():
isStack(value)?value:
emptyStack().unshiftAll(value);}


Stack.of=function(){
return this(arguments);};


Stack.prototype.toString=function(){
return this.__toString('Stack [',']');};




Stack.prototype.get=function(index,notSetValue){
var head=this._head;
index=wrapIndex(this,index);
while(head&&index--){
head=head.next;}

return head?head.value:notSetValue;};


Stack.prototype.peek=function(){
return this._head&&this._head.value;};




Stack.prototype.push=function(){
if(arguments.length===0){
return this;}

var newSize=this.size+arguments.length;
var head=this._head;
for(var ii=arguments.length-1;ii>=0;ii--){
head={
value:arguments[ii],
next:head};}


if(this.__ownerID){
this.size=newSize;
this._head=head;
this.__hash=undefined;
this.__altered=true;
return this;}

return makeStack(newSize,head);};


Stack.prototype.pushAll=function(iter){
iter=IndexedIterable(iter);
if(iter.size===0){
return this;}

assertNotInfinite(iter.size);
var newSize=this.size;
var head=this._head;
iter.reverse().forEach(function(value){
newSize++;
head={
value:value,
next:head};});


if(this.__ownerID){
this.size=newSize;
this._head=head;
this.__hash=undefined;
this.__altered=true;
return this;}

return makeStack(newSize,head);};


Stack.prototype.pop=function(){
return this.slice(1);};


Stack.prototype.unshift=function(){
return this.push.apply(this,arguments);};


Stack.prototype.unshiftAll=function(iter){
return this.pushAll(iter);};


Stack.prototype.shift=function(){
return this.pop.apply(this,arguments);};


Stack.prototype.clear=function(){
if(this.size===0){
return this;}

if(this.__ownerID){
this.size=0;
this._head=undefined;
this.__hash=undefined;
this.__altered=true;
return this;}

return emptyStack();};


Stack.prototype.slice=function(begin,end){
if(wholeSlice(begin,end,this.size)){
return this;}

var resolvedBegin=resolveBegin(begin,this.size);
var resolvedEnd=resolveEnd(end,this.size);
if(resolvedEnd!==this.size){

return IndexedCollection.prototype.slice.call(this,begin,end);}

var newSize=this.size-resolvedBegin;
var head=this._head;
while(resolvedBegin--){
head=head.next;}

if(this.__ownerID){
this.size=newSize;
this._head=head;
this.__hash=undefined;
this.__altered=true;
return this;}

return makeStack(newSize,head);};




Stack.prototype.__ensureOwner=function(ownerID){
if(ownerID===this.__ownerID){
return this;}

if(!ownerID){
this.__ownerID=ownerID;
this.__altered=false;
return this;}

return makeStack(this.size,this._head,ownerID,this.__hash);};




Stack.prototype.__iterate=function(fn,reverse){
if(reverse){
return this.reverse().__iterate(fn);}

var iterations=0;
var node=this._head;
while(node){
if(fn(node.value,iterations++,this)===false){
break;}

node=node.next;}

return iterations;};


Stack.prototype.__iterator=function(type,reverse){
if(reverse){
return this.reverse().__iterator(type);}

var iterations=0;
var node=this._head;
return new Iterator(function(){
if(node){
var value=node.value;
node=node.next;
return iteratorValue(type,iterations++,value);}

return iteratorDone();});};




function isStack(maybeStack){
return !!(maybeStack&&maybeStack[IS_STACK_SENTINEL]);}


Stack.isStack=isStack;

var IS_STACK_SENTINEL='@@__IMMUTABLE_STACK__@@';

var StackPrototype=Stack.prototype;
StackPrototype[IS_STACK_SENTINEL]=true;
StackPrototype.withMutations=MapPrototype.withMutations;
StackPrototype.asMutable=MapPrototype.asMutable;
StackPrototype.asImmutable=MapPrototype.asImmutable;
StackPrototype.wasAltered=MapPrototype.wasAltered;


function makeStack(size,head,ownerID,hash){
var map=Object.create(StackPrototype);
map.size=size;
map._head=head;
map.__ownerID=ownerID;
map.__hash=hash;
map.__altered=false;
return map;}


var EMPTY_STACK;
function emptyStack(){
return EMPTY_STACK||(EMPTY_STACK=makeStack(0));}





function mixin(ctor,methods){
var keyCopier=function(key){ctor.prototype[key]=methods[key];};
Object.keys(methods).forEach(keyCopier);
Object.getOwnPropertySymbols&&
Object.getOwnPropertySymbols(methods).forEach(keyCopier);
return ctor;}


Iterable.Iterator=Iterator;

mixin(Iterable,{



toArray:function(){
assertNotInfinite(this.size);
var array=new Array(this.size||0);
this.valueSeq().__iterate(function(v,i){array[i]=v;});
return array;},


toIndexedSeq:function(){
return new ToIndexedSequence(this);},


toJS:function(){
return this.toSeq().map(
function(value){return value&&typeof value.toJS==='function'?value.toJS():value;}).
__toJS();},


toJSON:function(){
return this.toSeq().map(
function(value){return value&&typeof value.toJSON==='function'?value.toJSON():value;}).
__toJS();},


toKeyedSeq:function(){
return new ToKeyedSequence(this,true);},


toMap:function(){

return Map(this.toKeyedSeq());},


toObject:function(){
assertNotInfinite(this.size);
var object={};
this.__iterate(function(v,k){object[k]=v;});
return object;},


toOrderedMap:function(){

return OrderedMap(this.toKeyedSeq());},


toOrderedSet:function(){

return OrderedSet(isKeyed(this)?this.valueSeq():this);},


toSet:function(){

return Set(isKeyed(this)?this.valueSeq():this);},


toSetSeq:function(){
return new ToSetSequence(this);},


toSeq:function(){
return isIndexed(this)?this.toIndexedSeq():
isKeyed(this)?this.toKeyedSeq():
this.toSetSeq();},


toStack:function(){

return Stack(isKeyed(this)?this.valueSeq():this);},


toList:function(){

return List(isKeyed(this)?this.valueSeq():this);},





toString:function(){
return '[Iterable]';},


__toString:function(head,tail){
if(this.size===0){
return head+tail;}

return head+' '+this.toSeq().map(this.__toStringMapper).join(', ')+' '+tail;},





concat:function(){var values=SLICE$0.call(arguments,0);
return reify(this,concatFactory(this,values));},


includes:function(searchValue){
return this.some(function(value){return is(value,searchValue);});},


entries:function(){
return this.__iterator(ITERATE_ENTRIES);},


every:function(predicate,context){
assertNotInfinite(this.size);
var returnValue=true;
this.__iterate(function(v,k,c){
if(!predicate.call(context,v,k,c)){
returnValue=false;
return false;}});


return returnValue;},


filter:function(predicate,context){
return reify(this,filterFactory(this,predicate,context,true));},


find:function(predicate,context,notSetValue){
var entry=this.findEntry(predicate,context);
return entry?entry[1]:notSetValue;},


findEntry:function(predicate,context){
var found;
this.__iterate(function(v,k,c){
if(predicate.call(context,v,k,c)){
found=[k,v];
return false;}});


return found;},


findLastEntry:function(predicate,context){
return this.toSeq().reverse().findEntry(predicate,context);},


forEach:function(sideEffect,context){
assertNotInfinite(this.size);
return this.__iterate(context?sideEffect.bind(context):sideEffect);},


join:function(separator){
assertNotInfinite(this.size);
separator=separator!==undefined?''+separator:',';
var joined='';
var isFirst=true;
this.__iterate(function(v){
isFirst?isFirst=false:joined+=separator;
joined+=v!==null&&v!==undefined?v.toString():'';});

return joined;},


keys:function(){
return this.__iterator(ITERATE_KEYS);},


map:function(mapper,context){
return reify(this,mapFactory(this,mapper,context));},


reduce:function(reducer,initialReduction,context){
assertNotInfinite(this.size);
var reduction;
var useFirst;
if(arguments.length<2){
useFirst=true;}else 
{
reduction=initialReduction;}

this.__iterate(function(v,k,c){
if(useFirst){
useFirst=false;
reduction=v;}else 
{
reduction=reducer.call(context,reduction,v,k,c);}});


return reduction;},


reduceRight:function(reducer,initialReduction,context){
var reversed=this.toKeyedSeq().reverse();
return reversed.reduce.apply(reversed,arguments);},


reverse:function(){
return reify(this,reverseFactory(this,true));},


slice:function(begin,end){
return reify(this,sliceFactory(this,begin,end,true));},


some:function(predicate,context){
return !this.every(not(predicate),context);},


sort:function(comparator){
return reify(this,sortFactory(this,comparator));},


values:function(){
return this.__iterator(ITERATE_VALUES);},





butLast:function(){
return this.slice(0,-1);},


isEmpty:function(){
return this.size!==undefined?this.size===0:!this.some(function(){return true;});},


count:function(predicate,context){
return ensureSize(
predicate?this.toSeq().filter(predicate,context):this);},



countBy:function(grouper,context){
return countByFactory(this,grouper,context);},


equals:function(other){
return deepEqual(this,other);},


entrySeq:function(){
var iterable=this;
if(iterable._cache){

return new ArraySeq(iterable._cache);}

var entriesSequence=iterable.toSeq().map(entryMapper).toIndexedSeq();
entriesSequence.fromEntrySeq=function(){return iterable.toSeq();};
return entriesSequence;},


filterNot:function(predicate,context){
return this.filter(not(predicate),context);},


findLast:function(predicate,context,notSetValue){
return this.toKeyedSeq().reverse().find(predicate,context,notSetValue);},


first:function(){
return this.find(returnTrue);},


flatMap:function(mapper,context){
return reify(this,flatMapFactory(this,mapper,context));},


flatten:function(depth){
return reify(this,flattenFactory(this,depth,true));},


fromEntrySeq:function(){
return new FromEntriesSequence(this);},


get:function(searchKey,notSetValue){
return this.find(function(_,key){return is(key,searchKey);},undefined,notSetValue);},


getIn:function(searchKeyPath,notSetValue){
var nested=this;


var iter=forceIterator(searchKeyPath);
var step;
while(!(step=iter.next()).done){
var key=step.value;
nested=nested&&nested.get?nested.get(key,NOT_SET):NOT_SET;
if(nested===NOT_SET){
return notSetValue;}}


return nested;},


groupBy:function(grouper,context){
return groupByFactory(this,grouper,context);},


has:function(searchKey){
return this.get(searchKey,NOT_SET)!==NOT_SET;},


hasIn:function(searchKeyPath){
return this.getIn(searchKeyPath,NOT_SET)!==NOT_SET;},


isSubset:function(iter){
iter=typeof iter.includes==='function'?iter:Iterable(iter);
return this.every(function(value){return iter.includes(value);});},


isSuperset:function(iter){
iter=typeof iter.isSubset==='function'?iter:Iterable(iter);
return iter.isSubset(this);},


keySeq:function(){
return this.toSeq().map(keyMapper).toIndexedSeq();},


last:function(){
return this.toSeq().reverse().first();},


max:function(comparator){
return maxFactory(this,comparator);},


maxBy:function(mapper,comparator){
return maxFactory(this,comparator,mapper);},


min:function(comparator){
return maxFactory(this,comparator?neg(comparator):defaultNegComparator);},


minBy:function(mapper,comparator){
return maxFactory(this,comparator?neg(comparator):defaultNegComparator,mapper);},


rest:function(){
return this.slice(1);},


skip:function(amount){
return this.slice(Math.max(0,amount));},


skipLast:function(amount){
return reify(this,this.toSeq().reverse().skip(amount).reverse());},


skipWhile:function(predicate,context){
return reify(this,skipWhileFactory(this,predicate,context,true));},


skipUntil:function(predicate,context){
return this.skipWhile(not(predicate),context);},


sortBy:function(mapper,comparator){
return reify(this,sortFactory(this,comparator,mapper));},


take:function(amount){
return this.slice(0,Math.max(0,amount));},


takeLast:function(amount){
return reify(this,this.toSeq().reverse().take(amount).reverse());},


takeWhile:function(predicate,context){
return reify(this,takeWhileFactory(this,predicate,context));},


takeUntil:function(predicate,context){
return this.takeWhile(not(predicate),context);},


valueSeq:function(){
return this.toIndexedSeq();},





hashCode:function(){
return this.__hash||(this.__hash=hashIterable(this));}});















var IterablePrototype=Iterable.prototype;
IterablePrototype[IS_ITERABLE_SENTINEL]=true;
IterablePrototype[ITERATOR_SYMBOL]=IterablePrototype.values;
IterablePrototype.__toJS=IterablePrototype.toArray;
IterablePrototype.__toStringMapper=quoteString;
IterablePrototype.inspect=
IterablePrototype.toSource=function(){return this.toString();};
IterablePrototype.chain=IterablePrototype.flatMap;
IterablePrototype.contains=IterablePrototype.includes;


(function(){
try{
Object.defineProperty(IterablePrototype,'length',{
get:function(){
if(!Iterable.noLengthWarning){
var stack;
try{
throw new Error();}
catch(error){
stack=error.stack;}

if(stack.indexOf('_wrapObject')===-1){
console&&console.warn&&console.warn(
'iterable.length has been deprecated, '+
'use iterable.size or iterable.count(). '+
'This warning will become a silent error in a future version. '+
stack);

return this.size;}}}});}




catch(e){}})();




mixin(KeyedIterable,{



flip:function(){
return reify(this,flipFactory(this));},


findKey:function(predicate,context){
var entry=this.findEntry(predicate,context);
return entry&&entry[0];},


findLastKey:function(predicate,context){
return this.toSeq().reverse().findKey(predicate,context);},


keyOf:function(searchValue){
return this.findKey(function(value){return is(value,searchValue);});},


lastKeyOf:function(searchValue){
return this.findLastKey(function(value){return is(value,searchValue);});},


mapEntries:function(mapper,context){var this$0=this;
var iterations=0;
return reify(this,
this.toSeq().map(
function(v,k){return mapper.call(context,[k,v],iterations++,this$0);}).
fromEntrySeq());},



mapKeys:function(mapper,context){var this$0=this;
return reify(this,
this.toSeq().flip().map(
function(k,v){return mapper.call(context,k,v,this$0);}).
flip());}});





var KeyedIterablePrototype=KeyedIterable.prototype;
KeyedIterablePrototype[IS_KEYED_SENTINEL]=true;
KeyedIterablePrototype[ITERATOR_SYMBOL]=IterablePrototype.entries;
KeyedIterablePrototype.__toJS=IterablePrototype.toObject;
KeyedIterablePrototype.__toStringMapper=function(v,k){return JSON.stringify(k)+': '+quoteString(v);};



mixin(IndexedIterable,{



toKeyedSeq:function(){
return new ToKeyedSequence(this,false);},





filter:function(predicate,context){
return reify(this,filterFactory(this,predicate,context,false));},


findIndex:function(predicate,context){
var entry=this.findEntry(predicate,context);
return entry?entry[0]:-1;},


indexOf:function(searchValue){
var key=this.toKeyedSeq().keyOf(searchValue);
return key===undefined?-1:key;},


lastIndexOf:function(searchValue){
var key=this.toKeyedSeq().reverse().keyOf(searchValue);
return key===undefined?-1:key;},





reverse:function(){
return reify(this,reverseFactory(this,false));},


slice:function(begin,end){
return reify(this,sliceFactory(this,begin,end,false));},


splice:function(index,removeNum){
var numArgs=arguments.length;
removeNum=Math.max(removeNum|0,0);
if(numArgs===0||numArgs===2&&!removeNum){
return this;}




index=resolveBegin(index,index<0?this.count():this.size);
var spliced=this.slice(0,index);
return reify(
this,
numArgs===1?
spliced:
spliced.concat(arrCopy(arguments,2),this.slice(index+removeNum)));},






findLastIndex:function(predicate,context){
var key=this.toKeyedSeq().findLastKey(predicate,context);
return key===undefined?-1:key;},


first:function(){
return this.get(0);},


flatten:function(depth){
return reify(this,flattenFactory(this,depth,false));},


get:function(index,notSetValue){
index=wrapIndex(this,index);
return index<0||this.size===Infinity||
this.size!==undefined&&index>this.size?
notSetValue:
this.find(function(_,key){return key===index;},undefined,notSetValue);},


has:function(index){
index=wrapIndex(this,index);
return index>=0&&(this.size!==undefined?
this.size===Infinity||index<this.size:
this.indexOf(index)!==-1);},



interpose:function(separator){
return reify(this,interposeFactory(this,separator));},


interleave:function(){
var iterables=[this].concat(arrCopy(arguments));
var zipped=zipWithFactory(this.toSeq(),IndexedSeq.of,iterables);
var interleaved=zipped.flatten(true);
if(zipped.size){
interleaved.size=zipped.size*iterables.length;}

return reify(this,interleaved);},


last:function(){
return this.get(-1);},


skipWhile:function(predicate,context){
return reify(this,skipWhileFactory(this,predicate,context,false));},


zip:function(){
var iterables=[this].concat(arrCopy(arguments));
return reify(this,zipWithFactory(this,defaultZipper,iterables));},


zipWith:function(zipper){
var iterables=arrCopy(arguments);
iterables[0]=this;
return reify(this,zipWithFactory(this,zipper,iterables));}});




IndexedIterable.prototype[IS_INDEXED_SENTINEL]=true;
IndexedIterable.prototype[IS_ORDERED_SENTINEL]=true;



mixin(SetIterable,{



get:function(value,notSetValue){
return this.has(value)?value:notSetValue;},


includes:function(value){
return this.has(value);},





keySeq:function(){
return this.valueSeq();}});




SetIterable.prototype.has=IterablePrototype.includes;




mixin(KeyedSeq,KeyedIterable.prototype);
mixin(IndexedSeq,IndexedIterable.prototype);
mixin(SetSeq,SetIterable.prototype);

mixin(KeyedCollection,KeyedIterable.prototype);
mixin(IndexedCollection,IndexedIterable.prototype);
mixin(SetCollection,SetIterable.prototype);




function keyMapper(v,k){
return k;}


function entryMapper(v,k){
return [k,v];}


function not(predicate){
return function(){
return !predicate.apply(this,arguments);};}



function neg(predicate){
return function(){
return -predicate.apply(this,arguments);};}



function quoteString(value){
return typeof value==='string'?JSON.stringify(value):value;}


function defaultZipper(){
return arrCopy(arguments);}


function defaultNegComparator(a,b){
return a<b?1:a>b?-1:0;}


function hashIterable(iterable){
if(iterable.size===Infinity){
return 0;}

var ordered=isOrdered(iterable);
var keyed=isKeyed(iterable);
var h=ordered?1:0;
var size=iterable.__iterate(
keyed?
ordered?
function(v,k){h=31*h+hashMerge(hash(v),hash(k))|0;}:
function(v,k){h=h+hashMerge(hash(v),hash(k))|0;}:
ordered?
function(v){h=31*h+hash(v)|0;}:
function(v){h=h+hash(v)|0;});

return murmurHashOfSize(size,h);}


function murmurHashOfSize(size,h){
h=imul(h,0xCC9E2D51);
h=imul(h<<15|h>>>-15,0x1B873593);
h=imul(h<<13|h>>>-13,5);
h=(h+0xE6546B64|0)^size;
h=imul(h^h>>>16,0x85EBCA6B);
h=imul(h^h>>>13,0xC2B2AE35);
h=smi(h^h>>>16);
return h;}


function hashMerge(a,b){
return a^b+0x9E3779B9+(a<<6)+(a>>2)|0;}


var Immutable={

Iterable:Iterable,

Seq:Seq,
Collection:Collection,
Map:Map,
OrderedMap:OrderedMap,
List:List,
Stack:Stack,
Set:Set,
OrderedSet:OrderedSet,

Record:Record,
Range:Range,
Repeat:Repeat,

is:is,
fromJS:fromJS};



return Immutable;});
});
__d(196 /* NavigatorBreadcrumbNavigationBar */, function(global, require, module, exports) {'use strict';



























var NavigatorBreadcrumbNavigationBarStyles=require(197 /* NavigatorBreadcrumbNavigationBarStyles */);
var NavigatorNavigationBarStylesAndroid=require(200 /* NavigatorNavigationBarStylesAndroid */);
var NavigatorNavigationBarStylesIOS=require(198 /* NavigatorNavigationBarStylesIOS */);
var Platform=require(4 /* Platform */);
var React=require(47 /* React */);
var StyleSheet=require(148 /* StyleSheet */);
var View=require(127 /* View */);var _require=

require(604 /* immutable */);var Map=_require.Map;

var guid=require(63 /* guid */);
var invariant=require(363 /* fbjs/lib/invariant */);

var Interpolators=NavigatorBreadcrumbNavigationBarStyles.Interpolators;
var NavigatorNavigationBarStyles=Platform.OS==='android'?
NavigatorNavigationBarStylesAndroid:NavigatorNavigationBarStylesIOS;
var PropTypes=React.PropTypes;




var CRUMB_PROPS=Interpolators.map(function(){return {style:{}};});
var ICON_PROPS=Interpolators.map(function(){return {style:{}};});
var SEPARATOR_PROPS=Interpolators.map(function(){return {style:{}};});
var TITLE_PROPS=Interpolators.map(function(){return {style:{}};});
var RIGHT_BUTTON_PROPS=Interpolators.map(function(){return {style:{}};});


var navStatePresentedIndex=function(navState){
if(navState.presentedIndex!==undefined){
return navState.presentedIndex;}


return navState.observedTopOfStack;};










var initStyle=function(index,presentedIndex){
return index===presentedIndex?NavigatorBreadcrumbNavigationBarStyles.Center[index]:
index<presentedIndex?NavigatorBreadcrumbNavigationBarStyles.Left[index]:
NavigatorBreadcrumbNavigationBarStyles.Right[index];};


var NavigatorBreadcrumbNavigationBar=React.createClass({displayName:'NavigatorBreadcrumbNavigationBar',
propTypes:{
navigator:PropTypes.shape({
push:PropTypes.func,
pop:PropTypes.func,
replace:PropTypes.func,
popToRoute:PropTypes.func,
popToTop:PropTypes.func}),

routeMapper:PropTypes.shape({
rightContentForRoute:PropTypes.func,
titleContentForRoute:PropTypes.func,
iconForRoute:PropTypes.func}),

navState:React.PropTypes.shape({
routeStack:React.PropTypes.arrayOf(React.PropTypes.object),
presentedIndex:React.PropTypes.number}),

style:View.propTypes.style},


statics:{
Styles:NavigatorBreadcrumbNavigationBarStyles},


_updateIndexProgress:function(progress,index,fromIndex,toIndex){
var amount=toIndex>fromIndex?progress:1-progress;
var oldDistToCenter=index-fromIndex;
var newDistToCenter=index-toIndex;
var interpolate;
invariant(
Interpolators[index],
'Cannot find breadcrumb interpolators for '+index);

if(oldDistToCenter>0&&newDistToCenter===0||
newDistToCenter>0&&oldDistToCenter===0){
interpolate=Interpolators[index].RightToCenter;}else 
if(oldDistToCenter<0&&newDistToCenter===0||
newDistToCenter<0&&oldDistToCenter===0){
interpolate=Interpolators[index].CenterToLeft;}else 
if(oldDistToCenter===newDistToCenter){
interpolate=Interpolators[index].RightToCenter;}else 
{
interpolate=Interpolators[index].RightToLeft;}


if(interpolate.Crumb(CRUMB_PROPS[index].style,amount)){
this._setPropsIfExists('crumb_'+index,CRUMB_PROPS[index]);}

if(interpolate.Icon(ICON_PROPS[index].style,amount)){
this._setPropsIfExists('icon_'+index,ICON_PROPS[index]);}

if(interpolate.Separator(SEPARATOR_PROPS[index].style,amount)){
this._setPropsIfExists('separator_'+index,SEPARATOR_PROPS[index]);}

if(interpolate.Title(TITLE_PROPS[index].style,amount)){
this._setPropsIfExists('title_'+index,TITLE_PROPS[index]);}

var right=this.refs['right_'+index];

var rightButtonStyle=RIGHT_BUTTON_PROPS[index].style;
if(right&&interpolate.RightItem(rightButtonStyle,amount)){
right.setNativeProps({
style:rightButtonStyle,
pointerEvents:rightButtonStyle.opacity===0?'none':'auto'});}},




updateProgress:function(progress,fromIndex,toIndex){
var max=Math.max(fromIndex,toIndex);
var min=Math.min(fromIndex,toIndex);
for(var index=min;index<=max;index++){
this._updateIndexProgress(progress,index,fromIndex,toIndex);}},



onAnimationStart:function(fromIndex,toIndex){
var max=Math.max(fromIndex,toIndex);
var min=Math.min(fromIndex,toIndex);
for(var index=min;index<=max;index++){
this._setRenderViewsToHardwareTextureAndroid(index,true);}},



onAnimationEnd:function(){
var max=this.props.navState.routeStack.length-1;
for(var index=0;index<=max;index++){
this._setRenderViewsToHardwareTextureAndroid(index,false);}},



_setRenderViewsToHardwareTextureAndroid:function(index,renderToHardwareTexture){
var props={
renderToHardwareTextureAndroid:renderToHardwareTexture};


this._setPropsIfExists('icon_'+index,props);
this._setPropsIfExists('separator_'+index,props);
this._setPropsIfExists('title_'+index,props);
this._setPropsIfExists('right_'+index,props);},


componentWillMount:function(){
this._reset();},


render:function(){
var navState=this.props.navState;
var icons=navState&&navState.routeStack.map(this._getBreadcrumb);
var titles=navState.routeStack.map(this._getTitle);
var buttons=navState.routeStack.map(this._getRightButton);
return (
React.createElement(View,{
key:this._key,
style:[styles.breadCrumbContainer,this.props.style]},
titles,
icons,
buttons));},




immediatelyRefresh:function(){
this._reset();
this.forceUpdate();},


_reset:function(){
this._key=guid();
this._descriptors={
crumb:new Map(),
title:new Map(),
right:new Map()};},



_getBreadcrumb:function(route,index){
if(this._descriptors.crumb.has(route)){
return this._descriptors.crumb.get(route);}


var navBarRouteMapper=this.props.routeMapper;
var firstStyles=initStyle(index,navStatePresentedIndex(this.props.navState));

var breadcrumbDescriptor=
React.createElement(View,{
key:'crumb_'+index,
ref:'crumb_'+index,
style:firstStyles.Crumb},
React.createElement(View,{ref:'icon_'+index,style:firstStyles.Icon},
navBarRouteMapper.iconForRoute(route,this.props.navigator)),

React.createElement(View,{ref:'separator_'+index,style:firstStyles.Separator},
navBarRouteMapper.separatorForRoute(route,this.props.navigator)));




this._descriptors.crumb=this._descriptors.crumb.set(route,breadcrumbDescriptor);
return breadcrumbDescriptor;},


_getTitle:function(route,index){
if(this._descriptors.title.has(route)){
return this._descriptors.title.get(route);}


var titleContent=this.props.routeMapper.titleContentForRoute(
this.props.navState.routeStack[index],
this.props.navigator);

var firstStyles=initStyle(index,navStatePresentedIndex(this.props.navState));

var titleDescriptor=
React.createElement(View,{
key:'title_'+index,
ref:'title_'+index,
style:firstStyles.Title},
titleContent);


this._descriptors.title=this._descriptors.title.set(route,titleDescriptor);
return titleDescriptor;},


_getRightButton:function(route,index){
if(this._descriptors.right.has(route)){
return this._descriptors.right.get(route);}

var rightContent=this.props.routeMapper.rightContentForRoute(
this.props.navState.routeStack[index],
this.props.navigator);

if(!rightContent){
this._descriptors.right=this._descriptors.right.set(route,null);
return null;}

var firstStyles=initStyle(index,navStatePresentedIndex(this.props.navState));
var rightButtonDescriptor=
React.createElement(View,{
key:'right_'+index,
ref:'right_'+index,
style:firstStyles.RightItem},
rightContent);


this._descriptors.right=this._descriptors.right.set(route,rightButtonDescriptor);
return rightButtonDescriptor;},


_setPropsIfExists:function(ref,props){
var ref=this.refs[ref];
ref&&ref.setNativeProps(props);}});



var styles=StyleSheet.create({
breadCrumbContainer:{
overflow:'hidden',
position:'absolute',
height:NavigatorNavigationBarStyles.General.TotalNavHeight,
top:0,
left:0,
right:0}});



module.exports=NavigatorBreadcrumbNavigationBar;
});
__d(197 /* NavigatorBreadcrumbNavigationBarStyles */, function(global, require, module, exports) {'use strict';



























var Dimensions=require(150 /* Dimensions */);
var NavigatorNavigationBarStylesIOS=require(198 /* NavigatorNavigationBarStylesIOS */);

var buildStyleInterpolator=require(199 /* buildStyleInterpolator */);
var merge=require(103 /* merge */);

var SCREEN_WIDTH=Dimensions.get('window').width;
var STATUS_BAR_HEIGHT=NavigatorNavigationBarStylesIOS.General.StatusBarHeight;
var NAV_BAR_HEIGHT=NavigatorNavigationBarStylesIOS.General.NavBarHeight;

var SPACING=4;
var ICON_WIDTH=40;
var SEPARATOR_WIDTH=9;
var CRUMB_WIDTH=ICON_WIDTH+SEPARATOR_WIDTH;

var OPACITY_RATIO=100;
var ICON_INACTIVE_OPACITY=0.6;
var MAX_BREADCRUMBS=10;

var CRUMB_BASE={
position:'absolute',
flexDirection:'row',
top:STATUS_BAR_HEIGHT,
width:CRUMB_WIDTH,
height:NAV_BAR_HEIGHT,
backgroundColor:'transparent'};


var ICON_BASE={
width:ICON_WIDTH,
height:NAV_BAR_HEIGHT};


var SEPARATOR_BASE={
width:SEPARATOR_WIDTH,
height:NAV_BAR_HEIGHT};


var TITLE_BASE={
position:'absolute',
top:STATUS_BAR_HEIGHT,
height:NAV_BAR_HEIGHT,
backgroundColor:'transparent'};



var FIRST_TITLE_BASE=merge(TITLE_BASE,{
left:0,
right:0,
alignItems:'center',
height:NAV_BAR_HEIGHT});


var RIGHT_BUTTON_BASE={
position:'absolute',
top:STATUS_BAR_HEIGHT,
right:SPACING,
overflow:'hidden',
opacity:1,
height:NAV_BAR_HEIGHT,
backgroundColor:'transparent'};






var LEFT=[];
var CENTER=[];
var RIGHT=[];
for(var i=0;i<MAX_BREADCRUMBS;i++){
var crumbLeft=CRUMB_WIDTH*i+SPACING;
LEFT[i]={
Crumb:merge(CRUMB_BASE,{left:crumbLeft}),
Icon:merge(ICON_BASE,{opacity:ICON_INACTIVE_OPACITY}),
Separator:merge(SEPARATOR_BASE,{opacity:1}),
Title:merge(TITLE_BASE,{left:crumbLeft,opacity:0}),
RightItem:merge(RIGHT_BUTTON_BASE,{opacity:0})};

CENTER[i]={
Crumb:merge(CRUMB_BASE,{left:crumbLeft}),
Icon:merge(ICON_BASE,{opacity:1}),
Separator:merge(SEPARATOR_BASE,{opacity:0}),
Title:merge(TITLE_BASE,{
left:crumbLeft+ICON_WIDTH,
opacity:1}),

RightItem:merge(RIGHT_BUTTON_BASE,{opacity:1})};

var crumbRight=SCREEN_WIDTH-100;
RIGHT[i]={
Crumb:merge(CRUMB_BASE,{left:crumbRight}),
Icon:merge(ICON_BASE,{opacity:0}),
Separator:merge(SEPARATOR_BASE,{opacity:0}),
Title:merge(TITLE_BASE,{
left:crumbRight+ICON_WIDTH,
opacity:0}),

RightItem:merge(RIGHT_BUTTON_BASE,{opacity:0})};}




CENTER[0]={
Crumb:merge(CRUMB_BASE,{left:SCREEN_WIDTH/4}),
Icon:merge(ICON_BASE,{opacity:0}),
Separator:merge(SEPARATOR_BASE,{opacity:0}),
Title:merge(FIRST_TITLE_BASE,{opacity:1}),
RightItem:CENTER[0].RightItem};

LEFT[0].Title=merge(FIRST_TITLE_BASE,{left:-SCREEN_WIDTH/4,opacity:0});
RIGHT[0].Title=merge(FIRST_TITLE_BASE,{opacity:0});


var buildIndexSceneInterpolator=function(startStyles,endStyles){
return {
Crumb:buildStyleInterpolator({
left:{
type:'linear',
from:startStyles.Crumb.left,
to:endStyles.Crumb.left,
min:0,
max:1,
extrapolate:true}}),


Icon:buildStyleInterpolator({
opacity:{
type:'linear',
from:startStyles.Icon.opacity,
to:endStyles.Icon.opacity,
min:0,
max:1}}),


Separator:buildStyleInterpolator({
opacity:{
type:'linear',
from:startStyles.Separator.opacity,
to:endStyles.Separator.opacity,
min:0,
max:1}}),


Title:buildStyleInterpolator({
opacity:{
type:'linear',
from:startStyles.Title.opacity,
to:endStyles.Title.opacity,
min:0,
max:1},

left:{
type:'linear',
from:startStyles.Title.left,
to:endStyles.Title.left,
min:0,
max:1,
extrapolate:true}}),


RightItem:buildStyleInterpolator({
opacity:{
type:'linear',
from:startStyles.RightItem.opacity,
to:endStyles.RightItem.opacity,
min:0,
max:1,
round:OPACITY_RATIO}})};};





var Interpolators=CENTER.map(function(_,ii){
return {

RightToCenter:buildIndexSceneInterpolator(RIGHT[ii],CENTER[ii]),

CenterToLeft:buildIndexSceneInterpolator(CENTER[ii],LEFT[ii]),

RightToLeft:buildIndexSceneInterpolator(RIGHT[ii],LEFT[ii])};});







module.exports={
Interpolators:Interpolators,
Left:LEFT,
Center:CENTER,
Right:RIGHT,
IconWidth:ICON_WIDTH,
IconHeight:NAV_BAR_HEIGHT,
SeparatorWidth:SEPARATOR_WIDTH,
SeparatorHeight:NAV_BAR_HEIGHT};
});
__d(198 /* NavigatorNavigationBarStylesIOS */, function(global, require, module, exports) {'use strict';



























var Dimensions=require(150 /* Dimensions */);

var buildStyleInterpolator=require(199 /* buildStyleInterpolator */);
var merge=require(103 /* merge */);

var SCREEN_WIDTH=Dimensions.get('window').width;
var NAV_BAR_HEIGHT=44;
var STATUS_BAR_HEIGHT=20;
var NAV_HEIGHT=NAV_BAR_HEIGHT+STATUS_BAR_HEIGHT;

var BASE_STYLES={
Title:{
position:'absolute',
top:STATUS_BAR_HEIGHT,
left:0,
right:0,
alignItems:'center',
height:NAV_BAR_HEIGHT,
backgroundColor:'transparent'},

LeftButton:{
position:'absolute',
top:STATUS_BAR_HEIGHT,
left:0,
overflow:'hidden',
opacity:1,
height:NAV_BAR_HEIGHT,
backgroundColor:'transparent'},

RightButton:{
position:'absolute',
top:STATUS_BAR_HEIGHT,
right:0,
overflow:'hidden',
opacity:1,
alignItems:'flex-end',
height:NAV_BAR_HEIGHT,
backgroundColor:'transparent'}};










var Stages={
Left:{
Title:merge(BASE_STYLES.Title,{left:-SCREEN_WIDTH/2,opacity:0}),
LeftButton:merge(BASE_STYLES.LeftButton,{left:-SCREEN_WIDTH/3,opacity:0}),
RightButton:merge(BASE_STYLES.RightButton,{opacity:0})},

Center:{
Title:merge(BASE_STYLES.Title,{left:0,opacity:1}),
LeftButton:merge(BASE_STYLES.LeftButton,{left:0,opacity:1}),
RightButton:merge(BASE_STYLES.RightButton,{opacity:1})},

Right:{
Title:merge(BASE_STYLES.Title,{left:SCREEN_WIDTH/2,opacity:0}),
LeftButton:merge(BASE_STYLES.LeftButton,{left:0,opacity:0}),
RightButton:merge(BASE_STYLES.RightButton,{opacity:0})}};




var opacityRatio=100;

function buildSceneInterpolators(startStyles,endStyles){
return {
Title:buildStyleInterpolator({
opacity:{
type:'linear',
from:startStyles.Title.opacity,
to:endStyles.Title.opacity,
min:0,
max:1},

left:{
type:'linear',
from:startStyles.Title.left,
to:endStyles.Title.left,
min:0,
max:1,
extrapolate:true}}),


LeftButton:buildStyleInterpolator({
opacity:{
type:'linear',
from:startStyles.LeftButton.opacity,
to:endStyles.LeftButton.opacity,
min:0,
max:1,
round:opacityRatio},

left:{
type:'linear',
from:startStyles.LeftButton.left,
to:endStyles.LeftButton.left,
min:0,
max:1}}),


RightButton:buildStyleInterpolator({
opacity:{
type:'linear',
from:startStyles.RightButton.opacity,
to:endStyles.RightButton.opacity,
min:0,
max:1,
round:opacityRatio},

left:{
type:'linear',
from:startStyles.RightButton.left,
to:endStyles.RightButton.left,
min:0,
max:1,
extrapolate:true}})};}





var Interpolators={

RightToCenter:buildSceneInterpolators(Stages.Right,Stages.Center),

CenterToLeft:buildSceneInterpolators(Stages.Center,Stages.Left),

RightToLeft:buildSceneInterpolators(Stages.Right,Stages.Left)};



module.exports={
General:{
NavBarHeight:NAV_BAR_HEIGHT,
StatusBarHeight:STATUS_BAR_HEIGHT,
TotalNavHeight:NAV_HEIGHT},

Interpolators:Interpolators,
Stages:Stages};
});
__d(199 /* buildStyleInterpolator */, function(global, require, module, exports) {var 










keyOf=require(525 /* fbjs/lib/keyOf */);

var X_DIM=keyOf({x:null});
var Y_DIM=keyOf({y:null});
var Z_DIM=keyOf({z:null});
var W_DIM=keyOf({w:null});

var TRANSFORM_ROTATE_NAME=keyOf({transformRotateRadians:null});

var ShouldAllocateReusableOperationVars={
transformRotateRadians:true,
transformScale:true,
transformTranslate:true};


var InitialOperationField={
transformRotateRadians:[0,0,0,1],
transformTranslate:[0,0,0],
transformScale:[1,1,1]};



























































var ARGUMENT_NAMES_RE=/([^\s,]+)/g;



















var inline=function(func,replaceWithArgs){
var fnStr=func.toString();
var parameterNames=fnStr.slice(fnStr.indexOf('(')+1,fnStr.indexOf(')')).
match(ARGUMENT_NAMES_RE)||
[];
var replaceRegexStr=parameterNames.map(function(paramName){
return '\\b'+paramName+'\\b';}).
join('|');
var replaceRegex=new RegExp(replaceRegexStr,'g');
var fnBody=fnStr.substring(fnStr.indexOf('{')+1,fnStr.lastIndexOf('}'));
var newFnBody=fnBody.replace(replaceRegex,function(parameterName){
var indexInParameterNames=parameterNames.indexOf(parameterName);
var replacementName=replaceWithArgs[indexInParameterNames];
return replacementName;});

return newFnBody.split('\n');};






var MatrixOps={
unroll:function(matVar,m0,m1,m2,m3,m4,m5,m6,m7,m8,m9,m10,m11,m12,m13,m14,m15){
m0=matVar[0];
m1=matVar[1];
m2=matVar[2];
m3=matVar[3];
m4=matVar[4];
m5=matVar[5];
m6=matVar[6];
m7=matVar[7];
m8=matVar[8];
m9=matVar[9];
m10=matVar[10];
m11=matVar[11];
m12=matVar[12];
m13=matVar[13];
m14=matVar[14];
m15=matVar[15];},


matrixDiffers:function(retVar,matVar,m0,m1,m2,m3,m4,m5,m6,m7,m8,m9,m10,m11,m12,m13,m14,m15){
retVar=retVar||
m0!==matVar[0]||
m1!==matVar[1]||
m2!==matVar[2]||
m3!==matVar[3]||
m4!==matVar[4]||
m5!==matVar[5]||
m6!==matVar[6]||
m7!==matVar[7]||
m8!==matVar[8]||
m9!==matVar[9]||
m10!==matVar[10]||
m11!==matVar[11]||
m12!==matVar[12]||
m13!==matVar[13]||
m14!==matVar[14]||
m15!==matVar[15];},


transformScale:function(matVar,opVar){

var x=opVar[0];
var y=opVar[1];
var z=opVar[2];
matVar[0]=matVar[0]*x;
matVar[1]=matVar[1]*x;
matVar[2]=matVar[2]*x;
matVar[3]=matVar[3]*x;
matVar[4]=matVar[4]*y;
matVar[5]=matVar[5]*y;
matVar[6]=matVar[6]*y;
matVar[7]=matVar[7]*y;
matVar[8]=matVar[8]*z;
matVar[9]=matVar[9]*z;
matVar[10]=matVar[10]*z;
matVar[11]=matVar[11]*z;
matVar[12]=matVar[12];
matVar[13]=matVar[13];
matVar[14]=matVar[14];
matVar[15]=matVar[15];},






transformTranslate:function(matVar,opVar){

var x=opVar[0];
var y=opVar[1];
var z=opVar[2];
matVar[12]=matVar[0]*x+matVar[4]*y+matVar[8]*z+matVar[12];
matVar[13]=matVar[1]*x+matVar[5]*y+matVar[9]*z+matVar[13];
matVar[14]=matVar[2]*x+matVar[6]*y+matVar[10]*z+matVar[14];
matVar[15]=matVar[3]*x+matVar[7]*y+matVar[11]*z+matVar[15];},






transformRotateRadians:function(matVar,q){

var xQuat=q[0],yQuat=q[1],zQuat=q[2],wQuat=q[3];
var x2Quat=xQuat+xQuat;
var y2Quat=yQuat+yQuat;
var z2Quat=zQuat+zQuat;
var xxQuat=xQuat*x2Quat;
var xyQuat=xQuat*y2Quat;
var xzQuat=xQuat*z2Quat;
var yyQuat=yQuat*y2Quat;
var yzQuat=yQuat*z2Quat;
var zzQuat=zQuat*z2Quat;
var wxQuat=wQuat*x2Quat;
var wyQuat=wQuat*y2Quat;
var wzQuat=wQuat*z2Quat;

var quatMat0=1-(yyQuat+zzQuat);
var quatMat1=xyQuat+wzQuat;
var quatMat2=xzQuat-wyQuat;
var quatMat4=xyQuat-wzQuat;
var quatMat5=1-(xxQuat+zzQuat);
var quatMat6=yzQuat+wxQuat;
var quatMat8=xzQuat+wyQuat;
var quatMat9=yzQuat-wxQuat;
var quatMat10=1-(xxQuat+yyQuat);



var a00=matVar[0];
var a01=matVar[1];
var a02=matVar[2];
var a03=matVar[3];
var a10=matVar[4];
var a11=matVar[5];
var a12=matVar[6];
var a13=matVar[7];
var a20=matVar[8];
var a21=matVar[9];
var a22=matVar[10];
var a23=matVar[11];

var b0=quatMat0,b1=quatMat1,b2=quatMat2;
matVar[0]=b0*a00+b1*a10+b2*a20;
matVar[1]=b0*a01+b1*a11+b2*a21;
matVar[2]=b0*a02+b1*a12+b2*a22;
matVar[3]=b0*a03+b1*a13+b2*a23;
b0=quatMat4;b1=quatMat5;b2=quatMat6;
matVar[4]=b0*a00+b1*a10+b2*a20;
matVar[5]=b0*a01+b1*a11+b2*a21;
matVar[6]=b0*a02+b1*a12+b2*a22;
matVar[7]=b0*a03+b1*a13+b2*a23;
b0=quatMat8;b1=quatMat9;b2=quatMat10;
matVar[8]=b0*a00+b1*a10+b2*a20;
matVar[9]=b0*a01+b1*a11+b2*a21;
matVar[10]=b0*a02+b1*a12+b2*a22;
matVar[11]=b0*a03+b1*a13+b2*a23;}};





var MatrixOpsInitial={
transformScale:function(matVar,opVar){

matVar[0]=opVar[0];
matVar[1]=0;
matVar[2]=0;
matVar[3]=0;
matVar[4]=0;
matVar[5]=opVar[1];
matVar[6]=0;
matVar[7]=0;
matVar[8]=0;
matVar[9]=0;
matVar[10]=opVar[2];
matVar[11]=0;
matVar[12]=0;
matVar[13]=0;
matVar[14]=0;
matVar[15]=1;},


transformTranslate:function(matVar,opVar){

matVar[0]=1;
matVar[1]=0;
matVar[2]=0;
matVar[3]=0;
matVar[4]=0;
matVar[5]=1;
matVar[6]=0;
matVar[7]=0;
matVar[8]=0;
matVar[9]=0;
matVar[10]=1;
matVar[11]=0;
matVar[12]=opVar[0];
matVar[13]=opVar[1];
matVar[14]=opVar[2];
matVar[15]=1;},







transformRotateRadians:function(matVar,q){


var xQuat=q[0],yQuat=q[1],zQuat=q[2],wQuat=q[3];
var x2Quat=xQuat+xQuat;
var y2Quat=yQuat+yQuat;
var z2Quat=zQuat+zQuat;
var xxQuat=xQuat*x2Quat;
var xyQuat=xQuat*y2Quat;
var xzQuat=xQuat*z2Quat;
var yyQuat=yQuat*y2Quat;
var yzQuat=yQuat*z2Quat;
var zzQuat=zQuat*z2Quat;
var wxQuat=wQuat*x2Quat;
var wyQuat=wQuat*y2Quat;
var wzQuat=wQuat*z2Quat;

var quatMat0=1-(yyQuat+zzQuat);
var quatMat1=xyQuat+wzQuat;
var quatMat2=xzQuat-wyQuat;
var quatMat4=xyQuat-wzQuat;
var quatMat5=1-(xxQuat+zzQuat);
var quatMat6=yzQuat+wxQuat;
var quatMat8=xzQuat+wyQuat;
var quatMat9=yzQuat-wxQuat;
var quatMat10=1-(xxQuat+yyQuat);



var b0=quatMat0,b1=quatMat1,b2=quatMat2;
matVar[0]=b0;
matVar[1]=b1;
matVar[2]=b2;
matVar[3]=0;
b0=quatMat4;b1=quatMat5;b2=quatMat6;
matVar[4]=b0;
matVar[5]=b1;
matVar[6]=b2;
matVar[7]=0;
b0=quatMat8;b1=quatMat9;b2=quatMat10;
matVar[8]=b0;
matVar[9]=b1;
matVar[10]=b2;
matVar[11]=0;
matVar[12]=0;
matVar[13]=0;
matVar[14]=0;
matVar[15]=1;}};




var setNextValAndDetectChange=function(name,tmpVarName){
return (
'  if (!didChange) {\n'+
'    var prevVal = result.'+name+';\n'+
'    result.'+name+' = '+tmpVarName+';\n'+
'    didChange = didChange  || ('+tmpVarName+' !== prevVal);\n'+
'  } else {\n'+
'    result.'+name+' = '+tmpVarName+';\n'+
'  }\n');};



var computeNextValLinear=function(anim,from,to,tmpVarName){
var hasRoundRatio='round' in anim;
var roundRatio=anim.round;
var fn='  ratio = (value - '+anim.min+') / '+(anim.max-anim.min)+';\n';
if(!anim.extrapolate){
fn+='  ratio = ratio > 1 ? 1 : (ratio < 0 ? 0 : ratio);\n';}


var roundOpen=hasRoundRatio?'Math.round('+roundRatio+' * ':'';
var roundClose=hasRoundRatio?') / '+roundRatio:'';
fn+=
'  '+tmpVarName+' = '+
roundOpen+
'('+from+' * (1 - ratio) + '+to+' * ratio)'+
roundClose+';\n';
return fn;};


var computeNextValLinearScalar=function(anim){
return computeNextValLinear(anim,anim.from,anim.to,'nextScalarVal');};


var computeNextValConstant=function(anim){
var constantExpression=JSON.stringify(anim.value);
return '  nextScalarVal = '+constantExpression+';\n';};


var computeNextValStep=function(anim){
return (
'  nextScalarVal = value >= '+(
anim.threshold+' ? '+anim.to+' : '+anim.from)+';\n');};



var computeNextValIdentity=function(anim){
return '  nextScalarVal = value;\n';};


var operationVar=function(name){
return name+'ReuseOp';};


var createReusableOperationVars=function(anims){
var ret='';
for(var name in anims){
if(ShouldAllocateReusableOperationVars[name]){
ret+='var '+operationVar(name)+' = [];\n';}}


return ret;};


var newlines=function(statements){
return '\n'+statements.join('\n')+'\n';};








var computeNextMatrixOperationField=function(anim,name,dimension,index){
var fieldAccess=operationVar(name)+'['+index+']';
if(anim.from[dimension]!==undefined&&anim.to[dimension]!==undefined){
return '  '+anim.from[dimension]!==anim.to[dimension]?
computeNextValLinear(anim,anim.from[dimension],anim.to[dimension],fieldAccess):
fieldAccess+' = '+anim.from[dimension]+';';}else 
{
return '  '+fieldAccess+' = '+InitialOperationField[name][index]+';';}};



var unrolledVars=[];
for(var varIndex=0;varIndex<16;varIndex++){
unrolledVars.push('m'+varIndex);}

var setNextMatrixAndDetectChange=function(orderedMatrixOperations){
var fn=[
'  var transformMatrix = result.transformMatrix !== undefined ? '+
'result.transformMatrix : (result.transformMatrix = []);'];

fn.push.apply(
fn,
inline(MatrixOps.unroll,['transformMatrix'].concat(unrolledVars)));

for(var i=0;i<orderedMatrixOperations.length;i++){
var opName=orderedMatrixOperations[i];
if(i===0){
fn.push.apply(
fn,
inline(MatrixOpsInitial[opName],['transformMatrix',operationVar(opName)]));}else 

{
fn.push.apply(
fn,
inline(MatrixOps[opName],['transformMatrix',operationVar(opName)]));}}



fn.push.apply(
fn,
inline(MatrixOps.matrixDiffers,['didChange','transformMatrix'].concat(unrolledVars)));

return fn;};


var InterpolateMatrix={
transformTranslate:true,
transformRotateRadians:true,
transformScale:true};


var createFunctionString=function(anims){


var orderedMatrixOperations=[];



var fn='return (function() {\n';
fn+=createReusableOperationVars(anims);
fn+='return function(result, value) {\n';
fn+='  var didChange = false;\n';
fn+='  var nextScalarVal;\n';
fn+='  var ratio;\n';

for(var name in anims){
var anim=anims[name];
if(anim.type==='linear'){
if(InterpolateMatrix[name]){
orderedMatrixOperations.push(name);
var setOperations=[
computeNextMatrixOperationField(anim,name,X_DIM,0),
computeNextMatrixOperationField(anim,name,Y_DIM,1),
computeNextMatrixOperationField(anim,name,Z_DIM,2)];

if(name===TRANSFORM_ROTATE_NAME){
setOperations.push(computeNextMatrixOperationField(anim,name,W_DIM,3));}

fn+=newlines(setOperations);}else 
{
fn+=computeNextValLinearScalar(anim,'nextScalarVal');
fn+=setNextValAndDetectChange(name,'nextScalarVal');}}else 

if(anim.type==='constant'){
fn+=computeNextValConstant(anim);
fn+=setNextValAndDetectChange(name,'nextScalarVal');}else 
if(anim.type==='step'){
fn+=computeNextValStep(anim);
fn+=setNextValAndDetectChange(name,'nextScalarVal');}else 
if(anim.type==='identity'){
fn+=computeNextValIdentity(anim);
fn+=setNextValAndDetectChange(name,'nextScalarVal');}}


if(orderedMatrixOperations.length){
fn+=newlines(setNextMatrixAndDetectChange(orderedMatrixOperations));}

fn+='  return didChange;\n';
fn+='};\n';
fn+='})()';
return fn;};







var buildStyleInterpolator=function(anims){

var interpolator=null;
function lazyStyleInterpolator(result,value){
if(interpolator===null){
interpolator=Function(createFunctionString(anims))();}

return interpolator(result,value);}

return lazyStyleInterpolator;};


module.exports=buildStyleInterpolator;
});
__d(525 /* fbjs/lib/keyOf.js */, function(global, require, module, exports) {"use strict";





















var keyOf=function(oneKeyObj){
var key;
for(key in oneKeyObj){
if(!oneKeyObj.hasOwnProperty(key)){
continue;}

return key;}

return null;};


module.exports=keyOf;
});
__d(200 /* NavigatorNavigationBarStylesAndroid */, function(global, require, module, exports) {'use strict';



























var buildStyleInterpolator=require(199 /* buildStyleInterpolator */);
var merge=require(103 /* merge */);


var NAV_BAR_HEIGHT=56;
var TITLE_LEFT=72;
var BUTTON_SIZE=24;
var TOUCH_TARGT_SIZE=48;
var BUTTON_HORIZONTAL_MARGIN=16;

var BUTTON_EFFECTIVE_MARGIN=BUTTON_HORIZONTAL_MARGIN-(TOUCH_TARGT_SIZE-BUTTON_SIZE)/2;
var NAV_ELEMENT_HEIGHT=NAV_BAR_HEIGHT;

var BASE_STYLES={
Title:{
position:'absolute',
bottom:0,
left:0,
right:0,
alignItems:'flex-start',
height:NAV_ELEMENT_HEIGHT,
backgroundColor:'transparent',
marginLeft:TITLE_LEFT},

LeftButton:{
position:'absolute',
top:0,
left:BUTTON_EFFECTIVE_MARGIN,
overflow:'hidden',
height:NAV_ELEMENT_HEIGHT,
backgroundColor:'transparent'},

RightButton:{
position:'absolute',
top:0,
right:BUTTON_EFFECTIVE_MARGIN,
overflow:'hidden',
alignItems:'flex-end',
height:NAV_ELEMENT_HEIGHT,
backgroundColor:'transparent'}};










var Stages={
Left:{
Title:merge(BASE_STYLES.Title,{opacity:0}),
LeftButton:merge(BASE_STYLES.LeftButton,{opacity:0}),
RightButton:merge(BASE_STYLES.RightButton,{opacity:0})},

Center:{
Title:merge(BASE_STYLES.Title,{opacity:1}),
LeftButton:merge(BASE_STYLES.LeftButton,{opacity:1}),
RightButton:merge(BASE_STYLES.RightButton,{opacity:1})},

Right:{
Title:merge(BASE_STYLES.Title,{opacity:0}),
LeftButton:merge(BASE_STYLES.LeftButton,{opacity:0}),
RightButton:merge(BASE_STYLES.RightButton,{opacity:0})}};




var opacityRatio=100;

function buildSceneInterpolators(startStyles,endStyles){
return {
Title:buildStyleInterpolator({
opacity:{
type:'linear',
from:startStyles.Title.opacity,
to:endStyles.Title.opacity,
min:0,
max:1},

left:{
type:'linear',
from:startStyles.Title.left,
to:endStyles.Title.left,
min:0,
max:1,
extrapolate:true}}),


LeftButton:buildStyleInterpolator({
opacity:{
type:'linear',
from:startStyles.LeftButton.opacity,
to:endStyles.LeftButton.opacity,
min:0,
max:1,
round:opacityRatio},

left:{
type:'linear',
from:startStyles.LeftButton.left,
to:endStyles.LeftButton.left,
min:0,
max:1}}),


RightButton:buildStyleInterpolator({
opacity:{
type:'linear',
from:startStyles.RightButton.opacity,
to:endStyles.RightButton.opacity,
min:0,
max:1,
round:opacityRatio},

left:{
type:'linear',
from:startStyles.RightButton.left,
to:endStyles.RightButton.left,
min:0,
max:1,
extrapolate:true}})};}





var Interpolators={

RightToCenter:buildSceneInterpolators(Stages.Right,Stages.Center),

CenterToLeft:buildSceneInterpolators(Stages.Center,Stages.Left),

RightToLeft:buildSceneInterpolators(Stages.Right,Stages.Left)};



module.exports={
General:{
NavBarHeight:NAV_BAR_HEIGHT,
StatusBarHeight:0,
TotalNavHeight:NAV_BAR_HEIGHT},

Interpolators:Interpolators,
Stages:Stages};
});
__d(201 /* NavigatorNavigationBar */, function(global, require, module, exports) {'use strict';



























var React=require(47 /* React */);
var NavigatorNavigationBarStylesAndroid=require(200 /* NavigatorNavigationBarStylesAndroid */);
var NavigatorNavigationBarStylesIOS=require(198 /* NavigatorNavigationBarStylesIOS */);
var Platform=require(4 /* Platform */);
var StyleSheet=require(148 /* StyleSheet */);
var View=require(127 /* View */);

var guid=require(63 /* guid */);var _require=

require(604 /* immutable */);var Map=_require.Map;

var COMPONENT_NAMES=['Title','LeftButton','RightButton'];

var NavigatorNavigationBarStyles=Platform.OS==='android'?
NavigatorNavigationBarStylesAndroid:NavigatorNavigationBarStylesIOS;

var navStatePresentedIndex=function(navState){
if(navState.presentedIndex!==undefined){
return navState.presentedIndex;}


return navState.observedTopOfStack;};


var NavigatorNavigationBar=React.createClass({displayName:'NavigatorNavigationBar',

propTypes:{
navigator:React.PropTypes.object,
routeMapper:React.PropTypes.shape({
Title:React.PropTypes.func.isRequired,
LeftButton:React.PropTypes.func.isRequired,
RightButton:React.PropTypes.func.isRequired}).
isRequired,
navState:React.PropTypes.shape({
routeStack:React.PropTypes.arrayOf(React.PropTypes.object),
presentedIndex:React.PropTypes.number}),

navigationStyles:React.PropTypes.object,
style:View.propTypes.style},


statics:{
Styles:NavigatorNavigationBarStyles,
StylesAndroid:NavigatorNavigationBarStylesAndroid,
StylesIOS:NavigatorNavigationBarStylesIOS},


getDefaultProps:function(){
return {
navigationStyles:NavigatorNavigationBarStyles};},



componentWillMount:function(){
this._reset();},






immediatelyRefresh:function(){
this._reset();
this.forceUpdate();},


_reset:function(){var _this=this;
this._key=guid();
this._reusableProps={};
this._components={};
this._descriptors={};

COMPONENT_NAMES.forEach(function(componentName){
_this._components[componentName]=new Map();
_this._descriptors[componentName]=new Map();});},



_getReusableProps:function(
componentName,
index)
{
var propStack=this._reusableProps[componentName];
if(!propStack){
propStack=this._reusableProps[componentName]=[];}

var props=propStack[index];
if(!props){
props=propStack[index]={style:{}};}

return props;},


_updateIndexProgress:function(
progress,
index,
fromIndex,
toIndex)
{
var amount=toIndex>fromIndex?progress:1-progress;
var oldDistToCenter=index-fromIndex;
var newDistToCenter=index-toIndex;
var interpolate;
if(oldDistToCenter>0&&newDistToCenter===0||
newDistToCenter>0&&oldDistToCenter===0){
interpolate=this.props.navigationStyles.Interpolators.RightToCenter;}else 
if(oldDistToCenter<0&&newDistToCenter===0||
newDistToCenter<0&&oldDistToCenter===0){
interpolate=this.props.navigationStyles.Interpolators.CenterToLeft;}else 
if(oldDistToCenter===newDistToCenter){
interpolate=this.props.navigationStyles.Interpolators.RightToCenter;}else 
{
interpolate=this.props.navigationStyles.Interpolators.RightToLeft;}


COMPONENT_NAMES.forEach(function(componentName){
var component=this._components[componentName].get(this.props.navState.routeStack[index]);
var props=this._getReusableProps(componentName,index);
if(component&&interpolate[componentName](props.style,amount)){
component.setNativeProps(props);}},

this);},


updateProgress:function(
progress,
fromIndex,
toIndex)
{
var max=Math.max(fromIndex,toIndex);
var min=Math.min(fromIndex,toIndex);
for(var index=min;index<=max;index++){
this._updateIndexProgress(progress,index,fromIndex,toIndex);}},



render:function(){var _this2=this;
var navBarStyle={
height:this.props.navigationStyles.General.TotalNavHeight};

var navState=this.props.navState;
var components=navState.routeStack.map(function(route,index){return (
COMPONENT_NAMES.map(function(componentName){return (
_this2._getComponent(componentName,route,index));}));});



return (
React.createElement(View,{
key:this._key,
style:[styles.navBarContainer,navBarStyle,this.props.style]},
components));},




_getComponent:function(
componentName,
route,
index)
{var _this3=this;
if(this._descriptors[componentName].includes(route)){
return this._descriptors[componentName].get(route);}


var rendered=null;

var content=this.props.routeMapper[componentName](
this.props.navState.routeStack[index],
this.props.navigator,
index,
this.props.navState);

if(!content){
return null;}


var initialStage=index===navStatePresentedIndex(this.props.navState)?
this.props.navigationStyles.Stages.Center:
this.props.navigationStyles.Stages.Left;
rendered=
React.createElement(View,{
ref:function(ref){
_this3._components[componentName]=_this3._components[componentName].set(route,ref);},

pointerEvents:'box-none',
style:initialStage[componentName]},
content);



this._descriptors[componentName]=this._descriptors[componentName].set(route,rendered);
return rendered;}});





var styles=StyleSheet.create({
navBarContainer:{
position:'absolute',
top:0,
left:0,
right:0,
backgroundColor:'transparent'}});



module.exports=NavigatorNavigationBar;
});
__d(202 /* NavigatorSceneConfigs */, function(global, require, module, exports) {'use strict';



























var Dimensions=require(150 /* Dimensions */);
var PixelRatio=require(149 /* PixelRatio */);

var buildStyleInterpolator=require(199 /* buildStyleInterpolator */);

var SCREEN_WIDTH=Dimensions.get('window').width;
var SCREEN_HEIGHT=Dimensions.get('window').height;

var FadeToTheLeft={


transformTranslate:{
from:{x:0,y:0,z:0},
to:{x:-Math.round(Dimensions.get('window').width*0.3),y:0,z:0},
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PixelRatio.get()},












transformScale:{
from:{x:1,y:1,z:1},
to:{x:0.95,y:0.95,z:1},
min:0,
max:1,
type:'linear',
extrapolate:true},

opacity:{
from:1,
to:0.3,
min:0,
max:1,
type:'linear',
extrapolate:false,
round:100},

translateX:{
from:0,
to:-Math.round(Dimensions.get('window').width*0.3),
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PixelRatio.get()},

scaleX:{
from:1,
to:0.95,
min:0,
max:1,
type:'linear',
extrapolate:true},

scaleY:{
from:1,
to:0.95,
min:0,
max:1,
type:'linear',
extrapolate:true}};



var FadeToTheRight=babelHelpers.extends({},
FadeToTheLeft,{
transformTranslate:{
from:{x:0,y:0,z:0},
to:{x:Math.round(SCREEN_WIDTH*0.3),y:0,z:0}},

translateX:{
from:0,
to:Math.round(SCREEN_WIDTH*0.3)}});



var FadeIn={
opacity:{
from:0,
to:1,
min:0.5,
max:1,
type:'linear',
extrapolate:false,
round:100}};



var FadeOut={
opacity:{
from:1,
to:0,
min:0,
max:0.5,
type:'linear',
extrapolate:false,
round:100}};



var ToTheLeft={
transformTranslate:{
from:{x:0,y:0,z:0},
to:{x:-Dimensions.get('window').width,y:0,z:0},
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PixelRatio.get()},

opacity:{
value:1.0,
type:'constant'},


translateX:{
from:0,
to:-Dimensions.get('window').width,
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PixelRatio.get()}};



var ToTheUp={
transformTranslate:{
from:{x:0,y:0,z:0},
to:{x:0,y:-Dimensions.get('window').height,z:0},
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PixelRatio.get()},

opacity:{
value:1.0,
type:'constant'},

translateY:{
from:0,
to:-Dimensions.get('window').height,
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PixelRatio.get()}};



var ToTheDown={
transformTranslate:{
from:{x:0,y:0,z:0},
to:{x:0,y:Dimensions.get('window').height,z:0},
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PixelRatio.get()},

opacity:{
value:1.0,
type:'constant'},

translateY:{
from:0,
to:Dimensions.get('window').height,
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PixelRatio.get()}};



var FromTheRight={
opacity:{
value:1.0,
type:'constant'},


transformTranslate:{
from:{x:Dimensions.get('window').width,y:0,z:0},
to:{x:0,y:0,z:0},
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PixelRatio.get()},


translateX:{
from:Dimensions.get('window').width,
to:0,
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PixelRatio.get()},


scaleX:{
value:1,
type:'constant'},

scaleY:{
value:1,
type:'constant'}};



var FromTheLeft=babelHelpers.extends({},
FromTheRight,{
transformTranslate:{
from:{x:-SCREEN_WIDTH,y:0,z:0},
to:{x:0,y:0,z:0},
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PixelRatio.get()},

translateX:{
from:-SCREEN_WIDTH,
to:0,
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PixelRatio.get()}});



var FromTheDown=babelHelpers.extends({},
FromTheRight,{
transformTranslate:{
from:{y:SCREEN_HEIGHT,x:0,z:0},
to:{x:0,y:0,z:0},
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PixelRatio.get()},

translateY:{
from:SCREEN_HEIGHT,
to:0,
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PixelRatio.get()}});



var FromTheTop=babelHelpers.extends({},
FromTheRight,{
transformTranslate:{
from:{y:-SCREEN_HEIGHT,x:0,z:0},
to:{x:0,y:0,z:0},
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PixelRatio.get()},

translateY:{
from:-SCREEN_HEIGHT,
to:0,
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PixelRatio.get()}});



var ToTheBack={


transformTranslate:{
from:{x:0,y:0,z:0},
to:{x:0,y:0,z:0},
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PixelRatio.get()},

transformScale:{
from:{x:1,y:1,z:1},
to:{x:0.95,y:0.95,z:1},
min:0,
max:1,
type:'linear',
extrapolate:true},

opacity:{
from:1,
to:0.3,
min:0,
max:1,
type:'linear',
extrapolate:false,
round:100},

scaleX:{
from:1,
to:0.95,
min:0,
max:1,
type:'linear',
extrapolate:true},

scaleY:{
from:1,
to:0.95,
min:0,
max:1,
type:'linear',
extrapolate:true}};



var FromTheFront={
opacity:{
value:1.0,
type:'constant'},


transformTranslate:{
from:{x:0,y:Dimensions.get('window').height,z:0},
to:{x:0,y:0,z:0},
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PixelRatio.get()},

translateY:{
from:Dimensions.get('window').height,
to:0,
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PixelRatio.get()},

scaleX:{
value:1,
type:'constant'},

scaleY:{
value:1,
type:'constant'}};



var ToTheBackAndroid={
opacity:{
value:1,
type:'constant'}};



var FromTheFrontAndroid={
opacity:{
from:0,
to:1,
min:0.5,
max:1,
type:'linear',
extrapolate:false,
round:100},

transformTranslate:{
from:{x:0,y:100,z:0},
to:{x:0,y:0,z:0},
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PixelRatio.get()},

translateY:{
from:100,
to:0,
min:0,
max:1,
type:'linear',
extrapolate:true,
round:PixelRatio.get()}};



var BaseOverswipeConfig={
frictionConstant:1,
frictionByDistance:1.5};


var BaseLeftToRightGesture={


isDetachable:false,


gestureDetectMovement:2,


notMoving:0.3,


directionRatio:0.66,


snapVelocity:2,


edgeHitWidth:30,


stillCompletionRatio:3/5,

fullDistance:SCREEN_WIDTH,

direction:'left-to-right'};



var BaseRightToLeftGesture=babelHelpers.extends({},
BaseLeftToRightGesture,{
direction:'right-to-left'});


var BaseDownUpGesture=babelHelpers.extends({},
BaseLeftToRightGesture,{
fullDistance:SCREEN_HEIGHT,
direction:'down-to-up'});


var BaseUpDownGesture=babelHelpers.extends({},
BaseLeftToRightGesture,{
fullDistance:SCREEN_HEIGHT,
direction:'up-to-down'});


var BaseConfig={

gestures:{
pop:BaseLeftToRightGesture},



springFriction:26,
springTension:200,


defaultTransitionVelocity:1.5,


animationInterpolators:{
into:buildStyleInterpolator(FromTheRight),
out:buildStyleInterpolator(FadeToTheLeft)}};



var NavigatorSceneConfigs={
PushFromRight:babelHelpers.extends({},
BaseConfig),


FloatFromRight:babelHelpers.extends({},
BaseConfig),


FloatFromLeft:babelHelpers.extends({},
BaseConfig,{
gestures:{
pop:BaseRightToLeftGesture},

animationInterpolators:{
into:buildStyleInterpolator(FromTheLeft),
out:buildStyleInterpolator(FadeToTheRight)}}),


FloatFromBottom:babelHelpers.extends({},
BaseConfig,{
gestures:{
pop:babelHelpers.extends({},
BaseLeftToRightGesture,{
edgeHitWidth:150,
direction:'top-to-bottom',
fullDistance:SCREEN_HEIGHT})},


animationInterpolators:{
into:buildStyleInterpolator(FromTheFront),
out:buildStyleInterpolator(ToTheBack)}}),


FloatFromBottomAndroid:babelHelpers.extends({},
BaseConfig,{
gestures:null,
defaultTransitionVelocity:3,
springFriction:20,
animationInterpolators:{
into:buildStyleInterpolator(FromTheFrontAndroid),
out:buildStyleInterpolator(ToTheBackAndroid)}}),


FadeAndroid:babelHelpers.extends({},
BaseConfig,{
gestures:null,
animationInterpolators:{
into:buildStyleInterpolator(FadeIn),
out:buildStyleInterpolator(FadeOut)}}),


HorizontalSwipeJump:babelHelpers.extends({},
BaseConfig,{
gestures:{
jumpBack:babelHelpers.extends({},
BaseLeftToRightGesture,{
overswipe:BaseOverswipeConfig,
edgeHitWidth:null,
isDetachable:true}),

jumpForward:babelHelpers.extends({},
BaseRightToLeftGesture,{
overswipe:BaseOverswipeConfig,
edgeHitWidth:null,
isDetachable:true})},


animationInterpolators:{
into:buildStyleInterpolator(FromTheRight),
out:buildStyleInterpolator(ToTheLeft)}}),


HorizontalSwipeJumpFromRight:babelHelpers.extends({},
BaseConfig,{
gestures:{
jumpBack:babelHelpers.extends({},
BaseRightToLeftGesture,{
overswipe:BaseOverswipeConfig,
edgeHitWidth:null,
isDetachable:true}),

jumpForward:babelHelpers.extends({},
BaseLeftToRightGesture,{
overswipe:BaseOverswipeConfig,
edgeHitWidth:null,
isDetachable:true}),

pop:BaseRightToLeftGesture},

animationInterpolators:{
into:buildStyleInterpolator(FromTheLeft),
out:buildStyleInterpolator(FadeToTheRight)}}),


VerticalUpSwipeJump:babelHelpers.extends({},
BaseConfig,{
gestures:{
jumpBack:babelHelpers.extends({},
BaseDownUpGesture,{
overswipe:BaseOverswipeConfig,
edgeHitWidth:null,
isDetachable:true}),

jumpForward:babelHelpers.extends({},
BaseDownUpGesture,{
overswipe:BaseOverswipeConfig,
edgeHitWidth:null,
isDetachable:true})},


animationInterpolators:{
into:buildStyleInterpolator(FromTheDown),
out:buildStyleInterpolator(ToTheUp)}}),


VerticalDownSwipeJump:babelHelpers.extends({},
BaseConfig,{
gestures:{
jumpBack:babelHelpers.extends({},
BaseUpDownGesture,{
overswipe:BaseOverswipeConfig,
edgeHitWidth:null,
isDetachable:true}),

jumpForward:babelHelpers.extends({},
BaseUpDownGesture,{
overswipe:BaseOverswipeConfig,
edgeHitWidth:null,
isDetachable:true})},


animationInterpolators:{
into:buildStyleInterpolator(FromTheTop),
out:buildStyleInterpolator(ToTheDown)}})};




module.exports=NavigatorSceneConfigs;
});
__d(203 /* PanResponder */, function(global, require, module, exports) {"use strict";





var TouchHistoryMath=require(204 /* TouchHistoryMath */);

var currentCentroidXOfTouchesChangedAfter=
TouchHistoryMath.currentCentroidXOfTouchesChangedAfter;
var currentCentroidYOfTouchesChangedAfter=
TouchHistoryMath.currentCentroidYOfTouchesChangedAfter;
var previousCentroidXOfTouchesChangedAfter=
TouchHistoryMath.previousCentroidXOfTouchesChangedAfter;
var previousCentroidYOfTouchesChangedAfter=
TouchHistoryMath.previousCentroidYOfTouchesChangedAfter;
var currentCentroidX=TouchHistoryMath.currentCentroidX;
var currentCentroidY=TouchHistoryMath.currentCentroidY;
































































































var PanResponder={
































































_initializeGestureState:function(gestureState){
gestureState.moveX=0;
gestureState.moveY=0;
gestureState.x0=0;
gestureState.y0=0;
gestureState.dx=0;
gestureState.dy=0;
gestureState.vx=0;
gestureState.vy=0;
gestureState.numberActiveTouches=0;

gestureState._accountsForMovesUpTo=0;},


























_updateGestureStateOnMove:function(gestureState,touchHistory){
gestureState.numberActiveTouches=touchHistory.numberActiveTouches;
gestureState.moveX=currentCentroidXOfTouchesChangedAfter(
touchHistory,
gestureState._accountsForMovesUpTo);

gestureState.moveY=currentCentroidYOfTouchesChangedAfter(
touchHistory,
gestureState._accountsForMovesUpTo);

var movedAfter=gestureState._accountsForMovesUpTo;
var prevX=previousCentroidXOfTouchesChangedAfter(touchHistory,movedAfter);
var x=currentCentroidXOfTouchesChangedAfter(touchHistory,movedAfter);
var prevY=previousCentroidYOfTouchesChangedAfter(touchHistory,movedAfter);
var y=currentCentroidYOfTouchesChangedAfter(touchHistory,movedAfter);
var nextDX=gestureState.dx+(x-prevX);
var nextDY=gestureState.dy+(y-prevY);


var dt=
touchHistory.mostRecentTimeStamp-gestureState._accountsForMovesUpTo;
gestureState.vx=(nextDX-gestureState.dx)/dt;
gestureState.vy=(nextDY-gestureState.dy)/dt;

gestureState.dx=nextDX;
gestureState.dy=nextDY;
gestureState._accountsForMovesUpTo=touchHistory.mostRecentTimeStamp;},


































create:function(config){
var gestureState={

stateID:Math.random()};

PanResponder._initializeGestureState(gestureState);
var panHandlers={
onStartShouldSetResponder:function(e){
return config.onStartShouldSetPanResponder===undefined?false:
config.onStartShouldSetPanResponder(e,gestureState);},

onMoveShouldSetResponder:function(e){
return config.onMoveShouldSetPanResponder===undefined?false:
config.onMoveShouldSetPanResponder(e,gestureState);},

onStartShouldSetResponderCapture:function(e){


if(e.nativeEvent.touches.length===1){
PanResponder._initializeGestureState(gestureState);}

gestureState.numberActiveTouches=e.touchHistory.numberActiveTouches;
return config.onStartShouldSetPanResponderCapture!==undefined?
config.onStartShouldSetPanResponderCapture(e,gestureState):false;},


onMoveShouldSetResponderCapture:function(e){
var touchHistory=e.touchHistory;



if(gestureState._accountsForMovesUpTo===touchHistory.mostRecentTimeStamp){
return false;}

PanResponder._updateGestureStateOnMove(gestureState,touchHistory);
return config.onMoveShouldSetPanResponderCapture?
config.onMoveShouldSetPanResponderCapture(e,gestureState):false;},


onResponderGrant:function(e){
gestureState.x0=currentCentroidX(e.touchHistory);
gestureState.y0=currentCentroidY(e.touchHistory);
gestureState.dx=0;
gestureState.dy=0;
config.onPanResponderGrant&&config.onPanResponderGrant(e,gestureState);

return config.onShouldBlockNativeResponder===undefined?true:
config.onShouldBlockNativeResponder();},


onResponderReject:function(e){
config.onPanResponderReject&&config.onPanResponderReject(e,gestureState);},


onResponderRelease:function(e){
config.onPanResponderRelease&&config.onPanResponderRelease(e,gestureState);
PanResponder._initializeGestureState(gestureState);},


onResponderStart:function(e){
var touchHistory=e.touchHistory;
gestureState.numberActiveTouches=touchHistory.numberActiveTouches;
config.onPanResponderStart&&config.onPanResponderStart(e,gestureState);},


onResponderMove:function(e){
var touchHistory=e.touchHistory;


if(gestureState._accountsForMovesUpTo===touchHistory.mostRecentTimeStamp){
return;}



PanResponder._updateGestureStateOnMove(gestureState,touchHistory);
config.onPanResponderMove&&config.onPanResponderMove(e,gestureState);},


onResponderEnd:function(e){
var touchHistory=e.touchHistory;
gestureState.numberActiveTouches=touchHistory.numberActiveTouches;
config.onPanResponderEnd&&config.onPanResponderEnd(e,gestureState);},


onResponderTerminate:function(e){
config.onPanResponderTerminate&&
config.onPanResponderTerminate(e,gestureState);
PanResponder._initializeGestureState(gestureState);},


onResponderTerminationRequest:function(e){
return config.onPanResponderTerminationRequest===undefined?true:
config.onPanResponderTerminationRequest(e,gestureState);}};


return {panHandlers:panHandlers};}};



module.exports=PanResponder;
});
__d(204 /* TouchHistoryMath */, function(global, require, module, exports) {"use strict";





var TouchHistoryMath={
















centroidDimension:function(touchHistory,touchesChangedAfter,isXAxis,ofCurrent){
var touchBank=touchHistory.touchBank;
var total=0;
var count=0;

var oneTouchData=touchHistory.numberActiveTouches===1?
touchHistory.touchBank[touchHistory.indexOfSingleActiveTouch]:null;

if(oneTouchData!==null){
if(oneTouchData.touchActive&&oneTouchData.currentTimeStamp>touchesChangedAfter){
total+=ofCurrent&&isXAxis?oneTouchData.currentPageX:
ofCurrent&&!isXAxis?oneTouchData.currentPageY:
!ofCurrent&&isXAxis?oneTouchData.previousPageX:
oneTouchData.previousPageY;
count=1;}}else 

{
for(var i=0;i<touchBank.length;i++){
var touchTrack=touchBank[i];
if(touchTrack!==null&&
touchTrack!==undefined&&
touchTrack.touchActive&&
touchTrack.currentTimeStamp>=touchesChangedAfter){
var toAdd;
if(ofCurrent&&isXAxis){
toAdd=touchTrack.currentPageX;}else 
if(ofCurrent&&!isXAxis){
toAdd=touchTrack.currentPageY;}else 
if(!ofCurrent&&isXAxis){
toAdd=touchTrack.previousPageX;}else 
{
toAdd=touchTrack.previousPageY;}

total+=toAdd;
count++;}}}



return count>0?total/count:TouchHistoryMath.noCentroid;},


currentCentroidXOfTouchesChangedAfter:function(touchHistory,touchesChangedAfter){
return TouchHistoryMath.centroidDimension(
touchHistory,
touchesChangedAfter,
true,
true);},



currentCentroidYOfTouchesChangedAfter:function(touchHistory,touchesChangedAfter){
return TouchHistoryMath.centroidDimension(
touchHistory,
touchesChangedAfter,
false,
true);},



previousCentroidXOfTouchesChangedAfter:function(touchHistory,touchesChangedAfter){
return TouchHistoryMath.centroidDimension(
touchHistory,
touchesChangedAfter,
true,
false);},



previousCentroidYOfTouchesChangedAfter:function(touchHistory,touchesChangedAfter){
return TouchHistoryMath.centroidDimension(
touchHistory,
touchesChangedAfter,
false,
false);},



currentCentroidX:function(touchHistory){
return TouchHistoryMath.centroidDimension(
touchHistory,
0,
true,
true);},



currentCentroidY:function(touchHistory){
return TouchHistoryMath.centroidDimension(
touchHistory,
0,
false,
true);},



noCentroid:-1};


module.exports=TouchHistoryMath;
});
__d(205 /* clamp */, function(global, require, module, exports) {function 























clamp(min,value,max){
if(value<min){
return min;}

if(value>max){
return max;}

return value;}


module.exports=clamp;
});
__d(539 /* rebound/rebound.js */, function(global, require, module, exports) {(


























































































































function(){
var rebound={};
var util=rebound.util={};
var concat=Array.prototype.concat;
var slice=Array.prototype.slice;


util.bind=function bind(func,context){
var args=slice.call(arguments,2);
return function(){
func.apply(context,concat.call(args,slice.call(arguments)));};};




util.extend=function extend(target,source){
for(var key in source){
if(source.hasOwnProperty(key)){
target[key]=source[key];}}};









var SpringSystem=rebound.SpringSystem=function SpringSystem(looper){
this._springRegistry={};
this._activeSprings=[];
this.listeners=[];
this._idleSpringIndices=[];
this.looper=looper||new AnimationLooper();
this.looper.springSystem=this;};


util.extend(SpringSystem.prototype,{

_springRegistry:null,

_isIdle:true,

_lastTimeMillis:-1,

_activeSprings:null,

listeners:null,

_idleSpringIndices:null,






setLooper:function(looper){
this.looper=looper;
looper.springSystem=this;},






createSpring:function(tension,friction){
var springConfig;
if(tension===undefined||friction===undefined){
springConfig=SpringConfig.DEFAULT_ORIGAMI_SPRING_CONFIG;}else 
{
springConfig=
SpringConfig.fromOrigamiTensionAndFriction(tension,friction);}

return this.createSpringWithConfig(springConfig);},





createSpringWithBouncinessAndSpeed:function(bounciness,speed){
var springConfig;
if(bounciness===undefined||speed===undefined){
springConfig=SpringConfig.DEFAULT_ORIGAMI_SPRING_CONFIG;}else 
{
springConfig=
SpringConfig.fromBouncinessAndSpeed(bounciness,speed);}

return this.createSpringWithConfig(springConfig);},



createSpringWithConfig:function(springConfig){
var spring=new Spring(this);
this.registerSpring(spring);
spring.setSpringConfig(springConfig);
return spring;},






getIsIdle:function(){
return this._isIdle;},





getSpringById:function(id){
return this._springRegistry[id];},




getAllSprings:function(){
var vals=[];
for(var id in this._springRegistry){
if(this._springRegistry.hasOwnProperty(id)){
vals.push(this._springRegistry[id]);}}


return vals;},






registerSpring:function(spring){
this._springRegistry[spring.getId()]=spring;},






deregisterSpring:function(spring){
removeFirst(this._activeSprings,spring);
delete this._springRegistry[spring.getId()];},


advance:function(time,deltaTime){
while(this._idleSpringIndices.length>0){this._idleSpringIndices.pop();}
for(var i=0,len=this._activeSprings.length;i<len;i++){
var spring=this._activeSprings[i];
if(spring.systemShouldAdvance()){
spring.advance(time/1000.0,deltaTime/1000.0);}else 
{
this._idleSpringIndices.push(this._activeSprings.indexOf(spring));}}


while(this._idleSpringIndices.length>0){
var idx=this._idleSpringIndices.pop();
idx>=0&&this._activeSprings.splice(idx,1);}},
















loop:function(currentTimeMillis){
var listener;
if(this._lastTimeMillis===-1){
this._lastTimeMillis=currentTimeMillis-1;}

var ellapsedMillis=currentTimeMillis-this._lastTimeMillis;
this._lastTimeMillis=currentTimeMillis;

var i=0,len=this.listeners.length;
for(i=0;i<len;i++){
listener=this.listeners[i];
listener.onBeforeIntegrate&&listener.onBeforeIntegrate(this);}


this.advance(currentTimeMillis,ellapsedMillis);
if(this._activeSprings.length===0){
this._isIdle=true;
this._lastTimeMillis=-1;}


for(i=0;i<len;i++){
listener=this.listeners[i];
listener.onAfterIntegrate&&listener.onAfterIntegrate(this);}


if(!this._isIdle){
this.looper.run();}},






activateSpring:function(springId){
var spring=this._springRegistry[springId];
if(this._activeSprings.indexOf(spring)==-1){
this._activeSprings.push(spring);}

if(this.getIsIdle()){
this._isIdle=false;
this.looper.run();}},






addListener:function(listener){
this.listeners.push(listener);},



removeListener:function(listener){
removeFirst(this.listeners,listener);},



removeAllListeners:function(){
this.listeners=[];}});


















var Spring=rebound.Spring=function Spring(springSystem){
this._id='s'+Spring._ID++;
this._springSystem=springSystem;
this.listeners=[];
this._currentState=new PhysicsState();
this._previousState=new PhysicsState();
this._tempState=new PhysicsState();};


util.extend(Spring,{
_ID:0,

MAX_DELTA_TIME_SEC:0.064,

SOLVER_TIMESTEP_SEC:0.001});



util.extend(Spring.prototype,{

_id:0,

_springConfig:null,

_overshootClampingEnabled:false,

_currentState:null,

_previousState:null,

_tempState:null,

_startValue:0,

_endValue:0,

_wasAtRest:true,

_restSpeedThreshold:0.001,

_displacementFromRestThreshold:0.001,

listeners:null,

_timeAccumulator:0,

_springSystem:null,


destroy:function(){
this.listeners=[];
this.frames=[];
this._springSystem.deregisterSpring(this);},




getId:function(){
return this._id;},





setSpringConfig:function(springConfig){
this._springConfig=springConfig;
return this;},



getSpringConfig:function(){
return this._springConfig;},





























setCurrentValue:function(currentValue,skipSetAtRest){
this._startValue=currentValue;
this._currentState.position=currentValue;
if(!skipSetAtRest){
this.setAtRest();}

this.notifyPositionUpdated(false,false);
return this;},





getStartValue:function(){
return this._startValue;},



getCurrentValue:function(){
return this._currentState.position;},




getCurrentDisplacementDistance:function(){
return this.getDisplacementDistanceForState(this._currentState);},


getDisplacementDistanceForState:function(state){
return Math.abs(this._endValue-state.position);},








setEndValue:function(endValue){
if(this._endValue==endValue&&this.isAtRest()){
return this;}

this._startValue=this.getCurrentValue();
this._endValue=endValue;
this._springSystem.activateSpring(this.getId());
for(var i=0,len=this.listeners.length;i<len;i++){
var listener=this.listeners[i];
var onChange=listener.onSpringEndStateChange;
onChange&&onChange(this);}

return this;},



getEndValue:function(){
return this._endValue;},









setVelocity:function(velocity){
if(velocity===this._currentState.velocity){
return this;}

this._currentState.velocity=velocity;
this._springSystem.activateSpring(this.getId());
return this;},



getVelocity:function(){
return this._currentState.velocity;},




setRestSpeedThreshold:function(restSpeedThreshold){
this._restSpeedThreshold=restSpeedThreshold;
return this;},



getRestSpeedThreshold:function(){
return this._restSpeedThreshold;},





setRestDisplacementThreshold:function(displacementFromRestThreshold){
this._displacementFromRestThreshold=displacementFromRestThreshold;},



getRestDisplacementThreshold:function(){
return this._displacementFromRestThreshold;},







setOvershootClampingEnabled:function(enabled){
this._overshootClampingEnabled=enabled;
return this;},



isOvershootClampingEnabled:function(){
return this._overshootClampingEnabled;},





isOvershooting:function(){
var start=this._startValue;
var end=this._endValue;
return this._springConfig.tension>0&&(
start<end&&this.getCurrentValue()>end||
start>end&&this.getCurrentValue()<end);},







advance:function(time,realDeltaTime){
var isAtRest=this.isAtRest();

if(isAtRest&&this._wasAtRest){
return;}


var adjustedDeltaTime=realDeltaTime;
if(realDeltaTime>Spring.MAX_DELTA_TIME_SEC){
adjustedDeltaTime=Spring.MAX_DELTA_TIME_SEC;}


this._timeAccumulator+=adjustedDeltaTime;

var tension=this._springConfig.tension,
friction=this._springConfig.friction,

position=this._currentState.position,
velocity=this._currentState.velocity,
tempPosition=this._tempState.position,
tempVelocity=this._tempState.velocity,

aVelocity,aAcceleration,
bVelocity,bAcceleration,
cVelocity,cAcceleration,
dVelocity,dAcceleration,

dxdt,dvdt;

while(this._timeAccumulator>=Spring.SOLVER_TIMESTEP_SEC){

this._timeAccumulator-=Spring.SOLVER_TIMESTEP_SEC;

if(this._timeAccumulator<Spring.SOLVER_TIMESTEP_SEC){
this._previousState.position=position;
this._previousState.velocity=velocity;}


aVelocity=velocity;
aAcceleration=
tension*(this._endValue-tempPosition)-friction*velocity;

tempPosition=position+aVelocity*Spring.SOLVER_TIMESTEP_SEC*0.5;
tempVelocity=
velocity+aAcceleration*Spring.SOLVER_TIMESTEP_SEC*0.5;
bVelocity=tempVelocity;
bAcceleration=
tension*(this._endValue-tempPosition)-friction*tempVelocity;

tempPosition=position+bVelocity*Spring.SOLVER_TIMESTEP_SEC*0.5;
tempVelocity=
velocity+bAcceleration*Spring.SOLVER_TIMESTEP_SEC*0.5;
cVelocity=tempVelocity;
cAcceleration=
tension*(this._endValue-tempPosition)-friction*tempVelocity;

tempPosition=position+cVelocity*Spring.SOLVER_TIMESTEP_SEC*0.5;
tempVelocity=
velocity+cAcceleration*Spring.SOLVER_TIMESTEP_SEC*0.5;
dVelocity=tempVelocity;
dAcceleration=
tension*(this._endValue-tempPosition)-friction*tempVelocity;

dxdt=
1.0/6.0*(aVelocity+2.0*(bVelocity+cVelocity)+dVelocity);
dvdt=1.0/6.0*(
aAcceleration+2.0*(bAcceleration+cAcceleration)+dAcceleration);


position+=dxdt*Spring.SOLVER_TIMESTEP_SEC;
velocity+=dvdt*Spring.SOLVER_TIMESTEP_SEC;}


this._tempState.position=tempPosition;
this._tempState.velocity=tempVelocity;

this._currentState.position=position;
this._currentState.velocity=velocity;

if(this._timeAccumulator>0){
this._interpolate(this._timeAccumulator/Spring.SOLVER_TIMESTEP_SEC);}


if(this.isAtRest()||
this._overshootClampingEnabled&&this.isOvershooting()){

if(this._springConfig.tension>0){
this._startValue=this._endValue;
this._currentState.position=this._endValue;}else 
{
this._endValue=this._currentState.position;
this._startValue=this._endValue;}

this.setVelocity(0);
isAtRest=true;}


var notifyActivate=false;
if(this._wasAtRest){
this._wasAtRest=false;
notifyActivate=true;}


var notifyAtRest=false;
if(isAtRest){
this._wasAtRest=true;
notifyAtRest=true;}


this.notifyPositionUpdated(notifyActivate,notifyAtRest);},


notifyPositionUpdated:function(notifyActivate,notifyAtRest){
for(var i=0,len=this.listeners.length;i<len;i++){
var listener=this.listeners[i];
if(notifyActivate&&listener.onSpringActivate){
listener.onSpringActivate(this);}


if(listener.onSpringUpdate){
listener.onSpringUpdate(this);}


if(notifyAtRest&&listener.onSpringAtRest){
listener.onSpringAtRest(this);}}},









systemShouldAdvance:function(){
return !this.isAtRest()||!this.wasAtRest();},


wasAtRest:function(){
return this._wasAtRest;},








isAtRest:function(){
return Math.abs(this._currentState.velocity)<this._restSpeedThreshold&&(
this.getDisplacementDistanceForState(this._currentState)<=
this._displacementFromRestThreshold||
this._springConfig.tension===0);},






setAtRest:function(){
this._endValue=this._currentState.position;
this._tempState.position=this._currentState.position;
this._currentState.velocity=0;
return this;},


_interpolate:function(alpha){
this._currentState.position=this._currentState.position*
alpha+this._previousState.position*(1-alpha);
this._currentState.velocity=this._currentState.velocity*
alpha+this._previousState.velocity*(1-alpha);},


getListeners:function(){
return this.listeners;},


addListener:function(newListener){
this.listeners.push(newListener);
return this;},


removeListener:function(listenerToRemove){
removeFirst(this.listeners,listenerToRemove);
return this;},


removeAllListeners:function(){
this.listeners=[];
return this;},


currentValueIsApproximately:function(value){
return Math.abs(this.getCurrentValue()-value)<=
this.getRestDisplacementThreshold();}});









var PhysicsState=function PhysicsState(){};

util.extend(PhysicsState.prototype,{
position:0,
velocity:0});








var SpringConfig=rebound.SpringConfig=
function SpringConfig(tension,friction){
this.tension=tension;
this.friction=friction;};







var AnimationLooper=rebound.AnimationLooper=function AnimationLooper(){
this.springSystem=null;
var _this=this;
var _run=function(){
_this.springSystem.loop(Date.now());};


this.run=function(){
util.onFrame(_run);};};









rebound.SimulationLooper=function SimulationLooper(timestep){
this.springSystem=null;
var time=0;
var running=false;
timestep=timestep||16.667;

this.run=function(){
if(running){
return;}

running=true;
while(!this.springSystem.getIsIdle()){
this.springSystem.loop(time+=timestep);}

running=false;};};








rebound.SteppingSimulationLooper=function(timestep){
this.springSystem=null;
var time=0;



this.run=function(){};


this.step=function(timestep){
this.springSystem.loop(time+=timestep);};};








var OrigamiValueConverter=rebound.OrigamiValueConverter={
tensionFromOrigamiValue:function(oValue){
return (oValue-30.0)*3.62+194.0;},


origamiValueFromTension:function(tension){
return (tension-194.0)/3.62+30.0;},


frictionFromOrigamiValue:function(oValue){
return (oValue-8.0)*3.0+25.0;},


origamiFromFriction:function(friction){
return (friction-25.0)/3.0+8.0;}};










var BouncyConversion=rebound.BouncyConversion=function(bounciness,speed){
this.bounciness=bounciness;
this.speed=speed;
var b=this.normalize(bounciness/1.7,0,20.0);
b=this.projectNormal(b,0.0,0.8);
var s=this.normalize(speed/1.7,0,20.0);
this.bouncyTension=this.projectNormal(s,0.5,200);
this.bouncyFriction=this.quadraticOutInterpolation(
b,
this.b3Nobounce(this.bouncyTension),
0.01);};


util.extend(BouncyConversion.prototype,{

normalize:function(value,startValue,endValue){
return (value-startValue)/(endValue-startValue);},


projectNormal:function(n,start,end){
return start+n*(end-start);},


linearInterpolation:function(t,start,end){
return t*end+(1.0-t)*start;},


quadraticOutInterpolation:function(t,start,end){
return this.linearInterpolation(2*t-t*t,start,end);},


b3Friction1:function(x){
return 0.0007*Math.pow(x,3)-
0.031*Math.pow(x,2)+0.64*x+1.28;},


b3Friction2:function(x){
return 0.000044*Math.pow(x,3)-
0.006*Math.pow(x,2)+0.36*x+2.;},


b3Friction3:function(x){
return 0.00000045*Math.pow(x,3)-
0.000332*Math.pow(x,2)+0.1078*x+5.84;},


b3Nobounce:function(tension){
var friction=0;
if(tension<=18){
friction=this.b3Friction1(tension);}else 
if(tension>18&&tension<=44){
friction=this.b3Friction2(tension);}else 
{
friction=this.b3Friction3(tension);}

return friction;}});



util.extend(SpringConfig,{




fromOrigamiTensionAndFriction:function(tension,friction){
return new SpringConfig(
OrigamiValueConverter.tensionFromOrigamiValue(tension),
OrigamiValueConverter.frictionFromOrigamiValue(friction));},





fromBouncinessAndSpeed:function(bounciness,speed){
var bouncyConversion=new rebound.BouncyConversion(bounciness,speed);
return this.fromOrigamiTensionAndFriction(
bouncyConversion.bouncyTension,
bouncyConversion.bouncyFriction);},




coastingConfigWithOrigamiFriction:function(friction){
return new SpringConfig(
0,
OrigamiValueConverter.frictionFromOrigamiValue(friction));}});




SpringConfig.DEFAULT_ORIGAMI_SPRING_CONFIG=
SpringConfig.fromOrigamiTensionAndFriction(40,7);

util.extend(SpringConfig.prototype,{friction:0,tension:0});




var colorCache={};
util.hexToRGB=function(color){
if(colorCache[color]){
return colorCache[color];}

color=color.replace('#','');
if(color.length===3){
color=color[0]+color[0]+color[1]+color[1]+color[2]+color[2];}

var parts=color.match(/.{2}/g);

var ret={
r:parseInt(parts[0],16),
g:parseInt(parts[1],16),
b:parseInt(parts[2],16)};


colorCache[color]=ret;
return ret;};


util.rgbToHex=function(r,g,b){
r=r.toString(16);
g=g.toString(16);
b=b.toString(16);
r=r.length<2?'0'+r:r;
g=g.length<2?'0'+g:g;
b=b.length<2?'0'+b:b;
return '#'+r+g+b;};


var MathUtil=rebound.MathUtil={








mapValueInRange:function(value,fromLow,fromHigh,toLow,toHigh){
var fromRangeSize=fromHigh-fromLow;
var toRangeSize=toHigh-toLow;
var valueScale=(value-fromLow)/fromRangeSize;
return toLow+valueScale*toRangeSize;},





interpolateColor:
function(val,startColor,endColor,fromLow,fromHigh,asRGB){
fromLow=fromLow===undefined?0:fromLow;
fromHigh=fromHigh===undefined?1:fromHigh;
startColor=util.hexToRGB(startColor);
endColor=util.hexToRGB(endColor);
var r=Math.floor(
util.mapValueInRange(val,fromLow,fromHigh,startColor.r,endColor.r));

var g=Math.floor(
util.mapValueInRange(val,fromLow,fromHigh,startColor.g,endColor.g));

var b=Math.floor(
util.mapValueInRange(val,fromLow,fromHigh,startColor.b,endColor.b));

if(asRGB){
return 'rgb('+r+','+g+','+b+')';}else 
{
return util.rgbToHex(r,g,b);}},



degreesToRadians:function(deg){
return deg*Math.PI/180;},


radiansToDegrees:function(rad){
return rad*180/Math.PI;}};




util.extend(util,MathUtil);







function removeFirst(array,item){
var idx=array.indexOf(item);
idx!=-1&&array.splice(idx,1);}


var _onFrame;
if(typeof window!=='undefined'){
_onFrame=window.requestAnimationFrame||
window.webkitRequestAnimationFrame||
window.mozRequestAnimationFrame||
window.msRequestAnimationFrame||
window.oRequestAnimationFrame||
function(callback){
window.setTimeout(callback,1000/60);};}


if(!_onFrame&&typeof process!=='undefined'&&process.title==='node'){
_onFrame=setImmediate;}



util.onFrame=function onFrame(func){
return _onFrame(func);};




if(typeof exports!='undefined'){
util.extend(exports,rebound);}else 
if(typeof window!='undefined'){
window.rebound=rebound;}})();
});
__d(206 /* NavigatorIOS */, function(global, require, module, exports) {'use strict';












var EventEmitter=require(23 /* EventEmitter */);
var Image=require(175 /* Image */);
var NavigationContext=require(192 /* NavigationContext */);
var RCTNavigatorManager=require(11 /* NativeModules */).NavigatorManager;
var React=require(47 /* React */);
var StaticContainer=require(207 /* StaticContainer.react */);
var StyleSheet=require(148 /* StyleSheet */);
var View=require(127 /* View */);

var invariant=require(363 /* fbjs/lib/invariant */);
var logError=require(61 /* logError */);
var requireNativeComponent=require(146 /* requireNativeComponent */);
var resolveAssetSource=require(161 /* resolveAssetSource */);

var TRANSITIONER_REF='transitionerRef';

var PropTypes=React.PropTypes;

var __uid=0;
function getuid(){
return __uid++;}


var NavigatorTransitionerIOS=React.createClass({displayName:'NavigatorTransitionerIOS',
requestSchedulingNavigation:function(cb){
RCTNavigatorManager.requestSchedulingJavaScriptNavigation(
React.findNodeHandle(this),
logError,
cb);},



render:function(){
return (
React.createElement(RCTNavigator,this.props));}});




































































































































var NavigatorIOS=React.createClass({displayName:'NavigatorIOS',

propTypes:{






initialRoute:PropTypes.shape({



component:PropTypes.func.isRequired,




title:PropTypes.string.isRequired,





passProps:PropTypes.object,






backButtonIcon:Image.propTypes.source,






backButtonTitle:PropTypes.string,




leftButtonIcon:Image.propTypes.source,




leftButtonTitle:PropTypes.string,




onLeftButtonPress:PropTypes.func,




rightButtonIcon:Image.propTypes.source,




rightButtonTitle:PropTypes.string,




onRightButtonPress:PropTypes.func,




wrapperStyle:View.propTypes.style,




navigationBarHidden:PropTypes.bool,




shadowHidden:PropTypes.bool,




tintColor:PropTypes.string,




barTintColor:PropTypes.string,




titleTextColor:PropTypes.string,




translucent:PropTypes.bool}).

isRequired,




navigationBarHidden:PropTypes.bool,




shadowHidden:PropTypes.bool,





itemWrapperStyle:View.propTypes.style,




tintColor:PropTypes.string,




barTintColor:PropTypes.string,




titleTextColor:PropTypes.string,




translucent:PropTypes.bool},



navigator:undefined,
navigationContext:new NavigationContext(),

componentWillMount:function(){


this.navigator={
push:this.push,
pop:this.pop,
popN:this.popN,
replace:this.replace,
replacePrevious:this.replacePrevious,
replacePreviousAndPop:this.replacePreviousAndPop,
resetTo:this.resetTo,
popToRoute:this.popToRoute,
popToTop:this.popToTop,
navigationContext:this.navigationContext};

this._emitWillFocus(this.state.routeStack[this.state.observedTopOfStack]);},


componentDidMount:function(){
this._emitDidFocus(this.state.routeStack[this.state.observedTopOfStack]);},


componentWillUnmount:function(){
this.navigationContext.dispose();
this.navigationContext=new NavigationContext();},


getDefaultProps:function(){
return {
translucent:true};},



getInitialState:function(){
return {
idStack:[getuid()],
routeStack:[this.props.initialRoute],

requestedTopOfStack:0,






observedTopOfStack:0,
progress:1,
fromIndex:0,
toIndex:0,


makingNavigatorRequest:false,



updatingAllIndicesAtOrBeyond:0};},



_toFocusOnNavigationComplete:undefined,

_handleFocusRequest:function(item){
if(this.state.makingNavigatorRequest){
this._toFocusOnNavigationComplete=item;}else 
{
this._getFocusEmitter().emit('focus',item);}},



_focusEmitter:undefined,

_getFocusEmitter:function(){

var focusEmitter=this._focusEmitter;
if(!focusEmitter){
focusEmitter=new EventEmitter();
this._focusEmitter=focusEmitter;}

return focusEmitter;},


getChildContext:function()


{
return {
onFocusRequested:this._handleFocusRequest,
focusEmitter:this._getFocusEmitter()};},



childContextTypes:{
onFocusRequested:React.PropTypes.func,
focusEmitter:React.PropTypes.instanceOf(EventEmitter)},


_tryLockNavigator:function(cb){
this.refs[TRANSITIONER_REF].requestSchedulingNavigation(
function(acquiredLock){return acquiredLock&&cb();});},



_handleNavigatorStackChanged:function(e){
var newObservedTopOfStack=e.nativeEvent.stackLength-1;
this._emitDidFocus(this.state.routeStack[newObservedTopOfStack]);

invariant(
newObservedTopOfStack<=this.state.requestedTopOfStack,
'No navigator item should be pushed without JS knowing about it %s %s',newObservedTopOfStack,this.state.requestedTopOfStack);

var wasWaitingForConfirmation=
this.state.requestedTopOfStack!==this.state.observedTopOfStack;
if(wasWaitingForConfirmation){
invariant(
newObservedTopOfStack===this.state.requestedTopOfStack,
'If waiting for observedTopOfStack to reach requestedTopOfStack, '+
'the only valid observedTopOfStack should be requestedTopOfStack.');}











var nextState={
observedTopOfStack:newObservedTopOfStack,
makingNavigatorRequest:false,
updatingAllIndicesAtOrBeyond:null,
progress:1,
toIndex:newObservedTopOfStack,
fromIndex:newObservedTopOfStack};

this.setState(nextState,this._eliminateUnneededChildren);},


_eliminateUnneededChildren:function(){



var updatingAllIndicesAtOrBeyond=
this.state.routeStack.length>this.state.observedTopOfStack+1?
this.state.observedTopOfStack+1:
null;
this.setState({
idStack:this.state.idStack.slice(0,this.state.observedTopOfStack+1),
routeStack:this.state.routeStack.slice(0,this.state.observedTopOfStack+1),

requestedTopOfStack:this.state.observedTopOfStack,
makingNavigatorRequest:true,
updatingAllIndicesAtOrBeyond:updatingAllIndicesAtOrBeyond});},



_emitDidFocus:function(route){
this.navigationContext.emit('didfocus',{route:route});},


_emitWillFocus:function(route){
this.navigationContext.emit('willfocus',{route:route});},


push:function(route){var _this=this;
invariant(!!route,'Must supply route to push');

if(this.state.requestedTopOfStack===this.state.observedTopOfStack){
this._tryLockNavigator(function(){
_this._emitWillFocus(route);

var nextStack=_this.state.routeStack.concat([route]);
var nextIDStack=_this.state.idStack.concat([getuid()]);
_this.setState({


idStack:nextIDStack,
routeStack:nextStack,
requestedTopOfStack:nextStack.length-1,
makingNavigatorRequest:true,
updatingAllIndicesAtOrBeyond:nextStack.length-1});});}},





popN:function(n){var _this2=this;
if(n===0){
return;}


if(this.state.requestedTopOfStack===this.state.observedTopOfStack){
if(this.state.requestedTopOfStack>0){
this._tryLockNavigator(function(){
var newRequestedTopOfStack=_this2.state.requestedTopOfStack-n;
invariant(newRequestedTopOfStack>=0,'Cannot pop below 0');
_this2._emitWillFocus(_this2.state.routeStack[newRequestedTopOfStack]);
_this2.setState({
requestedTopOfStack:newRequestedTopOfStack,
makingNavigatorRequest:true,
updatingAllIndicesAtOrBeyond:_this2.state.requestedTopOfStack-n});});}}},






pop:function(){
this.popN(1);},








replaceAtIndex:function(route,index){
invariant(!!route,'Must supply route to replace');
if(index<0){
index+=this.state.routeStack.length;}


if(this.state.routeStack.length<=index){
return;}




var nextIDStack=this.state.idStack.slice();
var nextRouteStack=this.state.routeStack.slice();
nextIDStack[index]=getuid();
nextRouteStack[index]=route;

this.setState({
idStack:nextIDStack,
routeStack:nextRouteStack,
makingNavigatorRequest:false,
updatingAllIndicesAtOrBeyond:index});


this._emitWillFocus(route);
this._emitDidFocus(route);},





replace:function(route){
this.replaceAtIndex(route,-1);},





replacePrevious:function(route){
this.replaceAtIndex(route,-2);},


popToTop:function(){
this.popToRoute(this.state.routeStack[0]);},


popToRoute:function(route){
var indexOfRoute=this.state.routeStack.indexOf(route);
invariant(
indexOfRoute!==-1,
'Calling pop to route for a route that doesn\'t exist!');

var numToPop=this.state.routeStack.length-indexOfRoute-1;
this.popN(numToPop);},


replacePreviousAndPop:function(route){var _this3=this;

if(this.state.requestedTopOfStack!==this.state.observedTopOfStack){
return;}

if(this.state.routeStack.length<2){
return;}

this._tryLockNavigator(function(){
_this3.replacePrevious(route);
_this3.setState({
requestedTopOfStack:_this3.state.requestedTopOfStack-1,
makingNavigatorRequest:true});});},




resetTo:function(route){
invariant(!!route,'Must supply route to push');

if(this.state.requestedTopOfStack!==this.state.observedTopOfStack){
return;}

this.replaceAtIndex(route,0);
this.popToRoute(route);},


handleNavigationComplete:function(e){
if(this._toFocusOnNavigationComplete){
this._getFocusEmitter().emit('focus',this._toFocusOnNavigationComplete);
this._toFocusOnNavigationComplete=null;}

this._handleNavigatorStackChanged(e);},


_routeToStackItem:function(routeArg,i){var 
component=routeArg.component;var wrapperStyle=routeArg.wrapperStyle;var passProps=routeArg.passProps;var route=babelHelpers.objectWithoutProperties(routeArg,['component','wrapperStyle','passProps']);var _props=
this.props;var itemWrapperStyle=_props.itemWrapperStyle;var props=babelHelpers.objectWithoutProperties(_props,['itemWrapperStyle']);
var shouldUpdateChild=
this.state.updatingAllIndicesAtOrBeyond!=null&&
this.state.updatingAllIndicesAtOrBeyond>=i;
var Component=component;
return (
React.createElement(StaticContainer,{key:'nav'+i,shouldUpdate:shouldUpdateChild},
React.createElement(RCTNavigatorItem,babelHelpers.extends({},
props,
route,{
style:[
styles.stackItem,
itemWrapperStyle,
wrapperStyle]}),

React.createElement(Component,babelHelpers.extends({
navigator:this.navigator,
route:route},
passProps)))));},






renderNavigationStackItems:function(){
var shouldRecurseToNavigator=
this.state.makingNavigatorRequest||
this.state.updatingAllIndicesAtOrBeyond!==null;


var items=shouldRecurseToNavigator?
this.state.routeStack.map(this._routeToStackItem):null;
return (
React.createElement(StaticContainer,{shouldUpdate:shouldRecurseToNavigator},
React.createElement(NavigatorTransitionerIOS,{
ref:TRANSITIONER_REF,
style:styles.transitioner,
vertical:this.props.vertical,
requestedTopOfStack:this.state.requestedTopOfStack,
onNavigationComplete:this.handleNavigationComplete},
items)));},





render:function(){
return (
React.createElement(View,{style:this.props.style},
this.renderNavigationStackItems()));}});





var styles=StyleSheet.create({
stackItem:{
backgroundColor:'white',
overflow:'hidden',
position:'absolute',
top:0,
left:0,
right:0,
bottom:0},

transitioner:{
flex:1}});



var RCTNavigator=requireNativeComponent('RCTNavigator');
var RCTNavigatorItem=requireNativeComponent('RCTNavItem');

module.exports=NavigatorIOS;
});
__d(207 /* StaticContainer.react */, function(global, require, module, exports) {var 




















React=require(47 /* React */);

var onlyChild=require(170 /* onlyChild */);var 
















StaticContainer=function(_React$Component){babelHelpers.inherits(StaticContainer,_React$Component);function StaticContainer(){babelHelpers.classCallCheck(this,StaticContainer);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(StaticContainer).apply(this,arguments));}babelHelpers.createClass(StaticContainer,[{key:'shouldComponentUpdate',value:function shouldComponentUpdate(

nextProps){
return !!nextProps.shouldUpdate;}},{key:'render',value:function render()


{
var child=this.props.children;
return child===null||child===false?null:onlyChild(child);}}]);return StaticContainer;}(React.Component);




module.exports=StaticContainer;
});
__d(208 /* Picker */, function(global, require, module, exports) {'use strict';













var ColorPropType=require(134 /* ColorPropType */);
var PickerIOS=require(209 /* PickerIOS */);
var PickerAndroid=require(210 /* PickerAndroid */);
var Platform=require(4 /* Platform */);
var React=require(47 /* React */);
var StyleSheet=require(148 /* StyleSheet */);
var StyleSheetPropType=require(145 /* StyleSheetPropType */);
var TextStylePropTypes=require(138 /* TextStylePropTypes */);
var UnimplementedView=require(147 /* UnimplementedView */);
var View=require(127 /* View */);
var ViewStylePropTypes=require(139 /* ViewStylePropTypes */);

var itemStylePropType=StyleSheetPropType(TextStylePropTypes);

var pickerStyleType=StyleSheetPropType(babelHelpers.extends({},
ViewStylePropTypes,{
color:ColorPropType}));


var MODE_DIALOG='dialog';
var MODE_DROPDOWN='dropdown';











var Picker=React.createClass({displayName:'Picker',

statics:{



MODE_DIALOG:MODE_DIALOG,



MODE_DROPDOWN:MODE_DROPDOWN},


getDefaultProps:function(){
return {
mode:MODE_DIALOG};},



propTypes:babelHelpers.extends({},
View.propTypes,{
style:pickerStyleType,



selectedValue:React.PropTypes.any,





onValueChange:React.PropTypes.func,





enabled:React.PropTypes.bool,








mode:React.PropTypes.oneOf(['dialog','dropdown']),




itemStyle:itemStylePropType,




prompt:React.PropTypes.string,



testID:React.PropTypes.string}),


render:function(){
if(Platform.OS==='ios'){
return React.createElement(PickerIOS,this.props,this.props.children);}else 
if(Platform.OS==='android'){
return React.createElement(PickerAndroid,this.props,this.props.children);}else 
{
return React.createElement(UnimplementedView,null);}}});







Picker.Item=React.createClass({displayName:'Item',

propTypes:{



label:React.PropTypes.string.isRequired,




value:React.PropTypes.any,




color:ColorPropType,



testID:React.PropTypes.string},


render:function(){

throw null;}});



module.exports=Picker;
});
__d(209 /* PickerIOS */, function(global, require, module, exports) {'use strict';













var NativeMethodsMixin=require(2 /* NativeMethodsMixin */);
var React=require(47 /* React */);
var ReactChildren=require(165 /* ReactChildren */);
var RCTPickerIOSConsts=require(11 /* NativeModules */).UIManager.RCTPicker.Constants;
var StyleSheet=require(148 /* StyleSheet */);
var StyleSheetPropType=require(145 /* StyleSheetPropType */);
var TextStylePropTypes=require(138 /* TextStylePropTypes */);
var View=require(127 /* View */);

var itemStylePropType=StyleSheetPropType(TextStylePropTypes);
var requireNativeComponent=require(146 /* requireNativeComponent */);

var PickerIOS=React.createClass({displayName:'PickerIOS',
mixins:[NativeMethodsMixin],

propTypes:babelHelpers.extends({},
View.propTypes,{
itemStyle:itemStylePropType,
onValueChange:React.PropTypes.func,
selectedValue:React.PropTypes.any}),


getInitialState:function(){
return this._stateFromProps(this.props);},


componentWillReceiveProps:function(nextProps){
this.setState(this._stateFromProps(nextProps));},



_stateFromProps:function(props){
var selectedIndex=0;
var items=[];
ReactChildren.forEach(props.children,function(child,index){
if(child.props.value===props.selectedValue){
selectedIndex=index;}

items.push({value:child.props.value,label:child.props.label});});

return {selectedIndex:selectedIndex,items:items};},


render:function(){var _this=this;
return (
React.createElement(View,{style:this.props.style},
React.createElement(RCTPickerIOS,{
ref:function(picker){return _this._picker=picker;},
style:[styles.pickerIOS,this.props.itemStyle],
items:this.state.items,
selectedIndex:this.state.selectedIndex,
onChange:this._onChange})));},





_onChange:function(event){
if(this.props.onChange){
this.props.onChange(event);}

if(this.props.onValueChange){
this.props.onValueChange(event.nativeEvent.newValue,event.nativeEvent.newIndex);}








if(this._picker&&this.state.selectedIndex!==event.nativeEvent.newIndex){
this._picker.setNativeProps({
selectedIndex:this.state.selectedIndex});}}});





PickerIOS.Item=React.createClass({displayName:'Item',
propTypes:{
value:React.PropTypes.any,
label:React.PropTypes.string},


render:function(){

return null;}});



var styles=StyleSheet.create({
pickerIOS:{



height:RCTPickerIOSConsts.ComponentHeight}});



var RCTPickerIOS=requireNativeComponent('RCTPicker',{
propTypes:{
style:itemStylePropType}},

{
nativeOnly:{
items:true,
onChange:true,
selectedIndex:true}});



module.exports=PickerIOS;
});
__d(210 /* PickerAndroid */, function(global, require, module, exports) {'use strict';











module.exports=require(147 /* UnimplementedView */);
});
__d(211 /* ProgressBarAndroid */, function(global, require, module, exports) {'use strict';











module.exports=require(147 /* UnimplementedView */);
});
__d(212 /* ProgressViewIOS */, function(global, require, module, exports) {'use strict';












var Image=require(175 /* Image */);
var NativeMethodsMixin=require(2 /* NativeMethodsMixin */);
var NativeModules=require(11 /* NativeModules */);
var PropTypes=require(41 /* ReactPropTypes */);
var React=require(47 /* React */);
var StyleSheet=require(148 /* StyleSheet */);
var View=require(127 /* View */);

var requireNativeComponent=require(146 /* requireNativeComponent */);




var ProgressViewIOS=React.createClass({displayName:'ProgressViewIOS',
mixins:[NativeMethodsMixin],

propTypes:babelHelpers.extends({},
View.propTypes,{



progressViewStyle:PropTypes.oneOf(['default','bar']),




progress:PropTypes.number,




progressTintColor:PropTypes.string,




trackTintColor:PropTypes.string,




progressImage:Image.propTypes.source,




trackImage:Image.propTypes.source}),


render:function(){
return (
React.createElement(RCTProgressView,babelHelpers.extends({},
this.props,{
style:[styles.progressView,this.props.style]})));}});





var styles=StyleSheet.create({
progressView:{
height:NativeModules.ProgressViewManager.ComponentHeight}});



var RCTProgressView=requireNativeComponent(
'RCTProgressView',
ProgressViewIOS);


module.exports=ProgressViewIOS;
});
__d(213 /* SegmentedControlIOS */, function(global, require, module, exports) {'use strict';












var NativeMethodsMixin=require(2 /* NativeMethodsMixin */);
var NativeModules=require(11 /* NativeModules */);
var PropTypes=require(41 /* ReactPropTypes */);
var React=require(47 /* React */);
var StyleSheet=require(148 /* StyleSheet */);
var View=require(127 /* View */);

var requireNativeComponent=require(146 /* requireNativeComponent */);






var SEGMENTED_CONTROL_REFERENCE='segmentedcontrol';























var SegmentedControlIOS=React.createClass({displayName:'SegmentedControlIOS',
mixins:[NativeMethodsMixin],

propTypes:babelHelpers.extends({},
View.propTypes,{



values:PropTypes.arrayOf(PropTypes.string),




selectedIndex:PropTypes.number,





onValueChange:PropTypes.func,





onChange:PropTypes.func,





enabled:PropTypes.bool,




tintColor:PropTypes.string,





momentary:PropTypes.bool}),


getDefaultProps:function(){
return {
values:[],
enabled:true};},



_onChange:function(event){
this.props.onChange&&this.props.onChange(event);
this.props.onValueChange&&this.props.onValueChange(event.nativeEvent.value);},


render:function(){
return (
React.createElement(RCTSegmentedControl,babelHelpers.extends({},
this.props,{
ref:SEGMENTED_CONTROL_REFERENCE,
style:[styles.segmentedControl,this.props.style],
onChange:this._onChange})));}});





var styles=StyleSheet.create({
segmentedControl:{
height:NativeModules.SegmentedControlManager.ComponentHeight}});



var RCTSegmentedControl=requireNativeComponent(
'RCTSegmentedControl',
SegmentedControlIOS);


module.exports=SegmentedControlIOS;
});
__d(214 /* SliderIOS */, function(global, require, module, exports) {'use strict';












var Image=require(175 /* Image */);
var NativeMethodsMixin=require(2 /* NativeMethodsMixin */);
var PropTypes=require(41 /* ReactPropTypes */);
var React=require(47 /* React */);
var StyleSheet=require(148 /* StyleSheet */);
var View=require(127 /* View */);

var requireNativeComponent=require(146 /* requireNativeComponent */);



var SliderIOS=React.createClass({displayName:'SliderIOS',
mixins:[NativeMethodsMixin],

propTypes:babelHelpers.extends({},
View.propTypes,{




style:View.propTypes.style,









value:PropTypes.number,






step:PropTypes.number,




minimumValue:PropTypes.number,




maximumValue:PropTypes.number,





minimumTrackTintColor:PropTypes.string,





maximumTrackTintColor:PropTypes.string,





disabled:PropTypes.bool,





trackImage:Image.propTypes.source,





minimumTrackImage:Image.propTypes.source,





maximumTrackImage:Image.propTypes.source,




thumbImage:Image.propTypes.source,




onValueChange:PropTypes.func,





onSlidingComplete:PropTypes.func}),


getDefaultProps:function(){
return {
disabled:false};},



render:function(){var _props=
this.props;var style=_props.style;var onValueChange=_props.onValueChange;var onSlidingComplete=_props.onSlidingComplete;var props=babelHelpers.objectWithoutProperties(_props,['style','onValueChange','onSlidingComplete']);
props.style=[styles.slider,style];

props.onValueChange=onValueChange&&function(event){
onValueChange&&onValueChange(event.nativeEvent.value);};


props.onSlidingComplete=onSlidingComplete&&function(event){
onSlidingComplete&&onSlidingComplete(event.nativeEvent.value);};


return React.createElement(RCTSlider,props);}});



var styles=StyleSheet.create({
slider:{
height:40}});



var RCTSlider=requireNativeComponent('RCTSlider',SliderIOS);

module.exports=SliderIOS;
});
__d(215 /* SnapshotViewIOS */, function(global, require, module, exports) {'use strict';












var React=require(47 /* React */);
var StyleSheet=require(148 /* StyleSheet */);var _require=
require(11 /* NativeModules */);var TestModule=_require.TestModule;
var UIManager=require(10 /* UIManager */);
var View=require(127 /* View */);

var requireNativeComponent=require(146 /* requireNativeComponent */);

var SnapshotViewIOS=React.createClass({displayName:'SnapshotViewIOS',
onDefaultAction:function(event){
TestModule.verifySnapshot(TestModule.markTestPassed);},


render:function(){
var testIdentifier=this.props.testIdentifier||'test';
var onSnapshotReady=this.props.onSnapshotReady||this.onDefaultAction;
return (
React.createElement(RCTSnapshot,babelHelpers.extends({
style:style.snapshot},
this.props,{
onSnapshotReady:onSnapshotReady,
testIdentifier:testIdentifier})));},




propTypes:babelHelpers.extends({},
View.propTypes,{

onSnapshotReady:React.PropTypes.func,

testIdentifier:React.PropTypes.string})});



var style=StyleSheet.create({
snapshot:{
flex:1}});






var RCTSnapshot=UIManager.RCTSnapshot?
requireNativeComponent('RCTSnapshot',SnapshotViewIOS):
View;

module.exports=SnapshotViewIOS;
});
__d(216 /* Switch */, function(global, require, module, exports) {'use strict';







var ColorPropType=require(134 /* ColorPropType */);
var NativeMethodsMixin=require(2 /* NativeMethodsMixin */);
var Platform=require(4 /* Platform */);
var React=require(47 /* React */);
var StyleSheet=require(148 /* StyleSheet */);
var View=require(127 /* View */);

var requireNativeComponent=require(146 /* requireNativeComponent */);









var Switch=React.createClass({displayName:'Switch',
propTypes:babelHelpers.extends({},
View.propTypes,{




value:React.PropTypes.bool,




disabled:React.PropTypes.bool,



onValueChange:React.PropTypes.func,



testID:React.PropTypes.string,





tintColor:ColorPropType,




onTintColor:ColorPropType,




thumbTintColor:ColorPropType}),


getDefaultProps:function(){
return {
value:false,
disabled:false};},



mixins:[NativeMethodsMixin],

_rctSwitch:{},
_onChange:function(event){
this.props.onChange&&this.props.onChange(event);
this.props.onValueChange&&this.props.onValueChange(event.nativeEvent.value);



if(Platform.OS==='android'){
this._rctSwitch.setNativeProps({on:this.props.value});}else 
{
this._rctSwitch.setNativeProps({value:this.props.value});}},



render:function(){var _this=this;
var props=babelHelpers.extends({},this.props);
props.onStartShouldSetResponder=function(){return true;};
props.onResponderTerminationRequest=function(){return false;};
if(Platform.OS==='android'){
props.enabled=!this.props.disabled;
props.on=this.props.value;
props.style=this.props.style;}else 
if(Platform.OS==='ios'){
props.style=[styles.rctSwitchIOS,this.props.style];}

return (
React.createElement(RCTSwitch,babelHelpers.extends({},
props,{
ref:function(ref){_this._rctSwitch=ref;},
onChange:this._onChange})));}});





var styles=StyleSheet.create({
rctSwitchIOS:{
height:31,
width:51}});



if(Platform.OS==='android'){
var RCTSwitch=requireNativeComponent('AndroidSwitch',Switch,{
nativeOnly:{onChange:true,on:true,enabled:true}});}else 

{
var RCTSwitch=requireNativeComponent('RCTSwitch',Switch,{
nativeOnly:{onChange:true}});}



module.exports=Switch;
});
__d(217 /* PullToRefreshViewAndroid */, function(global, require, module, exports) {'use strict';











module.exports=require(147 /* UnimplementedView */);
});
__d(218 /* RecyclerViewBackedScrollView */, function(global, require, module, exports) {'use strict';






module.exports=require(181 /* ScrollView */);
});
__d(219 /* RefreshControl */, function(global, require, module, exports) {'use strict';












var ColorPropType=require(134 /* ColorPropType */);
var NativeMethodsMixin=require(2 /* NativeMethodsMixin */);
var Platform=require(4 /* Platform */);
var React=require(47 /* React */);
var View=require(127 /* View */);

var requireNativeComponent=require(146 /* requireNativeComponent */);

if(Platform.OS==='android'){
var RefreshLayoutConsts=require(11 /* NativeModules */).UIManager.AndroidSwipeRefreshLayout.Constants;}else 
{
var RefreshLayoutConsts={SIZE:{}};}















































var RefreshControl=React.createClass({displayName:'RefreshControl',
statics:{
SIZE:RefreshLayoutConsts.SIZE},


mixins:[NativeMethodsMixin],

propTypes:babelHelpers.extends({},
View.propTypes,{



onRefresh:React.PropTypes.func,



refreshing:React.PropTypes.bool,




tintColor:ColorPropType,




title:React.PropTypes.string,




enabled:React.PropTypes.bool,




colors:React.PropTypes.arrayOf(ColorPropType),




progressBackgroundColor:ColorPropType,




size:React.PropTypes.oneOf(RefreshLayoutConsts.SIZE.DEFAULT,RefreshLayoutConsts.SIZE.LARGE)}),


_nativeRef:{},

render:function(){var _this=this;
return (
React.createElement(NativeRefreshControl,babelHelpers.extends({},
this.props,{
ref:function(ref){return _this._nativeRef=ref;},
onRefresh:this._onRefresh})));},




_onRefresh:function(){
this.props.onRefresh&&this.props.onRefresh();
this._nativeRef.setNativeProps({refreshing:this.props.refreshing});}});



if(Platform.OS==='ios'){
var NativeRefreshControl=requireNativeComponent(
'RCTRefreshControl',
RefreshControl);}else 

if(Platform.OS==='android'){
var NativeRefreshControl=requireNativeComponent(
'AndroidSwipeRefreshLayout',
RefreshControl);}



module.exports=RefreshControl;
});
__d(220 /* StatusBar */, function(global, require, module, exports) {'use strict';












var React=require(47 /* React */);
var ColorPropType=require(134 /* ColorPropType */);
var Platform=require(4 /* Platform */);

var processColor=require(30 /* processColor */);

var StatusBarManager=require(11 /* NativeModules */).StatusBarManager;



















function mergePropsStack(propsStack,defaultValues){
return propsStack.reduce(function(prev,cur){
for(var prop in cur){
if(cur[prop]!=null){
prev[prop]=cur[prop];}}


return prev;},
babelHelpers.extends({},defaultValues));}






function createStackEntry(props){
return {
backgroundColor:props.backgroundColor!=null?{
value:props.backgroundColor,
animated:props.animated}:
null,
barStyle:props.barStyle!=null?{
value:props.barStyle,
animated:props.animated}:
null,
translucent:props.translucent,
hidden:props.hidden!=null?{
value:props.hidden,
animated:props.animated,
transition:props.showHideTransition}:
null,
networkActivityIndicatorVisible:props.networkActivityIndicatorVisible};}






































var StatusBar=React.createClass({displayName:'StatusBar',
statics:{
_propsStack:[],
_defaultProps:createStackEntry({
animated:false,
showHideTransition:'fade',
backgroundColor:'black',
barStyle:'default',
translucent:false,
hidden:false,
networkActivityIndicatorVisible:false}),


_updateImmediate:null,

_currentValues:null,








currentHeight:StatusBarManager.HEIGHT,



setHidden:function(hidden,animation){
animation=animation||'none';
StatusBar._defaultProps.hidden.value=hidden;
if(Platform.OS==='ios'){
StatusBarManager.setHidden(hidden,animation);}else 
if(Platform.OS==='android'){
StatusBarManager.setHidden(hidden);}},



setBarStyle:function(style,animated){
if(Platform.OS!=='ios'){
console.warn('`setBarStyle` is only available on iOS');
return;}

animated=animated||false;
StatusBar._defaultProps.barStyle.value=style;
StatusBarManager.setStyle(style,animated);},


setNetworkActivityIndicatorVisible:function(visible){
if(Platform.OS!=='ios'){
console.warn('`setNetworkActivityIndicatorVisible` is only available on iOS');
return;}

StatusBar._defaultProps.networkActivityIndicatorVisible=visible;
StatusBarManager.setNetworkActivityIndicatorVisible(visible);},


setBackgroundColor:function(color,animated){
if(Platform.OS!=='android'){
console.warn('`setBackgroundColor` is only available on Android');
return;}

animated=animated||false;
StatusBar._defaultProps.backgroundColor.value=color;
StatusBarManager.setColor(processColor(color),animated);},


setTranslucent:function(translucent){
if(Platform.OS!=='android'){
console.warn('`setTranslucent` is only available on Android');
return;}

StatusBar._defaultProps.translucent=translucent;
StatusBarManager.setTranslucent(translucent);}},



propTypes:{



hidden:React.PropTypes.bool,




animated:React.PropTypes.bool,




backgroundColor:ColorPropType,







translucent:React.PropTypes.bool,





barStyle:React.PropTypes.oneOf([
'default',
'light-content']),






networkActivityIndicatorVisible:React.PropTypes.bool,






showHideTransition:React.PropTypes.oneOf([
'fade',
'slide'])},



getDefaultProps:function(){
return {
animated:false,
showHideTransition:'fade'};},



_stackEntry:null,

componentDidMount:function(){




this._stackEntry=createStackEntry(this.props);
StatusBar._propsStack.push(this._stackEntry);
this._updatePropsStack();},


componentWillUnmount:function(){


var index=StatusBar._propsStack.indexOf(this._stackEntry);
StatusBar._propsStack.splice(index,1);

this._updatePropsStack();},


componentDidUpdate:function(){
var index=StatusBar._propsStack.indexOf(this._stackEntry);
this._stackEntry=createStackEntry(this.props);
StatusBar._propsStack[index]=this._stackEntry;

this._updatePropsStack();},





_updatePropsStack:function(){

clearImmediate(StatusBar._updateImmediate);
StatusBar._updateImmediate=setImmediate(function(){
var oldProps=StatusBar._currentValues;
var mergedProps=mergePropsStack(StatusBar._propsStack,StatusBar._defaultProps);


if(Platform.OS==='ios'){
if(!oldProps||oldProps.barStyle.value!==mergedProps.barStyle.value){
StatusBarManager.setStyle(
mergedProps.barStyle.value,
mergedProps.barStyle.animated);}


if(!oldProps||oldProps.hidden.value!==mergedProps.hidden.value){
StatusBarManager.setHidden(
mergedProps.hidden.value,
mergedProps.hidden.animated?
mergedProps.hidden.transition:
'none');}



if(!oldProps||oldProps.networkActivityIndicatorVisible!==mergedProps.networkActivityIndicatorVisible){
StatusBarManager.setNetworkActivityIndicatorVisible(
mergedProps.networkActivityIndicatorVisible);}}else 


if(Platform.OS==='android'){
if(!oldProps||oldProps.backgroundColor.value!==mergedProps.backgroundColor.value){
StatusBarManager.setColor(
processColor(mergedProps.backgroundColor.value),
mergedProps.backgroundColor.animated);}


if(!oldProps||oldProps.hidden.value!==mergedProps.hidden.value){
StatusBarManager.setHidden(mergedProps.hidden.value);}

if(!oldProps||oldProps.translucent!==mergedProps.translucent){
StatusBarManager.setTranslucent(mergedProps.translucent);}}



StatusBar._currentValues=mergedProps;});},



render:function(){
return null;}});



module.exports=StatusBar;
});
__d(221 /* SwitchAndroid */, function(global, require, module, exports) {'use strict';











module.exports=require(147 /* UnimplementedView */);
});
__d(222 /* SwitchIOS */, function(global, require, module, exports) {'use strict';














var ColorPropType=require(134 /* ColorPropType */);
var NativeMethodsMixin=require(2 /* NativeMethodsMixin */);
var PropTypes=require(41 /* ReactPropTypes */);
var React=require(47 /* React */);
var StyleSheet=require(148 /* StyleSheet */);
var View=require(127 /* View */);

var requireNativeComponent=require(146 /* requireNativeComponent */);

var SWITCH='switch';















var SwitchIOS=React.createClass({displayName:'SwitchIOS',
mixins:[NativeMethodsMixin],

propTypes:babelHelpers.extends({},
View.propTypes,{




value:PropTypes.bool,





disabled:PropTypes.bool,




onValueChange:PropTypes.func,




onTintColor:ColorPropType,




thumbTintColor:ColorPropType,




tintColor:ColorPropType}),


getDefaultProps:function(){
return {
value:false,
disabled:false};},



_onChange:function(event){


this.refs[SWITCH].setNativeProps({value:this.props.value});

if(this.props.value===event.nativeEvent.value||this.props.disabled){
return;}


this.props.onChange&&this.props.onChange(event);
this.props.onValueChange&&this.props.onValueChange(event.nativeEvent.value);},


render:function(){
return (
React.createElement(RCTSwitch,babelHelpers.extends({},
this.props,{
ref:SWITCH,
onChange:this._onChange,
style:[styles.rkSwitch,this.props.style]})));}});





var styles=StyleSheet.create({
rkSwitch:{
height:31,
width:51}});



var RCTSwitch=requireNativeComponent('RCTSwitch',SwitchIOS,{
nativeOnly:{onChange:true}});


module.exports=SwitchIOS;
});
__d(223 /* TabBarIOS */, function(global, require, module, exports) {'use strict';












var ColorPropType=require(134 /* ColorPropType */);
var React=require(47 /* React */);
var StyleSheet=require(148 /* StyleSheet */);
var TabBarItemIOS=require(224 /* TabBarItemIOS */);
var View=require(127 /* View */);

var requireNativeComponent=require(146 /* requireNativeComponent */);

var TabBarIOS=React.createClass({displayName:'TabBarIOS',
statics:{
Item:TabBarItemIOS},


propTypes:babelHelpers.extends({},
View.propTypes,{
style:View.propTypes.style,



tintColor:ColorPropType,



barTintColor:ColorPropType,



translucent:React.PropTypes.bool}),


render:function(){
return (
React.createElement(RCTTabBar,{
style:[styles.tabGroup,this.props.style],
tintColor:this.props.tintColor,
barTintColor:this.props.barTintColor,
translucent:this.props.translucent!==false},
this.props.children));}});





var styles=StyleSheet.create({
tabGroup:{
flex:1}});



var RCTTabBar=requireNativeComponent('RCTTabBar',TabBarIOS);

module.exports=TabBarIOS;
});
__d(224 /* TabBarItemIOS */, function(global, require, module, exports) {'use strict';












var Image=require(175 /* Image */);
var React=require(47 /* React */);
var StaticContainer=require(207 /* StaticContainer.react */);
var StyleSheet=require(148 /* StyleSheet */);
var View=require(127 /* View */);

var requireNativeComponent=require(146 /* requireNativeComponent */);

var TabBarItemIOS=React.createClass({displayName:'TabBarItemIOS',
propTypes:babelHelpers.extends({},
View.propTypes,{



badge:React.PropTypes.oneOfType([
React.PropTypes.string,
React.PropTypes.number]),






systemIcon:React.PropTypes.oneOf([
'bookmarks',
'contacts',
'downloads',
'favorites',
'featured',
'history',
'more',
'most-recent',
'most-viewed',
'recents',
'search',
'top-rated']),




icon:Image.propTypes.source,




selectedIcon:Image.propTypes.source,




onPress:React.PropTypes.func,




selected:React.PropTypes.bool,



style:View.propTypes.style,




title:React.PropTypes.string}),


getInitialState:function(){
return {
hasBeenSelected:false};},



componentWillMount:function(){
if(this.props.selected){
this.setState({hasBeenSelected:true});}},



componentWillReceiveProps:function(nextProps){
if(this.state.hasBeenSelected||nextProps.selected){
this.setState({hasBeenSelected:true});}},



render:function(){var _props=
this.props;var style=_props.style;var children=_props.children;var props=babelHelpers.objectWithoutProperties(_props,['style','children']);



if(this.state.hasBeenSelected){
var tabContents=
React.createElement(StaticContainer,{shouldUpdate:this.props.selected},
children);}else 

{
var tabContents=React.createElement(View,null);}


return (
React.createElement(RCTTabBarItem,babelHelpers.extends({},
props,{
style:[styles.tab,style]}),
tabContents));}});





var styles=StyleSheet.create({
tab:{
position:'absolute',
top:0,
right:0,
bottom:0,
left:0}});



var RCTTabBarItem=requireNativeComponent('RCTTabBarItem',TabBarItemIOS);

module.exports=TabBarItemIOS;
});
__d(225 /* Text */, function(global, require, module, exports) {'use strict';












var NativeMethodsMixin=require(2 /* NativeMethodsMixin */);
var Platform=require(4 /* Platform */);
var React=require(47 /* React */);
var ReactInstanceMap=require(39 /* ReactInstanceMap */);
var ReactNativeViewAttributes=require(144 /* ReactNativeViewAttributes */);
var StyleSheetPropType=require(145 /* StyleSheetPropType */);
var TextStylePropTypes=require(138 /* TextStylePropTypes */);
var Touchable=require(226 /* Touchable */);

var createReactNativeComponentClass=
require(152 /* createReactNativeComponentClass */);
var merge=require(103 /* merge */);

var stylePropType=StyleSheetPropType(TextStylePropTypes);

var viewConfig={
validAttributes:merge(ReactNativeViewAttributes.UIView,{
isHighlighted:true,
numberOfLines:true,
allowFontScaling:true}),

uiViewClassName:'RCTText'};



































var Text=React.createClass({displayName:'Text',
propTypes:{





numberOfLines:React.PropTypes.number,





onLayout:React.PropTypes.func,



onPress:React.PropTypes.func,





suppressHighlighting:React.PropTypes.bool,
style:stylePropType,



testID:React.PropTypes.string,




allowFontScaling:React.PropTypes.bool},

getDefaultProps:function(){
return {
accessible:true,
allowFontScaling:true};},


getInitialState:function(){
return merge(Touchable.Mixin.touchableGetInitialState(),{
isHighlighted:false});},


mixins:[NativeMethodsMixin],
viewConfig:viewConfig,
getChildContext:function(){
return {isInAParentText:true};},

childContextTypes:{
isInAParentText:React.PropTypes.bool},

contextTypes:{
isInAParentText:React.PropTypes.bool},




_handlers:null,




touchableHandleActivePressIn:null,
touchableHandleActivePressOut:null,
touchableHandlePress:null,
touchableGetPressRectOffset:null,
render:function(){var _this=this;
var newProps=this.props;
if(this.props.onStartShouldSetResponder||this.props.onPress){
if(!this._handlers){
this._handlers={
onStartShouldSetResponder:function(){
var shouldSetFromProps=_this.props.onStartShouldSetResponder&&
_this.props.onStartShouldSetResponder();
var setResponder=shouldSetFromProps||!!_this.props.onPress;
if(setResponder&&!_this.touchableHandleActivePressIn){


for(var key in Touchable.Mixin){
if(typeof Touchable.Mixin[key]==='function'){
_this[key]=Touchable.Mixin[key].bind(_this);}}


_this.touchableHandleActivePressIn=function(){
if(_this.props.suppressHighlighting||!_this.props.onPress){
return;}

_this.setState({
isHighlighted:true});};



_this.touchableHandleActivePressOut=function(){
if(_this.props.suppressHighlighting||!_this.props.onPress){
return;}

_this.setState({
isHighlighted:false});};



_this.touchableHandlePress=function(){
_this.props.onPress&&_this.props.onPress();};


_this.touchableGetPressRectOffset=function(){
return PRESS_RECT_OFFSET;};}


return setResponder;},

onResponderGrant:function(e,dispatchID){
this.touchableHandleResponderGrant(e,dispatchID);
this.props.onResponderGrant&&
this.props.onResponderGrant.apply(this,arguments);}.
bind(this),
onResponderMove:function(e){
this.touchableHandleResponderMove(e);
this.props.onResponderMove&&
this.props.onResponderMove.apply(this,arguments);}.
bind(this),
onResponderRelease:function(e){
this.touchableHandleResponderRelease(e);
this.props.onResponderRelease&&
this.props.onResponderRelease.apply(this,arguments);}.
bind(this),
onResponderTerminate:function(e){
this.touchableHandleResponderTerminate(e);
this.props.onResponderTerminate&&
this.props.onResponderTerminate.apply(this,arguments);}.
bind(this),
onResponderTerminationRequest:function(){


var allowTermination=this.touchableHandleResponderTerminationRequest();
if(allowTermination&&this.props.onResponderTerminationRequest){
allowTermination=this.props.onResponderTerminationRequest.apply(this,arguments);}

return allowTermination;}.
bind(this)};}


newProps=babelHelpers.extends({},
this.props,
this._handlers,{
isHighlighted:this.state.isHighlighted});}


if(this.context.isInAParentText){
return React.createElement(RCTVirtualText,newProps);}else 
{
return React.createElement(RCTText,newProps);}}});











var PRESS_RECT_OFFSET={top:20,left:20,right:20,bottom:30};

var RCTText=createReactNativeComponentClass(viewConfig);
var RCTVirtualText=RCTText;

if(Platform.OS==='android'){
RCTVirtualText=createReactNativeComponentClass({
validAttributes:merge(ReactNativeViewAttributes.UIView,{
isHighlighted:true}),

uiViewClassName:'RCTVirtualText'});}



module.exports=Text;
});
__d(226 /* Touchable */, function(global, require, module, exports) {'use strict';





var BoundingDimensions=require(227 /* BoundingDimensions */);
var Position=require(228 /* Position */);
var TouchEventUtils=require(527 /* fbjs/lib/TouchEventUtils */);

var keyMirror=require(362 /* fbjs/lib/keyMirror */);
var queryLayoutByID=require(229 /* queryLayoutByID */);

























































































var States=keyMirror({
NOT_RESPONDER:null,
RESPONDER_INACTIVE_PRESS_IN:null,
RESPONDER_INACTIVE_PRESS_OUT:null,
RESPONDER_ACTIVE_PRESS_IN:null,
RESPONDER_ACTIVE_PRESS_OUT:null,
RESPONDER_ACTIVE_LONG_PRESS_IN:null,
RESPONDER_ACTIVE_LONG_PRESS_OUT:null,
ERROR:null});





var IsActive={
RESPONDER_ACTIVE_PRESS_OUT:true,
RESPONDER_ACTIVE_PRESS_IN:true};






var IsPressingIn={
RESPONDER_INACTIVE_PRESS_IN:true,
RESPONDER_ACTIVE_PRESS_IN:true,
RESPONDER_ACTIVE_LONG_PRESS_IN:true};


var IsLongPressingIn={
RESPONDER_ACTIVE_LONG_PRESS_IN:true};





var Signals=keyMirror({
DELAY:null,
RESPONDER_GRANT:null,
RESPONDER_RELEASE:null,
RESPONDER_TERMINATED:null,
ENTER_PRESS_RECT:null,
LEAVE_PRESS_RECT:null,
LONG_PRESS_DETECTED:null});





var Transitions={
NOT_RESPONDER:{
DELAY:States.ERROR,
RESPONDER_GRANT:States.RESPONDER_INACTIVE_PRESS_IN,
RESPONDER_RELEASE:States.ERROR,
RESPONDER_TERMINATED:States.ERROR,
ENTER_PRESS_RECT:States.ERROR,
LEAVE_PRESS_RECT:States.ERROR,
LONG_PRESS_DETECTED:States.ERROR},

RESPONDER_INACTIVE_PRESS_IN:{
DELAY:States.RESPONDER_ACTIVE_PRESS_IN,
RESPONDER_GRANT:States.ERROR,
RESPONDER_RELEASE:States.NOT_RESPONDER,
RESPONDER_TERMINATED:States.NOT_RESPONDER,
ENTER_PRESS_RECT:States.RESPONDER_INACTIVE_PRESS_IN,
LEAVE_PRESS_RECT:States.RESPONDER_INACTIVE_PRESS_OUT,
LONG_PRESS_DETECTED:States.ERROR},

RESPONDER_INACTIVE_PRESS_OUT:{
DELAY:States.RESPONDER_ACTIVE_PRESS_OUT,
RESPONDER_GRANT:States.ERROR,
RESPONDER_RELEASE:States.NOT_RESPONDER,
RESPONDER_TERMINATED:States.NOT_RESPONDER,
ENTER_PRESS_RECT:States.RESPONDER_INACTIVE_PRESS_IN,
LEAVE_PRESS_RECT:States.RESPONDER_INACTIVE_PRESS_OUT,
LONG_PRESS_DETECTED:States.ERROR},

RESPONDER_ACTIVE_PRESS_IN:{
DELAY:States.ERROR,
RESPONDER_GRANT:States.ERROR,
RESPONDER_RELEASE:States.NOT_RESPONDER,
RESPONDER_TERMINATED:States.NOT_RESPONDER,
ENTER_PRESS_RECT:States.RESPONDER_ACTIVE_PRESS_IN,
LEAVE_PRESS_RECT:States.RESPONDER_ACTIVE_PRESS_OUT,
LONG_PRESS_DETECTED:States.RESPONDER_ACTIVE_LONG_PRESS_IN},

RESPONDER_ACTIVE_PRESS_OUT:{
DELAY:States.ERROR,
RESPONDER_GRANT:States.ERROR,
RESPONDER_RELEASE:States.NOT_RESPONDER,
RESPONDER_TERMINATED:States.NOT_RESPONDER,
ENTER_PRESS_RECT:States.RESPONDER_ACTIVE_PRESS_IN,
LEAVE_PRESS_RECT:States.RESPONDER_ACTIVE_PRESS_OUT,
LONG_PRESS_DETECTED:States.ERROR},

RESPONDER_ACTIVE_LONG_PRESS_IN:{
DELAY:States.ERROR,
RESPONDER_GRANT:States.ERROR,
RESPONDER_RELEASE:States.NOT_RESPONDER,
RESPONDER_TERMINATED:States.NOT_RESPONDER,
ENTER_PRESS_RECT:States.RESPONDER_ACTIVE_LONG_PRESS_IN,
LEAVE_PRESS_RECT:States.RESPONDER_ACTIVE_LONG_PRESS_OUT,
LONG_PRESS_DETECTED:States.RESPONDER_ACTIVE_LONG_PRESS_IN},

RESPONDER_ACTIVE_LONG_PRESS_OUT:{
DELAY:States.ERROR,
RESPONDER_GRANT:States.ERROR,
RESPONDER_RELEASE:States.NOT_RESPONDER,
RESPONDER_TERMINATED:States.NOT_RESPONDER,
ENTER_PRESS_RECT:States.RESPONDER_ACTIVE_LONG_PRESS_IN,
LEAVE_PRESS_RECT:States.RESPONDER_ACTIVE_LONG_PRESS_OUT,
LONG_PRESS_DETECTED:States.ERROR},

error:{
DELAY:States.NOT_RESPONDER,
RESPONDER_GRANT:States.RESPONDER_INACTIVE_PRESS_IN,
RESPONDER_RELEASE:States.NOT_RESPONDER,
RESPONDER_TERMINATED:States.NOT_RESPONDER,
ENTER_PRESS_RECT:States.NOT_RESPONDER,
LEAVE_PRESS_RECT:States.NOT_RESPONDER,
LONG_PRESS_DETECTED:States.NOT_RESPONDER}};






var HIGHLIGHT_DELAY_MS=130;

var PRESS_EXPAND_PX=20;

var LONG_PRESS_THRESHOLD=500;

var LONG_PRESS_DELAY_MS=LONG_PRESS_THRESHOLD-HIGHLIGHT_DELAY_MS;

var LONG_PRESS_ALLOWED_MOVEMENT=10;



































































var TouchableMixin={



componentWillUnmount:function(){
this.touchableDelayTimeout&&clearTimeout(this.touchableDelayTimeout);
this.longPressDelayTimeout&&clearTimeout(this.longPressDelayTimeout);
this.pressOutDelayTimeout&&clearTimeout(this.pressOutDelayTimeout);},









touchableGetInitialState:function(){
return {
touchable:{touchState:undefined,responderID:null}};},







touchableHandleResponderTerminationRequest:function(){
return !this.props.rejectResponderTermination;},





touchableHandleStartShouldSetResponder:function(){
return !this.props.disabled;},





touchableLongPressCancelsPress:function(){
return true;},








touchableHandleResponderGrant:function(e,dispatchID){



e.persist();

this.pressOutDelayTimeout&&clearTimeout(this.pressOutDelayTimeout);
this.pressOutDelayTimeout=null;

this.state.touchable.touchState=States.NOT_RESPONDER;
this.state.touchable.responderID=dispatchID;
this._receiveSignal(Signals.RESPONDER_GRANT,e);
var delayMS=
this.touchableGetHighlightDelayMS!==undefined?
Math.max(this.touchableGetHighlightDelayMS(),0):HIGHLIGHT_DELAY_MS;
delayMS=isNaN(delayMS)?HIGHLIGHT_DELAY_MS:delayMS;
if(delayMS!==0){
this.touchableDelayTimeout=setTimeout(
this._handleDelay.bind(this,e),
delayMS);}else 

{
this._handleDelay(e);}


var longDelayMS=
this.touchableGetLongPressDelayMS!==undefined?
Math.max(this.touchableGetLongPressDelayMS(),10):LONG_PRESS_DELAY_MS;
longDelayMS=isNaN(longDelayMS)?LONG_PRESS_DELAY_MS:longDelayMS;
this.longPressDelayTimeout=setTimeout(
this._handleLongDelay.bind(this,e),
longDelayMS+delayMS);},






touchableHandleResponderRelease:function(e){
this._receiveSignal(Signals.RESPONDER_RELEASE,e);},





touchableHandleResponderTerminate:function(e){
this._receiveSignal(Signals.RESPONDER_TERMINATED,e);},





touchableHandleResponderMove:function(e){


if(this.state.touchable.touchState===States.RESPONDER_INACTIVE_PRESS_IN){
return;}



if(!this.state.touchable.positionOnActivate){
return;}


var positionOnActivate=this.state.touchable.positionOnActivate;
var dimensionsOnActivate=this.state.touchable.dimensionsOnActivate;
var pressRectOffset=this.touchableGetPressRectOffset?
this.touchableGetPressRectOffset():{
left:PRESS_EXPAND_PX,
right:PRESS_EXPAND_PX,
top:PRESS_EXPAND_PX,
bottom:PRESS_EXPAND_PX};


var pressExpandLeft=pressRectOffset.left;
var pressExpandTop=pressRectOffset.top;
var pressExpandRight=pressRectOffset.right;
var pressExpandBottom=pressRectOffset.bottom;

var hitSlop=this.touchableGetHitSlop?
this.touchableGetHitSlop():null;

if(hitSlop){
pressExpandLeft+=hitSlop.left;
pressExpandTop+=hitSlop.top;
pressExpandRight+=hitSlop.right;
pressExpandBottom+=hitSlop.bottom;}


var touch=TouchEventUtils.extractSingleTouch(e.nativeEvent);
var pageX=touch&&touch.pageX;
var pageY=touch&&touch.pageY;

if(this.pressInLocation){
var movedDistance=this._getDistanceBetweenPoints(pageX,pageY,this.pressInLocation.pageX,this.pressInLocation.pageY);
if(movedDistance>LONG_PRESS_ALLOWED_MOVEMENT){
this._cancelLongPressDelayTimeout();}}



var isTouchWithinActive=
pageX>positionOnActivate.left-pressExpandLeft&&
pageY>positionOnActivate.top-pressExpandTop&&
pageX<
positionOnActivate.left+
dimensionsOnActivate.width+
pressExpandRight&&
pageY<
positionOnActivate.top+
dimensionsOnActivate.height+
pressExpandBottom;
if(isTouchWithinActive){
this._receiveSignal(Signals.ENTER_PRESS_RECT,e);
var curState=this.state.touchable.touchState;
if(curState===States.RESPONDER_INACTIVE_PRESS_IN){

this._cancelLongPressDelayTimeout();}}else 

{
this._cancelLongPressDelayTimeout();
this._receiveSignal(Signals.LEAVE_PRESS_RECT,e);}},

















































































_remeasureMetricsOnActivation:function(){
queryLayoutByID(
this.state.touchable.responderID,
null,
this._handleQueryLayout);},



_handleQueryLayout:function(l,t,w,h,globalX,globalY){
this.state.touchable.positionOnActivate&&
Position.release(this.state.touchable.positionOnActivate);
this.state.touchable.dimensionsOnActivate&&
BoundingDimensions.release(this.state.touchable.dimensionsOnActivate);
this.state.touchable.positionOnActivate=Position.getPooled(globalX,globalY);
this.state.touchable.dimensionsOnActivate=BoundingDimensions.getPooled(w,h);},


_handleDelay:function(e){
this.touchableDelayTimeout=null;
this._receiveSignal(Signals.DELAY,e);},


_handleLongDelay:function(e){
this.longPressDelayTimeout=null;
var curState=this.state.touchable.touchState;
if(curState!==States.RESPONDER_ACTIVE_PRESS_IN&&
curState!==States.RESPONDER_ACTIVE_LONG_PRESS_IN){
console.error('Attempted to transition from state `'+curState+'` to `'+
States.RESPONDER_ACTIVE_LONG_PRESS_IN+'`, which is not supported. This is '+
'most likely due to `Touchable.longPressDelayTimeout` not being cancelled.');}else 
{
this._receiveSignal(Signals.LONG_PRESS_DETECTED,e);}},











_receiveSignal:function(signal,e){
var responderID=this.state.touchable.responderID;
var curState=this.state.touchable.touchState;
var nextState=Transitions[curState]&&Transitions[curState][signal];
if(!responderID&&signal===Signals.RESPONDER_RELEASE){
return;}

if(!nextState){
throw new Error(
'Unrecognized signal `'+signal+'` or state `'+curState+
'` for Touchable responder `'+responderID+'`');}


if(nextState===States.ERROR){
throw new Error(
'Touchable cannot transition from `'+curState+'` to `'+signal+
'` for responder `'+responderID+'`');}


if(curState!==nextState){
this._performSideEffectsForTransition(curState,nextState,signal,e);
this.state.touchable.touchState=nextState;}},



_cancelLongPressDelayTimeout:function(){
this.longPressDelayTimeout&&clearTimeout(this.longPressDelayTimeout);
this.longPressDelayTimeout=null;},


_isHighlight:function(state){
return state===States.RESPONDER_ACTIVE_PRESS_IN||
state===States.RESPONDER_ACTIVE_LONG_PRESS_IN;},


_savePressInLocation:function(e){
var touch=TouchEventUtils.extractSingleTouch(e.nativeEvent);
var pageX=touch&&touch.pageX;
var pageY=touch&&touch.pageY;
var locationX=touch&&touch.locationX;
var locationY=touch&&touch.locationY;
this.pressInLocation={pageX:pageX,pageY:pageY,locationX:locationX,locationY:locationY};},


_getDistanceBetweenPoints:function(aX,aY,bX,bY){
var deltaX=aX-bX;
var deltaY=aY-bY;
return Math.sqrt(deltaX*deltaX+deltaY*deltaY);},













_performSideEffectsForTransition:function(curState,nextState,signal,e){var _this=this;
var curIsHighlight=this._isHighlight(curState);
var newIsHighlight=this._isHighlight(nextState);

var isFinalSignal=
signal===Signals.RESPONDER_TERMINATED||
signal===Signals.RESPONDER_RELEASE;

if(isFinalSignal){
this._cancelLongPressDelayTimeout();}


if(!IsActive[curState]&&IsActive[nextState]){
this._remeasureMetricsOnActivation();}


if(IsPressingIn[curState]&&signal===Signals.LONG_PRESS_DETECTED){
this.touchableHandleLongPress&&this.touchableHandleLongPress(e);}


if(newIsHighlight&&!curIsHighlight){
this._savePressInLocation(e);
this.touchableHandleActivePressIn&&this.touchableHandleActivePressIn(e);}else 
if(!newIsHighlight&&curIsHighlight&&this.touchableHandleActivePressOut){
if(this.touchableGetPressOutDelayMS&&this.touchableGetPressOutDelayMS()){
this.pressOutDelayTimeout=setTimeout(function(){
_this.touchableHandleActivePressOut(e);},
this.touchableGetPressOutDelayMS());}else 
{
this.touchableHandleActivePressOut(e);}}



if(IsPressingIn[curState]&&signal===Signals.RESPONDER_RELEASE){
var hasLongPressHandler=!!this.props.onLongPress;
var pressIsLongButStillCallOnPress=
IsLongPressingIn[curState]&&(
!hasLongPressHandler||
!this.touchableLongPressCancelsPress());


var shouldInvokePress=!IsLongPressingIn[curState]||pressIsLongButStillCallOnPress;
if(shouldInvokePress&&this.touchableHandlePress){
this.touchableHandlePress(e);}}



this.touchableDelayTimeout&&clearTimeout(this.touchableDelayTimeout);
this.touchableDelayTimeout=null;}};




var Touchable={
Mixin:TouchableMixin};


module.exports=Touchable;
});
__d(227 /* BoundingDimensions */, function(global, require, module, exports) {'use strict';





var PooledClass=require(77 /* PooledClass */);

var twoArgumentPooler=PooledClass.twoArgumentPooler;








function BoundingDimensions(width,height){
this.width=width;
this.height=height;}


BoundingDimensions.prototype.destructor=function(){
this.width=null;
this.height=null;};






BoundingDimensions.getPooledFromElement=function(element){
return BoundingDimensions.getPooled(
element.offsetWidth,
element.offsetHeight);};



PooledClass.addPoolingTo(BoundingDimensions,twoArgumentPooler);

module.exports=BoundingDimensions;
});
__d(228 /* Position */, function(global, require, module, exports) {'use strict';





var PooledClass=require(77 /* PooledClass */);

var twoArgumentPooler=PooledClass.twoArgumentPooler;









function Position(left,top){
this.left=left;
this.top=top;}


Position.prototype.destructor=function(){
this.left=null;
this.top=null;};


PooledClass.addPoolingTo(Position,twoArgumentPooler);

module.exports=Position;
});
__d(527 /* fbjs/lib/TouchEventUtils.js */, function(global, require, module, exports) {"use strict";











var TouchEventUtils={










extractSingleTouch:function(nativeEvent){
var touches=nativeEvent.touches;
var changedTouches=nativeEvent.changedTouches;
var hasTouches=touches&&touches.length>0;
var hasChangedTouches=changedTouches&&changedTouches.length>0;

return !hasTouches&&hasChangedTouches?changedTouches[0]:hasTouches?touches[0]:nativeEvent;}};



module.exports=TouchEventUtils;
});
__d(229 /* queryLayoutByID */, function(global, require, module, exports) {'use strict';












var ReactNativeTagHandles=require(40 /* ReactNativeTagHandles */);
var UIManager=require(10 /* UIManager */);
































var queryLayoutByID=function(
rootNodeID,
onError,
onSuccess)
{

UIManager.measure(
ReactNativeTagHandles.rootNodeIDToTag[rootNodeID],
onSuccess);};



module.exports=queryLayoutByID;
});
__d(230 /* TextInput */, function(global, require, module, exports) {'use strict';












var DocumentSelectionState=require(231 /* DocumentSelectionState */);
var EventEmitter=require(23 /* EventEmitter */);
var NativeMethodsMixin=require(2 /* NativeMethodsMixin */);
var Platform=require(4 /* Platform */);
var PropTypes=require(41 /* ReactPropTypes */);
var React=require(47 /* React */);
var ReactChildren=require(165 /* ReactChildren */);
var StyleSheet=require(148 /* StyleSheet */);
var Text=require(225 /* Text */);
var TextInputState=require(9 /* TextInputState */);
var TimerMixin=require(523 /* react-timer-mixin */);
var TouchableWithoutFeedback=require(237 /* TouchableWithoutFeedback */);
var UIManager=require(10 /* UIManager */);
var View=require(127 /* View */);

var createReactNativeComponentClass=require(152 /* createReactNativeComponentClass */);
var emptyFunction=require(369 /* fbjs/lib/emptyFunction */);
var invariant=require(363 /* fbjs/lib/invariant */);
var requireNativeComponent=require(146 /* requireNativeComponent */);

var onlyMultiline={
onTextInput:true,
children:true};


var notMultiline={};



if(Platform.OS==='android'){
var AndroidTextInput=requireNativeComponent('AndroidTextInput',null);}else 
if(Platform.OS==='ios'){
var RCTTextView=requireNativeComponent('RCTTextView',null);
var RCTTextField=requireNativeComponent('RCTTextField',null);}



































var TextInput=React.createClass({displayName:'TextInput',
statics:{

State:TextInputState},


propTypes:babelHelpers.extends({},
View.propTypes,{








autoCapitalize:PropTypes.oneOf([
'none',
'sentences',
'words',
'characters']),




autoCorrect:PropTypes.bool,




autoFocus:PropTypes.bool,



editable:PropTypes.bool,








keyboardType:PropTypes.oneOf([

'default',
'email-address',
'numeric',
'phone-pad',

'ascii-capable',
'numbers-and-punctuation',
'url',
'number-pad',
'name-phone-pad',
'decimal-pad',
'twitter',
'web-search']),





keyboardAppearance:PropTypes.oneOf([
'default',
'light',
'dark']),





returnKeyType:PropTypes.oneOf([
'default',
'go',
'google',
'join',
'next',
'route',
'search',
'send',
'yahoo',
'done',
'emergency-call']),





maxLength:PropTypes.number,





numberOfLines:PropTypes.number,





enablesReturnKeyAutomatically:PropTypes.bool,




multiline:PropTypes.bool,



onBlur:PropTypes.func,



onFocus:PropTypes.func,



onChange:PropTypes.func,




onChangeText:PropTypes.func,



onEndEditing:PropTypes.func,



onSelectionChange:PropTypes.func,




onSubmitEditing:PropTypes.func,






onKeyPress:PropTypes.func,



onLayout:PropTypes.func,



placeholder:PropTypes.string,



placeholderTextColor:PropTypes.string,




secureTextEntry:PropTypes.bool,



selectionColor:PropTypes.string,





selectionState:PropTypes.instanceOf(DocumentSelectionState),









value:PropTypes.string,





defaultValue:PropTypes.string,




clearButtonMode:PropTypes.oneOf([
'never',
'while-editing',
'unless-editing',
'always']),





clearTextOnFocus:PropTypes.bool,




selectTextOnFocus:PropTypes.bool,







blurOnSubmit:PropTypes.bool,



style:Text.propTypes.style,




underlineColorAndroid:PropTypes.string}),






mixins:[NativeMethodsMixin,TimerMixin],

viewConfig:
Platform.OS==='ios'&&RCTTextField?
RCTTextField.viewConfig:
Platform.OS==='android'&&AndroidTextInput?
AndroidTextInput.viewConfig:
{},

isFocused:function(){
return TextInputState.currentlyFocusedField()===
React.findNodeHandle(this.refs.input);},


contextTypes:{
onFocusRequested:React.PropTypes.func,
focusEmitter:React.PropTypes.instanceOf(EventEmitter)},


_focusSubscription:undefined,

componentDidMount:function(){var _this=this;
if(!this.context.focusEmitter){
if(this.props.autoFocus){
this.requestAnimationFrame(this.focus);}

return;}

this._focusSubscription=this.context.focusEmitter.addListener(
'focus',
function(el){
if(_this===el){
_this.requestAnimationFrame(_this.focus);}else 
if(_this.isFocused()){
_this.blur();}});



if(this.props.autoFocus){
this.context.onFocusRequested(this);}},



componentWillUnmount:function(){
this._focusSubscription&&this._focusSubscription.remove();
if(this.isFocused()){
this.blur();}},



getChildContext:function(){
return {isInAParentText:true};},


childContextTypes:{
isInAParentText:React.PropTypes.bool},


clear:function(){
this.setNativeProps({text:''});},


render:function(){
if(Platform.OS==='ios'){
return this._renderIOS();}else 
if(Platform.OS==='android'){
return this._renderAndroid();}},



_getText:function(){
return typeof this.props.value==='string'?
this.props.value:
this.props.defaultValue;},


_renderIOS:function(){var _this2=this;
var textContainer;

var onSelectionChange;
if(this.props.selectionState||this.props.onSelectionChange){
onSelectionChange=function(event){
if(_this2.props.selectionState){
var selection=event.nativeEvent.selection;
_this2.props.selectionState.update(selection.start,selection.end);}

_this2.props.onSelectionChange&&_this2.props.onSelectionChange(event);};}



var props=babelHelpers.extends({},this.props);
props.style=[styles.input,this.props.style];
if(!props.multiline){
for(var propKey in onlyMultiline){
if(props[propKey]){
throw new Error(
'TextInput prop `'+propKey+'` is only supported with multiline.');}}



textContainer=
React.createElement(RCTTextField,babelHelpers.extends({
ref:'input'},
props,{
onFocus:this._onFocus,
onBlur:this._onBlur,
onChange:this._onChange,
onSelectionChange:onSelectionChange,
onSelectionChangeShouldSetResponder:emptyFunction.thatReturnsTrue,
text:this._getText()}));}else 

{
for(var propKey in notMultiline){
if(props[propKey]){
throw new Error(
'TextInput prop `'+propKey+'` cannot be used with multiline.');}}




var children=props.children;
var childCount=0;
ReactChildren.forEach(children,function(){return ++childCount;});
invariant(
!(props.value&&childCount),
'Cannot specify both value and children.');

if(childCount>1){
children=React.createElement(Text,null,children);}

if(props.inputView){
children=[children,props.inputView];}

textContainer=
React.createElement(RCTTextView,babelHelpers.extends({
ref:'input'},
props,{
children:children,
onFocus:this._onFocus,
onBlur:this._onBlur,
onChange:this._onChange,
onSelectionChange:onSelectionChange,
onTextInput:this._onTextInput,
onSelectionChangeShouldSetResponder:emptyFunction.thatReturnsTrue,
text:this._getText()}));}



return (
React.createElement(TouchableWithoutFeedback,{
onPress:this._onPress,
rejectResponderTermination:true,
accessible:props.accessible,
accessibilityLabel:props.accessibilityLabel,
accessibilityTraits:props.accessibilityTraits,
testID:props.testID},
textContainer));},




_renderAndroid:function(){var _this3=this;
var onSelectionChange;
if(this.props.selectionState||this.props.onSelectionChange){
onSelectionChange=function(event){
if(_this3.props.selectionState){
var selection=event.nativeEvent.selection;
_this3.props.selectionState.update(selection.start,selection.end);}

_this3.props.onSelectionChange&&_this3.props.onSelectionChange(event);};}



var autoCapitalize=
UIManager.AndroidTextInput.Constants.AutoCapitalizationType[this.props.autoCapitalize];
var children=this.props.children;
var childCount=0;
ReactChildren.forEach(children,function(){return ++childCount;});
invariant(
!(this.props.value&&childCount),
'Cannot specify both value and children.');

if(childCount>1){
children=React.createElement(Text,null,children);}


var textContainer=
React.createElement(AndroidTextInput,{
ref:'input',
style:[this.props.style],
autoCapitalize:autoCapitalize,
autoCorrect:this.props.autoCorrect,
keyboardType:this.props.keyboardType,
mostRecentEventCount:0,
multiline:this.props.multiline,
numberOfLines:this.props.numberOfLines,
maxLength:this.props.maxLength,
onFocus:this._onFocus,
onBlur:this._onBlur,
onChange:this._onChange,
onSelectionChange:onSelectionChange,
onTextInput:this._onTextInput,
onEndEditing:this.props.onEndEditing,
onSubmitEditing:this.props.onSubmitEditing,
blurOnSubmit:this.props.blurOnSubmit,
onLayout:this.props.onLayout,
password:this.props.password||this.props.secureTextEntry,
placeholder:this.props.placeholder,
placeholderTextColor:this.props.placeholderTextColor,
selectionColor:this.props.selectionColor,
text:this._getText(),
underlineColorAndroid:this.props.underlineColorAndroid,
children:children,
editable:this.props.editable});


return (
React.createElement(TouchableWithoutFeedback,{
onPress:this._onPress,
accessible:this.props.accessible,
accessibilityLabel:this.props.accessibilityLabel,
accessibilityComponentType:this.props.accessibilityComponentType,
testID:this.props.testID},
textContainer));},




_onFocus:function(event){
if(this.props.onFocus){
this.props.onFocus(event);}


if(this.props.selectionState){
this.props.selectionState.focus();}},



_onPress:function(event){
if(this.props.editable||this.props.editable===undefined){
this.focus();}},



_onChange:function(event){


this.refs.input.setNativeProps({
mostRecentEventCount:event.nativeEvent.eventCount});


var text=event.nativeEvent.text;
this.props.onChange&&this.props.onChange(event);
this.props.onChangeText&&this.props.onChangeText(text);

if(!this.refs.input){


return;}





if(text!==this.props.value&&typeof this.props.value==='string'){
this.refs.input.setNativeProps({
text:this.props.value});}},




_onBlur:function(event){
this.blur();
if(this.props.onBlur){
this.props.onBlur(event);}


if(this.props.selectionState){
this.props.selectionState.blur();}},



_onTextInput:function(event){
this.props.onTextInput&&this.props.onTextInput(event);}});



var styles=StyleSheet.create({
input:{
alignSelf:'stretch'}});



module.exports=TextInput;
});
__d(231 /* DocumentSelectionState */, function(global, require, module, exports) {var 

















mixInEventEmitter=require(232 /* mixInEventEmitter */);var 










DocumentSelectionState=function(){




function DocumentSelectionState(anchor,focus){babelHelpers.classCallCheck(this,DocumentSelectionState);
this._anchorOffset=anchor;
this._focusOffset=focus;
this._hasFocus=false;}babelHelpers.createClass(DocumentSelectionState,[{key:'update',value:function update(









anchor,focus){
if(this._anchorOffset!==anchor||this._focusOffset!==focus){
this._anchorOffset=anchor;
this._focusOffset=focus;
this.emit('update');}}},{key:'constrainLength',value:function constrainLength(









maxLength){
this.update(
Math.min(this._anchorOffset,maxLength),
Math.min(this._focusOffset,maxLength));}},{key:'focus',value:function focus()



{
if(!this._hasFocus){
this._hasFocus=true;
this.emit('focus');}}},{key:'blur',value:function blur()



{
if(this._hasFocus){
this._hasFocus=false;
this.emit('blur');}}},{key:'hasFocus',value:function hasFocus()






{
return this._hasFocus;}},{key:'isCollapsed',value:function isCollapsed()





{
return this._anchorOffset===this._focusOffset;}},{key:'isBackward',value:function isBackward()





{
return this._anchorOffset>this._focusOffset;}},{key:'getAnchorOffset',value:function getAnchorOffset()





{
return this._hasFocus?this._anchorOffset:null;}},{key:'getFocusOffset',value:function getFocusOffset()





{
return this._hasFocus?this._focusOffset:null;}},{key:'getStartOffset',value:function getStartOffset()





{
return (
this._hasFocus?Math.min(this._anchorOffset,this._focusOffset):null);}},{key:'getEndOffset',value:function getEndOffset()






{
return (
this._hasFocus?Math.max(this._anchorOffset,this._focusOffset):null);}},{key:'overlaps',value:function overlaps(








start,end){
return (
this.hasFocus()&&
this.getStartOffset()<=end&&start<=this.getEndOffset());}}]);return DocumentSelectionState;}();




mixInEventEmitter(DocumentSelectionState,{
'blur':true,
'focus':true,
'update':true});


module.exports=DocumentSelectionState;
});
__d(232 /* mixInEventEmitter */, function(global, require, module, exports) {var 
















EventEmitter=require(23 /* EventEmitter */);
var EventEmitterWithHolding=require(233 /* EventEmitterWithHolding */);
var EventHolder=require(234 /* EventHolder */);
var EventValidator=require(235 /* EventValidator */);

var copyProperties=require(236 /* copyProperties */);
var invariant=require(363 /* fbjs/lib/invariant */);
var keyOf=require(525 /* fbjs/lib/keyOf */);

var TYPES_KEY=keyOf({__types:true});






















function mixInEventEmitter(klass,types){
invariant(types,'Must supply set of valid event types');



var target=klass.prototype||klass;

invariant(!target.__eventEmitter,'An active emitter is already mixed in');

var ctor=klass.constructor;
if(ctor){
invariant(
ctor===Object||ctor===Function,
'Mix EventEmitter into a class, not an instance');}





if(target.hasOwnProperty(TYPES_KEY)){
copyProperties(target.__types,types);}else 
if(target.__types){
target.__types=copyProperties({},target.__types,types);}else 
{
target.__types=types;}

copyProperties(target,EventEmitterMixin);}


var EventEmitterMixin={
emit:function(eventType,a,b,c,d,e,_){
return this.__getEventEmitter().emit(eventType,a,b,c,d,e,_);},


emitAndHold:function(eventType,a,b,c,d,e,_){
return this.__getEventEmitter().emitAndHold(eventType,a,b,c,d,e,_);},


addListener:function(eventType,listener,context){
return this.__getEventEmitter().addListener(eventType,listener,context);},


once:function(eventType,listener,context){
return this.__getEventEmitter().once(eventType,listener,context);},


addRetroactiveListener:function(eventType,listener,context){
return this.__getEventEmitter().addRetroactiveListener(
eventType,
listener,
context);},



addListenerMap:function(listenerMap,context){
return this.__getEventEmitter().addListenerMap(listenerMap,context);},


addRetroactiveListenerMap:function(listenerMap,context){
return this.__getEventEmitter().addListenerMap(listenerMap,context);},


removeAllListeners:function(){
this.__getEventEmitter().removeAllListeners();},


removeCurrentListener:function(){
this.__getEventEmitter().removeCurrentListener();},


releaseHeldEventType:function(eventType){
this.__getEventEmitter().releaseHeldEventType(eventType);},


__getEventEmitter:function(){
if(!this.__eventEmitter){
var emitter=new EventEmitter();
emitter=EventValidator.addValidation(emitter,this.__types);

var holder=new EventHolder();
this.__eventEmitter=new EventEmitterWithHolding(emitter,holder);}

return this.__eventEmitter;}};



module.exports=mixInEventEmitter;
});
__d(233 /* EventEmitterWithHolding */, function(global, require, module, exports) {'use strict';var 






























EventEmitterWithHolding=function(){







function EventEmitterWithHolding(emitter,holder){babelHelpers.classCallCheck(this,EventEmitterWithHolding);
this._emitter=emitter;
this._eventHolder=holder;
this._currentEventToken=null;
this._emittingHeldEvents=false;}babelHelpers.createClass(EventEmitterWithHolding,[{key:'addListener',value:function addListener(





eventType,listener,context){
return this._emitter.addListener(eventType,listener,context);}},{key:'once',value:function once(





eventType,listener,context){
return this._emitter.once(eventType,listener,context);}},{key:'addRetroactiveListener',value:function addRetroactiveListener(























eventType,listener,context){
var subscription=this._emitter.addListener(eventType,listener,context);

this._emittingHeldEvents=true;
this._eventHolder.emitToListener(eventType,listener,context);
this._emittingHeldEvents=false;

return subscription;}},{key:'removeAllListeners',value:function removeAllListeners(





eventType){
this._emitter.removeAllListeners(eventType);}},{key:'removeCurrentListener',value:function removeCurrentListener()





{
this._emitter.removeCurrentListener();}},{key:'listeners',value:function listeners(





eventType){
return this._emitter.listeners(eventType);}},{key:'emit',value:function emit(





eventType,a,b,c,d,e,_){
this._emitter.emit(eventType,a,b,c,d,e,_);}},{key:'emitAndHold',value:function emitAndHold(

















eventType,a,b,c,d,e,_){
this._currentEventToken=this._eventHolder.holdEvent(
eventType,
a,b,c,d,e,_);

this._emitter.emit(eventType,a,b,c,d,e,_);
this._currentEventToken=null;}},{key:'releaseCurrentEvent',value:function releaseCurrentEvent()





{
if(this._currentEventToken!==null){
this._eventHolder.releaseEvent(this._currentEventToken);}else 
if(this._emittingHeldEvents){
this._eventHolder.releaseCurrentEvent();}}},{key:'releaseHeldEventType',value:function releaseHeldEventType(







eventType){
this._eventHolder.releaseEventType(eventType);}}]);return EventEmitterWithHolding;}();



module.exports=EventEmitterWithHolding;
});
__d(234 /* EventHolder */, function(global, require, module, exports) {'use strict';


















var invariant=require(363 /* fbjs/lib/invariant */);var 

EventHolder=function(){
function EventHolder(){babelHelpers.classCallCheck(this,EventHolder);
this._heldEvents={};
this._currentEventKey=null;}babelHelpers.createClass(EventHolder,[{key:'holdEvent',value:function holdEvent(























eventType,a,b,c,d,e,_){
this._heldEvents[eventType]=this._heldEvents[eventType]||[];
var eventsOfType=this._heldEvents[eventType];
var key={
eventType:eventType,
index:eventsOfType.length};

eventsOfType.push([a,b,c,d,e,_]);
return key;}},{key:'emitToListener',value:function emitToListener(










eventType,listener,context){var _this=this;
var eventsOfType=this._heldEvents[eventType];
if(!eventsOfType){
return;}

var origEventKey=this._currentEventKey;
eventsOfType.forEach(function(eventHeld,index){
if(!eventHeld){
return;}

_this._currentEventKey={
eventType:eventType,
index:index};

listener.apply(context,eventHeld);});

this._currentEventKey=origEventKey;}},{key:'releaseCurrentEvent',value:function releaseCurrentEvent()










{
invariant(
this._currentEventKey!==null,
'Not in an emitting cycle; there is no current event');

this.releaseEvent(this._currentEventKey);}},{key:'releaseEvent',value:function releaseEvent(








token){
delete this._heldEvents[token.eventType][token.index];}},{key:'releaseEventType',value:function releaseEventType(







type){
this._heldEvents[type]=[];}}]);return EventHolder;}();



module.exports=EventHolder;
});
__d(235 /* EventValidator */, function(global, require, module, exports) {'use strict';

















var copyProperties=require(236 /* copyProperties */);










var EventValidator={










addValidation:function(emitter,types){
var eventTypes=Object.keys(types);
var emitterWithValidation=Object.create(emitter);

copyProperties(emitterWithValidation,{
emit:function emit(type,a,b,c,d,e,_){
assertAllowsEventType(type,eventTypes);
return emitter.emit.call(this,type,a,b,c,d,e,_);}});



return emitterWithValidation;}};



function assertAllowsEventType(type,allowedTypes){
if(allowedTypes.indexOf(type)===-1){
throw new TypeError(errorMessageFor(type,allowedTypes));}}



function errorMessageFor(type,allowedTypes){
var message='Unknown event type "'+type+'". ';
if(__DEV__){
message+=recommendationFor(type,allowedTypes);}

message+='Known event types: '+allowedTypes.join(', ')+'.';
return message;}



if(__DEV__){
var recommendationFor=function(type,allowedTypes){
var closestTypeRecommendation=closestTypeFor(type,allowedTypes);
if(isCloseEnough(closestTypeRecommendation,type)){
return 'Did you mean "'+closestTypeRecommendation.type+'"? ';}else 
{
return '';}};



var closestTypeFor=function(type,allowedTypes){
var typeRecommendations=allowedTypes.map(
typeRecommendationFor.bind(this,type));

return typeRecommendations.sort(recommendationSort)[0];};


var typeRecommendationFor=function(type,recomendedType){
return {
type:recomendedType,
distance:damerauLevenshteinDistance(type,recomendedType)};};



var recommendationSort=function(recommendationA,recommendationB){
if(recommendationA.distance<recommendationB.distance){
return -1;}else 
if(recommendationA.distance>recommendationB.distance){
return 1;}else 
{
return 0;}};



var isCloseEnough=function(closestType,actualType){
return closestType.distance/actualType.length<0.334;};


var damerauLevenshteinDistance=function(a,b){
var i,j;
var d=[];

for(i=0;i<=a.length;i++){
d[i]=[i];}


for(j=1;j<=b.length;j++){
d[0][j]=j;}


for(i=1;i<=a.length;i++){
for(j=1;j<=b.length;j++){
var cost=a.charAt(i-1)===b.charAt(j-1)?0:1;

d[i][j]=Math.min(
d[i-1][j]+1,
d[i][j-1]+1,
d[i-1][j-1]+cost);


if(i>1&&j>1&&
a.charAt(i-1)==b.charAt(j-2)&&
a.charAt(i-2)==b.charAt(j-1)){
d[i][j]=Math.min(d[i][j],d[i-2][j-2]+cost);}}}




return d[a.length][b.length];};}



module.exports=EventValidator;
});
__d(236 /* copyProperties */, function(global, require, module, exports) {function 























copyProperties(obj,a,b,c,d,e,f){
obj=obj||{};

if(__DEV__){
if(f){
throw new Error('Too many arguments passed to copyProperties');}}



var args=[a,b,c,d,e];
var ii=0,v;
while(args[ii]){
v=args[ii++];
for(var k in v){
obj[k]=v[k];}




if(v.hasOwnProperty&&v.hasOwnProperty('toString')&&
typeof v.toString!='undefined'&&obj.toString!==v.toString){
obj.toString=v.toString;}}



return obj;}


module.exports=copyProperties;
});
__d(237 /* TouchableWithoutFeedback */, function(global, require, module, exports) {'use strict';













var EdgeInsetsPropType=require(128 /* EdgeInsetsPropType */);
var React=require(47 /* React */);
var TimerMixin=require(523 /* react-timer-mixin */);
var Touchable=require(226 /* Touchable */);
var View=require(127 /* View */);
var ensurePositiveDelayProps=require(238 /* ensurePositiveDelayProps */);
var invariant=require(363 /* fbjs/lib/invariant */);
var onlyChild=require(170 /* onlyChild */);



var PRESS_RETENTION_OFFSET={top:20,left:20,right:20,bottom:30};










var TouchableWithoutFeedback=React.createClass({displayName:'TouchableWithoutFeedback',
mixins:[TimerMixin,Touchable.Mixin],

propTypes:{
accessible:React.PropTypes.bool,
accessibilityComponentType:React.PropTypes.oneOf(View.AccessibilityComponentType),
accessibilityTraits:React.PropTypes.oneOfType([
React.PropTypes.oneOf(View.AccessibilityTraits),
React.PropTypes.arrayOf(React.PropTypes.oneOf(View.AccessibilityTraits))]),




disabled:React.PropTypes.bool,




onPress:React.PropTypes.func,
onPressIn:React.PropTypes.func,
onPressOut:React.PropTypes.func,





onLayout:React.PropTypes.func,

onLongPress:React.PropTypes.func,




delayPressIn:React.PropTypes.number,



delayPressOut:React.PropTypes.number,



delayLongPress:React.PropTypes.number,







pressRetentionOffset:EdgeInsetsPropType,








hitSlop:EdgeInsetsPropType},


getInitialState:function(){
return this.touchableGetInitialState();},


componentDidMount:function(){
ensurePositiveDelayProps(this.props);},


componentWillReceiveProps:function(nextProps){
ensurePositiveDelayProps(nextProps);},






touchableHandlePress:function(e){
this.props.onPress&&this.props.onPress(e);},


touchableHandleActivePressIn:function(e){
this.props.onPressIn&&this.props.onPressIn(e);},


touchableHandleActivePressOut:function(e){
this.props.onPressOut&&this.props.onPressOut(e);},


touchableHandleLongPress:function(e){
this.props.onLongPress&&this.props.onLongPress(e);},


touchableGetPressRectOffset:function(){
return this.props.pressRetentionOffset||PRESS_RETENTION_OFFSET;},


touchableGetHitSlop:function(){
return this.props.hitSlop;},


touchableGetHighlightDelayMS:function(){
return this.props.delayPressIn||0;},


touchableGetLongPressDelayMS:function(){
return this.props.delayLongPress===0?0:
this.props.delayLongPress||500;},


touchableGetPressOutDelayMS:function(){
return this.props.delayPressOut||0;},


render:function(){

return React.cloneElement(onlyChild(this.props.children),{
accessible:this.props.accessible!==false,
accessibilityLabel:this.props.accessibilityLabel,
accessibilityComponentType:this.props.accessibilityComponentType,
accessibilityTraits:this.props.accessibilityTraits,
testID:this.props.testID,
onLayout:this.props.onLayout,
hitSlop:this.props.hitSlop,
onStartShouldSetResponder:this.touchableHandleStartShouldSetResponder,
onResponderTerminationRequest:this.touchableHandleResponderTerminationRequest,
onResponderGrant:this.touchableHandleResponderGrant,
onResponderMove:this.touchableHandleResponderMove,
onResponderRelease:this.touchableHandleResponderRelease,
onResponderTerminate:this.touchableHandleResponderTerminate});}});




module.exports=TouchableWithoutFeedback;
});
__d(238 /* ensurePositiveDelayProps */, function(global, require, module, exports) {'use strict';












var invariant=require(363 /* fbjs/lib/invariant */);

var ensurePositiveDelayProps=function(props){
invariant(
!(props.delayPressIn<0||props.delayPressOut<0||
props.delayLongPress<0),
'Touchable components cannot have negative delay properties');};



module.exports=ensurePositiveDelayProps;
});
__d(239 /* ToastAndroid */, function(global, require, module, exports) {'use strict';












var warning=require(368 /* fbjs/lib/warning */);

var ToastAndroid={

show:function(
message,
duration)
{
warning(false,'ToastAndroid is not supported on this platform.');}};




module.exports=ToastAndroid;
});
__d(240 /* ToolbarAndroid */, function(global, require, module, exports) {'use strict';











module.exports=require(147 /* UnimplementedView */);
});
__d(241 /* TouchableHighlight */, function(global, require, module, exports) {'use strict';














var ColorPropType=require(134 /* ColorPropType */);
var NativeMethodsMixin=require(2 /* NativeMethodsMixin */);
var React=require(47 /* React */);
var ReactNativeViewAttributes=require(144 /* ReactNativeViewAttributes */);
var StyleSheet=require(148 /* StyleSheet */);
var TimerMixin=require(523 /* react-timer-mixin */);
var Touchable=require(226 /* Touchable */);
var TouchableWithoutFeedback=require(237 /* TouchableWithoutFeedback */);
var View=require(127 /* View */);

var ensureComponentIsNative=require(242 /* ensureComponentIsNative */);
var ensurePositiveDelayProps=require(238 /* ensurePositiveDelayProps */);
var keyOf=require(525 /* fbjs/lib/keyOf */);
var merge=require(103 /* merge */);
var onlyChild=require(170 /* onlyChild */);



var DEFAULT_PROPS={
activeOpacity:0.8,
underlayColor:'black'};


var PRESS_RETENTION_OFFSET={top:20,left:20,right:20,bottom:30};




























var TouchableHighlight=React.createClass({displayName:'TouchableHighlight',
propTypes:babelHelpers.extends({},
TouchableWithoutFeedback.propTypes,{




activeOpacity:React.PropTypes.number,




underlayColor:ColorPropType,
style:View.propTypes.style,



onShowUnderlay:React.PropTypes.func,



onHideUnderlay:React.PropTypes.func}),


mixins:[NativeMethodsMixin,TimerMixin,Touchable.Mixin],

getDefaultProps:function(){return DEFAULT_PROPS;},


computeSyntheticState:function(props){
return {
activeProps:{
style:{
opacity:props.activeOpacity}},


activeUnderlayProps:{
style:{
backgroundColor:props.underlayColor}},


underlayStyle:[
INACTIVE_UNDERLAY_PROPS.style,
props.style]};},




getInitialState:function(){
return merge(
this.touchableGetInitialState(),this.computeSyntheticState(this.props));},



componentDidMount:function(){
ensurePositiveDelayProps(this.props);
ensureComponentIsNative(this.refs[CHILD_REF]);},


componentDidUpdate:function(){
ensureComponentIsNative(this.refs[CHILD_REF]);},


componentWillReceiveProps:function(nextProps){
ensurePositiveDelayProps(nextProps);
if(nextProps.activeOpacity!==this.props.activeOpacity||
nextProps.underlayColor!==this.props.underlayColor||
nextProps.style!==this.props.style){
this.setState(this.computeSyntheticState(nextProps));}},



viewConfig:{
uiViewClassName:'RCTView',
validAttributes:ReactNativeViewAttributes.RCTView},






touchableHandleActivePressIn:function(e){
this.clearTimeout(this._hideTimeout);
this._hideTimeout=null;
this._showUnderlay();
this.props.onPressIn&&this.props.onPressIn(e);},


touchableHandleActivePressOut:function(e){
if(!this._hideTimeout){
this._hideUnderlay();}

this.props.onPressOut&&this.props.onPressOut(e);},


touchableHandlePress:function(e){
this.clearTimeout(this._hideTimeout);
this._showUnderlay();
this._hideTimeout=this.setTimeout(this._hideUnderlay,
this.props.delayPressOut||100);
this.props.onPress&&this.props.onPress(e);},


touchableHandleLongPress:function(e){
this.props.onLongPress&&this.props.onLongPress(e);},


touchableGetPressRectOffset:function(){
return this.props.pressRetentionOffset||PRESS_RETENTION_OFFSET;},


touchableGetHitSlop:function(){
return this.props.hitSlop;},


touchableGetHighlightDelayMS:function(){
return this.props.delayPressIn;},


touchableGetLongPressDelayMS:function(){
return this.props.delayLongPress;},


touchableGetPressOutDelayMS:function(){
return this.props.delayPressOut;},


_showUnderlay:function(){
if(!this.isMounted()||!this._hasPressHandler()){
return;}


this.refs[UNDERLAY_REF].setNativeProps(this.state.activeUnderlayProps);
this.refs[CHILD_REF].setNativeProps(this.state.activeProps);
this.props.onShowUnderlay&&this.props.onShowUnderlay();},


_hideUnderlay:function(){
this.clearTimeout(this._hideTimeout);
this._hideTimeout=null;
if(this._hasPressHandler()&&this.refs[UNDERLAY_REF]){
this.refs[CHILD_REF].setNativeProps(INACTIVE_CHILD_PROPS);
this.refs[UNDERLAY_REF].setNativeProps(babelHelpers.extends({},
INACTIVE_UNDERLAY_PROPS,{
style:this.state.underlayStyle}));

this.props.onHideUnderlay&&this.props.onHideUnderlay();}},



_hasPressHandler:function(){
return !!(
this.props.onPress||
this.props.onPressIn||
this.props.onPressOut||
this.props.onLongPress);},



render:function(){
return (
React.createElement(View,{
accessible:true,
accessibilityLabel:this.props.accessibilityLabel,
accessibilityComponentType:this.props.accessibilityComponentType,
accessibilityTraits:this.props.accessibilityTraits,
ref:UNDERLAY_REF,
style:this.state.underlayStyle,
onLayout:this.props.onLayout,
hitSlop:this.props.hitSlop,
onStartShouldSetResponder:this.touchableHandleStartShouldSetResponder,
onResponderTerminationRequest:this.touchableHandleResponderTerminationRequest,
onResponderGrant:this.touchableHandleResponderGrant,
onResponderMove:this.touchableHandleResponderMove,
onResponderRelease:this.touchableHandleResponderRelease,
onResponderTerminate:this.touchableHandleResponderTerminate,
testID:this.props.testID},
React.cloneElement(
onlyChild(this.props.children),
{
ref:CHILD_REF})));}});







var CHILD_REF=keyOf({childRef:null});
var UNDERLAY_REF=keyOf({underlayRef:null});
var INACTIVE_CHILD_PROPS={
style:StyleSheet.create({x:{opacity:1.0}}).x};

var INACTIVE_UNDERLAY_PROPS={
style:StyleSheet.create({x:{backgroundColor:'transparent'}}).x};


module.exports=TouchableHighlight;
});
__d(242 /* ensureComponentIsNative */, function(global, require, module, exports) {'use strict';












var invariant=require(363 /* fbjs/lib/invariant */);

var ensureComponentIsNative=function(component){
invariant(
component&&typeof component.setNativeProps==='function',
'Touchable child must either be native or forward setNativeProps to a '+
'native component');};



module.exports=ensureComponentIsNative;
});
__d(243 /* TouchableNativeFeedback */, function(global, require, module, exports) {'use strict';












var React=require(47 /* React */);
var StyleSheet=require(148 /* StyleSheet */);
var Text=require(225 /* Text */);
var View=require(127 /* View */);

var DummyTouchableNativeFeedback=React.createClass({displayName:'DummyTouchableNativeFeedback',
render:function(){
return (
React.createElement(View,{style:[styles.container,this.props.style]},
React.createElement(Text,{style:styles.info},'TouchableNativeFeedback is not supported on this platform!')));}});





var styles=StyleSheet.create({
container:{
height:100,
width:300,
backgroundColor:'#ffbcbc',
borderWidth:1,
borderColor:'red',
alignItems:'center',
justifyContent:'center',
margin:10},

info:{
color:'#333333',
margin:20}});



module.exports=DummyTouchableNativeFeedback;
});
__d(244 /* TouchableOpacity */, function(global, require, module, exports) {'use strict';














var Animated=require(245 /* Animated */);
var NativeMethodsMixin=require(2 /* NativeMethodsMixin */);
var React=require(47 /* React */);
var TimerMixin=require(523 /* react-timer-mixin */);
var Touchable=require(226 /* Touchable */);
var TouchableWithoutFeedback=require(237 /* TouchableWithoutFeedback */);

var ensurePositiveDelayProps=require(238 /* ensurePositiveDelayProps */);
var flattenStyle=require(7 /* flattenStyle */);



var PRESS_RETENTION_OFFSET={top:20,left:20,right:20,bottom:30};






















var TouchableOpacity=React.createClass({displayName:'TouchableOpacity',
mixins:[TimerMixin,Touchable.Mixin,NativeMethodsMixin],

propTypes:babelHelpers.extends({},
TouchableWithoutFeedback.propTypes,{




activeOpacity:React.PropTypes.number}),


getDefaultProps:function(){
return {
activeOpacity:0.2};},



getInitialState:function(){
return babelHelpers.extends({},
this.touchableGetInitialState(),{
anim:new Animated.Value(1)});},



componentDidMount:function(){
ensurePositiveDelayProps(this.props);},


componentWillReceiveProps:function(nextProps){
ensurePositiveDelayProps(nextProps);},


setOpacityTo:function(value){
Animated.timing(
this.state.anim,
{toValue:value,duration:150}).
start();},






touchableHandleActivePressIn:function(e){
this.clearTimeout(this._hideTimeout);
this._hideTimeout=null;
this._opacityActive();
this.props.onPressIn&&this.props.onPressIn(e);},


touchableHandleActivePressOut:function(e){
if(!this._hideTimeout){
this._opacityInactive();}

this.props.onPressOut&&this.props.onPressOut(e);},


touchableHandlePress:function(e){
this.clearTimeout(this._hideTimeout);
this._opacityActive();
this._hideTimeout=this.setTimeout(
this._opacityInactive,
this.props.delayPressOut||100);

this.props.onPress&&this.props.onPress(e);},


touchableHandleLongPress:function(e){
this.props.onLongPress&&this.props.onLongPress(e);},


touchableGetPressRectOffset:function(){
return this.props.pressRetentionOffset||PRESS_RETENTION_OFFSET;},


touchableGetHitSlop:function(){
return this.props.hitSlop;},


touchableGetHighlightDelayMS:function(){
return this.props.delayPressIn||0;},


touchableGetLongPressDelayMS:function(){
return this.props.delayLongPress===0?0:
this.props.delayLongPress||500;},


touchableGetPressOutDelayMS:function(){
return this.props.delayPressOut;},


_opacityActive:function(){
this.setOpacityTo(this.props.activeOpacity);},


_opacityInactive:function(){
this.clearTimeout(this._hideTimeout);
this._hideTimeout=null;
var childStyle=flattenStyle(this.props.style)||{};
this.setOpacityTo(
childStyle.opacity===undefined?1:childStyle.opacity);},



render:function(){
return (
React.createElement(Animated.View,{
accessible:true,
accessibilityLabel:this.props.accessibilityLabel,
accessibilityComponentType:this.props.accessibilityComponentType,
accessibilityTraits:this.props.accessibilityTraits,
style:[this.props.style,{opacity:this.state.anim}],
testID:this.props.testID,
onLayout:this.props.onLayout,
hitSlop:this.props.hitSlop,
onStartShouldSetResponder:this.touchableHandleStartShouldSetResponder,
onResponderTerminationRequest:this.touchableHandleResponderTerminationRequest,
onResponderGrant:this.touchableHandleResponderGrant,
onResponderMove:this.touchableHandleResponderMove,
onResponderRelease:this.touchableHandleResponderRelease,
onResponderTerminate:this.touchableHandleResponderTerminate},
this.props.children));}});





module.exports=TouchableOpacity;
});
__d(245 /* Animated */, function(global, require, module, exports) {'use strict';












var AnimatedImplementation=require(246 /* AnimatedImplementation */);
var Image=require(175 /* Image */);
var Text=require(225 /* Text */);
var View=require(127 /* View */);

module.exports=babelHelpers.extends({},
AnimatedImplementation,{
View:AnimatedImplementation.createAnimatedComponent(View),
Text:AnimatedImplementation.createAnimatedComponent(Text),
Image:AnimatedImplementation.createAnimatedComponent(Image)});
});
__d(246 /* AnimatedImplementation */, function(global, require, module, exports) {'use strict';












var Easing=require(247 /* Easing */);
var InteractionManager=require(113 /* InteractionManager */);
var Interpolation=require(249 /* Interpolation */);
var React=require(47 /* React */);
var Set=require(66 /* Set */);
var SpringConfig=require(250 /* SpringConfig */);
var ViewStylePropTypes=require(139 /* ViewStylePropTypes */);

var flattenStyle=require(7 /* flattenStyle */);
var invariant=require(363 /* fbjs/lib/invariant */);
var requestAnimationFrame=require(528 /* fbjs/lib/requestAnimationFrame */);var 








Animated=function(){function Animated(){babelHelpers.classCallCheck(this,Animated);}babelHelpers.createClass(Animated,[{key:'__attach',value:function __attach()
{}},{key:'__detach',value:function __detach()
{}},{key:'__getValue',value:function __getValue()
{}},{key:'__getAnimatedValue',value:function __getAnimatedValue()
{return this.__getValue();}},{key:'__addChild',value:function __addChild(
child){}},{key:'__removeChild',value:function __removeChild(
child){}},{key:'__getChildren',value:function __getChildren()
{return [];}}]);return Animated;}();var 









Animation=function(){function Animation(){babelHelpers.classCallCheck(this,Animation);}babelHelpers.createClass(Animation,[{key:'start',value:function start(




fromValue,
onUpdate,
onEnd,
previousAnimation)
{}},{key:'stop',value:function stop()
{}},{key:'__debouncedOnEnd',value:function __debouncedOnEnd(

result){
var onEnd=this.__onEnd;
this.__onEnd=null;
onEnd&&onEnd(result);}}]);return Animation;}();var 



AnimatedWithChildren=function(_Animated){babelHelpers.inherits(AnimatedWithChildren,_Animated);


function AnimatedWithChildren(){babelHelpers.classCallCheck(this,AnimatedWithChildren);var _this=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(AnimatedWithChildren).call(this));

_this._children=[];return _this;}babelHelpers.createClass(AnimatedWithChildren,[{key:'__addChild',value:function __addChild(


child){
if(this._children.length===0){
this.__attach();}

this._children.push(child);}},{key:'__removeChild',value:function __removeChild(


child){
var index=this._children.indexOf(child);
if(index===-1){
console.warn('Trying to remove a child that doesn\'t exist');
return;}

this._children.splice(index,1);
if(this._children.length===0){
this.__detach();}}},{key:'__getChildren',value:function __getChildren()



{
return this._children;}}]);return AnimatedWithChildren;}(Animated);

























function _flush(rootNode){
var animatedStyles=new Set();
function findAnimatedStyles(node){
if(typeof node.update==='function'){
animatedStyles.add(node);}else 
{
node.__getChildren().forEach(findAnimatedStyles);}}


findAnimatedStyles(rootNode);

animatedStyles.forEach(function(animatedStyle){return animatedStyle.update();});}
















var easeInOut=Easing.inOut(Easing.ease);var 

TimingAnimation=function(_Animation){babelHelpers.inherits(TimingAnimation,_Animation);










function TimingAnimation(
config)
{babelHelpers.classCallCheck(this,TimingAnimation);var _this2=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(TimingAnimation).call(this));

_this2._toValue=config.toValue;
_this2._easing=config.easing!==undefined?config.easing:easeInOut;
_this2._duration=config.duration!==undefined?config.duration:500;
_this2._delay=config.delay!==undefined?config.delay:0;
_this2.__isInteraction=config.isInteraction!==undefined?config.isInteraction:true;return _this2;}babelHelpers.createClass(TimingAnimation,[{key:'start',value:function start(



fromValue,
onUpdate,
onEnd)
{var _this3=this;
this.__active=true;
this._fromValue=fromValue;
this._onUpdate=onUpdate;
this.__onEnd=onEnd;

var start=function(){
if(_this3._duration===0){
_this3._onUpdate(_this3._toValue);
_this3.__debouncedOnEnd({finished:true});}else 
{
_this3._startTime=Date.now();
_this3._animationFrame=requestAnimationFrame(_this3.onUpdate.bind(_this3));}};


if(this._delay){
this._timeout=setTimeout(start,this._delay);}else 
{
start();}}},{key:'onUpdate',value:function onUpdate()



{
var now=Date.now();
if(now>=this._startTime+this._duration){
if(this._duration===0){
this._onUpdate(this._toValue);}else 
{
this._onUpdate(
this._fromValue+this._easing(1)*(this._toValue-this._fromValue));}


this.__debouncedOnEnd({finished:true});
return;}


this._onUpdate(
this._fromValue+
this._easing((now-this._startTime)/this._duration)*(
this._toValue-this._fromValue));

if(this.__active){
this._animationFrame=requestAnimationFrame(this.onUpdate.bind(this));}}},{key:'stop',value:function stop()



{
this.__active=false;
clearTimeout(this._timeout);
window.cancelAnimationFrame(this._animationFrame);
this.__debouncedOnEnd({finished:false});}}]);return TimingAnimation;}(Animation);var 













DecayAnimation=function(_Animation2){babelHelpers.inherits(DecayAnimation,_Animation2);








function DecayAnimation(
config)
{babelHelpers.classCallCheck(this,DecayAnimation);var _this4=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(DecayAnimation).call(this));

_this4._deceleration=config.deceleration!==undefined?config.deceleration:0.998;
_this4._velocity=config.velocity;
_this4.__isInteraction=config.isInteraction!==undefined?config.isInteraction:true;return _this4;}babelHelpers.createClass(DecayAnimation,[{key:'start',value:function start(



fromValue,
onUpdate,
onEnd)
{
this.__active=true;
this._lastValue=fromValue;
this._fromValue=fromValue;
this._onUpdate=onUpdate;
this.__onEnd=onEnd;
this._startTime=Date.now();
this._animationFrame=requestAnimationFrame(this.onUpdate.bind(this));}},{key:'onUpdate',value:function onUpdate()


{
var now=Date.now();

var value=this._fromValue+
this._velocity/(1-this._deceleration)*(
1-Math.exp(-(1-this._deceleration)*(now-this._startTime)));

this._onUpdate(value);

if(Math.abs(this._lastValue-value)<0.1){
this.__debouncedOnEnd({finished:true});
return;}


this._lastValue=value;
if(this.__active){
this._animationFrame=requestAnimationFrame(this.onUpdate.bind(this));}}},{key:'stop',value:function stop()



{
this.__active=false;
window.cancelAnimationFrame(this._animationFrame);
this.__debouncedOnEnd({finished:false});}}]);return DecayAnimation;}(Animation);



























function withDefault(value,defaultValue){
if(value===undefined||value===null){
return defaultValue;}

return value;}var 


SpringAnimation=function(_Animation3){babelHelpers.inherits(SpringAnimation,_Animation3);















function SpringAnimation(
config)
{babelHelpers.classCallCheck(this,SpringAnimation);var _this5=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(SpringAnimation).call(this));


_this5._overshootClamping=withDefault(config.overshootClamping,false);
_this5._restDisplacementThreshold=withDefault(config.restDisplacementThreshold,0.001);
_this5._restSpeedThreshold=withDefault(config.restSpeedThreshold,0.001);
_this5._initialVelocity=config.velocity;
_this5._lastVelocity=withDefault(config.velocity,0);
_this5._toValue=config.toValue;
_this5.__isInteraction=config.isInteraction!==undefined?config.isInteraction:true;

var springConfig;
if(config.bounciness!==undefined||config.speed!==undefined){
invariant(
config.tension===undefined&&config.friction===undefined,
'You can only define bounciness/speed or tension/friction but not both');

springConfig=SpringConfig.fromBouncinessAndSpeed(
withDefault(config.bounciness,8),
withDefault(config.speed,12));}else 

{
springConfig=SpringConfig.fromOrigamiTensionAndFriction(
withDefault(config.tension,40),
withDefault(config.friction,7));}


_this5._tension=springConfig.tension;
_this5._friction=springConfig.friction;return _this5;}babelHelpers.createClass(SpringAnimation,[{key:'start',value:function start(



fromValue,
onUpdate,
onEnd,
previousAnimation)
{
this.__active=true;
this._startPosition=fromValue;
this._lastPosition=this._startPosition;

this._onUpdate=onUpdate;
this.__onEnd=onEnd;
this._lastTime=Date.now();

if(previousAnimation instanceof SpringAnimation){
var internalState=previousAnimation.getInternalState();
this._lastPosition=internalState.lastPosition;
this._lastVelocity=internalState.lastVelocity;
this._lastTime=internalState.lastTime;}

if(this._initialVelocity!==undefined&&
this._initialVelocity!==null){
this._lastVelocity=this._initialVelocity;}

this.onUpdate();}},{key:'getInternalState',value:function getInternalState()


{
return {
lastPosition:this._lastPosition,
lastVelocity:this._lastVelocity,
lastTime:this._lastTime};}},{key:'onUpdate',value:function onUpdate()



{
var position=this._lastPosition;
var velocity=this._lastVelocity;

var tempPosition=this._lastPosition;
var tempVelocity=this._lastVelocity;





var MAX_STEPS=64;
var now=Date.now();
if(now>this._lastTime+MAX_STEPS){
now=this._lastTime+MAX_STEPS;}





var TIMESTEP_MSEC=1;
var numSteps=Math.floor((now-this._lastTime)/TIMESTEP_MSEC);

for(var i=0;i<numSteps;++i){

var step=TIMESTEP_MSEC/1000;



var aVelocity=velocity;
var aAcceleration=this._tension*(this._toValue-tempPosition)-this._friction*tempVelocity;
var tempPosition=position+aVelocity*step/2;
var tempVelocity=velocity+aAcceleration*step/2;

var bVelocity=tempVelocity;
var bAcceleration=this._tension*(this._toValue-tempPosition)-this._friction*tempVelocity;
tempPosition=position+bVelocity*step/2;
tempVelocity=velocity+bAcceleration*step/2;

var cVelocity=tempVelocity;
var cAcceleration=this._tension*(this._toValue-tempPosition)-this._friction*tempVelocity;
tempPosition=position+cVelocity*step/2;
tempVelocity=velocity+cAcceleration*step/2;

var dVelocity=tempVelocity;
var dAcceleration=this._tension*(this._toValue-tempPosition)-this._friction*tempVelocity;
tempPosition=position+cVelocity*step/2;
tempVelocity=velocity+cAcceleration*step/2;

var dxdt=(aVelocity+2*(bVelocity+cVelocity)+dVelocity)/6;
var dvdt=(aAcceleration+2*(bAcceleration+cAcceleration)+dAcceleration)/6;

position+=dxdt*step;
velocity+=dvdt*step;}


this._lastTime=now;
this._lastPosition=position;
this._lastVelocity=velocity;

this._onUpdate(position);
if(!this.__active){
return;}



var isOvershooting=false;
if(this._overshootClamping&&this._tension!==0){
if(this._startPosition<this._toValue){
isOvershooting=position>this._toValue;}else 
{
isOvershooting=position<this._toValue;}}


var isVelocity=Math.abs(velocity)<=this._restSpeedThreshold;
var isDisplacement=true;
if(this._tension!==0){
isDisplacement=Math.abs(this._toValue-position)<=this._restDisplacementThreshold;}


if(isOvershooting||isVelocity&&isDisplacement){
if(this._tension!==0){

this._onUpdate(this._toValue);}


this.__debouncedOnEnd({finished:true});
return;}

this._animationFrame=requestAnimationFrame(this.onUpdate.bind(this));}},{key:'stop',value:function stop()


{
this.__active=false;
window.cancelAnimationFrame(this._animationFrame);
this.__debouncedOnEnd({finished:false});}}]);return SpringAnimation;}(Animation);





var _uniqueId=1;var 







AnimatedValue=function(_AnimatedWithChildren){babelHelpers.inherits(AnimatedValue,_AnimatedWithChildren);






function AnimatedValue(value){babelHelpers.classCallCheck(this,AnimatedValue);var _this6=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(AnimatedValue).call(this));

_this6._value=value;
_this6._offset=0;
_this6._animation=null;
_this6._listeners={};return _this6;}babelHelpers.createClass(AnimatedValue,[{key:'__detach',value:function __detach()


{
this.stopAnimation();}},{key:'__getValue',value:function __getValue()


{
return this._value+this._offset;}},{key:'setValue',value:function setValue(






value){
if(this._animation){
this._animation.stop();
this._animation=null;}

this._updateValue(value);}},{key:'setOffset',value:function setOffset(







offset){
this._offset=offset;}},{key:'flattenOffset',value:function flattenOffset()






{
this._value+=this._offset;
this._offset=0;}},{key:'addListener',value:function addListener(







callback){
var id=String(_uniqueId++);
this._listeners[id]=callback;
return id;}},{key:'removeListener',value:function removeListener(


id){
delete this._listeners[id];}},{key:'removeAllListeners',value:function removeAllListeners()


{
this._listeners={};}},{key:'stopAnimation',value:function stopAnimation(







callback){
this.stopTracking();
this._animation&&this._animation.stop();
this._animation=null;
callback&&callback(this.__getValue());}},{key:'interpolate',value:function interpolate(






config){
return new AnimatedInterpolation(this,Interpolation.create(config));}},{key:'animate',value:function animate(






animation,callback){var _this7=this;
var handle=null;
if(animation.__isInteraction){
handle=InteractionManager.createInteractionHandle();}

var previousAnimation=this._animation;
this._animation&&this._animation.stop();
this._animation=animation;
animation.start(
this._value,
function(value){
_this7._updateValue(value);},

function(result){
_this7._animation=null;
if(handle!==null){
InteractionManager.clearInteractionHandle(handle);}

callback&&callback(result);},

previousAnimation);}},{key:'stopTracking',value:function stopTracking()






{
this._tracking&&this._tracking.__detach();
this._tracking=null;}},{key:'track',value:function track(





tracking){
this.stopTracking();
this._tracking=tracking;}},{key:'_updateValue',value:function _updateValue(


value){
this._value=value;
_flush(this);
for(var key in this._listeners){
this._listeners[key]({value:this.__getValue()});}}}]);return AnimatedValue;}(AnimatedWithChildren);var 












































AnimatedValueXY=function(_AnimatedWithChildren2){babelHelpers.inherits(AnimatedValueXY,_AnimatedWithChildren2);




function AnimatedValueXY(valueIn){babelHelpers.classCallCheck(this,AnimatedValueXY);var _this8=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(AnimatedValueXY).call(this));

var value=valueIn||{x:0,y:0};
if(typeof value.x==='number'&&typeof value.y==='number'){
_this8.x=new AnimatedValue(value.x);
_this8.y=new AnimatedValue(value.y);}else 
{
invariant(
value.x instanceof AnimatedValue&&
value.y instanceof AnimatedValue,
'AnimatedValueXY must be initalized with an object of numbers or '+
'AnimatedValues.');

_this8.x=value.x;
_this8.y=value.y;}

_this8._listeners={};return _this8;}babelHelpers.createClass(AnimatedValueXY,[{key:'setValue',value:function setValue(


value){
this.x.setValue(value.x);
this.y.setValue(value.y);}},{key:'setOffset',value:function setOffset(


offset){
this.x.setOffset(offset.x);
this.y.setOffset(offset.y);}},{key:'flattenOffset',value:function flattenOffset()


{
this.x.flattenOffset();
this.y.flattenOffset();}},{key:'__getValue',value:function __getValue()


{
return {
x:this.x.__getValue(),
y:this.y.__getValue()};}},{key:'stopAnimation',value:function stopAnimation(



callback){
this.x.stopAnimation();
this.y.stopAnimation();
callback&&callback(this.__getValue());}},{key:'addListener',value:function addListener(


callback){var _this9=this;
var id=String(_uniqueId++);
var jointCallback=function(_ref){var number=_ref.value;
callback(_this9.__getValue());};

this._listeners[id]={
x:this.x.addListener(jointCallback),
y:this.y.addListener(jointCallback)};

return id;}},{key:'removeListener',value:function removeListener(


id){
this.x.removeListener(this._listeners[id].x);
this.y.removeListener(this._listeners[id].y);
delete this._listeners[id];}},{key:'getLayout',value:function getLayout()









{
return {
left:this.x,
top:this.y};}},{key:'getTranslateTransform',value:function getTranslateTransform()












{
return [
{translateX:this.x},
{translateY:this.y}];}}]);return AnimatedValueXY;}(AnimatedWithChildren);var 




AnimatedInterpolation=function(_AnimatedWithChildren3){babelHelpers.inherits(AnimatedInterpolation,_AnimatedWithChildren3);



function AnimatedInterpolation(parent,interpolation){babelHelpers.classCallCheck(this,AnimatedInterpolation);var _this10=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(AnimatedInterpolation).call(this));

_this10._parent=parent;
_this10._interpolation=interpolation;return _this10;}babelHelpers.createClass(AnimatedInterpolation,[{key:'__getValue',value:function __getValue()


{
var parentValue=this._parent.__getValue();
invariant(
typeof parentValue==='number',
'Cannot interpolate an input which is not a number.');

return this._interpolation(parentValue);}},{key:'interpolate',value:function interpolate(


config){
return new AnimatedInterpolation(this,Interpolation.create(config));}},{key:'__attach',value:function __attach()


{
this._parent.__addChild(this);}},{key:'__detach',value:function __detach()


{
this._parent.__removeChild(this);}}]);return AnimatedInterpolation;}(AnimatedWithChildren);var 



AnimatedAddition=function(_AnimatedWithChildren4){babelHelpers.inherits(AnimatedAddition,_AnimatedWithChildren4);



function AnimatedAddition(a,b){babelHelpers.classCallCheck(this,AnimatedAddition);var _this11=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(AnimatedAddition).call(this));

_this11._a=typeof a==='number'?new AnimatedValue(a):a;
_this11._b=typeof b==='number'?new AnimatedValue(b):b;return _this11;}babelHelpers.createClass(AnimatedAddition,[{key:'__getValue',value:function __getValue()


{
return this._a.__getValue()+this._b.__getValue();}},{key:'interpolate',value:function interpolate(


config){
return new AnimatedInterpolation(this,Interpolation.create(config));}},{key:'__attach',value:function __attach()


{
this._a.__addChild(this);
this._b.__addChild(this);}},{key:'__detach',value:function __detach()


{
this._a.__removeChild(this);
this._b.__removeChild(this);}}]);return AnimatedAddition;}(AnimatedWithChildren);var 



AnimatedMultiplication=function(_AnimatedWithChildren5){babelHelpers.inherits(AnimatedMultiplication,_AnimatedWithChildren5);



function AnimatedMultiplication(a,b){babelHelpers.classCallCheck(this,AnimatedMultiplication);var _this12=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(AnimatedMultiplication).call(this));

_this12._a=typeof a==='number'?new AnimatedValue(a):a;
_this12._b=typeof b==='number'?new AnimatedValue(b):b;return _this12;}babelHelpers.createClass(AnimatedMultiplication,[{key:'__getValue',value:function __getValue()


{
return this._a.__getValue()*this._b.__getValue();}},{key:'interpolate',value:function interpolate(


config){
return new AnimatedInterpolation(this,Interpolation.create(config));}},{key:'__attach',value:function __attach()


{
this._a.__addChild(this);
this._b.__addChild(this);}},{key:'__detach',value:function __detach()


{
this._a.__removeChild(this);
this._b.__removeChild(this);}}]);return AnimatedMultiplication;}(AnimatedWithChildren);var 



AnimatedModulo=function(_AnimatedWithChildren6){babelHelpers.inherits(AnimatedModulo,_AnimatedWithChildren6);



function AnimatedModulo(a,modulus){babelHelpers.classCallCheck(this,AnimatedModulo);var _this13=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(AnimatedModulo).call(this));

_this13._a=a;
_this13._modulus=modulus;return _this13;}babelHelpers.createClass(AnimatedModulo,[{key:'__getValue',value:function __getValue()


{
return (this._a.__getValue()%this._modulus+this._modulus)%this._modulus;}},{key:'interpolate',value:function interpolate(


config){
return new AnimatedInterpolation(this,Interpolation.create(config));}},{key:'__attach',value:function __attach()


{
this._a.__addChild(this);}},{key:'__detach',value:function __detach()


{
this._a.__removeChild(this);}}]);return AnimatedModulo;}(AnimatedWithChildren);var 



AnimatedTransform=function(_AnimatedWithChildren7){babelHelpers.inherits(AnimatedTransform,_AnimatedWithChildren7);


function AnimatedTransform(transforms){babelHelpers.classCallCheck(this,AnimatedTransform);var _this14=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(AnimatedTransform).call(this));

_this14._transforms=transforms;return _this14;}babelHelpers.createClass(AnimatedTransform,[{key:'__getValue',value:function __getValue()


{
return this._transforms.map(function(transform){
var result={};
for(var key in transform){
var value=transform[key];
if(value instanceof Animated){
result[key]=value.__getValue();}else 
{
result[key]=value;}}


return result;});}},{key:'__getAnimatedValue',value:function __getAnimatedValue()



{
return this._transforms.map(function(transform){
var result={};
for(var key in transform){
var value=transform[key];
if(value instanceof Animated){
result[key]=value.__getAnimatedValue();}else 
{

result[key]=value;}}


return result;});}},{key:'__attach',value:function __attach()



{var _this15=this;
this._transforms.forEach(function(transform){
for(var key in transform){
var value=transform[key];
if(value instanceof Animated){
value.__addChild(_this15);}}});}},{key:'__detach',value:function __detach()





{var _this16=this;
this._transforms.forEach(function(transform){
for(var key in transform){
var value=transform[key];
if(value instanceof Animated){
value.__removeChild(_this16);}}});}}]);return AnimatedTransform;}(AnimatedWithChildren);var 






AnimatedStyle=function(_AnimatedWithChildren8){babelHelpers.inherits(AnimatedStyle,_AnimatedWithChildren8);


function AnimatedStyle(style){babelHelpers.classCallCheck(this,AnimatedStyle);var _this17=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(AnimatedStyle).call(this));

style=flattenStyle(style)||{};
if(style.transform){
style=babelHelpers.extends({},
style,{
transform:new AnimatedTransform(style.transform)});}


_this17._style=style;return _this17;}babelHelpers.createClass(AnimatedStyle,[{key:'__getValue',value:function __getValue()


{
var style={};
for(var key in this._style){
var value=this._style[key];
if(value instanceof Animated){
style[key]=value.__getValue();}else 
{
style[key]=value;}}


return style;}},{key:'__getAnimatedValue',value:function __getAnimatedValue()


{
var style={};
for(var key in this._style){
var value=this._style[key];
if(value instanceof Animated){
style[key]=value.__getAnimatedValue();}}


return style;}},{key:'__attach',value:function __attach()


{
for(var key in this._style){
var value=this._style[key];
if(value instanceof Animated){
value.__addChild(this);}}}},{key:'__detach',value:function __detach()




{
for(var key in this._style){
var value=this._style[key];
if(value instanceof Animated){
value.__removeChild(this);}}}}]);return AnimatedStyle;}(AnimatedWithChildren);var 





AnimatedProps=function(_Animated2){babelHelpers.inherits(AnimatedProps,_Animated2);



function AnimatedProps(
props,
callback)
{babelHelpers.classCallCheck(this,AnimatedProps);var _this18=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(AnimatedProps).call(this));

if(props.style){
props=babelHelpers.extends({},
props,{
style:new AnimatedStyle(props.style)});}


_this18._props=props;
_this18._callback=callback;
_this18.__attach();return _this18;}babelHelpers.createClass(AnimatedProps,[{key:'__getValue',value:function __getValue()


{
var props={};
for(var key in this._props){
var value=this._props[key];
if(value instanceof Animated){
props[key]=value.__getValue();}else 
{
props[key]=value;}}


return props;}},{key:'__getAnimatedValue',value:function __getAnimatedValue()


{
var props={};
for(var key in this._props){
var value=this._props[key];
if(value instanceof Animated){
props[key]=value.__getAnimatedValue();}}


return props;}},{key:'__attach',value:function __attach()


{
for(var key in this._props){
var value=this._props[key];
if(value instanceof Animated){
value.__addChild(this);}}}},{key:'__detach',value:function __detach()




{
for(var key in this._props){
var value=this._props[key];
if(value instanceof Animated){
value.__removeChild(this);}}}},{key:'update',value:function update()




{
this._callback();}}]);return AnimatedProps;}(Animated);



function createAnimatedComponent(Component){
var refName='node';var 

AnimatedComponent=function(_React$Component){babelHelpers.inherits(AnimatedComponent,_React$Component);function AnimatedComponent(){babelHelpers.classCallCheck(this,AnimatedComponent);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(AnimatedComponent).apply(this,arguments));}babelHelpers.createClass(AnimatedComponent,[{key:'componentWillUnmount',value:function componentWillUnmount()


{
this._propsAnimated&&this._propsAnimated.__detach();}},{key:'setNativeProps',value:function setNativeProps(


props){
this.refs[refName].setNativeProps(props);}},{key:'componentWillMount',value:function componentWillMount()


{
this.attachProps(this.props);}},{key:'attachProps',value:function attachProps(


nextProps){var _this20=this;
var oldPropsAnimated=this._propsAnimated;







var callback=function(){
if(_this20.refs[refName].setNativeProps){
var value=_this20._propsAnimated.__getAnimatedValue();
_this20.refs[refName].setNativeProps(value);}else 
{
_this20.forceUpdate();}};



this._propsAnimated=new AnimatedProps(
nextProps,
callback);










oldPropsAnimated&&oldPropsAnimated.__detach();}},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(


nextProps){
this.attachProps(nextProps);}},{key:'render',value:function render()


{
return (
React.createElement(Component,babelHelpers.extends({},
this._propsAnimated.__getValue(),{
ref:refName})));}}]);return AnimatedComponent;}(React.Component);




AnimatedComponent.propTypes={
style:function(props,propName,componentName){
if(!Component.propTypes){
return;}


for(var key in ViewStylePropTypes){
if(!Component.propTypes[key]&&props[key]!==undefined){
console.error(
'You are setting the style `{ '+key+': ... }` as a prop. You '+
'should nest it in a style object. '+
'E.g. `{ style: { '+key+': ... } }`');}}}};






return AnimatedComponent;}var 


AnimatedTracking=function(_Animated3){babelHelpers.inherits(AnimatedTracking,_Animated3);






function AnimatedTracking(
value,
parent,
animationClass,
animationConfig,
callback)
{babelHelpers.classCallCheck(this,AnimatedTracking);var _this21=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(AnimatedTracking).call(this));

_this21._value=value;
_this21._parent=parent;
_this21._animationClass=animationClass;
_this21._animationConfig=animationConfig;
_this21._callback=callback;
_this21.__attach();return _this21;}babelHelpers.createClass(AnimatedTracking,[{key:'__getValue',value:function __getValue()


{
return this._parent.__getValue();}},{key:'__attach',value:function __attach()


{
this._parent.__addChild(this);}},{key:'__detach',value:function __detach()


{
this._parent.__removeChild(this);}},{key:'update',value:function update()


{
this._value.animate(new this._animationClass(babelHelpers.extends({},
this._animationConfig,{
toValue:this._animationConfig.toValue.__getValue()})),
this._callback);}}]);return AnimatedTracking;}(Animated);








var add=function(
a,
b)
{
return new AnimatedAddition(a,b);};


var multiply=function(
a,
b)
{
return new AnimatedMultiplication(a,b);};


var modulo=function(
a,
modulus)
{
return new AnimatedModulo(a,modulus);};



var maybeVectorAnim=function(
value,
config,
anim)
{
if(value instanceof AnimatedValueXY){
var configX=babelHelpers.extends({},config);
var configY=babelHelpers.extends({},config);
for(var key in config){var _config$key=
config[key];var x=_config$key.x;var y=_config$key.y;
if(x!==undefined&&y!==undefined){
configX[key]=x;
configY[key]=y;}}


var aX=anim(value.x,configX);
var aY=anim(value.y,configY);


return parallel([aX,aY],{stopTogether:false});}

return null;};


var spring=function(
value,
config)
{
return maybeVectorAnim(value,config,spring)||{
start:function(callback){
var singleValue=value;
var singleConfig=config;
singleValue.stopTracking();
if(config.toValue instanceof Animated){
singleValue.track(new AnimatedTracking(
singleValue,
config.toValue,
SpringAnimation,
singleConfig,
callback));}else 

{
singleValue.animate(new SpringAnimation(singleConfig),callback);}},



stop:function(){
value.stopAnimation();}};};




var timing=function(
value,
config)
{
return maybeVectorAnim(value,config,timing)||{
start:function(callback){
var singleValue=value;
var singleConfig=config;
singleValue.stopTracking();
if(config.toValue instanceof Animated){
singleValue.track(new AnimatedTracking(
singleValue,
config.toValue,
TimingAnimation,
singleConfig,
callback));}else 

{
singleValue.animate(new TimingAnimation(singleConfig),callback);}},



stop:function(){
value.stopAnimation();}};};




var decay=function(
value,
config)
{
return maybeVectorAnim(value,config,decay)||{
start:function(callback){
var singleValue=value;
var singleConfig=config;
singleValue.stopTracking();
singleValue.animate(new DecayAnimation(singleConfig),callback);},


stop:function(){
value.stopAnimation();}};};




var sequence=function(
animations)
{
var current=0;
return {
start:function(callback){
var onComplete=function(result){
if(!result.finished){
callback&&callback(result);
return;}


current++;

if(current===animations.length){
callback&&callback(result);
return;}


animations[current].start(onComplete);};


if(animations.length===0){
callback&&callback({finished:true});}else 
{
animations[current].start(onComplete);}},



stop:function(){
if(current<animations.length){
animations[current].stop();}}};};








var parallel=function(
animations,
config)
{
var doneCount=0;

var hasEnded={};
var stopTogether=!(config&&config.stopTogether===false);

var result={
start:function(callback){
if(doneCount===animations.length){
callback&&callback({finished:true});
return;}


animations.forEach(function(animation,idx){
var cb=function(endResult){
hasEnded[idx]=true;
doneCount++;
if(doneCount===animations.length){
doneCount=0;
callback&&callback(endResult);
return;}


if(!endResult.finished&&stopTogether){
result.stop();}};



if(!animation){
cb({finished:true});}else 
{
animation.start(cb);}});},




stop:function(){
animations.forEach(function(animation,idx){
!hasEnded[idx]&&animation.stop();
hasEnded[idx]=true;});}};




return result;};


var delay=function(time){

return timing(new AnimatedValue(0),{toValue:0,delay:time,duration:0});};


var stagger=function(
time,
animations)
{
return parallel(animations.map(function(animation,i){
return sequence([
delay(time*i),
animation]);}));};







var event=function(
argMapping,
config)
{
return function(){for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}
var traverse=function(recMapping,recEvt,key){
if(typeof recEvt==='number'){
invariant(
recMapping instanceof AnimatedValue,
'Bad mapping of type '+typeof recMapping+' for key '+key+
', event value must map to AnimatedValue');

recMapping.setValue(recEvt);
return;}

invariant(
typeof recMapping==='object',
'Bad mapping of type '+typeof recMapping+' for key '+key);

invariant(
typeof recEvt==='object',
'Bad event of type '+typeof recEvt+' for key '+key);

for(var key in recMapping){
traverse(recMapping[key],recEvt[key],key);}};


argMapping.forEach(function(mapping,idx){
traverse(mapping,args[idx],'arg'+idx);});

if(config&&config.listener){
config.listener.apply(null,args);}};};





























































































module.exports={




Value:AnimatedValue,



ValueXY:AnimatedValueXY,





decay:decay,




timing:timing,




spring:spring,





add:add,




multiply:multiply,





modulo:modulo,




delay:delay,





sequence:sequence,





parallel:parallel,




stagger:stagger,

















event:event,




createAnimatedComponent:createAnimatedComponent,

__PropsOnlyForTests:AnimatedProps};
});
__d(247 /* Easing */, function(global, require, module, exports) {'use strict';












var _bezier=require(248 /* bezier */);var 






Easing=function(){function Easing(){babelHelpers.classCallCheck(this,Easing);}babelHelpers.createClass(Easing,null,[{key:'step0',value:function step0(
n){
return n>0?1:0;}},{key:'step1',value:function step1(


n){
return n>=1?1:0;}},{key:'linear',value:function linear(


t){
return t;}},{key:'ease',value:function ease(


t){
return _ease(t);}},{key:'quad',value:function quad(


t){
return t*t;}},{key:'cubic',value:function cubic(


t){
return t*t*t;}},{key:'poly',value:function poly(


n){
return function(t){return Math.pow(t,n);};}},{key:'sin',value:function sin(


t){
return 1-Math.cos(t*Math.PI/2);}},{key:'circle',value:function circle(


t){
return 1-Math.sqrt(1-t*t);}},{key:'exp',value:function exp(


t){
return Math.pow(2,10*(t-1));}},{key:'elastic',value:function elastic()












{var bounciness=arguments.length<=0||arguments[0]===undefined?1:arguments[0];
var p=bounciness*Math.PI;
return function(t){return 1-Math.pow(Math.cos(t*Math.PI/2),3)*Math.cos(t*p);};}},{key:'back',value:function back(


s){
if(s===undefined){
s=1.70158;}

return function(t){return t*t*((s+1)*t-s);};}},{key:'bounce',value:function bounce(


t){
if(t<1/2.75){
return 7.5625*t*t;}


if(t<2/2.75){
t-=1.5/2.75;
return 7.5625*t*t+0.75;}


if(t<2.5/2.75){
t-=2.25/2.75;
return 7.5625*t*t+0.9375;}


t-=2.625/2.75;
return 7.5625*t*t+0.984375;}},{key:'bezier',value:function bezier(



x1,
y1,
x2,
y2)
{
return _bezier(x1,y1,x2,y2);}},{key:'in',value:function _in(



easing)
{
return easing;}},{key:'out',value:function out(






easing)
{
return function(t){return 1-easing(1-t);};}},{key:'inOut',value:function inOut(






easing)
{
return function(t){
if(t<0.5){
return easing(t*2)/2;}

return 1-easing((1-t)*2)/2;};}}]);return Easing;}();




var _ease=Easing.bezier(0.42,0,1,1);



module.exports=Easing;
});
__d(248 /* bezier */, function(global, require, module, exports) {var 








NEWTON_ITERATIONS=4;
var NEWTON_MIN_SLOPE=0.001;
var SUBDIVISION_PRECISION=0.0000001;
var SUBDIVISION_MAX_ITERATIONS=10;

var kSplineTableSize=11;
var kSampleStepSize=1.0/(kSplineTableSize-1.0);

var float32ArraySupported=typeof Float32Array==='function';

function A(aA1,aA2){return 1.0-3.0*aA2+3.0*aA1;}
function B(aA1,aA2){return 3.0*aA2-6.0*aA1;}
function C(aA1){return 3.0*aA1;}


function calcBezier(aT,aA1,aA2){return ((A(aA1,aA2)*aT+B(aA1,aA2))*aT+C(aA1))*aT;}


function getSlope(aT,aA1,aA2){return 3.0*A(aA1,aA2)*aT*aT+2.0*B(aA1,aA2)*aT+C(aA1);}

function binarySubdivide(aX,aA,aB,mX1,mX2){
var currentX,currentT,i=0;
do {
currentT=aA+(aB-aA)/2.0;
currentX=calcBezier(currentT,mX1,mX2)-aX;
if(currentX>0.0){
aB=currentT;}else 
{
aA=currentT;}}while(

Math.abs(currentX)>SUBDIVISION_PRECISION&&++i<SUBDIVISION_MAX_ITERATIONS);
return currentT;}


function newtonRaphsonIterate(aX,aGuessT,mX1,mX2){
for(var i=0;i<NEWTON_ITERATIONS;++i){
var currentSlope=getSlope(aGuessT,mX1,mX2);
if(currentSlope===0.0){
return aGuessT;}

var currentX=calcBezier(aGuessT,mX1,mX2)-aX;
aGuessT-=currentX/currentSlope;}

return aGuessT;}


module.exports=function bezier(mX1,mY1,mX2,mY2){
if(!(0<=mX1&&mX1<=1&&0<=mX2&&mX2<=1)){
throw new Error('bezier x values must be in [0, 1] range');}



var sampleValues=float32ArraySupported?new Float32Array(kSplineTableSize):new Array(kSplineTableSize);
if(mX1!==mY1||mX2!==mY2){
for(var i=0;i<kSplineTableSize;++i){
sampleValues[i]=calcBezier(i*kSampleStepSize,mX1,mX2);}}



function getTForX(aX){
var intervalStart=0.0;
var currentSample=1;
var lastSample=kSplineTableSize-1;

for(;currentSample!==lastSample&&sampleValues[currentSample]<=aX;++currentSample){
intervalStart+=kSampleStepSize;}

--currentSample;


var dist=(aX-sampleValues[currentSample])/(sampleValues[currentSample+1]-sampleValues[currentSample]);
var guessForT=intervalStart+dist*kSampleStepSize;

var initialSlope=getSlope(guessForT,mX1,mX2);
if(initialSlope>=NEWTON_MIN_SLOPE){
return newtonRaphsonIterate(aX,guessForT,mX1,mX2);}else 
if(initialSlope===0.0){
return guessForT;}else 
{
return binarySubdivide(aX,intervalStart,intervalStart+kSampleStepSize,mX1,mX2);}}



return function BezierEasing(x){
if(mX1===mY1&&mX2===mY2){
return x;}


if(x===0){
return 0;}

if(x===1){
return 1;}

return calcBezier(getTForX(x),mY1,mY2);};};
});
__d(249 /* Interpolation */, function(global, require, module, exports) {'use strict';













var invariant=require(363 /* fbjs/lib/invariant */);
var normalizeColor=require(31 /* normalizeColor */);












var linear=function(t){return t;};var 





Interpolation=function(){function Interpolation(){babelHelpers.classCallCheck(this,Interpolation);}babelHelpers.createClass(Interpolation,null,[{key:'create',value:function create(
config){

if(config.outputRange&&typeof config.outputRange[0]==='string'){
return createInterpolationFromStringOutputRange(config);}


var outputRange=config.outputRange;
checkInfiniteRange('outputRange',outputRange);

var inputRange=config.inputRange;
checkInfiniteRange('inputRange',inputRange);
checkValidInputRange(inputRange);

invariant(
inputRange.length===outputRange.length,
'inputRange ('+inputRange.length+') and outputRange ('+
outputRange.length+') must have the same length');


var easing=config.easing||linear;

var extrapolateLeft='extend';
if(config.extrapolateLeft!==undefined){
extrapolateLeft=config.extrapolateLeft;}else 
if(config.extrapolate!==undefined){
extrapolateLeft=config.extrapolate;}


var extrapolateRight='extend';
if(config.extrapolateRight!==undefined){
extrapolateRight=config.extrapolateRight;}else 
if(config.extrapolate!==undefined){
extrapolateRight=config.extrapolate;}


return function(input){
invariant(
typeof input==='number',
'Cannot interpolation an input which is not a number');


var range=findRange(input,inputRange);
return interpolate(
input,
inputRange[range],
inputRange[range+1],
outputRange[range],
outputRange[range+1],
easing,
extrapolateLeft,
extrapolateRight);};}}]);return Interpolation;}();





function interpolate(
input,
inputMin,
inputMax,
outputMin,
outputMax,
easing,
extrapolateLeft,
extrapolateRight)
{
var result=input;


if(result<inputMin){
if(extrapolateLeft==='identity'){
return result;}else 
if(extrapolateLeft==='clamp'){
result=inputMin;}else 
if(extrapolateLeft==='extend'){}}




if(result>inputMax){
if(extrapolateRight==='identity'){
return result;}else 
if(extrapolateRight==='clamp'){
result=inputMax;}else 
if(extrapolateRight==='extend'){}}




if(outputMin===outputMax){
return outputMin;}


if(inputMin===inputMax){
if(input<=inputMin){
return outputMin;}

return outputMax;}



if(inputMin===-Infinity){
result=-result;}else 
if(inputMax===Infinity){
result=result-inputMin;}else 
{
result=(result-inputMin)/(inputMax-inputMin);}



result=easing(result);


if(outputMin===-Infinity){
result=-result;}else 
if(outputMax===Infinity){
result=result+outputMin;}else 
{
result=result*(outputMax-outputMin)+outputMin;}


return result;}


function colorToRgba(input){
var int32Color=normalizeColor(input);
if(int32Color===null){
return input;}


int32Color=int32Color||0;

var r=(int32Color&0xff000000)>>>24;
var g=(int32Color&0x00ff0000)>>>16;
var b=(int32Color&0x0000ff00)>>>8;
var a=(int32Color&0x000000ff)/255;

return 'rgba('+r+', '+g+', '+b+', '+a+')';}


var stringShapeRegex=/[0-9\.-]+/g;









function createInterpolationFromStringOutputRange(
config)
{
var outputRange=config.outputRange;
invariant(outputRange.length>=2,'Bad output range');
outputRange=outputRange.map(colorToRgba);
checkPattern(outputRange);












var outputRanges=outputRange[0].match(stringShapeRegex).map(function(){return [];});
outputRange.forEach(function(value){



value.match(stringShapeRegex).forEach(function(number,i){
outputRanges[i].push(+number);});});






var interpolations=outputRange[0].match(stringShapeRegex).map(function(value,i){
return Interpolation.create(babelHelpers.extends({},
config,{
outputRange:outputRanges[i]}));});



return function(input){
var i=0;



return outputRange[0].replace(stringShapeRegex,function(){
return String(interpolations[i++](input));});};}




function checkPattern(arr){
var pattern=arr[0].replace(stringShapeRegex,'');
for(var i=1;i<arr.length;++i){
invariant(
pattern===arr[i].replace(stringShapeRegex,''),
'invalid pattern '+arr[0]+' and '+arr[i]);}}




function findRange(input,inputRange){
for(var i=1;i<inputRange.length-1;++i){
if(inputRange[i]>=input){
break;}}


return i-1;}


function checkValidInputRange(arr){
invariant(arr.length>=2,'inputRange must have at least 2 elements');
for(var i=1;i<arr.length;++i){
invariant(
arr[i]>=arr[i-1],






'inputRange must be monotonically increasing '+arr);}}




function checkInfiniteRange(name,arr){
invariant(arr.length>=2,name+' must have at least 2 elements');
invariant(
arr.length!==2||arr[0]!==-Infinity||arr[1]!==Infinity,






name+'cannot be ]-infinity;+infinity[ '+arr);}



module.exports=Interpolation;
});
__d(250 /* SpringConfig */, function(global, require, module, exports) {'use strict';


















function tensionFromOrigamiValue(oValue){
return (oValue-30)*3.62+194;}


function frictionFromOrigamiValue(oValue){
return (oValue-8)*3+25;}


function fromOrigamiTensionAndFriction(
tension,
friction)
{
return {
tension:tensionFromOrigamiValue(tension),
friction:frictionFromOrigamiValue(friction)};}



function fromBouncinessAndSpeed(
bounciness,
speed)
{
function normalize(value,startValue,endValue){
return (value-startValue)/(endValue-startValue);}


function projectNormal(n,start,end){
return start+n*(end-start);}


function linearInterpolation(t,start,end){
return t*end+(1-t)*start;}


function quadraticOutInterpolation(t,start,end){
return linearInterpolation(2*t-t*t,start,end);}


function b3Friction1(x){
return 0.0007*Math.pow(x,3)-
0.031*Math.pow(x,2)+0.64*x+1.28;}


function b3Friction2(x){
return 0.000044*Math.pow(x,3)-
0.006*Math.pow(x,2)+0.36*x+2;}


function b3Friction3(x){
return 0.00000045*Math.pow(x,3)-
0.000332*Math.pow(x,2)+0.1078*x+5.84;}


function b3Nobounce(tension){
if(tension<=18){
return b3Friction1(tension);}else 
if(tension>18&&tension<=44){
return b3Friction2(tension);}else 
{
return b3Friction3(tension);}}



var b=normalize(bounciness/1.7,0,20);
b=projectNormal(b,0,0.8);
var s=normalize(speed/1.7,0,20);
var bouncyTension=projectNormal(s,0.5,200);
var bouncyFriction=quadraticOutInterpolation(
b,
b3Nobounce(bouncyTension),
0.01);


return {
tension:tensionFromOrigamiValue(bouncyTension),
friction:frictionFromOrigamiValue(bouncyFriction)};}



module.exports={
fromOrigamiTensionAndFriction:fromOrigamiTensionAndFriction,
fromBouncinessAndSpeed:fromBouncinessAndSpeed};
});
__d(528 /* fbjs/lib/requestAnimationFrame.js */, function(global, require, module, exports) {'use strict';











var emptyFunction=require(369 /* ./emptyFunction */);
var nativeRequestAnimationFrame=require(529 /* ./nativeRequestAnimationFrame */);

var lastTime=0;

var requestAnimationFrame=nativeRequestAnimationFrame||function(callback){
var currTime=Date.now();
var timeDelay=Math.max(0,16-(currTime-lastTime));
lastTime=currTime+timeDelay;
return global.setTimeout(function(){
callback(Date.now());},
timeDelay);};



requestAnimationFrame(emptyFunction);

module.exports=requestAnimationFrame;
});
__d(529 /* fbjs/lib/nativeRequestAnimationFrame.js */, function(global, require, module, exports) {"use strict";











var nativeRequestAnimationFrame=global.requestAnimationFrame||global.webkitRequestAnimationFrame||global.mozRequestAnimationFrame||global.oRequestAnimationFrame||global.msRequestAnimationFrame;

module.exports=nativeRequestAnimationFrame;
});
__d(251 /* ViewPagerAndroid */, function(global, require, module, exports) {'use strict';











module.exports=require(147 /* UnimplementedView */);
});
__d(252 /* WebView */, function(global, require, module, exports) {'use strict';












var ActivityIndicatorIOS=require(1 /* ActivityIndicatorIOS */);
var EdgeInsetsPropType=require(128 /* EdgeInsetsPropType */);
var React=require(47 /* React */);
var StyleSheet=require(148 /* StyleSheet */);
var Text=require(225 /* Text */);
var UIManager=require(10 /* UIManager */);
var View=require(127 /* View */);
var ScrollView=require(181 /* ScrollView */);

var deprecatedPropType=require(137 /* deprecatedPropType */);
var invariant=require(363 /* fbjs/lib/invariant */);
var keyMirror=require(362 /* fbjs/lib/keyMirror */);
var processDecelerationRate=require(186 /* processDecelerationRate */);
var requireNativeComponent=require(146 /* requireNativeComponent */);
var resolveAssetSource=require(161 /* resolveAssetSource */);

var PropTypes=React.PropTypes;
var RCTWebViewManager=require(11 /* NativeModules */).WebViewManager;

var BGWASH='rgba(255,255,255,0.8)';
var RCT_WEBVIEW_REF='webview';

var WebViewState=keyMirror({
IDLE:null,
LOADING:null,
ERROR:null});


var NavigationType=keyMirror({
click:true,
formsubmit:true,
backforward:true,
reload:true,
formresubmit:true,
other:true});


var JSNavigationScheme='react-js-navigation';









var defaultRenderLoading=function(){return (
React.createElement(View,{style:styles.loadingView},
React.createElement(ActivityIndicatorIOS,null)));};


var defaultRenderError=function(errorDomain,errorCode,errorDesc){return (
React.createElement(View,{style:styles.errorContainer},
React.createElement(Text,{style:styles.errorTextTitle},'Error loading page'),


React.createElement(Text,{style:styles.errorText},
'Domain: '+errorDomain),

React.createElement(Text,{style:styles.errorText},
'Error Code: '+errorCode),

React.createElement(Text,{style:styles.errorText},
'Description: '+errorDesc)));};







var WebView=React.createClass({displayName:'WebView',
statics:{
JSNavigationScheme:JSNavigationScheme,
NavigationType:NavigationType},


propTypes:babelHelpers.extends({},
View.propTypes,{

html:deprecatedPropType(
PropTypes.string,
'Use the `source` prop instead.'),


url:deprecatedPropType(
PropTypes.string,
'Use the `source` prop instead.'),





source:PropTypes.oneOfType([
PropTypes.shape({



uri:PropTypes.string,




method:PropTypes.string,




headers:PropTypes.object,






body:PropTypes.string}),

PropTypes.shape({



html:PropTypes.string,



baseUrl:PropTypes.string}),




PropTypes.number]),





renderError:PropTypes.func,



renderLoading:PropTypes.func,



onLoad:PropTypes.func,



onLoadEnd:PropTypes.func,



onLoadStart:PropTypes.func,



onError:PropTypes.func,



bounces:PropTypes.bool,










decelerationRate:ScrollView.propTypes.decelerationRate,



scrollEnabled:PropTypes.bool,
automaticallyAdjustContentInsets:PropTypes.bool,
contentInset:EdgeInsetsPropType,
onNavigationStateChange:PropTypes.func,
startInLoadingState:PropTypes.bool,
style:View.propTypes.style,





javaScriptEnabled:PropTypes.bool,





domStorageEnabled:PropTypes.bool,




injectedJavaScript:PropTypes.string,




scalesPageToFit:PropTypes.bool,






onShouldStartLoadWithRequest:PropTypes.func,










allowsInlineMediaPlayback:PropTypes.bool,





mediaPlaybackRequiresUserAction:PropTypes.bool}),


getInitialState:function(){
return {
viewState:WebViewState.IDLE,
lastErrorEvent:null,
startInLoadingState:true};},



componentWillMount:function(){
if(this.props.startInLoadingState){
this.setState({viewState:WebViewState.LOADING});}},



render:function(){var _this=this;
var otherView=null;

if(this.state.viewState===WebViewState.LOADING){
otherView=(this.props.renderLoading||defaultRenderLoading)();}else 
if(this.state.viewState===WebViewState.ERROR){
var errorEvent=this.state.lastErrorEvent;
invariant(
errorEvent!=null,
'lastErrorEvent expected to be non-null');

otherView=(this.props.renderError||defaultRenderError)(
errorEvent.domain,
errorEvent.code,
errorEvent.description);}else 

if(this.state.viewState!==WebViewState.IDLE){
console.error(
'RCTWebView invalid state encountered: '+this.state.loading);}



var webViewStyles=[styles.container,styles.webView,this.props.style];
if(this.state.viewState===WebViewState.LOADING||
this.state.viewState===WebViewState.ERROR){

webViewStyles.push(styles.hidden);}


var onShouldStartLoadWithRequest=this.props.onShouldStartLoadWithRequest&&function(event){
var shouldStart=_this.props.onShouldStartLoadWithRequest&&
_this.props.onShouldStartLoadWithRequest(event.nativeEvent);
RCTWebViewManager.startLoadWithResult(!!shouldStart,event.nativeEvent.lockIdentifier);};


var decelerationRate=processDecelerationRate(this.props.decelerationRate);

var source=this.props.source||{};
if(this.props.html){
source.html=this.props.html;}else 
if(this.props.url){
source.uri=this.props.url;}


var webView=
React.createElement(RCTWebView,{
ref:RCT_WEBVIEW_REF,
key:'webViewKey',
style:webViewStyles,
source:resolveAssetSource(source),
injectedJavaScript:this.props.injectedJavaScript,
bounces:this.props.bounces,
scrollEnabled:this.props.scrollEnabled,
decelerationRate:decelerationRate,
contentInset:this.props.contentInset,
automaticallyAdjustContentInsets:this.props.automaticallyAdjustContentInsets,
onLoadingStart:this.onLoadingStart,
onLoadingFinish:this.onLoadingFinish,
onLoadingError:this.onLoadingError,
onShouldStartLoadWithRequest:onShouldStartLoadWithRequest,
scalesPageToFit:this.props.scalesPageToFit,
allowsInlineMediaPlayback:this.props.allowsInlineMediaPlayback,
mediaPlaybackRequiresUserAction:this.props.mediaPlaybackRequiresUserAction});


return (
React.createElement(View,{style:styles.container},
webView,
otherView));},




goForward:function(){
UIManager.dispatchViewManagerCommand(
this.getWebViewHandle(),
UIManager.RCTWebView.Commands.goForward,
null);},



goBack:function(){
UIManager.dispatchViewManagerCommand(
this.getWebViewHandle(),
UIManager.RCTWebView.Commands.goBack,
null);},



reload:function(){
UIManager.dispatchViewManagerCommand(
this.getWebViewHandle(),
UIManager.RCTWebView.Commands.reload,
null);},







updateNavigationState:function(event){
if(this.props.onNavigationStateChange){
this.props.onNavigationStateChange(event.nativeEvent);}},



getWebViewHandle:function(){
return React.findNodeHandle(this.refs[RCT_WEBVIEW_REF]);},


onLoadingStart:function(event){
var onLoadStart=this.props.onLoadStart;
onLoadStart&&onLoadStart(event);
this.updateNavigationState(event);},


onLoadingError:function(event){
event.persist();var _props=
this.props;var onError=_props.onError;var onLoadEnd=_props.onLoadEnd;
onError&&onError(event);
onLoadEnd&&onLoadEnd(event);
console.warn('Encountered an error loading page',event.nativeEvent);

this.setState({
lastErrorEvent:event.nativeEvent,
viewState:WebViewState.ERROR});},



onLoadingFinish:function(event){var _props2=
this.props;var onLoad=_props2.onLoad;var onLoadEnd=_props2.onLoadEnd;
onLoad&&onLoad(event);
onLoadEnd&&onLoadEnd(event);
this.setState({
viewState:WebViewState.IDLE});

this.updateNavigationState(event);}});



var RCTWebView=requireNativeComponent('RCTWebView',WebView,{
nativeOnly:{
onLoadingStart:true,
onLoadingError:true,
onLoadingFinish:true}});



var styles=StyleSheet.create({
container:{
flex:1},

errorContainer:{
flex:1,
justifyContent:'center',
alignItems:'center',
backgroundColor:BGWASH},

errorText:{
fontSize:14,
textAlign:'center',
marginBottom:2},

errorTextTitle:{
fontSize:15,
fontWeight:'500',
marginBottom:10},

hidden:{
height:0,
flex:0},

loadingView:{
backgroundColor:BGWASH,
flex:1,
justifyContent:'center',
alignItems:'center',
height:100},

webView:{
backgroundColor:'#ffffff'}});



module.exports=WebView;
});
__d(253 /* ActionSheetIOS */, function(global, require, module, exports) {'use strict';












var RCTActionSheetManager=require(11 /* NativeModules */).ActionSheetManager;

var invariant=require(363 /* fbjs/lib/invariant */);
var processColor=require(30 /* processColor */);

var ActionSheetIOS={
showActionSheetWithOptions:function(options,callback){
invariant(
typeof options==='object'&&options!==null,
'Options must a valid object');

invariant(
typeof callback==='function',
'Must provide a valid callback');

RCTActionSheetManager.showActionSheetWithOptions(babelHelpers.extends({},
options,{tintColor:processColor(options.tintColor)}),
callback);},














showShareActionSheetWithOptions:function(
options,
failureCallback,
successCallback)
{
invariant(
typeof options==='object'&&options!==null,
'Options must a valid object');

invariant(
typeof failureCallback==='function',
'Must provide a valid failureCallback');

invariant(
typeof successCallback==='function',
'Must provide a valid successCallback');

RCTActionSheetManager.showShareActionSheetWithOptions(babelHelpers.extends({},
options,{tintColor:processColor(options.tintColor)}),
failureCallback,
successCallback);}};




module.exports=ActionSheetIOS;
});
__d(254 /* AdSupportIOS */, function(global, require, module, exports) {'use strict';












var AdSupport=require(11 /* NativeModules */).AdSupport;

module.exports={
getAdvertisingId:function(onSuccess,onFailure){
AdSupport.getAdvertisingId(onSuccess,onFailure);},


getAdvertisingTrackingEnabled:function(onSuccess,onFailure){
AdSupport.getAdvertisingTrackingEnabled(onSuccess,onFailure);}};
});
__d(255 /* AppRegistry */, function(global, require, module, exports) {'use strict';












var BatchedBridge=require(12 /* BatchedBridge */);
var ReactNative=require(48 /* ReactNative */);

var invariant=require(363 /* fbjs/lib/invariant */);
var renderApplication=require(256 /* renderApplication */);

if(__DEV__){


require(269 /* RCTRenderingPerf */);}


var runnables={};
























var AppRegistry={
registerConfig:function(config){
for(var i=0;i<config.length;++i){
var appConfig=config[i];
if(appConfig.run){
AppRegistry.registerRunnable(appConfig.appKey,appConfig.run);}else 
{
invariant(appConfig.component,'No component provider passed in');
AppRegistry.registerComponent(appConfig.appKey,appConfig.component);}}},




registerComponent:function(appKey,getComponentFunc){
runnables[appKey]={
run:function(appParameters){return (
renderApplication(getComponentFunc(),appParameters.initialProps,appParameters.rootTag));}};

return appKey;},


registerRunnable:function(appKey,func){
runnables[appKey]={run:func};
return appKey;},


getAppKeys:function(){
return Object.keys(runnables);},


runApplication:function(appKey,appParameters){
console.log(
'Running application "'+appKey+'" with appParams: '+
JSON.stringify(appParameters)+'. '+
'__DEV__ === '+String(__DEV__)+
', development-level warning are '+(__DEV__?'ON':'OFF')+
', performance optimizations are '+(__DEV__?'OFF':'ON'));

invariant(
runnables[appKey]&&runnables[appKey].run,
'Application '+appKey+' has not been registered. This '+
'is either due to a require() error during initialization '+
'or failure to call AppRegistry.registerComponent.');

runnables[appKey].run(appParameters);},


unmountApplicationComponentAtRootTag:function(rootTag){
ReactNative.unmountComponentAtNodeAndRemoveContainer(rootTag);}};




BatchedBridge.registerCallableModule(
'AppRegistry',
AppRegistry);


module.exports=AppRegistry;
});
__d(256 /* renderApplication */, function(global, require, module, exports) {'use strict';













var RCTDeviceEventEmitter=require(22 /* RCTDeviceEventEmitter */);
var React=require(47 /* React */);
var StyleSheet=require(148 /* StyleSheet */);
var Subscribable=require(184 /* Subscribable */);
var View=require(127 /* View */);

var invariant=require(363 /* fbjs/lib/invariant */);

var Inspector=__DEV__?require(257 /* Inspector */):null;
var YellowBox=__DEV__?require(268 /* YellowBox */):null;

var AppContainer=React.createClass({displayName:'AppContainer',
mixins:[Subscribable.Mixin],

getInitialState:function(){
return {inspector:null};},


toggleElementInspector:function(){
var inspector=!__DEV__||this.state.inspector?
null:
React.createElement(Inspector,{
rootTag:this.props.rootTag,
inspectedViewTag:React.findNodeHandle(this.refs.main)});

this.setState({inspector:inspector});},


componentDidMount:function(){
this.addListenerOn(
RCTDeviceEventEmitter,
'toggleElementInspector',
this.toggleElementInspector);},



render:function(){
var yellowBox=null;
if(__DEV__){
yellowBox=React.createElement(YellowBox,null);}

return (
React.createElement(View,{style:styles.appContainer},
React.createElement(View,{collapsible:false,style:styles.appContainer,ref:'main'},
this.props.children),

yellowBox,
this.state.inspector));}});





function renderApplication(
RootComponent,
initialProps,
rootTag)
{
invariant(
rootTag,
'Expect to have a valid rootTag, instead got ',rootTag);


React.render(
React.createElement(AppContainer,{rootTag:rootTag},
React.createElement(RootComponent,babelHelpers.extends({},
initialProps,{
rootTag:rootTag}))),


rootTag);}




var styles=StyleSheet.create({
appContainer:{
flex:1}});



module.exports=renderApplication;
});
__d(257 /* Inspector */, function(global, require, module, exports) {'use strict';












var Dimensions=require(150 /* Dimensions */);
var InspectorOverlay=require(258 /* InspectorOverlay */);
var InspectorPanel=require(262 /* InspectorPanel */);
var InspectorUtils=require(89 /* InspectorUtils */);
var React=require(47 /* React */);
var StyleSheet=require(148 /* StyleSheet */);
var UIManager=require(11 /* NativeModules */).UIManager;
var View=require(127 /* View */);

if(window.__REACT_DEVTOOLS_GLOBAL_HOOK__){

window.__REACT_DEVTOOLS_GLOBAL_HOOK__.resolveRNStyle=require(7 /* flattenStyle */);}var 


Inspector=function(_React$Component){babelHelpers.inherits(Inspector,_React$Component);


function Inspector(props){babelHelpers.classCallCheck(this,Inspector);var _this=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(Inspector).call(this,
props));

_this.state={
devtoolsAgent:null,
panelPos:'bottom',
inspecting:true,
perfing:false,
inspected:null};return _this;}babelHelpers.createClass(Inspector,[{key:'componentDidMount',value:function componentDidMount()



{
if(window.__REACT_DEVTOOLS_GLOBAL_HOOK__){
this.attachToDevtools=this.attachToDevtools.bind(this);
window.__REACT_DEVTOOLS_GLOBAL_HOOK__.on('react-devtools',this.attachToDevtools);

if(window.__REACT_DEVTOOLS_GLOBAL_HOOK__.reactDevtoolsAgent){
this.attachToDevtools(window.__REACT_DEVTOOLS_GLOBAL_HOOK__.reactDevtoolsAgent);}}}},{key:'componentWillUnmount',value:function componentWillUnmount()




{
if(this._subs){
this._subs.map(function(fn){return fn();});}

if(window.__REACT_DEVTOOLS_GLOBAL_HOOK__){
window.__REACT_DEVTOOLS_GLOBAL_HOOK__.off('react-devtools',this.attachToDevtools);}}},{key:'attachToDevtools',value:function attachToDevtools(



agent){var _this2=this;
var _hideWait=null;
var hlSub=agent.sub('highlight',function(_ref){var node=_ref.node;var name=_ref.name;var props=_ref.props;
clearTimeout(_hideWait);
UIManager.measure(node,function(x,y,width,height,left,top){
_this2.setState({
hierarchy:[],
inspected:{
frame:{left:left,top:top,width:width,height:height},
style:props?props.style:{}}});});});




var hideSub=agent.sub('hideHighlight',function(){
if(_this2.state.inspected===null){
return;}


_hideWait=setTimeout(function(){
_this2.setState({
inspected:null});},

100);});

this._subs=[hlSub,hideSub];

agent.on('shutdown',function(){
_this2.setState({devtoolsAgent:null});
_this2._subs=null;});

this.setState({
devtoolsAgent:agent});}},{key:'setSelection',value:function setSelection(



i){var _this3=this;
var instance=this.state.hierarchy[i];


var publicInstance=instance._instance||{};
UIManager.measure(React.findNodeHandle(instance),function(x,y,width,height,left,top){
_this3.setState({
inspected:{
frame:{left:left,top:top,width:width,height:height},
style:publicInstance.props?publicInstance.props.style:{}},

selection:i});});}},{key:'onTouchInstance',value:function onTouchInstance(




instance,frame,pointerY){
if(this.state.devtoolsAgent){
this.state.devtoolsAgent.selectFromReactInstance(instance,true);}

var hierarchy=InspectorUtils.getOwnerHierarchy(instance);


var publicInstance=instance._instance||{};
var props=publicInstance.props||{};
this.setState({
panelPos:pointerY>Dimensions.get('window').height/2?'top':'bottom',
selection:hierarchy.length-1,
hierarchy:hierarchy,
inspected:{
style:props.style||{},
frame:frame}});}},{key:'setPerfing',value:function setPerfing(




val){
this.setState({
perfing:val,
inspecting:false,
inspected:null});}},{key:'setInspecting',value:function setInspecting(



val){
this.setState({
inspecting:val,
inspected:null});}},{key:'render',value:function render()



{
var panelContainerStyle=this.state.panelPos==='bottom'?{bottom:0}:{top:0};
return (
React.createElement(View,{style:styles.container,pointerEvents:'box-none'},
this.state.inspecting&&
React.createElement(InspectorOverlay,{
rootTag:this.props.rootTag,
inspected:this.state.inspected,
inspectedViewTag:this.props.inspectedViewTag,
onTouchInstance:this.onTouchInstance.bind(this)}),

React.createElement(View,{style:[styles.panelContainer,panelContainerStyle]},
React.createElement(InspectorPanel,{
devtoolsIsOpen:!!this.state.devtoolsAgent,
inspecting:this.state.inspecting,
perfing:this.state.perfing,
setPerfing:this.setPerfing.bind(this),
setInspecting:this.setInspecting.bind(this),
inspected:this.state.inspected,
hierarchy:this.state.hierarchy,
selection:this.state.selection,
setSelection:this.setSelection.bind(this)}))));}}]);return Inspector;}(React.Component);







var styles=StyleSheet.create({
container:{
position:'absolute',
backgroundColor:'transparent',
top:0,
left:0,
right:0,
bottom:0},

panelContainer:{
position:'absolute',
left:0,
right:0}});



module.exports=Inspector;
});
__d(258 /* InspectorOverlay */, function(global, require, module, exports) {'use strict';












var Dimensions=require(150 /* Dimensions */);
var InspectorUtils=require(89 /* InspectorUtils */);
var React=require(47 /* React */);
var StyleSheet=require(148 /* StyleSheet */);
var UIManager=require(11 /* NativeModules */).UIManager;
var View=require(127 /* View */);
var ElementBox=require(259 /* ElementBox */);

var PropTypes=React.PropTypes;





var InspectorOverlay=React.createClass({displayName:'InspectorOverlay',
propTypes:{
inspected:PropTypes.shape({
frame:PropTypes.object,
style:PropTypes.any}),

inspectedViewTag:PropTypes.number,
onTouchInstance:PropTypes.func.isRequired},


findViewForTouchEvent:function(e){var _this=this;var _e$nativeEvent$touche=
e.nativeEvent.touches[0];var locationX=_e$nativeEvent$touche.locationX;var locationY=_e$nativeEvent$touche.locationY;
UIManager.findSubviewIn(
this.props.inspectedViewTag,
[locationX,locationY],
function(nativeViewTag,left,top,width,height){
var instance=InspectorUtils.findInstanceByNativeTag(_this.props.rootTag,nativeViewTag);
if(!instance){
return;}

_this.props.onTouchInstance(instance,{left:left,top:top,width:width,height:height},locationY);});},




shouldSetResponser:function(e){
this.findViewForTouchEvent(e);
return true;},


render:function(){
var content=null;
if(this.props.inspected){
content=React.createElement(ElementBox,{frame:this.props.inspected.frame,style:this.props.inspected.style});}


return (
React.createElement(View,{
onStartShouldSetResponder:this.shouldSetResponser,
onResponderMove:this.findViewForTouchEvent,
style:[styles.inspector,{height:Dimensions.get('window').height}]},
content));}});





var styles=StyleSheet.create({
inspector:{
backgroundColor:'transparent',
position:'absolute',
left:0,
top:0,
right:0}});



module.exports=InspectorOverlay;
});
__d(259 /* ElementBox */, function(global, require, module, exports) {'use strict';












var React=require(47 /* React */);
var View=require(127 /* View */);
var StyleSheet=require(148 /* StyleSheet */);
var BorderBox=require(260 /* BorderBox */);
var resolveBoxStyle=require(261 /* resolveBoxStyle */);

var flattenStyle=require(7 /* flattenStyle */);var 

ElementBox=function(_React$Component){babelHelpers.inherits(ElementBox,_React$Component);function ElementBox(){babelHelpers.classCallCheck(this,ElementBox);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(ElementBox).apply(this,arguments));}babelHelpers.createClass(ElementBox,[{key:'render',value:function render()
{
var style=flattenStyle(this.props.style)||{};
var margin=resolveBoxStyle('margin',style);
var padding=resolveBoxStyle('padding',style);
var frameStyle=this.props.frame;
if(margin){
frameStyle={
top:frameStyle.top-margin.top,
left:frameStyle.left-margin.left,
height:frameStyle.height+margin.top+margin.bottom,



if(padding){
