import db from "#db/client";


/** @returns the employee created according to the provided details */
export async function createEmployee({ name, birthday, salary }) {
  const text = `INSERT INTO employees(name, birthday,salary)
  VALUES($1,$2,$3)
  RETURNING *;`;
  const values = [name, birthday, salary];
  const { rows: [employee] } = await db.query(text, values);
  return employee;

}

// === Part 2 ===

/** @returns all employees */
export async function getEmployees() {
  const text = `SELECT * FROM employees;`;
  const { rows: employees } = await db.query(text);
  return employees;
}

/**
 * @returns the employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function getEmployee(id) {
  const parsedId = Number(id);
  if (!Number.isInteger(parsedId) || parsedId < 1) return undefined;

  const text = `SELECT * FROM employees WHERE id = $1;`
  const value = [id];
  const { rows:[employee] } = await db.query(text,value);
  return employee;
}

/**
 * @returns the updated employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function updateEmployee({ id, name, birthday, salary }) { 
  const parsedId = Number(id);
  if (!Number.isInteger(parsedId) || parsedId < 1) return undefined;

  const text = `UPDATE employees 
  Set name = $1,
  birthday = $2,
  salary = $3 
  WHERE id = $4 
  RETURNING *;`;

  const values = [name,birthday,salary,id];
  const { rows:[employee] } = await db.query(text,values);
  return employee;
}

/**
 * @returns the deleted employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function deleteEmployee(id) {
  const parsedId = Number(id);
  if (!Number.isInteger(parsedId) || parsedId < 1) return undefined;

  const text = `DELETE FROM employees WHERE id = $1;`;
  const { rows:[employee] } = await db.query(text,[parsedId]);
  return employee;
}
