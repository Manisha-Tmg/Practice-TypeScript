import bcrypt from "bcrypt";
import User from "../database/model/user.model";

const salt = process.env.BCRYPT_SALT_ROUNDS;

const adminSeed = async () => {
  const {
    SUPER_ADMIN_NAME,
    SUPER_ADMIN_EMAIL,
    SUPER_ADMIN_PASSWORD,
    SUPER_ADMIN_ROLE,
    SUPER_ADMIN_PHONE,
    SUPER_ADMIN_ADDRESS,
  } = process.env;

  if (
    !SUPER_ADMIN_NAME ||
    !SUPER_ADMIN_EMAIL ||
    !SUPER_ADMIN_PASSWORD ||
    !SUPER_ADMIN_ROLE ||
    !SUPER_ADMIN_PHONE ||
    !SUPER_ADMIN_ADDRESS
  ) {
    throw new Error("Missing required super admin environment variables");
  }
  const adminExist = await User.findOne({
    where: { email: SUPER_ADMIN_EMAIL },
  });

  const hashPassowrd = await bcrypt.hash(SUPER_ADMIN_PASSWORD, Number(salt));
  if (!adminExist) {
    await User.create({
      name: SUPER_ADMIN_NAME,
      email: SUPER_ADMIN_EMAIL,
      password: hashPassowrd,
      role: SUPER_ADMIN_ROLE as "user" | "admin" | "superAdmin",
      phone: SUPER_ADMIN_PHONE,
      address: SUPER_ADMIN_ADDRESS,
    });
    console.log("Admin Creation was successfull");
  } else {
    console.log("Admin Exist");
  }
};

export default adminSeed;
