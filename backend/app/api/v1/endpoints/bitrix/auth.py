from fastapi import Request, APIRouter, HTTPException
from fastapi.responses import RedirectResponse
import httpx
import os

# - - - - -
router = APIRouter(prefix='/bitrix', tags=['BITRIX'])
# - - - - -


@router.post('/auth')
async def bitrix_auth(request: Request):
    data = await request.json()
    code = data.get("code")
    domain = data.get("domain")

    if not code or not domain:
        raise HTTPException(status_code=400, detail="Missing code or domain")

    async with httpx.AsyncClient() as client:
        try:
            # 2. Gửi yêu cầu đổi mã 'code' lấy 'access_token'
            # Bitrix yêu cầu các tham số này để xác thực ứng dụng
            token_params = {
                "grant_type": "authorization_code",
                "client_id": os.getenv('BITRIX_CLIENT_ID'),
                "client_secret": os.getenv('BITRIX_CLIENT_SECRET'),
                "code": code
            }

            token_url = "https://oauth.bitrix.info/oauth/token/"
            token_res = await client.get(token_url, params=token_params)
            token_data = token_res.json()

            if "error" in token_data:
                raise HTTPException(
                    status_code=401, 
                    detail=token_data.get("error_description", "Bitrix authentication failed")
                )
            
            # 3. (Tùy chọn) Lấy thêm thông tin User hiện tại để xác nhận danh tính
            # Việc này giúp tận dụng User đã có trên Bitrix
            access_token = token_data.get("access_token")
            user_res = await client.get(
                f"https://{domain}/rest/user.current.json", 
                params={"auth": access_token}
            )
            user_info = user_res.json().get("result")

            # 4. Trả kết quả về cho Frontend React
            return {
                "status": "success",
                "data": {
                    "user": user_info,
                    "access_token": access_token,
                    "refresh_token": token_data.get("refresh_token"),
                    "expires_in": token_data.get("expires_in"),
                    "domain": domain
                }
            }

        except httpx.HTTPError as e:
            raise HTTPException(status_code=502, detail=f"Bitrix API connection error: {str(e)}")