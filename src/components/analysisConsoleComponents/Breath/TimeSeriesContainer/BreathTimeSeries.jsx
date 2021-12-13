import { SciChartSurface } from "scichart/Charting/Visuals/SciChartSurface";
import { NumericAxis } from "scichart/Charting/Visuals/Axis/NumericAxis";
import { LegendModifier } from "scichart/Charting/ChartModifiers/LegendModifier";
import { SciChartJSLightTheme } from "scichart/Charting/Themes/SciChartJSLightTheme";
import { EAutoRange } from "scichart/types/AutoRange";
import { EAxisAlignment } from "scichart/types/AxisAlignment";
import { ELabelPlacement } from "scichart/types/LabelPlacement";
import { HorizontalLineAnnotation } from "scichart/Charting/Visuals/Annotations/HorizontalLineAnnotation";

export const initSciChart = async () => {
  // UNCOMMENT THIS LINE FOR PRODUCTION BUILD:
  SciChartSurface.setServerLicenseEndpoint("api/license");

  SciChartSurface.setRuntimeLicenseKey(
    // ======= TRIAL LICENSE KEY
    // "bfQXbYY37htcW+P2Imp2Rs5bje+O78AVGCDhGv6ogYmDxxsWQc+nGHlIWPsJ4zTyqrRkZiNoF2TmQ/zjIpJ5bIPRJmdmTO2sA1g6xwyM4KBTV+Qs44tXxJrvNsuyC5HX5DoxjGdtP5Z1BzEeZQrVP9JZNni9A2qxH3dvt8tCmZwYE+2h4jBu5yFrtoM4DSPnmpyLrg0Zb4wwRMLLiQX/vw4JmVPkYjBpDkhiftYOJwUsyhuOlYX1Iy/3L9hP/hpo2i8Yqe6U0cjno6gaYMAdIPQ0z7Z9ZNmR219bieNpNC9KscJNG2pd2XOqJ3gztac3kaPATojpsmHjx0YvCbiKW6CP/MQuGm2jSpRyI4zj/iNpHp9nKNqshIA97k8QD/cQtwcnVcTGQJm5u2R1yC1+9TVxq7oqf/qpjqSVVrKTcl0voWkhNeFN5vSxTJMBxfxT7SHI59H8eIZqLSTRPOOMhqgrDg=="
    // "kqBuFJLdzjTudMLV8VV7TB6B/kp13kz1wysNb+PQYeZYK3byXZ03heTtpPk+95N2RLNhqFx5JqJyuYoBTkzG7dZxYtjCfwULjdBvAtWtPFfE8yCW7dPjFmrcnJQzaxwBmA1C8nwI9jSQlqkmQwlHpRADELENNs5jJUmaB4iYVK0pLQ5+Jy4cN4RnSmEbAnk9YVx8PMcNlxmZGiq5tZyG1LZBj1lmLd3Lgp+hBZvi8ihDgxXpZmDurbiwn252tV+imsmRbeBs7jds28WKS3SDcML30r9wQy9XA+rlVHAn5QU8KfTyzY9IjMKl+D0RAd1G/5/9LvICdn3kjMf7QSz7r15e02P/RMXymMB03GEn2mf7zSX6dl3XsRJxQTgS2E3CLvTUlBxUqHl31zCc/s+IyBXr/CG9cMx7W5h8pCk2X4ZVF2lhVyfAojNxl1TtqBICkXUJR04AZVUQncLno2vUpXgi7VOFJcRohLR7ZfEdUIAUZtvuV6w9Wu4XXwKkqqNf+nRekWw8Sb0pzajmAM/ZRXeX8OIWa6amv1dLl0Tmd98cBxpcFshtYqwO5ESUQLjOyv9F"
    // ======= PRODUCTION LICENSE KEY
    "p8lQoYlbczTpthDLFRsA/CMUq0KHGOr0o3m98e+oTaza8biQVdsy79p8OguJpS0jxFAb0HN2qwXA8hZRdD8MBPKNwX3Vgdj+F0TyV3J6A0ThKw1oXqtyp0IMEihM0aAGMvt0fupT0ScMzrssWltgJFClY8kllSHYi/F2P1mMyLG4wfZ6zGLt3pkpvp+63EiU2fILBES6B1nm29ZbqVQEkYSNNMDr5E617WKfYFDxWV9TSDE3vlu8tdcHgOo9OiU7c6zzFM4p18npDqp2/np1dufviPfFS1qOXVfsmbfQt6pRTRC5L/WjiWWDoNHl7NfEwOwdAGaeQMJG45cXneZqHp7AzsI3FjNkqVe85/rpa05GjwFNEbqW47jgie335KWQ9yAY8Blp7nNXQw5yYO1JbMYVs+r/Rg3JPjMfVU5eo0v6FP1q0xvXmV0+phio2Y4omGpOK9jsJZVqpQU92+XIL9k5LGsv1ZGxmIl1SVG67Ux6p20ER7jOQpglPLflzsegNLpX9DAn0FBy7FYeDOsGXnhwpxcncC1EbrbiCvlms8CjWXoyFvF3oq/ZafmSazdYkucEJ2IK7LH5YKfCMTbvxJtAy2RDLJu1aVgAY1FsmdKW55z8EY5QC3pkag8kRKgcffUOivyO"
  );

  const { sciChartSurface, wasmContext } = await SciChartSurface.create(
    "scichart-root"
  );

  sciChartSurface.applyTheme(new SciChartJSLightTheme());
  sciChartSurface.background = "#F2F3F7";

  // Create an X,Y Axis and add to the chart
  const xAxis = new NumericAxis(wasmContext);

  xAxis.autoTicks = false;
  xAxis.majorDelta = 10;
  xAxis.minorDelta = 2;

  xAxis.labelProvider.formatLabel = (unixTimestamp) => {
    return new Date(unixTimestamp * 1000).toLocaleTimeString("en-US", {
      hour12: false,
    });
  };

  const yAxis = new NumericAxis(wasmContext, {
    axisAlignment: EAxisAlignment.Left,
    axisTitle: "Score",
  });
  yAxis.autoRange = EAutoRange.Always;
  yAxis.autoTicks = true;
  yAxis.maxAutoTicks = 5;
  yAxis.minorsPerMajor = 1;

  yAxis.labelProvider.formatLabel = (value) => {
    return value.toFixed(2);
  };

  sciChartSurface.xAxes.add(xAxis);
  sciChartSurface.yAxes.add(yAxis);

  sciChartSurface.annotations.add(
    // Horizontal line stretched across the viewport
    new HorizontalLineAnnotation({
      labelPlacement: ELabelPlacement.TopLeft,
      labelValue: "Threshold",
      showLabel: true,
      stroke: "Red",
      strokeThickness: 2,
      y1: 1,
      axisLabelFill: "Red",
      axisFontSize: 16,
    })
  );

  sciChartSurface.chartModifiers.add(
    new LegendModifier({
      showCheckboxes: true,
    })
  );

  return {
    sciChartSurface,
    wasmContext,
  };
};
