/**
 * Created by drmabuse on 18/07/15.
 */
'use strict';

let React = require('react-native');

class GalleryService {
  constructor(){

  }

  fetchImages(){
    return fetch('http://localhost:3000/gallery', {headers: {'Accept': 'application/json'}});
  }
}

module.exports = GalleryService;