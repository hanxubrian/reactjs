(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{1831:function(e,t,a){"use strict";a.r(t);var l=a(9),r=a(15),n=a(19),c=a(17),m=a(18),d=a(0),i=a.n(d),E=a(167),s=a(73),o=a(4),h=a.n(o),p=a(1),u=a(10),b=a(467),N=a(24),x=a(5),g=function(e){function t(){var e,a;Object(l.a)(this,t);for(var r=arguments.length,m=new Array(r),d=0;d<r;d++)m[d]=arguments[d];return(a=Object(n.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(m)))).renderHeader=function(){var e=a.props.all_regions,t=a.props.match.params,l=t.month,r=t.year,n=t.regionid,c="";return e.forEach(function(e){if(e.RegionId===parseInt(n))return c=e.Displayname,!1}),i.a.createElement("tr",null,i.a.createElement("td",{className:"text-center",width:"200",align:"left"},i.a.createElement(p.pb,{color:"inherit"},i.a.createElement("img",{src:"https://res.cloudinary.com/janiking/image/upload/v1545837406/apps/web/appid2/logo-full.png",alt:""}))),i.a.createElement("td",{className:"text-center",width:"500"},i.a.createElement(p.pb,{color:"inherit"},"FRANCHISEE REPORT"),i.a.createElement(p.pb,{color:"inherit"},c),i.a.createElement(p.pb,{color:"inherit"},"BUSINESS FOR THE MONTH OF ",["January","February","March","April","May","June","July","August","September","October","November","December"][parseInt(l)-1]," ",r)),i.a.createElement("td",{align:"left"},i.a.createElement(p.pb,{color:"inherit"},"Date: 11/30/2018 "),i.a.createElement(p.pb,null,"Time: 11:58:57"),i.a.createElement(p.pb,null,i.a.createElement("br",null))))},a}return Object(m.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){this.props.getReport(this.props.match.params)}},{key:"render",value:function(){var e=this.props,t=e.classes,a=e.franchiseeReport,l=e.all_regions;if(console.log("ppp=",this.props.match.params),null===a||0===l.length)return i.a.createElement("div",null);var r=a.Data,n=r.DLR_CODE,c=r.SUMMARY_PAGE,m=r.CUS_TRXS,d=r.CUST_ACCT_TOTALS,E=r.SUPPLY_TRXS,s=r.LEASE_PAYMENTS,o=r.REG_MISC,u=r.CHARGEBACKS,N=[c[0]["ACTUAL BILLING"][0],c[0].ADTL_BILL_FRAN[0],c[0].CLIENT_SUPPLIES[0],c[0].ADDTL_BILL_OFFICE[0]],x=[c[0].SUBTOTAL[0],c[0].CLIENT_SALES_TAX[0]],g=[c[0].TOTAL_MON_REV[0]],T=[c[0].ROYALTY[0],c[0].ACCT_FEE[0],c[0].TECH_FEE[0],c[0].ADDTL_BILL_OFFICE_COMM[0],c[0].FRAN_NOTE_PYMT[0]],F=["FRANCHISE NOTE PAYMENT2","ACCT_FEE_REB_CUR","ACCT_FEE_REB_BAL"],A=0,y=0,_=0,$=0,f=0,C=0,R=0,v=0,S=0,L=0,O=0,M=0,B=0,D=0,I=0,U=0,P=0,X=0,k=0,H=0,Y=0;return null!==m&&m.forEach(function(e){A+=parseFloat(e.TRX_AMT),y+=parseFloat(e.TRX_TAX),_+=parseFloat(e.TRX_TOT)}),null!==s&&s.forEach(function(e){R+=parseFloat(e.PYMNT_AMT),v+=parseFloat(e.PYMNT_TAX),S+=parseFloat(e.PYMNT_TOT)}),null!==u&&u.forEach(function(e){$+=parseFloat(e.TRX_AMT),f+=parseFloat(e.TRX_TAX),C+=parseFloat(e.TRX_TOT)}),null!==o&&o.forEach(function(e){L+=parseFloat(e.TRX_AMT),O+=parseFloat(e.TRX_TAX),M+=parseFloat(e.TRX_TOT)}),null!==E&&E.forEach(function(e){B+=parseFloat(e.EXTENDED),D+=parseFloat(e.TRX_TAX),I+=parseFloat(e.TRX_TOT)}),null!==d&&d.forEach(function(e){U+=parseFloat(e.CONT_BILL),P+=parseFloat(e.CUR_MONTH),X+=parseFloat(e.ADTL_B_FRN),k+=parseFloat(e.CLIENT_SUP),H+=parseFloat(e.ADTL_B_OFC),Y+=parseFloat(e.FF_PYMNT)}),i.a.createElement("div",{className:h()(t.root,"p-0 sm:p-64  print:p-0")},i.a.createElement(p.d,{className:h()(t.card,"mx-auto")},i.a.createElement(p.f,{className:h()(t.cardContent,"p-32 print:p-0")},i.a.createElement("div",null,i.a.createElement("table",{align:""},i.a.createElement("tbody",null,this.renderHeader()))),i.a.createElement("div",{className:""},i.a.createElement("div",null,i.a.createElement("table",{className:"mb-16"},i.a.createElement("tbody",null,i.a.createElement("tr",null,i.a.createElement("td",{className:"pb-4"},i.a.createElement(p.pb,{color:"inherit"},"Franchisee Code:")),i.a.createElement("td",{className:"text-left",width:"100"},i.a.createElement(p.pb,{color:"inherit"},i.a.createElement("br",null))),i.a.createElement("td",{className:"pb-4"},i.a.createElement(p.pb,{color:"inherit"},"Name"))),i.a.createElement("tr",null,i.a.createElement("td",{className:"pr-16"},i.a.createElement(p.pb,{color:"inherit"},n),i.a.createElement(p.pb,{color:"inherit"},i.a.createElement("br",null)),i.a.createElement(p.pb,{color:"inherit"},i.a.createElement("br",null))),i.a.createElement("td",{className:"text-left",width:"100"},i.a.createElement(p.pb,{color:"inherit"},i.a.createElement("br",null)),i.a.createElement(p.pb,{color:"inherit"},i.a.createElement("br",null)),i.a.createElement(p.pb,{color:"inherit"},i.a.createElement("br",null))),i.a.createElement("td",{className:"text-left"},i.a.createElement(p.pb,{color:"inherit"},c[0].FRAN_NAME),i.a.createElement(p.pb,{color:"inherit"},c[0].FRAN_ADDRESS),i.a.createElement(p.pb,{color:"inherit"},c[0].FRAN_CITY," ",c[0].FRAN_STATE,",",c[0].FRAN_ZIP)),i.a.createElement("td",{className:"text-left",width:"200"},i.a.createElement(p.pb,{color:"inherit"},i.a.createElement("br",null)),i.a.createElement(p.pb,{color:"inherit"},i.a.createElement("br",null)),i.a.createElement(p.pb,{color:"inherit"},i.a.createElement("br",null))),i.a.createElement("td",{className:"text-left"},i.a.createElement(p.pb,{color:"inherit"},"Plan Type: ",c[0].PLAN_TYPE),i.a.createElement(p.pb,{color:"inherit"},"Plan Type: ",c[0].DATE_SIGN),i.a.createElement(p.pb,{color:"inherit"},"Plan Type: ",c[0].CONTACT)))))),i.a.createElement("div",{className:"mt-16"},i.a.createElement("h2",{style:{color:"blue"}},"FRANCHISEE REVENUE:"),i.a.createElement("div",{style:w}),i.a.createElement("table",{className:""},i.a.createElement("thead",null,i.a.createElement("tr",null,i.a.createElement("th",{width:"250"}),i.a.createElement("th",{width:"350"}),i.a.createElement("th",{className:"text-right"})),i.a.createElement("tr",null,i.a.createElement("th",null),i.a.createElement("th",null))),i.a.createElement("tbody",null,N.map(function(e,t){return i.a.createElement("tr",{key:t},i.a.createElement("td",null,i.a.createElement(p.pb,{variant:"subtitle1"},e.LABEL)),i.a.createElement("td",{className:"text-right"},"$",parseFloat(e.AMOUNT).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")))}))),i.a.createElement("table",{style:{width:"80%"}},i.a.createElement("tbody",null,x.map(function(e,t){return i.a.createElement("tr",{key:t},i.a.createElement("td",{width:"350"},i.a.createElement(p.pb,{variant:"subtitle1"},e.LABEL)),i.a.createElement("td",{width:"",className:"text-right"},"$",parseFloat(e.AMOUNT).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")))}))),i.a.createElement("table",{style:{width:"90%"}},i.a.createElement("tbody",null,g.map(function(e,t){return i.a.createElement("tr",{key:t},i.a.createElement("td",{width:"350"},i.a.createElement(p.pb,{variant:"subtitle1"},e.LABEL)),i.a.createElement("td",{width:"",className:"text-right"},"$",parseFloat(e.AMOUNT).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")))}))),i.a.createElement("h2",{className:"pt-16",style:{color:"blue"}},"FRANCHISEE DEDUCTIONS:"),i.a.createElement("div",{style:w}),i.a.createElement("table",{className:""},i.a.createElement("thead",null,i.a.createElement("tr",null,i.a.createElement("th",{width:"250"}),i.a.createElement("th",{width:"350"}),i.a.createElement("th",{className:"text-right"}))),i.a.createElement("tbody",null,T.map(function(e,t){return i.a.createElement("tr",{key:t},i.a.createElement("td",null,i.a.createElement(p.pb,{variant:"subtitle1"},e.LABEL)),i.a.createElement("td",{className:"text-right"},"$",parseFloat(e.AMOUNT).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")))}),["FINDERS_FEES","FRANCHISE SUPPLIES","REGULAR MISCELLANEOUS"].map(function(e,t){return i.a.createElement("tr",{key:t},i.a.createElement("td",null,i.a.createElement(p.pb,{variant:"subtitle1"},null!=c[0][e]&&null!=c[0][e][0]&&c[0][e][0].LABEL)),i.a.createElement("td",{className:"text-right"},"$",null!=c[0][e]&&null!=c[0][e][0]&&parseFloat(c[0][e][0].AMOUNT).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")))}))),i.a.createElement("table",{style:{width:"80%"}},i.a.createElement("tbody",null,["SUBTOTAL_REG_DEDS"].map(function(e,t){return i.a.createElement("tr",{key:t},i.a.createElement("td",null,i.a.createElement(p.pb,{variant:"subtitle1"},null!=c[0][e]&&null!=c[0][e][0]&&c[0][e][0].LABEL)),i.a.createElement("td",{className:"text-right"},"$",null!=c[0][e]&&null!=c[0][e][0]&&parseFloat(c[0][e][0].AMOUNT).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")))}))),i.a.createElement("table",{style:{width:"63.5%"}},i.a.createElement("tbody",null,null!=F&&F.map(function(e,t){return i.a.createElement("tr",{key:t},i.a.createElement("td",null,i.a.createElement(p.pb,{variant:"subtitle1"},e)),i.a.createElement("td",{className:"text-right"},"$",null!=c[0][e]&&parseFloat(c[0][e]).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,"),null==c[0][e]&&parseFloat(0).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")))}))),i.a.createElement("table",{style:{width:"63.5%"}},i.a.createElement("tbody",null,["ADVERTISING_FEE","TOTAL_LEASES","BUSINESS_PROT","BPP_ADMIN","CLIENT_SALES_TAX_BOT","CHARGEBACKS","PAGERS","PAGERS2","SPECIAL_MISC","DUE_TO_FRAN"].map(function(e,t){return i.a.createElement("tr",{key:t},i.a.createElement("td",null,i.a.createElement(p.pb,{variant:"subtitle1"},null!=c[0][e]&&null!=c[0][e][0]&&c[0][e][0].LABEL)),i.a.createElement("td",{className:"text-right"},"$",null!=c[0][e]&&null!=c[0][e][0]&&parseFloat(c[0][e][0].AMOUNT).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")))}))),i.a.createElement("table",{style:{width:"80%"}},i.a.createElement("tbody",null,["SUBTOTAL_SPEC_DEDS"].map(function(e,t){return i.a.createElement("tr",{key:t},i.a.createElement("td",null,i.a.createElement(p.pb,{variant:"subtitle1"},null!=c[0][e]&&null!=c[0][e][0]&&c[0][e][0].LABEL)),i.a.createElement("td",{className:"text-right"},"$",null!=c[0][e]&&null!=c[0][e][0]&&parseFloat(c[0][e][0].AMOUNT).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")))}))),i.a.createElement("table",{style:{width:"90%"}},i.a.createElement("tbody",null,["TOTAL_DEDS"].map(function(e,t){return i.a.createElement("tr",{key:t},i.a.createElement("td",null,i.a.createElement(p.pb,{variant:"subtitle1"},null!=c[0][e]&&null!=c[0][e][0]&&c[0][e][0].LABEL)),i.a.createElement("td",{className:"text-right"},"$",null!=c[0][e]&&null!=c[0][e][0]&&parseFloat(c[0][e][0].AMOUNT).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")))}))),i.a.createElement("table",{style:{width:"90%"}},i.a.createElement("tbody",null,i.a.createElement("tr",null,i.a.createElement("td",null,i.a.createElement("h2",{style:{color:"blue"}},"DUE TO FRANCHISEE:")),i.a.createElement("td",{className:"text-right"},"97,794.90")))),i.a.createElement("div",{style:w}),i.a.createElement("table",{className:""},i.a.createElement("thead",null,i.a.createElement("tr",null,i.a.createElement("th",null),i.a.createElement("th",null),i.a.createElement("th",{className:"text-right"}),i.a.createElement("th",{className:"text-right"}),i.a.createElement("th",{className:"text-right"})))),i.a.createElement("form",{className:t.container,noValidate:!0,autoComplete:"off"},i.a.createElement(p.mb,{className:t.textField,label:"Date Paid"}),i.a.createElement(p.mb,{className:t.textField,label:"Check #"}),i.a.createElement(p.mb,{className:t.textField,label:"Date Paid"}),i.a.createElement(p.mb,{className:t.textField,label:"Check #"}),i.a.createElement(p.mb,{className:t.longerTextField,label:"Notes",multiline:!0})))))),i.a.createElement(p.d,{className:h()(t.card,"mx-auto mt-64")},i.a.createElement(p.f,{className:h()(t.cardContent,"p-32 print:p-0")},i.a.createElement("div",null,i.a.createElement("table",{align:""},i.a.createElement("tbody",null,this.renderHeader()))),i.a.createElement("div",{className:""},i.a.createElement("div",null,i.a.createElement("table",{className:"mb-16"},i.a.createElement("tbody",null,i.a.createElement("tr",null,i.a.createElement("td",{className:"pr-16 pb-4"},i.a.createElement(p.pb,{color:"inherit"},"Franchisee Code:")),i.a.createElement("td",{className:"text-left",width:"100"},i.a.createElement(p.pb,{color:"inherit"},i.a.createElement("br",null))),i.a.createElement("td",{className:"pb-4"},i.a.createElement(p.pb,{color:"inherit"},"Name"))),i.a.createElement("tr",null,i.a.createElement("td",{className:"pr-16"},i.a.createElement(p.pb,{color:"inherit"},n)),i.a.createElement("td",{className:"text-left",width:"100"},i.a.createElement(p.pb,{color:"inherit"},i.a.createElement("br",null))),i.a.createElement("td",null,i.a.createElement(p.pb,{color:"inherit"},c[0].FRAN_NAME)))))),i.a.createElement("div",{className:"mt-64"},i.a.createElement("div",{style:{width:"100%",borderBottom:"2px solid rgb(0, 0, 0)"}},i.a.createElement("table",null,i.a.createElement("thead",null,i.a.createElement("tr",null,i.a.createElement("th",{width:"300",align:"left"},i.a.createElement("h2",null,"Customer Transactions")),i.a.createElement("th",{width:"100"},"Invoice"),i.a.createElement("th",{width:"250"},"Description"))))),i.a.createElement("div",{style:{width:"100%",borderBottom:"2px solid rgb(0, 0, 0)"}},i.a.createElement("table",{style:{width:"100%"}},i.a.createElement("tbody",null,i.a.createElement("tr",null,i.a.createElement("td",{width:"65"},i.a.createElement(p.pb,null,"Customer")),i.a.createElement("td",{width:"227"}),i.a.createElement("td",{width:"25"},"I/C"),i.a.createElement("td",{width:"74"},"Invoice"),i.a.createElement("td",{className:"text-left",width:"345"},"Description"),i.a.createElement("td",{className:"text-right",width:"73"},"Inv Amt"),i.a.createElement("td",{className:"text-right",width:"60"},"Inv Tax"),i.a.createElement("td",{className:"text-right"},"Total"))))),i.a.createElement("div",{style:{width:"100%",borderBottom:"2px solid rgb(0, 0, 0)"}},i.a.createElement("table",{className:"",style:{width:"100%"}},i.a.createElement("tbody",null,i.a.createElement("tr",null,i.a.createElement("td",{width:"65"},i.a.createElement(p.pb,null)),i.a.createElement("td",null),i.a.createElement("td",null),i.a.createElement("td",null),i.a.createElement("td",{className:"text-left"}),i.a.createElement("td",{className:"text-right"}),i.a.createElement("td",{className:"text-right"}),i.a.createElement("td",{className:"text-right"})),null!=m&&m.map(function(e,t){return i.a.createElement("tr",{key:t},i.a.createElement("td",null,i.a.createElement(p.pb,null,e.CUST_NO)),i.a.createElement("td",{width:"227"},i.a.createElement(p.pb,null,b.a.capital_letter(e.CUS_NAME))),i.a.createElement("td",{width:"25"},e.TRX_TYPE),i.a.createElement("td",{width:"74"},i.a.createElement(p.pb,null,e.CUST_NO)),i.a.createElement("td",{className:"text-left",width:"345"},b.a.capital_letter(e.DESCR)),i.a.createElement("td",{className:"text-right",width:"73"},"$",parseFloat(e.TRX_AMT).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")),i.a.createElement("td",{className:"text-right",width:"60"},"$",parseFloat(e.TRX_TAX).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")),i.a.createElement("td",{className:"text-right"},"$",parseFloat(e.TRX_TOT).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")))})))),i.a.createElement("table",{style:{width:"100%"}},i.a.createElement("tbody",null,i.a.createElement("tr",null,i.a.createElement("td",{width:"736"},i.a.createElement(p.pb,null,"Totals for this Franchise")),i.a.createElement("td",{className:"text-right",width:"73"},"$",A.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")),i.a.createElement("td",{className:"text-right",width:"60"},"$",y.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")),i.a.createElement("td",{className:"text-right"},"$",_.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,"))))))))),i.a.createElement(p.d,{className:h()(t.card,"mx-auto mt-64")},i.a.createElement(p.f,{className:h()(t.cardContent,"p-32 print:p-0")},i.a.createElement("div",null,i.a.createElement("table",{align:""},i.a.createElement("tbody",null,this.renderHeader()))),i.a.createElement("div",{className:""},i.a.createElement("div",null,i.a.createElement("table",{className:"mb-16"},i.a.createElement("tbody",null,i.a.createElement("tr",null,i.a.createElement("td",{className:"pr-16 pb-4"},i.a.createElement(p.pb,{color:"inherit"},"Franchisee Code:")),i.a.createElement("td",{className:"text-left",width:"100"},i.a.createElement(p.pb,{color:"inherit"},i.a.createElement("br",null))),i.a.createElement("td",{className:"pb-4"},i.a.createElement(p.pb,{color:"inherit"},"Name"))),i.a.createElement("tr",null,i.a.createElement("td",{className:"pr-16"},i.a.createElement(p.pb,{color:"inherit"},n)),i.a.createElement("td",{className:"text-left",width:"100"},i.a.createElement(p.pb,{color:"inherit"},i.a.createElement("br",null))),i.a.createElement("td",null,i.a.createElement(p.pb,{color:"inherit"},c[0].FRAN_NAME)))))),i.a.createElement("div",{className:""},i.a.createElement("h2",null,"Customer Account Totals"),i.a.createElement("div",{style:{width:"100%",borderBottom:"2px solid rgb(0, 0, 0)"}}),i.a.createElement("div",{style:{width:"100%",borderBottom:"2px solid rgb(0, 0, 0)"}},i.a.createElement("table",{style:{width:"100%"}},i.a.createElement("tbody",null,i.a.createElement("tr",null,i.a.createElement("td",{width:"65"},i.a.createElement(p.pb,null,"Customer")),i.a.createElement("td",{width:"253"}),i.a.createElement("td",{className:"text-right",width:"70"},i.a.createElement(p.pb,null,"Contract"),i.a.createElement(p.pb,null,"Billing")),i.a.createElement("td",{className:"text-right",width:"70"},i.a.createElement(p.pb,null,"Current"),i.a.createElement(p.pb,null,"Month")),i.a.createElement("td",{className:"text-right",width:"70"},i.a.createElement(p.pb,null,"Addtl Bill"),i.a.createElement(p.pb,null,"Franchisee")),i.a.createElement("td",{className:"text-right",width:"70"},"Client Supplies"),i.a.createElement("td",{className:"text-right",width:"70"},"Additional Bill Office"),i.a.createElement("td",{className:"text-right",width:"70"},i.a.createElement(p.pb,null,"Finders"),i.a.createElement(p.pb,null,"Fee Nbr")),i.a.createElement("td",{className:"text-right",width:"70"},i.a.createElement(p.pb,null,"Finders"),i.a.createElement(p.pb,null,"Fee")))))),i.a.createElement("table",{className:"",style:{width:"100%"}},i.a.createElement("tbody",null,null!=d&&d.map(function(e,t){return i.a.createElement("tr",{key:t},i.a.createElement("td",{width:"65"},i.a.createElement(p.pb,null,e.CUST_NO)),i.a.createElement("td",{width:"250"},i.a.createElement(p.pb,null,b.a.capital_letter(e.CUS_NAME))),i.a.createElement("td",{className:"text-right",width:"70"},"$",parseFloat(e.CONT_BILL).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")),i.a.createElement("td",{className:"text-right",width:"70"},"$",parseFloat(e.CUR_MONTH).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")),i.a.createElement("td",{className:"text-right",width:"70"},"$",parseFloat(e.ADTL_B_FRN).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")),i.a.createElement("td",{className:"text-right",width:"70"},"$",parseFloat(e.CLIENT_SUP).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")),i.a.createElement("td",{className:"text-right",width:"70"},"$",parseFloat(e.ADTL_B_OFC).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")),i.a.createElement("td",{className:"text-right",width:"70"},e.FF_NBR),i.a.createElement("td",{className:"text-right",width:"70"},"$",parseFloat(e.FF_PYMNT).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")))}))),i.a.createElement("div",{style:{width:"100%",borderBottom:"2px solid rgb(0, 0, 0)"}}),i.a.createElement("div",{style:{width:"100%"}},i.a.createElement("table",{style:{width:"100%"}},i.a.createElement("tbody",null,i.a.createElement("tr",null,i.a.createElement("td",{width:"325"},i.a.createElement(p.pb,null,"Franchisee Actual Amount")),i.a.createElement("td",{className:"text-right",width:"70"},"$",U.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")),i.a.createElement("td",{className:"text-right",width:"70"},"$",P.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")),i.a.createElement("td",{className:"text-right",width:"70"},"$",X.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")),i.a.createElement("td",{className:"text-right",width:"70"},"$",k.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")),i.a.createElement("td",{className:"text-right",width:"70"},"$",H.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")),i.a.createElement("td",{className:"text-right",width:"70"}),i.a.createElement("td",{className:"text-right",width:"70"},"$",Y.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")))))))))),i.a.createElement(p.d,{className:h()(t.card,"mx-auto mt-64")},i.a.createElement(p.f,{className:h()(t.cardContent,"p-32 print:p-0")},i.a.createElement("div",null,i.a.createElement("table",{align:""},i.a.createElement("tbody",null,this.renderHeader()))),i.a.createElement("div",{className:""},i.a.createElement("div",null,i.a.createElement("table",{className:"mb-16"},i.a.createElement("tbody",null,i.a.createElement("tr",null,i.a.createElement("td",{className:"pr-16 pb-4"},i.a.createElement(p.pb,{color:"inherit"},"Franchisee Code:")),i.a.createElement("td",{className:"text-left",width:"100"},i.a.createElement(p.pb,{color:"inherit"},i.a.createElement("br",null))),i.a.createElement("td",{className:"pb-4"},i.a.createElement(p.pb,{color:"inherit"},"Name"))),i.a.createElement("tr",null,i.a.createElement("td",{className:"pr-16"},i.a.createElement(p.pb,{color:"inherit"},n)),i.a.createElement("td",{className:"text-left",width:"100"},i.a.createElement(p.pb,{color:"inherit"},i.a.createElement("br",null))),i.a.createElement("td",null,i.a.createElement(p.pb,{color:"inherit"},c[0].FRAN_NAME)))))),i.a.createElement("div",{className:""},i.a.createElement("h2",null,"Supply Transactions"),i.a.createElement("div",{style:{width:"100%",borderBottom:"2px solid rgb(0, 0, 0)"}}),i.a.createElement("div",{style:{width:"100%"}},i.a.createElement("table",{style:{width:"100%"}},i.a.createElement("tbody",null,i.a.createElement("tr",null,i.a.createElement("td",{className:"text-left",width:"350"},"Description"),i.a.createElement("td",{className:"text-right",width:"70"},"Quantity"),i.a.createElement("td",{className:"text-right",width:"70"},"Unit Cost"),i.a.createElement("td",{className:"text-right",width:"70"},"Extended"),i.a.createElement("td",{className:"text-right",width:"70"},"Tax"),i.a.createElement("td",{className:"text-right",width:"70"},"Total Amt"))))),null!=E&&i.a.createElement("div",{style:{width:"100%",borderBottom:"2px solid rgb(0, 0, 0)"}}),i.a.createElement("table",{className:"",style:{width:"100%"}},i.a.createElement("tbody",null,null!=E&&E.map(function(e,t){return i.a.createElement("tr",{key:t},i.a.createElement("td",{width:"350"},i.a.createElement(p.pb,null,b.a.capital_letter(e.DESCR))),i.a.createElement("td",{className:"text-right",width:"70"},e.QUANTITY),i.a.createElement("td",{className:"text-right",width:"70"},"$",parseFloat(e["UNIT COST"]).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")),i.a.createElement("td",{className:"text-right",width:"70"},"$",parseFloat(e.EXTENDED).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")),i.a.createElement("td",{className:"text-right",width:"70"},"$",parseFloat(e.TRX_TAX).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")),i.a.createElement("td",{className:"text-right",width:"70"},"$",parseFloat(e.TRX_TOT).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")))}))),i.a.createElement("div",{style:{width:"100%",borderBottom:"2px solid rgb(0, 0, 0)"}}),i.a.createElement("div",{style:{width:"100%"}},i.a.createElement("table",{style:{width:"100%"}},i.a.createElement("tbody",null,i.a.createElement("tr",null,i.a.createElement("td",{width:"350"},i.a.createElement(p.pb,null,"Total Supplies")),i.a.createElement("td",{width:"70",className:"text-right"}),i.a.createElement("td",{width:"70",className:"text-right"}),i.a.createElement("td",{width:"70",className:"text-right"},"$",B.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")),i.a.createElement("td",{width:"70",className:"text-right"},"$",D.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")),i.a.createElement("td",{width:"70",className:"text-right"},"$",I.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")))))))))),null!==u&&i.a.createElement(p.d,{className:h()(t.card,"mx-auto mt-64")},i.a.createElement(p.f,{className:h()(t.cardContent,"p-32 print:p-0")},i.a.createElement("div",null,i.a.createElement("table",{align:""},i.a.createElement("tbody",null,this.renderHeader()))),i.a.createElement("div",{className:""},i.a.createElement("div",null,i.a.createElement("table",{className:"mb-16"},i.a.createElement("tbody",null,i.a.createElement("tr",null,i.a.createElement("td",{className:"pr-16 pb-4"},i.a.createElement(p.pb,{color:"inherit"},"Franchisee Code:")),i.a.createElement("td",{className:"text-left",width:"100"},i.a.createElement(p.pb,{color:"inherit"},i.a.createElement("br",null))),i.a.createElement("td",{className:"pb-4"},i.a.createElement(p.pb,{color:"inherit"},"Name"))),i.a.createElement("tr",null,i.a.createElement("td",{className:"pr-16"},i.a.createElement(p.pb,{color:"inherit"},n)),i.a.createElement("td",{className:"text-left",width:"100"},i.a.createElement(p.pb,{color:"inherit"},i.a.createElement("br",null))),i.a.createElement("td",null,i.a.createElement(p.pb,{color:"inherit"},c[0].FRAN_NAME)))))),i.a.createElement("div",{className:"mt-64"},i.a.createElement("table",{className:"simple invoice-table"},i.a.createElement("thead",null,i.a.createElement("tr",null,i.a.createElement("th",null,i.a.createElement("h2",null,"Charge Backs")))),i.a.createElement("tbody",null,i.a.createElement("tr",null,i.a.createElement("td",null,i.a.createElement(p.pb,null,"Description")),i.a.createElement("td",{className:"text-center"},"Tax Amt"),i.a.createElement("td",{className:"text-center"},"Tax"),i.a.createElement("td",{className:"text-center"},"Total Amt")),null!=u&&u.map(function(e,t){return i.a.createElement("tr",{key:t},i.a.createElement("td",null,i.a.createElement(p.pb,null,b.a.capital_letter(e.DESCR))),i.a.createElement("td",{className:"text-right"},"$",parseFloat(e.TRX_AMT).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")),i.a.createElement("td",{className:"text-right"},"$",parseFloat(e.TRX_TAX).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")),i.a.createElement("td",{className:"text-right"},"$",parseFloat(e.TRX_TOT).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")))}),i.a.createElement("tr",null,i.a.createElement("td",null,i.a.createElement(p.pb,null,"Total Charge Backs")),i.a.createElement("td",{className:"text-right"},"$",$.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")),i.a.createElement("td",{className:"text-right"},"$",f.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")),i.a.createElement("td",{className:"text-right"},"$",C.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,"))))))))),i.a.createElement(p.d,{className:h()(t.card,"mx-auto mt-64")},i.a.createElement(p.f,{className:h()(t.cardContent,"p-32 print:p-0")},i.a.createElement("div",null,i.a.createElement("table",{align:""},i.a.createElement("tbody",null,this.renderHeader()))),i.a.createElement("div",{className:""},i.a.createElement("div",null,i.a.createElement("table",{className:"mb-16"},i.a.createElement("tbody",null,i.a.createElement("tr",null,i.a.createElement("td",{className:"pr-16 pb-4"},i.a.createElement(p.pb,{color:"inherit"},"Franchisee Code:")),i.a.createElement("td",{className:"text-left",width:"100"},i.a.createElement(p.pb,{color:"inherit"},i.a.createElement("br",null))),i.a.createElement("td",{className:"pb-4"},i.a.createElement(p.pb,{color:"inherit"},"Name"))),i.a.createElement("tr",null,i.a.createElement("td",{className:"pr-16"},i.a.createElement(p.pb,{color:"inherit"},n)),i.a.createElement("td",{className:"text-left",width:"100"},i.a.createElement(p.pb,{color:"inherit"},i.a.createElement("br",null))),i.a.createElement("td",null,i.a.createElement(p.pb,{color:"inherit"},c[0].FRAN_NAME)))))),i.a.createElement("h2",null,"Leases"),i.a.createElement("div",{style:{width:"100%",borderBottom:"2px solid rgb(0, 0, 0)"}}),i.a.createElement("table",{style:{width:"100%",borderBottom:"2px solid rgb(0, 0, 0)"}},i.a.createElement("tbody",null,i.a.createElement("tr",null,i.a.createElement("td",{width:"100",className:"text-left"},"Lease Date"),i.a.createElement("td",{width:"100",className:"text-right"},"Lease No"),i.a.createElement("td",{width:"300",className:"text-right"},"Description & Serial Number"),i.a.createElement("td",{width:"100",className:"text-right"},"Payment#"),i.a.createElement("td",{width:"100",className:"text-right"},"Amount"),i.a.createElement("td",{width:"100",className:"text-right"},"Tax"),i.a.createElement("td",{width:"100",className:"text-right"},"Total")))),i.a.createElement("div",{className:""},i.a.createElement("table",{className:"",style:{width:"100%"}},i.a.createElement("tbody",null,null!=s&&s.map(function(e,t){return i.a.createElement("tr",{key:t},i.a.createElement("td",{width:"100",className:"text-left"},i.a.createElement(p.pb,null,e.LEASE_DATE)),i.a.createElement("td",{width:"100",className:"text-right"},e.LEASE_NO),i.a.createElement("td",{width:"300",className:"text-right"},b.a.capital_letter(e.DESCR)),i.a.createElement("td",{width:"100",className:"text-right"},e.PYMNT_NUM),i.a.createElement("td",{width:"100",className:"text-right"},"$",parseFloat(e.PYMNT_AMT).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")),i.a.createElement("td",{width:"100",className:"text-right"},"$",parseFloat(e.PYMNT_TAX).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")),i.a.createElement("td",{width:"100",className:"text-right"},"$",parseFloat(e.PYMNT_TOT).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")))}))),null!=s&&i.a.createElement("div",{style:{width:"100%",borderBottom:"2px solid rgb(0, 0, 0)"}}),i.a.createElement("table",{style:{width:"100%"}},i.a.createElement("tbody",null,i.a.createElement("tr",null,i.a.createElement("td",{width:"100",className:"text-left"},i.a.createElement(p.pb,null,"Lease Totals")),i.a.createElement("td",{width:"100",className:"text-right"}),i.a.createElement("td",{width:"300",className:"text-right"}),i.a.createElement("td",{width:"100",className:"text-right"}),i.a.createElement("td",{width:"100",className:"text-right"},"$",R.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")),i.a.createElement("td",{width:"100",className:"text-right"},"$",v.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")),i.a.createElement("td",{width:"100",className:"text-right"},"$",S.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,"))))))))),null!==o&&i.a.createElement(p.d,{className:h()(t.card,"mx-auto mt-64")},i.a.createElement(p.f,{className:h()(t.cardContent,"p-32 print:p-0")},i.a.createElement("div",null,i.a.createElement("table",{align:""},i.a.createElement("tbody",null,this.renderHeader()))),i.a.createElement("div",{className:""},i.a.createElement("div",null,i.a.createElement("table",{className:"mb-16"},i.a.createElement("tbody",null,i.a.createElement("tr",null,i.a.createElement("td",{className:"pr-16 pb-4"},i.a.createElement(p.pb,{color:"inherit"},"Franchisee Code:")),i.a.createElement("td",{className:"text-left",width:"100"},i.a.createElement(p.pb,{color:"inherit"},i.a.createElement("br",null))),i.a.createElement("td",{className:"pb-4"},i.a.createElement(p.pb,{color:"inherit"},"Name"))),i.a.createElement("tr",null,i.a.createElement("td",{className:"pr-16"},i.a.createElement(p.pb,{color:"inherit"},n)),i.a.createElement("td",{className:"text-left",width:"100"},i.a.createElement(p.pb,{color:"inherit"},i.a.createElement("br",null))),i.a.createElement("td",null,i.a.createElement(p.pb,{color:"inherit"},c[0].FRAN_NAME)))))),i.a.createElement("div",{className:""},i.a.createElement("h2",null,"Regular Misc"),i.a.createElement("div",{style:{width:"100%",borderBottom:"2px solid rgb(0, 0, 0)"}}),i.a.createElement("table",{style:{width:"100%"}},i.a.createElement("tbody",null,i.a.createElement("tr",null,i.a.createElement("td",{width:"100",className:"text-left"},i.a.createElement(p.pb,null,"Type")),i.a.createElement("td",{width:"400",className:"text-left"},"Description"),i.a.createElement("td",{width:"100",className:"text-right"},"Tax Amt"),i.a.createElement("td",{width:"100",className:"text-right"},"Tax"),i.a.createElement("td",{width:"100",className:"text-right"},"Total Amt")))),null!==o&&i.a.createElement("div",{style:{width:"100%",borderBottom:"2px solid rgb(0, 0, 0)"}}),i.a.createElement("table",{className:"",style:{width:"100%"}},i.a.createElement("tbody",null,null!==o&&o.map(function(e,t){return i.a.createElement("tr",{key:t},i.a.createElement("td",{width:"100",className:"text-left"},e.TYPE),i.a.createElement("td",{width:"400",className:"text-left"},i.a.createElement(p.pb,null,b.a.capital_letter(e.DESCR))),i.a.createElement("td",{width:"100",className:"text-right"},parseFloat(e.TRX_AMT).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")),i.a.createElement("td",{width:"100",className:"text-right"},parseFloat(e.TRX_TAX).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")),i.a.createElement("td",{width:"100",className:"text-right"},parseFloat(e.TRX_TOT).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")))}))),i.a.createElement("div",{style:{width:"100%",borderBottom:"2px solid rgb(0, 0, 0)"}}),i.a.createElement("table",{style:{width:"100%"}},i.a.createElement("tbody",null,i.a.createElement("tr",null,i.a.createElement("td",{width:"100",className:"text-left"},i.a.createElement(p.pb,null,"Total Regular")),i.a.createElement("td",{width:"400",className:"text-right"}),i.a.createElement("td",{width:"100",className:"text-right"},L.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")),i.a.createElement("td",{width:"100",className:"text-right"},O.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")),i.a.createElement("td",{width:"100",className:"text-right"},M.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,"))))))))))}}]),t}(d.Component);var w={width:"65%",borderBottom:"2px solid #25058a"};t.default=Object(u.withStyles)(function(e){return{root:{flexGrow:1,"& table ":{"& th:first-child, & td:first-child":{paddingLeft:"0!important"},"& th:last-child, & td:last-child":{paddingRight:"0!important"}}},paper:{padding:1*e.spacing.unit,textAlign:"center",color:e.palette.text.secondary},card:{width:1020,"@media print":{width:"100%!important",boxShadow:"none"}},cardContent:{},divider:{width:1,backgroundColor:e.palette.divider,height:144},seller:{backgroundColor:e.palette.primary.dark,color:e.palette.getContrastText(e.palette.primary.dark),marginRight:-88,paddingRight:66,width:480,"& .divider":{backgroundColor:e.palette.getContrastText(e.palette.primary.dark),opacity:.5}},textField:{marginLeft:e.spacing.unit,marginRight:e.spacing.unit,width:200},longerTextField:{marginLeft:e.spacing.unit,marginRight:e.spacing.unit,width:835}}})(Object(E.g)(Object(s.a)(function(e){var t=e.auth;return{franchiseeReport:e.franchiseeReports.franchiseeReport,all_regions:t.login.all_regions}},function(e){return Object(N.c)({getReport:x.ld},e)})(g)))}}]);
//# sourceMappingURL=31.6ffd8aa1.chunk.js.map