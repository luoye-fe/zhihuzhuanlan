// redusers 集合

import utils from '../../util/index.js';

import { combineReducers } from 'redux';

var reducer = {};

import common from './common.js';

utils.mixin(reducer, common);

var rootReduce = combineReducers(reducer);

export default rootReduce;
