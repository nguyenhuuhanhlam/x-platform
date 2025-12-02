from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from app.db.config import DATABASE_URL, SECOND_DATABASE_URL


# HRM
engine = create_async_engine(DATABASE_URL, echo=True)
session_local = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


# CRM / CFM
second_engine = create_async_engine(SECOND_DATABASE_URL, echo=True)
second_session_local = async_sessionmaker(second_engine, class_=AsyncSession, expire_on_commit=False)


async def get_db():
	async with session_local() as session:
		try:
			yield session
		finally:
			await session.close()


async def second_get_db():
	async with second_session_local() as session:
		try:
			yield session
		finally:
			await session.close()