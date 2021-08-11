'use strict';

import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import {
  ViroARScene,
  ViroConstants,
  ViroARTrackingTargets,
  ViroMaterials,
  ViroText,
  ViroFlexView,
  ViroARImageMarker,
  ViroVideo,
  ViroAnimations,
  ViroNode,
} from 'react-viro';

const OBJECTS = {
  "devi_astriani" : {
    // source: {uri: 'https://drive.google.com/uc?export=download&id=1_Qv1LGFOGeOMtl_o16AVbOBn-fsK9FWX'},
    source : require('./res/devi_astriani.jpeg'),
    orientation : "Up",
    physicalWidth : 1,
    height: 1.9,
    // videoSource : require('./res/bri_video_1.mp4'),
    // videoSource: {uri: "https://drive.google.com/open?id=1_7FRkumIDK1NmwVz78bo5smUU1IMIACS"}
    videoSource: {uri: "https://www.arkudus.online/videos/bri_video_1.mp4"}
    // videoSource : require('./res/bri_video_1.mp4'),
  },
  "noor_hikmawati_fitriana": {
    // source: {uri: 'https://drive.google.com/uc?export=download&id=1_NB2EETdjUkrfANRrFI_UweBg5RuJ3x3'},
    source : require('./res/noor_hikmawati_fitriana.jpeg'),
    orientation : "Up",
    physicalWidth : 1,
    height: 1.9,
    // videoSource: {uri: "https://drive.google.com/uc?export=download&id=1_Gi2035TRdeRQMJmhr7lliFVeQWBt4Ae"}
    videoSource: {uri: "https://www.arkudus.online/videos/bri_video_2.mp4"}
    // videoSource : require('./res/bri_video_2.mp4'),
  },
  "ekwan_darmawan": {
    // source: {uri: 'https://drive.google.com/uc?export=download&id=1_W1XrjY2_bMqH1KjUC3EmIK1I6kQm4Rs'},
    source : require('./res/ekwan_darmawan.jpeg'),
    orientation : "Up",
    physicalWidth : 1,
    height: 1.9,
    // videoSource: {uri: "https://drive.google.com/uc?export=download&id=1_1pPJPlp9DNlunL0_LsXeOGXDQvSYC0K"}
    videoSource: {uri: "https://www.arkudus.online/videos/bri_video_3.mp4"}
    // videoSource : require('./res/bri_video_3.mp4'),
  },
  "keragaan_tri_2_bae": {
    // source: {uri: 'https://drive.google.com/uc?export=download&id=1_W1XrjY2_bMqH1KjUC3EmIK1I6kQm4Rs'},
    source : require('./res/keragaan_triwulan_2_bae.jpeg'),
    orientation : "Up",
    physicalWidth : 1,
    height: 0.9,
    // videoSource: {uri: "https://drive.google.com/uc?export=download&id=1_1pPJPlp9DNlunL0_LsXeOGXDQvSYC0K"}
    videoSource: {uri: "https://www.arkudus.online/videos/kragaan_triwulan_2_bae.mp4"}
    // videoSource : require('./res/bri_video_3.mp4'),
  },
  "bri_3m": {
    // source: {uri: 'https://drive.google.com/uc?export=download&id=1_W1XrjY2_bMqH1KjUC3EmIK1I6kQm4Rs'},
    source : require('./res/bri_3m.jpeg'),
    orientation : "Up",
    physicalWidth : 1,
    height: 0.9,
    // videoSource: {uri: "https://drive.google.com/uc?export=download&id=1_1pPJPlp9DNlunL0_LsXeOGXDQvSYC0K"}
    videoSource: {uri: "https://www.arkudus.online/videos/bri_3m.mp4"}
    // videoSource : require('./res/bri_video_3.mp4'),
  },
  "password": {
    // source: {uri: 'https://drive.google.com/uc?export=download&id=1_W1XrjY2_bMqH1KjUC3EmIK1I6kQm4Rs'},
    source : require('./res/password.jpeg'),
    orientation : "Up",
    physicalWidth : 1,
    height: 0.9,
    // videoSource: {uri: "https://drive.google.com/uc?export=download&id=1_1pPJPlp9DNlunL0_LsXeOGXDQvSYC0K"}
    videoSource: {uri: "https://www.arkudus.online/videos/password.mp4"}
    // videoSource : require('./res/bri_video_3.mp4'),
  },
  "simpedes": {
    // source: {uri: 'https://drive.google.com/uc?export=download&id=1_W1XrjY2_bMqH1KjUC3EmIK1I6kQm4Rs'},
    source : require('./res/simpedes.jpeg'),
    orientation : "Up",
    physicalWidth : 1,
    height: 0.9,
    // videoSource: {uri: "https://drive.google.com/uc?export=download&id=1_1pPJPlp9DNlunL0_LsXeOGXDQvSYC0K"}
    videoSource: {uri: "https://www.arkudus.online/videos/simpedes.mp4"}
    // videoSource : require('./res/bri_video_3.mp4'),
  }
}

export class BusinessCard extends Component {

  state = {
    isTracking: false,
    initialized: false,
    marker: 0,
    runAnimation: false
  }

  getNoTrackingUI(){
    const { isTracking, initialized } = this.state;
    return (
      <ViroText text={
        initialized ? 'Initializing AR...'
          : "No Tracking"
      }/>
    )
  }

  arMarker(key, index) {
    try {
      const obj = OBJECTS[key];
      return (
        <ViroARImageMarker
          key={'arMarker'+index}
          target={key}
          onAnchorFound={
            () => this.setState({
              marker: key,
              runAnimation: true
            })
          }
        >
          <ViroVideo
              source={obj.videoSource}
              // source={require('./res/video.mp4')}
              height={obj.height}
              width={0.9}
              position={[0, 0, 0]}
              scale={[1, 1, 1]}
              rotation={[-90, 0, 0]}
              // paused
              visible={(this.state.marker == key)}
              // loop={true}
          />
          {/* <ViroNode key="card" >
            <ViroNode
              opacity={0}
              position={[-2, -1, 0]}
              scale={[1,1,1]}
              rotation={[-90, 0, 0]}
              // dragType="FixedToWorld"
              animation={{
                name:'animateImage',
                run: this.state.runAnimation
              }}
            >
              {/* <ViroFlexView
                rotation={[-90, 0, 0]}
                height={2}
                width={1}
                style={styles.card}
              > */}
                {/* <ViroVideo
                  source={obj.videoSource}
                  // source={require('./res/video.mp4')}
                  height={3}
                  width={1.5}
                  // position={[0.2,0.2,0]}
                  scale={[1, 1, 1]}
                  // loop={true}
              /> */}
              {/* </ViroFlexView> */}
            {/* </ViroNode> */}
          {/* </ViroNode> */}
        </ViroARImageMarker>
      )
    } catch(err) {
      console.log('ERROR arMarker ', err.message);
      return null;
    }
  }

  getARScene(a, b, c) {
    try {
      // console.log('getARScene ', a, b, c)
      return (
        <ViroNode>
          {
            Object.keys(OBJECTS).map((key, index) => {
              return this.arMarker(key, index)
            })
          }
        </ViroNode>
      )
    } catch(err) {
      console.log('ERROR getARScene', err.message);
      return null;
    }
  }

  render() {
    // console.log('BusinessCard.Render')
    return (
      <ViroARScene  >
        {
          this.getARScene()
        }
      </ViroARScene>
    );
  }

  _onInitialized = (state, reason) => {
    // console.log('onInitialized ', state, reason);
    if (state == ViroConstants.TRACKING_NORMAL) {
      isTracking: true
    } else if (state == ViroConstants.TRACKING_NONE) {
      isTracking: false
    }
  }
}

var styles = StyleSheet.create({
  textStyle: {
    flex: .5,
    fontFamily: 'Roboto',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'top',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'column'
  },
  cardWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 0.001,
    flex: .5
  },
  subText: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flex: .5
  }
});

ViroARTrackingTargets.createTargets(OBJECTS);
// {
//   "businessCard" : {
//     source: {uri: 'https://drive.google.com/uc?export=download&id=1_Qv1LGFOGeOMtl_o16AVbOBn-fsK9FWX'},
//     // source: {uri: 'https://drive.google.com/file/d/1_Qv1LGFOGeOMtl_o16AVbOBn-fsK9FWX/view?usp=sharing'},
//     // source : require('./res/target.jpeg'),
//     orientation : "Up",
//     physicalWidth : 1 // real world width in meters
//   },
// }
ViroMaterials.createMaterials({
  imagePlaceholder: {
    diffuseColor: "rgba(255,255,255,1)"
  },
  quad: {
    diffuseColor: "rgba(0,0,0,0.5)"
  }
});

ViroAnimations.registerAnimations({
  animateImage:{
    properties:{
      positionX: 0.05,
      opacity: 1.0
    },
      easing:"Bounce",
      duration: 500
  },
  animateViro: {
    properties: {
      positionZ: 0.02,
      opacity: 1.0,
    },
    easing:"Bounce",
    duration: 500
  }
});

module.exports = BusinessCard;
