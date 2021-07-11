import React, { FC } from 'react';
import { hot } from 'react-hot-loader/root';
import { Route, Switch } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import Header from './components/Header';
import Footer from './components/Footer';
import Settings from './components/Settings';

const App: FC = () => {
  return (
    <>
      <Header></Header>
      <Settings></Settings>
      <section className="main-content">
        <Switch>
          <Route path="/" component={HomePage} exact strict></Route>
        </Switch>
      </section>
      <Footer></Footer>
    </>
  );
};

export default hot(App);
