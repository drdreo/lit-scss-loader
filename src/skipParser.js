/**
 * Checks whether the query contains ?skip or not.
 */

function skip (query) {
  return /(\?|\&)skip($|&)/gi.test(query);
}

/**
 * If it contains "include", returns true.
 * @param {*} query The query that goes after the .css|.sass|.less
 * extension 
 */
function include(query) {
  return /(\?|\&)include($|&)/gi.test(query);
}

module.exports = { skip, include };

