import React, { Component } from 'react';

class CustomerSearchBar extends Component {
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		
	}, dispatch);
}

function mapStateToProps({  }) {
	return {
		
	}
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerSearchBar)));
