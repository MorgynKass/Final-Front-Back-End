import prisma from "../constats/config.js";
import bcrypt from "bcrypt";

// EDIT PASSWORD
const editPass = async (req, res) => {
  const { password, oldPassword } = req.body;
  let user;

  //FIND USER
  try {
    user = await prisma.account.findUnique({
      where: {
        id: req.session.userId,
      },
    });
  } catch {
    res.status(500).json({ message: "Something went wrong" });
    return;
  }

  //IF USER IS FOUND
  if (user) {
    const isPassCorrect = await bcrypt.compare(oldPassword, user.password);
    if (isPassCorrect) {
      //hash and salt new pw
      const saltRounds = 10;
      let newPassword = await bcrypt.hash(password, saltRounds);
      try {
        await prisma.account.update({
          where: {
            id: req.session.userId,
          },
          data: {
            password: newPassword,
          },
        });
        res.status(201).send("Password Updated!");
      } catch {
        res.status(500).send("Cannot update pw");
      }
    } else {
      //IF PW IS NOT CORRECT
      res.status(403).send("wrong pw");
    }
  }
};

// DELETE ACCOUNT
const deleteAccount = async (req, res) => {
  const userId = req.session.userId;
  req.session.destroy((err) => {
    if (err) res.status(500).send("Cannot destroy session");
    else res.status(200).send("Deleted");
  });
  await prisma.account.delete({
    where: {
      id: userId,
    },
  });
};

export { editPass, deleteAccount };
