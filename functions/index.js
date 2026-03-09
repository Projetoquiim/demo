/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/https");
const logger = require("firebase-functions/logger");

const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const admin = require("firebase-admin");
const storage = require("firebase-admin");

const app = express();
//usado para chamar arquivos html, por exemplo...
const path = require('path');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

admin.initializeApp();

const db = admin.firestore();

const foto = ref(storage, "arquivos/0001.png");

require('dotenv').config();

// 1. Configurar CORS (Permitir requisições de outras origens, se necessário)
app.use(cors({ origin: true }));

// Middleware para usar variáveis de ambiente
app.get("/hello", (req, res) => {
  res.send("hello world7");
});

//app.get("/Escolar", (req, res) => {
      /* res.sendFile(path.join(__dirname, "../public/pqEscolar.html")); */
      /* res.sendFile(path.join(__dirname, /public/pqEscolar.html")); */
      //res.sendFile(path.join(__dirname, "../public", "pqEscolar.html"));
//});

app.get("/Lista", async (req, res) => {
  // Exemplo: buscar dados do Firestore
 const snapshot = await db.collection("pqAluno").get();
 const dados = snapshot.docs.map(doc => doc.data());
  // Renderizar o arquivo views/index.ejs
 res.render("index", { dados: dados });

/* const usuario = {
        nome: 'João', idade: 25, admin: true
    };
    // Passando o objeto 'usuario' para o arquivo 'index.ejs'
    res.render('index', { usuario: usuario });
 */
});

app.get("/Escolar", async (req, res) => {
  // Exemplo: buscar dados do Firestore
 const snapshot = await db.collection("pqAluno").get();
 const dados = snapshot.docs.map(doc => doc.data());
  // Renderizar o arquivo views/index.ejs
 res.render("pqEscolar", { dados: dados });

/* const usuario = {
        nome: 'João', idade: 25, admin: true
    };
    // Passando o objeto 'usuario' para o arquivo 'index.ejs'
    res.render('index', { usuario: usuario });
 */
});
app.get("/Notas", async (req, res) => {
  // Exemplo: buscar dados do Firestore
 const snapshot = await db.collection("notas").get();
 const notas = snapshot.docs.map(doc => doc.data());
  // Renderizar o arquivo views/index.ejs
 res.render("notas", { notas: notas });

/* const usuario = {
        nome: 'João', idade: 25, admin: true
    };
    // Passando o objeto 'usuario' para o arquivo 'index.ejs'
    res.render('index', { usuario: usuario });
 */
});


app.get('/teste', async (req, res) => {
  // Exemplo: buscar dados do Firestore
 const snapshot = await db.collection("pqAluno").get();
 const dados = snapshot.docs.map(doc => doc.data());
 /* dados.forEach((doc) => {
    // doc.data() contém os dados, doc.id contém o ID do documento
    console.log(`${doc.id} =>`, doc.data());
  });  */
 // Renderizar o arquivo views/index.ejs
 res.render("index", { dados: dados });
});

// 2. Exportar a app Express como uma function Firebase
exports.app = functions.https.onRequest(app);



setGlobalOptions({ maxInstances: 10 });
