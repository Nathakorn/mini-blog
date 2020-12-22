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
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

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
    console.log("test file", fileList);
  };

  onFinish = (values) => {
    const newCard = values;
    newCard.fileList = this.state.fileList;
    if (this.props.cardOperation === "add") {
      newCard.id = uuidv4();
      this.props.addCard(newCard);
    } else if (this.props.cardOperation === "edit") {
      newCard.id = this.props.card.id;
      this.props.editCard(newCard);
    }
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
    const { cardOperation, card, deleteCard } = this.props;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <Form
        {...layout}
        ref={this.formRef}
        name="control-ref"
        onFinish={this.onFinish}
      >
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select a category" allowClear>
            <Option value="biology">Biology</Option>
            <Option value="finance">Finance</Option>
            <Option value="chemistry">Chemistry</Option>
            <Option value="engineering">Engineering</Option>
            <Option value="health">Health</Option>
            <Option value="society">Society</Option>
            <Option value="space">Space</Option>
          </Select>
        </Form.Item>
        <Form.Item name="content" label="Content" rules={[{ required: true }]}>
          <Input.TextArea rows={8} allowClear />
        </Form.Item>

        <Upload
          // action={"https://res.cloudinary.com/dt4dve4x5/image/upload"}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 4 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
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
          <Button
            type="primary"
            onClick={() => deleteCard(card.id)}
            icon={<DeleteOutlined />}
            danger
          >
            Delete
          </Button>
        )}
      </Form>
    );
  }
}

export default InputCardForm;
