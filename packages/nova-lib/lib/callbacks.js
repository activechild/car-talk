/**
 * @summary Callback hooks provide an easy way to add extra steps to common operations. 
 * @namespace Telescope.callbacks
 */
Telescope.callbacks = {};

/**
 * @summary Add a callback function to a hook
 * @param {String} hook - The name of the hook
 * @param {Function} callback - The callback function
 */
Telescope.callbacks.add = function (hook, callback) {

  // if callback array doesn't exist yet, initialize it
  if (typeof Telescope.callbacks[hook] === "undefined") {
    Telescope.callbacks[hook] = [];
  }

  Telescope.callbacks[hook].push(callback);
};

/**
 * @summary Remove a callback from a hook
 * @param {string} hook - The name of the hook
 * @param {string} functionName - The name of the function to remove
 */
Telescope.callbacks.remove = function (hookName, callbackName) {
  Telescope.callbacks[hookName] = _.reject(Telescope.callbacks[hookName], function (callback) {
    return callback.name === callbackName;
  });
};

/**
 * @summary Successively run all of a hook's callbacks on an item
 * @param {String} hook - The name of the hook
 * @param {Object} item - The post, comment, modifier, etc. on which to run the callbacks
 * @param {Object} [constant] - An optional constant that will be passed along to each callback
 * @returns {Object} Returns the item after it's been through all the callbacks for this hook
 */
Telescope.callbacks.run = function (hook, item, constant) {

  var callbacks = Telescope.callbacks[hook];

  if (typeof callbacks !== "undefined" && !!callbacks.length) { // if the hook exists, and contains callbacks to run

    return callbacks.reduce(function(result, callback) {
      // console.log(callback.name);
      return callback(result, constant);
    }, item);

  } else { // else, just return the item unchanged
    return item;
  }
};

/**
 * @summary Successively run all of a hook's callbacks on an item, in async mode (only works on server)
 * @param {String} hook - The name of the hook
 * @param {Object} item - The post, comment, modifier, etc. on which to run the callbacks
 * @param {Object} [constant] - An optional constant that will be passed along to each callback 
 */
Telescope.callbacks.runAsync = function () {

  // the first argument is the name of the hook
  var hook = arguments[0];
  // successive arguments are passed to each iteration
  var args = Array.prototype.slice.call(arguments).slice(1);
  var callbacks = Telescope.callbacks[hook];

  if (Meteor.isServer && typeof callbacks !== "undefined" && !!callbacks.length) {

    // use defer to avoid holding up client
    Meteor.defer(function () {
      // run all post submit server callbacks on post object successively
      callbacks.forEach(function(callback) {
        // console.log("// "+hook+": running callback ["+callback.name+"] at "+moment().format("hh:mm:ss"))
        callback.apply(this, args);
      });
    });
  
  }

};