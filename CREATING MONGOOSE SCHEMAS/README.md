# Mongoose Schemas Lab

This project demonstrates Mongoose schemas for:
1. Basic schema definition
2. Validation (required + min)
3. Default values
4. Schema types + `timestamps`
5. Subdocuments (embedded documents)

## Setup
1. Start MongoDB locally (Mongo shell examples assume `mongodb://127.0.0.1:27017`).
2. Install dependencies:

```bash
npm install
```

## Run
```bash
npm start
```

Console output will show each lab step.

## Verify in MongoDB
Run in the mongo shell:

```js
use mongoose_lab
show collections
db.Product_step1.find().pretty()
db.Product_step2.find().pretty()
db.Product_step3.find().pretty()
db.Product_step4.find().pretty()
db.Product_step5.find().pretty()
```

Notes:
- Step 2 intentionally triggers validation errors.
- Each step uses a unique model name to avoid `OverwriteModelError` while demonstrating different schema definitions in one script.

