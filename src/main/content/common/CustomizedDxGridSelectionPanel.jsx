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

export const CustomizedDxGridSelectionPanelBase = ({ selection, classes }) => (
	<Plugin name="SelectionPanel">
		<Template name="footer">
			{/* <div className={classes.container}> */}
			{/* <div className={classes.selectionPanel}> */}
			<div className="pl-12" style={{ position: "absolute", bottom: 25 }}>
				Rows selected: {selection.length}
			</div>
			{/* </div> */}
			<TemplatePlaceholder />
			{/* </div> */}
		</Template>
	</Plugin>
);

export const CustomizedDxGridSelectionPanel = withStyles(styles)(CustomizedDxGridSelectionPanelBase);
