export default body => {
    return `<!DOCTYPE html>` +
        `<html lang="ru">` +
			`<head>` +
				`<meta http-equiv="Content-Type" content="text/html; charset=utf-8">` +
				`<meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, shrink-to-fit=no">` +
				`<title>Плотность населения субъектов Российской Федерации</title>` +
			`</head>` +
			`<body>` +
				`<div id="root">${body}</div>` +
				`<script src="/js/bundle.js"></script>` +
			`</body>` +
        `</html>`;
};