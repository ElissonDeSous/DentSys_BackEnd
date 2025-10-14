import { Router } from "express";
import Usuarios from "../controller/users/userController.js";
import AuthUsuarios from "../controller/users/authUsuarioController.js";
import detalhesDoUsuario from "../controller/users/detalhesUsuario.js";
import appointments from "../controller/appointments/appointmentsController.js";
import createEmployee from "../controller/employee/createEmployee.js";
import { Autenticado } from "../middwares/Autenticado.js";

const users = new Usuarios();
const auth = new AuthUsuarios();
const detalhes = new detalhesDoUsuario();
const Agendamentos = new appointments();
const employee = new createEmployee()
const rotas = Router();

rotas.get('/users', users.buscarUsuarios);
rotas.post('/users', users.criarUsuarios);

rotas.post('/session',auth.auth)
rotas.get('/detalhes',Autenticado,detalhes.detalhesDoUsuario)

rotas.get('/agendar',Autenticado,Agendamentos.read)
rotas.post('/agendar',Autenticado,Agendamentos.create)

rotas.post('/employeer', employee.create)



export default rotas

