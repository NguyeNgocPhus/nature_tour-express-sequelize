const {Op} = require('sequelize');

class apiFeatures {
  constructor(model, queryString,query) {
    this.model = model;
    this.queryString = queryString;
    this.query = query;
  }
  filter() {
    const queryObj = { ...this.queryString };
    const queryArray = ["sort", "page", "limit", "fields"];
    queryArray.forEach((val) => {
      delete queryObj[val];
    });
    let queryStr = JSON.stringify(queryObj);
   
    queryStr = JSON.parse(queryStr);
    this.query["queryStr"] =queryStr;
  
    return this;
  }
  sort() {
    let order;
    if (this.queryString.sort) {
      order = [[this.queryString.sort, "ASC"]];
    } else {
      order = [["createdAt", "ASC"]];
    }
    this.query["order"] = order;  
    return this;
  }
  limitFields() {
    let attribute;
    if (this.queryString.fields) {
      attribute = this.queryString.fields.split(",");
    }
     this.query["attribute"] = attribute;
  
    return this;
  }
  paginate(){
      const page = this.queryString.page * 1 || 1;
      const limit = this.queryString.limit * 1 || 20; 
      const skip = (page - 1) * limit;
     this.query["limit"] = limit;
     this.query["skip"] = skip;
      return this;

  };
}
module.exports = apiFeatures;