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

export const readAllUserService = async () => {
  try {
    const user = await User.findAll();

    return user;
  } catch (err: any) {
    throw new Error("USER_LOAD_FAILED");
  }
};
