import express from "express";
import * as queries from '../db/queries/employees.js';
import e from "express";
const router = express.Router();
export default router;


router.get('/', async (req, res) => {
    const employees = await queries.getEmployees();
    res.send(employees);
});

router.post('/', async (req, res) => {
    if (!req.body) return res.status(400).send('There was no body provided in your request.');

    const required = ['name', 'birthday', 'salary']
    const missing = required.filter((field) => req.body?.[field] == null);

    if (missing.length) {
        return res.status(400).send(`Missing required field(s): ${missing.join(", ")}`);
    }
    res.status(201).send(await queries.createEmployee(req.body));
})

router.get('/:id', async (req, res) => {
    const employee = await queries.getEmployee(Number(req.params.id));
    if (!employee) return res.status(404).send('Employee ID does not exist.');

    res.send(employee);
})

router.delete('/:id', async (req, res) => {
    const employee = await queries.deleteEmployee(req.params.id);

    if (!employee) return res.status(404).send('Unable to delete from database.');
    res.status(204).send(employee);
})

router.put('/:id', async (req, res) => {
    if (!req.body) return res.status(400).send('There was no body provided in your request.');

    const required = ['id', 'name', 'birthday', 'salary'];
    const missing = required.filter((field) => req.body?.[field] == null);

    if(missing.length){
        return res.status(400).send(`Missing required field(s): ${missing.join(", ")}`);
    }
    const employee = await queries.updateEmployee(req.body);
    if (!employee) return res.status(404).send('The employee you are trying to update does not exist in the database.')
    res.status(200).send(employee);
})

