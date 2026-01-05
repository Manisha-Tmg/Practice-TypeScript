//
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../database/model/user.model";
import { sendEmail } from "../utils/sendMail";

const salt = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;
const secret_Key = String(process.env.JWT_SECRET_KEY);

export const createUserService = async (
  name: string,
  email: string,
  password: string,
  address: string,
  phone: string,
) => {
  try {
    const checkUserExist = await User.findOne({ where: { email } });
    if (checkUserExist) {
      throw new Error("USER_EXIST");
    }

    const hashPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
      address,
      phone,
      role: "user",
    });

    return user;
  } catch (err: any) {
    if (err.message === "USER_EXIST") {
      throw err;
    }
    throw new Error("USER_CREATION_FAILED");
  }
};

export const loginUserService = async (email: string, password: string) => {
  try {
    const checkUserExist = await User.findOne({ where: { email } });
    if (!checkUserExist) {
      throw new Error("USER_DOESNOT_EXIST");
    }

    const verifyPassword = await bcrypt.compare(
      password,
      checkUserExist.password,
    );
    if (!verifyPassword) {
      throw new Error("INCORRECT_PASSWORD");
    }
    let id = String;
    let details = {
      id: checkUserExist.id,
    };
    const token = jwt.sign(details, secret_Key, {
      expiresIn: "1h",
    });
  } catch (err: any) {
    throw new Error("USER_CREATION_FAILED");
  }
};

export const forgotPasswordService = async (email: string) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("Invalid_EMAIL");
  }

  const details = {
    id: user.id,
  };

  const token = await jwt.sign(details, secret_Key as any, {
    expiresIn: "1h",
  });

  await user.save();

  await sendEmail({
    from: "Reset <uniquekc425@gmail.com>",
    to: user.email,
    subject: "Reset your password",
    html: `
    <h2>Password Reset opt</h2>
    <p>${token}</p>
    <p>This link will expire in 1 hour.</p>
  `,
  });
};

export const resetPasswordService = async (
  newPassword: string,
  confirmPassword: string,
  token: string,
) => {
  try {
    // get token & decode
    let decoded: any;
    decoded = await jwt.verify(token, secret_Key! as any);
    const userId = decoded.id;
    if (!decoded) {
      throw new Error("INVALID_TOKEN");
    }
    // find user
    const user = await User.findByPk(userId);

    if (!user) {
      throw new Error("USER_NOT_FOUND");
    }

    if (newPassword !== confirmPassword) {
      throw new Error("INVALID NEW_PASSWORD & CONFIRM_PASSWORD");
    }
    // hash Password
    const hasshedPassword = await bcrypt.hash(newPassword, 10);

    // update User
    user.password = hasshedPassword;
    await user.save();

    await sendEmail({
      email: user.email,
      subject: "Your password has been changed",
      message:
        "This is a confirmation that your account password was successfully changed. If this was not you, please contact support immediately.",
    });
  } catch (error) {
    throw new Error("INVALID_TOKEN");
  }
};

export const myProfileService = async (id: string) => {
  if (!id) {
    throw new Error("ID_NOT_FOUND");
  }
  const user = await User.findByPk(id);

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }
  return user;
};

export const readAllUserService = async () => {
  try {
    const user = await User.findAll();

    return user;
  } catch (err: any) {
    throw new Error("USER_LOAD_FAILED");
  }
};

export const readUserByIdService = async (id: string) => {
  if (!id) {
    throw new Error("ID_NOT_FOUND");
  }
  const user = await User.findByPk(id);

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }
  return user;
};
export const updateMyProfileService = async (id: string, data: any) => {
  if (!id) {
    throw new Error("ID_NOT_FOUND");
  }
  const user = await User.findByPk(id);

  if (!user) {
    throw new Error("PROFILE_UPDATE_FAILED");
  }
  user.set(data);
  user.save();
  return user;
};

export const updatePasswordService = async (
  id: string,
  oldPassword: string,
  newPassword: string,
  confirmPassword: string,
) => {
  if (!id) {
    throw new Error("ID_NOT_FOUND");
  }
  const user = await User.findByPk(id);

  if (!user) {
    throw new Error("USER_NOTFOUND");
  }
  const verifyPassword = await bcrypt.compare(oldPassword, user.password);
  console.log(verifyPassword);
  if (!verifyPassword) {
    throw new Error("OLD_PASSWORD_DIDNOT_MATCH");
  }

  if (newPassword !== confirmPassword) {
    throw new Error("NEW_PASSWORD AND CONFIRM_PASSWORFD DIDNOT MATCH");
  }
  const hasshedPassword = await bcrypt.hash(newPassword, Number(salt));
  user.password = hasshedPassword;
  await user.save();

  await sendEmail({
    email: user.email,
    subject: "Your password has been changed",
    message:
      "This is a confirmation that your account password was successfully changed. If this was not you, please contact support immediately.",
  });
};
