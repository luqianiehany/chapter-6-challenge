const { Router } = require("express");
const controller = require("../controllers/user");

const routers = Router();

routers.get('/', function(req, res){
	res.render('index')
})

routers.get("/register", controller.viewRegister);
routers.post("/create-user", controller.createRegister);
routers.get("/login", controller.viewLogin);
routers.post("/create-login", controller.createLogin);
routers.get("/user-dashboard", controller.viewUserDashboard);
routers.get("/user-dashboard/add-biodata", controller.addBiodata);
routers.post("/create-biodata", controller.createBiodata);
routers.get("/user-dashboard/edit-biodata", controller.editBiodata);
routers.post("/user-update-biodata", controller.userUpdateBiodata);
routers.get("/user-dashboard/delete-biodata", controller.deleteBiodata);
routers.post("/user-delete-biodata", controller.userDeleteBiodata);

routers.get("/admin", controller.viewAdminLogin);
routers.post("/create-admin-login", controller.createAdminLogin);
routers.get("/dashboard", controller.viewDashboard);
routers.get("/dashboard/add-user", controller.addUser);
routers.post("/admin-create-user", controller.adminCreateUser);
routers.get("/dashboard/edit-user", controller.editUser);
routers.post("/admin-update-user", controller.adminUpdateUser);
routers.get("/dashboard/delete-user", controller.deleteUser);
routers.post("/admin-delete-user", controller.adminDeleteUser);

module.exports = routers;