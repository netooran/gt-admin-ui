import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import styled from 'styled-components';
import Header from 'shared/Table/Header/Header';
import Footer from 'shared/Table/Footer/Footer';
import Row from 'shared/Table/Row/Row';
import HeaderRow from 'shared/Table/HeaderRow/HeaderRow';
import { Center } from 'shared/Containers/Containers';

const StyledTable = styled.table`
  text-align: left;
  border-collapse: collapse;
  width: 100%;

  th {
    text-transform: capitalize;
  }

  tr {
    border-bottom: 1px solid lightgray;
  }

  td,
  th {
    padding: 0.75rem 1rem;
  }
`;

const Message = styled(Center)`
  padding: 2rem;
  color: gray;
`;

const Table = ({
  dataResource,
  columns,
  pageSize = 10,
  options = {},
  ...props
}) => {
  const [data, setData] = useState(dataResource.read());
  const [filteredData, setFilteredData] = useState(dataResource.read());
  const [page, setPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState(new Set());

  const pageData = useMemo(() => {
    const offset = (page - 1) * pageSize;
    return filteredData.slice(offset, offset + pageSize);
  }, [page, pageSize, filteredData]);

  const search = (searchString) => {
    setFilteredData(
      data.filter((row) =>
        Object.values(row).some((cellValue) => cellValue.match(searchString))
      )
    );
  };

  const selectAll = (isSelected) => {
    const selection = isSelected
      ? new Set(pageData.map(({ id }) => id))
      : new Set();
    setSelectedRows(selection);
  };

  const select = (rowId, isSelected) => {
    const selection = new Set(selectedRows);
    isSelected ? selection.add(rowId) : selection.delete(rowId);
    setSelectedRows(selection);
  };

  const save = (row) => {
    setData(data.map((dataRow) => (dataRow.id === row.id ? row : dataRow)));
  };

  const remove = (row) => {
    setData(data.filter((dataRow) => dataRow.id !== row.id));
    setFilteredData(filteredData.filter((dataRow) => dataRow.id !== row.id));

    const selection = new Set(selectedRows);
    selection.delete(row.id);
    setSelectedRows(selection);
  };

  const removeSelected = () => {
    setData(data.filter((dataRow) => !selectedRows.has(dataRow.id)));
    setFilteredData(
      filteredData.filter((dataRow) => !selectedRows.has(dataRow.id))
    );
    setSelectedRows(new Set());
  };

  const columnNames = columns.map(({ name }) => name);

  return (
    <div>
      <Header
        searchPlaceholderText={`Search by ${columnNames.join(', ')}`}
        search={search}
        options={options}
      />
      <StyledTable {...props}>
        <thead>
          <HeaderRow
            columns={columnNames}
            isSelected={
              !!(pageData.length && selectedRows.size === pageData.length)
            }
            selectAll={selectAll}
            options={options}
          />
        </thead>
        <tbody>
          {pageData.map((row, i) => (
            <Row
              key={i}
              data={row}
              columns={columns}
              isSelected={selectedRows.has(row.id)}
              select={select}
              save={save}
              remove={remove}
              options={options}
            />
          ))}
        </tbody>
      </StyledTable>
      {!filteredData.length && <Message>No data to show</Message>}
      <Footer
        page={page}
        noOfpages={Math.ceil(filteredData.length / pageSize)}
        setPage={setPage}
        hasSelection={!!selectedRows.size}
        removeSelected={removeSelected}
        options={options}
      />
    </div>
  );
};

Table.propTypes = {
  dataResource: PropTypes.shape({
    read: PropTypes.func.isRequired,
  }),
  columns: PropTypes.array.isRequired,
  pageSize: PropTypes.number,
  options: PropTypes.shape({
    editable: PropTypes.bool,
    deletable: PropTypes.bool,
    selectable: PropTypes.bool,
    paginatable: PropTypes.bool,
    searchable: PropTypes.bool,
  }),
};

export default Table;
