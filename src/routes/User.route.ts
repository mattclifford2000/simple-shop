import express from 'express';
import dotenv from 'dotenv';
import User from '../models/User.model';
import Order from '../models/Order.model';
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
                "User does not exist with provided ID."
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

router.get('/orders/:id', async (req, res) => { 
const id: string = req.params.id;
const orders = await Order.find(
  {
    user: id
  }
);
if (!orders) {
  return res.status(200).send('No orders yet');
}
return res.status(200).send(orders);
});

export default router;