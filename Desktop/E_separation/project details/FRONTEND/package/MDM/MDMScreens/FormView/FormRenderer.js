import React, {Component} from "react";
import {layout_mapping} from "../../MDMUIConfigs/MDMUILayout";
import {component_mapping} from "../../MDMUIConfigs/MDMUIContentMapping";
import {validator_mapping} from "../../MDMCustomValidators/MDMCustomValidatorsMapping";
import {APP_NAME, route_url} from "../../../AppConfigs";
import {routeMode} from "../../MDMUIConfigs/MDMUIMappings";
import {Skeleton} from "antd";

const APP = APP_NAME.MASTER;

export default class FormRenderer extends Component {

    render() {
        if (window.location.pathname.includes(route_url.url)) {
            if (this.props.routeState !== routeMode.new) {
                var subsection = this.props.sections[0];
                if (subsection != null) {
                    subsection.colComponent.forEach((item, id) => {
                        subsection.permissions.forEach((permissions) => {
                            if (permissions.codename.slice(16) === item.decorator) {
                                subsection.colComponent[id].disabled = true;
                            }
                        });
                    })
                }
            }
        }

        return (
            <div>
                {this.props.sections.map((subsection, id) => {
                    return (
                        <div className="row form-box" key={id} id={subsection.sectionlabel}>
                            <legend key={subsection.sectionlabel} className="form-legend">
                                {subsection.sectionlabel}
                            </legend>
                            <div style={{width: "100%", padding: "25px"}}
                                 hidden={this.props.hasOwnProperty("showFormDataLoader") ? !this.props.showFormDataLoader : true}>

                                <Skeleton style={{padding: "25px"}} loading={true} active/>
                                <p style={{
                                    textAlign: "center",
                                    margin: "0px",
                                    fontSize: "20px",
                                    marginTop: "20px"
                                }}>Loading data...</p>
                                <Skeleton style={{padding: "25px"}} loading={true} active/>
                            </div>
                            {subsection.colComponent.map((element) => {
                                return (
                                    <div
                                        hidden={this.props.hasOwnProperty("showFormDataLoader") ? this.props.showFormDataLoader : false}
                                        id={element.id}
                                        className={layout_mapping[subsection.cols]}
                                        key={element.id}
                                    >
                                        {React.createElement(
                                            component_mapping[element.type],
                                            {
                                                ...element,
                                                ...this.props,
                                                validators: validator_mapping[APP][subsection.sectionlabel] ? validator_mapping[APP][subsection.sectionlabel]["field-validators"][element.label] ? validator_mapping[APP][subsection.sectionlabel]["field-validators"][element.label] : [] : [],
                                                options: this.props.dropdownValueSelected ? this.props.dropdownValueSelected[element.link_api] : [],
                                            }
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        );
    }
}
