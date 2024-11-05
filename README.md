## steps for building 

git clone https://github.com/mohanchand201/Detrator-assignment.git
cd Detrator-assignment

* Backend
  ```
  create database detrator ;
  create user testuser identified by 'TestUser@123' ;
  CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `comment` text NOT NULL,
  `timestamp` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
); 

cd backend
npm install 
node server.js

  ```
* Frontend
```
    npm install
    npm run dev
```
==> After that browse http://localhost:3000
