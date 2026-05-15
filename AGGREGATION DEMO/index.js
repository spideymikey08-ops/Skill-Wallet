const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/aggregation-demo")
    .then(() => {
        console.log("MongoDB Connected Successfully");
        insertData();
    })
    .catch((err) => {
        console.log("Connection Error:", err);
    });

const salesSchema = new mongoose.Schema({
    productName: String,
    category: String,
    price: Number,
    quantity: Number
});

const Sale = mongoose.model("Sale", salesSchema);

async function insertData() {
    try {
        await Sale.deleteMany({});

        await Sale.insertMany([
            {
                productName: "Laptop",
                category: "Electronics",
                price: 50000,
                quantity: 2
            },
            {
                productName: "Phone",
                category: "Electronics",
                price: 30000,
                quantity: 3
            },
            {
                productName: "Headphones",
                category: "Electronics",
                price: 5000,
                quantity: 5
            },
            {
                productName: "Table",
                category: "Furniture",
                price: 7000,
                quantity: 4
            },
            {
                productName: "Chair",
                category: "Furniture",
                price: 3000,
                quantity: 6
            }
        ]);

        console.log("Sample Data Inserted Successfully");

        runAggregation();

    } catch (error) {
        console.log("Insert Error:", error);
    }
}


async function runAggregation() {
    try {
        const result = await Sale.aggregate([

            {
                $match: {
                    category: "Electronics"
                }
            },

            {
                $group: {
                    _id: "$category",
                    totalProducts: { $sum: 1 },
                    totalRevenue: {
                        $sum: {
                            $multiply: ["$price", "$quantity"]
                        }
                    }
                }
            },

            {
                $project: {
                    _id: 0,
                    category: "$_id",
                    totalProducts: 1,
                    totalRevenue: 1
                }
            },

            {
                $sort: {
                    totalRevenue: -1
                }
            }

        ]);

        console.log("\nAggregation Result:");
        console.log(result);

        mongoose.connection.close();

    } catch (error) {
        console.log("Aggregation Error:", error);
    }
}