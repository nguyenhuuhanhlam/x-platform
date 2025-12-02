import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
SECOND_DATABASE_URL = os.getenv("SECOND_DATABASE_URL")

SECRET_KEY = os.getenv( "SECRET_KEY", "F412BCA5494899923737A9759BE98")  # 256-bit WEP Keys
