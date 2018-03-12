import * as React from "react";
import { Row, Col, BlurableInput } from "../../../ui/index";
import { t } from "i18next";
import { info, success } from "farmbot-toastr";
import { getDevice } from "../../../device";
import { transferOwnership } from "../../transfer_ownership/transfer_ownership";

interface ChangeOwnershipFormState {
  email: string;
  password: string;
  server: string;
}

export class ChangeOwnershipForm
  extends React.Component<{}, ChangeOwnershipFormState> {
  state = {
    email: "",
    password: "",
    server: "https://my.farm.bot"
  };

  submitOwnershipChange = () => {
    info(t("Sending change of ownership..."), t("Sending"));
    const { email, password, server } = this.state;
    transferOwnership({ email, password, server, device: getDevice() })
      .then(() => success(t("Received change of ownership.")));
  }

  render() {
    return <div className={"change-ownership-form"}>
      <Row>
        <p>
          {t("Change the account FarmBot is connected to.")}
        </p>
        <Col xs={4}>
          <label>
            {t("Email")}
          </label>
        </Col>
        <Col xs={8}>
          <BlurableInput
            allowEmpty={true}
            onCommit={e => this.setState({ email: e.currentTarget.value })}
            name="email"
            value={this.state.email}
            type="email" />
        </Col>
      </Row>
      <Row>
        <Col xs={4}>
          <label>
            {t("Password")}
          </label>
        </Col>
        <Col xs={8}>
          <BlurableInput
            allowEmpty={true}
            onCommit={e => this.setState({ password: e.currentTarget.value })}
            name="password"
            value={this.state.password}
            type="password" />
        </Col>
      </Row>
      <Row>
        <Col xs={4}>
          <label>
            {t("Server")}
          </label>
        </Col>
        <Col xs={8}>
          <BlurableInput
            allowEmpty={true}
            onCommit={e => this.setState({ server: e.currentTarget.value })}
            name="server"
            value={this.state.server}
            type="text" />
        </Col>
      </Row>
      <Row>
        <button
          className={"fb-button gray"}
          onClick={this.submitOwnershipChange}>
          {t("submit")}
        </button>
      </Row>
    </div>;
  }
}
