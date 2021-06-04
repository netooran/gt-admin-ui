import { Suspense } from 'react';
import styled from 'styled-components';
import Spinner from 'shared/Spinner/Spinner';
import Table from 'shared/Table/Table';
import { ViewPort, Center } from 'shared/Containers/Containers';
import validators, { getValidator } from './utils/validators/validators';
import { fetchUsersResource } from 'repository/users/users';
import ErrorBoundary from 'shared/ErrorBoundary/ErrorBoundary';

const TableWrapper = styled.div`
  height: 50vw;
  min-width: 1000px;
`;

const App = () => {
  const userResource = fetchUsersResource();

  const columns = [
    {
      name: 'name',
      type: 'text',
      validate: getValidator([validators.isNotEmpty], 'name'),
    },
    {
      name: 'email',
      type: 'email',
      validate: getValidator([validators.isValidEmail], 'email'),
    },
    {
      name: 'role',
      type: 'text',
      validate: getValidator([validators.isValidUserRole], 'role'),
    },
  ];

  const options = {
    editable: true,
    deletable: true,
    selectable: true,
    paginatable: true,
    searchable: true,
  };

  return (
    <ViewPort>
      <Center>
        <TableWrapper>
          <ErrorBoundary>
            <Suspense fallback={<Spinner />}>
              <Table
                aria-label="Users table"
                dataResource={userResource}
                columns={columns}
                options={options}
              />
            </Suspense>
          </ErrorBoundary>
        </TableWrapper>
      </Center>
    </ViewPort>
  );
};

export default App;
