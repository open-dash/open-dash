import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col, Panel, Button } from 'react-bootstrap';
import Helmet from 'react-helmet';
import _ from 'lodash';
import { FieldGroup } from '/client/modules/core/components/ui';


class SettingsPage extends Component {

  static propTypes = {
    settings: PropTypes.object,
    update: PropTypes.func.isRequired
  }

  constructor(props = {}) {
    super(props);
    this.state = props.settings;
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleStateChange(e) {
    this.setState(_.set(this.state, e.target.name, e.target.value));
  }

  handleSubmit(e) {
    e.preventDefault();
    const { update } = this.props;
    update(this.state);
  }

  heading(title) {
    return (
      <Row className='settings-group-heading'>
        <h3>{title}</h3>
      </Row>
    );
  }

  field(label, setting, type = 'text') {
    return (
      <FieldGroup
        label={label}
        type={type}
        name={setting}
        defaultValue={_.get(this.state, setting)}
        onChange={this.handleStateChange}/>
    );
  }

  render() {
    return (
      <Grid className='settings-page'>
        <Helmet title='Settings' />
        <Row>
          <Col sm={12} md={6} mdOffset={3}>
            <Panel className='settings-page-form'>
              <h3 className='form-heading text-center'>Settings</h3>
              <form onSubmit={this.handleSubmit}>

                {this.heading('General')}
                {this.field('App Title', 'app.title')}
                {this.field('Admin Email', 'app.adminEmail')}
                {this.field('Mail URL', 'mail.smtpUrl')}

                {this.heading('Smart Things')}
                {this.field('Client ID', 'smartthings.clientId')}
                {this.field('Client Secret', 'smartthings.clientSecret')}

                {this.heading('Kadira')}
                {this.field('App ID', 'kadira.appId')}
                {this.field('Secret', 'kadira.appSecret')}

                {this.heading('Segment.io')}
                {this.field('API Key', 'segment.writeKey')}

                {this.heading('Slack')}
                {this.field('Webhook URL', 'slack.webhookUrl')}

                <Row>
                  <div className='form-group'>
                    <Button type='submit' bsStyle='primary' className='pull-right'>Save</Button>
                  </div>
                </Row>

              </form>
            </Panel>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default SettingsPage;
