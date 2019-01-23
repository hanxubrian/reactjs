import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import { withRouter } from 'react-router-dom';
import connect from "react-redux/es/connect/connect";

import { FusePageCustomSidebarScroll, FuseAnimate } from '@fuse';
import { Icon, IconButton, Fab, Typography, Toolbar, CircularProgress, Menu, MenuItem, Checkbox, FormControlLabel, Tooltip, Button } from '@material-ui/core';
import classNames from 'classnames';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

const styles = theme => ({
	iframe: {
		height: '1000px'
	}
});

class CustomerServices extends Component {

	render() {
		const { classes, toggleFilterPanel, toggleSummaryPanel, filterState, summaryState, openNewCustomerForm, customerForm, mapViewState, toggleMapView } = this.props;

		console.log('props=', this.props);
		return (
			<React.Fragment >
				<FusePageCustomSidebarScroll
					classes={{
						root: classNames(classes.layoutRoot, 'test123'),
						rightSidebar: classNames(classes.layoutRightSidebar, { 'openSummary': summaryState }),
						leftSidebar: classNames(classes.layoutLeftSidebar, { 'openFilter': filterState }),
						sidebarHeader: classes.layoutSidebarHeader,
						header: classes.layoutHeader,
						content: classes.content
					}}
					header={
						<div className="flex w-full items-center">

						</div>
					}
					content={
						<div className="flex-1 flex-col absolute w-full h-full">

						</div>
					}
					leftSidebarHeader={
						<Fragment>

							<div className={classNames("flex flex-row w-full h-full justify-between p-6 align-middle pl-24")}>
								<h2 style={{ marginBlockStart: '1em' }}>Filters</h2>
							</div>
						</Fragment>
					}
					leftSidebarContent={
						<div />
					}
					rightSidebarHeader={
						<div className={classNames("flex flex-row w-full h-full justify-between p-6 align-middle pl-24")}>
							<h2 style={{ marginBlockStart: '1em' }}>Summary</h2>
						</div>
					}
					rightSidebarContent={
						<div />
					}

					onRef={instance => {
						this.pageLayout = instance;
					}}
				>
				</FusePageCustomSidebarScroll>

			</React.Fragment >
		);
	}
}


function mapStateToProps({ customers, auth, fuse }) {
	return {
		iframeURL: fuse.navbar.iframeURL,
		filterState: customers.bOpenedFilterPanel,
		summaryState: customers.bOpenedSummaryPanel,
	}
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, null)(CustomerServices)));
