from db import db


class TodoModel(db.Model):
    __tablename__ = 'Todo'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(500), nullable=False)
    color = db.Column(db.String(500), nullable=True)
    is_completed = db.Column(db.Boolean, default=False, nullable=False)
    bucket_id = db.Column(db.Integer, db.ForeignKey('Bucket.id',ondelete="CASCADE"), nullable=False)

    def __init__(self, name, color, is_completed, bucket_id):
        self.name = name
        self.color = color
        self.is_completed = is_completed
        self.bucket_id = bucket_id

    @classmethod
    def get_all_todo(cls):
        bm = cls.query.all()
        s = []
        for i in bm:
            d = dict()
            d["name"] = i.name
            d["color"] = i.color
            d["id"] = i.id
            d["is_completed"] = i.is_completed
            d["bucket_id"] = i.bucket_id
            s.append(d)
        return s

    @classmethod
    def insert_todo(cls, name, color, is_completed, bucket_id):
        bm = cls(name, color, is_completed, bucket_id)
        db.session.add(bm)
        db.session.commit()

    @classmethod
    def get_todo_by_id(cls, id):
        bm = cls.query.filter_by(id=id).first()
        s = []
        d = dict()
        d["name"] = bm.name
        d["color"] = bm.color
        d["id"] = bm.id
        d["is_completed"] = bm.is_completed
        d["bucket_id"] = bm.bucket_id
        s.append(d)
        return s

    @classmethod
    def get_todo_by_bucketid(cls, bucket_id):
        bm = cls.query.filter_by(bucket_id = bucket_id)
        s = []
        for i in bm:
            d = dict()
            d["name"] = i.name
            d["color"] = i.color
            d["id"] = i.id
            d["is_completed"] = i.is_completed
            d["bucket_id"] = i.bucket_id
            s.append(d)
        return s

    @classmethod
    def delete_todo_by_id(cls, id):
        bm = cls.query.filter_by(id=id).delete()
        db.session.commit()

    @classmethod
    def update_todo(cls, id, name, color, bucket_id):
        bm = cls.query.filter_by(id=id).first()
        bm.name = name
        bm.color = color
        bm.bucket_id = bucket_id
        db.session.commit()

    @classmethod
    def update_todo_completed_by_id(cls, id, is_completed):
        bm = cls.query.filter_by(id=id).first()
        bm.is_completed = is_completed
        db.session.commit()

    def __repr__(self):
        return '<Todo %r>' % self.name


class BucketModel(db.Model):
    __tablename__ = 'Bucket'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(500), nullable=False)
    color = db.Column(db.String(500), nullable=True)

    def __init__(self, name, color):
        self.name = name
        self.color = color

    @classmethod
    def get_all_buckets(cls):
        bm = cls.query.all()
        s = []
        for i in bm:
            d = dict()
            d["name"] = i.name
            d["color"] = i.color
            d["id"] = i.id
            s.append(d)
        return s

    @classmethod
    def insert_bucket(cls, name, color):
        bm = cls(name, color)
        db.session.add(bm)
        db.session.commit()

    @classmethod
    def get_bracket_by_id(cls, id):
        bm = cls.query.filter_by(id=id).first()
        s = []
        d = dict()
        d["name"] = bm.name
        d["color"] = bm.color
        d["id"] = bm.id
        s.append(d)
        return s

    @classmethod
    def delete_bracket_by_id(cls, id):
        bm = cls.query.filter_by(id=id).delete()
        db.session.commit()

    @classmethod
    def update_bucket(cls, id, name):
        bm = cls.query.filter_by(id=id).first()
        bm.name = name
        db.session.commit()

    def __repr__(self):
        return '<Bucket %r>' % self.name