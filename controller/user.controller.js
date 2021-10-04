const { User } = require("../models/index");
const jwt = require("jsonwebtoken");
const HandelFactory = require("./handleFactory");

function createToken(user, res) {
  const token = jwt.sign({ id: user.id }, "nguyenngocphudeptrai", {
    expiresIn: 1000 * 60 * 60 * 24,
  });
  const cookieOption = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  res.cookie("jwt", token, cookieOption);
  res.status(200).json({
    success: true,
    token: token,
  });
}
function filterObj(obj, ...allowFields) {
  let query = {};
  Object.keys(obj).map((val) => {
    if (allowFields.includes(val)) {
      query[val] = obj[val];
    }
  });
  console.log(query);
  return query;
}
module.exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    res.send("You are not logged in! Please log in to get access.");
  }

  const decoded = jwt.verify(token, "nguyenngocphudeptrai"); // kiểm tra token hợp lệ
  // console.log(decoded);
  const user = await User.findOne({
    where: {
      id: decoded.id,
    },
  });
  //  console.log(user.dataValues);
  if (!user) {
    res.send("The user belonging to this token does no longer exist.");
  }
  // console.log(user);
  req.user = user.dataValues;
  res.locals.user = user;
  next();
};
module.exports.isLogin = async (req, res, next) => {
  try {
    if (req.cookies.jwt) {
      const decoded = jwt.verify(req.cookies.jwt, "nguyenngocphudeptrai");

      const user = await User.findOne({
        where: {
          id: decoded.id,
        },
      });
      //console.log(user.dataValues);

      if (!user.dataValues) {
        return next();
      }
      res.locals.user = user.dataValues;
    }
    return next();
  } catch (error) {
    return next();
  }
};
module.exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    roles.forEach((val) => {
      if (val !== "admin") {
        return res.send("ko có quyền nhé dmm");
      }
    });
    next();
  };
};

module.exports.signup = async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  createToken(newUser, res); /// tạo token và gắn vào cookies
};
module.exports.login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    //console.log(email);
    if (!email || !password) {
      return res.send("Please provide email and password!");
    }

    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    //console.log(user);
    if (!user) {
      return res.send("not exists");
    }
    // console.log(user.dataValues);
    const checkPassword = await user.correctPassword(
      password,
      user.dataValues.password
    ); // check password đã mã hóa ở db vs password user gửi lên
    //console.log(checkPassword);
    if (!checkPassword) {
      //  console.log(checkPassword);
      return next(new AppError("password is wrrong", 400));
    }
    createToken(user.dataValues, res);
  } catch (error) {
    res.send(error.message);
  }

  // console.log(user);
  //createSendToken(user, 200, res); // gửi token
};
module.exports.logout = async (req, res, next) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  // đặt lại cookies

  res.status(200).json({ status: "success" });
};
module.exports.updateMe = async (req, res, next) => {
  const data = filterObj(req.body, "email", "name");
  const success = await User.update(data, {
    where: {
      id: req.user.id,
    },
  });
  res.send(success);
};
module.exports.getUser = HandelFactory.getAll(User);
module.exports.createUser = HandelFactory.createOne(User);
module.exports.deleteUser = HandelFactory.deleteOne(User);
