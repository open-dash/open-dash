import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col, Panel } from 'react-bootstrap';
import Helmet from 'react-helmet';
import { FieldGroup } from '/client/modules/core/components/ui';

class SettingsPage extends Component {

  static propTypes = {
    settings: PropTypes.object,
    update: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state =  props.settings;

    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleStateChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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
                  label='Site Title'
                  type='text'
                  name='siteTitle'
                  value={this.state.siteTitle}
                  onChange={this.handleStateChange}/>
                <FieldGroup
                  label='Admin Email'
                  type='text'
                  name='adminEmail'
                  value={this.state.adminEmail}
                  onChange={this.handleStateChange}
                  info='(used for automated emails)'/>
                <FieldGroup
                  label='Mail URL'
                  type='text'
                  name='mailUrl'
                  value={this.state.mailUrl}
                  onChange={this.handleStateChange}
                  info='(SMTP URL for sending app emails)'/>

                <Row className='settings-group-heading'><h3>Lifx</h3></Row>

                <FieldGroup
                  label='API Key'
                  type='text'
                  name='lifxApiKey'
                  value={this.state.lifxApiKey}
                  onChange={this.handleStateChange}/>

                <Row className='settings-group-heading'><h3>Kadira</h3></Row>

                <FieldGroup
                  label='App ID'
                  type='text'
                  name='kadiraAppId'
                  value={this.state.kadiraAppId}
                  onChange={this.handleStateChange}/>
                <FieldGroup
                  label='Secret'
                  type='text'
                  name='kadiraAppSecret'
                  value={this.state.kadiraAppSecret}
                  onChange={this.handleStateChange}/>

                <Row className='settings-group-heading'><h3>Segment.io</h3></Row>

                <FieldGroup
                  label='API Key'
                  type='text'
                  name='segmentKey'
                  value={this.state.segmentKey}
                  onChange={this.handleStateChange}/>

                <Row className='settings-group-heading'><h3>Slack</h3></Row>

                <FieldGroup
                  label='Webhook URL'
                  type='text'
                  name='slackWebhookUrl'
                  value={this.state.slackWebhookUrl}
                  onChange={this.handleStateChange}/>

                <Row>
                  <div className='form-group'>
                    <button type='submit' className='btn btn-primary pull-right'>Save</button>
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
