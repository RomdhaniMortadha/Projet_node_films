const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://romdhani:azertyuiop^$123@cluster0.jv1to.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Mongo is UP."))
  .catch((err) => console.log("Mongo is Down. Raison :", err));
