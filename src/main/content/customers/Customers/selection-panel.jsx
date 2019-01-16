import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Plugin,
  Template,
  TemplatePlaceholder
} from "@devexpress/dx-react-core";

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline"
  },
  selectionPanel: {
    // padding: "12px"
  }
};

export const SelectionPanelBase = ({ selection, classes }) => (
  <Plugin name="SelectionPanel">
    <Template name="footer">
      <div className={classes.container}>
        {/* <div className={classes.selectionPanel}> */}
          Rows selected: {selection.length}
        {/* </div> */}
        <TemplatePlaceholder />
      </div>
    </Template>
  </Plugin>
);

export const SelectionPanel = withStyles(styles)(SelectionPanelBase);
