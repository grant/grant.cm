!function e(t,n,r){function o(s,a){if(!n[s]){if(!t[s]){var u="function"==typeof require&&require;if(!a&&u)return u(s,!0);if(i)return i(s,!0);throw new Error("Cannot find module '"+s+"'")}var f=n[s]={exports:{}};t[s][0].call(f.exports,function(e){var n=t[s][1][e];return o(n?n:e)},f,f.exports,e,t,n,r)}return n[s].exports}for(var i="function"==typeof require&&require,s=0;s<r.length;s++)o(r[s]);return o}({1:[function(e){(function(){(function(){$(function(){var e,t,n,r,o,i,s,a,u,f;return e=$(".cardLayout"),$("a").smoothScroll(),f=window.location.pathname.split("/")[1],$.smoothScroll({scrollTarget:"#"+f}),i=void 0,s=void 0,t=$("section"),a={},(r=function(){var e,n,r,o,i;for(i=[],n=r=0,o=t.length;o>r;n=++r)e=t[n],i.push(a[e.id]=$(e).offset().top);return i})(),n=function(e){var t,n,r,a,f,l,d,c,h;return r=$(window).scrollTop()+$(window).height()/4,h=$(window).scrollTop()+.75*$(window).height(),a=o(r),f=o(h),t=a!==i,n=f!==s,t&&(d="",a&&(d+=u(a+" — ")),d+="Grant Timmerman",c=a||"/",History.pushState(null,d,c)),(t||n||e)&&(l=["section#"+f,"section#"+a].join(", "),$(l).addClass("show")),i=a,s=f},o=function(e){var t,n;return function(){var e;e=[];for(t in a)n=a[t],e.push(t);return e}().reduce(function(t,n){var r,o;return a[n]<e&&!(a[n]<(r=a[t])&&e>r)?n:a[t]<e&&!(a[t]<(o=a[n])&&e>o)?t:void 0})},u=function(e){return e.substr(0,1).toUpperCase()+e.substr(1)},$(window).scroll(function(){return n()}),$(window).resize(function(){return r()}),n(!0)})}).call(this)}).call(this,e("/Users/granttimmerman/Documents/Websites/grant/grant.cm/github/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/fake_3106faf4.js","/")},{"/Users/granttimmerman/Documents/Websites/grant/grant.cm/github/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":5,buffer:2}],2:[function(e,t,n){(function(t,r,o){function o(e,t,n){if(!(this instanceof o))return new o(e,t,n);var r=typeof e;if("base64"===t&&"string"===r)for(e=C(e);e.length%4!==0;)e+="=";var i;if("number"===r)i=j(e);else if("string"===r)i=o.byteLength(e,t);else{if("object"!==r)throw new Error("First argument needs to be a number, array or string.");i=j(e.length)}var s;o._useTypedArrays?s=T(new Uint8Array(i)):(s=this,s.length=i,s._isBuffer=!0);var a;if(o._useTypedArrays&&"function"==typeof Uint8Array&&e instanceof Uint8Array)s._set(e);else if(D(e))for(a=0;i>a;a++)s[a]=o.isBuffer(e)?e.readUInt8(a):e[a];else if("string"===r)s.write(e,0,t);else if("number"===r&&!o._useTypedArrays&&!n)for(a=0;i>a;a++)s[a]=0;return s}function i(e,t,n,r){n=Number(n)||0;var i=e.length-n;r?(r=Number(r),r>i&&(r=i)):r=i;var s=t.length;R(s%2===0,"Invalid hex string"),r>s/2&&(r=s/2);for(var a=0;r>a;a++){var u=parseInt(t.substr(2*a,2),16);R(!isNaN(u),"Invalid hex string"),e[n+a]=u}return o._charsWritten=2*a,a}function s(e,t,n,r){var i=o._charsWritten=q(N(t),e,n,r);return i}function a(e,t,n,r){var i=o._charsWritten=q(F(t),e,n,r);return i}function u(e,t,n,r){return a(e,t,n,r)}function f(e,t,n,r){var i=o._charsWritten=q($(t),e,n,r);return i}function l(e,t,n,r){var i=o._charsWritten=q(W(t),e,n,r);return i}function d(e,t,n){return X.fromByteArray(0===t&&n===e.length?e:e.slice(t,n))}function c(e,t,n){var r="",o="";n=Math.min(e.length,n);for(var i=t;n>i;i++)e[i]<=127?(r+=O(o)+String.fromCharCode(e[i]),o=""):o+="%"+e[i].toString(16);return r+O(o)}function h(e,t,n){var r="";n=Math.min(e.length,n);for(var o=t;n>o;o++)r+=String.fromCharCode(e[o]);return r}function g(e,t,n){return h(e,t,n)}function m(e,t,n){var r=e.length;(!t||0>t)&&(t=0),(!n||0>n||n>r)&&(n=r);for(var o="",i=t;n>i;i++)o+=x(e[i]);return o}function b(e,t,n){for(var r=e.slice(t,n),o="",i=0;i<r.length;i+=2)o+=String.fromCharCode(r[i]+256*r[i+1]);return o}function p(e,t,n,r){r||(R("boolean"==typeof n,"missing or invalid endian"),R(void 0!==t&&null!==t,"missing offset"),R(t+1<e.length,"Trying to read beyond buffer length"));var o=e.length;if(!(t>=o)){var i;return n?(i=e[t],o>t+1&&(i|=e[t+1]<<8)):(i=e[t]<<8,o>t+1&&(i|=e[t+1])),i}}function w(e,t,n,r){r||(R("boolean"==typeof n,"missing or invalid endian"),R(void 0!==t&&null!==t,"missing offset"),R(t+3<e.length,"Trying to read beyond buffer length"));var o=e.length;if(!(t>=o)){var i;return n?(o>t+2&&(i=e[t+2]<<16),o>t+1&&(i|=e[t+1]<<8),i|=e[t],o>t+3&&(i+=e[t+3]<<24>>>0)):(o>t+1&&(i=e[t+1]<<16),o>t+2&&(i|=e[t+2]<<8),o>t+3&&(i|=e[t+3]),i+=e[t]<<24>>>0),i}}function y(e,t,n,r){r||(R("boolean"==typeof n,"missing or invalid endian"),R(void 0!==t&&null!==t,"missing offset"),R(t+1<e.length,"Trying to read beyond buffer length"));var o=e.length;if(!(t>=o)){var i=p(e,t,n,!0),s=32768&i;return s?-1*(65535-i+1):i}}function v(e,t,n,r){r||(R("boolean"==typeof n,"missing or invalid endian"),R(void 0!==t&&null!==t,"missing offset"),R(t+3<e.length,"Trying to read beyond buffer length"));var o=e.length;if(!(t>=o)){var i=w(e,t,n,!0),s=2147483648&i;return s?-1*(4294967295-i+1):i}}function E(e,t,n,r){return r||(R("boolean"==typeof n,"missing or invalid endian"),R(t+3<e.length,"Trying to read beyond buffer length")),Y.read(e,t,n,23,4)}function I(e,t,n,r){return r||(R("boolean"==typeof n,"missing or invalid endian"),R(t+7<e.length,"Trying to read beyond buffer length")),Y.read(e,t,n,52,8)}function _(e,t,n,r,o){o||(R(void 0!==t&&null!==t,"missing value"),R("boolean"==typeof r,"missing or invalid endian"),R(void 0!==n&&null!==n,"missing offset"),R(n+1<e.length,"trying to write beyond buffer length"),J(t,65535));var i=e.length;if(!(n>=i))for(var s=0,a=Math.min(i-n,2);a>s;s++)e[n+s]=(t&255<<8*(r?s:1-s))>>>8*(r?s:1-s)}function B(e,t,n,r,o){o||(R(void 0!==t&&null!==t,"missing value"),R("boolean"==typeof r,"missing or invalid endian"),R(void 0!==n&&null!==n,"missing offset"),R(n+3<e.length,"trying to write beyond buffer length"),J(t,4294967295));var i=e.length;if(!(n>=i))for(var s=0,a=Math.min(i-n,4);a>s;s++)e[n+s]=t>>>8*(r?s:3-s)&255}function U(e,t,n,r,o){o||(R(void 0!==t&&null!==t,"missing value"),R("boolean"==typeof r,"missing or invalid endian"),R(void 0!==n&&null!==n,"missing offset"),R(n+1<e.length,"Trying to write beyond buffer length"),P(t,32767,-32768));var i=e.length;n>=i||(t>=0?_(e,t,n,r,o):_(e,65535+t+1,n,r,o))}function A(e,t,n,r,o){o||(R(void 0!==t&&null!==t,"missing value"),R("boolean"==typeof r,"missing or invalid endian"),R(void 0!==n&&null!==n,"missing offset"),R(n+3<e.length,"Trying to write beyond buffer length"),P(t,2147483647,-2147483648));var i=e.length;n>=i||(t>=0?B(e,t,n,r,o):B(e,4294967295+t+1,n,r,o))}function L(e,t,n,r,o){o||(R(void 0!==t&&null!==t,"missing value"),R("boolean"==typeof r,"missing or invalid endian"),R(void 0!==n&&null!==n,"missing offset"),R(n+3<e.length,"Trying to write beyond buffer length"),z(t,3.4028234663852886e38,-3.4028234663852886e38));var i=e.length;n>=i||Y.write(e,t,n,r,23,4)}function S(e,t,n,r,o){o||(R(void 0!==t&&null!==t,"missing value"),R("boolean"==typeof r,"missing or invalid endian"),R(void 0!==n&&null!==n,"missing offset"),R(n+7<e.length,"Trying to write beyond buffer length"),z(t,1.7976931348623157e308,-1.7976931348623157e308));var i=e.length;n>=i||Y.write(e,t,n,r,52,8)}function C(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")}function T(e){return e._isBuffer=!0,e._get=e.get,e._set=e.set,e.get=G.get,e.set=G.set,e.write=G.write,e.toString=G.toString,e.toLocaleString=G.toString,e.toJSON=G.toJSON,e.copy=G.copy,e.slice=G.slice,e.readUInt8=G.readUInt8,e.readUInt16LE=G.readUInt16LE,e.readUInt16BE=G.readUInt16BE,e.readUInt32LE=G.readUInt32LE,e.readUInt32BE=G.readUInt32BE,e.readInt8=G.readInt8,e.readInt16LE=G.readInt16LE,e.readInt16BE=G.readInt16BE,e.readInt32LE=G.readInt32LE,e.readInt32BE=G.readInt32BE,e.readFloatLE=G.readFloatLE,e.readFloatBE=G.readFloatBE,e.readDoubleLE=G.readDoubleLE,e.readDoubleBE=G.readDoubleBE,e.writeUInt8=G.writeUInt8,e.writeUInt16LE=G.writeUInt16LE,e.writeUInt16BE=G.writeUInt16BE,e.writeUInt32LE=G.writeUInt32LE,e.writeUInt32BE=G.writeUInt32BE,e.writeInt8=G.writeInt8,e.writeInt16LE=G.writeInt16LE,e.writeInt16BE=G.writeInt16BE,e.writeInt32LE=G.writeInt32LE,e.writeInt32BE=G.writeInt32BE,e.writeFloatLE=G.writeFloatLE,e.writeFloatBE=G.writeFloatBE,e.writeDoubleLE=G.writeDoubleLE,e.writeDoubleBE=G.writeDoubleBE,e.fill=G.fill,e.inspect=G.inspect,e.toArrayBuffer=G.toArrayBuffer,e}function k(e,t,n){return"number"!=typeof e?n:(e=~~e,e>=t?t:e>=0?e:(e+=t,e>=0?e:0))}function j(e){return e=~~Math.ceil(+e),0>e?0:e}function M(e){return(Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)})(e)}function D(e){return M(e)||o.isBuffer(e)||e&&"object"==typeof e&&"number"==typeof e.length}function x(e){return 16>e?"0"+e.toString(16):e.toString(16)}function N(e){for(var t=[],n=0;n<e.length;n++){var r=e.charCodeAt(n);if(127>=r)t.push(e.charCodeAt(n));else{var o=n;r>=55296&&57343>=r&&n++;for(var i=encodeURIComponent(e.slice(o,n+1)).substr(1).split("%"),s=0;s<i.length;s++)t.push(parseInt(i[s],16))}}return t}function F(e){for(var t=[],n=0;n<e.length;n++)t.push(255&e.charCodeAt(n));return t}function W(e){for(var t,n,r,o=[],i=0;i<e.length;i++)t=e.charCodeAt(i),n=t>>8,r=t%256,o.push(r),o.push(n);return o}function $(e){return X.toByteArray(e)}function q(e,t,n,r){for(var o=0;r>o&&!(o+n>=t.length||o>=e.length);o++)t[o+n]=e[o];return o}function O(e){try{return decodeURIComponent(e)}catch(t){return String.fromCharCode(65533)}}function J(e,t){R("number"==typeof e,"cannot write a non-number as a number"),R(e>=0,"specified a negative value for writing an unsigned value"),R(t>=e,"value is larger than maximum value for type"),R(Math.floor(e)===e,"value has a fractional component")}function P(e,t,n){R("number"==typeof e,"cannot write a non-number as a number"),R(t>=e,"value larger than maximum allowed value"),R(e>=n,"value smaller than minimum allowed value"),R(Math.floor(e)===e,"value has a fractional component")}function z(e,t,n){R("number"==typeof e,"cannot write a non-number as a number"),R(t>=e,"value larger than maximum allowed value"),R(e>=n,"value smaller than minimum allowed value")}function R(e,t){if(!e)throw new Error(t||"Failed assertion")}var X=e("base64-js"),Y=e("ieee754");n.Buffer=o,n.SlowBuffer=o,n.INSPECT_MAX_BYTES=50,o.poolSize=8192,o._useTypedArrays=function(){if("undefined"==typeof Uint8Array||"undefined"==typeof ArrayBuffer)return!1;try{var e=new Uint8Array(0);return e.foo=function(){return 42},42===e.foo()&&"function"==typeof e.subarray}catch(t){return!1}}(),o.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"raw":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},o.isBuffer=function(e){return!(null===e||void 0===e||!e._isBuffer)},o.byteLength=function(e,t){var n;switch(e+="",t||"utf8"){case"hex":n=e.length/2;break;case"utf8":case"utf-8":n=N(e).length;break;case"ascii":case"binary":case"raw":n=e.length;break;case"base64":n=$(e).length;break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":n=2*e.length;break;default:throw new Error("Unknown encoding")}return n},o.concat=function(e,t){if(R(M(e),"Usage: Buffer.concat(list, [totalLength])\nlist should be an Array."),0===e.length)return new o(0);if(1===e.length)return e[0];var n;if("number"!=typeof t)for(t=0,n=0;n<e.length;n++)t+=e[n].length;var r=new o(t),i=0;for(n=0;n<e.length;n++){var s=e[n];s.copy(r,i),i+=s.length}return r},o.prototype.write=function(e,t,n,r){if(isFinite(t))isFinite(n)||(r=n,n=void 0);else{var o=r;r=t,t=n,n=o}t=Number(t)||0;var d=this.length-t;n?(n=Number(n),n>d&&(n=d)):n=d,r=String(r||"utf8").toLowerCase();var c;switch(r){case"hex":c=i(this,e,t,n);break;case"utf8":case"utf-8":c=s(this,e,t,n);break;case"ascii":c=a(this,e,t,n);break;case"binary":c=u(this,e,t,n);break;case"base64":c=f(this,e,t,n);break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":c=l(this,e,t,n);break;default:throw new Error("Unknown encoding")}return c},o.prototype.toString=function(e,t,n){var r=this;if(e=String(e||"utf8").toLowerCase(),t=Number(t)||0,n=void 0!==n?Number(n):n=r.length,n===t)return"";var o;switch(e){case"hex":o=m(r,t,n);break;case"utf8":case"utf-8":o=c(r,t,n);break;case"ascii":o=h(r,t,n);break;case"binary":o=g(r,t,n);break;case"base64":o=d(r,t,n);break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":o=b(r,t,n);break;default:throw new Error("Unknown encoding")}return o},o.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}},o.prototype.copy=function(e,t,n,r){var o=this;if(n||(n=0),r||0===r||(r=this.length),t||(t=0),r!==n&&0!==e.length&&0!==o.length){R(r>=n,"sourceEnd < sourceStart"),R(t>=0&&t<e.length,"targetStart out of bounds"),R(n>=0&&n<o.length,"sourceStart out of bounds"),R(r>=0&&r<=o.length,"sourceEnd out of bounds"),r>this.length&&(r=this.length),e.length-t<r-n&&(r=e.length-t+n);for(var i=0;r-n>i;i++)e[i+t]=this[i+n]}},o.prototype.slice=function(e,t){var n=this.length;if(e=k(e,n,0),t=k(t,n,n),o._useTypedArrays)return T(this.subarray(e,t));for(var r=t-e,i=new o(r,void 0,!0),s=0;r>s;s++)i[s]=this[s+e];return i},o.prototype.get=function(e){return console.log(".get() is deprecated. Access using array indexes instead."),this.readUInt8(e)},o.prototype.set=function(e,t){return console.log(".set() is deprecated. Access using array indexes instead."),this.writeUInt8(e,t)},o.prototype.readUInt8=function(e,t){return t||(R(void 0!==e&&null!==e,"missing offset"),R(e<this.length,"Trying to read beyond buffer length")),e>=this.length?void 0:this[e]},o.prototype.readUInt16LE=function(e,t){return p(this,e,!0,t)},o.prototype.readUInt16BE=function(e,t){return p(this,e,!1,t)},o.prototype.readUInt32LE=function(e,t){return w(this,e,!0,t)},o.prototype.readUInt32BE=function(e,t){return w(this,e,!1,t)},o.prototype.readInt8=function(e,t){if(t||(R(void 0!==e&&null!==e,"missing offset"),R(e<this.length,"Trying to read beyond buffer length")),!(e>=this.length)){var n=128&this[e];return n?-1*(255-this[e]+1):this[e]}},o.prototype.readInt16LE=function(e,t){return y(this,e,!0,t)},o.prototype.readInt16BE=function(e,t){return y(this,e,!1,t)},o.prototype.readInt32LE=function(e,t){return v(this,e,!0,t)},o.prototype.readInt32BE=function(e,t){return v(this,e,!1,t)},o.prototype.readFloatLE=function(e,t){return E(this,e,!0,t)},o.prototype.readFloatBE=function(e,t){return E(this,e,!1,t)},o.prototype.readDoubleLE=function(e,t){return I(this,e,!0,t)},o.prototype.readDoubleBE=function(e,t){return I(this,e,!1,t)},o.prototype.writeUInt8=function(e,t,n){n||(R(void 0!==e&&null!==e,"missing value"),R(void 0!==t&&null!==t,"missing offset"),R(t<this.length,"trying to write beyond buffer length"),J(e,255)),t>=this.length||(this[t]=e)},o.prototype.writeUInt16LE=function(e,t,n){_(this,e,t,!0,n)},o.prototype.writeUInt16BE=function(e,t,n){_(this,e,t,!1,n)},o.prototype.writeUInt32LE=function(e,t,n){B(this,e,t,!0,n)},o.prototype.writeUInt32BE=function(e,t,n){B(this,e,t,!1,n)},o.prototype.writeInt8=function(e,t,n){n||(R(void 0!==e&&null!==e,"missing value"),R(void 0!==t&&null!==t,"missing offset"),R(t<this.length,"Trying to write beyond buffer length"),P(e,127,-128)),t>=this.length||(e>=0?this.writeUInt8(e,t,n):this.writeUInt8(255+e+1,t,n))},o.prototype.writeInt16LE=function(e,t,n){U(this,e,t,!0,n)},o.prototype.writeInt16BE=function(e,t,n){U(this,e,t,!1,n)},o.prototype.writeInt32LE=function(e,t,n){A(this,e,t,!0,n)},o.prototype.writeInt32BE=function(e,t,n){A(this,e,t,!1,n)},o.prototype.writeFloatLE=function(e,t,n){L(this,e,t,!0,n)},o.prototype.writeFloatBE=function(e,t,n){L(this,e,t,!1,n)},o.prototype.writeDoubleLE=function(e,t,n){S(this,e,t,!0,n)},o.prototype.writeDoubleBE=function(e,t,n){S(this,e,t,!1,n)},o.prototype.fill=function(e,t,n){if(e||(e=0),t||(t=0),n||(n=this.length),"string"==typeof e&&(e=e.charCodeAt(0)),R("number"==typeof e&&!isNaN(e),"value is not a number"),R(n>=t,"end < start"),n!==t&&0!==this.length){R(t>=0&&t<this.length,"start out of bounds"),R(n>=0&&n<=this.length,"end out of bounds");for(var r=t;n>r;r++)this[r]=e}},o.prototype.inspect=function(){for(var e=[],t=this.length,r=0;t>r;r++)if(e[r]=x(this[r]),r===n.INSPECT_MAX_BYTES){e[r+1]="...";break}return"<Buffer "+e.join(" ")+">"},o.prototype.toArrayBuffer=function(){if("function"==typeof Uint8Array){if(o._useTypedArrays)return new o(this).buffer;for(var e=new Uint8Array(this.length),t=0,n=e.length;n>t;t+=1)e[t]=this[t];return e.buffer}throw new Error("Buffer.toArrayBuffer not supported in this browser")};var G=o.prototype}).call(this,e("/Users/granttimmerman/Documents/Websites/grant/grant.cm/github/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/browserify/node_modules/buffer/index.js","/../../node_modules/browserify/node_modules/buffer")},{"/Users/granttimmerman/Documents/Websites/grant/grant.cm/github/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":5,"base64-js":3,buffer:2,ieee754:4}],3:[function(e,t){(function(){var e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";!function(){"use strict";function n(e){var t=e.charCodeAt(0);return t===s?62:t===a?63:u>t?-1:u+10>t?t-u+26+26:l+26>t?t-l:f+26>t?t-f+26:void 0}function r(e){function t(e){f[d++]=e}var r,o,s,a,u,f;if(e.length%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var l=e.length;u="="===e.charAt(l-2)?2:"="===e.charAt(l-1)?1:0,f=new i(3*e.length/4-u),s=u>0?e.length-4:e.length;var d=0;for(r=0,o=0;s>r;r+=4,o+=3)a=n(e.charAt(r))<<18|n(e.charAt(r+1))<<12|n(e.charAt(r+2))<<6|n(e.charAt(r+3)),t((16711680&a)>>16),t((65280&a)>>8),t(255&a);return 2===u?(a=n(e.charAt(r))<<2|n(e.charAt(r+1))>>4,t(255&a)):1===u&&(a=n(e.charAt(r))<<10|n(e.charAt(r+1))<<4|n(e.charAt(r+2))>>2,t(a>>8&255),t(255&a)),f}function o(t){function n(t){return e.charAt(t)}function r(e){return n(e>>18&63)+n(e>>12&63)+n(e>>6&63)+n(63&e)}var o,i,s,a=t.length%3,u="";for(o=0,s=t.length-a;s>o;o+=3)i=(t[o]<<16)+(t[o+1]<<8)+t[o+2],u+=r(i);switch(a){case 1:i=t[t.length-1],u+=n(i>>2),u+=n(i<<4&63),u+="==";break;case 2:i=(t[t.length-2]<<8)+t[t.length-1],u+=n(i>>10),u+=n(i>>4&63),u+=n(i<<2&63),u+="="}return u}var i="undefined"!=typeof Uint8Array?Uint8Array:Array,s=("0".charCodeAt(0),"+".charCodeAt(0)),a="/".charCodeAt(0),u="0".charCodeAt(0),f="a".charCodeAt(0),l="A".charCodeAt(0);t.exports.toByteArray=r,t.exports.fromByteArray=o}()}).call(this,e("/Users/granttimmerman/Documents/Websites/grant/grant.cm/github/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/browserify/node_modules/buffer/node_modules/base64-js/lib/b64.js","/../../node_modules/browserify/node_modules/buffer/node_modules/base64-js/lib")},{"/Users/granttimmerman/Documents/Websites/grant/grant.cm/github/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":5,buffer:2}],4:[function(e,t,n){(function(){n.read=function(e,t,n,r,o){var i,s,a=8*o-r-1,u=(1<<a)-1,f=u>>1,l=-7,d=n?o-1:0,c=n?-1:1,h=e[t+d];for(d+=c,i=h&(1<<-l)-1,h>>=-l,l+=a;l>0;i=256*i+e[t+d],d+=c,l-=8);for(s=i&(1<<-l)-1,i>>=-l,l+=r;l>0;s=256*s+e[t+d],d+=c,l-=8);if(0===i)i=1-f;else{if(i===u)return s?0/0:1/0*(h?-1:1);s+=Math.pow(2,r),i-=f}return(h?-1:1)*s*Math.pow(2,i-r)},n.write=function(e,t,n,r,o,i){var s,a,u,f=8*i-o-1,l=(1<<f)-1,d=l>>1,c=23===o?Math.pow(2,-24)-Math.pow(2,-77):0,h=r?0:i-1,g=r?1:-1,m=0>t||0===t&&0>1/t?1:0;for(t=Math.abs(t),isNaN(t)||1/0===t?(a=isNaN(t)?1:0,s=l):(s=Math.floor(Math.log(t)/Math.LN2),t*(u=Math.pow(2,-s))<1&&(s--,u*=2),t+=s+d>=1?c/u:c*Math.pow(2,1-d),t*u>=2&&(s++,u/=2),s+d>=l?(a=0,s=l):s+d>=1?(a=(t*u-1)*Math.pow(2,o),s+=d):(a=t*Math.pow(2,d-1)*Math.pow(2,o),s=0));o>=8;e[n+h]=255&a,h+=g,a/=256,o-=8);for(s=s<<o|a,f+=o;f>0;e[n+h]=255&s,h+=g,s/=256,f-=8);e[n+h-g]|=128*m}}).call(this,e("/Users/granttimmerman/Documents/Websites/grant/grant.cm/github/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/browserify/node_modules/buffer/node_modules/ieee754/index.js","/../../node_modules/browserify/node_modules/buffer/node_modules/ieee754")},{"/Users/granttimmerman/Documents/Websites/grant/grant.cm/github/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":5,buffer:2}],5:[function(e,t){(function(e){var e=t.exports={};e.nextTick=function(){var e="undefined"!=typeof window&&window.setImmediate,t="undefined"!=typeof window&&window.postMessage&&window.addEventListener;if(e)return function(e){return window.setImmediate(e)};if(t){var n=[];return window.addEventListener("message",function(e){var t=e.source;if((t===window||null===t)&&"process-tick"===e.data&&(e.stopPropagation(),n.length>0)){var r=n.shift();r()}},!0),function(e){n.push(e),window.postMessage("process-tick","*")}}return function(e){setTimeout(e,0)}}(),e.title="browser",e.browser=!0,e.env={},e.argv=[],e.binding=function(){throw new Error("process.binding is not supported")},e.cwd=function(){return"/"},e.chdir=function(){throw new Error("process.chdir is not supported")}}).call(this,e("/Users/granttimmerman/Documents/Websites/grant/grant.cm/github/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js","/../../node_modules/browserify/node_modules/insert-module-globals/node_modules/process")},{"/Users/granttimmerman/Documents/Websites/grant/grant.cm/github/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":5,buffer:2}]},{},[1]);