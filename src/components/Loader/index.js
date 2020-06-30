import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./index.scss";

class Loader extends Component {
  render() {
    const { loading, mode } = this.props;
    if (!loading) return null;

    return (
      <div className="spinner-container">
        <div className={`spinner ${mode === "Light" ? "" : "dark-mode"}`}>
          <div className="rect1"></div>
          <div className="rect2"></div>
          <div className="rect3"></div>
          <div className="rect4"></div>
          <div className="rect5"></div>
        </div>
      </div>
    );
  }
}

Loader.defaultProps = {
  loading: true,
};

Loader.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = (state, ownProps) => ({
  mode: state.general.mode,
});

export default connect(mapStateToProps)(Loader);
