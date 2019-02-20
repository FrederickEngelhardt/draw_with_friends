import React, { Component } from "react";

// REDUX
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as UserActionCreators from "../actions/user";


import Layers from "../components/Layers";
import ColorSettings from "../components/ColorSettings";
import SettingsNav from "../components/SettingsNav";

// Stylesheets
import "styles/DrawingSettings.scss";

class DrawingSettings extends Component {
  renderDrawingTools(dispatch, user) {
    const { drawing, chat, selectedSession } = user;
    const changeColor = bindActionCreators(
      UserActionCreators.changeColor,
      dispatch
    );
    const changeBrushSize = bindActionCreators(
      UserActionCreators.changeBrushSize,
      dispatch
    );
    const settingSelector = bindActionCreators(
      UserActionCreators.settingSelector,
      dispatch
    );
    return (
      <div className="drawing-settings">
        <div className="drawing-menu">
          <SettingsNav socket={drawing} settingSelector={settingSelector} />
          <Layers
            socket={drawing}
            layersActive={user.settingSelector}
            layers={user.layers}
          />
          <ColorSettings
            changeBrushSize={changeBrushSize}
            brush_height={user.brush_height}
            colorActive={user.settingSelector}
            changeColor={changeColor}
            selected_color={user.selected_color}
            state={user}
          />
        </div>
      </div>
    );
  }
  render() {
    const { dispatch, user } = this.props;
    const renderThis = user.showDrawingTools
      ? this.renderDrawingTools(dispatch, user)
      : null;
    return renderThis;
  }
}
const mapStateToProps = state => ({
  user: state
});
export default connect(mapStateToProps)(DrawingSettings);
