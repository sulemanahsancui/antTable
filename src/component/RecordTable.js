import React, { useState } from "react";
import { Table, Button, Modal, Input } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

const RecordTable = () => {
  const [dataSource, setDataSource] = useState([
    {
      id: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      id: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ]);
  const [isVisible, setIsVisible] = useState(false);
  const [editedRecord, setEditedRecord] = useState(null);

  const addnewRecord = () => {
    const rand = parseInt(Math.random() * 50);
    const newRecord = {
      id: rand,
      name: "John" + rand,
      age: rand,
      address: "10 Downing Street" + rand,
    };

    setDataSource((pre) => {
      return [...pre, newRecord];
    });
  };

  const ondelete = (record) => {
    Modal.confirm({
      title: "Are you sure you want to delete this record",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => {
          return pre.filter((person) => person.id !== record.id);
        });
      },
    });
  };

  const onedit = (record) => {
    setIsVisible(true);
    setEditedRecord({ ...record });
  };
  const resetEditing = () => {
    setIsVisible(false);
    setEditedRecord(null);
  };
  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "3",
      title: "Age",
      dataIndex: "age",
    },
    {
      key: "4",
      title: "Address",
      dataIndex: "address",
    },
    {
      key: "5",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined onClick={() => onedit(record)} />
            <DeleteOutlined
              style={{ color: "red", marginLeft: 10 }}
              onClick={() => ondelete(record)}
            />
          </>
        );
      },
    },
  ];
  return (
    <div className="">
      <Button
        type="primary"
        onClick={addnewRecord}
        style={{ marginBottom: 10 }}
      >
        Add new Record
      </Button>
      <Table columns={columns} dataSource={dataSource} />
      <Modal
        title="Edit Record"
        okText="Save"
        visible={isVisible}
        onCancel={() => resetEditing()}
        onOk={() => {
          setDataSource((pre) => {
            return pre.map((person) => {
              if (person.id === editedRecord.id) {
                return editedRecord;
              } else {
                return person;
              }
            });
          });
          resetEditing();
        }}
      >
        <Input
          value={editedRecord?.name}
          onChange={(e) => {
            setEditedRecord((pre) => {
              return { ...pre, name: e.target.value };
            });
          }}
        />
        <Input
          value={editedRecord?.age}
          onChange={(e) => {
            setEditedRecord((pre) => {
              return { ...pre, age: e.target.value };
            });
          }}
        />
        <Input
          value={editedRecord?.address}
          onChange={(e) => {
            setEditedRecord((pre) => {
              return { ...pre, address: e.target.value };
            });
          }}
        />
      </Modal>
    </div>
  );
};

export default RecordTable;
