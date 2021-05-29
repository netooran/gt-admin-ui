import createResource from 'utils/resource/resource';

const fetchUsers = async () => {
  const response = await fetch(
    'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
  );
  return await response.json();
};

export const fetchUsersResource = () => createResource(fetchUsers());
