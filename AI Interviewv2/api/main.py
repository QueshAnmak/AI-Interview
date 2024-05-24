from flask import Flask, request
from flask_cors import CORS, cross_origin
import palmaiv2 as palmai


# Flask constructor takes the name of
# current module (__name__) as argument.
app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"


# The route() function of the Flask class is a decorator,
# which tells the application which URL should call
# the associated function.
@app.route("/")
# ‘/’ URL is bound with hello_world() function.
@cross_origin()
def hello_world():
    return "Hello World"


@app.route("/think", methods=["POST"])
@cross_origin()
def think():
    response = palmai.think(request.json["user_message"])
    print("response", response)
    return response

@app.route("/pdf-upload", methods=["POST"])
@cross_origin()
def pdf_upload():
    response = palmai.pdf_upload(request.files["file"], request.form["document_type"])
    return response

@app.route("/restart", methods=["GET"])
@cross_origin()
def restart():
    palmai.restart()
    return {"status":"restarted"}


# main driver function
if __name__ == "__main__":
    # run() method of Flask class runs the application
    # on the local development server.
    app.run()
