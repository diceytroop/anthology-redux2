import React from 'react';
import addons from 'react/addons';
import expect from 'expect';

import * as UserActions from '../../src/common/actions/user.js';
import configureStore from '../../src/common/store/configureStore';

describe('Auth State', function(){

  before('Set up base state', function() {
    const store = configureStore();
    this.store = store;
    this.data = {
      displayName:"Dicey",
      picture:"https://pbs.twimg.com/profile_images/596551333475323906/ikHF6Fy6_normal.jpg",
      username:"dicey__",
      token:"#########-varVAbmJmjgW6YzCTgb4Aplymts8fOsWizH3gvxl",
      id:"389880004",
      updateDate:"2015-11-27T23:54:52.752Z",
      creationDate:"2015-11-27T23:54:52.752Z",
    }
  });

  it('user state should exist', function() {
    expect(this.store.getState().user).toExist();
  });

  it('user state should instantiate as default', function() {
    expect(this.store.getState().user).toEqual({
      tokens: {},
      fetchingAuth: false
    });
  });

  it('dispatch AUTHORIZE_TWITTER should change fetchingAuth to true', function() {
    expect(this.store.getState().user).toEqual({
      tokens: {},
      fetchingAuth: false
    });
    this.store.dispatch(UserActions.authorizeTwitter);
    expect(this.store.getState().user).toEqual({
      tokens: {},
      fetchingAuth: true
    });
  });

  it('dispatch TWITTER_LOGIN with example data should set user token', function() {
    this.store.dispatch(UserActions.authorizeTwitter());
    expect(this.store.getState().user).toEqual({
      tokens: {},
      fetchingAuth: true
    });
    this.store.dispatch(UserActions.TWITTER_LOGIN, this.data);
    expect(this.store.getState().user).toEqual({

    });
  });

  it('dispatch TWITTER_FAILED should set fetchingAuth to false', function(){
    this.store.dispatch(UserActions.AUTHORIZE_TWITTER);
    expect(this.store.getState().user).toEqual({
      tokens: {},
      fetchingAuth: true
    });
    this.store.dispatch(UserActions.TWITTER_FAILED);
    expect(this.store.getState().user).toEqual({
      tokens: {},
      fetchingAuth: false
    });
  });

  it('dispatch TWITTER_LOGOUT should remove Twitter token', function() {
    this.store.dispatch(UserActions.TWITTER_LOGIN, data);
    expect(this.store.getState().user).toEqual({
      tokens: { twitter: "#########-varVAbmJmjgW6YzCTgb4Aplymts8fOsWizH3gvxl"},
      fetchingAuth: false
    });
    this.store.dispatch(UserActions.TWITTER_LOGOUT);
    expect(this.store.getState().user).toEqual({
      tokens: {},
      fetchingAuth: false
    });
  })

});
