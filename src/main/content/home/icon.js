import React, {Component} from 'react';
import PropTypes from 'prop-types';
import InvoiceReport from "../accounts-receivable/Invoice/invoiceReport";

class Iconcus extends Component{
    render(){
        return (
            <div>
                <img src={this.props.src} style={{width:this.props.size+"px",height:this.props.size+"px"}} alt=""/>
            </div>
        ) 
    }
}

Iconcus.propTypes = {
    src: PropTypes.string,
    size: PropTypes.string,
};
export default Iconcus;