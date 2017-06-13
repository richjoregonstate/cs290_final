(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['movie'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<li class=\"movieNode\">\n  <a href=\""
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\">\n    <img class=\"movieNodePicture\" src=\""
    + alias4(((helper = (helper = helpers.pic || (depth0 != null ? depth0.pic : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pic","hash":{},"data":data}) : helper)))
    + "\">\n    <h3>\n      "
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\n    </h3>\n    <p>\n      "
    + alias4(((helper = (helper = helpers.discription || (depth0 != null ? depth0.discription : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"discription","hash":{},"data":data}) : helper)))
    + "\n    </p>\n  </a>\n</li>\n";
},"useData":true});
})();