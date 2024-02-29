import React, { Fragment, useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

// Layout

import AppHeader from "../../Layout/AppHeader/";
import AppSidebar from "../../Layout/AppSidebar/";
import AppFooter from "../../Layout/AppFooter/";

// Theme Options

import ThemeOptions from "../../Layout/ThemeOptions/";
import PageTitleAlt2 from "../../Layout/AppMain/PageTitleAlt2";
import UserData from "./UserData";
const User = () => {

  return (
    <Fragment>
      <ThemeOptions />
      <AppHeader />
      <div className="app-main">
        <AppSidebar />
        <div className="app-main__outer">
          <div className="app-main__inner">
            <TransitionGroup>
              <CSSTransition component="div" classNames="TabsAnimation" appear={true}
                timeout={1500} enter={false} exit={false}>
                <div>
                  <PageTitleAlt2 heading="User Managment"
                    subheading="Yet another dashboard built using only the included Architech elements and components."
                    icon="pe-7s-graph icon-gradient bg-ripe-malin" />
                    <UserData />
                </div>
              </CSSTransition>
            </TransitionGroup>
          </div>
          <AppFooter />
        </div>
      </div>
    </Fragment>
  )
}

export default User;
