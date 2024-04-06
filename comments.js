// Create web server
// Run server
// Listen for requests
// Send response
// Handle requests
// Read file
// Write file
// Delete file
// Update file
// CRUD operations

// Import modules
const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');
const path = require('path');

// Create server
const server = http.createServer((req, res) => {
    // Get request URL
    const parsedUrl = url.parse(req.url);
    // Get query string
    const query = querystring.parse(parsedUrl.query);
    // Get method
    const method = req.method;
    // Get path
    const pathName = parsedUrl.pathname;
    // Get headers
    const headers = req.headers;

    // Check if request method is GET
    if (method === 'GET') {
        // Check if path is '/comments'
        if (pathName === '/comments') {
            // Read comments file
            fs.readFile(path.join(__dirname, 'comments.json'), 'utf8', (err, data) => {
                // Check if error occurred
                if (err) {
                    // Send error response
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Server error' }));
                    return;
                }

                // Send response
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(data);
            });
            return;
        }
    }

    // Check if request method is POST
    if (method === 'POST') {
        // Check if path is '/comments'
        if (pathName === '/comments') {
            // Read data from request
            let body = '';
            req.on('data', (chunk) => {
                body += chunk;
            });

            // When request ends
            req.on('end', () => {
                // Parse data
                const data = JSON.parse(body);
                // Read comments file
                fs.readFile(path.join(__dirname, 'comments.json'), 'utf8', (err, comments) => {
                    // Check if error occurred
                    if (err) {
                        // Send error response
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: 'Server error' }));
                        return;
                    }

                    // Parse