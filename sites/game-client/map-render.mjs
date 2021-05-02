// Copyright 2021 HITCON Online Contributors
// SPDX-License-Identifier: BSD-2-Clause

/**
 * MapRender renders the map onto the a canvas element.
 */
class MapRender {
  /**
   * Create a new MapRender.
   * @param {Canvas} canvas - The canvas to draw onto.
   * @param {Map} map - The map object to retrieve the map information.
   */
  constructor(canvas, map) {
  }

  /**
   * Set the position of the viewer, that is, the player that is playing right
   * now.
   * Calling this method only updates the parameters for calculating the
   * viewport location. (which part of the map is visible) It doesn't draw the
   * player.
   * @param {Number} x - The x coordinate.
   * @param {Number} y - The y coordinate.
   */
  setViewerPosition(x, y) {
  }

  /**
   * Add or set the position of user/player that should be drawn on the canvas.
   * @param {Object} player - User information. It should include:
   *  - uid: UID of the user.
   *  - x: X coordinate.
   *  - y: Y coordinate.
   *  - facing: 'U', 'D', 'L', 'R'. The direction the user is facing.
   */
  setPlayerPosition(player) {
  }

  /**
   * Converts canvas coordinate to map coordinate.
   * @param {Number} x - The x coordinate in the canvas.
   * @param {Number} y - The y coordinate in the canvas.
   * @return {Object} coordinate - The map coordinate. coordinate.x and
   * coordinate.y is available.
   */
  canvasToMapCoordinate(x, y) {
  }

  /**
   * Draw everything onto the canvas. If there's something in the canvas,
   * clean it up then draw.
   * @return {Boolean} success - Return true if successful.
   */
  draw() {
  }

  /**
   * Draw a specific cell. All layers at that location is drawn.
   * If there is something at that cell, clean it up then draw.
   * If the specified coordinate is not within the current viewport/canvas,
   * then do nothing and return true.
   * @param {Number} x - The x coordinate.
   * @param {Number} y - The y coordinate.
   * @return {Boolean} success - Return true if successful.
   */
  drawCell() {
  }
}

export default MapRender;
