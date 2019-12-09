import express from "express";
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {ServerStyleSheet, StyleSheetManager} from "styled-components";
import template from './src/template';
import {App} from "./src/components/App";

export default () => {

    let router = express.Router();

    router.get('/', (request, response) => {
        const sheet = new ServerStyleSheet();
        const body = ReactDOMServer.renderToString(
            <StyleSheetManager sheet={sheet.instance}>
                <App/>
            </StyleSheetManager>
        );
        const styleTags = sheet.getStyleTags();
        response.send(template(body, styleTags));
        sheet.seal();
    });

    return router;

};