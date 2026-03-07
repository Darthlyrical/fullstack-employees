import db from "#db/client";
import { createEmployee } from "./queries/employees.js";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  const employees = [
  { name: "Avery Carter", birthday: "1991-04-12", salary: 72000 },
  { name: "Jordan Lee", birthday: "1988-09-03", salary: 86000 },
  { name: "Morgan Patel", birthday: "1994-01-27", salary: 64000 },
  { name: "Riley Nguyen", birthday: "1990-07-19", salary: 78000 },
  { name: "Casey Brooks", birthday: "1996-11-08", salary: 59000 },
  { name: "Taylor Ramirez", birthday: "1987-02-14", salary: 91000 },
  { name: "Jamie Foster", birthday: "1993-05-30", salary: 70000 },
  { name: "Cameron Diaz", birthday: "1989-12-22", salary: 83000 },
  { name: "Drew Kim", birthday: "1995-03-16", salary: 62000 },
  { name: "Quinn Walker", birthday: "1992-08-25", salary: 75000 }
];

for ( const employee of employees){
  await createEmployee(employee);
}

}
