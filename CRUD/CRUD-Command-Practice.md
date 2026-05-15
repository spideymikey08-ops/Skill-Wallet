# MongoDB CRUD Command Practice (mongosh)

This practice walks through CRUD using the MongoDB shell (`mongosh`).

---

## Step 0: Database Setup

### 0.1 Start MongoDB Shell

```bash
mongosh
```

### 0.2 Create / Switch Database

```javascript
use crudPracticeDB
```

> Tip (evidence of DB creation): After running `use`, `mongosh` will set the active database. MongoDB will materialize the database/collection once you insert documents.

### 0.3 Collection Setup (create by first insert)

Create a collection named `items` implicitly by inserting documents later.

---

## Evidence Check (recommended before starting CRUD)

Run these two commands so your notes show database + collection exist:

```javascript
// Show current database
db

// Confirm collection is present after inserts (initially may be empty/not created yet)
show collections
```


---

## Step 1: Reset / Cleanup (Start Fresh)

Drop the `items` collection so the practice starts from a clean state.

```javascript
db.items.drop()
```

Verify it’s empty/removed:

```javascript
db.items.find()
```

---

## Step 2: Create Operation (Insert Commands)

### 2.1 Insert Single Document

```javascript
db.items.insertOne({
  title: "Learn MongoDB",
  description: "Practice CRUD operations",
  status: "pending"
})
```

### 2.2 Insert Multiple Documents

```javascript
db.items.insertMany([
  { title: "Task 1", status: "pending" },
  { title: "Task 2", status: "completed" }
])
```

---

## Step 3: Read Operation (Query Commands)

### 3.1 Fetch All Documents

```javascript
db.items.find()
```

### 3.2 Fetch with Condition

Fetch only documents whose status is `pending`:

```javascript
db.items.find({ status: "pending" })
```

### 3.3 Fetch Single Document

Fetch one document by title:

```javascript
db.items.findOne({ title: "Task 1" })
```

---

## Step 4: Update Operation

### 4.1 Update One Document

Mark `Task 1` as completed:

```javascript
db.items.updateOne(
  { title: "Task 1" },
  { $set: { status: "completed" } }
)
```

### 4.2 Update Multiple Documents

Set priority for all pending items:

```javascript
db.items.updateMany(
  { status: "pending" },
  { $set: { priority: "high" } }
)
```

---

## Step 5: Delete Operation

### 5.1 Delete One Document

Delete the document for `Task 2`:

```javascript
db.items.deleteOne({ title: "Task 2" })
```

### 5.2 Delete Multiple Documents

Delete all documents whose status is `completed`:

```javascript
db.items.deleteMany({ status: "completed" })
```

---

## Step 6: Final Testing & Cleanup

Run the commands in this order to verify each operation is working.

### 6.1 Insert data
- Run **Step 2** (insertOne + insertMany)

### 6.2 Query data
- Run **Step 3** (find / find with condition / findOne)

### 6.3 Update fields
- Run **Step 4** (updateOne + updateMany)
- Re-check results:

```javascript
db.items.find()
```

### 6.4 Delete records
- Run **Step 5** (deleteOne + deleteMany)
- Verify final contents:

```javascript
db.items.find()
```

### 6.5 Optional final cleanup (drop entire collection)

```javascript
db.items.drop()
```

---

## Notes (Tips)
- `find()` shows all matching documents.
- `findOne()` returns only the first match.
- `updateOne()` affects only one document (first match).
- `updateMany()` affects all matching documents.
- `deleteOne()` deletes one matching document.
- `deleteMany()` deletes all matching documents.
