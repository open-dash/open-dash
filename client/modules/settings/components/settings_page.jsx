import React from 'react';
import { Grid, Row, Col, Panel } from 'react-bootstrap';
import Helmet from 'react-helmet';

class SettingsPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      settings: this.props.settings
    };
  }

  handleStateChange(e) {
    const { settings } = this.state;

    let fieldState = {};
    fieldState[e.target.name] = e.target.value;

    const newState = Object.assign(settings, fieldState);

    this.setState(newState);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { settings } = this.state;
    const { update } = this.props;
    update(settings);
  }

  render() {
    const { settings } = this.state;

    return (
      <Grid className='settings-page'>
        <Helmet title='Settings' />
        <Row>
          <Col sm={12} md={6} mdOffset={3}>
            <Panel className='settings-page-form'>
              <h3 className='form-heading text-center'>Settings</h3>
              <form onSubmit={this.handleSubmit.bind(this)}>
                <Row className='settings-group-heading'><h3>General</h3></Row>

                <div className='form-group'>
                  <label className='control-label'>
                    <span>Site Title</span>
                  </label>
                  <input
                    type='text'
                    name='siteTitle'
                    className='form-control'
                    value={settings.siteTitle}
                    onChange={this.handleStateChange.bind(this)} />
                </div>

                <div className='form-group'>
                  <label className='control-label'>
                    <span>Admin Email</span>
                  </label>
                  <input
                    type='text'
                    name='adminEmail'
                    className='form-control'
                    value={settings.adminEmail}
                    onChange={this.handleStateChange.bind(this)} />
                  <div className='info-text'>(used for automated emails)</div>
                </div>

                <Row className='settings-group-heading'><h3>Lifx</h3></Row>

                <div className='form-group'>
                  <label className='control-label'>
                    <span>Lifx API Key</span>
                  </label>
                  <input
                    type='text'
                    name='lifxApiKey'
                    className='form-control'
                    value={settings.lifxApiKey}
                    onChange={this.handleStateChange.bind(this)} />
                </div>

                <Row className='settings-group-heading'><h3>Kadira</h3></Row>

                <div className='form-group'>
                  <label className='control-label'>
                    <span>App ID</span>
                  </label>
                  <input
                    type='text'
                    name='kadiraAppId'
                    className='form-control'
                    value={settings.kadiraAppId}
                    onChange={this.handleStateChange.bind(this)} />
                </div>

                <div className='form-group'>
                  <label className='control-label'>
                    <span>Secret</span>
                  </label>
                  <input
                    type='text'
                    name='kadiraAppSecret'
                    className='form-control'
                    value={settings.kadiraAppSecret}
                    onChange={this.handleStateChange.bind(this)} />
                </div>

                <Row className='settings-group-heading'><h3>Segment.io</h3></Row>

                <div className='form-group'>
                  <label className='control-label'>
                    <span>API Key</span>
                  </label>
                  <input
                    type='text'
                    name='segmentKey'
                    className='form-control'
                    value={settings.segmentKey}
                    onChange={this.handleStateChange.bind(this)} />
                </div>

                <Row className='settings-group-heading'><h3>Slack</h3></Row>

                <div className='form-group'>
                  <label className='control-label'>
                    <span>Webhook URL</span>
                  </label>
                  <input
                    type='text'
                    name='slackWebhookUrl'
                    className='form-control'
                    value={settings.slackWebhookUrl}
                    onChange={this.handleStateChange.bind(this)} />
                </div>

                <Row>
                  <div className="form-group">
                    <button type="submit" className="btn btn-primary pull-right">Save</button>
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
