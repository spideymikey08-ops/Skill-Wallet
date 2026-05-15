# Analyzing Index Performance Impact

**Name:** LastName, FirstName

**Student ID:** [Your Student ID]

## Introduction

This lab explores the performance impact of database indexes using a MySQL-style example. The goal is to demonstrate how indexes reduce the amount of data scanned during queries, how to compare execution times with and without indexes, and how to inspect query execution plans to confirm index usage.

## Procedure

1. Created the database and selected it:

```sql
CREATE DATABASE index_performance_lab;
USE index_performance_lab;
```

2. Created the `users` table with an integer primary key and user information columns:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

3. Populated the table with a large number of rows using a stored procedure:

```sql
DELIMITER //
CREATE PROCEDURE insert_users(IN num_rows INT)
BEGIN
  DECLARE i INT DEFAULT 1;
  WHILE i <= num_rows DO
    INSERT INTO users (username, email)
    VALUES (CONCAT('user', i), CONCAT('user', i, '@example.com'));
    SET i = i + 1;
  END WHILE;
END //
DELIMITER ;
CALL insert_users(100000);
```

4. Verified data insertion:

```sql
SELECT COUNT(*) FROM users;
```

5. Executed the baseline query without an index:

```sql
SELECT * FROM users WHERE username = 'user50000';
```

6. Inspected the execution plan without an index:

```sql
EXPLAIN SELECT * FROM users WHERE username = 'user50000';
```

7. Created an index on the `username` column:

```sql
CREATE INDEX idx_username ON users (username);
```

8. Ran the same query again with the index in place:

```sql
SELECT * FROM users WHERE username = 'user50000';
```

9. Inspected the execution plan with the index:

```sql
EXPLAIN SELECT * FROM users WHERE username = 'user50000';
```

10. Tested additional queries and index behavior with patterns:

```sql
SELECT * FROM users WHERE username LIKE 'user5%';
EXPLAIN SELECT * FROM users WHERE username LIKE 'user5%';

SELECT * FROM users WHERE id > 50000;
EXPLAIN SELECT * FROM users WHERE id > 50000;
```

11. Optional cleanup:

```sql
DROP TABLE users;
DROP DATABASE index_performance_lab;
```

## Results

- `SELECT COUNT(*) FROM users;` should return `100000`.
- The unindexed query should show a full table scan (`type: ALL`) in the `EXPLAIN` plan.
- The indexed query should show index usage (`key: idx_username` and `type: ref`, `eq_ref`, or similar).
- The indexed query should execute significantly faster than the unindexed query on a dataset of this size.

## Analysis

- Without an index, MySQL must scan every row in `users` to find the matching username, causing high query execution cost.
- Creating `idx_username` enables the database to locate the target row directly using the index structure, greatly reducing scanned rows.
- The execution plan change from `ALL` to `ref` or `eq_ref` confirms that the index is being used.
- For `LIKE 'user5%'`, the index can still be used because the pattern begins with a fixed prefix. For `LIKE '%user5'`, the index would not be useful because the pattern does not start with a fixed prefix.
- A range query on `id` such as `id > 50000` can use the primary key index, making it efficient without an additional index.

## Conclusion

This lab shows that indexes are essential for improving query performance when searching by frequently queried columns. Indexes reduce the amount of data scanned and are especially valuable on large tables. However, indexes also carry maintenance overhead for inserts and updates, so they should be created only for columns that are used often in search or join conditions.

## Optional Findings

- An index on `id` is already provided by the primary key, so queries filtering by `id` naturally benefit from index lookup.
- Indexes are most effective for equality searches and prefix-based pattern matching.

---

*File created for the lab report. Replace placeholders with your actual name and student ID before submission.*
