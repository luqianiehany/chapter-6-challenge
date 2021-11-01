const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/users.model");
const UserGameBiodata = require("../models/user.game.biodata.model");
const UserGameHistories = require("../models/user.game.history.model");

const { APP_SECRET } = process.env;

const createToken = (id) => {
  return jwt.sign({ id }, APP_SECRET, { expiresIn: "7 days" });
};

const viewRegister = (req, res) => {
  return res.render("register");
};

const viewLogin = (req, res) => {
  return res.render("login");
};

const viewAdminLogin = (req, res) => {
  return res.render("admin-login");
};

const viewUserDashboard = async (req, res, next) => {
	try {
		var queryid = req.query.id || ''
		
		const checkUser = await User.findAll({
			where: { id: queryid }
		})

		if (checkUser.length == 0) {
		  throw {
			message: `user not found`,
			code: 400,
			error: `bad request`,
		  };
		}
		
		const usergamebiodatas = await UserGameBiodata.findAll({
			where: { user_id: queryid }
		})
		const usergamehistories = await UserGameHistories.findAll({
			where: { user_id: queryid }
		})

		return res.render("user-dashboard", {
			usergamebiodatas, usergamehistories, queryid
		});
	} catch (error) {
		next(error);
	}
};

const viewDashboard = async (req, res) => {
  const users = await User.findAll()
  
  return res.render("dashboard", {
    users
  });
};

const addBiodata = (req, res) => {
	var queryid = req.query.id || ''
	return res.render("add-biodata", {
		queryid
	});
};

const editBiodata = async (req, res) => {
	const queryid = req.query.id || ''
	const editbiodatas = await UserGameBiodata.findAll({
		where: { user_id: queryid }
	})

	return res.render("edit-biodata", {
		editbiodatas
	});
};

const deleteBiodata = async (req, res) => {
	const queryid = req.query.id || ''
	const deletebiodatas = await UserGameBiodata.findAll({
		where: { user_id: queryid }
	})

	return res.render("delete-biodata", {
		deletebiodatas
	});
};

const addUser = (req, res) => {
  return res.render("add-user");
};

const editUser = async (req, res) => {
	const queryid = req.query.id || ''
	const editusers = await User.findAll({
		where: { id: queryid }
	})

	return res.render("edit-user", {
		editusers
	});
};

const deleteUser = async (req, res) => {
	const queryid = req.query.id || ''
	const deleteusers = await User.findAll({
		where: { id: queryid }
	})

	return res.render("delete-user", {
		deleteusers
	});
};

const createRegister = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);
    if (!username) {
      throw {
        message: `username must be valid`,
        code: 400,
        error: `bad request`,
      };
    }

    if (!password || password.length < 8) {
      throw {
        message: `password min length 8 character`,
        code: 400,
        error: `bad request`,
      };
    }

    const isExist = await User.findOne({
      where: {
        username,
      },
    });

    if (isExist) {
      throw {
        message: `users already exists`,
        code: 400,
        error: `bad request`,
      };
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await User.create({
      username,
      password: passwordHash,
    });

    return res.status(301).redirect('/login');
  } catch (error) {
    next(error);
  }
};
const createLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);
    if (!username) {
      throw {
        message: `username must be valid`,
        code: 400,
        error: `bad request`,
      };
    }

    if (!password || password.length < 8) {
      throw {
        message: `password min length 8 character`,
        code: 400,
        error: `bad request`,
      };
    }

    const isExist = await User.findOne({
      where: {
        username,
      },
    });

    if (!isExist) {
      throw {
        message: `User Not Found`,
        code: 404,
        error: `bad request`,
      };
    }

    const isMatch = await bcrypt.compare(password, isExist.password);

    if (!isMatch) {
      throw {
        message: `Wrong Password`,
        code: 404,
        error: `bad request`,
      };
    }

    const token = await createToken(isExist.id);
	
    return res.status(301).redirect('/user-dashboard?id='+isExist.id);
  } catch (error) {
    next(error);
  }
};

const createBiodata = async (req, res, next) => {
	try {
		const { user_id, name, age, email } = req.body;
		
		if (!user_id) {
		  throw {
			message: `userid must be valid`,
			code: 400,
			error: `bad request`,
		  };
		}
		if (!name) {
		  throw {
			message: `name must be valid`,
			code: 400,
			error: `bad request`,
		  };
		}
		if (!age) {
		  throw {
			message: `age must be valid`,
			code: 400,
			error: `bad request`,
		  };
		}
		if (!email) {
		  throw {
			message: `email must be valid`,
			code: 400,
			error: `bad request`,
		  };
		}

		await UserGameBiodata.create({
			name,
			age,
			email,
			user_id,
		});

		return res.status(301).redirect('/user-dashboard?id='+user_id)
	} catch (error) {
		next(error);
	}
};
const userUpdateBiodata = async (req, res, next) => {
  try {
    const { edituserid, name, age, email } = req.body;
    console.log(req.body);
    if (!name) {
      throw {
        message: `name must be valid`,
        code: 400,
        error: `bad request`,
      };
    }
	if (!age) {
	  throw {
		message: `age must be valid`,
		code: 400,
		error: `bad request`,
	  };
	}
	if (!email) {
	  throw {
		message: `email must be valid`,
		code: 400,
		error: `bad request`,
	  };
	}

    const user = await UserGameBiodata.update(
		{
			name: name,
			age: age,
			email: email
		},
		{
			where: { user_id: edituserid }
		}
	);
	
    return res.status(301).redirect('/user-dashboard?id='+edituserid);
  } catch (error) {
    next(error);
  }
};
const userDeleteBiodata = async (req, res, next) => {
  try {
    const { deleteuserid } = req.body;
    console.log(req.body);

    const user = await UserGameBiodata.destroy({
		where: { user_id: deleteuserid }
	});
	
    return res.status(301).redirect('/user-dashboard?id='+deleteuserid);
  } catch (error) {
    next(error);
  }
};

const createAdminLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);
    if (!username) {
      throw {
        message: `username must be valid`,
        code: 400,
        error: `bad request`,
      };
    }

    if (!password || password.length < 8) {
      throw {
        message: `password min length 8 character`,
        code: 400,
        error: `bad request`,
      };
    }

    if ((username == "admin")&&(password == "password"))
	{
	}
	else
	{
      throw {
        message: `Wrong Password`,
        code: 404,
        error: `bad request`,
      };
    }

    const token = await createToken(0);
	
    return res.status(301).redirect('/dashboard');
  } catch (error) {
    next(error);
  }
};

const adminCreateUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);
    if (!username) {
      throw {
        message: `username must be valid`,
        code: 400,
        error: `bad request`,
      };
    }

    if (!password || password.length < 8) {
      throw {
        message: `password min length 8 character`,
        code: 400,
        error: `bad request`,
      };
    }

    const isExist = await User.findOne({
      where: {
        username,
      },
    });

    if (isExist) {
      throw {
        message: `users already exists`,
        code: 400,
        error: `bad request`,
      };
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await User.create({
      username,
      password: passwordHash,
    });

    return res.status(301).redirect('/dashboard');
  } catch (error) {
    next(error);
  }
};
const adminUpdateUser = async (req, res, next) => {
  try {
    const { edituserid, username, password } = req.body;
    console.log(req.body);
    if (!username) {
      throw {
        message: `username must be valid`,
        code: 400,
        error: `bad request`,
      };
    }

    if (!password || password.length < 8) {
      throw {
        message: `password min length 8 character`,
        code: 400,
        error: `bad request`,
      };
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await User.update(
		{
			username: username,
			password: passwordHash
		},
		{
			where: { id: edituserid }
		}
	);
	
    return res.status(301).redirect('/dashboard');
  } catch (error) {
    next(error);
  }
};
const adminDeleteUser = async (req, res, next) => {
  try {
    const { deleteuserid } = req.body;
    console.log(req.body);

	const usergamehistory = await UserGameHistories.destroy({
		where: { user_id: deleteuserid }
	});
	
	const userbiodata = await UserGameBiodata.destroy({
		where: { user_id: deleteuserid }
	});
	
    const user = await User.destroy({
		where: { id: deleteuserid }
	});
	
    return res.status(301).redirect('/dashboard');
  } catch (error) {
    next(error);
  }
};

const userUpdateGameHistory = async (req, res, next) => {
  try {
    const { user_id, result } = req.body;
    console.log(req.body);
    if (!user_id) {
      throw {
        message: `user_id must be valid`,
        code: 400,
        error: `bad request`,
      };
    }
	
	if (!result) {
      throw {
        message: `result must be valid`,
        code: 400,
        error: `bad request`,
      };
    }
	
	const user = await UserGameHistories.create({
		time: Date.now(),
		result: result,
		user_id: user_id,
    });
	
    return res.status(301).redirect('/rps?id='+user_id);
  } catch (error) {
    next(error);
  }
};

module.exports = { viewRegister, viewLogin, viewAdminLogin, viewUserDashboard, viewDashboard, addBiodata, editBiodata, deleteBiodata, createBiodata, userUpdateBiodata, userDeleteBiodata, addUser, editUser, deleteUser, createRegister, createLogin, createAdminLogin, adminCreateUser, adminUpdateUser, adminDeleteUser, userUpdateGameHistory };
