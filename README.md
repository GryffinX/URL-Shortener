# 🔗 Node.js URL Shortener Service

This project implements a lightweight URL shortening API using Node.js and the Express framework. It accepts a long URL, generates a unique short code, handles redirection, and tracks the number of times the short link is accessed.

## 🛠️ Project Setup and Installation

Follow these steps to get the API server running locally.

### Prerequisites
 
* Node.js (LTS version recommended)

* npm (Node Package Manager)

### Steps

Clone the Repository (or navigate to your project directory):
```bash
cd url-shortener-api
```


Install Dependencies: This project requires express for the web server and validator for robust URL input checking.
```bash
npm install
```


Run the Application: Start the server using the development script. It will run on port 3000.
```bash
npm start
```


You should see the message: 
```bash
URL Shortener API running on http://localhost:3000
```

## 🚀 API Endpoints

The API supports three main endpoints: shortening, redirection, and analytics.

1. Shorten a URL

* Method:
POST

* Endpoint:
/shorten

* Description:
Accepts a long URL and returns a unique short code and the full short URL.

Request Body (JSON):
```bash
{
  "longUrl": "[https://docs.google.com/document/d/12345/my-very-long-project-report](https://docs.google.com/document/d/12345/my-very-long-project-report)"
}
```


Successful Response (201 Created):
```bash
{
  "shortCode": "abcde1",
  "shortUrl": "http://localhost:3000/abcde1"
}
```

---

2. Redirect Short Code

* Method:
GET

* Endpoint:
/:shortCode

* Description:
Looks up the code, increments the click counter, and issues a 301 (Permanent) redirect to the original URL.

Usage Example:
```bash
GET http://localhost:3000/abcde1
```
---

3. Analytics (Click Tracking)

* Method:
GET

* Endpoint:
/stats/:shortCode

* Description:
Returns the original URL and the total number of times the short link has been clicked/redirected.

Example Response (200 OK):
```bash
{
  "originalUrl": "[https://docs.google.com/document/d/12345/my-very-long-project-report](https://docs.google.com/document/d/12345/my-very-long-project-report)",
  "clicks": 5,
  "code": "abcde1"
}
```



## 💡 Implementation Notes

Storage: Data is currently stored in-memory using a JavaScript object (urlMap). The data will be lost when the server is restarted.

Validation: The input URL is validated using the validator library to ensure it is a properly formatted URL string.

Unique Code Generation: A base-36 random string generator ensures unique, 6-character short codes.

## 🧑‍💻 Author

Ayush Gupta

Feel free to fork, improve, or extend this project!
