import React from "react";
import { withRouter } from "react-router-dom";
import { Menu } from 'antd';
import * as AntdIcons from '@ant-design/icons';
import { route_url as routeUrl } from '../../AppConfigs'
const { SubMenu } = Menu;
/**
 * Root Component for Navbar
 */
function capitalize(s) {
    return s && s[0].toUpperCase() + s.slice(1);
}
let defaultOpenKeys = []
let defaultSelectedKeys = []
class Navbar extends React.Component {
    route = process.env.REACT_APP_PROJECT_ROUTE === "/null" ? this.props.location.pathname.substr(1).split("/")[0] : this.props.location.pathname.substr(1).split("/")[1];
    onSelectNavbarItem = (e) => {
        this.props.history.push({
            pathname: routeUrl.url + '/' + e.key,
        });
        if(window.screen.width<600){
            this.props.toggleNavigation()
        }
        this.setPageTitle(e.key)
    }

    componentDidMount() {
        this.setPageTitle(this.route)
    }

    setPageTitle = (sectionName) => {
        if (this.props.screens && this.props.screens.length > 0) {
            this.props.screens.forEach((section) => {
                section.screens.forEach((subSection) => {
                    if (subSection.screen === sectionName) {
                        this.props.changePageTitle(subSection.title);
                        return
                    }
                });
            });
        } else {
            this.props.changePageTitle(this.route);
        }
    }

    render() {
        let screens = this.props.screens.filter((s) => s.sectionName.toLowerCase() !== 'dashboard');
        this.props.screens.forEach((section) => {
            section.screens.forEach((subSection) => {
                if (subSection.screen === this.route) {
                    defaultSelectedKeys.push(subSection.screen)
                    defaultOpenKeys.push(section.sectionName)
                }
            })
        });

        return (
            <div id="sidebar-wrapper">
                <Menu
                    onClick={this.onSelectNavbarItem}
                    mode="inline"
                    defaultOpenKeys={defaultOpenKeys}
                    defaultSelectedKeys={defaultSelectedKeys}
                >
                    {screens.map((section, id) => {
                        if (section.sectionName === "ApprovalForm") {
                            return null;
                        }
                        let SectionIcon = AntdIcons[section.icon]
                        return (<>
                            {section.screens.map((each) => each.type === "section" && <Menu.Item icon={<SectionIcon />} key={each.screen}>{capitalize(each.title)}</Menu.Item>)}
                            <SubMenu key={section.sectionName} icon={<SectionIcon />} title={section.sectionName}>
                                {section.screens.map((subSection, id) => subSection.type !== "section" && <Menu.Item key={subSection.screen}>{capitalize(subSection.title)}</Menu.Item>)}
                            </SubMenu>
                        </>
                        )

                    })
                    }
                </Menu>
            </div>
        );
    }

}

export default withRouter(Navbar);