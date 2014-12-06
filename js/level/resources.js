// We use getters for resources because we want to return newly instanced objects, to make sure references don't start causing issues - because JavaScript
var Resources = {
    getSeed: function () {      return { type: 'seed'       }; },
    getOil: function () {       return { type: 'oil'        }; },
    getWood: function () {      return { type: 'wood'       }; },
    getFireStone: function () { return { type: 'firestone'  }; }
};