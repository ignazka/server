const express = require('express');
const cors = require('cors');
const { ORIGIN } = process.env;

function middlewares(app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cors({
      credentials: true,
      origin: ORIGIN,
    })
  );
}

module.exports = middlewares;
