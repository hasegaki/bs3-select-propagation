!function(t){var o={};function e(n){if(o[n])return o[n].exports;var r=o[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,e),r.l=!0,r.exports}e.m=t,e.c=o,e.d=function(t,o,n){e.o(t,o)||Object.defineProperty(t,o,{enumerable:!0,get:n})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,o){if(1&o&&(t=e(t)),8&o)return t;if(4&o&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(e.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&o&&"string"!=typeof t)for(var r in t)e.d(n,r,function(o){return t[o]}.bind(null,r));return n},e.n=function(t){var o=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(o,"a",o),o},e.o=function(t,o){return Object.prototype.hasOwnProperty.call(t,o)},e.p="/",e(e.s=0)}([function(t,o,e){t.exports=e(1)},function(t,o){function e(t){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}!function(t){var o=function(o,e){this._$target=o,this._options=t.extend({selectAjax:null},e),"string"==typeof this._options.selectAjax&&(this._options.selectAjax={url:this._options.selectAjax}),this._$children=o.children("option[data-group]").clone(),this._$target.on("select.propagation",this._on_propagation)};o.prototype={_ajax:function(o){return t.ajax(t.extend({type:"get",dataType:"json",data:{q:o}},this._options.selectAjax)).done(function(t){console.log(t)}).fail(function(t){console.log(t)})},_on_propagation:function(t,o){var n=o.value,r=this._propagation_target;if(null==r._options.selectAjax||"object"!=e(r._options.selectAjax)){var a=r._$children.clone();null!=n&&null!=n&&""!=n||(n='""'),"*"!=n&&(a=a.filter("[data-group="+n+"]")),r._$target.children("[data-group]").remove(),r._$target.append(a),r._$target.selectpicker("refresh"),r._$target._propagation&&r._$target._propagation.refresh(o)}else r._ajax(n).done(function(t){var o="";t.data.forEach(function(t){var e=[t,t],n=t.match(/^([^\s]*)\s+(.*)$/);null!=n&&(e=[n[1],n[2]]),o+='<option value="'+e[0]+'">'+e[1]+"</option>"}),r._$target.html(o),r._$target.selectpicker("refresh")})}};var n=function(e,n){this._$target=e,this._$propagations=null,this._options=t.extend({selectPropagation:null},n),null!=this._options.selectPropagation&&(this._$propagations=t(this._options.selectPropagation),this._$propagations.each(function(){this._propagation_target=new o(t(this),t(this).data())})),this._$target.on("changed.bs.select",this._on_change)};n.prototype={refresh:function(t){console.log("refresh",this),this._$propagations.triggerHandler("select.propagation",{source:t?t.source:this._$target,sourceEvent:t?t.eventSource:void 0,value:this._$target.val()})},_on_change:function(o){console.log(__proto__,o),this._propagation._$propagations.triggerHandler("select.propagation",{source:t(this),sourceEvent:o,value:t(this).val()})}},jQuery.fn.propagation=function(){var o=Array.prototype.slice.call(arguments);if(0==o.length||"object"==e(o[0]))return this.each(function(e,r){r._propagation=new n(t(r),o[0]),r._propagation.refresh()}),this;var r=o.shift();if("_"!=r.charAt(0)&&"function"==typeof n.prototype[r])return this.each(function(t,e){n.prototype[r].apply(e._propagatorion,o)}),this;if("function"==typeof n.prototype["__"+r]){var a=this.map(function(t,e){return n.prototype["__"+r].apply(e._propagation,o)});return a.length>1?a:a[0]}throw new Error('PropagationPropagator: command "{cmd}" does not exist.'.replace("{cmd}",r))}}(jQuery)}]);