from flask_restful import Resource
from flask import jsonify,request
from models.models import TodoModel


class TodoListResource(Resource):
    def get(self):
        s = TodoModel.get_all_todo()
        return jsonify({"data": s})

    def put(self):
        data = request.get_json()
        name = data.get('name')
        color = data.get('color')
        id = data.get('id')
        bucket_id = data.get('bucket_id')
        TodoModel.update_todo(id, name, color, bucket_id)
        return jsonify({"data": "Updated Successfully"})


class TodoBucketResource(Resource):
    def get(self, bucket_id):
        s = TodoModel.get_todo_by_bucketid(bucket_id)
        return jsonify({"data": s})


class TodoResource(Resource):
    def get(self, id):
        s = TodoModel.get_todo_by_id(id)
        return jsonify({"data": s})

    def post(self):
        data = request.get_json()
        name = data.get('name')
        color = data.get('color')
        is_completed = data.get('is_completed')
        bucket_id = data.get('bucket_id')
        TodoModel.insert_todo(name, color, is_completed, bucket_id)
        return jsonify({"data": "Inserted Successfully"})

    def delete(self, id):
        s = TodoModel.delete_todo_by_id(id)
        return jsonify({"data": "Deleted Successfully"})

    def put(self):
        data = request.get_json()
        id = data.get('id')
        is_completed = data.get("is_completed")
        TodoModel.update_todo_completed_by_id(id, is_completed)
        return jsonify({"data": "Updated Successfully"})


