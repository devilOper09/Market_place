import express from "express"
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv"
import cors from "cors"
import productRotes from "./routes/productRoutes.js";
import { sql } from "./database/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT

app.use(helmet()); //middle ware for protection
app.use(morgan("dev")); //cashes or logs out the route
app.use(express.json());
app.use(cors())

app.use("/api/products", productRotes);

async function initDb() {

    try {
        await sql` CREATE TABLE IF NOT EXISTS products(
            id SERIAL PRIMARY KEY,
            name VARCHAR(225) NOT NULL,
            image VARCHAR(225) NOT NULL,
            price DECIMAL(10, 2) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`

    } catch (error) {
        console.log("Error in initDb", error);


    }

}

initDb().then(() => {
    app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`)
    })
})
