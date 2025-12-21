<<<<<<< HEAD
import os
=======
>>>>>>> c22b090bf49e5b565a8ec580405f2549985ac3ca
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
<<<<<<< HEAD
=======
import os
>>>>>>> c22b090bf49e5b565a8ec580405f2549985ac3ca

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

<<<<<<< HEAD
# Safety check: ensure DATABASE_URL isn't empty
if DATABASE_URL is None:
    raise ValueError("DATABASE_URL not found. Check if your .env file exists and is in the correct directory.")

=======
>>>>>>> c22b090bf49e5b565a8ec580405f2549985ac3ca
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
<<<<<<< HEAD
        db.close()
=======
        db.close()
>>>>>>> c22b090bf49e5b565a8ec580405f2549985ac3ca
