CREATE TABLE IF NOT EXISTS Tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  dueDate DATE,
  priority ENUM('Low', 'Medium', 'High') DEFAULT 'Low'
);
