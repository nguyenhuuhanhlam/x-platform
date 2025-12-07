import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from contextlib import asynccontextmanager
from sqlalchemy.orm import DeclarativeBase
from app.db.session import engine

from app.api.v1.endpoints.routers import cfm_router
from app.api.v1.endpoints.routers import hrm_router


class Base(DeclarativeBase):
	pass


@asynccontextmanager
async def lifespan(app: FastAPI):
	print("--- The application has started.")
	async with engine.begin() as conn:
		await conn.run_sync(Base.metadata.create_all)
	yield
	print("--- The application has exited.")


app = FastAPI(lifespan=lifespan)
app.add_middleware(GZipMiddleware, minimum_size=1024)
app.add_middleware(
	CORSMiddleware,
	allow_origins=["*"],
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)

app.include_router(cfm_router)
app.include_router(hrm_router)

if __name__ == "__main__":
	uvicorn.run('app.main:app', host="127.0.0.1", port=8000)