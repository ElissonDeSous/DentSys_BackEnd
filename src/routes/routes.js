import { Router } from "express";
import Usuarios from "../controller/users/userController.js";
import AuthUsuarios from "../controller/users/authUsuarioController.js";
import detalhesDoUsuario from "../controller/users/detalhesUsuario.js";
import appointments from "../controller/appointments/appointmentsController.js";
import createEmployee from "../controller/employee/createEmployee.js";
import authEmployee from "../controller/employee/authEmployee.js";
import detalhesFuncionario from "../controller/employee/detalhesFuncionario.js";
import { AutenticadoCliente, AutenticadoFuncionario } from "../middwares/Autenticado.js";

const users = new Usuarios();
const auth = new AuthUsuarios();
const detalhes = new detalhesDoUsuario();
const Agendamentos = new appointments();
const employee = new createEmployee()
const autenticar = new authEmployee()
const funcionarioInfo = new detalhesFuncionario()
const rotas = Router();

// criar Usuarios
rotas.get('/users', users.buscarUsuarios);
rotas.post('/users', users.criarUsuarios);

//autenticar usuarios
rotas.post('/session',auth.auth)
rotas.get('/detalhes',AutenticadoCliente,detalhes.detalhesDoUsuario)

// agendar consultas
rotas.get('/agendar',AutenticadoCliente,Agendamentos.read)
rotas.post('/agendar',AutenticadoCliente,Agendamentos.create)


// criar funcionarios
rotas.post('/employeer', employee.create)


rotas.post('/sessionEmployeer', autenticar.auth)

rotas.get('/detalhesFuncionario', AutenticadoFuncionario,funcionarioInfo.detalhess)



export default rotas

