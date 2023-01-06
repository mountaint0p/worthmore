const userRoles = ["user", "admin"];
const checkRoles = (user, role) => {
	if (!user) return False;
	return user.roles.includes(role);
};
