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
      view: 'singleValue',
      metrics: [ ],
      region: '${AWS::Region}',
      period: 300
    }
  };

  widget.properties.metrics = config.functions.map(f => ([
    'AWS/Lambda',
    'Throttles',
    'FunctionName',
    '${' + f.logicalId + '}',
    {
      stat: 'Sum',
      period: 2592000,
      region: '${AWS::Region}',
      label: f.name
    }
  ]));

  return widget;
};

module.exports = {
  createWidget,
};
