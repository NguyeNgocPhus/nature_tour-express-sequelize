const { Tour, User } = require("../models/index");

module.exports.overview = async (req, res, next) => {
  const tour = await Tour.findAll({ include: { all: true, nested: true } });
  res.render("overview", {
    title: "hello",
    tours: tour,
  });
};
module.exports.me = async (req, res, next) => {
  res.render("account", {
    title: "hello",
  });
};
module.exports.getTour = async (req, res, next) => {
  const tour = await Tour.findOne({
    where: {
      slug: req.params.slug,
    },
    include: { all: true, nested: true },
  });

  if (!tour) {
    return next(new appError("sai mm roi", 404));
  }
  //  res.send(tour)
  res.render("tour", {
    title: `${tour.dataValues.name}`,
    tour: tour.dataValues,
  });
};
module.exports.login = async (req, res, next) => {
  res.render("login", {});
};
