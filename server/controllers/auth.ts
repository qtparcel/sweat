import Express from "express";
import User from "../schemas/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = async (req: Express.Request, res: Express.Response) => {
  const { name, email, password } = req.body;

  // check valid status of email
  const userExists = await User.findOne({ email });

  // if exists raise error
  if (userExists) {
    return res.status(400).send({
      message: "User with this email already exists. Try another email.",
    });
  }

  // encrypt password
  const hashedPassword = bcrypt.hashSync(password, 12);

  // save user info in mongodb
  const newUser = new User({
    name,
    email,
    authentication: {
      password: hashedPassword,
    },
  });

  await newUser.save();

  // return status code 201 with user information in resposne
  res
    .status(201)
    .send({ message: "User account has been created", user: newUser });
};

const loginUser = async (req: Express.Request, res: Express.Response) => {
  const { email, password } = req.body;

  console.log("here")

  // validate user
  const userExists = await User.findOne({ email }).select(
    "+authentication.password"
  );
  if (!userExists)
    return res
      .status(400)
      .send({ message: "User with this email does not exists." });

  // validate password
  const validPassword = bcrypt.compareSync(
    password,
    userExists.authentication?.password as string
  );

  if (!validPassword) {
    return res.status(401).send({ message: "Login Failed." });
  }

  // set unique token signature
  const token = jwt.sign(
    { id: userExists._id },
    process.env.APP_SECRET as string,
    { algorithm: "HS256" }
  );

  // set access token in cookie
  res.cookie("AUTH_COOKIE", token, { httpOnly: true });

  // userExists = User.findOne()
  if (userExists.authentication) {
    userExists.authentication.access_token = token;
  }

  await userExists.save();

  // send status code 200 with the user info along with access token
  res.status(200).send({ message: "Login Success!", accessToken: token });
};

const logout = (req: Express.Request, res: Express.Response) => {
  // delete cookie or make cookie empty
  res.cookie("AUTH_COOKIE", "");

  // send status 200 code
  return res.status(200).send({ message: "User logged out successfully!" });
};

const getAllUsers = async (req: Express.Request, res: Express.Response) => {

    const allUsers = await User.find()

    return res.status(200).send({"Users:": allUsers})
}
export { registerUser, loginUser, logout, getAllUsers };
