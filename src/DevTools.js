import React from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMoniter from 'redux-devtools-dock-monitor';

export default createDevTools(
  <DockMoniter
    toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-w"
  >
    <LogMonitor />
  </DockMoniter>
);
