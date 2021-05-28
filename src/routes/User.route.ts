import express from 'express';
import dotenv from 'dotenv';
import User from '../models/User.model';
dotenv.config();

const router = express.Router();

router.get('/details/:id', async (req, res) => {
  const id: string = req.params.id;
  console.log(id);
  console.log('Request made to /user/details');
  const user = await User.findOne({ _id: id });
    if (!user) {
        console.log("No user with id found.");
        return res
            .status(400)
            .send(
                "Account does not exist with provided email and password combination."
            );
    }
    console.log('User found');
  const fname: string = user.firstName;
  const lname: string = user.lastName;
  const dob: Date = new Date(user.dateofbirth);
  const phone: string = user.phone;
  const address: string = user.address;
  const email: string = user.email;
  console.log('Details successfully set.');
  return res.status(200).send({ fname: fname, lname: lname, dob: dob, phone: phone, address: address, email: email });
});

export default router;