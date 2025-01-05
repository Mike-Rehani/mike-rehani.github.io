# import flast module
from flask import Flask,jsonify

# instance of flask application
app = Flask(__name__)

# home route that returns below text when root url is accessed
@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/test")
def test():
    data = {'key': 'value'}
    return jsonify(data)

if __name__ == '__main__':  
   app.run()  
