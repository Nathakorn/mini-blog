import React from "react";
import { Form, Input, Button, Select, Upload, Modal } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const { Option } = Select;

class InputCardForm extends React.Component {
  formRef = React.createRef();
  state = {
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    fileList: [],
  };
  //upload
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  handleChange = ({ fileList }) => {
    this.setState({ fileList });
  };

  onFinish = (values) => {
    const newCard = values;
    newCard.fileList = this.state.fileList;
    if (this.props.cardOperation === "add") {
      newCard.id = uuidv4();
      newCard.author = this.props.currentUser;
      this.props.addCard(newCard);
      this.props.updateAlert("Add completely!", "success");
    } else if (this.props.cardOperation === "edit") {
      newCard.id = this.props.card.id;
      this.props.editCard(newCard);
      this.props.updateAlert("Edit completely!", "success");
    }
    this.props.toggleInputCardModal("end");
  };
  onReset = () => {
    this.formRef.current.resetFields();
  };
  onFill = () => {
    this.formRef.current.setFieldsValue({
      title: "Hello world!",
      category: "Biology",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac elit felis. Nunc lacus lorem, scelerisque in eleifend vitae, cursus sed ex. Nunc suscipit turpis ornare, laoreet elit ac, laoreet purus. Quisque sit amet leo lacinia, gravida orci sed, maximus urna. Vestibulum nec malesuada enim. Duis sem sem, euismod et elementum a, faucibus et nisl.",
    });
  };
  onFillCard = () => {
    const { title, category, content, fileList } = this.props.card;
    this.formRef.current.setFieldsValue({
      title: title,
      category: category,
      content: content,
    });
    this.setState({ fileList: fileList });
  };
  componentDidMount() {
    if (this.props.cardOperation === "edit") {
      this.onFillCard();
    }
  }
  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const { currentUser, cardOperation, card, deleteCard } = this.props;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <Form ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
        <p>Author : {currentUser}</p>
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select a category" allowClear>
            <Option value="Programming">Programming</Option>
            <Option value="Biology">Biology</Option>
            <Option value="Finance">Finance</Option>
            <Option value="Chemistry">Chemistry</Option>
            <Option value="Engineering">Engineering</Option>
            <Option value="Health">Health</Option>
            <Option value="Society">Society</Option>
            <Option value="Space">Space</Option>
          </Select>
        </Form.Item>
        <Form.Item name="content" rules={[{ required: true }]}>
          <Input.TextArea
            placeholder="What's happening?"
            className="card-input-textArea"
            rows={8}
            allowClear
            maxLength={300}
          />
        </Form.Item>
        <div className="upload-component">
          <Upload
            listType="picture-card"
            fileList={fileList}
            onPreview={this.handlePreview}
            onChange={this.handleChange}
          >
            {fileList.length >= 4 ? null : uploadButton}
          </Upload>
        </div>

        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>

        <Form.Item className="operation">
          <Button className="submit-button" type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={this.onReset}>
            Reset
          </Button>
          <Button type="link" htmlType="button" onClick={this.onFill}>
            Fill form
          </Button>
        </Form.Item>
        {cardOperation === "edit" && (
          <div className="danger-section">
            <Button
              type="primary"
              onClick={() => deleteCard(card.id)}
              icon={<DeleteOutlined />}
              danger
            >
              Delete
            </Button>
          </div>
        )}
      </Form>
    );
  }
}

export default InputCardForm;
