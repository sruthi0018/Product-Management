const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth')
const productRoutes = require('./routes/product')
const categoryRoutes = require('./routes/category')
const subCategoryRoutes = require('./routes/subCategory')
const wishListRoutes = require('./routes/wishList')

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/product',productRoutes)
app.use('/api/category',categoryRoutes)
app.use('/api/subcategory',subCategoryRoutes)
app.use('/api/wishlist',wishListRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.error(err));
