import _ from 'lodash';
import React from 'react';
import CurrentFrameIndicator from '../CurrentFrameIndicator';
import TimeIndicator from '../TimeIndicator';
import TimelineChannel from '../TimelineChannel';
import './Timeline.css';

const Timeline = ({ sequence, stage }) => {
  return (
    <div className="timeline" onScroll={handleScroll}>
      <div className="timeline-container">
        <div className="channels">
          <div className="channel-wrapper">
            <CurrentFrameIndicator/>
            {_.map(sequence.channels, channel => <TimelineChannel key={channel.uuid} channel={channel}/>)}
            <TimeIndicator sequence={sequence}/>
          </div>
        </div>
      </div>
    </div>
  );
};

function handleScroll(event) {
  // TODO: Remove this hack.
  var labels = event.target.querySelectorAll('.label');
  _.forEach(labels, label => {
    label.style.left = event.target.scrollLeft + 'px';
  });
}

export default Timeline;
