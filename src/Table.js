const Table = props => {
	return (
		<table className="ui definition table">
			<tbody>{props.children}</tbody>
		</table>
	);
};

export default Table;
