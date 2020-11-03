import boto3, botocore, base64
from utils.s3_config import S3_KEY, S3_SECRET, S3_BUCKET
from flask_restful import Resource, reqparse, request
from flask_jwt_extended import (
    create_access_token, jwt_required, get_jwt_identity)
import datetime
from models.user_model import UserModel
import json
import random

random.seed(1000)



s3 = boto3.client(
    "s3",
    aws_access_key_id=S3_KEY,
    aws_secret_access_key=S3_SECRET
)
class UserProfileImageUpload(Resource):
    @jwt_required
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('img',
                            help='This field cannot be blank', required=True)
        parser.add_argument('id',
                            help='This field cannot be blank', required=True)
        data = parser.parse_args()
        img64 = data["img"]
        userId = data['id']
        #get bucket location
        location = s3.get_bucket_location(Bucket=S3_BUCKET)['LocationConstraint']
        s3_url = "https://%s.s3-%s.amazonaws.com/" % (S3_BUCKET,location)
        delete_profile_img(userId, s3_url)
        imgName = userId+'-'+str(random.randint(0, 100000))+'.png'
        s3.put_object(Body=base64.b64decode(img64), Bucket=S3_BUCKET, Key=imgName)
        
        #get object url
        object_url = s3_url + imgName
        UserModel.update_profile_img(get_jwt_identity(), object_url)

        json = {
            "img": object_url
        }
        try:
            return json, 201
        except:
            return{'error': 'Something went wrong'}, 500

def delete_profile_img(userId,s3_url):
    oldImg= UserModel.get_profile_img(userId)
    print("oldImg")
    print(oldImg)
    if oldImg is None or " ":
        return
    oldKey = oldImg.split(s3_url)[1] 
    s3.delete_object( Bucket=S3_BUCKET, Key=oldKey)