'use strict';

const createWidget = (config) => {
  const widget = {
    type: 'metric',
    x: config.coordinates.x,
    y: config.coordinates.y,
    width: config.coordinates.width,
    height: config.coordinates.height,
    properties: {
      title: config.title,
      view: 'timeSeries',
      stacked: false,
      metrics: [ ],
      region: '${AWS::Region}',
      period: 300
    }
  };

  widget.properties.metrics = config.functions.map(f => ([
    'AWS/Lambda',
    'Errors',
    'FunctionName',
    '${' + f.logicalId + '}',
    {
      stat: 'Sum',
      period: 900,
      region: '${AWS::Region}',
      label: f.name
    }
  ]));

  return widget;
};

module.exports = {
  createWidget,
};
