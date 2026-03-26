import bcrypt from "bcrypt";
import User from "../database/model/user.model";

const salt = process.env.BCRYPT_SALT_ROUNDS;

const adminSeed = async () => {
  const {
    SUPER_ADMIN_FULLNAME,
    SUPER_ADMIN_EMAIL,
    SUPER_ADMIN_PROFILE_IMAGE,
    SUPER_ADMIN_PASSWORD,
    SUPER_ADMIN_ROLE,
    SUPER_ADMIN_PHONE,
    SUPER_ADMIN_ADDRESS,
  } = process.env;

  if (
    !SUPER_ADMIN_FULLNAME ||
    !SUPER_ADMIN_EMAIL ||
    !SUPER_ADMIN_PROFILE_IMAGE ||
    !SUPER_ADMIN_PASSWORD ||
    !SUPER_ADMIN_ROLE ||
    !SUPER_ADMIN_PHONE ||
    !SUPER_ADMIN_ADDRESS
  ) {
    console.log("Missing env Variables");
  }

  const adminExist = await User.findOne({
    where: { email: SUPER_ADMIN_EMAIL },
  });

  const hashPassowrd = bcrypt.hash(
    SUPER_ADMIN_PASSWORD as string,
    Number(salt),
  );
  if (!adminExist) {
    console.log("Admin Creation was successfull");
  } else {
    console.log("Admin Exist");
  }
};

export default adminSeed;
