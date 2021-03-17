import { Table } from 'semantic-ui-react';
const TableA = ({ pairs }) => {
	return (
		<Table>
			<Table.Body>
				{pairs.map(pair => {
					return (
						<Table.Row>
							<Table.Cell>{pair[0]}</Table.Cell>
							<Table.Cell>{pair[1]}</Table.Cell>
						</Table.Row>
					);
				})}
			</Table.Body>
		</Table>
	);
};

export default TableA;
