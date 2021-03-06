import * as React from "react";
import { connect } from "react-redux";
import { Peripherals } from "./peripherals";
import { Sensors } from "./sensors";
import { Row, Page, Col } from "../ui/index";
import { mapStateToProps } from "./state_to_props";
import { WebcamPanel } from "./webcam";
import { Props } from "./interfaces";
import { Move } from "./move/move";
import { BooleanSetting } from "../session_keys";
import { Feature } from "../devices/interfaces";
import { SensorReadings } from "./sensor_readings/sensor_readings";

/** Controls page. */
@connect(mapStateToProps)
export class Controls extends React.Component<Props, {}> {
  get arduinoBusy() {
    return !!this.props.bot.hardware.informational_settings.busy;
  }

  move = () => <Move
    bot={this.props.bot}
    dispatch={this.props.dispatch}
    arduinoBusy={this.arduinoBusy}
    botToMqttStatus={this.props.botToMqttStatus}
    firmwareSettings={this.props.firmwareSettings}
    getWebAppConfigVal={this.props.getWebAppConfigVal} />

  peripherals = () => <Peripherals
    bot={this.props.bot}
    peripherals={this.props.peripherals}
    dispatch={this.props.dispatch}
    disabled={this.arduinoBusy} />

  webcams = () => <WebcamPanel
    feeds={this.props.feeds}
    dispatch={this.props.dispatch} />

  sensors = () => this.props.shouldDisplay(Feature.sensors)
    ? <Sensors
      bot={this.props.bot}
      sensors={this.props.sensors}
      dispatch={this.props.dispatch}
      disabled={this.arduinoBusy} />
    : <div id="hidden-sensors-widget" />

  sensorReadings = () => this.props.sensorReadings.length > 0
    ? <SensorReadings
      sensorReadings={this.props.sensorReadings}
      sensors={this.props.sensors}
      timeOffset={this.props.timeOffset} />
    : <div id="hidden-sensor-history-widget" />

  render() {
    const showWebcamWidget =
      !this.props.getWebAppConfigVal(BooleanSetting.hide_webcam_widget);
    return <Page className="controls-page">
      {showWebcamWidget
        ?
        <Row>
          <Col xs={12} sm={6} md={5} mdOffset={1}>
            <this.move />
            <this.peripherals />
          </Col>
          <Col xs={12} sm={6}>
            <this.webcams />
            <this.sensors />
            <this.sensorReadings />
          </Col>
        </Row>
        :
        <Row>
          <Col xs={12} sm={6} md={5} mdOffset={1}>
            <this.move />
          </Col>
          <Col xs={12} sm={5}>
            <this.peripherals />
            <this.sensors />
            <this.sensorReadings />
          </Col>
        </Row>}
    </Page>;
  }
}
