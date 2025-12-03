import re
from datetime import timedelta, datetime, date
import calendar
from typing import Dict, Any


# - - - - -
def increment_badge_id(s: str) -> str:
	if not s:
		return 'NONE0000'

	match = re.match(r"([A-Za-z]*)(\d+)$", s)
	if not match:
		return 'NONE0000'

	prefix, number = match.groups()
	incremented_number = int(number) + 1
	new_number = str(incremented_number).zfill(len(number))
	return prefix + new_number


# - - - - -
def build_sql_payload(sql: str, data: dict, default=None) -> Dict[str, Any]:
	fields = set(re.findall(r":(\w+)", sql))
	return {f: data.get(f, default) for f in fields}

# - - - - -
def add_returning(sql: str, *fields: str) -> str:
	if "returning" in sql.lower():
		return sql
	return sql.strip() + "\nRETURNING " + ", ".join(fields)


# - - - - -
def generate_upsert_sql(table_name: str, data: dict, upsert: bool = False) -> str:
	columns = ', '.join(data.keys())
	placeholders = ', '.join([f':{key}' for key in data.keys()])
	
	sql = f'''
		INSERT INTO {table_name}
		({columns})
		VALUES ({placeholders})
	'''

	if upsert:
		update_clause = ', '.join([f"{key} = VALUES({key})" for key in data.keys()])
		sql += f"\nON DUPLICATE KEY UPDATE {update_clause}"

	return sql


# - - - - -
def parse_iso_date(date_str):
	return datetime.fromisoformat(date_str.replace("Z", "+00:00")).date()


# - - - - -
def get_weekday_dates(start_date, end_date): 
	if start_date > end_date:
		raise ValueError('ERR: START > END')

	all_dates = []
	weekday_dates = []

	for i in range((end_date - start_date).days + 1):
		current_date = start_date + timedelta(days=i)
		formatted_date = {
			'date': current_date.strftime('%Y-%m-%d'),
			'day_name': current_date.strftime('%a')
		}
		all_dates.append(formatted_date)

		if current_date.weekday() not in (5, 6):  # 5: Saturday, 6: Sunday
			weekday_dates.append(formatted_date)

	return all_dates, weekday_dates


# - - - - -
def get_weekday_count_in_month(start_date):
	year = start_date.year
	month = start_date.month

	start_of_month = date(year, month, 1)
	last_day = calendar.monthrange(year, month)[1]
	end_of_month = date(year, month, last_day)

	weekday_count = 0

	for i in range((end_of_month - start_of_month).days + 1):
		current_date = start_of_month + timedelta(days=i)
		if current_date.weekday() < 5:  # Monday–Friday
			weekday_count += 1

	return weekday_count