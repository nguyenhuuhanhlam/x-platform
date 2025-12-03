from fastapi import HTTPException

async def handle_exceptions(func, *args, **kwargs):
	try:
		return await func(*args, **kwargs)
	except Exception as e:
		raise HTTPException(status_code=500, detail=str(e))