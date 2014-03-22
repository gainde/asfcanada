/*
		GNU General Public License version 2 or later; see LICENSE.txt
*/
Object.append(Browser.Features,{inputemail:function(){var a=document.createElement("input");a.setAttribute("type","email");return a.type!=="text"}()});
var JFormValidator=new Class({initialize:function(){this.handlers={};this.custom={};this.setHandler("username",function(a){regex=/[<|>|"|'|%|;|(|)|&]/i;return!regex.test(a)});this.setHandler("password",function(a){regex=/^\S[\S ]{2,98}\S$/;return regex.test(a)});this.setHandler("numeric",function(a){regex=/^(\d|-)?(\d|,)*\.?\d*$/;return regex.test(a)});this.setHandler("email",function(a){regex=/^[a-zA-Z0-9._-]+(\+[a-zA-Z0-9._-]+)*@([a-zA-Z0-9.-]+\.)+[a-zA-Z0-9.-]{2,4}$/;return regex.test(a)});$$("form.form-validate").each(function(a){this.attachToForm(a)},
this)},setHandler:function(a,b,c){this.handlers[a]={enabled:c==""?!0:c,exec:b}},attachToForm:function(a){a.getElements("input,textarea,select,button").each(function(a){a.hasClass("required")&&(a.set("aria-required","true"),a.set("required","required"));if((document.id(a).get("tag")=="input"||document.id(a).get("tag")=="button")&&document.id(a).get("type")=="submit"){if(a.hasClass("validate"))a.onclick=function(){return document.formvalidator.isValid(this.form)}}else if(a.addEvent("blur",function(){return document.formvalidator.validate(this)}),
a.hasClass("validate-email")&&Browser.Features.inputemail)a.type="email"})},validate:function(a){a=document.id(a);if(a.get("disabled")&&!(a.hasClass('required')))return this.handleResponse(!0,a),!0;if(a.hasClass("required"))if(a.get("tag")=="fieldset"&&(a.hasClass("radio")||a.hasClass("checkboxes")))for(var b=0;;b++)if(document.id(a.get("id")+b)){if(document.id(a.get("id")+b).checked)break}else return this.handleResponse(!1,a),!1;else if(!a.get("value"))return this.handleResponse(!1,a),!1;b=a.className&&a.className.search(/validate-([a-zA-Z0-9\_\-]+)/)!=
-1?a.className.match(/validate-([a-zA-Z0-9\_\-]+)/)[1]:"";if(b=="")return this.handleResponse(!0,a),!0;if(b&&b!="none"&&this.handlers[b]&&a.get("value")&&this.handlers[b].exec(a.get("value"))!=!0)return this.handleResponse(!1,a),!1;this.handleResponse(!0,a);return!0},isValid:function(a){for(var b=!0,a=a.getElements("fieldset").concat(Array.from(a.elements)),c=0;c<a.length;c++)this.validate(a[c])==!1&&(b=!1);(new Hash(this.custom)).each(function(a){a.exec()!=!0&&(b=!1)});return b},handleResponse:function(a,
b){b.labelref||$$("label").each(function(a){if(a.get("for")==b.get("id"))b.labelref=a});a==!1?(b.addClass("invalid"),b.set("aria-invalid","true"),b.labelref&&(document.id(b.labelref).addClass("invalid"),document.id(b.labelref).set("aria-invalid","true"))):(b.removeClass("invalid"),b.set("aria-invalid","false"),b.labelref&&(document.id(b.labelref).removeClass("invalid"),document.id(b.labelref).set("aria-invalid","false")))}});document.formvalidator=null;
window.addEvent("domready",function(){document.formvalidator=new JFormValidator});