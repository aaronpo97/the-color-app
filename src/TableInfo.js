const TableInfo = props => {
	return (
		<tr>
			<td className="two wide column">{props.header}</td>
			<td>{props.info}</td>
		</tr>
	);
};

export default TableInfo;
