function row() {
	return $('<div/>').addClass('row');
}

function cell(span) {
	return $('<div/>').addClass('col-md-' + span);
}

function card(body, heading, span) {
	var c = $('<div/>').addClass('card'));
	c.append($('<div/>').addClass('card-body')
		.append($('<h3/>').addClass('card-title').append(heading))
		.append(body));
	if (span) return cell(span).append(c);
	return c;
}
