from fastapi import APIRouter, File, UploadFile
from datetime import timedelta
from fastapi.responses import StreamingResponse, JSONResponse
from io import BytesIO
from minio import Minio

import os
from dotenv import load_dotenv
load_dotenv()

# - - - - -
router = APIRouter(prefix='/minio', tags=['MINIO'])
# - - - - -

minio_client = Minio( endpoint=os.getenv('MINIO_URL'), access_key=os.getenv('MINIO_ACCESS_KEY'), secret_key=os.getenv('MINIO_SECRET'), secure=False )


@router.get('/buckets')
async def list_buckets():
	try:
		buckets = minio_client.list_buckets()
		return [bucket.name for bucket in buckets]
	except Exception as e:
		return {"error": str(e)}
	

@router.get('/presigned-url/{bucket}/{doc_id}/{filename}')
async def get_presigned_url(bucket: str, doc_id: str, filename: str):
	object_name = f'{doc_id}/{filename}'
	try:
		url = minio_client.presigned_get_object( bucket_name=bucket, object_name=object_name, expires=timedelta(minutes=10) )
		return {'url': url}
	except Exception as e:
		return {'error': str(e)}