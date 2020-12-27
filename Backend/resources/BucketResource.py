from flask_restful import Resource
from flask import jsonify,request
from models.models import BucketModel


class BucketResource(Resource):
    def get(self):
        s = BucketModel.get_all_buckets()
        return jsonify({"data": s})

    def post(self):
        data = request.get_json()
        name = data.get('name')
        color = data.get('color')
        BucketModel.insert_bucket(name, color)
        return jsonify({"data":"Inserted Successfully"})

    def delete(self, id):
        s = BucketModel.delete_bracket_by_id(id)
        return jsonify({"data":"Deleted Successfully"})

    def put(self):
        data = request.get_json()
        name = data.get('name')
        id = data.get('id')
        BucketModel.update_bucket(id, name)
        return jsonify({"data": "Updated Successfully"})


