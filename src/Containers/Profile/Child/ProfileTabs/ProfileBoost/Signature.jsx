import React, { useEffect, useState } from "react";
import {
  FlexContainer,
  MainWrapper,
} from "../../../../../Components/UI/Layout";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import { getPersonalSignatureByUserId } from "../../../../Auth/AuthAction";
import { Button } from "antd";
import { Spacer, TextInput } from "../../../../../Components/UI/Elements";
import { StyledPopconfirm } from "../../../../../Components/UI/Antd";
import { addPersonalSignatureByUserId } from "../../../../Auth/AuthAction";

function PersonalView(props) {
  const [editorState, seteditorState] = useState(EditorState.createEmpty());
  const [edit, setEdit] = useState(false);

  function onEditorStateChange(editorState) {
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    seteditorState(editorState);
    setEdit(true);
  }

  useEffect(() => {
    props.getPersonalSignatureByUserId(props.userId);
  }, []);
  useEffect(() => {
    if (props.personalSignatureData.signature) {
      debugger;

      seteditorState(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(
            convertFromHTML(props.personalSignatureData.signature)
          )
        )
      );
    } else {
      seteditorState(EditorState.createEmpty());
    }
  }, [props.personalSignatureData.signature]);
  function handleUpdate() {
    console.log(editorState);
    const editText = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    console.log(editText);
    props.addPersonalSignatureByUserId({
      signature: editText,
      signatureId: props.personalSignatureData.signatureId,
      userId: props.userId,
    });
  }

  return (
    <div>
      {props.personalSignatureData  ? (
        <>
          <NoDataComponent />
        </>
      ) : (
          <>
            <MainWrapper>
              <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                editorStyle={{
                  height: 250,
                  overflow: "auto",
                  border: "0.0625em solid #aaa",
                  padding: "0.3125em 0.625em ",
                }}
                onEditorStateChange={onEditorStateChange}
                placeholder={"Type here"}
              />
              <Spacer />
              <FlexContainer justifyContent="flex-end" marginRight="0.625em">
                <StyledPopconfirm
                  title="Do you want to Update?"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={handleUpdate}
                >
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={!edit}
                    Loading={props.addingPersonalSignature}
                  >
                    Update
                </Button>
                </StyledPopconfirm>
              </FlexContainer>
            </MainWrapper>
          </>
        )}
    </div>
  );
}

const mapStateToProps = ({ voip, email, auth, team }) => ({
  userId: auth.userDetails.userId,
  personalSignatureData: auth.personalSignatureData,
  addingPersonalSignature: auth.addingPersonalSignature,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getPersonalSignatureByUserId,
      addPersonalSignatureByUserId,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PersonalView);

function NoDataComponent(props) {
  const { description, onClick, buttonText } = props;
  return (
    <div>
      <FlexContainer
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <p>{"We couldn't find relevant data"}</p>
        {/* <Button onClick={onClick}>{buttonText || "Create"}</Button> */}
      </FlexContainer>
    </div>
  );
}
