const express = require("express")
const colors = require("colors")
const morgan = require("morgan")
const dotenv = require("dotenv")
const connectDB = require('./config/db');
const cors = require('cors');
const blogRoutes = require('./routes/blogRoutes');

//dot env config
dotenv.config();

//mongodb connection
connectDB()

// rest object 
const app = express()

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/user",require("./routes/userRoutes"));
app.use("/api/v1/donation", require("./routes/donationRoutes"));
app.use("/api/v1/vets", require("./routes/vetRoutes"));
app.use("/api/v1/events", require("./routes/eventRoutes"));
app.use('/api/v1/blogs', blogRoutes);
//PORT
const port = process.env.PORT || 8080

app.listen(port,()=>{
    console.log(`server listening in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`.bgCyan.white);
});
