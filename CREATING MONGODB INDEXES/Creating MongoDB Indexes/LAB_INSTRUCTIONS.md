# MongoDB Indexes Lab Exercise

## Overview

This lab exercise provides hands-on experience with creating and managing indexes in MongoDB. Indexes are crucial for optimizing query performance, especially in large datasets. By the end of this lab, you will understand how to create single-field, compound, and multi-key indexes, as well as how to analyze query performance using explain(). This lab is relevant to anyone working with MongoDB who needs to improve the efficiency of their database queries.

## Learning Objectives

Upon completion of this lab, you will be able to:

- Create single-field indexes to improve query performance on frequently queried fields.
- Construct compound indexes to optimize queries that filter on multiple fields.
- Implement multi-key indexes for efficient querying of array fields.
- Analyze query performance using the explain() method to identify indexing opportunities.
- Evaluate the impact of different index types on query performance.

## Prerequisites

Before starting this lab, you should have:

- A working installation of MongoDB (version 4.0 or later is recommended).
- Basic knowledge of MongoDB commands and data structures.
- Familiarity with the MongoDB shell (mongo).
- A text editor or IDE for writing and executing code snippets.

## Environment Setup

### 1. Install MongoDB
If you don't have MongoDB installed, download the appropriate package for your operating system from the official MongoDB website: https://www.mongodb.com/try/download/community

Follow the installation instructions provided on the website.

### 2. Start MongoDB Server
Open a terminal or command prompt and start the MongoDB server using the following command:

```bash
mongod
```

Leave this terminal window open, as the server needs to be running throughout the lab.

### 3. Connect to MongoDB Shell
Open a new terminal window and connect to the MongoDB shell using the following command:

```bash
mongo
```

This will connect you to the default MongoDB instance running on localhost and port 27017.

### 4. Create a Sample Database and Collection
Create a database named mydatabase and a collection named products by executing the following commands in the MongoDB shell:

```javascript
use mydatabase
db.createCollection("products")
```

### 5. Insert Sample Data
Insert the following sample data into the products collection:

```javascript
db.products.insertMany([
{ name: "Laptop", category: "Electronics", price: 1200, tags: ["new", "featured"] },
{ name: "Smartphone", category: "Electronics", price: 800, tags: ["popular", "sale"] },
{ name: "T-shirt", category: "Clothing", price: 25, tags: ["new", "discount"] },
{ name: "Jeans", category: "Clothing", price: 75, tags: ["popular"] },
{ name: "Coffee Maker", category: "Appliances", price: 100, tags: ["new"] },
{ name: "Blender", category: "Appliances", price: 50, tags: ["sale"] },
{ name: "Tablet", category: "Electronics", price: 300, tags: ["featured"] },
{ name: "Dress", category: "Clothing", price: 60, tags: ["discount"] },
{ name: "Microwave", category: "Appliances", price: 150, tags: ["popular"] },
{ name: "Headphones", category: "Electronics", price: 120, tags: ["new", "sale"] }
])
```

This will insert 10 documents into the products collection.

---

## Step-by-Step Instructions

### Step 1: Examine Query Performance Without Indexes

**Description:** Before creating any indexes, let's examine the performance of a simple query. We'll use the explain() method to analyze the query execution plan. This will give us a baseline to compare against after we create indexes.

**Code:**
```javascript
db.products.find({ category: "Electronics" }).explain("executionStats")
```

**Expected Output:** The output will be a JSON document containing information about the query execution plan. Look for the executionStats section. Pay attention to the executionTimeMillis field, which indicates how long the query took to execute, and the totalDocsExamined field, which indicates the number of documents the query scanned. Initially, totalDocsExamined will likely equal the total number of documents in the collection because a collection scan is performed.

**Explanation:** The explain() method provides insights into how MongoDB executes a query. The executionStats mode provides detailed information about the query's execution, including the time taken and the number of documents examined. Without an index, MongoDB has to scan every document in the collection to find the matching documents.

---

### Step 2: Create a Single-Field Index

**Description:** Create a single-field index on the category field. This index will improve the performance of queries that filter based on the category.

**Code:**
```javascript
db.products.createIndex({ category: 1 })
```

**Expected Output:**
```json
{
  "numIndexesBefore": 1,
  "numIndexesAfter": 2,
  "createdCollectionAutomatically": false,
  "ok": 1
}
```

This output indicates that the index was successfully created. The numIndexesBefore shows the initial number of indexes on the collection (the default _id index), and numIndexesAfter shows the number of indexes after creating the new index.

**Explanation:** The createIndex() method creates an index on the specified field. The 1 specifies an ascending index. Creating an index on category allows MongoDB to quickly locate documents with a specific category without scanning the entire collection.

---

### Step 3: Examine Query Performance with a Single-Field Index

**Description:** Now, re-run the same query from Step 1 and analyze its performance using explain(). You should observe a significant improvement in execution time and a reduction in the number of documents examined.

**Code:**
```javascript
db.products.find({ category: "Electronics" }).explain("executionStats")
```

**Expected Output:** The executionStats section of the output should show a significantly lower executionTimeMillis and a totalDocsExamined value closer to the number of "Electronics" products than the total number of products. You should also see the stage field indicating that the index was used (e.g., IXSCAN).

**Explanation:** The index allows MongoDB to efficiently locate the documents that match the query criteria. The IXSCAN stage indicates that the index was used during query execution. The reduced executionTimeMillis and totalDocsExamined demonstrate the performance improvement achieved by using the index.

---

### Step 4: Create a Compound Index

**Description:** Create a compound index on the category and price fields. This index will optimize queries that filter based on both category and price.

**Code:**
```javascript
db.products.createIndex({ category: 1, price: 1 })
```

**Expected Output:**
```json
{
  "numIndexesBefore": 2,
  "numIndexesAfter": 3,
  "createdCollectionAutomatically": false,
  "ok": 1
}
```

This output confirms that the compound index was created successfully.

**Explanation:** A compound index allows MongoDB to efficiently handle queries that filter on multiple fields. The order of the fields in the index definition is important. In this case, the index is optimized for queries that filter on category first and then price.

---

### Step 5: Examine Query Performance with a Compound Index

**Description:** Execute a query that filters on both category and price, and analyze its performance using explain(). Compare the performance to the query in Step 1 and Step 3.

**Code:**
```javascript
db.products.find({ category: "Electronics", price: { $gt: 500 } }).explain("executionStats")
```

**Expected Output:** The executionStats section should show a further reduction in executionTimeMillis and totalDocsExamined compared to using just the single-field index on category. The stage should indicate that the compound index was used.

**Explanation:** The compound index allows MongoDB to efficiently locate documents that match both the category and price criteria. This results in faster query execution compared to using a single-field index or no index at all, especially when dealing with larger datasets.

---

### Step 6: Create a Multi-Key Index

**Description:** Create a multi-key index on the tags field. This type of index is specifically designed for array fields.

**Code:**
```javascript
db.products.createIndex({ tags: 1 })
```

**Expected Output:**
```json
{
  "numIndexesBefore": 3,
  "numIndexesAfter": 4,
  "createdCollectionAutomatically": false,
  "ok": 1
}
```

The output confirms the successful creation of the multi-key index.

**Explanation:** When an index is created on an array field, MongoDB creates separate index entries for each element in the array. This allows for efficient querying of documents based on the contents of the array.

---

### Step 7: Examine Query Performance with a Multi-Key Index

**Description:** Execute a query that filters based on the tags field, and analyze its performance using explain().

**Code:**
```javascript
db.products.find({ tags: "new" }).explain("executionStats")
```

**Expected Output:** The executionStats section should show improved performance compared to not using an index. The stage should indicate that the multi-key index was used (IXSCAN).

**Explanation:** The multi-key index allows MongoDB to quickly locate documents that contain the specified tag in the tags array. This is particularly useful for searching and filtering based on array elements.

---

### Step 8: Dropping Indexes

**Description:** Learn how to remove indexes that are no longer needed.

**Code - List all indexes on the collection:**
```javascript
db.products.getIndexes()
```

**Code - Drop the index on the category field:**
```javascript
db.products.dropIndex("category_1")
```

**Code - Drop all indexes except the default _id index:**
```javascript
db.products.dropIndexes()
```

**Expected Output:** The getIndexes() command will show a list of all indexes. The dropIndex() command will return a JSON document indicating the success of the operation. The dropIndexes() command will drop all indexes except _id.

**Explanation:** Dropping unnecessary indexes can improve write performance and reduce storage space. The dropIndex() method removes a specific index, while dropIndexes() removes all indexes except the default _id index.

---

## Validation & Expected Results

- **Step 1:** Without any indexes, the executionTimeMillis should be relatively high, and totalDocsExamined should equal the number of documents in the collection.

- **Step 3:** After creating a single-field index on category, the executionTimeMillis should decrease, and totalDocsExamined should be significantly lower, reflecting the efficiency of the index.

- **Step 5:** After creating a compound index on category and price, the executionTimeMillis should further decrease for queries that filter on both fields.

- **Step 7:** After creating a multi-key index on tags, the query performance for tag-based queries should improve.

- **Verify:** the number of indexes before and after creating and dropping them using db.products.getIndexes().

---

## Troubleshooting Tips

### Index Not Being Used
If the explain() output doesn't show that the index is being used (IXSCAN stage), ensure that the query matches the index definition and that the data types are consistent. Use hint() to force MongoDB to use a specific index for debugging:

```javascript
db.products.find({ category: "Electronics" }).hint({ category: 1 }).explain("executionStats")
```

### Slow Query Performance
Even with indexes, queries can be slow if the dataset is very large or the query is complex. Consider using profiling to identify performance bottlenecks and optimize your queries accordingly.

### Index Creation Errors
If you encounter errors during index creation, check the MongoDB server logs for more details. Common issues include insufficient disk space or exceeding the maximum number of indexes per collection.

### Incorrect Index Definition
Ensure that the index definition matches the queries you want to optimize. The order of fields in a compound index matters, and the index type (single-field, compound, multi-key) should be appropriate for the data.

### Outdated Statistics
MongoDB uses statistics to determine the optimal query execution plan. If the statistics are outdated, the query optimizer might not choose the best index. Update the statistics using the collStats command:

```javascript
db.products.stats()
```

---

## Submission Guidelines

Submit a document (PDF or text file) containing the following:

1. The code snippets you used for each step
2. The output of the explain() command for each query (before and after creating indexes)
3. A brief explanation of the performance improvements observed after creating each index

**File Naming:** YourName_MongoDBIndexes.pdf (or .txt)

**Submission:** Submit your file via the designated submission platform by the specified deadline.

---

## Notes

- Document all outputs from MongoDB shell
- Compare metrics across different steps
- Provide clear explanations of performance improvements
- Save and organize your work properly
