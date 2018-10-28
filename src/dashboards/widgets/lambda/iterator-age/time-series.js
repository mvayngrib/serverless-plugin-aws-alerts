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

  widget.properties.metrics = config.functions.reduce((accum, f) => {
    return accum.concat([
      [
        'AWS/Lambda',
        'IteratorAge',
        'FunctionName',
        '${' + f.logicalId + '}',
        {
          stat: 'p50',
          period: 900,
          region: '${AWS::Region}',
          label: `${f.name} p50`,
        }
      ],[
        'AWS/Lambda',
        'IteratorAge',
        'FunctionName',
        '${' + f.logicalId + '}',
        {
          stat: 'p90',
          period: 900,
          region: '${AWS::Region}',
          label: `${f.name} p90`,
        }
      ]
    ]);
  }, []);

  return widget;
};

module.exports = {
  createWidget,
};
