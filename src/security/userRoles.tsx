const userRoles = ["user", "admin"];
const checkRoles = (user, role) => {
	if (!user) return false;
	return user.roles.includes(role);
};
