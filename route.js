import express from "express";
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import template from './src/template';
import {App} from "./src/components/App";

export default () => {

    let router = express.Router();

    router.get('/', (request, response) => {
        const body = ReactDOMServer.renderToString(<App/>);
        response.send(template(body));
    });

    return router;

};