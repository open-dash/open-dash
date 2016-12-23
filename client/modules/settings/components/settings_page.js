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

  render() {

    return (
      <Grid className='settings-page'>
        <Helmet title='Settings' />
        <Row>
          <Col sm={12} md={6} mdOffset={3}>
            <Panel className='settings-page-form'>
              <h3 className='form-heading text-center'>Settings</h3>
              <form onSubmit={this.handleSubmit}>

                <Row className='settings-group-heading'><h3>General</h3></Row>

                <FieldGroup
                  label='App Title'
                  type='text'
                  name='app.title'
                  defaultValue={_.get(this.state, 'app.title')}
                  onChange={this.handleStateChange}/>
                <FieldGroup
                  label='Admin Email'
                  type='text'
                  name='app.adminEmail'
                  defaultValue={_.get(this.state, 'app.adminEmail')}
                  onChange={this.handleStateChange}
                  info='(used for automated emails)'/>
                <FieldGroup
                  label='Mail URL'
                  type='text'
                  name='mail.smtpUrl'
                  defaultValue={_.get(this.state, 'mail.smtpUrl')}
                  onChange={this.handleStateChange}
                  info='(SMTP URL for sending app emails)'/>

                <Row className='settings-group-heading'><h3>Smart Things</h3></Row>

                <FieldGroup
                  label='Client ID'
                  type='text'
                  name='smartthings.clientId'
                  defaultValue={_.get(this.state, 'smartthings.clientId')}
                  onChange={this.handleStateChange}/>
                <FieldGroup
                  label='Client Secret'
                  type='text'
                  name='smartthings.clientSecret'
                  defaultValue={_.get(this.state, 'smartthings.clientSecret')}
                  onChange={this.handleStateChange}/>

                <Row className='settings-group-heading'><h3>Kadira</h3></Row>

                <FieldGroup
                  label='App ID'
                  type='text'
                  name='kadira.appId'
                  defaultValue={_.get(this.state, 'kadira.appId')}
                  onChange={this.handleStateChange}/>
                <FieldGroup
                  label='Secret'
                  type='text'
                  name='kadira.appSecret'
                  defaultValue={_.get(this.state, 'kadira.appSecret')}
                  onChange={this.handleStateChange}/>

                <Row className='settings-group-heading'><h3>Segment.io</h3></Row>

                <FieldGroup
                  label='API Key'
                  type='text'
                  name='segment.writeKey'
                  defaultValue={_.get(this.state, 'segment.writeKey')}
                  onChange={this.handleStateChange}/>

                <Row className='settings-group-heading'><h3>Slack</h3></Row>

                <FieldGroup
                  label='Webhook URL'
                  type='text'
                  name='slack.webhookUrl'
                  defaultValue={_.get(this.state, 'slack.webhookUrl')}
                  onChange={this.handleStateChange}/>

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
