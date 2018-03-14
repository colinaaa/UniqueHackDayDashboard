import * as React from 'react';
import { Switch, Route } from 'react-router';
import { connect } from 'react-redux';
import Loadable from 'react-loadable';

import { RootState } from '../../redux/reducers';
import { MediaQuery } from '../../redux/reducers/mediaQuery';

const DashboardLayout = Loadable({
  loader: () => import('../../Layouts/DashboardLayout'),
  loading: () => <div>正在加载...</div>,
});

const ConsoleLoadable = Loadable({
  loader: () => import('../Console'),
  loading: () => <div>正在加载</div>,
});

const TeamConsoleLoadable = Loadable({
  loader: () => import('../TeamConsole'),
  loading: () => <div>正在加载</div>,
});

const Dashboard: React.SFC<{ mediaQuery: MediaQuery }> = props => {
  return (
    <DashboardLayout mode={props.mediaQuery}>
      <Switch>
        <Route path="/console" component={ConsoleLoadable} />
        <Route path="/team_info" component={TeamConsoleLoadable} />
      </Switch>
    </DashboardLayout>
  );
};

export default connect((state: RootState) => {
  return state;
})(Dashboard);
