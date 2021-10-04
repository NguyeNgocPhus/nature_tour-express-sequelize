const apiFeatures = require("../utils/apiFeatures");
const { Tour } = require("../models/index");
module.exports.createOne = (Model) => {
  return async (req, res, next) => {
    try {
      const data = await Model.create(req.body);

      res.send(data);
    } catch (error) {
      res.send(error.message);
    }
  };
};
module.exports.uptateOne = (Model) => {
  return async (req, res, next) => {
    try {
      const data = await Model.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      res.send(data);
    } catch (error) {
      res.send(error);
    }
  };
};
module.exports.deleteOne = (Model) => {
  return async (req, res, next) => {
    try {
      const data = await Model.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (data) {
        res.json({
          success: true,
        });
      }
    } catch (error) {
      res.send(error.message);
    }
  };
};
module.exports.getAll = (Model) => {
  return async (req, res, next) => {
    try {
      let query = {};

      const features = new apiFeatures(Model, req.query, query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
      //console.log(features.query);
      const data = await Model.findAll({
        include: { all: true, nested: true },
        where: features.query.queryStr,
        order: features.query.order,
        attributes: features.query.attribute,
        offset: features.query.skip,
        limit: features.query.limit,
        subQuery: false,
      });
      //const tour = await features.model;
      res.status(200).send(data);
    } catch (error) {
      res.send(error.message);
    }
  };
};
