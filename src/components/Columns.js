import { Button } from 'antd';

const Columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'EmailId',
      dataIndex: 'emailId',
    },
    {
      title: 'AadharNumber',
      dataIndex: 'aadharNumber',
    },
    {
      title: 'PanNumber',
      dataIndex: 'panNumber',
    },
    {
      title: 'EmployeeType',
      dataIndex: 'employeeType',
    },
    {
      title: 'JoiningDate',
      dataIndex: 'joiningDate',
    },
    {
      title: 'Edit',
      dataIndex: 'edit',
      render: () => {
        return (
          <Button type="primary" >Edit</Button>
        )
      }
    },
    {
      title: 'ModelEdit',
      dataIndex: 'modelEdit',
      render: () => {
        return (
          <Button type="primary">Model Edit</Button>
        )
      }
    },
  
  ];

export default Columns;