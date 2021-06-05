import { Suspense } from 'react';
import styled from 'styled-components';
import Spinner from 'shared/Spinner/Spinner';
import Table from 'shared/Table/Table';
import { ViewPort } from 'shared/Containers/Containers';
import validators, { getValidator } from 'utils/validators/validators';
import { fetchUsersResource } from 'repository/users/users';
import ErrorBoundary from 'shared/ErrorBoundary/ErrorBoundary';
import Header from 'Header/Header';

const TableWrapper = styled.div`
  height: 50vw;
  width: 1000px;
`;

const Main = styled.main`
  padding: 1rem;

  display: flex;
  justify-content: center;
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
      <Header />
      <Main>
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
      </Main>
    </ViewPort>
  );
};

export default App;
