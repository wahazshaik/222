import {Timeline} from "antd";
import React from "react";
import moment from "moment";

class TimeLine extends React.Component {
    render() {
        if (this.props.versionList !== null && this.props.versionList !== undefined && this.props.versionList.length > 0) {
            let changeFields;
            let x = [];
            x = this.props.versionList[1].map((item) => {
                if (item.change && Object.keys(item.change).length !== 0) {
                    changeFields = Object.keys(item.change.values_changed);
                    return (
                        <Timeline.Item color="red">
                            {changeFields.map((element) => {
                                var a = element.substring(element.indexOf("'"), element.indexOf("]")).replace(/'/g, "");
                                return (
                                    <span>
                    <b>{item.user}</b> Changed{" "}
                                        <b>
                      {item.model ? " " + item.model + " " : ""}
                                            {item.id ? " " + item.id + " " : ""}
                                            {a} from <b></b>
                                            {item.change.values_changed[element].old_value.toString()}
                    </b>{" "}
                                        to
                    <b>
                      {" " +
                      item.change.values_changed[
                          element
                          ].new_value.toString()}
                    </b>{" "}
                                        -- at --{" "}
                                        <b>
                      {moment(item.date, "YYYY-MM-DDTHH:mm:ss").format(
                          "DD-MM-YYYY HH:mm:ss"
                      )}
                    </b>
                    <br/>
                  </span>
                                );
                            })}
                        </Timeline.Item>
                    );
                }
                return null;
            });

            return (
                <Timeline>
                    <Timeline.Item color="green">
                        <p>
              <span>
                Object Created by --{" "}
                  <b>{this.props.versionList[0][0].created_by}</b> -- at --{" "}
                  <b>
                  {moment(
                      this.props.versionList[0][0].created_at,
                      "YYYY-MM-DD"
                  ).format("YYYY-MM-DD")}
                </b>{" "}
              </span>
                        </p>
                    </Timeline.Item>
                    {x}
                </Timeline>
            );
        } else {
            return null;
        }
    }
}

export default TimeLine;
