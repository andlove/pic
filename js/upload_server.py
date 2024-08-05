import os
import cgi
from http.server import HTTPServer, BaseHTTPRequestHandler


class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()
        # Create an HTML form for uploading files
        html = """
        <html>
        <head>
            <title>Upload File</title>
        </head>
        <body>
            <h1>Upload File</h1>
            <form enctype="multipart/form-data" method="post">
                <input type="file" name="file" />
                <input type="submit" value="Upload" />
            </form>
        </body>
        </html>
        """
        self.wfile.write(html.encode("utf-8"))

    def do_POST(self):
        # Parse form data
        form = cgi.FieldStorage(
            fp=self.rfile,
            headers=self.headers,
            environ={"REQUEST_METHOD": "POST", "CONTENT_TYPE": self.headers["Content-Type"]},
        )
        
        # Get the uploaded file
        file_item = form["file"]
        
        # If file was uploaded
        if file_item.filename:
            # Strip leading path from file name to avoid directory traversal attacks
            filename = os.path.basename(file_item.filename)
            with open(filename, "wb") as f:
                f.write(file_item.file.read())
            
            self.send_response(200)
            self.send_header("Content-type", "text/html")
            self.end_headers()
            response = f"<html><body><h1>File '{filename}' uploaded successfully.</h1></body></html>"
            self.wfile.write(response.encode("utf-8"))
        else:
            self.send_response(400)
            self.end_headers()
            response = "<html><body><h1>No file was uploaded.</h1></body></html>"
            self.wfile.write(response.encode("utf-8"))


def run(server_class=HTTPServer, handler_class=SimpleHTTPRequestHandler, port=8000):
    server_address = ("", port)
    httpd = server_class(server_address, handler_class)
    print(f"Starting httpd server on port {port}...")
    httpd.serve_forever()


if __name__ == "__main__":
    run()
