from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import second_get_db
from app.db.services.cfm.con_projects.projects import (
    get_projects,
    get_project_details,
    post_project,
   #  update_project
)
from app.utils.api import handle_exceptions

# - - - - -
router = APIRouter(prefix='/cfm/con', tags=['CFM-Projects-CON'])
# - - - - -


@router.get('/projects')
async def get__projects(db: AsyncSession = Depends(second_get_db)):
   return await handle_exceptions(get_projects, db)


@router.get('/project/details/{project_id}')
async def get__project_details(project_id: int, db: AsyncSession = Depends(second_get_db)):
   return await handle_exceptions(get_project_details, db, project_id)


@router.post('/project')
async def post__project(data: dict, db: AsyncSession = Depends(second_get_db)):
   return await handle_exceptions(post_project, db, data)
