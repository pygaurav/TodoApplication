from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api, Resource
from models.models import BucketModel, TodoModel
from resources.BucketResource import BucketResource
from resources.TodoResource import TodoResource, TodoListResource, TodoBucketResource
app = Flask(__name__)
api = Api(app)
# Pushing the connection string to the GITHUB
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://dgejaayanxmeav:e6b1864a368e0fbfe6db645112ad00e1f3b0361d3f4c79dfb9d1d535f1d13cc5@ec2-52-2-82-109.compute-1.amazonaws.com:5432/ddlod931h2fbsk'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
from flask_cors import CORS
db = SQLAlchemy(app)
CORS(app)

@app.before_first_request
def create_tables():
    db.create_all()


api.add_resource(BucketResource, "/bucket", "/bucket/<int:id>")
api.add_resource(TodoResource, "/todo", "/todo/<int:id>")
api.add_resource(TodoListResource, "/todos", "/todos/<int:id>")
api.add_resource(TodoBucketResource, "/todobucket/<int:bucket_id>")

if __name__ == "__main__":
    from db import db
    db.init_app(app)
	app.run(port=5000)
