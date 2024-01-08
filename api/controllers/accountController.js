import prisma from "../constats/config.js";
import bcrypt from "bcrypt";
import { z } from "zod";

// CREATE AN ACCOUNT
const accountRegister = async (req, res) => {
  const { email, password } = req.body;

  const schema = z.object({
    email: z.string().email({ message: "Invalid Email" }),
    password: z
      .string()
      .min(3, { message: "Password must be at least 3 characters" }),
  });

  const isValid = schema.safeParse(req.body);
  if (isValid?.error) {
    res.status(400).json({ errors: isValid?.error?.errors });
    return;
  }

  let emailCheck;
  try {
    emailCheck = await prisma.account.findUnique({
      where: {
        email: email,
      },
    });
  } catch {
    res.status(500).json({ message: "Something went wrong" });
  }

  if (emailCheck) res.status(500).json({ message: "Email already exists" });
  else {
    const saltRounds = 10;
    let salted_password = await bcrypt.hash(password, saltRounds);
    let newUser;

    try {
      newUser = await prisma.account.create({
        data: {
          email: email,
          password: salted_password,
        },
      });

      res.status(201).json({ userId: newUser.id });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Something Went Wrong" });
      return;
    }
  }
};

// LOGIN
const accountLogin = async (req, res) => {
  let user;
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "Fields Missing" });
    return;
  }

  try {
    user = await prisma.account.findUnique({
      where: {
        email: email,
      },
    });

    //CHECK PW
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (isPasswordCorrect) {
      //ADD USER ID TO THE SESSION
      req.session.userId = user.id;
      res.status(200).send("Authed");
    } else {
      res.status(400).json({ message: "Invalid Creditantials" });
    }
  } catch (e) {
    if (!user) res.status(400).json({ message: "Invalid Creditantials" });
    else res.status(400).json({ message: "Something went Wrong" });
  }
};

// LOGOUT
const accountLogout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) res.status(500).send("Cannot destroy session");
    else res.status(200).send("Deleted");
  });
};

// DISPLAY ALL ACCOUNTS
const accountAll = async (req, res) => {
  try {
    const allAccounts = await prisma.account.findMany();
    res.status(200).json(allAccounts);
  } catch (error) {
    res.status(500).json(error);
  }
};

// DISPLAY CURRENT ACCOUNT
const accountCurrent = async (req, res) => {
  try {
    const currentAccount = await prisma.account.findUnique({
      where: {
        id: req.session.userId,
      },
    });
    if (!currentAccount) res.status(401).json("User Not Found");
    const data = {
      email: currentAccount.email,
      userId: currentAccount.id,
    };
    res.status(200).json(data);
  } catch {
    res.status(500).json("Something Went Wrong {auth}");
  }
};

export {
  accountRegister,
  accountLogin,
  accountLogout,
  accountAll,
  accountCurrent,
};
