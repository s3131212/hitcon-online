// Copyright 2021 HITCON Online Contributors
// SPDX-License-Identifier: BSD-2-Clause

import {MapCoord} from '/static/common/maplib/map.mjs';
import InteractiveObjectClientBaseClass from '/static/common/interactive-object/client.mjs';

// const LAYER_NPC = {zIndex: 9, layerName: 'NPC'}

// /**
//  * This class is the browser/client side of an extension.
//  * One instance is created for each connected player.
//  */
// class Client {
//   /**
//    * Create the client side of the extension.
//    * @constructor
//    * @param {ClientExtensionHelper} helper - An extension helper object for
//    * servicing various functionalities of the extension.
//    */
//   constructor(helper) {
//     this.helper = helper;

//     // Force `this.NPCs` to be const so that mapRenderer will always access the identical list of NPCs.
//     // The format of `this.NPCs` is similar to `GameState.players`.
//     Object.defineProperty(this, 'NPCs', {
//       value: {},
//       writable: false,
//       configurable: false,
//     });
//   }

//   /**
//    * The initialization function.
//    */
//   async gameStart() {
//     this.helper.mapRenderer.registerCustomizedLayerToDraw(
//       LAYER_NPC.zIndex,
//       LAYER_NPC.layerName,
//       '_drawCharacters',
//       this.NPCs,
//     );
//   }
// }

/**
 * TODO: jsdoc
 */
class SingleNPC extends InteractiveObjectClientBaseClass {
  /**
   * TODO
   * @param {ClientExtensionHelper} helper - The extension helper.
   * @param {String} npcName - The name of the NPC.
   * @param {MapCoord} initialPosition - TODO
   * @param {Array} displayConfig - TODO
   */
  constructor(helper, npcName, initialPosition, displayConfig) {
    const mapCoord = initialPosition;
    const facing = 'D';

    for (const cfg of displayConfig) {
      if (cfg.layerName === 'npcImage') {
        cfg.renderArgs = {
          mapCoord: mapCoord,
          displayChar: cfg.character,
          facing: facing,
          getDrawInfo() {
            return {mapCoord: this.mapCoord, displayChar: this.displayChar, facing: this.facing};
          },
        };
      } else if (cfg.layerName === 'npcName') {
        cfg.renderArgs = {
          mapCoord: mapCoord,
          displayName: npcName,
          getDrawInfo() {
            return {mapCoord: this.mapCoord, displayName: this.displayName};
          },
        };
      }
    }

    const interactFunction = () => {
      helper.callC2sAPI('npc', 'startInteraction', this.helper.defaultTimeout, npcName);
    };

    super(helper, initialPosition, displayConfig, interactFunction);
    this.npcName = npcName;
  }
}

/**
 * TODO: jsdoc
 */
class Client {
  /**
   * Create the client side of the extension.
   * @constructor
   * @param {ClientExtensionHelper} helper - An extension helper object for
   * servicing various functionalities of the extension.
   */
  constructor(helper) {
    this.helper = helper;
    this.NPCs = new Map();
  }

  /**
   * The initialization function.
   */
  async gameStart() {
    const listOfNPCs = await this.getListOfNPCs();
    for (const npcName of listOfNPCs) {
      const initialPosition = MapCoord.fromObject(await this.helper.callC2sAPI('npc', 'getInitialPosition', this.helper.defaultTimeout, npcName));
      const displayConfig = await this.helper.callC2sAPI('npc', 'getDisplayInfo', this.helper.defaultTimeout, npcName);
      const npc = new SingleNPC(this.helper, npcName, initialPosition, displayConfig);
      this.NPCs.set(npcName, npc);
    }
  }

  /**
   * TODO
   * @return {Array}
   */
  async getListOfNPCs() {
    return await this.helper.callC2sAPI('npc', 'getListOfNPCs', this.helper.defaultTimeout);
  }
}

export default Client;
