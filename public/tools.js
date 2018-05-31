function row() {
	return $('<div/>').addClass('row');
}

function cell(span) {
	return $('<div/>').addClass('col-md-' + span);
}

function card(body, heading, style, span) {
	var c = $('<div/>').addClass('card card-' + (style === undefined ? 'default' : style));
	c.append($('<div/>').addClass('card-body')
		.append($('<h3/>').addClass('card-title').append(heading))
		.append(body));
	if (span) return cell(span).append(c);
	return c;
}
