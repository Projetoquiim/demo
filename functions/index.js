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

//usado para chamar arquivos html, por exemplo...
const path = require('path');


require('dotenv').config();

const app = express();

// 1. Configurar CORS (Permitir requisições de outras origens, se necessário)
app.use(cors({ origin: true }));

// Middleware para usar variáveis de ambiente
app.get("/hello", (req, res) => {
  res.send('hello world');
});

app.get("/Escolar", (req, res) => {
      res.sendFile(path.join(__dirname, '../public', 'pqEscolar.html'));
});

app.get("/web", (req, res) => {
  res.send('Outra rota . . .');
});

// 2. Exportar a app Express como uma function Firebase
exports.app = functions.https.onRequest(app);



setGlobalOptions({ maxInstances: 10 });
